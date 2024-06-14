import { runtime } from '@greycat/sdk';

export class GuiUserForm extends HTMLElement {
  connectedCallback() {
    this.replaceChildren(
      <gui-input-object
        value={runtime.User.create(0, '', false, null, null, null, null, null, null, false)}
      />,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-user-form': GuiUserForm;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-input-user': GreyCat.Element<GuiUserForm>;
    }
  }
}

if (!customElements.get('my-component')) {
  customElements.define('my-component', GuiUserForm);
}
