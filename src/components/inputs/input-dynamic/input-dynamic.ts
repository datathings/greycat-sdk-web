import { GreyCat, core } from '@greycat/sdk';
import { inputs } from '../base-input.js';
import { GuiInputDuration } from '../input-duration/input-duration.js';

export class GuiInputDynamic extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _type = '';
  private _name = '';
  private _value: string | core.duration = '';

  connectedCallback() {}

  set greycat(g: GreyCat) {
    this._greycat = g;
    this.render();
  }

  set type(t: string) {
    this._type = t;
    this.render();
  }

  set name(l: string) {
    this._name = l;
    this.render();
  }

  get value() {
    return this._value;
  }

  private render() {
    const paramElement = document.createElement('div');
    paramElement.appendChild(document.createTextNode(`${this._name}`));
    if (this._type !== 'core::String' && this._type !== 'core::duration') {
      return;
    }
    // Create web component for the type
    const input = inputs[this._type]();
    this._value = input.value;
    if (input instanceof GuiInputDuration) {
      input.greycat = this._greycat;
    }
    input.addEventListener('input', (event) => {
      const e = event as CustomEvent;
      this._value = e.detail;
      this.dispatchEvent(new CustomEvent('input', { detail: this._value }));
    });
    paramElement.appendChild(input);
    this.replaceChildren(paramElement);
  }
}

if (!customElements.get('gui-input-dynamic')) {
  customElements.define('gui-input-dynamic', GuiInputDynamic);
}

declare global {
  interface Window {
    GuiInputDynamic: typeof GuiInputDynamic;
  }
  interface HTMLElementTagNameMap {
    'gui-input-dynamic': GuiInputDynamic;
  }
}
