import type { core } from '@greycat/sdk';
import type { TableLike } from '../common.js';

export type Color = string | CanvasGradient | CanvasPattern;
export type SerieType = 'line' | 'bar' | 'scatter' | 'line+scatter' | 'area' | 'line+area';
export type ScaleType = 'linear' | 'log' | 'time';
export type SecondOrdinate = 'min' | 'max' | number;
export type AxisPosition = 'left' | 'right';
export type MarkerShape = 'circle' | 'square' | 'triangle';
export type TooltipPosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

// we don't care about the type here, it is user-defined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SerieData = Serie & SerieOptions & { xValue?: any; yValue?: any; rowIdx: number };

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
   * Zoom ratio
   */
  ratio?: number;
  /**
   * If specified, the values are used for ticks rather than the scale’s automatic tick generator.
   *
   * However, any tick arguments will still be passed to the scale’s tickFormat function if a tick format is not also set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticks?: any[];
};

export interface LinearAxis extends CommonAxis {
  scale?: 'linear';
}

export interface LogAxis extends CommonAxis {
  scale: 'log';
}

export interface TimeAxis extends CommonAxis {
  scale: 'time';
}

export type Axis = LinearAxis | LogAxis | TimeAxis;

export type Ordinate = Axis & { position: AxisPosition };

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
   * Maps the row value to a color definition.
   * 
   * *Returning `null` or `undefined` will make the painting use the default color of the serie*
   *
   * *Not defining a `colorMapping` will use the value as-is for coloring, meaning the serie's column can contain color codes directly*
   *
   * @param v the current row value
   * @returns the color used for canvas painting
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorMapping?: (v: any) => Color | null | undefined;
};

export interface Serie<K extends string = string> extends Partial<SerieOptions> {
  type: SerieType;
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
}

export interface ChartConfig<K = { [keys: string]: never }> {
  type?: SerieType;
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
    [name in keyof K]: Partial<Ordinate>;
  };
  cursor?: boolean;
  /**
   * Tooltip position, defaults to 'top-left'
   */
  tooltip?: Partial<Tooltip>;
  /**
   * If a selection is smalled than this value in pixels it will be ignored.
   *
   * Defaults: `4`
   */
  selectionThreshold?: number;
  /**
   * Delta in milliseconds between two `touchend` event.
   *
   * If under this threshold the touch event is processed as a `dbltap` rather than a `touchend`
   *
   * Defaults: `500`
   */
  dblTapThreshold?: number;
}
