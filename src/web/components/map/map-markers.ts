import { GuiFactory } from '../factory/factory.js';
import { GuiObjectProps } from '../object/object.js';
import { GuiMapElement } from './model.js';

export interface GeoData<T> {
  geo: gc.core.geo;
  data: T;
}

export class GuiMapMarkers<T = unknown> extends GuiMapElement {
  private _map: maplibregl.Map | undefined;
  private _values: GeoData<T>[] = [];
  private _factory = GuiFactory.global;
  private _markers: Map<bigint, maplibregl.Marker> = new Map();
  private _props: Omit<GuiObjectProps, 'value'> | undefined;

  get value(): GeoData<T>[] {
    return this._values;
  }

  set value(values: GeoData<T>[]) {
    this._values = values;
    this.update();
  }

  get props() {
    return this._props;
  }

  /**
   * Properties passed down to the `gui-object` used by `maplibregl.Popup` for the markers.
   */
  set props(props: Omit<GuiObjectProps, 'value'> | undefined) {
    this._props = props;
    this.update();
  }

  override onLoad(map: maplibregl.Map): void {
    this._map = map;
  }

  connectedCallback(): void {
    this._factory = GuiFactory.closest(this);
    this.update();
  }

  update(): void {
    if (!this.isConnected || !this._map) {
      return;
    }

    const visibleMarkers = new Set<bigint>();
    const props = structuredClone(this._props ?? { header: true });

    for (let i = 0; i < this._values.length; i++) {
      const { geo, data } = this._values[i];
      let marker = this._markers.get(geo.value);
      if (marker === undefined) {
        marker = new maplibregl.Marker();
        props.value = data;
        const object = this._factory.create(this._factory.objectTag, props);
        const popup = new maplibregl.Popup().setDOMContent(object);
        marker.setPopup(popup).setLngLat(geo).addTo(this._map);
        this._markers.set(geo.value, marker);
      }
      visibleMarkers.add(geo.value);
    }

    // remove no longer visible markers
    this._markers.forEach((marker, key) => {
      if (visibleMarkers.has(key)) {
        return;
      }
      marker.remove();
      this._markers.delete(key);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-map-markers': GuiMapMarkers;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-map-markers': GreyCat.Element<GuiMapMarkers>;
      }
    }
  }
}
