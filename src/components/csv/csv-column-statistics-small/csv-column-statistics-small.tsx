import { io } from '@greycat/sdk';
import { ColumnType, getColumnType } from '../utils.js';

interface StatisticsPair {
  label: string;
  value: number;
}

export class GuiCsvColumnStatisticsSmall extends HTMLElement {
  private _csvColumnStatistics: io.CsvColumnStatistics | null = null;

  set statistics(csvColumnStatistics: io.CsvColumnStatistics | null) {
    this._csvColumnStatistics = csvColumnStatistics;
    this.render();
  }

  private _createLine(label: string, value: number) {
    const percentage = Math.round(value);

    const line = document.createElement('div');
    line.classList.add('line');

    const labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.textContent = label;

    const percentageElement = document.createElement('div');
    percentageElement.classList.add('percentage');
    percentageElement.textContent = `${percentage}%`;

    const progressElement = document.createElement('progress');
    progressElement.classList.add('progress-bar');
    progressElement.max = 100;
    progressElement.value = percentage;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    infoContainer.appendChild(labelElement);
    infoContainer.appendChild(percentageElement);

    line.appendChild(infoContainer);
    line.appendChild(progressElement);

    return line;
}


  render() {
    if (!this._csvColumnStatistics) {
      return;
    }

    const type = getColumnType(this._csvColumnStatistics);
    const lines: StatisticsPair[] = [];
    let valueSum: number = 0;

    if (type === ColumnType.Enum) {
      const arr = Array.from(this._csvColumnStatistics.word_list);
      for (let i = 0; i < arr.length; i++) {
        lines.push({
          label: arr[i][0],
          value: arr[i][1] as number
        });
      }
    } else if (type === ColumnType.Date) {
      const arr = Array.from(this._csvColumnStatistics.date_format_count);
      for (let i = 0; i < arr.length; i++) {
        lines.push({
          label: arr[i][0],
          value: arr[i][1] as number
        });
      }
    } else {
      lines.push({
        label: 'int',
        value: this._csvColumnStatistics.int_count as number
      });
      lines.push({
        label: 'float',
        value: this._csvColumnStatistics.float_count as number
      });
      lines.push({
        label: 'bool',
        value: this._csvColumnStatistics.bool_count as number
      });
      lines.push({
        label: 'date',
        value: this._csvColumnStatistics.date_count as number
      });
      lines.push({
        label: 'string',
        value: this._csvColumnStatistics.string_count as number
      });
    }

    lines.push({
      label: 'null',
      value: this._csvColumnStatistics.null_count as number
    });

    lines.sort((a, b) => b.value - a.value);

    for (let i = 0; i < lines.length; i++) {
      valueSum += lines[i].value;
    }

    const linesEl = document.createDocumentFragment();
    if (lines.length >= 1) {
      const percentage = (lines[0].value / valueSum) * 100.0;
      if (percentage) {
        linesEl.appendChild(this._createLine(lines[0].label, percentage));
      }
    }
    if (lines.length >= 2) {
      const percentage = (lines[1].value / valueSum) * 100.0;
      if (percentage) {
        linesEl.appendChild(this._createLine(lines[1].label, percentage));
      }
    }
    if (lines.length >= 3) {
      const percentage = ((valueSum - lines[0].value - lines[1].value) / valueSum) * 100.0;
      if (percentage) {
        if (lines.length == 3) {
          linesEl.appendChild(this._createLine(lines[2].label, percentage));
        } else {
          linesEl.appendChild(this._createLine('Other', percentage));
        }
      }
    }

    this.replaceChildren(linesEl);
  }
}

if (!customElements.get('gui-csv-column-statistics-small')) {
  customElements.define('gui-csv-column-statistics-small', GuiCsvColumnStatisticsSmall);
}

declare global {
  interface Window {
    GuiCsvColumnStatisticsSmall: typeof GuiCsvColumnStatisticsSmall;
  }
  interface HTMLElementTagNameMap {
    'gui-csv-column-statistics-small': GuiCsvColumnStatisticsSmall;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-csv-column-statistics-small': Partial<Omit<GuiCsvColumnStatisticsSmall, 'children'>>;
    }
  }
}
