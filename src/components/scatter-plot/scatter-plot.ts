import * as d3 from 'd3';
import { core } from '@greycat/lib-std';

import { Disposable } from '../../internals';
import {
  TableScales,
  Canvas,
  Line,
  LineOptions,
  SimpleTooltip,
  SimpleTooltipRow,
  Point,
} from '../../chart-utils';

import {
  getCSSVar,
  getCSSVars,
  getColors,
  isNumberColumn,
  processCssVars,
  round,
} from '../../utils';

// Scale constant
const Y_SCALE_WIDTH = 35;
// Legend constants
const LEGEND_CONTAINER_WIDTH = 150;
// Tooltip
const TOOLTIP_DECIMAL_PLACES = 3;

export interface ScatterPlotChartProps {
  table: core.Table<unknown> | null;
  ticks: number;
  hideAxis: boolean;
  showGrid: boolean;
  normalizeAxis: boolean;
  axisLabels: [string, string] | undefined;
  showReferenceLines: boolean;

  colorSteps?: string[];
  clusterClasses?: string[];
  activeClasses?: number[];
  yAxisWidth?: number;
}

export class GuiScatterPlotChart extends HTMLElement implements ScatterPlotChartProps {
  private _container = document.createElement('div');
  private _errorMsg = document.createElement('div');
  private _canvas: Canvas | undefined;
  private _legendContainer: HTMLDivElement | undefined;
  private _table: core.Table<unknown> | null = null;
  private _tableScales: TableScales | undefined;
  private _hideAxis = false;
  private _axisLabels: [string, string] | undefined;
  private _showGrid = false;
  private _width = 0;
  private _height = 0;
  private _yAxisWidth = Y_SCALE_WIDTH;
  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined;
  private _disposeResizer: Disposable | undefined;
  private _cursor: { x: number; y: number } = { x: 0, y: 0 };
  private _hover = false;
  private _ticks = 5;
  private _backlineColor = 'gray';
  private _gridColor = 'gray';
  private _quadtree = d3.quadtree<Point>();
  // CSS Vars
  private _selectedColorCss = 'orange';
  private _selectedRadiusCss = 4;
  private _selectedThresholdCss = 15;
  private _tooltipDasharrayCss = [4, 4];

  private _tooltip?: SimpleTooltip;
  private readonly _m = { top: 10, right: 10, bottom: 50, left: 35 };

  // Component specific styles and props
  private _normalizeAxis = true;
  private _showReferenceLines = true;
  private _referenceLineStyles: string | undefined;

  // Clustering
  private _colorSteps = getColors();
  private _clusterClasses: string[] = [];
  private _activeClasses: number[] | undefined;

  // Dispose
  private _disposables: Disposable[] = [];

  get table(): core.Table<unknown> | null {
    return this._table;
  }

  set table(table: core.Table<unknown> | null) {
    this._table = table;
    this._recomputeScales();
    this._drawLegend();
    this.render();
  }

  get ticks() {
    return this._ticks;
  }

  set ticks(ticks: number) {
    this._ticks = ticks;
    this.render();
  }

  get hideAxis(): boolean {
    return this._hideAxis;
  }

  set hideAxis(hideAxis: boolean) {
    this._hideAxis = hideAxis;
    this.render();
  }

  get showGrid(): boolean {
    return this._showGrid;
  }

  set showGrid(showGrid: boolean) {
    this._showGrid = showGrid;
    this.render();
  }

  get normalizeAxis(): boolean {
    return this._normalizeAxis;
  }

  set normalizeAxis(normalizeAxis: boolean) {
    this._normalizeAxis = normalizeAxis;
    this._recomputeScales();
    this._drawLegend();
    this.render();
  }

  get showReferenceLines(): boolean {
    return this._showReferenceLines;
  }

  set showReferenceLines(showReferenceLines: boolean) {
    this._showReferenceLines = showReferenceLines;
    this.render();
  }

  get referenceLineStyles(): string | undefined {
    return this._referenceLineStyles;
  }

  set referenceLineStyles(referenceLineStyles: string | undefined) {
    this._referenceLineStyles = referenceLineStyles;
    this.render();
  }

