import { type SlIcon, SlInput } from '@shoelace-style/shoelace';

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

  interface GuiSearchInputEventMap {}

  interface HTMLElementEventMap extends GuiSearchInputEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-search-input': GreyCat.Element<GuiSearchInput, GuiSearchInputEventMap>;
      }
    }
  }
}

if (!customElements.get('gui-search-input')) {
  customElements.define('gui-search-input', GuiSearchInput);
}
