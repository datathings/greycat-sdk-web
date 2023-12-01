import { io } from '@greycat/sdk';
// import { ColumnType, getPercentage } from '../utils.js'

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
        {columns.map((csvColumn) => (
          <th>{csvColumn.name}</th>
        ))}
      </tr>
    );

    const bodyRows = document.createDocumentFragment();

    // Append columns' short stats components
    const configurations = document.createDocumentFragment();
    for (const csvColumn of columns) {
      configurations.appendChild(
        <td>
          <gui-csv-format-column column={csvColumn} />
        </td>
      );
    }
    bodyRows.appendChild(
      <tr>{configurations}</tr>
    );
    
    this._thead.replaceChildren(headerRow);
    this._tbody.replaceChildren(bodyRows);

    this._table.replaceChildren(this._thead, this._tbody);
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
