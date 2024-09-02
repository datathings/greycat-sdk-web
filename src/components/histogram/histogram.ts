import { format } from 'd3';
import { ChartConfig, GuiHeatmap, HeatmapConfig, util } from '../../exports.js';
import * as THREE from 'three';
import * as d3 from 'd3';
import './histogram.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

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
      } else if (quant.dimensions.length === 3) {
        this._render_3dChart(this._value.bins, quant);
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

  private _render_3dChart(bins: (number | bigint | null)[], quantizer: util.MultiQuantizer) {
    // Validate quantizer dims
    if (
      !(
        quantizer.dimensions[0] instanceof util.LinearQuantizer ||
        quantizer.dimensions[0] instanceof util.LogQuantizer
      ) ||
      !(
        quantizer.dimensions[1] instanceof util.LinearQuantizer ||
        quantizer.dimensions[1] instanceof util.LogQuantizer
      ) ||
      !(
        quantizer.dimensions[2] instanceof util.LinearQuantizer ||
        quantizer.dimensions[2] instanceof util.LogQuantizer
      )
    ) {
      throw 'Quantizer Dimensions are not valid';
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.clientWidth, this.clientHeight);
    this.replaceChildren(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, this.clientWidth / this.clientHeight, 0.1, 1000);
    camera.position.set(150, 150, 150);
    camera.lookAt(0, 0, 0);

    const axes = new THREE.AxesHelper(100);
    scene.add(axes);

    const xLabelDiv = document.createElement('div');
    xLabelDiv.textContent = 'X';
    const xLabel = new CSS2DObject(xLabelDiv);
    xLabel.position.set(100, 0, 0);
    xLabel.center.set(-1, 0);

    const yLabelDiv = document.createElement('div');
    yLabelDiv.textContent = 'Y';
    const yLabel = new CSS2DObject(yLabelDiv);
    yLabel.position.set(0, 100, 0);
    yLabel.center.set(0, 1);

    const zLabelDiv = document.createElement('div');
    zLabelDiv.textContent = 'Z';
    const zLabel = new CSS2DObject(zLabelDiv);
    zLabel.position.set(0, 0, 100);
    zLabel.center.set(1, 1);

    scene.add(xLabel, yLabel, zLabel);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(this.clientWidth, this.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    this.appendChild(labelRenderer.domElement);

    const data = [];
    const countDomain = [Infinity, -Infinity];

    for (let index = 0; index < bins.length; index++) {
      const count = bins[index];

      if (count === null) {
        continue;
      }

      const [x, y, z] = this._get_multi_bounds(index, quantizer);

      countDomain[0] = Math.min(countDomain[0], Number(count));
      countDomain[1] = Math.max(countDomain[1], Number(count));

      data.push([x, y, z, count]);
    }

    const xAxis = d3
      .scaleLinear()
      .domain([quantizer.dimensions[0].min, quantizer.dimensions[0].max])
      .rangeRound([0, 100]);
    const yAxis = d3
      .scaleLinear()
      .domain([quantizer.dimensions[1].min, quantizer.dimensions[1].max])
      .rangeRound([0, 100]);
    const zAxis = d3
      .scaleLinear()
      .domain([quantizer.dimensions[2].min, quantizer.dimensions[2].max])
      .rangeRound([0, 100]);

    // X Scale lines
    const xlineMaterial = new THREE.LineBasicMaterial({
      color: THREE.Color.NAMES.orange,
      transparent: true,
      opacity: 0.3,
    });
    const xlineGeometry = new THREE.BufferGeometry();
    const xPoints = [];
    const xWidth = 100 / Number(quantizer.dimensions[0].bins);
    for (let index = 1; index <= quantizer.dimensions[0].bins; index++) {
      xPoints.push(new THREE.Vector3(xWidth * index, 100, 0));
      xPoints.push(new THREE.Vector3(xWidth * index, 0, 0));
      xPoints.push(new THREE.Vector3(xWidth * index, 0, 0));
      xPoints.push(new THREE.Vector3(xWidth * index, 0, 100));
    }
    xlineGeometry.setFromPoints(xPoints);
    const xLine = new THREE.LineSegments(xlineGeometry, xlineMaterial);

    // Y Scale lines
    const ylineMaterial = new THREE.LineBasicMaterial({
      color: THREE.Color.NAMES.greenyellow,
      transparent: true,
      opacity: 0.3,
    });
    const ylineGeometry = new THREE.BufferGeometry();
    const yPoints = [];
    const yWidth = 100 / Number(quantizer.dimensions[1].bins);
    for (let index = 1; index <= quantizer.dimensions[1].bins; index++) {
      yPoints.push(new THREE.Vector3(0, yWidth * index, 0));
      yPoints.push(new THREE.Vector3(100, yWidth * index, 0));
    }
    ylineGeometry.setFromPoints(yPoints);
    const yLine = new THREE.LineSegments(ylineGeometry, ylineMaterial);

    // Z Scale lines
    const zlineMaterial = new THREE.LineBasicMaterial({
      color: THREE.Color.NAMES.blue,
      transparent: true,
      opacity: 0.3,
    });
    const zlineGeometry = new THREE.BufferGeometry();
    const zPoints = [];
    const zWidth = 100 / Number(quantizer.dimensions[2].bins);
    for (let index = 1; index <= quantizer.dimensions[2].bins; index++) {
      zPoints.push(new THREE.Vector3(0, 0, zWidth * index));
      zPoints.push(new THREE.Vector3(100, 0, zWidth * index));
    }
    zlineGeometry.setFromPoints(zPoints);
    const zLine = new THREE.LineSegments(zlineGeometry, zlineMaterial);

    scene.add(xLine, yLine, zLine);

    const colorScale = d3
      .scaleSequential()
      .domain([countDomain[0], countDomain[1]])
      .range([0, 100])
      .interpolator(d3.interpolateRgbBasis(GuiHeatmap.VIRIDIS_COLORS));

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      wireframe: false,
      transparent: true,
      opacity: 0.05,
      depthTest: true,
      depthWrite: false,
    });

    const count = data.length;

    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let index = 0; index < data.length; index++) {
      const val = data[index];
      if (val[3] === null) continue;

      const x = xAxis(val[0][0]);
      const y = yAxis(val[1][0]);
      const z = zAxis(val[2][0]);
      const x2 = xAxis(val[0][1]);
      const y2 = yAxis(val[1][1]);
      const z2 = zAxis(val[2][1]);

      matrix.makeScale((x2 - x) / 1, (y2 - y) / 1, (z2 - z) / 1);
      matrix.setPosition(x + (x2 - x) / 2, y + (y2 - y) / 2, z + (z2 - z) / 2);

      color.set(colorScale(val[3]));
      instancedMesh.setColorAt(index, color);
      instancedMesh.setMatrixAt(index, matrix);
    }
    scene.add(instancedMesh);

    // Controls
    const controls = new OrbitControls(camera, labelRenderer.domElement);

    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);

    controls.addEventListener('change', () => {
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    });

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
