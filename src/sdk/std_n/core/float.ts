namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class float extends GCPrimitive {
          static readonly _type = 'core::float' as const;

          constructor(public value: number = 0) {
            super();
          }

          static create(value: number, g: GreyCat = gc.$.default): core.float {
            const ty = g.abi.types[g.abi.core.float];
            return new ty.ctor(value) as core.float;
          }

          static override load(r: AbiReader, ty: AbiType): core.float {
            const value = r.read_f64();
            return new ty.ctor(value) as core.float;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.float);
          }

          override saveContent(w: AbiWriter) {
            w.write_f64(this.value);
          }

          equals(other: core.float): boolean {
            return this.value === other.value;
          }

          override toString(opts: gc.sdk.ToStringOptions = gc.sdk.DEFAULT_TO_STRING_OPTIONS) {
            if (opts.numFmt) {
              return opts.numFmt.format(this.value);
            }
            return `${this.value}`;
          }

          override valueOf() {
            return this.value;
          }

          override toJSON() {
            return this.value;
          }
        }
      }
    }
  }
}
