export class GuiInputText extends HTMLElement {
  private _value: string = '';

  connectedCallback() {
    const _inputElement: HTMLInputElement = document.createElement('input');
    _inputElement.type = 'text';
    _inputElement.addEventListener('input', (event) => {
      event.stopPropagation();
      const e = event.target as HTMLInputElement;
      this._value = e.value;
      this.dispatchEvent(new CustomEvent('input', { detail: e.value }));
    });
    this.append(_inputElement);
  }

  get value() {
    return this._value;
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
