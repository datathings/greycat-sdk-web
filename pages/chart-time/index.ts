import * as d3 from 'd3';
window.d3 = d3;
import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src/css/full.css';
import './index.css';
import '../../src/bundle';

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const randomizeBtn = document.querySelector('#randomize') as HTMLButtonElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLButtonElement;
  const toggleTheme = document.querySelector('#toggle-theme') as HTMLButtonElement;
  const currentValue = document.querySelector('#current-value') as HTMLDivElement;

  const chart = document.querySelector('gui-chart')!;
  chart.addEventListener('selection', (e) => {
    const from = core.time.fromMs(e.detail.from as number);
    const to = core.time.fromMs(e.detail.to as number);
    console.log(`selection from ${from} to ${to}`);
  });

  let table = await greycat.call<core.Table>('project::table');
  console.log(table);

  const colors = {
    low: 'cyan',
    normal: null,
    high: 'red',
  };

  chart.setConfig({
    tooltip: {
      // Override default tooltip
      render: (data) => {
        currentValue.innerHTML = `${data[0].xValue}, ${data[0].yValue}`;
      },
    },
    cursor: true,
    xAxis: {
      scale: 'time',
      format: '%a, %H:%M',
    },
    yAxes: {
      temp: {},
    },
    table,
    series: [
      {
        title: 'Value',
        type: 'line',
        yAxis: 'temp',
        xCol: 0,
        yCol: 1,
        colorCol: 2,
        colorMapping: (v) => colors[v],
      },
    ],
  });

  // eslint-disable-next-line no-inner-declarations
  async function randomize() {
    table = await greycat.call<core.Table>('project::table');
    console.log({ table });
    chart.config.table = table;
    chart.compute();
    chart.update();
  }

  randomizeBtn.addEventListener('click', randomize);
  toggleCursor.addEventListener('click', () => {
    chart.config.cursor = !chart.config.cursor;
  });
  toggleTheme.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'black';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  });
} catch (err) {
  document.body.textContent = `Is GreyCat started?`;
}