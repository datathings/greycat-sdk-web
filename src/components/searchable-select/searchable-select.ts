import { getIndexInParent } from '../../utils.js';

export interface SearchableOption {
  text: string;
  /** If the `value` is not defined, `text` will be used */
  value?: unknown;
  selected?: boolean;
}

export class GuiSearchableSelect extends HTMLElement {
  private _input: HTMLInputElement;
  private _list: HTMLElement;
  private _options: SearchableOption[];

  constructor() {
    super();

    this._options = [];

    // Create an input element for searching
    this._input = document.createElement('input');
    this._input.classList.add('gui-searchable-select-input');
    this._input.type = 'search';
    this._input.placeholder = 'Search...';

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

      this.showDropdown()
    });

    this._input.addEventListener('blur', () => {
      setTimeout(() => {
        this.hideDropdown()
      }, 0);
    });

    this._input.addEventListener('focus', () => {
      this.showDropdown()
    });

    this._input.addEventListener('click', () => {
      this.showDropdown();
    });

    this._input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        this.hideDropdown()
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
          item.classList.add('selected');
          this.hideDropdown()
          this._input.value = item.textContent!;
          const index = getIndexInParent(item);
          const value = this._options[index].value === undefined ? this._options[index].text : this._options[index].value;
          this.dispatchEvent(new GuiSearchableSelectChangeEvent(value));
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
    this.hideDropdown()
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

  get value() {
    const item = this._list.querySelector('.selected');
    if (item) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (item as any).__value;
    }
    return;
  }

  /**
   * Changes the currently selected item using the `value` for comparison.
   *
   * *The equality check on the value is made using `===`.*
   *
   * *If `undefined`, it empties the input.*
   */
  set value(value: unknown) {
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
    const fragment = document.createDocumentFragment();

    if (options.length === 0) {
      this._emptyList();
      return;
    }

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const itemEl = document.createElement('div');
      const value = opt.value === undefined ? opt.text : opt.value;
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
        this.hideDropdown()
        this._input.focus();
        this.dispatchEvent(new GuiSearchableSelectChangeEvent(value));
      });

      fragment.appendChild(itemEl);
    }
    this._list.replaceChildren(fragment);
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
}

const SEARCHABLE_CHANGE = 'searchable-select-change';
const ONSEARCHABLE_CHANGE = `on${SEARCHABLE_CHANGE}`;

export class GuiSearchableSelectChangeEvent extends CustomEvent<unknown> {
  constructor(value: unknown) {
    super(SEARCHABLE_CHANGE, { detail: value, bubbles: true });
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
  return (
    elementRect.bottom < containerRect.top ||
    elementRect.top > containerRect.bottom
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-searchable-select': GuiSearchableSelect;
  }

  interface HTMLElementEventMap {
    [SEARCHABLE_CHANGE]: GuiSearchableSelectChangeEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-searchable-select': GreyCat.Element<
        GuiSearchableSelect & {
          [ONSEARCHABLE_CHANGE]: (
            this: GlobalEventHandlers,
            ev: GuiSearchableSelectChangeEvent,
            options?: boolean | AddEventListenerOptions,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) => any;
        }
      >;
    }
  }
}

if (!customElements.get('gui-searchable-select')) {
  customElements.define('gui-searchable-select', GuiSearchableSelect);
}
