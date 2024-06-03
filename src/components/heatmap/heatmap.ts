import * as d3 from 'd3';

import { debounce } from '../../internals.js';
import { getColors } from '../../utils.js';
import { CanvasContext } from '../chart/ctx.js';
import { Cursor } from '../chart/types.js';
import { Disposer, TableLike, TableLikeColumnBased, toColumnBasedTable } from '../common.js';
import { HeatmapConfig, HeatmapData, HeatmapStyle } from './types.js';
import './tooltip.js';

type ColorYScale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleLogarithmic<number, number, never>;

type ComputedState = {
  xRange: number[];
  yRange: number[];
  style: HeatmapStyle;
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleBand<string>;
  colorScale: d3.ScaleSequential<string, string>;
  colorYScale: ColorYScale;
  colorXScale: d3.ScaleBand<string>;
  colorScaleXRange: number[];
  xLabels: string[];
  yLabels: string[];
};

export class GuiHeatmap extends HTMLElement {
  private _disposer: Disposer;
  private _table: TableLikeColumnBased;
  private _config: HeatmapConfig;
  private _colors: string[] = [];
  private _cursor: Cursor = {
    x: -1,
    y: -1,
    startX: -1,
    startY: -1,
    selection: false,
  };

  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _yAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _colorScaleYAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _xAxis!: d3.Axis<string>;
  private _yAxis!: d3.Axis<string>;
  private _colorScaleYAxis!: d3.Axis<d3.NumberValue>;

  private readonly _canvas: HTMLCanvasElement;
  private readonly _ctx: CanvasContext;

  private readonly _uxCanvas: HTMLCanvasElement;
  private readonly _uxCtx: CanvasContext;

  private readonly _tooltip = document.createElement('gui-heatmap-tooltip');

  private _computed: ComputedState | undefined;

