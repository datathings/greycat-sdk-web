import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Chart (in-mem)">
    <gui-chart
      value={{
        cols: [
          [
            new Date('2020-01-01T15:15:00Z'),
            new Date('2020-01-02T15:15:00Z'),
            new Date('2020-01-03T15:15:00Z'),
            new Date('2020-01-04T15:15:00Z'),
          ],
          [-2.5, 1.458, 0.009, 5.64],
        ],
      }}
      config={{
        cursor: true,
        xAxis: { scale: 'time' },
        yAxes: {
          y: {
            // cursorAlign: 'start',
          },
        },
        series: [{ type: 'line', xCol: 0, yCol: 1, yAxis: 'y' }],
      }}
    />
  </app-layout>,
);
