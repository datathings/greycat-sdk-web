import { AbiType, core, GCObject } from '@greycat/sdk';

declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
}

export class GuiElement extends HTMLElement {
  connectedCallback(): void | Promise<void> { }
  disconnectedCallback(): void | Promise<void> { }
}

export class GuiRenderEvent extends CustomEvent<number> {
  constructor(startTimeInMs: number) {
    super('render', { detail: Date.now() - startTimeInMs });
  }
}

// duck-type core.NativeTableColumn
export type TableLikeMeta = {
  header?: string | null;
  typeName?: string | null;
};

/**
 * `TableLike` handles different shapes of tables to essentially produce a `TableLikeColumnBased` instance.
 *
 * Most table-based components will accept this type instead of the `std::core::Table` type
 * so that more than just the standard table can be used.
 *
 * *This is mainly useful for in-mem usage of the components in JavaScript*
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableLike = Map<any, any> | core.Map | core.Table | TableLikeColumnBased | TableLikeRowBased | TableLikeObjectBased;
export type TableLikeColumnBased = {
  /** Specify either `rows` **OR** `cols` not both. Isf both are specified, `cols` will be used. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols?: any[][];
  meta?: (string | TableLikeMeta)[];
};
export type TableLikeRowBased = {
  /** Specify either `rows` **OR** `cols` not both. If both are specified, `cols` will be used. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows?: any[][];
  meta?: (string | TableLikeMeta)[];
};
export type TableLikeObjectBased = Array<object>;

/**
 * Converts the given `table` to a `TableLikeColumnBased`.
 *
 * If the given `table` is already a `TableLikeColumnBased`, this is a noop.
 * For the other shape of table, a conversion is applied and a new table is created.
 */
export function toColumnBasedTable(table: TableLike): TableLikeColumnBased {
  if ('cols' in table) {
    return table;
  }
  if ('rows' in table) {
    return tableFromRows(table.rows ?? [], table.meta);
  }
  if (Array.isArray(table)) {
    return tableFromObjects(table);
  }
  return {};
}

/**
 * Converts the given `table` to a `TableLikeRowBased`.
 *
 * If the given `table` is already a `TableLikeRowBased`, this is a noop.
 * For the other shape of table, a conversion is applied and a new table is created.
 */
