#!/usr/bin/env bash
# Builds the SDK and lays it out as lib/sdk_web/, which is the artifact
# script/pack.sh publishes. script/build.sh calls this once the greycat
# dependencies are installed.
set -ex

cd "$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

lib=$(cat LIB_NAME)
PROJECT_VERSION=${PROJECT_VERSION:-"0.0.0"}

rm -rf "lib/${lib}" dist

# package.json carries 0.0.0 in git so no branch ever holds a stale version;
# the real one is stamped in only for the build being published.
sed -i -e "s/\"version\":\s*\"0.0.0\"/\"version\": \"${PROJECT_VERSION}\"/g" package.json

pnpm install
pnpm gen
pnpm lint
pnpm build

# `pnpm pack` decides what belongs in the package from the `files` field, so it
# is the input to both artifacts rather than a second hand-maintained list.
pnpm pack
mv greycat-web-*.tgz dist/package.tgz

# `greycat install` unpacks a library into lib/<name>/, and a consumer resolves
# it from there with a `file:` dependency, so the directory has to be a complete
# npm package rather than just the built output.
mkdir -p "lib/${lib}"
tar xzf dist/package.tgz -C "lib/${lib}" --strip-components=1
