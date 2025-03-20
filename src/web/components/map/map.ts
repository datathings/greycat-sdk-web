import { GuiMapLayer } from './map-layer.js';
import { GuiMapSource } from './map-source.js';

export type GuiMapOptions = Omit<maplibregl.MapOptions, 'container'>;

/**
 * This component is only available if `maplibre-gl` is globally available
 */
export class GuiMap extends HTMLElement {
  private _observer: MutationObserver;
  private _options: maplibregl.MapOptions | undefined;
  /** The current MapLibre-GL instance */
  map: maplibregl.Map | undefined;

  constructor() {
    super();

    this._observer = new MutationObserver(this._onMutations);
  }

  connectedCallback(): void {
    this.update();
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback(): void {
    this._observer.disconnect();
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
    if (this.map) {
      // map already initialized
      return;
    }
    if (!this._options) {
      // no options defined
      return;
    }

    const map = (this.map = new maplibregl.Map(this._options));
    const sources = this.querySelectorAll('gui-map-source');
    const layers = this.querySelectorAll('gui-map-layer');
    console.log({ sources, layers });
    this.map.once('load', () => {
      sources.forEach((source) => {
        if (source.value) {
          map.addSource(source.name, source.value);
        }
      });
      layers.forEach((layer) => {
        if (layer.value) {
          map.addLayer(layer.value, layer.beforeId);
        }
      });
    });
    // this.map.on('zoomend', this.updateValue);
    // this.map.on('dragend', this.updateValue);
  }

  private _onMutations: MutationCallback = (mutations) => {
    if (!this.map) {
      return;
    }
    const map = this.map;
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof GuiMapSource) {
          if (node.value) {
            map.addSource(node.name, node.value);
          }
        } else if (node instanceof GuiMapLayer) {
          if (node.value) {
            map.addLayer(node.value, node.beforeId);
          }
        }
      });
      mutation.removedNodes.forEach((node) => {
        if (node instanceof GuiMapSource) {
          map.removeSource(node.name);
        } else if (node instanceof GuiMapLayer) {
          if (node.value) {
            map.removeLayer(node.value.id);
          }
        }
      });
    }
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
