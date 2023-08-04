// import { core } from '@greycat/sdk';
// import * as d3 from 'd3';
// import { Bar, Canvas, Line, Point, Rect, SimpleTooltip } from '../../chart-utils';
// import { getGlobalNumberFormat } from '../../globals';
// import { emptyDataElement, getCSSVars, processCssVars } from '../../utils';

// const MARGINS = { top: 20, right: 70, bottom: 60, left: 70 };
// const RECT_WIDTH = 10;
// const DEFAULT_AXIS_LABEL = ['x-Axis', 'y-Axis', 'z-Axis'];
// const PADDING = 2;
// const INNER_PADDING = 4;

// export interface HistogramChartProps {
//   table: core.Table | null;
//   columns: number[];
//   axisLabel: string[];
//   hideCumulative: boolean;
// }

// /**
//  * Display an histogram chart based on a given `core.Table`
//  */
// export class GuiHistogramChart extends HTMLElement {
//   private _svg?: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;
//   private _canvas?: Canvas;
//   private _xAxis: d3.ScaleLogarithmic<number, number> | d3.ScaleLinear<number, number>;
//   private _yAxis: d3.ScaleLinear<number, number, never>;
//   private _zAxis: d3.ScaleLinear<number, number, never>;
//   private _table: core.Table | null = null;
//   private _width = 0;
//   private _height = 0;
//   private _axisLabel = DEFAULT_AXIS_LABEL;
//   private _resizeObserver?: ResizeObserver;
//   private _columns: number[] = [3, 3];
//   private _cursorInfo?: CursorInfo;
//   private _cursor: { x: number; y: number } = { x: 0, y: 0 };
//   private _hover = false;
//   private _tooltip?: SimpleTooltip;
//   private _hideCumulative = false;

//   // CSS Vars
//   private _barColorCss = 'black';
//   private _lineColorCss = 'red';
//   private _tooltipDasharrayCss = [4, 4];

//   constructor() {
//     super();

//     this._xAxis = d3.scaleLinear();
//     this._yAxis = d3.scaleLinear();
//     this._zAxis = d3.scaleLinear();
//   }

//   get table(): core.Table | null {
//     return this._table;
//   }

//   set table(table: core.Table | null) {
//     this._table = table;
//     this.render();
//   }

//   get axisLabel() {
//     return this._axisLabel;
//   }
//   set axisLabel(axisLabel: string[]) {
//     this._axisLabel = axisLabel;
//   }

//   get columns() {
//     return this._columns;
//   }
//   set columns(columns: number[]) {
//     this._columns = columns;
//   }

//   get hideCumulative() {
//     return this._hideCumulative;
//   }
//   set hideCumulative(hideCumulative: boolean) {
//     this._hideCumulative = hideCumulative;
//     this.render();
//   }

//   setAttrs({
//     table = this._table,
//     columns = this._columns,
//     axisLabel = this._axisLabel,
//     hideCumulative = this._hideCumulative,
//   }: Partial<HistogramChartProps>) {
//     this._table = table;
//     this._columns = columns;
//     this._axisLabel = axisLabel;
//     this._hideCumulative = hideCumulative;
//     this.render();
//   }

//   connectedCallback() {
//     this.style.position = 'relative';
//     this.style.display = 'block';
//     this.style.width = '100%';
//     this.style.height = '100%';

//     const cssVars = getCSSVars(
//       this,
//       'histogram-bar-color',
//       'histogram-line-color',
//       'histogram-tooltip-dasharray',
//     );
//     processCssVars(this, cssVars);

//     this._resizeObserver = new ResizeObserver(() => this._initialize());
//     this._resizeObserver.observe(this);
//   }

//   disconnectedCallback() {
//     this._resizeObserver?.disconnect();
//     this._canvas?.dispose();
//   }

//   private _initialize() {
//     // cleanup previous state
//     this.innerHTML = '';
//     this._canvas?.dispose();

//     const { width, height } = this.getBoundingClientRect();
//     this._width = width;
//     this._height = height;

//     this._svg = d3
//       .select(this)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .attr('class', 'svg-plot')
//       .append('g')
//       .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

//     this._tooltip = new SimpleTooltip();

//     const formatter = getGlobalNumberFormat();

//     const onHover = () => {
//       if (!this._hover) {
//         // clear hover canvas
//         canvas.clearHoverAndHideTooltip();
//         // do not re-enqueue
//         return;
//       }

//       const table = this._table;

//       if (!table) {
//         // re-enqueue hover animation
//         return requestAnimationFrame(onHover);
//       }

