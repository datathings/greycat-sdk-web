import * as echarts from 'echarts/core';
import {
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
  CandlestickChart,
  HeatmapChart,
  BoxplotChart,
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
  AxisPointerComponent,
} from 'echarts/components';
// @ts-ignore — MatrixComponent types not yet re-exported from echarts/components
import { install as MatrixComponent } from 'echarts/lib/component/matrix/install.js';
import { CanvasRenderer } from 'echarts/renderers';
import type * as sl from '@shoelace-style/shoelace';

echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  PieChart,
  CandlestickChart,
  HeatmapChart,
  BoxplotChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
  AxisPointerComponent,
  MatrixComponent,
  CanvasRenderer,
]);
import { GuiElement } from '../element.js';
import { css, convertToTable, type TableLike } from '../common.js';
import { getColors, debounce } from '../../utils.js';
import { buildEChartsOption, getThemeColors, inferConfig2 } from './utils.js';
import type { Chart2Config, Chart2ClickDetail, Chart2SelectionDetail } from './types.js';

import style from './chart2.css?inline';

export class GuiChart2 extends GuiElement {
  static override styles = [css(style)];

  private _chart: echarts.ECharts | null = null;
  private _table: gc.core.Table = gc.core.Table.create();
  private _config: Chart2Config | undefined;
  private _container: HTMLDivElement;
  private _drawer: sl.SlDrawer;
  private _configEl: GuiChart2Config | null = null;
  private _resizeObs: ResizeObserver;
  private _drawerEnabled = false;
  private _notMerge = false;
  private _mutationObs: MutationObserver;

