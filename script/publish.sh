#!/usr/bin/env bash
# Publish every library packed under dist/ to registry.greycat.io.
#
# dist/<lib>/<branch>/<major.minor>/<target>/<version>.zip is what pack.sh
# writes, one archive per target the pipeline built. Each library is published
# as one version holding all of its archives: every archive is staged with
# `PUT /registry::upload`, then one `registry::publish` declares them, and the
# registry verifies each sha256 before anything becomes visible. A version is
# immutable, so a target missing here cannot be added to it later.
#
# GREYCAT_REGISTRY_TOKEN is a personal access token of the publishing identity,
# which owns every package it creates. REGISTRY_URL points at another registry
# (a local one, a staging one). REGISTRY_TIER names the tier a library this
# publish creates lands in, the community tier when unset. A library that exists
# already stays in its own tier, and naming another one is refused. Publishing
# into any tier but community takes a publish grant on that tier.
#
# The version is <M.m.p>-<branch>, from PROJECT_VERSION and CI_COMMIT_REF_NAME.
# The branch is the ref being built, which on a tagged or detached checkout is
# not the one HEAD describes.
set -euo pipefail

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
cd "${DIR}/.."

: "${GREYCAT_REGISTRY_TOKEN:?GREYCAT_REGISTRY_TOKEN is required (registry publish token)}"
: "${PROJECT_VERSION:?PROJECT_VERSION is required}"
: "${CI_COMMIT_REF_NAME:?CI_COMMIT_REF_NAME is required}"

base="${REGISTRY_URL:-https://registry.greycat.io}"

# curl retries a timeout and a 408, 429, 500, 502, 503 or 504 answer. Every call
# below is safe to repeat: staging a file again replaces it, and publishing the
# same files again answers the stored version.
retry=(--retry 3)
token="$GREYCAT_REGISTRY_TOKEN"
tier=null
if [ -n "${REGISTRY_TIER:-}" ]; then
  tier="\"$REGISTRY_TIER\""
fi
branch="$CI_COMMIT_REF_NAME"
version="${PROJECT_VERSION%%-*}-${branch}"

# The registry holds a branch to A-Za-z0-9._-, since it is a directory name, and
# refuses the whole version otherwise. Saying which branch beats a 500.
case "$branch" in
  "" | "." | ".." | *[!A-Za-z0-9._-]*)
    echo "publish: branch '$branch' is not a legal path segment" >&2
    exit 1
    ;;
esac

# A token the server does not accept is not an error: the request is served as
# the anonymous identity, id 0. Refusing that here gives a clear message rather
# than a 401 from the first upload.
if ! identity=$(curl -fsS "${retry[@]}" -X POST -H "Authorization: $token" \
  -H 'Content-Type: application/json' -d '[]' \
  "$base/runtime::Identity::current"); then
  echo "publish: cannot reach $base" >&2
  exit 1
fi
user_id=$(printf '%s' "$identity" | grep -o '"id":[0-9]*' | head -n 1 | cut -d ':' -f 2 || true)
if [ -z "$user_id" ] || [ "$user_id" = "0" ]; then
  echo "publish: GREYCAT_REGISTRY_TOKEN was not accepted by $base" >&2
  exit 1
fi

published=0
for libdir in dist/*/; do
  [ -d "$libdir" ] || continue
  lib=$(basename "$libdir")

  entries=""
  count=0
  while IFS= read -r -d '' file; do
    # The target is the directory holding the archive, and <target>.zip is the
    # name the registry serves it under.
    target=$(basename "$(dirname "$file")")
    sha=$(sha256sum "$file" | cut -d ' ' -f 1)
    if ! curl -fsS "${retry[@]}" -o /dev/null -X PUT -H "Authorization: $token" -T "$file" \
      "$base/registry::upload?kind=lib&name=$lib&version=$version&filename=$target.zip"; then
      echo "publish: staging $lib $target.zip failed" >&2
      exit 1
    fi
    entries="${entries:+$entries,}{\"filename\":\"$target.zip\",\"target\":\"$target\",\"sha256\":\"$sha\"}"
    echo "publish: staged $lib $target.zip"
    count=$((count + 1))
  done < <(find "$libdir" -type f -name '*.zip' -print0)

  if [ "$count" -eq 0 ]; then
    continue
  fi

  # `readme` is null, so the registry reads lib/<lib>/README.md out of the
  # archive. Publishing the very same files again answers the stored version,
  # so a re-run job succeeds.
  response=$(curl -sS "${retry[@]}" -w '\n%{http_code}' -X POST -H "Authorization: $token" \
    -H 'Content-Type: application/json' \
    -d "[\"lib\",\"$lib\",\"$version\",[$entries],null,$tier]" \
    "$base/registry::publish")
  code="${response##*$'\n'}"
  if [ "$code" != "200" ]; then
    echo "publish: $lib $version refused (HTTP $code): ${response%$'\n'*}" >&2
    exit 1
  fi
  echo "publish: lib/$lib $version published with $count archive(s)"
  published=$((published + 1))
done

if [ "$published" -eq 0 ]; then
  echo "publish: nothing under dist/ to publish (did pack.sh run?)" >&2
  exit 1
fi

# A library may publish more than its archives, such as an npm tarball. The hook
# runs with the same registry variables, and `set -e` makes its failure fail
# the job.
if [ -f post-publish.sh ]; then
  echo "Post-publish"
  REGISTRY_URL="$base" GREYCAT_REGISTRY_TOKEN="$token" ./post-publish.sh
fi
