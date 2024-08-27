import { ChartConfig, util, core } from '../../exports.js';

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

    const config: ChartConfig = {
      xAxis: {},
      yAxes: { left: {} },
      series: [{ type: 'bar', yAxis: 'left', yCol: 2, spanCol: [0, 1] }],
    };
    const chart = document.createElement('gui-chart');
    const table = core.Table.fromRows(
      this._value.bins.map((v, i) => {
        const bounds = this._get_bounds(i, this._value!.quantizer);
        return [bounds[0], bounds[1], v];
      }),
    );

    // Temp Fix to be removed once serie of type bar works with spanCol correctly
    config.xAxis.min = table.cols[0][0] as number;
    config.xAxis.max = table.cols[1][table.cols[1].length - 1] as number;

    chart.config = config;
    chart.value = table;

    this.replaceChildren(chart);
  }

  connectedCallback() {}

  private _get_bounds(slot: number, quantizer: util.Quantizer): [number, number] {
    if (quantizer instanceof util.LinearQuantizer) {
      const step = (quantizer.max - quantizer.min) / Number(quantizer.bins);
      return [quantizer.min + slot * step, quantizer.min + (slot + 1) * step];
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
