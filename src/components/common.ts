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
export type DisposerId = { id: number };

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

  requestAnimationFrame(handler: FrameRequestCallback): DisposerId {
    const id = window.requestAnimationFrame(handler);
    const rafId: DisposerId = { id };
    this.disposables.push(() => cancelAnimationFrame(rafId.id));
    return rafId;
  }

  dispose(): void {
    for (let i = 0; i < this.disposables.length; i++) {
      this.disposables[i]();
    }
    this.disposables.length = 0;
  }
}