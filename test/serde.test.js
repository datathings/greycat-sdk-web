// @ts-check
import { describe, before, it } from 'node:test';

import { fixtures } from './fixtures.js';
import { initLocal, readFixture, roundtrip, toPlain, assertNearlyEqual } from './helpers.js';

describe('serde', () => {
  /** @type {gc.sdk.Abi} */
  let abi;

  before(async () => {
    abi = await initLocal();
  });

  // One file per fixture → tests are atomic. A single failure cannot desync the
  // others, so the first reported failure is always the actual root cause and
  // any single test can be run with `--test-name-pattern`.
  fixtures.forEach((fx, i) => {
    it(`#${i} ${fx.name}`, async () => {
      const actual = await readFixture(abi, i);
      const back = roundtrip(abi, actual);
      // Round-trip must reproduce the original deserialized shape exactly.
      // Both sides come from the same deserializer, so any drift is symmetric.
      assertNearlyEqual(toPlain(back), toPlain(actual), {
        epsilon: 0,
        partial: fx.partial,
      });
      // Compare against the JS-side expected value (with optional tolerance).
      assertNearlyEqual(toPlain(actual), fx.expected, {
        epsilon: fx.epsilon ?? 1e-9,
        partial: fx.partial,
      });
    });
  });
});
