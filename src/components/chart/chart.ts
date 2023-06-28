import * as d3 from 'd3';

import { debounce } from '../../internals';
import { getColors } from '../../utils';
import * as draw from './ctx';
import { ChartConfig, Margin, ScaleType, Serie } from './types';

type Datum = unknown;
const DEFAULT_MARGINS: Margin = { top: 5, right: 5, bottom: 20, left: 35 };

export class GuiChart extends HTMLElement {
  private _obs: ResizeObserver;
  private _config: ChartConfig;
  private _canvas: HTMLCanvasElement;
  private _svg!: d3.Selection<SVGSVGElement, Datum, null, undefined>;
  private _ctx: CanvasRenderingContext2D;
  private _colors: string[];

  constructor() {
    super();

    this._config = { type: 'line', data: [] };
    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'block';
    this._canvas.style.position = 'absolute';
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._colors = getColors(this);

    this._obs = new ResizeObserver(
      debounce(() => {
        let { width, height } = this.getBoundingClientRect();
        width = Math.round(width);
        height = Math.round(height);
        console.log('resize', { width, height });
        this._canvas.width = width;
        this._canvas.height = height;
        this._svg.attr(
          'viewBox',
          `0 0 ${this._canvas.width} ${this._canvas.height}`
        );
        this.update();
      }, 250)
    );
  }

  connectedCallback() {
    this._obs.observe(this);

    const style = getComputedStyle(this);
    if (style.display === 'inline') {
      this.style.display = 'block';
    }
    this.style.position = 'relative';

    this.appendChild(this._canvas);
    this._svg = d3
      .select(this)
      .append('svg')
      .style('background', 'transparent')
      .style('position', 'absolute');

    // const renderLoop = () => {
    //   this.update();
    //   requestAnimationFrame(renderLoop);
    // };
    // requestAnimationFrame(renderLoop);
  }

  disconnectedCallback() {
    this._obs.disconnect();
  }

  set config(config: ChartConfig) {
    this._config = config;
    this.update();
  }

  get config() {
    return this._config;
  }

  update(): void {
    const margin = { ...DEFAULT_MARGINS, ...this._config.margin };

    console.log('margin', margin);

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // clean previous stuff
    this._svg.selectChildren().remove();

    let scales: ReturnType<typeof computeScales>;

    if (Array.isArray(this._config.data)) {
      scales = computeScales([{ data: this._config.data }], {
        width: this._canvas.width,
        height: this._canvas.height,
        margin,
        xType: 'linear',
        yType: 'linear',
      });

      switch (this._config.type) {
        default:
        case 'line':
          draw.line(this._ctx, this._config.data, scales.x, scales.y, {
            color: this._colors[0],
            width: 1,
          });
          break;
        case 'bar':
          draw.bar(this._ctx, this._config.data, scales.x, scales.y, {
            color: this._colors[0],
            width: 4,
          });
          break;
        case 'scatter':
          draw.scatter(this._ctx, this._config.data, scales.x, scales.y, {
            color: this._colors[0],
            radius: 2,
          });
          break;
      }
    } else {
      scales = computeScales(this._config.data.series, {
        width: this._canvas.width,
        height: this._canvas.height,
        margin,
        xType: 'linear',
        yType: 'linear',
        xMin: this._config.data.xMin,
        xMax: this._config.data.xMax,
        yMin: this._config.data.yMin,
        yMax: this._config.data.yMax,
      });
      for (let i = 0; i < this._config.data.series.length; i++) {
        const serie = this._config.data.series[i];
        switch (serie.type) {
          default:
          case 'line':
            draw.line(this._ctx, serie.data, scales.x, scales.y, {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              dashed: serie.dashed,
              opacity: serie.opacity,
            });
            break;
          case 'bar':
            draw.bar(this._ctx, serie.data, scales.x, scales.y, {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 15,
            });
            break;
          case 'scatter':
            draw.scatter(this._ctx, serie.data, scales.x, scales.y, {
              color: serie.color ?? this._colors[i],
              radius: 2,
            });
            break;
        }
      }
    }

    // Add the x-axis.
    this._svg
      .append('g')
      .attr('transform', `translate(0,${this._canvas.height - margin.bottom})`)
      .call(d3.axisBottom(scales.x));

    // Add the y-axis.
    this._svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(scales.y));
  }
}

type ScalesOptions = {
  width: number;
  height: number;
  margin: Margin;
  xType: ScaleType;
  yType: ScaleType;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};
export type Scale = (x: number) => number;

function computeScales(series: Serie[], opts: ScalesOptions) {
  let xMin = opts.xMin ?? Infinity;
  let xMax = opts.xMax ?? -Infinity;
  let yMin = opts.yMin ?? Infinity;
  let yMax = opts.yMax ?? -Infinity;
  if (
    opts.xMin !== undefined &&
    opts.xMax !== undefined &&
    opts.yMin !== undefined &&
    opts.yMax !== undefined
  ) {
    // noop
  } else {
    // I'm too lazy to unroll the combinatorial, and it will be unmaintanable
    // so let's guard against undefined for every opts.x(Min|Max)
    for (let i = 0; i < series.length; i++) {
      const serie = series[i];
      for (let i = 0; i < serie.data.length; i++) {
        const { x, y } = serie.data[i];
        if (opts.xMin === undefined && xMin > x) {
          xMin = x;
        }
        if (opts.xMax === undefined && xMax < x) {
          xMax = x;
        }
        if (opts.yMin === undefined && yMin > y) {
          yMin = y;
        }
        if (opts.yMax === undefined && yMax < y) {
          yMax = y;
        }
      }
    }
  }

  const xRange = [opts.margin.left, opts.width - opts.margin.right];
  const yRange = [opts.height - opts.margin.bottom, opts.margin.top];

  const xDomain = [xMin, xMax];
  const yDomain = [yMin, yMax];

  let xScale;
  switch (opts.xType) {
    case 'linear':
      xScale = d3
        .scaleLinear(xRange)
        .domain(xDomain)
        .interpolate(d3.interpolateRound);
      break;

    case 'log':
      xScale = d3
        .scaleLog(xRange)
        .domain(xDomain)
        .interpolate(d3.interpolateRound);
      break;

    case 'time':
      xScale = d3
        .scaleTime(xRange)
        .domain(xDomain)
        .interpolate(d3.interpolateRound);
      break;
  }

  let yScale;
  switch (opts.yType) {
    case 'linear':
      yScale = d3
        .scaleLinear(yRange)
        .domain(yDomain)
        .interpolate(d3.interpolateRound);
      break;

    case 'log':
      yScale = d3
        .scaleLog(yRange)
        .domain(yDomain)
        .interpolate(d3.interpolateRound);
      break;

    case 'time':
      yScale = d3
        .scaleTime(yRange)
        .domain(yDomain)
        .interpolate(d3.interpolateRound);
      break;
  }

  return { x: xScale, y: yScale };
}

declare global {
  interface Window {
    GuiChart: typeof GuiChart;
  }

  interface HTMLElementTagNameMap {
    'gui-chart': GuiChart;
  }
}

if (!window.customElements.get('gui-chart')) {
  window.GuiChart = GuiChart;
  window.customElements.define('gui-chart', GuiChart);
}
