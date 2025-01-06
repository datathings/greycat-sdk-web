import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class bool extends GCObject {
  static readonly _type = 'core::bool' as const;

  constructor(type: AbiType, public value: boolean = false) {
    super(type);
  }

  static create(value: boolean, g: GreyCat = $.default): std.core.bool {
    const ty = g.abi.types[g.abi.core.bool];
    return new ty.factory(ty, value) as std.core.bool;
  }

  static load(r: AbiReader, ty: AbiType): std.core.bool {
    const value = r.read_bool();
    return new ty.factory(ty, value) as std.core.bool;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.bool);
  }

  override saveContent(w: AbiWriter) {
    w.write_bool(this.value);
  }

  equals(other: std.core.bool): boolean {
    return this.value === other.value;
  }

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
