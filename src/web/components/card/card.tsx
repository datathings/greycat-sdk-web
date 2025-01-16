import { css, sl } from '../../exports.js';
import styles from './card.css?inline';

export class GuiCard extends sl.SlCard {
  static override styles = [sl.SlCard.styles as CSSStyleSheet, css(styles)];
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-card': GuiCard;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** Please, do not use this in a React context */
        'gui-card': GreyCat.Element<GuiCard>;
      }
    }
  }
}
