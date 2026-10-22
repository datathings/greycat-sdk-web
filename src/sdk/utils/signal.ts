/**
 * A signal that aborts as soon as one of `signals` does, with that one's reason, and a function
 * that detaches it from them once it is no longer needed. The only signal given is returned as
 * is, and `undefined` when none is.
 *
 * `AbortSignal.any` does the same, but is missing from browsers older than 2024, and keeps
 * its listeners on long-lived signals until they are collected.
 */
export function anySignal(...signals: (AbortSignal | undefined)[]): [AbortSignal | undefined, () => void] {
  const given = signals.filter((s): s is AbortSignal => s !== undefined);
  if (given.length <= 1) {
    return [given[0], () => {}];
  }
  const aborted = given.find((s) => s.aborted);
  if (aborted !== undefined) {
    return [AbortSignal.abort(aborted.reason), () => {}];
  }
  const controller = new AbortController();
  const dispose = () => {
    for (const s of given) {
      s.removeEventListener('abort', onAbort);
    }
  };
  const onAbort = (ev: Event) => {
    dispose();
    controller.abort((ev.target as AbortSignal).reason);
  };
  for (const s of given) {
    s.addEventListener('abort', onAbort);
  }
  return [controller.signal, dispose];
}
