import type { GuiChart2 } from '@greycat/web';

// --- Types ---

// export interface FlatUsageData {
//   times: unknown[];
//   osAvailMemory: number[];
//   osUsedMemory: number[];
//   processMemory: number[];
//   globalMemory: number[];
//   memoryDrift: number[];
//   workerCount: number;
//   workerMemoryTotal: number[];
//   workerCacheTotal: number[];
//   workerWritesTotal: number[];
//   workerReadsTotal: number[];
//   workerMemory: number[][];
//   workerCache: number[][];
//   workerWrites: number[][];
//   workerReads: number[][];
//   zoneCount: number;
//   zoneSizeTotal: number[];
//   zoneCommittedTotal: number[];
//   zoneReservedTotal: number[];
//   zoneBlocksTotal: number[];
//   zoneCacheTotal: number[];
//   rawZones: (gc.runtime.ZoneUsage[] | null)[];
// }

// // --- Gap detection ---

// const osAvailMemory: number[] = [];
// const osUsedMemory: number[] = [];
// const processMemory: number[] = [];
// const globalMemory: number[] = [];
// const memoryDrift: number[] = [];
// const workerMemory: number[][] = [];
// const workerCache: number[][] = [];
// const workerWrites: number[][] = [];
// const workerReads: number[][] = [];
// const workerMemoryTotal: number[] = [];
// const workerCacheTotal: number[] = [];
// const workerWritesTotal: number[] = [];
// const workerReadsTotal: number[] = [];
// const zoneSizeTotal: number[] = [];
// const zoneCommittedTotal: number[] = [];
// const zoneReservedTotal: number[] = [];
// const zoneBlocksTotal: number[] = [];
// const zoneCacheTotal: number[] = [];
// const rawZones: gc.runtime.ZoneUsage[][] = [];

// export function flattenUsageData(
//   table: gc.core.Table<[gc.core.time, gc.runtime.RuntimeUsage]>,
// ): FlatUsageData {
//   const nbRows = table.nbRows();
//   const times = table.cols[0] as gc.core.time[];
//   const usages = table.cols[1] as gc.runtime.RuntimeUsage[];

//   let workerCount = 0;
//   let zoneCount = 0;
//   if (nbRows > 0) {
//     workerCount = usages[0].workers.length;
//     zoneCount = usages[0].zones.length;
//   }

//   osAvailMemory.length = nbRows;
//   osUsedMemory.length = nbRows;
//   processMemory.length = nbRows;
//   globalMemory.length = nbRows;
//   memoryDrift.length = nbRows;
//   workerMemory.length = nbRows;
//   workerCache.length = nbRows;
//   workerWrites.length = nbRows;
//   workerReads.length = nbRows;
//   workerMemoryTotal.length = nbRows;
//   workerCacheTotal.length = nbRows;
//   workerWritesTotal.length = nbRows;
//   workerReadsTotal.length = nbRows;
//   zoneSizeTotal.length = nbRows;
//   zoneCommittedTotal.length = nbRows;
//   zoneReservedTotal.length = nbRows;
//   zoneBlocksTotal.length = nbRows;
//   zoneCacheTotal.length = nbRows;
//   rawZones.length = nbRows;

//   for (let i = 0; i < nbRows; i++) {
//     const ru = usages[i];

//     processMemory[i] = Number(ru.process_rss_memory);
//     globalMemory[i] = Number(ru.global_memory);
//     memoryDrift[i] = Number(ru.memory_drift);

//     let wmTotal = 0;
//     let wcTotal = 0;
//     let wwTotal = 0;
//     let wrTotal = 0;
//     const workers = ru.workers;
//     for (let w = 0; w < workerCount; w++) {
//       const wu = workers[w];
//       const mem = Number(wu.memory ?? 0);
//       const cache = Number(wu.cache ?? 0);
//       const writes = Number(wu.writes ?? 0);
//       const reads = Number(wu.reads ?? 0);
//       workerMemory[w].push(mem);
//       workerCache[w].push(cache);
//       workerWrites[w].push(writes);
//       workerReads[w].push(reads);
//       wmTotal += mem;
//       wcTotal += cache;
//       wwTotal += writes;
//       wrTotal += reads;
//     }
//     workerMemoryTotal.push(wmTotal);
//     workerCacheTotal.push(wcTotal);
//     workerWritesTotal.push(wwTotal);
//     workerReadsTotal.push(wrTotal);

