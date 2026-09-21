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

# `greycat codegen` bakes a gc_program__resolve_module()/gc_program__resolve_type()
# call into gc_lib_<lib>__link for EVERY module and type of the *compiled program*,
# and that link function returns false as soon as one of them resolves to 0.
#
# So anything project.gcl pulls in beyond the libraries themselves -- @include("test")
# above all, but equally any type declared in project.gcl -- becomes a hard requirement
# baked into the published .gclib that no consumer can satisfy. postal shipped a build
# requiring `lu_open_data::LuAddressRow` from test/lu_open_data.gcl: it failed to link in
# every downstream project, and greycat then dlclose()d the module with its hooks still
# registered and segfaulted at exit, burying the error it had just printed.
#
# Codegen therefore runs against the dependency graph alone: project.gcl reduced to its
# @library() lines, and restored verbatim afterwards.
codegen_backup=$(mktemp)
cp project.gcl "$codegen_backup"
trap 'cp "$codegen_backup" project.gcl; rm -f "$codegen_backup"' EXIT

if ! grep -E '^[[:space:]]*@library\(' "$codegen_backup" > project.gcl; then
  echo "codegen: no @library() declaration found in project.gcl" >&2
  exit 1
fi

./bin/greycat codegen
