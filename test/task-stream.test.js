import assert from 'node:assert/strict';
import { describe, before, afterEach, it } from 'node:test';

import '@greycat/web/sdk';
import { STREAM, answer, fakeServer, frame, loadAbi, makeTask, openStream, waitFor } from './fake-server.js';

/**
 * The task event stream against a fake server, for what a real one cannot be made to do
 * on demand: drop the connection, refuse the caller, see the credentials change, and
 * deliver a frame in pieces.
 */

describe('task stream', () => {
  /** @type {gc.sdk.Abi} */
  let abi;
  /** @type {Awaited<ReturnType<typeof loadAbi>>['wasm']} */
  let wasm;
  /** @type {gc.sdk.GreyCat | undefined} */
  let g;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;

  before(async () => {
    ({ abi, wasm } = await loadAbi());
  });

  afterEach(() => {
    g?.tasks.disconnect();
    server?.close();
    g = undefined;
    server = undefined;
  });

  /** @param {string} url @param {{ token?: string, taskEvents?: boolean, pauseWhenHidden?: boolean }} [extra] */
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

  it('follows a spawned task on the stream its call names, decoding a frame cut in two', async () => {
    // past what a `number` holds exactly, so it must be sent back as received
    const streamId = '18446744073709551615';
    const id = 7;
    /** @type {import('node:http').ServerResponse | undefined} */
    let stream;
    /** @type {unknown} */
    let named;
    let polls = 0;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        stream = res;
        openStream(res, streamId);
        return;
      }
      if (req.url === '/tests::slow') {
        named = req.headers.sse;
        answer(g, res, makeTask(id, 1, gc.runtime.TaskStatus.waiting));
        const complete = frame(g, 'task-complete', makeTask(id, 1, gc.runtime.TaskStatus.ended));
        const cut = Math.floor(complete.length / 2);
        setTimeout(() => {
          stream?.write(complete.slice(0, cut));
          setTimeout(() => stream?.write(complete.slice(cut)), 30);
        }, 300);
        return;
      }
      // the snapshot a bound task gets when it starts being tracked
      polls += 1;
      answer(g, res, [makeTask(id, 1, gc.runtime.TaskStatus.running)]);
    });
    g = client(server.url);
    assert.equal(await g.tasks.opened(1000), true);
    assert.equal(g.tasks.streamId, streamId);
    /** @type {unknown[]} */
    const events = [];
    g.on('task:event', (e) => events.push([e.kind, e.task.task_id]));
    const task = await g.spawn('tests::slow', [1, 1]);
    const done = await g.tasks.wait(task.task_id, 20);
    assert.equal(named, streamId);
    assert.equal(done.status.key, 'ended');
    assert.equal(done.progress, 1);
    assert.equal(polls, 1, 'only the snapshot');
    assert.deepEqual(events, [['complete', id]], 'every frame is also emitted as task:event');
  });

  it('polls a task it did not spawn while the stream is open', async () => {
    const id = 8;
    let polls = 0;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        openStream(res);
        return;
      }
      // the stream never reports a task no call of this instance named it for
      polls += 1;
      const status = polls < 3 ? gc.runtime.TaskStatus.running : gc.runtime.TaskStatus.ended;
      answer(g, res, [makeTask(id, 1, status)]);
    });
    g = client(server.url);
    assert.equal(await g.tasks.opened(1000), true);
    const done = await g.tasks.wait(id, 20);
    assert.equal(done.status.key, 'ended');
    assert.equal(polls, 3);
    assert.equal(g.tasks.transport, 'stream');
  });

  it('polls a task bound to a stream that closed, after the new one opens', async () => {
    const id = 9;
    let streams = 0;
    let pollsSinceReopen = 0;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        streams += 1;
        openStream(res, `${streams}`);
        return;
      }
      if (req.url === '/tests::slow') {
        answer(g, res, makeTask(id, 1, gc.runtime.TaskStatus.waiting));
        return;
      }
      // the task only ends once the second stream is open, which never reports it
      if (streams === 2) {
        pollsSinceReopen += 1;
      }
      const status = pollsSinceReopen < 2 ? gc.runtime.TaskStatus.running : gc.runtime.TaskStatus.ended;
      answer(g, res, [makeTask(id, 1, status)]);
    });
    g = client(server.url);
    assert.equal(await g.tasks.opened(1000), true);
    const task = await g.spawn('tests::slow', [1, 1]);
    const done = g.tasks.wait(task.task_id, 20);
    // drops the first stream, which the client reopens after 1s
    server.drop();
    await waitFor(() => g?.tasks.streamId === '2');
    assert.equal((await done).status.key, 'ended');
    assert.equal(pollsSinceReopen, 2);
  });

  it('reports every change of the stream as task:stream', async () => {
    server = await fakeServer((req, res) => {
      if (req.url !== STREAM) {
        res.writeHead(404).end();
        return;
      }
      const streams = /** @type {NonNullable<typeof server>} */ (server).count;
      openStream(res, `${streams}`);
      if (streams === 1) {
        setTimeout(() => res.socket?.destroy(), 50);
      }
    });
    g = client(server.url, { taskEvents: false });
    /** @type {unknown[]} */
    const changes = [];
    g.on('task:stream', (c) => changes.push([c.state, c.id]));
    g.tasks.connect();
    await waitFor(() => g?.tasks.streamId === '2');
    g.tasks.disconnect();
    assert.deepEqual(changes, [
      ['connecting', undefined],
      ['open', '1'],
      ['closed', undefined],
      ['connecting', undefined],
      ['open', '2'],
      ['idle', undefined],
    ]);
  });

  it('closes the stream while the page is hidden', async () => {
    const doc = Object.assign(new EventTarget(), { hidden: false });
    /** @type {any} */ (globalThis).document = doc;
    try {
      server = await fakeServer((req, res) => {
        openStream(res, `${/** @type {NonNullable<typeof server>} */ (server).count}`);
      });
      g = client(server.url, { pauseWhenHidden: true });
      assert.equal(await g.tasks.opened(1000), true);
      assert.equal(g.tasks.streamId, '1');

      doc.hidden = true;
      doc.dispatchEvent(new Event('visibilitychange'));
      assert.equal(g.tasks.streamState, 'idle');
      assert.equal(g.tasks.transport, 'poll');

      doc.hidden = false;
      doc.dispatchEvent(new Event('visibilitychange'));
      assert.equal(await g.tasks.opened(1000), true);
      assert.equal(g.tasks.streamId, '2');
    } finally {
      delete (/** @type {any} */ (globalThis).document);
    }
  });
});
