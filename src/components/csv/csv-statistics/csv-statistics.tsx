import { io } from '@greycat/sdk';
import type { GuiTable } from '../../index.js';

export class GuiCsvStatistics extends HTMLElement {
  private static readonly MAX_CONTENT_LENGTH = 50;
  private _stats: io.CsvStatistics | null | undefined;
  private _main = document.createElement('div');
  private _dialog = document.createElement('dialog');

  connectedCallback() {
    this.appendChild(this._main);
    this.appendChild(this._dialog);
    this.render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  /**
   * @deprecated use `value` instead
   */
  set statistics(statistics: io.CsvStatistics | null | undefined) {
    this.value = statistics;
  }

  set value(value: io.CsvStatistics | null | undefined) {
    this._stats = value;
    this.render();
  }

  render() {
    if (!this._stats) {
      // empty table if null
      this._main.replaceChildren();
      return;
    }

    this._main.replaceChildren(
      <figure>
        <table>
          <thead>
            <tr>
              <th></th>
              {this._stats.columns.map((c) => (
                <th>
                  <b
                    title={
                      c.name !== null && c.name.length > GuiCsvStatistics.MAX_CONTENT_LENGTH
                        ? c.name
                        : ''
                    }
                  >
                    {c.name}
                  </b>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Column offset (zero-based)</td>
              {this._stats.columns.map((_, i) => (
                <td>{i}</td>
              ))}
            </tr>
            <tr>
              <td>Nb rows</td>
              {this._stats.columns.map((c) => (
                <td>{this._countValues(c)}</td>
              ))}
            </tr>
            <tr>
              <td>Possible type</td>
              {this._stats.columns.map((c) => {
                if (this._possibleInt(c)) {
                  if (c.null_count !== 0) {
                    return (
                      <td>
                        <code>int?</code>
                      </td>
                    );
                  }
                  return (
                    <td>
                      <code>int</code>
                    </td>
                  );
                }

                if (this._possibleFloat(c)) {
                  if (c.null_count !== 0) {
                    return (
                      <td>
                        <code>float?</code>
                      </td>
                    );
                  }
                  return (
                    <td>
                      <code>float</code>
                    </td>
                  );
                }

                if (this._possibleBool(c)) {
                  if (c.null_count !== 0) {
                    return (
                      <td>
                        <code>bool?</code>
                      </td>
                    );
                  }
                  return (
                    <td>
                      <code>bool</code>
                    </td>
                  );
                }

                if (this._possibleDate(c)) {
                  if (c.null_count !== 0) {
                    return (
                      <td>
                        <code>Date?</code>
                      </td>
                    );
                  }
                  return (
                    <td>
                      <code>Date</code>
                    </td>
                  );
                }

                if (this._possibleString(c)) {
                  if (c.null_count !== 0) {
                    return (
                      <td>
                        <code>String?</code>
                      </td>
                    );
                  }
                  return (
                    <td>
                      <code>String</code>
                    </td>
                  );
                }
                return <td></td>;
              })}
            </tr>
            <tr>
              <td>Null count</td>
              {this._stats.columns.map((c) => {
                if (c.null_count === 0) {
                  return <td></td>;
                }

                const total = this._countValues(c);
                const percentage = ((Number(c.null_count) / total) * 100).toFixed(6);
                return (
                  <td>
                    {c.null_count} ({percentage}%)
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Int count</td>
              {this._stats.columns.map((c) => (
                <td>{c.int_count == 0 ? undefined : c.int_count}</td>
              ))}
            </tr>
            <tr>
              <td>Float count</td>
              {this._stats.columns.map((c) => (
                <td>{c.float_count == 0 ? undefined : c.float_count}</td>
              ))}
            </tr>
            <tr>
              <td>String count</td>
              {this._stats.columns.map((c) => (
                <td>{c.string_count == 0 ? undefined : c.string_count}</td>
              ))}
            </tr>
            <tr>
              <td>Bool count</td>
              {this._stats.columns.map((c) => (
                <td>{c.bool_count == 0 ? undefined : c.bool_count}</td>
              ))}
            </tr>
            <tr>
              <td>Date count</td>
              {this._stats.columns.map((c) => (
                <td>{c.date_count == 0 ? undefined : c.date_count}</td>
              ))}
            </tr>
            <tr>
              <td>Example</td>
              {this._stats.columns.map((c) => (
                <td
                  title={
                    typeof c.example === 'string' &&
                    c.example.length > GuiCsvStatistics.MAX_CONTENT_LENGTH
                      ? c.example
                      : ''
                  }
                >
                  {c.example}
                </td>
              ))}
            </tr>
            <tr>
              <td>Minimum</td>
              {this._stats.columns.map((c) => (
                <td>{c.profile.min?.toFixed(6)}</td>
              ))}
            </tr>
            <tr>
              <td>Maximum</td>
              {this._stats.columns.map((c) => (
                <td>{c.profile.max?.toFixed(6)}</td>
              ))}
            </tr>
            <tr>
              <td>Average</td>
              {this._stats.columns.map((c) =>
                c.profile.sum && c.profile.count ? (
                  <td>{(c.profile.sum / Number(c.profile.count)).toFixed(6)}</td>
                ) : (
                  <td />
                ),
              )}
            </tr>
            <tr>
              <td>Standard Deviation</td>
              {this._stats.columns.map((c) => {
                if (c.profile.count && c.profile.sum && c.profile.sum_sq) {
                  let std = 0.0;
                  const s = (c.profile.sum * c.profile.sum) / Number(c.profile.count);
                  if (Number(c.profile.count) > 1 && c.profile.sum_sq > s) {
                    std = Math.sqrt((c.profile.sum_sq - s) / (Number(c.profile.count) - 1));
                  }
                  return <td>{std.toFixed(6)}</td>;
                }
                return <td />;
              })}
            </tr>
            <tr>
              <td>Word list</td>
              {this._stats.columns.map((c) => {
                return (
                  <td>
                    <a
                      href="#"
                      onclick={(ev) => {
                        ev.preventDefault();
                        this.showWordList(c);
                      }}
                    >
                      Show
                    </a>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </figure>,
    );
  }

  showWordList(column: io.CsvColumnStatistics): void {
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

    const table = (
      <gui-table
        value={{
          cols: [words, counts],
          meta: [{ header: `Word (${wTotal})` }, { header: `Count (${cTotal})` }],
        }}
      />
    ) as GuiTable;

    this._dialog.replaceChildren(
      <article>
        <header>{column.name}</header>
        <gui-tabs>
          <gui-tab className="activeTab">Enumerable Count</gui-tab>
          <gui-tab>Enumerable Count (Donut)</gui-tab>

          <gui-panel data-tab="Enumerable Count">
            <input
              type="search"
              placeholder="Filter"
              oninput={(ev) => (table.filter = (ev.target as HTMLInputElement).value)}
            />
            {table}
          </gui-panel>
          <gui-panel data-tab="Enumerable Count (Donut)">
            <gui-donut value={column.enumerable_count} withInfo withLabelInfo withLabels />
          </gui-panel>
        </gui-tabs>
        <footer>
          <button className="outline" onclick={() => this._dialog.close()}>
            Close
          </button>
        </footer>
      </article>,
    );
    this._dialog.showModal();
  }

  private _countValues(col: io.CsvColumnStatistics): number {
    return (
      Number(col.bool_count) +
      Number(col.date_count) +
      Number(col.float_count) +
      Number(col.int_count) +
      Number(col.null_count) +
      Number(col.string_count)
    );
  }

  private _possibleInt(col: io.CsvColumnStatistics): boolean {
    return (
      col.int_count > col.bool_count &&
      col.int_count > col.date_count &&
      col.int_count > col.float_count &&
      col.int_count > col.string_count
    );
  }

  private _possibleFloat(col: io.CsvColumnStatistics): boolean {
    return (
      col.float_count > col.bool_count &&
      col.float_count > col.date_count &&
      col.float_count > col.int_count &&
      col.float_count > col.string_count
    );
  }

  private _possibleString(col: io.CsvColumnStatistics): boolean {
    return (
      col.string_count > col.bool_count &&
      col.string_count > col.date_count &&
      col.string_count > col.int_count &&
      col.string_count > col.float_count
    );
  }

  private _possibleBool(col: io.CsvColumnStatistics): boolean {
    return (
      col.bool_count > col.string_count &&
      col.bool_count > col.date_count &&
      col.bool_count > col.int_count &&
      col.bool_count > col.float_count
    );
  }

  private _possibleDate(col: io.CsvColumnStatistics): boolean {
    return (
      col.date_count > col.string_count &&
      col.date_count > col.bool_count &&
      col.date_count > col.int_count &&
      col.date_count > col.float_count
    );
  }
}

if (!customElements.get('gui-csv-statistics')) {
  customElements.define('gui-csv-statistics', GuiCsvStatistics);
}

declare global {
  interface Window {
    GuiCsvStatistics: typeof GuiCsvStatistics;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-statistics': GuiCsvStatistics;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-statistics': GreyCat.Element<GuiCsvStatistics>;
    }
  }
}
