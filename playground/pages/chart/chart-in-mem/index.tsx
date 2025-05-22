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
    <div style={{ height: '100%', width: '50%' }}>
      <gui-chart
        value={t}
        config={{
          cursor: true,
          xAxis: { scale: 'time', autoTicks: true },
          yAxes: {
            y: {
              // cursorAlign: 'start',
              scale: 'linear',
              autoTicks: true,
            },
          },
          series: [{ type: 'line', xCol: 0, yCol: 1, yAxis: 'y' }],
        }}
      />
    </div>
  </app-layout>,
);
