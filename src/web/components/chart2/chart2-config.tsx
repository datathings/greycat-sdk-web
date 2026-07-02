import type { ECharts } from 'echarts/core';
import type * as sl from '@shoelace-style/shoelace';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import { GuiChart2ConfigUpdateEvent } from './chart2.js';
import type { Chart2Config, Chart2Serie, Chart2Axis, Chart2SerieType, Chart2AxisType } from './types.js';
import { getEffectiveGrid, getThemeColors } from './utils.js';

import style from './chart2-config.css?inline';

const SERIE_TYPES: Chart2SerieType[] = ['line', 'bar', 'scatter', 'pie', 'candlestick', 'heatmap', 'boxplot'];
const AXIS_TYPES: Chart2AxisType[] = ['value', 'time', 'category', 'log'];

export class GuiChart2Config extends GuiElement {
  static override styles = [css(style)];

  private _value: Chart2Config = { series: [] };
  private _chart: ECharts | null = null;
  private _content: HTMLDivElement;
  private _openState = new Map<string, boolean>();

  constructor() {
    super();

    this._content = document.createElement('div');
    this.shadowRoot.appendChild(this._content);
  }

  connectedCallback(): void {
    this._renderConfig();
  }

  get value(): Chart2Config {
    return this._value;
  }

  set value(config: Chart2Config) {
    this._value = config;
    if (this.isConnected) {
      this._renderConfig();
    }
  }

  get echartsInstance(): ECharts | null {
    return this._chart;
  }

  set echartsInstance(chart: ECharts | null) {
    this._chart = chart;
  }

  private _emit(): void {
    this.dispatchEvent(new GuiChart2ConfigUpdateEvent({ ...this._value }));
    this._renderConfig();
  }

  private _details(summary: string, children: HTMLElement[]): HTMLElement {
    const open = this._openState.get(summary) ?? false;
    const el = (
      <sl-details summary={summary} open={open}>
        {children}
      </sl-details>
    ) as sl.SlDetails;
    el.addEventListener('sl-show', () => this._openState.set(summary, true));
    el.addEventListener('sl-hide', () => this._openState.set(summary, false));
    return el as HTMLElement;
  }

  private _renderConfig(): void {
    this._content.innerHTML = '';

    // actions (save as PNG)
    const actionsSection = this._renderActions();

    // features (tooltip, legend, dataZoom)
    const featuresSection = this._renderFeatures();

    // series section
    const seriesSection = this._details(
      'Series',
      this._value.series.map((serie, i) => this._renderSerie(serie, i)),
    );

    // x axis section
    const xAxes = Array.isArray(this._value.xAxis) ? this._value.xAxis : [this._value.xAxis ?? {}];
    const xAxisSection = this._details(
      'X Axis',
      xAxes.map((axis, i) => this._renderAxis(axis, 'x', i)),
    );

    // y axis section
    const yAxes = Array.isArray(this._value.yAxis) ? this._value.yAxis : [this._value.yAxis ?? {}];
    const yAxisSection = this._details(
      'Y Axes',
      yAxes.map((axis, i) => this._renderAxis(axis, 'y', i)),
    );

    // grid section
    const gridSection = this._renderGrid();

    this._content.append(actionsSection, featuresSection, seriesSection, xAxisSection, yAxisSection, gridSection);
  }

