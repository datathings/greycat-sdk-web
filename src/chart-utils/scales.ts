import * as d3 from 'd3';
import { core } from '@greycat/lib-std';
import { maxTime, MAX_JS_TIME, minTime, MIN_JS_TIME, timeToDate } from '@greycat/utils';
import { Line, Point } from './model';
// import { TableClassColumnMeta } from '../internals';
import { metaNumber } from '../metaUtils';

export type D3Scale = d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Mapper = (v: any) => number | Date;

export interface TableScalesOptions {
  usedColumns: number[];
  ticks: number;
  /** Fallback index when no index is found in the meta */
  index?: number;
  /**
   * Ignoring the `index` will push all cols to the "values" slot
   * This is used for the scatterplot: ignoring the index considers all Series
   * The index cols might be duplicated, but they're not used for the
   * current use case.
   *
   */
  ignoreIndex?: boolean;
}

/**
 * To construct a `TableScales` use the static method `TableScales::from`
 */
export class TableScales {
  private constructor(
    /** all the indexes of the table (eg. `meta.index === true`) */
    readonly indexes: Index[],
    /** all the value columns of the table (eg. `meta.index === false`) */
    readonly series: Serie[],
    /** the x axis scale (merged from all the table indexes) */
    readonly x: D3Scale,
    /** the y axis scales (merged from all the columns following the nearest index column) */
    readonly y: D3Scale[],
    public lines: Line[] = [],
    public classes: (string | number)[] = [],
  ) {}

