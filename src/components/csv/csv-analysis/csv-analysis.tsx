import { io } from '@greycat/sdk';
import { ColumnType, getPercentage } from '../utils.js'

export class GuiCsvAnalysis extends HTMLElement {
  private _csvAnalysis: io.CsvAnalysis | null = null;
  private _table = document.createElement('table');
  private _thead = document.createElement('thead');
  private _tbody = document.createElement('tbody');

  connectedCallback() {
    this.appendChild(<figure>{this._table}</figure>);
    this.render();
  }

  set analysis(csvAnalysis: io.CsvAnalysis | null) {
    this._csvAnalysis = csvAnalysis;
    this.render();
  }

  render() {
    if (!this._csvAnalysis || !this._csvAnalysis.statistics) {
      return;
    }
    const columns = this._csvAnalysis.statistics.columns;

    const headerRow = (
      <tr>
        {columns.map((columnStatistics) => (
          <th>{columnStatistics.name}</th>
        ))}
      </tr>
    );

    const bodyRows = document.createDocumentFragment();

    // Append columns' deducted types
    const nullPercentages = document.createDocumentFragment();
    for (const stats of columns) {
      const percentage = getPercentage(stats, ColumnType.Null);
      if (percentage !== 0) {
        nullPercentages.appendChild(
          <td><code>{getPercentage(stats, ColumnType.Null) + "% Null"}</code></td>
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

if (!customElements.get('gui-csv-analysis')) {
  customElements.define('gui-csv-analysis', GuiCsvAnalysis);
}

declare global {
  interface Window {
    GuiCsvAnalysis: typeof GuiCsvAnalysis;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-analysis': GuiCsvAnalysis;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-analysis': Partial<Omit<GuiCsvAnalysis, 'children'>>;
    }
  }
}
