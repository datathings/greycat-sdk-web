import componentStyle from './styles.component.css?inline';

declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
}

export function customElement(tagName: string) {
  return (constructor: CustomElementConstructor): void => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, constructor);
    }
  };
}

export function css(text: string): CSSStyleSheet {
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(text);
  return stylesheet;
}

export function attr() {
  return function attrDecorator<T, E extends GuiValueElement<T>, K extends keyof E>(
    target: E,
    propertyKey: K,
  ): void {
    // create a unique property for each instance to store the value
    const privateKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get: function get(this: E) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this as any)[privateKey];
      },
      set: function set(this: E, newValue: E[K]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)[privateKey] = newValue;
        this._internalUpdate();
      },
      enumerable: true,
      configurable: false,
    });
  };
}

export abstract class GuiElement extends HTMLElement {
  static readonly styles = [css(componentStyle)];

  /** Returns this element's shadow root */
  override shadowRoot!: ShadowRoot;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [...GuiElement.styles, ...(this.constructor as typeof GuiElement).styles];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValueElement = HTMLElement & { value: any };

export abstract class GuiValueElement<T = unknown> extends GuiElement {
  abstract value: T;
  protected _updatePending: boolean;
  updateComplete: Promise<void>;

  constructor() {
    super();
    this._updatePending = false;
    this.updateComplete = Promise.resolve();
  }

  connectedCallback(): void {
    this._internalUpdate();
  }

  disconnectedCallback(): void {}

  protected _internalUpdate(): void {
    if (this._updatePending || !this.isConnected) {
      return;
    }
    this._updatePending = true;
    const { promise, resolve } = Promise.withResolvers<void>();
    this.updateComplete = promise;
    queueMicrotask(() => {
      this.update();
      this._updatePending = false;
      resolve();
    });
  }

  update(): void {}
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
  | greycat.core.Map
  | greycat.core.Table
  | { cols: unknown[][] }
  | { rows: unknown[][] }
  | Array<object>;

export function convertToTable(table: TableLike | undefined | null): greycat.core.Table {
  if (table === undefined || table === null) {
    return greycat.core.Table.create();
  }
  if (table instanceof greycat.core.Table) {
    return table;
  }
  if (table instanceof Map) {
    return greycat.core.Table.fromMap(table);
  }
  if (table instanceof greycat.core.Map) {
    return greycat.core.Table.fromMap(table.map);
  }
  if (Array.isArray(table)) {
    if (table.length > 0) {
      if (Array.isArray(table[0])) {
        return greycat.core.Table.fromRows(table as unknown[][]);
      }
      if (typeof table[0] === 'object') {
        return greycat.core.Table.fromObjects(table);
      }
      const new_table = greycat.core.Table.fromCols([table]);
      new_table.headers = ['Element'];
      return new_table;
    }
    return greycat.core.Table.create();
  }
  if (table && typeof table === 'object') {
    if ('cols' in table) {
      return greycat.core.Table.create(table.cols);
    }
    if ('rows' in table) {
      return greycat.core.Table.fromRows(table.rows);
    }
    return greycat.core.Table.fromObjects([table]);
  }
  return greycat.core.Table.create();
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

export function displayType(type: greycat.AbiType, nullable = false): string {
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
