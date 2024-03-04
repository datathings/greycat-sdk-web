import {
  AddPanelOptions,
  AddPanelPositionOptions,
  DockviewComponent,
  GroupPanelContentPartInitParameters,
  IContentRenderer,
} from 'dockview-core';

import './dashboard.css';

class DashboardElem implements IContentRenderer {
  _root: HTMLElement;

  constructor() {
    this._root = document.createElement('div');
  }

  get element() {
    return this._root;
  }

  async init(parameters: GroupPanelContentPartInitParameters) {
    console.log('init', parameters);

    const params = parameters.params as DashboardPanelProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elem = document.createElement(params.component) as any;
    this._root.appendChild(elem);
    Object.assign(elem, params.attrs);

    if (params.fetcher) {
      const data = await params.fetcher();
      if (params.component === 'gui-chart') {
        elem.config.table = data;
      } else {
        elem.value = data;
      }
    }
  }
}

type DashboardPanelProps = {
  component: string;
  attrs?: Record<string, any>;
  fetcher?: () => Promise<void>;
};

export type PanelProps = {
  title: string;
  position?: AddPanelPositionOptions;
  attrs?: Record<string, any>;
};

export type PanelFactory = Record<string, PanelProps>;
export type FetchFactory = Record<string, () => Promise<any>>;
export type UIFactory = Record<string, keyof HTMLElementTagNameMap>;

type GuiDashboardState = {
  panelFactory: PanelFactory;
  fetchFactory: FetchFactory;
  uiFactory: UIFactory;
};
export class GuiDashboard extends HTMLElement {
  private _dockView?: DockviewComponent;
  private _state: GuiDashboardState = {
    panelFactory: {},
    fetchFactory: {},
    uiFactory: {},
  };

  connectedCallback() {
    this._dockView = new DockviewComponent({
      parentElement: this,
      components: {
        default: DashboardElem,
      },
    });

    this._dockView.layout(this.clientWidth, this.clientHeight);

    /* 
    this._dockView.onDidLayoutChange(() => {
      localStorage.setItem('dockview', JSON.stringify(this._dockView?.toJSON()));
    }); */
    this.initPanels();
  }

  disconnectedCallback() {}

  set fetchFactory(factory: FetchFactory) {
    this._state.fetchFactory = factory;
    this.initPanels();
  }

  set panelFactory(factory: PanelFactory) {
    this._state.panelFactory = factory;

    this.initPanels();
  }

  set uiFactory(factory: UIFactory) {
    this._state.uiFactory = factory;
    this.initPanels();
  }

  initPanels() {
    for (const [key, panelProps] of Object.entries(this._state.panelFactory)) {
      if (this._dockView?.getPanel(key) !== undefined) {
        continue;
      }

      const panelOptions: AddPanelOptions<DashboardPanelProps> = {
        id: key,
        component: 'default',
        title: panelProps.title,
        position: panelProps.position,
        params: {
          component: this._state.uiFactory[key],
          attrs: panelProps.attrs,
          fetcher: this._state.fetchFactory[key],
        },
      };
      console.log('panelOptions', panelOptions);

      this._dockView?.addPanel(panelOptions);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-dashboard': GuiDashboard;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-dashboard': GreyCat.Element<GuiDashboard>;
    }
  }
}

if (!globalThis.customElements.get('gui-dashboard')) {
  globalThis.customElements.define('gui-dashboard', GuiDashboard);
}
