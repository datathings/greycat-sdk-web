import { css } from '../common.js';
import { GuiElement } from '../element.js';
import style from './task.css?inline';

export class GuiTask extends GuiElement {
  static override styles = [css(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiTask} */
    'gui-task': GuiTask;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiTask} */
        'gui-task': GreyCat.Element<GuiTask>;
      }
    }
  }
}

if (!customElements.get('gui-task')) {
  customElements.define('gui-task', GuiTask);
}
