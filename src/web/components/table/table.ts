import {
  GuiChangeEvent,
  GuiFactory,
  GuiElement,
  sl,
  toast,
  css,
  AnyValueElement,
  convertToTable,
  Disposer,
  TableLike,
  GuiValue,
  GuiValueProps,
} from '../../exports.js';
import '../search-input/index.js';
import type { GuiTableConfig } from './table-config.js';
import style from './table.css?inline';

export interface GuiTableProps {
  value: TableLike;
  filter: string;
  filterColumns: Array<string | undefined | null>;
  sortBy: readonly [number] | readonly [number, SortOrd];
  cellProps: CellPropsFactory;
  columnsWidths: Array<number | undefined>;
  minColWidth: number;
  ignoreCols: number[] | undefined;
  columnFactory: ColumnFactory | undefined;
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
  el: AnyValueElement,
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

export class GuiTable extends GuiElement implements GuiTableProps {
  static override styles = [css(style)];
  static COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  private _value: TableLike = [];
  private _table = gc.core.Table.create();
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
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  private _disposer = new Disposer();
  private _columnFactory: CleanColumnFactory | undefined;
  private _drawer: sl.SlDrawer;
  private _configEl: GuiTableConfig;
  /** if `true` update should recompute the filters */
  private _dirtyFilter: boolean = true;
  updateComplete: Promise<void>;

