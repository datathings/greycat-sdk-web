# gui-chart2

An ECharts-based chart component for `@greycat/web`. Accepts `gc.core.Table` for data input with a declarative configuration API.

## Quick start

```tsx
import '@greycat/web';

const table = gc.core.Table.fromCols([times, values]);
table.headers = ['time', 'value'];

const chart = document.createElement('gui-chart2');
chart.value = table;
chart.config = {
  xCol: 0,
  xAxis: { type: 'time' },
  yAxis: [{}],
  series: [{ type: 'line', yCol: 1, title: 'My Series' }],
  tooltip: { enabled: true },
  legend: { enabled: true },
};
```

Or with JSX:

```tsx
<gui-chart2
  value={table}
  config={{
    xCol: 0,
    xAxis: { type: 'time' },
    series: [{ type: 'line', yCol: 1, title: 'My Series' }],
  }}
/>
```

## Examples

| Example                               | Description                                      |
| ------------------------------------- | ------------------------------------------------ |
| [Line](line/)                         | Time-series line chart                           |
| [Bar](bar/)                           | Grouped bar chart with category axis             |
| [Scatter](scatter/)                   | Scatter plot                                     |
| [Pie](pie/)                           | Pie chart                                        |
| [Candlestick](candlestick/)           | OHLC financial candlestick chart                 |
| [Heatmap](heatmap/)                   | 2D heatmap with color mapping                    |
| [Boxplot](boxplot/)                   | Statistical box-and-whisker plot                 |
| [Multi-Axis](multi-axis/)             | Dual y-axes with different units                 |
| [Stacked Area](stacked-area/)         | Stacked area chart                               |
| [Mixed](mixed/)                       | Line + bar + scatter + area in one chart         |
| [Table of Objects](table-of-objects/) | Type-safe FQN column mapping with nested objects |

## Config reference

### `Chart2Config`

| Field      | Type                         | Description                                                         |
| ---------- | ---------------------------- | ------------------------------------------------------------------- |
| `series`   | `Chart2Serie[]`              | **Required.** Array of series definitions                           |
| `xCol`     | `SerieTableColumn`           | Default x-column for all series (index, FQN, or path; default: `0`) |
| `xAxis`    | `Chart2Axis \| Chart2Axis[]` | X-axis configuration                                                |
| `yAxis`    | `Chart2Axis \| Chart2Axis[]` | Y-axis configuration (array for multi-axis)                         |
| `tooltip`  | `object`                     | `{ enabled?, trigger?: 'item' \| 'axis' \| 'none', formatter? }`    |
| `legend`   | `object`                     | `{ enabled?, position?: 'top' \| 'bottom' \| 'left' \| 'right' }`   |
| `dataZoom` | `object`                     | `{ enabled?, type?: 'inside' \| 'slider' \| 'both' }`               |
| `grid`     | `Chart2Grid \| Chart2Grid[]`  | `{ top?, right?, bottom?, left?, outerBoundsMode? }` — array for multi-grid |
| `echarts`  | `object`                     | Raw ECharts option override (deep-merged last)                      |

### `Chart2Serie`

| Field        | Type                           | Description                                                                        |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| `type`       | `string`                       | `'line'`, `'bar'`, `'scatter'`, `'pie'`, `'candlestick'`, `'heatmap'`, `'boxplot'` |
| `yCol`       | `SerieTableColumn`             | **Required.** Column for y-values (index, FQN, or path)                            |
| `title`      | `string`                       | Series name shown in legend and tooltip                                            |
| `xCol`       | `SerieTableColumn`             | Override the global `xCol` for this series                                         |
| `gridIndex`  | `number`                       | Which grid to use (0-based), sets xAxisIndex and yAxisIndex                        |
| `yAxisIndex` | `number`                       | Which y-axis to use (0-based), defaults to `gridIndex`                             |
| `hide`       | `boolean`                      | Hide this series                                                                   |
| `color`      | `string`                       | Override color (hex, rgb, rgba)                                                    |
| `lineWidth`  | `number`                       | Line thickness                                                                     |
| `symbolSize` | `number`                       | Point size for scatter/line                                                        |
| `smooth`     | `boolean`                      | Smooth curve interpolation                                                         |
| `areaStyle`  | `boolean \| { opacity? }`      | Fill area below line                                                               |
| `step`       | `'start' \| 'middle' \| 'end'` | Step line style                                                                    |
| `stack`      | `string`                       | Stack group name                                                                   |
| `valueCol`   | `SerieTableColumn`             | Third-dimension column for heatmap `[x, y, value]`                                 |
| `candleCols` | `SerieTableColumn[4]`          | `[open, close, low, high]` columns for candlestick                                 |
| `echarts`    | `object`                       | Raw ECharts series override                                                        |