  get axisLabels(): [string, string] | undefined {
    return this._axisLabels;
  }

  set axisLabels(axisLabels: [string, string] | undefined) {
    this._axisLabels = axisLabels;
    this.render();
  }

  get colorSteps(): string[] {
    return this._colorSteps;
  }

  set colorSteps(colorSteps: string[]) {
    this._colorSteps = colorSteps;
    this._drawLegend();
    this.render();
  }

  get clusterClasses(): string[] {
    return this._clusterClasses;
  }

  set clusterClasses(clusterClasses: string[] | undefined) {
    if (clusterClasses) {
      this._clusterClasses = clusterClasses ? clusterClasses : [];
      this._recomputeScales();
      this._drawLegend();
      this.render();
    }
  }

  get activeClasses(): number[] | undefined {
    return this._activeClasses;
  }

  set activeClasses(activeClasses: number[] | undefined) {
    if (activeClasses) {
      this._activeClasses = activeClasses;
      this._recomputeScales();
      this._drawLegend();
      this.render();
    } else {
      this._activeClasses =
        this._clusterClasses.length > 0 ? this._clusterClasses.map((_, idx) => idx) : undefined;
      this._recomputeScales();
      this._drawLegend();
      this.render();
    }
  }

  get yAxisWidth(): number {
    return this._yAxisWidth;
  }

  set yAxisWidth(yAxisWidth: number | undefined) {
    this._yAxisWidth = yAxisWidth != null ? yAxisWidth : Y_SCALE_WIDTH;
  }

  setAttrs({
    table = this._table,
    ticks = this._ticks,
    hideAxis = this._hideAxis,
    showGrid = this._showGrid,
    normalizeAxis = this._normalizeAxis,
    axisLabels = this._axisLabels,
    showReferenceLines = this._showReferenceLines,
    colorSteps = this._colorSteps,
    clusterClasses = this._clusterClasses,
    activeClasses = this._activeClasses,
    yAxisWidth = this._yAxisWidth,
  }: Partial<ScatterPlotChartProps>) {
    this._ticks = ticks;
    this._table = table;
    this._hideAxis = hideAxis;
    this._showGrid = showGrid;
    this._normalizeAxis = normalizeAxis;
    this._axisLabels = axisLabels;
    this._showReferenceLines = showReferenceLines;
    this._colorSteps = colorSteps;
    this._clusterClasses = clusterClasses;
    this._activeClasses =
      activeClasses != null
        ? activeClasses
        : this._clusterClasses.length > 0
        ? this._clusterClasses.map((_, idx) => idx)
        : undefined;
    this._yAxisWidth = yAxisWidth;

    this._recomputeScales();
    this._drawLegend();
    this.render();
  }

  connectedCallback() {
    const [backlineColor = this._backlineColor, gridColor = this._gridColor] = getCSSVars(
      this,
      'chart-backline',
      'chart-grid',
    );
    this._backlineColor = backlineColor;
    this._gridColor = gridColor;

    const cssVars = getCSSVars(
      this,
      'scatterplot-selected-color',
      'scatterplot-selected-radius',
      'scatterplot-selected-threshold',
      'scatterplot-tooltip-dasharray',
    );

    this._colorSteps = getColors(this);

    /** Process the CSS vars */
    processCssVars(this, cssVars);

    this._initialize();
    const oResize = new ResizeObserver(() => {
      this._initialize();
      this.render();
    });
    oResize.observe(this);
    this._disposeResizer = () => oResize.disconnect();
  }

  disconnectedCallback() {
    this._disposeResizer?.();
    this._canvas?.dispose();
    for (let i = 0; i < this._disposables.length; i++) {
      this._disposables[i]();
    }
  }

  private _legendClicked = (event: MouseEvent) => {
    const target = event.target as Element;
    const cClass = target.getAttribute('cluster-class');

    if (!cClass) {
      return;
    }

    /** the index of the class to toggle */
    const cIndex = this._clusterClasses.indexOf(cClass);
    if (cIndex === -1) {
      return;
    }

    if (this._activeClasses) {
      /** the index in the activeClasses array of the classIndex */
      const idx = this._activeClasses.indexOf(cIndex);
      // toggle classes on/off based on whether or not the index is already in the array
      if (idx === -1) {
        // toggle on
        this._activeClasses.push(cIndex);
      } else {
        // toggle off
        this._activeClasses.splice(idx, 1);
      }
    } else {
      // no activeClasses at all, initialize one
      this._activeClasses = [cIndex];
    }

    this._recomputeScales();
    this._drawLegend();
    this.render();
  };

