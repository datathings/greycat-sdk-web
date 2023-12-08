import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Tabs';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::table');

app.main.appendChild(
  <gui-tabs
    ongui-tab-change={(ev) => {
      console.log(`Selected tab "${ev.detail.textContent}"`);
    }}
  >
    <gui-tab className="activeTab">Tab A</gui-tab>
    <gui-panel data-tab="Tab A">Hello from Tab A</gui-panel>

    <gui-tab>Tab B</gui-tab>
    <gui-panel data-tab="Tab B">
      <gui-table table={table} />
    </gui-panel>

    <gui-tab>Tab C</gui-tab>
    <gui-panel data-tab="Tab C">
      <gui-chart
        config={{
          cursor: true,
          xAxis: { scale: 'linear' },
          yAxes: { y: {} },
          table: { cols: [[1, 4, 2, 7, 5, 8, 3]] },
          series: [
            {
              type: 'bar',
              yAxis: 'y',
              yCol: 0,
            },
          ],
        }}
      />
    </gui-panel>
  </gui-tabs>,
);