  /**
   * Tries to create a `TableScales` from a given `core.Table<unknown>` and an optional list of used columns indexes.
   *
   * If the given table is not valid, `undefined` is returned.
   */
  static from(
    table: core.Table<unknown>,
    opts: Partial<TableScalesOptions>, // _mappings: Array<CellMapper | undefined> = [],
  ) {
    const { usedColumns = [], ticks = 5, index = 0 } = opts;
    if (!opts.ignoreIndex && table.data.length === 0) {
      // table is empty
      // or there is no fallback index AND no index meta in table
      return;
    }

    const indexCols: IndexCol[] = [];
    const valueCols: ValueCol[] = [];

    let prevIndex = -1;
    let prevIndexCol: IndexCol | undefined;
    let prevValueCol: ValueCol | undefined;

    for (let i = 0; i < table.meta.length; i++) {
      const meta = table.meta[i];

      if ((meta.type === null && !opts.ignoreIndex) || (usedColumns.length !== 0 && usedColumns.indexOf(i) === -1)) {
        // skip null-typed column and columns that are not "to be used"
        continue;
      }

      if (!opts.ignoreIndex && meta.index) {
        if (prevIndexCol && !matchingMetaType(prevIndexCol.meta.type, meta.type)) {
          // type mismatch in index columns
          return;
        }
        prevIndex = i;
        prevIndexCol = { colIdx: i, meta };
        // reset prev value column when a new index comes in
        prevValueCol = undefined;
        indexCols.push(prevIndexCol);
      }

      // The ignoreIndex === true means that it is a scatter plot, in which case the
      // originally only index column will also be pushed to the values
      if (opts.ignoreIndex) {
        valueCols.push({ index: i, colIdx: i, meta });
      } else if (!meta.index) {
        if (prevIndexCol === undefined) {
          // no matching index for this column, skipping it
          continue;
        }

        if (prevValueCol && !matchingMetaType(prevValueCol.meta.type, meta.type)) {
          // type mismatch in value column
          return;
        }
        prevValueCol = { index: prevIndex, colIdx: i, meta };
        valueCols.push(prevValueCol);
      }
      // console.log(indexCols);
      // console.log(valueCols);
    }

    if (indexCols.length === 0 && !opts.ignoreIndex) {
      if (index >= table.data[0].length || table.meta.length === 0) {
        // no index or overflowing, or no meta: there is nothing more we can do
        return;
      }

      // lets use the first column as the index for all the rest
      indexCols.push({ colIdx: index, meta: table.meta[index] });
      for (let i = 0; i < table.meta.length; i++) {
        if (i !== index) {
          valueCols.push({ colIdx: i, index, meta: table.meta[i] });
        }
      }
    }

    // In case it is a scatterplot, we want to get the only the min max
    // values for the all the even columns, which represent the x-value
    const indexColMeta = indexCols.length > 0 ? indexCols[0].meta : valueCols[0].meta;
    const valuesIndexCol: number[] = [];
    if (opts.ignoreIndex) {
      let min: number | undefined = undefined;
      let max: number | undefined = undefined;
      for (let rowIndex = 0; rowIndex < table.data.length; rowIndex++) {
        const row = table.data[rowIndex];
        for (let valueIndex = 0; valueIndex < row.length; valueIndex++) {
          if (valueIndex % 2 === 0) {
            const value = row[valueIndex];
            if (value != null) {
              valuesIndexCol.push(value as number);
              if (typeof value === 'number') {
                max = max == null ? value : value > max ? value : max;
                min = min == null ? value : value < min ? value : min;
              }
            }
          }
        }
      }
      // Copy and change the min and max of the table column index for
      // the scatter plot data, so we get the proper domain for the xAxis
      indexColMeta.min = min;
      indexColMeta.max = max;
    }

    // We either construct the xScale "normally",
    // or with the ignore index strucutre (scatter plot)
    const x =
      opts.ignoreIndex === true
        ? createScale([indexColMeta])
        : createScale(indexCols.map((c) => c.meta));
    const y: D3Scale[] = [];

    // Ignore index or "scatter-plot" case
    if (opts.ignoreIndex) {
      // all y columns should use the same scale, so calculate one meta for all
      const values: number[] = [];
      for (let i = 1; i < valueCols.length; i += 2) {
        for (let rowIndex = 0; rowIndex < table.data.length; rowIndex++) {
          const row = table.data[rowIndex];
          if (row[i] != null) {
            values.push(row[i] as number); // [x, y] => [i] to access the y, the second value
          }
        }
      }
      const meta = metaNumber(values);
      const scale = createScale([meta]).nice(ticks);
      for (let colIndex = 0; colIndex < valueCols.length; colIndex++) {
        // all y columns set the resulting meta and scale for inverting the results
        valueCols[colIndex].meta = meta;
        valueCols[colIndex].scale = scale;
      }
      y.push(scale);
      // "Normal" cases
    } else {
      prevIndex = 0;
      for (let i = 0; i < valueCols.length; i++) {
        if (valueCols[i].index !== valueCols[i + 1]?.index) {
          // new y scale
          const cols = valueCols.slice(prevIndex, i + 1).map((c) => c.meta);
          const scale = createScale(cols).nice(ticks);
          // set the scale on the valueCols to later attach it to the Serie
          for (let j = prevIndex; j < i + 1; j++) {
            valueCols[j].scale = scale;
          }
          y.push(scale);
          prevIndex = i + 1;
        }
      }
    }

    const indexes = opts.ignoreIndex 
      ? valueCols.map((c) => {
        return new Index(c.colIdx, c.meta, x);
      }) 
      : indexCols.map((c) => {
        return new Index(c.colIdx, c.meta, x);
      });

    const series = valueCols.map((c) => {
      // we just verified that all value columns have a matching index column, so we are
      // sure that we will find an Index that match c.index
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const index = indexes.find((i) => i.colIdx === c.index)!;
      // we just created all the value scales for y-axis, so we are sure that we will find it
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new Serie(index, c.colIdx, c.meta, c.scale!);
    });

    return new TableScales(indexes, series, x, y);
  }

  /**
   * Computes the scales ranges based on the given width/height & re-computes the lines accordingly
   */
  compute(
    table: core.Table<unknown>,
    width: number,
    height: number,
    classes?: string[],
    padding = 0,
    isScatter = false,
  ) {
    // index scale is on the x-axis which is based on width
    this.x.range([padding, width - padding]);
    // serie scales are on the y-axis which is based on height
    for (const yScale of this.y) {
      yScale.range([height - padding, padding]);
    }

    const data = table.data;
    // re-compute lines according to new resized scales
    const lines: Line[] = [];
    for (let i = 0; i < this.series.length; i++) {
      const s = this.series[i];
      const points: Point[] = [];
      for (let j = 0; j < data.length; j++) {
        const r = data[j];
        // Scatter plot: all series are taken from the values and the
        // [x, y] value are destructured relatively to the colIdx
        if (isScatter) {
          const xIndex = s.colIdx * 2;
          const yIndex = s.colIdx * 2 + 1;
          if (xIndex >= r.length || yIndex >= r.length) {
            // stop creating unnecessary lines
            break;
          }
          if (r[xIndex] != null && r[yIndex] != null) {
            const x = s.x.position(r[xIndex]);
            const y = s.position(r[yIndex]);
            points.push({ x, y });
          }
          // Every other case
        } else if (r[s.x.colIdx] != null) {
          const x = s.x.position(r[s.x.colIdx]);
          const y = s.position(r[s.colIdx]);
          points.push({ x, y });
        }
      }
      // only add line if it has points
      lines.push(points);
    }
    this.lines = lines;

    if (classes && classes.length > 0) {
      this.classes = classes;
    }
  }
}

