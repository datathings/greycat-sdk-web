#!/bin/bash
set -ex

rm -rf dist

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