//     let zsTotal = 0,
//       zcmTotal = 0,
//       zrTotal = 0,
//       zbTotal = 0,
//       zccTotal = 0;
//     const zones = ru.zones;
//     rawZones.push(zones ?? []);
//     if (zones) {
//       for (let z = 0; z < zones.length; z++) {
//         const zu = zones[z];
//         if (!zu) continue;
//         zsTotal += Number(zu.size ?? 0);
//         zcmTotal += Number(zu.committed_blocks ?? 0);
//         zrTotal += Number(zu.reserved_blocks ?? 0);
//         zbTotal += Number(zu.blocks ?? 0);
//         zccTotal += Number(zu.cache ?? 0);
//       }
//     }
//     zoneSizeTotal.push(zsTotal);
//     zoneCommittedTotal.push(zcmTotal);
//     zoneReservedTotal.push(zrTotal);
//     zoneBlocksTotal.push(zbTotal);
//     zoneCacheTotal.push(zccTotal);
//   }

//   return {
//     times,
//     osAvailMemory,
//     osUsedMemory,
//     processMemory,
//     globalMemory,
//     memoryDrift,
//     workerCount,
//     workerMemoryTotal,
//     workerCacheTotal,
//     workerWritesTotal,
//     workerReadsTotal,
//     workerMemory,
//     workerCache,
//     workerWrites,
//     workerReads,
//     zoneCount,
//     zoneSizeTotal,
//     zoneCommittedTotal,
//     zoneReservedTotal,
//     zoneBlocksTotal,
//     zoneCacheTotal,
//     rawZones,
//   };
// }

// --- Chart config helpers ---

