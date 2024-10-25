import { type SlIcon, SlInput } from '@shoelace-style/shoelace';
import { SlInputEventMap } from '../../shoelace';

export class GuiSearchInput extends SlInput {
  private _icon: SlIcon;

  constructor() {
    super();

    this._icon = document.createElement('sl-icon');
    this._icon.setAttribute('slot', 'prefix');
  }

  override connectedCallback() {
    super.connectedCallback();
    this.replaceChildren(this._icon);
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

if (!customElements.get('gui-search-input')) {
  customElements.define('gui-search-input', GuiSearchInput);
}
