import { core } from '@greycat/lib-std';

type ChangeListener = (tz: core.TimeZone | undefined) => void;

/**
 * A selector that creates `core.TimeZone` enum values on change.
 */
export class GuiTimezoneSelect extends HTMLElement {
  private _select: HTMLSelectElement | undefined;
  private _onChange: ChangeListener | null = null;
  private _onSelectChange = () => {
    if (!this._select) {
      return;
    }
    this._onChange?.(this.value);
    this.dispatchEvent(new Event('change', { bubbles: true }));
  };

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    this._select = document.createElement('select');
    this._select.addEventListener('change', this._onSelectChange);

    // empty option
    const emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', '-1');
    emptyOption.textContent = `- Select a timezone -`;
    this._select.appendChild(emptyOption);

    // timezone options
    const options = core.TimeZone.$fields.map((tz, i) => {
      const option = document.createElement('option');
      option.value = `${i}`;
      if (tz === this.value) {
        option.setAttribute('selected', '');
      }
      option.textContent = tz.value;
      return option;
    });
    this._select.append(...options);

    this.appendChild(this._select);
  }

  disconnectedCallback() {
    if (!this._select) {
      return;
    }

    this._select.removeEventListener('change', this._onSelectChange);
  }

  render(): void {
    // noop
  }

  get value(): core.TimeZone | undefined {
    if (!this._select) {
      return;
    }
    const index = this._select.selectedIndex - 1; // -1 to consider the empty option
    return index === -1 ? undefined : core.TimeZone.$fields[index];
  }

  set value(value: core.TimeZone | undefined) {
    if (this._select) {
      this._select.selectedIndex =
        value === undefined ? -1 : core.TimeZone.$fields.findIndex((tz) => tz === value) + 1;
    }
  }

  set onChange(cb: ChangeListener) {
    this._onChange = cb;
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this._select) {
      return;
    }

    if (newValue === null) {
      this._select.selectedIndex = -1;
    } else {
      this.value = core.TimeZone[newValue as core.TimeZone.Field];
    }
  }
}

declare global {
  interface Window {
    GuiTimezoneSelect: typeof GuiTimezoneSelect;
  }

  interface HTMLElementTagNameMap {
    'gui-timezone-select': GuiTimezoneSelect;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-timezone-select': any;
    }
  }
}

if (!window.customElements.get('gui-timezone-select')) {
  window.GuiTimezoneSelect = GuiTimezoneSelect;
  window.customElements.define('gui-timezone-select', GuiTimezoneSelect);
}
