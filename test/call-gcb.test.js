import assert from 'node:assert';
import { describe, before, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

describe('call (GCB)', () => {
  /** @type {gc.sdk.GreyCat} */
  let g;

  before(async () => {
    g = await gc.sdk.init({ url: new URL(SERVER_URL) });
  });

  // Each it() is fully independent: it issues one HTTP call with a fresh
  // arg payload and asserts on the parsed return — no inter-test state.
  // To run a single one: node --test --test-name-pattern="add"

  it('add(2, 3) -> 5', async () => {
    const result = await g.call('project::add', [2, 3]);
    assert.strictEqual(result, 5);
  });

  it('concat("hello", " world") -> "hello world"', async () => {
    const result = await g.call('project::concat', ['hello', ' world']);
    assert.strictEqual(result, 'hello world');
  });

  it('echo_any(42) -> 42', async () => {
    const result = await g.call('project::echo_any', [42]);
    assert.strictEqual(result, 42);
  });

  it('echo_any(null) -> null', async () => {
    const result = await g.call('project::echo_any', [null]);
    assert.strictEqual(result, null);
  });

  it('echo_any("text") -> "text"', async () => {
    const result = await g.call('project::echo_any', ['text']);
    assert.strictEqual(result, 'text');
  });

  it('echo_array([1,2,3]) -> [1,2,3]', async () => {
    const result = await g.call('project::echo_array', [[1, 2, 3]]);
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('sum_array([10,20,30]) -> 60', async () => {
    const result = await g.call('project::sum_array', [[10, 20, 30]]);
    assert.strictEqual(result, 60);
  });

  it('make_person("X", 5, null) -> Person', async () => {
    const result = /** @type {any} */ (await g.call('project::make_person', ['X', 5, null]));
    assert.strictEqual(result.name, 'X');
    assert.strictEqual(result.age, 5);
    assert.strictEqual(result.nickname, null);
  });

  it('make_person("Y", 1, "nick") -> Person', async () => {
    const result = /** @type {any} */ (await g.call('project::make_person', ['Y', 1, 'nick']));
    assert.strictEqual(result.name, 'Y');
    assert.strictEqual(result.age, 1);
    assert.strictEqual(result.nickname, 'nick');
  });

  it('no_result() -> null', async () => {
    const result = await g.call('project::no_result', []);
    assert.strictEqual(result, null);
  });

  it('boom() throws', async () => {
    await assert.rejects(g.call('project::boom', []), /boom/);
  });
});
