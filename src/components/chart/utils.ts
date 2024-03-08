import * as d3 from 'd3';
import { Axis, Scale } from './types.js';

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
export function smartTimeFormatSpecifier(span: number): string {
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

export function smartNumericalFormatSpecifier(span: number): string {
  if (span > 1000) {
    return '.3s';
  }
  if (span < 1) {
    return '.3f';
  }
  return '.2f';
}

export function axisSpan(axis: d3.Axis<unknown>): number {
  const scale = axis.scale() as Scale;
  const [from, to] = scale.range();
  return Math.abs(+scale.invert(to) - +scale.invert(from));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFormatter(axis: Axis, scale: Scale, useCursorFormat = false): (...args: any[]) => string {
  const format = axis[useCursorFormat ? 'cursorFormat' : 'format'];
  if (format === undefined) {
    const [from, to] = scale.range();
    const span = Math.abs(+scale.invert(to) - +scale.invert(from));
    if (axis.scale === 'time') {
      const specifier = smartTimeFormatSpecifier(span);
      return d3.utcFormat(specifier);
    } else {
      return d3.format(smartNumericalFormatSpecifier(span));
    }
  } else if (typeof format === 'string') {
    if (axis.scale === 'time') {
      return d3.utcFormat(format);
    } else {
      return d3.format(format);
    }
  } else {
    if (axis.scale === 'time') {
      const [from, to] = scale.range();
      const span = Math.abs(+scale.invert(to) - +scale.invert(from));
      const specifier = smartTimeFormatSpecifier(span);
      return (v) => format(+v, specifier);
    } else {
      return format;
    }
  }
}