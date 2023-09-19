#!/bin/bash
set -ex

VERSION=${VERSION:-"0.0.0"}

rm -rf dist

sed -i -e "s/\"version\":\\s*\"0.0.0\"/\"version\": \"${VERSION}\"/g" package.json

pnpm install
pnpm build
pnpm pack

mkdir -p dist/sdk/web

mv greycat-ui*.tgz dist/sdk/web/package.tgz
mv dist/greycat.sdk.js dist/sdk/web/
mv dist/css/* dist/sdk/web/
# mv dist/docs dist/ui/

rm -rf dist/css dist/docs