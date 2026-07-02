import { GCObject, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class bool extends GCObject {
  static readonly _type = 'core::bool' as const;

  constructor(public value: boolean = false) {
    super();
  }

  static create(value: boolean, g: GreyCat = $.default): gc.core.bool {
    const ty = g.abi.types[g.abi.core.bool];
    return new ty.ctor(value) as gc.core.bool;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.bool {
    const value = r.read_bool();
    return new ty.ctor(value) as gc.core.bool;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.bool);
  }

  override saveContent(w: AbiWriter) {
    w.write_bool(this.value);
  }

  equals(other: gc.core.bool): boolean {
    return this.value === other.value;
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `${this.value}`;
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    return this.value;
  }
}
