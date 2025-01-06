import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, PrimitiveType, utils, $ } from '../../exports.js';

export class str extends GCObject {
  static readonly _type = 'core::str' as const;

  constructor(type: AbiType, public value: bigint = 0n) {
    super(type);
  }

  static create(value: bigint, g: GreyCat = $.default): str {
    const ty = g.abi.types[g.abi.core.str];
    return new ty.factory(ty, value) as str;
  }

  static fromString(s: string, g: GreyCat = $.default) {
    const ty = g.abi.types[g.abi.core.str];
    return new ty.factory(ty, utils.str_encode(s)) as str;
  }

  static load(r: AbiReader, ty: AbiType): str {
    const value = r.read_u64();
    return new ty.factory(ty, value) as str;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.str);
  }

  override saveContent(w: AbiWriter) {
    w.write_u64(this.value);
  }

  override toString() {
    return utils.str_decode(this.value);
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    return {
      _type: this.$type.name,
      value: this.toString(),
    };
  }
}
