// import { core } from '@greycat/sdk';
// import './nodetime-brush';
// import { NodeTimeSelection } from './nodetime-brush';

// export class GuiNodeTimeChart extends HTMLElement {
//   readonly chartEl = document.createElement('gui-line-chart');
//   readonly brushEl = document.createElement('gui-nodetime-brush');

//   // private _width = 0;
//   // private _brushHeight = 100;
//   private _disposeResizer: () => void = () => void 0;

//   set series(series: core.nodeTime[]) {
//     this.brushEl.series = series;
//   }

//   get series() {
//     return this.brushEl.series;
//   }

//   /**
//    * Re-render the "main" chart with the given table data.
//    *
//    * This will not trigger a re-rendering of the brush.
//    *
//    * To re-render the brush, update the `series`.
//    */
//   set chartTable(table: core.Table) {
//     this.chartEl.table = table;
//     const nbYAxis = this.chartEl.scales?.y.length ?? 0;
//     if (nbYAxis === 2) {
//       this.brushEl.marginRight = 90;
//     } else {
//       this.brushEl.marginRight = 10;
//     }
//   }

//   set selection(selection: NodeTimeSelection | null) {
//     this.brushEl.selection = selection;
//   }

//   get selection() {
//     return this.brushEl.selection;
//   }

//   get mode() {
//     return this.brushEl.mode;
//   }

//   set mode(mode: core.SamplingMode) {
//     this.brushEl.mode = mode;
//   }

//   /**
//    * This is the brush's max rows
//    */
//   get maxRows() {
//     return this.brushEl.maxRows;
//   }

//   set maxRows(maxRows: number) {
//     this.brushEl.maxRows = maxRows;
//   }

//   /**
//    * This is the brush's timezone
//    */
//   get tz() {
//     return this.brushEl.tz;
//   }

//   set tz(tz: core.TimeZone | null) {
//     this.brushEl.tz = tz;
//   }

//   set headers(headers: string[] | null) {
//     this.chartEl.headers = headers ?? [];
//   }

//   connectedCallback() {
//     this.style.display = 'block';
//     this.style.height = '100%';
//     this.style.width = '100%';

//     const brushHeight = 100;
//     const { width, height } = this.getBoundingClientRect();

//     const cc = document.createElement('div');
//     cc.style.width = `${width}px`;
//     cc.style.height = `${height - brushHeight}px`;
//     cc.appendChild(this.chartEl);

//     const bc = document.createElement('div');
//     bc.style.width = `${width}px`;
//     bc.style.height = `${brushHeight}px`;
//     bc.appendChild(this.brushEl);

//     this.append(cc, bc);

//     const oResize = new ResizeObserver(() => {
//       const { width, height } = this.getBoundingClientRect();

//       // update chart
//       cc.style.width = `${width}px`;
//       cc.style.height = `${height - brushHeight}px`;
//       // update brush
//       bc.style.width = `${width}px`;
//       bc.style.height = `${brushHeight}px`;
//     });
//     oResize.observe(this);
//     this._disposeResizer = () => oResize.disconnect();
//   }

//   disconnectedCallback() {
//     this._disposeResizer();
//   }
// }

// if (!window.customElements.get('gui-nodetime-chart')) {
//   window.GuiNodeTimeChart = GuiNodeTimeChart;
//   window.customElements.define('gui-nodetime-chart', GuiNodeTimeChart);
// }

// declare global {
//   interface Window {
//     GuiNodeTimeChart: typeof GuiNodeTimeChart;
//   }
//   interface HTMLElementTagNameMap {
//     'gui-nodetime-chart': GuiNodeTimeChart;
//   }
// }
