export type Color = string;
export type SerieType = 'line' | 'bar' | 'scatter' | 'line+scatter' | 'area' | 'line+area';
export type ScaleType = 'linear' | 'log' | 'time';
export type SecondOrdinate = 'min' | 'max' | number;
export type AxisPosition = 'left' | 'right';
export type MarkerShape = 'circle' | 'square' | 'triangle';
export type TooltipPosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

// we don't care about the type here, it is user-defined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SerieData = Serie & SerieOptions & { xValue?: any; yValue?: any };

export type Tooltip = {
  position: TooltipPosition;
  render: (data: SerieData[]) => HTMLElement;
};

export type TableLike = {
  // table data are always unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[][];
};

export type Axis = {
  title: string;
  min: number;
  max: number;
  scale: ScaleType;
  /**
   * Formats the ticks on the axis
   *
   * See https://d3js.org/d3-format#format
   */
  format: string;
  /**
   * Formats the cursor hover text on the axis
   *
   * Specifying `'iso'` when the axis is of type `'time'` will format as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   * Otherwise, if the axis type is `'time'`, the `tz` property can be used to specify the ts offset.
   *
   * See https://d3js.org/d3-format#format for number values
   * See https://d3js.org/d3-time-format#utcFormat for time values in UTC
   * See https://d3js.org/d3-time-format#timeFormat for time values in default locale
   */
  cursorFormat?: string;
  tz?: 'utc' | 'locale';
};

export type Ordinate = Axis & {
  position: AxisPosition;
};

export type SerieOptions = {
  color: Color;
  width: number;
  markerWidth: number;
  markerShape: MarkerShape;
  markerColor: Color;
  opacity: number;
  fillOpacity: number;
  /**
   * - `'above'`: draws the area from `yCol` to the top
   * - `'below'`: draws the area from `yCol` to the bottom
   * - `<number>`: draws the area from `yCol` to the column at offset `<number>`
   */
  yCol2: SecondOrdinate;
};

export interface Serie extends Partial<SerieOptions> {
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
  yAxis: string;
  /**
   * offset of the column in the table to use to read lineType values for each x
   */
  lineTypeCol?: number;
  /**
   * Optional title used to name the serie.
   */
  title?: string;
}

export interface ChartConfig {
  type?: SerieType;
  table: TableLike;
  series: Array<Serie>;
  /**
   * The x-axis definition
   */
  xAxis: Partial<Axis>;
  /**
   * One or more axes that will be used for y-axes.
   *
   * This is a key-value object for the series to be able to refer to them by the 'key' name in `yAxis`
   */
  yAxes: Record<string, Partial<Ordinate>>;
  from?: number;
  to?: number;
  cursor?: boolean;
  /**
   * Tooltip position, defaults to 'top-left'
   */
  tooltip?: Partial<Tooltip>;
  /**
   * If a selection is smalled than this value in pixels it will be ignored.
   *
   * Defaults: `2`
   */
  selectionThreshold?: number;
}
