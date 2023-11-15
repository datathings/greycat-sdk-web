import { core, utils, std_n } from '@greycat/sdk';
import { getGlobalDateTimeFormat, getGlobalNumberFormat } from '../../globals.js';
import '../value/index.js'; // makes sure we already have GuiValue defined
import { GuiValue, GuiValueProps } from '../value/index.js';
import { Disposer, GuiRenderEvent } from '../common.js';

/**
 * A function called to compute the cell properties
 * that will be passed to the underlying `<gui-value />` component.
 */
export type CellProps = (
  row: Value[],
  value: unknown,
  rowIdx: number,
  colIdx: number,
) => ValueProps;

type ValueProps = Partial<GuiValueProps> & { value: unknown };

type Value = {
  /** The actual value for the cell */
  value: unknown;
  /**
   * The original index of the row in the column.
   * 
   * This is required because sorting/filtering changes indexing.
   */
  originalIndex: number;
};

// reusing the same object for every render to ease gc
const cellProps: ValueProps = {
  dateFmt: getGlobalDateTimeFormat(),
  numFmt: getGlobalNumberFormat(),
  value: null,
};
const DEFAULT_CELL_PROPS: CellProps = (_, value) => {
  cellProps.value = value;
  cellProps.dateFmt = getGlobalDateTimeFormat();
  cellProps.numFmt = getGlobalNumberFormat();
  return cellProps;
};

export type RowUpdateCallback = (rowEl: GuiTableBodyRow, row: Value[]) => void;

export class GuiTable extends HTMLElement {
  private _table: core.Table | undefined;
  private _rows: Array<Value[]> = [];
  private _thead = document.createElement('gui-thead');
  private _tbody = document.createElement('gui-tbody');
  private _minColWidth = 150;
  private _scrollToRowIndex = 0;
  private _sortCol: SortCol = new SortCol(-1, 'default');
  private _cellProps = DEFAULT_CELL_PROPS;
  private _prevFromRowIdx = 0;
  private _filterText = '';
  private _headers: string[] | undefined;
  /** a flag that is switched to `true` when the component is actually added to the DOM */
  private _initialized = false;
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  /**
   * This is set to `true` when a column is manually resized.
   *
   * It is only used internally to know if `resetColumnWidth` should be called
   * automatically on updates or not.
   */
  private _manualColResize = false;
  private _disposer = new Disposer();

  constructor() {
    super();

    this._thead.addEventListener('table-sort', (ev) => {
      this._sortCol.sortBy(ev.detail);
      this._update();
    });

    this._tbody.addEventListener('click', (e) => {
      let rowEl: GuiTableBodyCell | undefined;
      if (e.target instanceof GuiTableBodyCell) {
        // trigger table-row-click when the cell is clicked
        rowEl = e.target;
      } else if (e.target instanceof GuiValue && e.target.parentElement instanceof GuiTableBodyCell) {
        // also trigger table-row-click when the cell value is clicked
        rowEl = e.target.parentElement;
      } else {
        return;
      }
      this.dispatchEvent(new TableClickEvent(rowEl.rowIdx, rowEl.colIdx, rowEl.data));
    });

    this._tbody.addEventListener('dblclick', (e) => {
      let rowEl: GuiTableBodyCell | undefined;
      if (e.target instanceof GuiTableBodyCell) {
        // trigger table-row-click when the cell is clicked
        rowEl = e.target;
      } else if (e.target instanceof GuiValue && e.target.parentElement instanceof GuiTableBodyCell) {
        // also trigger table-row-click when the cell value is clicked
        rowEl = e.target.parentElement;
      } else {
        return;
      }
      this.dispatchEvent(new TableDblClickEvent(rowEl.rowIdx, rowEl.colIdx, rowEl.data));
    });

    this.addEventListener('scroll', () => {
      const fromRowIdx = Math.floor(this.scrollTop / this._tbody.rowHeight);
      if (this._prevFromRowIdx == fromRowIdx) {
        // in buffer, no need to re-render
      } else {
        // out of buffer, re-render
        this._prevFromRowIdx = Math.max(0, fromRowIdx);
        this._update();
      }
    });
  }

