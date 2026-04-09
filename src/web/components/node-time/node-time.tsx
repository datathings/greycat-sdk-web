import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

import {
  GuiElement,
  type GuiTable,
  type GuiInputNumber,
  type GuiInputEnum,
  type GuiInputDuration,
  type GuiTableProps,
  registerCustomElement,
  css,
  type GuiTabs,
  type sl,
  smartTimeFormatSpecifier,
} from '../../exports.js';
import { getColors, debounce } from '../../utils.js';
import { getThemeColors, buildAxis, inferConfig2, mergeChartConfig } from '../chart2/utils.js';
import { GuiChart2ConfigUpdateEvent } from '../chart2/chart2.js';
import type { Chart2Config } from '../chart2/types.js';
import { vMap } from '../chart/internals.js';
import style from './node-time.css?inline';

/**
 * Visualizes one or more `nodeTime` series with adaptive sampling and a full-range overview slider.
 *
 * ## Properties
 * - `value` — a single `nodeTime` or an array of `nodeTime`. Resets all state on change.
 * - `names` — optional string array (1:1 with `value`). Prefixes series names:
 *   if a nodeTime produces one column → just the name; multiple columns → `name.field`.
 * - `globalFrom` / `globalTo` — override the slider full range. If unset, auto-detected from `nodeTime.info()`.
 * - `from` / `to` — set the initial detail window. The slider starts at the corresponding position.
 * - `controls` — boolean, shows/hides the controls bar (maxRows, mode, maxDephasing). Hidden by default.
 * - `maxRows` — max sample rows (default 500). Affects both overview and detail.
 * - `samplingMode` — `SamplingMode.adaptative` (default) or `dense`.
 * - `maxDephasing` — max time dephasing for sampling.
 * - `mappings` — custom `TableColumnMapping[]` for flattening. If unset, inferred automatically.
 * - `tableConfig` — configure the `gui-table` view.
 * - `activeTab` — `"Table"` or `"Chart"` to set the initially active tab.
 *
 * ## Architecture — two samplings, one ECharts instance
 * - **Overview series** (invisible): full-range sampled data, cached until the nodeTime bounds change.
 *   Placed first in the series array so ECharts uses them for the slider data shadow.
 *   Also anchors the xAxis to the full time range so dataZoom percentages map correctly.
 * - **Detail series** (visible): window-sampled data at higher resolution, re-fetched on every zoom/pan.
 *   Uses a separate hidden yAxis so the visible yAxis auto-scales to the zoomed data range.
 *
 * ## Slider behavior
 * - Always represents the full time range of the series (or `globalFrom`/`globalTo` if set).
 * - Data shadow always shows the full distribution (from overview series).
 * - Mouse wheel zoom and slider drag both fire `datazoom`, triggering a debounced re-fetch.
 * - Double-click resets zoom to 0-100% and re-fetches full range.
 *
 * ## Points label
 * Always visible in the top-right overlay. Shows `visible / total`.
 * Updated instantly on zoom (estimated from overlap), then again after re-fetch with the actual count.
 *
 * ## Config drawer
 * Right-click the chart to open the config drawer (powered by `gui-chart2-config`).
 * Legend visibility and config "Visible" checkbox are bidirectionally synced.
 *
 * ## Overview cache invalidation
 * Each debounced re-fetch calls `nodeTime.info()` first. If `from`/`to` bounds changed
 * (e.g. new data ingested), the overview is re-fetched and the chart fully rebuilt.
 *
 * @example
 * ```tsx
 * <gui-node-time
 *   value={[nt_multi, nt_temp]}
 *   names={['sensor', 'temp']}
 *   activeTab="Chart"
 *   controls
 * />
 * ```
 */
export class GuiNodeTime extends GuiElement {
  static override styles = [css(style)];

  // --- ECharts instance & observers ---
  private _chartContainer!: HTMLDivElement;
  private _echart: echarts.ECharts | null = null;
  private _resizeObs!: ResizeObserver;
  private _mutationObs!: MutationObserver;
  private _drawer!: sl.SlDrawer;
  private _configEl: GuiChart2Config | null = null;
  private _detailConfig: Chart2Config | undefined;
  private _chartConfig: Partial<Chart2Config> | undefined;

  // --- Table view ---
  private _table!: GuiTable;
  private _tableShowFlat = true;
  private _tableModeGroup!: HTMLElement;
  private _btnRaw!: sl.SlButton;
  private _btnFlat!: sl.SlButton;
  private _tabs!: GuiTabs;
  private _isTableTab = true;
  private _pointsLabel!: HTMLSpanElement;
  private _controlsEl!: HTMLDivElement;
  private _showControls = false;
  private _pendingTab: string | undefined;

  // --- nodeTime state ---
  private _nodeTimes: gc.core.nodeTime[] = [];
  private _names: string[] | undefined;
  private _userGlobalFrom: gc.core.time | undefined;
  private _userGlobalTo: gc.core.time | undefined;
  private _userFrom: gc.core.time | undefined;
  private _userTo: gc.core.time | undefined;
  private _mappings: gc.core.TableColumnMapping[] | undefined;
  private _tableConfig: Partial<GuiTableProps> | undefined;
  private _maxRows = 500;
  private _samplingMode: gc.core.SamplingMode = gc.core.SamplingMode.adaptative;
  private _maxDephasing: gc.core.duration | null = null;

