import { toast } from '../../toast.js';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import style from './identity-tokens.css?inline';

/** How many tokens one paged call reads. */
const PAGE = 100;

// an `Intl.DateTimeFormat` rather than options, since `time.format(options)` adds a
// `timeZoneName` that `dateStyle` refuses
const DATE_FORMAT = new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' });

/**
 * The tokens of the identity `name` that still hold, each with a button revoking it, and one
 * revoking them all but the token of this session. A revocation applies at once, the calls
 * carrying the token running as an anonymous caller from then on.
 *
 * A non-admin caller may only list and revoke their own tokens.
 */
export class GuiIdentityTokens extends GuiElement {
  static override styles = [css(style)];

  greycat: gc.sdk.GreyCat = gc.$.default;
  private _name: string | undefined;
  private _tokens: gc.runtime.IdentityToken[] = [];

  /** The identity whose tokens are listed. Setting it reloads the list. */
  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
    this.reload();
  }

  connectedCallback() {
    this.reload();
  }

  async reload(): Promise<void> {
    const name = this._name;
    if (!this.isConnected || name === undefined) {
      this._tokens = [];
      this._render();
      return;
    }
    try {
      const tokens: gc.runtime.IdentityToken[] = [];
      for (;;) {
        const page = await gc.runtime.Identity.tokens(name, tokens.length, PAGE, this.greycat);
        tokens.push(...page);
        if (page.length < PAGE) {
          break;
        }
      }
      // a reload for another name started meanwhile
      if (name !== this._name) {
        return;
      }
      this._tokens = tokens;
    } catch (err) {
      toast.error(err);
      this._tokens = [];
    }
    this._render();
  }

  private _render(): void {
    if (this._tokens.length === 0) {
      this.shadowRoot.replaceChildren(
        <small className="empty">
          <i>No token holds.</i>
        </small>,
      );
      return;
    }

    const list = document.createElement('div');
    list.className = 'list';
    list.append(<b>Label</b>, <b>Created</b>, <b>Expires</b>, <span />);
    for (const token of this._tokens) {
      list.append(
        <span>
          {token.label ?? <i>no label</i>}
          {token.current ? (
            <sl-tag size="small" variant="primary">
              this session
            </sl-tag>
          ) : null}
        </span>,
        <span title={token.created.toString()}>{token.created.format(DATE_FORMAT)}</span>,
        <span title={token.expires.toString()}>{token.expires.format(DATE_FORMAT)}</span>,
        <sl-icon-button name="x-lg" label="Revoke this token" onclick={() => this._revoke(token)} />,
      );
    }

    // `revoke_tokens` keeps the token of the call, which is one of these only when the caller is `name`
    const current = this._tokens.some((t) => t.current);
    const others = this._tokens.some((t) => !t.current);
    this.shadowRoot.replaceChildren(
      list,
      <sl-button size="small" variant="danger" outline disabled={!others} onclick={() => this._revokeOthers()}>
        {current ? 'Revoke all but this session' : 'Revoke all'}
      </sl-button>,
    );
  }

  private async _revoke(token: gc.runtime.IdentityToken): Promise<void> {
    const name = this._name;
    if (name === undefined) {
      return;
    }
    try {
      await gc.runtime.Identity.revoke_token(name, token.id, this.greycat);
      toast.notify(`Revoked a token of ${name}`);
    } catch (err) {
      toast.error(err);
    }
    this.reload();
  }

  private async _revokeOthers(): Promise<void> {
    const name = this._name;
    if (name === undefined) {
      return;
    }
    try {
      const n = await gc.runtime.Identity.revoke_tokens(name, true, this.greycat);
      toast.notify(`Revoked ${n} token(s) of ${name}`);
    } catch (err) {
      toast.error(err);
    }
    this.reload();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiIdentityTokens} */
    'gui-identity-tokens': GuiIdentityTokens;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiIdentityTokens} */
        'gui-identity-tokens': GreyCat.Element<GuiIdentityTokens>;
      }
    }
  }
}