  private _computeTooltipRows(scales: TableScales, x: number, y: number) {
    if (!this._table) {
      return;
    }

    const rows: SimpleTooltipRow[] = [
      {
        key: this._axisLabels?.[0] ?? 'x',
        value: { value: scales.series[0].x.value(x), tiny: true },
      },
      {
        key: this._axisLabels?.[1] ?? `y`,
        value: { value: scales.series[0].value(y), tiny: true },
      },
    ];

    const classIndexes: number[] = [];
    const realValueX = scales.series[0].x.scale.invert(x) as number; // I am sure that it is a number
    const predictedValueY = scales.series[1].scale.invert(y) as number; // I am sure that it is a number

    for (let rowIndex = 0; rowIndex < this._table?.data.length; rowIndex++) {
      const row = this._table?.data[rowIndex];
      if (row) {
        for (let i = 0; i < row.length; i += 2) {
          const rowValueRounded =
            typeof row[i] === 'number' ? round(row[i] as number, TOOLTIP_DECIMAL_PLACES) : row[i];
          const realValueXRounded = Number(realValueX.toFixed(TOOLTIP_DECIMAL_PLACES));
          if (rowValueRounded === realValueXRounded) {
            const rowValueRounded =
              typeof row[i + 1] === 'number'
                ? round(row[i + 1] as number, TOOLTIP_DECIMAL_PLACES)
                : row[i + 1];
            const realValueYRounded = Number(predictedValueY.toFixed(TOOLTIP_DECIMAL_PLACES));
            if (rowValueRounded === realValueYRounded) {
              // only add active classes to the tooltip
              if (!this._activeClasses || this._activeClasses.includes(i / 2)) {
                classIndexes.push(i / 2); // Because we're incrementing by 2, the real class index has to be divided
              }
            }
          }
        }
      }
    }

    if (this._clusterClasses.length > 0) {
      rows.push(
        {
          key: '',
          value: { value: '', tiny: true },
        },
        {
          key: 'Classes',
          value: { value: 'Count', tiny: true },
        },
      );
      // claculate the amount and classes to display in the tooltip
      const classCounters: { name: string; counter: number }[] = [];
      let noClassCounter = 0;
      for (let i = 0; i < classIndexes.length; i++) {
        const index = classIndexes[i];
        if (index >= 0) {
          const found = classCounters.findIndex((c) => c.name === this._clusterClasses[index]);
          if (found >= 0) {
            // already set, increment
            classCounters[found].counter++;
          } else {
            // not found, add
            classCounters.push({
              name: this._clusterClasses[index],
              counter: 1,
            });
          }
        } else {
          // no class, increment 'no class'
          noClassCounter++;
        }
      }

      // create tooltip row for each class
      for (let i = 0; i < classCounters.length; i++) {
        const cIndex = this._clusterClasses.indexOf(classCounters[i].name);
        const color = cIndex >= 0 ? this.colorSteps[cIndex] : undefined;
        rows.push({
          key: classCounters[i].name,
          value: { value: classCounters[i].counter, tiny: true },
          color: color,
        });
      }
      if (noClassCounter > 0) {
        rows.push({
          key: 'no class',
          value: { value: noClassCounter, tiny: true },
        });
      }
    }

    return rows;
  }

