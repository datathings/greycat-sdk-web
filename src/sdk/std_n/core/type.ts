namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class type extends GCPrimitive {
          static readonly _type = 'core::type' as const;

          constructor(public type_id: number = 0) {
            super();
          }

          static create(type_id: number, g: GreyCat = gc.$.default): type {
            const ty = g.abi.types[g.abi.core.type];
            return new ty.ctor(type_id) as type;
          }

          static override load(r: AbiReader, ty: AbiType): type {
            const type_id = r.read_vu32();
            return new ty.ctor(type_id) as type;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.type);
          }

          override saveContent(w: AbiWriter) {
            w.write_vu32(this.type_id);
          }

          override toString() {
            return this.$type.abi.types[this.type_id].name;
          }

          override toJSON() {
            return this.$type.abi.types[this.type_id].name;
          }
        }
      }
    }
  }
}
