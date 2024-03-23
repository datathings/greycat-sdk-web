let observed: (() => void) | undefined;

const GreyCatSignal = Symbol('GreycatSignal');

export function isSignal(fn: unknown): fn is Signal<unknown> {
  if (typeof fn === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (fn as any)[GreyCatSignal] === true;
  }
  return false;
}

export function signal<T>(value: T): Signal<T> {
  const observers = new Set<() => void>();

  function reader() {
    if (observed) {
      observers.add(observed);
    }
    return value;
  }

  const writer = {
    set(newValue: T) {
      value = newValue;
      observers.forEach((obs) => obs());
    },
    update(updater: (currValue: T) => T) {
      value = updater(value);
      observers.forEach((obs) => obs());
    },
    [GreyCatSignal]: true,
  };

  return Object.assign(reader, writer);
}

export function effect<T>(fn: () => T): T {
  observed = fn;
  const res = fn();
  observed = undefined;
  return res;
}

export function computed<T>(fn: () => T): SignalReader<T> {
  let value: T | undefined;
  const observers = new Set<() => void>();

  function compute() {
    const tmp = observed;
    observed = compute;
    value = fn();
    observed = tmp;
    observers.forEach((obs) => obs());
    return value;
  }

  function reader() {
    if (value === undefined) {
      value = compute();
    }
    if (observed) {
      observers.add(observed);
    }
    return value;
  }

  return Object.assign(reader, { [GreyCatSignal]: true });
}

export function mapSignal<K extends keyof HTMLElementTagNameMap, T, U extends JSX.Element>(
  tagName: K,
  signal: Signal<T[]>,
  callbackfn: (el: T, i: number) => U,
): HTMLElementTagNameMap[K] {
  const container = document.createElement(tagName);
  effect(() => {
    const children = signal().map(callbackfn);
    container.replaceChildren(...children);
  });
  return container;
}