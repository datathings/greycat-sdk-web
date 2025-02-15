import maplibregl from 'maplibre-gl';
// import { css } from '../../exports.js';
// import style from './map.css?inline';

export type GuiMapValue = gc.core.nodeGeo;
export type GuiMapOptions = Omit<maplibregl.MapOptions, 'container'>;

export class GuiMap extends HTMLElement {
  private _options: maplibregl.MapOptions | undefined;
  private _map: maplibregl.Map | undefined;
  private _value: GuiMapValue | undefined;
  private _layers: Map<string, Map<bigint, maplibregl.Marker>>;

  constructor() {
    super();

    this._layers = new Map();
  }

  connectedCallback(): void {
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(value: GuiMapValue | undefined) {
    this._value = value;
    this.updateValue();
  }

  get options() {
    return this._options ?? {};
  }

  set options(options: GuiMapOptions) {
    this._options = Object.assign({ container: this }, options);
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    if (!this._options) {
      if (this._map) {
        this._map.remove();
        this._map = undefined;
      }
      this.replaceChildren();
      return;
    }

    this._map = new maplibregl.Map(this._options);
    this._map.on('zoomend', this.updateValue);
    this._map.on('dragend', this.updateValue);
    this.updateValue();
  }

  updateValue = async (): Promise<void> => {
    if (!this.isConnected || !this._map) {
      return;
    }

    let values_layer = this._layers.get('values');
    if (!values_layer) {
      values_layer = new Map();
      this._layers.set('values', values_layer);
    }

    const bounds = this._map.getBounds();
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
        if (values_layer.get(location.value) === undefined) {
          const marker = new maplibregl.Marker().setLngLat(location);
          const popup = new maplibregl.Popup();
          const object = document.createElement('gui-object');
          object.value = data;
          popup.setDOMContent(object);
          marker.setPopup(popup);
          marker.addTo(this._map);
          values_layer.set(location.value, marker);
        }
      }
    }
    // TODO handle more types from std lib
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-map': GuiMap;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-map': GreyCat.Element<GuiMap>;
      }
    }
  }
}
