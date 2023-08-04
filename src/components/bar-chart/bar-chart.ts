// import { core } from '@greycat/sdk';
// import * as d3 from 'd3';
// import { getColors } from '../../utils';

// const DEFAULT_X_AXIS = 0;
// const DEFAULT_OUTER_WIDTH = 800;
// const DEFAULT_OUTER_HEIGHT = 600;

// interface Margins {
//   ml: number;
//   mt: number;
//   mr: number;
//   mb: number;
// }

// /**
//  * Displays a bar chart based on a given `core.Table`
//  */
// export class GuiBarChart extends HTMLElement {
//   // General variables
//   private _table: core.Table | null = null;
//   private _legend?: HTMLDivElement;
//   private _container?: HTMLDivElement;
//   private _context?: CanvasRenderingContext2D | null;
//   private _resizeObserver: ResizeObserver | null = null;
//   private _connected = false;

//   // Props
//   private _columns: number[] = [];
//   private _columnGroups: (number | number[])[] | null = null;
//   private _xAxisColumn = DEFAULT_X_AXIS;
//   private _title: string | null = null;
//   private _stacked = false;
//   private _showLegend = false;
//   private _colors: string[] = ['black'];
//   private _xAxisText: string | null = null;
//   private _yAxisText: string | null = null;
//   private _legendLabels: string[] = [];

//   // Dimensions variables
//   private _margins: Margins = { mt: 20, mr: 15, mb: 30, ml: 50 };
//   private _width: number = DEFAULT_OUTER_WIDTH - this._margins.ml - this._margins.mr;
//   private _height: number = DEFAULT_OUTER_HEIGHT - this._margins.mt - this._margins.mb;

//   // D3 chart variables
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   private _xAxis: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   private _yAxis: any;
//   private _canvas: d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null = null;
//   private _svgWrapper: d3.Selection<d3.BaseType, unknown, null, undefined> | null = null;
//   private _svgRoot: d3.Selection<SVGGElement, unknown, null, undefined> | null = null;
//   private _svgXAxis: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;
//   private _svgYAxis: d3.Selection<SVGGElement, unknown, null, undefined> | undefined;
//   private _chartTitle?: d3.Selection<SVGTextElement, unknown, null, undefined>;
//   private _svgXAxisText: d3.Selection<SVGTextElement, unknown, null, undefined> | undefined;
//   private _svgYAxisText: d3.Selection<SVGTextElement, unknown, null, undefined> | undefined;

//   // ***** Component added to the DOM *****
//   connectedCallback() {
//     this.innerHTML = '';

//     this._colors = getColors(this);

//     // create legend element
//     this._legend = document.createElement('div');
//     this._legend.style.display = 'flex';
//     this._legend.style.alignItems = 'center';

//     // create container element
//     this._container = document.createElement('div');

//     // get d3 container selection and add root elements
//     const container = d3.select(this._container);
//     this._canvas = container.append('canvas');
//     this._svgWrapper = container.append('svg:svg');
//     this._svgRoot = this._svgWrapper.append('g');
//     this._svgXAxis = this._svgRoot?.append('g').attr('class', 'chart-axis');
//     this._svgYAxis = this._svgRoot?.append('g').attr('class', 'chart-axis');
//     this._chartTitle = this._svgRoot?.append('text');
//     this._svgXAxisText = this._svgRoot?.append('text');
//     this._svgYAxisText = this._svgRoot?.append('text');

//     // set context
//     this._context = this._canvas?.node()?.getContext('2d');

//     // set resize observer
//     this._resizeObserver = new ResizeObserver(() => this._handleResize());
//     this._resizeObserver.observe(this._container);

//     // append elements to component
//     this.appendChild(this._container);
//     if (this.showLegend) {
//       this.appendChild(this._legend);
//     }

//     if (this._legend && this.showLegend) {
//       // draw legends
//       this._drawLegends(this._legend);
//     }

//     // update sizes
//     this._connected = true;
//     this._handleResize();
//   }

//   // ***** Component removed from the DOM *****
//   disconnectedCallback() {
//     if (this._container) {
//       this._resizeObserver?.unobserve(this._container);
//     }
//   }

//   private _handleResize() {
//     if (this._connected) {
//       this._drawChart();
//       this.render();
//     }
//   }

//   // ***** Getters and Setters *****
//   // core table
//   get table(): core.Table | null {
//     return this._table;
//   }

//   set table(table: core.Table | null) {
//     this._table = table;
//     this.render();
//   }

//   // columns
//   get columns(): number[] {
//     return this._columns;
//   }

