import type * as sl from '@shoelace-style/shoelace';
import { modal } from '../../modal.js';
import { getIndexInParent, querySelectorAllWithShadow } from '../../utils.js';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import { Axis, Ordinate, SelectionOptions, TooltipPosition, Serie, ChartConfig, ScaleType, MarkerShape } from './types.js';
import style from './chart-config.css?inline';

export class GuiChartConfig extends GuiElement {
  static override styles = [css(style)];

  private _value: ChartConfig = {
    xAxis: {},
    yAxes: {},
    series: [],
  };

  private _series: GuiChartSeriesInput;
  private _xAxis: GuiChartAxisInput;
  private _yAxes: GuiChartYAxesInput;
  private _cursor: sl.SlCheckbox;
  private _tooltip: sl.SlSelect;
  private _selection: GuiChartSelectionInput;
  public invalid: boolean = false;

  constructor() {
    super();

    this._xAxis = (<gui-chart-axis-input header="xAxis" />) as GuiChartAxisInput;
    this._yAxes = (<gui-chart-yaxes-input />) as GuiChartYAxesInput;
    this._series = (<gui-chart-series-input yAxes={Object.keys(this._yAxes.value)} />) as GuiChartSeriesInput;
    this._cursor = (<sl-checkbox size="small">Cursor?</sl-checkbox>) as sl.SlCheckbox;
    this._tooltip = (
      <sl-select size="small" hoist label="Tooltip position" defaultValue="">
        <sl-option value="">
          <em>default</em>
        </sl-option>
        <sl-option value="top-left">top-left</sl-option>
        <sl-option value="top-right">top-right</sl-option>
        <sl-option value="bottom-right">bottom-right</sl-option>
        <sl-option value="bottom-left">bottom-left</sl-option>
      </sl-select>
    ) as sl.SlSelect;
    this._selection = (<gui-chart-selection-input />) as GuiChartSelectionInput;

    this._yAxes.addEventListener('sl-change', () => {
      const yAxes = this._yAxes.value;
      this._series.yAxes = Object.keys(yAxes);
      queueMicrotask(() => this._post_change());
    });

    this.addEventListener('sl-change', () => this._post_change());

    this.shadowRoot.appendChild(
      <div className="gui-list">
        {this._xAxis}
        {this._yAxes}
        {this._series}
        <gui-details summary="Options">
          <div className="gui-list">
            {this._cursor}
            {this._tooltip}
            {this._selection}
          </div>
        </gui-details>
      </div>,
    );
  }

  connectedCallback() {
    this.update();
  }

  get value() {
    const config: Partial<ChartConfig> = {};

    const tooltip = getSelectValue(this._tooltip);
    if (tooltip) {
      config.tooltip = { position: tooltip as TooltipPosition };
    }

    config.xAxis = this._xAxis.value;
    config.yAxes = this._yAxes.value;
    config.selection = this._selection.value;

    if (this._cursor.checked) {
      config.cursor = true;
    }

    config.series = this._series.value as Serie[];
    return config as ChartConfig;
  }

  set value(config: ChartConfig) {
    this._value = config;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._xAxis.value = this._value.xAxis;
    this._yAxes.value = this._value.yAxes;
    this._series.yAxes = Object.keys(this._value.yAxes);
    this._series.value = this._value.series;
    this._cursor.checked = !!this._value.cursor;
    this._tooltip.setAttribute('value', this._value.tooltip?.position ?? '');
    this._selection.value = this._value.selection ?? false;
  }

  private _post_change(): void {
    this.updateValidity();
    this.dispatchEvent(new GuiChartConfigUpdateEvent(this._value, this.value));
  }

  updateValidity(): void {
    querySelectorAllWithShadow('gui-details', this).forEach((details) => {
      const summary = querySelectorAllWithShadow('summary > span', details);
      if (summary instanceof HTMLElement) {
        if (querySelectorAllWithShadow('[data-user-invalid], [data-invalid]', details)) {
          summary.style.color = 'var(--sl-color-danger-700)';
          this.invalid = true;
        } else {
          summary.style.color = 'unset';
          this.invalid = false;
        }
      }
    });
  }
}

export class GuiChartYAxesInput extends HTMLElement {
  private _value: { [name: string]: Ordinate } = {};

  private _axes: HTMLDivElement;
  private _delSelection: sl.SlButton;

