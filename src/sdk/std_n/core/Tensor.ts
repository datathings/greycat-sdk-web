namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        const TensorType = {
          i32: 0,
          i64: 1,
          f32: 2,
          f64: 3,
          c64: 4,
          c128: 5,
        } as const;

        export type TensorType = (typeof TensorType)[keyof typeof TensorType];

        export class Tensor extends GCObject {
          static readonly _type = 'core::Tensor' as const;

          constructor(
            public shape: bigint[] = [],
            public type: gc.core.TensorType = gc.core.TensorType.i64,
            public size: bigint = 0n,
            public data: globalThis.Array<
              globalThis.Array<number | bigint | Uint8Array>
            > | null = null,
          ) {
            super();
          }

          static override load(r: AbiReader, ty: AbiType): Tensor {
            const nb_dim = r.read_i8();
            const tensorTypeOffset = r.read_u8() as TensorType;
            const tensorTypeType = r.abi.types[r.abi.core.tensortype];
            // SAFETY: TensortType IS an enum, therefore is must have 'enum_values' defined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const tensorType = tensorTypeType.enum_values![tensorTypeOffset];

            const shape = new globalThis.Array(nb_dim);
            for (let i = 0; i < nb_dim; i++) {
              shape[i] = r.read_i64();
            }
            const size = r.read_i64();
            if (nb_dim === 0) {
              return new ty.ctor(shape, tensorType, size, null) as gc.core.Tensor;
            }

            const data = new globalThis.Array(shape[0]);
            for (let x = 0; x < data.length; x++) {
              data[x] = new globalThis.Array(shape[1]);
              for (let y = 0; y < data[x].length; y++) {
                switch (tensorTypeOffset) {
                  case TensorType.i32:
                    data[x][y] = r.read_i32();
                    break;
                  case TensorType.f32:
                    data[x][y] = r.read_f32();
                    break;
                  case TensorType.i64:
                    data[x][y] = r.read_i64_number();
                    break;
                  case TensorType.f64:
                    data[x][y] = r.read_f64();
                    break;
                  case TensorType.c64:
                    data[x][y] = r.take(8);
                    break;
                  case TensorType.c128:
                    data[x][y] = r.take(16);
                    break;
                  default:
                    throw new Error(`invalid TensorType ${tensorTypeOffset}`);
                }
              }
            }

            return new ty.ctor(shape, tensorType, size, data) as gc.core.Tensor;
          }

          override saveContent(w: AbiWriter): void {
            w.write_i8(this.shape.length);
            w.write_u8(this.type.offset);
            for (let i = 0; i < this.shape.length; i++) {
              w.write_i64(this.shape[i]);
            }
            w.write_i64(this.size);
            if (this.data) {
              for (let x = 0; x < this.data.length; x++) {
                for (let y = 0; y < this.data[x].length; y++) {
                  switch (this.type.offset as TensorType) {
                    case TensorType.i32:
                      w.write_i32(this.data[x][y] as number);
                      break;
                    case TensorType.f32:
                      w.write_f32(this.data[x][y] as number);
                      break;
                    case TensorType.i64:
                      w.write_i64_number(this.data[x][y] as bigint | number);
                      break;
                    case TensorType.f64:
                      w.write_f64(this.data[x][y] as number);
                      break;
                    case TensorType.c64:
                    case TensorType.c128:
                      w.write_all(this.data[x][y] as Uint8Array);
                      break;
                  }
                }
              }
            }
          }

          override toJSON() {
            if (this.data) {
              return {
                _type: Tensor._type,
                dim: this.data.length,
                shape: [this.data.length, Number(this.size / BigInt(this.data.length))],
                type: this.type,
                data: this.data,
              };
            }

            return {
              _type: Tensor._type,
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
