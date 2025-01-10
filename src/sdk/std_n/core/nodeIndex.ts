namespace greycat {
  export namespace std_n {
    export namespace core {
      export class nodeIndex<K = unknown, V = unknown> extends GCObject {
        static readonly _type = 'core::nodeIndex' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: bigint, g: GreyCat = $.default): core.nodeIndex {
          const ty = g.abi.types[g.abi.core.node_index];
          return new ty.ctor(value) as core.nodeIndex;
        }

        static fromRef(ref: string, g: GreyCat = $.default): core.nodeIndex {
          return nodeIndex.create(BigInt(`0x${ref}`), g);
        }

        static load(r: AbiReader, ty: AbiType): core.nodeIndex {
          const value = r.read_vu64_bigint();
          return new ty.ctor(value) as core.nodeIndex;
        }

        sample(
          from: K | null,
          maxRows: number | bigint,
          mode: greycat.core.SamplingMode,
          g: GreyCat = $.default,
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

        /**
         * Hexedecimal representation of the nodeIndex's reference
         */
        get ref(): string {
          return this.value.toString(16);
        }

        override toString() {
          return `nodeIndex:${this.ref}`;
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
