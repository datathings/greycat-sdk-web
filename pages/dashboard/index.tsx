import { ChartConfig, DashboardPanels, GuiChart, core } from '../../src';
import '../layout';

class CustomComponent extends HTMLElement {
  count: number = 0;
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.textContent = `Hello from the other side!`;
    const button = document.createElement('button');
    const count = document.createElement('p');
    count.innerText = `Count: ${this.count}`;
    button.innerText = 'Click me';

    button.addEventListener('click', () => {
      this.count++;
      count.innerText = `Count: ${this.count}`;
    });

    this.appendChild(count);
    this.appendChild(button);
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

const dashboard = document.createElement('gui-dashboard');

const panels: DashboardPanels = {
  chart: {
    component: 'gui-chart',
    title: 'Chart',
    handler: async (elem: GuiChart) => {
      const table = await greycat.default.call<core.Table>('project::table');
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
      elem.config = config;
    },
  },
  costum: {
    component: 'my-custom-comp',
    title: 'Custom Component',
  },
};

dashboard.panels = panels;

app.main.appendChild(
  <div className="grid">
    <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header>Dashboard</header>

      {dashboard}
    </article>
  </div>,
);
