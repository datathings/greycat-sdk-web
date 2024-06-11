import type { SlBreadcrumbItem } from '@shoelace-style/shoelace';
import { registerCustomElement } from '@greycat/web';
import './main.css';

import style from './app-layout.css?inline';

export class AppLayout extends HTMLElement {
  // prettier-ignore
  private static readonly PAGES: Array<{ href: string; title: string }> = [
    { title: 'Index',                   href: 'index/' },
    { title: 'Chart',                   href: 'chart/' },
    { title: 'Chart 2',                 href: 'chart-2/' },
    { title: 'Chart (bar-histogram)',   href: 'chart-bar-histogram/' },
    { title: 'Chart (bar)',             href: 'chart-bar/' },
    { title: 'Chart (colored-area)',    href: 'chart-colored-area/' },
    { title: 'Chart (custom-boxplot)',  href: 'chart-custom-boxplot/' },
    { title: 'Chart (custom)',          href: 'chart-custom/' },
    { title: 'Chart (in-mem)',          href: 'chart-in-mem/' },
    { title: 'Chart (scatter)',         href: 'chart-scatter/' },
    { title: 'Chart (line+scatter)',    href: 'chart-line-scatter/' },
    { title: 'Chart (step)',            href: 'chart-step/' },
    { title: 'Chart (time)',            href: 'chart-time/' },
    { title: 'Csv (analysis)',          href: 'csv-analysis/' },
    { title: 'Csv (column-input)',      href: 'csv-column-input/' },
    { title: 'Dashboard',               href: 'dashboard/' },
    { title: 'Donut',                   href: 'donut/' },
    { title: 'Fieldset Group',          href: 'fieldset-group/' },
    { title: 'Fn Call',                 href: 'fn-call/' },
    { title: 'Heatmap',                 href: 'heatmap/' },
    { title: 'Hello',                   href: 'hello/' },
    { title: 'Inputs',                  href: 'inputs/' },
    { title: 'Object',                  href: 'object/' },
    { title: 'Periodic Tasks',          href: 'periodic-tasks/' },
    { title: 'Searchable Select',       href: 'searchable-select/' },
    { title: 'Table',                   href: 'table/' },
    { title: 'Table (custom)',          href: 'table-custom/' },
    { title: 'Tabs',                    href: 'tabs/' },
    { title: 'Tasks',                   href: 'tasks/' },
    { title: 'Users',                   href: 'users/' },
  ];

  private _title: SlBreadcrumbItem;
  private _main: HTMLElement;

  constructor() {
    super();

    this._title = document.createElement('sl-breadcrumb-item');
    this._title.textContent = 'Index';

    this._main = (
      <main>
        <slot />
      </main>
    ) as HTMLElement;

    const nb_pathname_parts = window.location.pathname
      .split('/')
      .filter((s) => s.length != 0).length;

    const buttons: HTMLElement[] = [];

    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(<style>{style}</style>);
    root.appendChild(
      <>
        <header className="layout-header">
          <sl-breadcrumb>
            <sl-breadcrumb-item href={nb_pathname_parts < 2 ? `.` : `../../`}>
              @greycat/web
            </sl-breadcrumb-item>
            {this._title}
          </sl-breadcrumb>
          <div className="actions">
            <slot name="action" />
            <a
              href=""
              onclick={(ev) => {
                ev.preventDefault();
                this._toggleTheme();
              }}
            >
              Light / Dark
            </a>
          </div>
        </header>
        <div className="layout-main">
          <sl-drawer contained open placement="start" noHeader>
            {AppLayout.PAGES.map((page) => {
              const button = (
                <sl-button
                  variant="text"
                  href={nb_pathname_parts < 2 ? `./pages/${page.href}` : `../${page.href}`}
                  className={page.title === this._title.textContent ? 'active' : undefined}
                  onclick={() => {
                    buttons.forEach((b) => b.classList.remove('active'));
                    button.classList.add('active');
                    this.title = page.title;
                  }}
                >
                  {page.title}
                </sl-button>
              ) as HTMLElement;
              buttons.push(button);
              return button;
            })}
          </sl-drawer>
          {this._main}
        </div>
      </>,
    );
  }

  override set title(title: string) {
    this._title.textContent = title;
  }

  set mainStyle(style: Partial<CSSStyleDeclaration>) {
    Object.assign(this._main.style, style);
  }

  private _toggleTheme(): void {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    document.body.classList.toggle(`sl-theme-${theme}`);
    document.body.classList.toggle(`sl-theme-${theme === 'dark' ? 'light' : 'dark'}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': AppLayout;
  }

  namespace JSX {
    interface IntrinsicElements {
      'app-layout': GreyCat.Element<AppLayout>;
    }
  }
}

registerCustomElement('app-layout', AppLayout);
