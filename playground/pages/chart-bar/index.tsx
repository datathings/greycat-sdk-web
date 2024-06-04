import { core, BarSerie, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

const baseLine = 10;
const currentValue = (<span slot="action" />) as HTMLElement;

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = document.createElement('gui-chart');

chart.addEventListener('selection', (e) => {
  const from = core.time.fromMs(e.detail.from as number);
  const to = core.time.fromMs(e.detail.to as number);
  console.log(`selection from ${from} to ${to}`);
});

chart.value = await greycat.default.call<core.Table>('project::chart_time');
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

document.body.appendChild(
  <app-layout title="Chart (bar)">
    <>
      {currentValue}
      <a slot="action" href="#" onclick={randomize}>
        Randomize
      </a>
      <fieldset slot="action" role="group">
        <label htmlFor="">Baseline</label>
        <input type="number" defaultValue={`${baseLine}`} oninput={updateBaseline} />
      </fieldset>
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

// eslint-disable-next-line no-inner-declarations
async function randomize() {
  chart.value = await greycat.default.call<core.Table>('project::chart_time');
  chart.compute();
  chart.update();
}

async function updateBaseline(e: Event) {
  const input = e.target as HTMLInputElement;
  (chart.config.series[0] as BarSerie<string>).baseLine = parseFloat(input.value);
  chart.update();
}
