import * as d3 from 'd3';
import { css, GuiElement } from '../../exports.js';
import style from './gauge.css?inline';

/**
 * Displays a given value into a gauge
 */
export class GuiGauge extends GuiElement {
  static override styles = [css(style)];

  private _value = 0;
  private _width = 150;
  private _thickness = 10;
  private _svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  private _g: d3.Selection<SVGGElement, undefined, null, undefined>;
  private _path: d3.Selection<SVGPathElement, undefined, null, undefined>;
  private _text: d3.Selection<SVGTextElement, undefined, null, undefined>;
  private _resizeObs: ResizeObserver;

  constructor() {
    super();

    this._svg = d3.create('svg');
    this._g = this._svg.append('g');
    this._path = this._g.append('path').attr('stroke-width', 1);
    this._text = this._g
      .append('text')
      .attr('transform', 'translate(0, 5)')
      .attr('text-anchor', 'middle');
    this.shadowRoot.replaceChildren(this._svg.node() as SVGSVGElement);

    this._resizeObs = new ResizeObserver(() => this.update());
  }

  connectedCallback() {
    this._resizeObs.observe(this);
    this.addDisposable(() => this._resizeObs.disconnect());
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._setValue(value);
    this.update();
  }

  get thickness() {
    return this._width;
  }

  set thickness(value: number) {
    this._setThickness(value);
    this.update();
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
    this.update();
  }

  getAttrs(): {
    value: number;
    thickness: number;
  } {
    return {
      value: this._value,
      thickness: this._thickness,
    };
  }

  update() {
    if (!this.isConnected) {
      return;
    }

    const style = getComputedStyle(this);
    const color = style.getPropertyValue('--color-0') || 'var(--color)';
    const rect = this.getBoundingClientRect();
    const width = rect.width > rect.height ? rect.height : rect.width;

    this._svg.attr('width', width).attr('height', width);
    this._g.attr('transform', `translate(${width / 2}, ${width / 2})`);
    this._path
      .attr('fill', color)
      .data([{ value: this._value, thickness: this._thickness, width }])
      .attr('d', (d) => computePath(d.width, d.thickness, d.value));
    this._text
      .attr('fill', color)
      .data([this._value])
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

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-gauge': GreyCat.Element<GuiGauge>;
      }
    }
  }
}
