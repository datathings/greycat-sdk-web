import { format } from 'd3';
import { Bounds, ChartConfig, GuiHeatmap, HeatmapConfig, util } from '../../exports.js';

export class GuiHistogram extends HTMLElement {
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
    let xAxisScale: 'linear' | 'log' = 'linear';
    if (quantizer instanceof util.LogQuantizer) {
      xAxisScale = 'log';
    }
    const config: ChartConfig = {
      xAxis: { scale: xAxisScale },
      yAxes: { left: {} },
      series: [{ type: 'bar', yAxis: 'left', yCol: 2, spanCol: [0, 1], title: 'Count' }],
    };
    const chart = document.createElement('gui-chart');

    const bounds = new Bounds();
    const data: number[][] = Array.from({ length: bins.length });
    for (let index = 0; index < bins.length; index++) {
      bounds.compute(index, quantizer);
      data[index] = [bounds.min, bounds.max, Number(bins[index])];
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

    const xLabels: string[] = [];
    const yLabels: string[] = [];

    const formatter = format('~s');

    const bounds = new Bounds();
    const cols = Number(quantizer[0].bins);
    for (let col = 0; col < quantizer[0].bins; col++) {
      xLabels.push(formatter(bounds.compute(col, quantizer[0]).min));

      for (let row = 0; row < quantizer[1].bins; row++) {
        if (col === 0) {
          yLabels.push(formatter(bounds.compute(row, quantizer[1]).max));
        }

        const idx = row * cols + col;
        data[col][row] = bins[idx];
      }
    }

    const config: HeatmapConfig = {
      xAxis: {
        labels: xLabels,
        hook: (axis) => {
          if (xLabels.length * 30 > this.clientWidth) {
            const a = this.clientWidth / 30;
            axis.tickValues(xLabels.filter((_, i) => i % Math.ceil(xLabels.length / a) === 0));
          }
        },
      },
      yAxis: {
        labels: yLabels,
        hook: (axis) => {
          if (yLabels.length * 15 > this.clientHeight) {
            const a = this.clientHeight / 15;
            axis.tickValues(yLabels.filter((_, i) => i % Math.ceil(yLabels.length / a) === 0));
          }
        },
      },
      colorScale: { colors: GuiHeatmap.VIRIDIS_COLORS },
    };

    heatmap.config = config;
    heatmap.value = { cols: data };
    this.replaceChildren(heatmap);
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
