import {
  AddPanelOptions,
  DockviewComponent,
  GroupPanelContentPartInitParameters,
  IContentRenderer,
  IDockviewPanel,
  PanelUpdateEvent,
  Parameters,
  SerializedDockview,
} from 'dockview-core';

import { createElement } from '@greycat/web/jsx-runtime';

/**
 * A helper function to properly type the given props based on the component tag name.
 * 
 * *This function is the identity function with some typing sugar on top. Nothing more.*
 */
export function defineComp<K extends keyof HTMLElementTagNameMap>(
  props: GuiDashboardComponent<K>,
): GuiDashboardComponent<K> {
  return props;
}

export type GuiDashboardComponent<K extends keyof HTMLElementTagNameMap> = {
  component: K;
  title?: string;
  attrs?: Partial<
    Omit<{ [P in keyof HTMLElementTagNameMap[K]]: HTMLElementTagNameMap[K][P] }, 'children'>
  >;
  fetch?: (elem: HTMLElementTagNameMap[K]) => Promise<void>;
} & Omit<AddPanelOptions, 'id' | 'params'>;

export class GuiDashboardUpdateEvent extends CustomEvent<GuiDashboard> {
  static readonly NAME = 'gui-dashboard-update';

  constructor(el: GuiDashboard) {
    super(GuiDashboardUpdateEvent.NAME, { detail: el, bubbles: true });
  }
}

export type GuiDashboardAssociation = string | [string, Record<string, unknown>];
export type GuiDashboardFetcher<S = Record<string, unknown>> = (
  el: HTMLElement,
  state: S,
  dashboard: GuiDashboard,
) => Promise<void>;

// TODO updateEvery: number | undefined
// to automatically update every component (fetch)

