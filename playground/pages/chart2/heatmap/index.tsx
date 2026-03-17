import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

// generate a 7x24 heatmap: days of week × hours of day
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// build [x, y, value] triples as columns
const xCol: number[] = [];
const yCol: number[] = [];
const valCol: number[] = [];
for (let d = 0; d < 7; d++) {
  for (let h = 0; h < 24; h++) {
    xCol.push(h);
    yCol.push(d);
    valCol.push(Math.round(Math.random() * 100));
  }
}

const table = gc.core.Table.fromCols([xCol, yCol, valCol]);

document.body.appendChild(
  <app-layout title="Chart2 — Heatmap">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'category', echarts: { data: hours, splitArea: { show: true } } },
        yAxis: [{ type: 'category', echarts: { data: days, splitArea: { show: true } } }],
        series: [
          {
            type: 'heatmap',
            yCol: 1,
            valueCol: 2,
            title: 'Activity',
            echarts: {
              label: { show: false },
              emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
            },
          },
        ],
        tooltip: { enabled: true, trigger: 'item' },
        legend: { enabled: false },
        echarts: {
          visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027'],
            },
            textStyle: { color: '#ccc' },
          },
        },
        grid: { top: 10, bottom: 60, containLabel: true },
      }}
    />
  </app-layout>,
);
