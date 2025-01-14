#!/bin/bash
set -e

VERSION_MAJOR_MINOR=`cat VERSION`
VERSION=${VERSION:-"0.0.0"}
BRANCH=${CI_COMMIT_REF_NAME:-"dev"}

echo "${VERSION_MAJOR_MINOR} / ${VERSION}"

sha256_hash=$(echo -n "$GET_GC_CI_PASS" | openssl dgst -sha256 | cut -d ' ' -f2)
base64url_token=$(echo -n "ci:$sha256_hash" | base64 -w 0)
token=$(curl -s -d "[\"${base64url_token}\", false]" -X POST https://get.greycat.io/runtime::User::login | tr -d '"')

ROOT_URL="https://get.greycat.io/files"

cd dist

file="dist.zip"
zip -r $file sdk

curl -s -X PUT -H "Authorization: $token" -T $file                               "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.zip"
curl -s -X PUT -H "Authorization: $token" -T $file                               "${ROOT_URL}/sdk/web/${BRANCH}/latest.zip"
curl -s -X PUT -H "Authorization: $token" -T sdk/web/package.tgz                 "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.tgz"
curl -s -X PUT -H "Authorization: $token" -T sdk/web/greycat.css                 "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.css"
curl -s -X PUT -H "Authorization: $token" -T sdk/web/greycat.js                  "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.js"
curl -s -X PUT -H "Authorization: $token" -T sdk/web/greycat.web.js              "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.web.js"
curl -s -X PUT -H "Authorization: $token" -T sdk/web/greycat.web.esm.js          "${ROOT_URL}/sdk/web/${BRANCH}/${VERSION_MAJOR_MINOR}/${VERSION}.web.esm.js"
curl -s -X PUT -H "Authorization: $token" -d "${VERSION_MAJOR_MINOR}/${VERSION}" "${ROOT_URL}/sdk/web/${BRANCH}/latest"

cd ../libweb
lib="lib.zip"
zip -r $lib .

curl -s -X PUT -H "Authorization: $token" -T $lib                                "${ROOT_URL}/web/${BRANCH}/${VERSION_MAJOR_MINOR}/noarch/${VERSION}.zip"
