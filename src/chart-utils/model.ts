export type CanvasColor = string | CanvasGradient | CanvasPattern;
export type Line = Point[];
export type Point = { x: number; y: number; dashed?: boolean };

export interface LineOptions {
  width: number;
  color: CanvasColor;
  dashed?: number[];
  opacity?: number;
}

export interface LineAreaOptions extends LineOptions {
  opacity?: number;
}

export interface PlotlineOptions {
  radius: number;
  color: CanvasColor;
  clusterClass?: {
    classes: (string | number)[];
    lineClassList: (string | number)[];
    colorList: string[];
  };
}

export interface BarOptions {
  width: number;
  color: CanvasColor;
}

export interface BoxPlotOptions {
  width: number;
  medianColor: string;
  whiskerColor: string;
  iqrColor: string;
  orientation: 'vertical' | 'horizontal';
}

export interface AreaOptions {
  width: number;
  color: CanvasColor;
  alpha?: number;
  fillColor?: CanvasColor;
  withPlots?: boolean;
  /** used for plots with `withPlots` is `true` */
  radius?: number;
}

export interface CircleOptions {
  radius: number;
  color: CanvasColor;
  fill?: string;
}

export interface RectOptions {
  color: CanvasColor;
  width: number;
  height: number;
  fill?: boolean;
}

export interface Bar extends Point {
  w?: number;
}

export interface Rect extends Point {
  w?: number;
  h?: number;
}

export interface BoxPlotCanvas {
  median: number;
  q1: number;
  q3: number;
  min: number;
  max: number;
  crossValue: number;
}
