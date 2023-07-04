import {
  BarOptions,
  CircleOptions,
  LineOptions,
  PlotlineOptions,
} from '../../chart-utils';
import { Point } from './types';

const CIRCLE_END_ANGLE = Math.PI * 2;

export type Scale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>;
type Ctx = CanvasRenderingContext2D;

export function line(
  ctx: Ctx,
  line: Point[],
  xScale: Scale,
  yScale: Scale,
  opts: LineOptions
) {
  if (line.length === 0) {
    return;
  }

  const segments = [5, 8];

  ctx.save();
  ctx.lineWidth = opts.width;
  ctx.strokeStyle = opts.color;
  ctx.globalAlpha = opts.opacity ?? 1;

  ctx.beginPath();
  ctx.moveTo(xScale(line[0].x), yScale(line[0].y));
  if (opts.dashed || line[0].dashed) {
    ctx.setLineDash(segments);
  }

  for (let i = 1; i < line.length; i++) {
    const x = xScale(line[i].x);
    const y = yScale(line[i].y);
    ctx.lineTo(x, y);
    if (line[i].dashed) {
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash(segments);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    if (line[i].dashed === false) {
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }

  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;
  ctx.restore();
}

export function bar(
  ctx: Ctx,
  line: Point[],
  xScale: Scale,
  yScale: Scale,
  opts: BarOptions & { opacity: number },
) {
  if (line.length === 0) {
    return;
  }

  ctx.save();
  ctx.fillStyle = opts.color;
  ctx.globalAlpha = opts.opacity;

  const [yMin] = yScale.range();
  const shift = Math.round(opts.width / 2);

  for (let i = 0; i < line.length; i++) {
    const pt = line[i];
    const x = xScale(pt.x) - shift;
    const y = yScale(pt.y);
    ctx.fillRect(x, y, opts.width, yMin - y);
  }

  ctx.restore();
}

export function scatter(
  ctx: Ctx,
  line: Point[],
  xScale: Scale,
  yScale: Scale,
  opts: PlotlineOptions
) {
  if (line.length === 0) {
    return;
  }

  ctx.save();

  ctx.fillStyle = opts.color;

  for (let i = 0; i < line.length; i++) {
    const pt = line[i];
    ctx.fillStyle = opts.color;
    ctx.beginPath();
    ctx.arc(xScale(pt.x), yScale(pt.y), opts.radius, 0, CIRCLE_END_ANGLE);
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
