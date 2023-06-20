import { GuiValue, GuiValueProps } from '../components';
import { createElement } from '../internals';

export const tooltipClasses = {
  root: 'gui-tooltip',
  header: 'gui-tooltip-header',
  content: 'gui-tooltip-content',
  row: 'gui-tooltip-row',
} as const;

export interface SimpleTooltipRow {
  /** row color */
  color?: string;
  /** rows are key / value pairs, this is the key */
  key: string;
  /** the "value" in the row key/value pair */
  value: Partial<GuiValueProps>;
  /** optional string after value */
  extra?: string;
}

export class SimpleTooltip {
  readonly root: HTMLDivElement;
  private _header?: GuiValue;
  private _content: HTMLDivElement;

  constructor() {
    this.root = createElement('div', { classes: [tooltipClasses.root] });
    this._content = createElement('div', { classes: [tooltipClasses.content] });

    this.root.appendChild(this._content);
  }

  hide() {
    this.root.style.visibility = 'hidden';
  }

  show() {
    this.root.style.visibility = 'visible';
  }

  updateHeader(attrs: Partial<GuiValueProps>) {
    if (!this._header) {
      this._header = document.createElement('gui-value');
      const container = createElement('div', {
        classes: [tooltipClasses.header],
        content: this._header,
      });
      this.root.prepend(container);
    }
    this._header.setAttrs(attrs);
  }

  updateRows(rows: SimpleTooltipRow[]): void {
    if (rows.length < this._content.children.length) {
      let i = rows.length;
      while (i !== 0) {
        this._content.children.item(i)?.remove();
        i--;
      }
    }
    for (let i = 0; i < rows.length; i++) {
      this._updateRow(i, rows[i]);
    }
  }

  private _updateRow(index: number, { color, key, value, extra }: SimpleTooltipRow): void {
    const row = this._getRow(index);
    if (color) {
      row.style.color = color;
    }
    row.children[0].textContent = key;
    (row.children[1].children[0] as GuiValue).setAttrs(value);
    if (extra) {
      if (row.children[1].children.length === 2) {
        row.children[1].children[1].textContent = extra;
      } else {
        row.children[1].appendChild(createElement('div', { textContent: extra }));
      }
    } else {
      if (row.children[1].children.length === 2) {
        row.children[1].removeChild(row.children[1].children[1]);
      }
    }
  }

  resetRows(): void {
    this._content.replaceChildren();
  }

  private _getRow(index: number): HTMLElement {
    const found = this._content.children.item(index);
    if (found instanceof HTMLElement) {
      return found;
    }

    const row = createElement('div', {
      classes: [tooltipClasses.row],
      content: [
        createElement('div'),
        createElement('div', {
          style: { display: 'flex', gap: '5px', minHeight: '18px' },
          content: [createElement('gui-value')],
        }),
      ],
    });
    this._content.insertBefore(row, this._content.children[index + 1]);
    return row;
  }
}
