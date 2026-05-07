import { GuiMapElement } from './model.js';

export class GuiMapLayer extends GuiMapElement {
  private _value: maplibregl.LayerSpecification | undefined;
  private _beforeId: string | undefined;

  get value() {
    return this._value;
  }

  set value(value: maplibregl.LayerSpecification | undefined) {
    this._value = value;
  }

  get beforeId() {
    return this._beforeId;
  }

  set beforeId(id: string | undefined) {
    this._beforeId = id;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiMapLayer} */
    'gui-map-layer': GuiMapLayer;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiMapLayer} */
        'gui-map-layer': GreyCat.Element<GuiMapLayer>;
      }
    }
  }
}
