import {
  AddPanelOptions,
  DockviewComponent,
  GroupPanelContentPartInitParameters,
  IContentRenderer,
} from 'dockview-core';

import './dashboard.css';

class DashboardElem implements IContentRenderer {
  _root: HTMLElement;

  constructor(id: string) {
    this._root = document.createElement('div');
    this._root.innerHTML = 'Hello';
  }

  get element() {
    return this._root;
  }

  init(parameters: GroupPanelContentPartInitParameters): void {
    const params = parameters.params as DashboardPanelProps;
    const elem = document.createElement(params.component);
    this._root.appendChild(elem);

    if (params.component === 'gui-chart') {
      elem.config = params.params.config;
    } else if (params.component === 'gui-table') {
      elem.value = params.params.value;
    }
    console.log('params', params);
  }
}

type DashboardPanelProps = {
  component: string;
  params: Record<string, any>;
};

export type DashboardWindow<T extends keyof HTMLElementTagNameMap> = {
  title: string;
  component: T;
  args: Record<string, any>;
};

export class GuiDashboard extends HTMLElement {
  private _dockView?: DockviewComponent;
  private _panels: DashboardWindow<keyof HTMLElementTagNameMap>[] = [];

  connectedCallback() {
    this._dockView = new DockviewComponent({
      parentElement: this,
      components: {
        default: DashboardElem,
      },
    });

    this._dockView.layout(this.clientWidth, this.clientHeight);

    this.init();
  }

  disconnectedCallback() {}

  set panels(props: DashboardWindow<keyof HTMLElementTagNameMap>[]) {
    this._panels = props;
    this.init();
  }
  get panels() {
    return this._panels;
  }

  addPanel(panel: DashboardWindow<keyof HTMLElementTagNameMap>) {
    this._panels.push(panel);
    this.init();
  }

  init() {
    this._panels.forEach((panel, id) => {
      const panelOptions: AddPanelOptions<DashboardPanelProps> = {
        id: id.toString(),
        component: 'default',
        title: panel.title,
        position: { direction: 'right' },
        params: {
          component: panel.component,
          params: panel.args,
        },
      };
      this._dockView?.addPanel(panelOptions);
    });
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
