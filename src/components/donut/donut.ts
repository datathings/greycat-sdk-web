import { core } from '@greycat/sdk';
import * as d3 from 'd3';
import { getColors } from '../../utils.js';

const DEFAULT_SIZE = { height: 450, width: 450 };
const MARGIN = 5;
const OUTARCMULT = 0.75;
const BREAKARCMULT = 0.85;
const AFTERBREAKMULT = 0.05;
const LABELTEXTMULT = 0.05;

type DonutTable = core.Table | Map<string, number | bigint>;

interface GuiDoughnutProps {
  /** @deprecated use `value` instead */
  table: DonutTable | null;
  value: DonutTable | null;
  dataColumn: number;
  labelColumn?: number;
  defaultInfoRow?: number;
  // width: number;
  thickness?: number;
  radius?: number;
  rotation?: number;
  colors: string[];
  withLabels: boolean;
  withInfo: boolean;
  withLabelInfo: boolean;
  name?: string;
}

/**
 * Displays a given `core.Table` into a doughnut chart
 */
export class GuiDonut extends HTMLElement implements GuiDoughnutProps {
  private _table: DonutTable | null = null;
  private _dataColumn = 1;
  private _labelColumn = 0;
  private _defaultInfoRow?: number;
  private _width = DEFAULT_SIZE.width;
  private _height = DEFAULT_SIZE.height;
  private _thickness?: number;
  private _radius?: number;
  private _rotation?: number;
  private _colors: string[] = ['black'];
  private _withLabels = false;
  private _withInfo = false;
  private _withLabelInfo = false;
  private _name?: string;

