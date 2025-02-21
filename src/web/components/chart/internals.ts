export function vMap(x: unknown): number {
  switch (typeof x) {
    case 'bigint':
      return Number(x);
    case 'number':
      return x;
    case 'object': {
      if (x === null) {
        return NaN;
      }
      if (x instanceof gc.core.time) {
        return Math.round(x.epochMs);
      } else if (x instanceof gc.core.Date) {
        return new Date(x.toString()).getTime();
      } else if (x instanceof BigInt) {
        return Number(x);
      }
      return Number(x);
    }
    default:
      return NaN;
  }
}

export function vMapRound(x: unknown): number {
  return Math.round(vMap(x));
}
