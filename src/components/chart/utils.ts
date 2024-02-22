import { Scale } from './types.js';

const SECONDS_IN_MS = 1000;
const MINUTES_IN_MS = SECONDS_IN_MS * 60;
const HOURS_IN_MS = MINUTES_IN_MS * 60;
const DAYS_IN_MS = HOURS_IN_MS * 24;

/**
 * Returns a format specifier based on the size of the span.
 *
 * @param span a span of time in milliseconds
 * @returns 
 */
export function smartFormatSpecifier(span: number): string {
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

export function axisSpan(axis: d3.Axis<unknown>): number {
  const scale = axis.scale() as Scale;
  const [from, to] = scale.range();
  return Math.abs(+scale.invert(to) - +scale.invert(from));
}