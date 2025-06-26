import { vMap } from './internals.js';
import {
  type Scale,
  type Color,
  type SerieWithOptions,
  type BarSerie,
  type SerieOptions,
  type LineOptions,
  type ScatterSerie,
  type LineScatterSerie,
  type SerieStyle,
  type BoxPlotData,
  type BoxPlotOptions,
  type SerieTableColumn,
  isOrdMinMax,
  isOrdSerieTableColumn,
} from './types.js';
import { round } from '../../canvas';
import { tableGetCell } from './utils.js';

const CIRCLE_END_ANGLE = Math.PI * 2;

export enum VerticalAxisPos {
  Left = 0,
  Right = 1,
}

type Ctx = CanvasRenderingContext2D;
type LineSerieOptions = SerieWithOptions & LineOptions;

export type CanvasTextAlign = 'start' | 'center' | 'end';

export type ShapeOptions = {
  color?: Color;
  fill?: Color;
  thickness?: number;
  opacity?: number;
  dashed?: boolean;
  center?: boolean;
};

export type TextOptions = {
  color: Color;
  backgroundColor?: Color;
  font?: string;
  baseline?: CanvasTextBaseline;
  align?: CanvasTextAlign;
  opacity?: number;
  padding?: number;
};

const SEGMENTS: Record<number, number[]> = {
  0: [], // solid
  1: [5, 5], // dashed
};

export class CanvasContext {
  constructor(public ctx: Ctx) {}

  /**
   * Clears the content of the canvas entirely.
   */
  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * Clears the outer content of the given boundaries.
   */
  clearInverse(left: number, top: number, right: number, bottom: number): void {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;

    // +/- 1 to prevent line being removed on upper/lower bounds, only occurs when the line is exactly on the edge on firefox
    // Top
    this.ctx.clearRect(0, 0, w, top - 1);
    // Bottom
    this.ctx.clearRect(0, h - bottom + 1, w, bottom);
    // Left
    this.ctx.clearRect(0, 0, left, h);
    // Right
    this.ctx.clearRect(w - right, 0, right, h);
  }

  /**
   * Fills the outer content of the given boundaries with the `fillColor`.
   */
  rectInverse(left: number, top: number, right: number, bottom: number, fillColor: string): void {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;

    this.ctx.save();
    this.ctx.fillStyle = fillColor;

    // +/- 1 to prevent line being removed on upper/lower bounds, only occurs when the line is exactly on the edge on firefox
    // Top
    this.ctx.fillRect(0, 0, w, top - 1);
    // Bottom
    this.ctx.fillRect(0, h - bottom + 1, w, bottom);
    // Left
    this.ctx.fillRect(0, 0, left, h);
    // Right
    this.ctx.fillRect(w - right, 0, right, h);

    this.ctx.restore();
  }

