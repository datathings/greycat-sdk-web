#!/bin/bash
set -e

VERSION_MAJOR_MINOR=`cat VERSION`
VERSION=${VERSION:-"0.0.0"}

echo "${VERSION_MAJOR_MINOR} / ${VERSION}"

sha256_hash=$(echo -n "$GET_GC_CI_PASS" | openssl dgst -sha256 | cut -d ' ' -f2)
base64url_token=$(echo -n "ci:$sha256_hash" | base64 -w 0)
token=$(curl -s -d "[\"${base64url_token}\", false]" -X POST https://get.greycat.io/runtime::User::login | tr -d '"')

cd dist

file="dist.zip"
zip -r $file ui

curl -s -X PUT -H "Authorization: $token" -T $file "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.zip"
curl -s -X PUT -H "Authorization: $token" -T $file "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/latest.zip"
curl -s -X PUT -H "Authorization: $token" -T ui/package.tgz "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.tgz"
curl -s -X PUT -H "Authorization: $token" -T ui/greycat.ui.base.css "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.base.css"
curl -s -X PUT -H "Authorization: $token" -T ui/greycat.ui.classless.css "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.classless.css"
curl -s -X PUT -H "Authorization: $token" -T ui/greycat.ui.css "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.css"
curl -s -X PUT -H "Authorization: $token" -T ui/greycat.ui.js "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}.js"
curl -s -X PUT -H "Authorization: $token" -d "${VERSION_MAJOR_MINOR}/${VERSION}" -H "Content-Type: text/plain" "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/latest"

# publish docs
cd ui/docs
for file in $(find . -type f)
do
  curl -s -X PUT -H "Authorization: $token" -T $file "https://get.greycat.io/files/ui/${CI_COMMIT_REF_NAME}/${VERSION_MAJOR_MINOR}/${VERSION}/docs/$file"
done