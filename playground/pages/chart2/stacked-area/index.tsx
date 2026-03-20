import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const N = 50;
const categories: string[] = [];
const email: number[] = [];
const social: number[] = [];
const video: number[] = [];
for (let i = 0; i < N; i++) {
  categories.push(`Week ${i + 1}`);
  email.push(Math.round(80 + Math.random() * 40));
  social.push(Math.round(60 + Math.random() * 30));
  video.push(Math.round(40 + Math.random() * 20));
}

const table = gc.core.Table.fromCols([categories, email, social, video]);
table.headers = ['week', 'email', 'social', 'video'];

document.body.appendChild(
  appLayout(
    'Chart2 — Stacked Area',
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'category' },
        yAxis: [{}],
        series: [
          { type: 'line', yCol: 1, name: 'Email', stack: 'total', areaStyle: true },
          { type: 'line', yCol: 2, name: 'Social', stack: 'total', areaStyle: true },
          { type: 'line', yCol: 3, name: 'Video', stack: 'total', areaStyle: true },
        ],
        tooltip: { enabled: true, trigger: 'axis' },
        legend: { enabled: true },
        dataZoom: { enabled: true, type: 'both' },
      }}
    />,
  ),
);