  get table() {
    return this._table;
  }

  set table(table: core.Table | undefined) {
    if (table === undefined) {
      this._table = undefined;
      this._update();
      return;
    }
    this._computeTable(table);
    this._update();
  }

  private _computeTable(table: core.Table) {
    this._table = table;
    this._rows.length = table.cols[0]?.length ?? 0;
    for (let rowIdx = 0; rowIdx < this._rows.length; rowIdx++) {
      // initialize an empty col of the proper length
      this._rows[rowIdx] = new Array(table.cols.length);
      for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
        this._rows[rowIdx][colIdx] = { value: table.cols[colIdx][rowIdx], originalIndex: rowIdx };
      }
    }
  }

  get scrollToRowIndex() {
    return this._scrollToRowIndex;
  }

  set scrollToRowIndex(index: number) {
    this._scrollToRowIndex = index;
    this.scrollToRow(index);
  }

  scrollToRow(rowIdx: number, behavior?: ScrollBehavior): void {
    this.scrollTo({ top: rowIdx * this._tbody.rowHeight, behavior });
  }

  resetColumnsWidth(): void {
    this._thead.widths.length = 0;
    this._manualColResize = false;
    this._update();
  }

  setColumnsWidths(widths: number[]) {
    for (let i = 0; i < this._thead.widths.length; i++) {
      if (!isNaN(widths[i])) {
        this._thead.widths[i] = widths[i];
      }
    }
    this._manualColResize = true;
    this._update();
  }

  get filter(): string {
    return this._filterText;
  }

  set filter(text: string) {
    this._filterText = text.toLowerCase();
    this._update();
  }

  set cellProps(props: CellProps) {
    this._cellProps = props;
    this._update();
  }

  set headers(headers: string[] | undefined) {
    this._headers = headers;
    this._update();
  }

  set onrowupdate(cb: RowUpdateCallback) {
    this._rowUpdateCallback = cb;
  }

  get onrowupdate(): RowUpdateCallback {
    return this._rowUpdateCallback;
  }

  setAttrs({
    table = this._table,
    filter = this._filterText,
    cellProps = this._cellProps,
    headers = this._headers,
  }: {
    table: core.Table | undefined;
    filter: string;
    cellProps: CellProps;
    headers: string[] | undefined;
  }) {
    if (this._table !== table && table !== undefined) {
      this._computeTable(table);
    }
    this._filterText = filter;
    this._cellProps = cellProps;
    this._headers = headers;
    this._update();
  }

  connectedCallback() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._thead);
    fragment.appendChild(this._tbody);
    this.appendChild(fragment);

    let px = 0;
    let cx = 0;
    let resize = false;
    let index = -1;
    const colResizeLoop = () => {
      if (!resize) {
        return;
      }
      const dx = px - cx;
      const hcell = this._thead.children[index] as GuiTableHeadCell;
      const newWidth = Math.round(hcell.colWidth - dx);
      if (newWidth >= this._minColWidth) {
        this._thead.widths[index] = newWidth;
        hcell.colWidth = newWidth;
        this._tbody.resizeColumn(index, newWidth);
        px = cx;
        this._manualColResize = true;
      }
      requestAnimationFrame(colResizeLoop);
    };

    this._thead.addEventListener('table-resize-col', (e) => {
      resize = true;
      index = e.detail.index;
      px = cx = e.detail.x;
      this._thead.classList.add('gui-table-resizing');
      requestAnimationFrame(colResizeLoop);
    }, { signal: this._disposer.signal });
    const cancelColResize = () => {
      if (resize) {
        resize = false;
        this._thead.classList.remove('gui-table-resizing');
        this._update();
      }
    };
    this.addEventListener('mousemove', (e) => {
      cx = e.clientX;
    }, { signal: this._disposer.signal });

    document.body.addEventListener('mouseup', cancelColResize, { signal: this._disposer.signal });
    document.body.addEventListener('mouseleave', cancelColResize, { signal: this._disposer.signal });

    const oResize = new ResizeObserver(() => {
      // reset manual column resize for best-effort display on resize
      this._thead.widths.length = 0;
      // recompute the available space for the rows
      this._tbody.computeRowHeight();
      // update the whole table
      this._update();
    });
    oResize.observe(this);
    this._disposer.disposables.push(() => oResize.disconnect());

    this._initialized = true;
    this._update();
  }

  disconnectedCallback() {
    this._disposer.dispose();
    this.replaceChildren(); // cleanup
  }

  private _update() {
    if (!this._initialized || !this._table) {
      return;
    }
    const start = Date.now();
    if (!this._manualColResize) {
      this._thead.widths.length = 0;
    }

    this._thead.update(this._table.meta, this._minColWidth, this._sortCol, this._tbody.virtualScroller.scrollWidth, this._headers);

    // sort table if needed
    if (this._sortCol.index === -1 || this._sortCol.index >= this._table.meta.length) {
      // no need to sort or sort out of bound (can happen if previous table had more columns)
      this._sortCol.reset();
    } else {
      const ord = this._sortCol.ord;

      this._rows.sort((rowA, rowB) => {
        if (ord === 'default') {
          return rowA[this._sortCol.index].originalIndex >= rowB[this._sortCol.index].originalIndex
            ? 1
            : -1;
        }

        // Here "a" and "b", are actually "any", because we type-check at runtime
        // to know what kind of comparison we have to do for the sort, therefore
        // "any" is justified.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = rowA[this._sortCol.index].value as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const b = rowB[this._sortCol.index].value as any;
        const aType = typeof a;
        const bType = typeof b;

        let compare = 0;
        if (aType === 'string' && bType === 'string') {
          compare = a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        } else {
          compare = a >= b ? 1 : -1;
        }

        if (ord === 'asc') {
          return compare;
        }
        return -compare;
      });
    }

    let rows = this._rows;
    if (this._filterText.length > 0) {
      // BOTTLENECK, this creates GC work & copies for every render if a filter text is set
      rows = this._rows.filter((row) => filterRow(this._filterText, row));
    }

    this._tbody.update(this._prevFromRowIdx, this._thead.widths, rows, this._cellProps, this._rowUpdateCallback);

    this.dispatchEvent(new GuiRenderEvent(start));
  }
}

