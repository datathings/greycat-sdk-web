import {
  GuiElement,
  type GuiChart2,
  type GuiTable,
  type GuiInputNumber,
  type GuiInputString,
  type GuiInputEnum,
  type GuiInputDuration,
  type Chart2Config,
  type Chart2Serie,
  type Chart2SelectionDetail,
  type GuiTableProps,
  mergeChartConfig,
  registerCustomElement,
  css,
  type GuiTabs,
  type sl,
} from '../../exports.js';
import style from './node-time.css?inline';

export class GuiNodeTime extends GuiElement {
  static override styles = [css(style)];

  private _chart!: GuiChart2;
  private _table!: GuiTable;
  private _nodeTime: gc.core.nodeTime | undefined;
  private _mappings: gc.core.TableColumnMapping[] | undefined;
  private _chartConfig: Partial<Chart2Config> | undefined;
  private _tableConfig: Partial<GuiTableProps> | undefined;
  private _maxRows = 500;
  private _samplingMode: gc.core.SamplingMode = gc.core.SamplingMode.adaptative;
  private _maxDephasing: gc.core.duration | null = null;

  private _fullFrom: gc.core.time | undefined;
  private _fullTo: gc.core.time | undefined;
  private _inferredMappings: gc.core.TableColumnMapping[] | null = null;
  private _cachedConfig: Chart2Config | undefined;
  private _debounceTimer: ReturnType<typeof setTimeout> | undefined;
  private _currentStart = 0;
  private _currentEnd = 100;

  private _rawTable: gc.core.Table | undefined;
  private _flatTable: gc.core.Table | undefined;
  private _tableShowFlat = true;
  private _tableModeGroup!: HTMLElement;
  private _btnRaw!: sl.SlButton;
  private _btnFlat!: sl.SlButton;
  private _tabs!: GuiTabs;
  private _isTableTab = true;
  private _sizeLabel!: GuiInputString;
  private _totalSize = 0;
  private _currentTableRows = 0;

  constructor() {
    super();

    this._chart = (<gui-chart2 />) as GuiChart2;
    this._chart.style.width = '100%';
    this._chart.style.flex = '1';
    this._chart.style.minHeight = '0';

    this._chart.addEventListener('gui-chart2-selection', (e) => {
      const detail = (e as CustomEvent<Chart2SelectionDetail>).detail;
      this._onSelection(detail);
    });

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
      <div className="table-mode">
        <sl-button-group>
          {this._btnRaw}
          {this._btnFlat}
        </sl-button-group>
      </div>
    ) as HTMLElement;
    this._tableModeGroup.style.display = 'none';

    this._sizeLabel = (<gui-input-string label="size" size="small" disabled />) as GuiInputString;