  constructor() {
    super();

    this._axes = document.createElement('div');
    this._axes.classList.add('gui-list', 'smart');
    this._axes.appendChild(<gui-chart-ordinate-input header="y" />);
    this._axes.addEventListener('gui-chart-config-delete', (ev) => {
      ev.stopPropagation();
      modal
        .confirm({
          message: (
            <>
              Are you sure you want to delete ordinate <strong>{ev.detail.name}</strong>?
            </>
          ),
        })
        .then((yes) => {
          if (yes) {
            ev.detail.el.remove();
            this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
          }
        });
    });
    this._axes.addEventListener('gui-config-selected', () => {
      let showDelSelection = false;
      querySelectorAllWithShadow('.selection-checkbox', this._axes).forEach((el) => {
        if ((el as sl.SlCheckbox).checked) {
          showDelSelection = true;
        }
      });
      this._delSelection.style.display = showDelSelection ? 'inline-block' : 'none';
    });
    this._delSelection = (
      <sl-button
        variant="text"
        size="small"
        style={{ display: 'none' }}
        onclick={(ev) => {
          ev.stopPropagation();
          let count = 0;
          querySelectorAllWithShadow('.selection-checkbox', this._axes).forEach((el) => {
            if ((el as sl.SlCheckbox).checked) {
              count += 1;
            }
          });
          modal
            .confirm({
              message: <>Are you sure you want to delete {count} axes?</>,
            })
            .then((yes) => {
              if (yes) {
                querySelectorAllWithShadow('.selection-checkbox', this._axes).forEach((el) => {
                  if ((el as sl.SlCheckbox).checked) {
                    const index = getIndexInParent(el.parentElement!.parentElement!.parentElement!);
                    this._axes.childNodes.item(index).remove();
                  }
                });
                this._updateDelSelection();
                this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
              }
            });
        }}
      >
        Del selection
      </sl-button>
    ) as sl.SlButton;
  }

  private _updateDelSelection(): void {
    let count = 0;
    querySelectorAllWithShadow('.selection-checkbox', this._axes).forEach((el) => {
      if ((el as sl.SlCheckbox).checked) {
        count += 1;
      }
    });
    if (count === 0) {
      this._delSelection.style.display = 'none';
    }
  }

  connectedCallback() {
    this.replaceChildren(
      <gui-details open>
        <summary slot="summary">
          <span>yAxes</span>
          <div>
            <sl-button
              variant="text"
              size="small"
              onclick={async (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                const key = await modal.input({
                  title: 'New ordinate axis',
                  inputProps: { label: 'Name' },
                });
                if (key) {
                  (this.children[0] as sl.SlDetails).open = true;
                  const ord = (<gui-chart-ordinate-input header={key} />) as GuiChartOrdinateInput;
                  this._axes.appendChild(ord);
                  // update the local state
                  this._value = this.value;
                  this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
                }
              }}
            >
              Add
            </sl-button>
            {this._delSelection}
          </div>
        </summary>
        {this._axes}
      </gui-details>,
    );

    this.update();
  }

  get value() {
    const value: Record<string, Ordinate> = {};
    this._axes.childNodes.forEach((node) => {
      const axis = node as GuiChartOrdinateInput;
      value[axis.header] = axis.value;
    });
    return value;
  }

  set value(value: Record<string, Ordinate>) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const ordinates = Object.entries(this._value);
    if (this._axes.children.length < ordinates.length) {
      // less DOM elements than required
      for (let i = 0; i < this._axes.children.length; i++) {
        const axis = this._axes.children.item(i) as GuiChartOrdinateInput;
        const [header, value] = ordinates[i];
        axis.header = header;
        axis.value = value;
      }
      for (let i = this._axes.children.length; i < ordinates.length; i++) {
        const [header, ord] = ordinates[i];
        this._axes.appendChild(<gui-chart-ordinate-input header={header} value={ord} />);
      }
    } else if (this._axes.children.length > ordinates.length) {
      // more DOM elements than required
      for (let i = 0; i < ordinates.length; i++) {
        const axis = this._axes.children.item(i) as GuiChartOrdinateInput;
        const [header, value] = ordinates[i];
        axis.header = header;
        axis.value = value;
      }
      let nextSibling = this._axes.children.item(ordinates.length) as ChildNode | null;
      while (nextSibling) {
        const toRemove = nextSibling;
        nextSibling = nextSibling.nextSibling;
        toRemove.remove();
      }
    } else {
      // exactly the same amount
      this._axes.childNodes.forEach((node, i) => {
        const axis = node as GuiChartOrdinateInput;
        const [header, value] = ordinates[i];
        axis.header = header;
        axis.value = value;
      });
    }
  }
}
export class GuiChartSelectionInput extends HTMLElement {
  private _value: Partial<SelectionOptions> | false = false;

  private _checkbox: sl.SlCheckbox;
  private _threshold: sl.SlInput;
  private _orientation: sl.SlSelect;

  constructor() {
    super();

    this._checkbox = (
      <sl-checkbox
        size="small"
        onsl-change={() => {
          const disabled = !this._checkbox.checked;
          this._threshold.disabled = disabled;
          this._orientation.disabled = disabled;
        }}
      >
        Selection?
      </sl-checkbox>
    ) as sl.SlCheckbox;
    this._threshold = (
      <sl-input
        size="small"
        label="Threshold"
        type="number"
        defaultValue="10"
        disabled
        helpText="If the selection is smaller than this value in pixels, it will be ignored"
      />
    ) as sl.SlInput;
    this._orientation = (
      <sl-select size="small" hoist label="Orientation" helpText="Allows selection on specific axes, or both" disabled>
        <sl-option value="horizontal">horizontal</sl-option>
        <sl-option value="vertical">vertical</sl-option>
        <sl-option value="both">both</sl-option>
      </sl-select>
    ) as sl.SlSelect;
  }

