import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, $ } from '../../exports.js';

export class char extends GCObject {
  static readonly _type = 'core::char' as const;

  constructor(type: AbiType, public value = '') {
    super(type);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static create(value: string, g: GreyCat = $.default): char {
    const ty = g.abi.types[g.abi.core.char];
    // eslint-disable-next-line @typescript-eslint/ban-types
    return new ty.factory(ty, value) as char;
  }

  override saveContent(w: AbiWriter): void {
    w.char(this.value);
  }

  override valueOf() {
    return this.value;
  }

  static load(r: AbiReader, ty: AbiType): char {
    const value = r.read_char();
    return new ty.factory(ty, value) as char;
  }
}