  line(table: gc.core.Table, serie: LineSerieOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols === undefined || table.cols.length === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.beginPath();

    const [xMin, _] = xScale.range();

    const prevStyle: SerieStyle = {
      color: serie.color,
      dash: SEGMENTS[0],
      opacity: serie.opacity,
      width: serie.width,
    };

    let first = true;

    const isReverse =
      serie.xCol !== undefined &&
      xScale(vMap(tableGetCell(table, serie.xCol, 0))) >
        xScale(vMap(tableGetCell(table, serie.xCol, 1)));

    for (let i = 1; i < table.cols[0].length; i++) {
      const prevX = xScale(
        serie.xCol === undefined ? i - 1 : vMap(tableGetCell(table, serie.xCol, i - 1)),
      );
      const prevY = yScale(vMap(tableGetCell(table, serie.yCol, i - 1)));

      const y = tableGetCell(table, serie.yCol, i);

      const sX = xScale(serie.xCol === undefined ? i : vMap(tableGetCell(table, serie.xCol, i)));
      const sY = yScale(vMap(y));

      if (prevX < xMin && sX < xMin) {
        // close previous path
        if (!first) {
          this.ctx.stroke();
        }
        first = true;
        continue;
      }
      const notDefined = y === undefined || y === null;
      let lineColor: Color = serie.color;
      let lineDash = notDefined ? SEGMENTS[1] : SEGMENTS[0];
      let lineWidth = serie.width;
      let lineOpacity = serie.opacity;

      if (serie.styleMapping) {
        if (serie.styleMapping.mapping) {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          const style = serie.styleMapping.mapping(v);
          if (style) {
            lineDash = style.dash ?? lineDash;
            lineColor = style.color ?? lineColor;
            lineWidth = style.width ?? lineWidth;
            lineOpacity = style.opacity ?? lineOpacity;
          }
        } else {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          // TODO this is so not safe, v can be anything but a Color..
          lineColor = (v as Color) ?? serie.color;
        }
      }

      if (first) {
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalAlpha = lineOpacity;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        if (
          (serie.curve === 'step-after' && !isReverse) ||
          (serie.curve === 'step-before' && isReverse)
        ) {
          this.ctx.lineTo(sX, prevY);
        } else if (
          (serie.curve === 'step-before' && !isReverse) ||
          (serie.curve === 'step-after' && isReverse)
        ) {
          this.ctx.lineTo(prevX, sY);
        }
        this.ctx.lineTo(sX, sY);
        first = false;
      } else {
        if (
          (serie.curve === 'step-after' && !isReverse) ||
          (serie.curve === 'step-before' && isReverse)
        ) {
          this.ctx.lineTo(sX, prevY);
        } else if (
          (serie.curve === 'step-before' && !isReverse) ||
          (serie.curve === 'step-after' && isReverse)
        ) {
          this.ctx.lineTo(prevX, sY);
        }
        this.ctx.lineTo(sX, sY);
      }

      if (
        prevStyle.color !== lineColor ||
        prevStyle.dash !== lineDash ||
        prevStyle.width !== lineWidth ||
        prevStyle.opacity !== lineOpacity
      ) {
        // close previous path
        this.ctx.stroke();

        // start new path type
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalAlpha = lineOpacity;
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(sX, sY);
        this.ctx.setLineDash(lineDash);
      }

      prevStyle.color = lineColor;
      prevStyle.dash = lineDash;
      prevStyle.width = lineWidth;
      prevStyle.opacity = lineOpacity;

      this.ctx.strokeStyle = lineColor;

      // draw the last segment and stop
      // if (sX > xMax) {
      //   this.ctx.lineTo(sX, sY);
      //   break;
      // }
    }

    this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.restore();
  }

  step(table: gc.core.Table, serie: SerieWithOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols === undefined || table.cols.length === 0) {
      return;
    }
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.lineWidth = serie.width;
    this.ctx.strokeStyle = serie.color;
    this.ctx.globalAlpha = serie.opacity ?? 1;

    const [xMin, xMax] = xScale.range();
    const [yMin, yMax] = yScale.range();

    let prevSegments = SEGMENTS[0];
    // let prevColor = serie.color;
    let first = true;
    for (let i = 0; i < table.cols[0].length; i++) {
      const sX = xScale(serie.xCol === undefined ? i : vMap(tableGetCell(table, serie.xCol, i)));
      const y = tableGetCell(table, serie.yCol, i);
      const sY = yScale(vMap(y));
      if (sX < xMin || sX > xMax || sY > yMin || sY < yMax) {
        // close previous path
        if (!first) {
          this.ctx.stroke();
        }
        first = true;
        continue;
      }
      const notDefined = y === undefined || y === null;
      const lineColor: Color = serie.color;
      const lineDash = notDefined ? SEGMENTS[1] : SEGMENTS[0];

      if (first) {
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(sX, sY);
        first = false;
      } else {
        const prevY = yScale(vMap(tableGetCell(table, serie.yCol, i - 1)));
        this.ctx.lineTo(sX, prevY);
        this.ctx.lineTo(sX, sY);
      }

      if (prevSegments !== lineDash || this.ctx.strokeStyle !== lineColor) {
        // close previous path
        this.ctx.stroke();

        // start new path type
        this.ctx.strokeStyle = lineColor;
        this.ctx.beginPath();
        this.ctx.moveTo(sX, sY);
        this.ctx.setLineDash(lineDash);
      }

      prevSegments = lineDash;
      this.ctx.strokeStyle = lineColor;

      if (sX === xMax) {
        break;
      }
    }

