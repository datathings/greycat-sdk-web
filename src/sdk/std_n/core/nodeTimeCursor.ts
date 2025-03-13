namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class nodeTimeCursor extends GCPrimitive {
          static readonly _type = 'core::nodeTimeCursor' as const;

          constructor(public value: bigint = 0n) {
            super();
            throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
          }

          static override load(_r: AbiReader): nodeTimeCursor {
            throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
          }

          override saveContent(_w: AbiWriter) {
            throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
          }

          override toJSON() {
            return {
              _type: this.$type.name,
            };
          }
        }
      }
    }
  }
}