//   set columns(columns: number[]) {
//     this._columns = columns;
//     if (this._legend) {
//       this._drawLegends(this._legend);
//     }
//     this.render();
//   }

//   // columns groups
//   get columnGroups(): (number | number[])[] | null {
//     return this._columnGroups;
//   }

//   set columnGroups(groups: (number | number[])[] | null) {
//     this._columnGroups = groups;
//     if (this._legend) {
//       this._drawLegends(this._legend);
//     }
//     this.render();
//   }

//   // x axis column
//   get xAxisColumn(): number {
//     return this._xAxisColumn;
//   }

//   set xAxisColumn(column: number) {
//     this._xAxisColumn = isNaN(column) ? DEFAULT_X_AXIS : column;
//     this.render();
//   }

//   // title
//   override get title(): string {
//     return this._title ?? '';
//   }

//   override set title(title: string | null) {
//     this._title = title;
//     this._drawChart();
//     this.render();
//   }

//   // stacked
//   get stacked(): boolean {
//     return this._stacked;
//   }

//   set stacked(stacked: boolean) {
//     this._stacked = stacked;
//     this.render();
//   }

//   // show legend boolean
//   get showLegend(): boolean {
//     return this._showLegend;
//   }

//   set showLegend(showLegend: boolean) {
//     this._showLegend = showLegend;
//     if (this._legend) {
//       showLegend ? this.appendChild(this._legend) : this.removeChild(this._legend);
//     }
//     this.render();
//   }

//   // x axis text
//   get xAxisText() {
//     return this._xAxisText ?? '';
//   }

//   set xAxisText(text: string | null) {
//     this._xAxisText = text;
//     this._drawChart();
//     this.render();
//   }

//   // y axis text
//   get yAxisText() {
//     return this._yAxisText ?? '';
//   }

//   set yAxisText(text: string | null) {
//     this._yAxisText = text;
//     this._drawChart();
//     this.render();
//   }

//   get legendLabels() {
//     return this._legendLabels;
//   }

//   set legendLables(labels: string[]) {
//     this._legendLabels = labels;
//     if (this._legend) {
//       this._drawLegends(this._legend);
//     }
//     this.render();
//   }

//   // ***** Drawers *****
//   // draw legends based on columns selected
//   private _drawLegends(legend: HTMLDivElement) {
//     legend.innerHTML = '';
//     this._columns.forEach((col, idx) =>
//       this._drawLegendItem(
//         idx < this._legendLabels.length ? this.legendLabels[idx] : String(col),
//         this._colors[idx % this._colors.length],
//       ),
//     );
//   }

//   // draw a legend item
//   private _drawLegendItem(label: string, color: string) {
//     const item = document.createElement('div');
//     item.style.display = 'flex';
//     item.style.alignItems = 'center';

//     const square = document.createElement('div');
//     square.style.width = '12px';
//     square.style.height = '12px';
//     square.style.marginLeft = '5px';
//     square.style.backgroundColor = color;
//     item.appendChild(square);

//     const text = document.createElement('p');
//     text.style.margin = '0 5px';
//     text.textContent = label;
//     item.appendChild(text);

//     this._legend?.appendChild(item);
//   }

//   // draw bar chart
//   private _drawChart() {
//     if (!this._container) {
//       return;
//     }

//     // recalculate chart dimensions
//     const legendHeight = this._legend && this.showLegend ? this._legend.clientHeight : 0;
//     this._container.style.width = '100%';
//     this._container.style.height = `calc(100% - ${legendHeight}px)`;
//     const width = this._container.clientWidth - this._margins.ml - this._margins.mr;
//     const height = this._container.clientHeight - this._margins.mt - this._margins.mb;

//     // if width or height was changed, update svg and canvas dimensions
//     if (width !== this._width || height !== this._height) {
//       this._width = width;
//       this._height = height;

//       // add svg element
//       this._drawSvgElement(this._container.clientWidth, this._container.clientHeight);

//       if (this._legend) {
//         // adjust legend margins in the case that they changed
//         this._legend.style.marginLeft = this._margins.ml + 'px';
//         this._legend.style.marginRight = this._margins.mr + 'px';
//       }

//       // update canvas drawing with new width and height
//       this._drawCanvas(width, height);

//       // add xAxis and yAxis intervals
//       this._xAxis = d3.scaleBand().rangeRound([0, width]).padding(0.1);
//       this._yAxis = d3.scaleLinear().range([height, 0]).nice();
//     }

//     // update svg axes
//     this._drawAxes(width, height);

//     // update chart title
//     this._drawTitle(width);
//   }

