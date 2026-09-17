#!/usr/bin/env bash
set -e

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

# Same cache location as build_deps.sh: default "." = the deps/ dir we cd into;
# CI overrides it (e.g. /opt/pro_deps).
DEPS_ROOT=${DEPS_ROOT:-"."}

usage() {
  cat <<'EOF'
Usage: clean_deps.sh [-y|--yes] [--keep-cache | --all | <dep-name>]

  (no args)     FULL clean (default): delete the derived artifacts (deps/dist,
                deps/deps) AND the whole zip cache ($DEPS_ROOT/*.zip). Forces a
                FULL recompile on the next ./script/build_deps.sh (which, on
                x64-linux, runs inside the devcontainer). Asks to confirm unless
                -y/--yes is given. Same as --all.

  --keep-cache  Remove derived build artifacts only (deps/dist, deps/deps); KEEP
                the zip cache. Safe & instant; the next ./script/build_deps.sh
                just re-unzips from the warm cache (no recompile).

  --all         Explicit alias for the default full clean (kept for back-compat).

  <dep-name>    Delete only that dep's cached zips (e.g. 'curl', 'powergrid'),
                forcing just that dep to recompile next build. Handy for
                bisecting one dependency.

  -y, --yes     Don't prompt before deleting the zip cache (for scripts/CI).
  -h, --help    Show this help.

Honors $DEPS_ROOT (the zip-cache location; default: deps/). Always clears the
derived artifacts (deps/dist, deps/deps) regardless of mode.
EOF
}

# --- parse args (one optional mode + optional -y) ---
# Default MODE is "all": a bare `clean_deps.sh` does a FULL clean (derived
# artifacts + the whole zip cache). Use --keep-cache for the derived-only clean.
ASSUME_YES=0
MODE="all"
EXPLICIT_ALL=0
DEP_NAME=""
for arg in "$@"; do
  case "$arg" in
    -h|--help) usage; exit 0 ;;
    -y|--yes)  ASSUME_YES=1 ;;
    --all)
      [ "$MODE" = "dep" ] && { echo "clean_deps: --all and a dep name are mutually exclusive" >&2; exit 1; }
      [ "$MODE" = "artifacts" ] && { echo "clean_deps: --all and --keep-cache are mutually exclusive" >&2; exit 1; }
      MODE="all"; EXPLICIT_ALL=1
      ;;
    --keep-cache)
      [ "$MODE" = "dep" ] && { echo "clean_deps: --keep-cache and a dep name are mutually exclusive" >&2; exit 1; }
      [ "$EXPLICIT_ALL" = "1" ] && { echo "clean_deps: --all and --keep-cache are mutually exclusive" >&2; exit 1; }
      MODE="artifacts"
      ;;
    --*) echo "clean_deps: unknown option: $arg" >&2; usage >&2; exit 1 ;;
    *)
      [ "$EXPLICIT_ALL" = "1" ] && { echo "clean_deps: --all and a dep name are mutually exclusive" >&2; exit 1; }
      [ "$MODE" = "artifacts" ] && { echo "clean_deps: --keep-cache and a dep name are mutually exclusive" >&2; exit 1; }
      [ -n "$DEP_NAME" ] && { echo "clean_deps: only one dep name allowed (got '$DEP_NAME' and '$arg')" >&2; exit 1; }
      DEP_NAME="$arg"
      MODE="dep"
      ;;
  esac
done

cd "${DIR}/../deps"

# Derived artifacts are always cleared — they are cheap to rebuild from the cache.
echo "Removing derived artifacts: deps/dist, deps/deps"
rm -rf dist deps

case "$MODE" in
  artifacts)
    echo "Done. Next ./script/build_deps.sh re-unzips from the cache (no recompile)."
    ;;

  all)
    shopt -s nullglob
    zips=("$DEPS_ROOT"/*.zip)
    shopt -u nullglob
    if (( ${#zips[@]} == 0 )); then
      echo "No cached zips found in '${DEPS_ROOT}' — nothing else to clean."
      exit 0
    fi
    echo
    echo "About to delete ${#zips[@]} cached dependency zip(s) from '${DEPS_ROOT}':"
    printf '  %s\n' "${zips[@]##*/}"
    echo
    echo "This forces a FULL recompile on the next ./script/build_deps.sh."
    if [ "$ASSUME_YES" != "1" ]; then
      reply=""
      read -r -p "Delete them? [y/N] " reply || reply=""
      case "$reply" in
        y|Y|yes|YES) ;;
        *) echo "Kept the zip cache."; exit 0 ;;
      esac
    fi
    rm -f "${zips[@]}"
    echo "Deleted ${#zips[@]} zip(s)."
    ;;

  dep)
    shopt -s nullglob
    zips=("$DEPS_ROOT/${DEP_NAME}"_*.zip)
    shopt -u nullglob
    if (( ${#zips[@]} == 0 )); then
      echo "No cached zips for '${DEP_NAME}' in '${DEPS_ROOT}'."
      exit 0
    fi
    echo "Deleting cached zip(s) for '${DEP_NAME}':"
    printf '  %s\n' "${zips[@]##*/}"
    rm -f "${zips[@]}"
    echo "Deleted ${#zips[@]} zip(s) — '${DEP_NAME}' recompiles on the next build."
    ;;
esac
