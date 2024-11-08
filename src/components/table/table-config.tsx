import { sl } from '../../shoelace';
import {
  registerCustomElement,
  GuiTable,
  GuiTableProps,
  core,
  GCObject,
  GuiChangeEvent,
  modal,
} from '../../exports.js';

/*
  sortBy: readonly [number] | readonly [number, SortOrd];
  cellProps: CellPropsFactory;
  columnFactory: ColumnFactory | undefined;
*/

export class GuiTableConfig extends HTMLElement {
  public table!: GuiTable;

  private _value: Partial<GuiTableProps> = {};

  private _globalFilter: sl.SlCheckbox;
  private _headers: sl.SlInput;
  private _ignoreCols: sl.SlInput;
  private _minColWidth: sl.SlInput;
  private _columnsWidths: sl.SlInput;
  private _rowHeight: sl.SlInput;
  private _fitColumnsToHeadersBtn: sl.SlButton;
  private _downloadAsCsvBtn: sl.SlButton;
  private _mappings: GuiTableMappings;
  private _downloadAsCsv = async () => {
    try {
      const sep = await modal.input({ title: 'Csv separator', inputProps: { value: ';' } });
      if (!sep) {
        // if closing the modal, abort the operation
        return;
      }
      const csv = this.table.asCsv(sep ?? ';');

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
    } catch {
      // TODO handle errors
    }
  };

  constructor() {
    super();

    this._globalFilter = (<sl-checkbox size="small">Global filter</sl-checkbox>) as sl.SlCheckbox;
    this._headers = (
      <sl-input size="small" label="Headers" helpText="Comma-separated list of headers" clearable />
    ) as sl.SlInput;
    this._rowHeight = (
      <sl-input
        size="small"
        type="number"
        label="Row Height"
        min={0}
        helpText="Height of the rows in pixels"
      />
    ) as sl.SlInput;
    this._ignoreCols = (
      <sl-input
        size="small"
        label="Hide columns"
        helpText="Comma-separated list of column indexes"
        clearable
      />
    ) as sl.SlInput;
    this._minColWidth = (
      <sl-input
        size="small"
        label="Min column width"
        type="number"
        min={0}
        helpText="Minimum width a column will resize to"
      />
    ) as sl.SlInput;
    this._columnsWidths = (
      <sl-input
        size="small"
        label="Column widths"
        helpText="Comma-separated list of column widths"
        clearable
      />
    ) as sl.SlInput;
    this._fitColumnsToHeadersBtn = (
      <sl-button size="small" onclick={() => this.table.fitColumnsToHeaders()}>
        Fit columns to headers
      </sl-button>
    ) as sl.SlButton;
    this._downloadAsCsvBtn = (
      <sl-button size="small" onclick={this._downloadAsCsv}>
        Download as CSV
      </sl-button>
    ) as sl.SlButton;
    this._mappings = (<gui-table-mappings />) as GuiTableMappings;
  }

  connectedCallback(): void {
    this._mappings.table = this.table;

    this.replaceChildren(
      <div className="list">
        <div className="row">
          {this._fitColumnsToHeadersBtn}
          {this._downloadAsCsvBtn}
        </div>
        <sl-details>
          <header slot="summary">Options</header>
          <div className="list">
            {this._globalFilter}
            {this._headers}
            {this._rowHeight}
            {this._ignoreCols}
            {this._minColWidth}
            {this._columnsWidths}
          </div>
        </sl-details>
        {this._mappings}
      </div>,
    );
    this.update();
  }

  get value() {
    const value = this._value;

    value.globalFilter = this._globalFilter.checked;

    const headers = this._headers.value;
    if (headers) {
      value.headers = headers.split(',').map((header) => {
        if (header) {
          return header;
        }
        return '';
      });
    } else if (value.headers) {
      value.headers.length = 0;
    }

    const rowHeight = this._rowHeight.valueAsNumber;
    if (isNaN(rowHeight)) {
      delete value.rowHeight;
    } else {
      value.rowHeight = rowHeight;
    }

    const ignoreCols = this._ignoreCols.value;
    if (ignoreCols) {
      value.ignoreCols = [];
      const values = ignoreCols.split(',');
      for (const v of values) {
        const index = +v;
        if (v.length === 0 || isNaN(index)) {
          continue;
        }
        value.ignoreCols.push(index);
      }
    } else if (value.ignoreCols) {
      value.ignoreCols.length = 0;
    }

    const minColWidth = this._minColWidth.valueAsNumber;
    if (isNaN(minColWidth)) {
      delete value.minColWidth;
    } else {
      value.minColWidth = minColWidth;
    }

    const columnsWidths = this._columnsWidths.value;
    if (columnsWidths) {
      value.columnsWidths = columnsWidths.split(',').map((value) => {
        const w = +value;
        if (value.length === 0 || isNaN(w)) {
          return undefined;
        }
        return w;
      });
    } else if (value.columnsWidths) {
      value.columnsWidths.length = 0;
    }

    return value;
  }

