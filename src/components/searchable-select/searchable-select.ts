import type { SlInput } from '@shoelace-style/shoelace';
import { getIndexInParent } from '../../utils.js';
import { GuiChangeEvent, GuiInputEvent } from '../events.js';
import { GuiInputElement } from '../inputs/index.js';

import style from './searchable-select.css?inline';

export interface SearchableOption {
  text: string;
  /** If the `value` is not defined, `text` will be used */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  selected?: boolean;
}
export interface GuiSearchableInputConfig {
  nullable?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiSearchableSelect<T = any> extends GuiInputElement<T | undefined> {
  private _input: SlInput;
  private _list: HTMLElement;
  private _options: SearchableOption[];

  static STYLE: CSSStyleSheet;

  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(style);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiSearchableSelect.STYLE);

    this._options = [];

    // Create an input element for searching
    this._input = document.createElement('sl-input');
    this._input.setAttribute(
      'exportparts',
      'form-control,form-control-label,form-control-input,form-control-help-text,base,input,prefix,clear-button,suffix',
    );
    this._input.type = 'search';
    this._input.placeholder = 'Search...';
    this._input.autocomplete = 'off';
    this._input.clearable = true;
    const icon = document.createElement('sl-icon');
    icon.setAttribute('slot', 'prefix');
    this._input.appendChild(icon);
    // Handle input events for filtering options
    this._input.addEventListener('sl-input', () => {
      const query = this._input.value.toLowerCase();

      this._list.querySelectorAll('div').forEach((item) => {
        const text = item.textContent?.toLowerCase() ?? '';
        if (text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      this.showDropdown();
    });

    this._input.addEventListener('sl-clear', () => {
      this._input.value = '';
      this._list.querySelectorAll('div').forEach((item) => {
        item.classList.remove('hidden', 'selected');
      });
      this.dispatchEvent(new GuiChangeEvent(undefined));
      this.dispatchEvent(new GuiInputEvent(undefined));
    });

    this._input.addEventListener('blur', () => {
      setTimeout(() => {
        this.hideDropdown();
      }, 0);
    });

    this._input.addEventListener('focus', () => {
      this.showDropdown();
    });

    this._input.addEventListener('click', () => {
      this.showDropdown();
    });

    this._input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        this.hideDropdown();
        ev.preventDefault();
      } else if (ev.key === 'Enter') {
        const items = this._list.querySelectorAll(`div:not(.hidden)`);
        let selectedIndex = -1;
        items.forEach((li, i) => {
          if (li.classList.contains('selected')) {
            selectedIndex = i;
          }
        });
        if (selectedIndex !== -1) {
          ev.preventDefault();
          const item = items[selectedIndex];
          this._list
            .querySelectorAll(`div.selected`)
            .forEach((e) => e.classList.remove('selected'));
          item.classList.add('selected');
          this.hideDropdown();
          this._input.value = item.textContent!;
          const index = getIndexInParent(item);
          const value =
            this._options[index].value === undefined
              ? this._options[index].text
              : this._options[index].value;
          this.dispatchEvent(new GuiChangeEvent(value));
          this.dispatchEvent(new GuiInputEvent(value));
        }
      } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        const items = this._list.querySelectorAll(`div:not(.hidden)`);
        let selectedIndex = -1;
        items.forEach((li, i) => {
          if (li.classList.contains('selected')) {
            selectedIndex = i;
          }
        });
        if (selectedIndex !== -1) {
          items[selectedIndex].classList.remove('selected');
        }
        let item: Element;
        if (ev.key === 'ArrowDown' && selectedIndex < items.length - 1) {
          item = items[selectedIndex + 1];
        } else if (ev.key === 'ArrowDown') {
          item = items[0];
        } else if (ev.key === 'ArrowUp' && selectedIndex > 0) {
          item = items[selectedIndex - 1];
        } else if (ev.key === 'ArrowUp') {
          item = items[items.length - 1];
        } else {
          return;
        }

        item.classList.add('selected');
        this._list.style.visibility = 'visibility';
        if (isElementOutOfView(item)) {
          item.scrollIntoView({ block: 'nearest' });
        }
        ev.preventDefault();
      }
    });

    this._list = document.createElement('div');
    this._list.classList.add('gui-searchable-select-list');
    this.hideDropdown();

    this.shadowRoot.append(this._input, this._list);
  }

  override connectedCallback() {
    this.classList.add('gui-input');

    if (this._options.length === 0) {
      this._emptyList();
    }

    for (let i = 0; i < this._options.length; i++) {
      const opt = this._options[i];
      if (opt.selected) {
        this._input.value = opt.text;
      }
    }
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  get disabled() {
    return this._input.disabled;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  /**
   * The currently selected value.
   */
  get value(): T | undefined {
    const items = this._list.getElementsByClassName('selected');
    if (items.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (items[0] as any).__value;
    }
    return;
  }

  /**
   * Changes the currently selected item using the `option.value` property for comparison with the given one.
   *
   * *The equality check on the value is made using `===`.*
   *
   * *If `undefined`, it empties the input.*
   */
  set value(value: T | undefined) {
    if (value === undefined) {
      this._input.value = '';
    }

    for (let i = 0; i < this._list.children.length; i++) {
      const item = this._list.children.item(i) as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((item as any).__value === value) {
        item.classList.add('selected');
        this._input.value = item.textContent as string;
      } else {
        item.classList.remove('selected');
      }
    }
  }

  get options() {
    return this._options;
  }

  set options(options: SearchableOption[]) {
    this._options = options;
    this.render();
  }

  override set config(config: GuiSearchableInputConfig) {
    this._config = config;
    const tmpValue = this.value;
    this.render();
    this.value = tmpValue;
  }

  showDropdown(): void {
    this._list.style.visibility = 'visible';
    this.classList.add('open');
  }

  hideDropdown(): void {
    this._list.style.visibility = 'hidden';
    this.classList.remove('open');
  }

  private _emptyList(): void {
    const empty = document.createElement('small');
    empty.className = 'color-muted';
    empty.textContent = 'Empty';
    this._list.replaceChildren(empty);
  }

  override render(): void {
    const options = this.options;
    if (options.length === 0) {
      this._emptyList();
      return;
    }

    if (this._config.nullable && options[0].value !== null) {
      options.unshift({ text: 'null', value: null });
    } else if (!this._config.nullable && options[0].value === null) {
      options.shift();
    }
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const itemEl = document.createElement('div');
      const value = 'value' in opt ? opt.value : opt.text;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (itemEl as any).__value = value;
      itemEl.textContent = opt.text;
      if (opt.selected) {
        itemEl.classList.add('selected');
      }
      itemEl.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        this._input.value = opt.text;
        const selected = this._list.querySelector('div.selected');
        if (selected) {
          selected.classList.remove('selected');
          this._options[getIndexInParent(selected)].selected = false;
        }
        itemEl.classList.add('selected');
        opt.selected = true;
        this.hideDropdown();
        this._input.focus();
        this.dispatchEvent(new GuiChangeEvent(value));
        this.dispatchEvent(new GuiInputEvent(value));
      });

      fragment.appendChild(itemEl);
    }
    this._list.replaceChildren(fragment);
  }
}

function isElementOutOfView(element: Element): boolean {
  const parentContainer = element.parentElement;

  if (!parentContainer) {
    // If the element has no parent, it can't be out of view.
    return false;
  }

  const elementRect = element.getBoundingClientRect();
  const containerRect = parentContainer.getBoundingClientRect();

  // Check if the element is entirely above or below the container's view.
  return elementRect.bottom < containerRect.top || elementRect.top > containerRect.bottom;
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-searchable-select': GuiSearchableSelect;
  }

  interface GuiSearchableSelectEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }

  interface HTMLElementEventMap extends GuiSearchableSelectEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-searchable-select': GreyCat.Element<GuiSearchableSelect, GuiSearchableSelectEventMap>;
      }
    }
  }
}

if (!customElements.get('gui-searchable-select')) {
  customElements.define('gui-searchable-select', GuiSearchableSelect);
}
