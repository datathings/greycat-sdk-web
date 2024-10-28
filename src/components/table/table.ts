import {
  GuiInputEvent,
  utils,
  core,
  GuiClickEvent,
  GuiDblClickEvent,
  GuiChangeEvent,
} from '../../exports.js';
import '../value/index.js'; // makes sure we already have GuiValue defined
import '../search-input/index.js'; // makes sure we already have GuiSearchInput defined
import { GuiValue, GuiValueProps } from '../value/index.js';
import { convertToTable, Disposer, GuiRenderEvent, TableLike } from '../common.js';

export interface GuiTableProps {
  value: TableLike;
  filter: string;
  filterColumns: Array<string | undefined | null>;
  sortBy: readonly [number] | readonly [number, SortOrd];
  cellProps: CellPropsFactory;
  headers: string[] | undefined;
  columnsWidths: Array<number | undefined>;
  minColWidth: number;
  ignoreCols: number[] | undefined;
  columnFactory: ColumnFactory | undefined;
  defaultCellFactory: CellFactory;
  rowHeight: number;
  globalFilter: boolean;
  globalFilterPlaceholder: string;
  onrowupdate: RowUpdateCallback;
}
export type CellProps = Partial<GuiValueProps> & { value: unknown };
export type CellAttrs = Partial<Omit<GuiValueProps, 'value'>>;

/**
 * A function called to compute the cell properties
 * that will be passed to the underlying `<gui-value />` component.
 *
 * Or an object containing the cell properties.
 */
export type CellPropsFactory =
  | ((value: unknown, rowIdx: number, colIdx: number) => CellProps)
  | CellAttrs;

export type CellTagFactory = string | CleanCellFactory;
/**
 * - `value`: the current cell value to render
 * - `rowIdx`: the row index in the table
 * - `el`: the parent WebComponent element that will render the returned `Node`
 */
export type CellFnFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  rowIdx: number,
  el: GuiValueElement,
) => Node;

export type CellFactory = CellTagFactory | CellFnFactory;
export type ColumnFactory = Record<number, string | CellFactory>;
export type CleanCellFactory = { tag: string; props?: Record<string | number | symbol, unknown> };
type CleanColumnFactory = Record<number, CleanCellFactory>;

/** reusing the same object for every render to ease gc */
const REUSABLE_CELL_PROPS: CellProps = {
  value: null,
};
const DEFAULT_CELL_PROPS: CellPropsFactory = (value) => {
  REUSABLE_CELL_PROPS.value = value;
  return REUSABLE_CELL_PROPS;
};

/**
 * #### Param 0 `rowEl`
 * The DOM element of the row
 *
 * #### Param 1 `rowIdx`
 * The row index in the table
 */
export type RowUpdateCallback = (rowEl: GuiTableBodyRow, rowIdx: number) => void;

export class GuiTable extends HTMLElement implements GuiTableProps {
  static COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  private _table = core.Table.create();
  private _filter = document.createElement('gui-search-input');
  private _tableContainer = document.createElement('div');
  private _thead = document.createElement('gui-thead');
  private _tbody = document.createElement('gui-tbody');
  private _wCalc: WidthCalculator;
  private _scrollToRowIndex = 0;
  private _sortCol: SortCol = new SortCol(-1, 'default');
  private _ignoreCols: number[] | undefined;
  private _cellProps = DEFAULT_CELL_PROPS;
  private _prevFromRowIdx = 0;
  private _filterText = '';
  private _filterColumns: Array<string | undefined | null> = [];
  private _headers: string[] | undefined;
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  private _disposer = new Disposer();
  private _columnFactory: CleanColumnFactory | undefined;
  private _defaultCellFactory: CleanCellFactory = { tag: 'gui-value' };

