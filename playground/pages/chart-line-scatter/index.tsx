import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Chart (line+scatter)">
    <gui-chart
      value={{
        cols: [
          [0, 5, 10, 15, 20, 25, 30],
          [null, 2, null, 5, null, null, null],
        ],
      }}
      config={{
        cursor: true,
        xAxis: {
          scale: 'linear',
          format: '',
        },
        yAxes: {
          value: {
            min: 0,
            max: 10,
            format: '',
          },
        },
        series: [
          {
            title: 'Value',
            type: 'line+scatter',
            yAxis: 'value',
            xCol: 0,
            yCol: 1,
            markerThreshold: { x: 5 },
            markerWidth: 2,
          },
        ],
      }}
    />
  </app-layout>,
);
