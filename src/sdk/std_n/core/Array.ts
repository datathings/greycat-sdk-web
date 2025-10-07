namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        export class Array<T extends Value = any> extends GCObject {
          static readonly _type = 'core::Array' as const;

          constructor(public values: T[] = []) {
            super();
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          static create<T extends Value = any>(
            value: globalThis.Array<T>,
            g: GreyCat = gc.$.default,
          ): Array<T> {
            const ty = g.abi.types[g.abi.core.array];
            return new ty.ctor(value) as Array<T>;
          }

          override saveContent(w: AbiWriter): void {
            w.write_vu32(this.values.length);
            w.write_array(this.values);
          }

          static override load<T extends Value = unknown>(r: AbiReader, type: AbiType): globalThis.Array<T> {
            const len = r.read_vu32();
            const arr = r.read_array(len) as globalThis.Array<T>;
            arr.$type = type;
            return arr;
          }

          [Symbol.iterator](): Iterator<T> {
            return this.values[Symbol.iterator]();
          }

          override valueOf() {
            return this.values;
          }

          override toJSON() {
            return this.values;
          }
        }
      }
    }
  }
}
