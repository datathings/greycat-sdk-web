namespace gc {
  export namespace sdk {
    export type EmitterCallback<T> = (data: T) => void;
    export type EmitterDisposable = () => void;

    
    // oxlint-disable-next-line no-explicit-any
    export class Emitter<Events extends Record<string, any> = Record<string, unknown>> {
      // internal native event target
      #emitter: EventTarget;

      constructor() {
        this.#emitter = new EventTarget();
      }

      // emit an event with optional data
      emit<K extends keyof Events>(
        type: K,
        ...args: undefined extends Events[K] ? [data?: Events[K]] : [data: Events[K]]
      ): void {
        this.#emitter.dispatchEvent(new CustomEvent(String(type), { detail: args[0] }));
      }

      // add an event listener and return an unsubscribe function
      on<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>): EmitterDisposable {
        function callback(ev: CustomEvent<Events[K]>) {
          listener(ev.detail);
        }
        this.#emitter.addEventListener(String(type), callback as EventListener);
        return () => {
          this.#emitter.removeEventListener(String(type), callback as EventListener);
        };
      }

      off<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>) {
        this.#emitter.removeEventListener(String(type), listener as EventListener);
      }

      // add a listener that triggers only once
      once<K extends keyof Events>(type: K, listener: EmitterCallback<Events[K]>) {
        const callback = (ev: Event) => {
          this.#emitter.removeEventListener(String(type), callback);
          listener((ev as CustomEvent<Events[K]>).detail);
        };
        this.#emitter.addEventListener(String(type), callback);
      }
    }
  }
}
