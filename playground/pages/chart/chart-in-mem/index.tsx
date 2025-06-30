import '@greycat/web';
import { GuiChart } from '@greycat/web';
import '~/common';

await gc.sdk.init();
const start = new Date();
const rows = 100;
const r = gc.Table.fromCols([
  Array.from({ length: rows }, (_, i) => new Date(start.getTime() + i * 24 * 60 * 60 * 1000)),
  Array.from({ length: rows }, () => Math.floor(Math.random() * 10) + 1),
  Array.from({ length: rows }, () => Math.floor(Math.random() * 100) + 1),
]);
// const r = gc.Table.fromCols([
//   [
//     new Date('2020-01-01T15:15:00Z'),
//     new Date('2020-01-02T15:15:00Z'),
//     new Date('2020-01-03T15:15:00Z'),
//     new Date('2020-01-04T15:15:00Z'),
//   ],
//   [5, 10, 5, 2],
//   [6, 11, 6, 3],
// ]);
const chart1 = (
  <gui-chart
    value={r}
    config={{
      cursor: true,
      xAxis: { scale: 'time', padding: 0.1, autoTicks: true },
      yAxes: {
        y: {
          // cursorAlign: 'start',
          scale: 'linear',
          min: 0,
        },
      },
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 1,
          yAxis: 'y',
          color: 'red',
          markerColor: 'green',
          markerWidth: 5,
        },
      ],
    }}
  />
) as GuiChart;
const chart2 = (
  <gui-chart
    value={r}
    config={{
      cursor: true,
      xAxis: { scale: 'time', padding: 0.1, autoTicks: true },
      yAxes: {
        y: {
          // cursorAlign: 'start',
          scale: 'linear',
          min: 0,
        },
      },
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 2,
          yAxis: 'y',
          color: 'red',
          markerColor: 'green',
          markerWidth: 5,
        },
      ],
    }}
  />
) as GuiChart;

document.body.appendChild(
  <app-layout title="Chart (in-mem)">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {chart1}
      {chart2}
    </div>
  </app-layout>,
);

chart1.addEventListener('gui-chart-cursor', (e) => {
  chart2.cursor = e.detail.cursor;
});
chart1.addEventListener('gui-chart-leave', () => {
  chart2.cursor = null;
});
chart2.addEventListener('gui-chart-cursor', (e) => {
  chart1.cursor = e.detail.cursor;
});
chart2.addEventListener('gui-chart-leave', () => {
  chart1.cursor = null;
});
