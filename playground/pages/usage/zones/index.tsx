import '@greycat/web';
import '~/common';
import type { GuiChart2 } from '@greycat/web';
import {
  BYTE_AXIS,
  BYTE_TOOLTIP,
  DEFAULT_TOOLTIP,
  CHART_H,
  actionBar,
  init,
  onData,
  registerChart,
  getLastData,
  type FlatUsageData,
} from '../shared.js';

const greycat = await gc.sdk.init({ debug: true });

const zoneSizeAggChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [
        { name: 'Size', position: 'left', ...BYTE_AXIS },
        { name: 'Cache', position: 'right', ...BYTE_AXIS },
      ],
      series: [
        { type: 'line', yCol: 1, title: 'Total Size', areaStyle: { opacity: 0.3 }, smooth: true },
        {
          type: 'line',
          yCol: 2,
          title: 'Total Cache',
          yAxisIndex: 1,
          echarts: { lineStyle: { type: 'dashed' } },
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

const zoneBlocksAggChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Blocks' }],
      series: [
        { type: 'line', yCol: 1, title: 'Committed' },
        { type: 'line', yCol: 2, title: 'Reserved', echarts: { lineStyle: { type: 'dashed' } } },
        { type: 'line', yCol: 3, title: 'Total', echarts: { lineStyle: { type: 'dotted' } } },
      ],
      tooltip: DEFAULT_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

const zoneSizeDetailChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [
        { name: 'Size', position: 'left', ...BYTE_AXIS },
        { name: 'Cache', position: 'right', ...BYTE_AXIS },
      ],
      series: [
        { type: 'line', yCol: 1, title: 'Size', areaStyle: { opacity: 0.3 }, smooth: true },
        {
          type: 'line',
          yCol: 2,
          title: 'Cache',
          yAxisIndex: 1,
          echarts: { lineStyle: { type: 'dashed' } },
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

const zoneBlocksDetailChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Blocks' }],
      series: [
        { type: 'line', yCol: 3, title: 'Committed' },
        { type: 'line', yCol: 4, title: 'Reserved', echarts: { lineStyle: { type: 'dashed' } } },
        { type: 'line', yCol: 5, title: 'Blocks', echarts: { lineStyle: { type: 'dotted' } } },
      ],
      tooltip: DEFAULT_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

registerChart(zoneSizeAggChart);
registerChart(zoneBlocksAggChart);
registerChart(zoneSizeDetailChart);
registerChart(zoneBlocksDetailChart);

let selectedZone = 0;
let prevZoneCount = -1;

function buildSingleZoneTable(data: FlatUsageData, zi: number): gc.core.Table {
  const nbRows = data.times.length;
  const size = new Array<number>(nbRows);
  const cache = new Array<number>(nbRows);
  const committed = new Array<number>(nbRows);
  const reserved = new Array<number>(nbRows);
  const blocks = new Array<number>(nbRows);
  for (let i = 0; i < nbRows; i++) {
    const zu = data.rawZones[i]?.[zi];
    size[i] = zu ? Number(zu.size ?? 0) : 0;
    cache[i] = zu ? Number(zu.cache ?? 0) : 0;
    committed[i] = zu ? Number(zu.committed_blocks ?? 0) : 0;
    reserved[i] = zu ? Number(zu.reserved_blocks ?? 0) : 0;
    blocks[i] = zu ? Number(zu.blocks ?? 0) : 0;
  }
  const t = gc.core.Table.fromCols([data.times, size, cache, committed, reserved, blocks]);
  t.headers = ['time', 'Size', 'Cache', 'Committed', 'Reserved', 'Blocks'];
  return t;
}

function updateDetail(data: FlatUsageData) {
  if (data.zoneCount === 0) return;
  const zi = Math.min(selectedZone, data.zoneCount - 1);
  const table = buildSingleZoneTable(data, zi);
  zoneSizeDetailChart.value = table;
  zoneBlocksDetailChart.value = table;
}

const zoneSelect = (
  <sl-select
    size="small"
    value="0"
    style="width: 140px;"
    onsl-change={(e: Event) => {
      selectedZone = Number((e.target as HTMLSelectElement).value);
      const data = getLastData();
      if (data) updateDetail(data);
    }}
  />
) as HTMLSelectElement;

onData((data) => {
  const sizeTable = gc.core.Table.fromCols([data.times, data.zoneSizeTotal, data.zoneCacheTotal]);
  sizeTable.headers = ['time', 'Total Size', 'Total Cache'];
  zoneSizeAggChart.value = sizeTable;

  const blocksTable = gc.core.Table.fromCols([
    data.times,
    data.zoneCommittedTotal,
    data.zoneReservedTotal,
    data.zoneBlocksTotal,
  ]);
  blocksTable.headers = ['time', 'Committed', 'Reserved', 'Total'];
  zoneBlocksAggChart.value = blocksTable;

  if (data.zoneCount !== prevZoneCount) {
    prevZoneCount = data.zoneCount;
    zoneSelect.innerHTML = '';
    for (let z = 0; z < data.zoneCount; z++) {
      zoneSelect.appendChild(<sl-option value={`${z}`}>Zone {z}</sl-option>);
    }
    zoneSelect.value = `${selectedZone}`;
  }

  updateDetail(data);
});

document.body.appendChild(
  <app-layout title="Usage — Zones">
    {actionBar}
    <gui-tabs>
      <gui-tab slot="tab" active>
        Overview
      </gui-tab>
      <gui-tab slot="tab">Per Zone</gui-tab>
      <gui-panel slot="panel" tab="Overview">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px;">
          <gui-card>
            <header slot="header">Size & Cache (all zones)</header>
            {zoneSizeAggChart}
          </gui-card>
          <gui-card>
            <header slot="header">Blocks (all zones)</header>
            {zoneBlocksAggChart}
          </gui-card>
        </div>
      </gui-panel>
      <gui-panel slot="panel" tab="Per Zone">
        <div style="padding: 8px 8px 0;">{zoneSelect}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px;">
          <gui-card>
            <header slot="header">Size & Cache</header>
            {zoneSizeDetailChart}
          </gui-card>
          <gui-card>
            <header slot="header">Blocks</header>
            {zoneBlocksDetailChart}
          </gui-card>
        </div>
      </gui-panel>
    </gui-tabs>
  </app-layout>,
);

await init(greycat);
