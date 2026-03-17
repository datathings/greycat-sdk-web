import { describe, before, it } from 'node:test';
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';

import '@greycat/web/sdk';
const { Abi } = gc.sdk;

describe('std', () => {
  before(async () => {
    const buffer = /** @type {ArrayBuffer} */ ((await readFile('project.test.abi')).buffer);
    const wasm = await gc.sdk.compileWasm();
    gc.sdk.initWithAbi({
      abi: new Abi(buffer),
      module: wasm.module,
      exports: wasm.instance.exports,
    });
  });

  it('time + duration => time', () => {
    assert.deepStrictEqual(gc.core.time.create(40).add(gc.core.duration.create(2)), gc.core.time.create(42));
  });

  it('time - duration => time', () => {
    assert.deepStrictEqual(gc.core.time.create(45).sub(gc.core.duration.create(3)), gc.core.time.create(42));
  });

  it('time - time => duration', () => {
    assert.deepStrictEqual(gc.core.time.create(42).sub(gc.core.time.create(40)), gc.core.duration.create(2));
  });

  describe('duration', () => {
    it('0n => 0us', () => {
      assert.deepStrictEqual(gc.core.duration.create(0n).toString(), '0us');
    });

    it('1_000_000_000n => 16min 40', () => {
      assert.deepStrictEqual(gc.core.duration.create(1_000_000_000n).toString(), '16min 40s');
    });

    it('100_000_000_000_000n => 1157day 9hour 46min 40s', () => {
      assert.deepStrictEqual(gc.core.duration.create(100_000_000_000_000n).toString(), '1157day 9hour 46min 40s');
    });

    it('1year > 2days', () => {
      assert(gc.core.duration.from_years(1) > gc.core.duration.from_days(2));
    });

    it('42us == 42', () => {
      assert(gc.core.duration.create(42).valueOf() == 42);
    });
  });

  it('42time == 42', () => {
    assert(gc.core.time.create(42).valueOf() == 42);
  });
});
