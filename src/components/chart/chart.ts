import * as d3 from 'd3';

import { debounce } from '../../internals';
import { getColors } from '../../utils';
import * as draw from './ctx';
import { Axis, ChartConfig, ScaleType, Serie, SerieOptions } from './types';
import { Scale } from './internals';

export class GuiChart extends HTMLElement {
  private _obs: ResizeObserver;
  private _config: ChartConfig;
  private _colors: string[];
  private _cursor = { x: -1, y: -1 };

  private _svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _xAxisGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _yAxisGroups: Record<string, d3.Selection<SVGGElement, unknown, null, undefined>> = {};

  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _uxCanvas: HTMLCanvasElement;
  private _uxCtx: CanvasRenderingContext2D;

  private _tooltip = document.createElement('div');

  constructor() {
    super();

    this._config = { type: 'line', table: { data: [] }, series: [] };

    // main canvas
    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'block';
    this._canvas.style.position = 'absolute';
    this._canvas.style.background = 'transparent';
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;

    // ux canvas
    this._uxCanvas = document.createElement('canvas');
    this._uxCanvas.style.display = 'block';
    this._uxCanvas.style.position = 'absolute';
    this._uxCanvas.style.background = 'transparent';
    this._uxCtx = this._uxCanvas.getContext('2d') as CanvasRenderingContext2D;

    // tooltip
    this._tooltip.style.display = 'block';
    this._tooltip.style.position = 'absolute';
    this._tooltip.classList.add('gui-chart-tooltip');

    this._colors = getColors(this);

    this._obs = new ResizeObserver(
      debounce(() => {
        let { width, height } = this.getBoundingClientRect();
        width = Math.round(width);
        height = Math.round(height);

        // resize main canvas
        this._canvas.width = width;
        this._canvas.height = height;
        // resize ux canvas
        this._uxCanvas.width = width;
        this._uxCanvas.height = height;
        // resize svg
        this._svg.attr('viewBox', `0 0 ${this._canvas.width} ${this._canvas.height}`);

        this.update();
      }, 250),
    );
  }

  connectedCallback() {
    this._obs.observe(this);

    const style = getComputedStyle(this);
    if (style.display === 'inline') {
      // makes sure the WebComponent is properly displayed as 'block' unless overridden by something else
      this.style.display = 'block';
    }
    this.style.position = 'relative';

    this._svg = d3
      .select(this)
      .append('svg')
      .style('background', 'transparent')
      .style('position', 'absolute');

    this._xAxisGroup = this._svg.append('g');

    this.append(this._canvas, this._uxCanvas, this._tooltip);

    this.addEventListener('mousemove', this._moveHandler);
    this.addEventListener('touchmove', this._moveHandler);
    this.addEventListener('mouseleave', this._leaveHandler);
    this.addEventListener('touchend', this._leaveHandler);
    // this.addEventListener('click', this._leaveHandler);

    const mainLoop = () => {
      this.updateUX();
      requestAnimationFrame(mainLoop);
    };
    requestAnimationFrame(mainLoop);
  }

  disconnectedCallback() {
    this._obs.disconnect();
    this.removeEventListener('mousemove', this._moveHandler);
    this.removeEventListener('touchmove', this._moveHandler);
    this.removeEventListener('mouseleave', this._leaveHandler);
    this.removeEventListener('touchend', this._leaveHandler);
    // this.removeEventListener('click', this._leaveHandler);
  }

