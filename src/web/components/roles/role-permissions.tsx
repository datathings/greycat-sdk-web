import { css, GuiElement } from '../../exports.js';
import style from './role-permissions.css?inline';

export class GuiRolePermissions extends GuiElement {
  static override styles = [css(style)];

  set value(value: string[]) {
    if (value.length > 0) {
      value.sort();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < value.length; i++) {
        fragment.appendChild(<sl-tag size="small">{value[i]}</sl-tag>);
      }
      this.shadowRoot.replaceChildren(fragment);
    } else {
      this.shadowRoot.replaceChildren();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-role-permissions': GuiRolePermissions;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-role-permissions': GreyCat.Element<GuiRolePermissions>;
      }
    }
  }
}
