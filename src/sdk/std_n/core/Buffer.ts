import type { AbiType, AbiReader, AbiWriter, std } from '../../exports.js';
import { GCObject } from '../../exports.js';

export class Buffer extends GCObject {
  static readonly _type = 'core::Buffer' as const;

  constructor(type: AbiType, public data: Uint8Array = new Uint8Array()) {
    super(type);
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.data.length);
    w.write_all(this.data);
  }

  static load(r: AbiReader, type: AbiType): std.core.Buffer {
    const len = r.read_vu32();
    const data = r.take(len);
    return new Buffer(type, data);
  }

  override toJSON() {
    return { _type: this.$type.name, data: Array.from(this.data) };
  }

  override valueOf() {
    return this.data;
  }
}
