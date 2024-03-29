import { core } from '@greycat/sdk';

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
      if (x instanceof core.time) {
        return Math.round(x.epochMs);
      } else if (x instanceof core.Date) {
        return x.toDate().getTime();
      }
      return +x;
    }
    default:
      return NaN;
  }
}

export function vMapRound(x: unknown): number {
  return Math.round(vMap(x));
}
