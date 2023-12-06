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
  private _columnTypeStates = new Map();

  connectedCallback() {
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

    const content = (
      <div className='gui-csv-format__grid-container' style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {columns.map((column, index) => (
            <div className='gui-csv-format__grid-container-item'>
              <select onchange={(event) => this._handleColumnTypeChange(event, index)}>
                {Object.values(CsvColumnType).map(type => (
                  <option value={type} selected={type === column.$type.name}>{type}</option>
                ))}
              </select>
            </div>
          ))}
          {columns.map(csvColumn => (
            <div className='gui-csv-format__grid-container-item'>
              <gui-csv-format-column column={csvColumn} />
            </div>
          ))}
      </div>
    );

    console.log(content);
  
    this.replaceChildren(content);
  }

  _handleColumnTypeChange(event: Event, columnIndex: number) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedType = selectElement.value;
    const columns = this._csvFormat?.columns ?? [];

    const prevColumn = columns[columnIndex];
    const commonProperties = {
      name: prevColumn.name,
      mandatory: prevColumn.mandatory,
      offset: prevColumn.offset,
    };

    this._saveColumnState(prevColumn.$type.name, columnIndex, prevColumn);

    if (selectedType === CsvColumnType.CsvColumnString) {
      if (prevColumn instanceof io.CsvColumnString) {
        columns[columnIndex] = io.CsvColumnString.createFrom({
          ...commonProperties,
          trim: prevColumn.trim,
          try_number: prevColumn.try_number,
          try_json: prevColumn.try_json,
          values: prevColumn.values,
          encoder: prevColumn.encoder,
        });
      } else {
        columns[columnIndex] = io.CsvColumnString.createFrom({
          ...commonProperties,
          trim: null,
          try_number: null,
          try_json: null,
          values: null,
          encoder: null,
        });
      }
    } else if (selectedType === CsvColumnType.CsvColumnTime) {
      columns[columnIndex] = io.CsvColumnTime.createFrom({
        ...commonProperties,
        unit: prevColumn instanceof io.CsvColumnTime ? prevColumn.unit : null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnDuration) {
      columns[columnIndex] = io.CsvColumnDuration.createFrom({
        ...commonProperties,
        unit: prevColumn instanceof io.CsvColumnDuration ? prevColumn.unit : null,
      });
    } else if (selectedType === CsvColumnType.CsvColumnDate) {
      if (prevColumn instanceof io.CsvColumnDate) {
        columns[columnIndex] = io.CsvColumnDate.createFrom({
          ...commonProperties,
          format: prevColumn.format,
          tz: prevColumn.tz,
          as_time: prevColumn.as_time,
        });
      } else {
        columns[columnIndex] = io.CsvColumnDate.createFrom({
          ...commonProperties,
          format: null,
          tz: null,
          as_time: null,
        });
      }
    } else {
      columns[columnIndex] = io.CsvColumnIgnored.createFrom({...commonProperties});
    }

    // Restore the previous state, if user had one.
    this._restoreColumnState(selectedType, columnIndex, columns);
    this.render();
  }

  _saveColumnState(columnType: string, columnIndex: number, columnData: io.CsvColumn) {
    if (!this._columnTypeStates.has(columnType)) {
      this._columnTypeStates.set(columnType, new Map());
    }
    this._columnTypeStates.get(columnType).set(columnIndex, columnData);
  }

  _restoreColumnState(columnType: string, columnIndex: number, columns: io.CsvColumn[]) {
    if (this._columnTypeStates.has(columnType) && this._columnTypeStates.get(columnType).has(columnIndex)) {
      columns[columnIndex] = this._columnTypeStates.get(columnType).get(columnIndex);
    }
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
