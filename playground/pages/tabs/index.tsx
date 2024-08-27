import { $, GreyCat, IndexedDbCache, type core } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = await $.default.call<core.Table>('project::table');

document.body.appendChild(
  <app-layout title="Tabs" mainStyle={{ display: 'grid' }}>
    <gui-tabs
      ongui-tab-change={(ev) => {
        console.log(`Selected tab "${ev.detail.textContent}"`);
      }}
    >
      <gui-tab className="activeTab">Tab A</gui-tab>
      <gui-tab>Tab B</gui-tab>
      <gui-tab>Tab C</gui-tab>

      <gui-panel data-tab="Tab A">Hello from Tab A</gui-panel>
      <gui-panel data-tab="Tab B">
        <gui-table value={table} />
      </gui-panel>
      <gui-panel data-tab="Tab C">
        <gui-chart
          value={{ cols: [[1, 4, 2, 7, 5, 8, 3]] }}
          config={{
            cursor: true,
            xAxis: { scale: 'linear' },
            yAxes: { y: {} },
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
    </gui-tabs>
  </app-layout>,
);
