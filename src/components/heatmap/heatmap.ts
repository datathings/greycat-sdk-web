import { core } from '@greycat/sdk';
import * as d3 from 'd3';
import { Canvas, RectOptions, SimpleTooltip } from '../../chart-utils/index.js';
import { Disposable } from '../../internals.js';
import { getCSSVars, getHeatmapColors } from '../../utils.js';

const DEFAULT_COLORS = ['red', 'blue'];

enum ScaleType {
  linear,
  log,
}

export interface HeatmapProps {
  table: core.Table | null;
  axisLabels?: string[];
  tooltipLabels?: string[];
  xLabels?: string[];
  yLabels?: string[];
  scaleType?: ScaleType;
  colorScaleRange?: [number, number];
  xTicks?: number;
  yTicks?: number;
}

/**
 * Displays an heatmap chart based on a given `core.Table`
 */
export class GuiHeatmap extends HTMLElement implements HeatmapProps {
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined;
  private _canvas?: Canvas | undefined;
  private _xAxis: d3.ScaleBand<string>;
  private _yAxis: d3.ScaleBand<string>;
  private _axisLabels?: string[];
  private _tooltipLabels?: string[];
  private _table: core.Table | null = null;
  private _width = 0;
  private _height = 0;
  private _colorScale?: d3.ScaleSequential<string, string>;
  private _colorScaleXAxis: d3.ScaleBand<number>;
  private _colorScaleYAxis:
    | d3.ScaleLogarithmic<number, number, never>
    | d3.ScaleLinear<number, number>;
  //private _colorScaleContainer?: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private _colorScaleCanvas?: Canvas | undefined;
  private _colorScaleWidth = 90;
  private _colors: string[] = DEFAULT_COLORS;
  private _nullValueColor?: string;
  private _selectedColor = 'yellow';
  private _xLabels?: string[];
  private _yLabels?: string[];
  private _scaleType?: ScaleType;
  private _colorScaleRange?: [number, number];
  private _tooltip?: SimpleTooltip;
  private _xTicks?: number;
  private _yTicks?: number;
  private readonly _m = { top: 10, right: 10, bottom: 60, left: 120 };
  private readonly _colorScaleM = { top: 10, right: 10, bottom: 60, left: 55 };

  private _disposeResizer: Disposable | undefined;
  private _cursor: { x: number; y: number } = { x: 0, y: 0 };
  private _hover = false;

  constructor() {
    super();

    this._xAxis = d3.scaleBand();
    this._yAxis = d3.scaleBand();
    //Color scale

    this._colorScaleXAxis = d3.scaleBand();
    this._colorScaleYAxis = d3.scaleLinear();
  }

  get table(): core.Table | null {
    return this._table;
  }

  set table(table: core.Table | null) {
    this._table = table;
    this.render();
  }

  get axisLabels() {
    return this._axisLabels;
  }
  set axisLabels(axisLabel: string[] | undefined) {
    this._axisLabels = axisLabel;
  }

  get tooltipLabels() {
    return this._tooltipLabels;
  }
  set tooltipLabels(tooltipLabels: string[] | undefined) {
    this._tooltipLabels = tooltipLabels;
  }

  get xLabels() {
    return this._xLabels;
  }
  set xLabels(labels: string[] | undefined) {
    this._xLabels = labels ? labels : [];
  }

  get yLabels() {
    return this._yLabels;
  }
  set yLabels(labels: string[] | undefined) {
    this._yLabels = labels ? labels : [];
  }

  get yTicks() {
    return this._yTicks;
  }
  set yTicks(val: number | undefined) {
    this._yTicks = val;
  }

  get xTicks() {
    return this._xTicks;
  }
  set xTicks(val: number | undefined) {
    this._xTicks = val;
  }

  get scaleType() {
    return this._scaleType;
  }
  set scaleType(type: ScaleType | undefined) {
    this._scaleType = type;
    this.render();
  }
  get colorScaleRange() {
    return this._colorScaleRange;
  }
  set colorScaleRange(range: [number, number] | undefined) {
    this._colorScaleRange = range;
    this.render();
  }

