#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

pnpm build:sdk
rm -rf gcdata test/fixtures
mkdir -p test/fixtures
greycat install
greycat run
cp gcdata/abi test/abi.bin
