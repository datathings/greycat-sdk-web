import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class char extends GCPrimitive {
  static readonly _type = 'core::char' as const;

  constructor(public value = '') {
    super();
  }

  static create(value: string, g: GreyCat = $.default): char {
    const ty = g.abi.types[g.abi.core.char];
    return new ty.ctor(value) as char;
  }

  override saveContent(w: AbiWriter): void {
    w.char(this.value);
  }

  override valueOf() {
    return this.value;
  }

  static override load(r: AbiReader, ty: AbiType): char {
    const value = r.read_char();
    return new ty.ctor(value) as char;
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS): string {
    return this.value;
  }

  override toJSON() {
    return this.value;
  }
}
