#!/bin/sh
set -ex
cd "$(dirname "$0")" || exit 1
pnpm build:sdk
rm -rf gcdata
greycat run
cp gcdata/abi project.test.abi