  // --- Sampling state ---
  private _fullFrom: gc.core.time | undefined;
  private _fullTo: gc.core.time | undefined;
  private _totalSize = 0;
  private _inferredMappings: gc.core.TableColumnMapping[] | null = null;
  private _overviewTable: gc.core.Table | undefined;
  private _detailTable: gc.core.Table | undefined;
  private _rawTable: gc.core.Table | undefined;
  private _detailRows = 0;
  private _detailFromMs = 0;
  private _detailToMs = 0;
  private _currentStart = 0;
  private _currentEnd = 100;
  private _debounceTimer: ReturnType<typeof setTimeout> | undefined;
  private _fetchGeneration = 0;
  /** Column names detected from the first flattened table. */
  private _seriesNames: string[] = [];
  /** Column indices of numeric series in the flattened table. */
  private _numericCols: number[] = [];
  /** For each entry in _numericCols, the index of its corresponding time column. */
  private _timeColForSeries: number[] = [];

  constructor() {
    super();

    // --- Chart container ---
    this._chartContainer = document.createElement('div');
    this._chartContainer.classList.add('chart-container');

    this._chartContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this._toggleConfig();
    });

    // --- Config drawer ---
    this._drawer = document.createElement('sl-drawer') as sl.SlDrawer;
    this._drawer.contained = true;
    this._drawer.open = false;
    this._drawer.label = 'Chart config';

    const resetBtn = document.createElement('sl-button') as sl.SlButton;
    resetBtn.textContent = 'Reset';
    resetBtn.size = 'small';
    resetBtn.style.alignSelf = 'center';
    resetBtn.onclick = () => {
      this._detailConfig = undefined;
      this._updateConfigEl();
      this._renderChart();
    };
    const resetTooltip = document.createElement('sl-tooltip') as sl.SlTooltip;
    const resetTooltipContent = document.createElement('div');
    resetTooltipContent.slot = 'content';
    resetTooltipContent.innerHTML = `Resets the config.<br/><br/>This will re-create a new config by analyzing the current table.<br/><br/><strong>The current configuration will be lost</strong>`;
    resetTooltip.appendChild(resetTooltipContent);
    resetTooltip.slot = 'header-actions';
    resetTooltip.appendChild(resetBtn);
    this._drawer.appendChild(resetTooltip);

    // --- Resize observer (same pattern as gui-chart2) ---
    const debouncedResize = debounce(() => this._echart?.resize(), 100);
    let lastWidth = 0;
    let lastHeight = 0;
    this._resizeObs = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        lastWidth = 0;
        lastHeight = 0;
        return;
      }
      if (lastWidth === 0 && lastHeight === 0) {
        this._echart?.resize();
      } else {
        debouncedResize();
      }
      lastWidth = rect.width;
      lastHeight = rect.height;
    });

    // --- Theme change observer ---
    this._mutationObs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme' || m.attributeName === 'class') {
          this._renderChart();
          break;
        }
      }
    });

    // --- Table view ---
    this._table = (<gui-table />) as GuiTable;
    this._table.style.width = '100%';
    this._table.style.flex = '1';
    this._table.style.minHeight = '0';

    this._btnRaw = (<sl-button size="small">Raw</sl-button>) as sl.SlButton;
    this._btnFlat = (
      <sl-button size="small" variant="primary">
        Flat
      </sl-button>
    ) as sl.SlButton;
    this._btnRaw.addEventListener('click', () => this._setTableMode(false));
    this._btnFlat.addEventListener('click', () => this._setTableMode(true));

    this._tableModeGroup = (
      <sl-button-group>
        {this._btnRaw}
        {this._btnFlat}
      </sl-button-group>
    ) as HTMLElement;
    this._tableModeGroup.style.visibility = 'hidden';

    // --- Points label (always visible in the overlay bar) ---
    this._pointsLabel = (<span className="points-label" title="displayed points / total points" />) as HTMLSpanElement;

    // --- Controls bar (hidden by default) ---
    this._controlsEl = (
      <div className="controls">
        <gui-input-number
          label="maxRows"
          size="small"
          value={this._maxRows}
          ongui-change={(e: CustomEvent) => {
            this.maxRows = (e.target as GuiInputNumber).value ?? 500;
          }}
        />
        <gui-input-enum
          label="mode"
          type="core::SamplingMode"
          size="small"
          value={this._samplingMode}
          ongui-change={(e: CustomEvent) => {
            const v = (e.target as GuiInputEnum).value;
            if (v) {
              this.samplingMode = v as unknown as gc.core.SamplingMode;
            }
          }}
        />
        <gui-input-duration
          className="max-dephasing"
          label="maxDephasing"
          size="small"
          ongui-change={(e: CustomEvent) => {
            this.maxDephasing = (e.target as GuiInputDuration).value;
          }}
        />
      </div>
    ) as HTMLDivElement;
    this._controlsEl.style.display = 'none';

    // --- Tabs (Table / Chart) ---
    this._tabs = (
      <gui-tabs preservePanel>
        <gui-tab slot="tab" active>
          Table
        </gui-tab>
        <gui-tab slot="tab">Chart</gui-tab>
        <gui-panel slot="panel" tab="Table">
          {this._table}
        </gui-panel>
        <gui-panel slot="panel" tab="Chart">
          {this._chartContainer}
          {this._drawer}
        </gui-panel>
      </gui-tabs>
    ) as GuiTabs;

    this._tabs.addEventListener('gui-tab-change', (e) => {
      this._isTableTab = (e as CustomEvent).detail?.textContent === 'Table';
      this._tableModeGroup.style.visibility =
        this._isTableTab && this._rawTable !== this._detailTable ? '' : 'hidden';
      if (this._isTableTab) {
        // re-fetch for current zoom window so the table matches the chart view
        const zoom = this._currentZoomRange();
        if (zoom) {
          if (this._debounceTimer) {
            clearTimeout(this._debounceTimer);
            this._debounceTimer = undefined;
          }
          this._fetchAndRender(zoom.from, zoom.to);
        }
      } else {
        // resize chart when switching to Chart tab (container may have been hidden)
        this._echart?.resize();
      }
    });

    this.shadowRoot.appendChild(this._controlsEl);
    this.shadowRoot.appendChild(
      <div className="tabs-wrapper">
        {this._tabs}
        <div className="overlay-bar">
          {this._tableModeGroup}
          {this._pointsLabel}
        </div>
      </div>,
    );
  }

  // --- Lifecycle ---

  /** Initialize ECharts, start observers, register event listeners. */
  connectedCallback(): void {
    this._echart = echarts.init(this._chartContainer);
    this._resizeObs.observe(this._chartContainer);
    this._mutationObs.observe(document.documentElement, { attributes: true });

    this._echart.on('datazoom', (params) => {
      this._onSelection(params as unknown as DataZoomParams);
    });

    // sync legend toggle → detailConfig.series[].hide
    this._echart.on('legendselectchanged', (params) => {
      this._syncLegendToConfig((params as { selected: Record<string, boolean> }).selected);
    });

    this._chartContainer.addEventListener('dblclick', () => {
      this._echart?.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
    });

    // apply pending tab selection (deferred so gui-tabs is fully connected)
    if (this._pendingTab) {
      const tab = this._pendingTab;
      this._pendingTab = undefined;
      queueMicrotask(() => this._tabs.selectTab(tab));
    }
  }

  /** Dispose ECharts, disconnect observers. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObs.disconnect();
    this._mutationObs.disconnect();
    this._echart?.dispose();
    this._echart = null;
  }

  // --- Public API ---

  get value(): gc.core.nodeTime | gc.core.nodeTime[] | undefined {
    return this._nodeTimes.length === 1 ? this._nodeTimes[0] : this._nodeTimes.length > 1 ? this._nodeTimes : undefined;
  }

  /** Set the nodeTime(s) to visualize. Accepts a single nodeTime or an array. Resets all cached state and re-fetches. */
  set value(v: gc.core.nodeTime | gc.core.nodeTime[] | undefined) {
    this._nodeTimes = v == null ? [] : Array.isArray(v) ? v : [v];
    this._inferredMappings = null;
    this._fullFrom = undefined;
    this._fullTo = undefined;
    this._totalSize = 0;
    this._overviewTable = undefined;
    this._detailTable = undefined;
    this._rawTable = undefined;
    this._detailRows = 0;
    this._detailFromMs = 0;
    this._detailToMs = 0;
    this._currentStart = 0;
    this._currentEnd = 100;
    this._seriesNames = [];
    this._numericCols = [];
    this._pointsLabel.textContent = '';
    this._fetchAndRender(this._userFrom, this._userTo);
  }

  get mappings(): gc.core.TableColumnMapping[] | undefined {
    return this._mappings;
  }

  get names(): string[] | undefined {
    return this._names;
  }

  /** Set name prefixes for each nodeTime. Maps 1:1 with the value array. */
  set names(v: string[] | undefined) {
    this._names = v;
    this._overviewTable = undefined;
    this._seriesNames = [];
    this._numericCols = [];
    if (this._nodeTimes.length > 0) {
      const zoom = this._currentZoomRange();
      this._fetchAndRender(zoom?.from, zoom?.to);
    }
  }

  get globalFrom(): gc.core.time | undefined {
    return this._userGlobalFrom;
  }

  /** Override the full range start (slider lower bound). If unset, auto-detected from nodeTime.info(). */
  set globalFrom(v: gc.core.time | undefined) {
    this._userGlobalFrom = v;
    this._overviewTable = undefined;
    if (this._nodeTimes.length > 0) {
      this._fetchAndRender(this._userFrom, this._userTo);
    }
  }

  get globalTo(): gc.core.time | undefined {
    return this._userGlobalTo;
  }

  /** Override the full range end (slider upper bound). If unset, auto-detected from nodeTime.info(). */
  set globalTo(v: gc.core.time | undefined) {
    this._userGlobalTo = v;
    this._overviewTable = undefined;
    if (this._nodeTimes.length > 0) {
      this._fetchAndRender(this._userFrom, this._userTo);
    }
  }

  get from(): gc.core.time | undefined {
    return this._userFrom;
  }

  /** Set the initial detail window start. If unset, defaults to the full range start. */
  set from(v: gc.core.time | undefined) {
    this._userFrom = v;
    if (this._nodeTimes.length > 0) {
      this._fetchAndRender(this._userFrom, this._userTo);
    }
  }

  get to(): gc.core.time | undefined {
    return this._userTo;
  }

  /** Set the initial detail window end. If unset, defaults to the full range end. */
  set to(v: gc.core.time | undefined) {
    this._userTo = v;
    if (this._nodeTimes.length > 0) {
      this._fetchAndRender(this._userFrom, this._userTo);
    }
  }

  /** Set column mappings. Clears inferred mappings and triggers re-fetch. */
  set mappings(v: gc.core.TableColumnMapping[] | undefined) {
    this._mappings = v;
    this._inferredMappings = null;
    this._overviewTable = undefined; // force overview re-fetch since columns change
    this._seriesNames = [];
    this._numericCols = [];
    if (this._nodeTimes.length > 0) {
      this._fetchAndRender();
    }
  }

  get chartConfig(): Partial<Chart2Config> | undefined {
    return this._chartConfig;
  }

  /** Override chart configuration (series types, grid, tooltip, etc.). Merged with the auto-detected config. */
  set chartConfig(v: Partial<Chart2Config> | undefined) {
    this._chartConfig = v;
    this._detailConfig = undefined;
    if (this._nodeTimes.length > 0) {
      this._renderChart();
    }
  }

  get tableConfig(): Partial<GuiTableProps> | undefined {
    return this._tableConfig;
  }

  /** Configure the table view. */
  set tableConfig(v: Partial<GuiTableProps> | undefined) {
    this._tableConfig = v;
    if (v) {
      this._table.setAttrs(v);
    }
  }

  get controls(): boolean {
    return this._showControls;
  }

  /** Show or hide the controls bar (maxRows, mode, maxDephasing). */
  set controls(v: boolean) {
    this._showControls = v;
    this._controlsEl.style.display = v ? '' : 'none';
  }

  get maxRows(): number {
    return this._maxRows;
  }

  /** Set the maximum number of sample rows. Triggers re-fetch of both overview and detail. */
  set maxRows(v: number) {
    this._maxRows = v;
    this._overviewTable = undefined; // maxRows affects overview too
    this._seriesNames = [];
    this._numericCols = [];
    if (this._nodeTimes.length > 0) {
      const zoom = this._currentZoomRange();
      this._fetchAndRender(zoom?.from, zoom?.to);
    }
  }

  get samplingMode(): gc.core.SamplingMode {
    return this._samplingMode;
  }

  /** Set sampling mode. Triggers re-fetch of both overview and detail. */
  set samplingMode(v: gc.core.SamplingMode) {
    this._samplingMode = v;
    this._overviewTable = undefined;
    this._seriesNames = [];
    this._numericCols = [];
    if (this._nodeTimes.length > 0) {
      const zoom = this._currentZoomRange();
      this._fetchAndRender(zoom?.from, zoom?.to);
    }
  }

  get maxDephasing(): gc.core.duration | null {
    return this._maxDephasing;
  }

  /** Set max dephasing for sampling. Triggers re-fetch. */
  set maxDephasing(v: gc.core.duration | null) {
    this._maxDephasing = v;
    this._overviewTable = undefined;
    this._seriesNames = [];
    this._numericCols = [];
    if (this._nodeTimes.length > 0) {
      const zoom = this._currentZoomRange();
      this._fetchAndRender(zoom?.from, zoom?.to);
    }
  }

  get activeTab(): string | undefined {
    return this._tabs.tab?.textContent ?? undefined;
  }

  set activeTab(name: string | undefined) {
    this._pendingTab = name;
    if (name && this.isConnected) {
      this._tabs.selectTab(name);
    }
  }

  /** Compute the current zoom window as gc.core.time values, or undefined for full range. */
  private _currentZoomRange(): { from: gc.core.time; to: gc.core.time } | undefined {
    if (
      !this._fullFrom ||
      !this._fullTo ||
      (this._currentStart === 0 && this._currentEnd === 100)
    ) {
      return undefined;
    }
    const fullFromMs = this._fullFrom.epochMs;
    const rangeMs = this._fullTo.epochMs - fullFromMs;
    return {
      from: gc.core.time.fromMs(Math.round(fullFromMs + (rangeMs * this._currentStart) / 100)),
      to: gc.core.time.fromMs(Math.round(fullFromMs + (rangeMs * this._currentEnd) / 100)),
    };
  }

  // --- Data fetching ---

  /** Fetch overview and/or detail data, then render the chart. */
  private async _fetchAndRender(from?: gc.core.time, to?: gc.core.time): Promise<void> {
    if (this._nodeTimes.length === 0) {
      return;
    }

    // generation counter — bail after any await if a newer fetch was started
    const gen = ++this._fetchGeneration;

    // always check bounds (may have changed due to ingestion)
    const infos = await gc.core.nodeTime.info(this._nodeTimes);
    if (gen !== this._fetchGeneration) return;

    // compute aggregate bounds across all nodeTimes
    let aggFrom: gc.core.time | undefined;
    let aggTo: gc.core.time | undefined;
    let aggSize = 0;
    for (const info of infos) {
      const i = info as gc.core.NodeInfo<gc.core.time>;
      if (!i.from || !i.to) {
        continue;
      }
      if (!aggFrom || i.from.epochMs < aggFrom.epochMs) {
        aggFrom = i.from;
      }
      if (!aggTo || i.to.epochMs > aggTo.epochMs) {
        aggTo = i.to;
      }
      aggSize += Number(i.size);
    }
    if (!aggFrom || !aggTo) {
      return;
    }

    // apply user-defined global bounds if set, otherwise use auto-detected
    const effectiveFrom = this._userGlobalFrom ?? aggFrom;
    const effectiveTo = this._userGlobalTo ?? aggTo;

    // detect if bounds changed → invalidate overview cache
    const boundsChanged =
      !this._fullFrom ||
      !this._fullTo ||
      effectiveFrom.epochMs !== this._fullFrom.epochMs ||
      effectiveTo.epochMs !== this._fullTo.epochMs;

    if (boundsChanged) {
      this._fullFrom = effectiveFrom;
      this._fullTo = effectiveTo;
      this._overviewTable = undefined;
    }
    this._totalSize = aggSize;

    const sampleFrom = from ?? this._fullFrom;
    const sampleTo = to ?? this._fullTo;

    // snapshot the slider position at fetch time (for drift detection)
    const fetchStart = this._currentStart;
    const fetchEnd = this._currentEnd;

    // fetch overview if not cached
    const needsOverview = !this._overviewTable;
    if (needsOverview) {
      const overviewRaw = await this._sampleNodeTime(this._fullFrom, this._fullTo);
      if (gen !== this._fetchGeneration) return;
      this._overviewTable = await this._flattenTable(overviewRaw);
      if (gen !== this._fetchGeneration) return;
      this._applyNamePrefixes(this._overviewTable, this._inferredMappings);
      this._populateSubheaders(this._overviewTable, overviewRaw, this._inferredMappings);
      this._detectSeries(this._overviewTable);
    }

    // fetch detail (always)
    const detailRaw = await this._sampleNodeTime(sampleFrom, sampleTo);
    if (gen !== this._fetchGeneration) return;
    this._rawTable = detailRaw;
    this._detailTable = await this._flattenTable(detailRaw);
    if (gen !== this._fetchGeneration) return;
    this._applyNamePrefixes(this._detailTable, this._inferredMappings);
    this._populateSubheaders(this._detailTable, detailRaw, this._inferredMappings);
    this._detailRows = 0;
    for (const col of this._detailTable.cols) {
      this._detailRows += col.length;
    }
    // this._detailRows = this._detailTable.cols.length > 0 ? this._detailTable.cols[0].length : 0;
    // track detail time range for overlap-based label estimation (across all time columns)
    if (this._detailRows > 0) {
      const timeCols = new Set(this._timeColForSeries);
      let minMs = Infinity;
      let maxMs = -Infinity;
      for (const tc of timeCols) {
        const col = this._detailTable.cols[tc];
        if (col && col.length > 0) {
          const first = vMap(col[0]);
          const last = vMap(col[col.length - 1]);
          if (first < minMs) minMs = first;
          if (last > maxMs) maxMs = last;
        }
      }
      this._detailFromMs = minMs;
      this._detailToMs = maxMs;
    }

    // update table view
    const hasMappings = detailRaw !== this._detailTable;
    this._tableModeGroup.style.visibility = hasMappings && this._isTableTab ? '' : 'hidden';
    this._table.value = this._tableShowFlat ? this._detailTable : detailRaw;

    // update label
    this._pointsLabel.textContent = `${this._detailRows} / ${this._totalSize}`;

    // render chart
    // set dataZoom percentages so _renderChart positions the slider correctly
    if (sampleFrom && sampleTo && this._fullFrom && this._fullTo) {
      const fullFromMs = this._fullFrom.epochMs;
      const rangeMs = this._fullTo.epochMs - fullFromMs;
      if (rangeMs > 0) {
        this._currentStart = ((sampleFrom.epochMs - fullFromMs) / rangeMs) * 100;
        this._currentEnd = ((sampleTo.epochMs - fullFromMs) / rangeMs) * 100;
      }
    }
    this._renderChart();

    // if the slider moved during the fetch, re-fetch for the current position
    if (this._currentStart !== fetchStart || this._currentEnd !== fetchEnd) {
      const zoom = this._currentZoomRange();
      if (zoom) {
        this._fetchAndRender(zoom.from, zoom.to);
      }
    }
  }

  /** Call nodeTime.sample with current sampling parameters (supports multiple nodeTimes). */
  private _sampleNodeTime(
    from: gc.core.time | undefined,
    to: gc.core.time | undefined,
  ): Promise<gc.core.Table> {
    return gc.core.nodeTime.sample(
      this._nodeTimes,
      from ?? null,
      to ?? null,
      this._maxRows,
      this._samplingMode,
      this._maxDephasing,
      null,
    );
  }

  /** Apply column mappings to flatten a raw table. */
  private async _flattenTable(raw: gc.core.Table): Promise<gc.core.Table> {
    let effectiveMappings = this._mappings;
    if (!effectiveMappings) {
      if (!this._inferredMappings) {
        this._inferredMappings = await raw.inferMappings();
      }
      effectiveMappings = this._inferredMappings;
    }
    if (effectiveMappings && effectiveMappings.length > 0) {
      return gc.core.Table.applyMappingsWithHeaders(raw, effectiveMappings);
    }
    return raw;
  }

  /**
   * Apply name prefixes to flattened table headers based on which nodeTime produced each column.
   *
   * Raw table layout for N nodeTimes: [time₀, value₀, time₁, value₁, ...] (2N columns).
   * Raw value column index for nodeTime i = 2*i + 1, so ntIdx = (rawCol - 1) / 2.
   *
   * After flattening, expanded columns are appended after the original columns.
   * Original value columns that weren't expanded also need prefixes.
   */
  private _applyNamePrefixes(flat: gc.core.Table, mappings: gc.core.TableColumnMapping[] | null): void {
    if (!this._names || this._names.length === 0 || !flat.headers) {
      return;
    }

    // track which raw columns were expanded by mappings (so we skip them in the original pass)
    const expandedRawCols = new Set<number>();
    // count how many expanded columns each raw column produced
    const expandedCounts = new Map<number, number>();

    if (mappings && mappings.length > 0) {
      for (const m of mappings) {
        const srcCol = (m as { column: number }).column;
        expandedRawCols.add(srcCol);
        expandedCounts.set(srcCol, (expandedCounts.get(srcCol) ?? 0) + 1);
      }

      // prefix the expanded columns (they start after the original columns)
      const offset = flat.cols.length - mappings.length;
      for (let j = 0; j < mappings.length; j++) {
        const srcCol = (mappings[j] as { column: number }).column;
        const ntIdx = Math.floor((srcCol - 1) / 2);
        const name = this._names[ntIdx];
        if (name == null) {
          continue;
        }
        const headerIdx = offset + j;
        const count = expandedCounts.get(srcCol) ?? 1;
        flat.headers[headerIdx] = count === 1 ? name : `${name}.${flat.headers[headerIdx]}`;
      }
    }

    // prefix original value columns that weren't expanded by mappings
    // raw layout: [time₀, value₀, time₁, value₁, ...], value columns are odd indices
    const rawColCount = this._nodeTimes.length * 2;
    for (let c = 1; c < rawColCount && c < flat.headers.length; c += 2) {
      if (expandedRawCols.has(c)) {
        continue; // already handled above
      }
      const ntIdx = Math.floor((c - 1) / 2);
      const name = this._names[ntIdx];
      if (name != null) {
        flat.headers[c] = name;
      }
    }
  }

  /** Populate table.subheaders using GreyCat ABI types from the raw table and mappings. */
  private _populateSubheaders(flat: gc.core.Table, raw: gc.core.Table, mappings: gc.core.TableColumnMapping[] | null): void {
    if (flat.cols.length === 0) {
      return;
    }
    const subheaders: string[] = [];

    // original columns — use the raw table's subheaders or inspect values
    const offset = mappings && mappings.length > 0 ? flat.cols.length - mappings.length : flat.cols.length;
    for (let i = 0; i < offset; i++) {
      if (raw.subheaders?.[i]) {
        subheaders.push(raw.subheaders[i]);
      } else {
        subheaders.push(this._typeNameOf(raw.cols[i]?.[0]));
      }
    }

    // expanded columns — resolve field type from the source object's ABI type
    if (mappings && mappings.length > 0) {
      for (let j = 0; j < mappings.length; j++) {
        const m = mappings[j] as { column: number; extractors: string[] };
        const srcSample = raw.cols[m.column]?.[0];
        const fieldName = m.extractors[m.extractors.length - 1];
        let typeName = '';
        if (srcSample instanceof gc.sdk.GCObject && !srcSample.$type.is_native) {
          const attr = srcSample.$type.attrs.find((a) => a.name === fieldName);
          if (attr) {
            const abi = srcSample.$type.abi;
            typeName = abi.types[attr.abi_type].name;
            if (attr.nullable) {
              typeName += '?';
            }
          }
        }
        if (!typeName) {
          typeName = this._typeNameOf(flat.cols[offset + j]?.[0]);
        }
        subheaders.push(typeName);
      }
    }

    flat.subheaders = subheaders;
  }

  /** Get the GreyCat type name for a value, falling back to JS typeof. */
  private _typeNameOf(value: unknown): string {
    if (value == null) {
      return '';
    }
    if (value instanceof gc.sdk.GCPrimitive || value instanceof gc.sdk.GCObject) {
      return value.$type.name;
    }
    switch (typeof value) {
      case 'number': return 'float';
      case 'bigint': return 'int';
      case 'string': return 'String';
      case 'boolean': return 'bool';
      default: return typeof value;
    }
  }

  /** Detect numeric columns and their names from a flattened table. */
  private _detectSeries(table: gc.core.Table): void {
    this._numericCols = [];
    this._seriesNames = [];
    this._timeColForSeries = [];

    // Raw table layout for N nodeTimes: [time₀, value₀, time₁, value₁, ...] (2N original columns).
    // After flattening, expanded columns are appended starting at index 2N.
    const N = this._nodeTimes.length;
    const originalCols = 2 * N;

    for (let i = 1; i < table.cols.length; i++) {
      const sample = table.cols[i]?.[0];
      if (typeof sample === 'number' || typeof sample === 'bigint') {
        this._numericCols.push(i);
        this._seriesNames.push(table.headers?.[i] ?? table.subheaders?.[i] ?? `Col ${i}`);

        // Determine which time column this series belongs to
        let timeCol = 0;
        if (i < originalCols) {
          // Original column: value at odd index 2k+1 → time at 2k
          timeCol = i - 1;
        } else {
          // Expanded column: each mapping produces one column, in order
          const mappings = this._inferredMappings ?? this._mappings;
          const expandedIdx = i - originalCols;
          if (mappings && expandedIdx < mappings.length) {
            const m = mappings[expandedIdx] as { column: number };
            // m.column is an odd index (value column), time column is m.column - 1
            timeCol = m.column - 1;
          }
        }
        this._timeColForSeries.push(timeCol);
      }
    }
  }

  // --- ECharts rendering ---

  /** Build the full ECharts option and render (overview + detail + axes + dataZoom). */
  private _renderChart(): void {
    if (!this._echart || !this._overviewTable || !this._detailTable) {
      return;
    }

    const colors = getColors(this);
    const { textColor, bgColor, borderColor } = getThemeColors(this);

    const overviewSeriesData = this._buildSeriesData(this._overviewTable);
    const detailSeriesData = this._buildSeriesData(this._detailTable);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const series: Record<string, any>[] = [];

    // overview series (invisible, first for data shadow)
    for (let i = 0; i < this._numericCols.length; i++) {
      series.push({
        id: `overview-${i}`,
        type: 'line',
        xAxisIndex: 0,
        yAxisIndex: 1,
        data: overviewSeriesData[i],
        silent: true,
        showSymbol: false,
        lineStyle: { opacity: 0 },
        itemStyle: { opacity: 0 },
        tooltip: { show: false },
      });
    }

    // detail series (visible, with explicit color to avoid offset from overview series)
    for (let i = 0; i < this._numericCols.length; i++) {
      series.push({
        id: `detail-${i}`,
        type: 'line',
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: detailSeriesData[i],
        name: this._seriesNames[i],
        showSymbol: false,
        color: colors[i % colors.length],
      });
    }

    const xTimeSpan = this._fullTo!.epochMs - this._fullFrom!.epochMs;
    const xAxis = buildAxis({ type: 'time' }, textColor, borderColor, xTimeSpan);
    xAxis.gridIndex = 0;
    // Anchor xAxis to the full aggregate range so dataZoom percentages align correctly
    // (individual nodeTimes may have different time ranges)
    xAxis.min = this._fullFrom!.epochMs;
    xAxis.max = this._fullTo!.epochMs;

    const yAxisDetail = buildAxis({}, textColor, borderColor, 0);
    yAxisDetail.gridIndex = 0;

    const yAxisOverview = buildAxis({}, textColor, borderColor, 0);
    yAxisOverview.gridIndex = 0;
    yAxisOverview.show = false;

    // tooltip formatter for time axis (only detail series)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tooltipFormatter = (params: any) => {
      const all = Array.isArray(params) ? params : [params];
      // filter to detail series only (yAxisIndex === 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const detail = all.filter((p: any) => p.data && p.seriesId?.startsWith('detail-'));
      if (detail.length === 0) {
        return '';
      }
      const axisVal =
        detail[0].axisValue ?? (Array.isArray(detail[0].value) ? detail[0].value[0] : undefined);
      const header =
        typeof axisVal === 'number'
          ? gc.$.default.printTime(gc.core.time.fromMs(Math.round(axisVal)))
          : String(axisVal ?? '');
      let html = header;
      for (const p of detail) {
        const y = Array.isArray(p.value) ? p.value[1] : p.value;
        html += `<br/>${p.marker} ${p.seriesName}: <strong>${y}</strong>`;
      }
      return html;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const option: Record<string, any> = {
      color: colors,
      animation: false,
      backgroundColor: 'transparent',
      textStyle: { color: textColor },
      grid: [{ top: 30, left: 100, right: 110, bottom: 90 }],
      xAxis: [xAxis],
      yAxis: [yAxisDetail, yAxisOverview],
      series,
      legend: {
        show: true,
        textStyle: { color: textColor },
        top: 0,
        data: this._seriesNames,
        selected: this._buildLegendSelected(),
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: bgColor,
        borderColor,
        textStyle: { color: textColor },
        confine: true,
        formatter: tooltipFormatter,
        appendTo: () => this._chartContainer,
      },
      dataZoom: [
        { type: 'inside', xAxisIndex: [0], filterMode: 'none', start: this._currentStart, end: this._currentEnd },
        {
          type: 'slider',
          xAxisIndex: [0],
          filterMode: 'none',
          start: this._currentStart,
          end: this._currentEnd,
          bottom: 10,
          height: 30,
          labelFormatter: (value: number) =>
            gc.$.default.printTime(
              gc.core.time.fromMs(Math.round(value)),
              undefined,
              this._fullFrom && this._fullTo
                ? smartTimeFormatSpecifier(this._fullTo.sub(this._fullFrom).ms)
                : undefined,
            ),
          textStyle: { color: textColor },
          borderColor,
          dataBackground: {
            lineStyle: { color: borderColor },
            areaStyle: { color: borderColor },
          },
        },
      ],
    };

    this._echart.setOption(option, { notMerge: true });
  }

  /** Extract [timestamp, value][] arrays from a flattened table for each numeric column. */
  private _buildSeriesData(table: gc.core.Table): [number, number][][] {
    const rows = table.cols.length > 0 ? table.cols[0].length : 0;
    const result: [number, number][][] = [];
    for (let s = 0; s < this._numericCols.length; s++) {
      const colIdx = this._numericCols[s];
      const timeCol = this._timeColForSeries[s] ?? 0;
      const data: [number, number][] = [];
      for (let r = 0; r < rows; r++) {
        data.push([vMap(table.cols[timeCol][r]), vMap(table.cols[colIdx][r])]);
      }
      result.push(data);
    }
    return result;
  }

  // --- Zoom handling ---

  /** Handle datazoom events: update label immediately, debounce re-fetch. */
  private _onSelection(params: DataZoomParams): void {
    if (!this._fullFrom || !this._fullTo) {
      return;
    }

    const start = params.start ?? params.batch?.[0]?.start;
    const end = params.end ?? params.batch?.[0]?.end;

    if (start == null || end == null) {
      return;
    }

    if (start === this._currentStart && end === this._currentEnd) {
      return;
    }

    this._currentStart = start;
    this._currentEnd = end;

    // update label immediately (estimate visible based on overlap with detail range)
    const fullFromMs = this._fullFrom!.epochMs;
    const rangeMs = this._fullTo!.epochMs - fullFromMs;
    const viewFromMs = fullFromMs + (rangeMs * start) / 100;
    const viewToMs = fullFromMs + (rangeMs * end) / 100;
    let visible: number;
    const detailSpan = this._detailToMs - this._detailFromMs;
    if (viewToMs <= this._detailFromMs || viewFromMs >= this._detailToMs || detailSpan <= 0) {
      visible = 0;
    } else {
      const overlapStart = Math.max(viewFromMs, this._detailFromMs);
      const overlapEnd = Math.min(viewToMs, this._detailToMs);
      visible = Math.round((this._detailRows * (overlapEnd - overlapStart)) / detailSpan);
    }
    this._pointsLabel.textContent = `${visible} / ${this._totalSize}`;

    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    this._debounceTimer = setTimeout(() => {
      const fullFromMs = this._fullFrom!.epochMs;
      const fullToMs = this._fullTo!.epochMs;
      const rangeMs = fullToMs - fullFromMs;

      const newFrom = gc.core.time.fromMs(Math.round(fullFromMs + (rangeMs * start) / 100));
      const newTo = gc.core.time.fromMs(Math.round(fullFromMs + (rangeMs * end) / 100));

      this._fetchAndRender(newFrom, newTo);
    }, 200);
  }

  // --- Table view ---

  /** Toggle between raw and flattened table display. */
  private _setTableMode(flat: boolean): void {
    this._tableShowFlat = flat;
    this._btnFlat.variant = flat ? 'primary' : 'default';
    this._btnRaw.variant = flat ? 'default' : 'primary';
    const data = flat ? this._detailTable : this._rawTable;
    if (data) {
      this._table.value = data;
    }
  }

  // --- Config drawer ---

  /** Toggle the config drawer open/closed. */
  private _toggleConfig(): void {
    this._drawer.open = !this._drawer.open;
    if (this._drawer.open) {
      this._ensureConfigEl();
    }
  }

  /** Lazily create the config element and append it to the drawer. */
  private _ensureConfigEl(): void {
    if (this._configEl) {
      return;
    }
    this._configEl = document.createElement('gui-chart2-config') as GuiChart2Config;
    this._configEl.value = this._detailConfig ?? this._buildDetailConfig();
    this._configEl.echartsInstance = this._echart;
    this._configEl.addEventListener('gui-chart2-config-update', ((e: GuiChart2ConfigUpdateEvent) => {
      this._detailConfig = e.detail;
      this._renderChart();
    }) as EventListener);
    this._drawer.appendChild(this._configEl);
  }

  /** Build legend.selected map from detailConfig hide state. */
  private _buildLegendSelected(): Record<string, boolean> {
    const selected: Record<string, boolean> = {};
    if (this._detailConfig) {
      for (const s of this._detailConfig.series) {
        if (s.hide && s.name) {
          selected[s.name] = false;
        }
      }
    }
    return selected;
  }

  /** Update the config element value (e.g. after reset). */
  private _updateConfigEl(): void {
    if (this._configEl) {
      this._configEl.value = this._detailConfig ?? this._buildDetailConfig();
    }
  }

  /** Build a Chart2Config representing the detail series, merged with user chartConfig overrides. */
  private _buildDetailConfig(): Chart2Config {
    let config: Chart2Config = this._detailTable
      ? inferConfig2(this._detailTable)
      : { series: [], xAxis: { type: 'time' } };
    if (this._chartConfig) {
      config = mergeChartConfig(config, this._chartConfig);
    }
    return config;
  }

  /** Sync ECharts legend selection state back to detailConfig.series[].hide. */
  private _syncLegendToConfig(selected: Record<string, boolean>): void {
    if (!this._detailConfig) {
      this._detailConfig = this._buildDetailConfig();
    }
    for (const s of this._detailConfig.series) {
      if (s.name && s.name in selected) {
        s.hide = !selected[s.name];
      }
    }
    this._updateConfigEl();
  }
}

/** Forward reference for the config component (avoids circular imports). */
interface GuiChart2Config extends HTMLElement {
  value: Chart2Config;
  echartsInstance: echarts.ECharts | null;
}

/** Internal type for ECharts datazoom event params. */
interface DataZoomParams {
  type: string;
  start?: number;
  end?: number;
  startValue?: number;
  endValue?: number;
  batch?: {
    dataZoomId: string;
    start?: number;
    end?: number;
    startValue?: number;
    endValue?: number;
  }[];
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiNodeTime} */
    'gui-node-time': GuiNodeTime;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiNodeTime} */
        'gui-node-time': GreyCat.Element<GuiNodeTime>;
      }
    }
  }
}

registerCustomElement('gui-node-time', GuiNodeTime);
