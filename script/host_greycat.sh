#!/usr/bin/env bash
# Installs into GREYCAT_HOME the greycat of the std version project.gcl pins, for the jobs that
# run on the runner itself (macOS, noarch) instead of the devcontainer image. The runner's own
# greycat serves every branch and project, so it is never upgraded for one of them.
#
# A 9.x or later pin installs from the install.sh of registry.greycat.io. An 8.x pin installs
# nothing, so the runner's greycat, which resolves 8.x on get.greycat.io, is the one on PATH.
#
# The caller exports GREYCAT_HOME and puts ${GREYCAT_HOME}/bin first on PATH. install.sh then
# finds its bin on PATH and leaves the shell rc files of the runner alone.
set -euo pipefail

: "${GREYCAT_HOME:?GREYCAT_HOME is required}"

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do
  DIR=$(cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE
done
DIR=$(cd -P "$(dirname "$SOURCE")" >/dev/null 2>&1 && pwd)

version=$(sed -nE 's/^@library\("std", "([^"]+)"\);.*/\1/p' "${DIR}/../project.gcl" | head -n 1)
if [ -z "$version" ]; then
  echo "host_greycat: project.gcl pins no std version" >&2
  exit 1
fi

major=${version%%.*}
if [ "$major" -lt 9 ]; then
  echo "host_greycat: std ${version} is resolved by the runner's greycat"
  exit 0
fi

registry=${GREYCAT_REGISTRY:-https://registry.greycat.io}
curl -fsSL "${registry}/install.sh" | GREYCAT_REGISTRY="$registry" bash -s "$version"
