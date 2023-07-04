export type Color = string;

export type Type = 'line' | 'bar' | 'scatter' | 'line+scatter';

export type ScaleType = 'linear' | 'log' | 'time';

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Domain = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export interface Point {
  x: number;
  y: number;
  dashed?: boolean;
}

export interface Serie {
  type?: Type;
  data: Point[];
  xScale?: ScaleType;
  yScale?: ScaleType;
  color?: Color;
  width?: number;
  dashed?: number[];
  opacity?: number;
}

export interface ChartConfig {
  type?: Type;
  series: Serie[];
  xScale?: ScaleType;
  yScale?: ScaleType;
  domain?: Partial<Domain>;
  margin?: Partial<Margin>;
}
