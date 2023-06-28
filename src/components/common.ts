declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
}

export class GuiRenderEvent extends CustomEvent<number> {
  constructor(startTimeInMs: number) {
    super('render', { detail: Date.now() - startTimeInMs });
  }
}

export interface BaseGuiElementProps {}

export abstract class GuiElement<
  P extends BaseGuiElementProps
> extends HTMLElement {
  protected _props!: P;

  // @ts-ignore
  private connectedCallback() {
    if (this.style.display === '') {
      this.style.display = 'block';
    }

    if (this.isConnected) {
      this._props = this.onConnect();
    }
  }

  // @ts-ignore
  private disconnectedCallback() {
    this.onDisconnect();
  }

  setProps(props: Partial<P>): void {
    for (const key in props) {
      const value = props[key];
      if (value !== undefined) {
        this._props[key] = value as any;
      }
    }
    this.update();
  }

  /**
   * Default empty implementation that can be override
   */
  protected onDisconnect(): void {}

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   *
   * *It is ensured that the element is actually connected to a Document with `Node.isConnected` when this is invoked*
   */
  abstract onConnect(): P;

  /**
   * Properties have been updated.
   */
  abstract update(): void;
}
