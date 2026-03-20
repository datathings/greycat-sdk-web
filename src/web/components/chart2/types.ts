import type { SerieTableColumn, TypedSerieTableColumn } from '../chart/types.js';

// oxlint-disable-next-line typescript/no-explicit-any
export type EchartsExt = Record<string, any>;

export type Chart2SerieType = 'line' | 'bar' | 'scatter' | 'pie' | 'candlestick' | 'heatmap' | 'boxplot';
export type Chart2AxisType = 'value' | 'time' | 'category' | 'log';

export interface Chart2Axis {
  type?: Chart2AxisType;
  name?: string;
  min?: number | 'dataMin';
  max?: number | 'dataMax';
  position?: 'left' | 'right' | 'bottom' | 'top';
  axisLabel?: { formatter?: string | ((value: unknown) => string); rotate?: number };
  timezone?: gc.core.TimeZone;
  /** Raw ECharts axis options passthrough */
  echarts?: EchartsExt;
}

export interface Chart2Serie {
  type?: Chart2SerieType;
  name?: string;
  xCol?: SerieTableColumn;
  yCol: SerieTableColumn;
  /** Which grid (0-based). Sets xAxisIndex and yAxisIndex. */
  gridIndex?: number;
  /** Which y-axis (0-based), defaults to `gridIndex ?? 0` */
  yAxisIndex?: number;
  hide?: boolean;
  color?: string;
  lineWidth?: number;
  symbolSize?: number;
  areaStyle?: boolean | { opacity?: number };
  step?: false | 'start' | 'middle' | 'end';
  smooth?: boolean;
  stack?: string;
  /**
   * Extra data column for chart types that need a third dimension.
   *
   * **Heatmap**: each data point is `[x, y, value]` where `xCol` provides x,
   * `yCol` provides y, and `valueCol` provides the color-mapped value.
   */
  valueCol?: SerieTableColumn;
  /** For candlestick: [open, close, low, high] columns */
  candleCols?: [SerieTableColumn, SerieTableColumn, SerieTableColumn, SerieTableColumn];
  /** Raw ECharts series options passthrough */
  echarts?: EchartsExt;
}

export interface Chart2Grid {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  outerBoundsMode?: 'auto' | 'same' | 'none';
  /** Raw ECharts grid options passthrough */
  echarts?: EchartsExt;
}

export interface Chart2Config {
  series: Chart2Serie[];
  /** Default x column for all series */
  xCol?: SerieTableColumn;
  xAxis?: Chart2Axis | Chart2Axis[];
  yAxis?: Chart2Axis | Chart2Axis[];
  tooltip?: {
    enabled?: boolean;
    trigger?: 'item' | 'axis' | 'none';
    formatter?: string | ((params: unknown) => string);
  };
  legend?: {
    enabled?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  dataZoom?: {
    enabled?: boolean;
    type?: 'inside' | 'slider' | 'both';
  };
  grid?: Chart2Grid | Chart2Grid[];
  /** Raw ECharts option override (deep-merged last) */
  echarts?: EchartsExt;
}

// --- Event detail types ---

/**
 * Detail payload for `gui-chart2-click` events.
 *
 * Fields available depend on the series type:
 *
 * - **line / bar / scatter**: `value` is `[x, y]`
 * - **pie**: `value` is the slice value, `percent` and `name` are set
 * - **candlestick**: `value` is `[timestamp, open, close, low, high]`
 * - **heatmap**: `value` is `[x, y, value]`
 * - **boxplot**: `value` is `[min, Q1, median, Q3, max]`
 */
export interface Chart2ClickDetail {
  /** Component type, typically `'series'` */
  componentType: string;
  /** Series type: `'line'`, `'bar'`, `'scatter'`, `'pie'`, etc. */
  seriesType?: string;
  /** 0-based series index */
  seriesIndex?: number;
  /** Series name (from `serie.title`) */
  seriesName?: string;
  /** Category name or x-axis label */
  name: string;
  /** 0-based row index in the data */
  dataIndex: number;
  /** Data value — shape depends on series type (see above) */
  value: unknown;
  /** Series color */
  color?: string;
  /** Pie chart only: percentage of the total */
  percent?: number;
}

/**
 * Detail payload for `gui-chart2-selection` events (dataZoom).
 */
export interface Chart2SelectionDetail {
  /** DataZoom type: `'datazoom'` */
  type: string;
  /** Zoom range as percentage (0-100) */
  start?: number;
  /** Zoom range as percentage (0-100) */
  end?: number;
  /** Zoom range as data value */
  startValue?: number;
  /** Zoom range as data value */
  endValue?: number;
  /** Batch items when multiple dataZooms are linked */
  batch?: { dataZoomId: string; start?: number; end?: number; startValue?: number; endValue?: number }[];
}

// --- Typed config helper for type-safe column mapping ---

export type TypedChart2Serie = Omit<Chart2Serie, 'xCol' | 'yCol' | 'valueCol' | 'candleCols'> & {
  xCol?: TypedSerieTableColumn;
  yCol: TypedSerieTableColumn;
  valueCol?: TypedSerieTableColumn;
  candleCols?: [TypedSerieTableColumn, TypedSerieTableColumn, TypedSerieTableColumn, TypedSerieTableColumn];
};

export type TypedChart2Config = Omit<Chart2Config, 'series' | 'xCol'> & {
  series: TypedChart2Serie[];
  xCol?: TypedSerieTableColumn;
};

/**
 * Type-safe config helper that constrains column references to `gc.$Fields`
 * (GreyCat type field FQNs) instead of bare strings, providing autocomplete
 * and compile-time checking.
 *
 * Usage:
 * ```ts
 * chart.config = chart2Config({
 *   xCol: 'project::TimeRecord::time',
 *   series: [{ type: 'line', yCol: 'project::TimeRecord::value' }],
 * });
 * ```
 */
export function chart2Config(config: TypedChart2Config): Chart2Config {
  return config;
}
