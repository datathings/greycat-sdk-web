import { GuiTableCellElement } from '../table/table.js';

export class GuiUserGroupPolicy extends HTMLElement implements GuiTableCellElement {
  connectedCallback() {
    this.style.display = 'contents';
  }

  set value(value: Array<{ id: number | bigint; name: string }> | null) {
    if (value && value.length > 0) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        fragment.appendChild(document.createTextNode(item.name));
        if (i < value.length - 1) {
          fragment.appendChild(document.createTextNode(', '));
        }
      }
      this.replaceChildren(fragment);
    } else {
      this.replaceChildren();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-user-group-policy': GuiUserGroupPolicy;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-user-group-policy': GreyCat.Element<GuiUserGroupPolicy>;
    }
  }
}

if (!customElements.get('gui-user-group-policy')) {
  customElements.define('gui-user-group-policy', GuiUserGroupPolicy);
}
