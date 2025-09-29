import { GuiElement, css, sl, GuiTable } from '../../exports.js';
import style from './table-mapping.css?inline';

export class GuiTableMapping extends GuiElement {
  static override styles = [css(style)];

  private _table!: GuiTable;
  private _value: gc.core.TableColumnMapping = new gc.core.TableColumnMapping(0, []);

  private _column: sl.SlSelect;
  private _extractors: sl.SlInput;
  private _delete: sl.SlButton;

  constructor() {
    super();

    this._column = (<sl-select label="Column" size="small" hoist />) as sl.SlSelect;
    this._extractors = (<sl-input label="Extractors" size="small" />) as sl.SlInput;
    this._delete = (
      <sl-button
        variant="text"
        size="small"
        onclick={() => {
          this.dispatchEvent(
            new CustomEvent('gui-table-mapping-delete', {
              detail: this,
              bubbles: true,
              composed: true,
            }),
          );
        }}
      >
        Del
      </sl-button>
    ) as sl.SlButton;

    this.shadowRoot.replaceChildren(
      <>
        {this._column}
        {this._extractors}
        {this._delete}
      </>,
    );
  }

  connectedCallback(): void {
    this.update();
  }

  get table() {
    return this._table;
  }

  set table(table: GuiTable) {
    this._table = table;
    this.update();
  }

  get value() {
    const value = this._value;

    const column = getSelectValue(this._column);
    if (column !== undefined) {
      value.column = +column;
    }

    value.extractors = this._extractors.value.split('.');

    return value;
  }

  set value(value: gc.core.TableColumnMapping) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._column.replaceChildren();
    for (let i = 0; i < this._table.table.cols.length; i++) {
      const header = this._table.table.headers?.[i] || `Column ${i}`;
      this._column.appendChild(<sl-option value={`${i}`}>{header}</sl-option>);
    }
    this._column.value = `${this._value.column}`;
    // this._column.setAttribute('value', `${this._value.column}`);
    this._extractors.value = this._value.extractors.join('.');
  }
}

function getSelectValue(select: sl.SlSelect): string | undefined {
  const value = select.value;
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return value[0];
    }
    return;
  }
  if (value.length !== 0) {
    return value;
  }
  return;
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-table-mapping': GuiTableMapping;
  }

  interface HTMLElementEventMap extends GuiTableMappingEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-table-mapping': GreyCat.Element<GuiTableMapping, GuiTableMappingEventMap>;
      }
    }
  }
}
