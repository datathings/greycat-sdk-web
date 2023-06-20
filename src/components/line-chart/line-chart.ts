import * as d3 from 'd3';
import { core } from '@greycat/lib-std';
import {
  getColors,
  getCSSVars,
  processCssVars,
  emptyDataElement,
} from '../../utils';
import {
  Serie,
  TableScales,
  Canvas,
  Line,
  SimpleTooltip,
  SimpleTooltipRow,
  Point,
} from '../../chart-utils';
import { Disposable } from '../../internals';
import { getGlobalDateTimeFormat, getGlobalNumberFormat } from '../../globals';
// import { TimeZone } from '@greycat/lib-std/src/lib/core';

const Y_SCALE_WIDTH = 80;
const X_LABEL_HEIGHT = 50;
// this is used to shrink the scales a tiny bit as long as the axis positions
// so that the canvas "overlaps" with them and therefore displays the "edge values"
// properly without "border clipping": https://hub.datathings.com/greycat/greycat/-/issues/752
const INNER_PADDING = 4;

export type LineChartMapper<I = unknown, O = unknown> = (o: I) => O;

export interface LineChartProps {
  kind: 'line' | 'bar' | 'point';
  table: core.Table<unknown> | undefined;
  columns: number[];
  headers: string[];
  mappings: Array<LineChartMapper | undefined>;
  ticks: number;
  avg: boolean;
  hideAxis: boolean;
  showGrid: boolean;
  withNullable: boolean;
  confidenceColumns: Array<number | undefined> | undefined;
  axisLabels: [string, string] | undefined;
  index: number | undefined;
  dateFmt: Intl.DateTimeFormat | undefined;
  numberFmt: Intl.NumberFormat | undefined;
}

/**
 * Display a multiline chart based on a given `core.Table`
 */
export class GuiLineChart extends HTMLElement implements LineChartProps {
  private _canvas: Canvas | undefined;
  private _table: core.Table<unknown> | undefined;
  private _tableScales: TableScales | undefined;
  private _avg = false;
  private _hideAxis = false;
  private _axisLabels: [string, string] | undefined;
  private _showGrid = false;
  private _confidenceColumns: Array<number | undefined> | undefined = [];
  private _width = 0;
  private _height = 0;
  private _svg = d3.create('svg');
  private _columns: number[] = [];
  private _headers: string[] = [];
  private _mappings: Array<LineChartMapper | undefined> = [];
  private _colors: string[] = [];
  private _disposeResizer: Disposable | undefined;
  private _cursor: { x: number; y: number } = { x: 0, y: 0 };
  private _hover = false;
  private _ticks = 5;
  private _tooltip: SimpleTooltip | undefined;
  private _index: number | undefined;
  private _dateFmt: Intl.DateTimeFormat | undefined;
  private _numberFmt: Intl.NumberFormat | undefined;
  private _withNullable = false;
  private _canvasOnly = false;
  private _kind: 'line' | 'bar' | 'point' = 'line';
  private _transform: d3.ZoomTransform = d3.zoomIdentity;

  // CSS Vars
  private _backlineColorCss = 'gray';
  private _gridColorCss = 'gray';
  private _backlineWidthCss = 1;
  private _gridWidthCss = 1;
  private _backlineOpacityCss = 0.2;
  private _gridOpacityCss = 0.4;
  private _backlineDashArrayCss = [4, 4];
  private _gridDashArrayCss = [4, 4];
  private _tooltipCircleRadiusCss = 3;
  private _tooltipCircleFillCss = 'transparent';
  private _lineSerieWidthCss = 1;
  private _confidenceOpacityCss = 0.1;

  /** the x-axis used width in pixel */
  xWidth = 0;
  /** the offset from the left where x-axis will start */
  xOffset = 0;
  readonly margin = { top: 10, right: 10, bottom: 25, left: 10 };

  get table(): core.Table<unknown> | undefined {
    return this._table;
  }

  set table(table: core.Table<unknown> | undefined) {
    this._table = table;
    this._computeTable({ table });
    this.render();
  }

  get scales() {
    return this._tableScales;
  }

  get columns(): number[] {
    return this._columns;
  }

  set columns(columns: number[]) {
    this._columns = columns;
    this._computeTable({ columns });
    this.render();
  }

  get headers() {
    return this._headers;
  }

