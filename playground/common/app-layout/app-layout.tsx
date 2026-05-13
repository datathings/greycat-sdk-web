import type { sl } from '@greycat/web';
import { cx } from '@greycat/web/jsx-runtime';
import './main.css';
import './app-layout.css';

export interface AppLayoutOptions {
  title?: string;
  mainStyle?: Partial<CSSStyleDeclaration>;
  mainClassName?: GreyCat.ExtendedHTMLProperties['className'];
}

export function appLayout(titleOrOpts: string | AppLayoutOptions, ...children: Node[]): HTMLElement {
  const opts = typeof titleOrOpts === 'string' ? { title: titleOrOpts } : titleOrOpts;

  const titleEl: sl.SlBreadcrumbItem = document.createElement('sl-breadcrumb-item');
  titleEl.textContent = opts.title ?? 'Index';

  const actionsLeft = (<div className="app-actions-left" />) as HTMLElement;

  const themeBtn = (
    <sl-button
      variant="text"
      onclick={(ev: Event) => {
        ev.preventDefault();
        toggleTheme();
      }}
    >
      Light / Dark
    </sl-button>
  ) as HTMLElement;

  const actions = (
    <div className="app-actions-right">
      {themeBtn}
      <gui-sign-in-button ongui-signed-out={() => location.reload()} />
    </div>
  ) as HTMLElement;

  const main = (<div slot="main" />) as HTMLElement;

  if (opts.mainStyle) {
    Object.assign(main.style, opts.mainStyle);
  }
  if (opts.mainClassName) {
    cx(main, opts.mainClassName);
  }

  const root = (
    <gui-layout>
      <sl-breadcrumb slot="header">
        <sl-breadcrumb-item href="/">@greycat/web</sl-breadcrumb-item>
        {titleEl}
      </sl-breadcrumb>
      <div className="app-actions" slot="header">
        {actionsLeft}
        {actions}
      </div>
      <gui-nav slot="navigation" />
      {main}
    </gui-layout>
  ) as HTMLElement;

  for (const child of children) {
    distributeChild(child, main, actions, actionsLeft, themeBtn);
  }

  return root;
}

function distributeChild(
  node: Node,
  main: HTMLElement,
  actions: HTMLElement,
  actionsLeft: HTMLElement,
  themeBtn: HTMLElement,
): void {
  if (node instanceof DocumentFragment) {
    for (const child of Array.from(node.childNodes)) {
      distributeChild(child, main, actions, actionsLeft, themeBtn);
    }
    return;
  }
  if (node instanceof HTMLElement) {
    const slot = node.getAttribute('slot');
    if (slot === 'action') {
      node.removeAttribute('slot');
      actions.insertBefore(node, themeBtn);
      return;
    }
    if (slot === 'action-left') {
      node.removeAttribute('slot');
      actionsLeft.appendChild(node);
      return;
    }
  }
  main.appendChild(node);
}

function toggleTheme(): void {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = prefersDark ? 'dark' : 'light';
  const theme = document.documentElement.getAttribute('data-theme') ?? defaultTheme;
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  document.body.classList.toggle(`sl-theme-${theme}`);
  document.body.classList.toggle(`sl-theme-${theme === 'dark' ? 'light' : 'dark'}`);
}