    this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.restore();
  }

  bar(
    table: gc.core.Table,
    serie: BarSerie<string> & SerieOptions,
    xScale: Scale,
    yScale: Scale,
    groupBarShift: number,
    groupBarWidth: number,
    barGroupHeights: number[] | undefined,
  ) {
    if (table.cols === undefined || table.cols.length === 0) {
      return;
    }
    if (groupBarWidth === 0) {
      groupBarWidth = serie.width;
    }

    this.ctx.save();
    this.ctx.fillStyle = serie.color;
    this.ctx.globalAlpha = serie.opacity;

    const [yMin, yMax] = yScale.range();
    const [xMin, xMax] = xScale.range();
    const shift = Math.round(groupBarWidth / 2);

    for (let i = 0; i < table.cols[0].length; i++) {
      let x: number;
      let y: number;
      let w: number;
      let h: number;
      if (serie.spanCol) {
        let x0 = xScale(vMap(table.cols[serie.spanCol[0]][i]));
        let x1 = xScale(vMap(table.cols[serie.spanCol[1]][i]));
        y = yScale(vMap(tableGetCell(table, serie.yCol, i)));
        if (x0 < xMin) {
          x0 = xMin;
        }
        if (x1 < xMin) {
          x1 = xMin;
        }
        if (x0 > xMax) {
          x0 = xMax;
        }
        if (x1 > xMax) {
          x1 = xMax;
        }

        x = x0;
        w = x1 - x0;
      } else {
        x =
          xScale(serie.xCol === undefined ? i : vMap(tableGetCell(table, serie.xCol, i))) -
          shift +
          groupBarShift;
        y = yScale(vMap(tableGetCell(table, serie.yCol, i)));
        w = serie.width;
        if (x + serie.width < xMin || x > xMax) {
          continue;
        }
      }
      if (y < yMax) {
        y = yMax;
      }

      if (serie.styleMapping) {
        if (serie.styleMapping.mapping) {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          const style = serie.styleMapping.mapping(v);
          if (style) {
            this.ctx.fillStyle = style.fill ?? serie.color;
            this.ctx.strokeStyle = style.color ?? serie.color;
            this.ctx.globalAlpha = style.opacity ?? serie.opacity;
          }
        } else {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          // TODO this is so not safe, v can be anything but a Color..
          this.ctx.strokeStyle = (v as Color) ?? serie.color;
        }
      }

      if (serie.baseLine !== undefined) {
        h = yScale(serie.baseLine) - y;
      } else {
        if (barGroupHeights) {
          h = yMin - y;
          y = y - barGroupHeights[i];
          barGroupHeights[i] += h;
        } else {
          h = yMin - y;
        }
      }
      this.ctx.fillRect(x, y, w, h);
    }

    this.ctx.restore();
  }

  scatter(
    table: gc.core.Table,
    serie: (ScatterSerie<unknown> | LineScatterSerie<unknown>) & SerieOptions,
    xScale: Scale,
    yScale: Scale,
  ): void {
    if (table.cols === undefined || table.cols.length === 0) {
      return;
    }

    this.ctx.save();

    const [xMin, xMax] = xScale.range();
    const [yMin, yMax] = yScale.range();

    for (let i = 0; i < table.cols[0].length; i++) {
      const sX = xScale(serie.xCol === undefined ? i : vMap(tableGetCell(table, serie.xCol, i)));
      const sY = yScale(vMap(tableGetCell(table, serie.yCol, i)));
      if (sX < xMin || sX > xMax || sY > yMin || sY < yMax) {
        continue;
      }

      let color: Color = serie.color;
      let fill: Color = serie.color;
      let width = serie.width;

      if (serie.styleMapping) {
        if (serie.styleMapping.mapping) {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          const style = serie.styleMapping.mapping(v);
          if (style) {
            fill = style.fill ?? serie.color;
            color = style.color ?? serie.color;
            this.ctx.globalAlpha = style.opacity ?? serie.opacity;
            width = style.width ?? serie.width;
          }
        } else {
          const v = tableGetCell(table, serie.styleMapping.col, i);
          // TODO this is so not safe, v can be anything but a Color..
          color = (v as Color) ?? serie.color;
        }
      }

      switch (serie.markerShape) {
        case 'circle':
          this.circle(sX, sY, serie.plotRadius ?? width, { fill, color });
          break;
        case 'square':
          this.rectangle(sX, sY, serie.plotRadius ?? width, serie.width, {
            fill,
            color,
          });
          break;
        case 'triangle':
          this.triangle(sX, sY, serie.plotRadius ?? width, width, { fill, color });
          break;
      }
    }

    this.ctx.restore();
  }

  area(table: gc.core.Table, serie: LineSerieOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols === undefined || table.cols.length === 0) {
      return;
    }

    const [xMin, _] = xScale.range();
    // const [yMin, yMax] = yScale.range();

    const { x, y, fillOpacity, fill } = computePoint(table, serie.xCol, serie.yCol, 0);
    let firstX = x;
    let firstY = y;
    let { x: lastX } = computePoint(table, serie.xCol, serie.yCol, table.cols[0]?.length - 1 || 0);

    this.ctx.save();
    this.ctx.beginPath();

    let prevPt = { x: firstX, y: firstY, fill, fillOpacity };

    let first = true;

    const isReverse =
      serie.xCol !== undefined &&
      xScale(vMap(tableGetCell(table, serie.xCol, 0))) >
        xScale(vMap(tableGetCell(table, serie.xCol, 1)));
    // line
    let iterations = 0;
    for (let i = 1; i < table.cols[0].length; i++) {
      const pt = computePoint(table, serie.xCol, serie.yCol, i);

      if (prevPt.x < xMin && pt.x < xMin) {
        prevPt = pt;
        this.ctx.fillStyle = pt.fill;
        continue;
      }

      iterations++;

      if (first) {
        this.ctx.globalAlpha = pt.fillOpacity;
        this.ctx.fillStyle = pt.fill;

        this.ctx.moveTo(prevPt.x, prevPt.y);
        firstX = prevPt.x;
        firstY = prevPt.y;
        first = false;
      }

      if (
        (serie.curve === 'step-after' && !isReverse) ||
        (serie.curve === 'step-before' && isReverse)
      ) {
        const prevY = computePoint(table, serie.xCol, serie.yCol, i - 1).y;
        this.ctx.lineTo(pt.x, prevY);
      } else if (
        (serie.curve === 'step-before' && !isReverse) ||
        (serie.curve === 'step-after' && isReverse)
      ) {
        const prevX = computePoint(table, serie.xCol, serie.yCol, i - 1).x;
        this.ctx.lineTo(prevX, pt.y);
      }
      this.ctx.lineTo(pt.x, pt.y);
      lastX = pt.x;

      if (
        (prevPt.fill !== pt.fill || prevPt.fillOpacity !== pt.fillOpacity) &&
        !(pt.x === firstX && pt.y === firstY)
      ) {
        // we changed color, so we need to fill the current path, and start a new one
        if (serie.yCol2 === 'max' || serie.yCol2 === 'min') {
          // yCol2 === 'max': fill from line to top
          // yCol2 === 'min': fill from line to bottom
          const yBound = serie.yCol2 === 'min' ? yScale.range()[0] : yScale.range()[1];
          // we can close the area going to bottom-right, then bottom-left and finally
          // back to the firstX,firstY
          this.ctx.lineTo(pt.x, yBound); // bottom end
          this.ctx.lineTo(firstX, yBound); // bottom start
        } else {
          // fill in regard to another serie
          for (let a = i; a >= i - iterations; a--) {
            const pt = computePoint(table, serie.xCol, serie.yCol2, a);
            this.ctx.lineTo(pt.x, pt.y);
          }
          iterations = 0;
        }
        // close the area line by going back to the first pt
        this.ctx.lineTo(firstX, firstY);
        // and finally, fill the area
        this.ctx.fill();
        // start a new path
        this.ctx.beginPath();
        firstX = pt.x;
        firstY = pt.y;
        this.ctx.moveTo(firstX, firstY);
        this.ctx.fillStyle = pt.fill;
        this.ctx.globalAlpha = pt.fillOpacity;
      }
      prevPt = pt;

      // if (pt.x > xMax) {
      //   this.ctx.lineTo(pt.x, pt.y);
      //   break;
      // }
    }

    if (isOrdMinMax(serie.yCol2)) {
      // yCol2 === 'max': fill from line to top
      // yCol2 === 'min': fill from line to bottom
      const yBound = serie.yCol2 === 'min' ? yScale.range()[0] : yScale.range()[1];
      // we can close the area going to bottom-right, then bottom-left and finally
      // back to the firstX,firstY
      this.ctx.lineTo(lastX, yBound); // bottom right
      this.ctx.lineTo(firstX, yBound); // bottom left
      this.ctx.lineTo(firstX, firstY); // start of line
    } else if (iterations > 0 && isOrdSerieTableColumn(serie.yCol2)) {
      // fill in regard to another serie if not already done
      for (let i = table.cols[0].length - 1; i >= 0; i--) {
        const x = xScale(serie.xCol === undefined ? i : vMap(tableGetCell(table, serie.xCol, i)));
        const y = yScale(vMap(tableGetCell(table, serie.yCol2, i)));

        this.ctx.lineTo(x, y);
        if (
          (serie.curve === 'step-after' && !isReverse) ||
          (serie.curve === 'step-before' && isReverse)
        ) {
          const prevY = computePoint(table, serie.xCol, serie.yCol2, i - 1).y;
          this.ctx.lineTo(x, prevY);
        } else if (
          (serie.curve === 'step-before' && !isReverse) ||
          (serie.curve === 'step-after' && isReverse)
        ) {
          const prevX = computePoint(table, serie.xCol, serie.yCol, i - 1).x;
          this.ctx.lineTo(prevX, y);
        }
      }
    }
    this.ctx.fill();

    this.ctx.restore();

    function computePoint(
      table: gc.core.Table,
      xCol: SerieTableColumn | undefined,
      yCol: SerieTableColumn,
      row: number,
    ): {
      x: number;
      y: number;
      fill: Color;
      fillOpacity: number;
    } {
      const x = xScale(xCol === undefined ? row : vMap(tableGetCell(table, xCol, row)));
      const y = yScale(vMap(tableGetCell(table, yCol, row)));
      if (serie.styleMapping) {
        const v = tableGetCell(table, serie.styleMapping.col, row);
        if (serie.styleMapping.mapping) {
          const style = serie.styleMapping.mapping(v);
          if (style) {
            return {
              x,
              y,
              fill: style.fill ?? serie.color,
              fillOpacity: style.fillOpacity ?? serie.fillOpacity,
            };
          }
          return { x, y, fill: serie.color, fillOpacity: serie.fillOpacity };
        }
        return {
          x,
          y,
          // TODO this is so not safe, v could be anything but a Color...
          fill: (v as Color) ?? serie.color,
          fillOpacity: serie.fillOpacity,
        };
      }
      return { x, y, fill: serie.color, fillOpacity: serie.fillOpacity };
    }
  }

  circle(x: number, y: number, radius: number, opts: ShapeOptions): void {
    this.ctx.save();

    this.ctx.strokeStyle = opts.color ?? 'inherit';

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, CIRCLE_END_ANGLE);

    if (opts.fill) {
      this.ctx.fillStyle = opts.fill;
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  cross(x: number, y: number, width: number, opts: ShapeOptions): void {
    this.ctx.save();

    this.ctx.strokeStyle = opts.color ?? 'inherit';
    this.ctx.lineWidth = opts.thickness ?? 1;
    const shift = width / 2;

    this.ctx.beginPath();
    this.ctx.moveTo(x - shift, y);
    this.ctx.lineTo(x + shift, y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, y - shift);
    this.ctx.lineTo(x, y + shift);
    this.ctx.stroke();

    this.ctx.restore();
  }

  simpleLine(startX: number, startY: number, endX: number, endY: number, opts: ShapeOptions): void {
    this.ctx.save();

    this.ctx.setLineDash(opts.dashed ? [5, 5] : []);
    this.ctx.strokeStyle = opts.color ?? 'inherit';
    this.ctx.globalAlpha = opts.opacity ?? 1;
    this.ctx.lineWidth = opts.thickness ?? 1;

    // horizontal
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.ctx.restore();
  }

  text(x: number, y: number, text: string, opts: TextOptions): void {
    this.ctx.font = opts.font ?? `bold 10px monospace`;

    if (opts.backgroundColor) {
      const mx = this.ctx.measureText(text);
      const padding = opts.padding ?? 5;
      const textHeight = mx.actualBoundingBoxAscent + mx.actualBoundingBoxDescent;
      const textWidth = mx.width;

      let baselineOffset = 0;
      switch (opts.baseline) {
        case 'top':
        case 'hanging':
          baselineOffset = 0 - padding / 2;
          break;
        case 'middle':
          baselineOffset = textHeight / 2;
          break;
        case 'bottom':
        case 'ideographic':
          baselineOffset = textHeight + padding / 2;
          break;
        case 'alphabetic':
        default:
          baselineOffset = textHeight;
          break;
      }

      let rectX = x - padding;
      const rectY = y - baselineOffset - padding;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = textHeight + padding * 2;

      switch (opts.align) {
        case 'center':
          rectX = x - rectWidth / 2;
          break;
        case 'end':
          rectX = x - rectWidth + padding;
          break;
        case 'start':
        default:
          break;
      }

      this.rectangle(rectX, rectY, rectWidth, rectHeight, {
        color: opts.backgroundColor,
        fill: opts.backgroundColor,
      });
    }

    this.ctx.save();

    this.ctx.fillStyle = opts.color;
    this.ctx.textBaseline = opts.baseline ?? 'bottom';
    this.ctx.textAlign = opts.align ?? 'start';
    this.ctx.globalAlpha = opts.opacity ?? 1;
    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

  rectangle(x: number, y: number, w: number, h: number, opts: ShapeOptions): void {
    this.ctx.save();
    this.ctx.globalAlpha = opts.opacity ?? 1;

    if (opts.fill) {
      this.ctx.fillStyle = opts.fill;
      if (opts.center) {
        this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
      } else {
        this.ctx.fillRect(x, y, w, h);
      }
    } else {
      this.ctx.strokeStyle = opts.color ?? 'inherit';
      if (opts.center) {
        this.ctx.strokeRect(x - w / 2, y - h / 2, w, h);
      } else {
        this.ctx.strokeRect(x, y, w, h);
      }
    }

    this.ctx.restore();
  }

  triangle(x: number, y: number, w: number, h: number, opts: ShapeOptions): void {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(x - w / 2, y + h / 2);
    this.ctx.lineTo(x, y - h / 2);
    this.ctx.lineTo(x + w / 2, y + h / 2);

    if (opts.fill) {
      // no need to close for the fill
      this.ctx.fillStyle = opts.fill;
      this.ctx.fill();
    } else {
      // close the triangle, when stroke
      this.ctx.lineTo(x - w / 2, y + h / 2);
      this.ctx.strokeStyle = opts.color ?? 'inherit';
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  boxPlot(boxPlot: BoxPlotData, opts: BoxPlotOptions) {
    this.ctx.save();
    this.ctx.beginPath();

    const halfWidth = opts.width / 2;

    if (opts.orientation === 'vertical') {
      this.ctx.strokeStyle = opts.whiskerColor ?? 'inherit';

      //Upper Whisker
      this.ctx.moveTo(boxPlot.crossValue - halfWidth, boxPlot.max);
      this.ctx.lineTo(boxPlot.crossValue + halfWidth, boxPlot.max);
      this.ctx.moveTo(boxPlot.crossValue, boxPlot.max);
      this.ctx.lineTo(boxPlot.crossValue, boxPlot.q3);
      //Lower Whisker
      this.ctx.moveTo(boxPlot.crossValue, boxPlot.q1);
      this.ctx.lineTo(boxPlot.crossValue, boxPlot.min);
      this.ctx.moveTo(boxPlot.crossValue - halfWidth, boxPlot.min);
      this.ctx.lineTo(boxPlot.crossValue + halfWidth, boxPlot.min);
      this.ctx.stroke();

      //IQR Box
      this.ctx.fillStyle = opts.iqrColor ?? 'inherit';
      this.ctx.strokeStyle = opts.iqrColor ?? 'inherit';
      this.ctx.globalAlpha = 0.2;
      this.ctx.rect(
        boxPlot.crossValue - halfWidth,
        boxPlot.q3,
        opts.width,
        boxPlot.q1 - boxPlot.q3,
      );
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      this.ctx.stroke();

      //Median
      this.ctx.strokeStyle = opts.medianColor ?? 'inherit';
      this.ctx.moveTo(boxPlot.crossValue - halfWidth, boxPlot.median);
      this.ctx.lineTo(boxPlot.crossValue + halfWidth, boxPlot.median);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.restore();
    } else {
      this.ctx.strokeStyle = opts.whiskerColor ?? 'inherit';

      //Upper Whisker
      this.ctx.moveTo(boxPlot.max, boxPlot.crossValue - halfWidth);
      this.ctx.lineTo(boxPlot.max, boxPlot.crossValue + halfWidth);
      this.ctx.moveTo(boxPlot.max, boxPlot.crossValue);
      this.ctx.lineTo(boxPlot.q3, boxPlot.crossValue);
      //Lower Whisker
      this.ctx.moveTo(boxPlot.min, boxPlot.crossValue - halfWidth);
      this.ctx.lineTo(boxPlot.min, boxPlot.crossValue + halfWidth);
      this.ctx.moveTo(boxPlot.min, boxPlot.crossValue);
      this.ctx.lineTo(boxPlot.q1, boxPlot.crossValue);
      this.ctx.stroke();

      //IQR Box
      this.ctx.fillStyle = opts.iqrColor ?? 'inherit';
      this.ctx.strokeStyle = opts.iqrColor ?? 'inherit';
      this.ctx.globalAlpha = 0.2;
      this.ctx.rect(
        boxPlot.q3,
        boxPlot.crossValue - halfWidth,
        boxPlot.q1 - boxPlot.q3,
        opts.width,
      );
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      this.ctx.stroke();

      //Median
      this.ctx.strokeStyle = opts.medianColor ?? 'inherit';
      this.ctx.moveTo(boxPlot.median, boxPlot.crossValue - halfWidth);
      this.ctx.lineTo(boxPlot.median, boxPlot.crossValue + halfWidth);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.restore();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  horizontalAxis(y: number, scale: Scale, fmt: (v: any) => string): void {
    this.ctx.save();

    // TODO move this to CSS variables
    this.ctx.fillStyle = 'hsl(160 5% 60%)';
    this.ctx.strokeStyle = 'hsl(160 5% 60%)';
    this.ctx.textBaseline = 'top';

    const ticks = scale.ticks();
    const [minX, maxX] = scale.range();
    y += 0.5; // pixel perfect

    this.ctx.beginPath();

    // draw axis line
    this.ctx.moveTo(minX, y);
    this.ctx.lineTo(maxX, y);

    for (let i = 0; i < ticks.length; i++) {
      const tick = ticks[i];
      const x = round(scale(tick));

      // Draw tick line
      this.ctx.moveTo(x - 0.5, y);
      this.ctx.lineTo(x - 0.5, y + 5);
      // Draw tick label
      if (i === 0) {
        this.ctx.textAlign = 'left';
      } else if (i === ticks.length - 1) {
        this.ctx.textAlign = 'right';
      } else {
        this.ctx.textAlign = 'center';
      }
      this.ctx.fillText(fmt(tick), x, y + 10);
    }
    this.ctx.stroke();

    this.ctx.restore();
  }

  // TODO that's not ok, use proper typing
  verticalAxis(
    x: number,
    scale: Scale,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fmt: (v: any) => string,
    position: VerticalAxisPos = VerticalAxisPos.Left,
  ): void {
    this.ctx.save();

    // TODO move this to CSS variables
    this.ctx.fillStyle = 'hsl(160 5% 60%)';
    this.ctx.strokeStyle = 'hsl(160 5% 60%)';
    if (position === VerticalAxisPos.Left) {
      this.ctx.textAlign = 'end';
    } else {
      this.ctx.textAlign = 'start';
    }

    const ticks = scale.ticks();
    const [yMin, yMax] = scale.range();

    x -= 0.5; // pixel perfect

    this.ctx.beginPath();

    // draw axis line
    this.ctx.moveTo(x, yMin);
    this.ctx.lineTo(x, yMax);

    // draw ticks
    for (let i = 0; i < ticks.length; i++) {
      const tick = ticks[i];
      const y = round(scale(tick));

      // Draw tick line
      this.ctx.moveTo(x, y + 0.5);
      if (position === VerticalAxisPos.Left) {
        this.ctx.lineTo(x - 5, y + 0.5);
        // Draw tick label (optional)
        this.ctx.fillText(fmt(tick), x - 10, y + 5);
      } else {
        this.ctx.lineTo(x + 5, y + 0.5);
        // Draw tick label (optional)
        this.ctx.fillText(fmt(tick), x + 10, y + 5);
      }
    }
    this.ctx.stroke();

    this.ctx.restore();
  }
}