  constructor() {
    super();

    this._disposer = new Disposer();
    this._table = {};
    this._config = { table: {}, xAxis: {}, yAxis: {} };

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
    this._yAxisGroup = this._svg.append('g');
    this._colorScaleYAxisGroup = this._svg.append('g');

    // tooltip
    this._tooltip.style.position = 'absolute';

    this.addEventListener('touchmove', (event) => {
      // prevents the browser from processing emulated mouse events
      event.preventDefault();
      if (event.touches.length > 0) {
        const { left, top } = this._canvas.getBoundingClientRect();
        this._cursor.x = Math.round(event.touches[0].pageX - (left + window.scrollX));
        this._cursor.y = Math.round(event.touches[0].pageY - (top + window.scrollY));
        this._updateUX();
      }
    });
    this.addEventListener('touchcancel', () => {
      this._resetCursor();
    });
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
      'mousemove',
      (event) => {
        const { left, top } = this._canvas.getBoundingClientRect();
        const x = Math.round(event.pageX - (left + window.scrollX));
        const y = Math.round(event.pageY - (top + window.scrollY));
        if (this._cursor.x !== x || this._cursor.y !== y) {
          this._cursor.x = x;
          this._cursor.y = y;
          this._updateUX();
        }
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
    if (width === 0 || height === 0) {
      // do not even try to render if 0-sized
      return;
    }

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
  setConfig(config: HeatmapConfig): void {
    this.config = config;
  }

  set config(config: HeatmapConfig) {
    this._config = config;
    if (config.table) {
      this._table = toColumnBasedTable(config.table);
    }
    this.compute();
    this.update();
  }

  get config(): HeatmapConfig {
    return this._config;
  }

  set value(table: TableLike) {
    this._table = toColumnBasedTable(table);
    this.compute();
    this.update();
  }

  get value(): TableLike | undefined {
    return this._table;
  }

  setAttrs({
    config = this._config,
    value = this._table,
  }: Partial<{
    config: HeatmapConfig;
    value: TableLike;
  }>) {
    this._table = config.table
      ? toColumnBasedTable(config.table)
      : value
      ? toColumnBasedTable(value)
      : {};
    this._config = config;
    this.compute();
    this.update();
  }

  /**
   * This is all about cursor interactions.
   *
   * This needs to be light as it is rendered every single possible frame (leveraging `requestAnimationFrame`)
   */
  private _updateUX() {
    if (!this._computed || !this._table || !this._table.cols) {
      return;
    }
    this._clearUX();

    const { xRange, yRange, style, xScale, yScale, xLabels, yLabels, colorScale } = this._computed;

    const [xMin, xMax] = xScale.range();
    const [yMin, yMax] = yScale.range();

    const paddingX =
      (xMax - xMin - (xScale.step() * (xScale.domain().length - 1) + xScale.bandwidth())) / 2;

    const paddingY =
      (yMax - yMin - (yScale.step() * (yScale.domain().length - 1) + yScale.bandwidth())) / 2;

    const updateUX =
      this._cursor.x !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.x >= xRange[0] + paddingX &&
      this._cursor.x <= xRange[1] - paddingX &&
      this._cursor.y >= yRange[1] + paddingY &&
      this._cursor.y <= yRange[0] - paddingY;

    if (updateUX) {
      // highlight the hovered cell
      const colIndex = Math.floor((this._cursor.x - style.margin.right - paddingX) / xScale.step());
      const rowIndex = Math.floor((yRange[0] - this._cursor.y - paddingY) / yScale.step());

      // make it pixel-perfect with Math.round
      const x = Math.round(xScale(xLabels[colIndex])!) + 1;
      const y = Math.round(yScale(yLabels[rowIndex])!);
      const w = Math.round(xScale.bandwidth());
      const h = Math.round(yScale.bandwidth());

      // we need to give a clone of the cursor because we don't want users to mutate our own version of it
      const cursor: Cursor = { ...this._cursor };
      // call tooltip render if defined
      const data: HeatmapData = {
        value: this._table.cols[colIndex]?.[rowIndex] as number,
        xValue: xLabels[colIndex],
        yValue: yLabels[rowIndex],
        title: this.config.colorScale?.title,
        xTitle: this.config.xAxis.title,
        yTitle: this.config.yAxis.title,
      };

      if (this._config.tooltip?.render) {
        // delegate all tooltip related work to the render method
        this._config.tooltip.render(data, cursor);
      } else {
        // make tooltip visible
        this._tooltip.style.visibility = 'visible';

        // position the tooltip properly
        switch (this._config.tooltip?.position ?? 'follow') {
          case 'in-place': {
            this._tooltip.style.left = `${x}px`;
            this._tooltip.style.top = `${y}px`;
            this._tooltip.style.width = `${w}px`;
            this._tooltip.style.height = `${h}px`;
            break;
          }
          case 'follow': {
            this._uxCtx.ctx.strokeStyle = this._config.markerColor ?? style['accent-0'];
            this._uxCtx.ctx.strokeRect(x, y, w, h);

            let tooltipX = this._cursor.x - 70;
            let tooltipY = this._cursor.y - 80;
            if (tooltipX < xRange[0]) {
              tooltipX = this._cursor.x + 50;
            }
            if (tooltipY < yRange[1]) {
              tooltipY = this._cursor.y + 50;
            }
            this._tooltip.style.left = `${tooltipX}px`;
            this._tooltip.style.top = `${tooltipY}px`;
            this._tooltip.style.width = '';
            this._tooltip.style.height = '';
            break;
          }
        }

        // update the tooltip content
        this._tooltip.update(this._config, data, colorScale, style);
      }

      this.dispatchEvent(new HeatmapCursorEvent(data, cursor));
    }
  }

  private _clearUX(): void {
    // clear ux canvas
    this._uxCtx.ctx.clearRect(0, 0, this._uxCanvas.width, this._uxCanvas.height);
    // hide tooltip
    this._tooltip.style.visibility = 'hidden';
  }

  /**
   * Draws the chart to the different canvas & svg elements.
   */
  update(): void {
    if (!this._computed) {
      return;
    }
    // clear the main canvas
    this._ctx.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // clear the ux canvas too (to prevent phantom markers)
    this._clearUX();

    const { xScale, yScale, style, colorScale, colorXScale, colorYScale, xLabels, yLabels } =
      this._computed;

    // Draw the heatmap
    for (let col = 0; col < (this._table.cols?.length ?? 0); col++) {
      for (let row = 0; row < (this._table.cols?.[col]?.length ?? 0); row++) {
        const value = this._table.cols?.[col]?.[row];

        if (!isNaN(Number(value))) {
          const color = colorScale(Number(value));
          // make it pixel-perfect with Math.round
          const x = Math.round(xScale(xLabels[col])!) + 1;
          const y = Math.round(yScale(yLabels[row])!);
          const w = Math.round(xScale.bandwidth());
          const h = Math.round(yScale.bandwidth());
          xScale.bandwidth(), yScale.bandwidth();
          this._ctx.ctx.fillStyle = color;
          this._ctx.ctx.fillRect(x, y, w, h);
          if (this.config.displayValue) {
            const rgbValues = color.match(/\d+/g)?.map(Number);
            if (!rgbValues) return;
            // Destructure RGB values
            const [r, g, b] = rgbValues;

            // Calculate relative luminance
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

            let textColor = 'white';
            if (luminance > 0.5) {
              textColor = 'black';
            }
            this._ctx.text(x + xScale.bandwidth() / 2, y + yScale.bandwidth() / 2, `${value}`, {
              color: textColor,
              align: 'center',
              baseline: 'top',
              font: '10px',
            });
          }
        }
      }
    }

    // Draw the color scale
    this._ctx.ctx.beginPath();
    const [minColorScale, maxColorScale] = colorYScale.domain();
    const colorScapeTop = colorYScale(minColorScale) - colorYScale(maxColorScale);
    const colorScaleBottom = colorYScale(maxColorScale);

    const gradient = this._ctx.ctx.createLinearGradient(0, colorScapeTop, 0, colorScaleBottom);
    gradient.addColorStop(0, this._colors[0]);
    for (let index = 1; index < this._colors.length; index++) {
      gradient.addColorStop(index / (this._colors.length - 1), this._colors[index]);
    }
    this._ctx.ctx.fillStyle = gradient;
    this._ctx.ctx.fillRect(
      colorXScale('0') ?? 0,
      colorScaleBottom,
      Math.round(colorXScale.bandwidth()),
      colorScapeTop,
    );

    // Add the x-axis.
    this._xAxis = d3.axisBottom(xScale);

    if (this._config.xAxis.hook) {
      this._config.xAxis.hook(this._xAxis);
    }
    this._xAxisGroup
      .attr('transform', `translate(0,${this._canvas.height - style.margin.bottom})`)
      .call(this._xAxis);

    // Add the y-axis
    this._yAxis = d3.axisLeft(yScale);
    if (this._config.yAxis.hook) {
      this._config.yAxis.hook(this._yAxis);
    }
    this._yAxisGroup.attr('transform', `translate(${style.margin.left},0)`).call(this._yAxis);

    // Add the color scale
    this._colorScaleYAxis = d3.axisLeft(colorYScale);
    if (this._config.colorScale?.format) {
      this._colorScaleYAxis.tickFormat(d3.format(this._config.colorScale.format));
    }
    this._colorScaleYAxisGroup
      .attr('transform', `translate(${this._canvas.width - style.colorScaleMargin.right},0)`)
      .call(this._colorScaleYAxis);
  }

  /**
   * Computes axes min/max bounds, display ranges, styles and scales.
   *
   * This method is potentially heavy has it iterates over the table content.
   * Try to use it only when the table changes or when the component needs to resize.
   */
  compute(): void {
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
        top: this._parseInt(style.getPropertyValue('--m-top')),
        right: this._parseInt(style.getPropertyValue('--m-right')),
        bottom: this._parseInt(style.getPropertyValue('--m-bottom')),
        left: this._parseInt(style.getPropertyValue('--m-left')),
      },
      colorScaleMargin: {
        right: this._parseInt(style.getPropertyValue('--color-scale-m-right')),
      },
    };

    let colorScaleMin: number | null = null;
    let colorScaleMax: number | null = null;

    if (this._config.colorScale) {
      if (this._config.colorScale.colors && this._config.colorScale.colors.length > 1) {
        this._colors = this._config.colorScale.colors;
      } else {
        this._colors = getColors(this).slice(0, 2);
      }

      if (this._config.colorScale.range !== undefined) {
        colorScaleMin = this._config.colorScale.range[0];
        colorScaleMax = this._config.colorScale.range[1];
      }
    }

    // compute ranges based on available width, height and margins
    const xRange = [
      props.margin.left,
      this._canvas.width - props.margin.right - props.colorScaleMargin.right,
    ];
    const yRange = [this._canvas.height - props.margin.bottom, props.margin.top];

    const colorScaleXRange = [
      this._canvas.width - props.colorScaleMargin.right,
      this._canvas.width,
    ];

    if (colorScaleMin === null || colorScaleMax === null) {
      for (let col = 0; col < (this._table.cols?.length ?? 0); col++) {
        for (let row = 0; row < (this._table.cols?.[col]?.length ?? 0); row++) {
          const value = this._table.cols?.[col]?.[row];
          if (typeof value === 'number') {
            if (colorScaleMin === null || value < colorScaleMin) {
              colorScaleMin = value;
            }
            if (colorScaleMax === null || value > colorScaleMax) {
              colorScaleMax = value;
            }
          }
        }
      }
    }

    if (colorScaleMin === null) {
      colorScaleMin = 0;
    }
    if (colorScaleMax === null) {
      colorScaleMax = 1;
    }

    const xLabels = this.config.xAxis.labels ?? [];
    const yLabels = this.config.yAxis.labels ?? [];

    if (xLabels.length === 0) {
      for (let colIdx = 0; colIdx < (this._table.cols?.length ?? 0); colIdx++) {
        xLabels.push(`${colIdx}`);
      }
    }

    if (yLabels.length === 0 && this._table.cols?.[0] !== undefined) {
      for (let rowIdx = 0; rowIdx < this._table.cols?.[0].length; rowIdx++) {
        yLabels.push(`${rowIdx}`);
      }
    }

    const xScale = d3
      .scaleBand()
      .domain(xLabels)
      .rangeRound(xRange)
      .paddingInner(this.config.xAxis.innerPadding ?? 0)
      .paddingOuter(this.config.xAxis.outerPadding ?? 0);
    const yScale = d3
      .scaleBand()
      .domain(yLabels)
      .rangeRound(yRange)
      .paddingInner(this.config.yAxis.innerPadding ?? 0)
      .paddingOuter(this.config.yAxis.outerPadding ?? 0);

    const colorXScale = d3.scaleBand().domain(['0']).range(colorScaleXRange);

    let colorYScale: ColorYScale;
    let colorScale: d3.ScaleSequential<string, string>;

    if (this.config.colorScale?.type === 'log') {
      colorYScale = d3.scaleLog().domain([colorScaleMin, colorScaleMax]).range(yRange);
      colorScale = d3
        .scaleSequentialLog()
        .domain([colorScaleMin, colorScaleMax])
        .range(yRange)
        .interpolator(d3.interpolateRgbBasis(this._colors));
    } else {
      // default to linear scale
      colorYScale = d3.scaleLinear().domain([colorScaleMin, colorScaleMax]).range(yRange);
      colorScale = d3
        .scaleSequential()
        .domain([colorScaleMin, colorScaleMax])
        .range(yRange)
        .interpolator(d3.interpolateRgbBasis(this._colors));
    }

    this._computed = {
      colorScale,
      colorYScale,
      xRange,
      yRange,
      style: props,
      xScale,
      yScale,
      colorScaleXRange,
      colorXScale,
      xLabels,
      yLabels,
    };
  }