  set value(value: Partial<GuiTableProps>) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._globalFilter.checked = !!this._value.globalFilter;
    this._headers.value = this._value.headers?.join(',') ?? '';
    this._rowHeight.value =
      typeof this._value.rowHeight === 'number' ? `${this._value.rowHeight}` : '';
    this._ignoreCols.value = this._value.ignoreCols?.join(',') ?? '';
    this._minColWidth.value =
      typeof this._value.minColWidth === 'number' ? `${this._value.minColWidth}` : '';
    if (this._value.columnsWidths && this._value.columnsWidths.length > 0) {
      this._columnsWidths.value = this._value.columnsWidths.join(',');
    }
    this._mappings.update();
  }
}

export class GuiTableMappings extends HTMLElement {
  public table!: GuiTable;

  private _value: core.TableColumnMapping[];

  private _mappings: HTMLElement;
  private _applyBtn: sl.SlButton;
  private _createMapping = (ev: MouseEvent) => {
    ev.stopPropagation();
    const mapping = (<gui-table-mapping />) as GuiTableMapping;
    mapping.table = this.table;
    this._mappings.appendChild(mapping);
    this._value.push(mapping.value);
    this._applyBtn.disabled = false;
    this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true }));
  };
  private _automaticDestructuring = async () => {
    const table = this.table.table;
    const mappings: core.TableColumnMapping[] = [];
    const row = Array.from({ length: table.cols.length });
    let hasNodes = false;
    for (let i = 0; i < table.cols.length; i++) {
      const value = table.cols[i][0];
      row[i] = value;
      if (value instanceof core.node) {
        hasNodes = true;
      }
    }
    try {
      let columns: unknown[];
      const nodes = row.map((v) => (v instanceof core.node ? v : null)) as core.node[];
      if (hasNodes) {
        columns = await core.node.resolve_all(nodes);
      } else {
        columns = row;
      }
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i] === null ? row[i] : columns[i];
        if (col instanceof core.node) {
          // nested node
          const [value] = await core.node.resolve_all([col]);
          if (value instanceof GCObject && !value.$type.is_native) {
            for (let j = 0; j < value.$type.attrs.length; j++) {
              const attr = value.$type.attrs[j];
              mappings.push(core.TableColumnMapping.create(i, [attr.name]));
            }
          } else {
            mappings.push(core.TableColumnMapping.create(i, ['*']));
          }
        } else if (col instanceof GCObject && !col.$type.is_native) {
          for (let j = 0; j < col.$type.attrs.length; j++) {
            const attr = col.$type.attrs[j];
            mappings.push(core.TableColumnMapping.create(i, [attr.name]));
          }
        } else if (nodes[i] !== null) {
          mappings.push(core.TableColumnMapping.create(i, ['*']));
        }
      }
    } catch {
      // ignore errors: best-effort
      // TODO are we sure we want to silent fail here?
    }
    this._value = mappings;
    this._mappings.replaceChildren(
      ...mappings.map((value) => {
        const mapping = (<gui-table-mapping value={value} />) as GuiTableMapping;
        mapping.table = this.table;
        return mapping;
      }),
    );
    this._applyBtn.disabled = mappings.length === 0;
    this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true }));
  };
  private _applyMappings = async () => {
    try {
      // const startIndex = this.table.table.cols.length + 1;
      const table = await core.Table.applyMappings(this.table.table, this._value);
      this.table.value = table;
      // for (let i = 0; i < this.table.headers)
      this.table.dispatchEvent(new GuiChangeEvent(table));
    } catch {
      // TODO handle error with toasts
    }
  };

  constructor() {
    super();

    this._value = [];

    this._mappings = document.createElement('div');
    this._mappings.classList.add('list', 'smart');
    this._mappings.addEventListener('gui-table-mapping-delete', (ev) => {
      ev.stopPropagation();
      const el = ev.detail;
      el.remove();
      this._applyBtn.disabled = this._mappings.children.length === 0;
      this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true }));
    });

    this._applyBtn = (
      <sl-button size="small" onclick={this._applyMappings}>
        Apply
      </sl-button>
    ) as sl.SlButton;
  }

  connectedCallback(): void {
    this.replaceChildren(
      <sl-card>
        <header slot="header">
          <span>Mappings</span>
          <div className="row">
            <sl-button variant="text" size="small" onclick={this._createMapping}>
              Add
            </sl-button>
            <sl-button variant="text" size="small" onclick={this._automaticDestructuring}>
              Automatic destructuring
            </sl-button>
          </div>
        </header>
        {this._mappings}
        <footer slot="footer">
          <div />
          {this._applyBtn}
        </footer>
      </sl-card>,
    );
    this.update();
  }

  get value() {
    const mappings: core.TableColumnMapping[] = [];
    this._mappings.childNodes.forEach((node) => {
      const mapping = node as GuiTableMapping;
      mappings.push(mapping.value);
    });
    return mappings;
  }

  set value(value: core.TableColumnMapping[]) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._applyBtn.disabled = this._value.length === 0;
    this._mappings.childNodes.forEach((node) => {
      const mapping = node as GuiTableMapping;
      mapping.update();
    });
  }
}

