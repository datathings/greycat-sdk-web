#!/bin/bash
set -ex

VERSION=${VERSION:-"0.0.0"}

rm -rf dist

sed -i -e "s/\"version\":\\s*\"0.0.0\"/\"version\": \"${VERSION}\"/g" package.json

pnpm install
pnpm lint
pnpm build
pnpm test
pnpm pack

mkdir -p dist/sdk/web

mv greycat-*.tgz dist/sdk/web/package.tgz
mv \
  dist/types \
  dist/greycat.css \
  dist/greycat.esm.js \
  dist/greycat.js \
  dist/sdk/web/

mkdir -p libweb/lib/web
mkdir -p libweb/webroot/web
cp -r dist/sdk/web/greycat.d.ts libweb/lib/web/
cp dist/sdk/web/greycat.css libweb/webroot/web/
cp dist/sdk/web/greycat.js libweb/webroot/web/

rm -rf dist/types