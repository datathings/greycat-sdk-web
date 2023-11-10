import {
  AreaOptions,
  BarOptions,
  Line,
  LineOptions,
  PlotlineOptions,
  CircleOptions,
  Bar,
  RectOptions,
  Rect,
  BoxPlotCanvas,
  BoxPlotOptions,
  LineAreaOptions,
  Point,
} from './model.js';

const CIRCLE_END_ANGLE = Math.PI * 2;

type Scale = (x: number) => number;

export class Context {
  readonly ctx: CanvasRenderingContext2D;

  constructor(
    readonly canvas: HTMLCanvasElement,
    public width: number,
    public height: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.ctx = canvas.getContext('2d')!;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * Clears all drawings from the 2d context
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  line(line: Line, opts: LineOptions) {
    if (line.length === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.lineWidth = opts.width;
    this.ctx.strokeStyle = opts.color;
    this.ctx.globalAlpha = opts.opacity ?? 1;

    this.ctx.beginPath();
    if (opts.dashed) {
      this.ctx.setLineDash(opts.dashed);
    }
    this.ctx.moveTo(line[0].x, line[0].y);

    for (let i = 1; i < line.length; i++) {
      this.ctx.lineTo(line[i].x, line[i].y);
    }

    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.setLineDash([]);
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  sLine(line: Line, xScale: Scale, yScale: Scale, opts: LineOptions) {
    if (line.length === 0) {
      return;
    }

    const segments = [5, 8];

    this.ctx.save();
    this.ctx.lineWidth = opts.width;
    this.ctx.strokeStyle = opts.color;
    this.ctx.globalAlpha = opts.opacity ?? 1;

    this.ctx.beginPath();
    this.ctx.moveTo(xScale(line[0].x), yScale(line[0].y));
    if (opts.dashed || line[0].dashed) {
      this.ctx.setLineDash(segments);
    }

    for (let i = 1; i < line.length; i++) {
      const x = xScale(line[i].x);
      const y = yScale(line[i].y);
      this.ctx.lineTo(x, y);
      if (line[i].dashed) {
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.setLineDash(segments);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      }
      if (line[i].dashed === false) {
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      }
    }

    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  lineArea(upper: Line, bottom: Line, opts: LineAreaOptions): void {
    if (upper.length === 0 || bottom.length === 0) {
      return;
    }

    const { x: firstX, y: firstY } = upper[0];
    const { x: lastX, y: lastY } = upper[upper.length - 1];

    this.ctx.save();
    this.ctx.globalAlpha = opts.opacity ?? 0.4;
    this.ctx.fillStyle = opts.color;

    this.ctx.beginPath();

    // Upper line
    this.ctx.moveTo(firstX, firstY);
    for (let i = 1; i < upper.length; i++) {
      const { x, y } = upper[i];
      this.ctx.lineTo(x, y);
    }

    // Bottom line going backwards
    this.ctx.lineTo(lastX, lastY);
    for (let i = bottom.length - 1; i >= 0; i--) {
      const { x, y } = bottom[i];
      this.ctx.lineTo(x, y);
    }

    // Connect first point of bottom line with first point of upper line to close the path properly
    this.ctx.lineTo(firstX, firstY);

    this.ctx.fill();
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  /**
   * `lines` and `options` must be of the same size
   */
  lines(lines: Line[], options: LineOptions[]) {
    this.ctx.save();
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l];
      const opts = options[l];
      if (line.length === 0) {
        continue;
      }

      this.ctx.lineWidth = opts.width;
      this.ctx.strokeStyle = opts.color;

      this.ctx.beginPath();
      if (opts.dashed) {
        this.ctx.setLineDash([4, 4]);
      }
      this.ctx.moveTo(line[0].x, line[0].y);

      for (let i = 1; i < line.length; i++) {
        this.ctx.lineTo(line[i].x, line[i].y);
      }

      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.setLineDash([]);
    }
    this.ctx.restore();
  }

  bar(lines: Bar[], opts: BarOptions) {
    if (lines.length === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.fillStyle = opts.color;

    for (const { x, y, w = opts.width / 2 } of lines) {
      this.ctx.fillRect(x, y, w, this.height - y - 4);
    }

    this.ctx.restore();
  }

  scatterplot(lines: Line[], opts: PlotlineOptions) {
    if (lines.length === 0) {
      return;
    }

    this.ctx.save();

    this.ctx.fillStyle = opts.color;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // When a cluster class slot is "undefined" it means that the cluseters were not defined properly or not at all
      if (opts.clusterClass) {
        const className = opts.clusterClass?.lineClassList[i];
        const index =
          opts.clusterClass && className ? opts.clusterClass.classes.indexOf(className) : -1;
        if (index >= 0) {
          for (const { x, y } of line) {
            this.ctx.fillStyle = opts.clusterClass.colorList[i];
            this.ctx.beginPath();
            this.ctx.arc(x, y, opts.radius, 0, CIRCLE_END_ANGLE);
            this.ctx.fill();
          }
        }
      } else {
        for (const { x, y } of line) {
          this.ctx.fillStyle = opts.color;
          this.ctx.beginPath();
          this.ctx.arc(x, y, opts.radius, 0, CIRCLE_END_ANGLE);
          this.ctx.fill();
        }
      }
    }

    this.ctx.restore();
  }

  area(line: Line, opts: AreaOptions) {
    if (line.length === 0) {
      return;
    }

    this.ctx.save();
    this.ctx.lineWidth = opts.width;
    this.ctx.strokeStyle = opts.color;
    this.ctx.fillStyle = opts.fillColor ?? opts.color;
    this.ctx.beginPath();

    const firstX = line[0].x;
    let lastX = 0;

    this.ctx.moveTo(firstX, line[0].y);

    for (let i = 1; i < line.length; i++) {
      const x = line[i].x;
      this.ctx.lineTo(x, line[i].y);
      if (i === line.length - 1) {
        lastX = x;
      }
    }

    this.ctx.stroke();

    // draw the missing parts
    this.ctx.lineTo(lastX, this.height); // bottom-right
    this.ctx.lineTo(firstX, this.height); // bottom-left

    this.ctx.globalAlpha = opts.alpha ?? 0.02;
    this.ctx.fill(); // will close the path for us
    this.ctx.globalAlpha = 1;
    this.ctx.closePath();

    if (opts.withPlots) {
      for (let i = 0; i < line.length; i++) {
        this.ctx.fillStyle = opts.color;
        this.ctx.beginPath();
        this.ctx.arc(line[i].x, line[i].y, opts.radius ?? 2, 0, CIRCLE_END_ANGLE);
        this.ctx.fill();
      }
    }

    this.ctx.restore();
  }

  circle(x: number, y: number, opts: CircleOptions) {
    this.ctx.save();

    // Draw circle "stroke"
    this.ctx.beginPath();
    this.ctx.fillStyle = opts.color;
    this.ctx.strokeStyle = opts.color;
    this.ctx.arc(x, y, opts.radius, 0, CIRCLE_END_ANGLE);
    this.ctx.fill();

    this.ctx.restore();

    // Draw circle fill
    if (opts.fill) {
      this.ctx.fillStyle = opts.fill;
      this.ctx.beginPath();
      this.ctx.arc(x, y, opts.radius - 2, 0, CIRCLE_END_ANGLE);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  circles(circles: Point[], opts: CircleOptions) {
    this.ctx.save();

    this.ctx.fillStyle = opts.color;
    this.ctx.strokeStyle = opts.color;
    for (let i = 0; i < circles.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(circles[i].x, circles[i].y, opts.radius, 0, CIRCLE_END_ANGLE);
      this.ctx.fill();
      this.ctx.closePath();
    }

    this.ctx.restore();
  }

  rects(serie: Rect[], opts: RectOptions) {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.fillStyle = opts.color;
    for (const { x, y, w = opts.width, h = opts.height } of serie) {
      this.ctx.fillRect(x, y, w, h);
    }

    this.ctx.restore();
  }

  rect({ x, y, h, w }: Rect, opts: RectOptions) {
    this.ctx.save();

    this.ctx.beginPath();
    if (opts.fill) {
      this.ctx.fillStyle = opts.color;
      this.ctx.fillRect(x, y, w ?? opts.width, h ?? opts.height);
    } else {
      this.ctx.strokeStyle = opts.color;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, w ?? opts.width, h ?? opts.height);
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
