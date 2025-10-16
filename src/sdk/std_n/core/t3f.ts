namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class t3f extends GCPrimitive {
          static readonly _type = 'core::t3f' as const;

          constructor(
            public x0: number = 0,
            public x1: number = 0,
            public x2: number = 0,
          ) {
            super();
          }

          static create(x0: number, x1: number, x2: number, g: GreyCat = gc.$.default): t3f {
            const ty = g.abi.types[g.abi.core.t3f];
            return new ty.ctor(x0, x1, x2) as t3f;
          }

          static override load(r: AbiReader, ty: AbiType): t3f {
            const [x0, x1, x2] = sdk.deinterleave64_3df(r.read_u64());
            return new ty.ctor(x0, x1, x2) as t3f;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.t3f);
          }

          override saveContent(w: AbiWriter) {
            w.write_u64(sdk.interleave64_3df(this.x0, this.x1, this.x2));
          }

          override toJSON() {
            return [this.x0, this.x1, this.x2];
          }

          override toString(
            opts: gc.sdk.ToStringOptions = gc.sdk.DEFAULT_TO_STRING_OPTIONS,
          ): string {
            if (opts.numFmt) {
              const x0 = opts.numFmt.format(this.x0);
              const x1 = opts.numFmt.format(this.x1);
              const x2 = opts.numFmt.format(this.x2);
              return `[${x0}, ${x1}, ${x2}]`;
            }
            return `[${this.x0}, ${this.x1}, ${this.x2}]`;
          }
        }
      }
    }
  }
}
