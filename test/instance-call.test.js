import assert from 'node:assert';
import { describe, before, after, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

describe('call on an instance', () => {
  /** @type {gc.sdk.GreyCat} */
  let g;

  before(async () => {
    g = await gc.sdk.init({ url: new URL(SERVER_URL) });
  });

  // the task event stream holds the process open otherwise
  after(() => g.tasks.disconnect());

  it('marks the static functions of the ABI', () => {
    assert.strictEqual(g.abi.fn_by_fqn.get('tests::Counter::add')?.is_static, false);
    assert.strictEqual(g.abi.fn_by_fqn.get('tests::Counter::create')?.is_static, true);
  });

  it('calls a static function without a receiver', async () => {
    const counter = await gc.tests.Counter.create(4);
    assert.strictEqual(counter.n, 4);
  });

  it('calls the method on the instance it is read from', async () => {
    const counter = gc.tests.Counter.createFrom({ n: 3 });
    assert.strictEqual(await counter.add(2), 5);
  });

  it('spawns the method on the instance it is read from', async () => {
    const counter = gc.tests.Counter.createFrom({ n: 3 });
    const task = await counter.add.spawn(10);
    assert.strictEqual(await g.await(task), 13);
  });

  it('passes the receiver first to GreyCat.call', async () => {
    assert.strictEqual(await g.call('tests::Counter::add', [gc.tests.Counter.createFrom({ n: 1 }), 1]), 2);
  });

  it('runs the override of the receiver type', async () => {
    assert.strictEqual(await gc.tests.Square.createFrom({ side: 2 }).name(), 'square');
  });

  // a class's own `name` is read-only, which the type-level function replaces
  it('installs a method named name on its type, the receiver first', async () => {
    assert.strictEqual(await gc.tests.Shape.name(gc.tests.Square.createFrom({ side: 2 })), 'square');
  });
});
