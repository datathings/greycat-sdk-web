import { GreyCat, IndexedDbCache, defineComp, greycatFetcher } from '@greycat/web';
import '@/common';
import './custom-comp';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = defineComp({
  component: 'gui-chart',
  title: 'Chart',
  position: { direction: 'right' },
  attrs: {
    value: { cols: [] },
    config: {
      cursor: true,
      xAxis: {
        scale: 'time',
      },
      yAxes: {
        temp: {},
      },
      series: [
        {
          title: 'Value',
          type: 'line',
          curve: 'step-after',
          yAxis: 'temp',
          xCol: 0,
          yCol: 1,
        },
      ],
    },
  },
});

const custom1 = defineComp({
  component: 'my-custom-comp',
  title: 'Custom 1',
  position: { direction: 'right' },
});

const table = defineComp({
  component: 'gui-table', // gui-dashboard
  title: 'Table', // dockview-api
  position: { direction: 'below', referencePanel: 'custom1' }, // dockview-api
  attrs: {
    // gui-dashboard
    value: { cols: [] },
  },
});

document.body.appendChild(
  <app-layout title="Dashboard">
    <gui-dashboard
      components={{ chart, custom1, table }}
      associations={{
        chart: ['greycatFetcher', { fqn: 'project::chart_time' }],
        table: ['greycatFetcher', { fqn: 'project::table' }],
      }}
      fetchers={{ greycatFetcher }}
      updateEvery={5000}
      ongui-dashboard-update={(ev) => {
        console.log('layout updated', ev.detail);
        // => localStorage.setItem('save', JSON.stringify(dashboard.getAttrs()));
      }}
    />
  </app-layout>,
);
