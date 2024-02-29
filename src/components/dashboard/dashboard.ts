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

  init(parameters: GroupPanelContentPartInitParameters): void {
    const params = parameters.params as DashboardPanelProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elem = document.createElement(params.component) as any;
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
  params: Record<string, unknown>;
};

export type DashboardWindow<T extends keyof HTMLElementTagNameMap> = {
  title: string;
  component: T;
  args: Record<string, unknown>;
  position?: AddPanelPositionOptions;
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

    this._panels.forEach((panel) => {
      this.initPanels(panel);
    });
  }

  disconnectedCallback() {}

  set panels(props: DashboardWindow<keyof HTMLElementTagNameMap>[]) {
    this._panels.push(...props);
    props.forEach((panel) => {
      this.initPanels(panel);
    });
  }
  get panels() {
    return this._panels;
  }

  addPanel(panel: DashboardWindow<keyof HTMLElementTagNameMap>) {
    this._panels.push(panel);
    this.initPanels(panel);
  }

  initPanels(panel: DashboardWindow<keyof HTMLElementTagNameMap>) {
    const panelOptions: AddPanelOptions<DashboardPanelProps> = {
      id: `${(this._dockView?.totalPanels ?? 0) + 1}`,
      component: 'default',
      title: panel.title,
      position: { direction: 'right', ...panel.position },
      params: {
        component: panel.component,
        params: panel.args,
      },
    };
    this._dockView?.addPanel(panelOptions);
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