  constructor() {
    super();

    this.updateComplete = Promise.resolve();
    this._wCalc = new WidthCalculator(0, 0, 100);

    this._filter.className = 'gui-table-filter';
    this._filter.clearable = true;
    this._filter.placeholder = 'Filter the table';
    this._filter.part.add('filter');
    this._filter.oninput = () => {
      this.filter = this._filter.value;
      this._dirtyFilter = true;
    };
    this._filter.addEventListener('sl-clear', () => (this.filter = ''));

    this._tableContainer = document.createElement('div');
    this._tableContainer.className = 'gui-table';
    this._tableContainer.part.add('table');
    this._tableContainer.append(this._thead, this._tbody);

    this._drawer = document.createElement('sl-drawer');
    this._drawer.label = 'Table config';
    this._drawer.contained = true;

    this._configEl = document.createElement('gui-table-config');
    this._configEl.table = this;
    this._configEl.addEventListener('sl-change', () => {
      const value = this._configEl.value;
      this.setAttrs(value);
    });
    this._drawer.appendChild(this._configEl);

    this._thead.addEventListener('gui-table-sort', (ev) => {
      if (this._sortCol.sortBy(ev.detail)) {
        this._sortTable();
      }
      this.update();
    });

    this._thead.addEventListener('gui-table-filter-column', (ev) => {
      this._filterColumns[ev.detail.index] = ev.detail.text;
      this._dirtyFilter = true;
      this.update();
    });

    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(
            new GuiTableClickEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, mouseEvent: e }),
          );
        }
      }
    };
    this._tbody.addEventListener('click', onClick);
    this._tbody.addEventListener('auxclick', onClick);

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
        await this._tbody.computeRowHeight(this._table, this._ignoreCols, this._columnFactory);
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

    this._tableContainer.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      this.toggleConfig();
    });

    this._configEl.addEventListener('gui-table-apply-mappings', async (ev) => {
      ev.stopPropagation();
      await this.applyMappings();
      this.update();
    });

    this.shadowRoot.append(this._filter, this._tableContainer, this._drawer);
  }

  /**
   * Returns the underlying `core.Table` value.
   *
   * **This is only a getter, if you want to set the table use the `value` setter**
   */
  get table(): gc.core.Table {
    return this._table;
  }

  set table(_: gc.core.Table) {
    throw new Error(`use the 'value' setter to update the table`);
  }

  get value(): TableLike {
    return this._value;
  }

  set value(table: TableLike) {
    this._value = table;
    this._setValue(table);
    this.update();
  }

  /**
   * Returns the current mappings
   *
   * To apply the mappings, call `applyMappings()`
   */
  get mappings() {
    return this._configEl.mappings;
  }

  set mappings(mappings: gc.core.TableColumnMapping[]) {
    this._configEl.mappings = mappings;
  }

  private _setValue(table: TableLike) {
    if (table === this._table) {
      // noop: same ref
      return;
    }

    this._table = convertToTable(table);
    this._wCalc.reset();
    this._wCalc.setNbCols(this._table.cols.length);
    this._sortTable();
    this._dirtyFilter = true;
  }

  /**
   * Applies the current mappings from the config to the table.
   *
   * If no `table` parameter is given, the current table value is used. Otherwise, the given `table` is used to apply
   * the mappings. This is made to prevent updating the table twice. Since this will
   * do it in one update it will re-render only once.
   *
   * Eg.
   * ```ts
   * el.value = myTable; // updates the table
   * el.applyMappings(); // updates the table again with the result of the mappings
   *
   * // The above "double update" can be prevented by doing:
   * el.applyMappings(myTable); // only one update
   * ```
   */
  async applyMappings(table: gc.core.Table = this._table): Promise<void> {
    try {
      const mappings = this._configEl.mappings;
      if (mappings.length > 0) {
        const offset = this._table.cols.length;
        this._table = await gc.core.Table.applyMappings(table, mappings);
        const headers = new Array(this._table.cols.length);
        for (let i = offset; i < this._table.cols.length; i++) {
          headers[i] = mappings[i - offset].extractors.join('.');
        }
        this._table.headers = headers;
        await this.update();
        this.dispatchEvent(new GuiChangeEvent(this._table));
      } else if (table !== this._table) {
        this._table = table;
        await this.update();
        this.dispatchEvent(new GuiChangeEvent(this._table));
      }
    } catch (err) {
      toast.error(err);
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
    this._dirtyFilter = true;
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
    this._dirtyFilter = true;
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
    ignoreCols = this._ignoreCols,
    columnFactory = this._columnFactory,
    // defaultCellFactory = this._defaultCellFactory,
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
    this._columnFactory = this._sanitizeColumnFactory(columnFactory);
    // this._defaultCellFactory = this._sanitizeCellFactory(defaultCellFactory);
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
      columnsWidths: this._wCalc.getWidths(),
      ignoreCols: this._ignoreCols,
      // defaultCellFactory: this._defaultCellFactory,
      columnFactory: this._columnFactory,
      rowHeight: this._tbody.rowHeight,
      globalFilter: this.globalFilter,
      globalFilterPlaceholder: this.globalFilterPlaceholder,
      minColWidth: this._wCalc.getMinWidth(),
      onrowupdate: this._rowUpdateCallback,
    };
  }

  connectedCallback() {
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
        await this._tbody.computeRowHeight(this._table, this._ignoreCols, this._columnFactory);
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

  toggleConfig(): void {
    if (this._drawer.open) {
      this._drawer.hide();
    } else {
      this._drawer.show();
    }
  }

  openConfig(): void {
    this._drawer.show();
  }

  closeConfig(): void {
    this._drawer.hide();
  }

  async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    const { promise, resolve } = Promise.withResolvers<void>();
    this.updateComplete = promise;

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
      this._dirtyFilter,
      this._wCalc,
      this._cellProps,
      this._columnFactory,
    );
    this._dirtyFilter = false;

    this._wCalc.setAvailable(this._tbody.virtualScroller.scrollWidth || this._tbody.scrollWidth);
    this._wCalc.update();

    this._thead.update(this._table, this._ignoreCols, this._wCalc, this._sortCol);
    this._tbody.updateWidths(this._wCalc, nb_cols);

    this._configEl.value = this.getAttrs();

    resolve();
  }

  asCsv(sep = ';'): string {
    if (!this._table) {
      return '';
    }

    let csv = '';

    if (this._table.headers) {
      csv += this._table.headers.filter((h) => h.length > 0).join(sep);
      csv += '\n';
    }

    const nb_cols = this._table.cols.length;
    const nb_rows = this._table.nbRows();
    if (typeof this._cellProps === 'function') {
      const cellProps = this._cellProps;
      for (let r = 0; r < nb_rows; r++) {
        let needsSep = false;
        for (let c = 0; c < nb_cols; c++) {
          if (this._ignoreCols?.includes(c)) {
            continue;
          }
          if (needsSep) {
            csv += sep;
          }
          csv += gc.sdk.stringify(cellProps(this._table.cols[c][r], r, c));
          needsSep = true;
        }
        csv += '\n';
      }
    } else {
      const props: gc.sdk.StringifyProps = Object.assign({ value: undefined }, this._cellProps);
      for (let r = 0; r < nb_rows; r++) {
        let needsSep = false;
        for (let c = 0; c < nb_cols; c++) {
          if (this._ignoreCols?.includes(c)) {
            continue;
          }
          if (needsSep) {
            csv += sep;
          }
          props.value = this._table.cols[c][r];
          csv += gc.sdk.stringify(props);
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
    const ord = this._sortCol.ord === 'desc' ? gc.sdk.SortOrd.desc : gc.sdk.SortOrd.asc;
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
      cleanFactory[index] = this._sanitizeCellFactory(index, factory[index]);
    }

    return cleanFactory;
  }

  private _sanitizeCellFactory(
    index: string,
    cellFactory: CleanCellFactory | CellFactory,
  ): CleanCellFactory {
    switch (typeof cellFactory) {
      case 'string': {
        return { tag: cellFactory.toUpperCase() };
      }
      case 'function': {
        const tagName = `gui-table-col-${index}-${Date.now()}`;
        customElements.define(
          tagName,
          class extends GuiValue implements AnyValueElement {
            rowIdx = -1;

            override update() {
              if (!this.isConnected) {
                return;
              }
              const node = cellFactory(
                this._value,
                (this.parentElement as GuiTableBodyCell).rowIdx,
                this,
              );
              this.shadowRoot.replaceChildren(node);
            }
          },
        );
        return { tag: tagName.toUpperCase() };
      }
      case 'object': {
        return { tag: cellFactory.tag.toUpperCase(), props: cellFactory.props };
      }
    }
  }
}

export class GuiTableHead extends HTMLElement {
  update(
    table: gc.core.Table,
    ignoreCols: number[] | undefined,
    calc: WidthCalculator,
    sortCol: SortCol,
  ) {
    let index = 0; // this index does not account for ignored columns
    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      if (ignoreCols?.includes(colIdx)) {
        continue;
      }
      const colWidth = calc.getWidth(index);
      const header = this._getOrCreateHeader(index, colWidth);
      header.update(
        colIdx,
        table.headers?.[colIdx],
        table.subheaders?.[colIdx],
        sortCol.index === colIdx ? sortCol.ord : 'default',
      );
      index += 1;
    }

    this._removeExceedingColumns(index - 1);

    this.childNodes.forEach((node) => {
      const header = node as GuiTableHeadCell;
      if (header.index === sortCol.index && sortCol.ord !== 'default') {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });
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
 * A column header cell.
 */
export class GuiTableHeadCell extends HTMLElement {
  public index = 0;
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
        this.dispatchEvent(new GuiTableSortEvent(this.index));
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
    this._input.part.add('col-filter');
    this._dropdown.appendChild(this._input);

    this._input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const text = target.value;
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.index, text));
    });

    this._input.addEventListener('sl-clear', () => {
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.index, ''));
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
      this.dispatchEvent(new GuiTableResizeColEvent(this.index, e.clientX));
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
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.index, text));
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
    this._filter.part.add('col-filter-icon');

    this._title.classList.add('gui-thead-title');
    this._title.part.add('title');
    this._container.appendChild(this._title);

    this._sorter.classList.add('gui-thead-sorter');
    this._sorter.part.add('sorter');
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
    this.index = index;
    const title = document.createDocumentFragment();

    const headerContainer = document.createElement('sl-tooltip');
    const headerEl = document.createElement('span');
    headerEl.className = 'gui-thead-header';

    if (header) {
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
  total_unfiltered = 0;
  filtered_rows: number[] = [];
  virtual_rows: number[] = [];
  virtualScroller: HTMLDivElement;
  private _factory: GuiFactory = GuiFactory.global;

  constructor() {
    super();

    this.virtualScroller = document.createElement('div');
    this.virtualScroller.className = 'gui-tbody-scroller';
    this.virtualScroller.style.position = 'absolute';
    this.virtualScroller.style.visibility = 'hidden';
    this.virtualScroller.style.width = '100%';
  }

  connectedCallback() {
    this._factory = GuiFactory.closest(this);
    this.replaceChildren(this.virtualScroller);
  }

  async computeRowHeight(
    table: gc.core.Table,
    ignoreCols: number[] | undefined,
    columnFactory: CleanColumnFactory | undefined,
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
        this._factory,
        columnFactory,
      );
      const tempElement = document.createElement('span');
      tempElement.style.visibility = 'hidden';
      tempElement.style.position = 'absolute';
      tempElement.style.lineHeight = 'var(--line-height)';
      tempElement.textContent = 'M'; // 'M' gives a reliable height measurement

      // Append to inherit default styles
      document.body.appendChild(tempElement);
      const lineHeight = tempElement.offsetHeight;
      document.body.removeChild(tempElement);
      this.rowHeight = Math.max(lineHeight, tmpRow.offsetHeight);
      tmpRow.remove();
    }
    // console.log('Computed row height', this.rowHeight);
  }

  async update(
    fromRowIdx: number,
    table: gc.core.Table,
    ignoreCols: number[] | undefined,
    filterText: string,
    filterColumns: Array<string | undefined | null>,
    dirtyFilters: boolean,
    wCalc: WidthCalculator,
    cellProps: CellPropsFactory,
    columnFactory?: CleanColumnFactory,
  ): Promise<void> {
    const nb_rows = table.nbRows();
    if (this.rowHeight === -1 && nb_rows > 0) {
      await this.computeRowHeight(table, ignoreCols, columnFactory);
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

    if (dirtyFilters) {
      this.total_unfiltered = 0;
      this.virtual_rows.length = 0;
      this.filtered_rows.length = nb_rows;
      const no_filter = filterText.length === 0 && filterColumns.length === 0;
      for (let i = 0; i < nb_rows; i++) {
        if (this.total_unfiltered > maxRowIdx) {
          break;
        }
        if (no_filter || this._rowMatchesFilters(table, filterText, filterColumns, i, cellProps)) {
          this.filtered_rows[i] = this.total_unfiltered;
          this.total_unfiltered += 1;
          this.virtual_rows.push(i);
        } else {
          this.filtered_rows[i] = -1;
        }
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
      await rowEl.update(table, ignoreCols, rowIdx, wCalc, cellProps, this._factory, columnFactory);
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
    this.virtualScroller.style.height = `${this.total_unfiltered * this.rowHeight}px`;

    // and add it back to the DOM if necessary
    if (rendered > 0) {
      this.appendChild(this.virtualScroller);
    }
  }

  updateWidths(wCalc: WidthCalculator, nb_cols: number) {
    const widths = Array.from({ length: nb_cols }, (_, i) => wCalc.getWidth(i));
    for (let i = 0; i < this.children.length; i++) {
      const row = this.children[i];
      if (row instanceof GuiTableBodyRow) {
        for (let j = 0; j < row.children.length; j++) {
          const cell = row.children[j];
          if (cell instanceof GuiTableBodyCell) {
            cell.style.width = `${widths[j]}px`;
          }
        }
      }
    }
  }

  resizeColumn(colIdx: number, width: number): void {
    for (let i = 0; i < this.children.length; i++) {
      const row = this.children[i];
      if (row instanceof GuiTableBodyRow) {
        const cell = row.children[colIdx];
        if (cell instanceof GuiTableBodyCell) {
          cell.style.width = `${width}px`;
        }
      }
    }
  }

  /**
   * Compares each cells with the given `filterText` and `filterColumns`.
   * Returns `true` for a match, `false` means no cell match.
   */
  private _rowMatchesFilters(
    table: gc.core.Table,
    filterText: string,
    filterColumns: Array<string | undefined | null>,
    rowIdx: number,
    cellProps: CellPropsFactory,
  ): boolean {
    // If no filters are applied, always match.
    if (
      filterText.length === 0 &&
      filterColumns.every((filter) => !filter || filter.length === 0)
    ) {
      return true;
    }

    let globalMatchFound = false;

    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      const colFilter = filterColumns[colIdx];
      let cellText: string | undefined;

      // Only compute cell text if needed (for col filter or global filter)
      if ((colFilter && colFilter.length > 0) || filterText.length > 0) {
        cellText =
          typeof cellProps === 'function'
            ? gc.sdk.stringify(cellProps(table.cols[colIdx][rowIdx], rowIdx, colIdx)).toLowerCase()
            : gc.sdk.stringify({ ...cellProps, value: table.cols[colIdx][rowIdx] }).toLowerCase();
      }

      // Column-specific filter must match.
      if (colFilter && colFilter.length > 0) {
        if (!cellText?.includes(colFilter)) {
          return false;
        }
      }

      // For global filter, at least one cell must match.
      if (!globalMatchFound && filterText.length > 0 && cellText?.includes(filterText)) {
        globalMatchFound = true;
      }
    }

    if (filterText.length > 0 && !globalMatchFound) {
      return false;
    }

    return true;
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
    table: gc.core.Table,
    ignoreCols: number[] | undefined,
    rowIdx: number,
    wCalc: WidthCalculator,
    cellProps: CellPropsFactory,
    factory: GuiFactory,
    columnFactory?: CleanColumnFactory,
  ): Promise<void> {
    this.idx = rowIdx;
    this.setAttribute('data-row', `${rowIdx}`);

    let index = 0;
    const children = this.children;
    let cell: GuiTableBodyCell;
    for (let colIdx = 0; colIdx < table.cols.length; colIdx++) {
      if (ignoreCols?.includes(colIdx)) {
        continue;
      }
      if (children[index]) {
        cell = children[index] as GuiTableBodyCell;
      } else {
        cell = this._createCell(table);
      }
      // SAFETY:
      // `originalColIndex` is optional for backward-compatibility reason, which means
      // it is safe to assert it as a 'number' here
      await cell.update(
        table,
        rowIdx,
        colIdx,
        cellProps,
        wCalc.getWidth(index),
        columnFactory?.[colIdx] ?? { tag: factory.valueTag },
      );
      index += 1;
    }

    // remove exceeding cells
    this._removeExceedingCells(index - 1);
  }

  cell(index: number) {
    return this.children[index] as GuiTableBodyCell;
  }

  private _createCell(table: gc.core.Table): GuiTableBodyCell {
    const cell = document.createElement('gui-tbody-cell');
    // cell.part.add('cell', `cell-${index}`);
    cell.addEventListener('gui-input', (ev) => {
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(
        new GuiTableInputEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, value: ev.detail }),
      );
    });
    cell.addEventListener('gui-change', (ev) => {
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(
        new GuiTableChangeEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, value: ev.detail }),
      );
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
    const values = Array.from({ length: this.children.length });
    this.childNodes.forEach((child, i) => {
      values[i] = (child as GuiTableBodyCell).value;
    });
    return values;
  }
}

