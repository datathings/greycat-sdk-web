import type { std } from '../../exports.js';
import { CanvasContext } from './ctx.js';

export type Scale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLogarithmic<number, number, never>;
export type Color = string | CanvasGradient | CanvasPattern;
export type SerieType = Serie['type'];
export type ScaleType = Extract<Axis['scale'], string>;
export type SecondOrdinate = 'min' | 'max' | number;
export type AxisPosition = 'left' | 'right';
export type MarkerShape = 'circle' | 'square' | 'triangle';
export type TooltipPosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
export type SerieWithOptions = Serie & SerieOptions;
export type CurveStyle = 'linear' | 'step-after';

export type SerieStyle = {
  opacity?: number;
  dash?: number[];
  width?: number;
  color?: Color | null;
  /** Only used for area series */
  fill?: Color | null;
  /** Only used for area series */
  fillOpacity?: number;
};

// we don't care about the type here, it is user-defined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SerieData = Serie & SerieOptions & { xValue?: any; yValue?: any; rowIdx: number };

export type Cursor = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  selection: boolean;
};

export type SelectionOptions = {
  /**
   * If a selection is smallr than this value in pixels it will be ignored.
   *
   * Defaults: `10`
   */
  threshold: number;
  /**
   * - `'vertical'` means only selectable according to y axes
   * - `'horizontal'` means only selectable according to x axis
   * - `'both'` means selectable on y & x axes
   *
   * Defaults to 'horizontal'
   */
  orientation: 'vertical' | 'horizontal' | 'both';
};

export type Tooltip = {
  position: TooltipPosition;
  /**
   * Called whenever the tooltip should update its content.
   *
   * *If this is defined, the default tooltip will not display.*
   *
   * **This method will be called in the `requestAnimationFrame(loop)` therefore the less work it does the better**
   *
   * @param data
   * @returns
   */
  render?: (data: SerieData[], cursor: Cursor) => void;
};

