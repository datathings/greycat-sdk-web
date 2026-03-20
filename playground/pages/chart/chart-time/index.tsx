import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true /* timezone: 'Australia/Adelaide' */ });

const currentValue = (<span slot="action" />) as HTMLElement;
const chart = document.createElement('gui-chart');
chart.drawerEnabled = true;
chart.addEventListener('gui-selection', (e) => {
  if (e.detail) {
    const from = gc.core.time.fromMs(e.detail.from as number);
    const to = gc.core.time.fromMs(e.detail.to as number);
    console.log(`selection from ${from} to ${to}`);
  } else {
    console.log(`reset selection`);
  }
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
  series: [
    {
      title: 'Value',
      type: 'line',
      curve: 'step-after',
      yAxis: 'temp',
      xCol: 0,
      yCol: 1,
      width: 2,
      styleMapping: {
        col: 2,
        mapping: (v) => {
          return {
            dash: v === 'high' ? [8, 8] : v === 'low' ? [2, 2] : [],
            color: colors[v as keyof typeof colors],
            opacity: v === 'low' ? 0.5 : 1,
          };
        },
      },
    },
  ],
});

const from = document.createElement('gui-time');
from.timezone = gc.core.TimeZone['Europe/Paris'];
const to = document.createElement('gui-time');
to.timezone = gc.core.TimeZone['Europe/Paris'];

document.body.appendChild(
  appLayout(
    'Chart (time)',
    <div slot="action-left">
      <span>from={from}</span>,&nbsp;<span>to={to}</span>
    </div>,
    currentValue,
    <a slot="action" href="#" onclick={randomize}>
      Randomize
    </a>,
    <a
      slot="action"
      href="#"
      onclick={() => {
        chart.config.cursor = !chart.config.cursor;
      }}
    >
      Toggle cursor
    </a>,
    chart,
  ),
);

randomize();

async function randomize() {
  chart.value = await gc.project.chart_time();
  console.log({ table: chart.value });
  const scale = chart.xScale();
  if (scale !== undefined) {
    const [min, max] = scale.domain() as [Date, Date];
    from.value = gc.core.time.fromDate(min);
    to.value = gc.core.time.fromDate(max);
  }
}