  setAttrs({
    table = this._table,
    axisLabels = this._axisLabels,
    tooltipLabels = this._tooltipLabels,
    xLabels = this.xLabels,
    yLabels = this.yLabels,
    scaleType = this._scaleType,
    colorScaleRange = this._colorScaleRange,
    xTicks = this._xTicks,
    yTicks = this._yTicks,
  }: Partial<HeatmapProps>) {
    this._table = table;
    this._axisLabels = axisLabels;
    this._tooltipLabels = tooltipLabels;
    this._xLabels = xLabels ? xLabels : [];
    this._yLabels = yLabels ? yLabels : [];
    this._scaleType = scaleType;
    this._colorScaleRange = colorScaleRange;
    this._xTicks = xTicks;
    this._yTicks = yTicks;
    this.render();
  }

  connectedCallback() {
    this.style.position = 'relative';
    const style = getComputedStyle(this);
    if (style.display === 'inline') {
      // makes sure the WebComponent is properly displayed as 'block' unless overridden by something else
      this.style.display = 'block';
    }

    this._colors = getHeatmapColors();

    if (this._colors.length === 0) {
      this._colors = DEFAULT_COLORS;
    }

    const [selectedColor = this._selectedColor, nullValueColor = this._nullValueColor] = getCSSVars(
      this,
      'heatmap-selected-color',
      'heatmap-null-color',
    );
    this._nullValueColor = nullValueColor;
    this._selectedColor = selectedColor;

    const oResize = new ResizeObserver(() => this._initialize());

    oResize.observe(this);
    this._disposeResizer = () => oResize.disconnect();
  }

  disconnectedCallback() {
    this._disposeResizer?.();
    this._canvas?.dispose();
  }

