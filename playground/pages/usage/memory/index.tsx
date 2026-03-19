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
} from '../shared.js';

const greycat = await gc.sdk.init({ debug: true });

const memoryChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Memory', ...BYTE_AXIS }],
      series: [
        {
          type: 'line',
          yCol: 1,
          title: 'Process Memory',
          areaStyle: { opacity: 0.3 },
          smooth: true,
        },
        {
          type: 'line',
          yCol: 2,
          title: 'Global Memory',
          areaStyle: { opacity: 0.3 },
          smooth: true,
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

const driftChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Drift', ...BYTE_AXIS }],
      series: [
        {
          type: 'line',
          yCol: 1,
          title: 'Memory Drift',
          smooth: true,
          echarts: {
            markLine: {
              data: [{ yAxis: 0, label: { show: false } }],
              silent: true,
              lineStyle: { type: 'dashed', color: '#888' },
            },
          },
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

registerChart(memoryChart);
registerChart(driftChart);

onData((data) => {
  const memTable = gc.core.Table.fromCols([data.times, data.processMemory, data.globalMemory]);
  memTable.headers = ['time', 'Process Memory', 'Global Memory'];
  memoryChart.value = memTable;

  const driftTable = gc.core.Table.fromCols([data.times, data.memoryDrift]);
  driftTable.headers = ['time', 'Memory Drift'];
  driftChart.value = driftTable;
});

document.body.appendChild(
  <app-layout title="Usage — Memory">
    {actionBar}
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px; overflow: auto;">
      <gui-card style="grid-column: 1 / -1;">
        <header slot="header">Process & Global Memory</header>
        {memoryChart}
      </gui-card>
      <gui-card>
        <header slot="header">Memory Drift</header>
        {driftChart}
      </gui-card>
    </div>
  </app-layout>,
);

await init(greycat);
