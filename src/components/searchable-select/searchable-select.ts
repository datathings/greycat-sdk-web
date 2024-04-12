import type { SlInput } from '@shoelace-style/shoelace';
import { getIndexInParent } from '../../utils.js';
import { GuiChangeEvent, GuiInputEvent } from '../events.js';

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

export class GuiSearchableSelect extends HTMLElement {
  private _input: SlInput;
  private _list: HTMLElement;
  private _options: SearchableOption[];

  protected _config: GuiSearchableInputConfig = {};

  constructor() {
    super();

    this._options = [];

    // Create an input element for searching
    this._input = document.createElement('sl-input');
    // this._input.classList.add('gui-searchable-select-input');
    this._input.type = 'search';
    this._input.placeholder = 'Search...';
    const icon = document.createElement('sl-icon');
    icon.setAttribute('slot', 'prefix');
    this._input.appendChild(icon);
    // Handle input events for filtering options
    this._input.addEventListener('input', () => {
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
  }

  connectedCallback() {
    this.appendChild(this._input);
    this.appendChild(this._list);

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

  disconnectedCallback() {
    this.replaceChildren();
  }

  set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  /**
   * @deprecated use `value` instead
   */
  get selected() {
    return this.value;
  }

  /**
   * @deprecated use `value` instead
   */
  set selected(selected: unknown) {
    this.value = selected;
  }

  /**
   * The currently selected value.
   */
  get value() {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set value(value: any) {
    if (value === undefined) {
      this._input.value = '';
      return;
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

  set options(options: SearchableOption[]) {
    this._options = options;
    this._renderList(options);
  }

  set config(config: GuiSearchableInputConfig) {
    this._config = config;
    this._renderList(this._options);
  }

  showDropdown(): void {
    this._list.style.visibility = 'visible';
  }

  hideDropdown(): void {
    this._list.style.visibility = 'hidden';
  }

  private _emptyList(): void {
    const empty = document.createElement('small');
    empty.className = 'color-muted';
    empty.textContent = 'Empty';
    this._list.replaceChildren(empty);
  }

  private _renderList(options: SearchableOption[]): void {
    if (options.length === 0) {
      this._emptyList();
      return;
    }

    if (this._config.nullable) {
      options.unshift({ text: 'null', value: null });
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

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-searchable-select': GreyCat.Element<GuiSearchableSelect, GuiSearchableSelectEventMap>;
    }
  }
}

if (!customElements.get('gui-searchable-select')) {
  customElements.define('gui-searchable-select', GuiSearchableSelect);
}
