import * as d3 from 'd3';

import { debounce } from '../../internals';
import { getColors } from '../../utils';
import * as draw from './ctx';
import { ChartConfig, Domain, Margin, ScaleType, Serie } from './types';

type Datum = unknown;
const DEFAULT_MARGINS: Margin = { top: 5, right: 5, bottom: 20, left: 35 };

export class GuiChart extends HTMLElement {
  private _obs: ResizeObserver;
  private _config: ChartConfig;
  private _canvas: HTMLCanvasElement;
  private _svg!: d3.Selection<SVGSVGElement, Datum, null, undefined>;
  private _ctx: CanvasRenderingContext2D;
  private _colors: string[];
  gb: any = {};

  constructor() {
    super();

    this._config = { type: 'line', series: [] };
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

    // this._svg.on(
    //   'mousemove',
    //   throttle(function (event) {
    //     console.log('mousemove', event);
    //   }, 100)
    // );
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

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // clean previous stuff
    this._svg.selectChildren().remove();

    // compute range based on available width, height and margins
    const range = {
      x: [margin.left, this._canvas.width - margin.right] as const,
      y: [this._canvas.height - margin.bottom, margin.top] as const,
    };

    // compute x and y domains based on the data or the optional min/max bounds
    const domain = computeDomain(this._config.series, this._config.domain);

    // compute the default scales
    let xScale = computeScale(
      this._config.xScale ?? 'linear',
      range.x,
      domain.x
    );
    let yScale = computeScale(
      this._config.yScale ?? 'linear',
      range.y,
      domain.y
    );

    this.gb.xScale = xScale;
    this.gb.yScale = yScale;

    for (let i = 0; i < this._config.series.length; i++) {
      const serie = this._config.series[i];

      let localXScale = xScale;
      if (serie.xScale) {
        localXScale = computeScale(serie.xScale, range.x, domain.x);
      }
      let localYScale = yScale;
      if (serie.yScale) {
        localYScale = computeScale(serie.yScale, range.y, domain.y);
        if (serie.yScale !== (this._config.yScale ?? 'linear')) {
          this._svg
            .append('g')
            .attr(
              'transform',
              `translate(${this._canvas.width - margin.right}, 0)`
            )
            .call(d3.axisRight(localYScale));
        }
      }

      switch (serie.type) {
        default:
        case 'line':
          draw.line(this._ctx, serie.data, localXScale, localYScale, {
            color: serie.color ?? this._colors[i],
            width: serie.width ?? 1,
            dashed: serie.dashed,
            opacity: serie.opacity,
          });
          break;
        case 'bar':
          draw.bar(this._ctx, serie.data, localXScale, localYScale, {
            color: serie.color ?? this._colors[i],
            width: serie.width ?? 15,
            opacity: serie.opacity ?? 1,
          });
          break;
        case 'scatter':
          draw.scatter(this._ctx, serie.data, localXScale, localYScale, {
            color: serie.color ?? this._colors[i],
            radius: 2,
          });
          break;
      }
    }

    // Add the x-axis.
    this._svg
      .append('g')
      .attr('transform', `translate(0,${this._canvas.height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Add the y-axis.
    this._svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }
}

function computeDomain(series: Serie[], opts: Partial<Domain> = {}) {
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

  return {
    x: [xMin, xMax] as const,
    y: [yMin, yMax] as const,
  };
}

function computeScale(
  type: ScaleType = 'linear',
  range: readonly [number, number],
  domain: readonly [number, number]
):
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>
  | d3.ScaleLogarithmic<number, number, never> {
  let scale;
  switch (type) {
    case 'linear':
      scale = d3.scaleLinear(domain, range).interpolate(d3.interpolateRound);
      break;

    case 'log':
      scale = d3.scaleLog(domain, range).interpolate(d3.interpolateRound);
      break;

    case 'time':
      scale = d3.scaleTime(domain, range).interpolate(d3.interpolateRound);
      break;
  }

  return scale;
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
