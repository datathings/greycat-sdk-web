import { GCObject, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
export class Buffer extends GCObject {
  static readonly _type = 'core::Buffer' as const;

  constructor(public data: Uint8Array = new Uint8Array()) {
    super();
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.data.length);
    w.write_all(this.data);
  }

  static override load(r: AbiReader, type: AbiType): gc.core.Buffer {
    const len = r.read_vu32();
    const data = r.take(len);
    return new type.ctor(data) as gc.core.Buffer;
  }

  override toJSON() {
    return { _type: this.$type.name, data: globalThis.Array.from(this.data) };
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `Buffer { length: ${this.data.byteLength} }`;
  }

  override valueOf() {
    return this.data;
  }
}
