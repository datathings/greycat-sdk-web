import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class type extends GCObject {
  static readonly _type = 'core::type' as const;

  constructor(type: AbiType, public type_id: number = 0) {
    super(type);
  }

  static create(type_id: number, g: GreyCat = $.default): std.core.type {
    const ty = g.abi.types[g.abi.core.type];
    return new ty.factory(ty, type_id) as std.core.type;
  }

  static load(r: AbiReader, ty: AbiType): std.core.type {
    const type_id = r.read_vu32();
    return new ty.factory(ty, type_id) as std.core.type;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.type);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu32(this.type_id);
  }

  override toString() {
    return this.$type.abi.types[this.type_id].name;
  }

  override toJSON() {
    return this.$type.abi.types[this.type_id].name;
  }
}
