# Heatmap

A 2D heatmap using `gui-chart2` with color-mapped values.

## Usage

```tsx
import '@greycat/web';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

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
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'category', echarts: { data: hours } },
      yAxis: [{ type: 'category', echarts: { data: days } }],
      series: [
        {
          type: 'heatmap',
          yCol: 1,
          valueCol: 2,
          title: 'Activity',
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
        },
      },
      grid: { top: 10, bottom: 60, containLabel: true },
    }}
  />,
);
```

## Config highlights

| Option               | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `series[].valueCol`  | Column for the color-mapped value (third dimension)   |
| `series[].yCol`      | Column for the y-axis position                        |
| `echarts.visualMap`  | ECharts passthrough for the color scale legend        |
| `xAxis.echarts.data` | Explicit category labels via the ECharts escape hatch |

Heatmap data is built as `[x, y, value]` triples from the three columns.
