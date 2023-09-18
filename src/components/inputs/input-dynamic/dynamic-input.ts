import { GreyCat, core } from '@greycat/sdk';
import { DurationInput, TextInput, IntInput, FloatInput } from '../../../input-elements.js';

type ConvertedValue = number | string | core.duration | core.time | null;

export class GuiDynamicInput extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _type = '';
  private _name = '';
  private _value: ConvertedValue = null;

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

  set value(newValue: ConvertedValue) {
    this._value = newValue;
  }

  get value() {
    return this._value;
  }

  private render() {
    const paramElement = document.createElement('div');
    paramElement.appendChild(document.createTextNode(`${this._name}`));
    let i: DurationInput | TextInput | IntInput | FloatInput;
    switch (this._type) {
      case 'core::geo':
      case 'core::null':
      case 'core::enum':
      case 'core::object':
      case 'core::tu2d':
      case 'core::tu3d':
      case 'core::tu4d':
      case 'core::tu5d':
      case 'core::tu6d':
      case 'core::tu10d':
      case 'core::tuf2d':
      case 'core::tuf3d':
      case 'core::tuf4d':
      case 'core::undefined':
      case 'core::bool':
      case 'core::cubic':
      case 'core::function':
      case 'core::block_ref':
      case 'core::time':
      case 'core::String': // Starting from this type, everything is implemented
      case 'core::char':
      case 'core::node':
      case 'core::nodeList':
      case 'core::nodeIndex':
      case 'core::nodeTime':
      case 'core::nodeGeo':
      case 'core::Array':
      case 'core::stringlit':
        i = new TextInput('');
        break;
      case 'core::int':
        i = new IntInput(0);
        break;
      case 'core::float':
        i = new FloatInput(0);
        break;
      case 'core::duration':
        i = new DurationInput(0, 'minutes');
        i.greycat = this._greycat;
        break;
      default:
        this.value = null;
        return;
    }
    this.value = i.value;
    i.addEventListener('input', (value) => {
      this.value = value;
      // Notify GuiDynamicInput users
      const inputEvent = new CustomEvent('input', {
        detail: { value },
      });
      this.dispatchEvent(inputEvent);
    });
    paramElement.appendChild(i.inputElement);
    this.replaceChildren(paramElement);
  }
}

if (!customElements.get('gui-dynamic-input')) {
  customElements.define('gui-dynamic-input', GuiDynamicInput);
}

declare global {
  interface Window {
    GuiDynamicInput: typeof GuiDynamicInput;
  }
  interface HTMLElementTagNameMap {
    'gui-dynamic-input': GuiDynamicInput;
  }
}
