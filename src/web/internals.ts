import { vMap } from './components/chart/internals.js';
import { Axis, Ordinate, Scale, Serie } from './exports.js';

export type Disposable = () => void;

export function stripOffset(iso: string): string {
  for (let i = iso.length - 1; i >= 0; i--) {
    if (iso[i] === '+' || iso[i] === '-') {
      return iso.slice(0, i);
    }
  }
  return iso;
}

export enum ScaleType {
  linear,
  log,
}

export function closest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols: any[][],
  serie: Serie<string>,
  x: number,
  y: number,
  xAxis: Axis,
  yAxes: Record<string, Ordinate>,
  xScale: Scale,
  yScale: Scale,
  v: number,
): { xValue: number; rowIdx: number } {
  let rowIdx = 0;
  let res = undefined;
  let distance: number | null = null;
  if (
    serie.type === 'scatter' &&
    serie.xCol !== undefined &&
    xAxis.scale === 'linear' &&
    yAxes[serie.yAxis].scale === 'linear'
  ) {
    let minDistance = Infinity;
    for (let i = 0; i < (cols[0]?.length ?? 0); i++) {
      const xPos = xScale(vMap(cols[serie.xCol][i]));
      const yPos = yScale(vMap(cols[serie.yCol][i]));
      const distance = Math.hypot(xPos - x, yPos - y);
      if (distance < minDistance) {
        res = cols[serie.xCol][i];
        rowIdx = i;
        minDistance = distance;
      }
    }
  } else {
    for (let i = 0; i < (cols[0]?.length ?? 0); i++) {
      let x: number;
      if (serie.type === 'bar' && serie.spanCol) {
        const x0 = vMap(cols[serie.spanCol[0]][i]);
        const x1 = vMap(cols[serie.spanCol[1]][i]);
        if (v >= x0 && v <= x1) {
          return { xValue: x0 + (x1 - x0) / 2, rowIdx: i };
        }
        x = x0;
      } else {
        x = serie.xCol === undefined ? i : vMap(cols[serie.xCol][i]);
        if (x === v) {
          return { xValue: serie.xCol === undefined ? i : cols?.[serie.xCol][i], rowIdx: i };
        }
      }
      const d2 = Math.abs(x - v);
      if (distance == null || distance > d2) {
        rowIdx = i;
        res = serie.xCol === undefined ? i : cols[serie.xCol][i];
        distance = d2;
      } else if (distance != null && x > v && distance < d2) {
        return { xValue: res, rowIdx };
      }
    }
  }
  return { xValue: res, rowIdx };
}
