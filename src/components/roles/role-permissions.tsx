import type { GuiValueElement } from '../table/table.js';

export class GuiRolePermissions extends HTMLElement implements GuiValueElement {
  set value(value: string[]) {
    if (value.length > 0) {
      value.sort();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < value.length; i++) {
        fragment.appendChild(<sl-tag size="small">{value[i]}</sl-tag>);
      }
      this.replaceChildren(fragment);
    } else {
      this.replaceChildren();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-role-permissions': GuiRolePermissions;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-role-permissions': GreyCat.Element<GuiRolePermissions>;
    }
  }
}

if (!customElements.get('gui-role-permissions')) {
  customElements.define('gui-role-permissions', GuiRolePermissions);
}
