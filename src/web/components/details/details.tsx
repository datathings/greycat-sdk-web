import SlDetails from '@shoelace-style/shoelace/dist/components/details/details.js';
import { SlDetailsEventMap } from '../../shoelace.js';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import styles from './details.css?inline';

export class GuiDetails extends SlDetails {
  static override styles = [SlDetails.styles as CSSStyleSheet, GuiElement.BASE_STYLE, css(styles)];
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
