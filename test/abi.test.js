// @ts-check
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { describe, before, it } from 'node:test';

import '@greycat/web/sdk';

describe('AbiType.generic()', () => {
  /** @type {gc.sdk.Abi} */
  let abi;

  before(async () => {
    const bytes = await readFile(new URL('./abi.bin', import.meta.url));
    abi = new gc.sdk.Abi(/** @type {ArrayBuffer} */ (bytes.buffer.slice(0)));
  });

  /** @param {string} name */
  const type = (name) => {
    const t = abi.types.find((t) => t.name === name);
    assert.ok(t, `type '${name}' is in the abi`);
    return t;
  };

  it('returns the native generic type of a specialised native type', () => {
    assert.strictEqual(type('core::node<core::int?>').generic(), type('core::node'));
  });

  it('returns the generic type of a specialised user type', () => {
    assert.strictEqual(type('tests::Box<core::int>').generic(), type('tests::Box'));
  });

  it('returns undefined for a type that is not a specialisation', () => {
    assert.strictEqual(type('core::node').generic(), undefined);
    assert.strictEqual(type('tests::Person').generic(), undefined);
  });
});
