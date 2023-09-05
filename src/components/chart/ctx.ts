import { Scale, vMap } from './internals.js';
import type { Color, Serie, SerieOptions } from './types.js';
import type { TableLike } from '../common.js';

const CIRCLE_END_ANGLE = Math.PI * 2;

type Ctx = CanvasRenderingContext2D;

type SerieWithOptions = Serie & SerieOptions;

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

export function line(
  ctx: Ctx,
  table: TableLike,
  serie: SerieWithOptions,
  xScale: Scale,
  yScale: Scale,
) {
  if (table.cols.length === 0) {
    return;
  }

  const typeCol = serie.lineTypeCol ?? -1;
  const colorCol = serie.colorCol ?? -1;
  const colorMap = serie.colorMapping ?? ((v) => v);

  ctx.save();

  ctx.lineWidth = serie.width;
  ctx.strokeStyle = serie.color;
  ctx.globalAlpha = serie.opacity ?? 1;

  const [xMin, xMax] = xScale.range();
  const [yMin, yMax] = yScale.range();

  let prevSegments = SEGMENTS[0];
  // let prevColor = serie.color;
  let first = true;
  for (let i = 0; i < table.cols[0].length; i++) {
    const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
    const y = yScale(vMap(table.cols[serie.yCol][i]));
    const notDefined = table.cols[serie.yCol][i] === undefined || table.cols[serie.yCol][i] === null;
    const lineDash = notDefined ? SEGMENTS[1] : SEGMENTS[table.cols[typeCol]?.[i] ?? 0];
    const currColor = notDefined ? serie.color : colorMap(table.cols[colorCol]?.[i]) ?? serie.color;

    if (x < xMin || y > yMin || y < yMax) {
      // prevent drawing out of range
      prevSegments = lineDash;
      // prevColor = currColor;
      continue;
    }

    if (x > xMax) {
      // here we can break, cause we are out of range on the right side
      // meaning we no longer have to draw anything we are done
      break;
    }

    if (first) {
      ctx.setLineDash(lineDash);
      ctx.beginPath();
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }

    if (prevSegments !== lineDash || ctx.strokeStyle !== currColor) {
      // close previous path
      ctx.stroke();
      ctx.closePath();

      // start new path type
      ctx.strokeStyle = currColor;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.setLineDash(lineDash);
    }

    prevSegments = lineDash;
    ctx.strokeStyle = currColor;
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

export function bar(
  ctx: Ctx,
  table: TableLike,
  serie: SerieWithOptions,
  xScale: Scale,
  yScale: Scale,
) {
  if (table.cols.length === 0) {
    return;
  }

  ctx.save();
  ctx.fillStyle = serie.color;
  ctx.globalAlpha = serie.opacity;
  const colorMap = serie.colorMapping ?? ((v) => v);

  const [yMin, yMax] = yScale.range();
  const [xMin, xMax] = xScale.range();
  const shift = Math.round(serie.width / 2);

  for (let i = 0; i < table.cols[0].length; i++) {
    const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i])) - shift;
    const y = yScale(vMap(table.cols[serie.yCol][i]));
    if (x < xMin || y > yMin || y < yMax) {
      // prevent drawing out of range
      // prevColor = currColor;
      continue;
    }

    if (x > xMax) {
      // here we can break, cause we are out of range on the right side
      // meaning we no longer have to draw anything we are done
      break;
    }
    ctx.fillStyle = serie.colorCol ? colorMap(table.cols[serie.colorCol]?.[i]) ?? serie.color : serie.color;
    ctx.fillRect(x, y, serie.width, yMin - y);
  }

  ctx.restore();
}

export function scatter(
  ctx: Ctx,
  table: TableLike,
  serie: SerieWithOptions,
  xScale: Scale,
  yScale: Scale,
) {
  if (table.cols.length === 0) {
    return;
  }

  ctx.save();

  const colorMap = serie.colorMapping ?? ((v) => v);

  const [xMin, xMax] = xScale.range();
  const [yMin, yMax] = yScale.range();

  for (let i = 0; i < table.cols[0].length; i++) {
    const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
    const y = yScale(vMap(table.cols[serie.yCol][i]));
    if (x < xMin || y > yMin || y < yMax) {
      // prevent drawing out of range
      // prevColor = currColor;
      continue;
    }

    if (x > xMax) {
      // here we can break, cause we are out of range on the right side
      // meaning we no longer have to draw anything we are done
      break;
    }

    const color = serie.colorCol ? colorMap(table.cols[serie.colorCol]?.[i]) ?? serie.color : serie.color;

    switch (serie.markerShape) {
      case 'circle':
        circle(ctx, x, y, serie.markerWidth, { fill: color, color });
        break;
      case 'square':
        rectangle(ctx, x, y, serie.markerWidth, serie.markerWidth, { fill: color, color });
        break;
      case 'triangle':
        triangle(ctx, x, y, serie.markerWidth, serie.markerWidth, { fill: color, color });
        break;
    }
  }

  ctx.restore();
}

