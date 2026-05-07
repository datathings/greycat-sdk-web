import maplibreStyle from 'maplibre-gl/dist/maplibre-gl.css?inline';
import { css, GuiElement } from '../../exports.js';
import { GuiMapLayer } from './map-layer.js';
import { GuiMapSource } from './map-source.js';
import { GuiMapElement } from './model.js';
import style from './map.css?inline';

export type GuiMapOptions = Omit<maplibregl.MapOptions, 'container'>;

/**
 * This component is only available if `maplibre-gl` is globally available
 */
export class GuiMap extends GuiElement {
  static override styles = [css(maplibreStyle), css(style)];

  private _container: HTMLDivElement;
  private _observer: MutationObserver;
  private _options: maplibregl.MapOptions | undefined;
  private _readyResolve: (map: maplibregl.Map) => void;
  private _map: maplibregl.Map | undefined;
  /**
   * Resolved when the underlying `map` is ready to be used, and returns it.
   */
  ready: Promise<maplibregl.Map>;

  constructor() {
    super();

    this._container = document.createElement('div');
    this._container.className = 'container';
    this.shadowRoot.appendChild(this._container);

    this._observer = new MutationObserver(this._onMutations);
    const { promise, resolve } = Promise.withResolvers<maplibregl.Map>();
    this.ready = promise;
    this._readyResolve = resolve;
  }

  set stylesheet(text: string) {
    this.shadowRoot.adoptedStyleSheets.unshift(css(text));
  }

  connectedCallback(): void {
    this.update();
    this._observer.observe(this, { childList: true });
    this.addDisposable(() => this._observer.disconnect());
  }

  get options() {
    return this._options ?? {};
  }

  set options(options: GuiMapOptions) {
    this._options = Object.assign({ container: this._container }, options);
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }
    if (this._map) {
      // map already initialized
      return;
    }
    if (!this._options) {
      // no options defined
      return;
    }

    const map = (this._map = new maplibregl.Map(this._options));
    this._map.once('load', () => {
      this._readyResolve(map);
      // We create a mutation ourselves to trigger the initialization
      this._onMutations(
        [
          {
            type: 'childList',
            target: this,
            addedNodes: this.childNodes,
            attributeName: null,
            attributeNamespace: null,
            nextSibling: null,
            oldValue: null,
            previousSibling: null,
            // the following will create an empty `NodeList`
            removedNodes: document.createDocumentFragment().childNodes,
          },
        ],
        this._observer,
      );
    });
  }

  private _onMutations: MutationCallback = (mutations) => {
    if (!this._map) {
      return;
    }
    const map = this._map;
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof GuiMapSource) {
          node.onLoad(map);
          if (node.value) {
            map.addSource(node.name, node.value);
          }
        } else if (node instanceof GuiMapLayer) {
          node.onLoad(map);
          if (node.value) {
            map.addLayer(node.value, node.beforeId);
          }
        } else if (node instanceof GuiMapElement) {
          node.onLoad(map);
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
    /** @see {@link GuiMap} */
    'gui-map': GuiMap;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiMap} */
        'gui-map': GreyCat.Element<GuiMap>;
      }
    }
  }
}
