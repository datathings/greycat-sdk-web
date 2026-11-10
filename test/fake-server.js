import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '@greycat/web/sdk';
import { compileWasm } from '@greycat/web/sdk';

/**
 * A fake GreyCat server for what a real one cannot be made to do on demand, and the
 * pieces to answer as one: GCB answers, task frames, the task event stream.
 */

const here = dirname(fileURLToPath(import.meta.url));
export const STREAM = '/runtime::Task::events';

/** @param {() => boolean} cond */
export async function waitFor(cond, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (!cond()) {
    if (Date.now() > deadline) {
      throw new Error('condition not met in time');
    }
    await new Promise((r) => setTimeout(r, 20));
  }
}

/**
 * Serves `handler(req, res, n)` with `n` the 1-based count of requests so far.
 * @param {(req: http.IncomingMessage, res: http.ServerResponse, n: number) => void} handler
 */
export async function fakeServer(handler) {
  let count = 0;
  const server = http.createServer((req, res) => {
    count += 1;
    handler(req, res, count);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = /** @type {import('node:net').AddressInfo} */ (server.address());
  return {
    url: `http://127.0.0.1:${port}`,
    get count() {
      return count;
    },
    /** Drops every open connection, the stream included, and keeps listening. */
    drop: () => server.closeAllConnections(),
    close: () => {
      server.closeAllConnections();
      server.close();
    },
  };
}

/**
 * Opens a stream whose id is `id`, as a core that can resume streams when given the `run`
 * of the server.
 * @param {http.ServerResponse} res
 * @param {string} [id]
 * @param {string} [run]
 */
export function openStream(res, id = '1', run = undefined) {
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache' });
  res.write(run === undefined ? `event: connected\ndata: ${id}\n\n` : `event: connected\nrun: ${run}\ndata: ${id}\n\n`);
}

/**
 * The `synced` frame that ends the `task-state` frames of a resumed stream.
 * @param {number} count
 */
export function synced(count) {
  return `event: synced\ndata: ${count}\n\n`;
}

/**
 * The ids a `runtime::Task::tasks` request asks for.
 * @param {gc.sdk.GreyCat | undefined} g
 * @param {http.IncomingMessage} req
 * @returns {Promise<number[]>}
 */
export async function polledIds(g, req) {
  /** @type {Buffer[]} */
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks);
  const buf = body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength);
  const ids = /** @type {gc.sdk.GreyCat} */ (g).deserializeWithHeader(buf);
  return /** @type {(number | bigint)[]} */ (ids).map(Number);
}

/**
 * @param {number} taskId
 * @param {number} userId
 * @param {gc.runtime.TaskStatus} status
 */
export function makeTask(taskId, userId, status) {
  return gc.runtime.Task.createFrom({
    user_id: userId,
    user_name: userId === 1 ? 'root' : 'someone',
    task_id: taskId,
    creation: gc.core.time.fromMs(Date.now()),
    status,
    progress: status === gc.runtime.TaskStatus.ended ? 1 : 0.5,
  });
}

/**
 * Answers an RPC with `value` as GCB.
 * @param {gc.sdk.GreyCat | undefined} g
 * @param {http.ServerResponse} res
 * @param {unknown} value
 */
export function answer(g, res, value) {
  res.writeHead(200, { 'content-type': 'application/octet-stream' });
  res.end(Buffer.from(/** @type {gc.sdk.GreyCat} */ (g).serializeWithHeaders(value)));
}

/**
 * The SSE frame for `task`.
 * @param {gc.sdk.GreyCat | undefined} g
 * @param {string} event
 * @param {gc.runtime.Task} task
 */
export function frame(g, event, task) {
  const data = Buffer.from(/** @type {gc.sdk.GreyCat} */ (g).serializeWithHeaders(task)).toString('base64');
  return `event: ${event}\ndata: ${data}\n\n`;
}

/** The test ABI and the wasm module, for `initWithAbi` clients of a fake server. */
export async function loadAbi() {
  const abiBuf = /** @type {ArrayBuffer} */ ((await readFile(join(here, 'abi.bin'))).buffer);
  return { abi: new gc.sdk.Abi(abiBuf), wasm: await compileWasm() };
}