export function area(
  ctx: Ctx,
  table: TableLike,
  serie: SerieWithOptions,
  xScale: Scale,
  yScale: Scale,
) {
  if (table.cols.length === 0) {
    return;
  }

  let firstX = xScale(serie.xCol === undefined ? 0 : vMap(table.cols[serie.xCol][0]));
  let firstY = yScale(vMap(table.cols[serie.yCol][0]));

  ctx.save();
  ctx.globalAlpha = serie.fillOpacity;
  ctx.fillStyle = serie.color;

  ctx.beginPath();

  const [xMin, xMax] = xScale.range();
  const [yMin, yMax] = yScale.range();

  // line
  let first = true;
  for (let i = 0; i < table.cols[0].length; i++) {
    const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
    const y = yScale(vMap(table.cols[serie.yCol][i]));
    if (x < xMin || y > yMin || y < yMax) {
      // prevent drawing out of range
      // prevColor = currColor;
      continue;
    }

    if (x > xMax) {
      // here we can break, cause we are out of range on the right side
      // meaning we no longer have to draw anything we are done
      break;
    }
    if (first) {
      firstX = x;
      firstY = y;
      ctx.moveTo(x, firstY);
      first = false;
    } else {
      if (x > xMax) {
        // prevent drawing out of range or xScale
        break;
      }
      ctx.lineTo(x, y);
    }
  }

  if (serie.yCol2 === 'max' || serie.yCol2 === 'min') {
    // below => fill to yMin, above => fill to yMax
    const yBound = serie.yCol2 === 'min' ? yScale.range()[0] : yScale.range()[1];
    // fill
    const lastX = xMax;
    // bottom right
    ctx.lineTo(lastX, yBound);
    // bottom left
    ctx.lineTo(firstX, yBound);
    // start of area
    ctx.lineTo(firstX, firstY);
  } else {
    // fill in regard to another serie
    for (let i = table.cols[0].length - 1; i >= 0; i--) {
      const x = xScale(serie.xCol === undefined ? i : vMap(table.cols[serie.xCol][i]));
      const y = yScale(vMap(table.cols[serie.yCol2][i]));
      if (x < xMin || x > xMax || y > yMin || y < yMax) {
        // prevent drawing out of range
        continue;
      }
      ctx.lineTo(x, y);
    }
    // start of area
    ctx.lineTo(firstX, firstY);
  }

  ctx.fill();

  ctx.restore();
}

export function circle(ctx: Ctx, x: number, y: number, radius: number, opts: ShapeOptions) {
  ctx.save();

  ctx.strokeStyle = opts.color ?? 'inherit';

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, CIRCLE_END_ANGLE);

  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.fill();
  } else {
    ctx.stroke();
  }

  ctx.restore();
}

export function cross(ctx: Ctx, x: number, y: number, width: number, opts: ShapeOptions) {
  ctx.save();

  ctx.strokeStyle = opts.color ?? 'inherit';
  ctx.lineWidth = opts.thickness ?? 1;
  const shift = width / 2;

  ctx.beginPath();
  ctx.moveTo(x - shift, y);
  ctx.lineTo(x + shift, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y - shift);
  ctx.lineTo(x, y + shift);
  ctx.stroke();

  ctx.restore();
}

export function simpleLine(
  ctx: Ctx,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  opts: ShapeOptions,
) {
  ctx.save();

  ctx.setLineDash(opts.dashed ? [5, 5] : []);
  ctx.strokeStyle = opts.color ?? 'inherit';
  ctx.globalAlpha = opts.opacity ?? 1;

  // horizontal
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.restore();
}

export function text(ctx: Ctx, x: number, y: number, text: string, opts: TextOptions) {
  const mx = ctx.measureText(text);
  if (opts.backgroundColor) {
    const xPadding = 4;
    const yPadding = 4;

    if (opts.align === 'end') {
      rectangle(
        ctx,
        x - mx.width / 2,
        y + mx.fontBoundingBoxAscent / 2 - yPadding - 1, // don't know why but it feels cleaner with that 1px
        mx.width + xPadding * 2,
        mx.fontBoundingBoxAscent + yPadding * 2,
        { color: opts.backgroundColor, fill: opts.backgroundColor },
      );
    } else if (opts.align === 'start') {
      rectangle(
        ctx,
        x + mx.width / 2,
        y + mx.fontBoundingBoxAscent / 2 - yPadding - 1, // don't know why but it feels cleaner with that 1px
        mx.width + xPadding * 2,
        mx.fontBoundingBoxAscent + yPadding * 2,
        { color: opts.backgroundColor, fill: opts.backgroundColor },
      );
    } else if (opts.align === 'center') {
      rectangle(
        ctx,
        x,
        y + mx.fontBoundingBoxAscent / 2,
        mx.width + xPadding * 2,
        mx.fontBoundingBoxAscent + yPadding * 2,
        { color: opts.backgroundColor, fill: opts.backgroundColor },
      );
    }
  }

  ctx.save();

  ctx.fillStyle = opts.color;
  ctx.font = opts.font ?? `bold 10px sans-serif`;
  ctx.textBaseline = opts.baseline ?? 'bottom';
  ctx.textAlign = opts.align ?? 'start';
  ctx.fillText(text, x, y);

  ctx.restore();
}

export function rectangle(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: ShapeOptions,
) {
  ctx.save();
  ctx.globalAlpha = opts.opacity ?? 1;

  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
  } else {
    ctx.strokeStyle = opts.color ?? 'inherit';
    ctx.strokeRect(x - w / 2, y - h / 2, w, h);
  }

  ctx.restore();
}

export function triangle(ctx: Ctx, x: number, y: number, w: number, h: number, opts: ShapeOptions) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(x - w / 2, y + h / 2);
  ctx.lineTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y + h / 2);
  if (opts.fill) {
    // no need to close for the fill
    ctx.fillStyle = opts.fill;
    ctx.fill();
  } else {
    // close the triangle, when stroke
    ctx.lineTo(x - w / 2, y + h / 2);
    ctx.strokeStyle = opts.color ?? 'inherit';
    ctx.stroke();
  }

  ctx.restore();
}
