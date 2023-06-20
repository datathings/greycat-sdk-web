import { Disposable } from '../internals';
import { Context } from './context';
import { SimpleTooltip } from './tooltip';

export interface CanvasHandlers {
  /** Called when a `mouseenter` event is triggered on the `<canvas />` element */
  enter: (e: MouseEvent) => void;
  /**
   * Called when a `mousemove` (or `touchmove`) event is triggered on the `<canvas />` element.
   *
   * The first argument is the sanitized cursor position relative to the canvas.
   *
   * The second argument is the source event.
   */
  move: (cursor: { x: number; y: number }, e: MouseEvent | TouchEvent) => void;
  /** Called when a `mouseleave` is triggered on the `<canvas />` element */
  leave: (e: MouseEvent) => void;
  /**
   * Called when a selection is being made
   */
  selectionmove: (selection: { start: number; end: number }, e: MouseEvent) => void;
  /**
   * Called when a selection is done
   */
  selection: (selection: { start: number; end: number }, e: MouseEvent) => void;
}

export class Canvas {
  root: HTMLElement;
  ctx: Context;
  dispose: Disposable;
  hoverCtx?: Context;
  hoverCanvas?: HTMLCanvasElement;
  private canvas: HTMLCanvasElement;

  constructor(
    public width: number,
    public height: number,
    readonly tooltip?: SimpleTooltip,
    handlers?: Partial<CanvasHandlers>,
  ) {
    this.root = document.createElement('div');
    this.root.style.width = `${width}px`;
    this.root.style.height = `${height}px`;

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('data-layer', 'draw');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.position = 'absolute';
    this.ctx = new Context(this.canvas, width, height);
    this.root.append(this.canvas);

    if (handlers) {
      const hoverCanvas = (this.hoverCanvas = document.createElement('canvas'));
      this.hoverCanvas.setAttribute('data-layer', 'hover');
      this.hoverCanvas.width = width;
      this.hoverCanvas.height = height;
      this.hoverCanvas.style.position = 'absolute';
      this.hoverCtx = new Context(this.hoverCanvas, width, height);

      if (tooltip) {
        tooltip.root.style.position = 'absolute';
        tooltip.root.style.minWidth = '165px';
        tooltip.root.style.visibility = 'hidden';
      }

      const onmouseenter = (e: MouseEvent) => {
        if (tooltip) {
          tooltip.root.style.visibility = 'visible';
        }
        handlers.enter?.(e);
      };

      const onmouseleave = (e: MouseEvent) => {
        if (tooltip) {
          tooltip.root.style.visibility = 'hidden';
        }
        handlers.leave?.(e);
      };

      let start = -1;
      const onmousedown = (e: MouseEvent) => {
        start = Math.min(this.width, Math.max(0, e.offsetX));
      };

      const onmouseup = (e: MouseEvent) => {
        const end = Math.min(this.width, Math.max(0, e.offsetX));
        handlers.selection?.({ start, end }, e);
        start = -1;
      };

      const onmousemove = (e: MouseEvent) => {
        e.preventDefault();
        const x = Math.min(this.width, Math.max(0, e.offsetX));
        const y = Math.min(this.height, Math.max(0, e.offsetY));
        handlers.move?.({ x, y }, e);

        if (start !== -1) {
          handlers.selectionmove?.({ start, end: x }, e);
        }
      };

      const ontouchmove = (e: TouchEvent) => {
        e.preventDefault();
        const x = Math.min(this.width, Math.max(0, e.touches[0].clientX));
        const y = Math.min(this.height, Math.max(0, e.touches[0].clientY));
        handlers.move?.({ x, y }, e);
      };

      this.hoverCanvas.addEventListener('mouseenter', onmouseenter);
      this.hoverCanvas.addEventListener('mouseleave', onmouseleave);
      this.hoverCanvas.addEventListener('mousedown', onmousedown);
      this.hoverCanvas.addEventListener('mouseup', onmouseup);
      this.hoverCanvas.addEventListener('mousemove', onmousemove);
      this.hoverCanvas.addEventListener('touchmove', ontouchmove, { passive: false });

      this.dispose = () => {
        hoverCanvas.removeEventListener('mouseenter', onmouseenter);
        hoverCanvas.removeEventListener('mouseleave', onmouseleave);
        hoverCanvas.removeEventListener('mousedown', onmousedown);
        hoverCanvas.removeEventListener('mouseup', onmouseup);
        hoverCanvas.removeEventListener('mousemove', onmousemove);
        hoverCanvas.removeEventListener('touchmove', ontouchmove);
      };

      this.root.append(this.canvas, this.hoverCanvas);
      if (this.tooltip) {
        this.root.appendChild(this.tooltip.root);
      }
    } else {
      // noop dispose
      this.dispose = () => void 0;
    }
  }

  resize(width: number, height: number): void {
    this.root.style.width = `${width}px`;
    this.root.style.height = `${height}px`;
    this.canvas.width = width;
    this.canvas.height = height;
    if (this.hoverCanvas) {
      this.hoverCanvas.width = width;
      this.hoverCanvas.height = height;
    }
    this.ctx.resize(width, height);
    if (this.hoverCtx) {
      this.hoverCtx.resize(width, height);
    }
  }

  moveTooltip(x: number, y: number): void {
    if (!this.tooltip) {
      return;
    }

    const { width, height } = this.tooltip.root.getBoundingClientRect();

    if (x > this.ctx.width / 2) {
      this.tooltip.root.style.left = `${x - width - 20}px`;
    } else {
      this.tooltip.root.style.left = `${x + 20}px`;
    }

    if (y > this.ctx.height / 2) {
      this.tooltip.root.style.top = `${y - height - 20}px`;
    } else {
      this.tooltip.root.style.top = `${y + 20}px`;
    }
  }

  showTooltip(visible: boolean) {
    if (!this.tooltip) {
      return;
    }

    this.tooltip.root.style.visibility = visible ? 'visible' : 'hidden';
  }

  /**
   * Clears the hover canvas and hides the tooltip.
   */
  clearHoverAndHideTooltip() {
    this.hoverCtx?.clear();
    this.tooltip?.hide();
  }
}