  constructor() {
    super();

    this._wCalc = new WidthCalculator(0, 0, 100);

    this._filter.className = 'gui-table-filter';
    this._filter.clearable = true;
    this._filter.placeholder = 'Filter the table';
    this._filter.oninput = () => (this.filter = this._filter.value);
    this._filter.addEventListener('sl-clear', () => (this.filter = ''));

    this._tableContainer = document.createElement('div');
    this._tableContainer.className = 'gui-table';
    this._tableContainer.append(this._thead, this._tbody);

    this._thead.addEventListener('gui-table-sort', (ev) => {
      if (this._sortCol.sortBy(ev.detail)) {
        this._sortTable();
      }
      this.update();
    });

    this._thead.addEventListener('gui-table-filter-column', (ev) => {
      this._filterColumns[ev.detail.index] = ev.detail.text;
      // this._thead.showColumnFilters();
      this.update();
    });

    this._tbody.addEventListener('click', (e) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(new GuiTableClickEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }));
        }
      }
    });

    this._tbody.addEventListener('dblclick', (e) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(
            new GuiTableDblClickEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }),
          );
        }
      }
    });

    this._tableContainer.addEventListener('scroll', async () => {
      if (this._tbody.rowHeight <= 0 && this._table.nbRows() > 0) {
        await this._tbody.computeRowHeight(
          this._table,
          this._ignoreCols,
          this._defaultCellFactory,
          this._columnFactory,
        );
      }
      const fromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);
      if (this._prevFromRowIdx == fromRowIdx) {
        // in buffer, no need to re-render
      } else {
        // out of buffer, re-render
        this._prevFromRowIdx = fromRowIdx;
        this.update();
      }
    });
  }

  /**
   * Returns the underlying `core.Table` value.
   *
   * **This is only a getter, if you want to set the table use the `value` setter**
   */
  get table(): core.Table {
    return this._table;
  }

  get value(): TableLike {
    return this._table;
  }

  set value(table: TableLike) {
    this._setValue(table);
    this.update();
  }

  private _setValue(table: TableLike) {
    if (table === this._table) {
      // noop: same ref
      return;
    }
    this._table = convertToTable(table);
    this._wCalc.reset();
    this._wCalc.setNbCols(this._table.cols.length);
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
    this.update();
  }

  get columnFactory() {
    return this._columnFactory;
  }

  /**
   * Associates column index to user-defined HTMLElement `'tagName'`.
   *
   * By default, all columns are associated with `'gui-value'`.
   *
   * Any properties can be given to the underlying elements by specifying a `ColumnFactory` rather than
   * a string `tagName` (eg. `{ tag: 'my-component', props: { color: 'blue' } }`)
   *
   * **The given element should be at least compliant with `GuiValueElement`**
   */
  set columnFactory(factories: ColumnFactory | undefined) {
    this._columnFactory = this._sanitizeColumnFactory(factories);
    this.update();
  }

  get defaultCellFactory() {
    return this._defaultCellFactory;
  }

  /**
   * Overrides the default cell factory used by the table to display cells value.
   *
   * By default the table uses `'gui-value'`, but anything can be given as long as it is
   * compliant with the `GuiValueElement` interface.
   *
   * *If you want to override the display for a specific column, use `columnFactory`.*
   */
  set defaultCellFactory(factory: CellFactory) {
    this._defaultCellFactory = this._sanitizeCellFactory(factory);
    this.update();
  }

  set columnWidths(columnWidths: Array<number | undefined>) {
    this._wCalc.setWidths(columnWidths);
    this.update();
  }

  get columnWidths() {
    return this._wCalc.getWidths();
  }

  get rowHeight() {
    return this._tbody.rowHeight;
  }

  set rowHeight(height: number) {
    this._tbody.rowHeight = height;
    this._prevFromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);
    this.update();
  }

  scrollToRow(rowIdx: number, behavior?: ScrollBehavior): void {
    // TODO this should find the associated data-index and get its offset rather than trying to compute it because filter can mess the calculus
    this._tableContainer.scrollTo({ top: rowIdx * this._tbody.rowHeight, behavior });
  }

  /**
   * Resets the columns width. This calls `update()` once done.
   */
  resetColumnsWidth(): void {
    this._wCalc.reset();
    this.update();
  }

  /**
   * Changes the columns width to fit there header. This calls `update()` once done.
   */
  fitColumnsToHeaders(): void {
    if (!this._table) {
      return;
    }
    this._thead.querySelectorAll('gui-thead-cell').forEach((el, i) => {
      if (i == this._thead.children.length - 1) {
        // do not try to fit the last child
        return;
      }
      const tmp = el.style.width;
      el.style.width = '';
      const after = el.scrollWidth + 1;
      this._wCalc.setWidth(i, after);
      el.style.width = tmp;
    });
    this.update();
  }

  get minColWidth() {
    return this._wCalc.getMinWidth();
  }

  /**
   * Sets the minimum column width (cannot be less than 6px)
   */
  set minColWidth(width: number) {
    this._wCalc.setMinWidth(Math.max(6, width));
    this.update();
  }

  get columnsWidths() {
    return this._wCalc.getWidths();
  }

  /**
   * Manually define the column widths. The index of the array is the index of the colum.
   * If an element is `undefined`, then the `minColWidth` will be used or more if there is enough space.
   */
  set columnsWidths(widths: Array<number | undefined>) {
    this._wCalc.setWidths(widths);
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
    if (this._sortCol.sortBy(index, ord)) {
      this._sortTable();
    }
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
    value = this._table,
    filter = this._filterText,
    filterColumns = this._filterColumns,
    sortBy = [this._sortCol.index, this._sortCol.ord],
    cellProps = this._cellProps,
    headers = this._headers,
    ignoreCols = this._ignoreCols,
    columnFactory = this._columnFactory,
    defaultCellFactory = this._defaultCellFactory,
    rowHeight = this._tbody.rowHeight,
    globalFilter = this.globalFilter,
    globalFilterPlaceholder = this.globalFilterPlaceholder,
    columnsWidths = this._wCalc.getWidths(),
    minColWidth = this._wCalc.getMinWidth(),
    onrowupdate = this._rowUpdateCallback,
  }: Partial<GuiTableProps>) {
    this._setValue(value);
    this._ignoreCols = ignoreCols;
    this._filterText = filter;
    this._filterColumns = filterColumns;
    this._cellProps = cellProps;
    this._headers = headers;
    this._columnFactory = this._sanitizeColumnFactory(columnFactory);
    this._defaultCellFactory = this._sanitizeCellFactory(defaultCellFactory);
    this.globalFilter = globalFilter;
    this.globalFilterPlaceholder = globalFilterPlaceholder;
    if (this._sortCol.sortBy(sortBy[0], sortBy[1])) {
      this._sortTable();
    }
    this._wCalc.setWidths(columnsWidths);
    this._wCalc.setMinWidth(minColWidth);
    this._rowUpdateCallback = onrowupdate;

    this._tbody.rowHeight = rowHeight;
    // because we've potentially changed "rowHeight" we need to re-compute the current "fromRowIdx"
    this._prevFromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);

    this.update();
  }

  getAttrs(): GuiTableProps {
    return {
      value: this._table,
      filter: this._filterText,
      filterColumns: this._filterColumns,
      sortBy: [this._sortCol.index, this._sortCol.ord],
      cellProps: this._cellProps,
      headers: this._headers,
      columnsWidths: this._wCalc.getWidths(),
      ignoreCols: this._ignoreCols,
      defaultCellFactory: this._defaultCellFactory,
      columnFactory: this._columnFactory,
      rowHeight: this._tbody.rowHeight,
      globalFilter: this.globalFilter,
      globalFilterPlaceholder: this.globalFilterPlaceholder,
      minColWidth: this._wCalc.getMinWidth(),
      onrowupdate: this._rowUpdateCallback,
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
      // record the new manually set width
      this._wCalc.setWidth(index, newWidth);
      // update the header cell width
      hcell.colWidth = newWidth;
      // update the associated body cells widths
      this._tbody.resizeColumn(index, newWidth);
      px = cx;
      requestAnimationFrame(colResizeLoop);
    };

    this._thead.addEventListener(
      'gui-table-resize-col',
      (e) => {
        resize = true;
        index = e.detail.colIdx;
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

    const oResize = new ResizeObserver(async () => {
      if (this._table.nbRows() > 0) {
        // recompute the available space for the rows
        await this._tbody.computeRowHeight(
          this._table,
          this._ignoreCols,
          this._defaultCellFactory,
          this._columnFactory,
        );
      }
      // update the whole table
      this.update();
    });
    oResize.observe(this);
    this._disposer.disposables.push(() => oResize.disconnect());
  }

  disconnectedCallback() {
    this._prevFromRowIdx = 0;
    this._disposer.dispose();
    this.replaceChildren(); // cleanup
  }

  async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    const start = Date.now();

    let nb_cols = 0;
    for (let i = 0; i < this._table.cols.length; i++) {
      if (!this.ignoreCols?.includes(i)) {
        nb_cols += 1;
      }
    }
    this._wCalc.setAvailable(this._tbody.virtualScroller.scrollWidth);
    this._wCalc.setNbCols(nb_cols);
    this._wCalc.update();

    await this._tbody.update(
      this._prevFromRowIdx,
      this._table,
      this._ignoreCols,
      this._filterText,
      this._filterColumns,
      this._wCalc,
      this._cellProps,
      // this._rowUpdateCallback,
      this._defaultCellFactory,
      this._columnFactory,
    );

    this._wCalc.setAvailable(this._tbody.virtualScroller.scrollWidth);
    this._wCalc.update();
    this._thead.update(this._table, this._ignoreCols, this._wCalc, this._sortCol, this._headers);
    this._tbody.updateWidths(this._wCalc);

    this.dispatchEvent(new GuiRenderEvent(start));
  }

  asCsv(sep = ';'): string {
    if (!this._table) {
      return '';
    }

    let csv = '';

    if (this._headers) {
      csv += this._headers.join(sep);
      csv += '\n';
    }

    const nb_cols = this._table.cols.length;
    const nb_rows = this._table.nbRows();
    if (typeof this._cellProps === 'function') {
      const cellProps = this._cellProps;
      for (let r = 0; r < nb_rows; r++) {
        let needsSep = false;
        for (let c = 0; c < nb_cols; c++) {
          if (needsSep) {
            csv += sep;
          }
          if (this._ignoreCols?.includes(c)) {
            continue;
          }
          csv += utils.stringify(cellProps(this._table.cols[c][r], r, c));
          needsSep = true;
        }
        csv += '\n';
      }
    } else {
      const props: utils.StringifyProps = Object.assign({ value: undefined }, this._cellProps);
      for (let r = 0; r < nb_rows; r++) {
        let needsSep = false;
        for (let c = 0; c < nb_cols; c++) {
          if (needsSep) {
            csv += sep;
          }
          if (this._ignoreCols?.includes(c)) {
            continue;
          }
          props.value = this._table.cols[c][r];
          csv += utils.stringify(props);
          needsSep = true;
        }
        csv += '\n';
      }
    }

    return csv;
  }

  private _sortTable(): void {
    if (this._sortCol.index === -1) {
      // no need to sort or sort out of bound (can happen if previous table had more columns)
      this._sortCol.reset();
      return;
    }
    const ord = this._sortCol.ord === 'desc' ? utils.SortOrd.desc : utils.SortOrd.asc;
    this._table.sort(this._sortCol.index, ord);
  }

  private _sanitizeColumnFactory(
    factory: CleanColumnFactory | ColumnFactory | undefined,
  ): CleanColumnFactory | undefined {
    if (factory === undefined) {
      return undefined;
    }
    if (factory === this._columnFactory) {
      // untouched
      return this._columnFactory;
    }

    const cleanFactory: CleanColumnFactory = {};
    for (const index in factory) {
      cleanFactory[index] = this._sanitizeCellFactory(factory[index]);
    }

    return cleanFactory;
  }

  private _sanitizeCellFactory(cellFactory: CleanCellFactory | CellFactory): CleanCellFactory {
    switch (typeof cellFactory) {
      case 'string': {
        return { tag: cellFactory };
      }
      case 'function': {
        const tagName = `gui-table-cell-${Date.now()}`;
        customElements.define(
          tagName,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          class extends HTMLElement implements GuiValueElement<any> {
            rowIdx = -1;
            private _value: unknown;

            get value() {
              return this._value;
            }

            set value(value: unknown) {
              this._value = value;
              this.replaceChildren(
                cellFactory(value, (this.parentElement as GuiTableBodyCell).rowIdx, this),
              );
            }
          },
        );
        return { tag: tagName };
      }
      case 'object': {
        return { tag: cellFactory.tag, props: cellFactory.props };
      }
    }
  }
}

