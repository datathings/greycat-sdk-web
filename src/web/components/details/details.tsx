import { css, GuiElement, sl, SlDetailsEventMap } from '../../exports.js';
import styles from './details.css?inline';

export class GuiDetails extends sl.SlDetails {
  static override styles = [sl.SlDetails.styles as CSSStyleSheet, GuiElement.BASE_STYLE, css(styles)];
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiDetails} */
    'gui-details': GuiDetails;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, do not use this in a React context
         * @see {@link GuiDetails}
         */
        'gui-details': GreyCat.Element<GuiDetails, SlDetailsEventMap>;
      }
    }
  }
}
