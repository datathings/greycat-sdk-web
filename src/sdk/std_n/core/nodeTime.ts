namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class nodeTime<T = unknown> extends GCPrimitive {
          static readonly _type = 'core::nodeTime' as const;

          constructor(public value: bigint = 0n) {
            super();
          }

          static create(value: bigint, g: GreyCat = gc.$.default): gc.core.nodeTime {
            const ty = g.abi.types[g.abi.core.node_time];
            return new ty.ctor(value) as gc.core.nodeTime;
          }

          static override load(r: AbiReader, ty: AbiType): gc.core.nodeTime {
            const value = r.read_vu64_bigint();
            return new ty.ctor(value) as gc.core.nodeTime;
          }

          sample(
            from: gc.core.time | null,
            to: gc.core.time | null,
            maxRows: number | bigint,
            mode: gc.core.SamplingMode,
            maxDephasing: gc.core.duration | null,
            tz: gc.core.TimeZone | null,
            g: GreyCat = gc.$.default,
            signal?: AbortSignal,
          ): Promise<gc.core.Table<[gc.core.time, T]>> {
            return g.call('core::nodeTime::sample', [[this], from, to, maxRows, mode, maxDephasing, tz], signal);
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.node_time);
          }

          override saveContent(w: AbiWriter) {
            w.write_vu64(this.value);
          }

          override toString(_opts: gc.sdk.ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
            return `${this.value}_nodeTime`;
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
