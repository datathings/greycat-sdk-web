import { core } from '@greycat/sdk';
import '../layout';
import { BarSerie } from '../../src';

const app = document.createElement('app-layout');
app.title = 'Chart (bar)';

await app.init();

document.body.prepend(app);

const baseLine = 10;

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
      <fieldset role="group">
        <label htmlFor="">Baseline</label>
        <input type="number" defaultValue={`${baseLine}`} onchange={updateBaseline} />
      </fieldset>
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

let table = await greycat.default.call<core.Table>('project::chart_time');

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
    // format: '%a, %H:%M',
  },
  yAxes: {
    temp: {},
  },
  table,
  series: [
    {
      title: 'Value',
      type: 'bar',
      yAxis: 'temp',
      baseLine: baseLine,
      xCol: 0,
      yCol: 1,
    },
  ],
});

// eslint-disable-next-line no-inner-declarations
async function randomize() {
  table = await greycat.default.call<core.Table>('project::chart_time');
  chart.config.table = table;
  chart.compute();
  chart.update();
}

async function updateBaseline(e: Event) {
  const input = e.target as HTMLInputElement;
  (chart.config.series[0] as BarSerie<string>).baseLine = parseFloat(input.value);
  chart.update();
}
