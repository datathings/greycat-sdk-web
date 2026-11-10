import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, before, afterEach, it } from 'node:test';

import '@greycat/web/sdk';
import {
  STREAM,
  answer,
  fakeServer,
  frame,
  loadAbi,
  makeTask,
  openStream,
  polledIds,
  synced,
  waitFor,
} from './fake-server.js';

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

  /** @param {string} url @param {{ token?: string, taskEvents?: boolean, pauseWhenHidden?: boolean, name?: string }} [extra] */
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
    assert.ok(
      results.every((r) => r.status === 'rejected' && r.reason instanceof gc.sdk.HttpError && r.reason.status === 401),
    );
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

  it('follows the tasks a resumed stream took over, and polls the others once synced', async () => {
    /** @type {import('node:http').ServerResponse | undefined} */
    let stream;
    /** @type {number[][]} */
    const polled = [];
    let ended = false;
    server = await fakeServer(async (req, res) => {
      if (req.url === STREAM) {
        stream = res;
        openStream(res, '2', '7');
        return;
      }
      const ids = await polledIds(g, req);
      polled.push(ids);
      const status = ended ? gc.runtime.TaskStatus.ended : gc.runtime.TaskStatus.running;
      answer(
        g,
        res,
        ids.map((id) => makeTask(id, 1, status)),
      );
    });
    g = client(server.url);
    assert.equal(await g.tasks.opened(1000), true);
    const settled = g.tasks.wait(21, 20);
    const covered = g.tasks.wait(22, 20);
    const other = g.tasks.wait(23, 20);
    await waitFor(() => polled.some((ids) => ids.length === 3));

    // a task that ended while it moved is settled by its state
    stream?.write(frame(g, 'task-state', makeTask(21, 1, gc.runtime.TaskStatus.ended)));
    stream?.write(frame(g, 'task-state', makeTask(22, 1, gc.runtime.TaskStatus.running)));
    assert.equal((await settled).status.key, 'ended');
    stream?.write(synced(2));
    await new Promise((r) => setTimeout(r, 100));
    polled.length = 0;
    await waitFor(() => polled.length >= 3);
    assert.ok(
      polled.every((ids) => ids.length === 1 && ids[0] === 23),
      `only the task the stream did not take over is polled: ${JSON.stringify(polled)}`,
    );

    stream?.write(frame(g, 'task-complete', makeTask(22, 1, gc.runtime.TaskStatus.ended)));
    assert.equal((await covered).status.key, 'ended');
    ended = true;
    assert.equal((await other).status.key, 'ended');
  });

  it('hands the state a resumed stream sent over to a later consumer, without a lookup', async () => {
    /** @type {import('node:http').ServerResponse | undefined} */
    let stream;
    let polls = 0;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        stream = res;
        openStream(res, '2', '7');
        res.write(frame(g, 'task-state', makeTask(24, 1, gc.runtime.TaskStatus.running)));
        res.write(synced(1));
        return;
      }
      polls += 1;
      answer(g, res, [makeTask(24, 1, gc.runtime.TaskStatus.running)]);
    });
    g = client(server.url);
    /** @type {gc.runtime.Task[]} */
    const states = [];
    g.on('task:event', (e) => {
      if (e.kind === 'state') {
        states.push(e.task);
      }
    });
    await waitFor(() => states.length === 1);
    /** @type {number[]} */
    const progress = [];
    g.tasks.subscribe(24, (t) => progress.push(t.progress ?? -1));
    await waitFor(() => progress.length === 1);
    assert.deepEqual(progress, [0.5]);
    const done = g.tasks.wait(24, 20);
    stream?.write(frame(g, 'task-complete', makeTask(24, 1, gc.runtime.TaskStatus.ended)));
    assert.equal((await done).status.key, 'ended');
    assert.equal(polls, 0);
  });

  it('keeps polling a task taken over by a stream until the stream is synced', async () => {
    /** @type {import('node:http').ServerResponse | undefined} */
    let stream;
    let polls = 0;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        stream = res;
        openStream(res, '2', '7');
        return;
      }
      polls += 1;
      answer(g, res, [makeTask(25, 1, gc.runtime.TaskStatus.running)]);
    });
    g = client(server.url);
    assert.equal(await g.tasks.opened(1000), true);
    const done = g.tasks.wait(25, 20);
    await waitFor(() => polls > 0);
    stream?.write(frame(g, 'task-state', makeTask(25, 1, gc.runtime.TaskStatus.running)));
    const before = polls;
    await waitFor(() => polls >= before + 3);
    stream?.write(synced(1));
    await new Promise((r) => setTimeout(r, 100));
    const after = polls;
    await new Promise((r) => setTimeout(r, 200));
    assert.equal(polls, after, 'synced stops the polling');
    stream?.write(frame(g, 'task-complete', makeTask(25, 1, gc.runtime.TaskStatus.ended)));
    assert.equal((await done).status.key, 'ended');
  });

  describe('resume', () => {
    /** @type {gc.sdk.GreyCat[]} */
    let others = [];

    afterEach(() => {
      for (const other of others) {
        other.tasks.disconnect();
      }
      others = [];
      sessionStorage.clear();
      delete (/** @type {any} */ (globalThis).window);
    });

    /** A page whose `pagehide` and `pageshow` the test fires. */
    function page() {
      const win = new EventTarget();
      /** @type {any} */ (globalThis).window = win;
      return win;
    }

    /**
     * A server opening stream `n` as the `n`th stream request, in run `run`, and recording
     * the `sse-resume` header of each. A `null` run is a core that cannot resume a stream.
     * @param {string | null} run
     */
    async function resumingServer(run = '7') {
      /** @type {(string | undefined)[]} */
      const resumes = [];
      const s = await fakeServer((req, res) => {
        if (req.url !== STREAM) {
          res.writeHead(404).end();
          return;
        }
        const header = req.headers['sse-resume'];
        resumes.push(Array.isArray(header) ? header.join(',') : header);
        openStream(res, `${resumes.length}`, run ?? undefined);
        res.write(synced(0));
      });
      return { server: s, resumes };
    }

    /** @param {gc.sdk.GreyCat} instance */
    const recorded = (instance) => sessionStorage.getItem(`greycat:task-stream:default@${instance.api}`);

    it('records the run and id of the stream, and resumes it on the next page of the tab', async () => {
      const win = page();
      const { server: s, resumes } = await resumingServer();
      server = s;
      const first = client(s.url);
      others.push(first);
      assert.equal(await first.tasks.opened(1000), true);
      assert.equal(recorded(first), '7:1');

      // the page is left for another one of the same tab
      win.dispatchEvent(new Event('pagehide'));
      g = client(s.url);
      assert.equal(await g.tasks.opened(1000), true);
      assert.deepEqual(resumes, [undefined, '7:1'], 'an id read from the tab is never claimed');
      assert.equal(recorded(g), '7:2');
    });

    it('claims its own stream back from the back/forward cache, never one another page took', async () => {
      const { server: s, resumes } = await resumingServer();
      server = s;
      /** @param {boolean} persisted */
      const pageshow = (persisted) => Object.assign(new Event('pageshow'), { persisted });
      const first = page();
      g = client(s.url);
      assert.equal(await g.tasks.opened(1000), true);
      first.dispatchEvent(new Event('pagehide'));
      first.dispatchEvent(pageshow(true));
      assert.equal(await g.tasks.opened(1000), true);
      assert.deepEqual(resumes, [undefined, '7:1; claim'], 'the record is still its own');

      first.dispatchEvent(new Event('pagehide'));
      // the next page of the tab resumes the stream and records its own
      const second = page();
      const next = client(s.url);
      others.push(next);
      assert.equal(await next.tasks.opened(1000), true);
      second.dispatchEvent(new Event('pagehide'));
      assert.equal(recorded(next), '7:3');

      first.dispatchEvent(pageshow(true));
      await waitFor(() => g?.tasks.streamId === '4');
      assert.deepEqual(resumes, [undefined, '7:1; claim', '7:2', '7:3']);
    });

    it('claims its own stream when it reconnects after a drop', async () => {
      const { server: s, resumes } = await resumingServer();
      server = s;
      g = client(s.url);
      assert.equal(await g.tasks.opened(1000), true);
      s.drop();
      await waitFor(() => g?.tasks.streamId === '2');
      assert.deepEqual(resumes, [undefined, '7:1; claim']);
    });

    it('opens a fresh stream when another live instance holds the recorded one', async () => {
      page();
      const { server: s, resumes } = await resumingServer();
      server = s;
      // the opener of a tab whose record the new tab copied, paused but still in use
      const opener = client(s.url);
      others.push(opener);
      assert.equal(await opener.tasks.opened(1000), true);
      opener.tasks.disconnect();

      g = client(s.url);
      assert.equal(await g.tasks.opened(1000), true);
      assert.deepEqual(resumes, [undefined, undefined]);
      assert.equal(recorded(g), '7:2');
    });

    it('resumes nothing after a change of credentials', async () => {
      page();
      const { server: s, resumes } = await resumingServer();
      server = s;
      g = client(s.url, { token: 'first' });
      assert.equal(await g.tasks.opened(1000), true);
      g.token = 'second';
      await waitFor(() => g?.tasks.streamId === '2');
      s.drop();
      await waitFor(() => g?.tasks.streamId === '3');
      assert.deepEqual(resumes, [undefined, undefined, '7:2; claim']);
    });

    it('polls nothing while the page is hidden, and resumes the stream once visible', async () => {
      page();
      const doc = Object.assign(new EventTarget(), { hidden: false });
      /** @type {any} */ (globalThis).document = doc;
      /** @param {boolean} hidden */
      const show = (hidden) => {
        doc.hidden = hidden;
        doc.dispatchEvent(new Event('visibilitychange'));
      };
      try {
        /** @type {(string | undefined)[]} */
        const resumes = [];
        /** @type {import('node:http').ServerResponse | undefined} */
        let stream;
        /** @type {number[][]} */
        const polled = [];
        server = await fakeServer(async (req, res) => {
          if (req.url === STREAM) {
            stream = res;
            const header = req.headers['sse-resume'];
            resumes.push(Array.isArray(header) ? header.join(',') : header);
            openStream(res, `${resumes.length}`, '7');
            if (header !== undefined) {
              res.write(frame(g, 'task-state', makeTask(31, 1, gc.runtime.TaskStatus.running)));
              res.write(synced(1));
            }
            return;
          }
          const ids = await polledIds(g, req);
          polled.push(ids);
          answer(
            g,
            res,
            ids.map((id) => makeTask(id, 1, id === 32 ? gc.runtime.TaskStatus.ended : gc.runtime.TaskStatus.running)),
          );
        });
        g = client(server.url, { pauseWhenHidden: true });
        assert.equal(await g.tasks.opened(1000), true);
        const resumed = g.tasks.wait(31, 20);
        await waitFor(() => polled.length > 0);

        show(true);
        const ended = g.tasks.wait(32, 20);
        await new Promise((r) => setTimeout(r, 50));
        const before = polled.length;
        await new Promise((r) => setTimeout(r, 200));
        assert.equal(polled.length, before, 'nothing is polled while hidden');
        assert.equal(g.isPollingTasks(), false);

        show(false);
        assert.equal((await ended).status.key, 'ended');
        assert.deepEqual(resumes, [undefined, '7:1; claim'], 'its own stream, closed by the pause, is claimed');
        await new Promise((r) => setTimeout(r, 100));
        polled.length = 0;
        await new Promise((r) => setTimeout(r, 200));
        assert.deepEqual(polled, [], 'the task the stream took over is not polled');
        stream?.write(frame(g, 'task-complete', makeTask(31, 1, gc.runtime.TaskStatus.ended)));
        assert.equal((await resumed).status.key, 'ended');
      } finally {
        delete (/** @type {any} */ (globalThis).document);
      }
    });

    it('opens a fresh stream, and takes a new token, where the page may not use sessionStorage', async () => {
      page();
      const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
      Object.defineProperty(globalThis, 'sessionStorage', {
        configurable: true,
        get() {
          throw new DOMException('The operation is insecure.', 'SecurityError');
        },
      });
      try {
        const { server: s, resumes } = await resumingServer();
        server = s;
        g = client(s.url, { token: 'first' });
        assert.equal(await g.tasks.opened(1000), true);
        g.token = 'second';
        await waitFor(() => g?.tasks.streamId === '2');
        assert.deepEqual(resumes, [undefined, undefined]);
      } finally {
        Object.defineProperty(globalThis, 'sessionStorage', /** @type {PropertyDescriptor} */ (descriptor));
      }
    });

    it('resumes nothing with a core that sends no run', async () => {
      page();
      const { server: s, resumes } = await resumingServer(null);
      server = s;
      g = client(s.url);
      assert.equal(await g.tasks.opened(1000), true);
      assert.equal(recorded(g), null);
      s.drop();
      await waitFor(() => g?.tasks.streamId === '2');
      assert.deepEqual(resumes, [undefined, undefined]);
    });
  });

  it('delivers to a listener attached right after init the states a resumed stream sends at once', async () => {
    const helper = client('http://127.0.0.1:1', { taskEvents: false, name: 'helper' });
    const abiBytes = await readFile(new URL('./abi.bin', import.meta.url));
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        openStream(res, '2', '7');
        res.write(frame(helper, 'task-state', makeTask(41, 1, gc.runtime.TaskStatus.running)));
        res.write(synced(1));
        return;
      }
      if (req.url === '/runtime::Runtime::abi') {
        res.writeHead(200, { 'content-type': 'application/octet-stream' }).end(abiBytes);
        return;
      }
      if (req.url === '/runtime::Identity::permissions') {
        answer(helper, res, ['api']);
        return;
      }
      res.writeHead(404).end();
    });
    g = /** @type {gc.sdk.GreyCat} */ (await gc.sdk.init({ url: new URL(server.url), identityWorld: false }));
    /** @type {unknown[]} */
    const events = [];
    g.on('task:event', (e) => events.push([e.kind, e.task.task_id]));
    assert.equal(g.tasks.streamState, 'open');
    await waitFor(() => events.length === 1);
    assert.deepEqual(events, [['state', 41]]);
    assert.deepEqual(
      g.tasks.followed().map((t) => t.task_id),
      [41],
    );
  });

  it('lists the tasks the stream followed since it took them over', async () => {
    /** @type {import('node:http').ServerResponse | undefined} */
    let stream;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        stream = res;
        openStream(res, '2', '7');
        res.write(frame(g, 'task-state', makeTask(51, 1, gc.runtime.TaskStatus.running)));
        res.write(frame(g, 'task-state', makeTask(52, 1, gc.runtime.TaskStatus.running)));
        res.write(synced(2));
        return;
      }
      res.writeHead(404).end();
    });
    g = client(server.url);
    /** @type {gc.runtime.Task[]} */
    let followed = [];
    g.on('task:event', () => (followed = g?.tasks.followed() ?? []));
    await waitFor(() => followed.length === 2);
    assert.deepEqual(
      followed.map((t) => t.task_id),
      [51, 52],
    );
    followed.pop();
    assert.equal(g.tasks.followed().length, 2, 'a copy');

    stream?.write(frame(g, 'task-complete', makeTask(51, 1, gc.runtime.TaskStatus.ended)));
    await waitFor(() => g?.tasks.followed().length === 1);
    assert.equal(g.tasks.followed()[0].task_id, 52);

    g.tasks.disconnect();
    assert.deepEqual(g.tasks.followed(), []);
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

  it('shares the stream with a clone, until the clone gets a token of its own', async () => {
    /** @type {(string | undefined)[]} */
    const streamAuths = [];
    /** @type {unknown} */
    let named;
    server = await fakeServer((req, res) => {
      if (req.url === STREAM) {
        streamAuths.push(req.headers.authorization);
        openStream(res, `${streamAuths.length}`);
        return;
      }
      if (req.url === '/tests::slow') {
        named = req.headers.sse;
        answer(g, res, makeTask(7, 1, gc.runtime.TaskStatus.waiting));
        return;
      }
      answer(g, res, [makeTask(7, 1, gc.runtime.TaskStatus.ended)]);
    });
    g = client(server.url, { token: 'first' });
    assert.equal(await g.tasks.opened(1000), true);
    const copy = g.clone('copy');
    try {
      assert.equal(copy.tasks, g.tasks);
      /** @type {unknown[]} */
      const settled = [];
      g.on('task:settle', (e) => settled.push(e.task?.task_id));
      const task = await copy.spawn('tests::slow', [1, 1]);
      await copy.tasks.wait(task.task_id);
      assert.equal(named, '1', 'the clone names the stream of its original');
      assert.deepEqual(settled, [7], 'its tasks are tracked by the original');

      copy.token = 'second';
      assert.notEqual(copy.tasks, g.tasks);
      await waitFor(() => copy.tasks.streamId === '2');
      assert.deepEqual(streamAuths, ['first', 'second']);
      assert.equal(g.tasks.streamId, '1', 'the original keeps its stream');
    } finally {
      copy.tasks.disconnect();
    }
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

  it('closes the stream when the page is left and reopens it back from the back/forward cache', async () => {
    const win = new EventTarget();
    /** @type {any} */ (globalThis).window = win;
    /** @param {boolean} persisted */
    const pageshow = (persisted) => Object.assign(new Event('pageshow'), { persisted });
    try {
      server = await fakeServer((req, res) => {
        openStream(res, `${/** @type {NonNullable<typeof server>} */ (server).count}`);
      });
      g = client(server.url);
      assert.equal(await g.tasks.opened(1000), true);
      assert.equal(g.tasks.streamId, '1');

      // a link followed: the page may be kept frozen, its open fetches with it
      win.dispatchEvent(new Event('pagehide'));
      assert.equal(g.tasks.streamState, 'idle');
      assert.equal(g.tasks.transport, 'poll');
      // a page shown for the first time is not a return
      win.dispatchEvent(pageshow(false));
      assert.equal(g.tasks.streamState, 'idle');

      win.dispatchEvent(pageshow(true));
      assert.equal(await g.tasks.opened(1000), true);
      assert.equal(g.tasks.streamId, '2');
    } finally {
      delete (/** @type {any} */ (globalThis).window);
    }
  });
});
