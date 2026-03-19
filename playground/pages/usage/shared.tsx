import type { GuiChart2, Chart2Config } from '@greycat/web';

// --- Types ---

export type N = number | null;

export interface FlatUsageData {
  times: unknown[];
  processMemory: N[];
  globalMemory: N[];
  memoryDrift: N[];
  workerCount: number;
  workerMemoryTotal: N[];
  workerCacheTotal: N[];
  workerWritesTotal: N[];
  workerReadsTotal: N[];
  workerMemory: N[][];
  workerCache: N[][];
  workerWrites: N[][];
  workerReads: N[][];
  zoneCount: number;
  zoneSizeTotal: N[];
  zoneCommittedTotal: N[];
  zoneReservedTotal: N[];
  zoneBlocksTotal: N[];
  zoneCacheTotal: N[];
  rawZones: (gc.runtime.ZoneUsage[] | null)[];
}

// --- Gap detection ---

const GAP_THRESHOLD_MS = 15_000;

export function flattenUsageData(table: gc.core.Table): FlatUsageData {
  const nbRows = table.nbRows();
  const srcTimes = table.cols[0];
  const srcUsages = table.cols[1];

  let workerCount = 0;
  let zoneCount = 0;
  for (let i = 0; i < nbRows; i++) {
    const ru = srcUsages[i] as gc.runtime.RuntimeUsage | null;
    if (ru == null) continue;
    if (ru.workers && ru.workers.length > workerCount) workerCount = ru.workers.length;
    if (ru.zones && ru.zones.length > zoneCount) zoneCount = ru.zones.length;
  }

  const times: unknown[] = [];
  const processMemory: N[] = [];
  const globalMemory: N[] = [];
  const memoryDrift: N[] = [];
  const workerMemory: N[][] = Array.from({ length: workerCount }, () => []);
  const workerCache: N[][] = Array.from({ length: workerCount }, () => []);
  const workerWrites: N[][] = Array.from({ length: workerCount }, () => []);
  const workerReads: N[][] = Array.from({ length: workerCount }, () => []);
  const workerMemoryTotal: N[] = [];
  const workerCacheTotal: N[] = [];
  const workerWritesTotal: N[] = [];
  const workerReadsTotal: N[] = [];
  const zoneSizeTotal: N[] = [];
  const zoneCommittedTotal: N[] = [];
  const zoneReservedTotal: N[] = [];
  const zoneBlocksTotal: N[] = [];
  const zoneCacheTotal: N[] = [];
  const rawZones: (gc.runtime.ZoneUsage[] | null)[] = [];

  let prevEpochMs = -1;

  function pushNull(gapTime: unknown) {
    times.push(gapTime);
    processMemory.push(null);
    globalMemory.push(null);
    memoryDrift.push(null);
    for (let w = 0; w < workerCount; w++) {
      workerMemory[w].push(null);
      workerCache[w].push(null);
      workerWrites[w].push(null);
      workerReads[w].push(null);
    }
    workerMemoryTotal.push(null);
    workerCacheTotal.push(null);
    workerWritesTotal.push(null);
    workerReadsTotal.push(null);
    zoneSizeTotal.push(null);
    zoneCommittedTotal.push(null);
    zoneReservedTotal.push(null);
    zoneBlocksTotal.push(null);
    zoneCacheTotal.push(null);
    rawZones.push(null);
  }

  for (let i = 0; i < nbRows; i++) {
    const t = srcTimes[i];
    const epochMs = t instanceof gc.core.time ? Math.round(t.epochMs) : Number(t);
    if (prevEpochMs >= 0 && epochMs - prevEpochMs > GAP_THRESHOLD_MS) {
      pushNull(gc.core.time.fromMs(Math.round((prevEpochMs + epochMs) / 2)));
    }
    prevEpochMs = epochMs;

    const ru = srcUsages[i] as gc.runtime.RuntimeUsage | null;
    times.push(t);

    if (ru == null) {
      pushNull(t);
      times.pop();
      continue;
    }

    processMemory.push(Number(ru.process_memory ?? 0));
    globalMemory.push(Number(ru.global_memory ?? 0));
    memoryDrift.push(Number(ru.memory_drift ?? 0));

    let wmTotal = 0,
      wcTotal = 0,
      wwTotal = 0,
      wrTotal = 0;
    const workers = ru.workers;
    for (let w = 0; w < workerCount; w++) {
      const wu = workers?.[w];
      const mem = wu ? Number(wu.memory ?? 0) : 0;
      const cache = wu ? Number(wu.cache ?? 0) : 0;
      const writes = wu ? Number(wu.writes ?? 0) : 0;
      const reads = wu ? Number(wu.reads ?? 0) : 0;
      workerMemory[w].push(mem);
      workerCache[w].push(cache);
      workerWrites[w].push(writes);
      workerReads[w].push(reads);
      wmTotal += mem;
      wcTotal += cache;
      wwTotal += writes;
      wrTotal += reads;
    }
    workerMemoryTotal.push(wmTotal);
    workerCacheTotal.push(wcTotal);
    workerWritesTotal.push(wwTotal);
    workerReadsTotal.push(wrTotal);

    let zsTotal = 0,
      zcmTotal = 0,
      zrTotal = 0,
      zbTotal = 0,
      zccTotal = 0;
    const zones = ru.zones;
    rawZones.push(zones ?? []);
    if (zones) {
      for (let z = 0; z < zones.length; z++) {
        const zu = zones[z];
        if (!zu) continue;
        zsTotal += Number(zu.size ?? 0);
        zcmTotal += Number(zu.committed_blocks ?? 0);
        zrTotal += Number(zu.reserved_blocks ?? 0);
        zbTotal += Number(zu.blocks ?? 0);
        zccTotal += Number(zu.cache ?? 0);
      }
    }
    zoneSizeTotal.push(zsTotal);
    zoneCommittedTotal.push(zcmTotal);
    zoneReservedTotal.push(zrTotal);
    zoneBlocksTotal.push(zbTotal);
    zoneCacheTotal.push(zccTotal);
  }

  return {
    times,
    processMemory,
    globalMemory,
    memoryDrift,
    workerCount,
    workerMemoryTotal,
    workerCacheTotal,
    workerWritesTotal,
    workerReadsTotal,
    workerMemory,
    workerCache,
    workerWrites,
    workerReads,
    zoneCount,
    zoneSizeTotal,
    zoneCommittedTotal,
    zoneReservedTotal,
    zoneBlocksTotal,
    zoneCacheTotal,
    rawZones,
  };
}

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

let greycat: gc.sdk.GreyCat;
let activeWindow: TimeWindow = TIME_WINDOWS[0];
let lastData: FlatUsageData | null = null;
let polling = true;
let interval: ReturnType<typeof setInterval> | null = null;
const listeners: Array<(data: FlatUsageData) => void> = [];
const allCharts: GuiChart2[] = [];

export function getLastData(): FlatUsageData | null {
  return lastData;
}

export function getActiveWindow(): TimeWindow {
  return activeWindow;
}

export function registerChart(chart: GuiChart2): void {
  allCharts.push(chart);
}

export function onData(fn: (data: FlatUsageData) => void): void {
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

async function fetchAndUpdate() {
  try {
    const root = await greycat.root();
    const usages = root['runtime::usages'] as gc.core.nodeTime;
    if (!usages) return;

    const from = gc.core.time.fromMs(Date.now() - activeWindow.durationMs);
    const table = await usages.sample(
      from,
      null,
      1000,
      gc.core.SamplingMode.adaptative,
      null,
      null,
    );
    if (table.nbRows() === 0) return;

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
