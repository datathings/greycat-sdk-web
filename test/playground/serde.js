import assert from 'node:assert';

import '@greycat/web/sdk';
import { readBytes, displayValue } from './_utils.js';

await gc.sdk.init();

class MyCustomClass {
  /**
   * @param {gc.core.nodeTime[]=} value
   */
  constructor(value = []) {
    this.value = value;
  }
}

const nt0 = new gc.core.nodeTime(0n);
const nt1 = new gc.core.nodeTime(1n);
const nt2 = new gc.core.nodeTime(2n);
const nodes = new MyCustomClass([nt0, nt1, nt2]);

const data = gc.sdk.serializeToHex(nodes);
const res = gc.sdk.deserializeFromHex(data, {
  js_factory: { [MyCustomClass.name]: MyCustomClass },
});

assert.ok(res instanceof MyCustomClass);
assert.deepStrictEqual(res, nodes);
