# Scatter Chart

A scatter plot using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const N = 300;
const x: number[] = [];
const y: number[] = [];
for (let i = 0; i < N; i++) {
  x.push(50 + (Math.random() - 0.5) * 40);
  y.push(50 + (Math.random() - 0.5) * 40);
}

const table = gc.core.Table.fromCols([x, y]);
table.headers = ['x', 'y'];

document.body.appendChild(
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'value', name: 'X' },
      yAxis: [{ name: 'Y' }],
      series: [
        { type: 'scatter', yCol: 1, title: 'Points', symbolSize: 6 },
      ],
      tooltip: { enabled: true, trigger: 'item' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />,
);
```

## Config highlights

| Option | Description |
|--------|-------------|
| `series[].symbolSize` | Size of each scatter point in pixels |
| `tooltip.trigger: 'item'` | Show tooltip on individual point hover (instead of axis-wide) |
| `xAxis.name` / `yAxis[].name` | Axis title labels |
