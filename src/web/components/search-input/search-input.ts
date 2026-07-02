import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
import { SlInputEventMap } from '../../shoelace.js';

/**
 * Thin wrapper around `SlInput` that adds a search icon.
 *
 * *This component emits the same events as `SlInput`.*
 */
export class GuiSearchInput extends SlInput {
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
