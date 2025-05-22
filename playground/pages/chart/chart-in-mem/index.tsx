import '@greycat/web';
import '~/common';

await gc.sdk.init();
const t = gc.Table.fromCols([
  [
    new Date('2020-01-01T15:15:00Z'),
    new Date('2020-01-02T15:15:00Z'),
    new Date('2020-01-03T15:15:00Z'),
    new Date('2020-01-04T15:15:00Z'),
  ],
  [2, 5, 100, 100000],
]);
document.body.appendChild(
  <app-layout title="Chart (in-mem)">
    <gui-chart
      value={t}
      config={{
        cursor: true,
        xAxis: { scale: 'time', padding: 0.1 },
        yAxes: {
          y: {
            // cursorAlign: 'start',
            scale: 'log',
            padding: 0.1,
          },
        },
        series: [{ type: 'line', xCol: 0, yCol: 1, yAxis: 'y' }],
      }}
    />
  </app-layout>,
);
