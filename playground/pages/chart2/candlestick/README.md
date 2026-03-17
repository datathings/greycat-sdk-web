# Candlestick Chart

An OHLC candlestick chart for financial data using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const N = 60;
const dates: Date[] = [];
const open: number[] = [];
const close: number[] = [];
const low: number[] = [];
const high: number[] = [];
let price = 100;
const base = new Date('2024-01-01').getTime();

for (let i = 0; i < N; i++) {
  dates.push(new Date(base + i * 86400_000));
  const o = price + (Math.random() - 0.5) * 2;
  const c = o + (Math.random() - 0.5) * 6;
  const l = Math.min(o, c) - Math.random() * 3;
  const h = Math.max(o, c) + Math.random() * 3;
  open.push(+o.toFixed(2));
  close.push(+c.toFixed(2));
  low.push(+l.toFixed(2));
  high.push(+h.toFixed(2));
  price = c;
}

const table = gc.core.Table.fromCols([dates, open, close, low, high]);
table.headers = ['date', 'open', 'close', 'low', 'high'];

document.body.appendChild(
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Price' }],
      series: [
        {
          type: 'candlestick',
          yCol: 1,
          title: 'OHLC',
          candleCols: [1, 2, 3, 4],
        },
      ],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
    }}
  />,
);
```

## Config highlights

| Option                         | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `series[].candleCols`          | Tuple of 4 column indices: `[open, close, low, high]`     |
| `series[].type: 'candlestick'` | Enables OHLC candlestick rendering                        |
| `xAxis.type: 'time'`           | Timestamps are prepended automatically to each data point |

The `yCol` field is required by the type but is not used for data when `candleCols` is provided.
