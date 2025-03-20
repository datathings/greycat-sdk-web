import { GuiMap } from './map.js';

export class GuiMapNodeGeo extends HTMLElement {
  private _value: gc.core.nodeGeo | undefined;

  connectedCallback(): void {
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(value: gc.core.nodeGeo | undefined) {
    this._value = value;
    this.update();
  }

  async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    const mapEl = this.parentElement;
    if (!(mapEl instanceof GuiMap)) {
      console.warn(`'gui-map-nodegeo' must be a direct child of 'gui-map'`);
      return;
    }

    const map = mapEl.map;
    if (!map) {
      return;
    }

    const bounds = map.getBounds();
    const sw = gc.core.geo.fromLatLng(bounds.getSouthWest());
    const ne = gc.core.geo.fromLatLng(bounds.getNorthEast());

    if (this._value instanceof gc.core.nodeGeo) {
      const table = (await gc.core.nodeGeo.sample(
        [this._value],
        sw,
        ne,
        1000,
        gc.core.SamplingMode.dense,
      )) as gc.core.Table<[gc.core.geo, unknown]>;
      for (const [location, data] of table) {
        const marker = new maplibregl.Marker().setLngLat(location);
        const popup = new maplibregl.Popup();
        const object = document.createElement('gui-object');
        object.value = data;
        popup.setDOMContent(object);
        marker.setPopup(popup);
        marker.addTo(map);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-map-nodegeo': GuiMapNodeGeo;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-map-nodegeo': GreyCat.Element<GuiMapNodeGeo>;
      }
    }
  }
}
