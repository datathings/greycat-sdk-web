export type Color = string;
export type SerieType = 'line' | 'bar' | 'scatter' | 'line+scatter' | 'area' | 'line+area';
export type ScaleType = 'linear' | 'log' | 'time';
export type AreaPosition = 'below' | 'above' | number;
export type AxisPosition = 'left' | 'right';
export type MarkerShape = 'circle' | 'square' | 'triangle';

export type TableLike = {
  data: any[][];
};

export type Axis = {
  title: string;
  min: number;
  max: number;
  scale: ScaleType;
  /**
   * See https://d3js.org/d3-format#format
   */
  format: string;
  // /**
  //  * See https://d3js.org/d3-format#formatLocale
  //  */
  // formatLocale: d3.FormatLocaleDefinition;
};

export type Ordinate = Axis & {
  position: AxisPosition;
};

export type SerieOptions = {
  color: Color;
  width: number;
  markerWidth: number;
  markerShape: MarkerShape;
  opacity: number;
  fillOpacity: number;
  /**
   * - `'above'`: draws the area from `yCol` to the top
   * - `'below'`: draws the area from `yCol` to the bottom
   * - `<number>`: draws the area from `yCol` to the column at offset `<number>`
   */
  area: AreaPosition;
};

export interface Serie extends Partial<SerieOptions> {
  type?: SerieType;
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
  xAxis?: Partial<Axis>;
  /**
   * One or more axes that will be used for y-axes.
   *
   * This is a key-value object for the series to be able to refer to them by the 'key' name in `yAxis`
   */
  yAxes?: Record<string, Partial<Ordinate>>;
  startOffset?: number;
  endOffset?: number;
  cursor?: boolean;
}
