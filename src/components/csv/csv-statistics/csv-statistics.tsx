import { io } from '@greycat/sdk';

export class GuiCsvStatistics extends HTMLElement {
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

  set statistics(statistics: io.CsvStatistics | null | undefined) {
    this._stats = statistics;
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
                  <a href="#" onclick={() => this.showWordList(c)}>
                    {c.name}
                  </a>
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
              <td>Null count</td>
              {this._stats.columns.map((c) => {
                if (c.null_count === 0) {
                  return <td></td>;
                }

                const total = this._countValues(c);
                const percentage = ((Number(c.null_count) / total) * 100).toFixed(2);
                return (
                  <td>
                    {percentage}% ({c.null_count})
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Example</td>
              {this._stats.columns.map((c) => (
                <td>{c.example}</td>
              ))}
            </tr>
            <tr>
              <td>Numerical range</td>
              {this._stats.columns.map((c) =>
                Number(c.float_count) + Number(c.int_count) > 0 ? (
                  <td>
                    [{c.profile.min?.toFixed(2)}; {c.profile.max?.toFixed(2)}]
                  </td>
                ) : (
                  <td></td>
                ),
              )}
            </tr>
          </tbody>
        </table>
      </figure>,
    );
  }

  showWordList(column: io.CsvColumnStatistics): void {
    this._dialog.replaceChildren(
      <article>
        <header>{column.name}</header>
        <gui-tabs>
          <gui-tab className="activeTab">Statistics</gui-tab>
          <gui-panel data-tab="Statistics">
            <gui-object value={column} />
          </gui-panel>

          <gui-tab>Word List (Donut)</gui-tab>
          <gui-panel data-tab="Word List (Donut)">
            <gui-donut table={column.word_list} withInfo withLabelInfo withLabels />
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
      'gui-csv-statistics': Partial<Omit<GuiCsvStatistics, 'children'>>;
    }
  }
}