function filterRow(text: string, row: Value[]): boolean {
  for (let colIdx = 0; colIdx < row.length; colIdx++) {
    if (
      utils.stringify({
        value: row[colIdx].value,
        dateFmt: getGlobalDateTimeFormat(),
        numFmt: getGlobalNumberFormat(),
      })
        .toLowerCase()
        .includes(text)
    ) {
      return true;
    }
  }
  return false;
}

class GuiTableHead extends HTMLElement {
  widths: number[] = [];

  update(
    meta: std_n.core.NativeTableColumnMeta[],
    minColWidth: number,
    sortCol: SortCol,
    availableWidth: number,
    headers?: string[],
  ): void {
    const defaultColWidth = Math.max(minColWidth, availableWidth / meta.length);

    for (let colIdx = 0; colIdx < meta.length; colIdx++) {
      const colWidth = (this.widths[colIdx] = this.widths[colIdx] ?? defaultColWidth);
      const header = this._getOrCreateHeader(colIdx, colWidth);
      header.update(
        colIdx,
        meta[colIdx],
        sortCol.index === colIdx ? sortCol.ord : 'default',
        headers?.[colIdx],
      );
    }

    this._removeExceedingColumns(meta.length - 1);

    for (let colIdx = 0; colIdx < this.childNodes.length; colIdx++) {
      const header = this.childNodes[colIdx] as GuiTableHeadCell;
      if (colIdx === sortCol.index && sortCol.ord !== 'default') {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    }
  }

  private _getOrCreateHeader(index: number, colWidth: number): GuiTableHeadCell {
    let el = this.children[index] as GuiTableHeadCell | undefined;
    if (!el) {
      el = document.createElement('gui-thead-cell');
      el.colWidth = colWidth;
      this.appendChild(el);
    } else {
      el.colWidth = colWidth;
    }
    return el;
  }

  private _removeExceedingColumns(fromIdx: number): void {
    if (fromIdx < 0) {
      // remove all
      this.replaceChildren();
      return;
    }

    const el = this.children[fromIdx];
    while (el?.nextSibling) {
      el.nextSibling.remove();
    }
  }
}

/**
 * `detail` contains the target column index and the current `event.clientX`
 */
class TableResizeColEvent extends CustomEvent<{ index: number; x: number }> {
  constructor(index: number, x: number) {
    super('table-resize-col', { detail: { index, x }, bubbles: true });
  }
}

/**
 * `detail` contains the target column index
 */
class TableSortEvent extends CustomEvent<number> {
  constructor(index: number) {
    super('table-sort', { detail: index, bubbles: true });
  }
}

export type TableClickEventDetail = {
  /**
   * The current row index. This is not necessarily the "original" row index.
   * If the table is filtered or sorted, it is the "current" row index.
   *
   * To know the "original" index, check the property `originalIndex` in the `row` values.
   */
  rowIdx: number;
  /**
   * Current column index.
   */
  colIdx: number;
  /**
   * The associated row values.
   */
  row: Value[];
};

class TableClickEvent extends CustomEvent<TableClickEventDetail> {
  constructor(rowIdx: number, colIdx: number, row: Value[]) {
    super('table-click', { detail: { rowIdx, colIdx, row }, bubbles: true });
  }
}

class TableDblClickEvent extends CustomEvent<TableClickEventDetail> {
  constructor(rowIdx: number, colIdx: number, row: Value[]) {
    super('table-dblclick', { detail: { rowIdx, colIdx, row }, bubbles: true });
  }
}

/**
 * A column header cell.
 */
class GuiTableHeadCell extends HTMLElement {
  private _index = 0;
  private _width = 0;
  private _title = document.createElement('div');
  private _sorter = document.createElement('div');
  private _resizer = document.createElement('div');
  private _sortGraphemes = { asc: '↓', desc: '↑', default: '⇅' } as const;

