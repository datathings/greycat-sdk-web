import { vMap } from './internals.js';
import type { Scale, Color, SerieWithOptions, BarSerie, SerieOptions, LineOptions } from './types.js';
import type { TableLike } from '../common.js';
import { BoxPlotCanvas, BoxPlotOptions } from '../../../src/chart-utils/model.js';

const CIRCLE_END_ANGLE = Math.PI * 2;

type Ctx = CanvasRenderingContext2D;
type LineSerieOptions = SerieWithOptions & LineOptions;

export type CanvasTextAlign = 'start' | 'center' | 'end';

export type ShapeOptions = {
  color?: Color;
  fill?: Color;
  thickness?: number;
  opacity?: number;
  dashed?: boolean;
};

export type TextOptions = {
  color: Color;
  backgroundColor?: Color;
  font?: string;
  baseline?: CanvasTextBaseline;
  align?: CanvasTextAlign;
};

const SEGMENTS: Record<number, number[]> = {
  0: [], // solid
  1: [5, 5], // dashed
};

export class CanvasContext {
  constructor(public ctx: Ctx) { }

  line(table: TableLike, serie: LineSerieOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols.length === 0) {
      return;
    }
    this.ctx.beginPath();

    const typeCol = serie.lineTypeCol ?? -1;
    const colorCol = serie.colorCol ?? -1;
    const colorMap = serie.colorMapping ?? ((v) => v);

    this.ctx.save();

    this.ctx.lineWidth = serie.width;
    this.ctx.strokeStyle = serie.color;
    this.ctx.globalAlpha = serie.opacity ?? 1;

    const [xMin, xMax] = xScale.range();

    let prevSegments = SEGMENTS[0];
    // let prevColor = serie.color;
    let first = true;

    for (let i = 1; i < table.cols[0].length; i++) {
      const prevX = xScale(serie.xCol === undefined ? i - 1 : vMap(table.cols[serie.xCol][i - 1]));
      const prevY = yScale(vMap(table.cols[serie.yCol][i - 1]));

      const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
      const y = yScale(vMap(table.cols[serie.yCol][i]));

      if (prevX < xMin && x < xMin) {
        // close previous path
        if (!first) {
          this.ctx.stroke();
        }
        first = true;
        continue;
      }
      const notDefined =
        table.cols[serie.yCol][i] === undefined || table.cols[serie.yCol][i] === null;
      const lineDash = notDefined ? SEGMENTS[1] : SEGMENTS[table.cols[typeCol]?.[i] ?? 0];
      const currColor = notDefined
        ? serie.color
        : colorMap(table.cols[colorCol]?.[i]) ?? serie.color;

      if (first) {
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        if (serie.curve === 'step-after') {
          this.ctx.lineTo(x, prevY);
        }
        this.ctx.lineTo(x, y);
        first = false;
      } else {
        if (serie.curve === 'step-after') {
          this.ctx.lineTo(x, prevY);
        }
        this.ctx.lineTo(x, y);
      }

      if (prevSegments !== lineDash || this.ctx.strokeStyle !== currColor) {
        // close previous path
        this.ctx.stroke();

        // start new path type
        this.ctx.strokeStyle = currColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.setLineDash(lineDash);
      }

      prevSegments = lineDash;
      this.ctx.strokeStyle = currColor;

      // draw the last segment and stop
      if (x > xMax) {
        this.ctx.lineTo(x, y);
        break;
      }
    }

