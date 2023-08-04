import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const chartEl = document.createElement('gui-chart');
chartEl.style.width = '1024px';
chartEl.style.height = '768px';
app.appendChild(chartEl);

chartEl.config = {
  xAxis: {},
  yAxes: {
    y: {},
  },
  table: { cols: [[], []] },
  series: [
    {
      type: 'line',
      yAxis: 'y',
      yCol: 0,
    },
    {
      type: 'line',
      yAxis: 'y',
      yCol: 1,
    },
  ],
};

const table = await greycat.call<core.Table>('project::table', []);
console.log({ table });
chartEl.config.table = table;
chartEl.update();
