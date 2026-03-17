import {
  GuiChangeEvent,
  GuiElement,
  sl,
  toast,
  css,
  AnyValueElement,
  convertToTable,
  TableLike,
  GuiValue,
  GuiValueProps,
  GuiTableMappings,
  modal,
  createElement,
  GuiFactory,
} from '../../exports.js';
import '../search-input/index.js';
import style from './table.css?inline';

export type TableCsvOptions = {
  sep: string;
  quoted: boolean;
  timestamp: boolean;
  timestampUnit: 's' | 'ms' | 'us';
};

export interface GuiTableProps {
  value: TableLike;
  filter: string;
  filterColumns: Array<string | undefined | null>;
  sortBy: readonly [number] | readonly [number, SortOrd];
  rowHeight: number;
  globalFilter: boolean;
  globalFilterPlaceholder: string;
  drawerEnabled: boolean;
  useDefaultColumns: boolean | undefined;
  columns: TableColumnDef[] | undefined;
  onrowupdate: RowUpdateCallback;
}
export type CellProps = Partial<GuiValueProps> & { value: unknown };
export type CellAttrs = Partial<Omit<GuiValueProps, 'value'>>;
/**
 * The generic param is for convenience, **it is not enforced whatsoever**.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellValueData<T = any> = {
  value: T;
  /** the current table */
  table: gc.core.Table;
  /** the row index in the table */
  row: number;
  /** the column index in the table */
  col: number;
  /** the container element */
  container: AnyValueElement;
};
export type CellValueFn = (data: CellValueData) => unknown;
export type TableColumnDef = {
  /**
   * Unique column index in the given `value`.
   *
   * For object-based data, you can use dot-notation to reference nested fields
   * (e.g., `gc.myModule.myType.$fields.myField`).
   */
  index: number;
  /**
   * Column header label.
   *
   * If not provided, the header will be taken from the `core.Table` definition.
   * Or from the field name for object-based data.
   * If no header exists there either, a default one will be generated from the `index`.
   */
  header?: string | Node;
  /**
   * Column subheader label.
   *
   * If not provided, the subheader will be taken from the `core.Table` definition.
   * Or from the field type for object-based data.
   * If no subheader exists there either, the default is `undefined`.
   */
  subheader?: string | Node;
  /**
   * Preferred column width in pixels.
   *
   * If omitted, an automatic width will be applied based on the available width.
   */
  width?: number;
  /**
   * Minimum column width in pixels, respected when resizing.
   *
   * Ensures the column cannot shrink below this value.
   */
  minWidth?: number;
  /** Hide the column entirely */
  hide?: boolean;
  /**
   * Custom renderer for the cells of this column.
   *
   * Can be used to override the default rendering logic.
   *
   * *When providing a custom element, make sure that it complies with `AnyValueElement`*
   *
   * *If you need to do a simple transformation, you might also look at `value`,
   * which keeps the underlying `gui-value` but apply a hook before*
   */
  cell?: CellFactory;
  /**
   * Hook invoked before assigning a value to the cell's `gui-value` element.
   * The return value becomes the actual value applied to the element.
   * Useful for transforming, sanitizing, or formatting the original input.
   *
   * When used together with `cell`, the custom renderer will receive
   * the processed value returned by this function.
   */
  value?: CellValueFn;
  /**
   * Whether to show or hide the filter icon
   */
  filterable?: boolean;
  /**
   * Whether to show or hide the sort icon
   */
  sortable?: boolean;
};

export type CellTagFactory = string | CleanCellFactory;
/**
 * The generic param is for convenience, **it is not enforced whatsoever**.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellData<T = any> = {
  value: T;
  /** the row index in the table */
  row: number;
  /** the column index in the table */
  col: number;
  /** the container element */
  container: GuiValue;
  /** userdata persists accross renders */
  userdata: Record<string, unknown>;
};
/**
 * - `value`: the current cell value to render
 * - `rowIdx`: the row index in the table
 * - `el`: the parent WebComponent element that will render the returned `Node`
 */
export type CellFnFactory = (data: CellData) => Node;
export type CellFactory = CellTagFactory | CellFnFactory;
export type ColumnFactory = Record<number, string | CellFactory>;
export type CleanCellFactory = { tag: string; props?: Record<string | number | symbol, unknown> };

/**
 * #### Param 0 `rowEl`
 * The DOM element of the row
 *
 * #### Param 1 `rowIdx`
 * The row index in the table
 */
export type RowUpdateCallback = (rowEl: GuiTableBodyRow, rowIdx: number) => void;

export interface TableColumnDefResolved {
  column: TableColumnDef;
  header: string | Node;
  subheader?: string | Node | undefined;
  /**
   * The display index.
   *
   * *Not to be confused with the `column.index` which is the index in the underlying `core::Table`*
   */
  displayIdx: number;
  /**
   * Updated by the resizing of a column using the header resizer.
   *
   * This is used to recall manually resized columns even after a recalculation of the widths
   * based on the total available widths.
   */
  resizedWidth?: number | undefined;
  /**
   * The calculated width of a column. If there is no `resizedWidth` nor `column.width` defined,
   * this is calculated as the average of the total available width divided by the number of columns.
   */
  width?: number | undefined;
  /**
   * The column minimum width when automatically calculating the width.
   */
  minWidth?: number | undefined;
  /**
   * The cell factory that must be used for this column's cells.
   */
  factory: CleanCellFactory;
  /**
   * If `true` the column should not be displayed.
   */
  hide: boolean;
}

