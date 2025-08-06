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