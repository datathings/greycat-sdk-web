import { Scale } from './internals';
import { AreaPosition, Color, TableLike } from './types';

const CIRCLE_END_ANGLE = Math.PI * 2;

type Ctx = CanvasRenderingContext2D;

export type LineOptions = {
  width: number;
  color: Color;
  dashed?: number[];
  opacity?: number;
};

export type BarOptions = {
  width: number;
  color: Color;
};

export type ScatterOptions = {
  radius: number;
  color: Color;
};

export type AreaOptions = {
  width: number;
  color: Color;
  kind: AreaPosition;
  opacity?: number;
};

export type CircleOptions = {
  radius: number;
  color: Color;
  fill?: string;
};

export function line(
  ctx: Ctx,
  table: TableLike,
  xCol: number | undefined,
  yCol: number,
  xScale: Scale,
  yScale: Scale,
  opts: LineOptions,
) {
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  // const segments = [5, 8];

  ctx.save();
  ctx.lineWidth = opts.width;
  ctx.strokeStyle = opts.color;
  ctx.globalAlpha = opts.opacity ?? 1;

  ctx.beginPath();
  ctx.moveTo(xScale(xCol === undefined ? 0 : rows[0][xCol]), yScale(rows[0][yCol]));
  // if (opts.dashed || line[0].dashed) {
  //   ctx.setLineDash(segments);
  // }

  for (let i = 1; i < rows.length; i++) {
    const x = xScale(xCol === undefined ? i : rows[i][xCol]);
    const y = yScale(rows[i][yCol]);
    ctx.lineTo(x, y);
    // if (line[i].dashed) {
    //   ctx.stroke();
    //   ctx.closePath();
    //   ctx.setLineDash(segments);
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    // }
    // if (line[i].dashed === false) {
    //   ctx.stroke();
    //   ctx.closePath();
    //   ctx.setLineDash([]);
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    // }
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

export function bar(
  ctx: Ctx,
  table: TableLike,
  xCol: number | undefined,
  yCol: number,
  xScale: Scale,
  yScale: Scale,
  opts: BarOptions & { opacity: number },
) {
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  ctx.save();
  ctx.fillStyle = opts.color;
  ctx.globalAlpha = opts.opacity;

  const [yMin] = yScale.range();
  const shift = Math.round(opts.width / 2);

  for (let i = 0; i < rows.length; i++) {
    const x = xScale(xCol === undefined ? i : rows[i][xCol]) - shift;
    const y = yScale(rows[i][yCol]);
    ctx.fillRect(x, y, opts.width, yMin - y);
  }

  ctx.restore();
}

export function scatter(
  ctx: Ctx,
  table: TableLike,
  xCol: number | undefined,
  yCol: number,
  xScale: Scale,
  yScale: Scale,
  opts: ScatterOptions,
) {
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  ctx.save();

  ctx.fillStyle = opts.color;

  for (let i = 0; i < rows.length; i++) {
    ctx.fillStyle = opts.color;
    ctx.beginPath();
    ctx.arc(
      xScale(xCol === undefined ? i : rows[i][xCol]),
      yScale(rows[i][yCol]),
      opts.radius,
      0,
      CIRCLE_END_ANGLE,
    );
    ctx.fill();
  }

  ctx.restore();
}

export function circle(ctx: Ctx, x: number, y: number, opts: CircleOptions) {
  ctx.save();

  // Draw circle "stroke"
  ctx.beginPath();
  ctx.fillStyle = opts.color;
  ctx.strokeStyle = opts.color;
  ctx.arc(x, y, opts.radius, 0, CIRCLE_END_ANGLE);
  ctx.fill();

  ctx.restore();

  // Draw circle fill
  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.beginPath();
    ctx.arc(x, y, opts.radius - 2, 0, CIRCLE_END_ANGLE);
    ctx.fill();
    ctx.restore();
  }
}

export function area(
  ctx: Ctx,
  table: TableLike,
  xCol: number | undefined,
  yCol: number,
  xScale: Scale,
  yScale: Scale,
  opts: AreaOptions,
) {
  const rows = table.data;
  if (rows.length === 0) {
    return;
  }

  const firstX = xScale(xCol === undefined ? 0 : rows[0][xCol]);
  const firstY = yScale(rows[0][yCol]);

  ctx.save();
  ctx.globalAlpha = opts.opacity ?? 0.2;
  ctx.fillStyle = opts.color;

  ctx.beginPath();

  // Upper line
  ctx.moveTo(firstX, firstY);
  for (let i = 1; i < rows.length; i++) {
    ctx.lineTo(xScale(xCol === undefined ? i : rows[i][xCol]), yScale(rows[i][yCol]));
  }

  // below => fill to yMin, above => fill to yMax
  const yBound = opts.kind === 'below' ? yScale.range()[0] : yScale.range()[1];
  // fill
  const lastX = xScale(xCol === undefined ? rows.length - 1 : rows[rows.length - 1][xCol]);
  // bottom right
  ctx.lineTo(lastX, yBound);
  // bottom left
  ctx.lineTo(firstX, yBound);
  // start of area
  ctx.lineTo(firstX, firstY);

  ctx.fill();

  ctx.restore();
}
