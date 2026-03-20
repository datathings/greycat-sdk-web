import { chart2Config, type Chart2Grid, getThemeColors, type GuiChart2 } from '../../exports.js';
import { GuiElement } from '../element.js';

const POLL_INTERVAL_MS = 5_000;

const BYTE_AXIS = { axisLabel: { formatter: (v: unknown) => gc.sdk.humanSize(Number(v)) } };

const TIME_WINDOWS = [
  { label: '1h', ms: 60 * 60 * 1000 },
  { label: '6h', ms: 6 * 60 * 60 * 1000 },
  { label: '1d', ms: 24 * 60 * 60 * 1000 },
  { label: '1w', ms: 7 * 24 * 60 * 60 * 1000 },
  { label: '1m', ms: 30 * 24 * 60 * 60 * 1000 },
];

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

export interface GuiRuntimeUsageAttrs {
  maxRows: number;
  time: number;
  window: number;
  greycat: gc.sdk.GreyCat;
}

export class GuiRuntimeUsage extends GuiElement {
  private _maxRows = 1000;
  private _timeMs = Date.now();
  private _windowMs = TIME_WINDOWS[0].ms;
  private _greycat: gc.sdk.GreyCat = gc.$.default;
  private _pollTimer: ReturnType<typeof setInterval> | undefined;
  private _ntUsages!: gc.core.nodeTime;

  // Reusable arrays (reset & reused each tick to ease GC)
  private _w_mem: number[] = [];
  private _w_cache: number[] = [];
  private _w_reads: number[] = [];
  private _w_writes: number[] = [];
  private _z_size: number[] = [];
  private _z_cache: number[] = [];
  private _z_refs: number[] = [];
  private _z_comm: number[] = [];
  private _z_blocks: number[] = [];
  private _z_frag: number[] = [];

  // DOM refs
  private _chart!: GuiChart2;
  private _dateInput!: HTMLElement;
  private _rowsInput!: HTMLElement;
  private _windowBtns!: HTMLElement[];

  get maxRows(): number {
    return this._maxRows;
  }

  set maxRows(v: number) {
    this._maxRows = v;
    this._tick();
  }

  get time(): number {
    return this._timeMs;
  }

  set time(v: number) {
    this._timeMs = v;
    this._tick();
  }

  get window(): number {
    return this._windowMs;
  }

  set window(v: number) {
    this._windowMs = v;
    this._updateWindowBtns();
    this._tick();
  }

  setAttrs({
    maxRows = this._maxRows,
    time = this._timeMs,
    window: windowMs = this._windowMs,
    greycat = this._greycat,
  }: Partial<GuiRuntimeUsageAttrs>): void {
    this._maxRows = maxRows;
    this._timeMs = time;
    this._windowMs = windowMs;
    this._greycat = greycat;
  }

  constructor() {
    super();
    this._buildDOM();
  }