  private _initialize() {
    this._container.replaceChildren();
    this._canvas?.dispose();

    const { width, height } = this.getBoundingClientRect();
    this._width = width;
    this._height = height;

    const widthOccupiedByLegend = this._clusterClasses.length > 0 ? LEGEND_CONTAINER_WIDTH : 0;
    const canvasWidth = width - this._m.left - this._m.right - widthOccupiedByLegend;

    // svg
    this._svg = d3
      .select(this._container)
      .append('svg')
      .attr('width', width - widthOccupiedByLegend)
      .attr('height', height);

    this._tooltip = new SimpleTooltip();

    this._legendContainer = document.createElement('div');
    this._legendContainer.classList.add('legend');

    const onHover = () => {
      if (!this._hover || !this._tooltip) {
        this._canvas?.clearHoverAndHideTooltip();
        // no re-enqueue update
        return;
      }

      const canvas = this._canvas;
      const scales = this._tableScales;
      if (!canvas || !scales) {
        return requestAnimationFrame(onHover);
      }
      const ctx = canvas.hoverCtx;
      if (!ctx) {
        return;
      }
      ctx.clear();

      // Getting the nearest point relative to mouse position
      const closest = this._quadtree.find(
        this._cursor.x,
        this._cursor.y,
        this._selectedThresholdCss,
      );

      if (closest) {
        const { x, y } = closest;

        // draw the selected circle
        ctx.circle(x, y, {
          color: this._selectedColorCss,
          radius: this._selectedRadiusCss,
        });
        // x backline
        ctx.line(
          [
            { x, y },
            { x, y: ctx.height },
          ],
          {
            color: this._selectedColorCss,
            width: 1,
            dashed: this._tooltipDasharrayCss,
          },
        );
        // y backline
        ctx.line(
          [
            { x: 0, y },
            { x, y },
          ],
          {
            color: this._selectedColorCss,
            width: 1,
            dashed: this._tooltipDasharrayCss,
          },
        );

        const rows = this._computeTooltipRows(scales, x, y);
        if (rows) {
          this._tooltip.updateRows(rows);
          canvas.showTooltip(true);
          canvas.moveTooltip(x, y);
        }
      } else {
        canvas.showTooltip(false);
      }

      return requestAnimationFrame(onHover);
    };

    this._canvas = new Canvas(canvasWidth, height - this._m.top - this._m.bottom, this._tooltip, {
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
    });
    this._canvas.root.style.top = `${this._m.top}px`;
    this._canvas.root.style.left = `${this._m.left}px`;
    this._canvas.root.style.position = 'absolute';

    this._recomputeScales();
    // this._buildColorScale();
    this._drawLegend();

    this._container.style.display = 'flex';
    this._container.style.height = '100%';
    this._container.style.width = '100%';
    this._container.style.position = 'relative';
    this._container.append(this._canvas.root, this._legendContainer);

    this.appendChild(this._container);
  }

  private _recomputeScales() {
    if (this._table && this._canvas) {
      this._quadtree = d3
        .quadtree<Point>()
        .extent([
          [0, 0],
          [this._canvas.width, this._canvas.height],
        ])
        .x((p) => p.x)
        .y((p) => p.y);

      // scatterplot only work with 2 columns of numbers
      if (
        this._table.meta.length < 2 ||
        !isNumberColumn(this._table.meta[0]) ||
        !isNumberColumn(this._table.meta[1])
      ) {
        this._tableScales = undefined;
        return;
      }

      this._tableScales = TableScales.from(this._table, {
        ticks: this._ticks,
        ignoreIndex: true,
      });
      if (this._tableScales) {
        if (this._normalizeAxis) {
          // update the domains to get the min & max of both columns
          const min = Math.min(this._table.meta[0].min, this._table.meta[1].min);
          const max = Math.max(this._table.meta[0].max, this._table.meta[1].max);
          this._tableScales.x.domain([min, max]);
          this._tableScales.y[0].domain([min, max]);
        }
        this._updateWidthAndHeight(this._tableScales, this._table);
        if (this._canvas && this._tableScales.lines.length > 0) {
          const flattenedLines: Line = [];
          for (let lineIdx = 0; lineIdx < this._tableScales.lines.length; lineIdx++) {
            if (this._activeClasses == null || this._activeClasses.indexOf(lineIdx) >= 0) {
              const line = this._tableScales.lines[lineIdx];
              for (let ptIdx = 0; ptIdx < line.length; ptIdx++) {
                flattenedLines.push(line[ptIdx]);
              }
            }
          }
          // cache quadtree to save some CPU cycles
          this._quadtree.addAll(flattenedLines);
        }
      }
    } else {
      this._tableScales = undefined;
    }
  }