export class GuiTableHead extends HTMLElement {
  update(
    table: core.Table,
    ignoreCols: number[] | undefined,
    calc: WidthCalculator,
    sortCol: SortCol,
    headers?: string[],
  ) {
    let index = 0; // this index does not account for ignored columns
    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      if (ignoreCols?.includes(colIdx)) {
        continue;
      }
      const colWidth = calc.getWidth(colIdx);
      const header = this._getOrCreateHeader(colIdx, colWidth);
      header.update(
        colIdx,
        headers?.[index] ?? table.headers?.[colIdx],
        table.subheaders?.[colIdx],
        sortCol.index === colIdx ? sortCol.ord : 'default',
      );
      index += 1;
    }

    this._removeExceedingColumns(table.cols.length - 1);

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

export type GuiTableResizeColDetail = {
  /** the currently resized column index */
  colIdx: number;
  /** the current `event.clientX` */
  x: number;
};

/**
 * `detail` contains the target column index and the current `event.clientX`
 */
export class GuiTableResizeColEvent extends CustomEvent<GuiTableResizeColDetail> {
  static readonly NAME = 'gui-table-resize-col';

  constructor(colIdx: number, x: number) {
    super(GuiTableResizeColEvent.NAME, { detail: { colIdx, x }, bubbles: true });
  }
}

/**
 * `detail` contains the sorted column index
 */
export class GuiTableSortEvent extends CustomEvent<number> {
  static readonly NAME = 'gui-table-sort';

