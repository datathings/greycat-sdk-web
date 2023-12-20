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

// duck-type core.Table
export type TableLike = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols: any[][];
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