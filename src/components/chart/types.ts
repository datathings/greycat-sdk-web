export type Color = string;
export type Type = 'line' | 'bar' | 'scatter';
export type ScaleType = 'linear' | 'log' | 'time';
export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export interface Point {
  x: number;
  y: number;
  dashed?: boolean;
}

export interface Serie {
  type?: Type;
  data: Point[];
  color?: Color;
  width?: number;
  dashed?: number[];
  opacity?: number;
  markers?: boolean;
}

export interface SerieData {
  series: Serie[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
}

export type Data = SerieData | Point[];

export interface ChartConfig {
  type?: Type;
  data: Data;
  margin?: Partial<Margin>;
}
