import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

// generate 50 data points over ~2 months
const N = 50;
const times: Date[] = [];
const lineVals: number[] = [];
const barVals: number[] = [];
const scatterVals: number[] = [];
const areaVals: number[] = [];

const base = new Date('2024-06-01').getTime();
for (let i = 0; i < N; i++) {
  times.push(new Date(base + i * 86400_000));
  lineVals.push(50 + Math.sin(i / 8) * 30 + Math.random() * 5);
  barVals.push(20 + Math.random() * 40);
  scatterVals.push(40 + Math.random() * 60);
  areaVals.push(30 + Math.sin(i / 6) * 15 + Math.random() * 10);
}

const table = gc.core.Table.fromCols([times, lineVals, barVals, scatterVals, areaVals]);
table.headers = ['time', 'Trend', 'Volume', 'Events', 'Baseline'];

document.body.appendChild(
  <app-layout title="Chart2 — Mixed Series">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'time' },
        yAxis: [
          { name: 'Values', position: 'left' },
          { name: 'Volume', position: 'right' },
        ],
        series: [
          {
            type: 'line',
            yCol: 1,
            name: 'Trend',
            smooth: true,
            lineWidth: 2,
          },
          {
            type: 'bar',
            yCol: 2,
            name: 'Volume',
            yAxisIndex: 1,
            color: 'rgba(255, 165, 0, 0.7)',
          },
          {
            type: 'scatter',
            yCol: 3,
            name: 'Events',
            symbolSize: 8,
          },
          {
            type: 'line',
            yCol: 4,
            name: 'Baseline',
            areaStyle: { opacity: 0.3 },
            lineWidth: 1,
          },
        ],
        tooltip: { enabled: true, trigger: 'axis' },
        legend: { enabled: true },
        dataZoom: { enabled: true, type: 'both' },
      }}
    />
  </app-layout>,
);
