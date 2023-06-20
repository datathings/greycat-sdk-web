export interface AnyField {
  field: string;
  value: unknown;
}

export type OnChangeHandler = (field: AnyField) => void;
export type OptionRenderer = (field: AnyField, el: HTMLOptionElement) => HTMLElement | void;

export interface GuiEnumSelectProps {
  fields: AnyField[];
  selected: AnyField | undefined;
  renderOption: OptionRenderer | null;
  onChange: OnChangeHandler | null;
}

/**
 * Displays any GreyCat enumeration within a DOM `<select />` using the field name for the `<option />` text by default.
 */
export class GuiEnumSelect extends HTMLElement implements GuiEnumSelectProps {
  private _fields: AnyField[] = [];
  private _selected: AnyField | undefined;
  private _onChange: OnChangeHandler | null = null;
  private _renderOption: OptionRenderer | null = null;
  private _select: HTMLSelectElement | undefined;
  private _onChangeHandler = () => {
    if (!this._select) {
      return;
    }
    this._selected = this._fields[this._select.selectedIndex];
    this._onChange?.(this._fields[this._select.selectedIndex]);
  };

  /**
   * The fields of the enumeration (eg. `core.TimeZone.$fields`, `core.ErrorCode.$fields`)
   */
  get fields(): AnyField[] {
    return this._fields;
  }

  set fields(fields: AnyField[]) {
    this._fields = fields;
    this.render();
  }

  /**
   * Defines the currently selected option
   */
  get selected(): AnyField | undefined {
    return this._selected;
  }

  set selected(field: AnyField | undefined) {
    this._selected = field;
    this.render();
  }

  /**
   * An event handler called each time the underlying `<select />` changes
   */
  set onChange(handler: OnChangeHandler | null) {
    this._onChange = handler;
    this.render();
  }

  /**
   * Allows to override the default `<option />` element.
   * If the handler returns an HTMLElement it will be added as children.
   * Otherwise it is your resposibility to set `el.textContent` when overriding the default option renderer.
   */
  set renderOption(handler: OptionRenderer | null) {
    this._renderOption = handler;
    this.render();
  }

  setAttrs({
    fields = this._fields,
    selected = this._selected,
    onChange = this._onChange,
    renderOption = this._renderOption,
  }: Partial<GuiEnumSelectProps>) {
    this._fields = fields;
    this._selected = selected;
    this._onChange = onChange;
    this._renderOption = renderOption;
    this.render();
  }

  connectedCallback() {
    this._select = document.createElement('select');
    this._select.addEventListener('change', this._onChangeHandler);
    this.appendChild(this._select);
    this.render();
  }

  disconnectedCallback() {
    this._select?.removeEventListener('change', this._onChangeHandler);
  }

  render() {
    if (!this._select) {
      return;
    }
    this._select.replaceChildren(); // TODO improve this by re-using previous options

    const options = document.createDocumentFragment();

    const defaultRender: OptionRenderer = (f, el) => {
      el.textContent = f.field;
    };
    const optRender: OptionRenderer = this._renderOption ?? defaultRender;
    for (const field of this._fields) {
      const opt = document.createElement('option');
      if (field === this._selected) {
        opt.setAttribute('selected', '');
      }
      opt.value = field.field;
      const child = optRender(field, opt);
      if (child) {
        opt.appendChild(child);
      }
      options.appendChild(opt);
    }
    this._select.appendChild(options);
  }
}

declare global {
  interface Window {
    GuiEnumSelect: typeof GuiEnumSelect;
  }

  interface HTMLElementTagNameMap {
    'gui-enum-select': GuiEnumSelect;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-enum-select': any;
    }
  }
}

if (!window.customElements.get('gui-enum-select')) {
  window.GuiEnumSelect = GuiEnumSelect;
  window.customElements.define('gui-enum-select', GuiEnumSelect);
}
