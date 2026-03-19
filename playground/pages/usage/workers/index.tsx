import '@greycat/web';
import '~/common';
import type { GuiChart2 } from '@greycat/web';
import {
  BYTE_AXIS,
  BYTE_TOOLTIP,
  CHART_H,
  actionBar,
  init,
  onData,
  registerChart,
  getLastData,
  type FlatUsageData,
} from '../shared.js';

const greycat = await gc.sdk.init({ debug: true });

const workerMemAggChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [
        { name: 'Memory', position: 'left', ...BYTE_AXIS },
        { name: 'Cache', position: 'right', ...BYTE_AXIS },
      ],
      series: [
        { type: 'line', yCol: 1, title: 'Total Memory', areaStyle: { opacity: 0.3 }, smooth: true },
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

const workerIOAggChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [
        { name: 'Reads', position: 'left', ...BYTE_AXIS },
        { name: 'Writes', position: 'right', ...BYTE_AXIS },
      ],
      series: [
        { type: 'line', yCol: 1, title: 'Total Reads', smooth: true },
        {
          type: 'line',
          yCol: 2,
          title: 'Total Writes',
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

const workerDetailChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [
        { name: 'Memory', position: 'left', ...BYTE_AXIS },
        { name: 'I/O', position: 'right', ...BYTE_AXIS },
      ],
      series: [
        { type: 'line', yCol: 1, title: 'Memory', areaStyle: { opacity: 0.3 } },
        { type: 'line', yCol: 2, title: 'Cache', echarts: { lineStyle: { type: 'dashed' } } },
        { type: 'line', yCol: 3, title: 'Reads', yAxisIndex: 1 },
        {
          type: 'line',
          yCol: 4,
          title: 'Writes',
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

registerChart(workerMemAggChart);
registerChart(workerIOAggChart);
registerChart(workerDetailChart);

let selectedWorker = 0;
let prevWorkerCount = -1;

function updateDetail(data: FlatUsageData) {
  if (data.workerCount === 0) return;
  const wi = Math.min(selectedWorker, data.workerCount - 1);
  const t = gc.core.Table.fromCols([
    data.times,
    data.workerMemory[wi],
    data.workerCache[wi],
    data.workerReads[wi],
    data.workerWrites[wi],
  ]);
  t.headers = ['time', 'Memory', 'Cache', 'Reads', 'Writes'];
  workerDetailChart.value = t;
}

const workerSelect = (
  <sl-select
    size="small"
    value="0"
    style="width: 140px;"
    onsl-change={(e: Event) => {
      selectedWorker = Number((e.target as HTMLSelectElement).value);
      const data = getLastData();
      if (data) updateDetail(data);
    }}
  />
) as HTMLSelectElement;

onData((data) => {
  const memTable = gc.core.Table.fromCols([
    data.times,
    data.workerMemoryTotal,
    data.workerCacheTotal,
  ]);
  memTable.headers = ['time', 'Total Memory', 'Total Cache'];
  workerMemAggChart.value = memTable;

  const ioTable = gc.core.Table.fromCols([
    data.times,
    data.workerReadsTotal,
    data.workerWritesTotal,
  ]);
  ioTable.headers = ['time', 'Total Reads', 'Total Writes'];
  workerIOAggChart.value = ioTable;

  if (data.workerCount !== prevWorkerCount) {
    prevWorkerCount = data.workerCount;
    workerSelect.innerHTML = '';
    for (let w = 0; w < data.workerCount; w++) {
      workerSelect.appendChild(<sl-option value={`${w}`}>Worker {w}</sl-option>);
    }
    workerSelect.value = `${selectedWorker}`;
  }

  updateDetail(data);
});

document.body.appendChild(
  <app-layout title="Usage — Workers">
    {actionBar}
    <gui-tabs>
      <gui-tab slot="tab" active>
        Overview
      </gui-tab>
      <gui-tab slot="tab">Per Worker</gui-tab>
      <gui-panel slot="panel" tab="Overview">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px;">
          <gui-card>
            <header slot="header">Memory & Cache (all workers)</header>
            {workerMemAggChart}
          </gui-card>
          <gui-card>
            <header slot="header">I/O (all workers)</header>
            {workerIOAggChart}
          </gui-card>
        </div>
      </gui-panel>
      <gui-panel slot="panel" tab="Per Worker">
        <div style="padding: 8px 8px 0;">{workerSelect}</div>
        <div style="padding: 8px;">{workerDetailChart}</div>
      </gui-panel>
    </gui-tabs>
  </app-layout>,
);

await init(greycat);
