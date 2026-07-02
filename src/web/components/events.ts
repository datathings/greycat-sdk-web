/**
 * Bound to the underlying 'input' events
 */
// oxlint-disable-next-line typescript/no-explicit-any
export class GuiInputEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-input';

  constructor(value: T) {
    super(GuiInputEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

/**
 * Bound to the underlying 'change' events
 */
// oxlint-disable-next-line typescript/no-explicit-any
export class GuiChangeEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-change';

  constructor(value: T) {
    super(GuiChangeEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

/**
 * Bound to the underlying 'change' events
 */
// oxlint-disable-next-line typescript/no-explicit-any
export class GuiSubmitEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-submit';

  constructor(value: T) {
    super(GuiSubmitEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// oxlint-disable-next-line typescript/no-explicit-any
export class GuiClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-click';

  constructor(value: T) {
    super(GuiClickEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// oxlint-disable-next-line typescript/no-explicit-any
export class GuiDblClickEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-dblclick';

  constructor(value: T) {
    super(GuiDblClickEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

// oxlint-disable-next-line typescript/no-explicit-any
export class GuiUpdateEvent<T = any> extends CustomEvent<T> {
  static readonly NAME = 'gui-update';

  constructor(value: T) {
    super(GuiUpdateEvent.NAME, { detail: value, bubbles: true, composed: true });
  }
}

export class GuiAuthSuccessEvent extends CustomEvent<gc.runtime.Identity | null> {
  static readonly NAME = 'gui-auth-success';
  constructor(detail: gc.runtime.Identity | null) {
    super(GuiAuthSuccessEvent.NAME, { detail, bubbles: true, composed: true });
  }
}

export class GuiSignedOutEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-signed-out';
  constructor() {
    super(GuiSignedOutEvent.NAME, { detail: void 0, bubbles: true, composed: true });
  }
}

declare global {
  interface HTMLElementEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
    [GuiClickEvent.NAME]: GuiClickEvent;
    [GuiDblClickEvent.NAME]: GuiClickEvent;
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
    [GuiSubmitEvent.NAME]: GuiSubmitEvent;
  }
}
