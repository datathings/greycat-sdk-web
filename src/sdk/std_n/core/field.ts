namespace greycat {
  export namespace std_n {
    export namespace core {
      export class field extends GCObject {
        static readonly _type = 'core::field' as const;

        constructor(
          public type_id: number = 0,
          public offset: number = 0,
        ) {
          super();
        }

        static create(type_id: number, offset: number, g: GreyCat = $.default): core.field {
          const ty = g.abi.types[g.abi.core.field];
          return new ty.ctor(type_id, offset) as core.field;
        }

        static load(r: AbiReader, ty: AbiType): core.field {
          const type_id = r.read_vu32();
          const offset = r.read_vu32();
          return new ty.ctor(type_id, offset) as core.field;
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.field);
        }

        override saveContent(w: AbiWriter) {
          w.write_vu32(this.type_id);
          w.write_vu32(this.offset);
        }

        override toString() {
          const type = this.$type.abi.types[this.type_id];
          return `${type.name}::${type.attrs[this.offset].name}`;
        }

        override toJSON() {
          const type = this.$type.abi.types[this.type_id];
          return `${type.name}::${type.attrs[this.offset].name}`;
        }
      }
    }
  }
}
