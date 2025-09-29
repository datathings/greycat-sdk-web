namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        /**
         * Table is iterable by row by default using the `for..of` statement.
         *
         * One can iterate by columns by using the `for..of` statement on `table.iter_by_column()`.
         */
        export class Table<T = unknown[]> extends GCObject {
          static readonly _type = 'core::Table' as const;
          static readonly COLLATOR = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base',
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          static compare(a: any, b: any, ord: sdk.SortOrd): number {
            let diff: number;
            if (typeof a === 'string' && typeof b === 'string') {
              diff = Table.COLLATOR.compare(a, b);
            } else {
              diff = a > b ? 1 : a < b ? -1 : 0;
            }
            return ord === sdk.SortOrd.asc ? diff : -diff;
          }

          /**
           * Optional headers for each column.
           *
           * When the table is created using `fromObjects()` the objects keys are used.
           * If the table knows its generic param, the generic param fields are used.
           */
          public headers: string[] | undefined;
          public subheaders: string[] | undefined;
          private _initial_value: unknown[] | undefined;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          constructor(public cols: any[][] = []) {
            super();
          }

          $init() {
            if (this.$type.generic_abi_type != 0) {
              const generic_param_type = this.$type.abi.types[this.$type.g1()];
              this.headers = generic_param_type.attrs.map((a) => a.name);
              this.subheaders = generic_param_type.attrs.map((a) => {
                const type = this.$type.abi.types[a.abi_type].name;
                if (a.nullable) {
                  return `${type}?`;
                }
                return type;
              });
            }
          }

          /**
           * Creates a table using an array of columns.
           */
          static create(
            cols: unknown[][] = [],
            g: GreyCat = gc.$.default,
          ): gc.core.Table<unknown[]> {
            const ty = g.abi.types[g.abi.core.table];
            const table = new ty.ctor(cols) as gc.core.Table;
            return table;
          }

          /**
           * Proxies to `Table.create(...)`
           */
          static fromCols(
            cols: unknown[][] = [],
            g: GreyCat = gc.$.default,
          ): gc.core.Table<unknown[]> {
            return Table.create(cols, g);
          }

          static fromRows<C0, C1>(rows: globalThis.Array<[C0, C1]>, g?: GreyCat): Table<[C0, C1]>;
          static fromRows<C0, C1, C3>(
            rows: globalThis.Array<[C0, C1, C3]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3]>;
          static fromRows<C0, C1, C3, C4>(
            rows: globalThis.Array<[C0, C1, C3, C4]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4]>;
          static fromRows<C0, C1, C3, C4, C5>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5]>;
          static fromRows<C0, C1, C3, C4, C5, C6>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5, C6]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5, C6]>;
          static fromRows<C0, C1, C3, C4, C5, C6, C7>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5, C6, C7]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5, C6, C7]>;
          static fromRows<C0, C1, C3, C4, C5, C6, C7, C8>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5, C6, C7, C8]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5, C6, C7, C8]>;
          static fromRows<C0, C1, C3, C4, C5, C6, C7, C8, C9>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5, C6, C7, C8, C9]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5, C6, C7, C8, C9]>;
          static fromRows<C0, C1, C3, C4, C5, C6, C7, C8, C9, C10>(
            rows: globalThis.Array<[C0, C1, C3, C4, C5, C6, C7, C8, C9, C10]>,
            g?: GreyCat,
          ): Table<[C0, C1, C3, C4, C5, C6, C7, C8, C9, C10]>;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          static fromRows<T extends any[]>(
            rows: globalThis.Array<[...T]>,
            g?: GreyCat,
          ): Table<[...T]>;

          /**
           * Creates a table using an array of rows.
           */
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          static fromRows(rows: any[][], g: GreyCat = gc.$.default): gc.core.Table<any[]> {
            const ty = g.abi.types[g.abi.core.table];

            let nbColumns = 0;
            if (rows.length > 0) {
              for (let i = 0; i < rows.length; i++) {
                const len = rows[i].length;
                if (nbColumns < len) {
                  nbColumns = len;
                }
              }
            }
            const cols: globalThis.Array<Value[]> = globalThis.Array.from(
              { length: nbColumns },
              () => new globalThis.Array(rows.length),
            );

            // swap from row-based to column-based
            for (let c = 0; c < cols.length; c++) {
              for (let r = 0; r < rows.length; r++) {
                cols[c][r] = rows[r][c];
              }
            }

            const table = new ty.ctor(cols) as gc.core.Table;
            table._initial_value = rows;
            return table;
          }

          /**
           * Creates a table using an array of rows, rows being objects. Each fields will be destructured
           * and end-up as columns of fields, unless the objects are `GCPrimitive`s in which case it creates a
           * table of one column.
           */
          static fromObjects<T extends object | null | undefined>(
            objects: T[],
            g: GreyCat = gc.$.default,
          ): gc.core.Table<T> {
            if (objects.length === 0) {
              const ty = g.abi.types[g.abi.core.table];
              return new ty.ctor([]) as gc.core.Table<T>;
            }

            let allPrimitives = true;
            for (let i = 0; i < objects.length; i++) {
              const item = objects[i];
              if (!(item instanceof GCPrimitive)) {
                allPrimitives = false;
                break;
              }
            }
            if (allPrimitives) {
              const ty = g.abi.types[g.abi.core.table];
              const table = new ty.ctor([objects]) as gc.core.Table<T>;
              table.headers = ['Value'];
              table.subheaders = [(objects[0] as GCPrimitive).$type.name];
              table._initial_value = objects;
              return table;
            }

            const keys_dict = new Set<string>();
            for (let i = 0; i < objects.length; i++) {
              const obj = objects[i];
              if (!(obj instanceof GCPrimitive)) {
                for (const key in obj) {
                  if (Object.hasOwn(obj, key)) {
                    keys_dict.add(key);
                  }
                }
              }
            }
            const keys = globalThis.Array.from(keys_dict);

            const cols = new globalThis.Array(keys.length);
            for (let i = 0; i < keys.length; i++) {
              cols[i] = new globalThis.Array(objects.length);
            }

            for (let row = 0; row < objects.length; row++) {
              const obj = objects[row];
              if (typeof obj === 'object' && obj !== null) {
                for (let col = 0; col < cols.length; col++) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  cols[col][row] = (obj as any)[keys[col]];
                }
              } else {
                for (let col = 0; col < cols.length; col++) {
                  cols[col][row] = undefined;
                }
              }
            }

            const ty = g.abi.types[g.abi.core.table];
            const table = new ty.ctor(cols) as gc.core.Table<T>;
            table.headers = keys;
            table._initial_value = objects;
            return table;
          }

          static fromMap<K, V>(
            map: globalThis.Map<K, V>,
            g: GreyCat = gc.$.default,
          ): gc.core.Table<[K, V]> {
            const keys = globalThis.Array.from(map.keys());
            const values = globalThis.Array.from(map.values());
            const ty = g.abi.types[g.abi.core.table];
            const table = new ty.ctor([keys, values]) as gc.core.Table<[K, V]>;
            table.headers = ['Key', 'Value'];
            return table;
          }

          static override load<T extends Value = unknown>(
            r: AbiReader,
            ty: AbiType,
          ): gc.core.Table<T> {
            const nb_rows = r.read_vu32();
            const nb_cols = r.read_vu32();
            const cols = new globalThis.Array(nb_cols);
            for (let col = 0; col < nb_cols; col++) {
              cols[col] = r.read_array(nb_rows, false);
            }
            const table = new ty.ctor(cols) as gc.core.Table<T>;
            // // Automatically create rows based on generic type if possible
            // if (ty.generic_abi_type != 0) {
            //   const rowType = r.abi.types[ty.g1()];
            //   const rows = new globalThis.Array(nb_rows);
            //   for (let row = 0; row < nb_rows; row++) {
            //     const fields = new globalThis.Array(nb_cols);
            //     for (let col = 0; col < nb_cols; col++) {
            //       fields[col] = cols[col][row];
            //     }
            //     if (rowType.offset === r.abi.core.array || rowType.generic_abi_type === r.abi.core.array) {
            //       rows[row] = new rowType.ctor(fields);
            //     } else {
            //       rows[row] = new rowType.ctor(...fields);
            //     }
            //   }
            //   table._initial_value = rows;
            // }
            return table;
          }

          override saveContent(w: AbiWriter): void {
            const nb_rows = this.cols[0]?.length ?? 0;
            const nb_cols = this.cols.length;
            w.write_vu32(nb_rows);
            w.write_vu32(nb_cols);
            for (let col = 0; col < nb_cols; col++) {
              w.write_array(this.cols[col], false);
            }
          }

          sort(col: number, ord: sdk.SortOrd): void {
            if (col >= this.cols.length) {
              return;
            }

            // Create an index array [0, 1, 2, ..., n-1]
            const indices = this.cols[col].map((_, index) => index);

            // Sort rows based on the specified column
            indices.sort((a, b) => Table.compare(this.cols[col][a], this.cols[col][b], ord));

            // Rearrange each column in-place based on sorted indices
            for (let col = 0; col < this.cols.length; col++) {
              const sortedColumn = indices.map((index) => this.cols[col][index]);
              for (let row = 0; row < sortedColumn.length; row++) {
                this.cols[col][row] = sortedColumn[row];
              }
            }

            // Also rearrange the initial_value array if defined
            if (this._initial_value !== undefined) {
              const initial_value = this._initial_value;
              const sortedInitialValue = indices.map((index) => initial_value[index]);
              for (let r = 0; r < sortedInitialValue.length; r++) {
                initial_value[r] = sortedInitialValue[r];
              }
            }
          }

          /**
           * Returns either an object or an array depending on the underlying generic param of the core.Table
           *
           * *If you want to always get an array, use `getRowArray` instead*
           * @param index
           * @returns
           */
          getRow(index: number): T | undefined {
            if (this._initial_value !== undefined) {
              return this._initial_value[index] as T | undefined;
            }
            const nb_rows = this.cols[0]?.length ?? 0;
            if (index >= nb_rows) {
              return undefined;
            }
            if (this.$type.generic_abi_type != 0) {
              const elem_type = this.$type.abi.types[this.$type.g1_abi_type_desc >> 1];
              const nullable = (this.$type.g1_abi_type_desc & 0b00000001) === 1;
              const fields = new globalThis.Array(this.cols.length);
              let all_null = true;
              for (let col = 0; col < this.cols.length; col++) {
                fields[col] = this.cols[col][index];
                if (fields[col] !== null) {
                  all_null = false;
                }
              }
              if (nullable && all_null) {
                return null as T;
              }
              const value = new elem_type.ctor(...fields) as T;
              return value;
            }
            const row = new globalThis.Array(this.cols.length);
            for (let col = 0; col < this.cols.length; col++) {
              row[col] = this.cols[col][index];
            }
            return row as T;
          }

          /**
           * Returns the row as an array (if the `index` is not in bounds, returns `undefined`)
           */
          getRowArray(index: number): unknown[] | undefined {
            const nb_rows = this.cols[0]?.length ?? 0;
            if (index < 0 || index >= nb_rows) {
              return;
            }
            const row = new globalThis.Array(this.cols.length);
            for (let col = 0; col < this.cols.length; col++) {
              row[col] = this.cols[col][index];
            }
            return row;
          }

          nbRows(): number {
            return this.cols[0]?.length ?? 0;
          }

          iterByColumn(): TableColumnIterator {
            return new TableColumnIterator(0, this.cols);
          }

          [Symbol.iterator](): Iterator<T> {
            if (this.$type.generic_abi_type == 0 || this.$type.g1() === this.$type.abi.core.any) {
              return new TableArrayIterator(0, this as Table<unknown[]>) as Iterator<T>;
            }
            return new TableObjectIterator(0, this);
          }

          /**
           * Returns a list of column mappings based on the content of the table
           */
          async inferMappings(g: GreyCat = gc.$.default): Promise<gc.core.TableColumnMapping[]> {
            const mappings: gc.core.TableColumnMapping[] = [];
            const row = globalThis.Array.from({ length: this.cols.length });

            let hasNodes = false;
            for (let i = 0; i < this.cols.length; i++) {
              const value = this.cols[i][0];
              row[i] = value;
              if (value instanceof gc.core.node) {
                hasNodes = true;
              }
            }
            let columns: unknown[];
            const nodes = row.map((v) => (v instanceof gc.core.node ? v : null)) as gc.core.node[];
            if (hasNodes) {
              columns = await gc.core.node.resolve_all(nodes, g);
            } else {
              columns = row;
            }

            for (let i = 0; i < columns.length; i++) {
              const col = columns[i] === null ? row[i] : columns[i];
              if (col instanceof gc.core.node) {
                // nested node
                const [value] = await gc.core.node.resolve_all([col], g);
                if (value instanceof gc.sdk.GCObject && !value.$type.is_native) {
                  for (let j = 0; j < value.$type.attrs.length; j++) {
                    const attr = value.$type.attrs[j];
                    mappings.push(new gc.core.TableColumnMapping(i, [attr.name]));
                  }
                } else {
                  mappings.push(new gc.core.TableColumnMapping(i, ['*']));
                }
              } else if (col instanceof gc.sdk.GCObject && !col.$type.is_native) {
                for (let j = 0; j < col.$type.attrs.length; j++) {
                  const attr = col.$type.attrs[j];
                  mappings.push(new gc.core.TableColumnMapping(i, [attr.name]));
                }
              } else if (nodes[i] !== null) {
                mappings.push(new gc.core.TableColumnMapping(i, ['*']));
              }
            }
            return mappings;
          }

          override toJSON() {
            return this._initial_value ? this._initial_value : globalThis.Array.from(this);
          }
        }

        export class TableColumnIterator implements Iterator<unknown[]> {
          constructor(
            private _index: number,
            private readonly _cols: globalThis.Array<unknown[]>,
          ) {}

          next(): IteratorResult<unknown[]> {
            if (this._index < this._cols.length) {
              return { value: this._cols[this._index++], done: false };
            }
            return { value: undefined, done: true };
          }

          [Symbol.iterator]() {
            return this;
          }
        }

        export class TableObjectIterator<T> implements Iterator<T> {
          private readonly _nb_rows: number;
          private readonly _elem_type: AbiType;
          private readonly _nullable: boolean;

          constructor(
            private _index = 0,
            readonly table: Table<T>,
          ) {
            this._nb_rows = table.cols[0]?.length ?? 0;
            this._elem_type = table.$type.abi.types[table.$type.g1_abi_type_desc >> 1];
            this._nullable = (table.$type.g1_abi_type_desc & 0b00000001) === 1;
          }

          next(): IteratorResult<T> {
            if (this._index >= this._nb_rows) {
              return { value: undefined, done: true };
            }

            const nb_cols = this.table.cols.length;
            const fields = new globalThis.Array(nb_cols);
            let all_null = true;
            for (let col = 0; col < nb_cols; col++) {
              fields[col] = this.table.cols[col][this._index];
              if (fields[col] !== null) {
                all_null = false;
              }
            }
            this._index += 1;
            let value: T;
            if (this._nullable && all_null) {
              value = null as T;
            } else {
              value = new this._elem_type.ctor(...fields) as T;
            }
            return { value, done: false };
          }

          [Symbol.iterator]() {
            return this;
          }
        }

        export class TableArrayIterator implements Iterator<unknown[]> {
          private readonly _nb_rows: number;

          constructor(
            private _index = 0,
            readonly table: Table<unknown[]>,
          ) {
            this._nb_rows = table.cols[0]?.length ?? 0;
          }

          next(): IteratorResult<unknown[]> {
            if (this._index >= this._nb_rows) {
              return { value: undefined, done: true };
            }

            const nb_cols = this.table.cols.length;
            const row = new globalThis.Array(nb_cols);
            for (let col = 0; col < nb_cols; col++) {
              row[col] = this.table.cols[col][this._index];
            }
            this._index += 1;
            return { value: row, done: false };
          }

          [Symbol.iterator]() {
            return this;
          }
        }
      }
    }
  }
}
