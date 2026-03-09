# Pie Chart

A pie chart using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const labels = ['Email', 'Social', 'Video', 'Direct', 'Search'];
const values = [120, 80, 60, 40, 100];

const table = gc.core.Table.fromCols([labels, values]);
table.headers = ['source', 'visits'];

document.body.appendChild(
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      series: [{ type: 'pie', yCol: 1, title: 'Traffic Sources' }],
      tooltip: { enabled: true, trigger: 'item' },
      legend: { enabled: true, position: 'right' },
    }}
  />,
);
```

## Config highlights

| Option | Description |
|--------|-------------|
| `xCol` | Column used for slice labels |
| `series[].yCol` | Column used for slice values |
| `legend.position` | `'top'`, `'bottom'`, `'left'`, or `'right'` |

Pie charts ignore `xAxis` and `yAxis` configuration.
