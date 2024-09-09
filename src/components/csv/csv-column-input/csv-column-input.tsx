import { std } from '../../../exports.js';

interface CsvColumnInput {
  element: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

class CsvColumnIntegerInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;

  constructor(col: std.io.CsvColumnInteger) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnInteger.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
    );
  }

  set value(value: std.io.CsvColumnInteger) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
  }
}

class CsvColumnFloatInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;

  constructor(col: std.io.CsvColumnFloat) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnFloat.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
    );
  }

  set value(value: std.io.CsvColumnFloat) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
  }
}

class CsvColumnBooleanInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;

  constructor(col: std.io.CsvColumnBoolean) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnBoolean.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
    );
  }

  set value(value: std.io.CsvColumnBoolean) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
  }
}

class CsvColumnTimeInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;
  private _unit: HTMLSelectElement;

  constructor(col: std.io.CsvColumnTime) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);
    this._unit = (
      <select>
        <option value="" selected>
          Select a unit
        </option>
        {std.core.DurationUnit.$fields().map((u) => (
          <option value={u.key}>{u.key}</option>
        ))}
      </select>
    ) as HTMLSelectElement;

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
        <fieldset>
          <label>Unit</label>
          {this._unit}
        </fieldset>
      </div>
    ) as HTMLTableElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnTime.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
      this._unit.value.length > 0
        ? std.core.DurationUnit[this._unit.value as std.core.DurationUnit.Field]()
        : null,
    );
  }

  set value(value: std.io.CsvColumnTime) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
    this._unit.value = value.unit?.key ?? '';
  }
}

class CsvColumnDurationInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;
  private _unit: HTMLSelectElement;

  constructor(col: std.io.CsvColumnDuration) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);
    this._unit = (
      <select>
        <option value="" selected>
          Select a unit
        </option>
        {std.core.DurationUnit.$fields().map((u) => (
          <option value={u.key}>{u.key}</option>
        ))}
      </select>
    ) as HTMLSelectElement;

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
        <fieldset>
          <label>Unit</label>
          {this._unit}
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnDuration.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
      this._unit.value.length === 0
        ? null
        : std.core.DurationUnit[this._unit.value as std.core.DurationUnit.Field](),
    );
  }

  set value(value: std.io.CsvColumnDuration) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
    this._unit.value = value.unit?.key ?? 'microseconds';
  }
}

class CsvColumnDateInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;
  private _format: HTMLInputElement;
  private _tz: HTMLSelectElement;
  private _as_time: HTMLInputElement;

  constructor(col: std.io.CsvColumnDate) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);
    this._format = (<input type="text" defaultValue={col.format ?? ''} />) as HTMLInputElement;
    this._tz = (
      <select>
        <option value="" selected>
          Select a timezone
        </option>
        {std.core.TimeZone.$fields().map((u) => (
          <option value={u.key}>{u.key}</option>
        ))}
      </select>
    ) as HTMLSelectElement;
    this._as_time = (<input type="checkbox" checked={col.as_time ?? false} />) as HTMLInputElement;

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
        <fieldset>
          <label>
            {this._as_time}
            As Time
          </label>
        </fieldset>
        <fieldset>
          <label>
            <a
              href="https://www.gnu.org/software/libc/manual/html_node/Formatting-Calendar-Time.html"
              target="_blank"
            >
              Format
            </a>
          </label>
          {this._format}
        </fieldset>
        <fieldset>
          <label>TimeZone</label>
          {this._tz}
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnDate.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
      this._format.value.length === 0 ? null : this._format.value,
      this._tz.value.length > 0
        ? std.core.TimeZone[this._tz.value as std.core.TimeZone.Field]()
        : null,
      this._as_time.checked,
    );
  }

  set value(value: std.io.CsvColumnDate) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
    this._format.value = value.format ?? '';
    this._tz.value = value.tz?.key ?? '';
    this._as_time.checked = value.as_time ?? false;
  }
}

class CsvColumnIgnoredInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;

  constructor(col: std.io.CsvColumnIgnored) {
    this._name = (<input type="text" defaultValue={col.name ?? ''} />) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnIgnored.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
    );
  }

  set value(value: std.io.CsvColumnIgnored) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
  }
}

class CsvColumnStringInput {
  element: HTMLElement;
  private _name: HTMLInputElement;
  private _mandatory: HTMLInputElement;
  private _offset: Text;
  private _trim: HTMLInputElement;
  private _try_number: HTMLInputElement;
  private _try_json: HTMLInputElement;
  private _values: HTMLInputElement;
  private _encoder: HTMLSelectElement;

