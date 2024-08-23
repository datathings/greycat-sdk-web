import * as d3 from 'd3';
import { GestureDrawer } from '../../canvas/index.js';
import { createFormatter, smartTimeFormatSpecifier } from './utils.js';
import { getColors } from '../../utils.js';
import type {
  Axis,
  BarSerie,
  ChartConfig,
  Color,
  Scale,
  Serie,
  SerieData,
  SerieOptions,
} from './types.js';
import { VerticalAxisPos, type ShapeOptions } from './ctx.js';
import { TableView, type TableLike } from '../common.js';
import { Resizable } from '../mixins.js';
import { vMap } from './internals.js';
import { closest } from '../../internals.js';

type CachedState = {
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

export class GuiChart2 extends Resizable(GestureDrawer) {
  cursorLineOpts: ShapeOptions = {
    dashed: true,
    color: 'gray',
    opacity: 0.5,
  };
  cursorCrosshairWidth = 15;
  cursorCrosshairOpts: ShapeOptions = {
    color: 'gray',
  };
  private _table: TableView;
  private _config: ChartConfig;
  private _cache: CachedState;
  private _colors: string[] = [];
  /** this is used by the draggingLogic to know the dragging offsetting to apply at every frame */
  private _drag = { x: -1, y: -1 };
  /**
   * this is used to keep what the user defined as min/max in there axes
   * so that we can reset to those values when double-clicking
   */
  private _userDefined: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xAxis: { min?: any; max?: any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yAxes: Record<string, { min?: any; max?: any }>;
  } = {
    xAxis: {},
    yAxes: {},
  };

  constructor() {
    super(200, true);

    this.selectionOpts.opacity = 0.06;

    this._table = new TableView();
    this._config = { series: [], xAxis: {}, yAxes: {} };
    this._cache = {
      leftAxes: 0,
      rightAxes: 0,
      xRange: [0, this.main.ctx.canvas.width],
      yRange: [this.main.ctx.canvas.height, 0],
      style: {
        'text-0': '',
        'accent-0': '',
        cursor: {
          color: '',
          bgColor: '',
          lineColor: '',
        },
        margin: {
          top: 0,
          right: 0,
          rightEmpty: 0,
          bottom: 0,
          left: 0,
          leftEmpty: 0,
        },
      },
      xScale: d3.scaleTime(),
      yScales: {},
    };

    this.root.appendChild(
      <style>{`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        user-select: none;
      }
    `}</style>,
    );

    this._mutationObs = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          this.compute();
          this.update();
        }
      }
      console.log('mutations', mutations);
    });
  }

  private _mutationObs: MutationObserver;

  override connectedCallback(): void {
    super.connectedCallback();

    this._mutationObs.observe(document.documentElement, { attributes: true });

    const styles = window.getComputedStyle(this);
    const accentColor = styles.getPropertyValue('--primary');

    if (accentColor) {
      this.cursorCrosshairOpts.color = accentColor.toString();
    }
  }

  override disconnectedCallback(): void {
    this._mutationObs.disconnect();
  }

  override onResize(entry: ResizeObserverEntry): void {
    this.resize(entry.contentRect.width, entry.contentRect.height);
    this.compute();
    this.update();
  }

  override onDblClick(): void {
    console.log('onDblClick');
    if (this._inBounds()) {
      // double-click in the selection boundaries means that we reset all axes (horizontal & vertical)
      this._config.xAxis.min = this._userDefined.xAxis.min;
      this._config.xAxis.max = this._userDefined.xAxis.max;
      for (const yAxisName in this._config.yAxes) {
        this._config.yAxes[yAxisName].min = this._userDefined.yAxes[yAxisName].min;
        this._config.yAxes[yAxisName].max = this._userDefined.yAxes[yAxisName].max;
      }
      this.compute();
      this.update();
    } else {
      // double-click not in selection boundaries, lets try to find out
      // if the double-click happened while hovering axes (horizontal or vertical)
      // and reset the ones that are hovered only
      if (
        this._cursor.x > this.selectionOpts.left &&
        this._cursor.y > this.anim.ctx.canvas.height - this.selectionOpts.bottom
      ) {
        // dblclick on bottom axis
        this._config.xAxis.min = this._userDefined.xAxis.min;
        this._config.xAxis.max = this._userDefined.xAxis.max;
        this.compute();
        this.update();
      } else if (
        this._cursor.x < this.selectionOpts.left &&
        this._cursor.y > this.selectionOpts.top &&
        this._cursor.y < this.anim.ctx.canvas.height - this.selectionOpts.bottom
      ) {
        // dblclick on vertical left axes
        for (const yAxisName in this._config.yAxes) {
          const yAxis = this._config.yAxes[yAxisName];
          if (yAxis.position === undefined || yAxis.position === 'left') {
            yAxis.min = this._userDefined.yAxes[yAxisName].min;
            yAxis.max = this._userDefined.yAxes[yAxisName].max;
          }
        }
        this.compute();
        this.update();
      } else if (
        this._cursor.x > this.anim.ctx.canvas.width - this.selectionOpts.right &&
        this._cursor.y > this.selectionOpts.top &&
        this._cursor.y < this.anim.ctx.canvas.height - this.selectionOpts.bottom
      ) {
        // dblclick on vertical right axes
        for (const yAxisName in this._config.yAxes) {
          const yAxis = this._config.yAxes[yAxisName];
          if (yAxis.position === 'right') {
            yAxis.min = this._userDefined.yAxes[yAxisName].min;
            yAxis.max = this._userDefined.yAxes[yAxisName].max;
          }
        }
        this.compute();
        this.update();
      }
    }
  }

  override onSelection(start: [number, number], end: [number, number]): void {
    console.log('onSelection', start, end);
    this._config.xAxis.min = this._cache.xScale.invert(start[0]);
    this._config.xAxis.max = this._cache.xScale.invert(end[0]);
    for (const yAxisName in this._cache.yScales) {
      const yAxis = this._config.yAxes[yAxisName];
      const yScale = this._cache.yScales[yAxisName];

      yAxis.max = yScale.invert(start[1]);
      yAxis.min = yScale.invert(end[1]);
    }
    this.compute();
    this.update();
  }

  override onDragStart(): void {
    console.log('drag start');
  }

  override onDragStop(): void {
    console.log('drag stop');
  }

  override draw(fps: number): void {
    super.draw(fps);

    // TODO
    // - add marker logic to highlight drawing based on current cursor pos
    // - add tooltip logic associated with previous item

    switch (this._state) {
      case GestureDrawer.NONE: {
        // reset cursor
        document.body.style.cursor = '';
        // reset drag
        this._drag.x = -1;
        break;
      }
      case GestureDrawer.HOVERING: {
        // reset drag
        this._drag.x = -1;
        if (!this._drawAxisHovering()) {
          this._drawMarkers();
          this._drawCursors();
        }
        break;
      }
      case GestureDrawer.SELECTING: {
        // cursor out of canvas
        document.body.style.cursor = '';
        // reset drag
        this._drag.x = -1;
        this._drawCursors();
        break;
      }
      case GestureDrawer.DRAGGING: {
        document.body.style.cursor = 'grabbing';

        this._draggingLogic();
        break;
      }
    }
  }

  private _draggingLogic(): void {
    if (this._drag.x === -1) {
      this._drag.x = this._cursor.x;
      this._drag.y = this._cursor.y;
    }

    const dx = this._drag.x - this._cursor.x;
    const dy = this._drag.y - this._cursor.y;

    const [min, max] = this._cache.xScale.range();
    this._config.xAxis.min = this._cache.xScale.invert(min + dx);
    this._config.xAxis.max = this._cache.xScale.invert(max + dx);
    for (const yAxis in this._cache.yScales) {
      const yScale = this._cache.yScales[yAxis];
      const [min, max] = yScale.range();
      this._config.yAxes[yAxis].min = yScale.invert(min + dy);
      this._config.yAxes[yAxis].max = yScale.invert(max + dy);
    }

    this._drag.x = this._cursor.x;
    this._drag.y = this._cursor.y;

    this.compute();
    this.update();
  }

  private _drawMarkers(): void {
    if (!this._table.cols) {
      return;
    }

    const { xScale, yScales, xRange, yRange, style } = this._cache;

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
        ...this._config.series[i],
      };

      const v = +xScale.invert(this._cursor.x);

      const { xValue, rowIdx } = closest(
        this._table.cols,
        serie,
        this._cursor.x,
        this._cursor.y,
        this._config.xAxis,
        this._config.yAxes,
        xScale,
        yScales[serie.yAxis],
        v,
      );

      const yValue =
        typeof this._table.cols[serie.yCol][rowIdx] === 'bigint'
          ? Number(this._table.cols[serie.yCol][rowIdx])
          : this._table.cols[serie.yCol][rowIdx];
      const x = xScale(vMap(xValue));
      let y = yScales[serie.yAxis](vMap(yValue));
      const w = serie.markerWidth;
      let yValue2;
      if (typeof serie.yCol2 === 'number') {
        yValue2 = this._table.cols[serie.yCol2][rowIdx];
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
            this.anim.rectangle(rectX, rectY, w, h, {
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
            this._table.cols[serie.styleMapping.col]?.[rowIdx],
          );
          color = style?.color?.toString() ?? color;
        } else {
          const value = this._table.cols[serie.styleMapping.col]?.[rowIdx];
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

        const nameEl = document.createElement('div');
        nameEl.style.color = color;
        nameEl.textContent =
          serie.title ?? this._table.meta?.[serie.yCol]?.header ?? `Col ${serie.yCol}`;
        const valueEl = document.createElement('div');
        valueEl.classList.add('gui-chart-tooltip-value');
        if (
          this._config.tooltip?.position === 'bottom-right' ||
          this._config.tooltip?.position === 'top-right'
        ) {
          valueEl.classList.add('right');
        }
        valueEl.style.color = color;
        valueEl.textContent = formatter(yValue);
        // TODO tooltip
        // this._tooltip.append(nameEl, valueEl);
        // console.log('tooltip', nameEl.textContent, valueEl.textContent);

        if (yValue2 !== undefined && typeof serie.yCol2 === 'number') {
          const nameEl = document.createElement('div');
          nameEl.style.color = color;
          nameEl.textContent =
            serie.title ?? this._table.meta?.[serie.yCol2]?.header ?? `Col ${serie.yCol2}`;
          const valueEl = document.createElement('div');
          valueEl.classList.add('gui-chart-tooltip-value');
          if (
            this._config.tooltip?.position === 'bottom-right' ||
            this._config.tooltip?.position === 'top-right'
          ) {
            valueEl.classList.add('right');
          }
          valueEl.style.color = color;
          valueEl.textContent = formatter(yValue2);
          // TODO tooltip
          // this._tooltip.append(nameEl, valueEl);
          // console.log('tooltip', nameEl.textContent, valueEl.textContent);
        }
      }

      tooltipSerieData.push({ xValue, yValue, rowIdx, ...serie } as SerieData);
    }
  }

  private _drawMarker(
    serie: Serie & SerieOptions,
    x: number,
    y2: number,
    w: number,
    color: Color,
  ): void {
    switch (serie.markerShape ?? 'circle') {
      case 'circle':
        this.anim.circle(x, y2, w, {
          fill: color,
        });
        break;
      case 'square':
        this.anim.rectangle(x, y2, w, w, {
          fill: color,
        });
        break;
      case 'triangle':
        this.anim.triangle(x, y2, w, w, {
          fill: color,
        });
        break;
    }
  }

  private _drawAxisHovering(): boolean {
    if (
      this._cursor.x > this.selectionOpts.left &&
      this._cursor.y > this.anim.ctx.canvas.height - this.selectionOpts.bottom
    ) {
      // cursor hovering bottom axis
      document.body.style.cursor = 'ew-resize';
      return true;
    } else if (
      (this._cursor.x < this.selectionOpts.left ||
        this._cursor.x > this.anim.ctx.canvas.width - this.selectionOpts.right) &&
      this._cursor.y > this.selectionOpts.top &&
      this._cursor.y < this.anim.ctx.canvas.height - this.selectionOpts.bottom
    ) {
      // cursor hovering vertical axis
      document.body.style.cursor = 'ns-resize';
      return true;
    } else {
      // cursor hovering something else, resetting
      document.body.style.cursor = '';
      return false;
    }
  }

  private _drawCursors(): void {
    if (this._config.cursor) {
      this._drawCursor(this._start.x, this._start.y);
      // prevent double-drawing on the same pixels when starting a selection
      if (this._start.x !== this._cursor.x && this._start.y !== this._cursor.y) {
        this._drawCursor(this._cursor.x, this._cursor.y);
      }
    }
  }

  private _drawCursor(x: number, y: number): void {
    if (x == -1 && y == -1) {
      return;
    }

    // stay in boundaries (don't go over axis)
    x = Math.max(
      this.selectionOpts.left,
      Math.min(this.anim.ctx.canvas.width - this.selectionOpts.right, x),
    );
    y = Math.max(
      this.selectionOpts.top,
      Math.min(this.anim.ctx.canvas.height - this.selectionOpts.bottom, y),
    );

    // horizontal
    this.anim.simpleLine(
      this.selectionOpts.left,
      y + 0.5,
      this.anim.ctx.canvas.width - this.selectionOpts.right,
      y + 0.5,
      this.cursorLineOpts,
    );
    // vertical
    this.anim.simpleLine(
      x - 0.5,
      this.selectionOpts.top,
      x - 0.5,
      this.anim.ctx.canvas.height - this.selectionOpts.bottom,
      this.cursorLineOpts,
    );
    // crosshair
    this.anim.cross(x - 0.5, y + 0.5, this.cursorCrosshairWidth, this.cursorCrosshairOpts);
    // labels
    this._drawCursorAxesLabels(x, y);
  }

  private _drawCursorAxesLabels(x: number, y: number): void {
    const defaultCursorPadding = 10;
    const { xScale, yScales, yRange, style } = this._cache;

    // bottom axis text
    const xValue = +xScale.invert(x);
    const formatter = createFormatter(this._config.xAxis, xScale, true);
    // TODO clip on boundaries
    this.anim.text(
      x,
      yRange[0] + (this._config.xAxis.cursorPadding ?? defaultCursorPadding),
      formatter(xValue),
      {
        color: style.cursor.color,
        backgroundColor: style.cursor.bgColor,
        align: this._config.xAxis.cursorAlign ?? 'center',
        baseline: this._config.xAxis.cursorBaseline ?? 'top',
      },
    );
    let leftAxesIdx = -1;
    let rightAxesIdx = -1;

    // y axes texts
    for (const yAxisName in yScales) {
      const yAxis = this._config.yAxes[yAxisName];
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
        this.anim.text(
          style.margin.left + leftAxesIdx * style.margin.left + padding,
          y,
          formatter(+vMap(yScales[yAxisName].invert(y))),
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
        this.anim.text(
          this.anim.ctx.canvas.width -
            (style.margin.right + rightAxesIdx * style.margin.right) +
            padding,
          y,
          formatter(+vMap(yScales[yAxisName].invert(y))),
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

  get value(): TableLike | undefined {
    return this._table.table;
  }

  set value(value: TableLike | undefined) {
    this._table.table = value;
    this.compute();
    this.update();
  }

  get config() {
    return this._config;
  }

  set config(config: ChartConfig) {
    this._config = config;
    this._userDefined.xAxis = { min: this._config.xAxis.min, max: this._config.xAxis.max };
    for (const name in this._config.yAxes) {
      this._userDefined.yAxes[name] = {
        min: this._config.yAxes[name].min,
        max: this._config.yAxes[name].max,
      };
    }
    this.compute();
    this.update();
  }

  update(): void {
    this.main.clear();

    const styles = window.getComputedStyle(this);
    const fill = styles.getPropertyValue('--bg-1')?.toString() ?? 'transparent';
    // main background
    this.main.rectangle(0, 0, this.main.ctx.canvas.width, this.main.ctx.canvas.height, { fill });

    for (let i = 0; i < this._config.series.length; i++) {
      const serie = this._config.series[i];
      this.drawSerie({
        color: this._colors[i],
        width: 1,
        markerWidth: 3,
        markerShape: 'circle',
        markerColor: serie.color ?? this._colors[i],
        opacity: 1,
        fillOpacity: 0.2,
        yCol2: 'min',
        hideInTooltip: false,
        ...serie,
      });
    }

    this.main.rectInverse(
      this.selectionOpts.left,
      this.selectionOpts.top,
      this.selectionOpts.right,
      this.selectionOpts.bottom,
      fill,
    );

    this._drawAxis();
  }

  private _drawAxis(): void {
    // xAxis
    this.main.horizontalAxis(
      this.main.ctx.canvas.height - this._cache.style.margin.bottom,
      this._cache.xScale,
      createFormatter(this._config.xAxis, this._cache.xScale, true),
    );

    // yAxes
    let yAxisLeftIndex = 0;
    let yAxisRightIndex = 0;
    for (const yAxisName in this._cache.yScales) {
      const yAxis = this._config.yAxes[yAxisName];
      const yScale = this._cache.yScales[yAxisName];
      if (yAxis.position === undefined || yAxis.position === 'left') {
        this.main.verticalAxis(
          this._cache.style.margin.left + this._cache.style.margin.left * yAxisLeftIndex,
          yScale,
          createFormatter(yAxis, yScale, true),
          VerticalAxisPos.Left,
        );
        yAxisLeftIndex++;
      } else {
        this.main.verticalAxis(
          this.main.ctx.canvas.width -
            this._cache.style.margin.right -
            this._cache.style.margin.right * yAxisRightIndex,
          yScale,
          createFormatter(yAxis, yScale, true),
          VerticalAxisPos.Right,
        );
        yAxisRightIndex++;
      }
    }
  }

  drawSerie(serie: Serie & SerieOptions): void {
    const { xScale, yScales } = this._cache;
    const yScale = yScales[serie.yAxis];
    if (!yScale) {
      return;
    }

    serie.drawBefore?.(this.main, serie, xScale, yScales[serie.yAxis]);

    switch (serie.type) {
      case 'line':
        this.main.line(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'line+scatter':
        this.main.line(this._table, serie, xScale, yScales[serie.yAxis]);
        serie.plotRadius = serie.plotRadius ?? 3;
        this.main.scatter(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'line+area':
        // draw area "under" (before) line
        this.main.area(this._table, serie, xScale, yScales[serie.yAxis]);
        this.main.line(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'area':
        this.main.area(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'bar':
        this.main.bar(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'scatter':
        serie.width = serie.plotRadius ?? 3;
        this.main.scatter(this._table, serie, xScale, yScales[serie.yAxis]);
        break;
      case 'custom':
        serie.draw(this.main, serie, xScale, yScales[serie.yAxis]);
        break;
    }

    serie.drawAfter?.(this.main, serie, xScale, yScales[serie.yAxis]);
  }

  /**
   * Computes axes min/max bounds, display ranges, styles and scales.
   *
   * This method is potentially heavy has it iterates over the table content.
   * Try to use it only when the table changes or when the component needs to resize.
   */
  compute(): void {
    this._colors = getColors(this);

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

    // update selection boundaries
    this.selectionOpts.left =
      leftAxes === 0 ? props.margin.leftEmpty : props.margin.left * leftAxes;
    this.selectionOpts.top = props.margin.top;
    this.selectionOpts.right =
      rightAxes === 0 ? props.margin.rightEmpty : props.margin.right * rightAxes;
    this.selectionOpts.bottom = props.margin.bottom;

    // compute ranges based on available width, height and margins
    const xRange = [
      leftAxes === 0 ? props.margin.left : props.margin.left + props.margin.left * (leftAxes - 1),
      rightAxes === 0
        ? this.main.ctx.canvas.width - props.margin.rightEmpty
        : this.main.ctx.canvas.width - props.margin.right - props.margin.right * (rightAxes - 1),
    ];
    const yRange = [this.main.ctx.canvas.height - props.margin.bottom, props.margin.top];

    let xMin: number | null = null;
    let xMax: number | null = null;

    if (this._config.xAxis.min !== undefined) {
      xMin = vMap(this._config.xAxis.min);
    }

    if (this._config.xAxis.max !== undefined) {
      xMax = vMap(this._config.xAxis.max);
    }

    if (xMin === null || xMax === null) {
      // x axis domain is not fully defined, let's iterate over the table to find the boundaries
      for (const serie of this._config.series) {
        if (serie.xCol !== undefined) {
          const col = this._table.cols?.[serie.xCol];
          const nb_rows = col?.length ?? 0;
          for (let row = 0; row < nb_rows; row++) {
            const value = vMap(col[row]);
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
      xMax = Math.max(0, (this._table.cols?.[0]?.length ?? 0) - 1);
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

      if (min === null || max === null) {
        // axis domain is not fully defined, we need to iterate through the series to compute the actual domain
        for (let i = 0; i < this._config.series.length; i++) {
          const serie = this._config.series[i];
          if (serie.yAxis === yAxisName) {
            for (let row = 0; row < (this._table.cols?.[serie.yCol]?.length ?? 0); row++) {
              const value = vMap(this._table.cols?.[serie.yCol]?.[row]);
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
              if (typeof serie.yCol2 === 'number') {
                const value = vMap(this._table.cols?.[serie.yCol2]?.[row]);
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
      }

      switch (type) {
        default:
        case 'linear':
          yScales[yAxisName] = d3
            .scaleLinear()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
        case 'log':
          yScales[yAxisName] = d3
            .scaleLog()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
        case 'time':
          yScales[yAxisName] = d3
            .scaleTime()
            .domain([min ?? 0, max ?? 1])
            .rangeRound(yRange);
          break;
      }
    }

    const xAxis = this._config.xAxis;
    let xScale: Scale;
    if (xAxis.scale === 'log') {
      xScale = d3.scaleLog().domain([xMin, xMax]).rangeRound(xRange);
    } else if (xAxis.scale === 'time') {
      xScale = d3.scaleTime().domain([xMin, xMax]).rangeRound(xRange);
    } else {
      // default to linear scale
      xScale = d3.scaleLinear().domain([xMin, xMax]).rangeRound(xRange);
    }

    this._cache = {
      leftAxes,
      rightAxes,
      xRange,
      yRange,
      style: props,
      xScale,
      yScales,
    };
  }

  setAttrs({
    value = this._table,
    config = this._config,
  }: Partial<{ value: TableLike; config: ChartConfig }>): void {
    this._config = config;
    this._userDefined.xAxis = { min: this._config.xAxis.min, max: this._config.xAxis.max };
    for (const name in this._config.yAxes) {
      this._userDefined.yAxes[name] = {
        min: this._config.yAxes[name].min,
        max: this._config.yAxes[name].max,
      };
    }
    this._table.table = value; // TODO this recomputes the table everytime (sometimes for no reasons, if the references are the same for instance)
    this.compute();
    this.update();
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

declare global {
  interface HTMLElementTagNameMap {
    'gui-chart2': GuiChart2;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-chart2': GreyCat.Element<GuiChart2>;
    }
  }
}

if (!customElements.get('gui-chart2')) {
  customElements.define('gui-chart2', GuiChart2);
}
