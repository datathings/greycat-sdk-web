import { io } from '@greycat/sdk';

export class GuiCsvFormatColumn extends HTMLElement {
  private _csvColumn: io.CsvColumnString | null = null;

  set column(csvColumn: io.CsvColumnString | null) {
    this._csvColumn = csvColumn;
    this.render();
  }

  private readOnlyProperties = new Set(['$attrs', '$type']);

  private isKeyOfCsvColumnString(key: string): key is keyof io.CsvColumnString {
    return key in io.CsvColumnString.prototype && !this.readOnlyProperties.has(key);
  }

  private handleChange(property: string, value: string) {
    if (this._csvColumn && this.isKeyOfCsvColumnString(property)) {
      this._csvColumn[property] = value;
    }
  }

  private renderInput(field: { label: string; property: string; type: string }) {
    const { label, property, type } = field;
    const value = this._csvColumn ? this._csvColumn[property] : '';

    if (type === 'checkbox') {
      return (
        <div>
          <label>{label}</label>
          <input type={type} checked={value} onChange={(e) => this.handleChange(property, e.target.checked)} />
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <div>
          <label>{label}</label>
          <textarea value={value} onChange={(e) => this.handleChange(property, e.target.value)} />
        </div>
      );
    } else {
      return (
        <div>
          <label>{label}</label>
          <input type={type} value={value} onChange={(e) => this.handleChange(property, e.target.value)} />
        </div>
      );
    }
  }

  render() {
    if (!this._csvColumn) {
      return;
    }

    const fields = [
      { label: 'Name', property: 'name', type: 'text' },
      { label: 'Mandatory', property: 'mandatory', type: 'checkbox' },
      { label: 'Offset', property: 'offset', type: 'number' },
      { label: 'Trim', property: 'trim', type: 'checkbox' },
      { label: 'Try Number', property: 'try_number', type: 'checkbox' },
      { label: 'Try JSON', property: 'try_json', type: 'checkbox' },
      { label: 'Values', property: 'values', type: 'textarea' },
      { label: 'Encoder', property: 'encoder', type: 'text' },
    ];

    return (
      <div>
        {fields.map(field => this.renderInput(field))}
      </div>
    );
  }
}

if (!customElements.get('gui-csv-format-column')) {
  customElements.define('gui-csv-format-column', GuiCsvFormatColumn);
}

declare global {
  interface Window {
    GuiCsvFormatColumn: typeof GuiCsvFormatColumn;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-format-column': GuiCsvFormatColumn;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-format-column': Partial<Omit<GuiCsvFormatColumn, 'children'>>;
    }
  }
}
