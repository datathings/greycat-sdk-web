import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const timepoints = [
  new Date('2023-01-01T00:00:00Z'),
  new Date('2023-04-01T00:00:00Z'),
  new Date('2023-08-01T00:00:00Z'),
  new Date('2023-10-01T00:00:00Z'),
  new Date('2023-12-01T00:00:00Z'),
];

document.body.appendChild(
  <app-layout title="Chart (step)">
    <gui-chart
      config={{
        cursor: true,
        xAxis: {
          scale: 'time',
          ticks: timepoints,
        },
        yAxes: {
          balance: {},
        },
        table: {
          cols: [timepoints, [2000, 25000, 100000, 170, 3200]],
        },
        series: [
          {
            title: 'Value',
            type: 'line',
            curve: 'step-after',
            yAxis: 'balance',
            xCol: 0,
            yCol: 1,
          },
        ],
      }}
    />
  </app-layout>,
);
