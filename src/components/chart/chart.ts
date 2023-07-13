import * as d3 from 'd3';

import { closest2, debounce, throttle } from '../../internals';
import { getColors } from '../../utils';
import * as draw from './ctx';
import { Axis, ChartConfig, Color, ScaleType, Serie, SerieData, SerieOptions } from './types';
import { Scale, dateFormat, vMap } from './internals';

export class GuiChart extends HTMLElement {
  private _obs: ResizeObserver;
  private _config: ChartConfig;
  private _colors: string[];
  private _cursor = { x: -1, y: -1, startX: -1, selection: false };

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

    this._config = { type: 'line', table: { data: [] }, series: [], xAxis: {}, yAxes: {} };

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

    this.addEventListener('mousedown', this._downHandler);
    this.addEventListener('mouseup', this._upHandler);
    this.addEventListener('touchend', this._upHandler);
    this.addEventListener('touchstart', this._downHandler);
    this.addEventListener('mousemove', this._moveHandler);
    this.addEventListener('touchmove', this._moveHandler);
    this.addEventListener('mouseleave', this._leaveHandler);
    this.addEventListener('touchcancel', this._leaveHandler);
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
  }

  disconnectedCallback() {
    this._obs.disconnect();
  }

  private _downHandler = (event: MouseEvent | TouchEvent) => {
    const { left } = this._canvas.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      this._cursor.startX = Math.round(event.pageX - left);
      this.updateUX();
    } else if (event.touches.length > 0) {
      this._cursor.startX = Math.round(event.touches[0].pageX - left);
      this.updateUX();
    }
  };

  private _upHandler = () => {
    this._cursor.selection = true;
    this.updateUX();
  };

  // throttle(..., 16) makes it be ~60FPS
  private _moveHandler = throttle((event: MouseEvent | TouchEvent) => {
    const { left, top } = this._canvas.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      this._cursor.x = Math.round(event.pageX - left);
      this._cursor.y = Math.round(event.pageY - top);
      this.updateUX();
    } else if (event.touches.length > 0) {
      this._cursor.x = Math.round(event.touches[0].pageX - left);
      this._cursor.y = Math.round(event.touches[0].pageY - top);
      this.updateUX();
    }
  }, 16);

  private _leaveHandler = () => {
    this._cursor.x = -1;
    this._cursor.y = -1;
    this._cursor.startX = -1;
    this._cursor.selection = false;

    this.updateUX();
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
  private updateUX = () => {
    this._clearUX();

    // XXX later optim: we could split compute even more to prevent computing the scales and margins and styles if the cursor is not in range
    const { xRange, yRange, rightAxes, style, xScale, yScales } = this._compute();

    if (
      this._cursor.x !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.x >= xRange[0] &&
      this._cursor.x <= xRange[1] &&
      this._cursor.y >= yRange[1] &&
      this._cursor.y <= yRange[0]
    ) {
      // make tooltip visible and located properly
      this._tooltip.style.visibility = 'visible';
      switch (this._config.tooltip?.position ?? 'top-left') {
        case 'top-left':
          this._tooltip.style.left = `${xRange[0] + 10}px`;
          this._tooltip.style.top = `${yRange[1]}px`;
          break;
        case 'top-right':
          this._tooltip.style.right = `${xRange[0] + 10}px`;
          this._tooltip.style.top = `${yRange[1]}px`;
          break;
        case 'bottom-left':
          this._tooltip.style.left = `${xRange[0] + 10}px`;
          this._tooltip.style.bottom = `${yRange[1] + style.margin.bottom}px`;
          break;
        case 'bottom-right':
          this._tooltip.style.right = `${xRange[0] + 10}px`;
          this._tooltip.style.bottom = `${yRange[1] + style.margin.bottom}px`;
          break;
      }

      // The dashed lines, cursor, and axis texts could arguably be configured by the user
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
            color: style.cursor.lineColor,
            dashed: true,
          },
        );
        // cursor vertical dashed
        draw.simpleLine(this._uxCtx, this._cursor.x, yRange[0], this._cursor.x, yRange[1], {
          color: style.cursor.lineColor,
          dashed: true,
        });
        // cursor cross
        draw.cross(this._uxCtx, this._cursor.x, this._cursor.y, 12, {
          color: style.cursor.color,
          thickness: 2,
        });

        // bottom axis text
        const xValue = xScale.invert(this._cursor.x);
        let bottomText = `${xValue}`;
        if (this._config.xAxis.scale === 'time') {
          if (this._config.xAxis.cursorFormat === undefined) {
            bottomText = d3.isoFormat(xValue as Date);
          } else {
            bottomText = d3.utcFormat(this._config.xAxis.cursorFormat)(xValue as Date);
          }
        } else {
          if (this._config.xAxis.cursorFormat) {
            bottomText = d3.format(this._config.xAxis.cursorFormat)(xScale.invert(this._cursor.x));
          }
        }
        // TODO clip on boundaries
        draw.text(this._uxCtx, this._cursor.x, yRange[0] + 8, bottomText, {
          color: style.cursor.color,
          backgroundColor: style.cursor.bgColor,
          align: 'center',
          baseline: 'top',
        });
        let leftAxesIdx = -1;
        let rightAxesIdx = -1;
        // y axes texts
        for (const yAxisName in yScales) {
          const yAxis = this._config.yAxes[yAxisName];
          if (yAxis.position === undefined || yAxis.position === 'left') {
            leftAxesIdx++;
            draw.text(
              this._uxCtx,
              style.margin.left + leftAxesIdx * style.margin.left - 8,
              this._cursor.y,
              d3.format(yAxis.format ?? '.2f')(vMap(yScales[yAxisName].invert(this._cursor.y))),
              {
                color: style.cursor.color,
                backgroundColor: style.cursor.bgColor,
                align: 'end',
                baseline: 'middle',
              },
            );
          } else {
            rightAxesIdx++;
            draw.text(
              this._uxCtx,
              this._canvas.width - (style.margin.right + rightAxesIdx * style.margin.right) + 8,
              this._cursor.y,
              d3.format(yAxis.format ?? '.2f')(vMap(yScales[yAxisName].invert(this._cursor.y))),
              {
                color: style.cursor.color,
                backgroundColor: style.cursor.bgColor,
                align: 'start',
                baseline: 'middle',
              },
            );
          }
        }
      }

      // display markers on series & tooltip based on cursor location
      for (let i = 0; i < this._config.series.length; i++) {
        const serie: Serie & SerieOptions = {
          color: this._colors[i],
          width: 1,
          markerWidth: 4,
          markerShape: 'circle',
          markerColor: this._config.series[i].color ?? this._colors[i],
          opacity: 1,
          fillOpacity: 0.2,
          yCol2: 'min',
          ...this._config.series[i],
        };

        const v = +xScale.invert(this._cursor.x);
        const { xValue, rowIdx } = closest2(this._config.table, serie.xCol, v);
        const yValue =
          typeof this._config.table.data[rowIdx][serie.yCol] === 'bigint'
            ? Number(this._config.table.data[rowIdx][serie.yCol])
            : this._config.table.data[rowIdx][serie.yCol];
        const x = xScale(vMap(xValue));
        const y = yScales[serie.yAxis](vMap(yValue));
        const w = serie.markerWidth;
        let yValue2;
        if (typeof serie.yCol2 === 'number') {
          yValue2 = this._config.table.data[rowIdx][serie.yCol2];
        }

        // marker
        switch (serie.type ?? 'line') {
          case 'line+scatter':
          case 'scatter':
          case 'line':
          case 'line+area':
          case 'area': {
            // make sure to also add a marker when 'yCol2' is defined
            this._drawMarker(serie, x, y, w, serie.markerColor);
            if (yValue2 !== undefined) {
              const y2 = yScales[serie.yAxis](vMap(yValue2));
              this._drawMarker(serie, x, y2, w, serie.markerColor);
            }
            break;
          }
          case 'bar':
            draw.rectangle(
              this._uxCtx,
              x,
              y + (yRange[0] - y) / 2,
              serie.width + 1,
              yRange[0] - y,
              {
                color: style['accent-0'],
              },
            );
            break;
        }

        // tooltip
        if (!this._config.tooltip?.render) {
          const nameEl = document.createElement('div');
          nameEl.style.color = serie.color;
          nameEl.textContent = `${serie.title ?? `Col ${serie.yCol}`}:`;
          const valueEl = document.createElement('div');
          valueEl.style.color = serie.color;
          valueEl.textContent = d3.format(this._config.yAxes[serie.yAxis].format ?? '')(yValue);
          this._tooltip.append(nameEl, valueEl);

          if (yValue2 !== undefined) {
            const nameEl = document.createElement('div');
            nameEl.style.color = serie.color;
            nameEl.textContent = `${serie.title ?? `Col ${serie.yCol2}`}:`;
            const valueEl = document.createElement('div');
            valueEl.style.color = serie.color;
            valueEl.textContent = d3.format(this._config.yAxes[serie.yAxis].format ?? '')(yValue2);
            this._tooltip.append(nameEl, valueEl);
          }
        }
      }

      const data = this._config.series.map((s, i) => {
        const serie: SerieData = {
          color: this._colors[i],
          width: 1,
          markerWidth: 3,
          markerShape: 'circle',
          markerColor: this._config.series[i].color ?? this._colors[i],
          opacity: 1,
          fillOpacity: 0.2,
          yCol2: 'min',
          ...s,
        };

        const v = +xScale.invert(this._cursor.x);
        const { xValue, rowIdx } = closest2(this._config.table, serie.xCol, v);
        serie.xValue = xValue;
        serie.yValue = this._config.table.data[rowIdx][serie.yCol];
        return serie;
      });
      // call tooltip render if defined
      this._config.tooltip?.render?.(data);
      // dispatch event
      this.dispatchEvent(new GuiChartCursorEvent(data));
    }

    if (this._cursor.startX !== -1) {
      let startX = this._cursor.startX;
      if (startX < xRange[0]) {
        startX = xRange[0];
      } else if (startX > xRange[1]) {
        startX = xRange[1];
      }
      let endX = this._cursor.x;
      if (endX < xRange[0]) {
        endX = xRange[0];
      } else if (endX > xRange[1]) {
        endX = xRange[1];
      }
      if (startX > endX) {
        const tmp = endX;
        endX = startX;
        startX = tmp;
      }

      if (startX !== endX) {
        let from: unknown = xScale.invert(startX);
        let to: unknown = xScale.invert(endX);

        if (this._cursor.selection) {
          // selection is done
          this.dispatchEvent(new GuiChartSelectionEvent(from, to));

          // reset selection
          this._cursor.startX = -1;
          this._cursor.selection = false;
        } else {
          // selection in progress
          const w = endX - startX;
          const h = this._uxCanvas.height - style.margin.top - style.margin.bottom;
          draw.rectangle(this._uxCtx, startX + w / 2, yRange[1] + h / 2, w, h, {
            fill: style['accent-0'],
            opacity: 0.1,
          });

          const nameEl = document.createElement('div');
          nameEl.style.color = style['text-0'];
          nameEl.textContent = 'Selection:';
          const valueEl = document.createElement('div');
          valueEl.style.color = style['text-0'];
          if (this._config.xAxis.scale === 'time') {
            if (this._config.xAxis.cursorFormat === undefined) {
              from = d3.isoFormat(from as Date);
              to = d3.isoFormat(to as Date);
            } else {
              from = d3.utcFormat(this._config.xAxis.cursorFormat)(from as Date);
              to = d3.utcFormat(this._config.xAxis.cursorFormat)(to as Date);
            }
          }
          valueEl.textContent = `${from}, ${to}`;

          this._tooltip.append(nameEl, valueEl);
        }
      }
    }
  };

  private _drawMarker(serie: Serie & SerieOptions, x: number, y2: number, w: number, color: Color) {
    switch (serie.markerShape ?? 'circle') {
      case 'circle':
        draw.circle(this._uxCtx, x, y2, w, {
          fill: color,
        });
        break;
      case 'square':
        draw.rectangle(this._uxCtx, x, y2, w, w, {
          fill: color,
        });
        break;
      case 'triangle':
        draw.triangle(this._uxCtx, x, y2, w, w, {
          fill: color,
        });
        break;
    }
  }

  private _clearUX(): void {
    // clear ux canvas
    this._uxCtx.clearRect(0, 0, this._uxCanvas.width, this._uxCanvas.height);
    // clear tooltip
    this._tooltip.replaceChildren();
    this._tooltip.style.visibility = 'hidden';
    this._tooltip.style.top = '';
    this._tooltip.style.right = '';
    this._tooltip.style.bottom = '';
    this._tooltip.style.left = '';
  }

  /**
   * This is all about drawing the series onto the main canvas. This can be a tiny bit heavy as opposed to `updateUX` as it is
   * only called when the config changes.
   */
  update(): void {
    // clear the main canvas
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // clear the ux canvas too (to prevent phantom markers)
    this._clearUX();

    const { xScale, yScales, style } = this._compute();

    for (let i = 0; i < this._config.series.length; i++) {
      const serie: Serie & SerieOptions = {
        color: this._colors[i],
        width: 1,
        markerWidth: 3,
        markerShape: 'circle',
        markerColor: this._config.series[i].color ?? this._colors[i],
        opacity: 1,
        fillOpacity: 0.2,
        yCol2: 'min',
        ...this._config.series[i],
      };

      switch (serie.type) {
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
    if (this._config.xAxis.scale === 'time') {
      xAxis.tickFormat((v) => dateFormat(v as Date));
    } else if (this._config.xAxis.format) {
      xAxis.tickFormat(d3.format(this._config.xAxis.format));
    }
    this._xAxisGroup
      .attr('transform', `translate(0,${this._canvas.height - style.margin.bottom})`)
      .call(xAxis);

    // Add the y-axes.
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;

    for (const yAxisName in yScales) {
      if (this._yAxisGroups[yAxisName] === undefined) {
        // create a yAxisGroup only if needed
        this._yAxisGroups[yAxisName] = this._svg.append('g');
      }

      const { format, position, scale } = this._config.yAxes[yAxisName];

      // safety: either `(x: number) => string` or `(x: Date) => string` or `null`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fmt: ((domainValue: any, index: number) => string) | null =
        scale === 'time' ? dateFormat : format ? d3.format(format) : null;

      if (position === undefined || position === 'left') {
        leftAxesIdx++;
        const yAxis = d3.axisLeft(yScales[yAxisName]);
        if (fmt) {
          yAxis.tickFormat(fmt);
        }

        this._yAxisGroups[yAxisName]
          .attr('transform', `translate(${style.margin.left + leftAxesIdx * style.margin.left}, 0)`)
          .call(yAxis);
      } else {
        rightAxesIdx++;
        const yAxis = d3.axisRight(yScales[yAxisName]);
        if (fmt) {
          yAxis.tickFormat(fmt);
        }

        this._yAxisGroups[yAxisName]
          .attr(
            'transform',
            `translate(${
              this._canvas.width - (style.margin.right + rightAxesIdx * style.margin.right)
            }, 0)`,
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
    for (const yAxisName in this._config.yAxes) {
      const pos = this._config.yAxes[yAxisName].position;
      if (pos === undefined || pos === 'left') {
        leftAxes++;
      } else {
        rightAxes++;
      }
    }

    const style = getComputedStyle(this);
    const props = {
      'text-0': `rgb(${style.getPropertyValue('--text-0')})`,
      'accent-0': `rgb(${style.getPropertyValue('--accent-0')})`,
      cursor: {
        color: style.getPropertyValue('--cursor-c'),
        bgColor: style.getPropertyValue('--cursor-bg-c'),
        lineColor: style.getPropertyValue('--cursor-line-c'),
      },
      margin: {
        top: parseInt(style.getPropertyValue('--m-top')),
        right: parseInt(style.getPropertyValue('--m-right')),
        rightEmpty: parseInt(style.getPropertyValue('--m-right-empty')),
        bottom: parseInt(style.getPropertyValue('--m-bottom')),
        left: parseInt(style.getPropertyValue('--m-left')),
        leftEmpty: parseInt(style.getPropertyValue('--m-left-empty')),
      },
    };

    // compute ranges based on available width, height and margins
    const xRange = [
      leftAxes === 0 ? props.margin.left : props.margin.left + props.margin.left * (leftAxes - 1),
      rightAxes === 0
        ? this._canvas.width - props.margin.right
        : this._canvas.width - props.margin.right - props.margin.right * (rightAxes - 1),
    ];
    const yRange = [this._canvas.height - props.margin.bottom, props.margin.top];

    let xMin: number | null = null;
    let xMax: number | null = null;

    for (const serie of this._config.series) {
      if (serie.xCol !== undefined) {
        for (let row = 0; row < this._config.table.data.length; row++) {
          const value = this._config.table.data[row][serie.xCol];
          if (xMin == null) {
            xMin = value;
          } else if (value <= xMin) {
            xMin = value;
          }
          if (xMax == null) {
            xMax = value;
          } else if (value >= xMax) {
            xMax = value;
          }
        }
      }
    }

    const xAxis: Omit<Axis, 'title' | 'format' | 'formatLocale'> = {
      min: xMin ?? 0,
      max: xMax ?? Math.max(0, this._config.table.data.length - 1),
      scale: 'linear',
      ...this._config.xAxis,
    };

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
              // make sure to account for 'yCol2' if used
              if (typeof serie.yCol2 === 'number') {
                const value = this._config.table.data[row][serie.yCol2];
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
      }

      yScales[yAxisName] = createScale(type, [yAxis.min ?? min, yAxis.max ?? max], yRange);
    }

    const xScale = createScale(xAxis.scale, [xAxis.min, xAxis.max], xRange);

    return { leftAxes, rightAxes, xRange, yRange, style: props, xScale, yScales };
  }
}

// TODO validate the usage of 'any' here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createScale(type: ScaleType = 'linear', domain: any[], range: any[]): Scale {
  domain = [vMap(domain[0]), vMap(domain[1])];

  switch (type) {
    case 'linear':
      return d3.scaleLinear().domain(domain).rangeRound(range);
    case 'log':
      return d3.scaleLog().domain(domain).rangeRound(range);
    case 'time':
      return d3.scaleTime().domain(domain).rangeRound(range);
  }
}

const SELECTION_EVENT_TYPE = 'selection';
const CURSOR_EVENT_TYPE = 'cursor';

/**
 * `detail` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 */
export class GuiChartSelectionEvent extends CustomEvent<{ from: unknown; to: unknown }> {
  constructor(from: unknown, to: unknown) {
    super(SELECTION_EVENT_TYPE, { detail: { from, to }, bubbles: true });
  }
}

/**
 * `detail` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 */
export class GuiChartCursorEvent extends CustomEvent<SerieData[]> {
  constructor(data: SerieData[]) {
    super(CURSOR_EVENT_TYPE, { detail: data, bubbles: true });
  }
}

declare global {
  interface Window {
    GuiChart: typeof GuiChart;
  }

  interface HTMLElementTagNameMap {
    'gui-chart': GuiChart;
  }

  interface HTMLElementEventMap {
    [CURSOR_EVENT_TYPE]: GuiChartCursorEvent;
    [SELECTION_EVENT_TYPE]: GuiChartSelectionEvent;
  }
}

if (!window.customElements.get('gui-chart')) {
  window.GuiChart = GuiChart;
  window.customElements.define('gui-chart', GuiChart);
}
