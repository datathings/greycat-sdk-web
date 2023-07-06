import * as d3 from 'd3';
import { core, util } from '@greycat/lib-std';
import { timeToMs } from '@greycat/utils';
import { emptyDataElement, getColors, processCssVars } from '../../utils';
import { BoxPlotCanvas, BoxPlotOptions, Canvas, SimpleTooltip } from '../../chart-utils';
import { getCSSVars } from '../../utils';
import { getGlobalDateTimeFormat, getGlobalNumberFormat } from '../../globals';

const MARGINS = { top: 20, right: 70, bottom: 60, left: 70 };
const DEFAULT_AXIS_LABEL = ['x-Axis', 'y-Axis', 'z-Axis'];
const BOX_SIZE = 10;

export interface BoxPlotChartProps {
  table: core.Table<unknown> | null;
  columns: number[];
  axisLabel: string[];
  dateFmt: Intl.DateTimeFormat | undefined;
  numberFmt: Intl.NumberFormat | undefined;
}

/**
 * Displays a box plot chart based on a given `core.Table`
 */
export class GuiBoxPlotChart extends HTMLElement {
  private _svg?: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _canvas?: Canvas;
  private _xAxis?: d3.ScaleTime<number, number, never> | d3.ScaleBand<string>;
  private _yAxis: d3.ScaleLinear<number, number, never>;
  private _table: core.Table<unknown> | null = null;
  private _axisLabel = DEFAULT_AXIS_LABEL;
  private _resizeObserver?: ResizeObserver;
  private _dateFmt: Intl.DateTimeFormat | undefined;
  private _numberFmt: Intl.NumberFormat | undefined;
  private _width = 0;
  private _height = 0;
  // CSS Vars

  private _boxSize = BOX_SIZE;
  private _hover = false;
  private _cursorInfo?: CursorInfo;
  private _tooltip?: SimpleTooltip;
  private _iqrColorCss = 'black';
  private _whiskerColorCss = 'black';
  private _medianColorCss = 'black';
  private _tooltipDasharrayCss = [4, 4];
  private _colors: string[] = ['black'];
  private _cursor: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    super();

