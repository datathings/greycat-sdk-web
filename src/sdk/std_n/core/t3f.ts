import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, PrimitiveType, utils, $ } from '../../exports.js';

export class t3f extends GCObject {
  static readonly _type = 'core::t3f' as const;

  constructor(type: AbiType, public x0: number = 0, public x1: number = 0, public x2: number = 0) {
    super(type);
  }

  static create(x0: number, x1: number, x2: number, g: GreyCat = $.default): t3f {
    const ty = g.abi.types[g.abi.core.t3f];
    return new ty.factory(ty, x0, x1, x2) as t3f;
  }

  static load(r: AbiReader, ty: AbiType): t3f {
    const [x0, x1, x2] = utils.deinterleave64_3df(r.read_u64());
    return new ty.factory(ty, x0, x1, x2) as t3f;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.t3f);
  }

  override saveContent(w: AbiWriter) {
    w.write_u64(utils.interleave64_3df(this.x0, this.x1, this.x2));
  }

  override toJSON() {
    return {
      _type: this.$type.name,
      x0: this.x0,
      x1: this.x1,
      x2: this.x2,
    };
  }
}
