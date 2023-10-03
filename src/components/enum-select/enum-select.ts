import { GCEnum, GreyCat } from '@greycat/sdk';

export type OnChangeHandler = (value: GCEnum) => void;
export type OptionRenderer = (value: GCEnum, el: HTMLOptionElement) => HTMLElement | void;

export interface GuiEnumSelectProps {
  greycat: GreyCat | null;
  fqn: string | null;
  selected: GCEnum | null;
  useValue: boolean;
  renderOption: OptionRenderer | null;
}

/**
 * Displays any GreyCat enumeration within a DOM `<select />` using the field name for the `<option />` text by default.
 */
export class GuiEnumSelect extends HTMLElement implements GuiEnumSelectProps {
  private _greycat: GreyCat = window.greycat.default;
  private _fqn: string | null = null;
  private _selected: GCEnum | null = null;
  private _useValue = false;
  private _renderOption: OptionRenderer | null = null;
  private _select: HTMLSelectElement;
  private _defaultRender: OptionRenderer = (value, el) => {
    el.textContent = this._useValue ? `${value.value?.toString()}` : value.key;
  };
  private _onChangeHandler = (ev: Event) => {
    ev.stopPropagation();

    if (!this._fqn) {
      this._selected = null;
      this.dispatchEvent(new GuiEnumSelectEvent(null));
    } else {
      const type = this._greycat.abi.type_by_fqn.get(this._fqn);
      if (!type || !type.enum_values) {
        this._selected = null;
        this.dispatchEvent(new GuiEnumSelectEvent(null));
      } else {
        this._selected = type.enum_values[this._select.selectedIndex] ?? null;
        this.dispatchEvent(new GuiEnumSelectEvent(this._selected));
      }
    }


  };

  constructor() {
    super();

    this._select = document.createElement('select');
  }

  get greycat(): GreyCat {
    return this._greycat;
  }

  set greycat(g: GreyCat | null) {
    this._greycat = g ?? this._greycat;
  }

  /**
   * An enum fully qualified name eg. `'core::TimeZone'`
   */
  get fqn(): string | null {
    return this._fqn;
  }

  set fqn(fqn: string | null) {
    this._fqn = fqn;
    this.render();
  }

  /**
   * Defines the currently selected option
   */
  get selected(): GCEnum | null {
    return this._selected;
  }

  set selected(field: GCEnum | null) {
    this._selected = field;
    this.render();
  }

  get useValue(): boolean {
    return this._useValue;
  }

  /**
  * By default, the option text is using the enum field key. Setting this to `true`
  * will use the field value.
  */
  set useValue(value: boolean) {
    this._useValue = value;
    this.render();
  }

  set disabled(disabled: boolean) {
    this._select.disabled = disabled;
  }

  get disabled() {
    return this._select.disabled ?? false;
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
    greycat = this._greycat,
    selected = this._selected,
    fqn = this._fqn,
    useValue = this._useValue,
    renderOption = this._renderOption,
  }: Partial<GuiEnumSelectProps>) {
    this._greycat = greycat ?? this._greycat;
    this._fqn = fqn;
    this._selected = selected;
    this._useValue = useValue;
    this._renderOption = renderOption;
    this.render();
  }

  connectedCallback() {
    this.appendChild(this._select);
    this._select.addEventListener('change', this._onChangeHandler);
    this.render();
  }

  disconnectedCallback() {
    this._select.removeEventListener('change', this._onChangeHandler);
    this.replaceChildren(); // cleanup
  }

  render() {
    if (!this._fqn) {
      return;
    }
    this._select.replaceChildren(); // TODO improve this by re-using previous options

    const options = document.createDocumentFragment();

    const optRender: OptionRenderer = this._renderOption ?? this._defaultRender;
    const type = this._greycat.abi.type_by_fqn.get(this._fqn);
    if (!type || !type.enum_values) {
      return;
    }
    for (const value of type.enum_values) {
      const opt = document.createElement('option');
      if (value === this._selected) {
        opt.setAttribute('selected', '');
      }
      opt.value = value.key;
      const child = optRender(value, opt);
      if (child) {
        opt.appendChild(child);
      }
      options.appendChild(opt);
    }
    this._select.appendChild(options);
  }
}

export const SELECT_EVENT_TYPE = 'change';

export class GuiEnumSelectEvent extends CustomEvent<GCEnum | null> {
  constructor(value: GCEnum | null) {
    super(SELECT_EVENT_TYPE, { detail: value, bubbles: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-enum-select': GuiEnumSelect;
  }

  interface HTMLElementEventMap {
    [SELECT_EVENT_TYPE]: GuiEnumSelectEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-enum-select': Partial<Omit<GuiEnumSelect, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-enum-select')) {
  globalThis.customElements.define('gui-enum-select', GuiEnumSelect);
}