  connectedCallback() {
    this.replaceChildren(
      <>
        {this._checkbox}
        {this._threshold}
        {this._orientation}
      </>,
    );

    this.update();
  }

  get value(): Partial<SelectionOptions> | false {
    if (this._checkbox.checked) {
      const selection: Partial<SelectionOptions> = {};
      const orientation = getSelectValue(this._orientation);
      if (orientation) {
        selection.orientation = orientation as 'vertical' | 'horizontal' | 'both';
      }
      const threshold = this._threshold.valueAsNumber;
      if (!isNaN(threshold)) {
        selection.threshold = threshold;
      }
      return selection;
    }
    return false;
  }

  set value(value: Partial<SelectionOptions> | false) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value === false) {
      this._checkbox.checked = false;
      this._threshold.disabled = true;
      this._orientation.disabled = true;
    } else {
      this._checkbox.checked = true;
      this._threshold.value = `${this._value.threshold ?? ''}`;
      this._threshold.disabled = false;
      this._orientation.setAttribute('value', this._value.orientation ?? '');
      this._orientation.disabled = false;
    }
  }
}
export class GuiChartAxisInput extends HTMLElement {
  protected _value: Axis = {};

  protected _summary: HTMLElement;
  protected _scale: sl.SlSelect;
  protected _min: sl.SlInput;
  protected _max: sl.SlInput;
  protected _format: sl.SlInput;
  protected _cursorFormat: sl.SlInput;
  protected _ratio: sl.SlInput;

  constructor() {
    super();

    this._summary = (<span>Axis</span>) as HTMLElement;
    this._scale = (
      <sl-select size="small" label="Scale">
        <sl-option value="linear">linear</sl-option>
        <sl-option value="log">log</sl-option>
        <sl-option value="time">time</sl-option>
      </sl-select>
    ) as sl.SlSelect;
    this._min = (<sl-input size="small" label="Min" step="any" helpText="The axis minimum bound" />) as sl.SlInput;
    this._max = (<sl-input size="small" label="Max" step="any" helpText="The axis maximum bound" />) as sl.SlInput;
    this._format = (
      <sl-input size="small" label="Ticks">
        <span slot="help-text">
          See{' '}
          <a href="https://d3js.org/d3-format#format" target="_blank" rel="noreferrer">
            d3-format
          </a>{' '}
          or{' '}
          <a href="https://d3js.org/d3-time-format#locale_utcFormat" target="_blank" rel="noreferrer">
            d3-time-format
          </a>
        </span>
      </sl-input>
    ) as sl.SlInput;
    this._cursorFormat = (
      <sl-input size="small" label="Cursor" helpText="Cursor format (see https://d3js.org/d3-format#format)">
        <span slot="help-text">
          See{' '}
          <a href="https://d3js.org/d3-format#format" target="_blank" rel="noreferrer">
            d3-format
          </a>{' '}
          or{' '}
          <a href="https://d3js.org/d3-time-format#locale_utcFormat" target="_blank" rel="noreferrer">
            d3-time-format
          </a>
        </span>
      </sl-input>
    ) as sl.SlInput;
    this._ratio = (
      <sl-input size="small" type="number" label="Ratio" helpText="Zoom ratio on wheel events" />
    ) as sl.SlInput;

    this._scale.addEventListener('sl-change', () => {
      const scale = getSelectValue(this._scale);
      if (scale === 'time') {
        this._min.type = 'datetime-local';
        this._max.type = 'datetime-local';
      } else {
        this._min.type = 'number';
        this._max.type = 'number';
      }
      this._min.value = '';
      this._max.value = '';
    });
  }

  connectedCallback() {
    const root = (
      <gui-details>
        <summary slot="summary">{this._summary}</summary>
        <div className="gui-list">
          {this._scale}
          {this._min}
          {this._max}
          {this._ratio}
          <gui-details>
            <summary slot="summary">Styles</summary>
            <div className="gui-list">
              {this._format}
              {this._cursorFormat}
            </div>
          </gui-details>
        </div>
      </gui-details>
    ) as sl.SlDetails;
    this.replaceChildren(root);
    this.update();
  }

  get header() {
    return this._summary.textContent ?? '';
  }

  set header(header: string) {
    this._summary.textContent = header;
  }

  get value(): Axis {
    const axis = this._value;

    axis.scale = (getSelectValue(this._scale) ?? 'linear') as ScaleType;
    const min = this._getValue(this._min, axis.scale);
    if (min !== undefined) {
      axis.min = min;
    } else {
      delete axis.min;
    }
    const max = this._getValue(this._max, axis.scale);
    if (max !== undefined) {
      axis.max = max;
    } else {
      delete axis.max;
    }
    const format = this._format.value;
    if (format) {
      axis.format = format;
    }
    const cursorFormat = this._cursorFormat.value;
    if (cursorFormat) {
      axis.cursorFormat = cursorFormat;
    }
    const ratio = this._ratio.valueAsNumber;
    if (!isNaN(ratio)) {
      axis.ratio = ratio;
    } else {
      delete axis.ratio;
    }
    return axis;
  }

