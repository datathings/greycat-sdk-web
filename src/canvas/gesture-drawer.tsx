import type { ShapeOptions, TextOptions } from '../components/chart/ctx.js';
import { CanvasDrawer } from './canvas-drawer.js';
import { round } from './utils.js';

export type GestureState =
  | typeof GestureDrawer.NONE
  | typeof GestureDrawer.HOVERING
  | typeof GestureDrawer.SELECTING
  | typeof GestureDrawer.DRAGGING;
type Cursor = {
  x: number;
  y: number;
};
export type SelectionBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

/**
 * Abstracts away gesture events for both mouse & touch events on a canvas.
 *
 * Calls:
 *  - `draw()` on every frame (every ~16.6ms or 60 times per seconds)
 *  - `onDblClick()` on double-click/double-tap
 *  - `onSelection()` when a selection ends
 */
export class GestureDrawer extends CanvasDrawer {
  static readonly NONE = 0;
  static readonly HOVERING = 1;
  static readonly SELECTING = 2;
  static readonly DRAGGING = 3;

  /**
   * The current state for the anim canvas:
   *  - `GestureDrawer.NONE`: cursor is out of canvas
   *  - `GestureDrawer.HOVERING`: cursor is over the canvas
   *  - `GestureDrawer.SELECTING`: selecting a portion
   *  - `GestureDrawer.DRAGGING`: dragging
   */
  protected _state: GestureState = GestureDrawer.NONE;

  /** the current position of the cursor */
  protected _cursor: Cursor = {
    x: -1,
    y: -1,
  };
  /** the start position in a selection or a drag */
  protected _start = { x: -1, y: -1 };
  private _clickCount = 0;
  private _lastClickTime = -1;

  selectionOpts: ShapeOptions & SelectionBounds = {
    fill: '#c0f85f',
    opacity: 0.1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };

  constructor(
    /**
     * This is used for double-click and selection detection.
     *
     * If a double-click happens below this threshold, `onDblClick()` will be called.
     *
     * If the time between mousedown and mouseup is more than this threshold, `onSelection()` will be called.
     */
    public clickThreshold = 250,
    public canvasDebug = false,
  ) {
    super();

    const setCursorPos = (ev: { pageX: number; pageY: number }) => {
      const { left, top, width, height } = this.main.ctx.canvas.getBoundingClientRect();
      const x = round(ev.pageX - (left + window.scrollX));
      const y = round(ev.pageY - (top + window.scrollY));
      if (this._state !== GestureDrawer.SELECTING && this._state !== GestureDrawer.DRAGGING) {
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          this._state = GestureDrawer.HOVERING;
        } else {
          this._state = GestureDrawer.NONE;
        }
      }
      this._cursor.x = x;
      this._cursor.y = y;
    };
    const setMouseDown = (state: GestureState) => {
      const prevState = this._state;
      // update type
      this._state = state;

      switch (state) {
        case GestureDrawer.SELECTING: {
          const now = Date.now();
          if (now - this._lastClickTime < this.clickThreshold) {
            this._clickCount++;
          } else {
            this._clickCount = 1;
          }
          this._lastClickTime = now;

          if (this._inBounds()) {
            if (this._clickCount === 1) {
              this._start.x = this._cursor.x;
              this._start.y = this._cursor.y;
            } else if (this._clickCount === 2) {
              this.onDblClick();
            }
          } else {
            this._state = prevState;
            if (this._clickCount === 2) {
              this.onDblClick();
            }
          }

          break;
        }
        case GestureDrawer.DRAGGING: {
          this._start.x = this._cursor.x;
          this._start.y = this._cursor.y;
          this.onDragStart();
          break;
        }
      }
    };
    const setMouseUp = (state: GestureState) => {
      switch (state) {
        case GestureDrawer.SELECTING: {
          if (this._start.x !== -1 && Date.now() - this._lastClickTime > this.clickThreshold) {
            // selection
            const xMax = this.anim.ctx.canvas.width - this.selectionOpts.right;
            const yMax = this.anim.ctx.canvas.height - this.selectionOpts.bottom;

            let xStart = Math.max(this.selectionOpts.left, Math.min(xMax, this._start.x));
            let yStart = Math.max(this.selectionOpts.top, Math.min(yMax, this._start.y));
            let xEnd = Math.max(this.selectionOpts.left, Math.min(xMax, this._cursor.x));
            let yEnd = Math.max(this.selectionOpts.top, Math.min(yMax, this._cursor.y));

            if (xStart > xEnd) {
              const tmp = xStart;
              xStart = xEnd;
              xEnd = tmp;
            }
            if (yStart > yEnd) {
              const tmp = yStart;
              yStart = yEnd;
              yEnd = tmp;
            }

            this.onSelection([xStart, yStart], [xEnd, yEnd]);
          }
          break;
        }
        case GestureDrawer.DRAGGING: {
          if (this._start.x !== -1 && this._start.y !== -1) {
            this.onDragStop();
          }
          break;
        }
      }

      // reset
      if (
        this._cursor.x >= 0 &&
        this._cursor.x <= this.anim.ctx.canvas.width &&
        this._cursor.y >= 0 &&
        this._cursor.y <= this.anim.ctx.canvas.height
      ) {
        this._state = GestureDrawer.HOVERING;
      } else {
        this._state = GestureDrawer.NONE;
      }
      this._start.x = -1;
      this._start.y = -1;
    };

    document.addEventListener('mousemove', setCursorPos);
    document.addEventListener('touchmove', (ev) => {
      if (ev.touches.length === 1) {
        const touch = ev.touches.item(0) as Touch;
        setCursorPos(touch);
      }
    });

