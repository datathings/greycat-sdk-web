import '@greycat/web';
import '@/common';

await gc.sdk.init();

const chart = document.createElement('gui-chart');
// TODO fix
// chart.value = await gc.project.histogram_table();
chart.setConfig({
  xAxis: {
    scale: 'linear',
  },
  yAxes: {
    bars: {
      position: 'left',
    },
    acc: {
      position: 'right',
    },
  },
  series: [
    {
      type: 'bar',
      yAxis: 'bars',
      spanCol: [0, 1],
      color: 'orange',
      yCol: 2,
    },
    {
      type: 'line',
      yAxis: 'acc',
      width: 2,
      markerShape: 'square',
      markerWidth: 10,
      color: 'red',
      xCol: 0,
      yCol: 3,
    },
  ],
});

document.body.appendChild(
  <app-layout title="Chart (bar-histogram)">
    <a
      slot="action"
      href="#"
      onclick={async () => {
        // TODO fix
        // chart.value = await gc.project.histogram_table();
        chart.setConfig(chart.config);
      }}
    >
      Randomize
    </a>
    {chart}
  </app-layout>,
);