    this._yAxis = d3.scaleLinear();
  }

  get table(): core.Table<unknown> | null {
    return this._table;
  }

  set table(table: core.Table<unknown> | null) {
    this._table = table;
    this.render();
  }

  get axis() {
    return this._axisLabel;
  }
  set axis(axisLabel: string[]) {
    this._axisLabel = axisLabel;
  }
  get dateFmt(): Intl.DateTimeFormat | undefined {
    return this._dateFmt;
  }

  set dateFmt(dateFmt: Intl.DateTimeFormat | undefined) {
    this._dateFmt = dateFmt;
    this.render();
  }

  get numberFmt(): Intl.NumberFormat | undefined {
    return this._numberFmt;
  }

  set numberFmt(numberFmt: Intl.NumberFormat | undefined) {
    this._numberFmt = numberFmt;
    this.render();
  }

  setAttrs({
    table = this._table,
    axisLabel = this._axisLabel,
    dateFmt = this._dateFmt,
    numberFmt = this._numberFmt,
  }: Partial<BoxPlotChartProps>) {
    this._table = table;
    this._axisLabel = axisLabel;
    this._dateFmt = dateFmt;
    this._numberFmt = numberFmt;
    this.render();
  }

  connectedCallback() {
    this.style.position = 'relative';
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';

    const cssVars = getCSSVars(
      this,
      'boxplot-iqr-color',
      'boxplot-whisker-color',
      'boxplot-median-color',
      'boxplot-tooltip-dasharray',
    );

    /** Process the CSS vars */
    processCssVars(this, cssVars);

    this._resizeObserver = new ResizeObserver(() => this._initialize());
    this._resizeObserver.observe(this);
  }

  private _initialize() {
    this.innerHTML = '';
    this._canvas?.dispose();
    const { width, height } = this.getBoundingClientRect();
    this._width = width;
    this._height = height;

    this._svg = d3
      .select(this)
      .append('svg')
      .attr('class', 'svg-plot')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .append('g')
      .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

    this._tooltip = new SimpleTooltip();

    const bisector = d3.bisector<number, number>((x) => x);
    const onHover = () => {
      if (!this._hover) {
        // clear hover canvas
        canvas.clearHoverAndHideTooltip();
        // do not re-enqueue
        return;
      }

      const table = this._table;

      if (!table || !this._xAxis) {
        // re-enqueue hover animation
        return requestAnimationFrame(onHover);
      }

      const ctx = canvas.hoverCtx;
      if (!ctx) {
        return;
      }
      ctx.clear();

      const line = table.data.map((point) => {
        return this._handleXAxisValue(table, point[0]);
      });

      // compute cursor infos
      const nearestX = bisector.center(line, this._cursor.x);

      const data = table.data[nearestX];
      const boxPlot = data[1] as util.BoxPlot<number>;
      this._cursorInfo = {
        x: line[nearestX],
        max: boxPlot.max,
        min: boxPlot.min,
        median: boxPlot.percentile50,
        q1: boxPlot.percentile25,
        q3: boxPlot.percentile75,
        xValue: data[0],
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
        // update tooltip
        this._tooltip.updateHeader({
          value: this._cursorInfo.xValue,
        });

        this._tooltip.updateRows([
          {
            key: 'Median',
            value: { value: this._cursorInfo.median },
          },
          {
            key: 'Q1',
            value: { value: this._cursorInfo.q1 },
          },
          {
            key: 'Q3',
            value: { value: this._cursorInfo.q3 },
          },
          {
            key: 'Max',
            value: { value: this._cursorInfo.max },
          },
          {
            key: 'Min',
            value: { value: this._cursorInfo.min },
          },
        ]);

        canvas.moveTooltip(tooltipX, tooltipY);
      }

      return requestAnimationFrame(onHover);
    };

    const canvas = (this._canvas = new Canvas(
      this._width - MARGINS.left - MARGINS.right,
      this._height - MARGINS.top - MARGINS.bottom,
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
    ));

    this._canvas.root.style.top = `${MARGINS.top}px`;
    this._canvas.root.style.left = `${MARGINS.left}px`;
    this._canvas.root.style.position = 'absolute';
    this.appendChild(this._canvas.root);

    this.render();
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._canvas?.dispose();
  }

  render() {
    const canvas = this._canvas;
    const table = this._table;
    const svg = this._svg;

    if (!canvas || !table || !svg) {
      return;
    }

    svg.selectChildren().remove();
    canvas.ctx.clear();

    this.querySelectorAll('.gui-boxplot-incomplete').forEach((n) => n.remove());

    if (table.data.length <= 0) {
      const incompleteTableEl = emptyDataElement('gui-boxplot-incomplete');
      this.appendChild(incompleteTableEl);
      return;
    }

    svg
      .attr('width', this._width)
      .attr('height', this._height)
      .append('g')
      .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

    const width = this._width - MARGINS.left - MARGINS.right;
    const height = this._height - MARGINS.top - MARGINS.bottom;

    canvas.resize(width, height);

    this._handleXAxis(table);
    if (!this._xAxis) {
      return;
    }
    this._xAxis?.range([0, width]);
    this._yAxis.range([height, 0]).nice();

    svg
      .append('text')
      .attr('x', `-${height / 2}`)
      .attr('dy', '-3.5em')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(this._axisLabel[1]);
    svg
      .append('text')
      .attr('x', `${width / 2}`)
      .attr('y', `${height + 40}`)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(this._axisLabel[0]);

    this._boxSize = (width / table.data.length) * 0.7;

    const yDomain = d3.extent(
      table.data.flatMap((v) => {
        return [(v[1] as util.BoxPlot<number>).min, (v[1] as util.BoxPlot<number>).max];
      }),
    );

    const yPadding = ((yDomain[1] ?? 0) - (yDomain[0] ?? 0)) * 0.1;

    this._yAxis.domain([(yDomain[0] ?? 0) - yPadding, (yDomain[1] ?? 1) + yPadding]);
    const yAxis = d3.axisLeft(this._yAxis);

    const xAxis = d3.axisBottom(this._xAxis as d3.AxisScale<Date | string>);

    const boxPlotOptions: BoxPlotOptions = {
      width: this._boxSize,
      iqrColor: this._iqrColorCss,
      whiskerColor: this._whiskerColorCss,
      medianColor: this._medianColorCss,
    };

    const dateFmt = this._dateFmt?.format ?? getGlobalDateTimeFormat().format;
    const numberFmt = this._numberFmt?.format ?? getGlobalNumberFormat().format;
    switch (table.meta[0].type) {
      case core.Date._type:
      case core.time._type: {
        (xAxis as d3.Axis<number | Date>).tickFormat(dateFmt);

        //Handle X ticks based on width
        const maxTicks = Math.floor(this._width / 250);
        const ticks = (this._xAxis as d3.ScaleTime<number, number>).ticks();
        const modulo = Math.floor(ticks.length / maxTicks);

        if (maxTicks < table.data.length) {
          const filteredTicks = ticks.filter((_t, i) => i % modulo === 0);
          (xAxis as d3.Axis<number | Date>).tickValues(filteredTicks);
        } else {
          xAxis.ticks(table.data.length);
        }
        break;
      }
      case 'core.int':
      case 'core.float':
        (xAxis as unknown as d3.Axis<number>).tickFormat(numberFmt);
        break;
      case 'core.String': {
        this._table?.data.length;
        (xAxis as d3.Axis<string>).tickFormat((v) => {
          const maxLength = Math.floor(this._boxSize / 5);
          return v.length > maxLength ? v.substring(0, maxLength) + '...' : v;
        });

        break;
      }
    }

    const xSelection = svg
      .append('g')
      .attr('transform', `translate(0, ${canvas.height})`)
      .call(xAxis);

    svg.append('g').call(yAxis);

    if (table.meta[0].type === 'core.String') {
      xSelection
        .selectAll('.tick')
        .append('title')
        .text((_d) => {
          return `${_d}`;
        });
    }

    (yAxis as d3.Axis<number>).tickFormat(getGlobalNumberFormat().format);

    table.data.forEach((point, idx) => {
      const pt = point[1] as util.BoxPlot<number>;
      const boxPlot: BoxPlotCanvas = {
        max: this._yAxis(pt.max),
        median: this._yAxis(pt.percentile50),
        min: this._yAxis(pt.min),
        q1: this._yAxis(pt.percentile25),
        q3: this._yAxis(pt.percentile75),
        x: this._handleXAxisValue(table, point[0]),
      };
      if (table.meta[0].type === 'core.String') {
        const color = this._colors[idx % this._colors.length];
        boxPlotOptions.whiskerColor = color;
        boxPlotOptions.medianColor = color;
        boxPlotOptions.iqrColor = color;
      }

      canvas.ctx.boxPlot(boxPlot, boxPlotOptions);
    });
  }

  private _handleXAxis(table: core.Table<unknown>) {
    if (table.meta[0].type === core.Date._type) {
      this._xAxis = d3.scaleTime();
      const domain = [
        new Date(table.meta[0].min.iso).getTime(),
        new Date(table.meta[0].max.iso).getTime(),
      ];
      const xPadding = (domain[1] - domain[0]) * 0.1;
      this._xAxis.domain([domain[0] - xPadding, domain[1] + xPadding]);
    } else if (table.meta[0].type === core.time._type) {
      this._xAxis = d3.scaleTime();
      const domain = [timeToMs(table.meta[0].min), timeToMs(table.meta[0].max)];
      const xPadding = (domain[1] - domain[0]) * 0.1;
      this._xAxis.domain([domain[0] - xPadding, domain[1] + xPadding]);
    } else if (table.meta[0].type === 'core.String') {
      this._xAxis = d3.scaleBand();
      this._xAxis.domain(table.data.map((i) => i[0] as string));
      this._colors = getColors(this);
    }
  }

  private _handleXAxisValue(table: core.Table<unknown>, val: unknown): number {
    if (this._xAxis) {
      if (table.meta[0].type === core.Date._type) {
        return (this._xAxis as d3.ScaleTime<number, number>)(new Date((val as core.Date).iso));
      } else if (table.meta[0].type === core.time._type) {
        return (this._xAxis as d3.ScaleTime<number, number>)(timeToMs(val as core.time));
      } else if (table.meta[0].type === 'core.String') {
        return (
          ((this._xAxis as d3.ScaleBand<string>)(val as string) ?? 0) +
          (this._xAxis as d3.ScaleBand<string>)?.bandwidth() / 2
        );
      }
    }
    return 0;
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
  xValue: unknown;
}

declare global {
  interface Window {
    /**
     * @deprecated use `GuiBoxPlotChart` instead
     */
    BoxPlot: typeof GuiBoxPlotChart;
    GuiBoxPlotChart: typeof GuiBoxPlotChart;
  }

  interface HTMLElementTagNameMap {
    'gui-boxplot-chart': GuiBoxPlotChart;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-boxplot-chart': any;
    }
  }
}

if (!window.customElements.get('gui-boxplot-chart')) {
  window.BoxPlot = GuiBoxPlotChart;
  window.GuiBoxPlotChart = GuiBoxPlotChart;
  window.customElements.define('gui-boxplot-chart', GuiBoxPlotChart);
}
