#!/bin/bash

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

DEPS_ROOT=${DEPS_ROOT:-"."}
DEPS_PATH=${DEPS_PATH:-"dist"}

# Detect GREYCAT_TARGET if not set
if [ -z "$GREYCAT_TARGET" ]; then
  # Get architecture and OS info
  uname_arch="$(uname -m)"
  uname_os="$(uname -s)"

  case "$uname_arch" in
    x86_64)
      if [ "$uname_os" = "Linux" ]; then
        export GREYCAT_TARGET="x64-linux"
      else
        echo "Unsupported OS for x86_64: $uname_os" >&2
        exit 1
      fi
      ;;

    arm64 | aarch64)
      if [ "$uname_os" = "Darwin" ]; then
        export GREYCAT_TARGET="arm64-apple"
      elif [ "$uname_os" = "Linux" ]; then
        export GREYCAT_TARGET="arm64-linux"
      else
        echo "Unsupported OS for arm64: $uname_os" >&2
        exit 1
      fi
      ;;

    *)
      echo "Unsupported architecture: $uname_arch" >&2
      exit 1
      ;;
  esac
fi

set -e

# Not every lib has external C dependencies (e.g. nes needs none) -- if this
# repo has no deps/ directory at all, there's nothing to build.
if [ ! -d "${DIR}/../deps" ]; then
  echo "No deps/ directory -- nothing to build."
  exit 0
fi

cd ${DIR}/../deps
rm -rf "${DIR}/../deps/deps" "${DIR}/../deps/dist"

# Deps that statically embed OpenSSL. Their prebuilt zips must be invalidated
# whenever openssl.sh changes (version bump, config change) -- otherwise a stale
# cache hands back statics linked against a different OpenSSL, and the gclibs
# segfault at load when two embedded OpenSSL ABIs collide in one process.
# We fold openssl.sh's md5 into their cache key so a bump auto-rebuilds them.
#
# A dep opts in two ways: by being named in this list, or by carrying a
# `# links-openssl` line in its own deps/<name>.sh. The list stays because
# deps/*.sh belong to each lib repo and are not synced from the template, so removing
# it would un-fold openssl from these four the moment this script syncs out --
# silently, and months before their dep scripts could gain the marker.
openssl_linkers=" curl ssh2 kafka open62541 "
if [ -f openssl.sh ]; then
  openssl_checksum=$(md5sum openssl.sh | cut -d' ' -f1)
else
  openssl_checksum=""
fi

# Effective cache-key checksum for a dep: its own .sh md5, plus the openssl.sh
# md5 when the dep links OpenSSL statically.
dep_checksum() {
  local name="$1"
  local sum
  sum=$(md5sum "$name.sh" | cut -d' ' -f1)
  if [ -n "$openssl_checksum" ] \
    && { [[ "$openssl_linkers" == *" $name "* ]] || grep -q '^# links-openssl' "$name.sh"; }; then
    sum=$(echo "$sum $openssl_checksum" | md5sum | cut -d' ' -f1)
  fi
  echo "$sum"
}

# One dep per deps/*.sh script the consuming repo actually ships. pro's own
# build_deps.sh hardcoded its full 26-lib list here; a single-lib repo only
# carries its own dependency script(s) (e.g. postal's repo has only
# deps/postal.sh), so discovering them from what's on disk is what makes
# this script work unmodified across every extracted lib repo.
#
# Some scripts build against another dep's already-installed output (e.g.
# http's curl.sh links openssl/zstd/brotli's static libs from deps/lib/) and
# must run after it, so plain alphabetical glob order can't be trusted to
# get that right. deps/all.sh, if present, gives the explicit build order
# instead -- one name per line, '#' comments allowed. Every name in it must
# match a real deps/<name>.sh, and every deps/*.sh must be listed, or this
# aborts rather than silently building an incomplete or wrong-order set.
# Repos with no ordering requirement (most of them -- a single dep, or
# several with no cross-dependency) can skip all.sh entirely and keep using
# glob order.
libs=()
if [ -f all.sh ]; then
  while IFS= read -r name; do
    name="${name%%#*}"
    name="$(echo "$name" | xargs)"
    [ -n "$name" ] && libs+=("$name")
  done < all.sh

  for name in "${libs[@]}"; do
    if [ ! -f "$name.sh" ]; then
      echo "build_deps: all.sh lists '$name' but deps/$name.sh does not exist" >&2
      exit 1
    fi
  done
  for f in *.sh; do
    [ -e "$f" ] || continue
    [ "$f" = "all.sh" ] && continue
    name="${f%.sh}"
    listed=0
    for l in "${libs[@]}"; do
      [ "$l" = "$name" ] && listed=1 && break
    done
    if [ "$listed" = "0" ]; then
      echo "build_deps: deps/$f exists but is not listed in all.sh" >&2
      exit 1
    fi
  done
