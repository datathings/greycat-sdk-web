namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class t4 extends GCObject {
          static readonly _type = 'core::t4' as const;

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
          ): t4 {
            const ty = g.abi.types[g.abi.core.t4];
            return new ty.ctor(x0, x1, x2, x3) as t4;
          }

          static override load(r: AbiReader, ty: AbiType): t4 {
            const [x0, x1, x2, x3] = sdk.deinterleave64_4di(r.read_u64());
            return new ty.ctor(x0, x1, x2, x3) as t4;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.t4);
          }

          override saveContent(w: AbiWriter) {
            w.write_u64(sdk.interleave64_4di(this.x0, this.x1, this.x2, this.x3));
          }

          override toJSON() {
            return [this.x0, this.x1, this.x2, this.x3];
          }

          override toString(fmt?: Intl.NumberFormat): string {
            const x0 = fmt?.format(this.x0) ?? `${this.x0}`;
            const x1 = fmt?.format(this.x1) ?? `${this.x1}`;
            const x2 = fmt?.format(this.x2) ?? `${this.x2}`;
            const x3 = fmt?.format(this.x3) ?? `${this.x3}`;
            return `[${x0}, ${x1}, ${x2}, ${x3}]`;
          }
        }
      }
    }
  }
}