  async connectedCallback(): Promise<void> {
    const root = await this._greycat.root();
    this._ntUsages = root['runtime::usages'];
    await this._tick();
    this._pollTimer = setInterval(() => {
      const isLive = Math.abs(this._timeMs - Date.now()) < POLL_INTERVAL_MS * 2;
      if (isLive) {
        this._timeMs = Date.now();
        this._tick();
      }
    }, POLL_INTERVAL_MS);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._pollTimer !== undefined) {
      clearInterval(this._pollTimer);
      this._pollTimer = undefined;
    }
  }

  private async _fetchUsageTable(): Promise<gc.core.Table> {
    const to = gc.core.time.fromMs(Math.round(this._timeMs));
    const from = gc.core.time.fromMs(Math.round(this._timeMs - this._windowMs));

    const usage_table = await this._ntUsages.sample(
      from,
      to,
      this._maxRows,
      gc.core.SamplingMode.adaptative,
      null,
      null,
    );

    const nb_rows = usage_table.nbRows();
    const usages = usage_table.cols[1] as gc.runtime.RuntimeUsage[];

    const { _w_mem, _w_cache, _w_reads, _w_writes, _z_size, _z_cache, _z_refs, _z_comm, _z_blocks, _z_frag } = this;

    // Reset arrays
    _w_mem.length = _w_cache.length = _w_reads.length = _w_writes.length = nb_rows;
    _z_size.length = _z_cache.length = _z_refs.length = _z_comm.length = _z_blocks.length = _z_frag.length = nb_rows;
    _w_mem.fill(0);
    _w_cache.fill(0);
    _w_reads.fill(0);
    _w_writes.fill(0);
    _z_size.fill(0);
    _z_cache.fill(0);
    _z_refs.fill(0);
    _z_comm.fill(0);
    _z_blocks.fill(0);
    _z_frag.fill(0);

    for (let i = 0; i < nb_rows; i++) {
      for (let wid = 0; wid < usages[0].workers.length; wid++) {
        const w = usages[i].workers[wid];
        _w_mem[i] += Number(w.memory);
        _w_cache[i] += Number(w.cache);
        _w_reads[i] += Number(w.reads);
        _w_writes[i] += Number(w.writes);
      }
      for (let zid = 0; zid < usages[0].zones.length; zid++) {
        const z = usages[i].zones[zid];
        _z_size[i] += Number(z.size);
        _z_cache[i] += Number(z.cache);
        _z_refs[i] += Number(z.reserved_blocks);
        _z_comm[i] += Number(z.committed_blocks);
        _z_blocks[i] += Number(z.blocks);
      }
      _z_frag[i] = _z_blocks[i] > 0 ? ((_z_blocks[i] - _z_comm[i]) / _z_blocks[i]) * 100 : 0;
    }

    return gc.core.Table.fromCols([
      usage_table.cols[0], // 0: time
      usages, // 1: RuntimeUsage
      [..._w_mem], // 2
      [..._w_cache], // 3
      [..._w_reads], // 4
      [..._w_writes], // 5
      [..._z_size], // 6
      [..._z_cache], // 7
      [..._z_refs], // 8
      [..._z_comm], // 9
      [..._z_frag], // 10
    ]);
  }

  private async _tick(): Promise<void> {
    if (!this._ntUsages) {
      return;
    }

    try {
      const [table, info] = await Promise.all([
        this._fetchUsageTable(),
        gc.core.nodeTime.info([this._ntUsages]),
      ]);
      this._chart.value = table;
      const dtFmt = '%Y-%m-%dT%H:%M';
      const nodeInfo = info[0] as gc.core.NodeInfo<gc.core.time>;
      if (nodeInfo.from) {
        this._dateInput.setAttribute('min', gc.$.default.printTime(nodeInfo.from, undefined, dtFmt));
      }
      if (nodeInfo.to) {
        this._dateInput.setAttribute('max', gc.$.default.printTime(nodeInfo.to, undefined, dtFmt));
      }
      if (nodeInfo.from && nodeInfo.to) {
        const spanMs = nodeInfo.to.epochMs - nodeInfo.from.epochMs;
        const DAY = 86_400_000;
        const YEAR = 365 * DAY;
        let fromFmt: string, toFmt: string;
        if (spanMs < DAY) {
          fromFmt = '%d/%m/%Y %H:%M';
          toFmt = '%H:%M';
        } else if (spanMs < 30 * DAY) {
          fromFmt = '%d/%m %H:%M';
          toFmt = '%d/%m %H:%M';
        } else if (spanMs < YEAR) {
          fromFmt = '%d/%m/%Y %H:%M';
          toFmt = '%d/%m %H:%M';
        } else {
          fromFmt = '%d/%m/%Y';
          toFmt = '%d/%m/%Y';
        }
        this._dateInput.setAttribute(
          'label',
          `Time (${gc.$.default.printTime(nodeInfo.from, undefined, fromFmt)} — ${gc.$.default.printTime(nodeInfo.to, undefined, toFmt)})`,
        );

        // Disable time window buttons that exceed the actual data timespan
        for (let i = 0; i < TIME_WINDOWS.length; i++) {
          if (TIME_WINDOWS[i].ms > spanMs) {
            this._windowBtns[i].setAttribute('disabled', '');
          } else {
            this._windowBtns[i].removeAttribute('disabled');
          }
        }
      }
    } catch (err) {
      console.error('Usage fetch error:', err);
    }
  }

  private _updateWindowBtns(): void {
    for (let j = 0; j < this._windowBtns.length; j++) {
      this._windowBtns[j].setAttribute(
        'variant',
        TIME_WINDOWS[j].ms === this._windowMs ? 'primary' : 'default',
      );
    }
  }

  private _buildDOM(): void {
    this._rowsInput = (
      <sl-input
        type="number"
        size="small"
        value={String(this._maxRows)}
        min="10"
        max="100000"
        label="Max rows"
        style="width: 120px"
        onsl-change={(e: Event) => {
          this._maxRows = Number((e.target as HTMLInputElement).value) || 1000;
          this._tick();
        }}
      />
    ) as HTMLElement;

    this._dateInput = (
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
            this._timeMs = new Date(val).getTime();
          } else {
            this._timeMs = Date.now();
          }
          this._tick();
        }}
      />
    ) as HTMLElement;

    this._windowBtns = TIME_WINDOWS.map((tw, i) => {
      return (
        <sl-button
          size="small"
          variant={i === 0 ? 'primary' : 'default'}
          onclick={() => {
            this._windowMs = tw.ms;
            this._updateWindowBtns();
            this._tick();
          }}
        >
          {tw.label}
        </sl-button>
      ) as HTMLElement;
    });

    const { textColor, borderColor } = getThemeColors();

    this._chart = (
      <gui-chart2
        style={{ width: '100%', height: '800px' }}
        config={chart2Config({
          xCol: 0,
          xAxis: [
            { type: 'time' },
            { type: 'time', echarts: { splitNumber: 3 } },
            { type: 'time', echarts: { splitNumber: 3 } },
            { type: 'time', echarts: { splitNumber: 3 } },
            { type: 'time', echarts: { splitNumber: 3 } },
            { type: 'time', echarts: { splitNumber: 3 } },
            { type: 'time', echarts: { splitNumber: 3 } },
          ],
          yAxis: [
            { name: 'Memory', ...BYTE_AXIS },
            { name: 'Memory', ...BYTE_AXIS },
            { name: 'Cache' },
            { name: 'I/O', ...BYTE_AXIS },
            { name: 'Size', ...BYTE_AXIS },
            { name: 'Cache', ...BYTE_AXIS },
            { name: 'Blocks' },
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
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Memory'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Workers'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col1', 'Workers'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col2', 'Workers'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col0', 'Zones'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col1', 'Zones'] } },
            { ...GRID_CELL, echarts: { coordinateSystem: 'matrix', coord: ['col2', 'Zones'] } },
          ],
          series: [
            { name: 'Process (res)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::proc_res_bytes'] },
            { name: 'Process (shr)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::proc_shr_bytes'] },
            { name: 'GreyCat (global)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::global_memory'] },
            { name: 'OS (total)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::os_total_bytes'] },
            { name: 'OS (used)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::os_used_bytes'] },
            { name: 'Process (virt)', type: 'line', gridIndex: 0, yCol: [1, 'runtime::RuntimeUsage::proc_virt_bytes'] },
            { name: 'Memory', type: 'line', gridIndex: 1, yCol: 2 },
            { name: 'Cache', type: 'line', gridIndex: 2, yCol: 3 },
            { name: 'Reads', type: 'line', gridIndex: 3, yCol: 4 },
            { name: 'Writes', type: 'line', gridIndex: 3, yCol: 5 },
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
            axisPointer: {
              link: [{ xAxisIndex: allGridIndices }],
            },
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

    const controls = (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '8px 5%' }}>
        {this._rowsInput}
        {this._dateInput}
        <sl-button-group>{...this._windowBtns}</sl-button-group>
      </div>
    ) as HTMLElement;

    this.shadowRoot.append(controls, this._chart);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-runtime-usage': GuiRuntimeUsage;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-runtime-usage': GreyCat.Element<GuiRuntimeUsage>;
      }
    }
  }
}