//   // draw svg
//   private _drawSvgElement(width: number, height: number) {
//     this._svgWrapper
//       ?.attr('width', width)
//       .attr('height', height)
//       .attr('class', 'svg-plot')
//       .style('position', 'absolute');

//     this._svgRoot?.attr('transform', `translate(${this._margins.ml}, ${this._margins.mt})`);
//   }

//   // draw axes
//   private _drawAxes(width: number, height: number) {
//     if (this._xAxisText) {
//       this._svgXAxisText
//         ?.attr('x', `${width / 2}`)
//         .attr('y', `${height + 43}`) // 43 = x-axis label height
//         .attr('display', 'block')
//         .attr('text-anchor', 'middle')
//         .text(this._xAxisText);
//     } else {
//       this._svgXAxisText?.attr('display', 'none');
//     }

//     if (this._yAxisText) {
//       this._svgYAxisText
//         ?.attr('x', `-${height / 2}`)
//         .attr('dy', '-3.5em')
//         .attr('display', 'block')
//         .attr('transform', 'rotate(-90)')
//         .attr('text-anchor', 'middle')
//         .text(this._yAxisText);
//     } else {
//       this._svgYAxisText?.attr('display', 'none');
//     }
//   }

//   // draw canvas
//   private _drawCanvas(width: number, height: number) {
//     this._canvas
//       ?.attr('width', width)
//       .attr('height', height)
//       .style('position', 'absolute')
//       .style('margin-left', this._margins.ml + 'px')
//       .style('margin-top', this._margins.mt + 'px')
//       .attr('class', 'canvas-plot');
//   }

//   // draw title
//   private _drawTitle(width: number) {
//     if (this._title) {
//       this._chartTitle
//         ?.attr('x', width / 2)
//         .attr('y', 0 - this._margins.mt / 4)
//         .attr('display', 'block')
//         .attr('text-anchor', 'middle')
//         .attr('class', 'chart-title')
//         .text(this._title);
//     } else {
//       this._chartTitle?.attr('display', 'none');
//     }
//   }

//   // draw bar element into canvas
//   private _drawBarPoint(point: unknown[], context: CanvasRenderingContext2D) {
//     context.beginPath();
//     const xBandWidth = this._xAxis.bandwidth();

//     if (this._stacked) {
//       this._drawStackedPoint(point, xBandWidth, context);
//     } else {
//       this._drawGroupedPoint(point, xBandWidth, context);
//     }
//   }

//   // draw stacked bar element into canvas
//   private _drawStackedPoint(point: unknown[], xBandWidth: number, ctx: CanvasRenderingContext2D) {
//     const xCoord = this._xAxis(point[0]);
//     this._drawStackedBar(xCoord, point, 1, false, xBandWidth, ctx);
//   }

//   // draw grouped bar element into canvas
//   private _drawGroupedPoint(
//     point: unknown[],
//     xBandWidth: number,
//     context: CanvasRenderingContext2D,
//   ) {
//     if (this._columnGroups) {
//       const nDataColumns = this._columnGroups.length;
//       this._columnGroups.forEach((group, groupIdx) => {
//         if (typeof group === 'number') {
//           this._drawGroupBar(point[0], point[group], group, nDataColumns, xBandWidth, context);
//         } else {
//           const xCoord = this._xAxis(point[0]) + (groupIdx * xBandWidth) / nDataColumns;
//           const groupArr = group as number[];
//           this._drawStackedBar(
//             xCoord,
//             point.filter((_, idx) => idx === 0 || groupArr.includes(idx)),
//             nDataColumns,
//             true,
//             xBandWidth,
//             context,
//             groupArr.map((col) => Number(col) - 1),
//           );
//         }
//       });
//     } else {
//       for (let i = 1; i < point.length; i++) {
//         this._drawGroupBar(point[0], point[i], i, this._columns.length, xBandWidth, context);
//       }
//     }
//   }

//   private _drawStackedBar(
//     xCoord: number,
//     columns: unknown[],
//     size: number,
//     isGroup: boolean,
//     xBandWidth: number,
//     context: CanvasRenderingContext2D,
//     groupColumnsIdx?: number[],
//   ) {
//     let previous = 0;

//     let total = 0;
//     for (let i = 1; i < columns.length; i++) {
//       const height = this._height - this._yAxis(columns[i]);
//       const value = columns[i];
//       total += Number(columns[i]);

//       if (!isGroup) {
//         // draw internal label
//         context.fillStyle = this._colors[(i - 1) % this._colors.length];
//         if (height >= 8) {
//           // text will fit inside
//           const textWidth = context.measureText(String(columns[i])).width;
//           this._drawBarTotalLabel(
//             String(columns[i]),
//             xCoord + xBandWidth / 2 - textWidth / 2,
//             this._yAxis(Number(columns[i]) / 2 + previous - 8), // 8px == height of the text
//             xBandWidth,
//             context,
//           );
//         }
//       }

