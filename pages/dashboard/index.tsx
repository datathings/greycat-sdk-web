import { GuiDashboard, defineComp, greycatFetcher } from '../../src';
import '../layout';
import './custom-comp';

const app = document.createElement('app-layout');
app.title = 'Object';
await app.init();

document.body.prepend(app);

const chart = defineComp({
  component: 'gui-chart',
  title: 'Chart',
  position: { direction: 'right' },
  attrs: {
    config: {
      cursor: true,
      xAxis: {
        scale: 'time',
      },
      yAxes: {
        temp: {},
      },
      table: { cols: [] },
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
  attrs: {
    count: 2,
  },
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

app.main.appendChild(
  <gui-dashboard
    components={{ chart, custom1, table }}
    associations={{
      chart: ['greycatFetcher', { fqn: 'project::chart_time' }],
      table: ['greycatFetcher', { fqn: 'project::table' }],
    }}
    fetchers={{ greycatFetcher }}
    // updateEvery={5000}
    ongui-dashboard-update={(ev) => {
      console.log('layout updated', ev.detail);
      // => localStorage.setItem('save', JSON.stringify(dashboard.getAttrs()));
    }}
  />,
);

setTimeout(() => {
  const dashboard = app.main.children[0] as GuiDashboard;
  const components = { custom1, table };
  components.custom1.attrs!.count = 100;
  dashboard.components = components;
}, 2000);
