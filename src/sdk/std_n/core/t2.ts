namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class t2 extends GCObject {
          static readonly _type = 'core::t2' as const;

          constructor(
            public x0: number = 0,
            public x1: number = 0,
          ) {
            super();
          }

          static create(x0: number, x1: number, g: GreyCat = gc.$.default): t2 {
            const ty = g.abi.types[g.abi.core.t2];
            return new ty.ctor(x0, x1) as t2;
          }

          static override load(r: AbiReader, ty: AbiType): t2 {
            const value = r.read_u64();
            const [x0, x1] = sdk.deinterleave64_2di(value);
            return new ty.ctor(x0, x1) as t2;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.t2);
          }

          override saveContent(w: AbiWriter) {
            w.write_u64(sdk.interleave64_2di(this.x0, this.x1));
          }

          override toJSON() {
            return {
              _type: this.$type.name,
              x0: this.x0,
              x1: this.x1,
            };
          }
        }
      }
    }
  }
}