  constructor() {
    super();

    this._container = document.createElement('div');
    this._container.classList.add('gui-chart2-container');

    // config drawer
    this._drawer = document.createElement('sl-drawer') as sl.SlDrawer;
    this._drawer.contained = true;
    this._drawer.open = false;
    this._drawer.label = 'Chart config';

    const resetBtn = document.createElement('sl-button') as sl.SlButton;
    resetBtn.textContent = 'Reset';
    resetBtn.size = 'small';
    resetBtn.style.alignSelf = 'center';
    resetBtn.onclick = () => {
      this._config = undefined;
      this._render();
      this._updateConfigEl();
    };
    const resetTooltip = document.createElement('sl-tooltip') as sl.SlTooltip;
    const resetTooltipContent = document.createElement('div');
    resetTooltipContent.slot = 'content';
    resetTooltipContent.innerHTML = `Resets the config.<br/><br/>This will re-create a new config by analyzing the current table.<br/><br/><strong>The current configuration will be lost</strong>`;
    resetTooltip.appendChild(resetTooltipContent);
    resetTooltip.slot = 'header-actions';
    resetTooltip.appendChild(resetBtn);
    this._drawer.appendChild(resetTooltip);

    const debouncedResize = debounce(() => this._chart?.resize(), 100);
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
        // hidden → visible: resize immediately, no flash
        this._chart?.resize();
      } else {
        debouncedResize();
      }
      lastWidth = rect.width;
      lastHeight = rect.height;
    });

    this._mutationObs = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
          this._render();
        }
      }
    });

    this._container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.toggleConfig();
    });

    this.shadowRoot.append(this._container, this._drawer);
  }

  connectedCallback(): void {
    this._chart = echarts.init(this._container);
    this._resizeObs.observe(this._container);
    this._mutationObs.observe(document.documentElement, { attributes: true });

    this._chart.on('click', (params) => {
      this.dispatchEvent(new GuiChart2ClickEvent(params as unknown as Chart2ClickDetail));
    });

    this._chart.on('datazoom', (params) => {
      this.dispatchEvent(new GuiChart2SelectionEvent(params as unknown as Chart2SelectionDetail));
    });

    // sync legend toggle → config.series[].hide
    this._chart.on('legendselectchanged', (params) => {
      this._syncLegendToConfig((params as { selected: Record<string, boolean> }).selected);
    });

    this._container.addEventListener('dblclick', () => {
      this._chart?.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
    });

    this._render();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObs.disconnect();
    this._mutationObs.disconnect();
    this._chart?.dispose();
    this._chart = null;
  }

  get value(): TableLike | undefined {
    return this._table;
  }

  set value(value: TableLike | undefined) {
    this._table = convertToTable(value);
    this._render();
  }

  get config(): Chart2Config | undefined {
    return this._config;
  }

  set config(config: Chart2Config | undefined) {
    this._config = config;
    this._render();
  }

  get drawerEnabled(): boolean {
    return this._drawerEnabled;
  }

  set drawerEnabled(enabled: boolean) {
    this._drawerEnabled = enabled;
  }

  /**
   * When `true`, each render fully replaces the ECharts option, resetting interactive
   * state such as dataZoom (pan/zoom) and legend selection.
   *
   * When `false` (default), options are merged, preserving user interactions across
   * data or config updates. Mirrors ECharts' `setOption` `notMerge` parameter.
   */
  get notMerge(): boolean {
    return this._notMerge;
  }

  set notMerge(v: boolean) {
    this._notMerge = v;
  }

  setAttrs(
    attrs: Partial<{
      value: TableLike;
      config: Chart2Config;
      drawerEnabled: boolean;
      notMerge: boolean;
    }>,
  ): void {
    if (attrs.drawerEnabled !== undefined) {
      this._drawerEnabled = attrs.drawerEnabled;
    }
    if (attrs.notMerge !== undefined) {
      this._notMerge = attrs.notMerge;
    }
    if (attrs.config !== undefined) {
      this._config = attrs.config;
    }
    if (attrs.value !== undefined) {
      this._table = convertToTable(attrs.value);
    }
    this._render();
  }

  getAttrs(): {
    value: gc.core.Table;
    config: Chart2Config | undefined;
    drawerEnabled: boolean;
    notMerge: boolean;
  } {
    return {
      value: this._table,
      config: this._config,
      drawerEnabled: this._drawerEnabled,
      notMerge: this._notMerge,
    };
  }

  toggleConfig(): void {
    this._drawer.open = !this._drawer.open;
    if (this._drawer.open) {
      this._ensureConfigEl();
    }
  }

  openConfig(): void {
    this._ensureConfigEl();
    this._drawer.show();
  }

  closeConfig(): void {
    this._drawer.hide();
  }

  private _ensureConfigEl(): void {
    if (this._configEl) {
      return;
    }
    this._configEl = document.createElement('gui-chart2-config') as GuiChart2Config;
    this._configEl.value = this._config ?? inferConfig2(this._table);
    this._configEl.echartsInstance = this._chart;
    this._configEl.addEventListener('gui-chart2-config-update', ((
      e: GuiChart2ConfigUpdateEvent,
    ) => {
      this._config = e.detail;
      this._render();
    }) as EventListener);
    this._drawer.appendChild(this._configEl);
  }

  private _updateConfigEl(): void {
    if (this._configEl) {
      this._configEl.value = this._config ?? inferConfig2(this._table);
    }
  }

  /** Sync ECharts legend selection state back to config.series[].hide. */
  private _syncLegendToConfig(selected: Record<string, boolean>): void {
    if (!this._config) {
      return;
    }
    for (const s of this._config.series) {
      if (s.name && s.name in selected) {
        s.hide = !selected[s.name];
      }
    }
    this._updateConfigEl();
  }

  getEChartsInstance(): echarts.ECharts | null {
    return this._chart;
  }

  private _render(): void {
    if (!this._chart || !this.isConnected) {
      return;
    }
    const config = this._config ?? inferConfig2(this._table);
    const colors = getColors(this);
    const theme = getThemeColors(this);
    const option = buildEChartsOption(this._table, config, colors, theme);

    // append HTML tooltip inside shadow DOM so it renders correctly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tooltip = (option as any).tooltip;
    if (tooltip && typeof tooltip === 'object') {
      tooltip.appendTo = () => this._container;
    }

    // console.log('OPTIONS', option);

    this._chart.setOption(option, { notMerge: this._notMerge });
  }
}

// --- Events ---

export class GuiChart2SelectionEvent extends CustomEvent<Chart2SelectionDetail> {
  static readonly NAME = 'gui-chart2-selection';

  constructor(detail: Chart2SelectionDetail) {
    super(GuiChart2SelectionEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

export class GuiChart2ClickEvent extends CustomEvent<Chart2ClickDetail> {
  static readonly NAME = 'gui-chart2-click';

  constructor(detail: Chart2ClickDetail) {
    super(GuiChart2ClickEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

export class GuiChart2ConfigUpdateEvent extends CustomEvent<Chart2Config> {
  static readonly NAME = 'gui-chart2-config-update';

  constructor(detail: Chart2Config) {
    super(GuiChart2ConfigUpdateEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

// --- Forward reference for config component ---
interface GuiChart2Config extends HTMLElement {
  value: Chart2Config;
  echartsInstance: echarts.ECharts | null;
}

// --- Global type declarations ---

interface GuiChart2EventMap {
  [GuiChart2SelectionEvent.NAME]: GuiChart2SelectionEvent;
  [GuiChart2ClickEvent.NAME]: GuiChart2ClickEvent;
  [GuiChart2ConfigUpdateEvent.NAME]: GuiChart2ConfigUpdateEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiChart2} */
    'gui-chart2': GuiChart2;
  }

  interface HTMLElementEventMap extends GuiChart2EventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiChart2} */
        'gui-chart2': GreyCat.Element<GuiChart2>;
      }
    }
  }
}
