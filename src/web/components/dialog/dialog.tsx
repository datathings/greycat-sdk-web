import { css, sl, SlDialogEventMap } from '../../exports.js';
import styles from './dialog.css?inline';

export class GuiDialog extends sl.SlDialog {
  static override styles = [sl.SlDialog.styles as CSSStyleSheet, css(styles)];
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiDialog} */
    'gui-dialog': GuiDialog;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, do not use this in a React context
         * @see {@link GuiDialog}
         */
        'gui-dialog': GreyCat.Element<GuiDialog, SlDialogEventMap>;
      }
    }
  }
}
