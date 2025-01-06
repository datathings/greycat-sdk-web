import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, PrimitiveType, utils, $ } from '../../exports.js';

export class t2f extends GCObject {
  static readonly _type = 'core::t2f' as const;

  constructor(type: AbiType, public x0: number = 0, public x1: number = 0) {
    super(type);
  }

  static create(x0: number, x1: number, g: GreyCat = $.default): t2f {
    const ty = g.abi.types[g.abi.core.t2f];
    return new ty.factory(ty, x0, x1) as t2f;
  }

  static load(r: AbiReader, ty: AbiType): t2f {
    const [x0, x1] = utils.deinterleave64_2df(r.read_u64());
    return new ty.factory(ty, x0, x1) as t2f;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.t2f);
  }

  override saveContent(w: AbiWriter) {
    w.write_u64(utils.interleave64_2df(this.x0, this.x1));
  }

  override toJSON() {
    return {
      _type: this.$type.name,
      x0: this.x0,
      x1: this.x1,
    };
  }
}
