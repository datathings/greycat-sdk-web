namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class nodeList<T = unknown> extends GCPrimitive {
          static readonly _type = 'core::nodeList' as const;

          constructor(public value: bigint = 0n) {
            super();
          }

          static create(value: bigint, g: GreyCat = gc.$.default): core.nodeList {
            const ty = g.abi.types[g.abi.core.node_list];
            return new ty.ctor(value) as core.nodeList;
          }

          static override load(r: AbiReader, ty: AbiType): core.nodeList {
            const value = r.read_vu64_bigint();
            return new ty.ctor(value) as core.nodeList;
          }

          sample(
            from: number | bigint | null,
            to: number | bigint | null,
            maxRows: number | bigint,
            mode: gc.core.SamplingMode,
            maxDephasing: number | bigint | null,
            g: GreyCat = gc.$.default,
            signal?: AbortSignal,
          ): Promise<core.Table<[number | bigint, T]>> {
            return g.call(
              'core::nodeList::sample',
              [[this], from, to, maxRows, mode, maxDephasing],
              signal,
            );
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.node_list);
          }

          override saveContent(w: AbiWriter) {
            w.write_vu64(this.value);
          }

          override toString() {
            return `${this.value}_nodeList`;
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
