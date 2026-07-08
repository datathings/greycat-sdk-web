import { css } from './common.js';

import componentStyle from './component.styles.css?inline';

// oxlint-disable-next-line typescript/no-explicit-any
export type AnyValueElement = HTMLElement & { value: any };
export interface Disposable {
  (): void;
}

export abstract class GuiElement extends HTMLElement {
  static readonly BASE_STYLE = css(componentStyle);
  static readonly styles = [GuiElement.BASE_STYLE];
  static readonly ABORT_REASON = 'GuiElement dispose';

  /** Returns this element's shadow root */
  override shadowRoot!: ShadowRoot;

  private _disposables: Disposable[] | undefined;
  private _abortController: AbortController | undefined;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [GuiElement.BASE_STYLE, ...(this.constructor as typeof GuiElement).styles];
  }

  disconnectedCallback(): void {
    this.dispose();
  }

  /**
   * Adds a disposable function to be called when this component will disconnect
   * @param disposable
   */
  protected addDisposable(disposable: Disposable): void {
    if (this._disposables === undefined) {
      this._disposables = [disposable];
    } else {
      this._disposables.push(disposable);
    }
  }

  /**
   * Disposes of all registered disposables and abort signals.
   */
  protected dispose(): void {
    if (this._abortController !== undefined) {
      this._abortController.abort(GuiElement.ABORT_REASON);
      this._abortController = undefined;
    }

    if (this._disposables !== undefined) {
      for (const disposable of this._disposables) {
        disposable();
      }
      this._disposables.length = 0;
    }
  }

  /**
   * Returns an `AbortSignal` that is tied to this element lifecycle.
   *
   * When this element disconnects from the DOM the `AbortController` will be
   * aborted with the reason: `GuiElement.ABORT_REASON`
   */
  protected abortSignal(): AbortSignal {
    if (this._abortController === undefined) {
      this._abortController = new AbortController();
    }
    return this._abortController.signal;
  }
}

export abstract class GuiValueElement<T = unknown> extends GuiElement {
  abstract value: T;
  protected _updatePending: boolean;
  updateComplete: Promise<void>;

  constructor() {
    super();
    this._updatePending = false;
    this.updateComplete = Promise.resolve();
  }

  connectedCallback(): void {
    this._internalUpdate();
  }

  protected _internalUpdate(): void {
    if (this._updatePending || !this.isConnected) {
      return;
    }
    this._updatePending = true;
    const { promise, resolve } = Promise.withResolvers<void>();
    this.updateComplete = promise;
    queueMicrotask(() => {
      this.update();
      this._updatePending = false;
      resolve();
    });
  }

  update(): void {}
}
