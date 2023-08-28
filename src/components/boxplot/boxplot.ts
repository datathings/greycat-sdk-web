import * as d3 from 'd3';
import { util } from '@greycat/sdk';
import { getCSSVars, processCssVars } from '../../utils.js';
import { BoxPlotCanvas, BoxPlotOptions, Canvas, SimpleTooltip } from '../../chart-utils/index.js';

const MARGINS = { top: 20, right: 5, bottom: 60, left: 70 };
const DEFAULT_AXIS_LABEL = ['x-Axis', 'y-Axis', 'z-Axis'];
const DEFAULT_SIZE = { height: 100, width: 100 };
const BOX_SIZE = 10;

// const checkTableDateTime = (table: core.Table table.meta[0].type === core.Date._type || table.meta[0].type === core.time._type;

export interface BoxPlotProps {
  boxPlot: util.BoxPlotFloat | null;
  columns: number[];
  axisLabel: string[];
  xAxisFormat: (v: unknown) => string;
  numberFormatter: (v: number) => string;
}

/**
 * Displays a box plot chart based on a given `core.Table`
 */
export class GuiBoxPlot extends HTMLElement {
  private _svg?: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _canvas?: Canvas;
  private _container?: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private _xAxis: d3.ScaleTime<number, number, never>;
  private _yAxis: d3.ScaleLinear<number, number, never>;
  private _boxPlot: util.BoxPlotFloat | null = null;
  private _outerWidth: number = DEFAULT_SIZE.height;
  private _outerHeight: number = DEFAULT_SIZE.width;
  private _axisLabel = DEFAULT_AXIS_LABEL;
  private _resizeObserver?: ResizeObserver;
  private _xAxisFormat?: (d: unknown) => string;
  private _numberFormatter: (v: number) => string;

  // CSS Vars
  private _tooltipDasharrayCss = [4, 4];

  private _boxSize = BOX_SIZE;
  private _hover = false;
  private _cursorInfo?: CursorInfo;
  private _tooltip?: SimpleTooltip;
  private _iqrColor = 'black';
  private _whiskerColor = 'black';
  private _medianColor = 'black';
  private _cursor: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    super();

