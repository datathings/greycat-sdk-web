# Bar Chart

A grouped bar chart with category x-axis using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const sales = [120, 200, 150, 80, 70, 110, 130];
const returns = [20, 30, 25, 10, 5, 15, 18];

const table = gc.core.Table.fromCols([categories, sales, returns]);
table.headers = ['day', 'sales', 'returns'];

document.body.appendChild(
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'category' },
      yAxis: [{}],
      series: [
        { type: 'bar', yCol: 1, title: 'Sales' },
        { type: 'bar', yCol: 2, title: 'Returns', color: '#ff6b6b' },
      ],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
    }}
  />,
);
```

## Config highlights

| Option                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `xAxis.type: 'category'`  | Category labels on x-axis (strings from the table column) |
| `series[].color`          | Override the default palette color for a series           |
| `series[].stack: 'group'` | Stack bars with the same group name                       |
