import { io } from '@greycat/sdk';
import { ColumnType, getPercentage } from '../utils.js'

export class GuiCsvFormat extends HTMLElement {
  private _csvFormat: io.CsvFormat | null = null;
  private _table = document.createElement('table');
  private _thead = document.createElement('thead');
  private _tbody = document.createElement('tbody');

  connectedCallback() {
    this.appendChild(<figure>{this._table}</figure>);
    this.render();
  }

  set analysis(csvFormat: io.CsvFormat | null) {
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

    // Append columns' deducted types
    const nullPercentages = document.createDocumentFragment();
    for (const csvColumn of columns) {
      const percentage = getPercentage(csvColumn, ColumnType.Null);
      if (percentage !== 0) {
        nullPercentages.appendChild(
          <td><code>{getPercentage(csvColumn, ColumnType.Null) + "% Null"}</code></td>
        );
      } else {
        nullPercentages.appendChild(
          <td></td>
        );
      }
    }
    bodyRows.appendChild(
      <tr>{nullPercentages}</tr>
    );

    // Append columns' short stats components
    const shortStats = document.createDocumentFragment();
    for (const stats of columns) {
      shortStats.appendChild(
        <td>
          <gui-csv-column-statistics statistics={stats} />
        </td>
      );
    }
    bodyRows.appendChild(
      <tr>{shortStats}</tr>
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
