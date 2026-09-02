#!/usr/bin/env bash
# Publishes the npm tarball on the legacy sdk/web path, alongside the sdk_web
# library zip that script/publish.sh has already uploaded. Projects that
# resolve @greycat/web from a URL rather than @library("sdk_web", ...) still
# read this path, so both ship until they have moved over.
#
# script/publish.sh calls this with GREYCAT_FILES_TOKEN already minted.
set -e

cd "$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

VERSION_MAJOR_MINOR=$(cat VERSION)
PROJECT_VERSION=${PROJECT_VERSION:-"0.0.0"}
BRANCH=${CI_COMMIT_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}
ROOT_URL="https://get.greycat.io/files"

if [ ! -f dist/package.tgz ]; then
  echo "post-publish: dist/package.tgz is missing -- did post-build.sh run?" >&2
  exit 1
fi

# Artifact first, marker second: `latest` is what a consumer resolves a branch
# through, so it must never name a version that is not uploaded yet.
curl -s -o /dev/null -X PUT -H "Authorization: ${GREYCAT_FILES_TOKEN}" \
  -T dist/package.tgz \
  "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${PROJECT_VERSION}.tgz"
curl -s -o /dev/null -X PUT -H "Authorization: ${GREYCAT_FILES_TOKEN}" \
  -d "${VERSION_MAJOR_MINOR}/${PROJECT_VERSION}" -H "Content-Type: text/plain" \
  "${ROOT_URL}/sdk/web/${BRANCH}/latest"

echo "-> sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${PROJECT_VERSION}.tgz"