  set value(value: Axis) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const scale = this._value.scale ?? 'linear';
    this._scale.setAttribute('value', scale);
    if (scale === 'time') {
      this._min.type = 'datetime-local';
      this._max.type = 'datetime-local';
    } else {
      this._min.type = 'number';
      this._max.type = 'number';
    }
    this._updateValue(this._min, this._value.min);
    this._updateValue(this._max, this._value.max);
    if (typeof this._value.format === 'string') {
      this._format.value = this._value.format;
    }
    if (typeof this._value.cursorFormat === 'string') {
      this._cursorFormat.value = this._value.cursorFormat;
    }
    if (this._value.ratio !== undefined) {
      this._ratio.value = `${this._value.ratio}`;
    }
  }

  /**
   * Sets the value of the given `input` based on the type of the given `value`
   */
  private _updateValue(
    input: sl.SlInput,
    value: number | bigint | gc.core.time | Date | gc.core.Date | undefined,
  ): void {
    if (value === undefined) {
      input.value = '';
    } else if (value instanceof gc.core.time) {
      input.value = value.toInputValue();
    } else if (value instanceof Date) {
      input.value = gc.core.time.fromDate(value).toInputValue();
    } else if (typeof value === 'number' || typeof value === 'bigint') {
      if (input.type === 'datetime-local') {
        input.value = new gc.core.time(BigInt(value) * 1000n).toInputValue();
      } else {
        input.value = `${value}`;
      }
    } else if (value instanceof gc.core.Date) {
      let date = `${value.year}`.padStart(4, '0');
      date += '-';
      date += `${value.month}`.padStart(2, '0');
      date += '-';
      date += `${value.day}`.padStart(2, '0');
      date += 'T';
      date += `${value.hour}`.padStart(2, '0');
      date += ':';
      date += `${value.minute}`.padStart(2, '0');
      date += ':';
      date += `${value.second}`.padStart(2, '0');
      input.value = date;
    }
  }

  /**
   * Gets the value of the given `input` based on the type of the given `scale`
   */
  private _getValue(input: sl.SlInput, scale: ScaleType): number | gc.core.time | undefined {
    const value = input.value;
    if (value.length === 0) {
      return undefined;
    }
    if (scale === 'time') {
      return gc.core.time.fromDate(new Date(value));
    }
    return +value;
  }
}
export class GuiChartOrdinateInput extends GuiChartAxisInput {
  override _value: Ordinate = {};

  private _name: sl.SlInput;
  private _position: sl.SlSelect;

  constructor() {
    super();

    this._name = (
      <sl-input
        size="small"
        label="Name"
        helpText="The name to use for 'yAxis' in series"
        onsl-input={() => {
          this._summary.textContent = this._name.value;
        }}
      />
    ) as sl.SlInput;

    this._position = (
      <sl-select size="small" hoist label="Position">
        <sl-option value="left">left</sl-option>
        <sl-option value="right">right</sl-option>
      </sl-select>
    ) as sl.SlSelect;
  }

  override connectedCallback() {
    this.replaceChildren(
      <gui-details>
        <summary slot="summary" className="summary">
          <sl-checkbox
            className="selection-checkbox"
            size="small"
            onclick={function (ev) {
              ev.preventDefault();
              ev.stopPropagation();
              this.checked = !this.checked;
              this.dispatchEvent(new CustomEvent('gui-config-selected', { bubbles: true, composed: true }));
            }}
          />
          {this._summary}
          <sl-button
            variant="text"
            size="small"
            onclick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              this.dispatchEvent(new GuiChartConfigDeleteEvent(this.header, this));
            }}
          >
            Del
          </sl-button>
        </summary>
        <div className="gui-list">
          {this._name}
          {this._scale}
          {this._min}
          {this._max}
          {this._ratio}
          {this._position}
          <gui-details summary="Style">
            <div className="gui-list">
              {this._format}
              {this._cursorFormat}
            </div>
          </gui-details>
        </div>
      </gui-details>,
    );

    this.update();
  }

  override get header() {
    return this._summary.textContent ?? '';
  }

  override set header(name: string) {
    super.header = name;
    this._name.value = name;
  }

  override get value() {
    const value: Ordinate = super.value;
    const position = getSelectValue(this._position);
    if (position) {
      value.position = position as 'left' | 'right';
    }
    return value;
  }

  override set value(value: Ordinate) {
    this._value = value;
    this.update();
  }

  override update(): void {
    if (!this.isConnected) {
      return;
    }
    super.update();
    const position = this._value.position ?? '';
    this._position.setAttribute('value', position);
  }
}

export class GuiChartSeriesInput extends HTMLElement {
  private _value: Serie[] = [];

  private _series: HTMLDivElement;
  private _yAxes: string[] = [];
  private _delSelection: sl.SlButton;

