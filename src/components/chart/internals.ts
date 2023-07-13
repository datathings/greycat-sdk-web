import * as d3 from 'd3';
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

const formatMillisecond = d3.utcFormat('.%L'),
  formatSecond = d3.utcFormat(':%S'),
  formatMinute = d3.utcFormat('%I:%M'),
  formatHour = d3.utcFormat('%I %p'),
  formatDay = d3.utcFormat('%a %d'),
  formatWeek = d3.utcFormat('%b %d'),
  formatMonth = d3.utcFormat('%B'),
  formatYear = d3.utcFormat('%Y');

export function dateFormat(date: Date) {
  return (
    d3.utcSecond(date) < date
      ? formatMillisecond
      : d3.utcMinute(date) < date
      ? formatSecond
      : d3.utcHour(date) < date
      ? formatMinute
      : d3.utcDay(date) < date
      ? formatHour
      : d3.utcMonth(date) < date
      ? d3.utcWeek(date) < date
        ? formatDay
        : formatWeek
      : d3.utcYear(date) < date
      ? formatMonth
      : formatYear
  )(date);
}
