#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

PORT="${GREYCAT_PORT:-8181}"
URL="http://127.0.0.1:${PORT}"

# ensure greycat is installed
greycat install

# start server in background
greycat serve --user=1 --port="$PORT" > greycat.log 2>&1 &
SERVER_PID=$!

cleanup() {
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT

# wait for the server to accept HTTP (max ~30s)
for _ in $(seq 1 60); do
    if curl -sf -o /dev/null "$URL/runtime::Runtime::abi_version" 2>/dev/null \
       || curl -sf -o /dev/null "$URL/" 2>/dev/null; then
        break
    fi
    sleep 0.5
done

GREYCAT_URL="$URL" node --enable-source-maps --test
