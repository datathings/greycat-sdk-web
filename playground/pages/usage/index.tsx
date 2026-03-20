import '@greycat/web';
import '~/common';
import { chart2Config, Chart2Grid, getThemeColors, type GuiChart2 } from '@greycat/web';

const POLL_INTERVAL_MS = 5_000;

const greycat = await gc.sdk.init({ debug: true });
const root = await greycat.root();
const nt_usages = root['runtime::usages'];

const BYTE_AXIS = { axisLabel: { formatter: (v: unknown) => gc.sdk.humanSize(Number(v)) } };

// --- Time window state ---
const TIME_WINDOWS = [
  { label: '1h', ms: 60 * 60 * 1000 },
  { label: '6h', ms: 6 * 60 * 60 * 1000 },
  { label: '1d', ms: 24 * 60 * 60 * 1000 },
  { label: '1w', ms: 7 * 24 * 60 * 60 * 1000 },
  { label: '1m', ms: 30 * 24 * 60 * 60 * 1000 },
];

let currentWindowMs = TIME_WINDOWS[0].ms; // default: 1h
let currentTimeMs = Date.now(); // default: now
let maxRows = 1000;

// --- Reusable arrays (reset & reused each tick to ease GC) ---
const w_mem: number[] = [];
const w_cache: number[] = [];
const w_reads: number[] = [];
const w_writes: number[] = [];
const z_size: number[] = [];
const z_cache: number[] = [];
const z_refs: number[] = [];
const z_comm: number[] = [];
const z_blocks: number[] = [];
const z_frag: number[] = [];

async function fetchUsageTable(): Promise<gc.core.Table> {
  const to = gc.core.time.fromMs(Math.round(currentTimeMs));
  const from = gc.core.time.fromMs(Math.round(currentTimeMs - currentWindowMs));

  const usage_table = await nt_usages.sample(
    from,
    to,
    maxRows,
    gc.core.SamplingMode.adaptative,
    null,
    null,
  );

  const nb_rows = usage_table.nbRows();
  const usages = usage_table.cols[1] as gc.runtime.RuntimeUsage[];

  // Reset arrays
  w_mem.length = w_cache.length = w_reads.length = w_writes.length = nb_rows;
  z_size.length =
    z_cache.length =
    z_refs.length =
    z_comm.length =
    z_blocks.length =
    z_frag.length =
      nb_rows;
  w_mem.fill(0);
  w_cache.fill(0);
  w_reads.fill(0);
  w_writes.fill(0);
  z_size.fill(0);
  z_cache.fill(0);
  z_refs.fill(0);
  z_comm.fill(0);
  z_blocks.fill(0);
  z_frag.fill(0);

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
    z_frag[i] = z_blocks[i] > 0 ? ((z_blocks[i] - z_comm[i]) / z_blocks[i]) * 100 : 0;
  }

  return gc.core.Table.fromCols([
    usage_table.cols[0], // 0: time
    usages, // 1: RuntimeUsage
    [...w_mem], // 2
    [...w_cache], // 3
    [...w_reads], // 4
    [...w_writes], // 5
    [...z_size], // 6
    [...z_cache], // 7
    [...z_refs], // 8
    [...z_comm], // 9
    [...z_frag], // 10
  ]);
}

// --- Time controls UI ---
const rowsInput = (
  <sl-input
    type="number"
    size="small"
    value="1000"
    min="10"
    max="100000"
    label="Max rows"
    style="width: 120px"
    onsl-change={(e: Event) => {
      maxRows = Number((e.target as HTMLInputElement).value) || 1000;
      tick();
    }}
  />
) as HTMLElement;

const dateInput = (
  <sl-input
    type="datetime-local"
    size="small"
    value=""
    label="Time"
    placeholder="defaults to now"
    style="flex: 1"
    onsl-change={(e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      if (val) {
        currentTimeMs = new Date(val).getTime();
      } else {
        currentTimeMs = Date.now();
      }
      tick();
    }}
  />
) as HTMLElement;