  constructor(colIdx: number) {
    super(GuiTableSortEvent.NAME, { detail: colIdx, bubbles: true });
  }
}

export class GuiTableFilterEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-table-filter';
  constructor() {
    super(GuiTableFilterEvent.NAME, { bubbles: true });
  }
}

/**
 * `detail` contains the target input of dropdown from filter button
 */
export class GuiTableFilterColumnEvent extends CustomEvent<{ index: number; text: string }> {
  static readonly NAME = 'gui-table-filter-column';

  constructor(index: number, text: string) {
    super(GuiTableFilterColumnEvent.NAME, { detail: { index, text }, bubbles: true });
  }
}

export type GuiTableClickDetail = {
  /** The clicked row index */
  rowIdx: number;
  /** The clicked column index */
  colIdx: number;
};

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
  private _icons = { asc: '↓', desc: '↑', default: ' ', search: '', close: '' };

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
        this.dispatchEvent(new GuiTableSortEvent(this._index));
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
      this.dispatchEvent(new GuiTableFilterColumnEvent(this._index, text));
    });

    this._input.addEventListener('sl-clear', () => {
      this.dispatchEvent(new GuiTableFilterColumnEvent(this._index, ''));
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
      this.dispatchEvent(new GuiTableResizeColEvent(this._index, e.clientX));
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
      this.dispatchEvent(new GuiTableFilterColumnEvent(this._index, text));
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

  update(index: number, header: string | undefined, subheader: string | undefined, sort: SortOrd) {
    this._index = index;
    const title = document.createDocumentFragment();

    const headerContainer = document.createElement('sl-tooltip');
    const headerEl = document.createElement('span');
    headerEl.className = 'gui-thead-header';

    if (header !== undefined) {
      headerEl.textContent = header;
    } else {
      headerEl.textContent = `Column ${index}`;
    }
    headerContainer.content = headerEl.textContent;
    headerContainer.appendChild(headerEl);

    title.appendChild(headerContainer);

    if (subheader !== undefined) {
      const subheaderContainer = document.createElement('sl-tooltip');
      const subheaderEl = document.createElement('span');
      subheaderEl.className = 'gui-thead-subheader';
      subheaderEl.textContent = subheader;
      subheaderContainer.content = subheaderEl.textContent;
      subheaderContainer.appendChild(subheaderEl);
      title.appendChild(subheaderContainer);
    }

    this._title.replaceChildren(title);
    this._sorter.textContent = this._icons[sort];
  }
}

// TODO shouldn't we provide this as a standalone component?
export class GuiTableBody extends HTMLElement {
  rowHeight = -1;
  maxVirtualRows = 0;
  filtered_rows: number[] = [];
  virtual_rows: number[] = [];
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

  async computeRowHeight(
    table: core.Table,
    ignoreCols: number[] | undefined,
    defaultCellFactory: CleanCellFactory,
    factory: CleanColumnFactory | undefined,
  ) {
    if (this.rowHeight <= 0) {
      // create a ghost row to compute the height
      const tmpRow = document.createElement('gui-tbody-row');
      this.appendChild(tmpRow);
      const calc = new WidthCalculator(1, table.cols.length, 150);
      await tmpRow.update(
        table,
        ignoreCols,
        0,
        calc,
        DEFAULT_CELL_PROPS,
        defaultCellFactory,
        factory,
      );
      const tempElement = document.createElement('span');
      tempElement.style.visibility = 'hidden';
      tempElement.style.position = 'absolute';
      tempElement.style.lineHeight = 'var(--line-height)';
      tempElement.textContent = 'M'; // 'M' gives a reliable height measurement
    
      // Append to inherit default styles
      document.body.appendChild(tempElement);
      const lineHeight = tempElement.offsetHeight;
      // document.body.removeChild(tempElement);
      this.rowHeight = Math.max(lineHeight, tmpRow.offsetHeight);
      tmpRow.remove();
    }
    // console.log('Computed row height', this.rowHeight);
  }

  async update(
    fromRowIdx: number,
    table: core.Table,
    ignoreCols: number[] | undefined,
    filterText: string,
    filterColumns: Array<string | undefined | null>,
    wCalc: WidthCalculator,
    cellProps: CellPropsFactory,
    defaultCellFactory: CleanCellFactory,
    factory?: CleanColumnFactory,
  ): Promise<void> {
    const nb_rows = table.nbRows();
    if (this.rowHeight === -1 && nb_rows > 0) {
      await this.computeRowHeight(table, ignoreCols, defaultCellFactory, factory);
    }

    // Make it `extraRows` more than the total height space divided by row height, so that we are sure that even
    // on scrolling up we won't see the background appear as there will always be "more rows" than displayable
    // in the scroll area. And of course, if the table already fits in the scroll area, we only display the
    // actual content without any extra row.
    //
    // We use `(value + 0.5) | 0` to get a speedy `Math.round(...)` equivalent
    const maxVirtualRows = Math.ceil(this.offsetHeight / this.rowHeight);
    this.maxVirtualRows = Math.min(maxVirtualRows, nb_rows);

    /** This is the max bound for rows */
    const maxRowIdx = nb_rows - 1;

    // remove virtual scroller while updating
    this.virtualScroller.remove();

    let total_unfiltered = 0;
    this.virtual_rows.length = 0;
    this.filtered_rows.length = nb_rows;
    for (let i = 0; i < nb_rows; i++) {
      if (total_unfiltered > maxRowIdx) {
        break;
      }
      if (this._rowMatchesFilters(table, filterText, filterColumns, i, cellProps)) {
        this.filtered_rows[i] = total_unfiltered;
        total_unfiltered += 1;
        this.virtual_rows.push(i);
      } else {
        this.filtered_rows[i] = -1;
      }
    }

    const rowHeight = `${this.rowHeight}px`;

    // We want to render as many rows as possible in the "view", but no more than needed
    // Therefore, we iterate from `0` to `maxVirtualRows` so that we stop when going over
    // the maximum height of the virtual "view".
    let rendered = 0;
    let filtered = 0;
    for (let virtIndex = 0; virtIndex < this.maxVirtualRows + filtered; virtIndex++) {
      // Compute the target row index starting from the "first row in view" and adding the iteration step
      const rowIdx = this.virtual_rows[fromRowIdx + virtIndex];
      // If we are at the end of the table rows, we have nothing more to render, so we break
      if (rowIdx === undefined || rowIdx > maxRowIdx) {
        break;
      }
      const viewIdx = this.filtered_rows[rowIdx];
      if (viewIdx === -1) {
        filtered += 1;
        continue;
      }
      const rowEl = this._getOrCreateRow(rendered);
      // update the DOM row to reflect the new row's data
      await rowEl.update(table, ignoreCols, rowIdx, wCalc, cellProps, defaultCellFactory, factory);
      rowEl.style.height = rowHeight;
      // at the right position
      rowEl.style.top = `${viewIdx * this.rowHeight}px`;
      if (viewIdx % 2 === 0) {
        rowEl.classList.add('gui-tbody-row-even');
      } else {
        rowEl.classList.remove('gui-tbody-row-even');
      }
      // updateCallback(rowEl, rowIdx);
      rendered += 1;
    }

    // remove exceeding rows
    this._removeExceedingRows(rendered - 1);

    // update virtual scroller height to reflect the number of unfiltered rows
    this.virtualScroller.style.height = `${total_unfiltered * this.rowHeight}px`;

    // and add it back to the DOM
    this.appendChild(this.virtualScroller);
  }

  updateWidths(wCalc: WidthCalculator) {
    this.childNodes.forEach((row) => {
      row.childNodes.forEach((cell, i) => {
        (cell as HTMLElement).style.width = `${wCalc.getWidth(i)}px`;
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

  /**
   * Compares each cells with the given `filterText` and `filterColumns`.
   * Returns `true` for a match, `false` means no cell match.
   */
  private _rowMatchesFilters(
    table: core.Table,
    filterText: string,
    filterColumns: Array<string | undefined | null>,
    rowIdx: number,
    cellProps: CellPropsFactory,
  ): boolean {
    const cells: string[] = new Array(table.cols.length);

    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      const colFilter = filterColumns[colIdx];
      if (colFilter && colFilter.length > 0) {
        if (typeof cellProps === 'function') {
          cells[colIdx] = utils
            .stringify(cellProps(table.cols[colIdx][rowIdx], rowIdx, colIdx))
            .toLowerCase();
        } else {
          cells[colIdx] = utils
            .stringify(Object.assign({}, cellProps, { value: table.cols[colIdx][rowIdx] }))
            .toLowerCase();
        }
        if (!cells[colIdx].includes(colFilter)) {
          return false;
        }
      }
    }

    if (filterText.length === 0) {
      return true;
    }

    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      if (cells[colIdx] === undefined) {
        if (typeof cellProps === 'function') {
          cells[colIdx] = utils
            .stringify(cellProps(table.cols[colIdx][rowIdx], rowIdx, colIdx))
            .toLowerCase();
        } else {
          cells[colIdx] = utils
            .stringify(Object.assign({}, cellProps, { value: table.cols[colIdx][rowIdx] }))
            .toLowerCase();
        }
      }
      if (cells[colIdx].includes(filterText)) {
        return true;
      }
    }

    return false;
  }

  private _getOrCreateRow(index: number): GuiTableBodyRow {
    if (this.children[index]) {
      return this.children[index] as GuiTableBodyRow;
    }

    const newRow = document.createElement('gui-tbody-row');
    this.appendChild(newRow);
    return newRow;
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
  /**
   * the original row index (from the `value` given to `gui-table`)
   *
   * *This is set after the creation of the row, and updated by the virtual scrolling.
   * Therefore, the value might be `-1` while the table is not fully rendered.*
   */
  idx = -1;

  async update(
    table: core.Table,
    ignoreCols: number[] | undefined,
    rowIdx: number,
    wCalc: WidthCalculator,
    cellProps: CellPropsFactory,
    defaultCellFactory: CleanCellFactory,
    factory?: CleanColumnFactory,
  ): Promise<void> {
    this.idx = rowIdx;
    this.setAttribute('data-row', `${rowIdx}`);

    let colIdx: number;
    for (colIdx = 0; colIdx < table.cols.length; colIdx++) {
      if (ignoreCols?.includes(colIdx)) {
        continue;
      }
      const cell = this._getOrCreateCell(table, colIdx);
      // SAFETY:
      // `originalColIndex` is optional for backward-compatibility reason, which means
      // it is safe to assert it as a 'number' here
      await cell.update(
        table,
        rowIdx,
        colIdx,
        cellProps,
        wCalc.getWidth(rowIdx),
        factory?.[colIdx] ?? defaultCellFactory,
      );
    }

    // remove exceeding cells
    this._removeExceedingCells(colIdx - 1);
  }

  cell(index: number) {
    return this.children[index] as GuiTableBodyCell;
  }

  private _getOrCreateCell(table: core.Table, index: number): GuiTableBodyCell {
    if (this.children[index]) {
      return this.children[index] as GuiTableBodyCell;
    }
    const cell = document.createElement('gui-tbody-cell');
    cell.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(new GuiTableInputEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }));
    });
    cell.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(new GuiTableChangeEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }));
    });
    this.appendChild(cell);
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

  get value() {
    const values = new Array(this.children.length);
    this.childNodes.forEach((child, i) => {
      values[i] = (child as GuiTableBodyCell).value;
    });
    return values;
  }
}

