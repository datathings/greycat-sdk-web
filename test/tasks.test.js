import assert from 'node:assert';
import { describe, before, after, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

/**
 * Task tracking over the event stream and over the polling fallback. Both drive
 * `tests::slow`, which reports one progress step every `step_ms`.
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

describe('tasks', () => {
  describe('over the event stream', () => {
    /** @type {gc.sdk.GreyCat} */
    let g;

    before(async () => {
      g = await gc.sdk.init({ url: new URL(SERVER_URL) });
      await waitFor(() => g.tasks.streamState === 'open');
    });

    after(() => g.tasks.disconnect());

    it('opens the stream at init', () => {
      assert.strictEqual(g.tasks.transport, 'stream');
      assert.strictEqual(g.isPollingTasks(), false);
    });

    it('spawnAwait reports every progress step without polling', async () => {
      /** @type {(number | null)[]} */
      const progress = [];
      let polled = false;
      const result = await g.spawnAwait('tests::slow', [4, 50], {
        onprogress: (p) => {
          progress.push(p);
          polled ||= g.isPollingTasks();
        },
      });
      assert.strictEqual(result, 4);
      assert.strictEqual(polled, false, 'the poll fallback stayed off');
      // every step the server reported, then the `1` await always ends with
      const reported = progress.filter((p) => p !== null);
      assert.deepStrictEqual(reported, [0.25, 0.5, 0.75, 1, 1]);
    });

    it('emits task:update and task:settle for a tracked task', async () => {
      /** @type {string[]} */
      const statuses = [];
      const offUpdate = g.on('task:update', (t) => statuses.push(t.status.key));
      const settled = new Promise((resolve) => {
        const off = g.on('task:settle', (e) => {
          off();
          resolve(e);
        });
      });
      const task = await g.spawn('tests::slow', [2, 30]);
      const done = await g.tasks.wait(task.task_id);
      const settle = /** @type {any} */ (await settled);
      offUpdate();
      assert.strictEqual(done.status.key, 'ended');
      assert.strictEqual(settle.error, null);
      assert.strictEqual(settle.task.task_id, task.task_id);
      assert.ok(statuses.includes('ended'), `saw ${statuses}`);
    });

    it('settles a task that ended before it was tracked', async () => {
      const task = await g.spawn('tests::add', [1, 2]);
      await new Promise((r) => setTimeout(r, 200));
      const done = await g.tasks.wait(task.task_id);
      assert.strictEqual(done.status.key, 'ended');
    });

    it('rejects a failing task with a TaskError', async () => {
      const task = await g.spawn('tests::boom', []);
      await assert.rejects(g.tasks.wait(task.task_id), (err) => {
        assert.ok(err instanceof gc.sdk.TaskError);
        assert.strictEqual(err.reason, 'error');
        return true;
      });
    });

    it('runs a spawned task in the regular class by default', async () => {
      const cls = /** @type {gc.runtime.TaskClass} */ (await g.spawnAwait('tests::task_class'));
      assert.strictEqual(cls.key, 'regular');
    });

    it('runs a spawned task in the class it asks for', async () => {
      for (const taskClass of /** @type {const} */ (['small', 'regular', 'large'])) {
        const cls = /** @type {gc.runtime.TaskClass} */ (
          await g.spawnAwait('tests::task_class', [], { taskClass })
        );
        assert.strictEqual(cls.key, taskClass);
      }
    });
  });

  describe('over the polling fallback', () => {
    /** @type {gc.sdk.GreyCat} */
    let g;

    before(async () => {
      g = await gc.sdk.init({ name: 'polling', url: new URL(SERVER_URL), taskEvents: false });
    });

    it('never opens the stream', () => {
      assert.strictEqual(g.tasks.streamState, 'idle');
      assert.strictEqual(g.tasks.transport, 'poll');
    });

    it('spawnAwait reports progress by polling', async () => {
      /** @type {(number | null)[]} */
      const progress = [];
      let polled = false;
      const result = await g.spawnAwait('tests::slow', [4, 50], {
        pollEvery: 10,
        onprogress: (p) => {
          progress.push(p);
          polled ||= g.isPollingTasks();
        },
      });
      assert.strictEqual(result, 4);
      assert.strictEqual(polled, true, 'the poll fallback ran');
      const reported = progress.filter((p) => p !== null);
      assert.ok(reported.length > 0, 'saw some progress');
      assert.deepStrictEqual(reported, [...reported].sort((a, b) => a - b), 'monotonic');
      assert.strictEqual(g.isPollingTasks(), false, 'polling stops once settled');
    });
  });
});
