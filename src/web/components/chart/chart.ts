import * as d3 from 'd3';

import { debounce, throttle } from '../../utils.js';
import { closest } from '../../internals.js';
import type {
  Scale,
  ChartConfig,
  Color,
  Serie,
  SerieData,
  SerieOptions,
  SelectionOptions,
  BarSerie,
  Cursor,
  Axis,
} from './types.js';
import { vMap } from './internals.js';
import {
  Disposer,
  createFormatter,
  smartTimeFormatSpecifier,
  CanvasContext,
  getColors,
  convertToTable,
  GuiChartConfig,
  GuiElement,
  css,
  tableGetCell,
  tableGetColumn,
  tableGetColumnIndex,
  isOrdSerieTableColumn,
  padLinear,
  padLog,
  inferConfig,
  GuiChartConfigUpdateEvent,
} from '../../exports.js';
import type { sl, TableLike } from '../../exports.js';
import style from './chart.css?inline';

type ComputedState = {
  leftAxes: number;
  rightAxes: number;
  xRange: number[];
  yRange: number[];
  style: {
    'text-0': string;
    'accent-0': string;
    cursor: {
      color: string;
      bgColor: string;
      lineColor: string;
    };
    margin: {
      top: number;
      right: number;
      rightEmpty: number;
      bottom: number;
      left: number;
      leftEmpty: number;
    };
  };
  xScale: Scale;
  yScales: Record<string, Scale>;
};

export class GuiChart extends GuiElement {
  static override styles = [css(style)];

  private _disposer: Disposer;
  private _resizeObs: ResizeObserver;
  private _table: gc.core.Table;
  private _config: ChartConfig;
  private _colors: string[] = [];
  private _cursor: Cursor = {
    x: -1,
    y: -1,
    startX: -1,
    startY: -1,
    selection: false,
  };

  private _svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _xAxis!: d3.Axis<Date | d3.NumberValue>;
  private _yAxisGroups: Record<string, d3.Selection<SVGGElement, unknown, null, undefined>> = {};

  private readonly _canvas: HTMLCanvasElement;
  private readonly _ctx: CanvasContext;

  private readonly _uxCanvas: HTMLCanvasElement;
  private readonly _uxCtx: CanvasContext;

  private readonly _tooltip = document.createElement('div');

  private _canvasEntered = false;

  private _userXAxisMin: number | Date | gc.core.time | gc.core.Date | undefined;
  private _userXAxisMax: number | Date | gc.core.time | gc.core.Date | undefined;
  private _userYAxes: Record<
    string,
    {
      min: number | Date | gc.core.time | gc.core.Date | undefined;
      max: number | Date | gc.core.time | gc.core.Date | undefined;
    }
  > = {};
  private _computed: ComputedState | undefined;
  private _drawer: sl.SlDrawer;
  private _drawerEnabled: boolean;
  private _configEl: GuiChartConfig;

