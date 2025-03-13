namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class function_ extends GCPrimitive {
          static readonly _type = 'core::function' as const;

          constructor(
            public mod_off: number = 0,
            public ty_off: number = 0,
            public name_off: number = 0,
          ) {
            super();
          }

          static create(
            mod: string,
            type: string | undefined,
            name: string,
            g: GreyCat = gc.$.default,
          ): core.function_ {
            const ty = g.abi.types[g.abi.core.fn];
            return new ty.ctor(
              ty,
              g.abi.symbol_ids.get(mod) ?? 0,
              type ? (g.abi.symbol_ids.get(type) ?? 0) : 0,
              g.abi.symbol_ids.get(name) ?? 0,
            ) as core.function_;
          }

          static override load(r: AbiReader, ty: AbiType): core.function_ {
            const mod_off = r.read_vu32();
            const ty_off = r.read_vu32();
            const name_off = r.read_vu32();
            return new ty.ctor(mod_off, ty_off, name_off) as core.function_;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.function);
          }

          override saveContent(w: AbiWriter) {
            w.write_vu32(this.mod_off);
            w.write_vu32(this.ty_off);
            w.write_vu32(this.name_off);
          }

          /**
           * Function's fully qualified name (eg. `<module>::<type>::<name>`, `<type>` being optional)
           */
          get fqn(): string {
            if (this.ty_off === 0) {
              return `${this.$type.abi.symbols[this.mod_off]}::${this.$type.abi.symbols[this.name_off]}`;
            }
            return `${this.$type.abi.symbols[this.mod_off]}::${this.$type.abi.symbols[this.ty_off]}::${
              this.$type.abi.symbols[this.name_off]
            }`;
          }

          override toString() {
            return this.fqn;
          }

          override toJSON() {
            return this.fqn;
          }
        }
      }
    }
  }
}
