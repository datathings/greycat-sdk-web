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