//       const ctx = canvas.hoverCtx;
//       if (!ctx) {
//         return;
//       }
//       ctx.clear();

//       // update
//       const bisector = d3.bisector<Point, number>(({ x }) => x);

//       let zCumul = 0;
//       const cumuls: number[][] = [[0, 0]];
//       const line: Line = table.data.map((point, idx) => {
//         const x = this._xAxis(Number(point[0]));
//         const x2 = this._xAxis(Number(point[1]));
//         zCumul += Number(point[this._columns[1]]);
//         const z = this._zAxis(zCumul);
//         cumuls.push([(cumuls[idx][0] += Number(point[2])), (cumuls[idx][1] += Number(point[3]))]);
//         return { x: (x + x2) / 2, y: z };
//       });

//       // compute cursor infos
//       const nearestX = bisector.center(line, this._cursor.x);
//       if (nearestX > table.data.length) {
//         return requestAnimationFrame(onHover);
//       }
//       const data = table.data[nearestX] as number[];
//       this._cursorInfo = {
//         x: line[nearestX].x,
//         count: data[2],
//         percentage: data[3],
//         xRange: [data[0], data[1]],
//         countCumul: cumuls[nearestX][0],
//         percentageCumul: cumuls[nearestX][1],
//       };

//       // x line
//       const tooltipX = this._cursor.x;
//       const tooltipY = ctx.height < this._cursor.y ? ctx.height : this._cursor.y;
//       ctx.ctx.save();
//       const x = Math.round(this._cursorInfo.x);
//       ctx.line(
//         [
//           { x, y: 0 },
//           { x, y: ctx.height },
//         ],
//         {
//           color: 'gray',
//           width: 1,
//           dashed: this._tooltipDasharrayCss,
//         },
//       );
//       ctx.ctx.restore();

//       if (this._tooltip) {
//         this._tooltip.updateHeader({
//           value: `${formatter.format(this._cursorInfo.xRange[0])} - ${formatter.format(
//             this._cursorInfo.xRange[1],
//           )}`,
//         });
//         this._tooltip.updateRows([
//           {
//             key: 'Percentage',
//             value: {
//               value: this._cursorInfo.percentage,
//             },
//             extra: '%',
//           },
//           {
//             key: 'Percentage Cumul',
//             value: {
//               value: this._cursorInfo.percentageCumul,
//             },
//             extra: '%',
//           },
//           {
//             key: 'Count',
//             value: {
//               value: this._cursorInfo.count,
//             },
//           },
//           {
//             key: 'Count Cumul',
//             value: {
//               value: this._cursorInfo.countCumul,
//             },
//           },
//         ]);
//         canvas.moveTooltip(tooltipX, tooltipY);
//       }

//       return requestAnimationFrame(onHover);
//     };

//     const canvas = (this._canvas = new Canvas(
//       this._width - MARGINS.left - MARGINS.right,
//       this._height - MARGINS.top - MARGINS.bottom,
//       this._tooltip,
//       {
//         enter: () => {
//           this._hover = true;
//           requestAnimationFrame(onHover);
//         },
//         move: (cursor) => {
//           this._cursor = cursor;
//         },
//         leave: () => {
//           this._hover = false;
//         },
//       },
//     ));
//     this._canvas.root.style.top = `${MARGINS.top + INNER_PADDING}px`;
//     this._canvas.root.style.left = `${MARGINS.left}px`;
//     this._canvas.root.style.position = 'absolute';
//     this.appendChild(this._canvas.root);

//     this.render();
//   }

//   render() {
//     const canvas = this._canvas;
//     const table = this._table;
//     const svg = this._svg;
//     if (!canvas || !table || !svg) {
//       return;
//     }

//     svg.selectChildren().remove();
//     this.querySelectorAll('.gui-histogram-incomplete').forEach((n) => n.remove());

//     if (table.data.length <= 0) {
//       this._canvas?.ctx.clear();
//       const incompleteTableEl = emptyDataElement('gui-histogram-incomplete');
//       this.appendChild(incompleteTableEl);
//       return;
//     }

//     svg
//       .select('svg')
//       .attr('width', this._width)
//       .attr('height', this._height)
//       .append('g')
//       .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

//     const width = this._width - MARGINS.left - MARGINS.right;
//     const height = this._height - MARGINS.top - MARGINS.bottom;

//     canvas.resize(width, height + INNER_PADDING);

//     this._xAxis.rangeRound([0, width]);
//     this._yAxis.range([height, 0]).nice();
//     this._zAxis.range([height, 0]).nice();

