import { ChartConfig, DashboardWindow, GuiValue, core } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Object';
await app.init();

document.body.prepend(app);

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

const a: DashboardWindow<keyof HTMLElementTagNameMap>[] = [
  { component: 'gui-chart', title: 'Chart', args: { config: config } },
  { component: 'gui-table', title: 'Table', args: { value: table } },
];

app.main.appendChild(
  <div className="grid">
    <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header>HELLO</header>
      <gui-dashboard panels={a} />
    </article>
  </div>,
);
