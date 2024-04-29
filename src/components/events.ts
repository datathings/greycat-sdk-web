// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-click';

  constructor(value: T) {
    super(GuiClickEvent.NAME, { detail: value, bubbles: true });
  }
}

declare global {
  interface HTMLElementEventMap {
    [GuiClickEvent.NAME]: GuiClickEvent;
  }
}
