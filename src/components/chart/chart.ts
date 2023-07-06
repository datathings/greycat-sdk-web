import * as d3 from 'd3';

(window as any).d3 = d3;

import { debounce } from '../../internals';
import { getColors } from '../../utils';
import * as draw from './ctx';
import { Axis, ChartConfig, ScaleType } from './types';
import { Scale } from './internals';

export class GuiChart extends HTMLElement {
  private _obs: ResizeObserver;
  private _config: ChartConfig;
  private _canvas: HTMLCanvasElement;
  private _svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _ctx: CanvasRenderingContext2D;
  private _colors: string[];

  constructor() {
    super();

    this._config = { type: 'line', table: { data: [] }, series: [] };
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
        this._svg.attr('viewBox', `0 0 ${this._canvas.width} ${this._canvas.height}`);
        this.update();
      }, 250),
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
    // clear the canvas content
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // clear svg elements
    this._svg.selectChildren().remove();

    let leftAxes = 0;
    let rightAxes = 0;
    if (this._config.yAxes) {
      for (const yAxisName in this._config.yAxes) {
        const pos = this._config.yAxes[yAxisName].position;
        if (pos === undefined || pos === 'left') {
          leftAxes++;
        } else {
          rightAxes++;
        }
      }
    }

    const style = getComputedStyle(this);
    const margin = {
      top: parseInt(style.getPropertyValue('--m-top')),
      right: parseInt(style.getPropertyValue('--m-right')),
      rightEmpty: parseInt(style.getPropertyValue('--m-right-empty')),
      bottom: parseInt(style.getPropertyValue('--m-bottom')),
      left: parseInt(style.getPropertyValue('--m-left')),
      leftEmpty: parseInt(style.getPropertyValue('--m-left-empty')),
    };

    // compute ranges based on available width, height and margins
    const xRange = [
      leftAxes === 0 ? margin.left : margin.left + margin.left * (leftAxes - 1),
      rightAxes === 0
        ? this._canvas.width - margin.right
        : this._canvas.width - margin.right - margin.right * (rightAxes - 1),
    ];
    const yRange = [this._canvas.height - margin.bottom, margin.top];

    let xScale;
    {
      const xAxis: Omit<Axis, 'title' | 'format' | 'formatLocale'> = {
        min: 0,
        max: Math.max(0, this._config.table.data.length - 1),
        scale: 'linear',
        ...this._config.xAxis,
      };
      xScale = createScale(xAxis.scale, [xAxis.min, xAxis.max], xRange);
    }

    const yScales: Record<string, Scale> = {};
    if (this._config.yAxes) {
      for (const yAxisName in this._config.yAxes) {
        const yAxis = this._config.yAxes[yAxisName];

        const type = yAxis.scale ?? 'linear';
        let min: number | null = null;
        let max: number | null = null;

        if (yAxis.min === undefined || yAxis.max === undefined) {
          // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
          for (let i = 0; i < this._config.series.length; i++) {
            const serie = this._config.series[i];
            if (serie.yAxis === yAxisName) {
              for (let row = 0; row < this._config.table.data.length; row++) {
                const value = this._config.table.data[row][serie.yCol];
                if (min == null) {
                  min = value;
                } else if (value <= min) {
                  min = value;
                }
                if (max == null) {
                  max = value;
                } else if (value >= max) {
                  max = value;
                }
              }
            }
          }
        }

        yScales[yAxisName] = createScale(type, [yAxis.min ?? min, yAxis.max ?? max], yRange);
      }
    }

    for (let i = 0; i < this._config.series.length; i++) {
      const serie = this._config.series[i];
      switch (serie.type ?? 'line') {
        case 'line':
          draw.line(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              dashed: serie.dashed,
              opacity: serie.opacity,
            },
          );
          break;
        case 'line+scatter':
          draw.line(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              dashed: serie.dashed,
              opacity: serie.opacity,
            },
          );
          draw.scatter(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              radius: serie.width ?? 2,
            },
          );
          break;
        case 'line+area':
          draw.area(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              kind: serie.kind ?? 'below',
              opacity: serie.opacity,
            },
          );
          draw.line(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              dashed: serie.dashed,
              opacity: serie.opacity,
            },
          );
          break;
        case 'area':
          draw.area(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              kind: serie.kind ?? 'below',
              opacity: serie.opacity,
            },
          );
          break;
        case 'bar':
          draw.bar(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              width: serie.width ?? 1,
              opacity: serie.opacity ?? 1,
            },
          );
          break;
        case 'scatter':
          draw.scatter(
            this._ctx,
            this._config.table,
            serie.xCol,
            serie.yCol,
            xScale,
            yScales[serie.yAxis],
            {
              color: serie.color ?? this._colors[i],
              radius: serie.width ?? 2,
            },
          );
          break;
        default:
          console.warn(`unhandled serie type '${serie.type}'`);
          break;
      }
    }

    // Add the x-axis.
    const xAxis = d3.axisBottom(xScale);
    this._svg
      .append('g')
      .attr('transform', `translate(0,${this._canvas.height - margin.bottom})`)
      .call(xAxis);

    // Add the y-axes.
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;
    for (const yAxisName in yScales) {
      // safety: if we have a scale then we must have a yAxes definition
      const { format = '', position } = this._config.yAxes![yAxisName];
      const fmt = d3.format(format);

      if (position === undefined || position === 'left') {
        leftAxesIdx++;
        const yAxis = d3.axisLeft(yScales[yAxisName]);
        yAxis.tickFormat(fmt);

        this._svg
          .append('g')
          .attr('transform', `translate(${margin.left + leftAxesIdx * margin.left}, 0)`)
          .call(yAxis);
      } else {
        rightAxesIdx++;
        const yAxis = d3.axisRight(yScales[yAxisName]);
        yAxis.tickFormat(fmt);

        this._svg
          .append('g')
          .attr(
            'transform',
            `translate(${this._canvas.width - (margin.right + rightAxesIdx * margin.right)}, 0)`,
          )
          .call(yAxis);
      }
    }
  }
}

function createScale(type: ScaleType = 'linear', domain: any[], range: any[]) {
  switch (type) {
    case 'linear':
      return d3.scaleLinear().domain(domain).rangeRound(range);
    case 'log':
      return d3.scaleLog().domain(domain).rangeRound(range);
    case 'time':
      return d3.scaleTime().domain(domain).rangeRound(range);
    // case 'ordinal':
    //   return d3.scaleOrdinal().domain(domain).range(range).unknown(null);
  }
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
