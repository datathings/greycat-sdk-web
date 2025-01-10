namespace greycat {
  export namespace std_n {
    export namespace core {
      export class bool extends GCObject {
        static readonly _type = 'core::bool' as const;

        constructor(public value: boolean = false) {
          super();
        }

        static create(value: boolean, g: GreyCat = $.default): core.bool {
          const ty = g.abi.types[g.abi.core.bool];
          return new ty.ctor(value) as core.bool;
        }

        static load(r: AbiReader, ty: AbiType): core.bool {
          const value = r.read_bool();
          return new ty.ctor(value) as core.bool;
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.bool);
        }

        override saveContent(w: AbiWriter) {
          w.write_bool(this.value);
        }

        equals(other: core.bool): boolean {
          return this.value === other.value;
        }

        override toString() {
          return `${this.value}`;
        }

        override valueOf() {
          return this.value;
        }

        override toJSON() {
          return this.value;
        }
      }
    }
  }
}
