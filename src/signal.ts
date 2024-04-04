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

export function computed<T>(fn: () => T): Computed<T> {
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

export interface Id {
  id: string;
}

/**
 * @param signal 
 * @param container 
 * @param callbackfn 
 * @returns 
 */
export function foreach<T extends Id, U extends Node>(
  signal: Signal<T[]>,
  container: JSX.Element,
  callbackfn: (el: T, i: number) => U,
): JSX.Element {
  let refs: Record<string, Node> = {};

  effect(() => {
    const items = signal();
    const newRefs: Record<string, Node> = {};
    const children = document.createDocumentFragment();

    if ((container as Element).children.length === 0) {
      // initialization
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const id = item.id;
        const ref = document.createComment(id);
        newRefs[id] = ref;
        children.appendChild(ref);
        children.appendChild(callbackfn(items[i], i));
      }
      container.appendChild(children);
    } else {
      // update
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const id = item.id;
        if (refs[id]) {
          // found matching node
          newRefs[id] = refs[id];
        } else {
          // create new node
          const ref = document.createComment(id);
          newRefs[id] = ref;
          children.appendChild(ref);
          children.appendChild(callbackfn(item, i));
        }
      }

      // remove excess nodes
      for (const id in refs) {
        if (!(id in newRefs)) {
          // delete no longer needed node
          const node = refs[id];
          container.removeChild(node.nextSibling!);
          container.removeChild(node);
        }
      }
    }

    // update refs
    refs = newRefs;
    // update children
    container.appendChild(children);
  });
  return container;
}