import assert from 'node:assert/strict';
import { describe, before, afterEach, it } from 'node:test';

import '@greycat/web/sdk';
import { answer, fakeServer, loadAbi, makeTask } from './fake-server.js';

/** Waiting for a task and reading what it holds. */
describe('task results', () => {
  /** @type {Awaited<ReturnType<typeof loadAbi>>} */
  let local;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;

  before(async () => {
    local = await loadAbi();
  });

  afterEach(() => {
    server?.close();
    server = undefined;
  });

  /** @param {string} url @param {string} [token] */
  function client(url, token) {
    return gc.sdk.initWithAbi({
      abi: local.abi,
      module: local.wasm.module,
      exports: local.wasm.instance.exports,
      url: new URL(url),
      token,
    });
  }

  it('fetches the result of a task with the token of the instance', async () => {
    /** @type {gc.sdk.GreyCat | undefined} */
    let g;
    /** @type {(string | undefined)[]} */
    const resultAuths = [];
    server = await fakeServer((req, res) => {
      if (req.url === '/files/root/tasks/7/result.gcb') {
        resultAuths.push(req.headers.authorization);
        if (req.headers.authorization === 'secret') {
          answer(g, res, 42);
        } else {
          res.writeHead(401).end();
        }
        return;
      }
      answer(g, res, [makeTask(7, 1, gc.runtime.TaskStatus.ended)]);
    });
    g = client(server.url, 'secret');
    const result = await g.await(makeTask(7, 1, gc.runtime.TaskStatus.running));
    assert.equal(result, 42);
    assert.deepEqual(resultAuths, ['secret']);
    assert.equal(g.token, 'secret');
  });
});