  set headers(headers: string[]) {
    this._headers = headers;
    this.render();
  }

  get mappings() {
    return this._mappings;
  }

  set mappings(m: Array<LineChartMapper | undefined>) {
    this._mappings = m;
    this.render();
  }

  get ticks() {
    return this._ticks;
  }

  set ticks(ticks: number) {
    this._ticks = ticks;
    this.render();
  }

  get avg(): boolean {
    return this._avg;
  }

  set avg(avg: boolean) {
    this._avg = avg;
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

  get confidenceColumns(): Array<number | undefined> | undefined {
    return this._confidenceColumns;
  }

  set confidenceColumns(columns: Array<number | undefined> | undefined) {
    this._confidenceColumns = columns;
    this.render();
  }

  get axisLabels(): [string, string] | undefined {
    return this._axisLabels;
  }

  set axisLabels(axisLabels: [string, string] | undefined) {
    this._axisLabels = axisLabels;
    this.render();
  }

  /**
   * The property index will be used to select the column of the table to set as `x-axis` (represented by index == true in the table). Even if the given table has indexes already defined, this property overrides the table indexes.
   * If no indexes are defined in the table and the `index` property is not set, then column `0` is selected as `x-axis`.
   */
  get index(): number | undefined {
    return this._index;
  }

  set index(index: number | undefined) {
    this._index = index;
    this._computeTable({ index });
    this.render();
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

  get withNullable(): boolean {
    return this._withNullable;
  }

  set withNullable(withNullable: boolean) {
    this._withNullable = withNullable;
    this._computeTable();
    this.render();
  }

  set canvasOnly(b: boolean) {
    this._canvasOnly = b;
    this._initialize();
  }

  set kind(kind: 'line' | 'bar' | 'point') {
    this._kind = kind;
    this.render();
  }

  setAttrs({
    table = this._table,
    columns = this._columns,
    headers = this._headers,
    mappings = this._mappings,
    ticks = this._ticks,
    avg = this._avg,
    hideAxis = this._hideAxis,
    axisLabels = this._axisLabels,
    showGrid = this._showGrid,
    confidenceColumns = this._confidenceColumns,
    index = this._index,
    dateFmt = this._dateFmt,
    numberFmt = this._numberFmt,
    withNullable = this._withNullable,
    kind = this._kind,
  }: Partial<LineChartProps>) {
    this._ticks = ticks;
    this._table = table;
    this._mappings = mappings;
    this._columns = columns;
    this._avg = avg;
    this._hideAxis = hideAxis;
    this._axisLabels = axisLabels;
    this._showGrid = showGrid;
    this._headers = headers;
    this._confidenceColumns = confidenceColumns;
    this._index = index;
    this._dateFmt = dateFmt;
    this._numberFmt = numberFmt;
    this._withNullable = withNullable;
    this._kind = kind;
    this._computeTable({
      table: table != null ? table : undefined,
      columns,
      index,
    });
    this.render();
  }

  connectedCallback() {
    // root
    this.style.position = 'relative';
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';

    const cssVars = getCSSVars(
      this,
      'linechart-backline-color',
      'linechart-grid-color',
      'linechart-backline-width',
      'linechart-grid-width',
      'linechart-backline-opacity',
      'linechart-grid-opacity',
      'linechart-backline-dasharray',
      'linechart-grid-dasharray',
      'linechart-circle-radius',
      'linechart-circle-fill',
      'linechart-lineserie-width',
      'linechart-confidence-opacity'
    );

    /** Process the CSS vars */
    processCssVars(this, cssVars);

    const oResize = new ResizeObserver(() => this._initialize());
    oResize.observe(this);
    this._disposeResizer = () => oResize.disconnect();
  }

  disconnectedCallback() {
    this._disposeResizer?.();
    this._canvas?.dispose();
  }

  private _initialize() {
    // cleanup previous state
    this.innerHTML = '';
    this._canvas?.dispose();

    const { width, height } = this.getBoundingClientRect();
    this._width = width;
    this._height = height;
    this._colors = getColors(this);

    this._tooltip = new SimpleTooltip();

    // svg
    // prettier-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.appendChild(this._svg.node()!);
    this._svg.attr('width', width).attr('height', height);

    const onHover = () => {
      const hoverCtx = canvas.hoverCtx;
      if (!this._hover || !hoverCtx) {
        // clear hover canvas
        canvas.clearHoverAndHideTooltip();
        // do not re-enqueue
        return;
      }
      const scales = this._tableScales;
      const table = this._table;

      if (!table) {
        // re-enqueue hover animation
        return requestAnimationFrame(onHover);
      }
      if (!scales) {
        // clear hover canvas
        canvas.clearHoverAndHideTooltip();
        return requestAnimationFrame(onHover);
      }

      hoverCtx.clear();

      let cursor: CursorInfo | undefined;
      const colorMappings: Record<number, number> = {};
      let colorIdx = 0;
      for (let i = 0; i < table.meta.length; i++) {
        const m = table.meta[i];
        if (!m.index) {
          colorMappings[i] = colorIdx;
          colorIdx++;
        }
      }
      const dashedLine = {
        color: this._backlineColorCss,
        width: 1,
        dashed: this._backlineDashArrayCss,
      };

      // compute cursor infos
      const bisector = d3.bisector<Point, number>(({ x }) => x);
      scales.series.forEach((s, i) => {
        const nearestX = bisector.center(scales.lines[i], this._cursor.x);
        const xValue = table.data[nearestX][s.x.colIdx];
        const yValue = table.data[nearestX][s.colIdx];
        const x = Math.round(s.x.position(xValue));
        if (cursor) {
          if (cursor.x !== x) {
            // take the closest to the actual mouse cursor
            if (
              Math.abs(this._cursor.x - cursor.x) < Math.abs(this._cursor.x - x)
            ) {
              // current cursor is already the closest
            } else {
              cursor = {
                x,
                xValue,
                yColumns: [],
              };
            }
          }
        } else {
          cursor = {
            x,
            xValue,
            yColumns: [],
          };
        }
        cursor.yColumns.push({
          name: this._headers[s.colIdx] ?? `Col ${s.colIdx}`,
          x: Math.round(s.x.position(xValue)),
          y: Math.round(s.position(yValue)),
          yValue,
          s,
        });
      });

      // draw cursor backlines
      if (cursor) {
        // x line
        hoverCtx.ctx.save();
        hoverCtx.ctx.globalAlpha = this._backlineOpacityCss;
        const x = Math.round(cursor.x);
        hoverCtx.line(
          [
            { x, y: 0 },
            { x, y: hoverCtx.height },
          ],
          dashedLine
        );
        hoverCtx.ctx.restore();
      } else {
        return requestAnimationFrame(onHover);
      }

      cursor.yColumns.forEach((c) => {
        if (this._withNullable || c.yValue != null) {
          if (this._kind === 'line' || this._kind === 'point') {
            hoverCtx.circle(c.x, c.y, {
              color: this._colors[colorMappings[c.s.colIdx]],
              radius: this._tooltipCircleRadiusCss,
              fill: this._tooltipCircleFillCss,
            });
          } else {
            hoverCtx.bar([{ x: c.x - 1, y: c.y }], {
              color: this._colors[colorMappings[c.s.colIdx]],
              width: 4,
            });
          }
        }
      });

      // update tooltip
      if (this._tooltip) {
        this._tooltip.updateHeader({ value: cursor.xValue });
        const rows = cursor.yColumns.map<SimpleTooltipRow>((c, i) => {
          const confidenceColIndex = this._confidenceColumns?.[i];
          return {
            color:
              this._colors[
                colorMappings[
                  confidenceColIndex != null ? confidenceColIndex : c.s.colIdx
                ]
              ],
            key: c.name,
            value: {
              value: this._mappings[c.s.colIdx]?.(c.yValue) ?? c.yValue,
            },
          };
        });
        this._tooltip.updateRows(rows);
      }
      canvas.moveTooltip(this._cursor.x, this._cursor.y);

      return requestAnimationFrame(onHover);
    };

    this.xWidth = width - this.margin.left - this.margin.right;
    const canvasHeight =
      height -
      this.margin.top -
      this.margin.bottom -
      (this._axisLabels?.length === 2 ? X_LABEL_HEIGHT : 0);

    const selection = this._svg
      .append('rect')
      .attr('y', 0)
      .attr('height', canvasHeight - 8)
      .attr('fill', 'rgba(80,80,80,0.4)');

    const canvas = (this._canvas = new Canvas(
      this.xWidth,
      canvasHeight,
      this._canvasOnly ? undefined : this._tooltip,
      this._canvasOnly
        ? undefined
        : {
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
            selectionmove: ({ start, end }) => {
              const x0 = start < end ? start : end;
              const width = Math.abs(start - end);

              selection
                .style('visibility', 'visible')
                .attr('x', x0)
                .attr('width', width)
                .attr(
                  'transform',
                  `translate(${this.xOffset}, ${
                    this.margin.top + INNER_PADDING
                  })`
                );
            },
            selection: ({ start, end }) => {
              selection.style('visibility', 'hidden');
              const width = Math.abs(start - end);
              const x0 = start < end ? start : end;
              const x1 = x0 + width;
              if (this._tableScales && this._table) {
                if (width < 1) {
                  // click
                  this._computeTable();
                  const domain = this._tableScales.x.domain();
                  this.dispatchEvent(
                    new LineChartZoomEvent(domain[0], domain[1])
                  );
                  this.render();
                  return;
                }

                const selectedDomain = [
                  this._tableScales.x.invert(x0),
                  this._tableScales.x.invert(x1),
                ];
                // shrink domain to the selection
                this._tableScales.x.domain(selectedDomain as [Date, Date]);
                this.dispatchEvent(
                  new LineChartZoomEvent(selectedDomain[0], selectedDomain[1])
                );
                // ask the TableScales to recompute
                this._updateWidthAndHeight(this._tableScales, this._table);
                // re-render
                this.render();
              }
            },
          }
    ));
    this._canvas.root.style.top = `${this.margin.top}px`;
    this._canvas.root.style.left = `${this.margin.left}px`;
    this._canvas.root.style.position = 'absolute';

    if (this._table) {
      this._tableScales = TableScales.from(this._table, {
        usedColumns: this._getUsedColumns(),
        ticks: this._ticks,
        index: this._index,
      });
      if (this._tableScales) {
        this._updateWidthAndHeight(this._tableScales, this._table);
      }
    }

    this.appendChild(this._canvas.root);
    this.render();
  }

  private _getUsedColumns(cols = this._columns) {
    if (
      this._confidenceColumns?.length === 0 ||
      this._confidenceColumns == null
    ) {
      return cols;
    }

    // The confidence columns have to be pushed to the _columns, as they
    // will be used during the scale computation
    const filteredColumns: number[] = [];
    for (let i = 0; i < this._confidenceColumns.length; i++) {
      const confidenceCol = this._confidenceColumns[i];
      if (confidenceCol) {
        filteredColumns.push(confidenceCol);
      }
    }
    cols.push(...filteredColumns);

    return cols;
  }

  private _computeTable({
    table,
    columns,
    index,
  }: { table?: core.Table<unknown>; columns?: number[]; index?: number } = {}) {
    const verifiedTable = table ?? this._table;
    if (verifiedTable) {
      this._tableScales = TableScales.from(verifiedTable, {
        usedColumns: this._getUsedColumns(columns),
        ticks: this._ticks,
        index: this._index ?? index,
      });
      if (this._tableScales) {
        this._updateWidthAndHeight(this._tableScales, verifiedTable);
      }
    } else {
      this._tableScales = undefined;
    }
  }

  private _updateWidthAndHeight(
    scales: TableScales,
    table: core.Table<unknown>
  ) {
    let canvasLeft = this.margin.left;
    let widthOccupiedByAxis = 0;
    if (scales.y.length === 1) {
      // 1 y-axis: left
      widthOccupiedByAxis = Y_SCALE_WIDTH;
      canvasLeft += Y_SCALE_WIDTH;
    } else if (scales.y.length === 2) {
      // 2 y-axis: left / right
      widthOccupiedByAxis = Y_SCALE_WIDTH * 2;
      canvasLeft += Y_SCALE_WIDTH;
    } else {
      // more than 2 y-axis, increase left margin proportionally
      widthOccupiedByAxis = Y_SCALE_WIDTH * scales.y.length;
      canvasLeft += Y_SCALE_WIDTH * scales.y.length;
    }

    const newWidth =
      this._width - this.margin.left - this.margin.right - widthOccupiedByAxis;
    const newHeight =
      this._height -
      this.margin.top -
      this.margin.bottom -
      (this._axisLabels ? X_LABEL_HEIGHT : 0);
    if (this._canvas) {
      this._canvas.resize(newWidth, newHeight);
      this._canvas.root.style.left = `${canvasLeft}px`;
    }
    scales.compute(table, newWidth, newHeight, undefined, INNER_PADDING, false);
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

    const table = this._table;
    if (!table) {
      return;
    }

    ctx.clear();
    this._svg.selectChildren('g').remove();

    const scales = this._tableScales;

    this.querySelectorAll('.gui-line-chart-incomplete').forEach((n) =>
      n.remove()
    );
    if (!scales || scales.lines.length === 0) {
      const incompleteTableEl = emptyDataElement('gui-line-chart-incomplete');
      this.appendChild(incompleteTableEl);
      return;
    }

    const colorMappings: Record<number, number> = {};
    let colorIdx = 0;
    for (let i = 0; i < table.meta.length; i++) {
      if (!table.meta[i].index) {
        colorMappings[i] = colorIdx;
        colorIdx++;
      }
    }

    const dashedLine = {
      color: this._backlineColorCss,
      width: this._backlineWidthCss,
      dashed: this._backlineDashArrayCss,
    };

    const dashedLineGrid = {
      color: this._gridColorCss,
      width: this._gridWidthCss,
      dashed: this._gridDashArrayCss,
    };

    // draw avg backlines
    if (this._avg) {
      ctx.ctx.save();
      ctx.ctx.globalAlpha = 0.4;
      scales.series.forEach((s) => {
        const avg = Math.round(s.position(s.meta.avg));
        ctx.line(
          [
            { x: 0, y: avg },
            { x: ctx.width, y: avg },
          ],
          {
            ...dashedLine,
            color: this._colors[colorMappings[s.colIdx]],
          }
        );
      });
      ctx.ctx.restore();
    }

    // draw lines
    scales.series.forEach((s, i) => {
      const color = this._colors[colorMappings[s.colIdx]];
      const width = this._lineSerieWidthCss;

      const lines: Line[] = [];
      if (!this._withNullable) {
        let line: Line = [];
        const colSize = table.meta[s.colIdx]?.size;
        let count = 0;
        for (let j = 0; j < table.data.length; j++) {
          if (count >= colSize) {
            break;
          }
          if (table.data[j][s.colIdx] != null) {
            line.push(scales.lines[i][j]);
            count++;
          } else {
            lines.push(line);
            line = [];
          }
        }
        if (line.length > 0) {
          lines.push(line);
        }
      } else {
        lines.push(scales.lines[i]);
      }

      const drawConfidence = (upperLine: Line, bottomLine: Line) => {
        if (upperLine.length === 1 && bottomLine.length === 1) {
          ctx.circle(upperLine[0].x, upperLine[0].y, { color, radius: width });
          ctx.circle(bottomLine[0].x, bottomLine[0].y, {
            color,
            radius: width,
          });
          ctx.line([upperLine[0], bottomLine[0]], {
            color,
            width,
            opacity: this._confidenceOpacityCss,
          });
        } else {
          // ctx.line(lines[j], { color, width });
          ctx.line(upperLine, { color, width, opacity: 0.3 });
          ctx.line(bottomLine, { color, width, opacity: 0.3 });
          ctx.lineArea(upperLine, bottomLine, {
            color,
            width,
            opacity: this._confidenceOpacityCss,
          });
        }
      };

      // Confidence core.Tuple
      if (this._confidenceColumns && this._confidenceColumns.length > 0) {
        const colIndex = this._confidenceColumns[i];
        if (colIndex !== undefined) {
          const upperLine: Line = [];
          const bottomLine: Line = [];
          const colSize = table.meta[colIndex]?.size;
          for (let i = 0; i < colSize; i++) {
            const tableColIndex = scales.indexes?.[0].colIdx;
            const x = s.x.position(table.data[i][tableColIndex ?? 0]);
            const upperYDataPoint = (
              table.data[i][colIndex] as core.Tuple<number, number> | null
            )?.x;
            const bottomYDataPoint = (
              table.data[i][colIndex] as core.Tuple<number, number> | null
            )?.y;

            // Pushing Point while it is valid, until...
            if (upperYDataPoint != null && bottomYDataPoint != null) {
              upperLine.push({ x, y: s.position(upperYDataPoint) });
              bottomLine.push({ x, y: s.position(bottomYDataPoint) });
              // ... it is not valid, it should enclose the line if the prop this._withNullable is passed
            } else if (!this._withNullable) {
              drawConfidence(upperLine, bottomLine);
              // Reset line for next iteration, to start a new one
              upperLine.length = 0;
              bottomLine.length = 0;
            }
          }

          // Last confidence Line should be drawn
          drawConfidence(upperLine, bottomLine);
        }
      }

      for (let j = 0; j < lines.length; j++) {
        // drawing the line "above" the confidence interval (if any)
        if (lines[j].length === 1) {
          ctx.circle(lines[j][0].x, lines[j][0].y, { color, radius: width });
        } else if (this._kind === 'point') {
          ctx.circles(lines[j], { color, radius: 1 });
        } else {
          ctx[this._kind](lines[j], { color, width });
        }
      }
    });

    if (this._canvasOnly) {
      return;
    }

    this.xOffset = this.margin.left + Y_SCALE_WIDTH;
    if (scales.y.length === 1) {
      // Enforce the tick number and building its custom range
      // The domain can be either number[] or Date[], so ensure its type through the meta.type and cast it afterwards
      let min, max: number;
      const yScale = this._transform.rescaleY(scales.y[0]);
      if (scales.indexes[0].meta.type === core.Date._type) {
        const domainDate = yScale.domain() as Date[];
        min = domainDate[0].valueOf();
        max = domainDate[domainDate.length - 1].valueOf();
      } else {
        const domainNumber = yScale.domain() as number[];
        min = domainNumber[0];
        max = domainNumber[domainNumber.length - 1];
      }
      const customTicks = d3.range(min, max, Math.abs(max - min) / this._ticks);
      // 1 y-axis: left
      const leftAxis = d3
        .axisLeft(yScale as d3.AxisScale<number>)
        .tickValues(customTicks);
      if (this._showGrid) {
        ctx.ctx.save();
        ctx.ctx.globalAlpha = this._gridOpacityCss;
        // Looks like the typings definition of Scale is not compliant with what's actually
        // available, here we can retrieve the ticks domain values by calling "ticks" on the scale
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customTicks.map(leftAxis.scale()).forEach((y: number | undefined) => {
          ctx.line(
            [
              { x: 0, y: y ?? 0 },
              { x: ctx.width, y: y ?? 0 },
            ],
            {
              ...dashedLineGrid,
            }
          );
        });
        ctx.ctx.restore();
      }

      this._svg
        .append('g')
        .attr(
          'transform',
          `translate(${this.margin.left + Y_SCALE_WIDTH + INNER_PADDING}, ${
            this.margin.top
          })`
        )
        .call(leftAxis);
    } else if (scales.y.length === 2) {
      // 2 y-axis: left / right
      // Enforce the tick number and building its custom range
      // The domain can be either number[] or Date[], so ensure its type through the meta.type and cast it afterwards
      let leftMin, leftMax: number;
      const yScale0 = this._transform.rescaleY(scales.y[0]);
      if (scales.indexes[0].meta.type === core.Date._type) {
        const domainDate = yScale0.domain() as Date[];
        leftMin = domainDate[0].valueOf();
        leftMax = domainDate[domainDate.length - 1].valueOf();
      } else {
        const domainNumber = yScale0.domain() as number[];
        leftMin = domainNumber[0];
        leftMax = domainNumber[domainNumber.length - 1];
      }
      const leftDomainDifference = Math.abs(leftMax - leftMin);
      const customLeftTicks = d3.range(
        leftMin,
        leftMax,
        leftDomainDifference / this._ticks
      );
      const leftAxis = d3
        .axisLeft(yScale0 as d3.AxisScale<number | Date>)
        .tickValues(customLeftTicks);
      if (this._showGrid) {
        ctx.ctx.save();
        ctx.ctx.globalAlpha = this._gridOpacityCss;
        customLeftTicks
          .map(leftAxis.scale())
          .forEach((y: number | undefined) => {
            ctx.line(
              [
                { x: 0, y: y ?? 0 },
                { x: ctx.width, y: y ?? 0 },
              ],
              {
                ...dashedLineGrid,
              }
            );
          });
        ctx.ctx.restore();
      }
      this._svg
        .append('g')
        .attr(
          'transform',
          `translate(${this.margin.left + Y_SCALE_WIDTH + INNER_PADDING}, ${
            this.margin.top
          })`
        )
        .attr('color', this._colors[colorMappings[scales.series[0].colIdx]])
        .call(leftAxis);
      // right axis
      // Enforce the tick number and building its custom range
      // The domain can be either number[] or Date[], so ensure its type through the meta.type and cast it afterwards
      let rightMin, rightMax: number;
      const yScale1 = this._transform.rescaleY(scales.y[1]);
      if (scales.indexes[1].meta.type === core.Date._type) {
        const domainDate = yScale1.domain() as Date[];
        rightMin = domainDate[0].valueOf();
        rightMax = domainDate[domainDate.length - 1].valueOf();
      } else {
        const domainNumber = yScale1.domain() as number[];
        rightMin = domainNumber[0];
        rightMax = domainNumber[domainNumber.length - 1];
      }
      const rightDomainDifference = Math.abs(rightMax - rightMin);
      const customRightTicks = d3.range(
        rightMin,
        rightMax,
        rightDomainDifference / this._ticks
      );
      const rightAxis = d3
        .axisRight(yScale1 as d3.AxisScale<number | Date>)
        .tickValues(customRightTicks);
      if (this._showGrid) {
        ctx.ctx.save();
        ctx.ctx.globalAlpha = this._gridOpacityCss;
        // Looks like the typings definition of Scale is not compliant with what's actually
        // available, here we can retrieve the ticks domain values by calling "ticks" on the scale
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customRightTicks
          .map(rightAxis.scale())
          .forEach((y: number | undefined) => {
            ctx.line(
              [
                { x: 0, y: y ?? 0 },
                { x: ctx.width, y: y ?? 0 },
              ],
              {
                ...dashedLineGrid,
              }
            );
          });
        ctx.ctx.restore();
      }
      this._svg
        .append('g')
        .attr(
          'transform',
          `translate(${
            this.margin.left + Y_SCALE_WIDTH + ctx.width - INNER_PADDING
          }, ${this.margin.top})`
        )
        .attr('color', this._colors[colorMappings[scales.series[1].colIdx]])
        .call(rightAxis);
    } else {
      // more than 2 y-axis, stack them left
      for (let i = 0; i < scales.y.length; i++) {
        // Enforce the tick number and building its custom range
        // The domain can be either number[] or Date[], so ensure its type through the meta.type and cast it afterwards
        let min, max: number;
        const yScale = this._transform.rescaleY(scales.y[i]);
        if (scales.indexes[i].meta.type === core.Date._type) {
          const domainDate = yScale.domain() as Date[];
          min = domainDate[0].valueOf();
          max = domainDate[domainDate.length - 1].valueOf();
        } else {
          const domainNumber = yScale.domain() as number[];
          min = domainNumber[0];
          max = domainNumber[domainNumber.length - 1];
        }
        const domainDifference = Math.abs(max - min);
        const customTicks = d3.range(min, max, domainDifference / this._ticks);
        const axis = d3
          .axisLeft(yScale as d3.AxisScale<number | Date>)
          .tickValues(customTicks);
        if (i === scales.y.length - 1) {
          if (this._showGrid) {
            ctx.ctx.save();
            ctx.ctx.globalAlpha = this._gridOpacityCss;
            // Looks like the typings definition of Scale is not compliant with what's actually
            // available, here we can retrieve the ticks domain values by calling "ticks" on the scale
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            customTicks.map(axis.scale()).forEach((y: number | undefined) => {
              ctx.line(
                [
                  { x: 0, y: y ?? 0 },
                  { x: ctx.width, y: y ?? 0 },
                ],
                {
                  ...dashedLineGrid,
                }
              );
            });
            ctx.ctx.restore();
          }
        }
        this._svg
          .append('g')
          .attr(
            'transform',
            `translate(${
              this.margin.left + (i + 1) * Y_SCALE_WIDTH + INNER_PADDING
            }, ${this.margin.top})`
          )
          .attr('color', this._colors[colorMappings[scales.series[i].colIdx]])
          .call(axis);
      }
      this.xOffset = this.margin.left + scales.y.length * Y_SCALE_WIDTH;
    }

    // x-axis
    let xTicks = this._ticks;
    const availWidth = canvas.ctx.width - this.xOffset;
    if (scales.indexes[0].meta.type === core.Date._type) {
      if (availWidth <= 250) {
        xTicks = 1;
      } else if (availWidth <= 350) {
        xTicks = 2;
      } else if (availWidth <= 450) {
        xTicks = 3;
      } else if (availWidth <= 750) {
        xTicks = 4;
      }
    } else {
      if (availWidth <= 450) {
        xTicks = 2;
      }
    }

    // Enforce the tick number and building its custom range
    // The domain can be either number[] or Date[], so ensure its type through the meta.type and cast it afterwards
    let min, max: number;
    const xScale = this._transform.rescaleX(scales.x);
    if (scales.indexes[0].meta.type === core.Date._type) {
      const domainDate = xScale.domain() as Date[];
      min = domainDate[0].valueOf();
      max = domainDate[domainDate.length - 1].valueOf();
    } else {
      const domainNumber = xScale.domain() as number[];
      min = domainNumber[0];
      max = domainNumber[domainNumber.length - 1];
    }
    const domainDifference = Math.abs(max - min);
    const customTicks = d3.range(min, max, domainDifference / xTicks);
    const xAxis = d3
      .axisBottom(xScale as d3.AxisScale<number | Date>)
      .tickValues(customTicks);

    // format ticks according to meta type
    const dateFmt = this._dateFmt?.format ?? getGlobalDateTimeFormat().format;
    const numberFmt = this._numberFmt?.format ?? getGlobalNumberFormat().format;
    switch (scales.indexes[0].meta.type) {
      case core.Date._type:
      case core.time._type:
        xAxis.tickFormat(dateFmt);
        break;
      default:
        (xAxis as d3.Axis<number>).tickFormat(numberFmt);
        break;
    }

    if (scales.indexes[0].meta.type === core.Date._type) {
      xAxis.tickFormat(dateFmt);
    } else if (scales.indexes[0].meta.type === core.time._type) {
      const dayMs = 24 * 60 * 60 * 1000;
      const labelFormat = domainDifference > dayMs ? '%Y-%m-%d %H:%M' : '%H:%M';
      xAxis.tickFormat((v, i) => {
        return d3.timeFormat(i === 0 ? '%Y' : labelFormat)(new Date(v));
      });
    }

    this._svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.xOffset}, ${
          this._height -
          this.margin.bottom -
          (this._axisLabels ? X_LABEL_HEIGHT : 0) -
          INNER_PADDING
        })`
      )
      .call(xAxis);

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
        .attr('class', 'gui-x-axis-label')
        .append('text')
        .attr('x', `${this._width / 2}`)
        .attr('y', canvas.height + 50)
        .text(this._axisLabels[0])
        .attr('fill', 'currentColor');

      // y-axis label
      this._svg
        .append('g')
        .attr('class', 'gui-y-axis-label')
        .append('text')
        .attr('x', `-${this._height / 2}`)
        .attr('dy', 40)
        .attr('transform', 'rotate(-90)')
        .text(this._axisLabels[1])
        .attr('fill', 'currentColor');
    }
  }
}

/**
 * `detail` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 */
class LineChartZoomEvent extends CustomEvent<{ from: unknown; to: unknown }> {
  constructor(from: unknown, to: unknown) {
    super('zoom', { detail: { from, to }, bubbles: true });
  }
}

interface ColumnInfo {
  /**
   * column name
   */
  name: string;
  /**
   * `x` position in pixel in the canvas
   */
  x: number;
  /**
   * `y` position in pixel in the canvas
   */
  y: number;
  /**
   * column value
   */
  yValue: unknown;
  /**
   * the scale associated with this column
   */
  s: Serie;
}

interface CursorInfo {
  /**
   * `x` position in pixel in the canvas
   */
  x: number;
  /**
   * index column value
   */
  xValue: unknown;
  yColumns: ColumnInfo[];
}

declare global {
  interface Window {
    GuiLineChart: typeof GuiLineChart;
  }

  interface HTMLElementTagNameMap {
    'gui-line-chart': GuiLineChart;
  }

  interface HTMLElementEventMap {
    zoom: LineChartZoomEvent;
  }
}

if (!window.customElements.get('gui-line-chart')) {
  window.GuiLineChart = GuiLineChart;
  window.customElements.define('gui-line-chart', GuiLineChart);
}
