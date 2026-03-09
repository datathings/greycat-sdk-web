import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

// generate boxplot data: 6 groups, each with [min, Q1, median, Q3, max]
const categories = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F'];

function genBoxData(): [number, number, number, number, number] {
  const base = Math.random() * 50 + 20;
  const spread = Math.random() * 20 + 5;
  const min = +(base - spread).toFixed(1);
  const q1 = +(base - spread * 0.4).toFixed(1);
  const median = +(base + (Math.random() - 0.5) * spread * 0.3).toFixed(1);
  const q3 = +(base + spread * 0.4).toFixed(1);
  const max = +(base + spread).toFixed(1);
  return [min, q1, median, q3, max];
}

const boxData = categories.map(() => genBoxData());

// boxplot is best built using the echarts escape hatch directly
// since the data format ([min, Q1, median, Q3, max] per category) is specific
const table = gc.core.Table.fromCols([categories, categories.map((_, i) => i)]);
table.headers = ['category', 'index'];

document.body.appendChild(
  <app-layout title="Chart2 — Boxplot">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'category', echarts: { data: categories } },
        yAxis: [{ name: 'Value' }],
        series: [
          {
            type: 'boxplot',
            yCol: 1,
            title: 'Distribution',
            echarts: { data: boxData },
          },
        ],
        tooltip: { enabled: true, trigger: 'item' },
        legend: { enabled: true },
      }}
    />
  </app-layout>,
);
