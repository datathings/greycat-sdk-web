import { GreyCat, IndexedDbCache } from '../src';
import './layout.css';

export class AppLayout extends HTMLElement {
  readonly main = document.createElement('main');
  readonly actions = document.createElement('ul');
  readonly lastAction = document.createElement('li');

  constructor() {
    super();

    this.main.className = 'container-fluid';
    this.lastAction.appendChild(
      <a href="#" onclick={() => this._toggleTheme()}>
        Light / Dark
      </a>,
    );
    this.actions.appendChild(this.lastAction);
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    this.removeAttribute('title');

    this.appendChild(
      <>
        <header className="container-fluid">
          <nav>
            <nav aria-label="breadcrumb">
              <ul>
                <li>
                  <a href="..">
                    <strong>@greycat/web</strong>
                  </a>
                </li>
                <li>{title}</li>
              </ul>
            </nav>
            {this.actions}
          </nav>
        </header>
        {this.main}
      </>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  async init() {
    try {
      greycat.default = await GreyCat.init({
        cache: new IndexedDbCache('greycat.default'),
      });
    } catch (err) {
      this.setError(err);
    }
  }

  setError(err: unknown): void {
    console.error(err);
    this.main.style.color = 'red';

    const error = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = err instanceof Error ? err.stack ?? err.message : `${err}`;

    this.main.replaceChildren(document.createTextNode('Is GreyCat started?'), error);
  }

  addSimpleAction(text: string, onclick: (ev: MouseEvent) => void): this {
    this.lastAction.before(
      <li>
        <a href="#" onclick={onclick}>
          {text}
        </a>
      </li>,
    );

    return this;
  }

  private _toggleTheme(): void {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'dark';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
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

if (!customElements.get('app-layout')) {
  customElements.define('app-layout', AppLayout);
}
