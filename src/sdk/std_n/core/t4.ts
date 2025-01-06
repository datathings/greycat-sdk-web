import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, PrimitiveType, utils, $ } from '../../exports.js';

export class t4 extends GCObject {
  static readonly _type = 'core::t4' as const;

  constructor(
    type: AbiType,
    public x0: number = 0,
    public x1: number = 0,
    public x2: number = 0,
    public x3: number = 0,
  ) {
    super(type);
  }

  static create(x0: number, x1: number, x2: number, x3: number, g: GreyCat = $.default): t4 {
    const ty = g.abi.types[g.abi.core.t4];
    return new ty.factory(ty, x0, x1, x2, x3) as t4;
  }

  static load(r: AbiReader, ty: AbiType): t4 {
    const [x0, x1, x2, x3] = utils.deinterleave64_4di(r.read_u64());
    return new ty.factory(ty, x0, x1, x2, x3) as t4;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.t4);
  }

  override saveContent(w: AbiWriter) {
    w.write_u64(utils.interleave64_4di(this.x0, this.x1, this.x2, this.x3));
  }

  override toJSON() {
    return {
      _type: this.$type.name,
      x0: this.x0,
      x1: this.x1,
      x2: this.x2,
      x3: this.x3,
    };
  }
}
