import {
  type GuiTable,
  registerCustomElement,
  GuiElement,
  css,
  GuiDialog,
} from '../../../exports.js';
import '../../table/index.js'; // ensures table is defined
import '../../tabs/index.js';
// import ../../donut/index.js;
import style from './csv-statistics2.css?inline';

export class GuiCsvStatistics2 extends GuiElement {
  static override styles = [css(style)];

  private _stats: greycat.io.CsvStatistics | null | undefined;
  private _table: GuiTable;
  private _dialog: GuiDialog;

  constructor() {
    super();

    this._table = document.createElement('gui-table');
    this._dialog = document.createElement('gui-dialog');
    this.shadowRoot.append(this._table, this._dialog);
  }

  connectedCallback() {
    this.update();
  }

  get value() {
    return this._stats;
  }

  set value(value: greycat.io.CsvStatistics | null | undefined) {
    this._stats = value;
    this.update();
  }

  update() {
    if (!this.isConnected) {
      return;
    }
    if (!this._stats) {
      // empty table if null
      this._table.value = [];
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = greycat.core.Table.fromRows<any[]>([
      ['Column offset (zero-based)', ...this._stats.columns.map((_, i) => i)],
      ['Nb rows', ...this._stats.columns.map(countValues)],
      ['Possible type', ...this._stats.columns.map(possibleType)],
      ['Null count', ...this._stats.columns.map(nullCount)],
      ['Int count', ...this._stats.columns.map(typeCount('int_count'))],
      ['Float count', ...this._stats.columns.map(typeCount('float_count'))],
      ['String count', ...this._stats.columns.map(typeCount('string_count'))],
      ['Bool count', ...this._stats.columns.map(typeCount('bool_count'))],
      ['Date count', ...this._stats.columns.map(typeCount('date_count'))],
      ['Example', ...this._stats.columns.map(example)],
      ['Minimum', ...this._stats.columns.map((c) => c.profile.min?.toFixed(1))],
      ['Maximum', ...this._stats.columns.map((c) => c.profile.max?.toFixed(1))],
      ['Average', ...this._stats.columns.map(average)],
      ['Standard deviation', ...this._stats.columns.map(stdDeviation)],
      [
        'Word list',
        ...this._stats.columns.map((c) => (
          <sl-button
            variant="text"
            size="small"
            onclick={(ev) => {
              ev.preventDefault();
              this.showWordList(c);
            }}
          >
            Show
          </sl-button>
        )),
      ],
    ]);
    table.headers = ['Property / Column Name', ...this._stats.columns.map((c) => c.name ?? '')];
    this._table.value = table;
  }

  showWordList(column: greycat.io.CsvColumnStatistics): void {
    const words: string[] = [];
    const counts: (number | bigint)[] = [];
    let wTotal = 0;
    let cTotal = 0n;
    for (const [word, count] of column.enumerable_count) {
      wTotal++;
      words.push(word);
      counts.push(count);
      cTotal += BigInt(count);
    }

    this._dialog.label = `Column: ${column.name ?? '<unknown>'}`;
    this._dialog.replaceChildren(
      <gui-tabs className="tabs">
        <gui-tab slot="tab" active>
          Enumerable Count
        </gui-tab>
        {/* <gui-tab slot="tab">Enumerable Count (Donut)</gui-tab> */}

        <gui-panel slot="panel" tab="Enumerable Count">
          <gui-table
            globalFilter
            headers={[`Word (${wTotal})`, `Count (${cTotal})`]}
            value={greycat.core.Table.create([words, counts])}
          />
        </gui-panel>
        {/* <gui-panel slot="panel" tab="Enumerable Count (Donut)">
          <gui-donut value={column.enumerable_count} withInfo withLabelInfo withLabels />
        </gui-panel> */}
      </gui-tabs>,
    );
    this._dialog.show();
  }
}

const countValues = (c: greycat.io.CsvColumnStatistics): number => {
  return (
    Number(c.bool_count) +
    Number(c.date_count) +
    Number(c.float_count) +
    Number(c.int_count) +
    Number(c.null_count) +
    Number(c.string_count)
  );
};

const possibleInt = (c: greycat.io.CsvColumnStatistics): boolean => {
  return (
    c.int_count > c.bool_count &&
    c.int_count > c.date_count &&
    c.int_count > c.float_count &&
    c.int_count > c.string_count
  );
};

const possibleFloat = (c: greycat.io.CsvColumnStatistics): boolean => {
  return (
    c.float_count > c.bool_count &&
    c.float_count > c.date_count &&
    c.float_count > c.int_count &&
    c.float_count > c.string_count
  );
};

const possibleString = (c: greycat.io.CsvColumnStatistics): boolean => {
  return (
    c.string_count > c.bool_count &&
    c.string_count > c.date_count &&
    c.string_count > c.int_count &&
    c.string_count > c.float_count
  );
};

const possibleBool = (c: greycat.io.CsvColumnStatistics): boolean => {
  return (
    c.bool_count > c.string_count &&
    c.bool_count > c.date_count &&
    c.bool_count > c.int_count &&
    c.bool_count > c.float_count
  );
};

const possibleDate = (c: greycat.io.CsvColumnStatistics): boolean => {
  return (
    c.date_count > c.string_count &&
    c.date_count > c.bool_count &&
    c.date_count > c.int_count &&
    c.date_count > c.float_count
  );
};

const possibleType = (c: greycat.io.CsvColumnStatistics) => {
  if (possibleInt(c)) {
    return c.null_count === 0 ? 'int' : 'int?';
  }

  if (possibleFloat(c)) {
    return c.null_count === 0 ? 'float' : 'float?';
  }

  if (possibleBool(c)) {
    return c.null_count === 0 ? 'bool' : 'bool?';
  }

  if (possibleDate(c)) {
    return c.null_count === 0 ? 'Date' : 'Date?';
  }

  if (possibleString(c)) {
    return c.null_count === 0 ? 'String' : 'String?';
  }
  return '';
};

const nullCount = (c: greycat.io.CsvColumnStatistics) => {
  if (c.null_count == 0) {
    return '';
  }
  const total = countValues(c);
  const percentage = ((Number(c.null_count) / total) * 100).toFixed(1);
  return `${c.null_count} (${percentage}%)`;
};

type NullMapper = (prop: keyof greycat.io.CsvColumnStatistics) => (c: greycat.io.CsvColumnStatistics) => string;
const typeCount: NullMapper = (prop) => (c) => (c[prop] === 0 ? '' : (c[prop] as string));

const example = (c: greycat.io.CsvColumnStatistics) => {
  if (typeof c.example === 'string') {
    return c.example;
  }
  return '';
};

const average = (c: greycat.io.CsvColumnStatistics) => {
  if (c.profile.sum && c.profile.count) {
    return (c.profile.sum / Number(c.profile.count)).toFixed(1);
  }
  return '';
};

const stdDeviation = (c: greycat.io.CsvColumnStatistics) => {
  if (c.profile.count && c.profile.sum && c.profile.sumsq) {
    let std = 0.0;
    const s = (c.profile.sum * c.profile.sum) / Number(c.profile.count);
    if (Number(c.profile.count) > 1 && c.profile.sumsq > s) {
      std = Math.sqrt((c.profile.sumsq - s) / (Number(c.profile.count) - 1));
    }
    return std.toFixed(1);
  }
  return '';
};

registerCustomElement('gui-csv-statistics2', GuiCsvStatistics2);

declare global {
  interface Window {
    GuiCsvStatistics2: typeof GuiCsvStatistics2;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-statistics2': GuiCsvStatistics2;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-csv-statistics2': GreyCat.Element<GuiCsvStatistics2>;
      }
    }
  }
}