  constructor() {
    super();

    this._series = document.createElement('div');
    this._series.classList.add('gui-list', 'smart');
    this._series.addEventListener('gui-chart-config-delete', (ev) => {
      ev.stopPropagation();
      if (!(ev.target instanceof HTMLElement)) {
        return;
      }
      const elIndex = getIndexInParent(ev.target);
      modal
        .confirm({
          message: (
            <>
              Are you sure you want to delete serie <strong>{ev.detail.name}</strong>?
            </>
          ),
        })
        .then((yes) => {
          if (yes) {
            this._value.splice(elIndex, 1);
            ev.detail.el.remove();
            this._updateDelSelection();
            this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
          }
        });
    });
    this._series.addEventListener('gui-config-selected', () => {
      let showDelSelection = false;
      querySelectorAllWithShadow('.selection-checkbox', this._series).forEach((el) => {
        if ((el as sl.SlCheckbox).checked) {
          showDelSelection = true;
        }
      });
      this._delSelection.style.display = showDelSelection ? 'inline-block' : 'none';
    });
    this._delSelection = (
      <sl-button
        variant="text"
        size="small"
        style={{ display: 'none' }}
        onclick={(ev) => {
          ev.stopPropagation();
          let count = 0;
          querySelectorAllWithShadow('.selection-checkbox', this._series).forEach((el) => {
            if ((el as sl.SlCheckbox).checked) {
              count += 1;
            }
          });
          modal
            .confirm({
              message: <>Are you sure you want to delete {count} series?</>,
            })
            .then((yes) => {
              if (yes) {
                querySelectorAllWithShadow('.selection-checkbox', this._series).forEach((el) => {
                  if ((el as sl.SlCheckbox).checked) {
                    const serieIndex = getIndexInParent(el.parentElement!.parentElement!.parentElement!);
                    this._value.splice(serieIndex, 1);
                    this._series.childNodes.item(serieIndex).remove();
                  }
                });
                this._updateDelSelection();
                this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
              }
            });
        }}
      >
        Del selection
      </sl-button>
    ) as sl.SlButton;
  }

  private _updateDelSelection(): void {
    if (this._value.length === 0) {
      this._delSelection.style.display = 'none';
      return;
    }

    let count = 0;
    querySelectorAllWithShadow('.selection-checkbox', this._series).forEach((el) => {
      if ((el as sl.SlCheckbox).checked) {
        count += 1;
      }
    });
    if (count === 0) {
      this._delSelection.style.display = 'none';
    }
  }

  connectedCallback() {
    this.replaceChildren(
      <gui-details open>
        <summary slot="summary">
          <span>Series</span>
          <div>
            <sl-button
              variant="text"
              size="small"
              onclick={async (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                const serie = (<gui-chart-serie-input yAxes={this._yAxes} />) as GuiChartSerieInput;
                this._series.appendChild(serie);
                // update the local state
                this._value = this.value;
                this.dispatchEvent(new CustomEvent('sl-change', { bubbles: true, composed: true }));
              }}
            >
              Add
            </sl-button>
            {this._delSelection}
          </div>
        </summary>
        {this._series}
      </gui-details>,
    );

    this.update();
  }

  get value() {
    const series: Serie[] = [];
    this._series.childNodes.forEach((node) => {
      series.push((node as GuiChartSerieInput).value);
    });
    return series;
  }

  set value(value: Serie[]) {
    this._value = value;
    this.update();
  }

  set yAxes(yAxes: string[]) {
    this._yAxes = yAxes;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    // We only want to update DOM elements to reflect the current state
    if (this._series.children.length < this._value.length) {
      // less DOM elements than required
      for (let i = 0; i < this._series.children.length; i++) {
        const serie = this._series.children.item(i) as GuiChartSerieInput;
        serie.yAxes = this._yAxes;
        serie.value = this._value[i];
      }
      // add new elements
      for (let i = this._series.children.length; i < this._value.length; i++) {
        const serie = this._value[i];
        this._series.appendChild(<gui-chart-serie-input yAxes={this._yAxes} value={serie} />);
      }
    } else if (this._series.children.length > this._value.length) {
      // more DOM elements than required
      for (let i = 0; i < this._value.length; i++) {
        const serie = this._series.children.item(i) as GuiChartSerieInput;
        serie.yAxes = this._yAxes;
        serie.value = this._value[i];
      }
      let nextSibling = this._series.children.item(this._value.length) as ChildNode | null;
      while (nextSibling) {
        const toRemove = nextSibling;
        nextSibling = nextSibling.nextSibling;
        toRemove.remove();
      }
    } else {
      // exactly the same amount
      this._series.childNodes.forEach((node, i) => {
        const serie = node as GuiChartSerieInput;
        serie.yAxes = this._yAxes;
        serie.value = this._value[i];
      });
    }
  }
}

export class GuiChartSerieInput extends HTMLElement {
  private _value: Serie = { type: 'line', yAxis: '', yCol: 0 };
  private _yAxes: string[] = [];

