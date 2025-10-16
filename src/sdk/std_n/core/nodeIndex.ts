namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class nodeIndex<K = unknown, V = unknown> extends GCPrimitive {
          static readonly _type = 'core::nodeIndex' as const;

          constructor(public value: bigint = 0n) {
            super();
          }

          static create(value: bigint, g: GreyCat = gc.$.default): core.nodeIndex {
            const ty = g.abi.types[g.abi.core.node_index];
            return new ty.ctor(value) as core.nodeIndex;
          }

          static override load(r: AbiReader, ty: AbiType): core.nodeIndex {
            const value = r.read_vu64_bigint();
            return new ty.ctor(value) as core.nodeIndex;
          }

          sample(
            from: K | null,
            maxRows: number | bigint,
            mode: gc.core.SamplingMode,
            g: GreyCat = gc.$.default,
            signal?: AbortSignal,
          ): Promise<core.Table<[K, V]>> {
            return g.call('core::nodeIndex::sample', [[this], from, maxRows, mode], signal);
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.node_index);
          }

          override saveContent(w: AbiWriter) {
            w.write_vu64(this.value);
          }

          override toString(_opts: gc.sdk.ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
            return `${this.value}_nodeIndex`;
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
