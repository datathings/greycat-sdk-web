import { core } from '@greycat/lib-std';
import { timeToMs } from '@greycat/utils';

export type Scale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLogarithmic<number, number, never>;

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
        return timeToMs(x);
      } else if (x instanceof core.Date) {
        return +Date.parse(x.iso);
      }
      return +x;
    }
    default:
      return NaN;
  }
}
