namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class nodeGeo<T = unknown> extends GCPrimitive {
          static readonly _type = 'core::nodeGeo' as const;

          constructor(public value: bigint = 0n) {
            super();
          }

          static create(value: bigint, g: GreyCat = gc.$.default): core.nodeGeo {
            const ty = g.abi.types[g.abi.core.node_geo];
            return new ty.ctor(value) as core.nodeGeo;
          }

          static override load(r: AbiReader, ty: AbiType): core.nodeGeo {
            const value = r.read_vu64_bigint();
            return new ty.ctor(value) as core.nodeGeo;
          }

          // from: geo?, to: geo?, maxRows: int, mode: SamplingMode
          sample(
            from: core.geo | null,
            to: core.geo | null,
            maxRows: number | bigint,
            mode: gc.core.SamplingMode,
            g: GreyCat = gc.$.default,
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

          override toString(): string {
            return `${this.value}_nodeGeo`;
          }

          override valueOf() {
            return this.value;
          }

          override toJSON() {
            if (this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER) {
              return Number(this.value);
            }
            return `${this.value}`;
          }
        }
      }
    }
  }
}
