import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Emitter } from '@greycat/web/sdk';

describe('Emitter', () => {
  it('off removes what on added', () => {
    const e = new Emitter();
    let calls = 0;
    const listener = () => (calls += 1);
    e.on('ev', listener);
    e.emit('ev', 1);
    e.off('ev', listener);
    e.emit('ev', 2);
    assert.equal(calls, 1);
  });

  it('off removes every registration of the same listener', () => {
    const e = new Emitter();
    let calls = 0;
    const listener = () => (calls += 1);
    e.on('ev', listener);
    e.on('ev', listener);
    e.emit('ev', 1);
    assert.equal(calls, 2, 'a listener registered twice is called twice');
    e.off('ev', listener);
    e.emit('ev', 2);
    assert.equal(calls, 2);
  });

  it('off only touches the given type', () => {
    const e = new Emitter();
    /** @type {string[]} */
    const seen = [];
    const listener = (/** @type {string} */ d) => seen.push(d);
    e.on('a', listener);
    e.on('b', listener);
    e.off('a', listener);
    e.emit('a', 'a');
    e.emit('b', 'b');
    assert.deepEqual(seen, ['b']);
  });

  it('the disposer removes only its own registration', () => {
    const e = new Emitter();
    let calls = 0;
    const listener = () => (calls += 1);
    const off1 = e.on('ev', listener);
    e.on('ev', listener);
    off1();
    e.emit('ev', 1);
    assert.equal(calls, 1);
  });

  it('once fires a single time and can be removed early with off', () => {
    const e = new Emitter();
    let calls = 0;
    const listener = () => (calls += 1);
    e.once('ev', listener);
    e.emit('ev', 1);
    e.emit('ev', 2);
    assert.equal(calls, 1);

    e.once('ev', listener);
    e.off('ev', listener);
    e.emit('ev', 3);
    assert.equal(calls, 1);
  });
});
