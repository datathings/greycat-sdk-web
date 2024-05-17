// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-click';

  constructor(value: T) {
    super(GuiClickEvent.NAME, { detail: value, bubbles: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiUpdateEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-update';

  constructor(value: T) {
    super(GuiUpdateEvent.NAME, { detail: value, bubbles: true });
  }
}

declare global {
  interface HTMLElementEventMap {
    [GuiClickEvent.NAME]: GuiClickEvent;
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
  }
}