  private _renderSerie(serie: Chart2Serie, idx: number): HTMLElement {
    const color = serie.color ?? '';

    const hideCheckbox = (
      <sl-checkbox
        size="small"
        checked={!serie.hide}
        onsl-change={(e: Event) => {
          serie.hide = !(e.target as sl.SlCheckbox).checked;
          this._emit();
        }}
      >
        Visible
      </sl-checkbox>
    ) as sl.SlCheckbox;

    const typeSelect = (
      <sl-select
        size="small"
        label="Type"
        value={serie.type ?? 'line'}
        hoist
        onsl-change={(e: Event) => {
          serie.type = (e.target as sl.SlSelect).value as Chart2SerieType;
          this._emit();
        }}
      >
        {SERIE_TYPES.map((t) => (
          <sl-option value={t}>{t}</sl-option>
        ))}
      </sl-select>
    );

    const titleInput = (
      <sl-input
        size="small"
        label="Name"
        value={serie.name ?? ''}
        onsl-change={(e: Event) => {
          serie.name = (e.target as sl.SlInput).value || undefined;
          this._emit();
        }}
      />
    );

    const colorInput = (
      <sl-input
        size="small"
        label="Color"
        type="text"
        value={color}
        onsl-change={(e: Event) => {
          serie.color = (e.target as sl.SlInput).value || undefined;
          this._emit();
        }}
      />
    );

    const smoothCheckbox = (
      <sl-checkbox
        size="small"
        checked={serie.smooth ?? false}
        onsl-change={(e: Event) => {
          serie.smooth = (e.target as sl.SlCheckbox).checked;
          this._emit();
        }}
      >
        Smooth
      </sl-checkbox>
    );

    const areaCheckbox = (
      <sl-checkbox
        size="small"
        checked={!!serie.areaStyle}
        onsl-change={(e: Event) => {
          serie.areaStyle = (e.target as sl.SlCheckbox).checked ? true : undefined;
          this._emit();
        }}
      >
        Area
      </sl-checkbox>
    );

    const stackInput = (
      <sl-input
        size="small"
        label="Stack"
        value={serie.stack ?? ''}
        onsl-change={(e: Event) => {
          serie.stack = (e.target as sl.SlInput).value || undefined;
          this._emit();
        }}
      />
    );

    const lineWidthInput = (
      <sl-input
        size="small"
        label="Line Width"
        type="number"
        value={String(serie.lineWidth ?? '')}
        onsl-change={(e: Event) => {
          const v = Number((e.target as sl.SlInput).value);
          serie.lineWidth = isNaN(v) ? undefined : v;
          this._emit();
        }}
      />
    );

    const symbolSizeInput = (
      <sl-input
        size="small"
        label="Symbol Size"
        type="number"
        value={String(serie.symbolSize ?? '')}
        onsl-change={(e: Event) => {
          const v = Number((e.target as sl.SlInput).value);
          serie.symbolSize = isNaN(v) ? undefined : v;
          this._emit();
        }}
      />
    );

    const precisionInput = (
      <sl-input
        size="small"
        label="Precision"
        type="number"
        value={serie.precision != null ? String(serie.precision) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          const n = Number(v);
          serie.precision = v === '' || isNaN(n) ? undefined : n;
          this._emit();
        }}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartColors = (this._chart?.getOption() as any)?.color as string[] | undefined;
    const dotColor = serie.color || chartColors?.[idx] || 'var(--sl-color-neutral-400)';
    const colorDot = document.createElement('span');
    colorDot.classList.add('color-dot');
    colorDot.style.backgroundColor = dotColor;

    return (
      <div className="serie-item">
        <div className="serie-header">
          {colorDot}
          <strong>{serie.name ?? `Serie ${idx}`}</strong>
          {hideCheckbox}
        </div>
        {typeSelect}
        {titleInput}
        {colorInput}
        {smoothCheckbox}
        {areaCheckbox}
        {stackInput}
        {lineWidthInput}
        {symbolSizeInput}
        {precisionInput}
      </div>
    ) as HTMLElement;
  }

  private _renderAxis(axis: Chart2Axis, dimension: 'x' | 'y', idx: number): HTMLElement {
    const typeSelect = (
      <sl-select
        size="small"
        label="Type"
        value={axis.type ?? 'value'}
        hoist
        onsl-change={(e: Event) => {
          axis.type = (e.target as sl.SlSelect).value as Chart2AxisType;
          this._emit();
        }}
      >
        {AXIS_TYPES.map((t) => (
          <sl-option value={t}>{t}</sl-option>
        ))}
      </sl-select>
    );

    const nameInput = (
      <sl-input
        size="small"
        label="Name"
        value={axis.name ?? ''}
        onsl-change={(e: Event) => {
          axis.name = (e.target as sl.SlInput).value || undefined;
          this._emit();
        }}
      />
    );

    const minInput = (
      <sl-input
        size="small"
        label="Min"
        value={axis.min !== undefined ? String(axis.min) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          if (v === 'dataMin') {
            axis.min = 'dataMin';
          } else {
            const n = Number(v);
            axis.min = v === '' ? undefined : isNaN(n) ? undefined : n;
          }
          this._emit();
        }}
      />
    );

