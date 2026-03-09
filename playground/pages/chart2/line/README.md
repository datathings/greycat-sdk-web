# Line Chart

A time-series line chart with multiple series and click event handling using `gui-chart2`.

## Usage

```tsx
import type { GuiChart2 } from '@greycat/web';

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

const chart = document.createElement('gui-chart2') as GuiChart2;
chart.value = table;
chart.config = {
  xCol: 0,
  xAxis: { type: 'time' },
  yAxis: [{}],
  series: [
    { type: 'line', yCol: 1, title: 'Sine' },
    { type: 'line', yCol: 2, title: 'Cosine', smooth: true },
    { type: 'line', yCol: 3, title: 'Trend', lineWidth: 2 },
    { type: 'line', yCol: 4, title: 'Noisy', areaStyle: { opacity: 0.2 } },
  ],
  tooltip: { enabled: true, trigger: 'axis' },
  legend: { enabled: true },
  dataZoom: { enabled: true, type: 'inside' },
};
```

## Click event

The `gui-chart2-click` event detail is typed as `Chart2ClickDetail` — no manual cast needed:

```tsx
chart.addEventListener('gui-chart2-click', (e) => {
  // e.detail is Chart2ClickDetail
  console.log(e.detail.seriesName, e.detail.dataIndex, e.detail.value);
});
```

## Config highlights

| Option | Description |
|--------|-------------|
| `xAxis.type: 'time'` | Time-based x-axis with smart label formatting |
| `series[].smooth: true` | Enable smooth curve interpolation |
| `series[].areaStyle: { opacity }` | Fill area below the line with custom opacity |
| `series[].lineWidth` | Line thickness in pixels |
| `dataZoom.type: 'inside'` | Mouse wheel zoom (no visible slider) |

## Events

### `gui-chart2-click` — `Chart2ClickDetail`

Fired when a data point is clicked.

| Field | Type | Description |
|-------|------|-------------|
| `componentType` | `string` | Typically `'series'` |
| `seriesType` | `string?` | `'line'`, `'bar'`, `'scatter'`, `'pie'`, etc. |
| `seriesIndex` | `number?` | 0-based series index |
| `seriesName` | `string?` | Series name (from `serie.title`) |
| `name` | `string` | Category name or x-axis label |
| `dataIndex` | `number` | 0-based row index |
| `value` | `unknown` | Data value (shape depends on series type, see below) |
| `color` | `string?` | Series color |
| `percent` | `number?` | Pie chart only: percentage of total |

**`value` shape by series type:**

| Series type | `value` shape |
|-------------|---------------|
| line / bar / scatter | `[x, y]` |
| pie | `number` (slice value) |
| candlestick | `[timestamp, open, close, low, high]` |
| heatmap | `[x, y, value]` |
| boxplot | `[min, Q1, median, Q3, max]` |

### `gui-chart2-selection` — `Chart2SelectionDetail`

Fired on data zoom changes.

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | `'datazoom'` |
| `start` | `number?` | Zoom range start (0–100%) |
| `end` | `number?` | Zoom range end (0–100%) |
| `startValue` | `number?` | Zoom range start as data value |
| `endValue` | `number?` | Zoom range end as data value |
| `batch` | `array?` | Batch items when multiple dataZooms are linked |
