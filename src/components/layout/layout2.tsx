import { css, GuiElement, registerCustomElement } from '../../exports.js';
import style from './layout2.css?inline';

export class GuiLayout2 extends GuiElement {
  static override styles = [css(style)];

  constructor() {
    super();

    this.shadowRoot.appendChild(
      <div part="base" className="layout__base">
        <slot part="menu" name="menu" className="layout__menu" />
        <slot part="body" className="layout__body" />
      </div>,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-layout2': GuiLayout2;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-layout2': GreyCat.Element<GuiLayout2>;
      }
    }
  }
}

registerCustomElement('gui-layout2', GuiLayout2);
