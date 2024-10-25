// export class GuiConnectedEvent extends CustomEvent<void> {
//   static readonly NAME = 'gui-connected';

//   constructor() {
//     super(GuiConnectedEvent.NAME, { bubbles: true, composed: true });
//   }
// }

/**
 * Bound to the underlying 'input' events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiInputEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-input';

  constructor(value: T) {
    super(GuiInputEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

/**
 * Bound to the underlying 'change' events
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiChangeEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-change';

  constructor(value: T) {
    super(GuiChangeEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-click';

  constructor(value: T) {
    super(GuiClickEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiDblClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-dblclick';

  constructor(value: T) {
    super(GuiDblClickEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiUpdateEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-update';

  constructor(value: T) {
    super(GuiUpdateEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

declare global {
  interface HTMLElementEventMap {
    // [GuiConnectedEvent.NAME]: GuiConnectedEvent;
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
    [GuiClickEvent.NAME]: GuiClickEvent;
    [GuiDblClickEvent.NAME]: GuiClickEvent;
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
  }
}
