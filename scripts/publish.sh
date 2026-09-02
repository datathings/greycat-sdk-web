#!/usr/bin/env bash
set -e

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
cd ${DIR}/..

VERSION_MAJOR_MINOR=`cat VERSION`
VERSION=${VERSION:-"0.0.0"}
BRANCH=${CI_COMMIT_REF_NAME:-"dev"}

echo "${VERSION_MAJOR_MINOR} / ${VERSION}"

sha256_hash=$(echo -n "$GET_GC_CI_PASS" | openssl dgst -sha256 | cut -d ' ' -f2)
base64url_token=$(echo -n "root:$sha256_hash" | base64 -w 0)
token=$(curl -s -d "[\"${base64url_token}\", false]" -X POST https://get.greycat.io/runtime::User::login | tr -d '"')

ROOT_URL="https://get.greycat.io/files"

cd dist

# sdk/web
curl -s -X PUT -H "Authorization: $token" -d "${VERSION_MAJOR_MINOR}/${VERSION}" "${ROOT_URL}/sdk/web/${BRANCH}/latest"
curl -s -X PUT -H "Authorization: $token" -T package.tgz                         "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.tgz"

# sdk_web: the same package published as a GreyCat library, resolved by
# @library("sdk_web", "<version>"). Both artifacts ship for now -- consumers on
# the tarball URL keep working while they move over.
#
# Under noarch/ because the SDK is plain JS and identical on every target;
# `greycat install` asks for <target>/<version>.zip and retries under noarch
# when that 404s, so the one upload serves all four.
#
# Marker last: it is what `greycat install` reads to resolve a branch, so
# pointing it at a version before that version is uploaded is a broken window.
curl -s -X PUT -H "Authorization: $token" -T sdk_web.zip                         "${ROOT_URL}/sdk_web/${BRANCH}/${VERSION_MAJOR_MINOR}/noarch/${VERSION}.zip"
curl -s -X PUT -H "Authorization: $token" -d "${VERSION_MAJOR_MINOR}/${VERSION}" "${ROOT_URL}/sdk_web/${BRANCH}/latest"