  private _summary: HTMLElement;
  private _hide: sl.SlCheckbox;
  private _title: sl.SlInput;
  private _type: sl.SlSelect;
  private _xCol: sl.SlInput;
  private _yCol: sl.SlInput;
  private _yCol2: sl.SlInput;
  private _yAxis: sl.SlSelect;
  private _color: sl.SlColorPicker;
  private _spanCol0: sl.SlInput;
  private _spanCol1: sl.SlInput;
  private _baseline: sl.SlInput;
  private _plotRadius: sl.SlInput;
  private _hideInTooltip: sl.SlCheckbox;
  private _width: sl.SlInput;
  private _markerWidth: sl.SlInput;
  private _markerShape: sl.SlSelect;
  private _markerColor: sl.SlColorPicker;

  private _onTypeChange = () => {
    const type = getSelectValue(this._type);
    switch (type) {
      case 'bar':
        this._spanCol0.style.display = 'block';
        this._spanCol1.style.display = 'block';
        this._baseline.style.display = 'block';
        this._yCol2.style.display = 'none';
        this._plotRadius.style.display = 'none';
        break;
      case 'line+scatter':
        this._spanCol0.style.display = 'none';
        this._spanCol1.style.display = 'none';
        this._baseline.style.display = 'none';
        this._yCol2.style.display = 'none';
        this._plotRadius.style.display = 'block';
        break;
      case 'area':
        this._spanCol0.style.display = 'none';
        this._spanCol1.style.display = 'none';
        this._baseline.style.display = 'none';
        this._yCol2.style.display = 'block';
        this._plotRadius.style.display = 'none';
        break;
      case 'line+area':
        this._spanCol0.style.display = 'none';
        this._spanCol1.style.display = 'none';
        this._baseline.style.display = 'none';
        this._yCol2.style.display = 'block';
        this._plotRadius.style.display = 'none';
        break;
      default:
        this._spanCol0.style.display = 'none';
        this._spanCol1.style.display = 'none';
        this._baseline.style.display = 'none';
        this._yCol2.style.display = 'none';
        this._plotRadius.style.display = 'none';
        break;
    }
  };

  constructor() {
    super();

    this._summary = (<span>Serie</span>) as HTMLElement;
    this._hide = (<sl-checkbox helpText="Prevents drawing">Hide</sl-checkbox>) as sl.SlCheckbox;
    this._title = (
      <sl-input
        size="small"
        label="Title"
        onsl-input={() => {
          this._summary.textContent = this._title.value || 'Serie';
        }}
      />
    ) as sl.SlInput;
    this._type = (
      <sl-select size="small" hoist label="Type" onsl-change={this._onTypeChange}>
        <sl-option value="line">line</sl-option>
        <sl-option value="bar">bar</sl-option>
        <sl-option value="scatter">scatter</sl-option>
        <sl-option value="line+scatter">line+scatter</sl-option>
        <sl-option value="area">area</sl-option>
        <sl-option value="line+area">line+area</sl-option>
        <sl-option value="custom" disabled>
          custom
        </sl-option>
      </sl-select>
    ) as sl.SlSelect;
    this._xCol = (
      <sl-input size="small" label="xCol" helpText="Optional offset/field of the 'x' column" />
    ) as sl.SlInput;
    this._yCol = (
      <sl-input size="small" label="yCol" helpText="Offset/field of the 'y' column" required />
    ) as sl.SlInput;
    this._yCol2 = (
      <sl-input
        size="small"
        label="yCol2"
        type="number"
        helpText="Draws the area from 'yCol' to 'yCol2'"
        style={{ display: 'none' }}
      />
    ) as sl.SlInput;
    this._yAxis = (
      <sl-select size="small" label="yAxis" helpText="The 'y' axis name to draw against" hoist required />
    ) as sl.SlSelect;
    this._spanCol0 = (
      <sl-input size="small" label="Span col 0" type="number" style={{ display: 'none' }} />
    ) as sl.SlInput;
    this._spanCol1 = (
      <sl-input size="small" label="Span col 1" type="number" style={{ display: 'none' }} />
    ) as sl.SlInput;
    this._baseline = (
      <sl-input size="small" label="Baseline" type="number" style={{ display: 'none' }} />
    ) as sl.SlInput;
    this._plotRadius = (
      <sl-input size="small" label="Plot radius" type="number" style={{ display: 'none' }} />
    ) as sl.SlInput;
    this._color = (<sl-color-picker label="Color" />) as sl.SlColorPicker;
    this._hideInTooltip = (
      <sl-checkbox helpText="Will hide this serie in the tooltip">Hide in tooltip</sl-checkbox>
    ) as sl.SlCheckbox;
    this._width = (<sl-input size="small" label="Width" type="number" />) as sl.SlInput;
    this._markerWidth = (<sl-input size="small" label="Marker width" type="number" />) as sl.SlInput;
    this._markerShape = (
      <sl-select size="small" label="Marker shape">
        <sl-option value="circle">circle</sl-option>
        <sl-option value="triangle">triangle</sl-option>
        <sl-option value="square">square</sl-option>
      </sl-select>
    ) as sl.SlSelect;
    this._markerColor = (<sl-color-picker label="Marker color" />) as sl.SlColorPicker;
  }

