import * as d3 from 'd3';
import { getCSSVar, getColors } from '../../utils';
import { GuiElement } from '../common';
import { debounce } from '../../internals';

export interface DonutEntry {
  key: string;
  value: number;
}

interface GuiDonutProps {
  width: number;
  height: number;
  data: DonutEntry[];
  /* defaults to `0.6` */
  innerRadius: number;
  /* defaults to 'black' */
  stroke: string;
  /* defaults to 'white' */
  overStroke: string;
  /* defaults to `2` in pixel */
  strokeWidth: number;
  /* defaults to `0.7` */
  opacity: number;
}

export class GuiDonut extends GuiElement<GuiDonutProps> {
  private _obs = new ResizeObserver(
    debounce(() => {
      const { width, height } = this.getBoundingClientRect();
      this._props.width = width;
      this._props.height = height;
      this.update();
    }, 500)
  );

  private svg!: d3.Selection<SVGSVGElement, DonutEntry[], null, undefined>;
  private g!: d3.Selection<SVGGElement, DonutEntry[], null, undefined>;

  override onConnect(): GuiDonutProps {
    this._obs.observe(this);

    if (this.style.display === '') {
      this.style.display = 'block';
    }

    this.svg = d3.select<HTMLElement, DonutEntry[]>(this).append('svg');
    this.g = this.svg.append('g');

    const { width, height } = this.getBoundingClientRect();
    const accent = getCSSVar('--accent-0') ?? '255,255,255';
    return {
      width: Math.round(width),
      height: Math.round(height),
      strokeWidth: 2,
      opacity: 0.7,
      stroke: 'black',
      overStroke: `rgb(${accent})`,
      innerRadius: 0.6,
      data: [],
    };
  }

  override onDisconnect(): void {
    this._obs.disconnect();
  }

  override update() {
    const {
      width,
      height,
      data,
      innerRadius,
      stroke,
      overStroke,
      strokeWidth,
      opacity,
    } = this._props;

    // The radius of the pieplot is half the width or half the height (smallest one).
    var radius = Math.min(width, height) / 2;

    // update the svg object to the web component root
    this.svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    const keys = Object.keys(data);

    // set the color scale
    const color = d3.scaleOrdinal<string>().domain(keys).range(getColors());

    // Compute the position of each group on the pie:
    const pie = d3
      .pie<DonutEntry>()
      .sort(null) // Do not sort group by size
      .value((e) => e.value);

    const data_ready = pie(data);

    // The arc generator
    const arc = d3
      .arc<d3.PieArcDatum<DonutEntry>>()
      .innerRadius(radius * innerRadius) // This is the size of the donut hole
      .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.g
      .selectAll('path')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.key))
      .attr('stroke', stroke)
      .style('stroke-width', `${strokeWidth}px`)
      .style('opacity', opacity)
      .on('mouseover', (e) => {
        d3.select(e.target).attr('stroke', overStroke);
      })
      .on('mouseout', (e) => {
        d3.select(e.target).attr('stroke', stroke);
      });
  }
}

declare global {
  interface Window {
    GuiDonut: typeof GuiDonut;
  }

  interface HTMLElementTagNameMap {
    'gui-donut': GuiDonut;
  }
}

if (!window.customElements.get('gui-donut')) {
  window.GuiDonut = GuiDonut;
  window.customElements.define('gui-donut', GuiDonut);
}
