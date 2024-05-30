import { TableLikeColumnBased } from '../common.js';
import { Color, Cursor } from '../index.js';

export type HeatmapStyle = {
  'text-0': string;
  'accent-0': string;
  cursor: {
    color: string;
    bgColor: string;
    lineColor: string;
  };
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colorScaleMargin: {
    right: number;
  };
};

export type HeatmapData = {
  xTitle?: string;
  xValue: string;
  yValue: string;
  yTitle?: string;
  value: number;
  title?: string;
};

export type HeatmapAxis = {
  /** Used in the tooltip */
  title?: string;
  /** */
  labels?: string[];
  /**
   * Sets the inner padding to the specified value which must be in the range [0, 1].
   * The inner padding determines the ratio of the range that is reserved for blank space between bands.
   *
   * The default setting is 0.
   */
  innerPadding?: number;
  /**
   * Sets the outer padding to the specified value which must be in the range [0, 1].
   * The outer padding determines the ratio of the range that is reserved for blank space before the first band and after the last band.
   *
   * The default setting is 0.
   */
  outerPadding?: number;
  hook?: (axis: d3.Axis<string>) => void;
};

export type HeatmapColorScale = {
  /**Used in the tooltip */
  title?: string;
  /** The color range to be used, will be interpolated */
  colors?: string[];
  range?: [number, number];
  type?: 'linear' | 'log';
  format?: string;
};

export type HeatmapTooltip = {
  /**
   * The position of the tooltip.
   *
   * - `'follow'`: follows the mouse cursor
   * - `'in-place'`: replaces the hovered square with the tooltip content
   *
   * Defaults to `'follow'`.
   */
  position?: 'in-place' | 'follow';
  render?: (data: HeatmapData, cursor: Cursor) => void;
};

export type HeatmapConfig = {
  /** @deprecated will be removed in v7 in favor of `el.value` pattern */
  table: TableLikeColumnBased;
  markerColor?: Color;
  /**
   * Displays the value centered in each square. Defaults to `false`.
   */
  displayValue?: boolean;
  tooltip?: HeatmapTooltip;
  xAxis: HeatmapAxis;
  yAxis: HeatmapAxis;
  colorScale?: HeatmapColorScale;
};