export class GuiTableBodyCell extends HTMLElement {
  rowIdx = -1;
  colIdx = -1;
  private _value: GuiValueElement;

  constructor() {
    super();
    this._value = document.createElement('gui-value');
  }

  set value(value: unknown) {
    this._value.value = value;
  }

  get value() {
    return this._value.value;
  }

  connectedCallback() {
    this.replaceChildren(this._value);
  }

  /**
   * ### Why is this async?
   *
   * Some cell elements might be Shoelace elements (eg. gui-object might rely on sl-card)
   * What this implies is that some of the elements are lit-powered and therefore they are asynchronously
   * updated. So we have to make this a promise, so that the underlying elements get a chance to actually
   * render and we get proper height reporting post-update.
   */
  async update(
    table: core.Table,
    rowIdx: number,
    colIdx: number,
    cellProps: CellPropsFactory,
    colWidth: number,
    factory: CleanCellFactory,
  ): Promise<void> {
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
    this.setAttribute('data-col', `${colIdx}`);
    if (factory) {
      if (this._value.tagName !== factory.tag.toUpperCase()) {
        // different tag: create+replace
        this._value = document.createElement(factory.tag) as GuiValueElement;
        this.replaceChildren(this._value);
      }
      if (this._value instanceof GuiValue) {
        if (typeof cellProps === 'function') {
          const attrs = {
            ...cellProps(table.cols[colIdx][rowIdx], rowIdx, colIdx),
            ...factory.props,
          };
          this._value.setAttrs(attrs);
        } else {
          const attrs = {
            ...cellProps,
            ...factory.props,
            value: table.cols[colIdx][rowIdx],
          };
          this._value.setAttrs(attrs);
        }
      } else if ('setAttrs' in this._value && typeof this._value.setAttrs === 'function') {
        const attrs = { ...factory.props, value: table.cols[colIdx][rowIdx] };
        this._value.setAttrs(attrs);
      } else {
        Object.assign(this._value, factory.props);
        this._value.value = table.cols[colIdx][rowIdx];
      }
    } else {
      let attrs: CellProps;
      if (typeof cellProps === 'function') {
        attrs = cellProps(table.cols[colIdx][rowIdx], rowIdx, colIdx);
      } else {
        attrs = { ...cellProps, value: table.cols[colIdx][rowIdx] };
      }
      if (this._value instanceof GuiValue) {
        this._value.setAttrs(attrs);
      } else if ('setAttrs' in this._value && typeof this._value.setAttrs === 'function') {
        this._value.setAttrs(attrs);
      } else {
        Object.assign(this._value, attrs);
      }
    }
    this.style.width = `${colWidth}px`;
    return Promise.resolve();
  }
}

