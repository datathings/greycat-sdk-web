namespace gc {
  export namespace sdk {
    export class GCFunction extends GCObject {
      constructor(public fn: AbiFunction) {
        super();
      }

      override saveHeader(w: AbiWriter): void {
        w.write_u8(PrimitiveType.function);
      }

      override saveContent(w: AbiWriter): void {
        w.write_vu32(this.fn.module_id);
        w.write_vu32(this.fn.type_id);
        w.write_vu32(this.fn.name_id);
      }

      override toJSON() {
        return {
          _type: this.$type.name,
          fqn: this.fn.fqn,
          nb_params: this.fn.params.length, // TODO add more than that?
          return_type: this.fn.return_type.name,
          return_nullable: this.fn.return_type_nullable,
        };
      }
    }
  }
}