  connectedCallback() {
    this.replaceChildren(
      <gui-details>
        <summary slot="summary" className="summary">
          <sl-checkbox
            className="selection-checkbox"
            size="small"
            onclick={function (ev) {
              ev.preventDefault();
              ev.stopPropagation();
              this.checked = !this.checked;
              this.dispatchEvent(new CustomEvent('gui-config-selected', { bubbles: true, composed: true }));
            }}
          />
          {this._summary}
          <sl-button
            variant="text"
            size="small"
            onclick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              this.dispatchEvent(new GuiChartConfigDeleteEvent(this.header, this));
            }}
          >
            Del
          </sl-button>
        </summary>
        <div className="gui-list">
          {this._title}
          {this._type}
          {this._xCol}
          {this._yCol}
          {this._yCol2}
          {this._yAxis}
          {this._hide}
          {this._hideInTooltip}
          {this._spanCol0}
          {this._spanCol1}
          {this._baseline}
          <gui-details summary="Style">
            <div className="gui-list">
              {this._plotRadius}
              <div className="gui-chart-config-input-field">
                <div className="gui-chart-config-input-label">Color</div>
                {this._color}
              </div>
              {this._width}
              {this._markerWidth}
              {this._markerShape}
              <div className="gui-chart-config-input-field">
                <div className="gui-chart-config-input-label">Marker color</div>
                {this._markerColor}
              </div>
            </div>
          </gui-details>
        </div>
      </gui-details>,
    );

    this.update();
  }

  get header() {
    return this._summary.textContent ?? '';
  }

  set header(header: string) {
    this._summary.textContent = header;
    this._title.value = header;
  }

  get yAxes() {
    return this._yAxes;
  }

  set yAxes(names: string[]) {
    this._yAxes = names;
    this.update();
  }

  get value() {
    const value = this._value;

    const xCol = this._xCol.value;
    const xColN = parseInt(xCol);
    if (isNaN(xColN)) {
      if (xCol.length === 0) {
        delete value.xCol;
      } else {
        value.xCol = xCol;
      }
    } else {
      value.xCol = xColN;
    }

    const yCol = this._yCol.value;
    const yColN = parseInt(yCol);
    if (isNaN(yColN)) {
      if (yCol.length !== 0) {
        value.yCol = yCol;
      }
    } else {
      value.yCol = yColN;
    }

    const title = this._title.value;
    if (title) {
      value.title = title;
    } else {
      delete value.title;
    }

    const color = this._color.value;
    if (color.length !== 0) {
      value.color = color;
    } else {
      delete value.color;
    }

    if (this._hideInTooltip.checked) {
      value.hideInTooltip = true;
    } else {
      delete value.hideInTooltip;
    }

    if (this._hide.checked) {
      value.hide = true;
    } else {
      delete value.hide;
    }

    const serieType = getSelectValue(this._type);
    if (serieType) {
      value.type = serieType as 'line' | 'bar' | 'scatter' | 'line+scatter' | 'area' | 'line+area';
    }

    const yAxis = getSelectValue(this._yAxis);
    if (yAxis) {
      value.yAxis = yAxis;
    }

    const width = this._width.valueAsNumber;
    if (isNaN(width)) {
      delete value.width;
    } else {
      value.width = width;
    }

    const markerWidth = this._markerWidth.valueAsNumber;
    if (isNaN(markerWidth)) {
      delete value.markerWidth;
    } else {
      value.markerWidth = markerWidth;
    }

    const markerShape = getSelectValue(this._markerShape);
    if (markerShape) {
      value.markerShape = markerShape as MarkerShape;
    }

    const markerColor = this._markerColor.value;
    if (markerColor) {
      value.markerColor = markerColor;
    }

    switch (value.type) {
      case 'bar': {
        const spanCol0 = this._spanCol0.valueAsNumber;
        const spanCol1 = this._spanCol1.valueAsNumber;
        if (!isNaN(spanCol0) && !isNaN(spanCol1)) {
          value.spanCol = [spanCol0, spanCol1];
        } else {
          delete value.spanCol;
        }
        const baseline = this._baseline.valueAsNumber;
        if (!isNaN(baseline)) {
          value.baseLine = baseline;
        } else {
          delete value.baseLine;
        }
        break;
      }
      case 'line+scatter': {
        const v = this._plotRadius.valueAsNumber;
        if (!isNaN(v)) {
          value.plotRadius = v;
        } else {
          delete value.plotRadius;
        }
        break;
      }
      case 'area':
      case 'line+area': {
        const v = this._yCol2.valueAsNumber;
        if (!isNaN(v)) {
          value.yCol2 = v;
        } else {
          delete value.yCol2;
        }
        break;
      }
      default:
        break;
    }
    return value;
  }

  set value(value: Serie) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    this._summary.textContent = this._value.title ?? 'Serie';
    this._title.value = this._value.title ?? '';

    this._type.setAttribute('value', this._value.type);
    this._xCol.value = `${this._value.xCol ?? ''}`;
    this._yCol.value = `${this._value.yCol ?? ''}`;
    this._width.value = `${this._value.width ?? ''}`;

    if (this._yAxes.length === 0) {
      this._yAxis.replaceChildren();
      this._yAxis.setAttribute('value', '');
      this._yAxis.setAttribute('data-user-invalid', '');
    } else {
      this._yAxis.replaceChildren();
      // populate yAxis select according to state
      for (const name of this._yAxes) {
        this._yAxis.appendChild(<sl-option value={name}>{name}</sl-option>);
      }
      if (this._yAxes.includes(this._value.yAxis)) {
        this._yAxis.removeAttribute('data-user-invalid');
      } else {
        this._yAxis.setAttribute('data-user-invalid', '');
      }
      this._yAxis.setAttribute('value', this._value.yAxis || this._yAxes[0]);
    }

    if (this._value.type === 'bar') {
      if (this._value.spanCol?.[0] !== undefined) {
        this._spanCol0.value = `${this._value.spanCol[0]}`;
      }
      if (this._value.spanCol?.[1] !== undefined) {
        this._spanCol1.value = `${this._value.spanCol[1]}`;
      }
      this._baseline.value = `${this._value.baseLine ?? ''}`;
    } else if (this._value.type === 'line+scatter') {
      this._plotRadius.value = `${this._value.plotRadius ?? ''}`;
    }

    if (this._value.color !== undefined) {
      this._color.value = this._value.color;
    }

    if (this._value.markerWidth !== undefined) {
      this._markerWidth.value = `${this._value.markerWidth}`;
    }
    this._markerShape.setAttribute('value', this._value.markerShape || 'circle');
    if (this._value.markerColor !== undefined) {
      this._markerColor.value = this._value.markerColor;
    }

    this._hide.checked = !!this._value.hide;
    this._hideInTooltip.checked = !!this._value.hideInTooltip;
  }
}