    this.shadowRoot.appendChild(
      <div className="controls">
        {this._sizeLabel}
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
      </div>,
    );

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
          {this._chart}
        </gui-panel>
      </gui-tabs>
    ) as GuiTabs;

    this._tabs.addEventListener('gui-tab-change', (e) => {
      this._isTableTab = (e as CustomEvent).detail?.textContent === 'Table';
      this._tableModeGroup.style.display =
        this._isTableTab && this._rawTable !== this._flatTable ? '' : 'none';
    });

    this.shadowRoot.appendChild(
      <div className="tabs-wrapper">
        {this._tabs}
        {this._tableModeGroup}
      </div>,
    );
  }

  get value(): gc.core.nodeTime | undefined {
    return this._nodeTime;
  }

  set value(v: gc.core.nodeTime | undefined) {
    this._nodeTime = v;
    this._inferredMappings = null;
    this._cachedConfig = undefined;
    this._fullFrom = undefined;
    this._fullTo = undefined;
    this._currentStart = 0;
    this._currentEnd = 100;
    this._totalSize = 0;
    this._currentTableRows = 0;
    this._sizeLabel.value = '';
    this._fetchAndRender();
  }

  get mappings(): gc.core.TableColumnMapping[] | undefined {
    return this._mappings;
  }

  set mappings(v: gc.core.TableColumnMapping[] | undefined) {
    this._mappings = v;
    this._inferredMappings = null;
    this._cachedConfig = undefined;
    if (this._nodeTime) {
      this._fetchAndRender();
    }
  }

  get chartConfig(): Partial<Chart2Config> | undefined {
    return this._chartConfig;
  }

  set chartConfig(v: Partial<Chart2Config> | undefined) {
    this._chartConfig = v;
    this._cachedConfig = undefined;
    if (this._nodeTime) {
      this._fetchAndRender();
    }
  }

  get tableConfig(): Partial<GuiTableProps> | undefined {
    return this._tableConfig;
  }

  set tableConfig(v: Partial<GuiTableProps> | undefined) {
    this._tableConfig = v;
    if (v) {
      this._table.setAttrs(v);
    }
  }

  get maxRows(): number {
    return this._maxRows;
  }

  set maxRows(v: number) {
    this._maxRows = v;
    if (this._nodeTime) {
      this._fetchAndRender();
    }
  }

  get samplingMode(): gc.core.SamplingMode {
    return this._samplingMode;
  }

  set samplingMode(v: gc.core.SamplingMode) {
    this._samplingMode = v;
    if (this._nodeTime) {
      this._fetchAndRender();
    }
  }

  get maxDephasing(): gc.core.duration | null {
    return this._maxDephasing;
  }

  set maxDephasing(v: gc.core.duration | null) {
    this._maxDephasing = v;
    if (this._nodeTime) {
      this._fetchAndRender();
    }
  }

  get activeTab(): string | undefined {
    return this._tabs.tab?.textContent ?? undefined;
  }

  set activeTab(name: string | undefined) {
    if (name) {
      this._tabs.selectTab(name);
    }
  }

  private async _fetchAndRender(from?: gc.core.time, to?: gc.core.time): Promise<void> {
    if (!this._nodeTime) {
      return;
    }

    // get full range if not cached
    if (!this._fullFrom || !this._fullTo) {
      const infos = await gc.core.nodeTime.info([this._nodeTime]);
      const info = infos[0] as gc.core.NodeInfo<gc.core.time>;
      if (!info.from || !info.to) {
        return;
      }
      this._fullFrom = info.from;
      this._fullTo = info.to;
      this._totalSize = Number(info.size);
    }

    const sampleFrom = from ?? this._fullFrom;
    const sampleTo = to ?? this._fullTo;

    // sample the nodeTime
    const rawTable = await this._nodeTime.sample(
      sampleFrom,
      sampleTo,
      this._maxRows,
      this._samplingMode,
      this._maxDephasing,
      null,
    );

    // determine effective mappings
    let effectiveMappings = this._mappings;
    if (!effectiveMappings) {
      if (!this._inferredMappings) {
        this._inferredMappings = await rawTable.inferMappings();
      }
      effectiveMappings = this._inferredMappings;
    }

    // apply mappings to flatten the table
    let flatTable: gc.core.Table;
    if (effectiveMappings && effectiveMappings.length > 0) {
      flatTable = await gc.core.Table.applyMappingsWithHeaders(rawTable, effectiveMappings);
    } else {
      flatTable = rawTable;
    }

    // build config once, then reuse
    if (!this._cachedConfig) {
      let effective = this._buildConfig(flatTable);
      if (this._chartConfig) {
        effective = mergeChartConfig(effective, this._chartConfig);
      }
      effective.dataZoom = { enabled: true, type: 'both', ...effective.dataZoom };
      this._cachedConfig = effective;
    }

    // store both tables for the raw/flat toggle
    this._rawTable = rawTable;
    this._flatTable = flatTable;
    const hasMappings = rawTable !== flatTable;
    this._tableModeGroup.style.display = hasMappings && this._isTableTab ? '' : 'none';

    // track current table rows and update size label
    this._currentTableRows = flatTable.cols.length > 0 ? flatTable.cols[0].length : 0;
    this._updateSizeLabel();

    // feed both views
    this._chart.setAttrs({ config: this._cachedConfig, value: flatTable });
    this._table.value = this._tableShowFlat ? flatTable : rawTable;
  }

  private _setTableMode(flat: boolean): void {
    this._tableShowFlat = flat;
    this._btnFlat.variant = flat ? 'primary' : 'default';
    this._btnRaw.variant = flat ? 'default' : 'primary';
    const data = flat ? this._flatTable : this._rawTable;
    if (data) {
      this._table.value = data;
    }
  }

  private _buildConfig(table: gc.core.Table): Chart2Config {
    const series: Chart2Serie[] = [];

    for (let i = 1; i < table.cols.length; i++) {
      const sample = table.cols[i]?.[0];
      if (typeof sample === 'number' || typeof sample === 'bigint') {
        series.push({
          type: 'line',
          yCol: i,
          name: table.headers?.[i] ?? table.subheaders?.[i] ?? `Col ${i}`,
        });
      }
    }

    return {
      xCol: 0,
      xAxis: { type: 'time' },
      series,
      grid: { left: 100, right: 140, bottom: 60 },
      dataZoom: { enabled: true, type: 'both' },
      tooltip: { enabled: true, trigger: 'axis' },
    };
  }

  private _updateSizeLabel(): void {
    const visible = Math.round(this._currentTableRows * (this._currentEnd - this._currentStart) / 100);
    this._sizeLabel.value = `${visible} / ${this._totalSize}`;
  }

  private _onSelection(detail: Chart2SelectionDetail): void {
    if (!this._fullFrom || !this._fullTo) {
      return;
    }

    // inside dataZoom uses batch format, slider uses top-level start/end
    const start = detail.start ?? detail.batch?.[0]?.start;
    const end = detail.end ?? detail.batch?.[0]?.end;

    if (start == null || end == null) {
      return;
    }

    // skip if range hasn't actually changed
    if (start === this._currentStart && end === this._currentEnd) {
      return;
    }

    this._currentStart = start;
    this._currentEnd = end;

    // update label immediately to reflect what ECharts is showing
    this._updateSizeLabel();

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
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-node-time': GuiNodeTime;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-node-time': GreyCat.Element<GuiNodeTime>;
      }
    }
  }
}

registerCustomElement('gui-node-time', GuiNodeTime);
