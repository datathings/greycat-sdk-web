import type { core } from '@greycat/sdk';
import type { TableLike } from '../common.js';
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

// we don't care about the type here, it is user-defined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SerieData = Serie & SerieOptions & { xValue?: any; yValue?: any; rowIdx: number };

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
   * @param data
   * @returns
   */
  render?: (data: SerieData[]) => void;
};

export type CommonAxis = {
  title?: string;
  min?: number | Date | core.time | core.Date;
  max?: number | Date | core.time | core.Date;
  /**
   * Formats the ticks on the axis
   * See https://d3js.org/d3-format#format
   *
   * If the `scale` is `'time'` and `format` is `undefined`, the display is defaulting to ISO.
   * See https://d3js.org/d3-time-format#utcFormat
   */
  format?: string;
  /**
   * Formats the cursor hover text on the axis
   *
   * See https://d3js.org/d3-format#format for number values
   * See https://d3js.org/d3-time-format#utcFormat for time values in UTC
   */
  cursorFormat?: string;
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

export interface LinearAxis extends CommonAxis {
  scale?: 'linear';
  /**
   * If specified, the values are used for ticks rather than the scale’s automatic tick generator.
   *
   * However, any tick arguments will still be passed to the scale’s tickFormat function if a tick format is not also set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks?: any[];
}

export interface LogAxis extends CommonAxis {
  scale: 'log';
  /**
   * If specified, the values are used for ticks rather than the scale’s automatic tick generator.
   *
   * However, any tick arguments will still be passed to the scale’s tickFormat function if a tick format is not also set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks?: any[];
}

export interface TimeAxis extends CommonAxis {
  scale: 'time';
  /**
   * Time axis can also leverage `d3.TimeInterval` by specifying for instance `d3.utcHour.every(24)`
   */
  ticks?: d3.TimeInterval | (core.time | core.Date | Date | number)[] | null;
}

export type Axis = LinearAxis | LogAxis | TimeAxis;

export type Ordinate = Axis & { position?: AxisPosition };

export type SerieOptions = {
  color: string;
  width: number;
  markerWidth: number;
  markerShape: MarkerShape;
  markerColor: string;
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
   * Maps the col values (from `colorCol`) to a color definition.
   *
   * *Returning `null` or `undefined` will make the painting use the default color of the serie*
   *
   * *Not defining a `colorMapping` will use the value as-is for coloring, meaning the serie's column can contain color codes directly*
   *
   * @param v the current cell value
   * @returns the color used for canvas painting
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorMapping?: (v: any) => Color | null | undefined;
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
   * offset of the column in the table to use to read lineType values for each x
   */
  lineTypeCol?: number;
  /**
   * offset of the column in the table to use to read the line color values for segment
   */
  colorCol?: number;
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

export interface LineSerie<K> extends CommonSerie<K> {
  type: 'line';
}

export interface BarSerie<K> extends CommonSerie<K> {
  type: 'bar';
}

export interface ScatterSerie<K> extends CommonSerie<K> {
  type: 'scatter';
}

export interface LineScatterSerie<K> extends CommonSerie<K> {
  type: 'line+scatter';
}

export interface AreaSerie<K> extends CommonSerie<K> {
  type: 'area';
}

export interface LineAreaSerie<K> extends CommonSerie<K> {
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
  table: TableLike;
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
