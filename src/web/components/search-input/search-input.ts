import { sl, SlInputEventMap } from '../../exports.js';

/**
 * Thin wrapper around `sl.SlInput` that adds a search icon.
 *
 * *This component emits the same events as `sl.SlInput`.*
 */
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
    /** @see {@link GuiSearchInput} */
    'gui-search-input': GuiSearchInput;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiSearchInput} */
        'gui-search-input': GreyCat.Element<GuiSearchInput, SlInputEventMap>;
      }
    }
  }
}