export class GuiTableBodyCell extends HTMLElement {
  private _prevWidth: number | undefined;
  rowIdx = -1;
  colIdx = -1;
  /** By default the cell is displayed by a GuiValueElement (`'gui-value'`) */
  private _cell: AnyValueElement;

  constructor() {
    super();
    this._cell = document.createElement('gui-value');
  }

  set value(value: unknown) {
    this._cell.value = value;
  }

  get value() {
    return this._cell.value;
  }

  connectedCallback() {
    this.replaceChildren(this._cell);
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
    table: gc.core.Table,
    rowIdx: number,
    colIdx: number,
    cellProps: CellPropsFactory,
    colWidth: number,
    factory: CleanCellFactory,
  ): Promise<void> {
    this.rowIdx = rowIdx;
    if (this.colIdx != colIdx) {
      this.colIdx = colIdx;
      this.setAttribute('data-col', `${colIdx}`);
    }
    const value = table.cols[colIdx][rowIdx];
    if (value instanceof Node) {
      this.replaceChildren(value);
      this.style.width = `${colWidth}px`;
      return Promise.resolve();
    }

    if (this._cell.tagName !== factory.tag) {
      // different tag: create+replace
      this._cell = document.createElement(factory.tag) as AnyValueElement;
      this.replaceChildren(this._cell);
    }

    if (this._cell instanceof GuiValue) {
      if (typeof cellProps === 'function') {
        const attrs = {
          ...cellProps(value, rowIdx, colIdx),
          ...factory.props,
        };
        this._cell.setAttrs(attrs);
      } else {
        const attrs = {
          ...cellProps,
          ...factory.props,
          value,
        };
        this._cell.setAttrs(attrs);
      }
    } else if ('setAttrs' in this._cell && typeof this._cell.setAttrs === 'function') {
      const attrs = { ...factory.props, value: value };
      this._cell.setAttrs(attrs);
    } else {
      Object.assign(this._cell, factory.props);
      this._cell.value = value;
    }

    if (this._prevWidth != colWidth) {
      this._prevWidth = colWidth;
      this.style.width = `${colWidth}px`;
    }
    return Promise.resolve();
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
class GuiTableResizeColEvent extends CustomEvent<GuiTableResizeColDetail> {
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
    super(GuiTableSortEvent.NAME, { detail: colIdx, bubbles: true, composed: true });
  }
}

export class GuiTableFilterEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-table-filter';
  constructor() {
    super(GuiTableFilterEvent.NAME, { bubbles: true, composed: true });
  }
}

