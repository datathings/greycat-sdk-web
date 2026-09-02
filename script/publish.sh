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

sha256_hash=$(echo -n "$GET_GC_CI_PASS" | openssl dgst -sha256 | cut -d ' ' -f2)
base64url_token=$(echo -n "root:$sha256_hash" | base64 -w 0 )
token=$(curl -s -d "[\"${base64url_token}\", false]" -X POST https://get.greycat.io/runtime::User::login | tr -d '"')

for lib in $(find dist -mindepth 1 -maxdepth 1 -type d); do
  lib=$(basename $lib)

  # Only publish if dist/$lib exists
  [ -d "dist/$lib" ] || continue

  echo "Publishing $lib"
  find dist/$lib -type f -name '*.zip' -print0 | while IFS= read -r -d '' file; do
      short_file=${file#dist/}
      curl -s -o /dev/null -X PUT -H "Authorization: $token" -T $file "https://get.greycat.io/files/$short_file"
      echo "➜ $short_file"
  done
  curl -s -o /dev/null -X PUT -H "Authorization: $token" -d "${PROJECT_VERSION_MAJOR_MINOR}/${PROJECT_VERSION}" -H "Content-Type: text/plain" "https://get.greycat.io/files/${lib}/${CI_COMMIT_REF_NAME}/latest"
done

# A library may have something to publish beyond its own <lib>/ zips, such as an
# npm tarball kept on a legacy path for consumers that have not moved to
# @library yet. The hook is handed the minted token so it does not log in a
# second time, and `set -e` above makes a failure here fail the job.
if [ -f post-publish.sh ]; then
  echo "Post-publish"
  GREYCAT_FILES_TOKEN="$token" ./post-publish.sh
fi
