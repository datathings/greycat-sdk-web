// @ts-check
import assert from 'node:assert';
import { describe, it } from 'node:test';

import '@greycat/web/sdk';

describe('io', () => {
  it('u32::max in vu32', () => {
    const writer = new gc.sdk.Writer(5);
    writer.write_vu64(4294967295n);
    const reader = new gc.sdk.Reader(writer.buffer.buffer);
    const x = reader.read_vu64();
    assert.strictEqual(x, 4294967295);
  });
});
