import type { AbiType, AbiReader, AbiWriter, GreyCat } from '../../exports.js';
import { GCObject, $ } from '../../exports.js';

export class String extends GCObject {
  static readonly _type = 'core::String' as const;

  constructor(type: AbiType, public value = '') {
    super(type);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static create(value: string, g: GreyCat = $.default): String {
    const ty = g.abi.types[g.abi.core.string];
    // eslint-disable-next-line @typescript-eslint/ban-types
    return new ty.factory(ty, value) as String;
  }

  override saveContent(w: AbiWriter): void {
    w.write_string(this.value);
  }

  override valueOf() {
    return this.value;
  }

  static load(r: AbiReader): string {
    const len = r.read_vu32();
    if (len & 1) {
      return r.abi.symbols[len >> 1];
    }
    return r.read_string(len >> 1);
  }
}
