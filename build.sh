#!/bin/bash
set -ex

VERSION=${VERSION:-"0.0.0"}

rm -rf dist

sed -i -e "s/\"version\":\\s*\"0.0.0\"/\"version\": \"${VERSION}\"/g" package.json

pnpm install
pnpm build

mkdir -p dist/ui

# ui/greycat-sdk.tgz
pnpm pack
mv greycat-ui*.tgz dist/ui/package.tgz

# ui/greycat.ui.js
mv dist/bundle/greycat.ui.js dist/ui/

# ui/*.css
mv dist/bundle/*.css dist/ui/

# ui/fonts/*
mv dist/fonts dist/ui/

rm -rf dist/esm dist/bundle dist/fonts dist/custom-elements.json