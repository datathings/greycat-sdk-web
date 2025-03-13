namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class str extends GCPrimitive {
          static readonly _type = 'core::str' as const;

          constructor(public value: bigint = 0n) {
            super();
          }

          static create(value: bigint, g: GreyCat = gc.$.default): str {
            const ty = g.abi.types[g.abi.core.str];
            return new ty.ctor(value) as str;
          }

          static fromString(s: string, g: GreyCat = gc.$.default) {
            const ty = g.abi.types[g.abi.core.str];
            return new ty.ctor(sdk.str_encode(s)) as str;
          }

          static override load(r: AbiReader, ty: AbiType): str {
            const value = r.read_u64();
            return new ty.ctor(value) as str;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.str);
          }

          override saveContent(w: AbiWriter) {
            w.write_u64(this.value);
          }

          override toString() {
            return sdk.str_decode(this.value);
          }

          override valueOf() {
            return this.value;
          }

          override toJSON() {
            return this.toString();
          }
        }
      }
    }
  }
}
