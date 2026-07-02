// Direct imports — the auth components are loaded before `gc.sdk.init()`
// runs, so we must avoid the circular `../../exports.js` cycle that goes
// through `./init.js` and would leave `GuiElement` / `css` in the TDZ.
import { GuiElement } from '../element.js';
import { css } from '../common.js';
import { GuiAuthSuccessEvent } from '../events.js';
import type * as sl from '@shoelace-style/shoelace';
import style from './sign-in.css?inline';

/**
 * Sign-in form component. Username/password against `runtime::Identity::login`,
 * plus auto-detected OpenID providers (silently skipped if the `openid`
 * library is not installed on the server).
 *
 * **All calls are raw JSON HTTP**, no ABI involved — this component is safe
 * to use before (or instead of) `gc.sdk.init()`. It only depends on the
 * server's HTTP endpoints, the same way GreyCat's default `webroot/index.html`
 * does.
 *
 * Emits `gui-auth-success` on a successful password login. The host decides
 * what happens next (redirect, swap UI, etc.). Provider sign-in navigates
 * to the provider URL via `location.replace`.
 */
export class GuiSignIn extends GuiElement {
  static override styles = [css(style)];

  /**
   * Base URL of the GreyCat server. Default: relative paths (same-origin).
   * Override when the server lives on another origin (e.g. vite dev server
   * at :5173 talking to GreyCat at :8080).
   */
  url?: string;

  /**
   * Where to send the user after a provider login completes (the OAuth flow
   * comes back to this URL with `?code&state`). Default: current pathname.
   */
  returnTo: string = location.pathname || '/';

  private _username: sl.SlInput;
  private _password: sl.SlInput;
  private _submit: sl.SlButton;
  private _err: HTMLElement;
  private _providersWrap: HTMLElement;
  private _providersList: HTMLElement;

  constructor() {
    super();

    this._username = (
      <sl-input type="text" placeholder="Username" autocomplete="username" required />
    ) as sl.SlInput;
    this._password = (
      <sl-input
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        passwordToggle
        required
      />
    ) as sl.SlInput;
    this._submit = (
      <sl-button variant="primary" type="submit">
        Sign in
      </sl-button>
    ) as sl.SlButton;
    this._err = (<small className="auth-err" hidden role="alert" />) as HTMLElement;
    this._providersList = (<div className="auth-providers-list" />) as HTMLElement;
    this._providersWrap = (
      <div className="auth-providers" hidden>
        <div className="auth-divider">
          <span>or</span>
        </div>
        {this._providersList}
      </div>
    ) as HTMLElement;

    const form = (
      <form
        className="auth-form"
        novalidate
        onsubmit={(ev) => {
          ev.preventDefault();
          this._login();
        }}
      >
        {this._username}
        {this._password}
        {this._submit}
      </form>
    );

    this.shadowRoot.appendChild(
      <>
        {form}
        {this._err}
        {this._providersWrap}
      </>,
    );
  }

  connectedCallback() {
    this._loadProviders();
  }

  private async _login(): Promise<void> {
    this._setError(null);
    const username = this._username.value.trim();
    const password = this._password.value;
    if (!username || !password) return;
    this._submit.loading = true;
    this._submit.disabled = true;
    try {
      await gc.sdk.callJson<string>('runtime::Identity::login', [username, password], { url: this.url });
      let me: gc.runtime.Identity | null = null;
      try {
        me = await gc.sdk.callJson<gc.runtime.Identity>('runtime::Identity::current', [], {
          url: this.url,
        });
      } catch {
        // server may not allow current() right after login from this origin
      }
      this.dispatchEvent(new GuiAuthSuccessEvent(me));
    } catch (err) {
      this._setError(err instanceof Error ? err.message : `${err}`);
    } finally {
      this._submit.loading = false;
      this._submit.disabled = false;
    }
  }

  private _setError(msg: string | null): void {
    if (msg) {
      this._err.textContent = msg;
      this._err.hidden = false;
    } else {
      this._err.textContent = '';
      this._err.hidden = true;
    }
  }

  private async _loadProviders(): Promise<void> {
    let ids: string[];
    try {
      ids = await gc.sdk.callJson<string[]>('openid::Openid::providers', [], { url: this.url });
    } catch {
      // openid library not installed — keep the section hidden
      return;
    }
    if (!ids?.length) return;

    const fragment = document.createDocumentFragment();
    for (const id of ids) {
      const btn = (
        <sl-button onclick={() => this._oidcLogin(id, btn)}>Continue with {id}</sl-button>
      ) as sl.SlButton;
      fragment.appendChild(btn);
    }
    this._providersList.replaceChildren(fragment);
    this._providersWrap.hidden = false;
  }

  private async _oidcLogin(provider: string, btn: sl.SlButton): Promise<void> {
    btn.loading = true;
    btn.disabled = true;
    this._setError(null);
    try {
      const url = await gc.sdk.callJson<string>('openid::Openid::login', [provider, this.returnTo], {
        url: this.url,
      });
      location.replace(url);
    } catch (err) {
      this._setError(err instanceof Error ? err.message : `${err}`);
      btn.loading = false;
      btn.disabled = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiSignIn} */
    'gui-sign-in': GuiSignIn;
  }
  interface GuiSignInEventMap {
    [GuiAuthSuccessEvent.NAME]: GuiAuthSuccessEvent;
  }
  interface HTMLElementEventMap extends GuiSignInEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiSignIn} */
        'gui-sign-in': GreyCat.Element<GuiSignIn, GuiSignInEventMap>;
      }
    }
  }
}
