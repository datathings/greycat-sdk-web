import { utils } from '@greycat/sdk';
import '../value/index.js'; // makes sure we already have GuiValue defined
import '../search-input/index.js'; // makes sure we already have GuiSearchInput defined
import { GuiValue, GuiValueProps } from '../value/index.js';
import { Disposer, GuiRenderEvent, TableLike, TableLikeMeta, TableView } from '../common.js';

export type CellProps = Partial<GuiValueProps> & { value: unknown };
export type CellAttrs = Partial<Omit<GuiValueProps, 'value'>>;
/**
 * A function called to compute the cell properties
 * that will be passed to the underlying `<gui-value />` component.
 *
 * Or an object containing the cell properties.
 */
export type CellPropsFactory =
  | ((row: Cell[], value: unknown, rowIdx: number, colIdx: number) => CellProps)
  | CellAttrs;

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
  /**
   * The original index of the column in the table.
   *
   * This is required because `ignoreCols` will change indexing if used.
   *
   * *This is optional for backward compatible reasons, it is safe to assume that for
   * versions strictly greater than `> 6.10.36-testing` it is always defined*
   */
  originalColIndex?: number;
};

/** reusing the same object for every render to ease gc */
const REUSABLE_CELL_PROPS: CellProps = {
  value: null,
};
const DEFAULT_CELL_PROPS: CellPropsFactory = (_, value) => {
  REUSABLE_CELL_PROPS.value = value;
  return REUSABLE_CELL_PROPS;
};

export type RowUpdateCallback = (rowEl: GuiTableBodyRow, row: Cell[]) => void;

export class GuiTable extends HTMLElement {
  static COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  private _table = new TableView();
  private _rows: Array<Cell[]> = [];
  private _filter = document.createElement('gui-search-input');
  private _tableContainer = document.createElement('div');
  private _thead = document.createElement('gui-thead');
  private _tbody = document.createElement('gui-tbody');
  private _minColWidth = 100;
  private _scrollToRowIndex = 0;
  private _sortCol: SortCol = new SortCol(-1, 'default');
  private _ignoreCols: number[] | undefined;
  private _cellProps = DEFAULT_CELL_PROPS;
  private _prevFromRowIdx = 0;
  private _filterText = '';
  private _filterColumns: Array<string | undefined | null> = [];
  private _headers: string[] | undefined;
  /** a flag that is switched to `true` when the component is actually added to the DOM */
  private _initialized = false;
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  private _disposer = new Disposer();
  private _cellTagNames: Record<number, string> | undefined;