const windowBtns = TIME_WINDOWS.map((tw, i) => {
  const btn = (
    <sl-button
      size="small"
      variant={i === 0 ? 'primary' : 'default'}
      onclick={() => {
        currentWindowMs = tw.ms;
        for (let j = 0; j < windowBtns.length; j++) {
          windowBtns[j].setAttribute('variant', j === TIME_WINDOWS.indexOf(tw) ? 'primary' : 'default');
        }
        tick();
      }}
    >
      {tw.label}
    </sl-button>
  ) as HTMLElement;
  return btn;
});

const controls = (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '8px 5%' }}>
    {rowsInput}
    {dateInput}
    <sl-button-group>{...windowBtns}</sl-button-group>
  </div>
) as HTMLElement;

// --- Chart config ---
const { textColor, borderColor } = getThemeColors();

const byteSeriesNames = new Set([
  'Process (res)',
  'Process (shr)',
  'GreyCat (global)',
  'OS (total)',
  'OS (used)',
  'Process (virt)',
  'Memory',
  'Reads',
  'Writes',
  'Size',
  'Cache (z)',
]);

const allGridIndices = [0, 1, 2, 3, 4, 5, 6];
const GRID_CELL: Chart2Grid = {
  top: 40,
  bottom: 30,
  left: 85,
  right: 45,
  outerBoundsMode: 'none',
};

