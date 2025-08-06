#!/usr/bin/env bash
set -ex

cd "$(dirname "$0")" || exit 1

pnpm build:sdk
rm -rf gcdata
../bin/greycat run
cp gcdata/abi project.test.abi