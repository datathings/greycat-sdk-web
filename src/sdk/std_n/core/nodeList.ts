namespace greycat {
  export namespace std_n {
    export namespace core {
      export class nodeList<T = unknown> extends GCObject {
        static readonly _type = 'core::nodeList' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: bigint, g: GreyCat = $.default): core.nodeList {
          const ty = g.abi.types[g.abi.core.node_list];
          return new ty.ctor(value) as core.nodeList;
        }

        static fromRef(ref: string, g: GreyCat = $.default): core.nodeList {
          return nodeList.create(BigInt(`0x${ref}`), g);
        }

        static load(r: AbiReader, ty: AbiType): core.nodeList {
          const value = r.read_vu64_bigint();
          return new ty.ctor(value) as core.nodeList;
        }

        sample(
          from: number | bigint | null,
          to: number | bigint | null,
          maxRows: number | bigint,
          mode: greycat.core.SamplingMode,
          maxDephasing: number | bigint | null,
          g: GreyCat = $.default,
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

        /**
         * Hexedecimal representation of the nodeList's reference
         */
        get ref(): string {
          return this.value.toString(16);
        }

        override toString() {
          return `nodeList:${this.ref}`;
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