    this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.restore();
  }

  step(table: TableLike, serie: SerieWithOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols.length === 0) {
      return;
    }
    this.ctx.beginPath();

    const typeCol = serie.lineTypeCol ?? -1;
    const colorCol = serie.colorCol ?? -1;
    const colorMap = serie.colorMapping ?? ((v) => v);

    this.ctx.save();

    this.ctx.lineWidth = serie.width;
    this.ctx.strokeStyle = serie.color;
    this.ctx.globalAlpha = serie.opacity ?? 1;

    const [xMin, xMax] = xScale.range();
    const [yMin, yMax] = yScale.range();

    let prevSegments = SEGMENTS[0];
    // let prevColor = serie.color;
    let first = true;
    for (let i = 0; i < table.cols[0].length; i++) {
      const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
      const y = yScale(vMap(table.cols[serie.yCol][i]));
      if (x < xMin || x > xMax || y > yMin || y < yMax) {
        // close previous path
        if (!first) {
          this.ctx.stroke();
        }
        first = true;
        continue;
      }
      const notDefined =
        table.cols[serie.yCol][i] === undefined || table.cols[serie.yCol][i] === null;
      const lineDash = notDefined ? SEGMENTS[1] : SEGMENTS[table.cols[typeCol]?.[i] ?? 0];
      const currColor = notDefined
        ? serie.color
        : colorMap(table.cols[colorCol]?.[i]) ?? serie.color;

      if (first) {
        this.ctx.setLineDash(lineDash);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        first = false;
      } else {
        const prevY = yScale(vMap(table.cols[serie.yCol][i - 1]));
        this.ctx.lineTo(x, prevY);
        this.ctx.lineTo(x, y);
      }

      if (prevSegments !== lineDash || this.ctx.strokeStyle !== currColor) {
        // close previous path
        this.ctx.stroke();

        // start new path type
        this.ctx.strokeStyle = currColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.setLineDash(lineDash);
      }

      prevSegments = lineDash;
      this.ctx.strokeStyle = currColor;

      if (x === xMax) {
        break;
      }
    }

    this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.restore();
  }

  bar(
    table: TableLike,
    serie: BarSerie<string> & SerieOptions,
    xScale: Scale,
    yScale: Scale,
  ): void {
    if (table.cols.length === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.fillStyle = serie.color;
    this.ctx.globalAlpha = serie.opacity;
    const colorMap = serie.colorMapping ?? ((v) => v);

    const [yMin, yMax] = yScale.range();
    const [xMin, xMax] = xScale.range();
    const shift = Math.round(serie.width / 2);

    for (let i = 0; i < table.cols[0].length; i++) {
      let x: number;
      let y: number;
      let w: number;
      let h: number;
      if (serie.spanCol) {
        let x0 = xScale(vMap(table.cols[serie.spanCol[0]][i]));
        let x1 = xScale(vMap(table.cols[serie.spanCol[1]][i]));
        y = yScale(vMap(table.cols[serie.yCol][i]));
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
        x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i])) - shift;
        y = yScale(vMap(table.cols[serie.yCol][i]));
        w = serie.width;
        if (x + serie.width < xMin || x > xMax) {
          continue;
        }
      }
      if (y < yMax) {
        y = yMax;
      }
      this.ctx.fillStyle = serie.colorCol
        ? colorMap(table.cols[serie.colorCol]?.[i]) ?? serie.color
        : serie.color;
      if (serie.baseLine !== undefined) {
        h = yScale(serie.baseLine) - y;
      } else {
        h = yMin - y;
      }
      this.ctx.fillRect(x, y, w, h);
    }

    this.ctx.restore();
  }

  scatter(table: TableLike, serie: SerieWithOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols.length === 0) {
      return;
    }

    this.ctx.save();

    const colorMap = serie.colorMapping ?? ((v) => v);

    const [xMin, xMax] = xScale.range();
    const [yMin, yMax] = yScale.range();

    for (let i = 0; i < table.cols[0].length; i++) {
      const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
      const y = yScale(vMap(table.cols[serie.yCol][i]));
      if (x < xMin || x > xMax || y > yMin || y < yMax) {
        continue;
      }

      const color = serie.colorCol
        ? colorMap(table.cols[serie.colorCol]?.[i]) ?? serie.color
        : serie.color;

      switch (serie.markerShape) {
        case 'circle':
          this.circle(x, y, serie.width, { fill: color, color });
          break;
        case 'square':
          this.rectangle(x, y, serie.width, serie.width, { fill: color, color });
          break;
        case 'triangle':
          this.triangle(x, y, serie.width, serie.width, { fill: color, color });
          break;
      }
    }

    this.ctx.restore();
  }

  area(table: TableLike, serie: LineSerieOptions, xScale: Scale, yScale: Scale): void {
    if (table.cols.length === 0) {
      return;
    }

    const [xMin, xMax] = xScale.range();
    // const [yMin, yMax] = yScale.range();

    const colorCol = serie.colorCol ?? -1;
    const colorMap = serie.colorMapping ?? ((v) => v);

    const { x, y, color } = computePoint(serie.xCol, serie.yCol, 0);
    let firstX = x;
    let firstY = y;
    let { x: lastX } = computePoint(serie.xCol, serie.yCol, table.cols[0]?.length - 1 ?? 0);

    this.ctx.save();
    this.ctx.globalAlpha = serie.fillOpacity;
    this.ctx.fillStyle = color;

    this.ctx.beginPath();

    let prevPt = { x: firstX, y: firstY, color };

    let first = true;

    // line
    let iterations = 0;
    for (let i = 1; i < table.cols[0].length; i++) {
      const pt = computePoint(serie.xCol, serie.yCol, i);

      if (prevPt.x < xMin && pt.x < xMin) {
        prevPt = pt;
        this.ctx.fillStyle = pt.color;
        continue;
      }

      iterations++;

      if (first) {
        this.ctx.moveTo(prevPt.x, prevPt.y);
        firstX = prevPt.x;
        firstY = prevPt.y;
        first = false;
      }

      if (serie.curve === 'step-after') {
        const prevY = computePoint(serie.xCol, serie.yCol, i - 1).y;
        this.ctx.lineTo(pt.x, prevY);
      }
      this.ctx.lineTo(pt.x, pt.y);
      lastX = pt.x;

      if (this.ctx.fillStyle !== pt.color && !(pt.x === firstX && pt.y === firstY)) {
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
            const pt = computePoint(serie.xCol, serie.yCol2, a);
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
        this.ctx.fillStyle = pt.color;
      }
      prevPt = pt;

      if (pt.x > xMax) {
        this.ctx.lineTo(pt.x, pt.y);
        break;
      }
    }

    if (serie.yCol2 === 'max' || serie.yCol2 === 'min') {
      // yCol2 === 'max': fill from line to top
      // yCol2 === 'min': fill from line to bottom
      const yBound = serie.yCol2 === 'min' ? yScale.range()[0] : yScale.range()[1];
      // we can close the area going to bottom-right, then bottom-left and finally
      // back to the firstX,firstY
      this.ctx.lineTo(lastX, yBound); // bottom right
      this.ctx.lineTo(firstX, yBound); // bottom left
      this.ctx.lineTo(firstX, firstY); // start of line
      // and finally, fill the area
      this.ctx.fill();
    } else if (iterations > 0) {
      // fill in regard to another serie if not already done
      for (let i = table.cols[0].length - 1; i >= 0; i--) {
        const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
        const y = yScale(vMap(table.cols[serie.yCol2][i]));

        this.ctx.lineTo(x, y);
        if (serie.curve === 'step-after') {
          const prevY = computePoint(serie.xCol, serie.yCol2, i - 1).y;
          this.ctx.lineTo(x, prevY);
        }
      }
      this.ctx.fill();
    }

    this.ctx.restore();

    function computePoint(xCol: number | undefined, yCol: number, i: number) {
      const x = xScale(xCol === undefined ? i : vMap(table.cols[xCol][i]));
      const y = yScale(vMap(table.cols[yCol][i]));

      const notDefined = table.cols[yCol][i] === undefined || table.cols[yCol][i] === null;
      const color = notDefined ? serie.color : colorMap(table.cols[colorCol]?.[i]) ?? serie.color;
      return { color, y, x };
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

    // horizontal
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.ctx.restore();
  }

  text(x: number, y: number, text: string, opts: TextOptions): void {
    const mx = this.ctx.measureText(text);
    if (opts.backgroundColor) {
      const xPadding = 4;
      const yPadding = 4;

      switch (opts.align) {
        case 'start': {
          this.rectangle(
            x + mx.width / 2,
            y + mx.fontBoundingBoxAscent / 2 - yPadding - 1, // don't know why but it feels cleaner with that 1px
            mx.width + xPadding * 2,
            mx.fontBoundingBoxAscent + yPadding * 2,
            { color: opts.backgroundColor, fill: opts.backgroundColor },
          );
          break;
        }
        case 'end': {
          this.rectangle(
            x - mx.width / 2,
            y + mx.fontBoundingBoxAscent / 2 - yPadding - 1, // don't know why but it feels cleaner with that 1px
            mx.width + xPadding * 2,
            mx.fontBoundingBoxAscent + yPadding * 2,
            { color: opts.backgroundColor, fill: opts.backgroundColor },
          );
          break;
        }
        default:
        case 'center': {
          this.rectangle(
            x,
            y + mx.fontBoundingBoxAscent / 2,
            mx.width + xPadding * 2,
            mx.fontBoundingBoxAscent + yPadding * 2,
            { color: opts.backgroundColor, fill: opts.backgroundColor },
          );
          break;
        }
      }
    }

    this.ctx.save();

    this.ctx.fillStyle = opts.color;
    this.ctx.font = opts.font ?? `bold 10px sans-serif`;
    this.ctx.textBaseline = opts.baseline ?? 'bottom';
    this.ctx.textAlign = opts.align ?? 'start';
    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

  rectangle(x: number, y: number, w: number, h: number, opts: ShapeOptions): void {
    this.ctx.save();
    this.ctx.globalAlpha = opts.opacity ?? 1;

    if (opts.fill) {
      this.ctx.fillStyle = opts.fill;
      this.ctx.fillRect(x - w / 2, y - h / 2, w, h);
    } else {
      this.ctx.strokeStyle = opts.color ?? 'inherit';
      this.ctx.strokeRect(x - w / 2, y - h / 2, w, h);
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

  boxPlot(boxPlot: BoxPlotCanvas, opts: BoxPlotOptions) {
    this.ctx.save();
    this.ctx.beginPath();

    const halfWidth = opts.width / 2;

    if (opts.orientation === 'vertical') {
      this.ctx.strokeStyle = opts.whiskerColor;
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
      this.ctx.fillStyle = opts.iqrColor;
      this.ctx.strokeStyle = opts.iqrColor;
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
      this.ctx.strokeStyle = opts.medianColor;
      this.ctx.moveTo(boxPlot.crossValue - halfWidth, boxPlot.median);
      this.ctx.lineTo(boxPlot.crossValue + halfWidth, boxPlot.median);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.restore();
    } else {
      this.ctx.strokeStyle = opts.whiskerColor;
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
      this.ctx.fillStyle = opts.iqrColor;
      this.ctx.strokeStyle = opts.iqrColor;
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
      this.ctx.strokeStyle = opts.medianColor;
      this.ctx.moveTo(boxPlot.median, boxPlot.crossValue - halfWidth);
      this.ctx.lineTo(boxPlot.median, boxPlot.crossValue + halfWidth);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.restore();
    }
  }
}
