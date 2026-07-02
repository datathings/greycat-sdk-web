// Direct imports to avoid the circular `../../exports.js` cycle. See the
// note in `sign-in.tsx` for context.
import { GuiElement } from '../element.js';
import { css } from '../common.js';
import type * as sl from '@shoelace-style/shoelace';
import type { GuiDialog } from '../dialog/dialog.js';
import { GuiAuthSuccessEvent, GuiSignedOutEvent } from '../events.js';
import style from './sign-in-button.css?inline';

/**
 * Compact auth widget for headers / toolbars. Renders as a single Shoelace
 * button:
 *
 *  - **Anonymous** — labelled "Sign in"; click opens a modal with a
 *    `<gui-sign-in>` form. On success the dialog closes and the button
 *    refreshes to show the user.
 *  - **Authenticated** — labelled with the user's name; click signs out
 *    and refreshes.
 *
 * **All calls are raw JSON HTTP via `gc.sdk.callJson`**, no ABI involved.
 * The button auto-probes the current user via `runtime::Identity::current`
 * on connect; call `refresh()` to re-probe after external state changes.
 */
export class GuiSignInButton extends GuiElement {
  static override styles = [css(style)];

  /** Base URL of the GreyCat server. Default: relative paths (same-origin). */
  url?: string;

  private _btn: sl.SlButton;
  private _user: gc.runtime.Identity | null = null;

  constructor() {
    super();
    this._btn = (
      <sl-button variant="primary" size="small" onclick={() => this._click()}>
        Sign in
      </sl-button>
    ) as sl.SlButton;
    this.shadowRoot.appendChild(this._btn);
  }

  connectedCallback() {
    this.refresh();
  }

  /** Re-probes the current user and updates the button label. */
  async refresh(): Promise<void> {
    try {
      this._user = await gc.sdk.callJson<gc.runtime.Identity>('runtime::Identity::current', [], {
        url: this.url,
      });
    } catch {
      this._user = null;
    }
    if (this._user) {
      this._btn.textContent = `${this._user.name} · Sign out`;
      this._btn.variant = 'default';
    } else {
      this._btn.textContent = 'Sign in';
      this._btn.variant = 'primary';
    }
  }

  private async _click(): Promise<void> {
    if (this._user) {
      this._btn.loading = true;
      try {
        await gc.sdk.callJson('runtime::Identity::logout', [], { url: this.url });
      } catch {
        // ignore
      }
      this._btn.loading = false;
      this.dispatchEvent(new GuiSignedOutEvent());
      this.refresh();
      return;
    }
    this._openDialog();
  }

  private _openDialog(): void {
    const signIn = document.createElement('gui-sign-in');
    if (this.url !== undefined) {
      signIn.url = this.url;
    }
    const dialog = (
      <gui-dialog label="Sign in">{signIn}</gui-dialog>
    ) as GuiDialog;
    signIn.addEventListener(GuiAuthSuccessEvent.NAME, async () => {
      await dialog.hide();
      this.refresh();
    });
    document.body.appendChild(dialog);
    dialog.updateComplete.then(() => dialog.show());
    dialog.addEventListener('sl-after-hide', (ev) => {
      if (ev.target === dialog) {
        dialog.remove();
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiSignInButton} */
    'gui-sign-in-button': GuiSignInButton;
  }

  interface GuiSignInButtonEventMap {
    [GuiAuthSuccessEvent.NAME]: GuiAuthSuccessEvent;
    [GuiSignedOutEvent.NAME]: GuiSignedOutEvent;
  }
  interface HTMLElementEventMap extends GuiSignInButtonEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiSignInButton} */
        'gui-sign-in-button': GreyCat.Element<GuiSignInButton, GuiSignInButtonEventMap>;
      }
    }
  }
}
