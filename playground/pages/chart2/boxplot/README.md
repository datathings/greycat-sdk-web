# Boxplot

A statistical box plot using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const categories = ['Group A', 'Group B', 'Group C'];

// each entry: [min, Q1, median, Q3, max]
const boxData = [
  [10, 25, 35, 45, 60],
  [15, 30, 40, 55, 70],
  [5, 20, 30, 42, 58],
];

// a minimal table is needed (the actual data goes through echarts passthrough)
const table = gc.core.Table.fromCols([categories, categories.map((_, i) => i)]);
table.headers = ['category', 'index'];

document.body.appendChild(
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
  />,
);
```

## Config highlights

| Option                  | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `series[].echarts.data` | Boxplot data as `[min, Q1, median, Q3, max][]` via the ECharts escape hatch |
| `xAxis.echarts.data`    | Category labels for each box                                                |

Boxplot uses a semi-transparent fill with solid borders for readability.
The specific data format `[min, Q1, median, Q3, max]` is ECharts-native and
is best provided through the `echarts` passthrough rather than table columns.
