import '@greycat/web';
import '~/common';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  AxisPointerComponent,
} from 'echarts/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — MatrixComponent types not re-exported from echarts/components yet
import { install as MatrixComponent } from 'echarts/lib/component/matrix/install.js';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  AxisPointerComponent,
  MatrixComponent,
  CanvasRenderer,
]);

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
const times = (usage_table.cols[0] as gc.core.time[]).map((t) => Number(t));

// Aggregate worker data
const w_mem: number[] = new Array(nb_rows).fill(0);
const w_cache: number[] = new Array(nb_rows).fill(0);
const w_reads: number[] = new Array(nb_rows).fill(0);
const w_writes: number[] = new Array(nb_rows).fill(0);

// Aggregate zone data
const z_size: number[] = new Array(nb_rows).fill(0);
const z_cache: number[] = new Array(nb_rows).fill(0);
const z_refs: number[] = new Array(nb_rows).fill(0);
const z_comm: number[] = new Array(nb_rows).fill(0);
const z_blocks: number[] = new Array(nb_rows).fill(0);

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
    z_blocks[i] += Number(z.blocks);
  }
}

// Fragmentation %: uncommitted blocks / total blocks
const z_frag: number[] = z_blocks.map((total, i) =>
  total > 0 ? ((total - z_comm[i]) / total) * 100 : 0,
);

// Helper to build [time, value] pairs
function makeData(values: number[]): [number, number][] {
  return times.map((t, i) => [t, values[i]]);
}

// Extract global series from RuntimeUsage fields
const globalSeriesData = {
  procRes: makeData(usages.map((u) => Number(u.proc_res_bytes))),
  procShr: makeData(usages.map((u) => Number(u.proc_shr_bytes))),
  globalMem: makeData(usages.map((u) => Number(u.global_memory))),
  osTotal: makeData(usages.map((u) => Number(u.os_total_bytes))),
  osUsed: makeData(usages.map((u) => Number(u.os_used_bytes))),
  procVirt: makeData(usages.map((u) => Number(u.proc_virt_bytes))),
};

const byteFormatter = (v: number) => gc.sdk.humanSize(Number(v));

// --- Theme: read CSS custom properties to match gui-chart2 dark theme ---
const cs = getComputedStyle(document.body);
const textColor = cs.getPropertyValue('--color').trim() || '#eaeaea';
const bgColor = cs.getPropertyValue('--bg-1').trim() || '#181818';
const borderColor = `rgba(${cs.getPropertyValue('--text-0').trim() || '255, 255, 255'}, 0.15)`;

// --- Build the single echarts option with matrix layout ---
const X_DATA = ['col0', 'col1', 'col2'];
const Y_DATA = ['Memory', 'Workers', 'Zones'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const grids: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const xAxes: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const yAxes: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const series: any[] = [];

// Track which series names use byte formatting for tooltip
const byteSeriesNames = new Set<string>();
let axisIdx = 0;

interface CellDef {
  id: string;
  xIdx: number;
  yIdx: number;
  byteAxis?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisOpts?: Record<string, any>;
  seriesList: {
    name: string;
    data: [number, number][];
  }[];
}

const cells: CellDef[] = [
  // Row 0: Global (merged) - uses coord [0, 0] which sits in the merged cell
  {
    id: 'global',
    xIdx: 0,
    yIdx: 0,
    byteAxis: true,
    yAxisOpts: { name: 'Memory' },
    seriesList: [
      { name: 'Process (res)', data: globalSeriesData.procRes },
      { name: 'Process (shr)', data: globalSeriesData.procShr },
      { name: 'GreyCat (global)', data: globalSeriesData.globalMem },
      { name: 'OS (total)', data: globalSeriesData.osTotal },
      { name: 'OS (used)', data: globalSeriesData.osUsed },
      { name: 'Process (virt)', data: globalSeriesData.procVirt },
    ],
  },
  // Row 1: Workers
  {
    id: 'w-mem',
    xIdx: 0,
    yIdx: 1,
    byteAxis: true,
    yAxisOpts: { name: 'Memory' },
    seriesList: [{ name: 'Memory', data: makeData(w_mem) }],
  },
  {
    id: 'w-cache',
    xIdx: 1,
    yIdx: 1,
    yAxisOpts: { name: 'Cache' },
    seriesList: [{ name: 'Cache', data: makeData(w_cache) }],
  },
  {
    id: 'w-io',
    xIdx: 2,
    yIdx: 1,
    byteAxis: true,
    yAxisOpts: { name: 'I/O' },
    seriesList: [
      { name: 'Reads', data: makeData(w_reads) },
      { name: 'Writes', data: makeData(w_writes) },
    ],
  },
  // Row 2: Zones
  {
    id: 'z-size',
    xIdx: 0,
    yIdx: 2,
    byteAxis: true,
    yAxisOpts: { name: 'Size' },
    seriesList: [{ name: 'Size', data: makeData(z_size) }],
  },
  {
    id: 'z-cache',
    xIdx: 1,
    yIdx: 2,
    byteAxis: true,
    yAxisOpts: { name: 'Cache' },
    seriesList: [{ name: 'Cache', data: makeData(z_cache) }],
  },
  {
    id: 'z-blocks',
    xIdx: 2,
    yIdx: 2,
    yAxisOpts: { name: 'Blocks' },
    seriesList: [
      { name: 'Reserved', data: makeData(z_refs) },
      { name: 'Committed', data: makeData(z_comm) },
    ],
    // Fragmentation % uses a secondary y-axis, added manually below
  },
];

for (const cell of cells) {
  const gridIdx = axisIdx;

  if (cell.byteAxis) {
    for (const s of cell.seriesList) {
      byteSeriesNames.add(s.name);
    }
  }

  grids.push({
    id: cell.id,
    coordinateSystem: 'matrix',
    coord: [X_DATA[cell.xIdx], Y_DATA[cell.yIdx]],
    top: 40,
    bottom: 20,
    left: 20,
    right: 20,
    containLabel: true,
  });

  xAxes.push({
    id: cell.id,
    gridIndex: gridIdx,
    type: 'time',
    axisTick: { show: false },
    axisLabel: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
  });

  yAxes.push({
    id: cell.id,
    gridIndex: gridIdx,
    scale: true,
    splitNumber: 3,
    axisLine: { lineStyle: { color: borderColor } },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: borderColor } },
    axisLabel: {
      fontSize: 10,
      color: textColor,
      ...(cell.byteAxis ? { formatter: byteFormatter } : {}),
    },
    nameTextStyle: { color: textColor },
    ...cell.yAxisOpts,
  });

  for (const s of cell.seriesList) {
    series.push({
      name: s.name,
      xAxisIndex: gridIdx,
      yAxisIndex: gridIdx,
      type: 'line',
      symbol: 'none',
      lineStyle: { width: 1.5 },
      data: s.data,
    });
  }

  axisIdx++;
}