export function toRowBasedTable(table: TableLike): TableLikeRowBased {
  if ('rows' in table) {
    return table;
  }
  if ('cols' in table) {
    return { rows: colsToRows(table.cols), meta: table.meta };
  }
  if (Array.isArray(table)) {
    if (table.length === 0) {
      return { rows: undefined };
    }

    const headers = Object.keys(table[0]);
    const rows = new Array(table.length);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (let row = 0; row < rows.length; row++) {
      rows[row] = new Array(headers.length);
      for (let col = 0; col < headers.length; col++) {
        const key = headers[col];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows[row][col] = (table[row] as any)[key];
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { rows, meta: headers.map((header) => ({ header })) };
  }

  return { rows: undefined };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function colsToRows(cols?: unknown[][]): any[][] | undefined {
  if (!cols || cols.length === 0) {
    return undefined;
  }

  const colCount = cols.length;
  const rowCount = cols[0].length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[][] = new Array(rowCount);

  for (let row = 0; row < rowCount; row++) {
    rows[row] = new Array(colCount);
    for (let col = 0; col < colCount; col++) {
      rows[row][col] = cols[col][row];
    }
  }

  return rows;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowsToCols(rows?: unknown[][]): any[][] | undefined {
  if (!rows || rows.length === 0) {
    return undefined;
  }

  const colCount = rows[0].length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cols: any[][] = new Array(colCount);

  for (let i = 0; i < colCount; i++) {
    cols[i] = new Array(rows.length);
  }

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < colCount; col++) {
      cols[col][row] = rows[row][col];
    }
  }

  return cols;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToCols(map: Map<unknown, unknown>): any[][] | undefined {
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  return [keys, values];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectsToCols(arr?: unknown[]): any[][] | undefined {
  if (!arr || arr.length === 0) {
    return undefined;
  }

  const firstElem = arr[0];
  if (typeof firstElem !== 'object' || firstElem === null || firstElem === undefined) {
    // elements must be non-optional 'object' values
    return undefined;
  }
  const keys = Object.keys(firstElem);

  const cols = new Array(keys.length);
  for (let i = 0; i < keys.length; i++) {
    cols[i] = new Array(arr.length);
  }

  for (let row = 0; row < arr.length; row++) {
    const obj = arr[row];
    if (typeof obj === 'object' && obj) {
      for (let col = 0; col < cols.length; col++) {
        const key = keys[col];
        cols[col][row] = (obj as { [n: string]: unknown })[key];
      }
    } else {
      for (let col = 0; col < cols.length; col++) {
        cols[col][row] = null;
      }
    }
  }

  return cols;
}

/**
 * Creates a `TableLikeColumnBased` from an array of `rows` and optional `headers`.
 */
export function tableFromRows(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<any[]>,
  headers?: (string | TableLikeMeta)[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { cols: any[][] | undefined; meta: TableLikeMeta[] | undefined } {
  const meta = headers
    ? headers.map((header) => {
      if (typeof header === 'string') {
        return { header };
      }
      return header;
    })
    : undefined;

  const rowCount = rows.length;
  if (rowCount === 0) {
    if (headers) {
      return {
        cols: new Array(headers.length), // empty columns
        meta,
      };
    }
    return { cols: undefined, meta: undefined };
  }

  const colCount = rows[0]?.length ?? 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cols: any[][] = new Array(colCount);

  for (let i = 0; i < colCount; i++) {
    cols[i] = new Array(rowCount);
  }

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      cols[col][row] = rows[row][col];
    }
  }

  return { cols, meta };
}

/**
 * Creates a `TableLikeColumnBased` from an array of object, using the first item in the list
 * to determine the order of the columns based on the order of the object's keys.
 *
 * The keys of that first object will be used as the meta headers.
 */
export function tableFromObjects(rows: Array<object>): TableLikeColumnBased {
  if (rows.length === 0) {
    return { cols: undefined };
  }
  const headers = Object.keys(rows[0]);

  const rowCount = rows.length;
  const colCount = headers.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cols: any[][] = new Array(colCount);

  for (let i = 0; i < colCount; i++) {
    cols[i] = new Array(rowCount);
  }

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const key = headers[col];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cols[col][row] = (rows[row] as any)[key];
    }
  }

  return {
    cols,
    meta: headers.map((header) => ({ header })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowsFromMap(map: Map<unknown, unknown>): any[][] | undefined {
  return Array.from(map.entries());
}

export function tableRowsFromArray(arr: Array<unknown>): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[][] | undefined;
  meta: TableLikeMeta[] | undefined;
} {
  if (arr.length === 0) {
    return { rows: undefined, meta: undefined };
  }
  let headers: string[];
  let containsObjects = false;
  if (typeof arr[0] === 'object' && arr[0]) {
    headers = Object.keys(arr[0]);
    containsObjects = true;
  } else {
    headers = ['Element'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[][] = new Array(arr.length);

  for (let row = 0; row < arr.length; row++) {
    rows[row] = new Array(headers.length);
    for (let col = 0; col < headers.length; col++) {
      if (containsObjects) {
        const key = headers[col];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows[row][col] = (arr[row] as any)[key];
      } else {
        rows[row][col] = arr[row];
      }
    }
  }

  return {
    rows,
    meta: headers.map((header) => ({ header })),
  };
}

/**
 * A convenience wrapper that allows to manipulate
 * tables either by columns or by rows.
 * 
 * This wrapper caches the views locally therefore, it is better
 * to use this than to manually compute by rows or columns each time.
 */
export class TableView {
  private _table!: TableLike;
  private _meta!: TableLikeMeta[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _cols: any[][] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _rows: any[][] | undefined;

  constructor(table: TableLike = { cols: undefined }) {
    // use the setter here will make sure `non-null-asserted` props
    // are defined
    this.table = table;
  }

  /**
   * Updates the underlying table.
   * 
   * *This also resets the cached `cols`, `rows` and `meta`.*
   */
  set table(table: TableLike | undefined) {
    // Make sure to always set:
    // - this._table
    // - this._meta
    // Because they are non-null-asserted in the class definition
    // and this setter is called by the constructor
    this._table = table ?? { cols: undefined };

    if (this._table instanceof core.Table) {
      this._cols = this._table.cols;
      this._rows = undefined;
      this._meta = this._table.meta;
    } else if (this._table instanceof core.Map) {
      this._cols = undefined;
      this._rows = undefined;
      this._meta = this._createMetaFromMap(this._table.map);
    } else if (this._table instanceof Map) {
      this._cols = undefined;
      this._rows = undefined;
      this._meta = this._createMetaFromMap(this._table);
    } else if ('cols' in this._table) {
      this._cols = this._table.cols;
      this._rows = undefined;
      this._meta = this._createMetaFromColumns(this._table.cols, this._table.meta);
    } else if ('rows' in this._table) {
      this._cols = undefined;
      this._rows = this._table.rows;
      this._meta = this._createMetaFromRows(this._table.rows, this._table.meta);
    } else if (Array.isArray(this._table)) {
      this._cols = undefined;
      this._rows = undefined;
      this._meta = this._createMetaFromArray(this._table);
    } else {
      this._meta = [];
    }
  }

  get kind(): 'column' | 'row' | 'objects' | 'map' {
    if ('cols' in this._table) {
      return 'column';
    }
    if ('rows' in this._table) {
      return 'row';
    }
    if (this._table instanceof core.Map || this._table instanceof Map) {
      return 'map';
    }
    return 'objects';
  }

  /**
   * The underlying table.
   */
  get table() {
    return this._table;
  }

  /**
   * The meta
   */
  get meta() {
    if (this._meta) {
      return this._meta;
    }

    // lazy-load meta
    return this._meta;
  }

  get cols() {
    if (this._cols) {
      return this._cols;
    }

    if ('cols' in this._table) {
      this._cols = this._table.cols ?? [];
      return this._cols;
    }

    if ('rows' in this._table) {
      this._cols = rowsToCols(this._table.rows) ?? [];
      return this._cols;
    }

    if (this._table instanceof core.Map) {
      this._cols = mapToCols(this._table.map) ?? [];
      return this._cols;
    }

    if (this._table instanceof Map) {
      this._cols = mapToCols(this._table) ?? [];
      return this._cols;
    }

    if (Array.isArray(this._table)) {
      this._cols = objectsToCols(this._table) ?? [];
      return this._cols;
    }

    this._cols = [];
    return this._cols;
  }

  get rows() {
    if (this._rows) {
      return this._rows;
    }

    if ('cols' in this._table) {
      this._rows = colsToRows(this._table.cols) ?? [];
      return this._rows;
    }

    if ('rows' in this._table) {
      this._rows = this._table.rows ?? [];
      return this._rows;
    }

    if (this._table instanceof core.Map) {
      this._rows = rowsFromMap(this._table.map) ?? [];
      return this._rows;
    }

    if (this._table instanceof Map) {
      this._rows = rowsFromMap(this._table) ?? [];
      return this._rows;
    }

    if (Array.isArray(this._table)) {
      const { rows, meta } = tableRowsFromArray(this._table);
      this._rows = rows ?? [];
      this._meta = meta ?? [];
      return this._rows;
    }

    this._rows = [];
    return this._rows;
  }

  private _createMetaFromColumns(
    cols?: unknown[][],
    meta?: (TableLikeMeta | string)[],
  ): TableLikeMeta[] {
    if (meta) {
      for (let i = 0; i < meta.length; i++) {
        const m = meta[i];
        if (typeof m === 'string') {
          meta[i] = { header: m };
        }
      }
      return meta as TableLikeMeta[];
    }
    if (!cols) {
      return [];
    }
    const res = new Array(cols.length);
    for (let i = 0; i < res.length; i++) {
      res[i] = { header: `Column ${i}` };
    }
    return res;
  }

  private _createMetaFromRows(
    rows?: unknown[][],
    meta?: (TableLikeMeta | string)[],
  ): TableLikeMeta[] {
    if (meta) {
      for (let i = 0; i < meta.length; i++) {
        const m = meta[i];
        if (typeof m === 'string') {
          meta[i] = { header: m };
        }
      }
      return meta as TableLikeMeta[];
    }
    if (!rows || rows.length === 0) {
      return [];
    }
    const res = new Array(rows[0].length);
    for (let i = 0; i < res.length; i++) {
      res[i] = { header: `Column ${i}` };
    }
    return res;
  }

  private _createMetaFromArray(
    rows: Array<unknown>,
  ): TableLikeMeta[] {
    if (rows.length === 0) {
      return [];
    }
    if (typeof rows[0] === 'object' && rows[0]) {
      return Object.keys(rows[0]).map((header) => ({ header }));
    } else {
      return [{ header: 'Column 0' }];
    }
  }

  private _createMetaFromMap(map: Map<unknown, unknown>): TableLikeMeta[] {
    let keyType: string | undefined;
    let valueType: string | undefined;
    map.forEach((value, key) => {
      const kType = key instanceof GCObject ? key.$type.name : typeof key;
      if (keyType === undefined) {
        keyType = kType;
      } else if (keyType !== kType) {
        keyType = 'core::undefined';
      }

      const vType = value instanceof GCObject ? value.$type.name : typeof value;
      if (valueType === undefined) {
        valueType = vType;
      } else if (valueType !== vType) {
        valueType = 'core::undefined';
      }
    });
    return [{ header: 'Key', typeName: keyType }, { header: 'Value', typeName: valueType }];
  }
}

export type IDisposable = () => void;

export class Disposer {
  readonly disposables: IDisposable[] = [];
  private _ctrl = new AbortController();

  get signal(): AbortSignal {
    return this._ctrl.signal;
  }

  dispose(): void {
    this._ctrl.abort();
    this._ctrl = new AbortController();
    for (let i = 0; i < this.disposables.length; i++) {
      this.disposables[i]();
    }
    this.disposables.length = 0;
  }
}

const CORE_MOD_PREFIX = 'core::';
const CORE_MOD_LEN = CORE_MOD_PREFIX.length;

export function displayType(type: AbiType, nullable = false): string {
  if (type.name.startsWith(CORE_MOD_PREFIX)) {
    const ty = type.name.slice(CORE_MOD_LEN);
    return nullable ? `${ty}?` : ty;
  }
  return nullable ? `${type.name}?` : type.name;
}

export type HTMLElementConstructor<K extends keyof HTMLElementTagNameMap> = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => HTMLElementTagNameMap[K];

/**
 * Calls `customElements.define(tagName, constructor)` if necessary.
 *
 * *This method strictly types the `constructor` relative to the `tagName` to prevent
 * developper from forgetting to declare there element in `HTMLElementTagNameMap`.*
 *
 * @param tagName
 * @param constructor
 * @param options
 */
export function registerCustomElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  constructor: HTMLElementConstructor<K>,
  options?: ElementDefinitionOptions | undefined,
) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, constructor, options);
  }
}
