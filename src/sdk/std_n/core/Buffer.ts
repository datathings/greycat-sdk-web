namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class Buffer extends GCObject {
          static readonly _type = 'core::Buffer' as const;

          constructor(public data: Uint8Array = new Uint8Array()) {
            super();
          }

          override saveContent(w: AbiWriter): void {
            w.write_vu32(this.data.length);
            w.write_all(this.data);
          }

          static override load(r: AbiReader, type: AbiType): core.Buffer {
            const len = r.read_vu32();
            const data = r.take(len);
            return new type.ctor(data) as core.Buffer;
          }

          override toJSON() {
            return { _type: this.$type.name, data: globalThis.Array.from(this.data) };
          }

          override toString(_opts: gc.sdk.ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
            return `Buffer { length: ${this.data.byteLength} }`;
          }

          override valueOf() {
            return this.data;
          }
        }
      }
    }
  }
}
