namespace greycat {
  export namespace std_n {
    export namespace core {
      export class int extends GCObject {
        static readonly _type = 'core::int' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: number | bigint, g: GreyCat = $.default): core.int {
          const ty = g.abi.types[g.abi.core.int];
          return new ty.ctor(typeof value === 'bigint' ? value : BigInt(value)) as core.int;
        }

        static load(r: AbiReader, ty: AbiType): core.int {
          const value = r.read_i64();
          return new ty.ctor(value) as core.int;
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.int);
        }

        override saveContent(w: AbiWriter) {
          w.write_i64(this.value);
        }

        equals(other: core.int): boolean {
          return this.value === other.value;
        }

        asNumber(): number {
          return Number(this.value);
        }

        // ord(other: core.int): number {
        //   if (this.value === other.value) {
        //     return 0;
        //   }
        //   if (this.value < other.value) {
        //     return -1;
        //   }
        //   return 1;
        // }

        override toString() {
          return `${this.value}`;
        }

        override toJSON() {
          if (this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER) {
            return Number(this.value);
          }
          const value = this.value ? Number(this.value) : this.value;
          return value;
        }
      }
    }
  }
}
