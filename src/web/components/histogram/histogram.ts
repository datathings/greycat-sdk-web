import { ChartConfig } from '../../exports.js';

export class GuiHistogram extends HTMLElement {
  static GC_UTIL_THRESHOLD_LOG = 1e-4;

  private _value?: gc.util.HistogramBin[];
  private _stats?: gc.util.HistogramStats;

  constructor() {
    super();
  }

  set value(val: gc.util.HistogramBin[]) {
    this._value = val;
    this._stats = undefined;
    this.render();
  }

  get value(): gc.util.HistogramBin[] | undefined {
    return this._value;
  }

  set stats(val: gc.util.HistogramStats) {
    this._stats = val;
    this._value = undefined;
    this.render();
  }

  get stats(): gc.util.HistogramStats | undefined {
    return this._stats;
  }

  private render() {
    if (this._value) {
      let dims = 0;
      for (let i = 0; i < this._value.length; i++) {
        const bin = this._value[i].bin;
        if (typeof bin.center === 'number') {
          dims = 1;
          break;
        } else if (Array.isArray(bin.center)) {
          dims = bin.center.length;
          break;
        }
      }
      if (dims === 0) {
        Error("Can't render this histogram dimensions are empty");
      }
      if (dims === 1) {
        this._render_histogram(this._value);
      } else if (dims === 2) {
        Error('Not supported yet');
        //TODO To implement when histogram supports multiple dimensions
      } else {
        Error('Not supported yet');
        //TODO To implement when histogram supports multiple dimensions
      }
    } else if (this._stats) {
      this._render_boxplot(this._stats);
    }
  }

  private _render_histogram(data: gc.util.HistogramBin[]) {
    const t = [];
    for (let index = 0; index < data.length; index++) {
      const d = data[index];
      t.push([d.count, d.bin.min, d.bin.max]);
    }
    const config: ChartConfig = {
      xAxis: { scale: 'linear' },
      yAxes: { left: {} },
      series: [
        {
          type: 'bar',
          yAxis: 'left',
          yCol: 0,
          spanCol: [1, 2],
          title: 'Count',
        },
      ],
    };
    const chart = document.createElement('gui-chart');
    chart.config = config;
    chart.value = t;
    this.replaceChildren(chart);
  }

  private _render_boxplot(stats: gc.util.HistogramStats<number>) {
    const config: ChartConfig = {
      xAxis: { scale: 'linear', min: stats.min, max: stats.max },
      yAxes: {
        left: {
          min: 0,
          max: 10,
          hook(axis) {
            axis.tickValues([]);
          },
        },
      },
      series: [
        {
          type: 'custom',
          yAxis: 'left',
          yCol: 0,
          draw(ctx, _serie, xScale, yScale) {
            ctx.boxPlot(
              {
                median: xScale(stats.percentile50),
                q1: xScale(stats.percentile25),
                q3: xScale(stats.percentile75),
                max: xScale(stats.whisker_high),
                min: xScale(stats.whisker_low),
                crossValue: yScale(5),
              },
              {
                width: (yScale.range()[0] - yScale.range()[1]) * 0.9,
                orientation: 'horizontal',
                iqrColor: _serie.color,
              },
            );
          },
        },
      ],
    };
    const chart = document.createElement('gui-chart');
    chart.config = config;
    chart.value = [];
    this.replaceChildren(chart);
  }

  // private _render_heatmap(
  //   bins: (number | bigint | null)[],
  //   quantizer: (gc.util.LinearQuantizer | gc.util.LogQuantizer)[],
  // ) {
  //   const heatmap = document.createElement('gui-heatmap');

  //   const data = Array.from({ length: Number(quantizer[0].bins) }, (_) =>
  //     Array.from({ length: Number(quantizer[1].bins) }),
  //   );

  //   const xLabels: string[] = [];
  //   const yLabels: string[] = [];

  //   const formatter = format('~s');

  //   const bounds = new Bounds();
  //   const cols = Number(quantizer[0].bins);
  //   for (let col = 0; col < quantizer[0].bins; col++) {
  //     xLabels.push(formatter(bounds.compute(col, quantizer[0]).min));

  //     for (let row = 0; row < quantizer[1].bins; row++) {
  //       if (col === 0) {
  //         yLabels.push(formatter(bounds.compute(row, quantizer[1]).max));
  //       }

  //       const idx = row * cols + col;
  //       data[col][row] = bins[idx];
  //     }
  //   }

  //   const config: HeatmapConfig = {
  //     xAxis: {
  //       labels: xLabels,
  //       hook: (axis) => {
  //         if (xLabels.length * 30 > this.clientWidth) {
  //           const a = this.clientWidth / 30;
  //           axis.tickValues(xLabels.filter((_, i) => i % Math.ceil(xLabels.length / a) === 0));
  //         }
  //       },
  //     },
  //     yAxis: {
  //       labels: yLabels,
  //       hook: (axis) => {
  //         if (yLabels.length * 15 > this.clientHeight) {
  //           const a = this.clientHeight / 15;
  //           axis.tickValues(yLabels.filter((_, i) => i % Math.ceil(yLabels.length / a) === 0));
  //         }
  //       },
  //     },
  //     colorScale: { colors: GuiHeatmap.VIRIDIS_COLORS },
  //   };

  //   heatmap.config = config;
  //   heatmap.value = { cols: data };
  //   this.replaceChildren(heatmap);
  // }

  //private _render_table(data: gc.util.HistogramBin[]) {}
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-histogram': GuiHistogram;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-histogram': GreyCat.Element<GuiHistogram>;
      }
    }
  }
}
