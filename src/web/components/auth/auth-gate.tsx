// Direct imports to avoid the circular `../../exports.js` cycle. See the
// note in `sign-in.tsx` for context.
import { GuiElement } from '../element.js';
import { css } from '../common.js';
import { GuiAuthSuccessEvent } from '../events.js';
import { type GuiSignIn } from './sign-in.js';
import style from './auth-gate.css?inline';

/**
 * Drop-in homepage replacement that handles the three states a GreyCat
 * landing page needs to cover:
 *
 *   1. **OAuth callback** — when arriving with `?code&state` (or `?error`),
 *      finalises the sign-in via `openid::Openid::callback` and navigates on.
 *   2. **Authenticated** — shows a greeting plus links to `/explorer/` and
 *      `/files/` when those endpoints respond, plus a Sign out button.
 *   3. **Anonymous** — renders a `<gui-sign-in>` and redirects to `returnTo`
 *      on success.
 *
 * **All calls are raw JSON HTTP via `gc.sdk.callJson`**, no ABI involved —
 * safe to mount on a page where `gc.sdk.init()` has not (and may never)
 * succeed.
 *
 * Configure via attributes/properties: `brand`, `returnTo`, `url`.
 */
export class GuiAuthGate extends GuiElement {
  static override styles = [css(style)];

  /** Greeting heading. Default: `"GreyCat"`. */
  brand = 'GreyCat';

  /** Where to send the user after sign-in. Default: `?return_to` then `location.pathname`. */
  returnTo: string;

  /** Base URL of the GreyCat server. Default: relative paths (same-origin). */
  url?: string;

  private _root: HTMLElement;

  constructor() {
    super();
    const params = new URLSearchParams(location.search);
    this.returnTo = params.get('return_to') || location.pathname || '/';

    this._root = (<div className="auth-card" />) as HTMLElement;
    this.shadowRoot.appendChild(this._root);
  }

  connectedCallback() {
    const params = new URLSearchParams(location.search);
    if (params.has('code') || params.has('state') || params.has('error')) {
      this._runCallback(params);
    } else {
      this._probeUser();
    }
  }

  private async _probeUser(): Promise<void> {
    let user: gc.runtime.Identity | null = null;
    try {
      // we use raw JSON calls on purpose, this component can be used without the SDK initialized
      user = await gc.sdk.callJson<gc.runtime.Identity>('runtime::Identity::current', [], {
        url: this.url,
      });
    } catch {
      // not signed in
    }
    if (user) {
      this._renderNav(user);
    } else {
      this._renderLogin();
    }
  }

  private async _runCallback(params: URLSearchParams): Promise<void> {
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    // scrub provider params so the code doesn't sit in browser history
    history.replaceState({}, '', location.pathname);

    this._render(
      <>
        <sl-spinner style="font-size: 2rem" />
        <p className="auth-status">Completing sign-in…</p>
      </>,
    );

    if (error) {
      this._renderCallbackError(`Provider returned error: ${error}`);
      return;
    }
    if (!code || !state) {
      this._renderCallbackError('Missing code or state in callback URL.');
      return;
    }
    try {
      // we use raw JSON calls on purpose, this component can be used without the SDK initialized
      const redirectTo = await gc.sdk.callJson<string | null>('openid::Openid::callback', [code, state], {
        url: this.url,
      });
      location.replace(redirectTo || '/');
    } catch (err) {
      this._renderCallbackError(err instanceof Error ? err.message : `${err}`);
    }
  }

  private _renderCallbackError(msg: string): void {
    this._render(
      <>
        <small className="auth-err">{msg}</small>
        <sl-button href="?" variant="default">
          Try again
        </sl-button>
      </>,
    );
  }

  private _renderNav(user: gc.runtime.Identity): void {
    const links = (<div className="auth-stack" />) as HTMLElement;
    this._render(
      <>
        <h1>Hi, {user.name}</h1>
        {links}
      </>,
    );
    Promise.all([this._probe('/explorer/'), this._probe('/files/')]).then(([hasExplorer, hasFiles]) => {
      const ls: Node[] = [];
      if (hasExplorer) {
        ls.push(
          <sl-button href="/explorer/" variant="primary">
            Explorer
          </sl-button>,
        );
      }
      if (hasFiles) {
        ls.push(<sl-button href="/files/">Files</sl-button>);
      }
      ls.push(
        <sl-button variant="text" onclick={() => this._signout()}>
          Sign out
        </sl-button>,
      );
      links.replaceChildren(...ls);
    });
  }

  private _renderLogin(): void {
    const signIn = (<gui-sign-in url={this.url} returnTo={this.returnTo} />) as GuiSignIn;
    signIn.addEventListener(GuiAuthSuccessEvent.NAME, () => {
      location.replace(this.returnTo);
    });
    this._render(
      <>
        <h1>{this.brand}</h1>
        <h2>Sign in</h2>
        {signIn}
      </>,
    );
  }

  private async _signout(): Promise<void> {
    try {
      // we use raw JSON calls on purpose, this component can be used without the SDK initialized
      await gc.sdk.callJson('runtime::Identity::logout', [], { url: this.url });
    } catch {
      // ignore — reload either way
    }
    location.reload();
  }

  private async _probe(path: string): Promise<boolean> {
    try {
      const res = await fetch(path, { method: 'GET', credentials: 'include' });
      return res.status !== 404 && res.status !== 400;
    } catch {
      return false;
    }
  }

  private _render(content: Node): void {
    this._root.replaceChildren(content);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiAuthGate} */
    'gui-auth-gate': GuiAuthGate;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiAuthGate} */
        'gui-auth-gate': GreyCat.Element<GuiAuthGate>;
      }
    }
  }
}
