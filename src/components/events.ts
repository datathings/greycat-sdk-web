/**
 * Bound to the underlying 'input' events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiInputEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-input';

  constructor(value: T) {
    super(GuiInputEvent.NAME, { detail: value, bubbles: true });
  }
}

/**
 * Bound to the underlying 'change' events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiChangeEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-change';

  constructor(value: T) {
    super(GuiChangeEvent.NAME, { detail: value, bubbles: true });
  }
}

declare global {
  interface HTMLElementEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }
}