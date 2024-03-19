import { GreyCat, IndexedDbCache, core } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const currentValue = (<span slot="action" />) as HTMLElement;
const chart = document.createElement('gui-chart');

chart.addEventListener('selection', (e) => {
  const from = core.time.fromMs(e.detail.from as number);
  const to = core.time.fromMs(e.detail.to as number);
  console.log(`selection from ${from} to ${to}`);
});

chart.addEventListener('gui-enter', () => {
  console.log('canvas-enter');
});

chart.addEventListener('gui-leave', () => {
  console.log('canvas-leave');
  currentValue.innerHTML = '';
});

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
    // display cursor time on xAxis in locale time with a DateTimeFormat
    cursorFormat: (x) => dtFormat.format(new Date(x)),
  },
  yAxes: {
    temp: {
      // override cursor format for y values
      // cursorFormat: (y) => `${y}`,
      // align the cursor display to start at the yAxis rather than ending at it by default
      cursorAlign: 'start',
    },
  },
  table: { cols: [] },
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

document.body.appendChild(
  <app-layout title="Chart (time)">
    <>
      {currentValue}
      <a slot="action" href="#" onclick={randomize}>
        Randomize
      </a>
      <a
        slot="action"
        href="#"
        onclick={() => {
          chart.config.cursor = !chart.config.cursor;
        }}
      >
        Toggle cursor
      </a>
    </>
    {chart}
  </app-layout>,
);

randomize();

async function randomize() {
  chart.value = await greycat.default.call<core.Table>('project::chart_time');
  console.log({ table: chart.value });
}
