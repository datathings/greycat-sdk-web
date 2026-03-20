import '@greycat/web';
import type { Serie } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const data = Array.from({ length: 1000 }, (_) => [Math.random(), Math.random(), Math.random(), Math.random()]);
const series = Array.from({ length: 1000 }, (_, i): Serie => ({ type: 'line', yCol: i, yAxis: 'y', color: 'blue' }));

const t = gc.Table.fromCols(data);

document.body.appendChild(
  appLayout(
    'Chart (in-mem)',
    <gui-chart
      value={t}
      config={{
        cursor: true,
        xAxis: { scale: 'linear' },
        yAxes: {
          y: {
            // cursorAlign: 'start',
          },
        },
        series,
        tooltip: {
          render: () => {},
        },
      }}
    />,
  ),
);
