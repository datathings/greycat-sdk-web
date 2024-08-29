import { ChartConfig, HeatmapConfig, util } from '../../exports.js';

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
    const quant = this._value.quantizer;

    if (quant instanceof util.LinearQuantizer || quant instanceof util.LogQuantizer) {
      this._render_histogram(this._value.bins, quant);
    } else if (quant instanceof util.MultiQuantizer) {
      if (
        quant.dimensions.length === 1 &&
        (quant.dimensions[0] instanceof util.LinearQuantizer ||
          quant.dimensions[0] instanceof util.LogQuantizer)
      ) {
        this._render_histogram(this._value.bins, quant.dimensions[0]);
      } else if (
        quant.dimensions.length === 2 &&
        (quant.dimensions[0] instanceof util.LinearQuantizer ||
          quant.dimensions[0] instanceof util.LogQuantizer) &&
        (quant.dimensions[1] instanceof util.LinearQuantizer ||
          quant.dimensions[1] instanceof util.LogQuantizer)
      ) {
        this._render_heatmap(this._value.bins, [quant.dimensions[0], quant.dimensions[1]]);
      } else {
        throw 'Not Supported';
      }
    } else {
      throw 'Not Supported';
    }
  }

  private _render_histogram(
    bins: (number | bigint | null)[],
    quantizer: util.LogQuantizer | util.LinearQuantizer,
  ) {
    const config: ChartConfig = {
      xAxis: {},
      yAxes: { left: {} },
      series: [{ type: 'bar', yAxis: 'left', yCol: 2, spanCol: [0, 1], title: 'Count' }],
    };
    const chart = document.createElement('gui-chart');

    const data: number[][] = Array.from({ length: bins.length });
    for (let index = 0; index < bins.length; index++) {
      const bounds = this._get_bounds(index, quantizer);
      data[index] = [bounds[0], bounds[1], Number(bins[index])];
    }

    // Temp Fix to be removed once serie of type bar works with spanCol correctly
    config.xAxis.min = data[0][0] as number;
    config.xAxis.max = data[data.length - 1][1] as number;

    chart.config = config;
    chart.value = { rows: data };

    this.replaceChildren(chart);
  }

  private _render_heatmap(
    bins: (number | bigint | null)[],
    quantizer: (util.LinearQuantizer | util.LogQuantizer)[],
  ) {
    const heatmap = document.createElement('gui-heatmap');

    const data = Array.from({ length: Number(quantizer[0].bins) }, (_) =>
      Array.from({ length: Number(quantizer[1].bins) }),
    );

    const xLabels = [];
    const yLabels = [];

    const cols = Number(quantizer[0].bins);
    for (let col = 0; col < quantizer[0].bins; col++) {
      const xbounds = this._get_bounds(col, quantizer[0]);
      xLabels.push(xbounds[0].toString());

      for (let row = 0; row < quantizer[1].bins; row++) {
        if (col === 0) {
          const ybounds = this._get_bounds(row, quantizer[1]);
          yLabels.push(ybounds[0].toString());
        }

        const idx = row * cols + col;
        data[col][row] = bins[idx];
      }
    }

    console.log(data);

    const config: HeatmapConfig = {
      xAxis: { labels: xLabels },
      yAxis: { labels: yLabels },
      colorScale: { colors: ['red', 'blue'] },
    };

    heatmap.config = config;
    heatmap.value = { cols: data };
    this.replaceChildren(heatmap);
  }

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

  /*   private _get_multi_bounds(slot: number, quantizer: util.MultiQuantizer): [number, number][] {
    const result = Array.from({ length: quantizer.dimensions.length });
    let multiplier = 1;
    let slotId = 0;
    let multiSlot = slot;
    for (let index = 0; index < quantizer.dimensions.length; index++) {
      const qt = quantizer.dimensions[index];
      const dimSize = this._get_quantize_size(qt);
      multiplier = multiplier * dimSize;
      slotId = multiSlot % dimSize;
      multiSlot = (multiSlot - slotId) / dimSize;

      const bounds = this._get_bounds(slot, qt);
      result[index] = bounds;
    }

    return result as [number, number][];
  } */

  /*   private _get_quantize_size(quantizer: util.Quantizer): number {
    if (quantizer instanceof util.LinearQuantizer || quantizer instanceof util.LogQuantizer) {
      return Number(quantizer.bins);
    } else if (quantizer instanceof util.MultiQuantizer) {
      let slots = 1;
      for (let index = 0; index < quantizer.dimensions.length; index++) {
        const qt = quantizer.dimensions[index];
        const size = this._get_quantize_size(qt);
        if (size === -1) {
          return 0;
        }
        slots *= size;
      }
      return slots;
    }
    return -1;
  } */
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
