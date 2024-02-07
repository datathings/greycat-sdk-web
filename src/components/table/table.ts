import { utils } from '@greycat/sdk';
import '../value/index.js'; // makes sure we already have GuiValue defined
import { GuiValue, GuiValueProps } from '../value/index.js';
import { Disposer, GuiRenderEvent, TableLike, TableLikeMeta } from '../common.js';

/**
 * A function called to compute the cell properties
 * that will be passed to the underlying `<gui-value />` component.
 */
export type CellPropsFactory = (
  row: Cell[],
  value: unknown,
  rowIdx: number,
  colIdx: number,
) => CellProps;

export type CellProps = Partial<GuiValueProps> & { value: unknown };

/**
 * An internal wrapper type for the table cells.
 */
export type Cell = {
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
const cellProps: CellProps = {
  value: null,
};
const DEFAULT_CELL_PROPS: CellPropsFactory = (_, value) => {
  cellProps.value = value;
  return cellProps;
};

export type RowUpdateCallback = (rowEl: GuiTableBodyRow, row: Cell[]) => void;

export class GuiTable extends HTMLElement {
  static COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  private _table: TableLike | undefined;
  private _rows: Array<Cell[]> = [];
  private _thead = document.createElement('gui-thead');
  private _tbody = document.createElement('gui-tbody');
  private _minColWidth = 100;
  private _scrollToRowIndex = 0;
  private _sortCol: SortCol = new SortCol(-1, 'default');
  private _cellProps = DEFAULT_CELL_PROPS;
  private _prevFromRowIdx = 0;
  private _filterText = '';
  private _filterColumns: Array<string | undefined> = [];
  private _headers: string[] | undefined;
  /** a flag that is switched to `true` when the component is actually added to the DOM */
  private _initialized = false;
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  private _disposer = new Disposer();

  constructor() {
    super();

    this._thead.addEventListener('table-sort', (ev) => {
      this._sortCol.sortBy(ev.detail);
      this.update();
    });

    this._thead.addEventListener('table-filter-column', (ev) => {
      this._filterColumns[ev.detail.index] = ev.detail.text;
      this.update();
    });

    this._tbody.addEventListener('click', (e) => {
      let rowEl: GuiTableBodyCell | undefined;
      if (e.target instanceof GuiTableBodyCell) {
        // trigger table-row-click when the cell is clicked
        rowEl = e.target;
      } else if (
        e.target instanceof GuiValue &&
        e.target.parentElement instanceof GuiTableBodyCell
      ) {
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
      } else if (
        e.target instanceof GuiValue &&
        e.target.parentElement instanceof GuiTableBodyCell
      ) {
        // also trigger table-row-click when the cell value is clicked
        rowEl = e.target.parentElement;
      } else {
        return;
      }
      this.dispatchEvent(new TableDblClickEvent(rowEl.rowIdx, rowEl.colIdx, rowEl.data));
    });

    this.addEventListener('scroll', () => {
      if (this._tbody.rowHeight === 0) {
        this._tbody.computeRowHeight();
      }
      const fromRowIdx = Math.floor(this.scrollTop / this._tbody.rowHeight);

      if (this._prevFromRowIdx == fromRowIdx) {
        // in buffer, no need to re-render
      } else {
        // out of buffer, re-render
        this._prevFromRowIdx = Math.max(0, fromRowIdx);
        this.update();
      }
    });
  }

  /**
   * @deprecated use `value` instead
   */
  get table() {
    return this._table;
  }

  get value() {
    return this._table;
  }

  /**
   * @deprecated use `value` instead
   */
  set table(table: TableLike | undefined) {
    this.value = table;
  }

  set value(table: TableLike | undefined) {
    if (table === undefined) {
      this._table = undefined;
      this.update();
      return;
    }
    this._table = table;
    this.computeTable();
    this.update();
  }

  computeTable() {
    if (!this._table) {
      return;
    }
    this._rows.length = this._table.cols[0]?.length ?? 0;
    for (let rowIdx = 0; rowIdx < this._rows.length; rowIdx++) {
      // initialize an empty col of the proper length
      this._rows[rowIdx] = new Array(this._table.cols.length);
      for (let colIdx = 0; colIdx < this._table.cols.length; colIdx++) {
        this._rows[rowIdx][colIdx] = {
          value: this._table.cols[colIdx][rowIdx],
          originalIndex: rowIdx,
        };
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
    this.update();
  }

  fitColumnsToHeaders(): void {
    if (!this._table) {
      return;
    }
    this._thead.querySelectorAll('gui-thead-cell').forEach((el, i) => {
      const titleEl = el.querySelector<HTMLElement>('.gui-thead-title')!;
      const titleFitWidth =
        titleEl.scrollWidth +
        48 /* the minimum for the icons */ +
        6; /* spacing (arguably this should be tied to var(--spacing)) */
      if (titleFitWidth > el.scrollWidth) {
        this._thead.widths[i] = titleFitWidth + 1; // +1 to prevent ellipsis from happening
      }
    });
    this.update();
  }

  get columnsWidths() {
    return this._thead.widths;
  }

  set columnsWidths(widths: number[]) {
    for (let i = 0; i < this._thead.widths.length; i++) {
      if (!isNaN(widths[i])) {
        this._thead.widths[i] = widths[i];
      }
    }
    this.update();
  }

  /**
   * Global filter for all columns
   */
  get filter(): string {
    return this._filterText;
  }

  set filter(text: string) {
    this._filterText = text.toLowerCase();
    this.update();
  }

  /**
   * Per-column filter.
   *
   * *Specify as many entry as there is columns in the table. `undefined` or "empty string" means no filtering for that column.
   */
  get filterColumns() {
    return this._filterColumns;
  }

  set filterColumns(filters: Array<string | undefined>) {
    this._filterColumns = filters;
    this.update();
  }

  set cellProps(props: CellPropsFactory) {
    this._cellProps = props;
    this.update();
  }

  set headers(headers: string[] | undefined) {
    this._headers = headers;
    this.update();
  }

  get sortBy() {
    return [this._sortCol.index, this._sortCol.ord] as const;
  }

  set sortBy([index, ord]: readonly [number] | readonly [number, SortOrd]) {
    this._sortCol.sortBy(index, ord);
    this.update();
  }

  set onrowupdate(cb: RowUpdateCallback) {
    this._rowUpdateCallback = cb;
  }

  get onrowupdate(): RowUpdateCallback {
    return this._rowUpdateCallback;
  }

  setAttrs({
    table = this._table,
    value = this._table,
    filter = this._filterText,
    filterColumns = this._filterColumns,
    sortBy = [this._sortCol.index, this._sortCol.ord],
    cellProps = this._cellProps,
    headers = this._headers,
    columnsWidths = this._thead.widths,
  }: Partial<{
    /** @deprecated use `value` instead */
    table: TableLike;
    value: TableLike;
    filter: string;
    filterColumns: Array<string | undefined>,
    sortBy: readonly [number] | readonly [number, SortOrd],
    cellProps: CellPropsFactory;
    headers: string[];
    columnsWidths: number[];
  }>) {
    this._table = table ?? value;
    this.computeTable();
    this._filterText = filter;
    this._filterColumns = filterColumns;
    this._sortCol.sortBy(sortBy[0], sortBy[1]);
    this._cellProps = cellProps;
    this._headers = headers;
    this._thead.widths = columnsWidths;
    this.update();
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
        // record the new manually set width
        this._thead.widths[index] = newWidth;
        // update the header cell width
        hcell.colWidth = newWidth;
        // update the associated body cells widths
        this._tbody.resizeColumn(index, newWidth);
        px = cx;
      }
      requestAnimationFrame(colResizeLoop);
    };

    this._thead.addEventListener(
      'table-resize-col',
      (e) => {
        resize = true;
        index = e.detail.index;
        px = cx = e.detail.x;
        this._thead.classList.add('gui-table-resizing');
        requestAnimationFrame(colResizeLoop);
      },
      { signal: this._disposer.signal },
    );
    const cancelColResize = () => {
      if (resize) {
        resize = false;
        this._thead.classList.remove('gui-table-resizing');
        this.update();
      }
    };

    document.body.addEventListener(
      'mousemove',
      (e) => {
        cx = e.clientX;
      },
      { signal: this._disposer.signal },
    );
    document.body.addEventListener('mouseup', cancelColResize, { signal: this._disposer.signal });
    document.body.addEventListener('mouseleave', cancelColResize, {
      signal: this._disposer.signal,
    });

    const oResize = new ResizeObserver(() => {
      // recompute the available space for the rows
      this._tbody.computeRowHeight();
      // update the whole table
      this.update();
    });
    oResize.observe(this);
    this._disposer.disposables.push(() => oResize.disconnect());

    this._initialized = true;
    this.update();
  }

  disconnectedCallback() {
    this._prevFromRowIdx = 0;
    this._disposer.dispose();
    this.replaceChildren(); // cleanup
  }

  update() {
    if (!this._initialized || !this._table) {
      return;
    }
    const start = Date.now();

    this._thead.update(
      this._table.meta ?? [],
      this._minColWidth,
      this._sortCol,
      this._tbody.virtualScroller.scrollWidth,
      this._headers,
    );

    // sort table if needed
    if (this._sortCol.index === -1 || this._sortCol.index >= (this._table.meta?.length ?? 0)) {
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
          compare = GuiTable.COLLATOR.compare(a, b);
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
    if (this._filterText.length > 0 || this._filterColumns.find((s) => s && s.length > 0)) {
      rows = this._rows.filter((row, rowIdx) =>
        this._filterRow(this._filterText, this._filterColumns, row, rowIdx, this._cellProps),
      );
      this.dispatchEvent(new TableFilterEvent(rows));
    }

    this._tbody.update(
      this._prevFromRowIdx,
      this._thead.widths,
      rows,
      this._minColWidth,
      this._cellProps,
      this._rowUpdateCallback,
    );

    this.dispatchEvent(new GuiRenderEvent(start));
  }

  asCsv(sep = ','): string {
    if (!this._table) {
      return '';
    }

    const header = this._table.meta?.map((m, i) => {
      if (m.header) {
        return m.header;
      }
      if (m.typeName) {
        return m.typeName;
      }
      return `column-${i}`;
    }).join(sep) ?? '';

    const body = this._rows.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        return utils.stringify(this._cellProps(row, cell.value, rowIdx, colIdx));
      }).join(sep);
    }).join('\n');

    return header + '\n' + body;
  }

  private _filterRow(
    globalFilter: string,
    colFilters: Array<string | undefined>,
    row: Cell[],
    rowIdx: number,
    cellProps: CellPropsFactory,
  ): boolean {
    // cache stringified cells
    const cells: string[] = [];

    for (let i = 0; i < row.length; i++) {
      const colFilter = colFilters[i];
      cells[i] = utils.stringify(cellProps(row, row[i].value, rowIdx, i)).toLowerCase();
      if (colFilter && colFilter.length > 0) {
        // check column filter
        if (!cells[i].includes(colFilter)) {
          return false;
        }
      }
    }

    if (globalFilter.length === 0) {
      // we did not return false already with the column filters, and there is no global filter
      // so this row is containing usefull data
      return true;
    }

    for (let i = 0; i < row.length; i++) {
      if (cells[i].includes(globalFilter)) {
        return true;
      }
    }
    return false;
  }
}