  private _updateWidthAndHeight(scales: TableScales, table: core.Table<unknown>) {
    const canvasLeft = this._m.left + this._yAxisWidth;
    const widthOccupiedByAxis = this._yAxisWidth;
    const widthOccupiedByLegend = this._clusterClasses.length > 0 ? LEGEND_CONTAINER_WIDTH : 0;

    const newWidth =
      this._width - this._m.left - this._m.right - widthOccupiedByAxis - widthOccupiedByLegend;
    const newHeight = this._height - this._m.top - this._m.bottom;
    if (this._canvas) {
      this._canvas.resize(newWidth, newHeight);
      this._canvas.root.style.left = `${canvasLeft}px`;
    }

    // It takes the radius of the data points and it correlates it with the outer padding
    const circleRadiusString = getCSSVar('scatterplot-selected-radius');
    const padding = circleRadiusString?.replace(/\D/g, '');
    const paddingNumber = padding ? Number(padding) : 0;

    const paddingBase = 15;

    // The values are not 0 so they are not cut off at the limit of the canvas
    const isScatterPlot = true;
    scales.compute(
      table,
      newWidth,
      newHeight,
      this._clusterClasses,
      paddingBase + paddingNumber,
      isScatterPlot,
    );
  }

  private _drawLegend() {
    const clusterClasses: string[] = [];
    const colorSteps: string[] = [];
    if (this._clusterClasses.length > 0) {
      for (let stepIndex = 0; stepIndex < this._colorSteps.length; stepIndex++) {
        const custerClass = this._clusterClasses[stepIndex];
        const step = this._colorSteps[stepIndex];
        if (custerClass != null) {
          clusterClasses.push(custerClass);
          colorSteps.push(step);
        }
      }
    }

    if (clusterClasses.length > 0 && this._legendContainer) {
      let activeClasses = clusterClasses;
      if (this._activeClasses != null) {
        activeClasses = [];
        for (let i = 0; i < clusterClasses.length; i++) {
          if (this._activeClasses.indexOf(i) >= 0) {
            activeClasses.push(clusterClasses[i]);
          }
        }
      }

      this._legendContainer.innerHTML = '';
      for (let i = 0; i < colorSteps.length; i++) {
        const active = activeClasses.includes(clusterClasses[i]);

        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');
        legendItem.setAttribute('key', `legend-item-${i}`);
        legendItem.setAttribute('cluster-class', clusterClasses[i]);
        legendItem.addEventListener('click', this._legendClicked);
        this._disposables.push(() => legendItem.removeEventListener('click', this._legendClicked));
        if (active) {
          legendItem.classList.add('active');
        }

        const legendButton = document.createElement('div');
        legendButton.classList.add('legend-btn');
        legendButton.setAttribute('key', `legend-button-${i}`);
        legendButton.style.background = colorSteps[i];

        const legendText = document.createElement('div');
        legendText.classList.add('legend-text');
        legendText.setAttribute('key', `legend-text-${i}`);
        legendText.textContent = clusterClasses[i];

        legendItem.appendChild(legendButton);
        legendItem.appendChild(legendText);
        this._legendContainer?.appendChild(legendItem);
      }
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

    ctx.clear();

    const table = this._table;
    if (!table) {
      return;
    }

    const scales = this._tableScales;
    if (!scales) {
      if (this._legendContainer) {
        this._legendContainer.style.display = 'none'; // hide legends
      }

      const incompleteTableEl = document.createElement('div');
      incompleteTableEl.classList.add('incomplete-msg');
      incompleteTableEl.style.color = getCSSVar('color-8') ?? 'inherit';
      incompleteTableEl.textContent = `Table is incomplete or is missing an index`;
      this._errorMsg = incompleteTableEl;
      this._container.appendChild(incompleteTableEl);
      return;
    } else {
      if (this._legendContainer) {
        this._legendContainer.style.display = 'flex'; // hide legends
      }
      this._errorMsg.remove();
    }

    let clusterClasses = this._clusterClasses;
    if (this._activeClasses != null) {
      clusterClasses = [];
      for (let i = 0; i < this._clusterClasses.length; i++) {
        if (this._activeClasses.indexOf(i) >= 0) {
          clusterClasses.push(this._clusterClasses[i]);
        }
      }
    }

    // draw scatter plot
    ctx.scatterplot(scales.lines, {
      radius: 2,
      color: this._colorSteps[0],
      clusterClass:
        scales.classes.length > 0
          ? {
              classes: clusterClasses,
              lineClassList: scales.classes,
              colorList: this._colorSteps,
            }
          : undefined,
    });

    if (!this._svg) {
      return;
    }

    if (this._normalizeAxis) {
      const [xMin, xMax] = (scales.x as d3.ScaleLinear<number, number>).domain();
      const [yMin, yMax] = (scales.y[0] as d3.ScaleLinear<number, number>).domain();
      ctx.line(
        [
          { x: scales.x(xMin), y: scales.y[0](yMin) },
          { x: scales.x(xMax), y: scales.y[0](yMax) },
        ],
        { color: this._selectedColorCss, width: 1, dashed: undefined },
      );
    }

    this._svg.selectChildren().remove();

    // x-axis
    this._svg
      .append('g')
      .attr(
        'transform',
        `translate(${this._m.left + this._yAxisWidth}, ${this._height - this._m.bottom})`,
      )
      .call(
        d3
          .axisBottom(scales.x as d3.AxisScale<number>)
          .ticks(this._ticks)
          .tickPadding(5),
      );

    // y-axis
    this._svg
      .append('g')
      .attr('transform', `translate(${this._m.left + this._yAxisWidth}, ${this._m.top})`)
      .call(d3.axisLeft(scales.y[0] as d3.AxisScale<number>).tickSizeOuter(-20));

    // Hide axis
    if (this._hideAxis) {
      this._svg.selectAll('.domain').attr('display', 'none');
    } else {
      this._svg.selectAll('.domain').attr('display', 'block');
    }

    // Axis labels
    if (this._axisLabels) {
      // x-axis label
      this._svg
        .append('g')
        .append('text')
        .attr('x', `${this._width / 2}`)
        .attr('y', canvas.height + 50)
        .text(this._axisLabels[0]);
      // y-axis label
      this._svg
        .append('g')
        .append('text')
        .attr('x', `-${this._height / 2}`)
        .attr('dy', 25)
        .attr('transform', 'rotate(-90)')
        .text(this._axisLabels[1]);
    }

    // Grid
    const dashedLine: LineOptions = {
      width: 1,
      color: this._backlineColor,
      dashed: this._tooltipDasharrayCss,
    };

    if (scales.y.length === 1) {
      const axisBottom = d3.axisBottom(scales.x as d3.AxisScale<number>);
      const leftAxis = d3.axisLeft(scales.y[0] as d3.AxisScale<number>).ticks(this._ticks);
      if (this._showGrid) {
        ctx.ctx.save();
        ctx.ctx.globalAlpha = 0.4;
        // Looks like the typings definition of Scale is not compliant with what's actually
        // available, here we can retrieve the ticks domain values by calling "ticks" on the scale

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (leftAxis.scale() as any)
          .ticks(this._ticks)
          .map(leftAxis.scale())
          .forEach((y: number) => {
            ctx.line(
              [
                { x: 0, y },
                { x: ctx.width, y },
              ],
              {
                ...dashedLine,
                color: this._gridColor,
              },
            );
          });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axisBottom.scale() as any)
          .ticks()
          .map(axisBottom.scale())
          .forEach((x: number) => {
            ctx.line(
              [
                { x, y: 0 },
                { x, y: ctx.height },
              ],
              {
                ...dashedLine,
                color: this._gridColor,
              },
            );
          });

        ctx.ctx.restore();
      }
    }
  }
}

declare global {
  interface Window {
    GuiScatterPlotChart: typeof GuiScatterPlotChart;
  }
  interface HTMLElementTagNameMap {
    'gui-scatter-plot-chart': GuiScatterPlotChart;
  }
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-scatter-plot-chart': any;
    }
  }
}

if (!window.customElements.get('gui-scatter-plot-chart')) {
  window.GuiScatterPlotChart = GuiScatterPlotChart;
  window.customElements.define('gui-scatter-plot-chart', GuiScatterPlotChart);
}