  constructor() {
    super();

    this.addEventListener('click', (e) => {
      if (e.target !== this._resizer) {
        this.dispatchEvent(new TableSortEvent(this._index));
      }
    });

    this._resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.dispatchEvent(new TableResizeColEvent(this._index, e.clientX));
    });
  }

  get colWidth(): number {
    return this._width;
  }

  set colWidth(width: number) {
    this._width = width;
    this.style.width = `${width}px`;
  }

  connectedCallback() {
    const fragment = document.createDocumentFragment();

    this._title.classList.add('gui-thead-title');
    fragment.appendChild(this._title);

    this._sorter.classList.add('gui-thead-sorter');
    this._sorter.textContent = '⇅'; // asc: ↓   desc: ↑
    fragment.appendChild(this._sorter);

    this._resizer.classList.add('gui-thead-resizer');

    fragment.appendChild(this._resizer);

    this.appendChild(fragment);
  }

  disconnectedCallback() {
    this.replaceChildren(); // cleanup
  }

  update(index: number, meta: std_n.core.NativeTableColumnMeta, sort: SortOrd, title?: string) {
    this._index = index;
    this._title.textContent = title ?? meta.header ?? meta.typeName ?? `Column ${index + 1}`;
    this._sorter.textContent = this._sortGraphemes[sort];
  }
}

class GuiTableBody extends HTMLElement {
  rowHeight = 0;
  maxVirtualRows = 0;
  virtualScroller = document.createElement('div');

