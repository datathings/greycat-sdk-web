import * as d3 from 'd3';

import { closest, debounce, throttle } from '../../internals.js';
import { getColors } from '../../utils.js';
import { CanvasContext } from './ctx.js';
import { Scale, ChartConfig, Color, Serie, SerieData, SerieOptions, SelectionOptions } from './types.js';
import { relativeTimeFormat, vMap } from './internals.js';
import { core } from '@greycat/sdk';
import { Disposer } from '../common.js';

type Cursor = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  selection: boolean;
};

type ComputedState = {
  leftAxes: number;
  rightAxes: number;
  xRange: number[];
  yRange: number[];
  style: {
    'text-0': string;
    'accent-0': string;
    cursor: {
      color: string;
      bgColor: string;
      lineColor: string;
    };
    margin: {
      top: number;
      right: number;
      rightEmpty: number;
      bottom: number;
      left: number;
      leftEmpty: number;
    };
  };
  xScale: Scale;
  yScales: Record<string, Scale>;
};

export class GuiChart extends HTMLElement {
  private _disposer: Disposer;
  private _config: ChartConfig;
  private _colors: string[] = [];
  private _cursor: Cursor = {
    x: -1,
    y: -1,
    startX: -1,
    startY: -1,
    selection: false,
  };

  private _svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _xAxisGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _xAxis!: d3.Axis<Date | d3.NumberValue>;
  private _yAxisGroups: Record<string, d3.Selection<SVGGElement, unknown, null, undefined>> = {};

  private readonly _canvas: HTMLCanvasElement;
  private readonly _ctx: CanvasContext;

  private readonly _uxCanvas: HTMLCanvasElement;
  private readonly _uxCtx: CanvasContext;

  private readonly _tooltip = document.createElement('div');

  private _userXAxisMin: number | Date | core.time | core.Date | undefined;
  private _userXAxisMax: number | Date | core.time | core.Date | undefined;
  private _userYAxes: Record<
    string,
    {
      min: number | Date | core.time | core.Date | undefined;
      max: number | Date | core.time | core.Date | undefined;
    }
  > = {};
  private _computed!: ComputedState;