// Add secondary y-axis for fragmentation % on the z-blocks grid (index 6)
const zBlocksGridIdx = 6;
const fragYAxisIdx = yAxes.length;
yAxes.push({
  id: 'z-frag',
  gridIndex: zBlocksGridIdx,
  position: 'right',
  scale: true,
  min: 0,
  max: 100,
  splitNumber: 2,
  axisLine: { lineStyle: { color: borderColor } },
  axisTick: { show: false },
  splitLine: { show: false },
  axisLabel: {
    fontSize: 10,
    color: textColor,
    formatter: (v: number) => `${v}%`,
  },
  nameTextStyle: { color: textColor },
});
series.push({
  name: 'Fragmentation',
  xAxisIndex: zBlocksGridIdx,
  yAxisIndex: fragYAxisIdx,
  type: 'line',
  symbol: 'none',
  lineStyle: { width: 1.5, type: 'dashed' },
  data: makeData(z_frag),
});

const allAxisIndices = Array.from({ length: axisIdx }, (_, i) => i);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const option: any = {
  animation: false,
  backgroundColor: 'transparent',
  textStyle: { color: textColor },
  matrix: {
    x: {
      show: false,
      data: X_DATA,
      levelSize: 0,
    },
    y: {
      data: [
        { value: 'Memory', size: 280 },
        { value: 'Workers', size: 220 },
        { value: 'Zones', size: 220 },
      ],
      levelSize: 70,
      label: { fontSize: 14, color: textColor },
    },
    body: {
      data: [
        {
          // Merge all 3 columns in the Global row
          coord: [[0, 2], 0],
          mergeCells: true,
        },
      ],
    },
    top: 50,
    bottom: 60,
    width: '90%',
    left: 'center',
  },
  // Sync axis pointer (crosshair) across all grids
  axisPointer: {
    link: [{ xAxisIndex: allAxisIndices }],
  },
  legend: {
    top: 5,
    textStyle: { color: textColor },
    data: [
      'Process (res)',
      'Process (shr)',
      'GreyCat (global)',
      'OS (total)',
      'OS (used)',
      'Process (virt)',
    ],
    selected: {
      'OS (total)': false,
      'OS (used)': false,
      'Process (virt)': false,
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: bgColor,
    borderColor,
    textStyle: { color: textColor },
    confine: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (params: any) => {
      const all = Array.isArray(params) ? params : [params];
      if (all.length === 0) return '';
      // Only show series belonging to the hovered grid
      const hoveredAxis = all[0].axisIndex;
      // oxlint-disable-next-line typescript/no-explicit-any
      const arr = all.filter((p: any) => p.axisIndex === hoveredAxis);
      if (arr.length === 0) return '';
      const axisVal =
        arr[0].axisValue ?? (Array.isArray(arr[0].value) ? arr[0].value[0] : undefined);
      const header =
        typeof axisVal === 'number'
          ? gc.$.default.printTime(gc.core.time.fromMs(Math.round(axisVal)))
          : String(axisVal ?? '');
      let html = header;
      for (const p of arr) {
        const y = Array.isArray(p.value) ? p.value[1] : p.value;
        const formatted = p.seriesName === 'Fragmentation'
          ? `${Number(y).toFixed(1)}%`
          : byteSeriesNames.has(p.seriesName)
            ? gc.sdk.humanSize(Number(y))
            : String(y);
        html += `<br/>${p.marker} ${p.seriesName}: <strong>${formatted}</strong>`;
      }
      return html;
    },
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: allAxisIndices,
      bottom: 20,
      height: 25,
      left: '10%',
      right: '10%',
      throttle: 120,
      textStyle: { color: textColor },
      borderColor,
      dataBackground: {
        lineStyle: { color: borderColor },
        areaStyle: { color: borderColor },
      },
    },
    {
      type: 'inside',
      xAxisIndex: allAxisIndices,
      throttle: 120,
    },
  ],
  grid: grids,
  xAxis: xAxes,
  yAxis: yAxes,
  series,
};

// --- Render ---
const chartEl = (<div style={{ width: '100%', height: '800px' }} />) as HTMLDivElement;

document.body.appendChild(<app-layout title="Usage">{chartEl}</app-layout>);

const chart = echarts.init(chartEl);
chart.setOption(option);

new ResizeObserver(() => chart.resize()).observe(chartEl);
