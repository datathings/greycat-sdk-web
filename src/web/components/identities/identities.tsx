import { GuiElement, css } from '../../exports.js';
import style from './identities.css?inline';

export class GuiIdentities extends GuiElement {
  static override styles = [css(style)];

  constructor() {
    super();

    this.shadowRoot.appendChild(<div>Right now not much</div>);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-identities': GuiIdentities;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-identities': GreyCat.Element<GuiIdentities>;
      }
    }
  }
}