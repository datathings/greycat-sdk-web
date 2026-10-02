import assert from 'node:assert';
import { describe, before, after, it } from 'node:test';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';

describe('call (GCB)', () => {
  /** @type {gc.sdk.GreyCat} */
  let g;

  before(async () => {
    g = await gc.sdk.init({ url: new URL(SERVER_URL) });
  });

  // the task event stream holds the process open otherwise
  after(() => g.tasks.disconnect());

  // Each it() is fully independent: it issues one HTTP call with a fresh
  // arg payload and asserts on the parsed return — no inter-test state.
  // To run a single one: node --test --test-name-pattern="add"

  it('add(2, 3) -> 5', async () => {
    const result = await g.call('tests::add', [2, 3]);
    assert.strictEqual(result, 5);
  });

  it('concat("hello", " world") -> "hello world"', async () => {
    const result = await g.call('tests::concat', ['hello', ' world']);
    assert.strictEqual(result, 'hello world');
  });

  it('echo_any(42) -> 42', async () => {
    const result = await g.call('tests::echo_any', [42]);
    assert.strictEqual(result, 42);
  });

  it('echo_any(null) -> null', async () => {
    const result = await g.call('tests::echo_any', [null]);
    assert.strictEqual(result, null);
  });

  it('echo_any("text") -> "text"', async () => {
    const result = await g.call('tests::echo_any', ['text']);
    assert.strictEqual(result, 'text');
  });

  it('echo_array([1,2,3]) -> [1,2,3]', async () => {
    const result = await g.call('tests::echo_array', [[1, 2, 3]]);
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('sum_array([10,20,30]) -> 60', async () => {
    const result = await g.call('tests::sum_array', [[10, 20, 30]]);
    assert.strictEqual(result, 60);
  });

  it('make_person("X", 5, null) -> Person', async () => {
    const result = /** @type {any} */ (await g.call('tests::make_person', ['X', 5, null]));
    assert.strictEqual(result.name, 'X');
    assert.strictEqual(result.age, 5);
    assert.strictEqual(result.nickname, null);
  });

  it('make_person("Y", 1, "nick") -> Person', async () => {
    const result = /** @type {any} */ (await g.call('tests::make_person', ['Y', 1, 'nick']));
    assert.strictEqual(result.name, 'Y');
    assert.strictEqual(result.age, 1);
    assert.strictEqual(result.nickname, 'nick');
  });

  it('no_result() -> null', async () => {
    const result = await g.call('tests::no_result', []);
    assert.strictEqual(result, null);
  });

  it('boom() throws', async () => {
    await assert.rejects(g.call('tests::boom', []), /boom/);
  });

  it('an error answered without a body throws an HttpError, not an ABI mismatch', async () => {
    let mismatch = false;
    const handler = g.abiMismatchHandler;
    g.abiMismatchHandler = () => (mismatch = true);
    try {
      // the server answers 400 with an empty body to a `task` header naming no class
      const bogus = /** @type {any} */ ('bogus');
      await assert.rejects(g.rawCall('tests::add', [1, 2], undefined, bogus), (err) => {
        assert.ok(err instanceof gc.sdk.HttpError);
        assert.strictEqual(err.status, 400);
        return true;
      });
    } finally {
      g.abiMismatchHandler = handler;
    }
    assert.strictEqual(mismatch, false);
  });
});
