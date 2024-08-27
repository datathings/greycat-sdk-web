import { $, core, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const currentValue = (<span slot="action" />) as HTMLElement;

const chart = document.createElement('gui-chart');

chart.addEventListener('selection', (e) => {
  const from = core.time.fromMs(e.detail.from as number);
  const to = core.time.fromMs(e.detail.to as number);
  console.log(`selection from ${from} to ${to}`);
});

const colors = {
  low: 'cyan', //'#3498db',
  normal: 'orange', //'#2ecc71',
  high: 'green', //'#e74c3c',
};
chart.value = await $.default.call<core.Table>('project::chart_colored_area');
chart.setConfig({
  tooltip: {
    // Override default tooltip
    render: (data) => {
      currentValue.innerHTML = `${data[0].xValue}, ${data[0].yValue}`;
    },
  },
  selection: {
    orientation: 'both',
  },
  cursor: true,
  xAxis: {
    scale: 'time',
    format: '%a, %d/%m/%y',
  },
  yAxes: {
    temp: {},
  },
  series: [
    {
      title: 'Warmth',
      type: 'area',
      yAxis: 'temp',
      yCol2: 'min',
      xCol: 0,
      yCol: 1,
      styleMapping: {
        col: 2,
        mapping(v: keyof typeof colors) {
          return { color: colors[v] };
        },
      },
    },
    // {
    //   title: 'Warmth',
    //   type: 'area',
    //   yAxis: 'temp',
    //   yCol2: 'min',
    //   xCol: 0,
    //   yCol: 1,
    //   colorCol: 2,
    //   colorMapping: (v: keyof typeof colors) => colors[v],
    // },
    {
      title: 'Value',
      type: 'scatter',
      yAxis: 'temp',
      xCol: 0,
      yCol: 1,
      styleMapping: {
        col: 2,
        mapping(v: keyof typeof colors) {
          return { color: colors[v] };
        },
      },
    },
  ],
});

document.body.appendChild(
  <app-layout title="Chart (colored area)">
    <>
      {currentValue}
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
