import { io } from '@greycat/sdk';
import { ColumnType, getColumnType } from '../utils.js';

type LineProps = {
  label: string,
  value: number,
  valueSum?: number,
}

export class GuiCsvColumnStatistics extends HTMLElement {
  private _csvColumnStatistics: io.CsvColumnStatistics | null = null;

  set statistics(csvColumnStatistics: io.CsvColumnStatistics | null) {
    this._csvColumnStatistics = csvColumnStatistics;
    this.render();
  }

  private _createLine = ({label, value, valueSum}: LineProps) => {
    if (!valueSum) {
      return <></>;
    }
    return (
      <div className="gui-csv-column-statistics__line">
        <div className="gui-csv-column-statistics__info-container">
          <div className="gui-csv-column-statistics__label">{label}</div>
          <div className="gui-csv-column-statistics__percentage">{value}</div>
        </div>
        <progress 
          className="gui-csv-column-statistics__progress-bar" 
          max={100} 
          value={Math.round((value / valueSum) * 100)}>
        </progress>
      </div>
    );
  };

  render() {
    if (!this._csvColumnStatistics) {
      return;
    }

    const type = getColumnType(this._csvColumnStatistics);
    const lines: LineProps[] = [];
    let valueSum = 0;
  
    const addLine = (label: string, value: number | bigint) => {
      lines.push({ label, value: value as number});
      valueSum += value as number;
    };
  
    if (type === ColumnType.Enum) {
      this._csvColumnStatistics.word_list.forEach((value, key) => addLine(key, value));
    } else if (type === ColumnType.Date) {
      this._csvColumnStatistics.date_format_count.forEach((value, key) => addLine(key, value));
    } else {
      addLine('int', this._csvColumnStatistics.int_count);
      addLine('float', this._csvColumnStatistics.float_count);
      addLine('bool', this._csvColumnStatistics.bool_count);
      addLine('date', this._csvColumnStatistics.date_count);
      addLine('string', this._csvColumnStatistics.string_count);
    }
  
    lines.sort((a, b) => b.value - a.value);

    const linesEl = document.createDocumentFragment();
    lines.forEach((line, index) => {
      if (index < 3) {
        const count = line.value;
        if (count) {
          linesEl.appendChild(this._createLine({label: line.label, value: count, valueSum}));
        }
      }
    });
  
    this.replaceChildren(linesEl);
  }
}

if (!customElements.get('gui-csv-column-statistics')) {
  customElements.define('gui-csv-column-statistics', GuiCsvColumnStatistics);
}

declare global {
  interface Window {
    GuiCsvColumnStatistics: typeof GuiCsvColumnStatistics;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-column-statistics': GuiCsvColumnStatistics;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-column-statistics': Partial<Omit<GuiCsvColumnStatistics, 'children'>>;
    }
  }
}
