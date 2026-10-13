// @ts-check
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { describe, before, it } from 'node:test';

import '@greycat/web/sdk';
import { compileWasm } from '@greycat/web/sdk';
import { roundtrip } from './helpers.js';

/**
 * Every instance registers its own classes at `gc.<module>.<type>`, replacing those of the
 * instance initialized before it. `instanceof` still holds for the values of the earlier one.
 */
describe('instanceof across instances', () => {
  /** @type {gc.sdk.GreyCat} */
  let first;
  /** @type {Record<string, unknown>} values built by `first`, before `second` exists */
  let values;
  /** @type {typeof gc.core.Error} the class `first` registered */
  let FirstError;

  before(async () => {
    const bytes = await readFile(new URL('./abi.bin', import.meta.url));
    const wasm = await compileWasm();
    /** @param {string} name */
    const init = (name) =>
      gc.sdk.initWithAbi({
        name,
        abi: new gc.sdk.Abi(/** @type {ArrayBuffer} */ (bytes.buffer.slice(0))),
        module: wasm.module,
        exports: wasm.instance.exports,
      });

    first = init('first');
    FirstError = gc.core.Error;
    values = {
      time: new gc.core.time(1_700_000_000_000_000),
      duration: new gc.core.duration(42),
      node: new gc.core.node(7n),
      color: gc.tests.Color.green,
      error: first.create('core::Error', ['oops', []]),
      person: first.create('tests::Person', ['ada', 36, null]),
    };
    init('second');
  });

  it('registers the classes of the instance initialized last', () => {
    assert.notStrictEqual(gc.core.Error, FirstError);
  });

  it('holds for the values of an earlier instance', () => {
    assert.ok(values.time instanceof gc.core.time);
    assert.ok(values.duration instanceof gc.core.duration);
    assert.ok(values.node instanceof gc.core.node);
    assert.ok(values.color instanceof gc.tests.Color);
    assert.ok(values.error instanceof gc.core.Error);
    assert.ok(values.person instanceof gc.tests.Person);
  });

  it('holds for a value an earlier instance decodes', () => {
    const decoded = roundtrip(first.abi, values.person);
    assert.ok(decoded instanceof gc.tests.Person);
  });

  it('does not hold for a value of another type', () => {
    assert.ok(!(values.person instanceof gc.core.Error));
    assert.ok(!(values.error instanceof gc.tests.Person));
    assert.ok(!(values.time instanceof gc.core.duration));
    assert.ok(!(values.color instanceof gc.core.Error));
    /** @type {unknown[]} */
    const primitives = [null, 'oops', 1, 1n];
    for (const v of primitives) {
      assert.ok(!(v instanceof gc.core.Error));
      assert.ok(!(v instanceof gc.core.String));
    }
  });

  it('holds for a subclass only for its own instances', () => {
    class Sub extends gc.tests.Person {}
    assert.ok(!(values.person instanceof Sub));
    assert.ok(Object.create(Sub.prototype) instanceof Sub);
  });

  it('classifies the values of an earlier instance', () => {
    assert.ok(gc.sdk.isScalar(values.time));
    assert.ok(gc.sdk.isScalar(values.duration));
    assert.ok(gc.sdk.isScalar(values.color));
    assert.ok(!gc.sdk.isScalar(values.person));
    assert.ok(gc.sdk.isNode(values.node));
    assert.ok(!gc.sdk.isNode(values.person));
  });
});