else
  for f in *.sh; do
    [ -e "$f" ] || continue
    libs+=("${f%.sh}")
  done
fi

# --- Compile deps inside the pinned devcontainer when the cache is cold ---------
# A fresh clone has no cached zips, so every dep is compiled from source. Several
# deps (powergrid, llamacpp, open62541) only build against the project's pinned
# clang/libc++ toolchain, which a bare host lacks. So whenever ANY zip is missing,
# re-exec the whole build inside the devcontainer image (pinned in
# .devcontainer/devcontainer.json). That way `git clone --recurse-submodules`
# + `./script/build_deps.sh` produces every dep correctly and
# `./script/build.sh` then works on the host.
#
# Skipped when: already inside a container (GC_DEPS_IN_DOCKER / docker / podman
# marker), explicitly opted out (BUILD_DEPS_NO_DOCKER=1), or the target is not
# x64-linux (the image is linux/amd64; arm64/Windows build natively). A warm
# cache needs no compiler, so the host just unzips — docker is never invoked.
if [ -z "${GC_DEPS_IN_DOCKER:-}" ] \
  && [ "${BUILD_DEPS_NO_DOCKER:-}" != "1" ] \
  && [ "$GREYCAT_TARGET" = "x64-linux" ] \
  && [ ! -f /.dockerenv ] && [ ! -f /run/.containerenv ]; then
  need_compile=0
  for name in "${libs[@]}"; do
    checksum=$(dep_checksum "$name")
    if [ ! -f "$DEPS_ROOT/${name}_${GREYCAT_TARGET}_${checksum}.zip" ]; then
      need_compile=1
      break
    fi
  done
  if [ "$need_compile" = "1" ]; then
    REPO=$(cd "${DIR}/.." && pwd)
    IMAGE=$(sed -n 's/.*"image"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
      "${REPO}/.devcontainer/devcontainer.json")
    : "${IMAGE:?build_deps: could not read image from .devcontainer/devcontainer.json}"
    if command -v docker >/dev/null 2>&1; then
      echo "Cold dependency cache -> building deps inside ${IMAGE}"
      # The bind mount makes the produced zips + dist land on the host; --user +
      # HOME=/tmp keep them host-owned. GC_DEPS_IN_DOCKER stops the inner run from
      # recursing. DEPS_ROOT (default ".") resolves to /project/deps in-container.
      exec docker run --rm \
        -v "${REPO}":/project -w /project \
        --user "$(id -u):$(id -g)" -e HOME=/tmp \
        -e GC_DEPS_IN_DOCKER=1 \
        -e GREYCAT_TARGET="${GREYCAT_TARGET}" \
        -e "DEPS_ROOT=${DEPS_ROOT}" \
        "${IMAGE}" ./script/build_deps.sh
    else
      echo "WARNING: dependency cache is cold but docker was not found." >&2
      echo "         powergrid/llamacpp/open62541 likely fail to build on a bare host." >&2
      echo "         Install docker, or build inside the devcontainer image:" >&2
      echo "           ${IMAGE}" >&2
      echo "         Continuing with a host build anyway..." >&2
    fi
  fi
fi

for name in "${libs[@]}"; do
  file="$name.sh"
  checksum=$(dep_checksum "$name")
  zipfile="$DEPS_ROOT/${name}_${GREYCAT_TARGET}_${checksum}.zip"
  if [ -f $zipfile ]; then
    echo "Extracting $name for $GREYCAT_TARGET"
    unzip -qo "$DEPS_ROOT/${name}_${GREYCAT_TARGET}_${checksum}.zip"
  else
    echo "Cannot find $zipfile"
    echo "Compiling $name"
    bash $file
    zip -qry $zipfile dist
  fi
  mkdir -p deps
  shopt -s nullglob
  files=(dist/*)
  shopt -u nullglob
  if (( ${#files[@]} )); then
    cp -r "${files[@]}" deps/
  fi
  rm -rf dist
done

for name in "${libs[@]}"; do
  file="$name.sh"
  checksum=$(dep_checksum "$name")
  unzip -qo "$DEPS_ROOT/${name}_${GREYCAT_TARGET}_${checksum}.zip"
done

rm -rf "${DIR}/../deps/deps"
