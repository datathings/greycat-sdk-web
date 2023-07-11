import { Scale } from './internals';
import { Color, Serie, SerieOptions, TableLike } from './types';

const CIRCLE_END_ANGLE = Math.PI * 2;

type Ctx = CanvasRenderingContext2D;

type SerieWithOptions = Serie & SerieOptions;

export type ShapeOptions = {
  color: Color;
  fill?: string;
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

export function line(
  ctx: Ctx,
  table: TableLike,
  serie: SerieWithOptions,
  xScale: Scale,
  yScale: Scale,
) {
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  const lineTypeCol = serie.lineTypeCol ?? -1;

  ctx.save();

  ctx.lineWidth = serie.width;
  ctx.strokeStyle = serie.color;
  ctx.globalAlpha = serie.opacity ?? 1;
  const segments: Record<number, number[]> = {
    0: [], // solid
    1: [5, 5], // dashed
  };

  ctx.beginPath();
  ctx.moveTo(
    xScale(serie.xCol === undefined ? 0 : rows[0][serie.xCol]),
    yScale(rows[0][serie.yCol]),
  );

  let prevSegments = segments[rows[0][lineTypeCol] ?? 0];
  ctx.setLineDash(prevSegments);

  let start = false;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][serie.yCol] === undefined || rows[i][serie.yCol] === null) {
      ctx.stroke();
      ctx.closePath();
      start = true;
    } else {
      const x = xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]);
      const y = yScale(rows[i][serie.yCol]);
      if (start) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      const currSegments = segments[rows[i][lineTypeCol] ?? 0];
      if (prevSegments !== currSegments) {
        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash(currSegments);
        ctx.beginPath();
        ctx.moveTo(x, y);
        prevSegments = currSegments;
      }
      start = false;
    }
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
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  ctx.save();
  ctx.fillStyle = serie.color;
  ctx.globalAlpha = serie.opacity;

  const [yMin] = yScale.range();
  const shift = Math.round(serie.width / 2);

  for (let i = 0; i < rows.length; i++) {
    const x = xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]) - shift;
    const y = yScale(rows[i][serie.yCol]);
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
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  ctx.save();

  for (let i = 0; i < rows.length; i++) {
    switch (serie.markerShape) {
      case 'circle':
        circle(
          ctx,
          xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]),
          yScale(rows[i][serie.yCol]),
          serie.markerWidth / 2,
          {
            color: serie.color,
            fill: serie.color,
          },
        );
        break;
      case 'square':
        rectangle(
          ctx,
          xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]) - serie.markerWidth / 2,
          yScale(rows[i][serie.yCol]) - serie.markerWidth / 2,
          serie.markerWidth,
          serie.markerWidth,
          {
            color: serie.color,
            fill: serie.color,
          },
        );
        break;
      case 'triangle':
        triangle(
          ctx,
          xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]),
          yScale(rows[i][serie.yCol]),
          serie.markerWidth,
          serie.markerWidth,
          {
            color: serie.color,
            fill: serie.color,
          },
        );
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
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  const firstX = xScale(serie.xCol === undefined ? 0 : rows[0][serie.xCol]);
  const firstY = yScale(rows[0][serie.yCol]);

  ctx.save();
  ctx.globalAlpha = serie.fillOpacity;
  ctx.fillStyle = serie.color;

  ctx.beginPath();

  // line
  ctx.moveTo(firstX, firstY);
  for (let i = 1; i < rows.length; i++) {
    ctx.lineTo(
      xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]),
      yScale(rows[i][serie.yCol]),
    );
  }

  // first let's stroke the previous line
  ctx.stroke();

  if (serie.area === 'above' || serie.area === 'below') {
    // below => fill to yMin, above => fill to yMax
    const yBound = serie.area === 'below' ? yScale.range()[0] : yScale.range()[1];
    // fill
    const lastX = xScale(
      serie.xCol === undefined ? rows.length - 1 : rows[rows.length - 1][serie.xCol],
    );
    // bottom right
    ctx.lineTo(lastX, yBound);
    // bottom left
    ctx.lineTo(firstX, yBound);
    // start of area
    ctx.lineTo(firstX, firstY);
  } else {
    // fill in regard to another serie
    // ctx.lineTo(
    //   xScale(serie.xCol === undefined ? 0 : rows[0][serie.xCol]),
    //   yScale(rows[0][serie.area]),
    // );
    for (let i = rows.length - 1; i >= 0; i--) {
      ctx.lineTo(
        xScale(serie.xCol === undefined ? i : rows[i][serie.xCol]),
        yScale(rows[i][serie.area]),
      );
    }
    // start of area
    ctx.lineTo(firstX, firstY);
  }

  ctx.fill();

  ctx.restore();
}

export function circle(ctx: Ctx, x: number, y: number, radius: number, opts: ShapeOptions) {
  ctx.save();

  ctx.strokeStyle = opts.color;

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

  ctx.strokeStyle = opts.color;
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
  ctx.strokeStyle = opts.color;
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
        x - (mx.width + xPadding),
        y - (mx.fontBoundingBoxAscent / 2 + yPadding),
        mx.width + xPadding * 2,
        mx.fontBoundingBoxAscent + yPadding * 2,
        { color: opts.backgroundColor, fill: opts.backgroundColor },
      );
    } else if (opts.align === 'start') {
      rectangle(
        ctx,
        x - xPadding,
        y - (mx.fontBoundingBoxAscent / 2 + yPadding),
        mx.width + xPadding * 2,
        mx.fontBoundingBoxAscent + yPadding * 2,
        { color: opts.backgroundColor, fill: opts.backgroundColor },
      );
    } else if (opts.align === 'center') {
      rectangle(
        ctx,
        x - (mx.width / 2 + xPadding),
        y - yPadding,
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

  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = opts.color;
    ctx.strokeRect(x, y, w, h);
  }

  ctx.restore();
}

export function triangle(ctx: Ctx, x: number, y: number, w: number, h: number, opts: ShapeOptions) {
  ctx.save();

  ctx.strokeStyle = opts.color;
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y + h / 2);
  ctx.lineTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y + h / 2);
  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.fill();
  } else {
    ctx.stroke();
  }

  ctx.restore();
}
