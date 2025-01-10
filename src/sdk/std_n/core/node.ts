namespace greycat {
  export namespace std_n {
    export namespace core {
      export class node<T = unknown> extends GCObject {
        static readonly _type = 'core::node' as const;

        constructor(public value: bigint = 0n) {
          super();
        }

        static create(value: bigint, g: GreyCat = $.default): core.node {
          const ty = g.abi.types[g.abi.core.node];
          return new ty.ctor(value) as core.node;
        }

        static fromRef(ref: string, g: GreyCat = $.default): core.node {
          return node.create(BigInt(`0x${ref}`), g);
        }

        static load(r: AbiReader, ty: AbiType): core.node {
          const value = r.read_vu64_bigint();
          return new ty.ctor(value) as core.node;
        }

        /***
         * Resolves the value of this node.
         *
         * *This is sugar above a call to `core::node::resolve_all([this])` that returns the first element of the array*
         *
         * @param g the GreyCat instance to use, defaults to `$.default`
         * @param signal to prematurely abort the request
         */
        async resolve(g: GreyCat = $.default, signal?: AbortSignal): Promise<T> {
          const [res] = await g.call<Array<T>>('core::node::resolve_all', [[this]], signal);
          return res;
        }

        override saveHeader(w: AbiWriter): void {
          w.write_u8(PrimitiveType.node);
        }

        override saveContent(w: AbiWriter) {
          w.write_vu64(this.value);
        }

        /**
         * Hexedecimal representation of the node's reference
         */
        get ref(): string {
          return this.value.toString(16);
        }

        override toString() {
          return `node:${this.ref}`;
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
