import assert from 'node:assert/strict';
import { describe, before, it } from 'node:test';

import '@greycat/web/sdk';
import { initLocal } from './helpers.js';

/** `Table.fromObjects` on arrays that carry no `$type`, which is what code builds by hand. */
describe('Table.fromObjects', () => {
  before(async () => {
    await initLocal();
  });

  const task = (id) =>
    gc.runtime.Task.createFrom({
      user_id: 1,
      user_name: 'root',
      task_id: id,
      creation: gc.core.time.fromMs(0),
      status: gc.runtime.TaskStatus.running,
      progress: 0.5,
    });

  it('takes the columns from the objects when they share a type', () => {
    const t = gc.core.Table.fromObjects([task(1), task(2)]);
    assert.deepEqual(t.headers, Object.keys(gc.runtime.Task.$fields));
    const idCol = t.headers.indexOf('task_id');
    assert.deepEqual(t.cols[idCol], [1, 2]);
  });

  it('still reads enumerable keys for plain objects', () => {
    const t = gc.core.Table.fromObjects([{ a: 1, b: 'x' }, { a: 2, b: 'y' }]);
    assert.deepEqual(t.headers, ['a', 'b']);
  });
});
