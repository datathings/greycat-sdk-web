import { ChartConfig, DashboardWindow, core } from '../../src';
import '../layout';

class CustomComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.textContent = `Hello from the other side!`;
  }
}

customElements.define('my-custom-comp', CustomComponent);

declare global {
  interface HTMLElementTagNameMap {
    'my-custom-comp': CustomComponent;
  }
}

const app = document.createElement('app-layout');
app.title = 'Object';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::table');

const dashboard = document.createElement('gui-dashboard');

const config: ChartConfig = {
  table: table,
  xAxis: {},
  yAxes: { left: {} },
  series: [
    {
      type: 'line',
      yAxis: 'left',
      yCol: 1,
      xCol: 0,
    },
  ],
};

const panels: DashboardWindow<keyof HTMLElementTagNameMap>[] = [
  { component: 'gui-chart', title: 'Chart', args: { config: config } },
  {
    component: 'gui-table',
    title: 'Table',
    args: { value: table },
    position: { direction: 'below' },
  },
  {
    component: 'my-custom-comp',
    title: 'Custom Component',
    args: {},
    position: { direction: 'right' },
  },
];
dashboard.panels = panels;

function addPanel() {
  dashboard.addPanel({
    component: 'gui-chart',
    title: 'Chart',
    args: { config: config },
  });
}

app.main.appendChild(
  <div className="grid">
    <article style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
      <header>Dashboard</header>
      <button style={{ width: '200px' }} onclick={addPanel}>
        Add Panel
      </button>
      {dashboard}
    </article>
  </div>,
);
