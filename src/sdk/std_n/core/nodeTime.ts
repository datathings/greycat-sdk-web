namespace greycat {
  export namespace std_n {
    export namespace core {
      export class nodeTime<T = unknown> extends GCObject {
        static readonly _type = 'core::nodeTime' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: bigint, g: GreyCat = $.default): greycat.core.nodeTime {
          const ty = g.abi.types[g.abi.core.node_time];
          return new ty.ctor(value) as greycat.core.nodeTime;
        }

        static fromRef(ref: string, g: GreyCat = $.default): greycat.core.nodeTime {
          return nodeTime.create(BigInt(`0x${ref}`), g);
        }

        static load(r: AbiReader, ty: AbiType): greycat.core.nodeTime {
          const value = r.read_vu64_bigint();
          return new ty.ctor(value) as greycat.core.nodeTime;
        }

        sample(
          from: greycat.core.time | null,
          to: greycat.core.time | null,
          maxRows: number | bigint,
          mode: greycat.core.SamplingMode,
          maxDephasing: greycat.core.duration | null,
          tz: greycat.core.TimeZone | null,
          g: GreyCat = $.default,
          signal?: AbortSignal,
        ): Promise<greycat.core.Table<[greycat.core.time, T]>> {
          return g.call(
            'core::nodeTime::sample',
            [[this], from, to, maxRows, mode, maxDephasing, tz],
            signal,
          );
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.node_time);
        }

        override saveContent(w: AbiWriter) {
          w.write_vu64(this.value);
        }

        /**
         * Hexedecimal representation of the nodeTime's reference
         */
        get ref(): string {
          return this.value.toString(16);
        }

        override toString() {
          return `nodeTime:${this.ref}`;
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
