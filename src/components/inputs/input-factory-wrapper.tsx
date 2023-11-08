import { StringInput, CharInput, InputHandler, InputType } from './input-factory.js';

class GuiInputBase<T extends InputType> extends HTMLElement {
  private _input: T;

  constructor(inputClass: { new (name: string, oninput: InputHandler): T }) {
    super();
    this._input = new inputClass('default', (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })));
  }

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

export class GuiInputString extends GuiInputBase<StringInput> {
  constructor() {
    super(StringInput);
  }
}

export class GuiInputChar extends GuiInputBase<CharInput> {
  constructor() {
    super(CharInput);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-input-string': GuiInputString;
    'gui-input-char': GuiInputChar;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-input-string': GreyCat.Element<GuiInputString>;
      'gui-input-char': GreyCat.Element<GuiInputChar>;
    }
  }
}

customElements.define('gui-input-string', GuiInputString);
customElements.define('gui-input-char', GuiInputChar);
