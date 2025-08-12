import { vMap } from './components/chart/internals.js';
import { Axis, Ordinate, Scale, Serie, tableGetCell } from './exports.js';

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
  table: gc.core.Table,
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
    for (let i = 0; i < (table.cols[0]?.length ?? 0); i++) {
      const tx = serie.xCol === undefined ? i : tableGetCell(table, serie.xCol, i);
      const xPos = xScale(vMap(tx));
      const yPos = yScale(vMap(tableGetCell(table, serie.yCol, i)));
      const distance = Math.hypot(xPos - x, yPos - y);
      if (distance < minDistance) {
        res = tx;
        rowIdx = i;
        minDistance = distance;
      }
    }
  } else {
    for (let i = 0; i < (table.cols[0]?.length ?? 0); i++) {
      let x: number;
      if (serie.type === 'bar' && serie.spanCol) {
        const x0 = vMap(table.cols[serie.spanCol[0]][i]);
        const x1 = vMap(table.cols[serie.spanCol[1]][i]);
        if (v >= x0 && v <= x1) {
          return { xValue: x0 + (x1 - x0) / 2, rowIdx: i };
        }
        x = x0;
      } else {
        const tx = serie.xCol === undefined ? i : tableGetCell(table, serie.xCol, i);
        x = serie.xCol === undefined ? i : vMap(tx);
        if (x === v) {
          return { xValue: x, rowIdx: i };
        }
      }
      const d2 = Math.abs(x - v);

      if (!isNaN(d2) && (distance == null || distance > d2)) {
        rowIdx = i;
        res = serie.xCol === undefined ? i : x;
        distance = d2;
      } else if (!isNaN(d2) && distance != null && x > v && distance < d2) {
        return { xValue: vMap(res), rowIdx };
      }
    }
  }
  return { xValue: vMap(res), rowIdx };
}
