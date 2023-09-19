#!/bin/bash
set -ex

VERSION=${VERSION:-"0.0.0"}

rm -rf dist

sed -i -e "s/\"version\":\\s*\"0.0.0\"/\"version\": \"${VERSION}\"/g" package.json

pnpm install
pnpm build
pnpm pack

mkdir -p dist/sdk/web

mv greycat-*.tgz dist/sdk/web/package.tgz
mv dist/greycat.js dist/greycat.min.js dist/css/* dist/sdk/web/

rm -rf dist/css dist/docs dist/types