const usageChart = (
  <gui-chart2
    style={{ width: '100%', height: '800px' }}
    config={chart2Config({
      xCol: 0,
      xAxis: [
        { type: 'time' }, // 0: global
        { type: 'time', echarts: { splitNumber: 3 } }, // 1: w-mem
        { type: 'time', echarts: { splitNumber: 3 } }, // 2: w-cache
        { type: 'time', echarts: { splitNumber: 3 } }, // 3: w-io
        { type: 'time', echarts: { splitNumber: 3 } }, // 4: z-size
        { type: 'time', echarts: { splitNumber: 3 } }, // 5: z-cache
        { type: 'time', echarts: { splitNumber: 3 } }, // 6: z-blocks
      ],
      yAxis: [
        { name: 'Memory', ...BYTE_AXIS }, // 0: global
        { name: 'Memory', ...BYTE_AXIS }, // 1: w-mem
        { name: 'Cache' }, // 2: w-cache
        { name: 'I/O', ...BYTE_AXIS }, // 3: w-io
        { name: 'Size', ...BYTE_AXIS }, // 4: z-size
        { name: 'Cache', ...BYTE_AXIS }, // 5: z-cache
        { name: 'Blocks' }, // 6: z-blocks
        // 7: fragmentation % (secondary on z-blocks grid)
        {
          position: 'right',
          min: 0,
          max: 100,
          echarts: {
            gridIndex: 6,
            scale: true,
            splitNumber: 2,
            splitLine: { show: false },
            axisLabel: { formatter: (v: number) => `${v}%` },
          },
        },
      ],
      grid: [
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Memory'] },
        }, // 0: global (merged)
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Workers'] },
        }, // 1: w-mem
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col1', 'Workers'] },
        }, // 2: w-cache
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col2', 'Workers'] },
        }, // 3: w-io
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Zones'] },
        }, // 4: z-size
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col1', 'Zones'] },
        }, // 5: z-cache
        {
          ...GRID_CELL,
          echarts: { coordinateSystem: 'matrix', coord: ['col2', 'Zones'] },
        }, // 6: z-blocks
      ],
      series: [
        // Global (grid 0)
        {
          name: 'Process (res)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::proc_res_bytes'],
        },
        {
          name: 'Process (shr)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::proc_shr_bytes'],
        },
        {
          name: 'GreyCat (global)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::global_memory'],
        },
        {
          name: 'OS (total)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::os_total_bytes'],
        },
        {
          name: 'OS (used)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::os_used_bytes'],
        },
        {
          name: 'Process (virt)',
          type: 'line',
          gridIndex: 0,
          yCol: [1, 'runtime::RuntimeUsage::proc_virt_bytes'],
        },
        // Workers (grids 1-3)
        { name: 'Memory', type: 'line', gridIndex: 1, yCol: 2 },
        { name: 'Cache', type: 'line', gridIndex: 2, yCol: 3 },
        { name: 'Reads', type: 'line', gridIndex: 3, yCol: 4 },
        { name: 'Writes', type: 'line', gridIndex: 3, yCol: 5 },
        // Zones (grids 4-6)
        { name: 'Size', type: 'line', gridIndex: 4, yCol: 6 },
        { name: 'Cache (z)', type: 'line', gridIndex: 5, yCol: 7 },
        { name: 'Reserved', type: 'line', gridIndex: 6, yCol: 8 },
        { name: 'Committed', type: 'line', gridIndex: 6, yCol: 9 },
        {
          name: 'Fragmentation',
          type: 'line',
          gridIndex: 6,
          yCol: 10,
          yAxisIndex: 7,
          echarts: { lineStyle: { type: 'dashed' } },
        },
      ],
      tooltip: {
        enabled: true,
        trigger: 'axis',
        formatter: (params: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const all = Array.isArray(params) ? params : [params as any];
          if (all.length === 0) return '';
          const hoveredAxis = all[0].axisIndex;
          const arr =
            // oxlint-disable-next-line typescript/no-explicit-any
            hoveredAxis != null ? all.filter((p: any) => p.axisIndex === hoveredAxis) : all;
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
            const formatted =
              p.seriesName === 'Fragmentation'
                ? `${Number(y).toFixed(1)}%`
                : byteSeriesNames.has(p.seriesName)
                  ? gc.sdk.humanSize(Number(y))
                  : String(y);
            html += `<br/>${p.marker} ${p.seriesName}: <strong>${formatted}</strong>`;
          }
          return html;
        },
      },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
      echarts: {
        // Matrix layout
        matrix: {
          x: { show: false, data: ['col0', 'col1', 'col2'], levelSize: 0 },
          y: {
            data: [
              { value: 'Memory', size: 280 },
              { value: 'Workers', size: 220 },
              { value: 'Zones', size: 220 },
            ],
            levelSize: 70,
            label: { color: textColor },
          },
          dividerLineStyle: { color: borderColor },
          body: {
            data: [{ coord: [[0, 2], 0], mergeCells: true }],
          },
          top: 50,
          bottom: 60,
          width: '90%',
          left: 'center',
        },
        // Sync crosshair across grids
        axisPointer: {
          link: [{ xAxisIndex: allGridIndices }],
        },
        // Override dataZoom to target all x-axes
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: allGridIndices,
            bottom: 20,
            height: 25,
            left: '10%',
            right: '10%',
            textStyle: { color: textColor },
            borderColor,
            dataBackground: {
              lineStyle: { color: borderColor },
              areaStyle: { color: borderColor },
            },
          },
          { type: 'inside', xAxisIndex: allGridIndices },
        ],
        legend: {
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
      },
    })}
  />
) as GuiChart2;

document.body.appendChild(
  <app-layout title="Usage">
    {controls}
    {usageChart}
  </app-layout>,
);

// --- Periodic data refresh ---
async function tick() {
  try {
    const [table, info] = await Promise.all([
      fetchUsageTable(),
      gc.core.nodeTime.info([nt_usages]),
    ]);
    usageChart.value = table;
    const dtFmt = '%Y-%m-%dT%H:%M';
    const nodeInfo = info[0] as gc.core.NodeInfo<gc.core.time>;
    if (nodeInfo.from) {
      dateInput.setAttribute('min', gc.$.default.printTime(nodeInfo.from, undefined, dtFmt));
    }
    if (nodeInfo.to) {
      dateInput.setAttribute('max', gc.$.default.printTime(nodeInfo.to, undefined, dtFmt));
    }
  } catch (err) {
    console.error('Usage fetch error:', err);
  }
}

await tick();
setInterval(() => {
  // Only auto-refresh if viewing "now" (i.e. the datetime input matches current time within 2 poll intervals)
  const isLive = Math.abs(currentTimeMs - Date.now()) < POLL_INTERVAL_MS * 2;
  if (isLive) {
    currentTimeMs = Date.now();
    tick();
  }
}, POLL_INTERVAL_MS);
