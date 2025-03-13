namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class String extends GCPrimitive {
          static readonly _type = 'core::String' as const;

          constructor(public value = '') {
            super();
          }

          // eslint-disable-next-line @typescript-eslint/ban-types
          static create(value: string, g: GreyCat = gc.$.default): String {
            const ty = g.abi.types[g.abi.core.string];
            // eslint-disable-next-line @typescript-eslint/ban-types
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
        }
      }
    }
  }
}
