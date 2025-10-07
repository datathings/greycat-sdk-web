import * as d3 from 'd3';
import { Axis, ChartConfig, Scale, SerieTableColumn } from './types.js';
import { greycatTypeFromValueStr } from '../../exports.js';

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
    return '%S%.3f';
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

export function smartTimeCursorFormatSpecifier(span: number): string | undefined {
  if (span < MINUTES_IN_MS) {
    return '%M:%S%.f';
  } else if (span < HOURS_IN_MS) {
    return '%H:%M:%S%.3f';
  } else if (span < DAYS_IN_MS * 2) {
    return '%a %d %b %H:%M:%S';
  } else if (span < DAYS_IN_MS * 7) {
    return '%a %d %b %H:%M';
  } else if (span < DAYS_IN_MS * 30) {
    return '%d %b %y %H:%M';
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
  isCursor = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (...args: any[]) => string {
  const format = axis[isCursor ? 'cursorFormat' : 'format'];

  switch (axis.scale) {
    case 'time': {
      const timezone = axis[isCursor ? 'cursorTimezone' : 'timezone'];
      if (typeof format === 'string') {
        return (d: number) => gc.$.default.printTime(gc.core.time.fromMs(d), timezone, format);
      } else if (format === undefined) {
        const [from, to] = scale.range();
        const span = Math.abs(+scale.invert(to) - +scale.invert(from));
        const smartFormat = isCursor
          ? smartTimeCursorFormatSpecifier(span)
          : smartTimeFormatSpecifier(span);
        return (d: number) => gc.$.default.printTime(gc.core.time.fromMs(d), timezone, smartFormat);
      }
      const [from, to] = scale.range();
      const span = Math.abs(+scale.invert(to) - +scale.invert(from));
      const specifier = smartTimeFormatSpecifier(span);
      return (v) => format(+v, specifier);
    }

    default: {
      if (typeof format === 'string') {
        return d3.format(format);
      } else if (format === undefined) {
        const [from, to] = scale.range();
        const span = Math.abs(+scale.invert(to) - +scale.invert(from));
        return d3.format(smartNumericalFormatSpecifier(span));
      }
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
    cursor: true,
    selection: {
      orientation: 'both',
    },
    xAxis: {},
    yAxes: {},
    series: [],
  };

  if (table.initialValue?.$type) {
    const arrTy = table.initialValue.$type;
    if (arrTy.generic_abi_type !== 0) {
      const elemTy = arrTy.abi.types[arrTy.g1()];
      let timeCol: gc.sdk.AbiAttribute | undefined;
      for (let i = 0; i < elemTy.attrs.length; i++) {
        const attr = elemTy.attrs[i];
        if (attr.sbi_type === gc.sdk.PrimitiveType.time) {
          timeCol = attr;
          config.xAxis.scale = 'time';
          break;
        }
      }

      if (timeCol !== undefined) {
        for (let i = 0; i < elemTy.attrs.length; i++) {
          const attr = elemTy.attrs[i];
          switch (attr.sbi_type) {
            case gc.sdk.PrimitiveType.duration:
            case gc.sdk.PrimitiveType.int:
            case gc.sdk.PrimitiveType.float:
              config.yAxes[attr.name] = {};
              config.series.push({
                title: attr.name,
                type: 'line',
                xCol: `${elemTy.name}::${timeCol.name}`,
                yCol: `${elemTy.name}::${attr.name}`,
                yAxis: attr.name,
              });
              break;
            default:
              break;
          }
        }
      }

      return config;
    }
  }

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
        axisName = columnName = greycatTypeFromValueStr(cell, g) + ` ${r}`;
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
  col: number | gc.$Fields | (number | gc.$Fields)[],
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

export function tableGetColumn(table: gc.core.Table, col: SerieTableColumn): unknown[] | undefined {
  const index = tableGetColumnIndex(col);
  if (index === undefined) {
    return undefined;
  }
  return table.cols[index];
}

export function tableGetCell(table: gc.core.Table, col: SerieTableColumn, row: number): unknown {
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
  const path = col as (gc.$Fields | number)[];
  let value: unknown;
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    if (typeof p === 'number') {
      if (i === 0) {
        value = table.cols[p][row];
      } else if (value instanceof gc.sdk.GCEnum) {
        return undefined;
      } else if (value instanceof gc.sdk.GCObject) {
        if (value.$fields === undefined) {
          return undefined;
        }
        value = value.$fields[p];
      } else {
        return undefined;
      }
      continue;
    }
    const attr = gc.$.default.findField(p);
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

export function padLinear([x0, x1]: [number, number], r: number) {
  const dx = ((x1 - x0) * r) / 2;
  return [x0 - dx, x1 + dx];
}

export function padLog([x0, x1]: [number, number], r: number) {
  return padLinear([Math.log(x0), Math.log(x1)], r).map(Math.exp);
}