export type CommonAxis = {
  title?: string;
  min?: number | Date | std.core.time | std.core.Date;
  max?: number | Date | std.core.time | std.core.Date;
  cursorAlign?: 'start' | 'center' | 'end';
  cursorBaseline?: CanvasTextBaseline;
  cursorPadding?: number;

  /**
   * Zoom ratio on wheel events on the axis.
   *
   * Setting this to `0` disables the behavior completely.
   */
  ratio?: number;
  /**
   * This is called right before rendering the axis onto the chart.
   *
   * **When defined, no other axis properties will be applied `format`, `ticks`, etc.**
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hook?: (axis: d3.Axis<any>) => void;
};

export type LinearAxis = {
  scale?: 'linear';
  /**
   * If specified, the values are used for ticks rather than the scale’s automatic tick generator.
   *
   * However, any tick arguments will still be passed to the scale’s tickFormat function if a tick format is not also set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks?: any[];

  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.format` (see https://d3js.org/d3-format#format).
   * - When `cursorFormat: (value: unknown) => string`, delegates formatting to that function entirely.
   * - When `cursorFormat: undefined` the value is stringified and displayed as-is.
   */
  format?: ((value: unknown) => string) | string;
  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.format` (see https://d3js.org/d3-format#format).
   * - When `cursorFormat: (value: unknown) => string`, delegates formatting to that function entirely.
   * - When `cursorFormat: undefined` the value is stringified and displayed as-is.
   */
  cursorFormat?: ((value: unknown) => string) | string;
};

export type LogAxis = {
  scale: 'log';
  /**
   * If specified, the values are used for ticks rather than the scale’s automatic tick generator.
   *
   * However, any tick arguments will still be passed to the scale’s tickFormat function if a tick format is not also set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks?: any[];

  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.format` (see https://d3js.org/d3-format#format).
   * - When `cursorFormat: (value: unknown) => string`, delegates formatting to that function entirely.
   * - When `cursorFormat: undefined` the value is stringified and displayed as-is.
   */
  format?: ((value: unknown) => string) | string;

  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.format` (see https://d3js.org/d3-format#format).
   * - When `cursorFormat: (value: unknown) => string`, delegates formatting to that function entirely.
   * - When `cursorFormat: undefined` the value is stringified and displayed as-is.
   */
  cursorFormat?: ((value: unknown) => string) | string;
};

export type TimeAxis = {
  scale: 'time';
  /**
   * Time axis can also leverage `d3.TimeInterval` by specifying for instance `d3.utcHour.every(24)`
   */
  ticks?: d3.TimeInterval | (std.core.time | std.core.Date | Date | number)[] | null;

  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.utcFormat` (see https://d3js.org/d3-time-format#utcFormat).
   * - When `cursorFormat: (value: number, specifier: string) => string`, delegates formatting to that function entirely.
   *   The `specifier` parameter is set to be the best possible specifier for the range.
   * - When `cursorFormat: undefined` the value is formatted with `d3.isoFormat` (see https://d3js.org/d3-time-format#isoFormat)
   */
  format?: ((value: number, specifier: string) => string) | string;
  /**
   * Formats the cursor text on the axis depending on the axis type and this parameter type:
   *
   * - When `cursorFormat: string` the value is formatted with `d3.utcFormat` (see https://d3js.org/d3-time-format#utcFormat).
   * - When `cursorFormat: (value: number, specifier: string) => string`, delegates formatting to that function entirely.
   *   The `specifier` parameter is set to be the best possible specifier for the range.
   * - When `cursorFormat: undefined` the value is formatted with `d3.isoFormat` (see https://d3js.org/d3-time-format#isoFormat)
   */
  cursorFormat?: ((value: number, specifier: string) => string) | string;
};

export type Axis = CommonAxis & (LinearAxis | LogAxis | TimeAxis);

export type Ordinate = Axis & { position?: AxisPosition };

export type SerieOptions = {
  color: string;
  width: number;
  markerWidth: number;
  markerShape: MarkerShape;
  markerColor: string;
  /**
   * When defined, this value is used to control the marker drawing logic.
   *
   * All values are in pixels.
   *
   * If only `markerThreshold.x` is defined, then the marker will be drawn if `Math.abs(cursor.x - closestValue.x) <= markerThreshold.x`
   *
   * If only `markerThreshold.y` is defined, then the marker will be drawn if `Math.abs(cursor.y - closestValue.y) <= markerThreshold.y`
   *
   * If both `markerThreshold.x` and `markerThreshold.y` the same logic applies but both must be `true` for the marker to be drawn.
   */
  markerThreshold?: { x?: number; y?: number };
  opacity: number;
  fillOpacity: number;
  /**
   * - `'min'`: draws the area from `yCol` to the bottom
   * - `'max'`: draws the area from `yCol` to the top
   * - `<number>`: draws the area from `yCol` to the column at offset `<number>`
   */
  yCol2: SecondOrdinate;
  /**
   * If `true` this serie value won't show in the tooltip.
   *
   * *This only works when using the native tooltip*
   */
  hideInTooltip: boolean;
  /**
   * Maps the `col` values to a style definition.
   *
   * *Returning `null` will make the painting use the default style of the serie*
   *
   * *Not defining a `styleMapping` will use the actual column value as-is for styling,
   * meaning the serie's column can contain style codes directly*
   */
  styleMapping?: {
    /**
     * The index of the column to use for the mapping. The parameter `v` in `mapping(v)` will
     * be the cells of that `col`.
     */
    col: number;
    /**
     * @param v the column (`col`) value
     * @returns the style used for canvas painting, or `null` to get the default style of the serie
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapping?: (v: any) => SerieStyle | null;
  };
};

export type LineOptions = {
  /**
   * If defined, the line will be drawn using the specified curve style, defaults to `linear`.
   *
   * - `linear`: draws a straight line between points
   * - `step-after`: draws a vertical line from the previous point to the current point
   */
  curve?: CurveStyle;
};

export interface CommonSerie<K> extends Partial<SerieOptions> {
  /**
   * optional offset of the x column in the given table
   *
   * If undefined, the array index will be used
   */
  xCol?: number;
  /**
   * offset of the y column in the given table
   */
  yCol: number;
  /**
   * must refer to a defined 'key' in `config.yAxes` and will be used as the y-axis for this serie
   */
  yAxis: K;
  /**
   * Optional title used to name the serie.
   */
  title?: string;
  /**
   * A hook to customize canvas drawing. This is called before the serie has been drawn.
   */
  drawBefore?: (ctx: CanvasContext, serie: SerieWithOptions, xScale: Scale, yScale: Scale) => void;
  /**
   * A hook to customize canvas drawing. This is called after the serie has been drawn.
   */
  drawAfter?: (ctx: CanvasContext, serie: SerieWithOptions, xScale: Scale, yScale: Scale) => void;
}

export interface CustomSerie<K> extends CommonSerie<K> {
  type: 'custom';
  draw: (ctx: CanvasContext, serie: SerieWithOptions, xScale: Scale, yScale: Scale) => void;
}

export interface LineSerie<K> extends CommonSerie<K>, LineOptions {
  type: 'line';
}

export interface BarSerie<K> extends CommonSerie<K> {
  type: 'bar';
  /**
   * Use this when you want to have bars that match a specific width.
   *
   * For every entry in those columns the bar will span from `spanCol[0] to `spanCol[1]`.
   */
  spanCol?: [number, number];

  /**
   * The point on the y axis from which the bars are drawn either upward or downward
   */
  baseLine?: number;
}

export interface ScatterSerie<K> extends CommonSerie<K> {
  type: 'scatter';
  /** This is not used. Use `width` to specify the radius of the plots */
  plotRadius?: never;
}

export interface LineScatterSerie<K> extends CommonSerie<K>, LineOptions {
  type: 'line+scatter';
  /** Specifies the radius of the plot in a `'line+scatter'` */
  plotRadius?: number;
}

export interface AreaSerie<K> extends CommonSerie<K>, LineOptions {
  type: 'area';
}

export interface LineAreaSerie<K> extends CommonSerie<K>, LineOptions {
  type: 'line+area';
}

export type Serie<K extends string = string> =
  | LineSerie<K>
  | BarSerie<K>
  | ScatterSerie<K>
  | LineScatterSerie<K>
  | AreaSerie<K>
  | LineAreaSerie<K>
  | CustomSerie<K>;

export interface ChartConfig<K = { [keys: string]: never }> {
  series: Serie<Extract<keyof K, string>>[];
  /**
   * The x-axis definition
   */
  xAxis: Axis;
  /**
   * One or more axes that will be used for y-axes.
   *
   * This is a key-value object for the series to be able to refer to them by the 'key' name in `yAxis`
   */
  yAxes: {
    [name in keyof K]: Ordinate;
  };
  cursor?: boolean;
  /**
   * Tooltip position, defaults to 'top-left'
   */
  tooltip?: Partial<Tooltip>;
  /**
   * Options for selection. Set `false` to disable selection entirely.
   */
  selection?: Partial<SelectionOptions> | false;
  /**
   * Delta in milliseconds between two `touchend` event.
   *
   * If under this threshold the touch event is processed as a `dbltap` rather than a `touchend`
   *
   * Defaults: `500`
   */
  dblTapThreshold?: number;
}

export interface BoxPlotData {
  median: number;
  q1: number;
  q3: number;
  min: number;
  max: number;
  crossValue: number;
}

export interface BoxPlotOptions {
  width: number;
  medianColor: string;
  whiskerColor: string;
  iqrColor: string;
  orientation: 'vertical' | 'horizontal';
}
