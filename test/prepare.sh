#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

pnpm --dir .. build:sdk
rm -rf gcdata fixtures
mkdir -p fixtures
greycat install
greycat run
cp gcdata/abi abi.bin
