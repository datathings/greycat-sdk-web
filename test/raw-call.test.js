import assert from 'node:assert/strict';
import { describe, before, afterEach, it } from 'node:test';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '@greycat/web/sdk';
import { compileWasm } from '@greycat/web/sdk';

/**
 * `rawCall` against a fake server, for answers a real one never gives: a `304` to a
 * request that sent no `If-None-Match`.
 */

const here = dirname(fileURLToPath(import.meta.url));

/**
 * Answers the first `notModified` requests with a bare `304`, then every other one with
 * `body()`. Records the method and `task` header of each request.
 * @param {() => Buffer} body
 * @param {number} [notModified]
 */
async function notModifiedFirst(body, notModified = 1) {
  /** @type {{ method: string | undefined, task: string | string[] | undefined }[]} */
  const requests = [];
  const server = http.createServer((req, res) => {
    requests.push({ method: req.method, task: req.headers['task'] });
    req.resume();
    req.on('end', () => {
      if (requests.length <= notModified) {
        res.writeHead(304);
        res.end();
        return;
      }
      res.writeHead(200, { 'content-type': 'application/octet-stream' });
      res.end(body());
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = /** @type {import('node:net').AddressInfo} */ (server.address());
  return {
    url: `http://127.0.0.1:${port}`,
    requests,
    close: () => {
      server.closeAllConnections();
      server.close();
    },
  };
}

describe('rawCall', () => {
  /** @type {gc.sdk.Abi} */
  let abi;
  /** @type {Awaited<ReturnType<typeof compileWasm>>} */
  let wasm;
  /** @type {Awaited<ReturnType<typeof notModifiedFirst>> | undefined} */
  let server;

  before(async () => {
    const abiBuf = /** @type {ArrayBuffer} */ ((await readFile(join(here, 'abi.bin'))).buffer);
    abi = new gc.sdk.Abi(abiBuf);
    wasm = await compileWasm();
  });

  afterEach(() => {
    server?.close();
    server = undefined;
  });

  /** @param {string} url */
  function client(url) {
    return gc.sdk.initWithAbi({
      abi,
      module: wasm.module,
      exports: wasm.instance.exports,
      url: new URL(url),
      taskEvents: false,
    });
  }

  it('retries a 304 without a cached answer as the same task call', async () => {
    // built on demand, once the instance the types belong to exists
    const task = () =>
      gc.runtime.Task.createFrom({
        user_id: 1,
        user_name: 'root',
        task_id: 3,
        creation: gc.core.time.fromMs(Date.now()),
        status: gc.runtime.TaskStatus.waiting,
      });
    server = await notModifiedFirst(() => Buffer.from(g.serializeWithHeaders(task())));
    const g = client(server.url);
    /** @type {unknown[]} */
    const spawned = [];
    g.on('task:spawn', (t) => spawned.push(t.task_id));

    const value = /** @type {gc.runtime.Task} */ (
      await g.rawCall('tests::add', [1, 2], undefined, 'large')
    );

    assert.deepEqual(server.requests, [
      { method: 'POST', task: 'large' },
      { method: 'POST', task: 'large' },
    ]);
    assert.equal(value.task_id, 3);
    assert.deepEqual(spawned, [3]);
  });

  it('retries a 304 without a cached answer with the same http method', async () => {
    server = await notModifiedFirst(() => Buffer.from(g.serializeWithHeaders(42)));
    const g = client(server.url);

    const value = await g.rawCall('files/x.gcb', undefined, undefined, false, 'GET');

    assert.deepEqual(server.requests, [
      { method: 'GET', task: undefined },
      { method: 'GET', task: undefined },
    ]);
    assert.equal(value, 42);
  });

  it('gives up when the retry of a 304 is answered 304 again', async () => {
    server = await notModifiedFirst(() => Buffer.alloc(0), Infinity);
    const g = client(server.url);

    await assert.rejects(g.rawCall('tests::add', [1, 2]), (err) => {
      assert.ok(err instanceof gc.sdk.HttpError);
      assert.equal(err.status, 304);
      return true;
    });
    assert.equal(server.requests.length, 2);
  });
});
