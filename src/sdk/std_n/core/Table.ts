import type { AbiReader, AbiWriter, AbiType, std } from '../../exports.js';
import { Value, GreyCat, GCObject, $, SortOrd } from '../../exports.js';

/**
 * Table is iterable by row by default using the `for..of` statement.
 *
 * One can iterate by columns by using the `for..of` statement on `table.iter_by_column()`.
 */
export class Table<T = unknown[]> extends GCObject {
  static readonly _type = 'core::Table' as const;
  static readonly COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static compare(a: any, b: any, ord: SortOrd): number {
    let diff: number;
    if (typeof a === 'string' && typeof b === 'string') {
      diff = Table.COLLATOR.compare(a, b);
    } else {
      diff = a > b ? 1 : a < b ? -1 : 0;
    }
    return ord === SortOrd.asc ? diff : -diff;
  }

  /**
   * Optional headers for each column.
   *
   * When the table is created using `fromObjects()` the objects keys are used.
   * If the table knows its generic param, the generic param fields are used.
   */
  public headers: string[] | undefined;
  public subheaders: string[] | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(type: AbiType, public cols: any[][] = []) {
    super(type);
    if (type.generic_abi_type != 0) {
      const generic_param_type = type.abi.types[type.g1_abi_type_desc >> 1];
      this.headers = generic_param_type.attrs.map((a) => a.name);
      this.subheaders = generic_param_type.attrs.map((a) => type.abi.types[a.abi_type].name);
    }
  }

  /**
   * Creates a table using an array of columns.
   */
  static create(cols: unknown[][] = [], g: GreyCat = $.default): std.core.Table<unknown[]> {
    const ty = g.abi.types[g.abi.core.table];
    return new ty.factory(ty, cols) as std.core.Table;
  }

  /**
   * Proxies to `Table.create(...)`
   */
  static fromCols(cols: unknown[][] = [], g: GreyCat = $.default): std.core.Table<unknown[]> {
    return Table.create(cols, g);
  }

  static fromRows<C0, C1>(rows: Array<[C0, C1]>, g?: GreyCat): Table<[C0, C1]>;
  static fromRows<C0, C1, C3>(rows: Array<[C0, C1, C3]>, g?: GreyCat): Table<[C0, C1, C3]>;
  static fromRows<C0, C1, C3, C4>(
    rows: Array<[C0, C1, C3, C4]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4]>;
  static fromRows<C0, C1, C3, C4, C5>(
    rows: Array<[C0, C1, C3, C4, C5]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5]>;
  static fromRows<C0, C1, C3, C4, C5, C6>(
    rows: Array<[C0, C1, C3, C4, C5, C6]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5, C6]>;
  static fromRows<C0, C1, C3, C4, C5, C6, C7>(
    rows: Array<[C0, C1, C3, C4, C5, C6, C7]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5, C6, C7]>;
  static fromRows<C0, C1, C3, C4, C5, C6, C7, C8>(
    rows: Array<[C0, C1, C3, C4, C5, C6, C7, C8]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5, C6, C7, C8]>;
  static fromRows<C0, C1, C3, C4, C5, C6, C7, C8, C9>(
    rows: Array<[C0, C1, C3, C4, C5, C6, C7, C8, C9]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5, C6, C7, C8, C9]>;
  static fromRows<C0, C1, C3, C4, C5, C6, C7, C8, C9, C10>(
    rows: Array<[C0, C1, C3, C4, C5, C6, C7, C8, C9, C10]>,
    g?: GreyCat,
  ): Table<[C0, C1, C3, C4, C5, C6, C7, C8, C9, C10]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromRows<T extends any[]>(rows: Array<[...T]>, g?: GreyCat): Table<[...T]>;