export const BYTE_AXIS = { axisLabel: { formatter: (v: unknown) => gc.sdk.humanSize(Number(v)) } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function byteTooltip(params: any): string {
  const arr = Array.isArray(params) ? params : [params];
  if (arr.length === 0) return '';
  const axisVal = arr[0].axisValue ?? (Array.isArray(arr[0].value) ? arr[0].value[0] : undefined);
  const header =
    typeof axisVal === 'number'
      ? gc.$.default.printTime(gc.core.time.fromMs(Math.round(axisVal)))
      : String(axisVal ?? '');
  let html = header;
  for (const p of arr) {
    const y = Array.isArray(p.value) ? p.value[1] : p.value;
    html += `<br/>${p.marker} ${p.seriesName}: <strong>${gc.sdk.humanSize(Number(y))}</strong>`;
  }
  return html;
}

export const BYTE_TOOLTIP = { enabled: true, trigger: 'axis' as const, formatter: byteTooltip };
export const DEFAULT_TOOLTIP = { enabled: true, trigger: 'axis' as const };
export const CHART_H = 'height: 250px;';

// --- Time windows ---

export interface TimeWindow {
  label: string;
  durationMs: number;
  axisFormat: string;
}

export const TIME_WINDOWS: TimeWindow[] = [
  { label: '1h', durationMs: 60 * 60 * 1000, axisFormat: '%H:%M:%S' },
  { label: '6h', durationMs: 6 * 60 * 60 * 1000, axisFormat: '%d/%m %H:%M' },
  { label: '24h', durationMs: 24 * 60 * 60 * 1000, axisFormat: '%a %d %H:%M' },
  { label: '1w', durationMs: 7 * 24 * 60 * 60 * 1000, axisFormat: '%a %d %H:%M' },
  { label: '1m', durationMs: 30 * 24 * 60 * 60 * 1000, axisFormat: '%d %b' },
];

// --- Shared polling state ---

export type UsageTable = gc.core.Table<[gc.core.time, gc.runtime.RuntimeUsage]>;
let greycat: gc.sdk.GreyCat;
let activeWindow: TimeWindow = TIME_WINDOWS[0];
let lastData: UsageTable | null = null;
let polling = true;
let interval: ReturnType<typeof setInterval> | null = null;
const listeners: Array<(data: UsageTable) => void> = [];
const allCharts: GuiChart2[] = [];

export function getLastData(): UsageTable | null {
  return lastData;
}

export function getActiveWindow(): TimeWindow {
  return activeWindow;
}

export function registerChart(chart: GuiChart2): void {
  allCharts.push(chart);
}

export function onData(fn: (data: UsageTable) => void): void {
  listeners.push(fn);
}

function applyAxisFormat(fmt: string) {
  const formatter = (value: unknown) => {
    return gc.$.default.printTime(gc.core.time.fromMs(Math.round(Number(value))), undefined, fmt);
  };
  for (const chart of allCharts) {
    const cfg = chart.config;
    if (!cfg) continue;
    const xAxis = Array.isArray(cfg.xAxis) ? cfg.xAxis[0] : cfg.xAxis;
    if (xAxis && xAxis.type === 'time') {
      xAxis.axisLabel = { ...xAxis.axisLabel, formatter };
    }
    chart.config = cfg;
  }
}

let usages: gc.core.nodeTime<gc.runtime.RuntimeUsage> | undefined;

async function fetchAndUpdate() {
  try {
    if (!usages) {
      const root = await greycat.root();
      usages = root['runtime::usages'] as gc.core.nodeTime<gc.runtime.RuntimeUsage>;
      if (!usages) {
        return;
      }
    }

    const from = gc.core.time.fromMs(Date.now() - activeWindow.durationMs);
    const table = await usages.sample(
      from,
      null,
      1000,
      gc.core.SamplingMode.adaptative,
      null,
      null,
    );

    const data = flattenUsageData(table);
    lastData = data;

    for (const fn of listeners) {
      fn(data);
    }
  } catch (err) {
    console.error('Usage fetch error:', err);
  }
}

function togglePolling() {
  polling = !polling;
  if (polling) {
    interval = setInterval(fetchAndUpdate, 5_000);
  } else if (interval) {
    clearInterval(interval);
    interval = null;
  }
  pollBtn.textContent = polling ? 'Auto-refresh: ON' : 'Auto-refresh: OFF';
}

function selectWindow(tw: TimeWindow) {
  activeWindow = tw;
  for (const { tw: t, btn } of windowBtns) {
    btn.setAttribute('variant', t === tw ? 'primary' : 'default');
  }
  applyAxisFormat(tw.axisFormat);
  fetchAndUpdate();
}

// --- Shared UI elements ---

const pollBtn = (
  <sl-button variant="text" size="small" onclick={togglePolling}>
    Auto-refresh: ON
  </sl-button>
) as HTMLElement;

const refreshBtn = (
  <sl-button variant="text" size="small" onclick={() => fetchAndUpdate()}>
    Refresh
  </sl-button>
) as HTMLElement;

const windowBtns = TIME_WINDOWS.map((tw) => {
  const btn = (
    <sl-button
      size="small"
      variant={tw === activeWindow ? 'primary' : 'default'}
      onclick={() => selectWindow(tw)}
    >
      {tw.label}
    </sl-button>
  ) as HTMLElement;
  return { tw, btn };
});

const windowGroup = (
  <sl-button-group style="margin-right: 8px;">{windowBtns.map(({ btn }) => btn)}</sl-button-group>
) as HTMLElement;

export const actionBar = (
  <div slot="action">
    {windowGroup}
    {pollBtn}
    {refreshBtn}
  </div>
) as HTMLElement;

/**
 * Initialize the shared usage module. Must be called once before any page uses the data.
 */
export async function init(g: gc.sdk.GreyCat): Promise<void> {
  greycat = g;
  applyAxisFormat(activeWindow.axisFormat);
  await fetchAndUpdate();
  interval = setInterval(fetchAndUpdate, 5_000);
}