  constructor() {
    super();

    this._filter.className = 'gui-table-filter';
    this._filter.clearable = true;
    this._filter.placeholder = 'Filter the table';
    this._filter.oninput = () => (this.filter = this._filter.value);
    this._filter.addEventListener('sl-clear', () => (this.filter = ''));

    this._tableContainer = document.createElement('div');
    this._tableContainer.className = 'gui-table';
    this._tableContainer.append(this._thead, this._tbody);

    this._thead.addEventListener('table-sort', (ev) => {
      this._sortCol.sortBy(ev.detail);
      this.update();
    });

    this._thead.addEventListener('table-filter-column', (ev) => {
      this._filterColumns[ev.detail.index] = ev.detail.text;
      // this._thead.showColumnFilters();
      this.update();
    });

    this._tbody.addEventListener('click', (e) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(new TableClickEvent(cell.rowIdx, cell.colIdx, cell.data));
        }
      }
    });

    this._tbody.addEventListener('dblclick', (e) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(new TableClickEvent(cell.rowIdx, cell.colIdx, cell.data));
        }
      }
    });

    this._tableContainer.addEventListener('scroll', () => {
      if (this._tbody.rowHeight <= 0 && this._rows.length > 0) {
        this._tbody.computeRowHeight(this._rows[0], this._cellTagNames);
      }
      const fromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);

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
   * The underlying view into the table
   */
  get table() {
    return this._table;
  }

  get value(): TableLike | undefined {
    return this._table;
  }

  set value(table: TableLike | undefined) {
    if (table === undefined) {
      this._table.table = undefined;
      this.update();
      return;
    }
    this._table.table = table;
    this.computeTable();
    this.update();
  }

  computeTable() {
    if (!this._table.table) {
      return;
    }

    const ignoreCols = this._ignoreCols ? Array.from(new Set(this._ignoreCols)) : [];

    this._rows.length = this._table.rows.length;
    const nb_cols = this._table.meta.length;

    for (let rowIdx = 0; rowIdx < this._rows.length; rowIdx++) {
      this._rows[rowIdx] = new Array(nb_cols - ignoreCols.length);

      let virtColIdx = 0;
      for (let colIdx = 0; colIdx < nb_cols; colIdx++) {
        if (ignoreCols.includes(colIdx)) {
          // skip ignored columns
          continue;
        }
        this._rows[rowIdx][virtColIdx] = {
          value: this._table.rows[rowIdx][colIdx],
          originalIndex: rowIdx,
          originalColIndex: colIdx,
        };
        virtColIdx++;
      }
    }
  }

  /**
   * Whether or not to display a global input filter above the table
   */
  get globalFilter() {
    return this._filter.classList.contains('visible');
  }

  set globalFilter(b: boolean) {
    if (b) {
      this._filter.classList.add('visible');
    } else {
      this._filter.classList.remove('visible');
    }
  }

  get globalFilterPlaceholder() {
    return this._filter.placeholder;
  }

  set globalFilterPlaceholder(placeholder: string) {
    this._filter.placeholder = placeholder;
  }

  get scrollToRowIndex() {
    return this._scrollToRowIndex;
  }

  set scrollToRowIndex(index: number) {
    this._scrollToRowIndex = index;
    this.scrollToRow(index);
  }

  get ignoreCols() {
    return this._ignoreCols;
  }

  set ignoreCols(ignoreCols: number[] | undefined) {
    this._ignoreCols = ignoreCols;
    this.computeTable();
    this.update();
  }

  get cellTagNames() {
    return this._cellTagNames;
  }

  /**
   * Associates column index to user-defined HTMLElement `'tagName'`.
   *
   * By default, all columns are associated with `'gui-value'`.
   *
   * **The associated `tagName` should be at least compliant with `GuiTableCellElement`**
   */
  set cellTagNames(cellTagNames: Record<number, string> | undefined) {
    this._cellTagNames = this._sanitizeCellTagNames(cellTagNames);
    this.update();
  }

  get rowHeight() {
    return this._tbody.rowHeight;
  }

  set rowHeight(height: number) {
    this._tbody.rowHeight = height;
    const fromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);
    this._prevFromRowIdx = Math.max(0, fromRowIdx);
    this.update();
  }

  scrollToRow(rowIdx: number, behavior?: ScrollBehavior): void {
    this._tableContainer.scrollTo({ top: rowIdx * this._tbody.rowHeight, behavior });
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
      const titleEl = el.querySelector<HTMLElement>('.gui-thead-title');
      if (titleEl) {
        const titleFitWidth =
          titleEl.scrollWidth +
          48 /* the minimum for the icons */ +
          6; /* spacing (arguably this should be tied to var(--spacing)) */
        if (titleFitWidth > el.scrollWidth) {
          this._thead.widths[i] = titleFitWidth + 1; // +1 to prevent ellipsis from happening
        }
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

  set filter(text: string | undefined | null) {
    if (typeof text === 'string') {
      this._filterText = text.toLowerCase();
    } else {
      this._filterText = '';
    }
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

  set filterColumns(filters: Array<string | undefined | null>) {
    this._filterColumns = filters;
    this.querySelectorAll('gui-thead-cell').forEach((header, i) => {
      header.filter = filters[i];
    });
    this.update();
  }

  /**
   * The properties to pass to each cells (when they are of type `gui-value`).
   *
   * *Note that the properties are only given to instances of `gui-value`, which
   * implies that this is a noop for overridden columns with `cellTagNames`.*
   *
   * If `props` is a function, it will be called to compute the properties, and then be passed to the
   * cell.
   */
  set cellProps(props: CellPropsFactory) {
    this._cellProps = props;
    this.update();
  }

  get headers() {
    return this._headers;
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

  /**
   * Called everytime a row is rendered in the virtual list.
   *
   * *This can be used to dynamically change styling for instance.*
   *
   * ```ts
   *  // eg. change column 1 color based on column 2 value
   *  tableEl.onrowupdate = (el, row) => {
   *    const klass = row[2].value as string;
   *    switch (klass) {
   *      case 'low':
   *        (el.children[1] as HTMLElement).style.color = 'cyan';
   *        break;
   *      case 'normal':
   *        (el.children[1] as HTMLElement).style.color = 'lightgreen';
   *        break;
   *      case 'high':
   *        (el.children[1] as HTMLElement).style.color = 'orange';
   *        break;
   *    }
   *  };
   * ```
   */
  set onrowupdate(cb: RowUpdateCallback) {
    this._rowUpdateCallback = cb;
  }

  get onrowupdate(): RowUpdateCallback {
    return this._rowUpdateCallback;
  }

  setAttrs({
    value = this._table.table,
    filter = this._filterText,
    filterColumns = this._filterColumns,
    sortBy = [this._sortCol.index, this._sortCol.ord],
    cellProps = this._cellProps,
    headers = this._headers,
    columnsWidths = this._thead.widths,
    ignoreCols = this._ignoreCols,
    cellTagNames = this._cellTagNames,
    rowHeight = this._tbody.rowHeight,
    globalFilter = this.globalFilter,
    globalFilterPlaceholder = this.globalFilterPlaceholder,
  }: Partial<{
    value: TableLike;
    filter: string;
    filterColumns: Array<string | undefined | null>;
    sortBy: readonly [number] | readonly [number, SortOrd];
    cellProps: CellPropsFactory;
    headers: string[];
    columnsWidths: number[];
    ignoreCols: number[];
    cellTagNames: Record<number, string>;
    rowHeight: number;
    globalFilter: boolean;
    globalFilterPlaceholder: string;
  }>) {
    this._table.table = value; // FIXME this resets the cache everytime, potentially for nothing
    this._ignoreCols = ignoreCols;
    this.computeTable();
    this._filterText = filter;
    this._filterColumns = filterColumns;
    this._sortCol.sortBy(sortBy[0], sortBy[1]);
    this._cellProps = cellProps;
    this._headers = headers;
    this._thead.widths = columnsWidths;
    this._cellTagNames = this._sanitizeCellTagNames(cellTagNames);
    this.globalFilter = globalFilter;
    this.globalFilterPlaceholder = globalFilterPlaceholder;

    this._tbody.rowHeight = rowHeight;
    // because we've potentially changed "rowHeight" we need to re-compute the current "fromRowIdx"
    const fromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);
    this._prevFromRowIdx = Math.max(0, fromRowIdx);

    this.update();
  }

  getAttrs(): {
    table: TableLike | undefined;
    filter: string;
    filterColumns: Array<string | undefined | null>;
    sortBy: readonly [number, SortOrd];
    cellProps: CellPropsFactory;
    headers: string[] | undefined;
    columnsWidths: number[];
    ignoreCols: number[] | undefined;
    cellTagNames: Record<number, string> | undefined;
    rowHeight: number;
    globalFilter: boolean;
    globalFilterPlaceholder: string;
  } {
    return {
      table: this._table,
      filter: this._filterText,
      filterColumns: this._filterColumns,
      sortBy: [this._sortCol.index, this._sortCol.ord],
      cellProps: this._cellProps,
      headers: this._headers,
      columnsWidths: this._thead.widths,
      ignoreCols: this._ignoreCols,
      cellTagNames: this._cellTagNames,
      rowHeight: this._tbody.rowHeight,
      globalFilter: this.globalFilter,
      globalFilterPlaceholder: this.globalFilterPlaceholder,
    };
  }

  connectedCallback() {
    this.append(this._filter, this._tableContainer);

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
      if (this._rows.length > 0) {
        // recompute the available space for the rows
        this._tbody.computeRowHeight(this._rows[0], this._cellTagNames);
      }
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
      this._cellTagNames,
    );

    const widths = this._thead.update(
      this._table.meta,
      this._minColWidth,
      this._sortCol,
      this._tbody.virtualScroller.scrollWidth,
      this._headers,
    );

    this._tbody.updateWidths(widths);

    this.dispatchEvent(new GuiRenderEvent(start));
  }

  asCsv(sep = ','): string {
    if (!this._table) {
      return '';
    }

    const header =
      this._table.meta
        .map((m, i) => {
          if (m.header) {
            return m.header;
          }
          if (m.typeName) {
            return m.typeName;
          }
          return `column-${i}`;
        })
        .join(sep) ?? '';

    let body: string;
    if (typeof this._cellProps === 'function') {
      const cellProps = this._cellProps;
      body = this._rows
        .map((row, rowIdx) => {
          return row
            .map((cell, colIdx) => {
              return utils.stringify(cellProps(row, cell.value, rowIdx, colIdx));
            })
            .join(sep);
        })
        .join('\n');
    } else {
      const props: utils.StringifyProps = Object.assign({ value: undefined }, this._cellProps);
      body = this._rows
        .map((row) => {
          return row
            .map((cell) => {
              props.value = cell.value;
              return utils.stringify(props);
            })
            .join(sep);
        })
        .join('\n');
    }

    return header + '\n' + body;
  }

  private _filterRow(
    globalFilter: string,
    colFilters: Array<string | undefined | null>,
    row: Cell[],
    rowIdx: number,
    cellProps: CellPropsFactory,
  ): boolean {
    // cache stringified cells
    const cells: string[] = [];

    if (typeof cellProps === 'function') {
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
    } else {
      const props: utils.StringifyProps = Object.assign({ value: undefined }, cellProps);
      for (let i = 0; i < row.length; i++) {
        const colFilter = colFilters[i];
        props.value = row[i].value;
        cells[i] = utils.stringify(props).toLowerCase();
        if (colFilter && colFilter.length > 0) {
          // check column filter
          if (!cells[i].includes(colFilter)) {
            return false;
          }
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

  private _sanitizeCellTagNames(
    cellTagNames: Record<number, string> | undefined,
  ): Record<number, string> | undefined {
    if (this._cellTagNames === cellTagNames) {
      // untouched
      return this._cellTagNames;
    }
    if (cellTagNames === undefined) {
      this._cellTagNames = undefined;
      return this._cellTagNames;
    }
    this._cellTagNames = structuredClone(cellTagNames);
    if (this._cellTagNames) {
      for (const index in this._cellTagNames) {
        // HTMLElement.tagName property returns the uppercase tag name
        // eg. `const el = <gui-value />` will yield `el.tagName === 'GUI-VALUE'`
        this._cellTagNames[index] = this._cellTagNames[index].toUpperCase();
      }
    }
    return this._cellTagNames;
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
  ): number[] {
    const widths: number[] = [];
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
      widths[colIdx] = colWidth;
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

    return widths;
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
export class GuiTableHeadCell extends HTMLElement {
  private _index = 0;
  private _width = 0;
  private _container = document.createElement('div');
  private _title = document.createElement('div');
  private _sorter = document.createElement('div');
  private _resizer = document.createElement('div');
  private _filter = document.createElement('div');
  private _dropdown = document.createElement('div');
  private _input = document.createElement('gui-search-input');
  private _icons = { asc: '↓', desc: '↑', default: '↕', search: '', close: '' };

  constructor() {
    super();

    this._container.className = 'gui-thead';

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
    this._filter.addEventListener('keypress', (ev) => {
      if (ev.key === 'Enter') {
        this.openDropdown();
      }
    });

    this._dropdown.classList.add('gui-thead-dropdown');
    this._input.clearable = true;
    this._input.placeholder = 'Filter column';
    this._dropdown.appendChild(this._input);

    this._input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const text = target.value;
      this.dispatchEvent(new TableFilterColumnEvent(this._index, text));
    });

    this._input.addEventListener('blur', (e) => {
      // if the user clicked on the search icon, we let the click event handle the dropdown
      if (e.relatedTarget !== this._filter) {
        this.closeDropdown();
      }
    });

    this._input.addEventListener('keypress', (ev) => {
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

  set filter(text: string | undefined | null) {
    if (typeof text === 'string' && text.length > 0) {
      this._input.value = text;
      this.openDropdown();
      this.dispatchEvent(new TableFilterColumnEvent(this._index, text));
    } else {
      this._input.value = '';
      this.closeDropdown();
    }
  }

  connectedCallback() {
    const styles = getComputedStyle(this);
    this._icons.default = styles.getPropertyValue('--icon-sort-default');
    this._icons.asc = styles.getPropertyValue('--icon-sort-asc');
    this._icons.desc = styles.getPropertyValue('--icon-sort-desc');
    this._icons.close = styles.getPropertyValue('--icon-close');
    this._filter.style.backgroundImage = this._icons.search;

    this._title.classList.add('gui-thead-title');
    this._container.appendChild(this._title);

    this._sorter.classList.add('gui-thead-sorter');
    this._sorter.textContent = this._icons.default;
    this._container.appendChild(this._sorter);

    this._container.appendChild(this._filter);

    this._resizer.classList.add('gui-thead-resizer');

    this.appendChild(this._container);
    this.appendChild(this._dropdown);
    this.appendChild(this._resizer);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  /**
   * Closes all siblings if they are all empty, otherwise does nothing
   */
  closeDropdown() {
    const parent = this.closest('gui-thead');
    if (parent) {
      let allEmpty = true;
      const headers = parent.querySelectorAll('gui-thead-cell');
      headers.forEach((header) => {
        if (header._input.value.length > 0) {
          allEmpty = false;
        }
      });
      if (allEmpty) {
        headers.forEach((header) => {
          header._dropdown.classList.remove('open');
          header._filter.style.backgroundImage = this._icons.search;
        });
      }
    }
  }

  /**
   * Opens all siblings and focuses the current inner input
   */
  openDropdown() {
    const parent = this.closest('gui-thead');
    if (parent) {
      parent.querySelectorAll('gui-thead-cell').forEach((header) => {
        header._dropdown.classList.add('open');
      });
    }
    this._input.focus();
  }

  update(index: number, meta: TableLikeMeta | undefined, sort: SortOrd, customHeader?: string) {
    this._index = index;
    const title = document.createDocumentFragment();

    const header = document.createElement('span');
    header.className = 'gui-thead-header';

    if (customHeader) {
      header.textContent = customHeader;
    } else if (meta?.header) {
      header.textContent = meta.header;
    } else {
      header.textContent = `Column ${index}`;
    }

    title.appendChild(header);

    if (meta?.typeName) {
      const type = document.createElement('span');
      type.className = 'gui-thead-type';
      type.textContent = meta.typeName;
      title.appendChild(type);
    }

    this._title.replaceChildren(title);
    this._sorter.textContent = this._icons[sort];
  }
}

// TODO shouldn't we provide this as a standalone component?
class GuiTableBody extends HTMLElement {
  rowHeight = -1;
  maxVirtualRows = 0;
  virtualScroller: HTMLDivElement;

  constructor() {
    super();

    this.virtualScroller = document.createElement('div');
    this.virtualScroller.className = 'gui-tbody-scroller';
    this.virtualScroller.style.position = 'absolute';
    this.virtualScroller.style.visibility = 'hidden';
    this.virtualScroller.style.width = '100%';
  }

  connectedCallback() {
    this.replaceChildren(this.virtualScroller);
  }

  computeRowHeight(row: Cell[], tagNames: Record<number, string> | undefined) {
    if (this.rowHeight <= 0) {
      // create a ghost row to compute the height
      const tmpRow = document.createElement('gui-tbody-row');
      this.appendChild(tmpRow);
      tmpRow.update(
        0,
        [150],
        150,
        this.virtualScroller.scrollWidth,
        row,
        DEFAULT_CELL_PROPS,
        tagNames,
      );
      this.rowHeight = tmpRow.offsetHeight;
      tmpRow.remove();
    }
    // console.log('Computed row height', this.rowHeight);
  }

  update(
    fromRowIdx: number,
    colWidths: number[],
    rows: Cell[][],
    minColWidth: number,
    cellProps: CellPropsFactory,
    updateCallback: RowUpdateCallback,
    tagNames?: Record<number, string>,
  ): void {
    if (this.rowHeight === -1 && rows.length > 0) {
      this.computeRowHeight(rows[0], tagNames);
    }

    const extraRows = 5;
    // Make it `extraRows` more than the total height space divided by row height, so that we are sure that even
    // on scrolling up we won't see the background appear as there will always be "more rows" than displayable
    // in the scroll area. And of course, if the table already fits in the scroll area, we only display the
    // actual content without any extra row.
    //
    // We use `(value + 0.5) | 0` to get a speedy `Math.round(...)` equivalent
    this.maxVirtualRows = (Math.min(this.offsetHeight / this.rowHeight + extraRows, rows.length) + 0.5) | 0;

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
      row.update(
        realIdx,
        colWidths,
        minColWidth,
        availableWidth,
        rows[realIdx],
        cellProps,
        tagNames,
      );
      // at the right position
      row.style.height = `${this.rowHeight}px`;
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

  updateWidths(widths: number[]) {
    this.childNodes.forEach((row) => {
      row.childNodes.forEach((cell, i) => {
        (cell as HTMLElement).style.width = `${widths[i]}px`;
      });
    });
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

export class GuiTableBodyRow extends HTMLElement {
  idx = -1;

  update(
    index: number,
    colWidths: number[],
    minColWidth: number,
    availableWidth: number,
    row: Cell[],
    cellProps: CellPropsFactory,
    tagNames?: Record<number, string>,
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
      // SAFETY:
      // `originalColIndex` is optional for backward-compatibility reason, which means
      // it is safe to assert it as a 'number' here
      cell.update(
        tagNames?.[row[colIdx].originalColIndex as number],
        index,
        colIdx,
        row,
        cellProps,
        colWidth,
      );
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

export class GuiTableBodyCell extends HTMLElement {
  rowIdx = -1;
  colIdx = -1;
  data: Cell[] = [];
  value: GuiTableCellElement;

  constructor() {
    super();

    this.value = document.createElement('gui-value');
  }

  connectedCallback() {
    this.appendChild(this.value);
  }

  update(
    tagName = 'GUI-VALUE',
    index: number,
    colIdx: number,
    row: Cell[],
    cellProps: CellPropsFactory,
    colWidth: number,
  ) {
    this.rowIdx = index;
    this.colIdx = colIdx;
    this.data = row;
    this.setAttribute('data-col', `${colIdx}`);
    if (this.value.tagName !== tagName) {
      // different component, replace
      this.value = document.createElement(tagName) as GuiTableCellElement;
      this.replaceChildren(this.value);
    }
    if (this.value.tagName === 'GUI-VALUE') {
      if (typeof cellProps === 'function') {
        (this.value as GuiValue).setAttrs(cellProps(row, row[colIdx].value, index, colIdx));
      } else {
        (this.value as GuiValue).setAttrs({ ...cellProps, value: row[colIdx].value });
      }
    } else {
      this.value.value = row[colIdx].value;
    }
    this.style.width = `${colWidth}px`;
  }
}

/**
 * Minimal interface to implement when defining `cellTagNames`
 */
export interface GuiTableCellElement<T = unknown> extends HTMLElement {
  value: T;
}

export type SortOrd = 'asc' | 'desc' | 'default';

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

  interface GuiTableHeadCellEventMap {
    'table-sort': TableSortEvent;
    'table-resize-col': TableResizeColEvent;
    'table-filter-column': TableFilterColumnEvent;
  }

  interface GuiTableEventMap extends GuiTableHeadCellEventMap {
    'table-filter': TableFilterEvent;
    'table-click': TableClickEvent;
    'table-dblclick': TableDblClickEvent;
  }

  interface HTMLElementEventMap extends GuiTableEventMap { }
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-table': GreyCat.Element<GuiTable, GuiTableEventMap>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead': GreyCat.Element<GuiTableHead>;
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-thead-cell': GreyCat.Element<GuiTableHeadCell, GuiTableHeadCellEventMap>;
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
