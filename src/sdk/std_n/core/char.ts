namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class char extends GCObject {
          static readonly _type = 'core::char' as const;

          constructor(public value = '') {
            super();
          }

          // eslint-disable-next-line @typescript-eslint/ban-types
          static create(value: string, g: GreyCat = gc.$.default): char {
            const ty = g.abi.types[g.abi.core.char];
            // eslint-disable-next-line @typescript-eslint/ban-types
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
        }
      }
    }
  }
}
