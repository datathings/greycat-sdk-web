import { GuiElement, type sl, GuiTable, css, toast } from '../../exports.js';
import Mappings from './table-mappings.css?inline';
import Mapping from './table-mapping.css?inline';

export class GuiTableMappings extends GuiElement {
  static override styles = [css(Mappings)];

  public table!: GuiTable;

  private _value: gc.core.TableColumnMapping[];

  private _mappings: HTMLElement;
  private _applyBtn: sl.SlButton;
  private _createMapping = (ev: MouseEvent) => {
    ev.stopPropagation();
    const mapping = (<gui-table-mapping />) as GuiTableMapping;
    mapping.table = this.table;
    this._mappings.appendChild(mapping);
    this._value.push(mapping.value);
    this._applyBtn.disabled = false;
    this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
  };
  private _automaticDestructuring = async () => {
    const table = this.table.table;
    const mappings: gc.core.TableColumnMapping[] = [];
    const row = Array.from({ length: table.cols.length });
    let hasNodes = false;
    for (let i = 0; i < table.cols.length; i++) {
      const value = table.cols[i][0];
      row[i] = value;
      if (value instanceof gc.core.node) {
        hasNodes = true;
      }
    }
    try {
      let columns: unknown[];
      const nodes = row.map((v) => (v instanceof gc.core.node ? v : null)) as gc.core.node[];
      if (hasNodes) {
        columns = await gc.core.node.resolve_all(nodes);
      } else {
        columns = row;
      }
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i] === null ? row[i] : columns[i];
        if (col instanceof gc.core.node) {
          // nested node
          const [value] = await gc.core.node.resolve_all([col]);
          if (value instanceof gc.sdk.GCObject && !value.$type.is_native) {
            for (let j = 0; j < value.$type.attrs.length; j++) {
              const attr = value.$type.attrs[j];
              mappings.push(new gc.core.TableColumnMapping(i, [attr.name]));
            }
          } else {
            mappings.push(new gc.core.TableColumnMapping(i, ['*']));
          }
        } else if (col instanceof gc.sdk.GCObject && !col.$type.is_native) {
          for (let j = 0; j < col.$type.attrs.length; j++) {
            const attr = col.$type.attrs[j];
            mappings.push(new gc.core.TableColumnMapping(i, [attr.name]));
          }
        } else if (nodes[i] !== null) {
          mappings.push(new gc.core.TableColumnMapping(i, ['*']));
        }
      }
    } catch (err) {
      toast.error(err);
    }
    this._value = mappings;
    const new_mappings = document.createDocumentFragment();
    for (const mapping of mappings) {
      const el = document.createElement('gui-table-mapping');
      el.table = this.table;
      el.value = mapping;
      new_mappings.appendChild(el);
    }
    this._mappings.replaceChildren(new_mappings);
    // this._applyBtn.disabled = mappings.length === 0;
    this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
  };
  private _applyMappings = () => {
    this.dispatchEvent(new GuiTableMappingsApplyEvent(this.value));
  };

  constructor() {
    super();

    this._value = [];

    this._mappings = document.createElement('div');
    this._mappings.classList.add('gui-list', 'smart');
    this._mappings.addEventListener(GuiTableMappingsDeleteEvent.NAME, (ev) => {
      ev.stopPropagation();
      ev.detail.remove();
      this._value = this.value;
      this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
    });
    this._mappings.addEventListener('sl-change', (ev) => {
      // swallow change event so that they do not bubble up to GuiTableConfig
      ev.stopPropagation();
    });

    this._applyBtn = (
      <sl-button size="small" onclick={this._applyMappings}>
        Apply
      </sl-button>
    ) as sl.SlButton;

    this.shadowRoot.appendChild(
      <sl-card>
        <header slot="header">
          <span>Mappings</span>
          <div className="gui-row">
            <sl-button variant="text" size="small" onclick={this._createMapping}>
              Add
            </sl-button>
            <sl-button variant="text" size="small" onclick={this._automaticDestructuring}>
              Automatic destructuring
            </sl-button>
          </div>
        </header>
        {this._mappings}
        <footer slot="footer">
          <div />
          {this._applyBtn}
        </footer>
      </sl-card>,
    );
  }

  connectedCallback(): void {
    this.update();
  }

  get value() {
    const mappings: gc.core.TableColumnMapping[] = [];
    for (let i = 0; i < this._mappings.children.length; i++) {
      const mapping = this._mappings.children[i] as GuiTableMapping;
      mappings.push(mapping.value);
    }
    return mappings;
  }

  set value(value: gc.core.TableColumnMapping[]) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    // this._applyBtn.disabled = this._value.length === 0;

    if (this._value.length === this._mappings.children.length) {
      // same number of elements
      for (let i = 0; i < this._value.length; i++) {
        (this._mappings.children[i] as GuiTableMapping).value = this._value[i];
      }
    } else if (this._value.length < this._mappings.children.length) {
      // less mappings that DOM elements
      let i = 0;
      for (i; i < this._value.length; i++) {
        (this._mappings.children[i] as GuiTableMapping).value = this._value[i];
      }
      let left = this._mappings.children.length - i;
      while (left > 0) {
        const mapping = this._mappings.children[left - 1];
        mapping.remove();
        left -= 1;
      }
    } else if (this._value.length > this._mappings.children.length) {
      // more mappings that DOM elements
      let i = 0;
      for (i; i < this._mappings.children.length; i++) {
        (this._mappings.children[i] as GuiTableMapping).value = this._value[i];
      }
      for (i; i < this._value.length; i++) {
        this._mappings.appendChild(<gui-table-mapping value={this._value[i]} />);
      }
    }
  }
}

