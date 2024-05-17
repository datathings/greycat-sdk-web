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
      styleCol: 2,
      width: 2,
      styleMapping(v) {
        return {
          dash: v === 'high' ? [8, 8] : v === 'low' ? [2, 2] : [],
          color: colors[v as keyof typeof colors],
          transparency: v === 'low' ? 0.5 : 1,
        };
      },
    },
  ],
});

randomize();

async function randomize() {
  chart.value = await greycat.default.call<core.Table>('project::chart_time');
  console.log({ table: chart.value });
}
