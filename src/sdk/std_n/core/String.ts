import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class String extends GCPrimitive {
  static readonly _type = 'core::String' as const;

  constructor(public value = '') {
    super();
  }

  static create(value: string, g: GreyCat = $.default): String {
    const ty = g.abi.types[g.abi.core.string];
    return new ty.ctor(value) as String;
  }

  override saveContent(w: AbiWriter): void {
    w.write_string(this.value);
  }

  override valueOf() {
    return this.value;
  }

  static override load(r: AbiReader): string {
    const len = r.read_vu32();
    if (len & 1) {
      return r.abi.symbols[len >> 1];
    }
    return r.read_string(len >> 1);
  }

  override toJSON() {
    return this.value;
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return this.value;
  }
}