  constructor() {
    super();

    this._disposer = new Disposer();
    this._resizeObs = new ResizeObserver(debounce(() => this._resize(), 50));
    this._table = gc.core.Table.create();
    this._config = { series: [], xAxis: {}, yAxes: {} };

    // main canvas
    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'block';
    this._canvas.style.position = 'absolute';
    this._canvas.style.background = 'transparent';
    this._canvas.setAttribute('data-canvas', '');
    this._ctx = new CanvasContext(this._canvas.getContext('2d') as CanvasRenderingContext2D);

    // ux canvas
    this._uxCanvas = document.createElement('canvas');
    this._uxCanvas.style.display = 'block';
    this._uxCanvas.style.position = 'absolute';
    this._uxCanvas.style.background = 'transparent';
    this._uxCanvas.setAttribute('data-ux-canvas', '');
    this._uxCtx = new CanvasContext(this._uxCanvas.getContext('2d') as CanvasRenderingContext2D);

    // svg
    this._svg = d3
      .create('svg')
      .style('background', 'transparent')
      .style('position', 'absolute') as d3.Selection<SVGSVGElement, unknown, null, undefined>;

    this._xAxisGroup = this._svg.append('g');

    // tooltip
    this._tooltip.style.position = 'absolute';
    this._tooltip.classList.add('tooltip');

    // config drawer
    this._drawerEnabled = false;
    this._drawer = document.createElement('sl-drawer');
    this._drawer.contained = true;
    this._drawer.open = false;
    this._drawer.label = 'Chart config';
    const inferConfigBtn = document.createElement('sl-button');
    inferConfigBtn.textContent = 'Reset';
    inferConfigBtn.size = 'small';
    inferConfigBtn.style.alignSelf = 'center';
    inferConfigBtn.onclick = () => {
      const oldConfig = this._config;
      this._config = inferConfig(this._table);
      this.compute();
      this.update();
      this.dispatchEvent(new GuiChartConfigUpdateEvent(oldConfig, this._config));
    };
    const inferConfigTooltip = document.createElement('sl-tooltip');
    const inferConfigTooltipContent = document.createElement('div');
    inferConfigTooltipContent.slot = 'content';
    inferConfigTooltipContent.innerHTML = `Resets the config.<br/><br/>This will re-create a new config by analyzing the current table.<br/><br/><strong>The current configuration will be lost</strong>`;
    inferConfigTooltip.appendChild(inferConfigTooltipContent);
    inferConfigTooltip.slot = 'header-actions';
    inferConfigTooltip.appendChild(inferConfigBtn);
    this._drawer.appendChild(inferConfigTooltip);
    this._configEl = document.createElement('gui-chart-config');
    this._configEl.addEventListener('gui-chart-config-update', (ev) => {
      ev.stopPropagation();
      const value = ev.detail.new;

      // check for series/yAxis validity
      let isValid = true;
      for (const serie of value.series) {
        if (value.yAxes[serie.yAxis] === undefined) {
          isValid = false;
          break;
        }
      }
      // we only update the chart if the config is valid
      if (isValid) {
        this._config = value;
        this.compute();
        this.update();
      }

      this.dispatchEvent(new GuiChartConfigUpdateEvent(ev.detail.old, ev.detail.new));
    });
    this._drawer.appendChild(this._configEl);

    // mouse events
    this._uxCanvas.addEventListener('mousedown', (ev) => {
      if (ev.button === 0) {
        const { left, top } = this._canvas.getBoundingClientRect();
        this._cursor.startX = Math.round(ev.pageX - (left + window.scrollX));
        this._cursor.startY = Math.round(ev.pageY - (top + window.scrollY));
        this._cursor.selection = true;
      }
    });
    this._uxCanvas.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      this.toggleConfig();
    });
    this._uxCanvas.addEventListener('dblclick', () => {
      this._resetCursor();
      // reset X configuration
      this._config.xAxis.min = this._userXAxisMin;
      this._config.xAxis.max = this._userXAxisMax;
      // reset Y configuration
      for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
        yAxis.min = this._userYAxes[name].min;
        yAxis.max = this._userYAxes[name].max;
      }
      this.compute();
      this.update();
      this.dispatchEvent(new GuiChartSelectionEvent());
    });

    let lastTouch = Date.now();
    let touchTimer = -1;
    // touch events
    this._uxCanvas.addEventListener(
      'touchstart',
      (ev) => {
        // prevents the browser from processing emulated mouse events
        ev.preventDefault();

        touchTimer = setTimeout(() => {
          this.toggleConfig();
        }, 500);

        const now = Date.now();
        if (now - lastTouch < (this._config.dblTapThreshold ?? 500)) {
          this._resetCursor();
          // reset X configuration
          this._config.xAxis.min = this._userXAxisMin;
          this._config.xAxis.max = this._userXAxisMax;
          // reset Y configuration
          for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
            yAxis.min = this._userYAxes[name].min;
            yAxis.max = this._userYAxes[name].max;
          }
          this.compute();
          this.update();
          lastTouch = now;
          return;
        }
        lastTouch = now;

        if (ev.touches.length > 0) {
          const { left, top } = this._canvas.getBoundingClientRect();
          this._cursor.startX = Math.round(ev.touches[0].pageX - (left + window.scrollX));
          this._cursor.startY = Math.round(ev.touches[0].pageY - (top + window.scrollY));
          this._cursor.selection = true;
        }
      },
      { passive: true },
    );
    this._uxCanvas.addEventListener('touchend', (ev) => {
      // prevents the browser from processing emulated mouse events
      ev.preventDefault();

      clearTimeout(touchTimer);

      if (this._config.selection === false) {
        this._resetCursor();
        return;
      }

      // touch end classic
      if (this._cursor.startX === -1 && this._cursor.startY === -1) {
        this._resetCursor();
        return;
      }

      const threshold = this._config.selection?.threshold ?? 10;
      const dx = Math.abs(this._cursor.x - this._cursor.startX);
      const dy = Math.abs(this._cursor.y - this._cursor.startY);

      if (dx < threshold && dy < threshold) {
        // too small selection, reset cursor
        this._resetCursor();
      } else {
        this._selection(this._config.selection?.orientation);
      }
    });
    this._uxCanvas.addEventListener(
      'touchmove',
      (ev) => {
        // prevents the browser from processing emulated mouse events
        ev.preventDefault();

        clearTimeout(touchTimer);

        if (ev.touches.length > 0) {
          const { left, top } = this._canvas.getBoundingClientRect();
          this._cursor.x = Math.round(ev.touches[0].pageX - (left + window.scrollX));
          this._cursor.y = Math.round(ev.touches[0].pageY - (top + window.scrollY));
          // this._updateUX();
        }
      },
      { passive: true },
    );
    this._uxCanvas.addEventListener('touchcancel', () => {
      this._resetCursor();
    });

    this._uxCanvas.addEventListener(
      'wheel',
      (event) => {
        event.stopPropagation();

        throttle((event: WheelEvent) => {
          if (!this._computed) {
            return;
          }
          const { xRange, yRange, xScale: scale, yScales } = this._computed;
          if (event.shiftKey) {
            // x axis panning
            if (this._config.xAxis.ratio === 0) {
              return;
            }
            const [min, max] = scale.range();
            const ratio = this._config.xAxis.ratio ?? 100;
            const dx = (Math.abs(max - min) / ratio) * (event.deltaY > 0 ? 1 : -1);
            const from = (this._config.xAxis.min = scale.invert(min + dx));
            const to = (this._config.xAxis.max = scale.invert(max + dx));

            this.dispatchEvent(new GuiChartSelectionEvent({ from, to }));
            this.compute();
            this.update();
          } else if (event.altKey) {
            // y axes panning
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              if (axis.ratio === 0) {
                continue;
              }
              const [min, max] = scale.range();
              const d = (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? -1 : 1);
              axis.min = scale.invert(min + d);
              axis.max = scale.invert(max + d);
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.x < xRange[0] &&
            this._cursor.y <= yRange[0] &&
            this._cursor.y >= yRange[1]
          ) {
            // left y axes zoom
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              if ((axis.position === undefined || axis.position === 'left') && axis.ratio !== 0) {
                const [min, max] = scale.range();
                const dx =
                  (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? 1 : -1);
                axis.min = scale.invert(min + dx);
                axis.max = scale.invert(max - dx);
              }
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.x > xRange[1] &&
            this._cursor.y <= yRange[0] &&
            this._cursor.y >= yRange[1]
          ) {
            // right y axes zoom
            for (const [name, scale] of Object.entries(yScales)) {
              const axis = this._config.yAxes[name];
              if (axis.position === 'right' && axis.ratio !== 0) {
                const [min, max] = scale.range();
                const d = (Math.abs(max - min) / (axis.ratio ?? 100)) * (event.deltaY > 0 ? 1 : -1);
                axis.min = scale.invert(min + d);
                axis.max = scale.invert(max - d);
              }
            }
            this.compute();
            this.update();
          } else if (
            this._cursor.y > yRange[0] &&
            this._cursor.x >= xRange[0] &&
            this._cursor.x <= xRange[1]
          ) {
            if (this._config.xAxis.ratio !== 0) {
              // x axis zoom
              const [min, max] = scale.range();
              const d =
                (Math.abs(max - min) / (this._config.xAxis.ratio ?? 100)) *
                (event.deltaY > 0 ? 1 : -1);
              const from = (this._config.xAxis.min = scale.invert(min - d));
              const to = (this._config.xAxis.max = scale.invert(max + d));
              this.dispatchEvent(new GuiChartSelectionEvent({ from, to }));
              this.compute();
              this.update();
            }
          }
        }, 16)(event);
      },
      { passive: true },
    );

    this.shadowRoot.append(
      this._svg.node() as SVGSVGElement,
      this._canvas,
      this._uxCanvas,
      this._tooltip,
      this._drawer,
    );
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      this._colors = getColors(this);
      const style = getComputedStyle(this);
      if (style.display === 'inline') {
        // makes sure the WebComponent is properly displayed as 'block' unless overridden by something else
        this.style.display = 'block';
      }
      this.style.position = 'relative';
    });

    // trigger a resize before the observer to prevent resize-flickering on mount
    this._resize();

    document.addEventListener('mouseup', this._onmouseup, { signal: this._disposer.signal });
    document.addEventListener('mousemove', this._onmousemove, { signal: this._disposer.signal });
    this._resizeObs.observe(this);

    const animRef = { id: -1 };
    const animationCallback = () => {
      this._updateUX();
      animRef.id = requestAnimationFrame(animationCallback);
    };
    animRef.id = requestAnimationFrame(animationCallback);
    this._disposer.disposables.push(() => cancelAnimationFrame(animRef.id));
  }

  disconnectedCallback() {
    this._disposer.dispose();
    this._resizeObs.disconnect();
  }

  private _onmouseup = (ev: MouseEvent) => {
    if (
      ev.button !== 0 ||
      this._config.selection === false ||
      (this._cursor.x === this._cursor.startX && this._cursor.y === this._cursor.startY)
    ) {
      this._cursor.selection = false;
      return;
    }

    const threshold = this._config.selection?.threshold ?? 10;
    const dx = Math.abs(this._cursor.x - this._cursor.startX);
    const dy = Math.abs(this._cursor.y - this._cursor.startY);

    const orientation = this._config.selection?.orientation ?? 'horizontal';
    switch (orientation) {
      case 'both':
        if (
          this._cursor.startX === -1 ||
          this._cursor.x === -1 ||
          this._cursor.startY === -1 ||
          this._cursor.y === -1 ||
          (dx < threshold && dy < threshold)
        ) {
          this._resetCursor();
          return;
        }
        break;
      case 'horizontal':
        if (this._cursor.startX === -1 || this._cursor.x === -1 || dx < threshold) {
          this._resetCursor();
          return;
        }
        break;
      case 'vertical':
        if (this._cursor.startY === -1 || this._cursor.y === -1 || dy < threshold) {
          this._resetCursor();
          return;
        }
        break;
    }

    this._selection(this._config.selection?.orientation);
  };

  private _onmousemove = (ev: MouseEvent) => {
    const [target] = ev.composedPath();
    if (this._cursor.selection === false && target !== this._uxCanvas) {
      this._resetCursor();
      return;
    }

    const container = this._canvas.getBoundingClientRect();
    this._cursor.x = Math.round(
      Math.min(container.width, Math.max(0, ev.clientX - container.left)),
    );
    this._cursor.y = Math.round(
      Math.min(container.height, Math.max(0, ev.clientY - container.top)),
    );
  };

  toggleConfig(): void {
    if (this._drawerEnabled) {
      this._drawer.open = !this._drawer.open;
    }
  }

  openConfig(): void {
    if (this._drawerEnabled) {
      this._drawer.show();
    }
  }

  closeConfig(): void {
    if (this._drawerEnabled) {
      this._drawer.hide();
    }
  }

  /**
   * Resizes the internal elements and re-renders (this is automatically called by a `ResizeObserver`)
   */
  private _resize() {
    const { width, height } = this.getBoundingClientRect();
    if (width === 0 || height === 0) {
      // do not even try to render if 0-sized
      return;
    }

    // resize main canvas
    this._canvas.width = width;
    this._canvas.height = height;
    // resize ux canvas
    this._uxCanvas.width = width;
    this._uxCanvas.height = height;
    // resize svg
    this._svg.attr('viewBox', `0 0 ${this._canvas.width} ${this._canvas.height}`);
    // recompute state
    this.compute();
    this.update();
  }

  private _resetCursor() {
    this._cursor.x = -1;
    this._cursor.y = -1;
    this._cursor.startX = -1;
    this._cursor.startY = -1;
    this._cursor.selection = false;
  }

  set value(table: TableLike) {
    this._table = convertToTable(table);
    this.compute();
    this.update();
  }

  get value() {
    return this._table;
  }

  /**
   * The underlying view into the table
   */
  get table() {
    return this._table;
  }

  /**
   * A type-safe equivalent to `set config(config)`
   */
  setConfig<K>(config: ChartConfig<K>): void {
    this.config = config;
  }

  set config(config: ChartConfig) {
    this._config = config;

    // update local user X min/max with the configuration values
    this._userXAxisMin = this._config.xAxis.min;
    this._userXAxisMax = this._config.xAxis.max;
    // update local user Y min/max with configuration values
    this._userYAxes = {};
    for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
      this._userYAxes[name] = { min: yAxis.min, max: yAxis.max };
    }

    this.compute();
    this.update();
  }

  get config(): ChartConfig {
    return this._config;
  }

  set drawerEnabled(enabled: boolean) {
    if (this._drawerEnabled) {
      if (!enabled) {
        // we go from enabled -> disabled, close drawer
        this._drawer.hide();
      }
    }
    this._drawerEnabled = enabled;
    this.update();
  }

  /**
   * Whether or not to enable the config drawer by *right-click*ing the canvas.
   *
   * By default the drawer is disabled
   */
  get drawerEnabled() {
    return this._drawerEnabled;
  }

  setAttrs({
    config = this._config,
    value = this._table,
    drawerEnabled = this._drawerEnabled,
  }: Partial<{ config: ChartConfig; value: TableLike; drawerEnabled: boolean }>) {
    let recompute = false;
    if (this._table !== value) {
      this._table = convertToTable(value);
      recompute = true;
    }
    if (this._config !== config) {
      recompute = true;
    }
    this._config = config;

    // update local user X min/max with the configuration values
    this._userXAxisMin = this._config.xAxis.min;
    this._userXAxisMax = this._config.xAxis.max;
    // update local user Y min/max with configuration values
    this._userYAxes = {};
    for (const [name, yAxis] of Object.entries(this._config.yAxes)) {
      this._userYAxes[name] = { min: yAxis.min, max: yAxis.max };
    }
    if (this._drawerEnabled) {
      if (!drawerEnabled) {
        // we go from enabled -> disabled, close drawer
        this._drawer.hide();
      }
    }
    this._drawerEnabled = drawerEnabled;
    if (recompute) {
      this.compute();
    }
    this.update();
  }

  getAttrs() {
    return {
      config: this._config,
      value: this._table,
      drawerEnabled: this._drawerEnabled,
    };
  }

  selection(selection: { from: unknown; to: unknown } | null = null) {
    if (selection === null) {
      // reset selection
      this._config.xAxis.min = this._userXAxisMin;
      this._config.xAxis.max = this._userXAxisMax;
      for (const name in this._config.yAxes) {
        const yAxis = this._config.yAxes[name];
        yAxis.min = this._userYAxes[name].min;
        yAxis.max = this._userYAxes[name].max;
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._config.xAxis.min = selection.from as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._config.xAxis.max = selection.to as any;
    }
    this.compute();
    this.update();
  }

  /**
   * This is all about cursor interactions.
   *
   * This needs to be light as it is rendered every single possible frame (leveraging `requestAnimationFrame`)
   */
  private _updateUX() {
    if (!this._computed || this._table.cols.length === 0) {
      return;
    }
    this._clearUX();

    // XXX later optim: we could split compute even more to prevent computing the scales and margins and styles if the cursor is not in range
    const { xRange, yRange, rightAxes, style, xScale, yScales } = this._computed;

    const updateUX =
      this._cursor.x !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.x >= xRange[0] &&
      this._cursor.x <= xRange[1] &&
      this._cursor.y >= yRange[1] &&
      this._cursor.y <= yRange[0];

    const updateSelection =
      this._cursor.x !== -1 &&
      this._cursor.startX !== -1 &&
      this._cursor.y !== -1 &&
      this._cursor.startY !== -1;

    if (updateUX) {
      if (!this._canvasEntered) {
        this._canvasEntered = true;
        this.dispatchEvent(new GuiChartCanvasEnterEvent());
      }

      // make tooltip visible and located properly
      if (!this._tooltip.isConnected) {
        this.shadowRoot.appendChild(this._tooltip);
      }
      this._tooltip.replaceChildren();
      switch (this._config.tooltip?.position ?? 'top-left') {
        case 'top-left':
          this._tooltip.style.left = `${xRange[0] + 10}px`;
          this._tooltip.style.top = `${yRange[1]}px`;
          break;
        case 'top-right':
          this._tooltip.style.right = `${xRange[0] + 10}px`;
          this._tooltip.style.top = `${yRange[1]}px`;
          break;
        case 'bottom-left':
          this._tooltip.style.left = `${xRange[0] + 10}px`;
          this._tooltip.style.bottom = `${yRange[1] + style.margin.bottom}px`;
          break;
        case 'bottom-right':
          this._tooltip.style.right = `${xRange[0] + 10}px`;
          this._tooltip.style.bottom = `${yRange[1] + style.margin.bottom}px`;
          break;
      }

      // The dashed lines, cursor, and axis texts could arguably be configured by the user
      // if cursor: true, then display cursor info in realtime
      if (this._config.cursor) {
        // cursor vertical dashed
        this._uxCtx.simpleLine(this._cursor.x, yRange[0], this._cursor.x, yRange[1], {
          color: style.cursor.lineColor,
          dashed: true,
        });

        let noCursorOnYAxes = true;
        for (const yAxisName in yScales) {
          const yAxis = this._config.yAxes[yAxisName];
          if (yAxis.cursor !== false) {
            noCursorOnYAxes = false;
          }
        }
        if (!noCursorOnYAxes) {
          // cursor horizontal dashed
          this._uxCtx.simpleLine(
            xRange[0],
            this._cursor.y,
            rightAxes === 0 ? this._cursor.x : xRange[1],
            this._cursor.y,
            {
              color: style.cursor.lineColor,
              dashed: true,
            },
          );
          // cursor cross
          this._uxCtx.cross(this._cursor.x, this._cursor.y, 12, {
            color: style.cursor.color,
            thickness: 2,
          });
        }

        const defaultCursorPadding = 10;

        // bottom axis text
        if (this._config.xAxis.cursor !== false) {
          const xValue = +xScale.invert(this._cursor.x);
          const formatter = createFormatter(this._config.xAxis, xScale, true);
          // TODO clip on boundaries
          this._uxCtx.text(
            this._cursor.x,
            yRange[0] + (this._config.xAxis.cursorPadding ?? defaultCursorPadding),
            formatter(xValue),
            {
              color: style.cursor.color,
              backgroundColor: style.cursor.bgColor,
              align: this._config.xAxis.cursorAlign ?? 'center',
              baseline: this._config.xAxis.cursorBaseline ?? 'top',
            },
          );
        }
        let leftAxesIdx = -1;
        let rightAxesIdx = -1;

        // y axes texts
        for (const yAxisName in yScales) {
          const yAxis = this._config.yAxes[yAxisName];
          if (yAxis.cursor === false) {
            continue;
          }
          const formatter = createFormatter(yAxis, yScales[yAxisName], true);
          if (yAxis.position === undefined || yAxis.position === 'left') {
            leftAxesIdx++;
            let padding: number;
            const align = yAxis.cursorAlign ?? 'end';
            switch (align) {
              case 'center':
                padding = 0;
                break;
              case 'end':
                padding = -(yAxis.cursorPadding ?? defaultCursorPadding);
                break;
              case 'start':
                padding = +(yAxis.cursorPadding ?? defaultCursorPadding);
                break;
            }
            this._uxCtx.text(
              style.margin.left + leftAxesIdx * style.margin.left + padding,
              this._cursor.y,
              formatter(+vMap(yScales[yAxisName].invert(this._cursor.y))),
              {
                color: style.cursor.color,
                backgroundColor: style.cursor.bgColor,
                align,
                baseline: yAxis.cursorBaseline ?? 'middle',
              },
            );
          } else {
            rightAxesIdx++;
            let padding: number;
            const align = yAxis.cursorAlign ?? 'start';
            switch (align) {
              case 'center':
                padding = 0;
                break;
              case 'end':
                padding = -(yAxis.cursorPadding ?? defaultCursorPadding);
                break;
              case 'start':
                padding = +(yAxis.cursorPadding ?? defaultCursorPadding);
                break;
            }
            this._uxCtx.text(
              this._canvas.width -
                (style.margin.right + rightAxesIdx * style.margin.right) +
                padding,
              this._cursor.y,
              formatter(+vMap(yScales[yAxisName].invert(this._cursor.y))),
              {
                color: style.cursor.color,
                backgroundColor: style.cursor.bgColor,
                align,
                baseline: yAxis.cursorBaseline ?? 'middle',
              },
            );
          }
        }
      }

      const tooltipSerieData: SerieData[] = [];

      // display markers on series & tooltip based on cursor location
      for (let i = 0; i < this._config.series.length; i++) {
        const serie: Serie & SerieOptions = {
          color: this._colors[i],
          width: 1,
          markerWidth: 4,
          markerShape: 'circle',
          markerColor: this._config.series[i].color ?? this._colors[i],
          opacity: 1,
          fillOpacity: 0.2,
          yCol2: 'min',
          hideInTooltip: false,
          hide: false,
          ...this._config.series[i],
        };

        if (serie.hide) {
          continue;
        }

        const v = +xScale.invert(this._cursor.x);

        const { xValue, rowIdx } = closest(
          this._table,
          serie,
          this._cursor.x,
          this._cursor.y,
          this._config.xAxis,
          this._config.yAxes,
          xScale,
          yScales[serie.yAxis],
          v,
        );

        const yValue = vMap(tableGetCell(this._table, serie.yCol, rowIdx));
        const x = xScale(vMap(xValue));
        let y = yScales[serie.yAxis](yValue);
        const w = serie.markerWidth;
        let yValue2;
        if (isOrdSerieTableColumn(serie.yCol2)) {
          yValue2 = tableGetCell(this._table, serie.yCol2, rowIdx);
        }

        if (serie.markerThreshold) {
          // shortcuts if cursor's above threshold
          if (serie.markerThreshold.x) {
            if (Math.abs(this._cursor.x - x) > serie.markerThreshold.x) {
              continue;
            }
          }
          if (serie.markerThreshold.y) {
            if (Math.abs(this._cursor.y - y) > serie.markerThreshold.y) {
              continue;
            }
          }
        }

        // marker
        switch (serie.type ?? 'line') {
          case 'line+scatter':
          case 'scatter':
          case 'line':
          case 'line+area':
          case 'area': {
            // only draw marker if inside the range
            if (y <= yRange[0] && y >= yRange[1] && x <= xRange[1] && x >= xRange[0]) {
              // make sure to also add a marker when 'yCol2' is defined
              this._drawMarker(serie, x, y, w, serie.markerColor);
              if (yValue2 !== undefined) {
                const y2 = yScales[serie.yAxis](vMap(yValue2));
                this._drawMarker(serie, x, y2, w, serie.markerColor);
              }
            }
            break;
          }
          case 'bar': {
            const s = serie as BarSerie<string>;
            let w = serie.width;
            let rectX = x;
            let h: number;
            let rectY: number;
            if (s.spanCol) {
              const x0 = xScale(vMap(this._table.cols[s.spanCol[0]][rowIdx]));
              const x1 = xScale(vMap(this._table.cols[s.spanCol[1]][rowIdx]));
              w = Math.abs(x1 - x0);
            }

            if (y < yRange[1]) {
              y = yRange[1];
            } else if (y > yRange[0]) {
              y = yRange[0];
            }

            if (s.baseLine !== undefined) {
              rectY = y + (yScales[serie.yAxis](s.baseLine) - y) / 2;
              h = yScales[serie.yAxis](s.baseLine) - y;
            } else {
              rectY = y + (yRange[0] - y) / 2;
              h = yRange[0] - y;
            }

            if (x - w / 2 < xRange[0]) {
              const newW = xRange[0] - x + w / 2;
              rectX = xRange[0] + (w - newW) / 2;
              w = w - newW;
            } else if (x + w / 2 > xRange[1]) {
              const newW = x + w / 2 - xRange[1];
              rectX = xRange[1] - (w - newW) / 2;
              w = w - newW;
            }

            if (rectX < xRange[1] && rectX > xRange[0]) {
              this._uxCtx.rectangle(rectX, rectY, w, h, {
                color: style['accent-0'],
                center: true,
              });
            }
            break;
          }
        }

        // tooltip
        let color: string = serie.color;
        if (serie.styleMapping) {
          if (serie.styleMapping.mapping) {
            const style = serie.styleMapping.mapping(
              tableGetCell(this._table, serie.styleMapping.col, rowIdx),
            );
            color = style?.color?.toString() ?? color;
          } else {
            const value = tableGetCell(this._table, serie.styleMapping.col, rowIdx);
            if (typeof value === 'string') {
              color = value;
            }
          }
        }
        if (!this._config.tooltip?.render && !serie.hideInTooltip) {
          const createFormatter = (axis: Axis) => {
            if (axis.format === undefined) {
              return (x: unknown) => `${x}`;
            }
            if (typeof axis.format === 'string') {
              return d3.format(axis.format);
            }
            if (axis.scale === 'time') {
              const [from, to] = xScale.range();
              const span = Math.abs(+xScale.invert(to) - +xScale.invert(from));
              const specifier = smartTimeFormatSpecifier(span);
              const format = axis.format;
              return (v: number) => format(v, specifier);
            }
            return axis.format;
          };
          const formatter = createFormatter(this._config.yAxes[serie.yAxis]);

          const yColIdx = tableGetColumnIndex(serie.yCol) ?? 0;
          const nameEl = document.createElement('div');
          nameEl.style.color = color;
          if (serie.title !== undefined) {
            nameEl.textContent = serie.title;
          } else if (Array.isArray(serie.yCol)) {
            nameEl.textContent = serie.yCol
              .map((p) => {
                if (typeof p === 'number') {
                  return p;
                }
                const last_dcolon = p.lastIndexOf('::');
                if (last_dcolon === -1) {
                  return p;
                }
                const field_name = p.slice(last_dcolon + 2);
                return field_name;
              })
              .join('.');
          } else if (this._table.headers && this._table.headers[yColIdx] !== undefined) {
            nameEl.textContent = this._table.headers[yColIdx];
          } else {
            nameEl.textContent = `Col ${yColIdx}`;
          }
          nameEl.part.add('tooltip-name', `tooltip-name-${yColIdx}`);
          const valueEl = document.createElement('div');
          valueEl.classList.add('tooltip-value');
          valueEl.part.add('tooltip-value', `tooltip-value-${yColIdx}`);
          if (
            this._config.tooltip?.position === 'bottom-right' ||
            this._config.tooltip?.position === 'top-right'
          ) {
            valueEl.classList.add('right');
          }
          valueEl.style.color = color;
          valueEl.textContent =
            serie.value !== undefined ? serie.value.toString() : formatter(yValue);
          this._tooltip.append(nameEl, valueEl);

          if (yValue2 !== undefined && isOrdSerieTableColumn(serie.yCol2)) {
            const y2ColIdx = tableGetColumnIndex(serie.yCol2) ?? 0;
            const nameEl = document.createElement('div');
            nameEl.style.color = color;
            if (serie.title !== undefined) {
              nameEl.textContent = serie.title;
            } else if (Array.isArray(serie.yCol2)) {
              const yCol2 = serie.yCol2 as number[] | gc.$Fields[]; // ts spreads union for some reason, gotta found why, meanwhile I'm casting
              nameEl.textContent = yCol2
                .map((p) => {
                  if (typeof p === 'number') {
                    return p;
                  }
                  const last_dcolon = p.lastIndexOf('::');
                  if (last_dcolon === -1) {
                    return p;
                  }
                  const field_name = p.slice(last_dcolon + 2);
                  return field_name;
                })
                .join('.');
            } else if (this._table.headers && this._table.headers[y2ColIdx] !== undefined) {
              nameEl.textContent = this._table.headers[y2ColIdx];
            } else {
              nameEl.textContent = `Col ${y2ColIdx}`;
            }
            nameEl.part.add('tooltip-name', `tooltip-name-${y2ColIdx}`);
            const valueEl = document.createElement('div');
            valueEl.classList.add('tooltip-value');
            valueEl.part.add('tooltip-value', `tooltip-value-${y2ColIdx}`);
            if (
              this._config.tooltip?.position === 'bottom-right' ||
              this._config.tooltip?.position === 'top-right'
            ) {
              valueEl.classList.add('right');
            }
            valueEl.style.color = color;
            valueEl.textContent = formatter(vMap(yValue2));
            this._tooltip.append(nameEl, valueEl);
          }
        }

        tooltipSerieData.push({ xValue, yValue, rowIdx, ...serie } as SerieData);
      }

      // we need to give a clone of the cursor because we don't want users to mutate our own version of it
      const cursor: Cursor = { ...this._cursor };
      // call tooltip render if defined
      this._config.tooltip?.render?.(tooltipSerieData, cursor);
      // dispatch event
      this.dispatchEvent(new GuiChartCursorEvent(tooltipSerieData, cursor));
    } else {
      if (this._canvasEntered) {
        this._canvasEntered = false;
        this.dispatchEvent(new GuiChartCanvasLeaveEvent());
      }
    }

    if (updateSelection && this._config.selection !== false) {
      const orientation = this._config.selection?.orientation ?? 'horizontal';
      // ensure start/end are bound to the ranges
      let startX = this._cursor.startX;
      if (startX < xRange[0]) {
        startX = xRange[0];
      } else if (startX > xRange[1]) {
        startX = xRange[1];
      }
      let endX = this._cursor.x;
      if (endX < xRange[0]) {
        endX = xRange[0];
      } else if (endX > xRange[1]) {
        endX = xRange[1];
      }
      if (startX > endX) {
        const tmp = endX;
        endX = startX;
        startX = tmp;
      }

      let startY = this._cursor.startY;
      if (startY > yRange[0]) {
        startY = yRange[0];
      } else if (startY < yRange[1]) {
        startY = yRange[1];
      }
      let endY = this._cursor.y;
      if (endY > yRange[0]) {
        endY = yRange[0];
      } else if (endY < yRange[1]) {
        endY = yRange[1];
      }
      if (startY > endY) {
        const tmp = endY;
        endY = startY;
        startY = tmp;
      }

      if (orientation === 'horizontal') {
        startY = yRange[1];
        endY = yRange[0];
      }

      if (orientation === 'vertical') {
        startX = xRange[0];
        endX = xRange[1];
      }

      const from: number = +xScale.invert(startX);
      const to: number = +xScale.invert(endX);

      if (this._cursor.selection) {
        // selection in progress
        const w = endX - startX;
        const h = endY - startY;
        this._uxCtx.rectangle(startX + w / 2, startY + h / 2, w, h, {
          fill: style['accent-0'],
          opacity: 0.1,
          center: true,
        });

        const nameEl = document.createElement('div');
        nameEl.style.color = style['text-0'];
        nameEl.textContent = 'Selection:';
        const valueEl = document.createElement('div');
        valueEl.style.color = style['text-0'];
        valueEl.classList.add('tooltip-value');
        if (
          this._config.tooltip?.position === 'bottom-right' ||
          this._config.tooltip?.position === 'top-right'
        ) {
          valueEl.classList.add('right');
        }
        let fromStr: string;
        let toStr: string;
        if (this._config.xAxis.cursorFormat === undefined) {
          if (this._config.xAxis.scale === 'time') {
            fromStr = d3.isoFormat(new Date(from));
            toStr = d3.isoFormat(new Date(to));
          } else {
            fromStr = `${from}`;
            toStr = `${to}`;
          }
        } else if (typeof this._config.xAxis.cursorFormat === 'string') {
          if (this._config.xAxis.scale === 'time') {
            fromStr = d3.utcFormat(this._config.xAxis.cursorFormat)(new Date(from));
            toStr = d3.utcFormat(this._config.xAxis.cursorFormat)(new Date(to));
          } else {
            fromStr = d3.format(this._config.xAxis.cursorFormat)(from);
            toStr = d3.format(this._config.xAxis.cursorFormat)(to);
          }
        } else {
          if (this._config.xAxis.scale === 'time') {
            const [from, to] = xScale.range();
            const span = Math.abs(+xScale.invert(to) - +xScale.invert(from));
            const specifier = smartTimeFormatSpecifier(span);
            fromStr = this._config.xAxis.cursorFormat(from, specifier);
            toStr = this._config.xAxis.cursorFormat(to, specifier);
          } else {
            fromStr = this._config.xAxis.cursorFormat(from);
            toStr = this._config.xAxis.cursorFormat(to);
          }
        }
        valueEl.textContent = `${fromStr}, ${toStr}`;

        this._tooltip.append(nameEl, valueEl);
      }
    }
  }

  private _selection(
    orientation: SelectionOptions['orientation'] | undefined = 'horizontal',
  ): void {
    if (!this._computed) {
      return;
    }
    const { xRange, yRange, xScale, yScales } = this._computed;
    // ensure start/end are bound to the ranges
    let startX = this._cursor.startX;
    if (startX < xRange[0]) {
      startX = xRange[0];
    } else if (startX > xRange[1]) {
      startX = xRange[1];
    }
    let endX = this._cursor.x;
    if (endX < xRange[0]) {
      endX = xRange[0];
    } else if (endX > xRange[1]) {
      endX = xRange[1];
    }
    if (startX > endX) {
      const tmp = endX;
      endX = startX;
      startX = tmp;
    }

    let startY = this._cursor.startY;
    if (startY > yRange[0]) {
      startY = yRange[0];
    } else if (startY < yRange[1]) {
      startY = yRange[1];
    }
    let endY = this._cursor.y;
    if (endY > yRange[0]) {
      endY = yRange[0];
    } else if (endY < yRange[1]) {
      endY = yRange[1];
    }
    if (startY > endY) {
      const tmp = endY;
      endY = startY;
      startY = tmp;
    }

    if (orientation === 'horizontal') {
      startY = yRange[1];
      endY = yRange[0];
    }

    if (orientation === 'vertical') {
      startX = xRange[0];
      endX = xRange[1];
    }

    const from: number = +xScale.invert(startX);
    const to: number = +xScale.invert(endX);

    // selection is done
    const selectionEvt = new GuiChartSelectionEvent({ from, to });

    if (orientation === 'both' || orientation === 'horizontal') {
      // call update to apply zoom
      xScale.domain([from, to]);
      this._config.xAxis.min = from;
      this._config.xAxis.max = to;
    }

    if (orientation === 'both' || orientation === 'vertical') {
      for (const yAxisName in yScales) {
        const yScale = yScales[yAxisName];
        const from: number = +yScale.invert(endY);
        const to: number = +yScale.invert(startY);
        yScale.domain([from, to]);
        this._config.yAxes[yAxisName].min = from;
        this._config.yAxes[yAxisName].max = to;
      }
    }

    // XXX do we want to dispatch after the animation or not?
    // reset selection
    this._resetCursor();
    this.dispatchEvent(selectionEvt);
    this.compute();
    this.update();
  }

  private _drawMarker(serie: Serie & SerieOptions, x: number, y2: number, w: number, color: Color) {
    switch (serie.markerShape ?? 'circle') {
      case 'circle':
        this._uxCtx.circle(x, y2, w, {
          fill: color,
        });
        break;
      case 'square':
        this._uxCtx.rectangle(x, y2, w, w, {
          fill: color,
        });
        break;
      case 'triangle':
        this._uxCtx.triangle(x, y2, w, w, {
          fill: color,
        });
        break;
    }
  }

  private _clearUX(): void {
    // clear ux canvas
    this._uxCtx.ctx.clearRect(0, 0, this._uxCanvas.width, this._uxCanvas.height);
    // clear tooltip
    if (this._config.tooltip?.always) {
      return;
    }
    this._tooltip.style.top = '';
    this._tooltip.style.right = '';
    this._tooltip.style.bottom = '';
    this._tooltip.style.left = '';
    this._tooltip.remove();
  }

  /**
   * Draws the chart to the different canvas & svg elements.
   */
  update(): void {
    if (!this._computed) {
      return;
    }
    // clear the main canvas
    this._ctx.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // clear the ux canvas too (to prevent phantom markers)
    this._clearUX();

    const { xScale, yScales, style } = this._computed;

    for (let i = 0; i < this._config.series.length; i++) {
      const serie: Serie & SerieOptions = {
        color: this._colors[i],
        width: 1,
        markerWidth: 3,
        markerShape: 'circle',
        markerColor: this._config.series[i].color ?? this._colors[i],
        opacity: 1,
        fillOpacity: 0.2,
        yCol2: 'min',
        hideInTooltip: false,
        hide: false,
        ...this._config.series[i],
      };

      if (!serie.hide) {
        serie.drawBefore?.(this._ctx, serie, xScale, yScales[serie.yAxis]);

        switch (serie.type) {
          case 'line':
            this._ctx.line(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'line+scatter':
            this._ctx.line(this._table, serie, xScale, yScales[serie.yAxis]);
            this._ctx.scatter(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'line+area':
            // draw area "under" (before) line
            this._ctx.area(this._table, serie, xScale, yScales[serie.yAxis]);
            this._ctx.line(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'area':
            this._ctx.area(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'bar':
            this._ctx.bar(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'scatter':
            this._ctx.scatter(this._table, serie, xScale, yScales[serie.yAxis]);
            break;
          case 'custom':
            serie.draw(this._ctx, serie, xScale, yScales[serie.yAxis]);
            break;
        }

        serie.drawAfter?.(this._ctx, serie, xScale, yScales[serie.yAxis]);
      }
    }

    // Clean Canvas bounds
    // +/- 1 to prevent line being removed on upper/lower bounds, only occurs when the line is exactly on the edge on firefox
    // Top
    this._ctx.ctx.clearRect(0, 0, this._canvas.width, style.margin.top - 1);
    // Bottom
    this._ctx.ctx.clearRect(
      0,
      this._canvas.height - style.margin.bottom + 1,
      this._canvas.width,
      style.margin.bottom,
    );
    // Left
    this._ctx.ctx.clearRect(0, 0, style.margin.left, this._canvas.height);
    // Right
    this._ctx.ctx.clearRect(
      this._canvas.width - style.margin.right,
      0,
      style.margin.right,
      this._canvas.height,
    );

    // Add the x-axis.
    this._xAxis = d3.axisBottom(xScale);
    if (this._config.xAxis.hook) {
      this._config.xAxis.hook(this._xAxis);
    } else {
      this._xAxis.tickFormat(createFormatter(this._config.xAxis, xScale));
      if (Array.isArray(this._config.xAxis.ticks)) {
        this._xAxis.tickValues(this._config.xAxis.ticks.map(vMap));
      } else if (typeof this._config.xAxis.ticks === 'function') {
        this._xAxis.ticks(this._config.xAxis.ticks);
      }
      if (this._config.xAxis.autoTicks) {
        const fmt = this._xAxis.tickFormat();
        const ticks = xScale.ticks();
        let width = this._ctx.ctx.measureText(fmt ? fmt(ticks[0], 0) : ticks[0].toString()).width;
        width = width + width * 0.5;
        const totalWidth = width * ticks.length;
        if (totalWidth > xScale.range()[1]) {
          this._xAxis.ticks(Math.floor(xScale.range()[1] / width));
        }
      }
    }

    this._xAxisGroup
      .attr('transform', `translate(0,${this._canvas.height - style.margin.bottom})`)
      .call(this._xAxis);

    // Add the y-axes.
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;

    for (const yAxisName in yScales) {
      if (this._yAxisGroups[yAxisName] === undefined) {
        // create a yAxisGroup only if needed
        this._yAxisGroups[yAxisName] = this._svg.append('g');
      }

      const ord = this._config.yAxes[yAxisName];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let yAxis: d3.Axis<any>;
      let translateX: number = 0;
      let textAnchor = 'start';

      if (ord.position === undefined || ord.position === 'left') {
        leftAxesIdx++;
        yAxis = d3.axisLeft(yScales[yAxisName]);
        translateX = style.margin.left + leftAxesIdx * style.margin.left;
        textAnchor = 'end';
      } else {
        rightAxesIdx++;
        yAxis = d3.axisRight(yScales[yAxisName]);
        translateX = this._canvas.width - (style.margin.right + rightAxesIdx * style.margin.right);
        textAnchor = 'start';
      }

      if (ord.hook) {
        ord.hook(yAxis);
      } else {
        yAxis.tickFormat(createFormatter(ord, yScales[yAxisName]));
        if (Array.isArray(ord.ticks)) {
          yAxis.tickValues(ord.ticks.map(vMap));
        } else if (typeof ord.ticks === 'function') {
          yAxis.ticks(ord.ticks);
        }

        if (ord.autoTicks) {
          const fmt = yAxis.tickFormat();
          const ticks = yScales[yAxisName].ticks();
          let width = this._ctx.ctx.measureText(fmt ? fmt(ticks[0], 0) : ticks[0].toString()).width;
          width = width + width * 0.2;
          const totalWidth = width * ticks.length;
          if (totalWidth > yScales[yAxisName].range()[0]) {
            yAxis.ticks(Math.floor(yScales[yAxisName].range()[0] / width));
          }
        }
      }

      this._yAxisGroups[yAxisName]
        .attr('transform', `translate(${translateX}, 0)`)
        .attr('text-anchor', textAnchor)
        .call(yAxis);
    }

    // remove no longer used yAxisGroup
    for (const yAxisName in this._yAxisGroups) {
      if (yScales[yAxisName] === undefined) {
        this._yAxisGroups[yAxisName].remove();
        delete this._yAxisGroups[yAxisName];
      }
    }

    if (this._drawerEnabled) {
      // update current config
      this._configEl.value = this._config;
    }
  }

  /**
   * Computes axes min/max bounds, display ranges, styles and scales.
   *
   * This method is potentially heavy has it iterates over the table content.
   * Try to use it only when the table changes or when the component needs to resize.
   */
  compute(): void {
    let leftAxes = 0;
    let rightAxes = 0;
    for (const yAxisName in this._config.yAxes) {
      const pos = this._config.yAxes[yAxisName].position;
      if (pos === undefined || pos === 'left') {
        leftAxes++;
      } else {
        rightAxes++;
      }
    }

    const style = getComputedStyle(this);

    const props = {
      'text-0': `rgb(${style.getPropertyValue('--text-0')})`,
      'accent-0': `rgb(${style.getPropertyValue('--accent-0')})`,
      cursor: {
        color: style.getPropertyValue('--cursor-c'),
        bgColor: style.getPropertyValue('--cursor-bg-c'),
        lineColor: style.getPropertyValue('--cursor-line-c'),
      },
      margin: {
        top: this._parseInt(style.getPropertyValue('--m-top')),
        right: this._parseInt(style.getPropertyValue('--m-right')),
        rightEmpty: this._parseInt(style.getPropertyValue('--m-right-empty')),
        bottom: this._parseInt(style.getPropertyValue('--m-bottom')),
        left: this._parseInt(style.getPropertyValue('--m-left')),
        leftEmpty: this._parseInt(style.getPropertyValue('--m-left-empty')),
      },
    };

    // compute ranges based on available width, height and margins
    const xRange = [
      leftAxes === 0 ? props.margin.left : props.margin.left + props.margin.left * (leftAxes - 1),
      rightAxes === 0
        ? this._canvas.width - props.margin.right
        : this._canvas.width - props.margin.right - props.margin.right * (rightAxes - 1),
    ];
    const yRange = [this._canvas.height - props.margin.bottom, props.margin.top];

    let xMin: number | null = null;
    let xMax: number | null = null;

    if (this._config.xAxis.min !== undefined) {
      xMin = vMap(this._config.xAxis.min);
    }

    if (this._config.xAxis.max !== undefined) {
      xMax = vMap(this._config.xAxis.max);
    }

    if (xMin !== null && xMax === null) {
      // x axis domain is not fully defined, we are missing the 'xMax' bound, let's iterate over the table to find it
      for (const serie of this._config.series) {
        if (serie.xCol !== undefined) {
          const col = tableGetColumn(this._table, serie.xCol) ?? [];
          for (let row = 0; row < col.length; row++) {
            const value = vMap(tableGetCell(this._table, serie.xCol, row));
            if (value !== null && value !== undefined && !isNaN(value)) {
              if (xMax == null) {
                xMax = value;
              } else if (value >= xMax) {
                xMax = value;
              }
            }
          }
        }
      }
    } else if (xMin === null && xMax !== null) {
      // x axis domain is not fully defined, we are missing the 'xMin' bound, let's iterate over the table to find it
      for (const serie of this._config.series) {
        if (serie.xCol !== undefined) {
          const col = tableGetColumn(this._table, serie.xCol) ?? [];
          for (let row = 0; row < col.length; row++) {
            const value = vMap(tableGetCell(this._table, serie.xCol, row));
            if (value !== null && value !== undefined && !isNaN(value)) {
              if (xMin == null) {
                xMin = value;
              } else if (value <= xMin) {
                xMin = value;
              }
            }
          }
        }
      }
    } else if (xMin === null && xMax === null) {
      // x axis domain is not defined, let's iterate over the table to find the boundaries
      for (const serie of this._config.series) {
        if (serie.type === 'bar' && serie.spanCol !== undefined) {
          const col = tableGetColumn(this._table, serie.spanCol[0]) ?? [];
          for (let row = 0; row < col.length; row++) {
            const valueMin = vMap(tableGetCell(this._table, serie.spanCol[0], row));
            const valueMax = vMap(tableGetCell(this._table, serie.spanCol[1], row));
            if (valueMin !== null && valueMin !== undefined && !isNaN(valueMin)) {
              if (xMin == null) {
                xMin = valueMin;
              } else if (valueMin <= xMin) {
                xMin = valueMin;
              }
            }
            if (valueMax !== null && valueMax !== undefined && !isNaN(valueMax)) {
              if (xMax == null) {
                xMax = valueMax;
              } else if (valueMax >= xMax) {
                xMax = valueMax;
              }
            }
          }
        } else if (serie.xCol !== undefined) {
          const col = tableGetColumn(this._table, serie.xCol) ?? [];
          for (let row = 0; row < col.length; row++) {
            const value = vMap(tableGetCell(this._table, serie.xCol, row));
            if (value !== null && value !== undefined && !isNaN(value)) {
              if (xMin == null) {
                xMin = value;
              } else if (value <= xMin) {
                xMin = value;
              }
              if (xMax == null) {
                xMax = value;
              } else if (value >= xMax) {
                xMax = value;
              }
            }
          }
        }
      }
    }

    if (xMin === null) {
      xMin = 0;
    }

    if (xMax === null) {
      xMax = Math.max(0, (this._table.cols[0]?.length ?? 0) - 1);
    }

    // TODO handle the case where no yAxes have been defined at all
    const yScales: Record<string, Scale> = {};
    for (const yAxisName in this._config.yAxes) {
      const yAxis = this._config.yAxes[yAxisName];

      const type = yAxis.scale ?? 'linear';
      let min: number | null = null;
      let max: number | null = null;

      if (yAxis.min !== undefined) {
        min = vMap(yAxis.min);
      }

      if (yAxis.max !== undefined) {
        max = vMap(yAxis.max);
      }

      if (min === null && max === null) {
        // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
        for (let i = 0; i < this._config.series.length; i++) {
          const serie = this._config.series[i];
          if (serie.yAxis === yAxisName) {
            const col = tableGetColumn(this._table, serie.yCol) ?? [];
            for (let row = 0; row < col.length; row++) {
              const value = vMap(tableGetCell(this._table, serie.yCol, row));
              if (value !== null && value !== undefined && !isNaN(value)) {
                if (min == null) {
                  min = value;
                } else if (value <= min) {
                  min = value;
                }
                if (max == null) {
                  max = value;
                } else if (value >= max) {
                  max = value;
                }
              }
              // make sure to account for 'yCol2' if used
              if (isOrdSerieTableColumn(serie.yCol2)) {
                const value = vMap(tableGetCell(this._table, serie.yCol2, row));
                if (value !== null && value !== undefined && !isNaN(value)) {
                  if (min == null) {
                    min = value;
                  } else if (value <= min) {
                    min = value;
                  }
                  if (max == null) {
                    max = value;
                  } else if (value >= max) {
                    max = value;
                  }
                }
              }
            }
          }
        }
      } else if (min !== null && max === null) {
        // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
        for (let i = 0; i < this._config.series.length; i++) {
          const serie = this._config.series[i];
          if (serie.yAxis === yAxisName) {
            const col = tableGetColumn(this._table, serie.yCol) ?? [];
            for (let row = 0; row < col.length; row++) {
              const value = vMap(tableGetCell(this._table, serie.yCol, row));
              if (value !== null && value !== undefined && !isNaN(value)) {
                if (max == null) {
                  max = value;
                } else if (value >= max) {
                  max = value;
                }
              }
              // make sure to account for 'yCol2' if used
              if (isOrdSerieTableColumn(serie.yCol2)) {
                const value = vMap(tableGetCell(this._table, serie.yCol2, row));
                if (value !== null && value !== undefined && !isNaN(value)) {
                  if (max == null) {
                    max = value;
                  } else if (value >= max) {
                    max = value;
                  }
                }
              }
            }
          }
        }
      } else if (min === null && max !== null) {
        // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
        for (let i = 0; i < this._config.series.length; i++) {
          const serie = this._config.series[i];
          if (serie.yAxis === yAxisName) {
            const col = tableGetColumn(this._table, serie.yCol) ?? [];
            for (let row = 0; row < col.length; row++) {
              const value = vMap(tableGetCell(this._table, serie.yCol, row));
              if (value !== null && value !== undefined && !isNaN(value)) {
                if (min == null) {
                  min = value;
                } else if (value <= min) {
                  min = value;
                }
              }
              // make sure to account for 'yCol2' if used
              if (isOrdSerieTableColumn(serie.yCol2)) {
                const value = vMap(tableGetCell(this._table, serie.yCol2, row));
                if (value !== null && value !== undefined && !isNaN(value)) {
                  if (min == null) {
                    min = value;
                  } else if (value <= min) {
                    min = value;
                  }
                }
              }
            }
          }
        }
      }

      if (min === null) {
        min = 0;
      }
      if (max === null) {
        max = 1;
      }

      if (yAxis.padding !== undefined) {
        if (type === 'log') {
          [min, max] = padLog([min, max], yAxis.padding);
        } else {
          [min, max] = padLinear([min, max], yAxis.padding);
        }
      }

      switch (type) {
        default:
        case 'linear':
          yScales[yAxisName] = d3.scaleLinear().domain([min, max]).rangeRound(yRange);
          break;
        case 'log':
          yScales[yAxisName] = d3.scaleLog().domain([min, max]).rangeRound(yRange);
          break;
        case 'time':
          yScales[yAxisName] = d3.scaleTime().domain([min, max]).rangeRound(yRange);
          break;
      }
    }

    const xAxis = this._config.xAxis;
    if (xAxis.padding !== undefined) {
      if (xAxis.scale === 'log') {
        [xMin, xMax] = padLog([xMin, xMax], xAxis.padding);
      } else {
        [xMin, xMax] = padLinear([xMin, xMax], xAxis.padding);
      }
    }
    let xScale: Scale;
    if (xAxis.scale === 'log') {
      xScale = d3.scaleLog().domain([xMin, xMax]).rangeRound(xRange);
    } else if (xAxis.scale === 'time') {
      xScale = d3.scaleTime().domain([xMin, xMax]).rangeRound(xRange);
    } else {
      // default to linear scale
      xScale = d3.scaleLinear().domain([xMin, xMax]).rangeRound(xRange);
    }

    this._computed = { leftAxes, rightAxes, xRange, yRange, style: props, xScale, yScales };
  }

  /**
   * `parseInt` that returns `0` when `NaN` is encountered
   */
  private _parseInt(prop: string): number {
    // note: we leverage js weirdness that parses '23px' as 23... for reasons
    // which is convenient here, cause we use this for CSS prop parsing
    const n = parseInt(prop);
    if (isNaN(n)) {
      return 0;
    }
    return isNaN(n) ? 0 : n;
  }
}

/**
 * `detail` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 *
 * If the `detail` is `null` it means the selection as been reseted to its initial values.
 */
export class GuiChartSelectionEvent extends CustomEvent<{ from: unknown; to: unknown } | null> {
  static readonly NAME = 'gui-selection';
  constructor(detail: { from: unknown; to: unknown } | null = null) {
    super(GuiChartSelectionEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

/**
 * - `detail.data` contains the current x axis domain boundaries `from` and `to` as either `number, number` or `Date, Date`
 * - `detail.cursor` contains the current cursor info
 */
export class GuiChartCursorEvent extends CustomEvent<{ data: SerieData[]; cursor: Cursor }> {
  static readonly NAME = 'gui-chart-cursor';
  constructor(data: SerieData[], cursor: Cursor) {
    super(GuiChartCursorEvent.NAME, { detail: { data, cursor }, bubbles: true, composed: true });
  }
}

/**
 * Called when the cursor enters the canvas.
 */
export class GuiChartCanvasEnterEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-chart-enter';
  constructor() {
    super(GuiChartCanvasEnterEvent.NAME, { bubbles: true, composed: true });
  }
}

/**
 * Called when the cursor leaves the canvas.
 */
export class GuiChartCanvasLeaveEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-chart-leave';
  constructor() {
    super(GuiChartCanvasLeaveEvent.NAME, { bubbles: true, composed: true });
  }
}

interface GuiChartEventMap {
  [GuiChartCursorEvent.NAME]: GuiChartCursorEvent;
  [GuiChartSelectionEvent.NAME]: GuiChartSelectionEvent;
  [GuiChartCanvasEnterEvent.NAME]: GuiChartCanvasEnterEvent;
  [GuiChartCanvasLeaveEvent.NAME]: GuiChartCanvasLeaveEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-chart': GuiChart;
  }

  interface HTMLElementEventMap extends GuiChartEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-chart': GreyCat.Element<GuiChart, GuiChartEventMap>;
      }
    }
  }
}
