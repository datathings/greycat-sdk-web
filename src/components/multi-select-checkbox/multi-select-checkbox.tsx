import type { SlCheckbox } from '@shoelace-style/shoelace';

/**
 * Custom component for options with checkboxes in 2 columns.
 */
export class GuiMultiSelectCheckbox extends HTMLElement {
  private _checkboxes: SlCheckbox[] = [];

  set selected(values: Array<string>) {
    for (let i = 0; i < this._checkboxes.length; i++) {
      // safety: the first element appended to `label` is the `input` element (see l.38)
      const cb = this._checkboxes[i] as SlCheckbox;
      cb.checked = values.includes(cb.value);
    }
  }

  set options(options: string[]) {
    // reset checkboxes
    this._checkboxes.length = 0;

    if (options.length === 0) {
      // no available options
      this.replaceChildren(
        <small>
          <i>No option</i>
        </small>,
      );
      return;
    }

    // sort options
    options.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    for (let i = 0; i < options.length; i++) {
      this._checkboxes.push((<sl-checkbox>{options[i]}</sl-checkbox>) as SlCheckbox);
    }

    this.replaceChildren(...this._checkboxes);
  }

  get selected() {
    const selected = [];
    for (let i = 0; i < this._checkboxes.length; i++) {
      // safety: the first element appended to `label` is the `input` element (see l.38)
      const cb = this._checkboxes[i] as SlCheckbox;
      if (cb.checked) {
        selected.push(cb.value);
      }
    }
    return selected;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-multi-select-checkbox': GuiMultiSelectCheckbox;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-multi-select-checkbox': GreyCat.Element<GuiMultiSelectCheckbox>;
    }
  }
}

if (!globalThis.customElements.get('gui-multi-select-checkbox')) {
  globalThis.customElements.define('gui-multi-select-checkbox', GuiMultiSelectCheckbox);
}
