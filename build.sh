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
mv dist/jsx                dist/sdk/web/
mv dist/vite-plugin        dist/sdk/web/
mv dist/types              dist/sdk/web/
mv dist/greycat.css        dist/sdk/web/
mv dist/greycat.js         dist/sdk/web/
mv dist/greycat.d.ts       dist/sdk/web/
mv dist/greycat.web.js     dist/sdk/web/
mv dist/greycat.web.esm.js dist/sdk/web/

mkdir -p libweb/lib/web
mkdir -p libweb/webroot/web

cp dist/sdk/web/greycat.d.ts       libweb/lib/web/
cp -r dist/sdk/web/types           libweb/lib/web/
cp vendor/*                        libweb/lib/web/
cp dist/sdk/web/greycat.css        libweb/webroot/web/
cp dist/sdk/web/greycat.web.esm.js libweb/webroot/web/greycat.js

rm -rf dist/jsx dist/types **/*.map