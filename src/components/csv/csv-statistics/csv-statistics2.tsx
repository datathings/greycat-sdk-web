import { core, type GuiTable, io, registerCustomElement, std, modal } from '../../../exports.js';
import '../../table/index.js'; // ensures table is defined
export class GuiCsvStatistics2 extends HTMLElement {
  private _stats: std.io.CsvStatistics | null | undefined;
  private _table: GuiTable;

  constructor() {
    super();

    this._table = document.createElement('gui-table');
  }

  connectedCallback() {
    this.replaceChildren(this._table);
    this.update();
  }

  get value() {
    return this._stats;
  }

  set value(value: std.io.CsvStatistics | null | undefined) {
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

    console.log(this._stats);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = core.Table.fromRows<any[]>([
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

  showWordList(column: std.io.CsvColumnStatistics): void {
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

    modal.info({
      title: column.name ?? '',
      message: (
        <gui-tabs>
          <gui-tab className="activeTab">Enumerable Count</gui-tab>
          <gui-tab>Enumerable Count (Donut)</gui-tab>

          <gui-panel data-tab="Enumerable Count">
            <gui-table
              globalFilter
              headers={[`Word (${wTotal})`, `Count (${cTotal})`]}
              value={core.Table.create([words, counts])}
            />
          </gui-panel>
          <gui-panel data-tab="Enumerable Count (Donut)">
            <gui-donut value={column.enumerable_count} withInfo withLabelInfo withLabels />
          </gui-panel>
        </gui-tabs>
      ),
    });
  }
}

const countValues = (c: std.io.CsvColumnStatistics): number => {
  return (
    Number(c.bool_count) +
    Number(c.date_count) +
    Number(c.float_count) +
    Number(c.int_count) +
    Number(c.null_count) +
    Number(c.string_count)
  );
};

const possibleInt = (c: std.io.CsvColumnStatistics): boolean => {
  return (
    c.int_count > c.bool_count &&
    c.int_count > c.date_count &&
    c.int_count > c.float_count &&
    c.int_count > c.string_count
  );
};

const possibleFloat = (c: std.io.CsvColumnStatistics): boolean => {
  return (
    c.float_count > c.bool_count &&
    c.float_count > c.date_count &&
    c.float_count > c.int_count &&
    c.float_count > c.string_count
  );
};

const possibleString = (c: std.io.CsvColumnStatistics): boolean => {
  return (
    c.string_count > c.bool_count &&
    c.string_count > c.date_count &&
    c.string_count > c.int_count &&
    c.string_count > c.float_count
  );
};

const possibleBool = (c: std.io.CsvColumnStatistics): boolean => {
  return (
    c.bool_count > c.string_count &&
    c.bool_count > c.date_count &&
    c.bool_count > c.int_count &&
    c.bool_count > c.float_count
  );
};

const possibleDate = (c: std.io.CsvColumnStatistics): boolean => {
  return (
    c.date_count > c.string_count &&
    c.date_count > c.bool_count &&
    c.date_count > c.int_count &&
    c.date_count > c.float_count
  );
};

const possibleType = (c: io.CsvColumnStatistics) => {
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

const nullCount = (c: io.CsvColumnStatistics) => {
  if (c.null_count == 0) {
    return '';
  }
  const total = countValues(c);
  const percentage = ((Number(c.null_count) / total) * 100).toFixed(1);
  return `${c.null_count} (${percentage}%)`;
};

type NullMapper = (prop: keyof io.CsvColumnStatistics) => (c: io.CsvColumnStatistics) => string;
const typeCount: NullMapper = (prop) => (c) => (c[prop] === 0 ? '' : c[prop] as string);

const example = (c: io.CsvColumnStatistics) => {
  if (typeof c.example === 'string') {
    return c.example;
  }
  return '';
};

const average = (c: io.CsvColumnStatistics) => {
  if (c.profile.sum && c.profile.count) {
    return (c.profile.sum / Number(c.profile.count)).toFixed(1);
  }
  return '';
};

const stdDeviation = (c: io.CsvColumnStatistics) => {
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
