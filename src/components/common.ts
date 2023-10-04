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

// duck-type core.Table
export type TableLike = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols: any[][];
};

export type IDisposable = () => void;

export class Disposer {
  readonly disposables: IDisposable[] = [];

  addEventListener<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
    el: E,
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.disposables.push(() => el.removeEventListener(type, listener));
    el.addEventListener(type, listener, options);
  }

  dispose(): void {
    for (let i = 0; i < this.disposables.length; i++) {
      this.disposables[i]();
    }
    this.disposables.length = 0;
  }
}