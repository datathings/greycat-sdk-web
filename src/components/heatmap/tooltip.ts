import * as d3 from 'd3';
import { HeatmapConfig, HeatmapData, HeatmapStyle } from './types.js';

export class GuiHeatmapTooltip extends HTMLElement {
  private _name: HTMLDivElement;
  private _value: HTMLDivElement;
  private _xName: HTMLDivElement;
  private _xValue: HTMLDivElement;
  private _yName: HTMLDivElement;
  private _yValue: HTMLDivElement;

  constructor() {
    super();

    this._name = document.createElement('div');

    this._value = document.createElement('div');
    this._value.className = 'gui-heatmap-tooltip-value';

    this._xName = document.createElement('div');
    this._xValue = document.createElement('div');
    this._yName = document.createElement('div');
    this._yValue = document.createElement('div');
  }

  connectedCallback() {
    this.className = 'gui-heatmap-tooltip';
    this.append(this._name, this._value, this._xName, this._xValue, this._yName, this._yValue);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  update(config: HeatmapConfig, data: HeatmapData, colorScale: d3.ScaleSequential<string, string>, style: HeatmapStyle): void {
    if (data.title) {
      this._name.textContent = data.title;
    }
    if (config.colorScale?.format) {
      this._value.textContent = `${d3.format(config.colorScale.format)(data.value)}`;
    } else {
      this._value.textContent = `${data.value}`;
    }
    this._value.style.color = colorScale(data.value);

    if (config.xAxis.title) {
      this._xName.textContent = config.xAxis.title;
    }
    this._xValue.classList.add('gui-heatmap-tooltip-value');
    this._xValue.style.color = style['text-0'];
    this._xValue.textContent = data.xValue;

    if (config.yAxis.title) {
      this._yName.textContent = config.yAxis.title;
    }
    this._yValue.classList.add('gui-heatmap-tooltip-value');
    this._yValue.style.color = style['text-0'];
    this._yValue.textContent = data.yValue;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-heatmap-tooltip': GuiHeatmapTooltip;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-heatmap-tooltip': GreyCat.Element<GuiHeatmapTooltip>;
    }
  }
}

if (!customElements.get('gui-heatmap-tooltip')) {
  customElements.define('gui-heatmap-tooltip', GuiHeatmapTooltip);
}