  constructor() {
    super();

    this._disposer = new Disposer();
    this._config = { table: { cols: [] }, series: [], xAxis: {}, yAxes: {} };

    // main canvas
    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'block';
    this._canvas.style.position = 'absolute';
    this._canvas.style.background = 'transparent';
    this._ctx = new CanvasContext(this._canvas.getContext('2d') as CanvasRenderingContext2D);

    // ux canvas
    this._uxCanvas = document.createElement('canvas');
    this._uxCanvas.style.display = 'block';
    this._uxCanvas.style.position = 'absolute';
    this._uxCanvas.style.background = 'transparent';
    this._uxCtx = new CanvasContext(this._uxCanvas.getContext('2d') as CanvasRenderingContext2D);

    // svg
    this._svg = d3
      .create('svg')
      .style('background', 'transparent')
      .style('position', 'absolute') as d3.Selection<SVGSVGElement, unknown, null, undefined>;

    this._xAxisGroup = this._svg.append('g');

    // tooltip
    this._tooltip.style.position = 'absolute';
    this._tooltip.classList.add('gui-chart-tooltip');

    // mouse events
    this.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return;
      }
      const { left, top } = this._canvas.getBoundingClientRect();
      this._cursor.startX = Math.round(event.pageX - (left + window.scrollX));
      this._cursor.startY = Math.round(event.pageY - (top + window.scrollY));
      this._cursor.selection = true;
    });
    // this.addEventListener('mouseleave', () => this._resetCursor());
    this.addEventListener('dblclick', () => {
      this._resetCursor();
      // reset X configuration
      this._config.xAxis.min = this._userXAxisMin;
      this._config.xAxis.max = this._userXAxisMax;
      // reset Y configuration
      for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
        yAxis.min = this._userYAxes[name].min;
        yAxis.max = this._userYAxes[name].max;
      }
      this.compute();
      this.update();
      this.dispatchEvent(new GuiChartResetSelectionEvent());
    });

    let lastTouch = Date.now();
    // touch events
    this.addEventListener('touchstart', (event) => {
      // prevents the browser from processing emulated mouse events
      event.preventDefault();

      const now = Date.now();
      if (now - lastTouch < (this._config.dblTapThreshold ?? 500)) {
        this._resetCursor();
        // reset X configuration
        this._config.xAxis.min = this._userXAxisMin;
        this._config.xAxis.max = this._userXAxisMax;
        // reset Y configuration
        for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
          yAxis.min = this._userYAxes[name].min;
          yAxis.max = this._userYAxes[name].max;
        }
        this.compute();
        this.update();
        lastTouch = now;
        return;
      }
      lastTouch = now;

      if (event.touches.length > 0) {
        const { left, top } = this._canvas.getBoundingClientRect();
        this._cursor.startX = Math.round(event.touches[0].pageX - (left + window.scrollX));
        this._cursor.startY = Math.round(event.touches[0].pageY - (top + window.scrollY));
        this._cursor.selection = true;
      }
    });
    this.addEventListener('touchend', (event) => {
      // prevents the browser from processing emulated mouse events
      event.preventDefault();
      if (this._config.selection === false) {
        this._resetCursor();
        return;
      }

      // touch end classic
      if (this._cursor.startX === -1 && this._cursor.startY === -1) {
        this._resetCursor();
        return;
      }

      const threshold = this._config.selection?.threshold ?? 10;
      const dx = Math.abs(this._cursor.x - this._cursor.startX);
      const dy = Math.abs(this._cursor.y - this._cursor.startY);

      if (dx < threshold && dy < threshold) {
        // too small selection, reset cursor
        this._resetCursor();
      } else {
        this._selection(this._config.selection?.orientation);
      }
    });
    this.addEventListener('touchmove', (event) => {
      // prevents the browser from processing emulated mouse events
      event.preventDefault();
      if (event.touches.length > 0) {
        const { left, top } = this._canvas.getBoundingClientRect();
        this._cursor.x = Math.round(event.touches[0].pageX - (left + window.scrollX));
        this._cursor.y = Math.round(event.touches[0].pageY - (top + window.scrollY));
        // this._updateUX();
      }
    });
    this.addEventListener('touchcancel', () => {
      this._resetCursor();
    });

    this.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        throttle((event: WheelEvent) => {
          // if this is too slow, maybe cache xRange, yRange
          const { xRange, yRange, xScale: scale, yScales } = this._computed;
          if (event.shiftKey) {
            // x axis panning
            const [min, max] = scale.range();
            const dx =
              (Math.abs(max - min) / (this._config.xAxis.ratio ?? 100)) * (event.deltaY > 0 ? -1 : 1);
            const from = (this._config.xAxis.min = scale.invert(min + dx));
            const to = (this._config.xAxis.max = scale.invert(max + dx));
            this.dispatchEvent(new GuiChartSelectionEvent(from, to));
            this.compute();
            this.update();
          } else if (event.altKey) {
            // y axes panning
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              const [min, max] = scale.range();
              const d = (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? -1 : 1);
              axis.min = scale.invert(min + d);
              axis.max = scale.invert(max + d);
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.x < xRange[0] &&
            this._cursor.y <= yRange[0] &&
            this._cursor.y >= yRange[1]
          ) {
            // left y axes zoom
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              if ((axis.position === undefined || axis.position === 'left') && axis.ratio !== 0) {
                const [min, max] = scale.range();
                const d = (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? 1 : -1);
                axis.min = scale.invert(min + d);
                axis.max = scale.invert(max - d);
              }
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.x > xRange[1] &&
            this._cursor.y <= yRange[0] &&
            this._cursor.y >= yRange[1]
          ) {
            // right y axes zoom
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              if (axis.position === 'right' && axis.ratio !== 0) {
                const [min, max] = scale.range();
                const d = (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? 1 : -1);
                axis.min = scale.invert(min + d);
                axis.max = scale.invert(max - d);
              }
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.y > yRange[0] &&
            this._cursor.x >= xRange[0] &&
            this._cursor.x <= xRange[1]
          ) {
            if (this._config.xAxis.ratio !== 0) {
              // x axis zoom
              const [min, max] = scale.range();
              const d =
                (Math.abs(max - min) / (this._config.xAxis.ratio ?? 100)) *
                (event.deltaY > 0 ? 1 : -1);
              const from = (this._config.xAxis.min = scale.invert(min - d));
              const to = (this._config.xAxis.max = scale.invert(max + d));
              this.dispatchEvent(new GuiChartSelectionEvent(from, to));
              this.compute();
              this.update();
            }
          }
        }, 16)(event);
      },
    );
  }

  connectedCallback() {
    this._colors = getColors(this);

    const style = getComputedStyle(this);
    if (style.display === 'inline') {
      // makes sure the WebComponent is properly displayed as 'block' unless overridden by something else
      this.style.display = 'block';
    }
    this.style.position = 'relative';

    this.append(this._svg.node() as SVGSVGElement, this._canvas, this._uxCanvas, this._tooltip);

    // trigger a resize before the observer to prevent resize-flickering on mount
    this._resize();

    document.addEventListener(
      'mouseup',
      (event) => {
        if (event.button !== 0 || this._config.selection === false) {
          return;
        }

        const threshold = this._config.selection?.threshold ?? 10;
        const dx = Math.abs(this._cursor.x - this._cursor.startX);
        const dy = Math.abs(this._cursor.y - this._cursor.startY);

        const orientation = this._config.selection?.orientation ?? 'horizontal';
        switch (orientation) {
          case 'both':
            if (
              this._cursor.startX === -1 ||
              this._cursor.x === -1 ||
              this._cursor.startY === -1 ||
              this._cursor.y === -1 ||
              (dx < threshold && dy < threshold)
            ) {
              this._resetCursor();
              return;
            }
            break;
          case 'horizontal':
            if (this._cursor.startX === -1 || this._cursor.x === -1 || dx < threshold) {
              this._resetCursor();
              return;
            }
            break;
          case 'vertical':
            if (this._cursor.startY === -1 || this._cursor.y === -1 || dy < threshold) {
              this._resetCursor();
              return;
            }
            break;
        }

        this._selection(this._config.selection?.orientation);
      },
      { signal: this._disposer.signal },
    );
    document.addEventListener(
      'mousemove',
      (event) => {
        const { left, top } = this._canvas.getBoundingClientRect();
        this._cursor.x = Math.round(event.pageX - (left + window.scrollX));
        this._cursor.y = Math.round(event.pageY - (top + window.scrollY));
        // this._updateUX();
      },
      { signal: this._disposer.signal },
    );

    const obs = new ResizeObserver(debounce(() => this._resize(), 50));
    this._disposer.disposables.push(() => obs.disconnect());
    obs.observe(this);

    const animRef = { id: -1 };
    const animationCallback = () => {
      this._updateUX();
      animRef.id = window.requestAnimationFrame(animationCallback);
    };
    animRef.id = window.requestAnimationFrame(animationCallback);
    this._disposer.disposables.push(() => window.cancelAnimationFrame(animRef.id));
  }

  /**
   * Resizes the internal elements and re-renders (this is automatically called by a `ResizeObserver`)
   */
  private _resize() {
    const { width, height } = this.getBoundingClientRect();

    // resize main canvas
    this._canvas.width = width;
    this._canvas.height = height;
    // resize ux canvas
    this._uxCanvas.width = width;
    this._uxCanvas.height = height;
    // resize svg
    this._svg.attr('viewBox', `0 0 ${this._canvas.width} ${this._canvas.height}`);
    // recompute state
    this.compute();

    this.update();
  }

  disconnectedCallback() {
    this.replaceChildren(); // cleanup
    this._disposer.dispose();
  }

  private _resetCursor() {
    this._cursor.x = -1;
    this._cursor.y = -1;
    this._cursor.startX = -1;
    this._cursor.startY = -1;
    this._cursor.selection = false;
  }

  /**
   * A type-safe equivalent to `set config(config)`
   */
  setConfig<K>(config: ChartConfig<K>): void {
    this.config = config;
  }

  set config(config: ChartConfig) {
    this._config = config;
    // update local user X min/max with the configuration values
    this._userXAxisMin = config.xAxis.min;
    this._userXAxisMax = config.xAxis.max;
    // update local user Y min/max with configuration values
    this._userYAxes = {};
    for (const [name, yAxis] of Object.entries(config.yAxes)) {
      this._userYAxes[name] = { min: yAxis.min, max: yAxis.max };
    }
    this.compute();
    this.update();
  }

  get config(): ChartConfig {
    return this._config;
  }

  /**
   * This is all about cursor interactions.
   *
   * This needs to be light as it is rendered every single possible frame (leveraging `requestAnimationFrame`)
   */
  private _updateUX() {
    this._clearUX();

    // XXX later optim: we could split compute even more to prevent computing the scales and margins and styles if the cursor is not in range
    const { xRange, yRange, rightAxes, style, xScale, yScales } = this._computed;

    const updateUX =
      this._cursor.x !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.x >= xRange[0] &&
      this._cursor.x <= xRange[1] &&
      this._cursor.y >= yRange[1] &&
      this._cursor.y <= yRange[0];

    const updateSelection =
      this._cursor.x !== -1 &&
      this._cursor.startX !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.startY !== -1;

    if (updateUX) {
      // make tooltip visible and located properly
      this.appendChild(this._tooltip);
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
        this._uxCtx.simpleLine(
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
        this._uxCtx.simpleLine(this._cursor.x, yRange[0], this._cursor.x, yRange[1], {
          color: style.cursor.lineColor,
          dashed: true,
        });
        // cursor cross
        this._uxCtx.cross(this._cursor.x, this._cursor.y, 12, {
          color: style.cursor.color,
          thickness: 2,
        });

        // bottom axis text
        const xValue = +xScale.invert(this._cursor.x);
        let bottomText = `${xValue}`;
        if (this._config.xAxis.scale === 'time') {
          if (this._config.xAxis.cursorFormat === undefined) {
            bottomText = d3.isoFormat(new Date(xValue));
          } else {
            bottomText = d3.utcFormat(this._config.xAxis.cursorFormat)(new Date(xValue));
          }
        } else {
          if (this._config.xAxis.cursorFormat) {
            bottomText = d3.format(this._config.xAxis.cursorFormat)(xScale.invert(this._cursor.x));
          }
        }
        // TODO clip on boundaries
        this._uxCtx.text(this._cursor.x, yRange[0] + 8, bottomText, {
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
            this._uxCtx.text(
              style.margin.left + leftAxesIdx * style.margin.left - 8,
              this._cursor.y,
              d3.format(yAxis.cursorFormat ?? yAxis.format ?? '.2f')(
                vMap(yScales[yAxisName].invert(this._cursor.y)),
              ),
              {
                color: style.cursor.color,
                backgroundColor: style.cursor.bgColor,
                align: 'end',
                baseline: 'middle',
              },
            );
          } else {
            rightAxesIdx++;
            this._uxCtx.text(
              this._canvas.width - (style.margin.right + rightAxesIdx * style.margin.right) + 8,
              this._cursor.y,
              d3.format(yAxis.cursorFormat ?? yAxis.format ?? '.2f')(
                vMap(yScales[yAxisName].invert(this._cursor.y)),
              ),
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
          hideInTooltip: false,
          ...this._config.series[i],
        };

        const v = +xScale.invert(this._cursor.x);
        const { xValue, rowIdx } = closest(this._config.table, serie.xCol, v);
        const yValue =
          typeof this._config.table.cols[serie.yCol][rowIdx] === 'bigint'
            ? Number(this._config.table.cols[serie.yCol][rowIdx])
            : this._config.table.cols[serie.yCol][rowIdx];
        const x = xScale(vMap(xValue));
        const y = yScales[serie.yAxis](vMap(yValue));
        const w = serie.markerWidth;
        let yValue2;
        if (typeof serie.yCol2 === 'number') {
          yValue2 = this._config.table.cols[serie.yCol2][rowIdx];
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
            this._uxCtx.rectangle(x, y + (yRange[0] - y) / 2, serie.width + 1, yRange[0] - y, {
              color: style['accent-0'],
            });
            break;
        }

        // tooltip
        let color = serie.color;
        if (serie.colorCol) {
          color = serie.colorMapping
            ? serie.colorMapping(this._config.table.cols[serie.colorCol][rowIdx])
            : this._config.table.cols[serie.colorCol][rowIdx];
          if (!color) {
            color = serie.color;
          }
        }
        if (!this._config.tooltip?.render && !serie.hideInTooltip) {
          const nameEl = document.createElement('div');
          nameEl.style.color = color;
          nameEl.textContent = `${serie.title ?? `Col ${serie.yCol}`}:`;
          const valueEl = document.createElement('div');
          valueEl.classList.add('gui-chart-tooltip-value');
          if (
            this._config.tooltip?.position === 'bottom-right' ||
            this._config.tooltip?.position === 'top-right'
          ) {
            valueEl.classList.add('right');
          }
          valueEl.style.color = color;
          valueEl.textContent = d3.format(this._config.yAxes[serie.yAxis].format ?? '')(yValue);
          this._tooltip.append(nameEl, valueEl);

          if (yValue2 !== undefined) {
            const nameEl = document.createElement('div');
            nameEl.style.color = color;
            nameEl.textContent = `${serie.title ?? `Col ${serie.yCol2}`}:`;
            const valueEl = document.createElement('div');
            valueEl.classList.add('gui-chart-tooltip-value');
            if (
              this._config.tooltip?.position === 'bottom-right' ||
              this._config.tooltip?.position === 'top-right'
            ) {
              valueEl.classList.add('right');
            }
            valueEl.style.color = color;
            valueEl.textContent = d3.format(this._config.yAxes[serie.yAxis].format ?? '')(yValue2);
            this._tooltip.append(nameEl, valueEl);
          }
        }
      }

      // ain't gonna be more than a few series, using .map is fine here
      const data: SerieData[] = this._config.series.map((s, i) => {
        const v = +xScale.invert(this._cursor.x); // prefix with '+' to convert `Date`s to `number` and keep `number` unchanged
        const { xValue, rowIdx } = closest(this._config.table, s.xCol, v);

        return {
          color: this._colors[i],
          width: 1,
          markerWidth: 3,
          markerShape: 'circle',
          markerColor: this._config.series[i].color ?? this._colors[i],
          opacity: 1,
          fillOpacity: 0.2,
          yCol2: 'min',
          xValue,
          yValue: this._config.table.cols[s.yCol][rowIdx],
          rowIdx,
          hideInTooltip: false,
          ...s,
        } satisfies SerieData;
      });
      // call tooltip render if defined
      this._config.tooltip?.render?.(data);
      // dispatch event
      this.dispatchEvent(new GuiChartCursorEvent(data));
    }

    if (updateSelection && this._config.selection !== false) {
      const orientation = this._config.selection?.orientation ?? 'horizontal';
      // ensure start/end are bound to the ranges
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

      let startY = this._cursor.startY;
      if (startY > yRange[0]) {
        startY = yRange[0];
      } else if (startY < yRange[1]) {
        startY = yRange[1];
      }
      let endY = this._cursor.y;
      if (endY > yRange[0]) {
        endY = yRange[0];
      } else if (endY < yRange[1]) {
        endY = yRange[1];
      }
      if (startY > endY) {
        const tmp = endY;
        endY = startY;
        startY = tmp;
      }

      if (orientation === 'horizontal') {
        startY = yRange[1];
        endY = yRange[0];
      }

      if (orientation === 'vertical') {
        startX = xRange[0];
        endX = xRange[1];
      }

      const from: number = Math.floor(+xScale.invert(startX));
      const to: number = Math.ceil(+xScale.invert(endX));

      if (this._cursor.selection) {
        // selection in progress
        const w = endX - startX;
        const h = endY - startY;
        this._uxCtx.rectangle(startX + w / 2, startY + h / 2, w, h, {
          fill: style['accent-0'],
          opacity: 0.1,
        });

        const nameEl = document.createElement('div');
        nameEl.style.color = style['text-0'];
        nameEl.textContent = 'Selection:';
        const valueEl = document.createElement('div');
        valueEl.style.color = style['text-0'];
        valueEl.classList.add('gui-chart-tooltip-value');
        if (
          this._config.tooltip?.position === 'bottom-right' ||
          this._config.tooltip?.position === 'top-right'
        ) {
          valueEl.classList.add('right');
        }
        if (this._config.xAxis.scale === 'time') {
          let fromStr: string;
          let toStr: string;
          if (this._config.xAxis.cursorFormat === undefined) {
            fromStr = d3.isoFormat(new Date(from));
            toStr = d3.isoFormat(new Date(to));
          } else {
            fromStr = d3.utcFormat(this._config.xAxis.cursorFormat)(new Date(from));
            toStr = d3.utcFormat(this._config.xAxis.cursorFormat)(new Date(to));
          }
          valueEl.textContent = `${fromStr}, ${toStr}`;
        } else {
          valueEl.textContent = `${from}, ${to}`;
        }

        this._tooltip.append(nameEl, valueEl);
      }
    }
  }

  private _selection(orientation: SelectionOptions['orientation'] | undefined = 'horizontal'): void {
    const { xRange, yRange, xScale, yScales } = this._computed;
    // ensure start/end are bound to the ranges
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

    let startY = this._cursor.startY;
    if (startY > yRange[0]) {
      startY = yRange[0];
    } else if (startY < yRange[1]) {
      startY = yRange[1];
    }
    let endY = this._cursor.y;
    if (endY > yRange[0]) {
      endY = yRange[0];
    } else if (endY < yRange[1]) {
      endY = yRange[1];
    }
    if (startY > endY) {
      const tmp = endY;
      endY = startY;
      startY = tmp;
    }

    if (orientation === 'horizontal') {
      startY = yRange[1];
      endY = yRange[0];
    }

    if (orientation === 'vertical') {
      startX = xRange[0];
      endX = xRange[1];
    }

    const from: number = +xScale.invert(startX);
    const to: number = +xScale.invert(endX);

    // selection is done
    const selectionEvt = new GuiChartSelectionEvent(from, to);

    if (orientation === 'both' || orientation === 'horizontal') {
      // call update to apply zoom
      xScale.domain([from, to]);
      this._config.xAxis.min = from;
      this._config.xAxis.max = to;
    }

    if (orientation === 'both' || orientation === 'vertical') {
      for (const yAxisName in yScales) {
        const yScale = yScales[yAxisName];
        const from: number = Math.floor(+yScale.invert(endY));
        const to: number = Math.ceil(+yScale.invert(startY));
        yScale.domain([from, to]);
        this._config.yAxes[yAxisName].min = from;
        this._config.yAxes[yAxisName].max = to;
      }
    }

    // XXX do we want to dispatch after the animation or not?
    // reset selection
    this._resetCursor();
    this.dispatchEvent(selectionEvt);
    this.compute();
    this.update();
  }

  private _drawMarker(serie: Serie & SerieOptions, x: number, y2: number, w: number, color: Color) {
    switch (serie.markerShape ?? 'circle') {
      case 'circle':
        this._uxCtx.circle(x, y2, w, {
          fill: color,
        });
        break;
      case 'square':
        this._uxCtx.rectangle(x, y2, w, w, {
          fill: color,
        });
        break;
      case 'triangle':
        this._uxCtx.triangle(x, y2, w, w, {
          fill: color,
        });
        break;
    }
  }

  private _clearUX(): void {
    // clear ux canvas
    this._uxCtx.ctx.clearRect(0, 0, this._uxCanvas.width, this._uxCanvas.height);
    // clear tooltip
    this._tooltip.replaceChildren();
    this._tooltip.style.top = '';
    this._tooltip.style.right = '';
    this._tooltip.style.bottom = '';
    this._tooltip.style.left = '';
    this._tooltip.remove();
  }

  /**
   * Draws the chart to the different canvas & svg elements.
   */
  update(): void {
    // clear the main canvas
    this._ctx.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // clear the ux canvas too (to prevent phantom markers)
    this._clearUX();

    const { xScale, yScales, style } = this._computed;

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
        hideInTooltip: false,
        ...this._config.series[i],
      };

      serie.drawBefore?.(this._ctx, serie, xScale, yScales[serie.yAxis]);

      switch (serie.type) {
        case 'line':
          this._ctx.line(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'line+scatter':
          this._ctx.line(this._config.table, serie, xScale, yScales[serie.yAxis]);
          this._ctx.scatter(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'line+area':
          // draw area "under" (before) line
          this._ctx.area(this._config.table, serie, xScale, yScales[serie.yAxis]);
          this._ctx.line(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'area':
          this._ctx.area(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'bar':
          this._ctx.bar(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'scatter':
          this._ctx.scatter(this._config.table, serie, xScale, yScales[serie.yAxis]);
          break;
        case 'custom':
          serie.draw(this._ctx, serie, xScale, yScales[serie.yAxis]);
          break;
      }

      serie.drawAfter?.(this._ctx, serie, xScale, yScales[serie.yAxis]);
    }

    // Add the x-axis.
    this._xAxis = d3.axisBottom(xScale);
    if (this._config.xAxis.hook) {
      this._config.xAxis.hook(this._xAxis);
    } else {
      if (this._config.xAxis.scale === 'time') {
        if (this._config.xAxis.format === undefined) {
          const [from, to] = xScale.range();
          const span = Math.abs(+xScale.invert(to) - +xScale.invert(from));
          const tickFormat = d3.utcFormat(relativeTimeFormat(span));
          (this._xAxis as d3.Axis<Date>).tickFormat(tickFormat);
        } else {
          const format = this._config.xAxis.format;
          this._xAxis.tickFormat((v) => {
            if (typeof v === 'number') {
              return d3.utcFormat(format)(new Date(v));
            }
            return d3.utcFormat(format)(v as Date);
          });
        }
      } else if (this._config.xAxis.format) {
        this._xAxis.tickFormat(d3.format(this._config.xAxis.format));
      }
      if (Array.isArray(this._config.xAxis.ticks)) {
        this._xAxis.tickValues(this._config.xAxis.ticks.map(vMap));
      } else if (typeof this._config.xAxis.ticks === 'function') {
        this._xAxis.ticks(this._config.xAxis.ticks);
      }
    }
    this._xAxisGroup
      .attr('transform', `translate(0,${this._canvas.height - style.margin.bottom})`)
      .call(this._xAxis);

    // Add the y-axes.
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;

    for (const yAxisName in yScales) {
      if (this._yAxisGroups[yAxisName] === undefined) {
        // create a yAxisGroup only if needed
        this._yAxisGroups[yAxisName] = this._svg.append('g');
      }

      const ord = this._config.yAxes[yAxisName];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let yAxis: d3.Axis<any>;
      let translateX: number = 0;

      if (ord.position === undefined || ord.position === 'left') {
        leftAxesIdx++;
        yAxis = d3.axisLeft(yScales[yAxisName]);
        translateX = style.margin.left + leftAxesIdx * style.margin.left;
      } else {
        rightAxesIdx++;
        yAxis = d3.axisRight(yScales[yAxisName]);
        translateX = this._canvas.width - (style.margin.right + rightAxesIdx * style.margin.right);
      }

      if (ord.hook) {
        ord.hook(yAxis);
      } else {
        if (ord.format) {
          if (ord.scale === 'time') {
            yAxis.tickFormat(d3.utcFormat(ord.format));
          } else {
            yAxis.tickFormat(d3.format(ord.format));
          }
        } else {
          if (ord.scale === 'time') {
            const [from, to] = yScales[yAxisName].range();
            const span = Math.abs(
              +yScales[yAxisName].invert(to) - +yScales[yAxisName].invert(from),
            );
            const tickFormat = d3.utcFormat(relativeTimeFormat(span));
            (this._xAxis as d3.Axis<Date>).tickFormat(tickFormat);
          }
        }
        if (Array.isArray(ord.ticks)) {
          yAxis.tickValues(ord.ticks.map(vMap));
        } else if (typeof ord.ticks === 'function') {
          yAxis.ticks(ord.ticks);
        }
      }

      this._yAxisGroups[yAxisName].attr('transform', `translate(${translateX}, 0)`).call(yAxis);
    }

    // remove no longer used yAxisGroup
    for (const yAxisName in this._yAxisGroups) {
      if (yScales[yAxisName] === undefined) {
        this._yAxisGroups[yAxisName].remove();
        delete this._yAxisGroups[yAxisName];
      }
    }
  }

  /**
   * Computes axes min/max bounds, display ranges, styles and scales.
   *
   * This method is potentially heavy has it iterates over the table content.
   * Try to use it only when the table changes or when the component needs to resize.
   */
  compute(): void {
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

    if (this._config.xAxis.min !== undefined) {
      xMin = vMap(this._config.xAxis.min);
    }

    if (this._config.xAxis.max !== undefined) {
      xMax = vMap(this._config.xAxis.max);
    }

    if (xMin === null || xMax === null) {
      // x axis domain is not fully defined, let's iterate over the table to find the boundaries
      for (const serie of this._config.series) {
        if (serie.xCol !== undefined) {
          for (let row = 0; row < this._config.table.cols[serie.xCol].length; row++) {
            const value = vMap(this._config.table.cols[serie.xCol][row]);
            if (value !== null && value !== undefined && !isNaN(value)) {
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
      }
    }

    if (xMin === null) {
      xMin = 0;
    }

    if (xMax === null) {
      xMax = Math.max(0, (this._config.table.cols[0]?.length ?? 0) - 1);
    }

    // TODO handle the case where no yAxes have been defined at all
    const yScales: Record<string, Scale> = {};
    for (const yAxisName in this._config.yAxes) {
      const yAxis = this._config.yAxes[yAxisName];

      const type = yAxis.scale ?? 'linear';
      let min: number | null = null;
      let max: number | null = null;

      if (yAxis.min !== undefined) {
        min = vMap(yAxis.min);
      }

      if (yAxis.max !== undefined) {
        max = vMap(yAxis.max);
      }

      if (min === null || max === null) {
        // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
        for (let i = 0; i < this._config.series.length; i++) {
          const serie = this._config.series[i];
          if (serie.yAxis === yAxisName) {
            for (let row = 0; row < this._config.table.cols[serie.yCol].length; row++) {
              const value = vMap(this._config.table.cols[serie.yCol][row]);
              if (value !== null && value !== undefined && !isNaN(value)) {
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
              // make sure to account for 'yCol2' if used
              if (typeof serie.yCol2 === 'number') {
                const value = vMap(this._config.table.cols[serie.yCol2][row]);
                if (value !== null && value !== undefined && !isNaN(value)) {
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
      }

      switch (type) {
        default:
        case 'linear':
          yScales[yAxisName] = d3
            .scaleLinear()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
        case 'log':
          yScales[yAxisName] = d3
            .scaleLog()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
        case 'time':
          yScales[yAxisName] = d3
            .scaleTime()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
      }
    }

    const xAxis = this._config.xAxis;
    let xScale: Scale;
    if (xAxis.scale === 'log') {
      xScale = d3.scaleLog().domain([xMin, xMax]).rangeRound(xRange);
    } else if (xAxis.scale === 'time') {
      xScale = d3.scaleTime().domain([xMin, xMax]).rangeRound(xRange);
    } else {
      // default to linear scale
      xScale = d3.scaleLinear().domain([xMin, xMax]).rangeRound(xRange);
    }

    this._computed = { leftAxes, rightAxes, xRange, yRange, style: props, xScale, yScales };
  }
}

const SELECTION_EVENT_TYPE = 'selection';
const CURSOR_EVENT_TYPE = 'cursor';
const RESET_SELECTION_EVENT_TYPE = 'reset-selection';

/**
 * `detail` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 */
export class GuiChartSelectionEvent extends CustomEvent<{ from: unknown; to: unknown }> {
  constructor(from: unknown, to: unknown) {
    super(SELECTION_EVENT_TYPE, { detail: { from, to }, bubbles: true });
  }
}

/**
 * Called when the selection is reset.
 */
export class GuiChartResetSelectionEvent extends CustomEvent<void> {
  constructor() {
    super(RESET_SELECTION_EVENT_TYPE, { bubbles: true });
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
  interface HTMLElementTagNameMap {
    'gui-chart': GuiChart;
  }

  interface HTMLElementEventMap {
    [CURSOR_EVENT_TYPE]: GuiChartCursorEvent;
    [SELECTION_EVENT_TYPE]: GuiChartSelectionEvent;
    [RESET_SELECTION_EVENT_TYPE]: GuiChartResetSelectionEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-chart': Partial<Omit<GuiChart, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-chart')) {
  globalThis.customElements.define('gui-chart', GuiChart);
}
