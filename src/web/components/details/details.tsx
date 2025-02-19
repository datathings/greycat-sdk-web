import { css, sl, SlDetailsEventMap } from '../../exports.js';
import styles from './details.css?inline';
import componentStyles from '../styles.component.css?inline';

export class GuiDetails extends sl.SlDetails {
  static override styles = [
    sl.SlDetails.styles as CSSStyleSheet,
    css(componentStyles),
    css(styles),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-details': GuiDetails;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** Please, do not use this in a React context */
        'gui-details': GreyCat.Element<GuiDetails, SlDetailsEventMap>;
      }
    }
  }
}
