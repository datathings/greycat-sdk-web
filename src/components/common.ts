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

// duck-type core.Table
export type TableLike = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cols: any[][];
};