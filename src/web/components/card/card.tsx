import SlCard from '@shoelace-style/shoelace/dist/components/card/card.js';
import { css } from '../common.js';
import styles from './card.css?inline';
import componentStyles from '../component.styles.css?inline';

export class GuiCard extends SlCard {
  static override styles = [SlCard.styles as CSSStyleSheet, css(componentStyles), css(styles)];
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiCard} */
    'gui-card': GuiCard;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, do not use this in a React context
         * @see {@link GuiCard}
         */
        'gui-card': GreyCat.Element<GuiCard>;
      }
    }
  }
}
