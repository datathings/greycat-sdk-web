import * as d3 from 'd3';
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

const SECONDS_IN_MS = 1000;
const MINUTES_IN_MS = SECONDS_IN_MS * 60;
const HOURS_IN_MS = MINUTES_IN_MS * 60;
const DAYS_IN_MS = HOURS_IN_MS * 24;

export function relativeTimeFormat(span: number): string {
  if (span < MINUTES_IN_MS) {
    return '%S.%L';
  } else if (span < HOURS_IN_MS) {
    return '%M:%S';
  } else if (span < DAYS_IN_MS) {
    return '%H:%M';
  } else if (span < DAYS_IN_MS * 7) {
    return '%a %H:%M';
  } else if (span < DAYS_IN_MS * 30) {
    return '%d %b';
  } else if (span < DAYS_IN_MS * 365 * 2) {
    return '%d %b %Y';
  } else {
    return '%b %Y';
  }
}
