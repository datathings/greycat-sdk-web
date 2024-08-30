import { format } from 'd3';
import { ChartConfig, GuiHeatmap, HeatmapConfig, util } from '../../exports.js';
import * as THREE from 'three';
import * as d3 from 'd3';
import './histogram.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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

  connectedCallback() {
    this.render();
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
      } else if (
        quant.dimensions.length === 3 &&
        (quant.dimensions[0] instanceof util.LinearQuantizer ||
          quant.dimensions[0] instanceof util.LogQuantizer) &&
        (quant.dimensions[1] instanceof util.LinearQuantizer ||
          quant.dimensions[1] instanceof util.LogQuantizer) &&
        (quant.dimensions[2] instanceof util.LinearQuantizer ||
          quant.dimensions[2] instanceof util.LogQuantizer)
      ) {
        this._render_3dChart(
          this._value.bins,
          [quant.dimensions[0], quant.dimensions[1], quant.dimensions[2]],
          quant,
        );
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

  private _render_3dChart(
    bins: (number | bigint | null)[],
    quantizer: (util.LinearQuantizer | util.LogQuantizer)[],
    a: util.MultiQuantizer,
  ) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.clientWidth, this.clientHeight);
    this.replaceChildren(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, this.clientWidth / this.clientHeight);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.render(scene, camera);

    let axes = new THREE.AxesHelper(50);
    scene.add(axes);

    const data = Array.from({ length: bins.length });
    const countDomain = [Infinity, -Infinity];

    for (let index = 0; index < bins.length; index++) {
      const count = bins[index];

      const [x, y, z] = this._get_multi_bounds(index, a);

      countDomain[0] = Math.min(countDomain[0], Number(count));
      countDomain[1] = Math.max(countDomain[1], Number(count));

      data[index] = [x, y, z, count];
    }

    const xAxis = d3.scaleLinear().domain([quantizer[0].min, quantizer[0].max]).rangeRound([0, 50]);
    const yAxis = d3.scaleLinear().domain([quantizer[1].min, quantizer[1].max]).rangeRound([0, 50]);
    const zAxis = d3.scaleLinear().domain([quantizer[2].min, quantizer[2].max]).rangeRound([0, 50]);

    const colorScale = d3
      .scaleSequential()
      .domain([countDomain[0], countDomain[1]])
      .range([0, 50])
      .interpolator(d3.interpolateRgbBasis(GuiHeatmap.VIRIDIS_COLORS));

    for (let index = 0; index < data.length; index++) {
      const val = data[index];
      if (val[3] === null) continue;
      const x = xAxis(val[0][0]);
      const y = yAxis(val[1][0]);
      const z = zAxis(val[2][0]);
      const geometry = new THREE.BoxGeometry(
        xAxis(val[0][1]) - x,
        yAxis(val[1][1]) - y,
        zAxis(val[2][1]) - z,
      );
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorScale(val[3])) });
      material.transparent = true;
      material.opacity = 0.1;
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
    }

    controls.update();
    renderer.render(scene, camera);

    function animate() {
      controls.update();
    }

    controls.addEventListener('change', () => renderer.render(scene, camera));

    // Animate
    /*     function animate(t = 0) {
      let time = t / 5000;
      camera.position.set(Math.sin(time) * 60, 60, Math.cos(time) * 60);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    */
    //renderer.setAnimationLoop(animate);
  }

  private _get_multi_bounds(slot: number, quantizer: util.MultiQuantizer): [number, number][] {
    const result = Array.from({ length: quantizer.dimensions.length });
    let multiplier = 1;
    let slotId = 0;
    let multiSlot = slot;
    for (let index = quantizer.dimensions.length - 1; index >= 0; index--) {
      const qt = quantizer.dimensions[index];
      const dimSize = this._get_quantizer_size(qt);

      multiplier = multiplier * dimSize;
      slotId = multiSlot % dimSize;
      multiSlot = (multiSlot - slotId) / dimSize;
      const bounds = new Bounds();

      bounds.compute(slotId, qt);
      result[index] = [bounds.min, bounds.max];
    }

    return result as [number, number][];
  }

  private _get_quantizer_size(quantizer: util.Quantizer): number {
    if (quantizer instanceof util.LinearQuantizer || quantizer instanceof util.LogQuantizer) {
      return Number(quantizer.bins);
    } else if (quantizer instanceof util.MultiQuantizer) {
      let slots = 1;
      for (let index = 0; index < quantizer.dimensions.length; index++) {
        const qt = quantizer.dimensions[index];
        const size = this._get_quantizer_size(qt);
        if (size === -1) {
          return 0;
        }
        slots *= size;
      }
      return slots;
    }
    return -1;
  }
}

class Bounds {
  constructor(
    public min = 0,
    public max = 1,
  ) {}

  compute(slot: number, quantizer: util.Quantizer): this {
    if (quantizer instanceof util.LinearQuantizer) {
      const step = (quantizer.max - quantizer.min) / Number(quantizer.bins);
      this.min = quantizer.min + slot * step;
      this.max = quantizer.min + (slot + 1) * step;
      return this;
    }

    if (quantizer instanceof util.LogQuantizer) {
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
      this.min = min;
      this.max = max;
      return this;
    }

    this.min = 0;
    this.max = 1;

    return this;
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
