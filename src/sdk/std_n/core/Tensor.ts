namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class Tensor extends GCObject {
          static readonly _type = 'core::Tensor' as const;

          constructor(
            public shape: bigint[] = [],
            public type: gc.core.TensorType = gc.core.TensorType.i64,
            public data: globalThis.Array<number | bigint | Uint8Array>,
          ) {
            super();
          }

          static override load(r: AbiReader, ty: AbiType): Tensor {
            const nb_dim = r.read_i8();
            const type_offset = r.read_u8();
            const tensor_type = gc.core.TensorType.$fields[type_offset];

            const shape = new globalThis.Array(nb_dim);
            for (let i = 0; i < nb_dim; i++) {
              shape[i] = r.read_i64();
            }

            const size = r.read_i64();
            if (nb_dim === 0) {
              return new ty.ctor(shape, tensor_type, []) as gc.core.Tensor;
            }

            const data = new globalThis.Array(Number(size));
            for (let i = 0; i < size; i++) {
              switch (tensor_type.key) {
                case 'i32':
                  data[i] = r.read_i32();
                  break;
                case 'f32':
                  data[i] = r.read_f32();
                  break;
                case 'i64':
                  data[i] = r.read_i64_number();
                  break;
                case 'f64':
                  data[i] = r.read_f64();
                  break;
                case 'c64':
                  data[i] = r.take(8);
                  break;
                case 'c128':
                  data[i] = r.take(16);
                  break;
                default:
                  throw new Error(`invalid TensorType ${type_offset}`);
              }
            }

            return new ty.ctor(shape, tensor_type, data) as gc.core.Tensor;
          }

          override saveContent(w: AbiWriter): void {
            w.write_i8(this.shape.length);
            w.write_u8(this.type.offset);
            let len = 1n;
            for (let i = 0; i < this.shape.length; i++) {
              len *= this.shape[i];
              w.write_i64(this.shape[i]);
            }
            if (this.shape.length === 0) {
              w.write_i64(0n);
            } else {
              w.write_i64(len);
            }
            for (let i = 0; i < len; i++) {
              switch (this.type.key) {
                case 'i32':
                  w.write_i32(this.data[i] as number);
                  break;
                case 'f32':
                  w.write_f32(this.data[i] as number);
                  break;
                case 'i64':
                  w.write_i64_number(this.data[i] as bigint | number);
                  break;
                case 'f64':
                  w.write_f64(this.data[i] as number);
                  break;
                case 'c64':
                case 'c128':
                  w.write_all(this.data[i] as Uint8Array);
                  break;
              }
            }
          }

          override toJSON() {
            if (this.data) {
              return {
                _type: this.$type.name,
                dim: this.data.length,
                shape: this.shape.map((v) => Number(v)),
                type: this.type,
                data: this.data,
              };
            }

            return {
              _type: this.$type.name,
              dim: 0,
              shape: [],
              type: this.type,
              data: null,
            };
          }
        }
      }
    }
  }
}
