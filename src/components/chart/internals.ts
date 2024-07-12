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

export function handleBounds(
  value: number,
  min: number | null,
  max: number | null,
): [number | null, number | null] {
  if (value !== null && value !== undefined && !isNaN(value)) {
    if (min == null) {
      min = value;
    } else if (value <= min) {
      min = value;
    }
    if (max == null) {
      max = value;
    } else if (value >= max) {
      max = value;
    }
  }
  return [min, max];
}