export interface TableState {
  /** The displayed columns */
  readonly columns: TableColumnDefResolved[];
  /* Specifies the default minimum column width in pixels */
  minColWidth: number;
}

export class GuiTable extends GuiElement implements GuiTableProps {
  static override styles = [css(style)];
  static COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  private static gen_id = 0;

  private _value: TableLike = [];
  private _table = gc.core.Table.create();
  private _filter = document.createElement('gui-search-input');
  private _tableContainer = document.createElement('div');
  private _thead = document.createElement('gui-thead');
  private _tbody = document.createElement('gui-tbody');
  private _scrollToRowIndex = 0;
  private _prevFromRowIdx = 0;
  private _filterText = '';
  private _filterColumns: Array<string | undefined | null> = [];
  private _rowUpdateCallback: RowUpdateCallback = () => void 0;
  private _drawer: sl.SlDrawer;
  private _drawerEnabled: boolean;
  private _useDefaultColumns = false;
  private _columns: TableColumnDef[] | undefined = undefined;
  private readonly _state: TableState = {
    columns: [],
    minColWidth: 150,
  };
  private _sortCol: SortCol = new SortCol(-1, 'default');
  /** if `true` update should recompute the filters */
  private _dirtyFilter: boolean = true;
  private _mappings: GuiTableMappings;
  private _factory: GuiFactory;
  updateComplete: Promise<void>;