  /**
   * Creates a table using an array of rows.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromRows(rows: any[][], g: GreyCat = $.default): std.core.Table<any[]> {
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
    const cols: Array<Value[]> = Array.from({ length: nbColumns }, () => new Array(rows.length));

    // swap from row-based to column-based
    for (let c = 0; c < cols.length; c++) {
      for (let r = 0; r < rows.length; r++) {
        cols[c][r] = rows[r][c];
      }
    }

    return new ty.factory(ty, cols) as std.core.Table;
  }

  /**
   * Creates a table using an array of rows, rows being objects. Each fields will be destructured
   * and end-up as columns of fields.
   */
  static fromObjects<T extends object | null | undefined>(
    rows: T[],
    g: GreyCat = $.default,
  ): std.core.Table<unknown[]> {
    if (rows.length === 0) {
      const ty = g.abi.types[g.abi.core.table];
      return new ty.factory(ty, []) as std.core.Table<unknown[]>;
    }

    const keys_dict = new Set<string>();
    for (let i = 0; i < rows.length; i++) {
      const obj = rows[i];
      if (obj) {
        for (const key in obj) {
          if (Object.hasOwn(obj, key)) {
            keys_dict.add(key);
          }
        }
      }
    }
    const keys = Array.from(keys_dict);

    const cols = new Array(keys.length);
    for (let i = 0; i < keys.length; i++) {
      cols[i] = new Array(rows.length);
    }

    for (let row = 0; row < rows.length; row++) {
      const obj = rows[row];
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
    const table = new ty.factory(ty, cols) as std.core.Table<unknown[]>;
    table.headers = keys;
    return table;
  }

  static fromMap<K, V>(map: Map<K, V>, g: GreyCat = $.default): std.core.Table<[K, V]> {
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    const ty = g.abi.types[g.abi.core.table];
    const table = new ty.factory(ty, [keys, values]) as std.core.Table<[K, V]>;
    table.headers = ['Key', 'Value'];
    return table;
  }

  static load<T extends Value = unknown>(r: AbiReader, ty: AbiType): std.core.Table<T> {
    const nb_rows = r.read_vu32();
    const nb_cols = r.read_vu32();
    const cols = new Array(nb_cols);
    for (let col = 0; col < nb_cols; col++) {
      cols[col] = r.read_array(nb_rows);
    }
    const factory = r.abi.types[r.abi.core.table].factory;
    return new factory(ty, cols) as std.core.Table<T>;
  }

  override saveContent(w: AbiWriter): void {
    const nb_rows = this.cols[0]?.length ?? 0;
    const nb_cols = this.cols.length;
    w.write_vu32(nb_rows);
    w.write_vu32(nb_cols);
    for (let col = 0; col < nb_cols; col++) {
      w.write_array(this.cols[col]);
    }
  }

  sort(col: number, ord: SortOrd): void {
    if (col >= this.cols.length) {
      return;
    }

    // Create an index array [0, 1, 2, ..., n-1]
    const indices = this.cols[col].map((_, index) => index);

    // Sort rows based on the specified column
    indices.sort((a, b) => Table.compare(this.cols[col][a], this.cols[col][b], ord));

    // Rearrange each column in-place based on sorted indices
    for (let k = 0; k < this.cols.length; k++) {
      const sortedColumn = indices.map((index) => this.cols[k][index]);
      for (let i = 0; i < sortedColumn.length; i++) {
        this.cols[k][i] = sortedColumn[i];
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
    const nb_rows = this.cols[0]?.length ?? 0;
    if (index >= nb_rows) {
      return undefined;
    }
    if (this.$type.generic_abi_type != 0) {
      const elem_type = this.$type.abi.types[this.$type.g1_abi_type_desc >> 1];
      const nullable = (this.$type.g1_abi_type_desc & 0b00000001) === 1;
      const fields = new Array(this.cols.length);
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
      const value = new elem_type.factory(elem_type, ...fields) as T;
      return value;
    }
    const row = new Array(this.cols.length);
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
    const row = new Array(this.cols.length);
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
    if (this.$type.generic_abi_type == 0) {
      return new TableArrayIterator(0, this as Table<unknown[]>) as Iterator<T>;
    }
    return new TableObjectIterator(0, this);
  }

  override toJSON() {
    return {
      _type: Table._type,
      cols: this.cols,
    };
  }
}

export class TableColumnIterator implements Iterator<unknown[]> {
  constructor(private _index: number, private readonly _cols: Array<unknown[]>) {}

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

  constructor(private _index = 0, readonly table: Table<T>) {
    this._nb_rows = table.cols[0]?.length ?? 0;
    this._elem_type = table.$type.abi.types[table.$type.g1_abi_type_desc >> 1];
    this._nullable = (table.$type.g1_abi_type_desc & 0b00000001) === 1;
  }

  next(): IteratorResult<T> {
    if (this._index >= this._nb_rows) {
      return { value: undefined, done: true };
    }

    const nb_cols = this.table.cols.length;
    const fields = new Array(nb_cols);
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
      value = new this._elem_type.factory(this._elem_type, ...fields) as T;
    }
    return { value, done: false };
  }

  [Symbol.iterator]() {
    return this;
  }
}

export class TableArrayIterator implements Iterator<unknown[]> {
  private readonly _nb_rows: number;

  constructor(private _index = 0, readonly table: Table<unknown[]>) {
    this._nb_rows = table.cols[0]?.length ?? 0;
  }

  next(): IteratorResult<unknown[]> {
    if (this._index >= this._nb_rows) {
      return { value: undefined, done: true };
    }

    const nb_cols = this.table.cols.length;
    const row = new Array(nb_cols);
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
