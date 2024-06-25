import { type core, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import './index.css';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = document.createElement('gui-chart2');
const table = await greycat.default.call<core.Table>('project::histogram_table', [10]);
chart.value = table;
chart.config = {
  xAxis: {
    scale: 'linear',
  },
  yAxes: {
    bars: {
      position: 'left',
    },
    acc: {
      position: 'right',
    },
  },
  series: [
    {
      type: 'bar',
      yAxis: 'bars',
      spanCol: [0, 1],
      yCol: 2,
    },
  ],
  selection: {
    orientation: 'horizontal',
  },
};

document.body.appendChild(
  <app-layout title="Chart (bar-histogram)">
    <>
      <fieldset slot="action" role="group">
        <label>Buckets</label>
        <input
          type="number"
          min="1"
          max="100"
          value="10"
          oninput={async (e) => {
            const val = (e.target as HTMLInputElement).value;
            chart.value = await greycat.default.call<core.Table>('project::histogram_table', [
              Number(val),
            ]);
          }}
        />
      </fieldset>
    </>
    {chart}
  </app-layout>,
);
