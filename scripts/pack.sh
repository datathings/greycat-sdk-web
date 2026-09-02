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

pnpm pack

mv greycat-web-*.tgz dist/package.tgz

echo "-> dist/package.tgz"

# Second artifact, same contents: the package laid out as a GreyCat library so a
# project can depend on the SDK with @library("sdk_web", "<version>") and let
# `greycat install` unpack it into lib/sdk_web/, instead of hardcoding a tarball
# URL in package.json where nothing can bump it per branch.
#
# The tgz is the input rather than the source tree: it already holds exactly the
# published `files` set, under npm's package/ prefix. Staged outside dist/ --
# `files` includes dist/, so building the tree in place would fold it into the
# next pnpm pack.
stage=$(mktemp -d)
mkdir -p "${stage}/lib/sdk_web"
tar xzf dist/package.tgz -C "${stage}/lib/sdk_web" --strip-components=1

# lib/<name>/ at the zip root is what `greycat install` unpacks, matching what
# every library's own pack.sh produces.
(cd "$stage" && zip -qry sdk_web.zip lib/sdk_web)
mv "${stage}/sdk_web.zip" dist/sdk_web.zip
rm -rf "$stage"

echo "-> dist/sdk_web.zip"

echo ${VERSION:-0.0.0}
