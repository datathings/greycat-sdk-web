import { GreyCat, GuiChart, GuiTable, IndexedDbCache, core, inferConfig, sl } from '@greycat/web';
import '@/common';
import './index.css';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

async function getTable() {
  const nt = core.nodeTime.create(41943357n);
  const table = await nt.sample(null, null, 1000, core.SamplingMode.adaptative(), null, null);
  return table;
}

const value = await getTable();

const table = (
  <gui-table
    value={value}
    ongui-change={() => {
      chart.setAttrs({ value: table.table, config: inferConfig(table.table) });
    }}
  />
) as GuiTable;
const chart = (<gui-chart value={value} config={inferConfig(value)} />) as GuiChart;
const tab_group = (
  <sl-tab-group>
    <sl-tab slot="nav" panel="table">
      Table
    </sl-tab>
    <sl-tab slot="nav" panel="chart">
      Chart
    </sl-tab>

    <sl-tab-panel name="table">{table}</sl-tab-panel>
    <sl-tab-panel name="chart">{chart}</sl-tab-panel>
  </sl-tab-group>
) as sl.SlTabGroup;

document.body.appendChild(
  <app-layout title="Tabs" mainStyle={{ display: 'grid' }}>
    <sl-button
      slot="action"
      variant="text"
      onclick={function () {
        const placement = tab_group.placement;
        console.log(placement);
        switch (placement) {
          case 'top':
            tab_group.placement = 'end';
            this.textContent = 'Change placement: end';
            break;
          case 'end':
            tab_group.placement = 'bottom';
            this.textContent = 'Change placement: bottom';
            break;
          case 'bottom':
            tab_group.placement = 'start';
            this.textContent = 'Change placement: start';
            break;
          case 'start':
            tab_group.placement = 'top';
            this.textContent = 'Change placement: top';
            break;
        }
      }}
    >
      Change placement: top
    </sl-button>
    {tab_group}
  </app-layout>,
);
