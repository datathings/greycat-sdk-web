#!/usr/bin/env bash
# The SDK's own suite is pnpm-driven and drives a real server; `greycat test`
# in script/test.sh only covers the .gcl side. script/test.sh calls this when
# it is present.
set -e

cd "$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."

pnpm prepare:test
pnpm test
