import { css, GuiElement, registerCustomElement } from '../../exports.js';
import style from './header.css?inline';

export class GuiLayoutHeader extends GuiElement {
  static override styles = [css(style)];

  constructor() {
    super();

    this.shadowRoot.appendChild(
      <header className="base" part="base">
        <div className="title" part="title">
          <slot />
        </div>
        <div className="menu" part="menu">
          <slot name="menu" />
        </div>
        <div className="actions" part="actions">
          <slot name="action" />
        </div>
      </header>,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-layout-header': GuiLayoutHeader;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-layout-header': GreyCat.Element<GuiLayoutHeader>;
      }
    }
  }
}

registerCustomElement('gui-layout-header', GuiLayoutHeader);