    const maxInput = (
      <sl-input
        size="small"
        label="Max"
        value={axis.max !== undefined ? String(axis.max) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          if (v === 'dataMax') {
            axis.max = 'dataMax';
          } else {
            const n = Number(v);
            axis.max = v === '' ? undefined : isNaN(n) ? undefined : n;
          }
          this._emit();
        }}
      />
    );

    let positionSelect: HTMLElement | undefined;
    if (dimension === 'y') {
      positionSelect = (
        <sl-select
          size="small"
          label="Position"
          value={axis.position ?? 'left'}
          hoist
          onsl-change={(e: Event) => {
            axis.position = (e.target as sl.SlSelect).value as 'left' | 'right';
            this._emit();
          }}
        >
          <sl-option value="left">left</sl-option>
          <sl-option value="right">right</sl-option>
        </sl-select>
      ) as HTMLElement;
    }

    const container = (
      <div className="serie-item">
        <strong>
          {dimension.toUpperCase()} Axis {idx}
        </strong>
        {typeSelect}
        {nameInput}
        {minInput}
        {maxInput}
      </div>
    ) as HTMLElement;

    if (positionSelect) {
      container.appendChild(positionSelect);
    }

    return container;
  }

  private _renderFeatures(): HTMLElement {
    const tooltipEnabled = (
      <sl-checkbox
        size="small"
        checked={this._value.tooltip?.enabled !== false}
        onsl-change={(e: Event) => {
          this._value.tooltip = {
            ...this._value.tooltip,
            enabled: (e.target as sl.SlCheckbox).checked,
          };
          this._emit();
        }}
      >
        Tooltip
      </sl-checkbox>
    );

    const tooltipTrigger = (
      <sl-select
        size="small"
        label="Trigger"
        value={this._value.tooltip?.trigger ?? 'axis'}
        hoist
        onsl-change={(e: Event) => {
          this._value.tooltip = {
            ...this._value.tooltip,
            trigger: (e.target as sl.SlSelect).value as 'item' | 'axis' | 'none',
          };
          this._emit();
        }}
      >
        <sl-option value="axis">axis</sl-option>
        <sl-option value="item">item</sl-option>
        <sl-option value="none">none</sl-option>
      </sl-select>
    );

    const tooltipPrecision = (
      <sl-input
        size="small"
        label="Precision"
        type="number"
        value={this._value.tooltip?.precision != null ? String(this._value.tooltip.precision) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          const n = Number(v);
          this._value.tooltip = {
            ...this._value.tooltip,
            precision: v === '' || isNaN(n) ? undefined : n,
          };
          this._emit();
        }}
      />
    );

    const legendEnabled = (
      <sl-checkbox
        size="small"
        checked={this._value.legend?.enabled !== false}
        onsl-change={(e: Event) => {
          this._value.legend = {
            ...this._value.legend,
            enabled: (e.target as sl.SlCheckbox).checked,
          };
          this._emit();
        }}
      >
        Legend
      </sl-checkbox>
    );

    const legendPosition = (
      <sl-select
        size="small"
        label="Position"
        value={this._value.legend?.position ?? 'top'}
        hoist
        onsl-change={(e: Event) => {
          this._value.legend = {
            ...this._value.legend,
            position: (e.target as sl.SlSelect).value as 'top' | 'bottom' | 'left' | 'right',
          };
          this._emit();
        }}
      >
        <sl-option value="top">top</sl-option>
        <sl-option value="bottom">bottom</sl-option>
        <sl-option value="left">left</sl-option>
        <sl-option value="right">right</sl-option>
      </sl-select>
    );

    const dataZoomEnabled = (
      <sl-checkbox
        size="small"
        checked={this._value.dataZoom?.enabled ?? false}
        onsl-change={(e: Event) => {
          this._value.dataZoom = {
            ...this._value.dataZoom,
            enabled: (e.target as sl.SlCheckbox).checked,
          };
          this._emit();
        }}
      >
        Data Zoom
      </sl-checkbox>
    );

    const dataZoomType = (
      <sl-select
        size="small"
        label="Zoom Type"
        value={this._value.dataZoom?.type ?? 'inside'}
        hoist
        onsl-change={(e: Event) => {
          this._value.dataZoom = {
            ...this._value.dataZoom,
            type: (e.target as sl.SlSelect).value as 'inside' | 'slider' | 'both',
          };
          this._emit();
        }}
      >
        <sl-option value="inside">inside</sl-option>
        <sl-option value="slider">slider</sl-option>
        <sl-option value="both">both</sl-option>
      </sl-select>
    );

    return (
      <div className="features-section">
        {tooltipEnabled}
        {tooltipTrigger}
        {tooltipPrecision}
        {legendEnabled}
        {legendPosition}
        {dataZoomEnabled}
        {dataZoomType}
      </div>
    ) as HTMLElement;
  }

  private _renderActions(): HTMLElement {
    return (
      <div className="actions-section">
        <sl-button
          size="small"
          variant="default"
          onclick={() => {
            if (!this._chart) {
              return;
            }
            const bg = getThemeColors().bgColor;
            const url = this._chart.getDataURL({ type: 'png', backgroundColor: bg });
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chart.png';
            a.click();
          }}
        >
          <sl-icon name="download" slot="prefix" />
          Save as PNG
        </sl-button>
      </div>
    ) as HTMLElement;
  }

  private _renderGrid(): HTMLElement {
    const grid = getEffectiveGrid(this._value);

    const topInput = (
      <sl-input
        size="small"
        label="Top"
        value={grid.top !== undefined ? String(grid.top) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          this._value.grid = {
            ...this._value.grid,
            top: v === '' ? undefined : isNaN(Number(v)) ? v : Number(v),
          };
          this._emit();
        }}
      />
    ) as HTMLElement;

    const rightInput = (
      <sl-input
        size="small"
        label="Right"
        value={grid.right !== undefined ? String(grid.right) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          this._value.grid = {
            ...this._value.grid,
            right: v === '' ? undefined : isNaN(Number(v)) ? v : Number(v),
          };
          this._emit();
        }}
      />
    ) as HTMLElement;

    const bottomInput = (
      <sl-input
        size="small"
        label="Bottom"
        value={grid.bottom !== undefined ? String(grid.bottom) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          this._value.grid = {
            ...this._value.grid,
            bottom: v === '' ? undefined : isNaN(Number(v)) ? v : Number(v),
          };
          this._emit();
        }}
      />
    ) as HTMLElement;

    const leftInput = (
      <sl-input
        size="small"
        label="Left"
        value={grid.left !== undefined ? String(grid.left) : ''}
        onsl-change={(e: Event) => {
          const v = (e.target as sl.SlInput).value;
          this._value.grid = {
            ...this._value.grid,
            left: v === '' ? undefined : isNaN(Number(v)) ? v : Number(v),
          };
          this._emit();
        }}
      />
    ) as HTMLElement;

    const outerBoundsCheckbox = (
      <sl-checkbox
        size="small"
        checked={(grid.outerBoundsMode ?? 'same') === 'same'}
        onsl-change={(e: Event) => {
          this._value.grid = {
            ...this._value.grid,
            outerBoundsMode: (e.target as sl.SlCheckbox).checked ? 'same' : 'auto',
          };
          this._emit();
        }}
      >
        Outer Bounds
      </sl-checkbox>
    ) as HTMLElement;

    return this._details('Grid', [topInput, rightInput, bottomInput, leftInput, outerBoundsCheckbox]);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiChart2Config} */
    'gui-chart2-config': GuiChart2Config;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiChart2Config} */
        'gui-chart2-config': GreyCat.Element<GuiChart2Config>;
      }
    }
  }
}
