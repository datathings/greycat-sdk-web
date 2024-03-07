import * as d3 from 'd3';
import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart (time)';

await app.init();

document.body.prepend(app);

const currentValue = document.createElement('li');
app.actions.prepend(
  <>
    {currentValue}
    <li>
      <a href="#" onclick={randomize}>
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
app.main.appendChild(chart);

chart.addEventListener('selection', (e) => {
  const from = core.time.fromMs(e.detail.from as number);
  const to = core.time.fromMs(e.detail.to as number);
  console.log(`selection from ${from} to ${to}`);
});

chart.addEventListener('canvas-enter', () => {
  console.log('canvas-enter');
});

chart.addEventListener('canvas-leave', () => {
  console.log('canvas-leave');
  currentValue.innerHTML = '';
});

let table = await greycat.default.call<core.Table>('project::chart_time');
console.log(table);

const colors = {
  low: 'cyan',
  normal: null,
  high: 'red',
};

const dtFormat = new Intl.DateTimeFormat('en-GB', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'longOffset',
});

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
    // display time on xAxis in locale time
    format: (x, specifier) => d3.timeFormat(specifier)(new Date(x)),
    // display cursor time on xAxis in locale time with a DateTimeFormat
    cursorFormat: (x) => dtFormat.format(new Date(x)),
  },
  yAxes: {
    temp: {
      // override cursor format for y values
      cursorFormat: (y) => `${y}`,
      // align the cursor display to start at the yAxis rather than ending at it by default
      cursorAlign: 'start',
    },
  },
  table,
  series: [
    {
      title: 'Value',
      type: 'line',
      curve: 'step-after',
      yAxis: 'temp',
      xCol: 0,
      yCol: 1,
      colorCol: 2,
      colorMapping: (v: keyof typeof colors) => colors[v],
    },
  ],
});

// eslint-disable-next-line no-inner-declarations
async function randomize() {
  table = await greycat.default.call<core.Table>('project::chart_time');
  console.log({ table });
  chart.config.table = table;
  chart.compute();
  chart.update();
}
