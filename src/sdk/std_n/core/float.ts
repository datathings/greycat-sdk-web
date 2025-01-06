import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class float extends GCObject {
  static readonly _type = 'core::float' as const;

  constructor(type: AbiType, public value: number = 0) {
    super(type);
  }

  static create(value: number, g: GreyCat = $.default): std.core.float {
    const ty = g.abi.types[g.abi.core.float];
    return new ty.factory(ty, value) as std.core.float;
  }

  static load(r: AbiReader, ty: AbiType): std.core.float {
    const value = r.read_f64();
    return new ty.factory(ty, value) as std.core.float;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.float);
  }

  override saveContent(w: AbiWriter) {
    w.write_f64(this.value);
  }

  equals(other: std.core.float): boolean {
    return this.value === other.value;
  }

  // ord(other: std.core.int): number {
  //   if (this.value === other.value) {
  //     return 0;
  //   }
  //   if (this.value < other.value) {
  //     return -1;
  //   }
  //   return 1;
  // }

  override toString() {
    return `${this.value}`;
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    return this.value;
  }
}
