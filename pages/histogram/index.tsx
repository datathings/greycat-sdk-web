import { core } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Histogram';
await app.init();

document.body.prepend(app);

app.actions.prepend(
  <li>
    <a
      href="#"
      onclick={async () => {
        chartEl.config.table = await greycat.default.call<core.Table>('project::histogram_table');
        chartEl.setConfig(chartEl.config);
      }}
    >
      Randomize
    </a>
  </li>,
);

const chartEl = document.createElement('gui-chart');
const table = await greycat.default.call<core.Table>('project::histogram_table');
console.log(table);
chartEl.setConfig({
  table,
  xAxis: {
    scale: 'linear',
  },
  yAxes: {
    bars: {
      position: 'left',
    },
    acc: {
      position: 'right',
    },
  },
  series: [
    {
      type: 'bar',
      yAxis: 'bars',
      spanCol: [0, 1],
      color: 'orange',
      yCol: 2,
    },
    {
      type: 'line',
      yAxis: 'acc',
      width: 2,
      markerShape: 'square',
      markerWidth: 10,
      color: 'red',
      xCol: 0,
      yCol: 3,
    },
  ],
});

app.main.appendChild(chartEl);