  constructor() {
    super();

    GuiTable.gen_id += 1;

    this._factory = GuiFactory.closest(this);
    this.updateComplete = Promise.resolve();

    this._filter.className = 'gui-table-filter';
    this._filter.clearable = true;
    this._filter.placeholder = 'Filter the table';
    this._filter.part.add('filter');
    this._filter.setAttribute('exportparts', 'base:filter-base');
    this._filter.oninput = () => {
      this.filter = this._filter.value;
      this._dirtyFilter = true;
    };
    this._filter.addEventListener('sl-clear', () => (this.filter = ''));

    this._tableContainer = document.createElement('div');
    this._tableContainer.className = 'gui-table';
    this._tableContainer.part.add('table');
    this._tableContainer.append(this._thead, this._tbody);

    this._drawerEnabled = false;
    this._drawer = document.createElement('sl-drawer');
    this._drawer.label = 'Table config';
    this._drawer.contained = true;
    this._drawer.open = false;

    this._mappings = document.createElement('gui-table-mappings');
    this._mappings.table = this._table;
    this._mappings.addEventListener('gui-table-mappings-apply', async (ev) => {
      ev.stopPropagation();
      await this.applyMappings();
      this.dispatchEvent(new GuiTableApplyMappingsEvent());
    });

    this._drawer.appendChild(
      <div className="gui-list">
        <div className="gui-row">
          <sl-button
            size="small"
            onclick={async () => {
              try {
                this.downloadAsCsv();
              } catch (err) {
                toast.error(err);
              }
            }}
          >
            Download as CSV
          </sl-button>
          <sl-tooltip content="Shrink column widths to fit header text" style={{ '--show-delay': '500' }}>
            <sl-button size="small" onclick={() => this.fitColumns()}>
              Fit columns
            </sl-button>
          </sl-tooltip>
          <sl-tooltip content="Reset column widths to their default" style={{ '--show-delay': '500' }}>
            <sl-button size="small" onclick={() => this.resetColumns()}>
              Reset columns
            </sl-button>
          </sl-tooltip>
        </div>
        {this._mappings}
      </div>,
    );

    this._thead.addEventListener('gui-table-sort', (ev) => {
      if (this._sortCol.sortBy(ev.detail)) {
        this._sortTable();
      }
      this.update();
    });

    this._thead.addEventListener('gui-table-filter-column', (ev) => {
      this._filterColumns[ev.detail.index] = ev.detail.text.toLowerCase();
      this._dirtyFilter = true;
      this.update();
    });

    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(new GuiTableClickEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, mouseEvent: e }));
        }
      }
    };
    this._tbody.addEventListener('click', onClick);
    this._tbody.addEventListener('auxclick', onClick);

    this._tbody.addEventListener('dblclick', (e) => {
      if (e.target instanceof Element) {
        const cell = e.target.closest('gui-tbody-cell');
        if (cell) {
          this.dispatchEvent(new GuiTableDblClickEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }));
        }
      }
    });

    this._tableContainer.addEventListener('scroll', async () => {
      if (this._tbody.rowHeight <= 0 && this._table.nbRows() > 0) {
        await this._tbody.computeRowHeight(this._table, this._state);
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

    this.shadowRoot.append(this._filter, this._tableContainer, this._drawer);
  }

  private _computeColumns(columns: TableColumnDef[] | undefined): void {
    if (columns === undefined) {
      for (let i = 0; i < this._table.cols.length; i++) {
        this._state.columns[i] = this._resolveColumn({ index: i }, i);
      }
      this._state.columns.length = this._table.cols.length;
      return;
    }

    if (this._useDefaultColumns) {
      const defaultColumns: TableColumnDef[] = [];
      for (let i = 0; i < this._table.cols.length; i++) {
        const column = columns.find((c) => c.index === i);
        if (column) {
          if (column.hide === true) {
            continue;
          }
          defaultColumns.push(column);
        } else {
          defaultColumns.push({ index: i });
        }
      }
      columns = defaultColumns;
    }

    let index = 0;
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.hide) {
        continue;
      }
      const resolvedCol = this._resolveColumn(column, index, this._state.columns[index]);
      this._state.columns[index] = resolvedCol;
      index += 1;
    }
    // shrink previous columns
    this._state.columns.length = index;
  }

  private _calculateColumnWidths(total_width: number): void {
    let incompressible = 0;
    const unspecified_col_idx: number[] = [];

    for (let i = 0; i < this._state.columns.length; i++) {
      const col = this._state.columns[i];
      if (col.resizedWidth) {
        incompressible += col.resizedWidth;
        col.width = col.resizedWidth;
      } else if (col.column.width) {
        incompressible += col.column.width;
        col.width = col.column.width;
      } else {
        unspecified_col_idx.push(i);
      }
    }

    const available = total_width - incompressible;
    let taken = 0;
    for (let i = 0; i < unspecified_col_idx.length - 1; i++) {
      const col = this._state.columns[unspecified_col_idx[i]];
      col.width = Math.max(col.minWidth ?? this._state.minColWidth, Math.floor(available / unspecified_col_idx.length));
      taken += col.width;
    }
    if (unspecified_col_idx.length > 0) {
      const lastCol = this._state.columns[unspecified_col_idx[unspecified_col_idx.length - 1]];
      lastCol.width = Math.max(total_width - incompressible - taken, lastCol.minWidth ?? this._state.minColWidth);
    }
  }

  private _resolveColumn(
    column: TableColumnDef,
    displayIdx: number,
    prev?: TableColumnDefResolved | undefined,
  ): TableColumnDefResolved {
    const width = prev ? (prev.resizedWidth ?? prev.width) : column.width;
    return {
      ...prev,
      column,
      displayIdx,
      header: column.header ?? this._table.headers?.[column.index] ?? `Column ${displayIdx}`,
      subheader: column.subheader ?? this._table.subheaders?.[column.index],
      factory: column.cell
        ? this._sanitizeCellFactory(displayIdx, column.cell)
        : { tag: this._factory.valueTag.toUpperCase() },
      hide: column.hide === true,
      minWidth: column.minWidth,
      width,
    };
  }

  /**
   * Returns the underlying `core.Table` value.
   *
   * **This is only a getter, if you want to set the table use the `value` setter**
   */
  get table(): gc.core.Table {
    return this._table;
  }

  private set table(_: gc.core.Table) {
    console.warn(`'GuiTable.table' setter is a no-op, use 'GuiTable.value' setter instead`);
  }

  /**
   * The data to display in the table.
   *
   * This can be of many forms: `core.Table`, `Array`, `Map`, etc
   */
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
    return this._mappings.value;
  }

  set mappings(mappings: gc.core.TableColumnMapping[]) {
    this._mappings.value = mappings;
  }

  private _setValue(table: TableLike) {
    if (table !== this._table) {
      this._table = convertToTable(table);
    }
    this._computeColumns(this._columns);
    this._sortTable();
    this._mappings.table = this._table;
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
  async applyMappings(table: gc.core.Table = this._table): Promise<gc.core.Table> {
    try {
      const mappings = this.mappings;
      if (mappings.length > 0) {
        const offset = this._table.cols.length;
        const new_table = await gc.core.Table.applyMappings(table, mappings, gc.$[this._factory.greycatName]);
        // oxlint-disable-next-line no-new-array
        const headers: string[] = new Array(new_table.cols.length);
        for (let i = 0; i < offset; i++) {
          headers[i] = this._table.headers?.[i] ?? `Column ${i}`;
        }
        for (let i = offset; i < new_table.cols.length; i++) {
          headers[i] = mappings[i - offset].extractors.join('.');
        }
        new_table.headers = headers;
        table = new_table;
      }
      this._setValue(table);
      await this.update();
      this.dispatchEvent(new GuiChangeEvent(this._table));
    } catch (err) {
      toast.error(err);
    }

    return table;
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
    for (const column of this._state.columns) {
      column.resizedWidth = undefined;
    }
    this.update();
  }

  async downloadAsCsv(): Promise<void> {
    const options: TableCsvOptions = {
      sep: ';',
      quoted: false,
      timestamp: true,
      timestampUnit: 'ms',
    };
    const proceed = await modal.confirm({
      title: 'Csv Options',
      message: (
        <div className="gui-list">
          <sl-input
            label="Separator"
            helpText="Column delimiter"
            size="small"
            value={options.sep}
            onsl-change={function () {
              options.sep = this.value;
            }}
          />
          <sl-checkbox
            helpText="Whether or not to use double-quote for every cells"
            size="small"
            checked={options.quoted}
            onsl-change={function () {
              options.quoted = this.checked;
            }}
          >
            Quoted
          </sl-checkbox>
          <sl-checkbox
            helpText="Whether or not to use a timestamp (seconds since epoch) for core.time"
            size="small"
            checked={options.timestamp}
            onsl-change={function () {
              options.timestamp = this.checked;
            }}
          >
            Timestamp
          </sl-checkbox>
          <sl-select helpText="The unit of the timestamp for core.time" size="small" value={options.timestampUnit}>
            <sl-option value="s">Seconds</sl-option>
            <sl-option value="ms">Milliseconds</sl-option>
            <sl-option value="us">Microseconds</sl-option>
          </sl-select>
        </div>
      ),
      cancel: 'Cancel',
      confirm: 'Download',
    });
    if (!proceed) {
      // if closing the modal, abort the operation
      return;
    }
    const csv = this.asCsv(options);

    const blob = new Blob([csv], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';

    // Append the anchor to the body and trigger the click event
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Changes the columns width to fit there header. This calls `update()` once done.
   */
  fitColumns(): void {
    if (!this._table) {
      return;
    }
    this._thead.querySelectorAll('gui-thead-cell').forEach((el, i) => {
      if (i == this._thead.children.length - 1 || i >= this._state.columns.length) {
        // do not try to fit the last child
        return;
      }
      const tmp = el.style.width;
      el.style.width = '';
      const after = el.scrollWidth + 1;
      this._state.columns[i].resizedWidth = after;
      el.style.width = tmp;
    });
    this.update();
  }

  /**
   * Resets each columns width to the defaults
   */
  resetColumns(): void {
    if (!this._table) {
      return;
    }
    for (const col of this._state.columns) {
      col.resizedWidth = undefined;
      col.width = col.column.width;
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
      this._filter.value = text;
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
    this._filterColumns = filters.map((v) => v?.toLowerCase());
    this.shadowRoot.querySelectorAll('gui-thead-cell').forEach((header, i) => {
      header.filter = filters[i];
    });
    this._dirtyFilter = true;
    this.update();
  }

  get sortBy() {
    return [this._sortCol.displayIdx, this._sortCol.ord] as const;
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

  /**
   * Whether or not to enable the config drawer by *right-click*ing the table.
   *
   * By default the drawer is disabled
   */
  get drawerEnabled() {
    return this._drawerEnabled;
  }

  set drawerEnabled(enabled: boolean) {
    if (this._drawerEnabled) {
      if (!enabled) {
        this.closeConfig();
      }
    }
    this._drawerEnabled = enabled;
    this.update();
  }

  /**
   * Whether to automatically infer columns from the table data.
   * If enabled, all fields are displayed as columns unless explicitly
   * overridden in `columns`.
   *
   * Default: `false`
   */
  get useDefaultColumns() {
    return this._useDefaultColumns;
  }

  set useDefaultColumns(enabled: boolean | undefined) {
    this._useDefaultColumns = !!enabled;
    this.update();
  }

  /**
   * Explicit column definitions for the table.
   *
   * The order of this array determines the display order.
   *
   * If `useDefaultColumns` is `true`, columns are inferred from the data.
   * Specific columns can still be customized or hidden here using additional
   * properties (e.g., `hide: true`).
   */
  get columns(): TableColumnDef[] | undefined {
    return this._columns;
  }

  set columns(columns: TableColumnDef[] | undefined) {
    this._columns = columns;
    this._computeColumns(columns);
    this.update();
  }

  setHeaders(headers: string[]) {
    this._table.headers = headers;
  }

  getHeaders() {
    return this._table.headers;
  }

  setAttrs({
    value = this._table,
    filter = this._filterText,
    filterColumns = this._filterColumns,
    sortBy = [this._sortCol.displayIdx, this._sortCol.ord],
    rowHeight = this._tbody.rowHeight,
    globalFilter = this.globalFilter,
    globalFilterPlaceholder = this.globalFilterPlaceholder,
    onrowupdate = this._rowUpdateCallback,
    drawerEnabled = this._drawerEnabled,
    columns = this._columns,
    useDefaultColumns = this._useDefaultColumns,
  }: Partial<GuiTableProps>) {
    this._useDefaultColumns = useDefaultColumns;
    this._columns = columns;
    this._setValue(value);
    this._filterText = filter.toLowerCase();
    this._filter.value = filter;
    this._filterColumns = filterColumns.map((v) => v?.toLowerCase());
    this.globalFilter = globalFilter;
    this.globalFilterPlaceholder = globalFilterPlaceholder;
    if (this._sortCol.sortBy(sortBy[0], sortBy[1])) {
      this._sortTable();
    }
    this._rowUpdateCallback = onrowupdate;

    this._tbody.rowHeight = rowHeight;
    // because we've potentially changed "rowHeight" we need to re-compute the current "fromRowIdx"
    this._prevFromRowIdx = Math.floor(this._tableContainer.scrollTop / this._tbody.rowHeight);
    if (this._drawerEnabled) {
      if (!drawerEnabled) {
        this.closeConfig();
      }
    }
    this._drawerEnabled = drawerEnabled;
    this.update();
  }

  getAttrs(): GuiTableProps {
    return {
      value: this._table,
      filter: this._filterText,
      filterColumns: this._filterColumns,
      sortBy: [this._sortCol.displayIdx, this._sortCol.ord],
      rowHeight: this._tbody.rowHeight,
      globalFilter: this.globalFilter,
      globalFilterPlaceholder: this.globalFilterPlaceholder,
      drawerEnabled: this._drawerEnabled,
      columns: this._columns,
      useDefaultColumns: this._useDefaultColumns,
      onrowupdate: this._rowUpdateCallback,
    };
  }

  connectedCallback() {
    this._factory = GuiFactory.closest(this);
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
      const newWidth = Math.round(hcell.clientWidth - dx);
      // record the new manually set width
      this._state.columns[index].resizedWidth = newWidth;
      // update the associated body cells widths
      this._tableContainer.style.setProperty(`--column-${index}-width`, `${newWidth}px`);
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
      { signal: this.abortSignal() },
    );
    const cancelColResize = () => {
      if (resize) {
        resize = false;
        this._thead.classList.remove('gui-table-resizing');
        // reset the last column width to trigger a recompute
        this._state.columns[this._state.columns.length - 1].width = undefined;
        this.update();
      }
    };

    document.body.addEventListener(
      'mousemove',
      (e) => {
        cx = e.clientX;
      },
      { signal: this.abortSignal() },
    );
    document.body.addEventListener('mouseup', cancelColResize, { signal: this.abortSignal() });
    document.body.addEventListener('mouseleave', cancelColResize, {
      signal: this.abortSignal(),
    });

    const oResize = new ResizeObserver(async () => {
      if (this._table.nbRows() > 0) {
        // recompute the available space for the rows
        await this._tbody.computeRowHeight(this._table, this._state);
      }
      // reset column widths after a resize
      for (const col of this._state.columns) {
        col.width = undefined;
      }
      // update the whole table
      this.update();
    });
    oResize.observe(this);
    this.addDisposable(() => oResize.disconnect());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._prevFromRowIdx = 0;
    this.replaceChildren(); // cleanup
  }

  toggleConfig(): void {
    if (this._drawerEnabled) {
      if (this._drawer.open) {
        this._drawer.hide();
      } else {
        this._drawer.show();
      }
    }
  }

  openConfig(): void {
    if (this._drawerEnabled) {
      this._drawer.show();
    }
  }

  closeConfig(): void {
    if (this._drawerEnabled) {
      this._drawer.hide();
    }
  }

  async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    const { promise, resolve } = Promise.withResolvers<void>();
    this.updateComplete = promise;

    await this._tbody.update(
      this._prevFromRowIdx,
      this._table,
      this._state,
      this._filterText,
      this._filterColumns,
      this._dirtyFilter,
    );
    this._dirtyFilter = false;

    this._calculateColumnWidths(this._tbody.clientWidth);

    this._thead.update(this._state, this._sortCol);
    const containerStyle = this._tableContainer.style;
    for (const col of this._state.columns) {
      containerStyle.setProperty(`--column-${col.displayIdx}-width`, `${col.resizedWidth ?? col.width}px`);
    }

    resolve();
  }

  asCsv(options: TableCsvOptions): string {
    if (!this._table) {
      return '';
    }

    const s = (value: string): string => {
      const needsQuote =
        options.quoted ||
        value.includes(',') ||
        value.includes('"') ||
        value.includes('\n') ||
        value.includes('\r') ||
        /^\s|\s$/.test(value);

      value = value.split('"').join('""');

      if (needsQuote) {
        return `"${value}"`;
      }

      return value;
    };

    let csv = '';

    const columns = this._state.columns.filter((c) => !c.hide);

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.header instanceof Node) {
        csv += s(column.header.textContent ?? `column_${i}`);
      } else {
        csv += s(column.header);
      }
      if (i < columns.length - 1) {
        csv += options.sep;
      }
    }
    csv += '\n';

    const nb_rows = this._table.nbRows();
    for (let r = 0; r < nb_rows; r++) {
      let needsSep = false;
      for (let c = 0; c < columns.length; c++) {
        const col = columns[c];
        if (needsSep) {
          csv += options.sep;
        }
        const value = this._table.cols[col.column.index][r];
        if (value !== undefined && value !== null) {
          if (options.timestamp && value instanceof gc.core.time) {
            switch (options.timestampUnit) {
              case 's': {
                csv += s(`${value.epoch}`);
                break;
              }
              case 'ms': {
                csv += s(`${value.epochMs}`);
                break;
              }
              case 'us': {
                csv += s(`${value.value}`);
                break;
              }
            }
          } else {
            const props = { ...col.factory.props, value };
            const cell = createElement(col.factory.tag as keyof HTMLElementTagNameMap, props) as AnyValueElement;
            this.shadowRoot.appendChild(cell);
            csv += s(cell.shadowRoot?.textContent ?? cell.textContent ?? '');
            this.shadowRoot.removeChild(cell);
          }
        }
        needsSep = true;
      }
      csv += '\n';
    }

    return csv;
  }

  private _sortTable(): void {
    if (this._sortCol.displayIdx === -1) {
      // no need to sort or sort out of bound (can happen if previous table had more columns)
      this._sortCol.reset();
      return;
    }
    const ord = this._sortCol.ord === 'desc' ? gc.sdk.SortOrd.desc : gc.sdk.SortOrd.asc;
    this._table.sort(this._state.columns[this._sortCol.displayIdx].column.index, ord);
  }

  private _sanitizeCellFactory(displayIndex: number, cellFactory: CleanCellFactory | CellFactory): CleanCellFactory {
    switch (typeof cellFactory) {
      case 'string': {
        return { tag: cellFactory.toUpperCase() };
      }
      case 'function': {
        const tagName = `gui-table-${GuiTable.gen_id}-col-${displayIndex}-${performance.now().toString(36).replace('.', '-')}`;
        customElements.define(
          tagName,
          class extends GuiValue {
            rowIdx = -1;
            private _cellData: CellData | undefined;

            override update() {
              if (!this.isConnected) {
                return;
              }
              const cell = this.parentElement as GuiTableBodyCell;
              if (this._cellData === undefined) {
                this._cellData = {
                  value: this._value,
                  row: cell.rowIdx,
                  col: cell.colIdx,
                  userdata: {},
                  container: this,
                };
              } else {
                this._cellData.value = this._value;
                this._cellData.row = cell.rowIdx;
                this._cellData.col = cell.colIdx;
              }
              this.shadowRoot.replaceChildren(cellFactory(this._cellData));
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
  connectedCallback(): void {
    this.part.add('header');
  }

  update(state: TableState, sortCol: SortCol) {
    let index = 0;
    for (index; index < state.columns.length; index++) {
      const col = state.columns[index];
      const header = this._getOrCreateHeader(col.displayIdx);
      header.update(col, sortCol.displayIdx === col.displayIdx ? sortCol.ord : 'default');
    }

    this._removeExceedingColumns(index - 1);

    this.childNodes.forEach((node) => {
      const header = node as GuiTableHeadCell;
      if (header.displayIdx === sortCol.displayIdx && sortCol.ord !== 'default') {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });
  }

  private _getOrCreateHeader(index: number): GuiTableHeadCell {
    let el = this.children[index] as GuiTableHeadCell | undefined;
    if (!el) {
      el = document.createElement('gui-thead-cell');
      this.appendChild(el);
    }
    el.style.width = `var(--column-${index}-width)`;
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
  /** The index of the displayed column **(this is NOT the index in the underlying `core::Table`)** */
  public displayIdx = 0;

  private _sortable = true;
  private _container = document.createElement('div');
  private _title = document.createElement('div');
  private _sorter = document.createElement('div');
  private _resizer = document.createElement('div');
  private _filter = document.createElement('div');
  private _dropdown = document.createElement('div');
  private _input = document.createElement('gui-search-input');
  private _icons = { asc: '↓', desc: '↑', default: ' ', search: '' };

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
      } else if (e.target !== this._resizer && e.target !== this._input && this._sortable) {
        this.dispatchEvent(new GuiTableSortEvent(this.displayIdx));
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
    this._input.classList.add('col-filter');
    this._input.placeholder = 'Filter column';
    this._input.part.add('filter-input', 'col-filter');
    this._dropdown.appendChild(this._input);

    this._input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const text = target.value;
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.displayIdx, text));
    });

    this._input.addEventListener('sl-clear', () => {
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.displayIdx, ''));
    });

    this._input.addEventListener('blur', (e) => {
      // if the user clicked on the search icon, we let the click event handle the dropdown
      setTimeout(() => {
        if (e.relatedTarget !== this._filter) {
          this.closeDropdown();
        }
      }, 100); // we give it some delay to give a change to closeDropdown to get a focused element
    });

    this._input.addEventListener('focus', () => {
      this.openDropdown();
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
      this.dispatchEvent(new GuiTableResizeColEvent(this.displayIdx, e.clientX));
    });
  }

  set filter(text: string | undefined | null) {
    if (typeof text === 'string' && text.length > 0) {
      this._input.value = text;
      this.openDropdown();
      this.dispatchEvent(new GuiTableFilterColumnEvent(this.displayIdx, text));
    } else {
      this._input.value = '';
      this.closeDropdown();
    }
  }

  connectedCallback() {
    this.part.add('header-cell');

    const styles = getComputedStyle(this);
    this._icons.default = styles.getPropertyValue('--table-icon-sort-default');
    this._icons.asc = styles.getPropertyValue('--table-icon-sort-asc');
    this._icons.desc = styles.getPropertyValue('--table-icon-sort-desc');
    this._filter.style.backgroundImage = this._icons.search;
    this._filter.part.add('filter', 'col-filter-icon');

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
        const focused = parent.querySelector(':focus');
        if (focused?.classList.contains('col-filter')) {
          return;
        }
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

  update(col: TableColumnDefResolved, sort: SortOrd) {
    this.displayIdx = col.displayIdx;
    const title = document.createDocumentFragment();

    if (col.header instanceof Node) {
      const headerEl = document.createElement('span');
      headerEl.replaceChildren(col.header);
      headerEl.className = 'gui-thead-header';
      title.appendChild(headerEl);
    } else {
      const headerContainer = document.createElement('sl-tooltip');
      const headerEl = document.createElement('span');
      headerEl.className = 'gui-thead-header';
      headerEl.part.add('header');
      headerEl.textContent = col.header;
      headerContainer.content = headerEl.textContent;
      headerContainer.appendChild(headerEl);
      title.appendChild(headerContainer);
    }

    if (col.subheader !== undefined) {
      const subheaderContainer = document.createElement('sl-tooltip');
      const subheaderEl = document.createElement('span');
      subheaderEl.part.add('subheader');
      subheaderEl.className = 'gui-thead-subheader';
      if (col.subheader instanceof Node) {
        subheaderEl.replaceChildren(col.subheader);
      } else {
        subheaderEl.textContent = col.subheader;
      }
      subheaderContainer.content = subheaderEl.textContent as string;
      subheaderContainer.appendChild(subheaderEl);
      title.appendChild(subheaderContainer);
    }

    this._title.replaceChildren(title);
    this._sorter.textContent = this._icons[sort];

    if (this._filter.isConnected) {
      if (col.column.filterable === false) {
        this._container.removeChild(this._filter);
      }
    } else {
      if (col.column.filterable !== false) {
        this._container.appendChild(this._filter);
      }
    }
    if (col.column.sortable === false) {
      this.classList.remove('sortable');
      this._sortable = false;
    } else {
      this.classList.add('sortable');
      this._sortable = true;
    }
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

  constructor() {
    super();

    this.virtualScroller = document.createElement('div');
    this.virtualScroller.className = 'gui-tbody-scroller';
    this.virtualScroller.style.position = 'absolute';
    this.virtualScroller.style.visibility = 'hidden';
    this.virtualScroller.style.width = '100%';
  }

  connectedCallback() {
    this.part.add('body');
    this.replaceChildren(this.virtualScroller);
  }

  async computeRowHeight(table: gc.core.Table, state: TableState) {
    if (this.rowHeight <= 0) {
      // create a ghost row to compute the height
      const tmpRow = document.createElement('gui-tbody-row');
      this.appendChild(tmpRow);
      await tmpRow.update(table, state, 0);
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
    state: TableState,
    filterText: string,
    filterColumns: Array<string | undefined | null>,
    dirtyFilters: boolean,
  ): Promise<void> {
    const nb_rows = table.nbRows();
    if (this.rowHeight === -1 && nb_rows > 0) {
      await this.computeRowHeight(table, state);
    }

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
        if (no_filter || this._rowMatchesFilters(table, state, filterText, filterColumns, i)) {
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
      await rowEl.update(table, state, rowIdx);
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

  // updateWidths(state: TableState) {
  //   for (let i = 0; i < this.children.length; i++) {
  //     const row = this.children[i];
  //     if (row instanceof GuiTableBodyRow) {
  //       for (let j = 0; j < row.children.length; j++) {
  //         const cell = row.children[j];
  //         if (cell instanceof GuiTableBodyCell) {
  //           // const col = state.columns[j];
  //           // cell.style.width = `${col.resizedWidth ?? col.width}px`;
  //         }
  //       }
  //     }
  //   }
  // }

  // resizeColumn(colIdx: number, width: number): void {
  //   console.log('resize column', colIdx, 'to', width);
  //   for (let i = 0; i < this.children.length; i++) {
  //     const row = this.children[i];
  //     if (row instanceof GuiTableBodyRow) {
  //       const cell = row.children[colIdx];
  //       if (cell instanceof GuiTableBodyCell) {
  //         cell.style.width = `${width}px`;
  //       }
  //     }
  //   }
  // }

  /**
   * Compares each cells with the given `filterText` and `filterColumns`.
   * Returns `true` for a match, `false` means no cell match.
   */
  private _rowMatchesFilters(
    table: gc.core.Table,
    state: TableState,
    globalFilter: string,
    columnFilters: Array<string | undefined | null>,
    rowIdx: number,
  ): boolean {
    // If no filters are applied, always match.
    if (globalFilter.length === 0 && columnFilters.every((filter) => !filter || filter.length === 0)) {
      return true;
    }

    let globalMatchFound = false;

    const stub = new GuiTableBodyCell();

    for (let index = 0; index < state.columns.length; index++) {
      const colFilter = columnFilters[index];
      let cellText: string | undefined;

      // Only compute cell text if needed (for col filter or global filter)
      if ((colFilter && colFilter.length > 0) || globalFilter.length > 0) {
        const def = state.columns[index];
        const value = def.column.value
          ? def.column.value({
              value: table.cols[def.column.index][rowIdx],
              table,
              row: rowIdx,
              col: def.column.index,
              container: stub,
            })
          : table.cols[def.column.index][rowIdx];
        cellText = value?.toString().toLowerCase();
      }

      // Column-specific filter must match.
      if (colFilter && colFilter.length > 0) {
        if (!cellText?.includes(colFilter)) {
          return false;
        }
      }

      // For global filter, at least one cell must match.
      if (!globalMatchFound && globalFilter.length > 0 && cellText?.includes(globalFilter)) {
        globalMatchFound = true;
      }
    }

    if (globalFilter.length > 0 && !globalMatchFound) {
      return false;
    }

    return true;
  }

  private _getOrCreateRow(index: number): GuiTableBodyRow {
    if (this.children[index]) {
      return this.children[index] as GuiTableBodyRow;
    }

    const newRow = document.createElement('gui-tbody-row');
    newRow.part.add('row');
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

  async update(table: gc.core.Table, state: TableState, rowIdx: number): Promise<void> {
    this.idx = rowIdx;
    this.setAttribute('data-row', `${rowIdx}`);

    let index = 0;
    const children = this.children;
    let cell: GuiTableBodyCell;
    for (index; index < state.columns.length; index++) {
      if (children[index]) {
        cell = children[index] as GuiTableBodyCell;
      } else {
        cell = this._createCell(table, index);
      }
      await cell.update(table, rowIdx, state.columns[index]);
    }

    // remove exceeding cells
    this._removeExceedingCells(index - 1);
  }

  cell(index: number) {
    return this.children[index] as GuiTableBodyCell;
  }

  private _createCell(table: gc.core.Table, index: number): GuiTableBodyCell {
    const cell = document.createElement('gui-tbody-cell');
    cell.style.width = `var(--column-${index}-width)`;
    // cell.part.add('cell', `cell-${index}`);
    cell.addEventListener('gui-input', (ev) => {
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(new GuiTableInputEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, value: ev.detail }));
    });
    cell.addEventListener('gui-change', (ev) => {
      table.cols[cell.colIdx][cell.rowIdx] = ev.detail;
      this.dispatchEvent(new GuiTableChangeEvent({ rowIdx: cell.rowIdx, colIdx: cell.colIdx, value: ev.detail }));
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
    // oxlint-disable-next-line no-new-array
    const values = new Array(this.children.length);
    this.childNodes.forEach((child, i) => {
      values[i] = (child as GuiTableBodyCell).value;
    });
    return values;
  }
}

export class GuiTableBodyCell extends HTMLElement {
  /** The row index in the underlying `core::Table` */
  rowIdx = -1;
  /** The column index in the underlying `core::Table` */
  colIdx = -1;
  /** By default the cell is displayed by a GuiValueElement (`'gui-value'`) */
  private _cell: AnyValueElement | undefined;

  set value(value: unknown) {
    if (this._cell) {
      this._cell.value = value;
    }
  }

  get value() {
    if (this._cell) {
      return this._cell.value;
    }
    return;
  }

  connectedCallback() {
    this.part.add('cell');
  }

  /**
   * ### Why is this async?
   *
   * Some cell elements might be Shoelace elements (eg. gui-object might rely on sl-card)
   * What this implies is that some of the elements are lit-powered and therefore they are asynchronously
   * updated. So we have to make this a promise, so that the underlying elements get a chance to actually
   * render and we get proper height reporting post-update.
   */
  async update(table: gc.core.Table, rowIdx: number, column: TableColumnDefResolved): Promise<void> {
    this.rowIdx = rowIdx;
    const colIdx = column.column.index;
    if (this.colIdx != colIdx) {
      this.colIdx = colIdx;
      this.setAttribute('data-col', `${colIdx}`);
    }

    const rawValue = table.cols[colIdx][rowIdx];

    if (rawValue instanceof Node) {
      this._cell = rawValue as AnyValueElement;
      this.replaceChildren(this._cell);
    } else if (this._cell?.tagName !== column.factory.tag) {
      // Recreate the cell element if the tag changed, or if we don't have one yet
      this._cell = document.createElement(column.factory.tag) as AnyValueElement;

      // Some cell types need to know their row index
      if ('rowIdx' in this._cell && typeof this._cell.rowIdx === 'function') {
        this._cell.rowIdx = rowIdx;
      }

      this.replaceChildren(this._cell);
    }

    // Compute the resolved value once, now that we're sure _cell exists
    const value = column.column.value
      ? column.column.value({
          value: rawValue,
          table,
          row: rowIdx,
          col: colIdx,
          container: this._cell,
        })
      : rawValue;

    const props = { ...column.factory.props, value };

    // Apply props and the resolved value
    if ('setAttrs' in this._cell && typeof this._cell.setAttrs === 'function') {
      this._cell.setAttrs(props);
    } else {
      Object.assign(this._cell, props);
    }

    // this.style.width = `${column.width}px`;
    return Promise.resolve();
  }
}

export type GuiTableResizeColDetail = {
  /** the currently resized column index (this is the displayed column index NOT the index in the underlying `core::Table`) */
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

export type GuiTableChangeEventDetail = GuiTableEventDetail & {
  /** The value */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
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
    private _colIdx: number,
    private _ord: SortOrd,
    // private _state: TableState,
  ) {}

  reset() {
    this._colIdx = -1;
    this._ord = 'default';
  }

  /**
   * Returns `true` when the table needs to be resorted.
   */
  sortBy(colIdx: number, ord?: SortOrd): boolean {
    if (colIdx === -1) {
      return false;
    }
    if (this._colIdx === colIdx) {
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
    this._colIdx = colIdx;
    this._ord = ord ?? 'asc';
    return true;
  }

  /**
   * The index of the displayed column **(not the index in the underlying `core::Table`)**
   */
  get displayIdx() {
    return this._colIdx;
  }

  get ord() {
    return this._ord;
  }
}

export type GuiTableClickEventDetail = GuiTableEventDetail & {
  mouseEvent: MouseEvent;
};

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
export class GuiTableChangeEvent extends CustomEvent<GuiTableChangeEventDetail> {
  static readonly NAME = 'gui-table-change';

  constructor(detail: GuiTableChangeEventDetail) {
    super(GuiTableChangeEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

export class GuiTableApplyMappingsEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-table-apply-mappings';

  constructor() {
    super(GuiTableApplyMappingsEvent.NAME, { bubbles: true, composed: true });
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
    [GuiTableApplyMappingsEvent.NAME]: GuiTableApplyMappingsEvent;
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
