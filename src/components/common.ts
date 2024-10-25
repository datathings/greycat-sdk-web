import { AbiType, std, core } from '../exports.js';

declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
}

export abstract class GuiElement<T = unknown> extends HTMLElement {
  abstract value: T;

  connectedCallback(): void | Promise<void> {}
  disconnectedCallback(): void | Promise<void> {}
}

export class GuiRenderEvent extends CustomEvent<number> {
  constructor(startTimeInMs: number) {
    super('render', { detail: Date.now() - startTimeInMs });
  }
}

export type TableColumnMeta = {
  /** An optional column header name */
  header?: string | null;
  /** An optional column header type */
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
export type TableLike =
  | Map<unknown, unknown>
  | std.core.Map
  | std.core.Table
  | { cols: unknown[][] }
  | { rows: unknown[][] }
  | Array<object>;

export function convertToTable(table: TableLike | undefined | null): core.Table {
  if (table === undefined || table === null) {
    return core.Table.create();
  }
  if (table instanceof core.Table) {
    return table;
  }
  if (table instanceof Map) {
    return core.Table.fromMap(table);
  }
  if (table instanceof core.Map) {
    return core.Table.fromMap(table.map);
  }
  if (Array.isArray(table)) {
    if (table.length > 0) {
      if (Array.isArray(table[0])) {
        return core.Table.fromRows(table as unknown[][]);
      }
      if (typeof table[0] === 'object') {
        return core.Table.fromObjects(table);
      }
      const new_table = core.Table.fromRows(table as unknown[][]);
      new_table.headers = ['Element'];
      return new_table;
    }
    return core.Table.create();
  }
  if (table && typeof table === 'object') {
    if ('cols' in table) {
      return core.Table.create(table.cols);
    }
    if ('rows' in table) {
      return core.Table.fromRows(table.rows);
    }
    return core.Table.fromObjects([table]);
  }
  return core.Table.create();
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
