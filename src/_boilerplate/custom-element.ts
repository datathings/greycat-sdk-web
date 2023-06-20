export class GuiCustomElement extends HTMLElement {
  static readonly DEFAULT_VALUE = 0;
  private _value = GuiCustomElement.DEFAULT_VALUE;

  /**
   * The value to display. The given value will be within `[0, 100]` after sanitizing.
   */
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = Math.min(100, Math.max(0, isNaN(value) ? GuiCustomElement.DEFAULT_VALUE : value));
    this.render();
  }

  connectedCallback() {
    // reset inner html on first render
    this.innerHTML = '';
  }

  disconnectedCallback() {
    // optional cleanup code
  }

  render() {
    this.textContent = String(this._value);
  }
}

declare global {
  interface Window {
    GuiCustomElement: typeof GuiCustomElement;
  }

  interface HTMLElementTagNameMap {
    'gui-custom-element': GuiCustomElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-custom-element': any;
    }
  }
}

if (!window.customElements.get('gui-custom-element')) {
  window.GuiCustomElement = GuiCustomElement;
  window.customElements.define('gui-custom-element', GuiCustomElement);
}
