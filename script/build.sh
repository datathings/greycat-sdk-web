#!/bin/bash
set -e

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
NPROC="$(nproc 2>/dev/null || sysctl -n hw.ncpu)"

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

# A pure-GCL library ships lib/<name>/*.gcl as its artifact: no native bindings
# to generate, no CMake project to build. The install above has already resolved
# its dependencies, so everything below this point is the native build path.
if [ ! -f CMakeLists.txt ]; then
  echo "No CMakeLists.txt -- pure-GCL library, nothing to compile."
  if [ -f post-build.sh ]; then
    echo "Post-build"
    ./post-build.sh
  fi
  exit 0
fi

./script/codegen.sh
rm lib/installed
greycat install
cmake -S . -B build \
  -DCMAKE_BUILD_TYPE="Release" \
  -DFORCE_PROJECT_VERSION="${PROJECT_VERSION}" \
  -DCMAKE_C_FLAGS="${CFLAGS}" \
  -G 'Unix Makefiles'
cmake --build build -j$(nproc 2>/dev/null || sysctl -n hw.ncpu)
cmake --install build

# post-build: a standalone repo's own lib may ship a post-install step at its
# root (e.g. python's pip install of its bundled interpreter's requirements.txt)
if [ -f post-build.sh ]; then
  echo "Post-build"
  ./post-build.sh
fi
