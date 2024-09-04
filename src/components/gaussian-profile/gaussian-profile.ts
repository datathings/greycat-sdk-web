import { core, util } from '@greycat/sdk';
import { Bounds, GuiHeatmap } from '../../exports';
import { format } from 'd3';

type GaussianProfileMode = 'avg' | 'std';

export class GuiGaussianProfile extends HTMLElement {
  private _value?: util.GaussianProfile;
  private _mode: GaussianProfileMode = 'avg';

  constructor() {
    super();
  }

  set value(val: util.GaussianProfile) {
    this._value = val;
    this._render();
  }

  get value(): util.GaussianProfile | undefined {
    return this._value;
  }

  set mode(val: GaussianProfileMode) {
    this._mode = val;
  }

  connectedCallback() {}

  private _render() {
    if (!this._value?.bins) return;
    const quant = this._value.quantizer;

    if (quant instanceof util.LinearQuantizer || quant instanceof util.LogQuantizer) {
      this._render_one_d(this._value);
    } else if (quant instanceof util.MultiQuantizer) {
      if (
        quant.dimensions.length === 1 &&
        (quant.dimensions[0] instanceof util.LinearQuantizer ||
          quant.dimensions[0] instanceof util.LogQuantizer)
      ) {
        this._render_one_d(this._value);
      } else if (
        quant.dimensions.length === 2 &&
        (quant.dimensions[0] instanceof util.LinearQuantizer ||
          quant.dimensions[0] instanceof util.LogQuantizer) &&
        (quant.dimensions[1] instanceof util.LinearQuantizer ||
          quant.dimensions[1] instanceof util.LogQuantizer)
      ) {
        this._render_two_d(this._value);
      }
    }
  }

  private _render_one_d(gaussian: util.GaussianProfile) {
    const bins = gaussian.bins!;
    const quantizer = gaussian.quantizer as util.LinearQuantizer | util.LogQuantizer;

    const chart = document.createElement('gui-chart');
    chart.config = {
      xAxis: { scale: 'linear' },
      yAxes: { left: {} },
      series: [
        {
          title: this._mode,
          type: 'bar',
          yAxis: 'left',
          yCol: 2,
          spanCol: [0, 1],
        },
      ],
    };

    const data: unknown[][] = Array.from({ length: bins.cols[0].length });

    const bounds = new Bounds();
    for (let index = 0; index < bins.cols[0].length; index++) {
      bounds.compute(index, quantizer);

      const sum = Number(bins.cols[0][index]);
      const sumsq = Number(bins.cols[1][index]);
      const count = Number(bins.cols[2][index]);
      let val: number;
      if (this._mode === 'avg') {
        val = this._get_avg(count, sum, gaussian.value_min, gaussian.precision);
      } else {
        val = this._get_std(count, sum, sumsq, gaussian.precision);
      }
      data[index] = [bounds.min, bounds.max, val];
    }

    chart.config.xAxis.min = data[0][0] as number;
    chart.config.xAxis.max = data[data.length - 1][1] as number;

    chart.value = { rows: data };

    this.replaceChildren(chart);
  }

  private _render_two_d(gaussian: util.GaussianProfile) {
    const bins = gaussian.bins!;
    const quantizers = (gaussian.quantizer as util.MultiQuantizer).dimensions as (
      | util.LinearQuantizer
      | util.LogQuantizer
    )[];

    const chart = document.createElement('gui-heatmap');
    chart.config = {
      colorScale: { colors: GuiHeatmap.VIRIDIS_COLORS, title: this._mode },
      xAxis: {},
      yAxis: {},
    };

    const data = Array.from({ length: Number(quantizers[0].bins) }, (_) =>
      Array.from({ length: Number(quantizers[1].bins) }),
    );

    const xLabels: string[] = [];
    const yLabels: string[] = [];

    const formatter = format('~s');

    const bounds = new Bounds();
    const cols = Number(quantizers[0].bins);
    for (let col = 0; col < quantizers[0].bins; col++) {
      xLabels.push(formatter(bounds.compute(col, quantizers[0]).min));

      for (let row = 0; row < quantizers[1].bins; row++) {
        if (col === 0) {
          yLabels.push(formatter(bounds.compute(row, quantizers[1]).max));
        }

        const idx = row * cols + col;

        const sum = Number(bins.cols[0][idx]);
        const sumsq = Number(bins.cols[1][idx]);
        const count = Number(bins.cols[2][idx]);

        let val: number;
        if (this._mode === 'avg') {
          val = this._get_avg(count, sum, gaussian.value_min, gaussian.precision);
        } else {
          val = this._get_std(count, sum, sumsq, gaussian.precision);
        }
        data[col][row] = val;
      }
    }

    chart.value = { rows: data };

    this.replaceChildren(chart);
  }

  private _get_avg(
    count: number,
    sum: number,
    minValue: number | null,
    precision: core.FloatPrecision,
  ): number {
    if (count === 0) return count;
    const sumf = sum / (precision.value as number);
    let avg = sumf / count;
    if (minValue !== null) {
      avg += minValue;
    }
    return avg;
  }

  private _get_std(
    count: number,
    sum: number,
    sumsq: number,
    precision: core.FloatPrecision,
  ): number {
    if (count === 0) return count;
    const s = (sum * sum) / count;
    let std: number;
    if (count > 1 && sumsq > s) {
      std = Math.sqrt((sumsq - s) / (count - 1));
    } else {
      std = 0;
    }
    return std / (precision.value as number);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-gaussian-profile': GuiGaussianProfile;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-gaussian-profile': GreyCat.Element<GuiGaussianProfile>;
    }
  }
}

if (!globalThis.customElements.get('gui-gaussian-profile')) {
  globalThis.customElements.define('gui-gaussian-profile', GuiGaussianProfile);
}
