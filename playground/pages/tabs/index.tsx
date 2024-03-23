import { GreyCat, IndexedDbCache, type core } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = await greycat.default.call<core.Table>('project::table');

document.body.appendChild(
  <app-layout title="Tabs">
    <gui-tabs
      ongui-tab-change={(ev) => {
        console.log(`Selected tab "${ev.detail.textContent}"`);
      }}
    >
      <gui-tab className="activeTab">Tab A</gui-tab>
      <gui-panel data-tab="Tab A">Hello from Tab A</gui-panel>

      <gui-tab>Tab B</gui-tab>
      <gui-panel data-tab="Tab B">
        <gui-table value={table} />
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
    </gui-tabs>
  </app-layout>,
);
