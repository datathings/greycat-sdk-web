import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '@greycat/web/sdk';

const here = dirname(fileURLToPath(import.meta.url));

/** Load the local ABI + WASM and return an Abi instance for offline ser/de. */
export async function initLocal() {
  const abiBuf = /** @type {ArrayBuffer} */ ((await readFile(join(here, 'abi.bin'))).buffer);
  const abi = new gc.sdk.Abi(abiBuf);
  const wasm = await gc.sdk.compileWasm();
  gc.sdk.initWithAbi({ abi, module: wasm.module, exports: wasm.instance.exports });
  return abi;
}

/**
 * Read a fixture .gcb and deserialize the single value it contains.
 * @param {gc.sdk.Abi} abi
 * @param {number} idx
 */
export async function readFixture(abi, idx) {
  const buf = /** @type {ArrayBuffer} */ (
    (await readFile(join(here, 'fixtures', `${idx}.gcb`))).buffer
  );
  const reader = new gc.sdk.AbiReader(abi, buf);
  reader.headers();
  return reader.deserialize();
}

/**
 * Round-trip a value: serialize it, then deserialize it, with no shared state.
 * @param {gc.sdk.Abi} abi
 * @param {unknown} value
 */
export function roundtrip(abi, value) {
  const writer = new gc.sdk.AbiWriter(abi);
  writer.serialize(value);
  return new gc.sdk.AbiReader(abi, writer.buffer.buffer).deserialize();
}

/**
 * Normalize a deserialized value into plain JSON-compatible data so it can be
 * compared with hand-written expected values. GCObjects expose `_type` + fields
 * via toJSON; GCEnums become their key string; Maps become plain objects;
 * bigints are preserved (encoded through `$bigint:` markers when out of safe
 * range so they survive JSON.stringify).
 * @param {unknown} value
 */
export function toPlain(value) {
  return JSON.parse(JSON.stringify(value, replacer), reviver);
}

/**
 * @param {string} _key
 * @param {unknown} value
 */
function replacer(_key, value) {
  if (typeof value === 'bigint') {
    if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
      return Number(value);
    }
    return `$bigint:${value}`;
  }
  if (value instanceof Map) {
    /** @type {Record<string, unknown>} */
    const obj = {};
    value.forEach((v, k) => {
      if (k === null) obj.null = v;
      else if (k === undefined) obj.undefined = v;
      else obj[String(k)] = v;
    });
    return obj;
  }
  return value;
}

/**
 * @param {string} _key
 * @param {unknown} value
 */
function reviver(_key, value) {
  if (typeof value === 'string' && value.startsWith('$bigint:')) {
    return BigInt(value.slice(8));
  }
  return value;
}

/**
 * Recursive deep-equal with float tolerance and optional structural projection.
 *
 * @param {unknown} actual
 * @param {unknown} expected
 * @param {{ epsilon?: number, partial?: string[] }} [opts]
 * @returns {{ ok: true } | { ok: false, path: string, actual: unknown, expected: unknown }}
 */
export function nearlyEqual(actual, expected, opts = {}) {
  const eps = opts.epsilon ?? 1e-9;
  /**
   * @param {unknown} a
   * @param {unknown} b
   * @param {string} path
   * @returns {{ ok: true } | { ok: false, path: string, actual: unknown, expected: unknown }}
   */
  const walk = (a, b, path) => {
    if (a === b) return { ok: true };
    if (typeof a === 'number' && typeof b === 'number') {
      if (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= eps) {
        return { ok: true };
      }
      return { ok: false, path, actual: a, expected: b };
    }
    if (typeof a === 'bigint' && typeof b === 'bigint') {
      return a === b ? { ok: true } : { ok: false, path, actual: a, expected: b };
    }
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
      return { ok: false, path, actual: a, expected: b };
    }
    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return { ok: false, path, actual: a, expected: b };
      }
      for (let i = 0; i < a.length; i++) {
        const r = walk(a[i], b[i], `${path}[${i}]`);
        if (!r.ok) return r;
      }
      return { ok: true };
    }
    const keys = opts.partial ?? Object.keys(/** @type {object} */ (b));
    for (const k of keys) {
      const r = walk(
        /** @type {Record<string, unknown>} */ (a)[k],
        /** @type {Record<string, unknown>} */ (b)[k],
        path ? `${path}.${k}` : k,
      );
      if (!r.ok) return r;
    }
    return { ok: true };
  };
  return walk(actual, expected, '');
}

/**
 * Throw an AssertionError-like error with a clear path and actual/expected.
 * @param {unknown} actual
 * @param {unknown} expected
 * @param {{ epsilon?: number, partial?: string[] }} [opts]
 */
export function assertNearlyEqual(actual, expected, opts) {
  const r = nearlyEqual(actual, expected, opts);
  if (!r.ok) {
    const at = r.path ? ` at ${r.path}` : '';
    const err = new Error(
      `value mismatch${at}: actual=${stringify(r.actual)} expected=${stringify(r.expected)}`,
    );
    /** @type {any} */ (err).actual = r.actual;
    /** @type {any} */ (err).expected = r.expected;
    throw err;
  }
}

/** @param {unknown} v */
function stringify(v) {
  return JSON.stringify(v, (_, x) => (typeof x === 'bigint' ? `${x}n` : x));
}

export const SERVER_URL = process.env.GREYCAT_URL ?? 'http://127.0.0.1:8181';
