export type Color = string;

export type SerieType = 'line' | 'bar' | 'scatter' | 'line+scatter' | 'area' | 'line+area';

export type ScaleType = 'linear' | 'log' | 'time';

export type AreaPosition = 'below' | 'above';

export type AxisPosition = 'left' | 'right';

export type TableLike = {
  data: any[][],
};

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Axis = {
  title: string;
  min: number;
  max: number;
  scale: ScaleType;
};

export type Ordinate = Axis & { position: AxisPosition };

export interface Serie {
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

  color?: Color;
  width?: number;
  dashed?: number[];
  opacity?: number;
  kind?: AreaPosition;
}

export interface ChartConfig {
  type?: SerieType;
  margin?: Partial<Margin>;
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
}
