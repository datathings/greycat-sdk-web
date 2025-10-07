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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Array<T> {
  /** If defined, then this array comes from GreyCat and this is its type definition */
  $type?: gc.sdk.AbiType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Map<K, V> {
  /** If defined, then this map comes from GreyCat and this is its type definition */
  $type?: gc.sdk.AbiType;
}