class GuiTableHead extends HTMLElement {
  widths: number[] = [];

  update(
    meta: TableLikeMeta[],
    minColWidth: number,
    sortCol: SortCol,
    availableWidth: number,
    headers?: string[],
  ): void {
    let takenWidth = 0;
    for (let colIdx = 0; colIdx < meta.length; colIdx++) {
      let colWidth: number;
      if (this.widths[colIdx]) {
        colWidth = this.widths[colIdx];
      } else {
        colWidth = Math.max((availableWidth - takenWidth) / (meta.length - colIdx), minColWidth);
      }
      takenWidth += colWidth;
      const header = this._getOrCreateHeader(colIdx, colWidth);
      header.update(
        colIdx,
        meta?.[colIdx],
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
export class TableResizeColEvent extends CustomEvent<{ index: number; x: number }> {
  constructor(index: number, x: number) {
    super('table-resize-col', { detail: { index, x }, bubbles: true });
  }
}

/**
 * `detail` contains the target column index
 */
export class TableSortEvent extends CustomEvent<number> {
  constructor(index: number) {
    super('table-sort', { detail: index, bubbles: true });
  }
}

export class TableFilterEvent extends CustomEvent<Cell[][]> {
  constructor(rows: Cell[][]) {
    super('table-filter', { detail: rows, bubbles: true });
  }
}

/**
 * `detail` contains the target input of dropdown from filter button
 */
export class TableFilterColumnEvent extends CustomEvent<{ index: number; text: string }> {
  constructor(index: number, text: string) {
    super('table-filter-column', { detail: { index, text }, bubbles: true });
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
  row: Cell[];
};

export class TableClickEvent extends CustomEvent<TableClickEventDetail> {
  constructor(rowIdx: number, colIdx: number, row: Cell[]) {
    super('table-click', { detail: { rowIdx, colIdx, row }, bubbles: true });
  }
}

export class TableDblClickEvent extends CustomEvent<TableClickEventDetail> {
  constructor(rowIdx: number, colIdx: number, row: Cell[]) {
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
  private _filter = document.createElement('div');
  private _dropdown = document.createElement('div');
  private _input = document.createElement('input');
  private _icons = { asc: '↓', desc: '↑', default: '↕', search: '', close: '' };

  constructor() {
    super();

    // make the filter focusable so we can catch it on the input blur event
    this._filter.tabIndex = 0;

    this.addEventListener('click', (e) => {
      if (e.target === this._filter) {
        if (!this._dropdown.classList.contains('open')) {
          this.openDropdown();
        } else if (this._dropdown.classList.contains('open')) {
          this.closeDropdown();
        }
      } else if (e.target !== this._resizer && e.target !== this._input) {
        this.dispatchEvent(new TableSortEvent(this._index));
      }
    });

    this._filter.classList.add('gui-thead-filter');

    this._dropdown.classList.add('gui-thead-dropdown');
    this._input.type = 'search';
    this._input.placeholder = 'Filter column';
    this._dropdown.appendChild(this._input);

    this._input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.dispatchEvent(new TableFilterColumnEvent(this._index, target.value));
    });

    this._input.addEventListener('blur', (e) => {
      // if the user clicked on the search icon, we let the click event handle the dropdown
      if (e.relatedTarget !== this._filter) {
        this.closeDropdown();
      }
    });

    this._input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' || ev.key === 'Enter') {
        this.closeDropdown();
        ev.preventDefault();
        ev.stopPropagation();
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
    const styles = getComputedStyle(this);
    this._icons.default = styles.getPropertyValue('--icon-sort-default');
    this._icons.asc = styles.getPropertyValue('--icon-sort-asc');
    this._icons.desc = styles.getPropertyValue('--icon-sort-desc');
    this._icons.close = styles.getPropertyValue('--icon-close');
    this._filter.style.backgroundImage = this._icons.search;

    const fragment = document.createDocumentFragment();

    this._title.classList.add('gui-thead-title');
    fragment.appendChild(this._title);

    this._sorter.classList.add('gui-thead-sorter');
    this._sorter.textContent = this._icons.default;
    fragment.appendChild(this._sorter);

    fragment.appendChild(this._filter);

    this._resizer.classList.add('gui-thead-resizer');

    fragment.appendChild(this._resizer);
    fragment.appendChild(this._dropdown);

    this.appendChild(fragment);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  closeDropdown() {
    this._dropdown.classList.remove('open');
    this._filter.classList.remove('open');
    this._filter.style.backgroundImage = this._icons.search;
  }

  openDropdown() {
    this._dropdown.classList.add('open');
    this._filter.classList.add('open');
    this._input.focus();
  }

  update(index: number, meta: TableLikeMeta | undefined, sort: SortOrd, title?: string) {
    this._index = index;
    if (title) {
      this._title.textContent = title;
      if (meta?.typeName) {
        const type = document.createElement('span');
        type.className = 'gui-thead-type';
        type.textContent = meta.typeName;
        this._title.appendChild(type);
      }
    } else if (meta?.header) {
      this._title.textContent = meta.header;
      if (meta.typeName) {
        const type = document.createElement('span');
        type.className = 'gui-thead-type';
        type.textContent = meta.typeName;
        this._title.appendChild(type);
      }
    } else if (meta?.typeName) {
      this._title.textContent = meta.typeName;
    } else {
      this._title.textContent = `Column ${index + 1}`;
    }
    this._sorter.textContent = this._icons[sort];
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
      150,
      this.virtualScroller.scrollWidth,
      [{ value: 'testing row height', originalIndex: 0 }],
      DEFAULT_CELL_PROPS,
    );
    this.rowHeight = firstRow.offsetHeight;
    firstRow.remove();
  }

  update(
    fromRowIdx: number,
    colWidths: number[],
    rows: Cell[][],
    minColWidth: number,
    cellProps: CellPropsFactory,
    updateCallback: RowUpdateCallback,
  ): void {
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

    // copy the current scroll width before removing the scroller
    const availableWidth = this.virtualScroller.scrollWidth;
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
      row.update(realIdx, colWidths, minColWidth, availableWidth, rows[realIdx], cellProps);
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

  update(
    index: number,
    colWidths: number[],
    minColWidth: number,
    availableWidth: number,
    row: Cell[],
    cellProps: CellPropsFactory,
  ): void {
    this.idx = index;
    // this.setAttribute('data-col', `${col}`);
    this.setAttribute('data-row', `${index}`);
    let colIdx: number;
    let takenWidth = 0;
    for (colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = this._getOrCreateCell(colIdx);
      let colWidth: number;
      if (colWidths[colIdx]) {
        colWidth = colWidths[colIdx];
      } else {
        colWidth = Math.max((availableWidth - takenWidth) / (row.length - colIdx), minColWidth);
      }
      cell.update(index, colIdx, row, cellProps, colWidth);
      takenWidth += colWidth;
    }

    // remove exceeding cells
    this._removeExceedingCells(colIdx - 1);
  }

  private _getOrCreateCell(index: number): GuiTableBodyCell {
    let cell = this.children[index] as GuiTableBodyCell | undefined;
    if (!cell) {
      cell = document.createElement('gui-tbody-cell');
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
  data: Cell[] = [];
  value: GuiValue;

  constructor() {
    super();

    this.value = document.createElement('gui-value');
  }

  connectedCallback() {
    this.appendChild(this.value);
  }

  update(index: number, colIdx: number, row: Cell[], cellProps: CellPropsFactory, colWidth: number) {
    this.rowIdx = index;
    this.colIdx = colIdx;
    this.data = row;
    this.setAttribute('data-col', `${colIdx}`);
    this.value.setAttrs(cellProps(row, row[colIdx].value, index, colIdx));
    this.style.width = `${colWidth}px`;
  }
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

  sortBy(index: number, ord?: SortOrd): void {
    if (this._index === index) {
      if (ord) {
        this._ord = ord;
      } else {
        if (this._ord === 'default') {
          this._ord = 'asc';
        } else if (this._ord === 'asc') {
          this._ord = 'desc';
        } else {
          this._ord = 'default';
        }
      }
    } else {
      this._index = index;
      this._ord = ord ?? 'asc';
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
    'table-filter': TableFilterEvent;
    'table-filter-column': TableFilterColumnEvent;
    'table-resize-col': TableResizeColEvent;
    'table-click': TableClickEvent;
    'table-dblclick': TableDblClickEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-table': GreyCat.Element<GuiTable>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead': GreyCat.Element<GuiTableHead>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead-cell': GreyCat.Element<GuiTableHeadCell>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody': GreyCat.Element<GuiTableBody>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody-row': GreyCat.Element<GuiTableBodyRow>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-tbody-cell': GreyCat.Element<GuiTableBodyCell>;
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
