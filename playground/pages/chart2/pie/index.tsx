import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const labels = ['Email', 'Social', 'Video', 'Direct', 'Search'];
const values = [120, 80, 60, 40, 100];

const table = gc.core.Table.fromCols([labels, values]);
table.headers = ['source', 'visits'];

document.body.appendChild(
  <app-layout title="Chart2 — Pie">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        series: [{ type: 'pie', yCol: 1, name: 'Traffic Sources' }],
        tooltip: { enabled: true, trigger: 'item' },
        legend: { enabled: true, position: 'right' },
      }}
    />
  </app-layout>,
);