type IndexCol = { colIdx: number; meta: core.TableColumnMeta };
type ValueCol = { index: number; colIdx: number; meta: core.TableColumnMeta; scale?: D3Scale };

export abstract class Column {
  readonly mapper: Mapper;
  constructor(
    readonly colIdx: number,
    readonly meta: core.TableColumnMeta,
    readonly scale: D3Scale,
  ) {
    switch (meta.type) {
      case core.time._type:
        this.mapper = (v) => (v ? timeToDate(v as core.time) : 0);
        break;

      case core.Date._type:
        this.mapper = (v) => (v ? new Date(v.iso) : 0);
        break;

      default:
        this.mapper = (v) => Number(v);
        break;
    }
  }

  /**
   * Returns the position in pixel where the value should be
   * @param v
   * @returns
   */
  position(v: unknown) {
    return this.scale(this.mapper(v));
  }

  /**
   * Returns an interpolated value based on the position on the scale
   * @param pt
   * @returns
   */
  value(pt: number): unknown {
    return this.scale.invert(pt);
  }

  range(range: [number, number]) {
    this.scale.range(range);
  }
}

/**
 * Represents an index column
 */
export class Index extends Column {
  constructor(colIdx: number, meta: core.TableColumnMeta, scale: D3Scale) {
    super(colIdx, meta, scale);
  }
}

/**
 * Represents a value column
 */
export class Serie extends Column {
  constructor(readonly x: Index, colIdx: number, meta: core.TableColumnMeta, scale: D3Scale) {
    super(colIdx, meta, scale);
  }
}

function createScale(cols: core.TableColumnMeta[]): D3Scale {
  const meta = cols[0];
  const domain = metaDomain(cols);

  if (meta.type === core.int._type || meta.type === core.float._type) {
    // numbers
    return d3.scaleLinear().domain(domain);
  }

  if (meta.type === core.time._type) {
    // time
    return d3.scaleUtc().domain(domain);
  }

  if (meta.type === core.Date._type) {
    // Date
    return d3.scaleUtc().domain(domain);
  }

  // unknown
  return d3.scaleLinear().domain(domain);
}

function matchingMetaType(a: string | null, b: string | null): boolean {
  if (
    (a === core.int._type || a === core.float._type || a === core.Tuple._type) &&
    (b === core.int._type || b === core.float._type || b === core.Tuple._type)
  ) {
    return true;
  }
  return a === b;
}

/**
 * Returns a d3 scale Domain based on the given type and meta columns using the min/max
 */
function metaDomain(cols: core.TableColumnMeta[]) {
  switch (cols[0].type) {
    case core.int._type:
    case core.float._type: {
      if (cols.length === 0) {
        return [-Infinity, +Infinity] as const;
      }
      let min = cols[0].max;
      let max = cols[0].min;
      for (const m of cols) {
        if (m.min < min) {
          min = m.min;
        }
        if (m.max > max) {
          max = m.max;
        }
      }
      return [min, max] as const;
    }

    case core.time._type: {
      if (cols.length === 0) {
        return [MIN_JS_TIME, MAX_JS_TIME] as const;
      }
      let min = cols[0].max;
      let max = cols[0].min;
      for (const m of cols) {
        min = minTime(min, m.min);
        max = maxTime(max, m.max);
      }
      return [timeToDate(min), timeToDate(max)] as const;
    }

    case core.Date._type: {
      if (cols.length === 0) {
        return [new Date(MIN_JS_TIME), new Date(MAX_JS_TIME)] as const;
      }
      let min = Date.parse(cols[0].max.iso);
      let max = Date.parse(cols[0].min.iso);
      for (const m of cols) {
        const mmin = Date.parse(m.min.iso);
        if (mmin < min) {
          min = mmin;
        }
        const mmax = Date.parse(m.max.iso);
        if (mmax > max) {
          max = mmax;
        }
      }
      return [new Date(min), new Date(max)] as const;
    }

    default:
      return [0, 1] as const;
  }
}
