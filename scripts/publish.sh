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
