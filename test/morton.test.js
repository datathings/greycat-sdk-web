// @ts-check
import assert from 'node:assert';
import { describe, it } from 'node:test';

import '@greycat/sdk';
const m = greycat.utils;

const INT32_MIN = -2147483648;
const INT32_MAX = 2147483647;
const UINT32_MAX = 2 ** 32 - 1;

const INT21_MIN = -1048576;
const INT21_MAX = -1048576;
const UINT21_MAX = 2 ** 21 - 1;

const INT16_MIN = -32768;
const INT16_MAX = 32767;
const UINT16_MAX = 2 ** 16 - 1;

const INT12_MIN = -2048;
const INT12_MAX = 2047;
const UINT12_MAX = 2 ** 12 - 1;

const INT10_MIN = -512;
const INT10_MAX = 511;
const UINT10_MAX = 2 ** 10 - 1;

const INT6_MIN = -32;
const INT6_MAX = 31;
const UINT6_MAX = 2 ** 6 - 1;

describe('morton', () => {
  it('2d', () => {
    const expected = [UINT32_MAX, 0];
    const actual = m.deinterleave64_2d(m.interleave64_2d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('3d', () => {
    const expected = [UINT21_MAX, 1337, 0];
    const actual = m.deinterleave64_3d(m.interleave64_3d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('4d', () => {
    const expected = [UINT16_MAX, 4096, 2048, 0];
    const actual = m.deinterleave64_4d(m.interleave64_4d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('5d', () => {
    const expected = [UINT12_MAX, 2048, 512, 128, 0];
    const actual = m.deinterleave64_5d(m.interleave64_5d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('6d', () => {
    const expected = [UINT10_MAX, 512, 256, 128, 64, 0];
    const actual = m.deinterleave64_6d(m.interleave64_6d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('10d', () => {
    const expected = [UINT6_MAX, 42, 37, 13, 5, 4, 3, 2, 1, 0];
    const actual = m.deinterleave64_10d(m.interleave64_10d.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('2di', () => {
    const expected = [INT32_MAX, INT32_MIN];
    const actual = m.deinterleave64_2di(m.interleave64_2di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('3di', () => {
    const expected = [INT21_MAX, -1, INT21_MIN];
    const actual = m.deinterleave64_3di(m.interleave64_3di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('4di', () => {
    const expected = [INT16_MAX, 1, -1, INT16_MIN];
    const actual = m.deinterleave64_4di(m.interleave64_4di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('5di', () => {
    const expected = [INT12_MAX, 1, 0, -1, INT12_MIN];
    const actual = m.deinterleave64_5di(m.interleave64_5di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('6di', () => {
    const expected = [INT10_MAX, 2, 1, 0, -1, INT10_MIN];
    const actual = m.deinterleave64_6di(m.interleave64_6di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('10di', () => {
    const expected = [INT6_MAX, 31, 2, 1, 0, -1, -2, -30, -31, INT6_MIN];
    const actual = m.deinterleave64_10di(m.interleave64_10di.apply(undefined, expected));
    assert.deepStrictEqual(actual, expected);
  });

  it('2fd', () => {
    const expected = [-3.1415, 42.1337];
    const actual = m.deinterleave64_2df(m.interleave64_2df.apply(undefined, expected));
    assert.ok(Math.abs(expected[0] - actual[0]) < 10e-5);
    assert.ok(Math.abs(expected[1] - actual[1]) < 10e-5);
  });

  it('3fd', () => {
    const expected = [-3.1415, 0.0, 42.1337];
    const actual = m.deinterleave64_3df(m.interleave64_3df.apply(undefined, expected));
    assert.ok(Math.abs(expected[0] - actual[0]) < 10e-3);
    assert.ok(Math.abs(expected[1] - actual[1]) < 10e-3);
    assert.ok(Math.abs(expected[2] - actual[2]) < 10e-3);
  });

  it('4fd', () => {
    const expected = [-3.1415, -1.42, 1.42, 42.1337];
    const actual = m.deinterleave64_4df(m.interleave64_4df.apply(undefined, expected));
    assert.ok(Math.abs(expected[0] - actual[0]) < 0.2);
    assert.ok(Math.abs(expected[1] - actual[1]) < 0.2);
    assert.ok(Math.abs(expected[2] - actual[2]) < 0.2);
    assert.ok(Math.abs(expected[3] - actual[3]) < 0.2);
  });
});
