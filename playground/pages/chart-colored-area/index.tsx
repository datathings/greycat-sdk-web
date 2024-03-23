import { core, GreyCat, IndexedDbCache } from '@greycat/web';
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

const colors = {
  low: 'cyan', //'#3498db',
  normal: 'orange', //'#2ecc71',
  high: 'green', //'#e74c3c',
};

chart.setConfig({
  table: await greycat.default.call<core.Table>('project::chart_colored_area'),
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
      colorCol: 2,
      colorMapping: (v: keyof typeof colors) => colors[v],
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
      colorCol: 2,
      colorMapping: (v: keyof typeof colors) => colors[v],
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
