import * as d3 from 'd3';
import { Axis, ChartConfig, Scale } from './types.js';
import {
  getGlobalDateTimeFormat,
  getGlobalDateTimeFormatTimezone,
  greycatTypeFromValueStr,
} from '../../exports.js';

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

export function createFormatter(
  axis: Axis,
  scale: Scale,
  useCursorFormat = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (...args: any[]) => string {
  const format = axis[useCursorFormat ? 'cursorFormat' : 'format'];
  if (format === undefined) {
    const [from, to] = scale.range();
    const span = Math.abs(+scale.invert(to) - +scale.invert(from));
    if (axis.scale === 'time') {
      const timeZone = getGlobalDateTimeFormatTimezone();
      const gFmt = getGlobalDateTimeFormat();
      const locale = gFmt.resolvedOptions().locale;
      if (useCursorFormat) {
        return (d) => gFmt.format(d);
      }
      if (span < SECONDS_IN_MS * 30) {
        const fmt = new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3,
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < MINUTES_IN_MS * 5) {
        const fmt = new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < HOURS_IN_MS) {
        const fmt = new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < DAYS_IN_MS * 7) {
        const fmt = new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < DAYS_IN_MS * 50) {
        // TODO We could add logic to show 'year' only when the months are 'dec' and 'jan'
        const fmt = new Intl.DateTimeFormat(locale, {
          // weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < DAYS_IN_MS * 365) {
        const fmt = new Intl.DateTimeFormat(locale, {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      if (span < DAYS_IN_MS * 365 * 10) {
        const fmt = new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: 'short',
          timeZone: timeZone?.key,
        });
        return (d) => fmt.format(d);
      }
      const fmt = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        timeZone: timeZone?.key,
      });
      return (d) => fmt.format(d);
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

/**
 * Tries to infer axes and series based on the content of the given table
 * @param table
 * @param greycat
 * @returns
 */
export function inferConfig(table: gc.core.Table, g: gc.sdk.GreyCat = gc.$.default): ChartConfig {
  const config: ChartConfig = {
    xAxis: {},
    yAxes: {},
    series: [],
  };

  if (table.cols.length === 0 || table.cols[0].length === 0) {
    return config;
  }

  // TODO
  // - skip null to try to find first interesting value
  // - heuristic to determine xAxis column?
  if (table.cols[0][0] instanceof gc.core.time) {
    // first column is a time, most likely a timeserie
    config.xAxis.scale = 'time';
  } else {
    config.xAxis.scale = 'linear';
  }

  for (let c = 1; c < table.cols.length; c++) {
    const col = table.cols[c];
    for (let r = 0; r < col.length; r++) {
      const cell = col[r];
      if (cell === null || cell === undefined) {
        continue;
      }
      if (!isPotentiallyChartable(cell)) {
        break;
      }
      let axisName: string;
      let columnName: string;
      if (table.headers && table.headers[c] !== undefined) {
        axisName = table.headers[c];
        if (table.subheaders && table.subheaders[c]) {
          columnName = `${table.headers[c]} ${table.subheaders[c]}`;
        } else {
          columnName = table.headers[c];
        }
      } else {
        axisName = columnName = greycatTypeFromValueStr(cell, g);
      }
      const yAxis = axisName.replaceAll(/[- :]+/g, '_');
      config.yAxes[yAxis] = { scale: 'linear' };
      config.series.push({
        title: columnName,
        type: 'line',
        xCol: 0,
        yCol: c,
        yAxis,
      });
      break;
    }
  }

  const yAxes = Object.keys(config.yAxes);
  if (yAxes.length === 2) {
    config.yAxes[yAxes[1]].position = 'right';
  }

  return config;
}

function isPotentiallyChartable(value: unknown): boolean {
  const type = typeof value;
  return (
    type === 'number' ||
    type === 'bigint' ||
    value instanceof gc.core.duration ||
    value instanceof gc.core.int ||
    value instanceof gc.core.float
  );
}

export function tableGetColumnIndex(
  col: number | number[] | gc.$Fields | gc.$Fields[],
): number | undefined {
  if (typeof col === 'number') {
    return col;
  }
  if (typeof col === 'string') {
    const attr = gc.$.default.findField(col);
    if (attr === undefined) {
      return undefined;
    }
    return attr.mapped_att_offset;
  }
  if (col.length === 0) {
    return undefined;
  }
  if (typeof col[0] === 'number') {
    return col[0];
  }
  const path = col as gc.$Fields[];
  const attr = gc.$.default.findField(path[0]);
  if (!attr) {
    // unknown attribute
    return undefined;
  }
  return attr.mapped_att_offset;
}

export function tableGetColumn(
  table: gc.core.Table,
  col: number | number[] | gc.$Fields | gc.$Fields[],
): unknown[] | undefined {
  const index = tableGetColumnIndex(col);
  if (index === undefined) {
    return undefined;
  }
  return table.cols[index];
}

export function tableGetCell(
  table: gc.core.Table,
  col: number | number[] | gc.$Fields | gc.$Fields[],
  row: number,
): unknown {
  if (typeof col === 'number') {
    return table.cols[col][row];
  }
  if (typeof col === 'string') {
    const attr = gc.$.default.findField(col);
    if (attr === undefined) {
      return undefined;
    }
    return table.cols[attr.mapped_att_offset][row];
  }
  if (col.length === 0) {
    return undefined;
  }
  if (typeof col[0] === 'number') {
    const path = col as number[];
    let value: unknown;
    for (let i = 0; i < path.length; i++) {
      if (i === 0) {
        value = table.cols[path[i]][row];
      } else if (value instanceof gc.sdk.GCEnum) {
        return undefined;
      } else if (value instanceof gc.sdk.GCObject) {
        if (value.$fields === undefined) {
          return undefined;
        }
        value = value.$fields[path[i]];
      } else {
        return undefined;
      }
    }
    return value;
  }
  const path = col as gc.$Fields[];
  let value: unknown;
  for (let i = 0; i < path.length; i++) {
    const attr = gc.$.default.findField(path[i]);
    if (!attr) {
      // unknown attribute
      return undefined;
    }
    if (i === 0) {
      value = table.cols[attr.mapped_att_offset][row];
    } else if (value instanceof gc.sdk.GCEnum) {
      return undefined;
    } else if (value instanceof gc.sdk.GCObject) {
      if (value.$fields === undefined) {
        return undefined;
      }
      value = value.$fields[attr.mapped_att_offset];
    } else {
      return undefined;
    }
  }
  return value;
}
