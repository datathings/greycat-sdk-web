/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';
import { core } from '@greycat/lib-std';
import { maxTime, minTime, msToTime, timeToMs } from '@greycat/utils';

export type NodeTimeSelection = { from: core.time; to: core.time };

type Margin = { top: number; right: number; bottom: number; left: number };
type XScale = d3.ScaleTime<number, number, never>;
type XAxis = d3.Selection<SVGGElement, undefined, null, undefined>;

export class GuiNodeTimeBrush extends HTMLElement {
  readonly chartEl = document.createElement('gui-line-chart');

  private _m: Margin = { top: 20, right: 90, bottom: 20, left: 90 };
  private _height = 100;
  private _series: core.nodeTime<unknown>[] = [];
  private _xAxis!: XAxis;
  private _brush!: d3.BrushBehavior<undefined>;
  private _area!: d3.Selection<SVGGElement, undefined, null, undefined>;
  private _width = 0;
  private _scale: XScale = d3.scaleTime().clamp(true);
  /** used internally to update the brush without triggering an event */
  private _noEvent = false;
  private _disposeResizer: () => void = () => void 0;

  // sampling params
  private _selection: NodeTimeSelection | null = null;
  private _mode = core.SamplingMode.adaptative;
  private _maxRows = 1000;
  private _tz: core.TimeZone | null = null;

  set series(series: core.nodeTime<unknown>[]) {
    this._series = series;
    this._updateBrushData();
    // TODO if the new data are smaller than the current selection things can get ugly?
    // TODO sanitize the selection after data update?
    this.dispatchEvent(new GuiNodeTimeBrushEvent(this._selection));
  }

  get series() {
    return this._series;
  }

  set marginRight(pixels: number) {
    this._m.right = pixels;
    this._updateBrushUI();
  }

  set selection(selection: NodeTimeSelection | null) {
    this._selection = selection;

    // converts a `core.time` selection to a `pixel` selection,
    // otherwise, set it to `null` to remove the current brush selection
    if (selection) {
      this.selectByDate(timeToMs(selection.from), timeToMs(selection.to));
    } else {
      this.unselect();
    }
  }

  get selection() {
    return this._selection;
  }

  get mode() {
    return this._mode;
  }

  /**
   * This is the brush's sampling mode
   */
  set mode(mode: core.SamplingMode) {
    this._mode = mode;
    this._updateBrushData();
  }

  /**
   * This is the brush's max rows
   */
  get maxRows() {
    return this._maxRows;
  }

  set maxRows(maxRows: number) {
    this._maxRows = maxRows;
    this._updateBrushData();
  }

  /**
   * This is the brush's timezone
   */
  get tz() {
    return this._tz;
  }

  set tz(tz: core.TimeZone | null) {
    this._tz = tz;
    this._updateBrushData();
  }

  /**
   * Updates the selection without triggering an event
   * @param selection
   */
  updateSelection(selection: NodeTimeSelection | null) {
    this._noEvent = true;
    this.selection = selection;
    this._noEvent = false;
  }

  selectByDate(from: Date | number, to: Date | number) {
    this._brush.move(this._area, [this._scale(from), this._scale(to)]);
  }

  selectByPixels(from: number, to: number) {
    this.selectByDate(this._scale.invert(from), this._scale.invert(to));
  }

  unselect() {
    this._brush.move(this._area, null);
  }

