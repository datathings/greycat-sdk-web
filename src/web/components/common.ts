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

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class GuiElement extends HTMLElement {
  static readonly styles = [css(componentStyle)];

  /** Returns this element's shadow root */
  override shadowRoot!: ShadowRoot;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [
      ...GuiElement.styles,
      ...(this.constructor as typeof GuiElement).styles,
    ];
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
    super('render', { detail: Date.now() - startTimeInMs, composed: true });
  }
}

export type TableColumnMeta = {
  /** An optional column header name */
  header?: string | null;
  /** An optional column header type */
  typeName?: string | null;
};

/**
 * `TableLike` handles different shapes of tables to essentially produce a `gc.core.Table` instance.
 *
 * Most table-based components will accept this type instead of the `std::core::Table` type
 * so that more than just the standard table can be used.
 */
export type TableLike =
  | Map<unknown, unknown>
  | gc.core.Map
  | gc.core.Table
  | { cols: unknown[][] }
  | { rows: unknown[][] }
  | Array<object>;

export function convertToTable(table: TableLike | undefined | null): gc.core.Table {
  if (table === undefined || table === null) {
    return gc.core.Table.create();
  }
  if (table instanceof gc.core.Table) {
    return table;
  }
  if (table instanceof Map) {
    return gc.core.Table.fromMap(table);
  }
  if (table instanceof gc.core.Map) {
    return gc.core.Table.fromMap(table.map);
  }
  if (table instanceof gc.core.Array) {
    const new_table = convertToTable(table.values);
    if (table.$type.generic_abi_type === table.$type.abi.core.array) {
      const paramType = table.$type.abi.types[table.$type.g1()];
      new_table.headers = paramType.attrs.map((a) => a.name);
      new_table.subheaders = paramType.attrs.map((a) => table.$type.abi.types[a.abi_type].name);
    }
    return new_table;
  }
  if (Array.isArray(table)) {
    if (table.length > 0) {
      if (Array.isArray(table[0])) {
        return gc.core.Table.fromRows(table as unknown[][]);
      }
      if (typeof table[0] === 'object') {
        return gc.core.Table.fromObjects(table);
      }
      const new_table = gc.core.Table.fromCols([table]);
      new_table.headers = ['Element'];
      return new_table;
    }
    return gc.core.Table.create();
  }
  return gc.core.Table.create();
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

export function displayType(type: gc.sdk.AbiType, nullable = false): string {
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

export function getBooleanAttribute(el: Element, name: string): boolean {
  const attr = el.getAttribute(name);
  return (attr !== null) && (attr !== 'false');
}