### `Chart2Axis`

| Field         | Type                               | Description                                |
| ------------- | ---------------------------------- | ------------------------------------------ |
| `type`        | `string`                           | `'value'`, `'time'`, `'category'`, `'log'` |
| `name`        | `string`                           | Axis title                                 |
| `min` / `max` | `number \| 'dataMin' \| 'dataMax'` | Axis range                                 |
| `position`    | `string`                           | `'left'`, `'right'`, `'top'`, `'bottom'`   |
| `axisLabel`   | `object`                           | `{ formatter?, rotate? }`                  |
| `timezone`    | `gc.core.TimeZone`                 | Timezone for time axis formatting          |
| `echarts`     | `object`                           | Raw ECharts axis override                  |

## Component API

| Property        | Type           | Description                      |
| --------------- | -------------- | -------------------------------- |
| `value`         | `TableLike`    | Data input (table, array, etc.)  |
| `config`        | `Chart2Config` | Chart configuration              |
| `drawerEnabled` | `boolean`      | Enable/disable the config drawer |

| Method                                          | Description                                              |
| ----------------------------------------------- | -------------------------------------------------------- |
| `toggleConfig()`                                | Toggle the config drawer (also triggered by right-click) |
| `openConfig()`                                  | Open the config drawer                                   |
| `closeConfig()`                                 | Close the config drawer                                  |
| `getEChartsInstance()`                          | Get the underlying ECharts instance for advanced usage   |
| `setAttrs({ value?, config?, drawerEnabled? })` | Batch setter (single re-render)                          |

## Events

| Event                  | Detail type             | Description                        |
| ---------------------- | ----------------------- | ---------------------------------- |
| `gui-chart2-click`     | `Chart2ClickDetail`     | Fired when a data point is clicked |
| `gui-chart2-selection` | `Chart2SelectionDetail` | Fired on data zoom changes         |

### `Chart2ClickDetail`

| Field           | Type      | Description                                   |
| --------------- | --------- | --------------------------------------------- |
| `componentType` | `string`  | Typically `'series'`                          |
| `seriesType`    | `string?` | `'line'`, `'bar'`, `'scatter'`, `'pie'`, etc. |
| `seriesIndex`   | `number?` | 0-based series index                          |
| `seriesName`    | `string?` | Series name (from `serie.title`)              |
| `name`          | `string`  | Category name or x-axis label                 |
| `dataIndex`     | `number`  | 0-based row index                             |
| `value`         | `unknown` | Data value (shape depends on series type)     |
| `color`         | `string?` | Series color                                  |
| `percent`       | `number?` | Pie only: percentage of total                 |

**`value` shape by series type:**

| Series type          | `value` shape                         |
| -------------------- | ------------------------------------- |
| line / bar / scatter | `[x, y]`                              |
| pie                  | `number` (slice value)                |
| candlestick          | `[timestamp, open, close, low, high]` |
| heatmap              | `[x, y, value]`                       |
| boxplot              | `[min, Q1, median, Q3, max]`          |

### `Chart2SelectionDetail`

| Field                     | Type      | Description                                    |
| ------------------------- | --------- | ---------------------------------------------- |
| `start` / `end`           | `number?` | Zoom range as percentage (0–100)               |
| `startValue` / `endValue` | `number?` | Zoom range as data value                       |
| `batch`                   | `array?`  | Batch items when multiple dataZooms are linked |

## ECharts escape hatch

Every config level has an `echarts` field for raw ECharts options. This is deep-merged last, allowing full access to ECharts features not covered by the config API:

```tsx
config={{
  series: [{
    type: 'line',
    yCol: 1,
    echarts: { markLine: { data: [{ type: 'average' }] } },
  }],
  echarts: {
    visualMap: { min: 0, max: 100, ... },
  },
}}
```
