import { debounce } from '../internals.js';
import { GuiElement } from './common.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export type Constructor<T = {}> = new (...args: any[]) => T;

export interface Resizable {
  onResize(entriy: ResizeObserverEntry): void;
}

/**
 * Adds a resize observer to this HTMLElement that calls `onResize()` everytime
 * this element resizes. The call is debounced for performance reasons (default 200ms)
 *
 * @param superClass 
 * @param debounceDelay 
 * @returns 
 */
export function Resizable<T extends Constructor<GuiElement>>(superClass: T, debounceDelay = 200) {
  class ResizableMixin extends superClass implements Resizable {
    protected _observer = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        this.onResize(entries[0]);
      }, debounceDelay),
    );

    onResize(_entry: ResizeObserverEntry): void { }

    override connectedCallback() {
      super.connectedCallback?.();
      this._observer.observe(this as unknown as Element);
    }

    override disconnectedCallback() {
      super.disconnectedCallback?.();
      this._observer.unobserve(this as unknown as Element);
    }
  }

  return ResizableMixin as Constructor<Resizable> & T;
}
