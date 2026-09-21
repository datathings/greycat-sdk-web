#!/usr/bin/env bash
set -e

source /opt/x86_64-w64-mingw32ucrt.sh

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

cd "$DIR/.."

./script/build_deps.sh
# we need to have an executable greycat for codegen
# no matter the crosscompile env
if [[ $(uname) == 'Darwin' ]]; then
  GREYCAT_TARGET=arm64-apple greycat install
elif [[ $(uname -p) == 'aarch64' ]]; then
  GREYCAT_TARGET=arm64-linux greycat install
else
  if [[ -z "$GREYCAT_TARGET" || "$CROSS" == true ]]; then
    GREYCAT_TARGET=x64-linux greycat install
  else
    greycat install
  fi
fi
./script/codegen.sh
rm lib/installed
greycat install
cmake -S . -B build \
  -DCMAKE_BUILD_TYPE="Release" \
  -DFORCE_PROJECT_VERSION="${PROJECT_VERSION}" \
  -DCMAKE_C_FLAGS="${CFLAGS}" \
  -G 'Unix Makefiles'
cmake --build build -j6
cmake --install build
