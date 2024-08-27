import { ChartConfig, util } from '../../exports.js';

export class GuiHistogram extends HTMLElement {
  static GC_UTIL_THRESHOLD_LOG = 1e-4;

  private _value?: util.Histogram;

  constructor() {
    super();
  }

  set value(val: util.Histogram) {
    this._value = val;
    this.render();
  }

  get value(): util.Histogram | undefined {
    return this._value;
  }

  private render() {
    if (!this._value?.bins) return;

    const config: ChartConfig = {
      xAxis: {},
      yAxes: { left: {} },
      series: [{ type: 'bar', yAxis: 'left', yCol: 2, spanCol: [0, 1] }],
    };
    const chart = document.createElement('gui-chart');

    const data: number[][] = Array.from({ length: this._value.bins.length });
    for (let index = 0; index < this._value.bins.length; index++) {
      const bounds = this._get_bounds(index, this._value.quantizer);
      data[index] = [bounds[0], bounds[1], Number(this._value.bins[index])];
    }

    // Temp Fix to be removed once serie of type bar works with spanCol correctly
    config.xAxis.min = data[0][0] as number;
    config.xAxis.max = data[data.length - 1][1] as number;

    chart.config = config;
    chart.value = { rows: data };

    this.replaceChildren(chart);
  }

  connectedCallback() {}

  private _get_bounds(slot: number, quantizer: util.Quantizer): [number, number] {
    if (quantizer instanceof util.LinearQuantizer) {
      const step = (quantizer.max - quantizer.min) / Number(quantizer.bins);
      return [quantizer.min + slot * step, quantizer.min + (slot + 1) * step];
    } else if (quantizer instanceof util.LogQuantizer) {
      const bins = Number(quantizer.bins);
      let min = quantizer.min;
      let max = quantizer.max;
      if (quantizer.min > 0 && quantizer.max > 0) {
        const logMin = Math.log(quantizer.min);
        const logMax = Math.log(quantizer.max);
        const step = (logMax - logMin) / bins;
        if (slot !== 0) {
          min = logMin + slot * step;
        }
        if (slot !== bins - 1) {
          max = logMin + (slot + 1) * step;
        }
      } else {
        if (min < 0 && max < 0) {
          const logMin = Math.log(-max);
          const logMax = Math.log(-min);
          const step = (logMax - logMin) / bins;
          slot = bins - 1 - slot;
          min = -Math.exp(logMin + (slot + 1) * step);
          max = -Math.exp(logMin + slot * step);
        } else {
          const thresholdLog = Math.log(GuiHistogram.GC_UTIL_THRESHOLD_LOG);
          if (slot === bins / 2) {
            min = -GuiHistogram.GC_UTIL_THRESHOLD_LOG;
            max = GuiHistogram.GC_UTIL_THRESHOLD_LOG;
          } else if (slot > bins / 2) {
            const logMax = Math.log(max);
            const step = logMax - thresholdLog;
            if (slot == bins / 2 + 1) {
              min = GuiHistogram.GC_UTIL_THRESHOLD_LOG;
            } else {
              min = Math.exp(thresholdLog + (slot - bins / 2 - 1) * step);
            }
            if (slot !== bins - 1) {
              max = Math.exp(thresholdLog + (slot - bins / 2) * step);
            }
          } else {
            const logMin = Math.log(-min);
            const step = (thresholdLog - logMin) / (bins / 2);
            if (slot !== 0) {
              min = -Math.exp(logMin + slot * step);
            }
            if (slot === bins / 2 - 1) {
              max = -GuiHistogram.GC_UTIL_THRESHOLD_LOG;
            } else {
              max = -Math.exp(logMin + (slot + 1) * step);
            }
          }
        }
      }
      return [min, max];
    }

    return [0, 1];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-histogram': GuiHistogram;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-histogram': GreyCat.Element<GuiHistogram>;
    }
  }
}

if (!globalThis.customElements.get('gui-histogram')) {
  globalThis.customElements.define('gui-histogram', GuiHistogram);
}
