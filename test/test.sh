#!/usr/bin/env bash
set -ex

cd "$(dirname "$0")" || exit 1

node --enable-source-maps --test