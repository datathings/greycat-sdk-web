# Table of Objects

Type-safe column mapping using GreyCat type field FQNs instead of fragile numeric column indices.

## Usage

```tsx
import { chart2Config } from '@greycat/web';

const table = await gc.project.table_of_objects();

const chart = document.createElement('gui-chart2');
chart.value = table;
chart.config = chart2Config({
  xCol: 'project::TimeRecord::time',
  xAxis: { type: 'time' },
  yAxis: [{}],
  series: [
    {
      type: 'line',
      yCol: ['project::TimeRecord::value', 'project::Composed::b'],
      title: 'Composed.b',
    },
    {
      type: 'scatter',
      yCol: ['project::TimeRecord::value', 'project::Composed::a'],
      title: 'Composed.a',
      symbolSize: 6,
    },
  ],
  tooltip: { enabled: true, trigger: 'axis' },
  legend: { enabled: true },
});
```

## `chart2Config()` helper

The `chart2Config()` function constrains column references (`xCol`, `yCol`, `valueCol`, `candleCols`) to `gc.$Fields` — a generated union of all known GreyCat type field FQNs. This provides:

- **Autocomplete** in your IDE for field names
- **Compile-time checking** — typos in field FQNs are caught by TypeScript

Without the helper, you can still pass FQN strings directly in a plain `Chart2Config`, but they'll be typed as `string` with no validation.

## Column reference formats

| Format                 | Example                                                  | Description                |
| ---------------------- | -------------------------------------------------------- | -------------------------- |
| `number`               | `0`                                                      | Direct column index        |
| `string` (FQN)         | `'project::TimeRecord::time'`                            | Field fully-qualified name |
| `(number \| string)[]` | `['project::TimeRecord::value', 'project::Composed::b']` | Path into nested objects   |
| Mixed path             | `[1, 'project::SeriesObject::a']`                        | Column index + nested FQN  |

## Nested object access

When table columns contain GreyCat objects, you can drill into nested fields using array paths:

```tsx
// Access field 'b' of a Composed object stored in the 'value' field of TimeRecord
yCol: ['project::TimeRecord::value', 'project::Composed::b'];
```

The path is resolved left-to-right: first element selects the table column, subsequent elements navigate into nested `GCObject` fields.

## Auto-inference

When a typed table (with ABI metadata) is passed to `gui-chart2` without a config, `inferConfig2()` automatically generates FQN-based column references from the type's attributes.