export class GuiChartConfigUpdateEvent extends CustomEvent<{ old: ChartConfig; new: ChartConfig }> {
  static readonly NAME = 'gui-chart-config-update';

  constructor(oldConfig: ChartConfig, newConfig: ChartConfig) {
    super(GuiChartConfigUpdateEvent.NAME, {
      detail: { old: oldConfig, new: newConfig },
      bubbles: true,
      composed: true,
    });
  }
}

export class GuiChartConfigDeleteEvent extends CustomEvent<{ name: string; el: Element }> {
  static readonly NAME = 'gui-chart-config-delete';

  constructor(name: string, el: Element) {
    super(GuiChartConfigDeleteEvent.NAME, { detail: { name, el }, bubbles: true, composed: true });
  }
}

function getSelectValue(select: sl.SlSelect): string | undefined {
  const value = select.value;
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return value[0];
    }
    return;
  }
  if (value.length !== 0) {
    return value;
  }
  return;
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiChartConfig} */
    'gui-chart-config': GuiChartConfig;
    /** @see {@link GuiChartAxisInput} */
    'gui-chart-axis-input': GuiChartAxisInput;
    /** @see {@link GuiChartYAxesInput} */
    'gui-chart-yaxes-input': GuiChartYAxesInput;
    /** @see {@link GuiChartOrdinateInput} */
    'gui-chart-ordinate-input': GuiChartOrdinateInput;
    /** @see {@link GuiChartSelectionInput} */
    'gui-chart-selection-input': GuiChartSelectionInput;
    /** @see {@link GuiChartSeriesInput} */
    'gui-chart-series-input': GuiChartSeriesInput;
    /** @see {@link GuiChartSerieInput} */
    'gui-chart-serie-input': GuiChartSerieInput;
  }

  interface GuiChartConfigEventMap {
    [GuiChartConfigDeleteEvent.NAME]: GuiChartConfigDeleteEvent;
    [GuiChartConfigUpdateEvent.NAME]: GuiChartConfigUpdateEvent;
  }

  interface HTMLElementEventMap extends GuiChartConfigEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiChartConfig} */
        'gui-chart-config': GreyCat.Element<GuiChartConfig, GuiChartConfigEventMap>;
        /** @see {@link GuiChartAxisInput} */
        'gui-chart-axis-input': GreyCat.Element<GuiChartAxisInput>;
        /** @see {@link GuiChartYAxesInput} */
        'gui-chart-yaxes-input': GreyCat.Element<GuiChartYAxesInput>;
        /** @see {@link GuiChartOrdinateInput} */
        'gui-chart-ordinate-input': GreyCat.Element<GuiChartOrdinateInput>;
        /** @see {@link GuiChartSelectionInput} */
        'gui-chart-selection-input': GreyCat.Element<GuiChartSelectionInput>;
        /** @see {@link GuiChartSeriesInput} */
        'gui-chart-series-input': GreyCat.Element<GuiChartSeriesInput>;
        /** @see {@link GuiChartSerieInput} */
        'gui-chart-serie-input': GreyCat.Element<GuiChartSerieInput>;
      }
    }
  }
}
