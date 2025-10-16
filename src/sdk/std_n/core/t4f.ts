namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class t4f extends GCPrimitive {
          static readonly _type = 'core::t4f' as const;

          constructor(
            public x0: number = 0,
            public x1: number = 0,
            public x2: number = 0,
            public x3: number = 0,
          ) {
            super();
          }

          static create(
            x0: number,
            x1: number,
            x2: number,
            x3: number,
            g: GreyCat = gc.$.default,
          ): t4f {
            const ty = g.abi.types[g.abi.core.t4f];
            return new ty.ctor(x0, x1, x2, x3) as t4f;
          }

          static override load(r: AbiReader, ty: AbiType): t4f {
            const [x0, x1, x2, x3] = sdk.deinterleave64_4df(r.read_u64());
            return new ty.ctor(x0, x1, x2, x3) as t4f;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.t4f);
          }
          override saveContent(w: AbiWriter) {
            w.write_u64(sdk.interleave64_4df(this.x0, this.x1, this.x2, this.x3));
          }

          override toJSON() {
            return [this.x0, this.x1, this.x2, this.x3];
          }

          override toString(
            opts: gc.sdk.ToStringOptions = gc.sdk.DEFAULT_TO_STRING_OPTIONS,
          ): string {
            if (opts.numFmt) {
              const x0 = opts.numFmt.format(this.x0);
              const x1 = opts.numFmt.format(this.x1);
              const x2 = opts.numFmt.format(this.x2);
              const x3 = opts.numFmt.format(this.x3);
              return `[${x0}, ${x1}, ${x2}, ${x3}]`;
            }
            return `[${this.x0}, ${this.x1}, ${this.x2}, ${this.x3}]`;
          }
        }
      }
    }
  }
}
