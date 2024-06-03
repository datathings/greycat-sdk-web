import { AbiType } from '@greycat/sdk';

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
 * `TableLike` handles different shape to essentially produce a `TableLikeColumnBased` instance.
 * 
 * Most table-based components will accept this type instead of the `std::core::Table` type
 * so that more than just the standard table can be used.
 * 
 * *This is mainly useful for in-mem usage of the components in JavaScript*
 */
export type TableLike = TableLikeColumnBased | TableLikeRowBased | TableLikeObjectBased;
export type TableLikeColumnBased = {
  /** Specify either `rows` **OR** `cols` not both. If both are specified, `cols` will be used. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols?: any[][];
  meta?: TableLikeMeta[];
};
export type TableLikeRowBased = {
  /** Specify either `rows` **OR** `cols` not both. If both are specified, `cols` will be used. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows?: any[][];
  meta?: (string | TableLikeMeta)[];
}
export type TableLikeObjectBased = Array<Record<string, unknown>>;

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
    const { cols, meta } = table;

    if (!cols || cols.length === 0) {
      return { rows: [], meta };
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

    return { rows, meta };
  }
  if (Array.isArray(table)) {
    if (table.length === 0) {
      return {};
    }

    const headers = Object.keys(table[0]);
    const rows = new Array(table.length);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (let row = 0; row < rows.length; row++) {
      rows[row] = new Array(headers.length);
      for (let col = 0; col < headers.length; col++) {
        rows[row][col] = table[row][headers[col]];
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { rows, meta: headers.map(header => ({ header })) };
  }
  return {};
}

/**
 * Creates a `TableLikeColumnBased` from an array of `rows` and optional `headers`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tableFromRows(rows: Array<any[]>, headers?: (string | TableLikeMeta)[]): TableLikeColumnBased {
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
    return {};
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
export function tableFromObjects(rows: Array<Record<string, unknown>>): TableLikeColumnBased {
  if (rows.length === 0) {
    return {};
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
      cols[col][row] = rows[row][headers[col]];
    }
  }

  return {
    cols,
    meta: headers.map((header) => ({ header })),
  };
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
