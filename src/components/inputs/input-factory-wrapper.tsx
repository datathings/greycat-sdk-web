import { StringInput } from './input-factory.js';

export class GuiInputString extends HTMLElement {
  private _input = new StringInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );


  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: string) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-input-string': GuiInputString;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-input-string': GreyCat.Element<GuiInputString>;
    }
  }
}

if (!customElements.get('gui-input-string')) {
  customElements.define('gui-input-string', GuiInputString);
}
