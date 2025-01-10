import { css, GuiElement, registerCustomElement, sl } from '../../exports.js';
import style from './layout.css?inline';

export class GuiLayout extends GuiElement {
  static override styles = [css(style)];

  readonly splitPanel: sl.SlSplitPanel;
  private _resizeObs = new ResizeObserver(() => {
    const { width } = this.getBoundingClientRect();
    if (width <= 768) {
      if (!this.splitPanel.vertical) {
        this.splitPanel.vertical = true;
        this.splitPanel.positionInPixels = 100;
      }
    } else {
      if (this.splitPanel.vertical) {
        this.splitPanel.vertical = false;
        this.splitPanel.positionInPixels = 200;
      }
    }
  });

  constructor() {
    super();

    this.splitPanel = (
      <sl-split-panel positionInPixels={200} className="splitPanel">
        <slot slot="start" name="menu" />
        <div slot="end" className="content">
          <slot />
        </div>
      </sl-split-panel>
    ) as sl.SlSplitPanel;

    this.shadowRoot.appendChild(
      <>
        <slot name="header">
          <div className="default-header" />
        </slot>
        {this.splitPanel}
      </>,
    );
  }

  set menuWidth(width: number) {
    this.splitPanel.positionInPixels = width;
  }

  connectedCallback() {
    this._resizeObs.observe(this);
  }

  disconnectedCallback() {
    this._resizeObs.disconnect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-layout': GuiLayout;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-layout': GreyCat.Element<GuiLayout>;
      }
    }
  }
}

registerCustomElement('gui-layout', GuiLayout);