export class GuiTableMappingsDeleteEvent extends CustomEvent<GuiTableMapping> {
  static readonly NAME = 'gui-table-mappings-delete';

  constructor(mapping: GuiTableMapping) {
    super(GuiTableMappingsDeleteEvent.NAME, { detail: mapping, composed: true, bubbles: true });
  }
}

export class GuiTableMappingsApplyEvent extends CustomEvent<gc.core.TableColumnMapping[]> {
  static readonly NAME = 'gui-table-mappings-apply';

  constructor(mappings: gc.core.TableColumnMapping[]) {
    super(GuiTableMappingsApplyEvent.NAME, { detail: mappings, composed: true, bubbles: true });
  }
}

export class GuiTableMapping extends GuiElement {
  static override styles = [css(Mapping)];

  public table!: GuiTable;
  private _value: gc.core.TableColumnMapping = new gc.core.TableColumnMapping(0, []);

  private _column: sl.SlSelect;
  private _extractors: sl.SlInput;
  private _delete: sl.SlButton;

  constructor() {
    super();

    this._column = (<sl-select label="Column" size="small" />) as sl.SlSelect;
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
    for (let i = 0; i < this.table.table.cols.length; i++) {
      const header = this.table.table.headers?.[i] || `Column ${i}`;
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
    'gui-table-mappings': GuiTableMappings;
    'gui-table-mapping': GuiTableMapping;
  }

  interface GuiTableMappingEventMap {
    [GuiTableMappingsDeleteEvent.NAME]: GuiTableMappingsDeleteEvent;
  }

  interface GuiTableMappingsEventMap {
    [GuiTableMappingsApplyEvent.NAME]: GuiTableMappingsApplyEvent;
  }

  interface HTMLElementEventMap extends GuiTableMappingEventMap, GuiTableMappingsEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-table-mappings': GreyCat.Element<GuiTableMappings, GuiTableMappingsEventMap>;
        'gui-table-mapping': GreyCat.Element<GuiTableMapping, GuiTableMappingEventMap>;
      }
    }
  }
}