/**
 * `detail` contains the target input of dropdown from filter button
 */
export class GuiTableFilterColumnEvent extends CustomEvent<{ index: number; text: string }> {
  static readonly NAME = 'gui-table-filter-column';

  constructor(index: number, text: string) {
    super(GuiTableFilterColumnEvent.NAME, {
      detail: { index, text },
      bubbles: true,
      composed: true,
    });
  }
}

export type GuiTableEventDetail = {
  /** The clicked row index */
  rowIdx: number;
  /** The clicked column index */
  colIdx: number;
};

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
    this._widths = Array.from({ length: _nb_cols });
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
    this._widths.length = n;
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

export type GuiTableClickEventDetail = {
  mouseEvent: MouseEvent;
} & GuiTableEventDetail;

export class GuiTableClickEvent extends CustomEvent<GuiTableClickEventDetail> {
  static readonly NAME = 'gui-table-click';

  constructor(detail: GuiTableClickEventDetail) {
    super(GuiTableClickEvent.NAME, { detail, bubbles: true, composed: true });
  }
}
export class GuiTableDblClickEvent extends CustomEvent<GuiTableEventDetail> {
  static readonly NAME = 'gui-table-dblclick';

  constructor(detail: GuiTableEventDetail) {
    super(GuiTableDblClickEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

export class GuiTableInputEvent extends CustomEvent<GuiTableEventDetail & { value: unknown }> {
  static readonly NAME = 'gui-table-input';

  constructor(detail: GuiTableEventDetail & { value: unknown }) {
    super(GuiTableInputEvent.NAME, { detail, bubbles: true, composed: true });
  }
}
export class GuiTableChangeEvent extends CustomEvent<GuiTableEventDetail> {
  static readonly NAME = 'gui-table-change';

  constructor(detail: GuiTableEventDetail & { value: unknown }) {
    super(GuiTableChangeEvent.NAME, { detail, bubbles: true, composed: true });
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
    [GuiTableSortEvent.NAME]: GuiTableSortEvent;
    [GuiTableResizeColEvent.NAME]: GuiTableResizeColEvent;
    [GuiTableFilterColumnEvent.NAME]: GuiTableFilterColumnEvent;
  }

  interface GuiTableEventMap {
    [GuiTableInputEvent.NAME]: GuiTableInputEvent;
    [GuiTableChangeEvent.NAME]: GuiTableChangeEvent;
    [GuiTableClickEvent.NAME]: GuiTableClickEvent;
    [GuiTableDblClickEvent.NAME]: GuiTableDblClickEvent;
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
