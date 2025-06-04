import '@greycat/web';
import '~/common';

await gc.sdk.init();
const r = gc.Table.fromCols([
  [
    new Date('2020-01-04T15:15:00Z'),
    new Date('2020-01-03T15:15:00Z'),
    new Date('2020-01-02T15:15:00Z'),
    new Date('2020-01-01T15:15:00Z'),
  ],
  [2, 5, 10, 5],
  [3, 6, 11, 6],
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
document.body.appendChild(
  <app-layout title="Chart (in-mem)">
    <gui-chart
      value={r}
      config={{
        cursor: true,
        xAxis: { scale: 'time', padding: 0.1, autoTicks: true },
        yAxes: {
          y: {
            // cursorAlign: 'start',
            scale: 'linear',
          },
        },
        series: [
          { type: 'scatter', xCol: 0, yCol: 1, yAxis: 'y', width: 3 },
          { type: 'line', xCol: 0, yCol: 1, yAxis: 'y' },
          { type: 'area', xCol: 0, yCol: 1, yCol2: 2, yAxis: 'y' },
        ],
      }}
    />
  </app-layout>,
);
