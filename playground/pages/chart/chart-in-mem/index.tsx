import '@greycat/web';
import '~/common';

await gc.sdk.init();
const r = gc.Table.fromCols([
  [new Date('2020-01-01T00:00:00'), new Date('2020-01-02T00:00:00')],
  [1, 3],
  [3, 6],
  [5, 2],
  [10, 5],
  [7, 7],
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
            min: 0,
          },
        },
        series: [
          {
            type: 'bar',
            xCol: 0,
            yCol: 1,
            yAxis: 'y',
            color: 'red',
            stack: 'foo',
            width: 5,
          },

          {
            type: 'bar',
            xCol: 0,
            yCol: 3,
            yAxis: 'y',
            color: 'blue',
            stack: 'baz',
            width: 5,
          },
          {
            type: 'bar',
            xCol: 0,
            yCol: 4,
            yAxis: 'y',
            color: 'yellow',
            stack: 'foo',
            width: 5,
          },
          {
            type: 'bar',
            xCol: 0,
            yCol: 5,
            yAxis: 'y',
            color: 'purple',
            stack: 'baz',
            width: 5,
          },
          {
            type: 'bar',
            xCol: 0,
            yCol: 2,
            yAxis: 'y',
            color: 'brown',
            stack: 'lol',
            width: 5,
          },
        ],
      }}
    />
  </app-layout>,
);