export class GuiTableMapping extends HTMLElement {
  public table!: GuiTable;
  private _value: core.TableColumnMapping = core.TableColumnMapping.create(0, []);

  private _column: sl.SlSelect;
  private _extractors: sl.SlInput;
  private _delete: sl.SlButton;

  constructor() {
    super();

    this._column = (<sl-select label="Column" size="small" />) as sl.SlSelect;
    this._extractors = (<sl-input label="Extractors" size="small" />) as sl.SlInput;
    this._delete = (
      <sl-button
        variant="text"
        size="small"
        onclick={() => {
          this.dispatchEvent(
            new CustomEvent('gui-table-mapping-delete', { detail: this, bubbles: true }),
          );
        }}
      >
        Del
      </sl-button>
    ) as sl.SlButton;
  }

  connectedCallback(): void {
    this.replaceChildren(
      <>
        {this._column}
        {this._extractors}
        {this._delete}
      </>,
    );
    this.update();
  }

  get value() {
    const value = this._value;

    const column = getSelectValue(this._column);
    if (column !== undefined) {
      value.column = +column;
    }

    value.extractors = this._extractors.value.split('.');

    return value;
  }

  set value(value: core.TableColumnMapping) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._column.replaceChildren();
    for (let i = 0; i < this.table.table.cols.length; i++) {
      const header = this.table.table.headers?.[i] || `Column ${i}`;
      this._column.appendChild(<sl-option value={`${i}`}>{header}</sl-option>);
    }
    this._column.setAttribute('value', `${this._value.column}`);
    this._extractors.value = this._value.extractors.join('.');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-table-config': GuiTableConfig;
    'gui-table-mappings': GuiTableMappings;
    'gui-table-mapping': GuiTableMapping;
  }

  interface GuiTableMappingEventMap {
    'gui-table-mapping-delete': CustomEvent<GuiTableMapping>;
  }

  interface HTMLElementEventMap extends GuiTableMappingEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-table-config': GreyCat.Element<GuiTableConfig>;
        'gui-table-mappings': GreyCat.Element<GuiTableMappings>;
        'gui-table-mapping': GreyCat.Element<GuiTableMapping, GuiTableMappingEventMap>;
      }
    }
  }
}

function getSelectValue(select: sl.SlSelect): string | undefined {
  const value = select.value;
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return value[0];
    }
    return;
  }
  if (value.length !== 0) {
    return value;
  }
  return;
}

registerCustomElement('gui-table-config', GuiTableConfig);
registerCustomElement('gui-table-mappings', GuiTableMappings);
registerCustomElement('gui-table-mapping', GuiTableMapping);
