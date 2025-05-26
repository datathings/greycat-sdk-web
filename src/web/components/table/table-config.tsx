import { GuiTable, GuiTableProps, modal, toast, GuiElement, css, TableCsvOptions, sl } from '../../exports.js';
import style from './table-config.css?inline';
import type { GuiTableMappings } from './table-mappings.js';

export class GuiTableConfig extends GuiElement {
  static override styles = [css(style)];

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
      const options: TableCsvOptions = {
        sep: ';',
        quoted: false,
      };
      const proceed = await modal.confirm({
        title: 'Csv Options',
        message: (
          <div className="list">
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
          </div>
        ),
        cancel: 'Cancel',
        confirm: 'Download',
      });
      if (!proceed) {
        // if closing the modal, abort the operation
        return;
      }
      const csv = this.table.asCsv(options);

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
    } catch (err) {
      toast.error(err);
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
    this._mappings = document.createElement('gui-table-mappings');

    this.shadowRoot.appendChild(
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
  }

  connectedCallback(): void {
    this._mappings.table = this.table;
    this.update();
  }

  get value() {
    const value = this._value;

    value.globalFilter = this._globalFilter.checked;

    const headers = this._headers.value;
    if (headers) {
      this.table.table.headers = headers.split(',');
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

  get mappings() {
    return this._mappings.value;
  }

  set mappings(mappings: gc.core.TableColumnMapping[]) {
    this._mappings.value = mappings;
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._globalFilter.checked = !!this._value.globalFilter;
    this._headers.value = this.table.table.headers?.join(',') ?? '';
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

declare global {
  interface HTMLElementTagNameMap {
    'gui-table-config': GuiTableConfig;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-table-config': GreyCat.Element<GuiTableConfig>;
      }
    }
  }
}