  connectedCallback() {
    this.computeRowHeight();

    // create the virtualScroller
    this.virtualScroller.style.position = 'absolute';
    this.virtualScroller.style.visibility = 'hidden';
    this.virtualScroller.style.width = '100%';
    this.appendChild(this.virtualScroller);
  }

  disconnectedCallback() {
    this.replaceChildren(); // cleanup
  }

  computeRowHeight() {
    // create a ghost row to compute the height
    const firstRow = document.createElement('gui-tbody-row');
    this.appendChild(firstRow);
    firstRow.update(
      0,
      [150],
      [{ value: 'testing row height', originalIndex: 0 }],
      DEFAULT_CELL_PROPS,
    );
    this.rowHeight = firstRow.offsetHeight;
    firstRow.remove();
  }

  update(fromRowIdx: number, colWidths: number[], rows: Value[][], cellProps: CellProps, updateCallback: RowUpdateCallback): void {
    // Make it one more than the total height space divided by row height, so that we are sure that even
    // on scrolling up we won't see the background appear as there will always be "more rows" than displayable
    // in the scroll area. And of course, if the table already fits in the scroll area, we only display the
    // actual content without any extra row.
    this.maxVirtualRows = Math.min(Math.ceil(this.offsetHeight / this.rowHeight) + 1, rows.length);

    /** This is the max bound for rows */
    const maxRowIdx = rows.length - 1;

    // If we are "reducing" the size of the table, we need to update those last rows rather than removing them
    // altogether and recreating them on the next "scroll" update, the following line handles that.
    // If "fromRowIdx" is greater than "maxRowIdx" it means we are "scrolled" more than we have rows to display
    // therefore we need to update "fromRowIdx" to the maximum index - the max number of displayable rows
    fromRowIdx = Math.max(0, Math.min(fromRowIdx, maxRowIdx - this.maxVirtualRows + 1));

    // remove virtual scroller while updating
    this.virtualScroller.remove();

    // We want to render as many rows as possible in the "view", but no more than needed
    // Therefore, we iterate from `0` to `maxVirtualRows` so that we stop when going over
    // the maximum height of the virtual "view".
    let rowIdx: number;
    for (rowIdx = 0; rowIdx < this.maxVirtualRows; rowIdx++) {
      // Compute the target row index starting from the "first row in view" and adding the iteration step
      const realIdx = fromRowIdx + rowIdx;
      // If we are already at the end of the table rows, we should not render "ghost" rows, so we break
      if (realIdx > maxRowIdx) {
        break;
      }
      const row = this._getOrCreateRow(rowIdx);
      // update the DOM row to reflect the new row's data
      row.update(realIdx, colWidths, rows[realIdx], cellProps);
      // at the right position
      row.style.top = `${realIdx * this.rowHeight}px`;
      updateCallback(row, rows[realIdx]);
    }

    // remove exceeding rows
    this._removeExceedingRows(rowIdx - 1);

    // update virtual scroller height to reflect the number of rows
    this.virtualScroller.style.height = `${this.rowHeight * rows.length}px`;
    // and add it back to the DOM
    this.appendChild(this.virtualScroller);
  }

  resizeColumn(colIdx: number, width: number): void {
    for (let i = 0; i < this.maxVirtualRows; i++) {
      const row = this.children[i] as GuiTableBodyRow;
      const cell = row.children[colIdx] as GuiTableBodyCell;
      cell.style.width = `${width}px`;
    }
  }

  private _getOrCreateRow(index: number): GuiTableBodyRow {
    let row = this.children[index] as GuiTableBodyRow | undefined;
    if (!row) {
      row = document.createElement('gui-tbody-row');
      this.appendChild(row);
    }
    return row;
  }

  private _removeExceedingRows(fromIndex: number): void {
    if (fromIndex < 0) {
      this.replaceChildren();
      return;
    }

    const row = this.children[fromIndex];
    while (row?.nextSibling) {
      row.nextSibling.remove();
    }
  }
}

class GuiTableBodyRow extends HTMLElement {
  idx = -1;

