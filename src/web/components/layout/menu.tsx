import { GuiElement, registerCustomElement, css } from '../../exports.js';
import style from './menu.css?inline';

export class GuiLayoutMenu extends GuiElement {
  static override styles = [css(style)];

  constructor() {
    super();

    this.shadowRoot.appendChild(
      <aside className="base" part="base">
        <slot />
      </aside>,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-layout-menu': GuiLayoutMenu;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-layout-menu': GreyCat.Element<GuiLayoutMenu>;
      }
    }
  }
}

registerCustomElement('gui-layout-menu', GuiLayoutMenu);