    this.anim.ctx.canvas.addEventListener('mousedown', (ev) => {
      if (ev.button === 0) {
        setMouseDown(GestureDrawer.SELECTING);
      } else if (ev.button === 2) {
        this._start.x = -1;
        setMouseUp(GestureDrawer.DRAGGING);
        setMouseDown(GestureDrawer.DRAGGING);
      }
    });
    this.anim.ctx.canvas.addEventListener('touchstart', (ev) => {
      if (ev.touches.length === 1) {
        const touch = ev.touches.item(0) as Touch;
        setCursorPos(touch);
        setMouseDown(GestureDrawer.SELECTING);
        ev.preventDefault();
      } else if (ev.touches.length === 2) {
        this._start.x = -1;
        setMouseUp(GestureDrawer.DRAGGING);
        setMouseDown(GestureDrawer.DRAGGING);
      }
    });

    this.anim.ctx.canvas.addEventListener('touchend', (ev) => {
      if (ev.touches.length === 1) {
        setMouseUp(GestureDrawer.SELECTING);
      } else {
        setMouseUp(GestureDrawer.DRAGGING);
      }
    });
    document.addEventListener('mouseup', (ev) => {
      if (ev.button === 0) {
        setMouseUp(GestureDrawer.SELECTING);
      } else {
        setMouseUp(GestureDrawer.DRAGGING);
      }
    });

    // disables right-click context menu
    this.main.ctx.canvas.oncontextmenu = () => false;
    // disables right-click context menu
    this.anim.ctx.canvas.oncontextmenu = () => false;
  }

  override draw(fps: number) {
    this.anim.ctx.clearRect(0, 0, this.anim.ctx.canvas.width, this.anim.ctx.canvas.height);
    this._drawSelection();
    if (this.canvasDebug) {
      this._drawDebug(fps);
    }
  }

  /**
   * Called when a double-click happens. This also works for touch screens.
   */
  onDblClick(): void {}

  /**
   * Called when dragging starts
   */
  onDragStart(): void {}

  /**
   * Called when dragging stops
   */
  onDragStop(): void {}

  /**
   * Called when a selection happens. This also works for touch screens.
   *
   * @param start top-left point
   * @param end bottom-rightpoint
   */
  onSelection(_start: [number, number], _end: [number, number]): void {}

  /**
   * Draws the current selection.
   *
   * *By default this method draws a rectangle using the `selectionOpts`.*
   *
   * Override this method to change the behavior of the selection drawing.
   */
  protected drawSelection(x: number, y: number, width: number, height: number): void {
    this.anim.rectangle(x, y, width, height, this.selectionOpts);
  }

  /**
   * Returns `true` when the cursor is within selection boundaries
   */
  protected _inBounds(): boolean {
    const x = this._cursor.x;
    const y = this._cursor.y;

    const xMin = this.selectionOpts.left;
    const xMax = this.anim.ctx.canvas.width - this.selectionOpts.right;
    const yMin = this.selectionOpts.top;
    const yMax = this.anim.ctx.canvas.height - this.selectionOpts.bottom;

    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  }

  private _drawSelection(): void {
    if (this._start.x === -1 || this._state !== GestureDrawer.SELECTING) {
      return;
    }

    const xMax = this.anim.ctx.canvas.width - this.selectionOpts.right;
    const yMax = this.anim.ctx.canvas.height - this.selectionOpts.bottom;

    const xStart = Math.max(this.selectionOpts.left, Math.min(xMax, this._start.x));
    const yStart = Math.max(this.selectionOpts.top, Math.min(yMax, this._start.y));
    const xCursor = Math.max(this.selectionOpts.left, Math.min(xMax, this._cursor.x));
    const yCursor = Math.max(this.selectionOpts.top, Math.min(yMax, this._cursor.y));

    const x = xCursor > xStart ? xStart : xCursor;
    const y = yCursor > yStart ? yStart : yCursor;
    const w = Math.abs(xCursor - xStart);
    const h = Math.abs(yCursor - yStart);

    this.drawSelection(x, y, w, h);
  }

  private _drawDebug(fps: number): void {
    const x = this.anim.ctx.canvas.width - 10;
    const y = 10;
    const style = getComputedStyle(this);
    const color = `rgb(${style.getPropertyValue('--text-0')})`;
    const opts: TextOptions = { color, align: 'end', baseline: 'top' };
    const abs_coords = `abs(${this._cursor.x.toString().padStart(4, ' ')}, ${this._cursor.y
      .toString()
      .padStart(4, ' ')})`;

    const xMax = this.anim.ctx.canvas.width - this.selectionOpts.right;
    const yMax = this.anim.ctx.canvas.height - this.selectionOpts.bottom;

    const xRel = Math.max(this.selectionOpts.left, Math.min(xMax, this._cursor.x))
      .toString()
      .padStart(4, ' ');
    const yRel = Math.max(this.selectionOpts.top, Math.min(yMax, this._cursor.y))
      .toString()
      .padStart(4, ' ');

    const rel_coords = `rel(${xRel}, ${yRel})`;
    this.anim.text(x, y, `FPS: ${fps}`, opts);
    this.anim.text(x, y + 10, abs_coords, opts);
    this.anim.text(x, y + 20, rel_coords, opts);
    this.anim.text(x, y + 30, displayState(this._state), opts);
  }
}

function displayState(state: GestureState): string {
  switch (state) {
    case GestureDrawer.NONE:
      return 'none';
    case GestureDrawer.HOVERING:
      return 'hovering';
    case GestureDrawer.SELECTING:
      return 'selecting';
    case GestureDrawer.DRAGGING:
      return 'dragging';
  }
}
