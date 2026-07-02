import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class int extends GCPrimitive {
  static readonly _type = 'core::int' as const;

  constructor(public value: bigint = 0n) {
    super();
  }

  static create(value: number | bigint, g: GreyCat = $.default): gc.core.int {
    const ty = g.abi.types[g.abi.core.int];
    return new ty.ctor(typeof value === 'bigint' ? value : BigInt(value)) as gc.core.int;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.int {
    const value = r.read_i64();
    return new ty.ctor(value) as gc.core.int;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.int);
  }

  override saveContent(w: AbiWriter) {
    w.write_i64(this.value);
  }

  equals(other: gc.core.int): boolean {
    return this.value === other.value;
  }

  asNumber(): number {
    return Number(this.value);
  }

  // ord(other: gc.core.int): number {
  //   if (this.value === other.value) {
  //     return 0;
  //   }
  //   if (this.value < other.value) {
  //     return -1;
  //   }
  //   return 1;
  // }

  override toString(opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    if (opts.numFmt) {
      return opts.numFmt.format(this.value);
    }
    return `${this.value}`;
  }

  override toJSON() {
    if (this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER) {
      return Number(this.value);
    }
    return `${this.value}`;
  }
}
