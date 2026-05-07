import { GuiMapElement } from './model.js';

export class GuiMapSource extends GuiMapElement {
  name = `${Date.now()}`;
  value: maplibregl.SourceSpecification | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiMapSource} */
    'gui-map-source': GuiMapSource;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiMapSource} */
        'gui-map-source': GreyCat.Element<GuiMapSource>;
      }
    }
  }
}
