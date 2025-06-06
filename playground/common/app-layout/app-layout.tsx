import { css, GuiElement, registerCustomElement } from '@greycat/web';
import type { sl } from '@greycat/web';
import { cx } from '@greycat/web/jsx-runtime';
import './main.css';

import style from './app-layout.css?inline';

gc.sdk.registerDebugLogger();

export class AppLayout extends GuiElement {
  static override styles = [css(style)];

  private _title: sl.SlBreadcrumbItem;
  private _main: HTMLElement;

  constructor() {
    super();

    this._title = document.createElement('sl-breadcrumb-item');
    this._title.textContent = 'Index';

    this._main = (
      <div slot="main">
        <slot />
      </div>
    ) as HTMLElement;

    this.shadowRoot.appendChild(
      <gui-layout>
        <sl-breadcrumb slot="header">
          <sl-breadcrumb-item href="/">@greycat/web</sl-breadcrumb-item>
          {this._title}
        </sl-breadcrumb>
        <div className="actions" slot="header">
          <div className="actions-left">
            <slot name="action-left" />
          </div>
          <div className="actions-right">
            <slot name="action" />
            <sl-button
              variant="text"
              onclick={(ev) => {
                ev.preventDefault();
                this._toggleTheme();
              }}
            >
              Light / Dark
            </sl-button>
          </div>
        </div>
        <gui-nav slot="navigation" />
        {this._main}
      </gui-layout>,
    );
  }

  override set title(title: string) {
    this._title.textContent = title;
  }

  set mainStyle(style: Partial<CSSStyleDeclaration>) {
    Object.assign(this._main.style, style);
  }

  set mainClassName(className: GreyCat.ExtendedHTMLProperties['className']) {
    cx(this._main, className);
  }

  private _toggleTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    const theme = document.documentElement.getAttribute('data-theme') ?? defaultTheme;
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    document.body.classList.toggle(`sl-theme-${theme}`);
    document.body.classList.toggle(`sl-theme-${theme === 'dark' ? 'light' : 'dark'}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': AppLayout;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'app-layout': GreyCat.Element<AppLayout>;
      }
    }
  }
}

registerCustomElement('app-layout', AppLayout);
