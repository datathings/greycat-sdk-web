import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const N = 300;
const xA: number[] = [];
const yA: number[] = [];
const xB: number[] = [];
const yB: number[] = [];
for (let i = 0; i < N; i++) {
  // cluster A: centered around (50, 50)
  xA.push(50 + (Math.random() - 0.5) * 40);
  yA.push(50 + (Math.random() - 0.5) * 40);
  // cluster B: centered around (150, 120)
  xB.push(150 + (Math.random() - 0.5) * 60);
  yB.push(120 + (Math.random() - 0.5) * 50);
}

const table = gc.core.Table.fromCols([xA.concat(xB), yA.concat(yB)]);
table.headers = ['x', 'y'];

document.body.appendChild(
  appLayout(
    'Chart2 — Scatter',
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'value', name: 'X' },
        yAxis: [{ name: 'Y' }],
        series: [{ type: 'scatter', yCol: 1, name: 'Clusters', symbolSize: 6 }],
        tooltip: { enabled: true, trigger: 'item' },
        legend: { enabled: true },
        dataZoom: { enabled: true, type: 'inside' },
      }}
    />,
  ),
);
