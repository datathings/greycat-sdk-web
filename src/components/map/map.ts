import { core } from '@greycat/lib-std';
import * as ml from 'maplibre-gl';
import { GuiValueProps } from '../value';

// re-export 'ml' for @greycat/gui users
export { default as ml } from 'maplibre-gl';

export type GuiMapMarker = ml.MarkerOptions & {
  location: core.geo;
  popup?: ml.PopupOptions;
  value?: Partial<GuiValueProps> & { value: unknown };
};

export class GuiMap extends HTMLElement {
  map!: ml.Map;
  private _markers: ml.Marker[] = [];

  connectedCallback() {
    // root styles to fit all available space
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';

    // initialize the map
    this.map = new ml.Map({
      container: this,
      style: 'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [0, 0],
      zoom: 1,
    });
  }

  disconnectedCallback() {
    this.map.remove();
  }

  set markers(markers: GuiMapMarker[] | undefined) {
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].remove();
    }
    if (markers) {
      this._markers.length = markers.length;
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (marker.color === undefined) {
          marker.color = `rgb(var(--accent-0))`;
        }
        this._markers[i] = new ml.Marker(marker).setLngLat(marker.location);
        if (marker.popup && marker.value) {
          const valueEl = document.createElement('gui-value');
          valueEl.setAttrs(marker.value);
          this._markers[i].setPopup(new ml.Popup(marker.popup).setDOMContent(valueEl));
        }
        this._markers[i].addTo(this.map);
      }
    } else {
      this._markers.length = 0;
    }
  }

  set center(center: ml.LngLatLike) {
    this.map.setCenter(center);
  }

  set zoom(zoom: number) {
    this.map.setZoom(zoom);
  }

  setAttrs({ center = [0, 0], zoom = 1 }: { center?: ml.LngLatLike; zoom?: number }) {
    this.map.setZoom(zoom);
    this.map.setCenter(center);
  }
}

if (!customElements.get('gui-map')) {
  customElements.define('gui-map', GuiMap);
}

declare global {
  interface Window {
    GuiMap: typeof GuiMap;
  }
  interface HTMLElementTagNameMap {
    'gui-map': GuiMap;
  }

  // interface HTMLElementEventMap {

  // }
}
