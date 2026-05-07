import { css, GuiChart, GuiElement } from '../../exports.js';
import style from './gaussian.css?inline';

export class GuiGaussian extends GuiElement {
  static override styles = [css(style)];

  private _chart: GuiChart;
  private _value: gc.util.Gaussian;

  constructor() {
    super();

    this._value = new gc.util.Gaussian();

    this._chart = document.createElement('gui-chart');
    this.shadowRoot.appendChild(this._chart);
  }

  get value() {
    return this._value;
  }

  set value(value: gc.util.Gaussian) {
    this._value = value;
    this.update();
  }

  connectedCallback(): void {
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const { width } = this.getBoundingClientRect();
    const [table, mu] = this._gaussian_to_table(this._value, width);

    this._chart.setAttrs({
      value: table,
      config: {
        cursor: true,
        tooltip: {
          always: true,
        },
        xAxis: {
          scale: 'linear',
          cursor: false,
        },
        yAxes: {
          y: {
            format: '.2k',
            cursor: false,
          },
        },
        series: [
          {
            title: 'Profile',
            type: 'line+area',
            xCol: 0,
            yCol: 1,
            yAxis: 'y',
          },
          {
            title: 'Mean (μ)',
            type: 'custom',
            yAxis: 'y',
            xCol: 0,
            yCol: 1,
            value: mu,
            draw(ctx, _serie, xScale, yScale) {
              // Draw mean (μ) as a vertical dashed red line
              const [yMax, yMin] = yScale.range();
              const meanX = xScale(mu);
              ctx.simpleLine(meanX, yMin, meanX, yMax, {
                color: 'red',
                dashed: true,
                thickness: 2,
              });
            },
          },
        ],
      },
    });
  }

  private _gaussian_to_table(value: gc.util.Gaussian, w: number): [gc.core.Table, number] {
    // Read attributes
    const sum = value.sum ?? 0;
    const sumsq = value.sumsq ?? 0;
    const count = Number(value.count ?? 1n);
    const min = value.min ?? 0;
    const max = value.max ?? 0;

    if (count < 2) {
      return [new gc.core.Table(), 0];
    }

    // Compute mean and std deviation
    const mu = sum / count;
    const variance = sumsq / count - mu ** 2;
    const sigma = Math.sqrt(variance);

    // Define x-range from min to max
    const xMin = min;
    const xMax = max;

    const col_0: number[] = [];
    const col_1: number[] = [];

    for (let x = 0; x < w; x++) {
      const xValue = xMin + (x / w) * (xMax - xMin);
      const yValue = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-((xValue - mu) ** 2) / (2 * sigma ** 2));

      col_0.push(xValue);
      col_1.push(yValue);
    }

    return [new gc.core.Table([col_0, col_1]), mu];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiGaussian} */
    'gui-gaussian': GuiGaussian;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiGaussian} */
        'gui-gaussian': GreyCat.Element<GuiGaussian>;
      }
    }
  }
}
