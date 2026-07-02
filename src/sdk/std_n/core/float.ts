import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class float extends GCPrimitive {
  static readonly _type = 'core::float' as const;

  constructor(public value: number = 0) {
    super();
  }

  static create(value: number, g: GreyCat = $.default): gc.core.float {
    const ty = g.abi.types[g.abi.core.float];
    return new ty.ctor(value) as gc.core.float;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.float {
    const value = r.read_f64();
    return new ty.ctor(value) as gc.core.float;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.float);
  }

  override saveContent(w: AbiWriter) {
    w.write_f64(this.value);
  }

  equals(other: gc.core.float): boolean {
    return this.value === other.value;
  }

  override toString(opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    if (opts.numFmt) {
      return opts.numFmt.format(this.value);
    }
    return `${this.value}`;
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    return this.value;
  }
}
