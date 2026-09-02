#!/usr/bin/env bash
set -e

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
cd ${DIR}/..
PROJECT_DIR=$PWD
CI_COMMIT_REF_NAME=${CI_COMMIT_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}
PROJECT_VERSION_MAJOR_MINOR=${PROJECT_VERSION_MAJOR_MINOR:-$(cat "$DIR/VERSION")}
PROJECT_VERSION=${PROJECT_VERSION:-"${PROJECT_VERSION_MAJOR_MINOR}.0"}

lib="sdk_web"
# A library with no .gclib carries no compiled code -- GCL modules, a bundled
# webapp under webroot/, an npm package under package.json, or a mix -- so its
# artifact is architecture independent: publish it once under `noarch` instead
# of once per target. `greycat install` asks for <target>/<version>.zip and
# retries the same path under noarch when that 404s, so one noarch zip serves
# every target.
if [ -f "lib/$lib/$lib.gclib" ]; then
  target="${GREYCAT_TARGET}"
else
  if ! compgen -G "lib/$lib/*.gcl" > /dev/null \
    && [ ! -d "lib/$lib/webroot" ] \
    && [ ! -f "lib/$lib/package.json" ]; then
    echo "pack: lib/$lib holds no $lib.gclib, no .gcl module, no webroot and no package.json -- did the build succeed?" >&2
    exit 1
  fi
  target="noarch"
  # A native build gets these copied next to the .gclib by CMake's install()
  # rules. There is no CMake here, so pack them in directly.
  if [ -f README.md ]; then
    cp README.md "lib/$lib/"
  fi
  if [ -d skills ]; then
    cp -r skills "lib/$lib/"
  fi
fi

echo "Packing $lib ($target)"
mkdir -p "${PROJECT_DIR}/dist/$lib/${CI_COMMIT_REF_NAME}/${PROJECT_VERSION_MAJOR_MINOR}/${target}"
zipname="${PROJECT_DIR}/dist/$lib/${CI_COMMIT_REF_NAME}/${PROJECT_VERSION_MAJOR_MINOR}/${target}/${PROJECT_VERSION}.zip"
zip -ry $zipname lib/$lib
