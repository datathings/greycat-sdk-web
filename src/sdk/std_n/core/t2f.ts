namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class t2f extends GCPrimitive {
          static readonly _type = 'core::t2f' as const;

          constructor(
            public x0: number = 0,
            public x1: number = 0,
          ) {
            super();
          }

          static create(x0: number, x1: number, g: GreyCat = gc.$.default): t2f {
            const ty = g.abi.types[g.abi.core.t2f];
            return new ty.ctor(x0, x1) as t2f;
          }

          static override load(r: AbiReader, ty: AbiType): t2f {
            const [x0, x1] = sdk.deinterleave64_2df(r.read_u64());
            return new ty.ctor(x0, x1) as t2f;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.t2f);
          }

          override saveContent(w: AbiWriter) {
            w.write_u64(sdk.interleave64_2df(this.x0, this.x1));
          }

          override toJSON() {
            return [this.x0, this.x1];
          }

          override toString(
            opts: gc.sdk.ToStringOptions = gc.sdk.DEFAULT_TO_STRING_OPTIONS,
          ): string {
            if (opts.numFmt) {
              const x0 = opts.numFmt.format(this.x0);
              const x1 = opts.numFmt.format(this.x1);
              return `[${x0}, ${x1}]`;
            }
            return `[${this.x0}, ${this.x1}]`;
          }
        }
      }
    }
  }
}
