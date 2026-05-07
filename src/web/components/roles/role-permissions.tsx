import { css, GuiElement } from '../../exports.js';
import style from './role-permissions.css?inline';

export class GuiRolePermissions extends GuiElement {
  static override styles = [css(style)];

  set value(permissions: gc.runtime.Permission[]) {
    if (permissions.length > 0) {
      permissions.sort();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < permissions.length; i++) {
        const perm = permissions[i];
        fragment.appendChild(
          <sl-tooltip content={perm.description}>
            <sl-tag size="small">{perm.name}</sl-tag>
          </sl-tooltip>,
        );
      }
      this.shadowRoot.replaceChildren(fragment);
    } else {
      this.shadowRoot.replaceChildren();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiRolePermissions} */
    'gui-role-permissions': GuiRolePermissions;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiRolePermissions} */
        'gui-role-permissions': GreyCat.Element<GuiRolePermissions>;
      }
    }
  }
}
