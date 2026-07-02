import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class null_ extends GCPrimitive {
  static readonly _type = 'core::null' as const;

  static create(g: GreyCat = $.default): null_ {
    const ty = g.abi.types[g.abi.core.null_];
    return new ty.ctor() as null_;
  }

  static override load(_r: AbiReader, ty: AbiType): null_ {
    return new ty.ctor() as null_;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.null);
  }

  override saveContent() {
    // noop
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `null`;
  }

  override valueOf() {
    return null;
  }

  override toJSON() {
    return null;
  }
}
