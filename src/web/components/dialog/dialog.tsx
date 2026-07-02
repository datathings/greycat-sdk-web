import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { SlDialogEventMap } from '../../shoelace.js';
import { css } from '../common.js';
import styles from './dialog.css?inline';

export class GuiDialog extends SlDialog {
  static override styles = [SlDialog.styles as CSSStyleSheet, css(styles)];
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
