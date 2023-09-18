import BaseInput from '../base-input.js';

export class GuiInputText {
  private input: string = '';

  constructor(initValue: string) {
    super(initValue);
    this.inputElement.value = initValue;
  }

  protected createInputElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';

    input.addEventListener('input', (event) => {
      const e = event.target as HTMLInputElement;
      this.input = e.value;
      this.updateValue();
      this.notifyChangeListeners();
    });
    return input;
  }

  protected updateValue() {
    this.value = this.input;
  }
}

if (!customElements.get('gui-input-text')) {
  customElements.define('gui-input-text', GuiInputText);
}

declare global {
  interface Window {
    GuiInputText: typeof GuiInputText;
  }
  interface HTMLElementTagNameMap {
    'gui-input-text': GuiInputText;
  }
}
