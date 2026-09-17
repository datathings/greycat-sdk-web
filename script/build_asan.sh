#!/bin/bash
# Build every greycat-pro gclib with AddressSanitizer + UndefinedBehaviorSanitizer.
#
# This is build.sh, but the cmake step is driven with -DCMAKE_BUILD_TYPE=Asan
# (see the Asan block in the top-level CMakeLists.txt), so each gclib's own C code
# is instrumented with -fsanitize=address,undefined.
#
# How it works: on Linux a gclib leaves the greycat runtime symbols UNDEFINED and
# resolves them from the host `greycat` process at dlopen (the -Wl,-undefined,_gc_*
# trick in CMakeLists.txt). The asan gclibs do the same for the libasan/libubsan
# runtime -- they DT_NEEDED libasan.so.8/libubsan.so.1 and leave __asan_* undefined,
# resolving them from an asan-built greycat host. So running asan gclibs REQUIRES an
# asan-instrumented `greycat` binary, and there is no published one.
#
#   * By default this script only (re)builds the gclibs and expects bin/greycat to
#     already be asan-instrumented (the manual workflow: build ../greycat with its
#     script/install-asan.sh and copy the binary into bin/). If bin/greycat is not
#     asan it prints exactly how to get one.
#   * Pass WITH_GREYCAT_ASAN=1 to also build the asan greycat from the sibling
#     ../greycat checkout (git pull + script/install-asan.sh) and drop it into bin/.
#
# IMPORTANT: build the gclibs with the SAME compiler family as the asan greycat
# (both gcc, or both clang) so the two sanitizer runtimes match. The default is
# `cc`/`c++` -- the same compiler build.sh and ../greycat/script/install-asan.sh use.
# Override with CC=clang CXX=clang++ if your asan greycat was built with clang.
#
# Usage:
#   ./script/build_asan.sh                     # asan gclibs; reuse existing asan bin/greycat
#   WITH_GREYCAT_ASAN=1 ./script/build_asan.sh # also pull+build the asan greycat into bin/
#   GREYCAT_SRC=../greycat ./script/build_asan.sh
#   CC=clang CXX=clang++ ./script/build_asan.sh
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
ROOT="$PWD"

GREYCAT_SRC="${GREYCAT_SRC:-../greycat}"
BUILD_DIR="${BUILD_DIR:-build-asan}"

is_asan_bin() { # $1 = path to a greycat binary
  [ -x "$1" ] && ldd "$1" 2>/dev/null | grep -q 'libasan'
}

# Preserve an already-asan bin/greycat across the release `greycat install` below
# (which would otherwise overwrite it with a downloaded, non-asan binary).
BIN_BACKUP=""
if [[ -z "$WITH_GREYCAT_ASAN" ]] && is_asan_bin "$ROOT/bin/greycat"; then
  BIN_BACKUP="$(mktemp)"
  cp "$ROOT/bin/greycat" "$BIN_BACKUP"
fi

# --- deps (reused as-is; not instrumented, but asan still catches heap errors in
#     them through its malloc interceptors) -------------------------------------
./script/build_deps.sh

# --- a working greycat for codegen + std, exactly like build.sh ----------------
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
rm -f lib/installed
greycat install

# --- build the gclibs with asan (-DCMAKE_BUILD_TYPE=Asan) -----------------------
cmake -S . -B "$BUILD_DIR" \
  -DCMAKE_BUILD_TYPE="Asan" \
  -DFORCE_PROJECT_VERSION="${PROJECT_VERSION}" \
  -DCMAKE_C_FLAGS="${CFLAGS}" \
  -G 'Unix Makefiles'
cmake --build "$BUILD_DIR" -j"$NPROC"
cmake --install "$BUILD_DIR"   # installs the asan gclibs into lib/<name>/<name>.gclib

# --- put an asan greycat in bin/ (LAST: after the `greycat install` steps) ------
if [[ -n "$WITH_GREYCAT_ASAN" ]]; then
  ( cd "$GREYCAT_SRC" && git pull && ./script/install-asan.sh )
  cp "$(command -v greycat)" "$ROOT/bin/greycat"
elif [[ -n "$BIN_BACKUP" ]]; then
  cp "$BIN_BACKUP" "$ROOT/bin/greycat"   # restore the asan binary we had
fi
[[ -n "$BIN_BACKUP" ]] && rm -f "$BIN_BACKUP"

# --- report --------------------------------------------------------------------
echo
echo "greycat-pro built with AddressSanitizer + UBSan."
echo "  gclibs : $ROOT/lib/<name>/<name>.gclib   (asan-instrumented)"
if is_asan_bin "$ROOT/bin/greycat"; then
  echo "  greycat: $ROOT/bin/greycat   (asan ok)"
  echo
  echo "Run the suite under asan -- detect_odr_violation=0 is REQUIRED (codegen emits"
  echo "host type-id globals into every nativegen.c, which asan would otherwise flag as"
  echo "ODR violations); common/script/lsan.supp suppresses the known third-party Vulkan/dbus"
  echo "leaks in lib/ai:"
  echo
  echo "    export ASAN_OPTIONS=protect_shadow_gap=0:detect_leaks=1:detect_odr_violation=0"
  echo "    export LSAN_OPTIONS=suppressions=$ROOT/common/script/lsan.supp"
  echo "    ./bin/greycat test            # or: ./bin/greycat test <suite>"
else
  echo "  greycat: $ROOT/bin/greycat   (NOT asan -- asan gclibs will fail to load!)"
  echo
  echo "Get an asan greycat into bin/ with either:"
  echo "    WITH_GREYCAT_ASAN=1 ./script/build_asan.sh        # auto: pull + build ${GREYCAT_SRC}"
  echo "  or manually:"
  echo "    (cd ${GREYCAT_SRC} && git pull && ./script/install-asan.sh) && cp \"\$(command -v greycat)\" bin/greycat"
fi
echo
echo "Rebuild the normal Release libs with ./script/build.sh when done."
