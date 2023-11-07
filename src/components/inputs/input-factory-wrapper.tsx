import { StringInput, InputHandler, IInput } from './input-factory.js';

export class GuiInputString extends HTMLElement {
  private _stringInput: StringInput;
  private _oninput: InputHandler | null;

  constructor() {
    super();
    this._oninput = null;
    this._stringInput = new StringInput('gui-input-string', (value: string) => {
      if (this._oninput) {
        this._oninput(value);
      }
    });
  }

  connectedCallback() {
    this.appendChild(this._stringInput.element);
  }

  static get observedAttributes() {
    return ['disabled', 'invalid', 'oninput'];
  }

  attributeChangedCallback(name: string, _oldValue: unknown, newValue: string | InputHandler | null) {
    try {
    if (name === 'disabled') {
      if (newValue !== 'true' && newValue !== 'false') {
        throw new Error(`Attribute 'disabled' can be only true or false`);
      }
      const isDisabled = newValue === 'true';
      this._stringInput.disabled = isDisabled;
    } else if (name === 'invalid') {
      if (newValue !== 'true' && newValue !== 'false') {
        throw new Error(`Attribute 'invalid' can be only true or false`);
      }
      const isInvalid = newValue === 'true';
      this._stringInput.invalid = isInvalid;
    } else if (name === 'oninput') {
      if (typeof newValue === 'function') {
        this._oninput = newValue;
      } else {
        throw new Error(`Attribute 'oninput' can be only object of type function`);
      }
    }
    } catch(err) {
      this._handleError(err);
    }
  }

  private _handleError(error: unknown) {
    // TODO: Replace with user notification for any specific error
    console.error('An error occured: ', error);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-input-string': GuiInputString;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-input-string': Partial<Omit<IInput, 'children'>>  & {
        oninput: InputHandler;
      };
    }
  }
}

if (!globalThis.customElements.get('gui-input-string')) {
  globalThis.customElements.define('gui-input-string', GuiInputString);
}
