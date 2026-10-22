import assert from 'node:assert';
import { describe, before, after, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

/**
 * Aborting spawns and waits with an `AbortSignal`, over the event stream and over the polling
 * fallback. A signal given to a wait stops following the task, while `cancelSignal` and the
 * signal of a spawn cancel it on the server.
 */

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

/** @param {string} message */
function isReason(message) {
  /** @param {unknown} err */
  return (err) => err instanceof Error && err.message === message;
}

/** @param {unknown} err */
function isAbortError(err) {
  return err instanceof Error && err.name === 'AbortError';
}

/**
 * Resolves once task `id` settles as cancelled.
 * @param {gc.sdk.GreyCat} g
 * @param {gc.sdk.TaskId} id
 */
function assertCancelled(g, id) {
  return assert.rejects(g.tasks.wait(id, 10), (err) => {
    assert.ok(err instanceof gc.sdk.TaskError);
    assert.strictEqual(err.reason, 'cancelled');
    return true;
  });
}

for (const transport of /** @type {const} */ (['stream', 'poll'])) {
  describe(`aborting over the ${transport === 'stream' ? 'event stream' : 'polling fallback'}`, () => {
    /** @type {gc.sdk.GreyCat} */
    let g;
    /** @type {gc.sdk.TaskId[]} */
    let spawned;
    /** @type {() => void} */
    let off;

    before(async () => {
      g = await gc.sdk.init({
        name: `abort-${transport}`,
        url: new URL(SERVER_URL),
        taskEvents: transport === 'stream',
      });
      assert.strictEqual(g.tasks.transport, transport);
      spawned = [];
      off = g.on('task:spawn', (t) => spawned.push(t.task_id));
    });

    after(() => {
      off();
      g.tasks.disconnect();
    });

    it('spawn rejects with the abort reason while in flight, then cancels the task', async () => {
      const before = spawned.length;
      const controller = new AbortController();
      const spawning = g.spawn('tests::slow', [100, 50], controller.signal);
      controller.abort(new Error('superseded'));
      await assert.rejects(spawning, isReason('superseded'));
      await waitFor(() => spawned.length > before);
      await assertCancelled(g, spawned[spawned.length - 1]);
    });

    it('spawn rejects at once with a signal already aborted, and spawns nothing', async () => {
      const before = spawned.length;
      await assert.rejects(g.spawn('tests::slow', [100, 50], AbortSignal.abort()), isAbortError);
      assert.strictEqual(spawned.length, before);
    });

    it('spawn ignores an abort once it returned the task', async () => {
      const controller = new AbortController();
      const task = await g.spawn('tests::slow', [3, 20], controller.signal);
      controller.abort();
      assert.strictEqual(await g.await(task, { pollEvery: 10 }), 3);
    });

    it('await aborted through its signal rejects and leaves the task running', async () => {
      const task = await g.spawn('tests::slow', [6, 50]);
      const controller = new AbortController();
      const waiting = g.await(task, { pollEvery: 10 }, controller.signal);
      controller.abort(new Error('unmounted'));
      await assert.rejects(waiting, isReason('unmounted'));
      assert.strictEqual(await g.await(task, { pollEvery: 10 }), 6);
    });

    it('await aborted through cancelSignal rejects and cancels the task', async () => {
      const task = await g.spawn('tests::slow', [100, 50]);
      const controller = new AbortController();
      const waiting = task.result({ pollEvery: 10, cancelSignal: controller.signal }, g);
      controller.abort(new Error('superseded'));
      await assert.rejects(waiting, isReason('superseded'));
      await assertCancelled(g, task.task_id);
    });

    it('spawnAwait aborted while the task runs cancels it', async () => {
      const before = spawned.length;
      const controller = new AbortController();
      const running = g.spawnAwait(
        'tests::slow',
        [100, 50],
        { pollEvery: 10, onprogress: () => controller.abort(new Error('superseded')) },
        controller.signal,
      );
      await assert.rejects(running, isReason('superseded'));
      assert.strictEqual(spawned.length, before + 1);
      await assertCancelled(g, spawned[spawned.length - 1]);
    });

    it('an aborted wait leaves the other waits of the same task alone', async () => {
      const task = await g.spawn('tests::slow', [3, 50]);
      const controller = new AbortController();
      const aborted = g.tasks.wait(task.task_id, 10, controller.signal);
      const kept = g.tasks.wait(task.task_id, 10);
      controller.abort();
      await assert.rejects(aborted, isAbortError);
      const done = await kept;
      assert.strictEqual(done.status.key, 'ended');
    });

    it('the latest of several spawns on one controller wins, the others are cancelled', async () => {
      const before = spawned.length;
      /** @type {AbortController | undefined} */
      let controller;
      /** @param {number} steps */
      const latest = (steps) => {
        controller?.abort();
        controller = new AbortController();
        return g.spawnAwait('tests::slow', [steps, 50], { pollEvery: 10 }, controller.signal);
      };
      const first = latest(100);
      const second = latest(100);
      const third = latest(2);
      await assert.rejects(first, isAbortError);
      await assert.rejects(second, isAbortError);
      assert.strictEqual(await third, 2);
      await waitFor(() => spawned.length === before + 3);
      const ids = spawned.slice(before);
      // the order the spawns were answered in is not the order they were sent in
      const settled = await Promise.allSettled(ids.map((id) => g.tasks.wait(id, 10)));
      assert.strictEqual(settled.filter((s) => s.status === 'fulfilled').length, 1);
      for (const s of settled.filter((s) => s.status === 'rejected')) {
        assert.strictEqual(/** @type {gc.sdk.TaskError} */ (s.reason).reason, 'cancelled');
      }
    });

    if (transport === 'poll') {
      it('a withdrawn wait stops polling the task', async () => {
        const task = await g.spawn('tests::slow', [100, 50]);
        const controller = new AbortController();
        const waiting = g.tasks.wait(task.task_id, 10, controller.signal);
        await waitFor(() => g.isPollingTasks());
        controller.abort();
        await assert.rejects(waiting, isAbortError);
        await waitFor(() => !g.isPollingTasks());
        await gc.runtime.Task.cancel(task.task_id, g);
      });

      it('disposing on(settle) stops polling the task', async () => {
        const task = await g.spawn('tests::slow', [100, 50]);
        let called = false;
        const dispose = task.on('settle', () => (called = true), 10, g);
        await waitFor(() => g.isPollingTasks());
        dispose();
        await waitFor(() => !g.isPollingTasks());
        await gc.runtime.Task.cancel(task.task_id, g);
        await new Promise((r) => setTimeout(r, 50));
        assert.strictEqual(called, false);
      });
    }
  });
}
