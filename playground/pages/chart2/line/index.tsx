import '@greycat/web';
import type { GuiChart2 } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

// generate 200 points with 4 series
const N = 200;
const times: Date[] = [];
const sine: number[] = [];
const cosine: number[] = [];
const trend: number[] = [];
const noisy: number[] = [];
const base = new Date('2024-01-01').getTime();
for (let i = 0; i < N; i++) {
  times.push(new Date(base + i * 3600_000));
  sine.push(Math.sin(i / 15) * 20 + Math.random() * 3);
  cosine.push(Math.cos(i / 15) * 15 + Math.random() * 3);
  trend.push(i * 0.15 + Math.random() * 5);
  noisy.push((Math.random() - 0.5) * 40);
}

const table = gc.core.Table.fromCols([times, sine, cosine, trend, noisy]);
table.headers = ['time', 'sine', 'cosine', 'trend', 'noisy'];

const chart = (
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{}],
      series: [
        { type: 'line', yCol: 1, name: 'Sine' },
        { type: 'line', yCol: 2, name: 'Cosine', smooth: true },
        { type: 'line', yCol: 3, name: 'Trend', lineWidth: 2 },
        { type: 'line', yCol: 4, name: 'Noisy', areaStyle: { opacity: 0.2 } },
      ],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

// showcase click event — e.detail is typed as Chart2ClickDetail
chart.addEventListener('gui-chart2-click', (e) => {
  console.log('chart click', e.detail);
  output.textContent = `Clicked: ${e.detail.seriesName} [${e.detail.dataIndex}] = ${JSON.stringify(e.detail.value)}`;
});

const output = (
  <pre style="padding: 8px; margin: 0; font-size: 12px; color: var(--color);">Click on a data point...</pre>
) as HTMLPreElement;

document.body.appendChild(
  appLayout('Chart2 — Line', output, chart),
);