  constructor(col: std.io.CsvColumnString, oninput?: () => void) {
    this._name = (
      <input type="text" defaultValue={col.name ?? ''} oninput={oninput} />
    ) as HTMLInputElement;
    this._mandatory = (
      <input type="checkbox" checked={col.mandatory ?? false} oninput={oninput} />
    ) as HTMLInputElement;
    this._offset = document.createTextNode(`${col.offset}`);
    this._trim = (
      <input type="checkbox" checked={col.trim ?? false} oninput={oninput} />
    ) as HTMLInputElement;
    this._try_number = (
      <input type="checkbox" checked={col.try_number ?? false} oninput={oninput} />
    ) as HTMLInputElement;
    this._try_json = (
      <input type="checkbox" checked={col.try_json ?? false} oninput={oninput} />
    ) as HTMLInputElement;
    // TODO potentially make this 'values' input more involved as this "split/join" version might be too limited
    this._values = (
      <input type="text" defaultValue={col.values?.join(',') ?? ''} oninput={oninput} />
    ) as HTMLInputElement;
    this._encoder = (
      <select onchange={oninput}>
        <option value="" selected>
          Select an encoder
        </option>
        {std.io.TextEncoder.$fields().map((e) => (
          <option value={e.key}>{e.key}</option>
        ))}
      </select>
    ) as HTMLSelectElement;

    this.element = (
      <div>
        <fieldset>
          <label>Offset {this._offset}</label>
        </fieldset>
        <fieldset>
          <label>Name</label>
          {this._name}
        </fieldset>
        <fieldset>
          <label>
            {this._mandatory}
            Mandatory
          </label>
        </fieldset>
        <fieldset>
          <label>
            {this._trim}
            Trim
          </label>
        </fieldset>
        <fieldset>
          <label>
            {this._try_number}
            Try number
          </label>
        </fieldset>
        <fieldset>
          <label>
            {this._try_json}
            Try JSON
          </label>
        </fieldset>
        <fieldset>
          <label>Values</label>
          {this._values}
          <small>Comma-separated list of strings</small>
        </fieldset>
        <fieldset>
          <label>Text Encoder</label>
          {this._encoder}
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get value() {
    const offset = +(this._offset.textContent ?? '');
    return std.io.CsvColumnString.create(
      this._name.value,
      this._mandatory.checked,
      isNaN(offset) ? null : offset,
      this._trim.checked,
      this._try_number.checked,
      this._try_json.checked,
      this._values.value.split(',').filter((e) => e.length),
      this._encoder.value.length === 0
        ? null
        : std.io.TextEncoder[this._encoder.value as std.io.TextEncoder.Field](),
    );
  }

  set value(value: std.io.CsvColumnString) {
    this._name.value = value.name ?? '';
    this._mandatory.checked = value.mandatory ?? false;
    this._offset.textContent = `${value.offset}`;
    this._trim.checked = value.trim ?? false;
    this._try_number.checked = value.try_number ?? false;
    this._try_json.checked = value.try_json ?? false;
    this._values.value = value.values?.join(',') ?? '';
    this._encoder.value = value.encoder?.key ?? '';
  }
}

export class GuiCsvColumnInput extends HTMLElement {
  private _input: CsvColumnInput | undefined;

  get value() {
    return this._input?.value ?? null;
  }

  set value(col: std.io.CsvColumn) {
    if (col instanceof std.io.CsvColumnString) {
      this._input = new CsvColumnStringInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnBoolean) {
      this._input = new CsvColumnBooleanInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnInteger) {
      this._input = new CsvColumnIntegerInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnFloat) {
      this._input = new CsvColumnFloatInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnDate) {
      this._input = new CsvColumnDateInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnDuration) {
      this._input = new CsvColumnDurationInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnIgnored) {
      this._input = new CsvColumnIgnoredInput(col);
      this.replaceChildren(this._input.element);
      return;
    }

    if (col instanceof std.io.CsvColumnTime) {
      this._input = new CsvColumnTimeInput(col);
      this.replaceChildren(this._input.element);
      return;
    }
  }
}

if (!customElements.get('gui-csv-column-input')) {
  customElements.define('gui-csv-column-input', GuiCsvColumnInput);
}

declare global {
  interface Window {
    GuiCsvFormatColumn: typeof GuiCsvColumnInput;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-column-input': GuiCsvColumnInput;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-csv-column-input': GreyCat.Element<GuiCsvColumnInput>;
      }
    }
  }
}
