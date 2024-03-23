import { AbiType } from '@greycat/sdk';

declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
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
 * Leveraging duck-typing to describe a core::Table-like type that also accepts an empty object `{}`
 * or a set of columns without meta.
 */
export type TableLike = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols?: any[][];
  meta?: TableLikeMeta[];
};

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