  private _moveHandler = (event: MouseEvent | TouchEvent) => {
    const { left, top } = this._canvas.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      this._cursor.x = event.pageX - left;
      this._cursor.y = event.pageY - top;
    } else {
      this._cursor.x = event.touches[0].pageX - left;
      this._cursor.y = event.touches[0].pageY - top;
    }
  };

  private _leaveHandler = () => {
    this._cursor.x = -1;
    this._cursor.y = -1;
  };

  set config(config: ChartConfig) {
    this._config = config;
    this.update();
  }

  get config() {
    return this._config;
  }

  /**
   * This is all about cursor interactions.
   *
   * This needs to be light as it is rendered every single possible frame (leveraging `requestAnimationFrame`)
   */
  private updateUX() {
    // clear the canvas
    this._uxCtx.clearRect(0, 0, this._uxCanvas.width, this._uxCanvas.height);

    const { xRange, yRange, rightAxes, style, xScale, yScales, margin } = this._compute();

    if (
      this._cursor.x !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.x >= xRange[0] &&
      this._cursor.x <= xRange[1] &&
      this._cursor.y >= yRange[1] &&
      this._cursor.y <= yRange[0]
    ) {
      // XXX The dashed lines, cursor, and axis texts could arguably be configured by the user
      // if cursor: true, then display cursor info in realtime
      if (this._config.cursor) {
        // cursor horizontal dashed
        draw.simpleLine(
          this._uxCtx,
          xRange[0],
          this._cursor.y,
          rightAxes === 0 ? this._cursor.x : xRange[1],
          this._cursor.y,
          {
            color: style.getPropertyValue('--cursor-line-c'),
            dashed: true,
          },
        );
        // cursor vertical dashed
        draw.simpleLine(this._uxCtx, this._cursor.x, yRange[0], this._cursor.x, this._cursor.y, {
          color: style.getPropertyValue('--cursor-line-c'),
          dashed: true,
        });
        // cursor cross
        draw.cross(this._uxCtx, this._cursor.x, this._cursor.y, 12, {
          color: style.getPropertyValue('--cursor-c'),
          thickness: 2,
        });

        // bottom axis text
        draw.text(
          this._uxCtx,
          this._cursor.x,
          yRange[0] + 8,
          d3.format(this._config.xAxis?.format ?? '.2f')(xScale.invert(this._cursor.x)),
          {
            color: style.getPropertyValue('--cursor-c'),
            backgroundColor: style.getPropertyValue('--cursor-bg-c'),
            align: 'center',
            baseline: 'top',
          },
        );
        let leftAxesIdx = -1;
        let rightAxesIdx = -1;
        // y axes texts
        for (const yAxisName in yScales) {
          const yAxis = this._config.yAxes![yAxisName];
          if (yAxis.position === undefined || yAxis.position === 'left') {
            leftAxesIdx++;
            draw.text(
              this._uxCtx,
              margin.left + leftAxesIdx * margin.left - 8,
              this._cursor.y,
              d3.format(yAxis.format ?? '.2f')(yScales[yAxisName].invert(this._cursor.y)),
              {
                color: style.getPropertyValue('--cursor-c'),
                backgroundColor: style.getPropertyValue('--cursor-bg-c'),
                align: 'end',
                baseline: 'middle',
              },
            );
          } else {
            rightAxesIdx++;
            draw.text(
              this._uxCtx,
              this._canvas.width - (margin.right + rightAxesIdx * margin.right) + 8,
              this._cursor.y,
              d3.format(yAxis.format ?? '.2f')(yScales[yAxisName].invert(this._cursor.y)),
              {
                color: style.getPropertyValue('--cursor-c'),
                backgroundColor: style.getPropertyValue('--cursor-bg-c'),
                align: 'start',
                baseline: 'middle',
              },
            );
          }
        }
      }

      // display markers on series based on cursor location
      for (let i = 0; i < this._config.series.length; i++) {
        const serie = this._config.series[i];

        const xValue = Math.round(+xScale.invert(this._cursor.x));
        const row = this._config.table.data[xValue];
        if (row !== undefined) {
          const yValue = this._config.table.data[xValue][serie.yCol];
          const x = xScale(xValue);
          const y = yScales[serie.yAxis](yValue);
          draw.circle(this._uxCtx, x, y, 5, {
            color: this._colors[i],
            fill: this._colors[i],
          });
        }
      }
    }
  }

  /**
   * This is all about drawing the series onto the main canvas. This can be a tiny bit heavy as opposed to `updateUX` as it is
   * only called when the config changes.
   */
  update(): void {
    // clear the canvas content
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    var { xScale, yScales, margin } = this._compute();

    for (let i = 0; i < this._config.series.length; i++) {
      const serie: Serie & SerieOptions = {
        color: this._colors[i],
        width: 1,
        markerWidth: 2,
        markerShape: 'circle',
        opacity: 1,
        fillOpacity: 0.2,
        kind: 'below',
        ...this._config.series[i],
      };

      switch (serie.type ?? 'line') {
        case 'line':
          draw.line(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'line+scatter':
          draw.line(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          draw.scatter(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'line+area':
          // draw area "under" (before) line
          draw.area(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          draw.line(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'area':
          draw.area(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'bar':
          draw.bar(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'scatter':
          draw.scatter(this._ctx, this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
      }
    }

    // Add the x-axis.
    const xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d3.format(this._config.xAxis?.format ?? ''));
    this._xAxisGroup
      .attr('transform', `translate(0,${this._canvas.height - margin.bottom})`)
      .call(xAxis);

    // Add the y-axes.
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;

    for (const yAxisName in yScales) {
      if (this._yAxisGroups[yAxisName] === undefined) {
        // create a yAxisGroup only if needed
        this._yAxisGroups[yAxisName] = this._svg.append('g');
      }

      // safety: if we have a scale then we must have a yAxes definition
      const { format = '', position } = this._config.yAxes![yAxisName];
      const fmt = d3.format(format);

      if (position === undefined || position === 'left') {
        leftAxesIdx++;
        const yAxis = d3.axisLeft(yScales[yAxisName]);
        yAxis.tickFormat(fmt);

        this._yAxisGroups[yAxisName]
          .attr('transform', `translate(${margin.left + leftAxesIdx * margin.left}, 0)`)
          .call(yAxis);
      } else {
        rightAxesIdx++;
        const yAxis = d3.axisRight(yScales[yAxisName]);
        yAxis.tickFormat(fmt);

        this._yAxisGroups[yAxisName]
          .attr(
            'transform',
            `translate(${this._canvas.width - (margin.right + rightAxesIdx * margin.right)}, 0)`,
          )
          .call(yAxis);
      }
    }

    // remove no longer used yAxisGroup
    for (const yAxisName in this._yAxisGroups) {
      if (yScales[yAxisName] === undefined) {
        this._yAxisGroups[yAxisName].remove();
        delete this._yAxisGroups[yAxisName];
      }
    }
  }

  private _compute() {
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

    let xScale: Scale;
    {
      const xAxis: Omit<Axis, 'title' | 'format' | 'formatLocale'> = {
        min: 0,
        max: Math.max(0, this._config.table.data.length - 1),
        scale: 'linear',
        ...this._config.xAxis,
      };
      xScale = createScale(xAxis.scale, [xAxis.min, xAxis.max], xRange);
    }

    // TODO handle the case where no yAxes have been defined at all
    const yScales: Record<string, Scale> = {};
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
    return { leftAxes, rightAxes, xRange, yRange, style, xScale, yScales, margin };
  }
}

function createScale(type: ScaleType = 'linear', domain: any[], range: any[]): Scale {
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
