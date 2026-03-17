# Stacked Area

A stacked area chart with category x-axis using `gui-chart2`.

## Usage

```tsx
import '@greycat/web';

const categories: string[] = [];
const email: number[] = [];
const social: number[] = [];
const video: number[] = [];
for (let i = 0; i < 50; i++) {
  categories.push(`Week ${i + 1}`);
  email.push(Math.round(80 + Math.random() * 40));
  social.push(Math.round(60 + Math.random() * 30));
  video.push(Math.round(40 + Math.random() * 20));
}

const table = gc.core.Table.fromCols([categories, email, social, video]);
table.headers = ['week', 'email', 'social', 'video'];

document.body.appendChild(
  <gui-chart2
    value={table}
    config={{
      xCol: 0,
      xAxis: { type: 'category' },
      yAxis: [{}],
      series: [
        { type: 'line', yCol: 1, title: 'Email', stack: 'total', areaStyle: true },
        { type: 'line', yCol: 2, title: 'Social', stack: 'total', areaStyle: true },
        { type: 'line', yCol: 3, title: 'Video', stack: 'total', areaStyle: true },
      ],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
    }}
  />,
);
```

## Config highlights

| Option                     | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `series[].stack: 'total'`  | Stack series with the same group name                    |
| `series[].areaStyle: true` | Fill the area below the line (or between stacked series) |
| `dataZoom.type: 'both'`    | Mouse wheel zoom + visible slider at the bottom          |
