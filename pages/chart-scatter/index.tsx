import * as d3 from 'd3';
import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart (scatter)';
await app.init();

document.body.prepend(app);

app.actions.prepend(
  <>
    <li>
      <a
        href="#"
        onclick={() => {
          chart.config.table = {
            cols: [
              Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
              Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
            ],
          };
          chart.compute();
          chart.update();
        }}
      >
        Randomize
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          chart.config.cursor = !chart.config.cursor;
        }}
      >
        Toggle cursor
      </a>
    </li>
  </>,
);

const chart = document.createElement('gui-chart');
chart.style.height = '100%';
app.main.replaceChildren(chart);

chart.addEventListener('selection', (e) => {
  const from = core.time.fromMs(e.detail.from as number);
  const to = core.time.fromMs(e.detail.to as number);
  console.log(`selection from ${from} to ${to}`);
});

chart.setConfig({
  table: {
    cols: [
      Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
      Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
    ],
  },
  series: [
    {
      type: 'scatter',
      yAxis: 'left',
      yCol: 1,
      xCol: 0,
    },
  ],
  xAxis: {
    scale: 'linear',
    min: 0,
    max: 10,
  },
  yAxes: { left: { scale: 'linear', min: 0, max: 10 } },
  cursor: true,
  selection: { orientation: 'both' },
});
