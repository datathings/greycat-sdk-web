import { LayerSpecification, Map as MaplibreMap, type StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './geomap.css';
import { TableLike, TableView } from '../common.js';
import { core } from '../../exports';

export class GeoMap extends HTMLElement {
  static MAP_STYLE: StyleSpecification = {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
    },
    glyphs: 'http://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
    ],
  };

  private _container: HTMLDivElement;
  private _table = new TableView();
  private _map: MaplibreMap;

  private _center: [number, number] = [6.1, 49.6];
  private _zoom: number = 2;
  private _mapStyle: StyleSpecification = GeoMap.MAP_STYLE;

  private _layers: Map<string, LayerSpecification> = new Map();

  set center(val: [number, number]) {
    this._center = val;
    this._map.setCenter(this._center);
  }

  set zoom(val: number) {
    this._zoom = val;
    this._map.setZoom(this._zoom);
  }

  set mapStyle(val: StyleSpecification) {
    this._mapStyle = val;
    this._map.setStyle(val);
  }

  set layers(val: LayerSpecification[]) {
    for (const element of val) {
      this._layers.set(element.id, element);
      if (this._map.loaded()) {
        this._map.addLayer(element);
      }
    }
  }

  constructor() {
    super();
    this._container = document.createElement('div');
    this._map = new MaplibreMap({
      container: this._container,
      center: this._center,
      zoom: this._zoom,
      style: this._mapStyle,
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
      this._handleLayers();
    });
  }

  private _handleData() {
    if (!this._table.cols) return;
    this._addSource();
  }

  private _addSource() {
    const features = Array.from({ length: this._table.cols[0].length });

    for (let index = 0; index < this._table.cols[0].length; index++) {
      const geo = this._table.cols[0][index] as core.geo;
      const properties: Record<string, unknown> = {};

      for (let col = 1; col < this._table.cols.length; col++) {
        const key = `column_${col}`;
        properties[key] = this._table.cols[col][index];
      }

      features[index] = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [geo.lat, geo.lng],
        },
        properties: properties,
      } satisfies GeoJSON.Feature;
    }
    const data: GeoJSON.GeoJSON = {
      type: 'FeatureCollection',
      features: features as GeoJSON.Feature[],
    };

    this._map.addSource('main', { type: 'geojson', data: data });
  }

  private _handleLayers() {
    for (const [_key, layer] of this._layers) {
      this._map.addLayer(layer);
    }
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
