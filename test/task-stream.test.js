import assert from 'node:assert/strict';
import { describe, before, afterEach, it } from 'node:test';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '@greycat/web/sdk';
import { compileWasm } from '@greycat/web/sdk';

/**
 * The task event stream against a fake server, for what a real one cannot be made to do
 * on demand: drop the connection, refuse the caller, see the credentials change, and
 * deliver a frame in pieces.
 */

const here = dirname(fileURLToPath(import.meta.url));
const STREAM = '/runtime::Task::events';

/** @param {() => boolean} cond */
async function waitFor(cond, timeoutMs = 5000) {
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
async function fakeServer(handler) {
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
    close: () => {
      server.closeAllConnections();
      server.close();
    },
  };
}

/** @param {http.ServerResponse} res */
function openStream(res) {
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache' });
  res.write(': connected\n\n');
}

describe('task stream', () => {
  /** @type {gc.sdk.Abi} */
  let abi;
  /** @type {Awaited<ReturnType<typeof compileWasm>>} */
  let wasm;
  /** @type {gc.sdk.GreyCat | undefined} */
  let g;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;

  before(async () => {
    const abiBuf = /** @type {ArrayBuffer} */ ((await readFile(join(here, 'abi.bin'))).buffer);
    abi = new gc.sdk.Abi(abiBuf);
    wasm = await compileWasm();
  });

  afterEach(() => {
    g?.tasks.disconnect();
    server?.close();
    g = undefined;
    server = undefined;
  });

  /** @param {string} url @param {{ token?: string }} [extra] */
  function client(url, extra = {}) {
    return gc.sdk.initWithAbi({
      abi,
      module: wasm.module,
      exports: wasm.instance.exports,
      url: new URL(url),
      taskEvents: true,
      ...extra,
    });
  }

  it('reconnects after the server drops the stream', async () => {
    server = await fakeServer((_req, res, n) => {
      openStream(res);
      if (n === 1) {
        setTimeout(() => res.socket?.destroy(), 50);
      }
    });
    g = client(server.url);
    const s = server;
    await waitFor(() => s.count === 2 && g?.tasks.streamState === 'open');
    assert.equal(g.tasks.transport, 'stream');
  });

  it('does not retry a refused stream and polls instead', async () => {
    server = await fakeServer((_req, res) => {
      res.writeHead(401).end();
    });
    g = client(server.url);
    await waitFor(() => g?.tasks.streamState === 'closed');
    await new Promise((r) => setTimeout(r, 1500));
    assert.equal(server.count, 1, 'a refusal is final');
    assert.equal(g.tasks.transport, 'poll');
  });

  it('restarts with a new token and closes once the token is cleared', async () => {
    /** @type {(string | undefined)[]} */
    const seen = [];
    server = await fakeServer((req, res) => {
      seen.push(req.headers.authorization);
      if (req.headers.authorization === undefined) {
        res.writeHead(401).end();
        return;
      }
      openStream(res);
    });
    g = client(server.url, { token: 'first' });
    await waitFor(() => g?.tasks.streamState === 'open');

    g.token = 'second';
    const s = server;
    await waitFor(() => s.count === 2 && g?.tasks.streamState === 'open');

    g.token = undefined;
    await waitFor(() => s.count === 3 && g?.tasks.streamState === 'closed');
    assert.deepEqual(seen, ['first', 'second', undefined]);
    assert.equal(g.tasks.transport, 'poll');
  });

  it('reports a burst of 401s once, and login and logout move the stream along', async () => {
    /** @type {(string | undefined)[]} */
    const streamAuths = [];
    server = await fakeServer((req, res) => {
      const auth = req.headers.authorization;
      if (req.url === STREAM) {
        streamAuths.push(auth);
        if (auth === undefined) {
          res.writeHead(401).end();
        } else {
          openStream(res);
        }
        return;
      }
      if (req.url === '/runtime::Identity::permissions' && auth !== undefined) {
        res.writeHead(200, { 'content-type': 'application/octet-stream' });
        res.end(Buffer.from(/** @type {gc.sdk.GreyCat} */ (g).serializeWithHeaders(['api'])));
        return;
      }
      if (req.url === '/runtime::Identity::logout') {
        res.writeHead(200, { 'content-type': 'application/json' }).end('null');
        return;
      }
      res.writeHead(401).end();
    });
    g = client(server.url, { token: 'first' });
    await waitFor(() => g?.tasks.streamState === 'open');

    /** @type {unknown[]} */
    const lost = [];
    let handled = 0;
    g.on('auth:lost', (e) => lost.push(e));
    g.unauthorizedHandler = () => (handled += 1);
    /** @type {unknown[]} */
    const changed = [];
    g.on('auth:changed', (e) => changed.push(e));

    const results = await Promise.allSettled([
      g.call('runtime::Identity::current_id'),
      g.call('runtime::Identity::current_id'),
      g.call('runtime::Identity::current_id'),
    ]);
    assert.ok(results.every((r) => r.status === 'rejected' && r.reason instanceof gc.sdk.HttpError && r.reason.status === 401));
    assert.deepEqual(lost, [{ status: 401, route: 'runtime::Identity::current_id' }]);
    assert.equal(handled, 1);
    assert.equal(g.token, undefined);
    await waitFor(() => g?.tasks.streamState === 'closed');

    await g.login({ token: 'second' });
    assert.deepEqual(g.permissions, ['api']);
    await waitFor(() => g?.tasks.streamState === 'open');
    assert.equal(streamAuths.at(-1), 'second');

    await g.logout();
    assert.equal(g.token, undefined);
    assert.deepEqual(g.permissions, []);
    await waitFor(() => g?.tasks.streamState === 'closed');
    assert.deepEqual(changed, [{ loggedIn: true }, { loggedIn: false }]);
  });

  it('decodes a GCB frame that arrives in two pieces', async () => {
    const id = 7;
    /** @param {gc.runtime.TaskStatus} status */
    const task = (status) =>
      gc.runtime.Task.createFrom({
        user_id: 1,
        user_name: 'root',
        task_id: id,
        creation: gc.core.time.fromMs(Date.now()),
        status,
        progress: status === gc.runtime.TaskStatus.ended ? 1 : 0.5,
      });
    server = await fakeServer((req, res) => {
      if (req.url !== STREAM) {
        // the snapshot a newly tracked task triggers while the stream is open
        res.writeHead(200, { 'content-type': 'application/octet-stream' });
        res.end(Buffer.from(/** @type {gc.sdk.GreyCat} */ (g).serializeWithHeaders([task(gc.runtime.TaskStatus.running)])));
        return;
      }
      openStream(res);
      const data = Buffer.from(/** @type {gc.sdk.GreyCat} */ (g).serializeWithHeaders(task(gc.runtime.TaskStatus.ended))).toString('base64');
      const frame = `event: task-complete\ndata: ${data}\n\n`;
      const cut = Math.floor(frame.length / 2);
      setTimeout(() => {
        res.write(frame.slice(0, cut));
        setTimeout(() => res.write(frame.slice(cut)), 30);
      }, 100);
    });
    g = client(server.url);
    await waitFor(() => g?.tasks.streamState === 'open');
    /** @type {unknown[]} */
    const events = [];
    g.on('task:event', (t) => events.push(t.task_id));
    const done = await g.tasks.wait(id);
    assert.equal(done.task_id, id);
    assert.equal(done.status.key, 'ended');
    assert.equal(done.progress, 1);
    assert.deepEqual(events, [id], 'every frame is also emitted as task:event');
  });
});