  update(index: number, colWidths: number[], row: Value[], cellProps: CellProps): void {
    this.idx = index;
    // this.setAttribute('data-col', `${col}`);
    this.setAttribute('data-row', `${index}`);
    let colIdx: number;
    for (colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = this._getOrCreateCell(colIdx);
      cell.rowIdx = index;
      cell.colIdx = colIdx;
      cell.data = row;
      cell.setAttribute('data-col', `${colIdx}`);
      (cell.children[0] as GuiValue).setAttrs(cellProps(row, row[colIdx].value, index, colIdx));
      cell.style.width = `${colWidths[colIdx]}px`;
    }

    // remove exceeding cells
    this._removeExceedingCells(colIdx - 1);
  }

  private _getOrCreateCell(index: number): GuiTableBodyCell {
    let cell = this.children[index] as GuiTableBodyCell | undefined;
    if (!cell) {
      cell = document.createElement('gui-tbody-cell');
      cell.appendChild(document.createElement('gui-value'));
      this.appendChild(cell);
    }
    return cell;
  }

  private _removeExceedingCells(fromIdx: number): void {
    if (fromIdx < 0) {
      this.replaceChildren();
      return;
    }

    const cell = this.children[fromIdx];
    while (cell?.nextSibling) {
      cell.nextSibling.remove();
    }
  }
}

class GuiTableBodyCell extends HTMLElement {
  rowIdx = -1;
  colIdx = -1;
  data: Value[] = [];
}

type SortOrd = 'asc' | 'desc' | 'default';

/**
 * Sorting state machine.
 *
 * Call `sortBy` to cycle through the different possible sorting state.
 *
 * To reset to the default "unsorted" state, call `reset()`.
 */
class SortCol {
  constructor(
    private _index: number,
    private _ord: SortOrd,
  ) { }

  reset() {
    this._index = -1;
    this._ord = 'default';
  }

  sortBy(index: number): void {
    if (this._index === index) {
      if (this._ord === 'default') {
        this._ord = 'asc';
      } else if (this._ord === 'asc') {
        this._ord = 'desc';
      } else {
        this._ord = 'default';
      }
    } else {
      this._index = index;
      this._ord = 'asc';
    }
  }

  get index() {
    return this._index;
  }

  get ord() {
    return this._ord;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-table': GuiTable;
    'gui-thead': GuiTableHead;
    'gui-thead-cell': GuiTableHeadCell;
    'gui-tbody': GuiTableBody;
    'gui-tbody-row': GuiTableBodyRow;
    'gui-tbody-cell': GuiTableBodyCell;
  }

  interface HTMLElementEventMap {
    'table-sort': TableSortEvent;
    'table-resize-col': TableResizeColEvent;
    'table-click': TableClickEvent;
    'table-dblclick': TableDblClickEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-table': Partial<Omit<GuiTable, 'children'>>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead': Partial<Omit<GuiTableHead, 'children'>>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead-cell': Partial<Omit<GuiTableHeadCell, 'children'>>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody': Partial<Omit<GuiTableBody, 'children'>>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody-row': Partial<Omit<GuiTableBodyRow, 'children'>>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody-cell': Partial<Omit<GuiTableBodyCell, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-thead-cell')) {
  globalThis.customElements.define('gui-thead-cell', GuiTableHeadCell);
}

if (!globalThis.customElements.get('gui-tbody-cell')) {
  globalThis.customElements.define('gui-tbody-cell', GuiTableBodyCell);
}

if (!globalThis.customElements.get('gui-tbody-row')) {
  globalThis.customElements.define('gui-tbody-row', GuiTableBodyRow);
}

if (!globalThis.customElements.get('gui-thead')) {
  globalThis.customElements.define('gui-thead', GuiTableHead);
}

if (!globalThis.customElements.get('gui-tbody')) {
  globalThis.customElements.define('gui-tbody', GuiTableBody);
}

if (!globalThis.customElements.get('gui-table')) {
  globalThis.customElements.define('gui-table', GuiTable);
}