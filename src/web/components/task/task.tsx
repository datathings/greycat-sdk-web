import { css, GuiElement } from '../../exports.js';
import style from './task.css?inline';

export class GuiTask extends GuiElement {
  static override styles = [css(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task': GuiTask;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-task': GreyCat.Element<GuiTask>;
      }
    }
  }
}

if (!customElements.get('gui-task')) {
  customElements.define('gui-task', GuiTask);
}