/**
 * Minimal interface to implement when defining `columnFactory`
 */
export interface GuiValueElement<T = unknown> extends HTMLElement {
  value: T;
}

type SortOrd = 'asc' | 'desc' | 'default';

/**
 * Sorting state machine.
 *
 * Call `sortBy` to cycle through the different possible sorting state.
 *
 * To reset to the default "unsorted" state, call `reset()`.
 */
export class SortCol {
  constructor(
    private _index: number,
    private _ord: SortOrd,
  ) {}

  reset() {
    this._index = -1;
    this._ord = 'default';
  }

  /**
   * Returns `true` when the table needs to be resorted.
   */
  sortBy(index: number, ord?: SortOrd): boolean {
    if (this._index === index) {
      if (ord) {
        if (this._ord !== ord) {
          this._ord = ord;
          return true;
        }
        return false;
      }
      if (this._ord === 'default') {
        this._ord = 'asc';
        return true;
      }
      if (this._ord === 'asc') {
        this._ord = 'desc';
        return true;
      }
      this._ord = 'asc';
      return true;
    }
    this._index = index;
    this._ord = ord ?? 'asc';
    return true;
  }

  get index() {
    return this._index;
  }

  get ord() {
    return this._ord;
  }
}

class WidthCalculator {
  private _widths: Array<number | undefined>;
  private _width: number;

