namespace gc {
  export namespace sdk {
    export class GCEnum extends GCObject {
      constructor(
        /** offset of the field */
        public offset: number,
        /** name of the field */
        public key: string,
        /** optional value of the field */
        public value: Value,
      ) {
        super();
      }

      override saveHeader(w: AbiWriter): void {
        w.write_u8(PrimitiveType.enum);
        w.write_vu32(this.$type.offset);
      }

      override saveContent(w: AbiWriter): void {
        w.write_vu32(this.offset);
      }

      static override load(r: AbiReader, type: AbiType) {
        const programType = type.abi.types[type.mapped_type_off];
        const valueOffset = r.read_vu32();
        const abiTypeAtt = type.attrs[valueOffset];
        // this is an enum, so we know `static_values` is gonna be initialized
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return programType.static_values![abiTypeAtt.name];
      }

      override toString(): string {
        return `${this.$type.name}::${this.key}`;
      }

      override toJSON() {
        return `${this.$type.name}::${this.key}`;
      }
    }
  }
}
