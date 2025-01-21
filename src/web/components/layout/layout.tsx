import { css, GuiElement, sl } from '../../exports.js';
import style from './layout.css?inline';

export class GuiLayout extends GuiElement {
  static override styles = [css(style)];

  private _resizeObs: ResizeObserver;
  private _breakpoint: number;
  private _responsiveSheet: CSSStyleSheet;
  private _menu: HTMLElement;
  private _nav: HTMLElement;
  private _navDrawer: sl.SlDrawer;
  private _aside: HTMLElement;
  private _asideDrawer: sl.SlDrawer;

  constructor() {
    super();

    this._breakpoint = 920;
    this._resizeObs = new ResizeObserver(this._resizeHandler);
    this._responsiveSheet = new CSSStyleSheet();
    this.shadowRoot.adoptedStyleSheets.push(this._responsiveSheet);

    this._menu = (
      <div className={['menu', 'hide']} part="menu">
        <slot name="menu">
          <sl-button variant="text" onclick={this._toggleMenu}>
            Menu
          </sl-button>
        </slot>
      </div>
    ) as HTMLElement;

    this._navDrawer = (
      <sl-drawer contained placement="start" noHeader part="navigation-drawer">
        <div className="navigation-drawer-body" part="navigation-body">
          <div className="navigation-header" part="navigation-header">
            <slot name="navigation-header" />
          </div>
          <div className="navigation" part="navigation">
            <slot name="navigation" />
          </div>
          <div className="navigation-footer" part="navigation-footer">
            <slot name="navigation-footer" />
          </div>
        </div>
      </sl-drawer>
    ) as sl.SlDrawer;

    this._nav = (
      <div className="navigation-drawer" part="navigation-base">
        {this._navDrawer}
      </div>
    ) as HTMLElement;

    this._asideDrawer = (
      <sl-drawer contained placement="end" noHeader>
        <slot name="aside" />
      </sl-drawer>
    ) as sl.SlDrawer;

    this._aside = (
      <div className="aside-drawer" part="aside-drawer">
        {this._asideDrawer}
      </div>
    ) as HTMLElement;

    this.shadowRoot.appendChild(
      <>
        <div className="header" part="header">
          {this._menu}
          <slot name="header" />
        </div>
        {this._nav}
        <slot name="main-header" />
        <slot name="main" />
        <slot name="main-footer" />
        {this._aside}
        <slot name="footer" />
      </>,
    );
  }

  get breakpoint() {
    return this._breakpoint;
  }

  set breakpoint(bp: number) {
    this._breakpoint = bp;
    this._resizeHandler();
  }

  showNavigation(): void {
    this._navDrawer.show();
  }

  showAside(): void {
    this._asideDrawer.show();
  }

  connectedCallback() {
    const nav = this.querySelectorAll('[slot*="navigation"]');
    if (nav.length === 0) {
      this._nav.remove();
    }
    const aside = this.querySelector('[slot="aside"]');
    if (!aside) {
      this._aside.remove();
    }
    this._resizeObs.observe(this);
  }

  disconnectedCallback() {
    this._resizeObs.disconnect();
  }

  private _toggleMenu = () => {
    if (this._navDrawer.open) {
      this._navDrawer.hide();
      console.log('hide navigation');
    } else {
      this._navDrawer.show();
      console.log('show navigation');
    }
  };

  private _resizeHandler = () => {
    if (!this.isConnected) {
      return;
    }

    const { width } = this.getBoundingClientRect();
    const mainHeader = this.querySelector('[slot="main-header"]');
    const mainFooter = this.querySelector('[slot="main-footer"]');

    if (width <= this._breakpoint) {
      const gridTemplateAreas = [
        `'header      header'`,
        `'main-header main-header'`,
        `'main        main'`,
        `'main-footer main-footer'`,
        `'footer      footer'`,
      ];
      if (!mainHeader) {
        gridTemplateAreas[1] = `'main main'`;
      }
      if (!mainFooter) {
        gridTemplateAreas[3] = `'main main'`;
      }
      this._responsiveSheet.replaceSync(`
        :host {
          grid-template-areas: ${gridTemplateAreas.join('\n')};
          grid-template-columns: auto 1fr;
        }
        .navigation-drawer,
        .aside-drawer {
          grid-area: unset;
        }
      `);
      this._navDrawer.hide();
      this._navDrawer.contained = false;
      this._asideDrawer.hide();
      this._asideDrawer.contained = false;
      this._menu.classList.remove('hide');
    } else {
      const gridTemplateAreas = [
        `'header     header      header'`,
        `'navigation main-header aside'`,
        `'navigation main        aside'`,
        `'navigation main-footer aside'`,
        `'footer     footer      footer'`,
      ];
      if (!mainHeader) {
        gridTemplateAreas[1] = `'navigation main aside'`;
      }
      if (!mainFooter) {
        gridTemplateAreas[3] = `'navigation main aside'`;
      }
      this._responsiveSheet.replaceSync(`
        :host {
          grid-template-areas: ${gridTemplateAreas.join('\n')};
        }
      `);
      this._navDrawer.show();
      this._navDrawer.contained = true;
      this._asideDrawer.show();
      this._asideDrawer.contained = true;
      this._menu.classList.add('hide');
    }
  };
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
