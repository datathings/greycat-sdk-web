import type { AbiType, AbiReader, AbiWriter, Value, GreyCat } from '../../exports.js';
import { $, GCObject } from '../../exports.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Array<T extends Value = any> extends GCObject {
  static readonly _type = 'core::Array' as const;

  constructor(type: AbiType, public values: T[] = []) {
    super(type);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends Value = any>(
    value: globalThis.Array<T>,
    g: GreyCat = $.default,
  ): Array<T> {
    const ty = g.abi.types[g.abi.core.array];
    return new ty.factory(ty, value) as Array<T>;
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.values.length);
    w.write_array(this.values);
  }

  static load<T extends Value = unknown>(r: AbiReader): globalThis.Array<T> {
    const len = r.read_vu32();
    return r.read_array(len) as globalThis.Array<T>;
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
