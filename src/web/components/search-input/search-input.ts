import { sl, SlInputEventMap } from '../../exports.js';

export class GuiSearchInput extends sl.SlInput {
  override connectedCallback() {
    super.connectedCallback();
    const icon = document.createElement('sl-icon');
    icon.slot = 'prefix';
    this.replaceChildren(icon);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-search-input': GuiSearchInput;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-search-input': GreyCat.Element<GuiSearchInput, SlInputEventMap>;
      }
    }
  }
}
