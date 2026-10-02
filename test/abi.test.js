import assert from 'node:assert';
import { describe, before, after, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

describe('abi', () => {
  /** @type {gc.sdk.GreyCat} */
  let g;

  before(async () => {
    g = await gc.sdk.init({ url: new URL(SERVER_URL) });
  });

  // the task event stream holds the process open otherwise
  after(() => g.tasks.disconnect());

  it('flags the functions the HTTP thread answers itself as reserved', () => {
    const reserved = ['runtime::Task::running', 'runtime::Task::events', 'runtime::Runtime::abi'];
    for (const fqn of reserved) {
      assert.strictEqual(g.abi.fn_by_fqn.get(fqn)?.is_reserved, true, fqn);
    }
  });

  it('does not flag the other exposed functions', () => {
    const regular = ['tests::add', 'runtime::Runtime::info', 'runtime::Identity::current_id'];
    for (const fqn of regular) {
      assert.strictEqual(g.abi.fn_by_fqn.get(fqn)?.is_reserved, false, fqn);
    }
  });

  describe('a reserved function', () => {
    /** @type {gc.runtime.Task[]} */
    let spawned;
    /** @type {() => void} */
    let off;

    before(() => {
      spawned = [];
      off = g.on('task:spawn', (t) => spawned.push(t));
    });

    after(() => off());

    it('is called directly by spawnAwait, which returns its result', async () => {
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
        /cannot spawn the reserved function 'runtime::Task::running'/,
      );
    });

    it('is sent without a task header by rawCall, even when asked for one', async () => {
      const running = await g.rawCall('runtime::Task::running', [], undefined, 'large');
      assert.ok(Array.isArray(running));
    });

    it('never emits task:spawn', () => {
      assert.deepStrictEqual(spawned, []);
    });
  });
});
