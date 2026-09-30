export type EmitterCallback<T> = (data: T) => void;
export type EmitterDisposable = () => void;

type Wrapper = (ev: Event) => void;

// oxlint-disable-next-line no-explicit-any
export class Emitter<Events extends Record<string, any> = Record<string, unknown>> {
  #emitter = new EventTarget();
  /**
   * The wrappers registered on the target for each (type, listener) pair. `on` and
   * `once` hand the target a wrapper, not the listener, so `off` needs this map to
   * remove what they added. A listener registered twice has two wrappers.
   */
  // oxlint-disable-next-line no-explicit-any
  #wrappers = new Map<string, Map<EmitterCallback<any>, Set<Wrapper>>>();

  emit<K extends keyof Events>(
    type: K,
    ...args: undefined extends Events[K] ? [data?: Events[K]] : [data: Events[K]]
  ): void {
    this.#emitter.dispatchEvent(new CustomEvent(String(type), { detail: args[0] }));
  }

  /** Adds a listener and returns the function that removes it. */
  on<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>): EmitterDisposable {
    const key = String(type);
    const wrapper: Wrapper = (ev) => listener((ev as CustomEvent<Events[K]>).detail);
    this.#add(key, listener, wrapper);
    return () => this.#remove(key, listener, wrapper);
  }

  /** Removes every registration of `listener` for `type`, from `on` or `once`. */
  off<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>): void {
    const key = String(type);
    const wrappers = this.#wrappers.get(key)?.get(listener);
    if (wrappers === undefined) {
      return;
    }
    for (const wrapper of wrappers) {
      this.#remove(key, listener, wrapper);
    }
  }

  /** Adds a listener that is removed after its first call; returns the function that removes it early. */
  once<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>): EmitterDisposable {
    const key = String(type);
    const wrapper: Wrapper = (ev) => {
      this.#remove(key, listener, wrapper);
      listener((ev as CustomEvent<Events[K]>).detail);
    };
    this.#add(key, listener, wrapper);
    return () => this.#remove(key, listener, wrapper);
  }

  // oxlint-disable-next-line no-explicit-any
  #add(key: string, listener: EmitterCallback<any>, wrapper: Wrapper): void {
    let byListener = this.#wrappers.get(key);
    if (byListener === undefined) {
      byListener = new Map();
      this.#wrappers.set(key, byListener);
    }
    let wrappers = byListener.get(listener);
    if (wrappers === undefined) {
      wrappers = new Set();
      byListener.set(listener, wrappers);
    }
    wrappers.add(wrapper);
    this.#emitter.addEventListener(key, wrapper);
  }

  // oxlint-disable-next-line no-explicit-any
  #remove(key: string, listener: EmitterCallback<any>, wrapper: Wrapper): void {
    this.#emitter.removeEventListener(key, wrapper);
    const byListener = this.#wrappers.get(key);
    const wrappers = byListener?.get(listener);
    if (byListener === undefined || wrappers === undefined) {
      return;
    }
    wrappers.delete(wrapper);
    if (wrappers.size === 0) {
      byListener.delete(listener);
    }
    if (byListener.size === 0) {
      this.#wrappers.delete(key);
    }
  }
}
