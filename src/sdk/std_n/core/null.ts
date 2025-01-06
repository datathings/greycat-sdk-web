import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class null_ extends GCObject {
  static readonly _type = 'core::null' as const;

  constructor(type: AbiType) {
    super(type);
  }

  static create(g: GreyCat = $.default): std.core.null_ {
    const ty = g.abi.types[g.abi.core.null_];
    return new ty.factory(ty) as std.core.null_;
  }

  static load(_r: AbiReader, ty: AbiType): std.core.null_ {
    return new ty.factory(ty) as std.core.null_;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.null);
  }

  override saveContent() {
    // noop
  }

  override toString() {
    return `null`;
  }

  override valueOf() {
    return null;
  }

  override toJSON() {
    return null;
  }
}
