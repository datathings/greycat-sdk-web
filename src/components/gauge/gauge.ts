import * as d3 from 'd3';
import { Disposable } from '../../internals.js';
import { getCSSVar } from '../../utils.js';

/**
 * Displays a given value into a gauge
 */
export class GuiGauge extends HTMLElement {
  private _value = 0;
  private _width = 150;
  private _thickness = 10;
  private _disposables: Disposable[] = [];

  connectedCallback() {
    if (this.style.display === '') {
      this.style.display = 'block';
    }

    this._initialize();
    this.render();

    const oResize = new ResizeObserver(() => {
      this.innerHTML = '';
      this._initialize();
      this.render();
    });
    oResize.observe(this);
    this._disposables.push(() => oResize.disconnect());
  }

  disconnectedCallback() {
    for (const d of this._disposables) {
      d();
    }
  }

  private _initialize() {
    const color = getCSSVar('--color-0') ?? 'black';
    const { width, height } = this.getBoundingClientRect();
    // try to fit in
    this._width = width > height ? height : width;
    const svg = d3
      .select(this)
      .append('svg')
      .attr('class', 'gui-gauge')
      .attr('width', this._width)
      .attr('height', this._width);
    const g = svg
      .append('g')
      .attr('transform', `translate(${this._width / 2}, ${this._width / 2})`);
    g.append('path').attr('fill', color).attr('stroke-width', 1);
    g.append('text')
      .attr('transform', 'translate(0, 5)')
      .attr('fill', color)
      .attr('text-anchor', 'middle');
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._setValue(value);
    this.render();
  }

  get thickness() {
    return this._width;
  }

  set thickness(value: number) {
    this._setThickness(value);
    this.render();
  }

  setAttrs({
    value = this._value,
    thickness = this._thickness,
  }: {
    value?: number;
    thickness?: number;
  }) {
    this._setValue(value);
    this._setThickness(thickness);
    this.render();
  }

  render() {
    d3.select(this)
      .select('g path')
      .data([{ value: this._value, thickness: this._thickness, width: this._width }])
      .join('path')
      .attr('d', (d) => computePath(d.width, d.thickness, d.value));

    d3.select(this)
      .select('g text')
      .data([this._value])
      .join('text')
      .text((value) => `${value}%`);
  }

  private _setValue(value: number) {
    if (isNaN(value)) {
      console.warn('GuiGauge set value called with a NaN value');
      return;
    }
    this._value = Math.min(100, Math.max(0, value));
  }

  private _setThickness(value: number) {
    if (isNaN(value)) {
      console.warn('GuiGauge set thickness called with a NaN value');
      return;
    }
    this._thickness = Math.max(1, value);
  }
}

function computePath(width: number, thickness: number, progress: number) {
  const radius = width / 2;
  return d3.arc()({
    innerRadius: radius - thickness,
    outerRadius: radius,
    startAngle: 0,
    endAngle: Math.PI * 2 * (progress / 100),
  }) as string;
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-gauge': GuiGauge;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-gauge': Partial<Omit<GuiGauge, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-gauge')) {
  globalThis.customElements.define('gui-gauge', GuiGauge);
}