export class GuiDashboard extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _components: Record<string, GuiDashboardComponent<any>> = {};
  private _associations: Record<string, GuiDashboardAssociation> = {};
  private _fetchers: Record<string, GuiDashboardFetcher> = {};
  private _states: Record<string, Record<string, unknown>> = {};
  private _dockview: DockviewComponent | undefined;
  private _updateEvery = 0;
  private _updateIntervalId = -1;

  readonly state: Record<string, unknown> = {};

  readonly updatePanel = (panel: IDockviewPanel) => {
    const params = panel.params as DashboardPanelParams;
    let fetcher: string | undefined;
    if (typeof params.fetcher === 'string') {
      fetcher = params.fetcher;
      if (this._states[panel.id] === undefined) {
        this._states[panel.id] = {};
      }
    } else if (params.fetcher) {
      fetcher = params.fetcher[0];
      const state = params.fetcher[1];
      this._states[panel.id] = state ?? {};
    }

    if (fetcher && panel.view.content instanceof DashboardPanel) {
      const el = panel.view.content.inner;
      const state = this._states[panel.id];
      const fetcherFn = this._fetchers[fetcher];
      if (fetcherFn) {
        fetcherFn(el, state, this);
      }
    }
  };

  connectedCallback() {
    // ensures the dockview fits the available host size
    this.dockview.layout(this.clientWidth, this.clientHeight);

    // fire a 'gui-dashboard-update' when the layout changes
    this.dockview.onDidLayoutChange(() => {
      this.dispatchEvent(new GuiDashboardUpdateEvent(this));
    });

    // automatically call the fetcher (if any) when a new component is added
    this.dockview.onDidAddPanel(this.updatePanel);

    // create the components on mount
    this.update();
  }

  disconnectedCallback() {
    // noop
  }

  /**
   * Defines the components the dashboard will use for its panels.
   *
   * The keys are the ID of the components.
   */
  get components() {
    return this._components;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set components(components: Record<string, GuiDashboardComponent<any>>) {
    this._components = components;
    this.update();
  }

  /**
   * Associates a data fetcher to a component id.
   *
   * The IDs should match the keys defined in `components`.
   */
  get associations() {
    return this._associations;
  }

  set associations(associations: Record<string, GuiDashboardAssociation>) {
    this._associations = associations;
    this.update();
  }

  /**
   * A dictionnary of fetchers.
   * 
   * The fetchers can be associated to components in `associations`.
   */
  get fetchers() {
    return this._fetchers;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set fetchers(fetchers: Record<string, GuiDashboardFetcher<any>>) {
    this._fetchers = fetchers;
    this.update();
  }

  get updateEvery() {
    return this._updateEvery;
  }

  set updateEvery(updateEvery: number) {
    this._updateEvery = updateEvery;
    this.update();
  }

  /**
   * This is highly unlikely that someone would like to create a `SerializedDockview` manually.
   * 
   * This is intended to allow reloading a previously serialized model.
   */
  get model() {
    return this.dockview.toJSON();
  }

  set model(model: SerializedDockview) {
    this.dockview.fromJSON(model);
    this.update();
  }

  setAttrs({
    components = this._components,
    associations = this._associations,
    fetchers = this._fetchers,
    updateEvery = this._updateEvery,
    model,
  }: Partial<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: Record<string, GuiDashboardComponent<any>>;
    associations: Record<string, GuiDashboardAssociation>;
    fetchers: Record<string, GuiDashboardFetcher>;
    model: SerializedDockview,
    updateEvery: number;
  }>) {
    if (model) {
      this.dockview.fromJSON(model);
    }
    this._components = components;
    this._associations = associations;
    this._fetchers = fetchers;
    this._updateEvery = updateEvery;
    this.update();
  }

  getAttrs() {
    // TODO actually call `.getAttrs()` on every components
    return {
      model: this.dockview.toJSON(),
      components: this._components,
      associations: this._associations,
    };
  }

  update() {
    const dockview = this._dockview;
    if (dockview === undefined) {
      return;
    }

    clearInterval(this._updateIntervalId);
    if (this._updateEvery > 0) {
      this._updateIntervalId = setInterval(() => {
        for (const id in this._components) {
          const panel = dockview.panels.find((p) => p.id === id);
          if (panel) {
            this.updatePanel(panel);
          }
        }
      }, this._updateEvery);
    } else {
      this._updateIntervalId = -1;
    }

    // instantiate component wrappers if needed
    for (const [id, props] of Object.entries(this._components)) {
      const panel = dockview.panels.find((p) => p.id === id);
      if (panel) {
        // panel is already in dockview
        // update attrs
        panel.update({
          params: {
            attrs: props.attrs,
          }
        });
        // update the fetchers
        this.updatePanel(panel);
        continue;
      }

      const options: AddPanelOptions<DashboardPanelParams> = {
        id,
        component: 'default',
        title: props.title,
        position: props.position,
        params: {
          component: props.component,
          attrs: props.attrs,
          fetcher: this._associations[id],
        },
      };

      dockview.addPanel(options)
    }

    // cleanup old panels
    for (const panel of dockview.panels) {
      if (this._components[panel.id] === undefined) {
        dockview.removePanel(panel);
      }
    }
  }

  get dockview() {
    if (this._dockview === undefined) {
      this._dockview = new DockviewComponent({
        parentElement: this,
        components: {
          default: DashboardPanel,
        },
      });
    }
    return this._dockview;
  }
}

type DashboardPanelParams = {
  component: keyof HTMLElementTagNameMap;
  attrs?: Record<string, unknown>;
  fetcher?: GuiDashboardAssociation;
};

class DashboardPanel implements IContentRenderer {
  _root: HTMLElement;
  inner: HTMLElement;

  constructor() {
    this._root = document.createElement('div');
    this.inner = document.createElement('div');
  }

  get element() {
    return this._root;
  }

  async init(parameters: GroupPanelContentPartInitParameters) {
    const params = parameters.params as DashboardPanelParams;
    this.inner = createElement(params.component, params.attrs ?? {}) as HTMLElement;
    this._root.appendChild(this.inner);
  }

  update(event: PanelUpdateEvent<Parameters>): void {
    for (const name in event.params.params.attrs) {
      const value = event.params.params.attrs[name];
      if (name in this.inner) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.inner as any)[name] = value;
      }
    }
  }

  focus(): void {
    // noop
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-dashboard': GuiDashboard;
  }

  interface GuiDashboardEventMap {
    [GuiDashboardUpdateEvent.NAME]: GuiDashboardUpdateEvent;
  }

  interface HTMLElementEventMap extends GuiDashboardEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-dashboard': GreyCat.Element<GuiDashboard, GuiDashboardEventMap>;
    }
  }
}

if (!globalThis.customElements.get('gui-dashboard')) {
  globalThis.customElements.define('gui-dashboard', GuiDashboard);
}