  constructor(
    private _available: number,
    private _nb_cols: number,
    private _min_width: number,
  ) {
    this._widths = new Array(_nb_cols);
    this._width = Math.max(_min_width, _available / _nb_cols);
  }

  reset(): void {
    this._widths.length = 0;
    this.update();
  }

  getMinWidth(): number {
    return this._min_width;
  }

  setMinWidth(width: number) {
    if (this._min_width === width) {
      return;
    }
    this._min_width = width;
  }

  getWidths(): Array<number | undefined> {
    return this._widths;
  }

  setWidths(widths: Array<number | undefined>) {
    this._widths.length = this._nb_cols;
    for (let i = 0; i < this._nb_cols; i++) {
      const w = widths[i];
      this._widths[i] = w === undefined || isNaN(w) ? undefined : Math.max(this._min_width, w);
    }
  }

  setNbCols(n: number) {
    if (this._nb_cols === n) {
      return;
    }
    this._nb_cols = n;
  }

  getAvailable(): number {
    return this._available;
  }

  setAvailable(width: number) {
    if (this._available === width) {
      return;
    }
    this._available = width;
  }

  setWidth(index: number, width: number) {
    if (index >= this._nb_cols || this._widths[index] === width) {
      return;
    }
    this._widths[index] = Math.max(this._min_width, width);
  }

