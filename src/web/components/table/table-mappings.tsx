import { GuiElement, type sl, css, toast, GuiTable } from '../../exports.js';
import style from './table-mappings.css?inline';
import { GuiTableMapping } from './table-mapping.js';

export class GuiTableMappings extends GuiElement {
  static override styles = [css(style)];

  private _table!: GuiTable;
  private _value: gc.core.TableColumnMapping[];

  private _mappings: HTMLElement;
  private _applyBtn: sl.SlButton;
  private _createMapping = (ev: MouseEvent) => {
    ev.stopPropagation();
    const mapping = document.createElement('gui-table-mapping');
    mapping.table = this._table;
    this._mappings.appendChild(mapping);
    this._value.push(mapping.value);
    this._applyBtn.disabled = false;
    this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
  };
  private _automaticDestructuring = async () => {
    let mappings: gc.core.TableColumnMapping[];
    try {
      mappings = await this._table.table.inferMappings();
    } catch (err) {
      mappings = [];
      toast.error(err);
    }
    this._value = mappings;
    const new_mappings = document.createDocumentFragment();
    for (const mapping of mappings) {
      const el = document.createElement('gui-table-mapping');
      el.table = this._table;
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

  get table() {
    return this._table;
  }

  set table(table: GuiTable) {
    this._table = table;
    for (let i = 0; i < this._mappings.children.length; i++) {
      (this._mappings.children[i] as GuiTableMapping).table = table;
    }
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
        const mapping = this._mappings.children[i] as GuiTableMapping;
        mapping.value = this._value[i];
        mapping.table = this._table;
      }
    } else if (this._value.length < this._mappings.children.length) {
      // less mappings that DOM elements
      let i = 0;
      for (i; i < this._value.length; i++) {
        const mapping = this._mappings.children[i] as GuiTableMapping;
        mapping.value = this._value[i];
        mapping.table = this._table;
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
        const mapping = this._mappings.children[i] as GuiTableMapping;
        mapping.value = this._value[i];
        mapping.table = this._table;
      }
      for (i; i < this._value.length; i++) {
        this._mappings.appendChild(
          <gui-table-mapping value={this._value[i]} table={this._table} />,
        );
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

declare global {
  interface HTMLElementTagNameMap {
    'gui-table-mappings': GuiTableMappings;
  }

  interface GuiTableMappingEventMap {
    [GuiTableMappingsDeleteEvent.NAME]: GuiTableMappingsDeleteEvent;
  }

  interface GuiTableMappingsEventMap {
    [GuiTableMappingsApplyEvent.NAME]: GuiTableMappingsApplyEvent;
  }

  interface HTMLElementEventMap extends GuiTableMappingsEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-table-mappings': GreyCat.Element<GuiTableMappings, GuiTableMappingsEventMap>;
      }
    }
  }
}
