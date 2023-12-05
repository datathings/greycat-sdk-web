import { core, io } from '@greycat/sdk';
import { GuiEnumSelect } from '../../index.js';

type InputHandler = (value: unknown) => void;
type CsvColumnType = CsvColumnInput | CsvColumnStringInput | CsvColumnWithUnitInput | CsvColumnDateInput;

class CsvColumnInput {
  readonly element: HTMLElement;
  private _csvColumn: io.CsvColumn;

  constructor(csvColumn: io.CsvColumn, oninput: InputHandler) {
    this._csvColumn = csvColumn;
    this.element = (
      <article>
        <table role="grid">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.name ?? ''}
                  oninput={(event: Event) => {
                    const newName = (event.target as HTMLInputElement).value;
                    this._csvColumn.name = newName;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Offset:</td>
              <td>{csvColumn.offset === null ? '' : csvColumn.offset.toString()}</td>
            </tr>
            <tr>
              <td>Mandatory:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.mandatory}
                  oninput={() => {
                    this._csvColumn.mandatory = !this._csvColumn.mandatory;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    ) as HTMLElement;
  }
}

class CsvColumnStringInput {
  readonly element: HTMLElement;
  private _csvColumn: io.CsvColumnString;

  constructor(csvColumn: io.CsvColumnString, oninput: InputHandler) {
    this._csvColumn = csvColumn;
    this.element = (
      <article>
        <table role="grid">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.name ?? ''}
                  oninput={(event: Event) => {
                    const newName = (event.target as HTMLInputElement).value;
                    this._csvColumn.name = newName;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Offset:</td>
              <td>{csvColumn.offset === null ? '' : csvColumn.offset.toString()}</td>
            </tr>
            <tr>
              <td>Mandatory:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.mandatory}
                  oninput={() => {
                    this._csvColumn.mandatory = !this._csvColumn.mandatory;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Trim:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.trim}
                  oninput={() => {
                    this._csvColumn.trim = !this._csvColumn.trim;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Try JSON:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.try_json}
                  oninput={() => {
                    this._csvColumn.try_json = !this._csvColumn.try_json;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Try number</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.try_number}
                  oninput={() => {
                    this._csvColumn.try_number = !this._csvColumn.try_number;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Values:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.values?.join(',') ?? ''}
                  oninput={(event: Event) => {
                    const newName = (event.target as HTMLInputElement).value;
                    this._csvColumn.values = newName.split(',');
                    oninput(this._csvColumn);
                  }}/>
              </td>
            </tr>
            <tr>
              <td>Encoder:</td>
              <td>
                <gui-enum-select
                  fqn="io::TextEncoder"
                  selected={this._csvColumn.encoder}
                  onenum-change={(event: Event) => {
                    const encoder = (event.target as GuiEnumSelect).selected as io.TextEncoder;
                    this._csvColumn.encoder = encoder;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    ) as HTMLElement;
  }
}

class CsvColumnWithUnitInput {
  readonly element: HTMLElement;
  private _csvColumn: io.CsvColumnTime | io.CsvColumnDuration;

  constructor(csvColumn: io.CsvColumnTime | io.CsvColumnDuration, oninput: InputHandler) {
    this._csvColumn = csvColumn;
    this.element = (
      <article>
        <table role="grid">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.name ?? ''}
                  oninput={(event: Event) => {
                    const newName = (event.target as HTMLInputElement).value;
                    this._csvColumn.name = newName;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Offset:</td>
              <td>{csvColumn.offset === null ? '' : csvColumn.offset.toString()}</td>
            </tr>
            <tr>
              <td>Mandatory:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.mandatory}
                  oninput={() => {
                    this._csvColumn.mandatory = !this._csvColumn.mandatory;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Unit:</td>
              <td>
                <gui-enum-select
                  fqn="core::DurationUnit"
                  selected={this._csvColumn.unit}
                  onenum-change={(event: Event) => {
                    this._csvColumn.unit = (event.target as GuiEnumSelect).selected as core.DurationUnit;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    ) as HTMLElement;
  }
}

class CsvColumnDateInput {
  readonly element: HTMLElement;
  private _csvColumn: io.CsvColumnDate;

  constructor(csvColumn: io.CsvColumnDate, oninput: InputHandler) {
    this._csvColumn = csvColumn;
    this.element = (
      <article>
        <table role="grid">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.name ?? ''}
                  oninput={(event: Event) => {
                    const newName = (event.target as HTMLInputElement).value;
                    this._csvColumn.name = newName;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Offset:</td>
              <td>{csvColumn.offset === null ? '' : csvColumn.offset.toString()}</td>
            </tr>
            <tr>
              <td>Mandatory:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.mandatory}
                  oninput={() => {
                    this._csvColumn.mandatory = !this._csvColumn.mandatory;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Format:</td>
              <td>
                <input
                  type="text"
                  defaultValue={this._csvColumn.format ?? ''}
                  oninput={(event: Event) => {
                    this._csvColumn.name = (event.target as HTMLInputElement).value;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Timezone:</td>
              <td>
                <gui-enum-select
                  fqn="core::TimeZone"
                  selected={this._csvColumn.tz}
                  onenum-change={(event: Event) => {
                    this._csvColumn.tz = (event.target as GuiEnumSelect).selected as core.TimeZone;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>As time:</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!this._csvColumn.mandatory}
                  oninput={() => {
                    this._csvColumn.as_time = !this._csvColumn.as_time;
                    oninput(this._csvColumn);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    ) as HTMLElement;
  }
}

export class GuiCsvFormatColumn extends HTMLElement {
  private _csvColumn: io.CsvColumn | null = null;
  private _csvColumnInput: CsvColumnType | null = null;

  set column(csvColumn: io.CsvColumn) {
    this._csvColumn = csvColumn;
    if (this._csvColumn instanceof io.CsvColumnString) {
      this._csvColumnInput = new CsvColumnStringInput(csvColumn as io.CsvColumnString, (v: unknown) => { console.log(v); });
    } else if (this._csvColumn instanceof io.CsvColumnTime) {
      this._csvColumnInput = new CsvColumnWithUnitInput(csvColumn as io.CsvColumnTime, (v: unknown) => { console.log(v); });
    } else if (this._csvColumn instanceof io.CsvColumnDuration) {
      this._csvColumnInput = new CsvColumnWithUnitInput(csvColumn as io.CsvColumnDuration, (v: unknown) => { console.log(v); });
    } else if (this._csvColumn instanceof io.CsvColumnDate) {
      this._csvColumnInput = new CsvColumnDateInput(csvColumn as io.CsvColumnDate, (v: unknown) => { console.log(v); });
    } else {
      this._csvColumnInput = new CsvColumnInput(csvColumn, (v: unknown) => { console.log(v); });
    }

    this.render();
  }

  render() {
    if (!this._csvColumn || !this._csvColumnInput) {
      return;
    }

    this.replaceChildren(this._csvColumnInput.element);
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
