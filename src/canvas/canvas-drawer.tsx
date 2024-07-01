import { CanvasContext } from '../exports.js';

/**
 * Creates two canvas named `main` and `anim`:
 *  - `main` (below) is supposed to be used to draw "static" state
 *  - `anim` (above) is supposed to be used to draw "animations" or "user-interactions"
 *
 * The abstract method `draw()` will be called on the `requestAnimationFrame` handler
 *
 * When this component is connected to the DOM it starts the raf handler drawing loop.
 *
 * It automatically unregisters the raf handler on disconnect.
 */
export abstract class CanvasDrawer extends HTMLElement {
  protected root: ShadowRoot;
  /** this context should be used for the state drawing that changes less often */
  protected main: CanvasContext;
  /** this context should be used for the top-level animations/user-interactions */
  protected anim: CanvasContext;
  /** a handle to the requestAnimationFrame loop */
  private _handle = -1;

  constructor() {
    super();

    this.draw = this.draw.bind(this);

    this.root = this.attachShadow({ mode: 'open' });
    // "display: none" by default to prevent default style drawing
    const mainCanvas = (
      <canvas style={{ display: 'none', position: 'absolute' }} />
    ) as HTMLCanvasElement;
    const animCanvas = (
      <canvas style={{ display: 'none', position: 'absolute' }} />
    ) as HTMLCanvasElement;
    this.main = new CanvasContext(mainCanvas.getContext('2d')!);
    this.anim = new CanvasContext(animCanvas.getContext('2d')!);
    this.root.appendChild(mainCanvas);
    this.root.appendChild(animCanvas);
  }

  resize(width: number, height: number): void {
    this.main.ctx.canvas.width = this.anim.ctx.canvas.width = width;
    this.main.ctx.canvas.height = this.anim.ctx.canvas.height = height;
    // on first resize, display
    this.main.ctx.canvas.style.display = '';
    this.anim.ctx.canvas.style.display = '';
  }

  /**
   * Called for every frame (matching screen refresh rate)
   */
  abstract draw(fps: number): void;

  /**
   * Registers a raf handler to call `draw()`
   */
  connectedCallback() {
    let lastFrameTime = 0;

    const callback = (now: number) => {
      const delta = now - lastFrameTime;
      const fps = Math.round(1000 / delta);

      this.draw(fps);

      lastFrameTime = now;
      // next frame
      requestAnimationFrame(callback);
    };

    this._handle = requestAnimationFrame(callback);
  }

  /**
   * Unregisters the raf handler
   */
  disconnectedCallback() {
    cancelAnimationFrame(this._handle);
  }

  /**
   * Returns a Data URL png of the main canvas.
   */
  toDataURL(): string {
    return this.main.ctx.canvas.toDataURL('image/png');
  }

  /**
   * Triggers the download of a snapshot of the main canvas in png.
   *
   * @param filename defaults to `snapshot-${Date.now()}`
   */
  downloadAsImage(filename = `snapshot-${Date.now()}`): void {
    const link = document.createElement('a');
    link.href = this.toDataURL();
    link.download = `${filename}.png`;
    link.click();
    link.remove();
  }
}
