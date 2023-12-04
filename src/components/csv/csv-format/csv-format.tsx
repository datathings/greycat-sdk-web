import { io } from '@greycat/sdk';

const CsvColumnType = {
  CsvColumnString: io.CsvColumnString._type,
  CsvColumnInteger: io.CsvColumnInteger._type,
  CsvColumnFloat: io.CsvColumnFloat._type,
  CsvColumnBoolean: io.CsvColumnBoolean._type,
  CsvColumnTime: io.CsvColumnTime._type,
  CsvColumnDuration: io.CsvColumnDuration._type,
  CsvColumnDate: io.CsvColumnDate._type,
  CsvColumnIgnored: io.CsvColumnIgnored._type,
};

export class GuiCsvFormat extends HTMLElement {
  private _csvFormat: io.CsvFormat | null = null;
  private _table = document.createElement('table');
  private _thead = document.createElement('thead');
  private _tbody = document.createElement('tbody');

  connectedCallback() {
    this.appendChild(<figure>{this._table}</figure>);
    this.render();
  }

  set format(csvFormat: io.CsvFormat | null) {
    this._csvFormat = csvFormat;
    this.render();
  }

  render() {
    if (!this._csvFormat || !this._csvFormat.columns) {
      return;
    }
    const columns = this._csvFormat.columns;

    const headerRow = (
      <tr>
        {columns.map((column, index) => {
          return (
            <th>
              <select 
                onchange={(event) => this.handleColumnTypeChange(event, index)}>
                {
                  Object.values(CsvColumnType).map(type => (
                    <option value={type} selected={type === column.$type.name}>{type}</option>
                  ))
                }
              </select>
            </th>
          );
        })}
      </tr>
    );

    const bodyRows = this._createBodyRows(columns);
    
    this._thead.replaceChildren(headerRow);
    this._tbody.replaceChildren(bodyRows);

    this._table.replaceChildren(this._thead, this._tbody);
  }

  _createBodyRows(columns: Array<io.CsvColumn>) {
    const bodyRows = document.createDocumentFragment();
    for (const csvColumn of columns) {
      bodyRows.appendChild(
        <td>
          <gui-csv-format-column column={csvColumn} />
        </td>
      );
    }
    return (
      <tr>{bodyRows}</tr>
    );
  }

  handleColumnTypeChange(event: Event, columnIndex: number) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedType = selectElement.value;
    const columns = this._csvFormat?.columns ?? [];

    if (selectedType === CsvColumnType.CsvColumnString) {
      console.log("type casted to CsvColumnString");
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnString.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
        trim: null,
        try_number: null,
        try_json: null,
        values: null,
        encoder: null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnInteger) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnInteger.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
      });
    } else if (selectedType === CsvColumnType.CsvColumnFloat) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnFloat.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
      });
    } else if (selectedType === CsvColumnType.CsvColumnBoolean) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnBoolean.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
      });
    } else if (selectedType === CsvColumnType.CsvColumnTime) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnTime.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
        unit: null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnDuration) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnDuration.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
        unit: null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnDate) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnDate.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
        format: null,
        tz: null,
        as_time: null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnIgnored) {
      const column = columns[columnIndex];
      columns[columnIndex] = io.CsvColumnIgnored.createFrom({
        name: column.name,
        mandatory: column.mandatory,
        offset: column.offset,
      });
    }

    console.log(columns);

    const bodyRows = this._createBodyRows(columns);
    this._tbody.replaceChildren(bodyRows);
  }
}

if (!customElements.get('gui-csv-format')) {
  customElements.define('gui-csv-format', GuiCsvFormat);
}

declare global {
  interface Window {
    GuiCsvFormat: typeof GuiCsvFormat;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-format': GuiCsvFormat;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-format': Partial<Omit<GuiCsvFormat, 'children'>>;
    }
  }
}
