import type { AbiType } from './abi.js';

if (!('withResolvers' in globalThis.Promise)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis.Promise as any).withResolvers = function withResolvers() {
    let resolve;
    let reject;
    const promise = new globalThis.Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });
    return { resolve, reject, promise };
  };
}

declare global {
  interface Array<T> {
    /** If defined, then this array comes from GreyCat and this is its type definition */
    $type?: AbiType;
  }

  interface Map<K, V> {
    /** If defined, then this map comes from GreyCat and this is its type definition */
    $type?: AbiType;
  }
}