  private _initialize() {
    this.innerHTML = '';
    this._canvas?.dispose();

    const { width, height } = this.getBoundingClientRect();
    this._width = width;
    this._height = height;

    this._svg = d3.select(this).append('svg').attr('width', width).attr('height', height);

    this._tooltip = new SimpleTooltip();

    const onHover = () => {
      if (!this._hover) {
        // clear hover canvas
        canvas.clearHoverAndHideTooltip();
        // do not re-enqueue
        return;
      }
      const table = this._table;

      if (!table) {
        // re-enqueue hover animation
        return requestAnimationFrame(onHover);
      }

      const ctx = canvas.hoverCtx;
      if (!ctx) {
        return;
      }
      ctx.clear();

      // update
      const xIndex = this._scaleBandInvert(this._xAxis)(this._cursor.x);
      const yIndex = this._scaleBandInvert(this._yAxis)(canvas.height - this._cursor.y);

      /*       if (!table.data?.[yIndex[1]]?.[xIndex[1]]) {
        // do not display rect when no value present
        canvas.showTooltip(false);
        return requestAnimationFrame(onHover);
      } */

      canvas.showTooltip(true);

      const rectWidth = this._xAxis.bandwidth();
      const rectHeight = this._yAxis.bandwidth();

      const px = this._xAxis(xIndex[0]);
      const py = this._yAxis(yIndex[0]);
      const opts: RectOptions = {
        color: this._selectedColor,
        width: rectWidth,
        height: rectHeight,
      };
      if (px && py) {
        ctx.rect({ x: px, y: py }, opts);

        if (this._tooltip) {
          this._tooltip.updateRows([
            {
              key: this._tooltipLabels?.[0] ?? this._axisLabels?.[0] ?? 'x',
              value: { value: xIndex[0], raw: true },
            },
            {
              key: this._tooltipLabels?.[1] ?? this._axisLabels?.[1] ?? 'y',
              value: { value: yIndex[0], raw: true },
            },
            {
              key: this._tooltipLabels?.[2] ?? this._axisLabels?.[2] ?? 'z',
              value: {
                value: `${table.cols[xIndex[1]]?.[yIndex[1]]?.toString() ?? ''}`,
                raw: true,
              },
            },
          ]);
          canvas.moveTooltip(
            this._cursor.x,
            ctx.height < this._cursor.y ? ctx.height : this._cursor.y,
          );
        }
      }

      return requestAnimationFrame(onHover);
    };
    const canvas = (this._canvas = new Canvas(
      width - this._m.left - this._m.right - this._colorScaleWidth - this._colorScaleM.right,
      height - this._m.top - this._m.bottom,
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

    this._colorScaleCanvas = new Canvas(
      this._colorScaleWidth - this._colorScaleM.left - this._colorScaleM.right,
      height - this._colorScaleM.top - this._colorScaleM.bottom,
    );
    const canvasLeft = this._m.left;
    const colorScaleLeft = this._canvas.width + canvasLeft + this._colorScaleM.left;

    this._canvas.root.style.top = `${this._m.top}px`;
    this._canvas.root.style.left = `${canvasLeft}px`;
    this._canvas.root.style.position = 'absolute';

    this._colorScaleCanvas.root.style.top = `${this._colorScaleM.top}px`;
    this._colorScaleCanvas.root.style.left = `${colorScaleLeft + 5}px`;
    this._colorScaleCanvas.root.style.position = 'absolute';
    this._colorScaleCanvas.showTooltip(false);
    this.appendChild(this._canvas.root);
    this.appendChild(this._colorScaleCanvas.root);

    this._buildColorScale();

    this.render();
  }

  private _buildColorScale() {
    switch (this._scaleType) {
      case ScaleType.log:
        this._colorScaleYAxis = d3.scaleLog();
        this._colorScale = d3
          .scaleSequentialLog<string>()
          .interpolator(d3.interpolateRgbBasis(this._colors));

        break;
      case ScaleType.linear:
      default:
        this._colorScaleYAxis = d3.scaleLinear();
        this._colorScale = d3
          .scaleSequential<string, string>()
          .interpolator(d3.interpolateRgbBasis(this._colors));

        break;
    }
  }

  render() {
    const canvas = this._canvas;
    if (!canvas) {
      return;
    }

    const ctx = canvas.ctx;
    if (!ctx) {
      return;
    }

    this._cursor;
    ctx.clear();

    const table = this._table;
    if (!table) {
      return;
    }

    const svg = this._svg;
    if (!svg) {
      return;
    }

    const colorScale = this._colorScale;
    if (!colorScale) {
      return;
    }

    svg.selectChildren().remove();

    const newWidth =
      this._width - this._m.left - this._m.right - this._colorScaleWidth - this._colorScaleM.right;
    const newHeight = this._height - this._m.top - this._m.bottom;

    this._xAxis
      .domain(
        this._xLabels ??
        table.cols.map((_, i) => {
          // use column index as xAxis label
          return ` ${i}`;
        }),
      )
      .range([0, newWidth])
      .padding(0.05);

    this._yAxis
      .domain(
        this.yLabels ??
        table.cols[0].map((_v, i) => {
          // use row index as yAxis label
          return `${i}`;
        }),
      )
      .range([newHeight, 0])
      .padding(0.05);

    const extent = d3.extent<number>(
      table.meta.flatMap((v) => {
        return [v.min === 0 ? 1 : v.min as number, v.max as number];
      }),
    );

    this._colorScaleRange = extent[0] !== undefined ? extent : [1, 10];

    this._colorScaleXAxis.domain([0]).range([this._colorScaleWidth, 0]);
    this._colorScaleYAxis.range([newHeight, 0]);
    this._colorScaleYAxis.domain(this._colorScaleRange);
    colorScale?.domain(this._colorScaleRange);

    const xAxis = d3.axisBottom(this._xAxis);
    const yAxis = d3.axisLeft(this._yAxis);
    const yTicks = this._yTicks;
    const yLabels = this._yLabels;
    const xTicks = this._xTicks;
    const xLabels = this._xLabels;

    if (yTicks !== undefined && yLabels) {
      const newYLabels = yLabels.filter((_v, i) => !(i % Math.floor(yLabels.length / yTicks)));
      yAxis.tickValues(newYLabels);
    }
    if (xTicks !== undefined && xLabels) {
      const newXLabels = xLabels.filter((_v, i) => !(i % Math.floor(xLabels.length / xTicks)));
      xAxis.tickValues(newXLabels);
    }

    const yColorScaleAxis = d3.axisLeft(this._colorScaleYAxis);
    yColorScaleAxis.tickFormat(function (d) {
      const value = d.valueOf();
      const format = d3.format('.3s');
      const formattedValue = format(value);
      return String(formattedValue);
    });

    const rectWidth = this._xAxis.bandwidth();
    const rectHeight = this._yAxis.bandwidth();
    table.cols.forEach((col, colIdx) => {
      col.forEach((val, rowIdx) => {
        let color = null;
        if (
          typeof val === 'number' &&
          val <= colorScale.domain()[1] &&
          val >= colorScale.domain()[0]
        ) {
          color = this._colorScale?.(val);
        } else if (this._nullValueColor) {
          color = this._nullValueColor;
        }
        if (color) {
          const px = this._xAxis(this.xLabels?.[colIdx] ?? `${colIdx}`);
          const py = this._yAxis(this.yLabels?.[rowIdx] ?? `${rowIdx}`);
          const opts: RectOptions = {
            color: color,
            width: rectWidth,
            height: rectHeight,
            fill: true,
          };
          if (px && py) {
            ctx.rect({ x: px, y: py }, opts);
          }
        }
      });
    });

    this._drawColorScaleBar(colorScale.domain()[1]);

    //Axises

    //x axis ticks
    svg
      .append('g')
      .attr('transform', `translate(${this._m.left}, ${this._height - this._m.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('dx', '-2.2em')
      .attr('dy', '0em')
      .attr('transform', 'rotate(-65)');

    //y axis ticks
    svg
      .append('g')
      .attr('transform', `translate(${this._m.left}, ${this._m.top})`)
      .call(yAxis)
      .selectAll('text')
      .append('title');

    if (this._axisLabels) {
      svg
        .append('g')
        .append('text')
        .attr('class', 'gui-x-axis-label')
        .attr('x', `-${this._height / 2}`)
        .attr('dy', 11)
        .attr('transform', 'rotate(-90)')
        .text(this._axisLabels[1]);

      svg
        .append('g')
        .append('text')
        .attr('class', 'gui-y-axis-label')
        .attr('x', `${this._width / 2}`)
        .attr('y', canvas.height + this._m.top + this._m.bottom)
        .text(this._axisLabels[0]);

      svg
        .append('g')
        .append('text')
        .attr('class', 'gui-z-axis-label')
        .attr('x', `-${this._height / 2}`)
        .attr('y', canvas.width + this._m.left + 15)
        .attr('transform', 'rotate(-90)')
        .text(this._axisLabels[2]);
    }

    //color scale y axis
    svg
      .append('g')
      .attr(
        'transform',
        `translate(${canvas.width + this._m.left + this._colorScaleM.left}, ${this._colorScaleM.top
        })`,
      )
      .call(yColorScaleAxis)
      .selectAll('text')
      .append('title');
  }

  private _drawColorScaleBar(_max: number) {
    const ctx = this._colorScaleCanvas?.ctx.ctx;
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(0, this._height ?? 0, 0, 0);

    gradient.addColorStop(0, this._colors[0]);
    for (let index = 1; index < this._colors.length; index++) {
      gradient.addColorStop(index / (this._colors.length - 1), this._colors[index]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(
      this._colorScaleXAxis(0) ?? 0,
      this._colorScaleYAxis(_max),
      this._colorScaleXAxis.bandwidth(),
      this._height ?? 0,
    );
  }

  private _scaleBandInvert(scale: d3.ScaleBand<string>): (value: number) => [string, number] {
    const domain = scale.domain();
    const eachBand = scale.step();

    return function (value: number) {
      const index = Math.floor(value / eachBand);
      return [domain[Math.max(0, Math.min(index, domain.length - 1))], index];
    };
  }
}

declare global {
  interface Window {
    GuiHeatmap: typeof GuiHeatmap;
  }

  interface HTMLElementTagNameMap {
    'gui-heatmap': GuiHeatmap;
  }
}

if (!window.customElements.get('gui-heatmap')) {
  window.GuiHeatmap = GuiHeatmap;
  window.customElements.define('gui-heatmap', GuiHeatmap);
}
