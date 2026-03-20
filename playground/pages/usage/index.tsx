import '@greycat/web';
import '~/common';
import * as echarts from 'echarts/core';
import { BYTE_AXIS, BYTE_TOOLTIP } from './shared';
import { chart2Config, type GuiChart2 } from '@greycat/web';

const greycat = await gc.sdk.init({ debug: true });

const root = await greycat.root();
const nt_usages = root['runtime::usages'];
const usage_table = await nt_usages.sample(
  gc.core.time.now().sub(gc.core.duration.from_hours(1)),
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
);

const nb_rows = usage_table.nbRows();
const usages = usage_table.cols[1] as gc.runtime.RuntimeUsage[];

const w_mem: Array<number> = new Array(nb_rows).fill(0);
const w_cache: Array<number> = new Array(nb_rows).fill(0);
const w_reads: Array<number> = new Array(nb_rows).fill(0);
const w_writes: Array<number> = new Array(nb_rows).fill(0);

const z_size: Array<number> = new Array(nb_rows).fill(0);
const z_cache: Array<number> = new Array(nb_rows).fill(0);
const z_refs: Array<number> = new Array(nb_rows).fill(0);
const z_comm: Array<number> = new Array(nb_rows).fill(0);

for (let i = 0; i < nb_rows; i++) {
  for (let wid = 0; wid < usages[0].workers.length; wid++) {
    const w = usages[i].workers[wid];
    w_mem[i] += Number(w.memory);
    w_cache[i] += Number(w.cache);
    w_reads[i] += Number(w.reads);
    w_writes[i] += Number(w.writes);
  }

  for (let zid = 0; zid < usages[0].zones.length; zid++) {
    const z = usages[i].zones[zid];
    z_size[i] += Number(z.size);
    z_cache[i] += Number(z.cache);
    z_refs[i] += Number(z.reserved_blocks);
    z_comm[i] += Number(z.committed_blocks);
  }
}
const ui_table = gc.core.Table.fromCols([
  usage_table.cols[0],
  usages,
  w_mem,
  w_cache,
  w_reads,
  w_writes,
  z_size,
  z_cache,
  z_refs,
  z_comm,
]);

const worker_chart_style: GreyCat.ElementStyle = {
  height: '250px',
};
const small_chart_grid_top = 50;
const small_chart_grid_right = 100;
const small_chart_legend_top = 120;

const globalChart = (
  <gui-chart2
    style={{ height: '250px' }}
    value={ui_table}
    config={chart2Config({
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Memory', ...BYTE_AXIS }],
      series: [
        {
          name: 'Process (res)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_res_bytes'],
        },
        {
          name: 'Process (shr)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_shr_bytes'],
        },
        {
          name: 'GreyCat (global)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::global_memory'],
        },
        {
          name: 'OS (total)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::os_total_bytes'],
        },
        {
          name: 'OS (used)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::os_used_bytes'],
        },
        {
          name: 'Process (virt)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_virt_bytes'],
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
      grid: {
        left: 70,
        right: 150,
      },
      echarts: {
        legend: {
          selected: {
            'OS (total)': false,
            'OS (used)': false,
            'Process (virt)': false,
          },
        },
      },
    })}
  />
) as GuiChart2;

const wMemChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Memory', ...BYTE_AXIS }],
      series: [{ type: 'line', yCol: 2 }],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: false },
      grid: {
        top: small_chart_grid_top,
        left: 25,
      },
      dataZoom: { enabled: true },
    }}
  />
) as GuiChart2;

const wCacheChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Cache' }],
      series: [{ type: 'line', yCol: 3 }],
      legend: { enabled: false },
      grid: {
        top: small_chart_grid_top,
        left: 30,
      },
      dataZoom: { enabled: true },
    }}
  />
) as GuiChart2;

const wIoChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: `I/O`, ...BYTE_AXIS }],
      series: [
        { name: 'R', type: 'line', yCol: 4 },
        { name: 'W', type: 'line', yCol: 5 },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true, position: 'right' },
      grid: {
        top: small_chart_grid_top,
        right: small_chart_grid_right,
      },
      dataZoom: { enabled: true },
      echarts: {
        legend: {
          top: small_chart_legend_top,
          right: 5,
        },
      },
    }}
  />
) as GuiChart2;

const zSizeChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Size', ...BYTE_AXIS }],
      series: [{ type: 'line', yCol: 6 }],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: false },
      grid: {
        top: small_chart_grid_top,
        left: 25,
      },
      dataZoom: { enabled: true },
    }}
  />
) as GuiChart2;

const zCacheChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Cache', ...BYTE_AXIS }],
      series: [{ type: 'line', yCol: 7 }],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: false },
      grid: {
        top: small_chart_grid_top,
        left: 25,
      },
      dataZoom: { enabled: true },
    }}
  />
) as GuiChart2;

const zBlocksChart = (
  <gui-chart2
    style={worker_chart_style}
    value={ui_table}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: `Blocks` }],
      series: [
        { name: 'Refs', type: 'line', yCol: 8 },
        { name: 'Comm', type: 'line', yCol: 9 },
      ],
      legend: { enabled: true, position: 'right' },
      grid: {
        top: small_chart_grid_top,
        right: small_chart_grid_right,
      },
      dataZoom: { enabled: true },
      echarts: {
        legend: {
          top: small_chart_legend_top,
          right: 5,
        },
      },
    }}
  />
) as GuiChart2;

document.body.appendChild(
  <app-layout title="Usage">
    {globalChart}
    <div style={{ display: 'flex', flexFlow: 'row' }}>
      {wMemChart}
      {wCacheChart}
      {wIoChart}
    </div>
    <div style={{ display: 'flex', flexFlow: 'row' }}>
      {zSizeChart}
      {zCacheChart}
      {zBlocksChart}
    </div>
  </app-layout>,
);

// Sync zoom/pan and cursor across all charts
const allInstances = [
  globalChart,
  wMemChart,
  wCacheChart,
  wIoChart,
  zSizeChart,
  zCacheChart,
  zBlocksChart,
]
  .map((c) => c.getEChartsInstance()!)
  .filter(Boolean);
for (const instance of allInstances) {
  instance.setOption({ animation: false });
}
echarts.connect(allInstances);
