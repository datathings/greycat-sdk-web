// @ts-check
import { describe, before, it } from 'node:test';
import assert from 'node:assert/strict';

import { initLocal } from './helpers.js';

/**
 * `read_vi64` / `read_vu64` decode in float space while the value stays under
 * 2^53 and hand over to the BigInt reader past that. These walk the values
 * around every byte-width step and around the handover, where an off-by-one
 * would only show up on payloads big enough to carry large ints.
 */
describe('varint', () => {
  /** @type {gc.sdk.Abi} */
  let abi;

  before(async () => {
    abi = await initLocal();
  });

  /** @param {bigint | number} v */
  function roundtripInt(v) {
    const w = new gc.sdk.AbiWriter(abi);
    w.serialize(v);
    return new gc.sdk.AbiReader(abi, w.buffer.buffer).deserialize();
  }

  /** Values that sit on a varint byte boundary, on the 2^53 edge, or on the handover. */
  const edges = [];
  for (let bits = 0n; bits <= 63n; bits++) {
    const base = 1n << bits;
    edges.push(base - 1n, base, base + 1n);
    edges.push(-base - 1n, -base, -base + 1n);
  }
  edges.push(
    0n,
    1n,
    -1n,
    127n,
    128n,
    BigInt(Number.MAX_SAFE_INTEGER),
    BigInt(Number.MAX_SAFE_INTEGER) + 1n,
    BigInt(Number.MIN_SAFE_INTEGER),
    BigInt(Number.MIN_SAFE_INTEGER) - 1n,
    (1n << 63n) - 1n,
    -(1n << 63n),
  );

  it('round-trips every byte-width and handover boundary', () => {
    for (const v of edges) {
      // Out of i64 range is not representable; the writer would reject it.
      if (v < -(1n << 63n) || v > (1n << 63n) - 1n) {
        continue;
      }
      const back = roundtripInt(v);
      assert.equal(BigInt(back), v, `round-trip failed for ${v}`);
    }
  });

  it('returns a number inside the safe range and a bigint outside it', () => {
    for (const v of [0n, 1n, -1n, 1n << 40n, -(1n << 40n), BigInt(Number.MAX_SAFE_INTEGER)]) {
      assert.equal(typeof roundtripInt(v), 'number', `${v} should decode to a number`);
    }
    for (const v of [BigInt(Number.MAX_SAFE_INTEGER) + 1n, (1n << 63n) - 1n, -(1n << 63n)]) {
      assert.equal(typeof roundtripInt(v), 'bigint', `${v} should decode to a bigint`);
    }
  });

  /**
   * A `core::time` is an epoch in microseconds: 51 bits today, 52 once zigzagged,
   * so it needs the eighth varint byte. It is the most common wide value in a
   * real payload, which makes this the boundary worth pinning.
   */
  it('decodes microsecond timestamps as numbers', () => {
    const times = [
      1789740475891740n, // a sample taken from a live response
      BigInt(Date.UTC(2026, 0, 1)) * 1000n,
      BigInt(Date.UTC(1970, 0, 2)) * 1000n,
      BigInt(Date.UTC(2255, 0, 1)) * 1000n, // still under 2^53 once zigzagged
    ];
    for (const v of [...times, ...times.map((t) => -t)]) {
      const back = roundtripInt(v);
      assert.equal(typeof back, 'number', `${v} should decode to a number`);
      assert.equal(BigInt(back), v, `round-trip failed for ${v}`);
    }
  });

  it('round-trips a pseudo-random spread across the whole i64 range', () => {
    // Deterministic: a fixed LCG, so a failure is reproducible.
    let seed = 0x2545f491n;
    const next = () => {
      seed = (seed * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n);
      return seed;
    };
    for (let i = 0; i < 2000; i++) {
      const u = next();
      const v = u >= 1n << 63n ? u - (1n << 64n) : u;
      assert.equal(BigInt(roundtripInt(v)), v, `round-trip failed for ${v}`);
    }
  });
});