  /**
   * `parseInt` that returns `0` when `NaN` is encountered
   */
  private _parseInt(prop: string): number {
    // note: we leverage js weirdness that parses '23px' as 23... for reasons
    // which is convenient here, cause we use this for CSS prop parsing
    const n = parseInt(prop);
    if (isNaN(n)) {
      return 0;
    }
    return isNaN(n) ? 0 : n;
  }
}

/**
 * - `detail.data` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 * - `detail.cursor` contains the current cursor info
 *
 * TODO rename to `GuiHeatmapCursorEvent` in v7
 */
export class HeatmapCursorEvent extends CustomEvent<{ data: HeatmapData; cursor: Cursor }> {
  static readonly NAME = 'heatmap-cursor'; // TODO rename to `gui-heatmap-cursor` in v7

  constructor(data: HeatmapData, cursor: Cursor) {
    super(HeatmapCursorEvent.NAME, { detail: { data, cursor }, bubbles: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-heatmap': GuiHeatmap;
  }

  interface GuiHeatmapEventMap {
    [HeatmapCursorEvent.NAME]: HeatmapCursorEvent;
  }

  interface HTMLElementEventMap extends GuiHeatmapEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-heatmap': GreyCat.Element<GuiHeatmap, GuiHeatmapEventMap>;
    }
  }
}

if (!globalThis.customElements.get('gui-heatmap')) {
  globalThis.customElements.define('gui-heatmap', GuiHeatmap);
}
