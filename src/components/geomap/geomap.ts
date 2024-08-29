import { LayerSpecification, Map, type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './geomap.css';
import style from './styles.json';
import { TableLike, TableView } from '../common.js';
import { core } from '../../exports';

export class GeoMap extends HTMLElement {
  _container: HTMLDivElement;
  _table = new TableView();
  _map: Map;

  constructor() {
    super();
    this._container = document.createElement('div');
    this._map = new Map({
      container: this._container,
      style: style as StyleSpecification,
      center: [6.1, 49.6],
      zoom: 2,
    });
  }

  set value(table: TableLike) {
    this._table.table = table;
    if (this._map.loaded()) {
      this._handleData();
    }
  }

  connectedCallback() {
    this.replaceChildren(this._container);
    this._map.resize();

    this._map.on('load', async () => {
      this._handleData();
    });
  }

  private _handleData() {
    if (!this._table.cols) return;
    this._addSource();
    this._addLayer();
  }

  private _addSource() {
    const data: GeoJSON.GeoJSON = {
      type: 'FeatureCollection',
      features: this._table.rows.map((v) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [(v[0] as core.geo).lat, (v[0] as core.geo).lng],
        },
        properties: {},
      })),
    };

    console.log(data);

    this._map.addSource('source', { type: 'geojson', data: data });
  }

  private _addLayer() {
    const layer: LayerSpecification = {
      id: 'layer',
      type: 'circle',
      source: 'source',
    };

    this._map.addLayer(layer);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-geomap': GeoMap;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-geomap': GreyCat.Element<GeoMap>;
    }
  }
}

if (!globalThis.customElements.get('gui-geomap')) {
  globalThis.customElements.define('gui-geomap', GeoMap);
}
