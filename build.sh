#!/bin/bash
set -ex

VERSION=${VERSION:-"0.0.0"}

rm -rf dist

sed -i -e "s/\"version\":\\s*\"0.0.0\"/\"version\": \"${VERSION}\"/g" package.json

GREYCAT_TARGET=wasm32 greycat install
pnpm clean
pnpm install
pnpm lint
pnpm build
pnpm test
pnpm pack

mkdir -p dist/sdk/web

mv dist/jsx                    dist/sdk/web/
mv dist/vite-plugin            dist/sdk/web/
mv dist/types                  dist/sdk/web/
mv dist/greycat.css            dist/sdk/web/
mv dist/greycat.js             dist/sdk/web/
mv dist/greycat.js.map         dist/sdk/web/
mv dist/greycat.d.ts           dist/sdk/web/
mv dist/greycat.web.js         dist/sdk/web/
mv dist/greycat.web.esm.js     dist/sdk/web/
mv dist/greycat.web.esm.js.map dist/sdk/web/
mv greycat-web-*.tgz           dist/sdk/web/package.tgz

cd dist
zip -r sdk_web.zip sdk
cd ..
mv dist/sdk_web.zip .

mkdir -p libweb/lib/web
mkdir -p libweb/webroot/web

cp dist/sdk/web/greycat.d.ts                        libweb/lib/web/
cp -r dist/sdk/web/types                            libweb/lib/web/
cp vendor/*                                         libweb/lib/web/
cp -r assets                                        libweb/webroot/web/
cp dist/sdk/web/greycat.css                         libweb/webroot/web/
cp dist/sdk/web/greycat.web.esm.js                  libweb/webroot/web/greycat.js
echo "export * from '../../lib/web/types/index';" > libweb/webroot/web/greycat.d.ts

cd libweb
zip -r web.zip .
cd ..
mv libweb/web.zip .

rm -rf libweb *.tsbuildinfo

mv sdk_web.zip dist/
mv web.zip dist/

echo $VERSION
