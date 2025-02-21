import { css, getIndexInParent, GuiChangeEvent, GuiInputEvent, type sl } from '../../exports.js';
import { GuiInputElement } from '../inputs/index.js';

import style from './select.css?inline';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GuiOption<T = any> = {
  value: T;
  /** If defined this is the text of the option, otherwise `value.toString()` will be used */
  text?: string;
  selected?: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IOption<T = any> = GuiOption<T> | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiSelect<T = any> extends GuiInputElement<T | undefined> {
  static override styles = [...GuiInputElement.styles, css(style)];

  readonly input: sl.SlInput;
  private _list: HTMLElement;
  private _options: GuiOption<T>[];
  private _nullable = false;

  constructor() {
    super();

    this._options = [];

    // Create an input element for searching
    this.input = document.createElement('sl-input');
    this.input.type = 'search';
    this.input.placeholder = 'Search...';
    this.input.autocomplete = 'off';
    this.input.clearable = false;
    this.input.disabled = true;
    const icon = document.createElement('sl-icon');
    icon.setAttribute('slot', 'prefix');
    this.input.appendChild(icon);
    // Handle input events for filtering options
    this.input.addEventListener('sl-input', () => {
      const query = this.input.value.toLowerCase();

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

    this.input.addEventListener('sl-clear', () => {
      this.input.value = '';
      this._setValue(undefined);
      this._list.querySelectorAll('div').forEach((item) => {
        item.classList.remove('hidden', 'selected');
      });
      this.dispatchEvent(new GuiChangeEvent(undefined));
      this.dispatchEvent(new GuiInputEvent(undefined));
    });

    this.input.addEventListener('blur', () => {
      setTimeout(() => {
        this.hideDropdown();
      }, 0);
    });

    this.input.addEventListener('focus', () => {
      this.showDropdown();
    });

    this.input.addEventListener('click', () => {
      this.showDropdown();
    });

    this.input.addEventListener('keydown', (ev) => {
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
          this.input.value = item.textContent!;
          const index = getIndexInParent(item);
          const value = this._options[index].value;
          this._setValue(value);
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
    this._list.classList.add('gui-select-list');
    this.hideDropdown();

    this.shadowRoot.append(this.input, this._list);
  }

  override connectedCallback() {
    this.classList.add('gui-input');

    if (this._options.length === 0) {
      this._emptyList();
    }

    for (let i = 0; i < this._options.length; i++) {
      const opt = this._options[i];
      if (opt.selected) {
        this.input.value = opt.text ?? `${opt.value}`;
      }
    }

    this.update();
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  /**
   * The currently selected value.
   */
  get value(): T | undefined {
    return this._getValue();
  }

  /**
   * Changes the currently selected item using the `option.value` property for comparison with the given one.
   *
   * *The equality check on the value is made using `===`.*
   *
   * *If `undefined`, it empties the input.*
   */
  set value(value: T | undefined) {
    this._setValue(value === undefined ? undefined : value);
    this.update();
  }

  get nullable() {
    return this._nullable;
  }

  set nullable(nullable: boolean) {
    this._nullable = nullable;
    this.update();
  }

  /**
   * Always returns a `GuiOption<T>[]`. This can be safely cast into `GuiOption<T>[]`.
   * 
   * Though the setter accepts the broader `IOption<T>[]` type.
   */
  get options(): IOption<T>[] {
    return this._options;
  }

  set options(options: IOption<T>[]) {
    for (let i = 0; i < options.length; i++) {
      if (typeof options[i] === 'string') {
        options[i] = { value: options[i] as T };
      }
    }
    this._options = options as GuiOption<T>[];
    this.update();
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
    this.input.value = '';
    this._setValue(undefined);
    this.input.disabled = true;
    this.input.clearable = false;
    this._list.replaceChildren(empty);
  }

  private _setValue(value: T | undefined): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.input as any).__value = value;
  }

  private _getValue(): T | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.input as any).__value;
  }

  override update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._options.length === 0) {
      const value = this._getValue();
      if (value !== undefined && !this._nullable) {
        this._options = [{ value, selected: true }];
      } else {
        this._emptyList();
        this.dispatchEvent(new GuiChangeEvent(undefined));
        return;
      }
    }

    this.input.disabled = false;
    this.input.clearable = this._nullable;

    const fragment = document.createDocumentFragment();
    let found = false;
    const currentValue = this._getValue();
    for (let i = 0; i < this._options.length; i++) {
      const opt = this._options[i];
      const itemEl = document.createElement('div');
      const value = opt.value;
      itemEl.textContent = opt.text ?? `${opt.value}`;
      if (opt.selected || opt.value === currentValue) {
        this.input.value = itemEl.textContent;
        this._setValue(value);
        itemEl.classList.add('selected');
        found = true;
      }
      itemEl.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        this.input.value = opt.text ?? `${opt.value}`;
        this._setValue(opt.value);
        const selected = this._list.querySelector('div.selected');
        if (selected) {
          selected.classList.remove('selected');
          this._options[getIndexInParent(selected)].selected = false;
        }
        itemEl.classList.add('selected');
        opt.selected = true;
        this.hideDropdown();
        this.input.focus();
        this.dispatchEvent(new GuiChangeEvent(value));
        this.dispatchEvent(new GuiInputEvent(value));
      });

      fragment.appendChild(itemEl);
    }

    if (!found) {
      if (this._nullable) {
        if (currentValue !== undefined) {
          // reset the current selection if the options no longer contains it
          this.input.value = '';
          this._setValue(undefined);
          this.dispatchEvent(new GuiChangeEvent(undefined));
        }
      } else if (this._options.length > 0) {
        // select the first option if it cannot be null
        this.input.value = this._options[0].text ?? `${this._options[0].value}`;
        this._setValue(this._options[0].value);
        fragment.children[0].classList.add('selected');
        this.dispatchEvent(new GuiChangeEvent(this.value));
      }
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
    'gui-select': GuiSelect;
  }

  interface GuiSelectEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }

  interface HTMLElementEventMap extends GuiSelectEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-select': GreyCat.Element<GuiSelect, GuiSelectEventMap>;
      }
    }
  }
}
