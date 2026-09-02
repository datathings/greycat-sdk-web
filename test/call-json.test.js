import assert from 'node:assert';
import { describe, it } from 'node:test';

import { SERVER_URL } from './helpers.js';

/**
 * POST `args` as a JSON array to `/<fqn>` and return the parsed JSON response.
 * Throws if the server returns a non-2xx status.
 * @param {string} fqn 
 * @param {unknown[]} args 
 */
async function callJson(fqn, args) {
  const res = await fetch(`${SERVER_URL}/${fqn}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    const gc_err = /** @type {any} */ (await res.json());
    const err = new Error(`HTTP ${res.status}: ${gc_err.message}`);
    /** @type {any} */ (err).status = res.status;
    /** @type {any} */ (err).body = gc_err;
    throw err;
  }
  const text = await res.text();
  return text === '' ? null : JSON.parse(text);
}

describe('call (JSON)', () => {
  // Each it() is fully independent. JSON call uses raw fetch; no SDK state.
  // Single test: node --test --test-name-pattern="add"

  it('add(2, 3) -> 5', async () => {
    assert.strictEqual(await callJson('tests::add', [2, 3]), 5);
  });

  it('concat("hello", " world") -> "hello world"', async () => {
    assert.strictEqual(
      await callJson('tests::concat', ['hello', ' world']),
      'hello world',
    );
  });

  it('echo_any(42) -> 42', async () => {
    assert.strictEqual(await callJson('tests::echo_any', [42]), 42);
  });

  it('echo_any(null) -> null', async () => {
    assert.strictEqual(await callJson('tests::echo_any', [null]), null);
  });

  it('echo_any("text") -> "text"', async () => {
    assert.strictEqual(await callJson('tests::echo_any', ['text']), 'text');
  });

  it('echo_array([1,2,3]) -> [1,2,3]', async () => {
    assert.deepStrictEqual(
      await callJson('tests::echo_array', [[1, 2, 3]]),
      [1, 2, 3],
    );
  });

  it('sum_array([10,20,30]) -> 60', async () => {
    assert.strictEqual(
      await callJson('tests::sum_array', [[10, 20, 30]]),
      60,
    );
  });

  it('make_person("X", 5, null) -> Person', async () => {
    const result = await callJson('tests::make_person', ['X', 5, null]);
    assert.strictEqual(result?.name, 'X');
    assert.strictEqual(result?.age, 5);
    assert.strictEqual(result?.nickname, undefined);
  });

  it('make_person("Y", 1, "nick") -> Person', async () => {
    const result = await callJson('tests::make_person', ['Y', 1, 'nick']);
    assert.strictEqual(result?.name, 'Y');
    assert.strictEqual(result?.age, 1);
    assert.strictEqual(result?.nickname, 'nick');
  });

  it('no_result() -> null', async () => {
    assert.strictEqual(await callJson('tests::no_result', []), null);
  });

  it('boom() throws', async () => {
    await assert.rejects(callJson('tests::boom', []), /boom|HTTP/);
  });
});
