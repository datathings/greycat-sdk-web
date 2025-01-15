namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class null_ extends GCObject {
          static readonly _type = 'core::null' as const;

          static create(g: GreyCat = gc.$.default): null_ {
            const ty = g.abi.types[g.abi.core.null_];
            return new ty.ctor() as null_;
          }

          static override load(_r: AbiReader, ty: AbiType): null_ {
            return new ty.ctor() as null_;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.null);
          }

          override saveContent() {
            // noop
          }

          override toString() {
            return `null`;
          }

          override valueOf() {
            return null;
          }

          override toJSON() {
            return null;
          }
        }
      }
    }
  }
}
