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

rm -rf gcdata
if [[ $(uname) == 'Darwin' ]]; then
  export CONTAINER_ENGINE="podman"
else
  export CONTAINER_ENGINE="docker"
fi

./bin/greycat test --log=trace

# A library may also ship integration checks that `greycat test` cannot run.
# greycat writes the task directories a spawned callback needs but only drains
# the queue under `serve`, so anything asserting on a task body has to drive a
# real server. `set -e` above makes a failure here fail the job.
if [ -f test/integration.sh ]; then
  echo "Integration tests"
  ./test/integration.sh
fi
