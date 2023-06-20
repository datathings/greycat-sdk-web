export class GuiRenderEvent extends CustomEvent<number> {
  constructor(startTimeInMs: number) {
    super('render', { detail: Date.now() - startTimeInMs });
  }
}

declare global {
  interface HTMLElementEventMap {
    render: GuiRenderEvent;
  }
}
