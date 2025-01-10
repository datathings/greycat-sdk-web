namespace greycat {
  export namespace std_n {
    export namespace core {
      export class nodeGeo<T = unknown> extends GCObject {
        static readonly _type = 'core::nodeGeo' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: bigint, g: GreyCat = $.default): core.nodeGeo {
          const ty = g.abi.types[g.abi.core.node_geo];
          return new ty.ctor(value) as core.nodeGeo;
        }

        static fromRef(ref: string, g: GreyCat = $.default): core.nodeGeo {
          return nodeGeo.create(BigInt(`0x${ref}`), g);
        }

        static load(r: AbiReader, ty: AbiType): core.nodeGeo {
          const value = r.read_vu64_bigint();
          return new ty.ctor(value) as core.nodeGeo;
        }

        // from: geo?, to: geo?, maxRows: int, mode: SamplingMode
        sample(
          from: core.geo | null,
          to: core.geo | null,
          maxRows: number | bigint,
          mode: greycat.core.SamplingMode,
          g: GreyCat = $.default,
          signal?: AbortSignal,
        ): Promise<core.Table<[core.geo, T]>> {
          return g.call('core::nodeGeo::sample', [[this], from, to, maxRows, mode], signal);
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.node_geo);
        }

        override saveContent(w: AbiWriter) {
          w.write_vu64(this.value);
        }

        /**
         * Hexedecimal representation of the nodeGeo's reference
         */
        get ref(): string {
          return this.value.toString(16);
        }

        override toString(): string {
          return `nodeGeo:${this.ref}`;
        }

        override valueOf() {
          return this.value;
        }

        override toJSON() {
          return {
            _type: this.$type.name,
            ref: this.ref,
          };
        }
      }
    }
  }
}
