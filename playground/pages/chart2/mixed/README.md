# Mixed Series

Combining line, bar, scatter, and area series in a single chart with dual y-axes using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

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
        { type: 'line', yCol: 1, title: 'Trend', smooth: true, lineWidth: 2 },
        { type: 'bar', yCol: 2, title: 'Volume', yAxisIndex: 1, color: 'rgba(255, 165, 0, 0.7)' },
        { type: 'scatter', yCol: 3, title: 'Events', symbolSize: 8 },
        { type: 'line', yCol: 4, title: 'Baseline', areaStyle: { opacity: 0.3 }, lineWidth: 1 },
      ],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
    }}
  />,
);
```

## Config highlights

| Option | Description |
|--------|-------------|
| `series[].type` | Mix different types (`'line'`, `'bar'`, `'scatter'`) in the same chart |
| `series[].yAxisIndex` | Assign series to different y-axes |
| `series[].areaStyle: { opacity: 0.3 }` | Area fill with custom opacity |
| `series[].color` | Supports `rgba()` for semi-transparent colors |