  private _container?: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private _info?: HTMLDivElement;
  private _svgWrapper: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private _svg: d3.Selection<SVGGElement, unknown, null, undefined> | null = null;
  private _resizeObserver?: ResizeObserver;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _pie = d3
    .pie()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .value((d: any) => d)
    .sort(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _arc = d3.arc<any>();
  private _line = d3.line();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _outerArc = d3.arc<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _breakArc = d3.arc<any>();

  get table(): DonutTable | null {
    return this._table;
  }

  /**
   * @deprecated use `value` instead
   */
  set table(table: DonutTable | null) {
    this.value = table;
  }

  set value(value: DonutTable | null) {
    this._table = value;
    this._drawDoughnut();
  }

  get dataColumn(): number {
    return this._dataColumn;
  }

  set dataColumn(column: number) {
    this._dataColumn = column;
    this._drawDoughnut();
  }

  get labelColumn(): number {
    return this._labelColumn;
  }

  set labelColumn(column: number) {
    this._labelColumn = column;
    this._drawDoughnut();
  }

  get defaultInfoRow(): number | undefined {
    return this._defaultInfoRow;
  }

  set defaultInfoRow(column: number | undefined) {
    this._defaultInfoRow = column;
    this._drawDoughnut();
  }

  get thickness(): number | undefined {
    return this._thickness;
  }

  set thickness(value: number | undefined) {
    this._thickness = value == null || isNaN(value) ? undefined : value;
    this._drawDoughnut();
  }

  get radius(): number | undefined {
    return this._radius;
  }

  set radius(value: number | undefined) {
    this._radius = value;
    this._drawDoughnut();
  }

  get colors() {
    return this._colors;
  }

  set colors(colors: string[]) {
    if (colors.length === 0) {
      this._colors = getColors(this);
    } else {
      this._colors = colors;
    }
    this._drawDoughnut();
  }

  get withLabels() {
    return this._withLabels;
  }

  set withLabels(value: boolean) {
    this._withLabels = value;
    this._drawDoughnut();
  }

  get withInfo() {
    return this._withInfo;
  }

  set withInfo(value: boolean) {
    this._withInfo = value;
    this._drawDoughnut();
  }

  get rotation(): number | undefined {
    return this._rotation;
  }

  set rotation(rotation: number | undefined) {
    this._rotation = rotation;
    this._drawDoughnut();
  }

  get withLabelInfo() {
    return this._withLabelInfo;
  }

  set withLabelInfo(value: boolean) {
    this._withLabelInfo = value;
    this._drawDoughnut();
  }

  get name() {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
    this._drawDoughnut();
  }

  setAttrs({
    table = this._table,
    value = this._table,
    colors = this._colors,
    dataColumn = this._dataColumn,
    labelColumn = this._labelColumn,
    defaultInfoRow = this._defaultInfoRow,
    radius = this._radius,
    rotation = this._rotation,
    thickness = this._thickness,
    withInfo = this._withInfo,
    withLabels = this._withLabels,
    withLabelInfo = this._withLabelInfo,
    name = this._name,
  }: Partial<GuiDoughnutProps>): void {
    this._table = table ?? value;
    this._colors = colors;
    this._dataColumn = dataColumn;
    this._labelColumn = labelColumn;
    this._defaultInfoRow = defaultInfoRow;
    this._radius = radius;
    this._rotation = rotation;
    this._thickness = thickness;
    this._withInfo = withInfo;
    this._withLabels = withLabels;
    this._withLabelInfo = withLabelInfo;
    this._name = name;
    this.render();
  }

  getAttrs(): {
    table: DonutTable | null;
    value: DonutTable | null;
    dataColumn: number;
    labelColumn: number | undefined;
    defaultInfoRow: number | undefined;
    radius: number | undefined;
    rotation: number | undefined;
    thickness: number | undefined;
    withInfo: boolean;
    withLabels: boolean;
    withLabelInfo: boolean;
    name: string | undefined;
  } {
    return {
      table: this._table,
      value: this._table,
      dataColumn: this._dataColumn,
      labelColumn: this._labelColumn,
      defaultInfoRow: this._defaultInfoRow,
      radius: this._radius,
      rotation: this._rotation,
      thickness: this._thickness,
      withInfo: this._withInfo,
      withLabels: this._withLabels,
      withLabelInfo: this._withLabelInfo,
      name: this._name,
    };
  }

  connectedCallback() {
    const style = getComputedStyle(this);
    if (style.display === 'inline') {
      // makes sure the WebComponent is properly displayed as 'block' unless overridden by something else
      this.style.display = 'block';
    }
    this._colors = getColors(this);

    const container = document.createElement('div');
    container.className = 'pie-container';

    const info = document.createElement('div');
    info.className = 'pie-info';
    this._info = info;

    this._resizeObserver = new ResizeObserver((e) => this._handleResize(e));

    container.appendChild(info);
    this.appendChild(container);
    this._container = d3.select(container);
    this._resizeObserver.observe(container);

    const width = this._container.node()?.clientWidth;
    const height = this._container.node()?.clientHeight;
    this._width = width ? width : DEFAULT_SIZE.width;
    this._height = height ? height : DEFAULT_SIZE.height;

    this._svgWrapper = this._container.append('svg:svg');
    this._svgWrapper.attr('class', 'svg-plot');
    this._svg = this._svgWrapper.append('g');

    this._updateDimensions();
    this.render();
  }

  disconnectedCallback() {
    const node = this._container?.node();
    if (node) {
      this._resizeObserver?.unobserve(node);
    }
    this.replaceChildren(); // cleanup
  }

  private _handleResize(event: ResizeObserverEntry[]) {
    const newWidth = event[0].contentRect.width;
    const newHeight = event[0].contentRect.height;
    if (this._width != newWidth || this._height != newHeight) {
      this._width = newWidth;
      this._height = newHeight;
      this._updateDimensions();
      this.render();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getMidAngle(d: any) {
    const angle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    const twopi = 2 * Math.PI;
    // calculate the angle to be positive and smaller than 2*PI
    return ((angle % twopi) + twopi) % twopi;
  }

  private _getTableData() {
    if (this._table instanceof Map) {
      return Array.from(this._table.values()) as number[];
    }
    if (!this._table || this._table.cols.length < this._dataColumn) {
      return [];
    }
    return this._table.cols[this._dataColumn].map((v) => Number(v));
  }

  private _getTableLabels(labelsIdx: number) {
    if (this._table instanceof Map) {
      return Array.from(this._table.keys());
    }
    if (!this._table || this._table.cols.length < labelsIdx) {
      return [];
    }
    return this._table.cols[labelsIdx].map((v) => (v ? v.toString() : ''));
  }

  private _updateDimensions() {
    this._svgWrapper?.attr('width', this._width).attr('height', this._height);
    this._svg?.attr('transform', `translate(${this._width / 2},${this._height / 2})`);
  }

  private _drawLabels(ref: this, radius: number) {
    const pieData = this._pie(this._getTableData());
    const arcRadius = this._radius ? radius : radius * OUTARCMULT;
    const breakRadius = this._radius ? radius * 1.1 : radius * BREAKARCMULT;
    this._outerArc.innerRadius(arcRadius).outerRadius(arcRadius);
    this._breakArc.innerRadius(breakRadius).outerRadius(breakRadius);

    const dimension = ref._width <= ref._height ? ref._width : ref._height;

    this._svg
      ?.selectAll('lines')
      .data(pieData)
      .join('path')
      .style('fill', 'none')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr('d', (d: any) => {
        const posA = ref._outerArc.centroid(d);
        const posB = ref._breakArc.centroid(d);
        const posC = ref._breakArc.centroid(d);
        const midangle = ref._getMidAngle(d);
        const breakMult = midangle < Math.PI ? AFTERBREAKMULT : -AFTERBREAKMULT;
        const pos = posC[0] + dimension * breakMult;
        posC[0] = midangle < Math.PI ? Math.min(pos, breakRadius) : Math.max(pos, -breakRadius);
        return ref._line([posA, posB, posC]);
      })
      .attr('class', 'pie-label-line');

    const labels = this._getTableLabels(this._labelColumn);
    this._svg
      ?.selectAll('labels')
      .data(pieData)
      .join('text')
      .text((_, idx: number) => labels[idx])
      .attr('transform', function (d) {
        const pos = ref._breakArc.centroid(d);
        const midangle = ref._getMidAngle(d);
        const posA =
          pos[0] +
          dimension * (midangle < Math.PI ? AFTERBREAKMULT : -AFTERBREAKMULT) +
          radius * (midangle < Math.PI ? LABELTEXTMULT : -LABELTEXTMULT);
        const posB = breakRadius + radius * LABELTEXTMULT;
        pos[0] = midangle < Math.PI ? Math.min(posA, posB) : Math.max(posA, -posB);
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
        const midangle = ref._getMidAngle(d);
        return midangle < Math.PI ? 'start' : 'end';
      })
      .attr('class', 'pie-label');
  }

  private _drawInfo(
    isHovering: boolean,
    total: number,
    radius: number,
    hoveredValue = 0,
    label: string | null = null,
    hoveredColor = 'black',
  ) {
    if (!this._info) {
      return;
    }

    this._info.innerHTML = '';
    this._info.classList.remove('no-data');
    this._info.style.width = `${2 * radius}px`;
    this._info.style.height = `${2 * radius}px`;

    if (this._withLabelInfo && this._labelColumn != null) {
      const labelEl = document.createElement('div');
      labelEl.textContent = label ? label : this._name ? this._name : 'Total';
      labelEl.classList.add('pie-info-label');
      this._info.appendChild(labelEl);
    }

    const totalContent =
      total > 999999
        ? `${d3.format('.4s')(parseFloat(total.toFixed(2)))}`
        : `${d3.format(',')(parseFloat(total.toFixed(2)))}`;
    const totalEl = document.createElement('div');
    totalEl.classList.add('pie-info-total');
    const percentageEl = document.createElement('div');
    percentageEl.classList.add('pie-info-percent');
    if (isHovering) {
      const hoverEl = document.createElement('div');
      hoverEl.textContent =
        hoveredValue > 999999
          ? `${d3.format('.4s')(hoveredValue)}`
          : `${d3.format(',')(hoveredValue)}`;
      hoverEl.style.color = hoveredColor;
      hoverEl.classList.add('pie-info-value');

      const partial = document.createElement('div');
      partial.style.display = 'flex';

      totalEl.textContent = `/${totalContent}`;
      percentageEl.textContent = `${parseFloat(((hoveredValue / total) * 100).toFixed(2))}%`;

      partial.appendChild(hoverEl);
      partial.appendChild(totalEl);
      this._info.appendChild(partial);
    } else {
      totalEl.textContent = `${totalContent}`;
      percentageEl.textContent = '100%';

      this._info.appendChild(totalEl);
    }
    this._info.appendChild(percentageEl);
  }

  private _drawDefaultInfo(total: number, innerRadius: number) {
    if (this.withInfo) {
      if (this._defaultInfoRow == null) {
        this._drawInfo(false, total, innerRadius);
      } else {
        const slice = this._container?.selectAll(`.pie-piece[index='${this._defaultInfoRow}']`);
        if (slice != null && slice.size() === 1) {
          const node = slice.nodes()[0];
          const partial = d3.select(node).attr('value');
          const partialColor = d3.select(node).attr('fill');
          const label = `${d3.select(node).attr('label')}`;
          this._drawInfo(true, total, innerRadius, Number(partial), label, partialColor);
        }
      }
    } else if (this._info) {
      this._info.innerHTML = '';
      this._info.classList.remove('no-data');
    }
  }

  private _drawDoughnut() {
    let dimension = this._width <= this._height ? this._width : this._height;
    if (this._thickness != null && dimension < this._thickness * 2) {
      dimension = this._thickness * 2;
    }
    const radius = this._radius ? this._radius : dimension / 2 - 2 * MARGIN;
    const arcRadius = this._radius ? radius : radius * OUTARCMULT;
    const innerRadius = this._withLabels
      ? this._thickness != null
        ? arcRadius - this._thickness
        : arcRadius * 0.7
      : this._thickness != null
      ? radius - this._thickness
      : radius * 0.7;
    this._arc.innerRadius(innerRadius).outerRadius(this._withLabels ? arcRadius : radius);
    if (this._rotation != null) {
      const radian = this._rotation * (Math.PI / 180);
      this._pie.startAngle(radian).endAngle(radian + 2 * Math.PI);
    }

    const total = this._getTableData().reduce((sum, v) => sum + Number(v), 0);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ref = this;
    const pieData = this._pie(this._getTableData());
    this._svg?.selectAll('path').remove();

    if (total > 0) {
      const labels = this._labelColumn != null ? this._getTableLabels(this._labelColumn) : null;
      this._svg
        ?.selectAll('path')
        .data(pieData)
        .join('path')
        .attr('d', this._arc)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr('value', (d: any) => Number(d.data))
        .attr('label', (_, index: number) => (labels ? `${labels[index]}` : null))
        .attr('fill', (_, idx: number) => this._colors[idx % this._colors.length])
        .attr('index', (_, idx: number) => idx)
        .on('mouseover', function () {
          if (ref._withInfo) {
            const partial = d3.select(this).attr('value');
            const partialColor = d3.select(this).attr('fill');
            const label = `${d3.select(this).attr('label')}`;
            ref._drawInfo(true, total, innerRadius, Number(partial), label, partialColor);
          }
        })
        .on('mouseout', function (_) {
          ref._drawDefaultInfo(total, innerRadius);
        })
        .attr('class', 'pie-piece');

      this._drawDefaultInfo(total, innerRadius);

      if (this._withLabels) {
        this._svg?.selectAll('.pie-label-line').remove();
        this._svg?.selectAll('.pie-label').remove();

        this._drawLabels(ref, radius);
      } else {
        this._svg?.selectAll('.pie-label').remove();
      }
    } else if (this._info) {
      this._info.innerHTML = 'Data column is empty or composed of only 0s.';
      this._info.classList.add('no-data');
    }
  }

  render() {
    this._updateDimensions();
    this._drawDoughnut();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-donut': GuiDonut;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-donut': GreyCat.Element<GuiDonut>;
    }
  }
}

if (!globalThis.customElements.get('gui-donut')) {
  globalThis.customElements.define('gui-donut', GuiDonut);
}
