export class GuiUserForm extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello, world';
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-component': GuiUserForm;
  }

  namespace JSX {
    interface IntrinsicElements {
      'my-component': GreyCat.Element<GuiUserForm>;
    }
  }
}

if (!customElements.get('my-component')) {
  customElements.define('my-component', GuiUserForm);
}