    this._xAxis = d3.scaleTime();
    this._yAxis = d3.scaleLinear();
    this._numberFormatter = (v) => v.toString();
  }

  get boxPlot(): util.BoxPlotFloat | null {
    return this._boxPlot;
  }

  set boxPlot(boxPlot: util.BoxPlotFloat | null) {
    this._boxPlot = boxPlot;
    this.render();
  }

  get axis() {
    return this._axisLabel;
  }
  set axis(axisLabel: string[]) {
    this._axisLabel = axisLabel;
  }

  get xAxisFormat() {
    return this._xAxisFormat;
  }
  set xAxisFormat(cb: ((d: unknown) => string) | undefined) {
    this._xAxisFormat = cb;
  }
  get numberFormatter() {
    return this._numberFormatter;
  }
  set numberFormatter(cb: (d: number) => string) {
    this._numberFormatter = cb;
  }

  setAttrs({
    boxPlot = this._boxPlot,
    xAxisFormat = this._xAxisFormat,
    numberFormatter = this._numberFormatter,
    axisLabel = this._axisLabel,
  }: Partial<BoxPlotProps>) {
    this._boxPlot = boxPlot;
    this._xAxisFormat = xAxisFormat;
    this._numberFormatter = numberFormatter;
    this._axisLabel = axisLabel;
    this.render();
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    this.style.position = 'relative';

    const cssVars = getCSSVars(
      this,
      'boxplot-iqr-color',
      'boxplot-whisker-color',
      'boxplot-median-color',
      'boxplot-tooltip-dasharray',
    );

    /** Process the CSS vars */
    processCssVars(this, cssVars);

    this._resizeObserver = new ResizeObserver((e) => this._handleResize(e));

    this.appendChild(container);
    this._container = d3.select(container);
    this._resizeObserver.observe(container);
    this._outerWidth = this._container.node()?.clientWidth ?? DEFAULT_SIZE.width;
    this._outerHeight = this._container.node()?.clientHeight ?? DEFAULT_SIZE.height;

    this._svg = this._container
      .append('svg:svg')
      .attr('class', 'svg-plot')
      .style('position', 'absolute')
      .append('g')
      .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

    this._tooltip = new SimpleTooltip();

    const bisector = d3.bisector<number, number>((x) => x);
    const onHover = () => {
      if (!this._hover) {
        // clear hover context
        this._canvas?.hoverCtx?.clear();
        // do not re-enqueue updates
        return;
      }

      const boxPlot = this._boxPlot;
      const canvas = this._canvas;
      if (!boxPlot || !canvas) {
        return requestAnimationFrame(onHover);
      }
      const ctx = canvas.hoverCtx;
      if (!ctx) {
        return;
      }
      ctx.clear();

      // We assume that it is only one box plot
      const line = [0.5];

      // compute cursor infos
      const nearestX = bisector.center(line, this._cursor.x);
      const xValue = this._xAxis.invert(nearestX);

      // const data = boxPlot[nearestX];
      this._cursorInfo = {
        x: line[nearestX],
        max: boxPlot.max,
        min: boxPlot.min,
        median: boxPlot.percentile50,
        q1: boxPlot.percentile25,
        q3: boxPlot.percentile75,
        time: xValue,
      };
      // x line
      const tooltipX = this._cursor.x;
      const tooltipY = ctx.height < this._cursor.y ? ctx.height : this._cursor.y;
      ctx.ctx.save();
      const x = Math.round(this._cursorInfo.x);
      ctx.line(
        [
          { x, y: 0 },
          { x, y: ctx.height },
        ],
        {
          color: 'gray',
          width: 1,
          dashed: this._tooltipDasharrayCss,
        },
      );
      ctx.ctx.restore();

      if (this._tooltip) {
        this._tooltip.updateRows([
          {
            key: 'Median',
            value: { value: this._numberFormatter(this._cursorInfo.median), raw: true },
          },
          {
            key: 'Q1',
            value: { value: this._numberFormatter(this._cursorInfo.q1), raw: true },
          },
          {
            key: 'Q3',
            value: { value: this._numberFormatter(this._cursorInfo.q3), raw: true },
          },
          {
            key: 'Max',
            value: { value: this._numberFormatter(this._cursorInfo.max), raw: true },
          },
          {
            key: 'Min',
            value: { value: this._numberFormatter(this._cursorInfo.min), raw: true },
          },
        ]);

        canvas.moveTooltip(tooltipX, tooltipY);
      }

      return requestAnimationFrame(onHover);
    };

    this._canvas = new Canvas(
      this._outerWidth - MARGINS.left - MARGINS.right,
      this._outerHeight - MARGINS.top - MARGINS.bottom,
      this._tooltip,
      {
        enter: () => {
          this._hover = true;
          requestAnimationFrame(onHover);
        },
        move: (cursor) => {
          this._cursor = cursor;
        },
        leave: () => {
          this._hover = false;
        },
      },
    );

    this._canvas.root.style.top = `${MARGINS.top}px`;
    this._canvas.root.style.left = `${MARGINS.left}px`;
    this._canvas.root.style.position = 'absolute';
    this.appendChild(this._canvas.root);

    this.render();
  }

  disconnectedCallback() {
    const node = this._container?.node();
    if (node) {
      this._resizeObserver?.unobserve(node);
    }
    this._canvas?.dispose();
  }

  private _handleResize(event: ResizeObserverEntry[]) {
    this._outerHeight = event[0].contentRect.height;
    this._outerWidth = event[0].contentRect.width;
    this.render();
  }

  private _drawChart(canvas: Canvas) {
    this._container?.selectAll('g').remove();
    this._svg = this._container
      ?.select('svg')
      .attr('width', this._outerWidth)
      .attr('height', this._outerHeight)
      .append('g')
      .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

    const width = this._outerWidth - MARGINS.left - MARGINS.right;
    const height = this._outerHeight - MARGINS.top - MARGINS.bottom;
    canvas.resize(width, height);

    this._yAxis.range([height, 0]).nice();
    this._svg
      ?.append('text')
      .attr('x', `${-(height / 2)}`)
      .attr('dy', '-3.5em')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(this._axisLabel[1]);

    // This is an arbitrary value, to not take the full width
    this._boxSize = width - 100;
  }

  render() {
    const canvas = this._canvas;
    const boxPlot = this._boxPlot;
    if (!canvas || !boxPlot) {
      return;
    }

    this._drawChart(canvas);
    const yDomain = [boxPlot.min, boxPlot.max];

    // Only construct xDomain if we have a valid Date or core.time value for the meta[0]
    const xDomain = [0, 1];

    canvas.ctx.clear();

    const xPadding = (xDomain[1] - xDomain[0]) * 0.1;
    const yPadding = ((yDomain[1] ?? 0) - (yDomain[0] ?? 0)) * 0.1;
    this._xAxis.domain([xDomain[0] - xPadding, xDomain[1] + xPadding]);

    this._yAxis.domain([(yDomain[0] ?? 0) - yPadding, (yDomain[1] ?? 1) + yPadding]);
    const yAxis = d3.axisLeft(this._yAxis);

    const boxPlotOptions: BoxPlotOptions = {
      width: this._boxSize,
      iqrColor: this._iqrColor,
      whiskerColor: this._whiskerColor,
      medianColor: this._medianColor,
    };

    // Only draw the xAxis if the type of the boxplot is core.time or core.date
    const width = this._outerWidth - MARGINS.left - MARGINS.right;
    this._svg?.append('g').call(yAxis);
    const pt = boxPlot;
    const boxPlotCanvas: BoxPlotCanvas = {
      max: this._yAxis(pt.max),
      median: this._yAxis(pt.percentile50),
      min: this._yAxis(pt.min),
      q1: this._yAxis(pt.percentile25),
      q3: this._yAxis(pt.percentile75),
      x: this._xAxis(width / 2),
    };
    canvas.ctx.boxPlot(boxPlotCanvas, boxPlotOptions);
  }
}

interface CursorInfo {
  /**
   * `x` position in pixel in the canvas
   */
  x: number;
  /**
   * Info
   */
  median: number;
  q1: number;
  q3: number;
  min: number;
  max: number;
  time: Date;
}

declare global {
  interface Window {
    GuiBoxPlot: typeof GuiBoxPlot;
  }

  interface HTMLElementTagNameMap {
    'gui-boxplot': GuiBoxPlot;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-boxplot': any;
    }
  }
}

if (!window.customElements.get('gui-boxplot')) {
  window.GuiBoxPlot = GuiBoxPlot;
  window.customElements.define('gui-boxplot', GuiBoxPlot);
}