  getWidth(index: number): number {
    return this._widths[index] ?? this._width;
  }

  update(): void {
    let incompressible = 0;
    let nb_cols = 0;
    for (let i = 0; i < this._nb_cols; i++) {
      const defined = this._widths[i];
      if (defined !== undefined) {
        incompressible += defined;
      } else {
        nb_cols += 1;
      }
    }
    const available = this._available - incompressible;
    this._width = Math.max(this._min_width, Math.floor(available / nb_cols));
  }
}

export class GuiTableClickEvent extends GuiClickEvent<GuiTableClickDetail> {}
export class GuiTableDblClickEvent extends GuiDblClickEvent<GuiTableClickDetail> {}
export class GuiTableInputEvent extends GuiInputEvent<{ rowIdx: number; colIdx: number }> {}
export class GuiTableChangeEvent extends GuiChangeEvent<{ rowIdx: number; colIdx: number }> {}

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
    [GuiTableSortEvent.NAME]: GuiTableSortEvent;
    [GuiTableResizeColEvent.NAME]: GuiTableResizeColEvent;
    [GuiTableFilterColumnEvent.NAME]: GuiTableFilterColumnEvent;
  }

  interface GuiTableEventMap {
    [GuiInputEvent.NAME]: GuiTableInputEvent;
    [GuiChangeEvent.NAME]: GuiTableChangeEvent;
    [GuiClickEvent.NAME]: GuiTableClickEvent;
    [GuiDblClickEvent.NAME]: GuiTableDblClickEvent;
  }

  interface GuiTableEventMap extends GuiTableHeadCellEventMap {
    'table-filter': GuiTableFilterEvent;
  }

  interface HTMLElementEventMap extends GuiTableEventMap {}

  namespace GreyCat {
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
