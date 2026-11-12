#!/usr/bin/env bash
# Publishes the npm tarball of @greycat/web as the asset `greycat-web`, at the
# version script/publish.sh has just published the sdk_web library under, for
# projects that resolve the SDK from a URL rather than through
# @library("sdk_web", ...).
#
# script/publish.sh calls this with REGISTRY_URL and GREYCAT_REGISTRY_TOKEN set.
set -euo pipefail

cd "$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

: "${REGISTRY_URL:?REGISTRY_URL is required}"
: "${GREYCAT_REGISTRY_TOKEN:?GREYCAT_REGISTRY_TOKEN is required}"
: "${PROJECT_VERSION:?PROJECT_VERSION is required}"
: "${CI_COMMIT_REF_NAME:?CI_COMMIT_REF_NAME is required}"

name="greycat-web"
version="${PROJECT_VERSION%%-*}-${CI_COMMIT_REF_NAME}"
tarball="dist/package.tgz"

if [ ! -f "$tarball" ]; then
  echo "post-publish: $tarball is missing (did post-build.sh run?)" >&2
  exit 1
fi

sha=$(sha256sum "$tarball" | cut -d ' ' -f 1)
curl -fsS -o /dev/null -X PUT -H "Authorization: $GREYCAT_REGISTRY_TOKEN" -T "$tarball" \
  "$REGISTRY_URL/registry::upload?kind=asset&name=$name&version=$version&filename=package.tgz"

# An asset has no lib/<name>/ layout to read a README from, so it sends one.
readme="# greycat-web\\n\\nThe npm tarball of @greycat/web, the browser SDK of GreyCat. Projects using GreyCat should prefer @library(\\\"sdk_web\\\", ...)."
response=$(curl -sS -w '\n%{http_code}' -X POST -H "Authorization: $GREYCAT_REGISTRY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "[\"asset\",\"$name\",\"$version\",[{\"filename\":\"package.tgz\",\"target\":null,\"sha256\":\"$sha\"}],\"$readme\",null]" \
  "$REGISTRY_URL/registry::publish")
code="${response##*$'\n'}"
if [ "$code" != "200" ]; then
  echo "post-publish: asset/$name $version refused (HTTP $code): ${response%$'\n'*}" >&2
  exit 1
fi
echo "post-publish: asset/$name $version published"