  connectedCallback() {
    this.style.position = 'relative';
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';

    const { width, height } = this.getBoundingClientRect();
    this._width = width === 0 ? 200 : width;
    this._height = height === 0 ? 100 : height;

    this.chartEl.canvasOnly = true;
    const brushContainer = document.createElement('div');
    brushContainer.style.position = 'absolute';
    brushContainer.style.width = `${this._width}px`;
    brushContainer.style.height = `${this._height}px`;
    brushContainer.appendChild(this.chartEl);
    this.appendChild(brushContainer);

    const svg = d3
      .create('svg')
      .attr('class', 'brush')
      .attr('viewBox', [0, 0, this._width, this._height])
      .style('display', 'block')
      .style('position', 'absolute');

    this._brush = d3.brushX<undefined>();
    this._brush.extent(this._extent()).on('end', async (e) => {
      if (e.selection) {
        // compute "from" and "to" based on the selection pixels
        this._selection = {
          from: msToTime(this._scale.invert(e.selection[0])),
          to: msToTime(this._scale.invert(e.selection[1])),
        };
      } else {
        this._selection = null;
      }

      if (!this._noEvent) {
        this.dispatchEvent(new GuiNodeTimeBrushEvent(this._selection));
      }
    });

    this._xAxis = svg.append('g').attr('class', 'brush-x-axis');
    this._area = svg.append('g').attr('class', 'brush-area').call(this._brush);

    this.appendChild(svg.node() as SVGSVGElement);
    this.dispatchEvent(new GuiNodeTimeBrushEvent(this._selection));

    const oResize = new ResizeObserver(() => {
      const { width, height } = this.getBoundingClientRect();
      this._width = width === 0 ? 200 : width;
      this._height = height === 0 ? 100 : height;
      brushContainer.style.width = `${this._width}px`;
      brushContainer.style.height = `${this._height}px`;
      this._updateBrushUI();
    });
    oResize.observe(this);
    this._disposeResizer = () => oResize.disconnect();
  }

  disconnectedCallback() {
    this._disposeResizer();
  }

  private async _updateBrushData() {
    // retrieve the new series info to compute the brush boundaries
    const info = await core.nodeTime.info(this._series);
    const [from, to] = computeRange(info);

    // re-create the scale according to the new boundaries
    this._scale = d3.scaleTime().domain([timeToMs(from), timeToMs(to)]);

    // downsample the series to feed the brush chart
    this.chartEl.table = await core.nodeTime.sample(
      this._series,
      null,
      null,
      this._maxRows,
      this._mode,
      null,
      this._tz,
    );

    // update scale & axis graphically
    this._updateBrushUI();
  }

  private _updateBrushUI() {
    if (this._width === 0) {
      return;
    }
    this.children[1].setAttribute('viewBox', `0,0,${this._width},${this._height}`);
    this._scale.range([this._m.left, this._width - this._m.right]);
    this._xAxis.call(xAxis, this._scale, this._m, this._width, this._height);
    this._brush.extent(this._extent());
    this._area.call(this._brush);
    // triggers an update of the selected section to ensure it's "x" follows the potential resize
    this._noEvent = true;
    this.selection = this._selection;
    this._noEvent = false;
  }

  private _extent(): [[number, number], [number, number]] {
    return [
      [this._m.left, 0.5],
      [
        // both Math.max ensures the brush stops throwing errors when height is 0, and then applies the .5 pad
        Math.max(0.5, this._width - this._m.right),
        Math.max(0.5, this._height - this._m.bottom + 0.5),
      ],
    ];
  }
}

export class GuiNodeTimeBrushEvent extends CustomEvent<NodeTimeSelection | null> {
  constructor(selection: NodeTimeSelection | null = null) {
    super('brush', { detail: selection, bubbles: true });
  }
}

function computeRange(info: core.NodeTimeInfo[]): readonly [core.time, core.time] {
  let min = core.time.max;
  let max = core.time.min;
  for (let i = 0; i < info.length; i++) {
    const { from, to } = info[i];
    if (from) {
      min = minTime(min, from);
    }
    if (to) {
      max = maxTime(max, to);
    }
  }
  return [min, max];
}

function xAxis(g: XAxis, x: XScale, margin: Margin, width: number, height: number) {
  return g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0),
  );
}

if (!window.customElements.get('gui-nodetime-brush')) {
  window.GuiNodeTimeBrush = GuiNodeTimeBrush;
  window.customElements.define('gui-nodetime-brush', GuiNodeTimeBrush);
}

declare global {
  interface Window {
    GuiNodeTimeBrush: typeof GuiNodeTimeBrush;
  }
  interface HTMLElementTagNameMap {
    'gui-nodetime-brush': GuiNodeTimeBrush;
  }

  interface HTMLElementEventMap {
    brush: GuiNodeTimeBrushEvent;
  }
}
