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
    });

    after(() => g.tasks.disconnect());

    it('opens the stream before init returns', () => {
      assert.strictEqual(g.tasks.streamState, 'open');
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

    it('reports a task as running before its first progress step', async () => {
      /** @type {gc.sdk.TaskEvent[]} */
      const events = [];
      const off = g.on('task:event', (e) => events.push(e));
      try {
        const task = await g.spawn('tests::slow', [1, 300]);
        await waitFor(() => events.some((e) => e.task.task_id === task.task_id));
        const first = /** @type {gc.sdk.TaskEvent} */ (events.find((e) => e.task.task_id === task.task_id));
        assert.strictEqual(first.kind, 'started');
        assert.strictEqual(first.task.status.key, 'running');
        assert.notStrictEqual(first.task.start, null);
        assert.strictEqual(first.task.progress, null);
        await g.tasks.wait(task.task_id);
      } finally {
        off();
      }
    });

    it('settles a task that ended before it was tracked', async () => {
      const task = await g.spawn('tests::add', [1, 2]);
      await new Promise((r) => setTimeout(r, 200));
      const done = await g.tasks.wait(task.task_id);
      assert.strictEqual(done.status.key, 'ended');
    });

    it('reports a pause on a breakpoint and the resume', async () => {
      /** @type {gc.sdk.TaskEvent[]} */
      const events = [];
      /** @type {string[]} */
      const statuses = [];
      // listening before the spawn, as the task may pause before its answer arrives
      const off = g.on('task:event', (e) => events.push(e));
      const task = await g.spawn('tests::paused');
      const unsubscribe = g.tasks.subscribe(task.task_id, (t) => statuses.push(t.status.key));
      try {
        await waitFor(() => statuses.includes('breakpoint'));
        // `tests::paused` is the only task of the suite that pauses
        const sessions = /** @type {(number | bigint)[]} */ (await g.call('runtime::Debug::all'));
        for (const session of sessions) {
          await g.call('runtime::Debug::resume', [session]);
        }
        const done = await g.tasks.wait(task.task_id);
        assert.strictEqual(done.status.key, 'ended');
        const kinds = events.filter((e) => e.task.task_id === task.task_id).map((e) => e.kind);
        assert.deepStrictEqual(kinds, ['started', 'breakpoint', 'resumed', 'complete']);
        assert.deepStrictEqual(statuses.slice(-3), ['breakpoint', 'running', 'ended']);
      } finally {
        off();
        unsubscribe();
      }
    });

    it('polls a task another instance spawned', async () => {
      const other = await gc.sdk.init({ name: 'other', url: new URL(SERVER_URL), taskEvents: false });
      const task = await other.spawn('tests::slow', [3, 50]);
      let polled = false;
      const off = g.tasks.subscribe(task.task_id, () => (polled ||= g.isPollingTasks()));
      try {
        const done = await g.tasks.wait(task.task_id);
        assert.strictEqual(done.status.key, 'ended');
        assert.strictEqual(polled, true);
      } finally {
        off();
      }
    });

    it('rejects a failing task with a TaskError', async () => {
      const task = await g.spawn('tests::boom', []);
      await assert.rejects(g.tasks.wait(task.task_id), (err) => {
        assert.ok(err instanceof gc.sdk.TaskError);
        assert.strictEqual(err.reason, 'error');
        return true;
      });
    });

    it('runs a spawned task in the medium class by default', async () => {
      const cls = /** @type {gc.runtime.TaskClass} */ (await g.spawnAwait('tests::task_class'));
      assert.strictEqual(cls.key, 'medium');
    });

    it('runs a task spawned through the generated binding in the class it asks for', async () => {
      const task = await gc.tests.task_class.spawn(g, undefined, 'large');
      const cls = /** @type {gc.runtime.TaskClass} */ (await g.await(task));
      assert.strictEqual(cls.key, 'large');
    });

    it('runs a spawned task in the class it asks for', async () => {
      for (const taskClass of /** @type {const} */ (['small', 'medium', 'large'])) {
        const cls = /** @type {gc.runtime.TaskClass} */ (
          await g.spawnAwait('tests::task_class', [], { taskClass })
        );
        assert.strictEqual(cls.key, taskClass);
      }
    });
  });

  // the server answers a task call to such a function (eg. `runtime::Task::running`) with
  // its value, marked with the `task: none` response header
  describe('a function the server cannot spawn', () => {
    /** @type {gc.sdk.GreyCat} */
    let g;
    /** @type {gc.runtime.Task[]} */
    let spawned;
    /** @type {() => void} */
    let off;

    before(async () => {
      g = await gc.sdk.init({ name: 'unspawnable', url: new URL(SERVER_URL), taskEvents: false });
      spawned = [];
      off = g.on('task:spawn', (t) => spawned.push(t));
    });

    after(() => off());

    it('is answered with its value to spawnAwait', async () => {
      /** @type {(number | null)[]} */
      const progress = [];
      const running = await g.spawnAwait('runtime::Task::running', [], {
        onprogress: (p) => progress.push(p),
      });
      assert.ok(Array.isArray(running));
      assert.deepStrictEqual(progress, [1]);
    });

    it('is refused by spawn', async () => {
      await assert.rejects(
        g.spawn('runtime::Task::running', []),
        /'runtime::Task::running' cannot be spawned/,
      );
    });

    it('is answered with its value to rawCall, even when asked for a task', async () => {
      const running = await g.rawCall('runtime::Task::running', [], undefined, 'large');
      assert.ok(Array.isArray(running));
    });

    it('never emits task:spawn', () => {
      assert.deepStrictEqual(spawned, []);
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
      assert.deepStrictEqual(
        reported,
        [...reported].sort((a, b) => a - b),
        'monotonic',
      );
      assert.strictEqual(g.isPollingTasks(), false, 'polling stops once settled');
    });
  });
});