//       // draw bar
//       context.fillStyle =
//         this._colors[(groupColumnsIdx ? groupColumnsIdx[i - 1] : i - 1) % this._colors.length];
//       context.fillRect(xCoord, this._yAxis(Number(value) + previous), xBandWidth / size, height);

//       previous += Number(value);
//     }

//     // draw total label
//     const textWidth = context.measureText(String(total)).width;
//     this._drawBarTotalLabel(
//       String(total),
//       xCoord + xBandWidth / size / 2 - textWidth / 2,
//       this._yAxis(previous) - 5,
//       xBandWidth / size,
//       context,
//     );
//   }

//   private _drawGroupBar(
//     xAxisValue: unknown,
//     value: unknown,
//     pos: number,
//     size: number,
//     xBandWidth: number,
//     context: CanvasRenderingContext2D,
//   ) {
//     const xCoord = this._xAxis(xAxisValue) + ((pos - 1) * xBandWidth) / size;
//     const yCoord = this._yAxis(value);

//     // draw bar
//     context.fillStyle = this._colors[(pos - 1) % this._colors.length];
//     context.fillRect(xCoord, yCoord, xBandWidth / size, this._height - yCoord);

//     // draw top label
//     context.fillStyle = this._colors[(pos - 1) % this._colors.length];
//     const textWidth = context.measureText(String(value)).width;
//     this._drawBarTotalLabel(
//       String(value),
//       xCoord + xBandWidth / size / 2 - textWidth / 2,
//       yCoord - 5,
//       xBandWidth / size,
//       context,
//     );
//   }

//   // draw a total label in a specific position
//   private _drawBarTotalLabel(
//     value: string,
//     xPos: number,
//     yPos: number,
//     maxWidth: number,
//     context: CanvasRenderingContext2D,
//   ) {
//     context.fillText(value, xPos, yPos, maxWidth);
//   }

//   // get max value from meta information
//   private _getMax() {
//     let max = 0;
//     if (this._columnGroups) {
//       this._columnGroups.forEach((group) => {
//         if (typeof group === 'number') {
//           const col = this._table?.meta[group];
//           if (col && col.max > max) {
//             max = col.max;
//           }
//         } else {
//           let localMax = 0;
//           group.forEach((tableIdx) => {
//             const col = this._table?.meta[tableIdx];
//             if (col && col.max && !isNaN(col.max)) {
//               localMax += col.max;
//             }
//           });
//           if (localMax > max) {
//             max = localMax;
//           }
//         }
//       });
//     } else {
//       this._table?.meta.forEach((col) => {
//         if (this._stacked) {
//           if (col.max && !isNaN(col.max)) {
//             max += col.max;
//           }
//         } else {
//           if (col.max > max) {
//             max = col.max;
//           }
//         }
//       });
//     }
//     return max;
//   }

//   // render content
//   render() {
//     if (this._xAxis && this._yAxis && this._context && this._table) {
//       const ctx = this._context;
//       const data = this._table.data.map((row) => {
//         // [x, y]
//         const columnsAsNumber = this._columns.map((col) => Number(row[col]));
//         return [row[this._xAxisColumn], ...columnsAsNumber];
//       });

//       // xAxis and yAxis domains will be calculated based on type
//       this._xAxis.domain(data.map((v) => v[0]));
//       const maxY = this._getMax();
//       this._yAxis.domain([0, maxY + maxY * 0.1]);

//       const xAxis = d3.axisBottom(this._xAxis);
//       const yAxis = d3.axisLeft(this._yAxis);

//       this._svgXAxis?.attr('transform', `translate(0, ${this._height})`).call(xAxis);
//       this._svgYAxis?.call(yAxis);

//       ctx.clearRect(0, 0, this._width, this._height);
//       data.forEach((point) => this._drawBarPoint(point, ctx));
//     }
//   }
// }

// declare global {
//   interface Window {
//     GuiBarChart: typeof GuiBarChart;
//   }

//   interface HTMLElementTagNameMap {
//     'gui-bar-chart': GuiBarChart;
//   }

//   namespace JSX {
//     interface IntrinsicElements {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       'gui-bar-chart': any;
//     }
//   }
// }

// if (!window.customElements.get('gui-bar-chart')) {
//   window.GuiBarChart = GuiBarChart;
//   window.customElements.define('gui-bar-chart', GuiBarChart);
// }
