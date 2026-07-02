import { GCObject } from '../../GCObject.js';
import type { Value } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Array<T extends Value = any> extends GCObject {
  static readonly _type = 'core::Array' as const;

  constructor(public values: T[] = []) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends Value = any>(value: globalThis.Array<T>, g: GreyCat = $.default): Array<T> {
    const ty = g.abi.types[g.abi.core.array];
    return new ty.ctor(value) as Array<T>;
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.values.length);
    w.write_array(this.values);
  }

  static override load<T extends Value = unknown>(r: AbiReader, type: AbiType): globalThis.Array<T> {
    const len = r.read_vu32();
    const arr = r.read_array(len) as globalThis.Array<T>;
    Object.defineProperty(arr, '$type', { value: type, enumerable: false });
    return arr;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.values[Symbol.iterator]();
  }

  override valueOf() {
    return this.values;
  }

  override toJSON() {
    return this.values;
  }
}
