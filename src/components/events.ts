/**
 * Bound to the underlying 'update' events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiUpdateEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-update';

  constructor(value: T) {
    super(GuiUpdateEvent.NAME, { detail: value, bubbles: true });
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
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }
}