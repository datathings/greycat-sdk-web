import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const sales = [120, 200, 150, 80, 70, 110, 130];
const returns = [20, 30, 25, 10, 5, 15, 18];

const table = gc.core.Table.fromCols([categories, sales, returns]);
table.headers = ['day', 'sales', 'returns'];

document.body.appendChild(
  <app-layout title="Chart2 — Bar">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'category' },
        yAxis: [{}],
        series: [
          { type: 'bar', yCol: 1, name: 'Sales' },
          { type: 'bar', yCol: 2, name: 'Returns', color: '#ff6b6b' },
        ],
        tooltip: { enabled: true, trigger: 'axis' },
        legend: { enabled: true },
      }}
    />
  </app-layout>,
);