//     svg
//       .append('text')
//       .attr('x', `-${height / 2}`)
//       .attr('dy', '-3.5em')
//       .attr('transform', 'rotate(-90)')
//       .attr('text-anchor', 'middle')
//       .attr('fill', 'currentColor')
//       .text(this._axisLabel[1]);

//     svg
//       .append('text')
//       .attr('x', `${width / 2}`)
//       .attr('y', `${height + 40}`)
//       .attr('text-anchor', 'middle')
//       .attr('fill', 'currentColor')
//       .text(this._axisLabel[0]);

//     if (!this._hideCumulative) {
//       svg
//         .append('text')
//         .attr('x', `-${height / 2}`)
//         .attr('y', `${width + 60}`)
//         .attr('transform', 'rotate(-90)')
//         .attr('text-anchor', 'middle')
//         .attr('fill', 'currentColor')
//         .text(this._axisLabel[2]);
//     }

//     const extent = d3.extent<number>([
//       table.meta[0].min,
//       table.meta[0].max,
//       table.meta[1].min,
//       table.meta[1].max,
//     ]);

//     canvas.ctx.clear();
//     this._xAxis.domain([extent[0] ?? 0, extent[1] ?? 1]);
//     const zSum = d3.sum(table.data.map<number>((v) => Number(v[this._columns[1]])) ?? []);
//     this._yAxis.domain([0, table.meta[this._columns[0]].max]);
//     this._zAxis.domain([0, zSum]);
//     const xAxis = d3.axisBottom(this._xAxis);
//     const yAxis = d3.axisLeft(this._yAxis);
//     svg
//       .append('g')
//       .attr('transform', `translate(0, ${height + INNER_PADDING})`)
//       .call(xAxis);
//     svg.append('g').attr('transform', `translate(0, ${INNER_PADDING})`).call(yAxis);

//     if (!this._hideCumulative) {
//       const zAxis = d3.axisRight(this._zAxis);
//       svg.append('g').attr('transform', `translate(${width}, ${INNER_PADDING})`).call(zAxis);
//     }

//     const bar: Bar[] = [];
//     const line: Line = [];
//     const rect: Rect[] = [];
//     let zCumul = 0;
//     table.data.forEach((point) => {
//       const x = this._xAxis(Number(point[0]));
//       const x2 = this._xAxis(Number(point[1]));

//       const percentage = Number(point[this._columns[0]]);
//       const y = this._yAxis(percentage);
//       zCumul += percentage;
//       const z = this._zAxis(zCumul);

//       if (this._hideCumulative !== true) {
//         line.push({ x: (x + x2) / 2, y: z + INNER_PADDING });
//         rect.push({
//           x: (x + x2) / 2 - RECT_WIDTH / 2,
//           y: z - RECT_WIDTH / 2 + INNER_PADDING,
//         });
//       }

//       bar.push({ x: x + PADDING, y: y, w: x2 - x - PADDING });
//     });

//     // draw bar
//     canvas.ctx.bar(bar, {
//       color: this._barColorCss,
//       width: 0,
//     });

//     if (!this._hideCumulative) {
//       // draw line
//       canvas.ctx.line(line, { color: this._lineColorCss, width: 1 });

//       // drawRect
//       canvas.ctx.rects(rect, {
//         color: this._lineColorCss,
//         width: RECT_WIDTH,
//         height: RECT_WIDTH,
//       });
//     }
//   }
// }

// interface CursorInfo {
//   /**
//    * `x` position in pixel in the canvas
//    */
//   x: number;
//   /**
//    * Info
//    */
//   xRange: [number, number];
//   count: number;
//   percentage: number;
//   percentageCumul: number;
//   countCumul: number;
// }

// declare global {
//   interface Window {
//     GuiHistogramChart: typeof GuiHistogramChart;
//     /**
//      * @deprecated use `GuiHistogramChart` instead
//      */
//     HistogramChart: typeof GuiHistogramChart;
//   }

//   interface HTMLElementTagNameMap {
//     'gui-histogram-chart': GuiHistogramChart;
//   }

//   namespace JSX {
//     interface IntrinsicElements {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       'gui-histogram-chart': any;
//     }
//   }
// }

// if (!window.customElements.get('gui-histogram-chart')) {
//   window.HistogramChart = GuiHistogramChart;
//   window.GuiHistogramChart = GuiHistogramChart;
//   window.customElements.define('gui-histogram-chart', GuiHistogramChart);
// }
