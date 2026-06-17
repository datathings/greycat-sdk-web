namespace gc {
  export namespace sdk {
    const PENDING_KEY = 'gc-openid:pending';
    const ID_TOKEN_KEY = 'gc-openid:id_token';

    /** Configuration for a new {@link OidcClient}. */
    export interface OidcConfig {
      /** GreyCat provider id, as passed to Openid::register (e.g. "keycloak"). */
      provider: string;
      /** OIDC issuer URL; used to discover the provider endpoints. */
      issuer?: string;
      /** Skip discovery by supplying the authorization endpoint directly. */
      authorizationEndpoint?: string;
      /** Skip discovery by supplying the token endpoint directly. */
      tokenEndpoint?: string;
      /** Optional RP-initiated logout endpoint (used by logout()). */
      endSessionEndpoint?: string;
      /** OAuth public client id. Must equal GreyCat's registered client_id (aud check). */
      clientId: string;
      /** Absolute redirect URI registered with the provider. Default: current page. */
      redirectUri?: string;
      /** Scopes to request. Default: ["openid", "email", "profile"]. Must include "openid". */
      scopes?: string[];
      /** Extra query params on the authorization request (prompt, login_hint, ...). */
      extraAuthParams?: Record<string, string>;
      /** Base URL of the GreyCat server. Default: "" (same origin as this page). */
      greycatOrigin?: string;
      /** fetch credentials mode for GreyCat calls. Default: "same-origin". */
      credentials?: RequestCredentials;
    }

    /** Resolved provider endpoints (subset of the OIDC discovery document). */
    export interface OidcEndpoints {
      authorization_endpoint: string;
      token_endpoint: string;
      end_session_endpoint: string | null;
    }

    /** Decoded ID-token claims (the raw JWT payload; not signature-verified here). */
    export interface OidcClaims {
      /** Provider-unique stable subject. */
      sub: string;
      /** Issuer URL. */
      iss: string;
      /** Audience - a single client id or an array of them. */
      aud: string | string[];
      /** Expiry, epoch seconds. */
      exp: number;
      /** Issued-at, epoch seconds. */
      iat?: number;
      /** Replay-protection value this SDK matches against the login it started. */
      nonce?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      preferred_username?: string;
      groups?: string[];
      /** Any other claims the provider included. */
      [claim: string]: unknown;
    }

    /** Secret-free provider config returned by `Openid::public_config`. */
    export interface OidcPublicConfig {
      issuer: string;
      client_id: string;
      redirect_uri: string;
      scopes: string[] | null;
    }

    /** Outcome of {@link OidcClient.handleRedirect} when a redirect was finished. */
    export interface HandleRedirectResult {
      /** The raw ID token (JWT) that was exchanged for the GreyCat session. */
      idToken: string;
      /** The decoded ID-token claims. */
      claims: OidcClaims;
      /** The URL the originating login() asked to return to. */
      returnTo: string;
    }

    /** Config for the server-driven OpenID strategy ({@link openidServerAuth}). */
    export interface OpenidServerConfig {
      /** GreyCat provider id, as registered via `Openid::register` (e.g. "keycloak"). */
      provider: string;
      /** Where the provider should send the browser back. Default: the current URL. */
      returnTo?: string;
      /** Base URL of the GreyCat server. Default: the URL `init` resolved. */
      greycatOrigin?: string;
      /** fetch credentials mode. Default: "same-origin". */
      credentials?: RequestCredentials;
    }

    /** What the server-driven OpenID strategy resolves once signed in. */
    export interface OpenidServerResult {
      /** The URL the originating `Openid::login` asked to return to. */
      returnTo: string;
    }

    /** `init({ auth })` spec for the server-driven OpenID flow (provider id or config). */
    export type OpenidServerSpec = { openid: string | OpenidServerConfig };
    /** `init({ auth })` spec for the client-driven (PKCE) OpenID flow. */
    export type OpenidPkceSpec = { openidPkce: string | OidcConfig };

    /** Transport options for the standalone path-RPC helper and static factories. */
    export interface RpcOptions {
      /** Base URL of the GreyCat server. Default: "" (same origin). */
      greycatOrigin?: string;
      /** fetch credentials mode. Default: "same-origin". */
      credentials?: RequestCredentials;
    }

    /** Overrides + transport options for {@link OidcClient.fromProvider}. */
    export interface FromProviderOptions {
      redirectUri?: string;
      scopes?: string[];
      extraAuthParams?: Record<string, string>;
      greycatOrigin?: string;
      credentials?: RequestCredentials;
    }

    /** Transport options for {@link OidcClient.listProviders}. */
    export interface ListProvidersOptions {
      greycatOrigin?: string;
      credentials?: RequestCredentials;
    }

    export interface OidcLoginOptions {
      /** Restored and returned by handleRedirect(). Default: the current URL. */
      returnTo?: string;
    }

    export interface OidcLogoutOptions {
      /** Navigate to the provider end-session URL when available. Default: true. */
      redirect?: boolean;
      /** Where the provider should send the browser after logout. */
      postLogoutRedirectUri?: string;
    }

    /** Internal pending-login state, stashed in sessionStorage across the redirect. */
    interface PendingLogin {
      state: string;
      nonce: string;
      verifier: string;
      redirectUri: string;
      returnTo: string;
    }

    /** Subset of a provider token-endpoint response we care about. */
    interface TokenResponse {
      id_token?: string;
      access_token?: string;
      refresh_token?: string;
      [field: string]: unknown;
    }

    export class OpenidClient {
      readonly provider: string;
      readonly issuer: string | null;
      readonly clientId: string;
      readonly redirectUri: string;
      readonly scopes: string[];
      readonly extraAuthParams: Record<string, string>;
      readonly greycatOrigin: string;
      readonly credentials: RequestCredentials;
      /** Cached endpoints: supplied up front, or filled in by discover(). */
      private endpoints: OidcEndpoints | null;

      constructor(config: OidcConfig) {
        if (!config || !config.provider) {
          throw new Error('OpenidClient: `provider` is required');
        }
        if (!config.clientId) {
          throw new Error('OpenidClient: `clientId` is required');
        }
        if (!config.issuer && !(config.authorizationEndpoint && config.tokenEndpoint)) {
          throw new Error('OpenidClient: provide either `issuer` or both `authorizationEndpoint` and `tokenEndpoint`');
        }
        this.provider = config.provider;
        this.issuer = config.issuer ? config.issuer.replace(/\/+$/, '') : null;
        this.clientId = config.clientId;
        this.redirectUri = config.redirectUri || window.location.origin + window.location.pathname;
        this.scopes = config.scopes && config.scopes.length ? config.scopes.slice() : ['openid', 'email', 'profile'];
        this.extraAuthParams = config.extraAuthParams || {};
        this.greycatOrigin = (config.greycatOrigin || '').replace(/\/+$/, '');
        this.credentials = config.credentials || 'same-origin';
        this.endpoints =
          config.authorizationEndpoint && config.tokenEndpoint
            ? {
                authorization_endpoint: config.authorizationEndpoint,
                token_endpoint: config.tokenEndpoint,
                end_session_endpoint: config.endSessionEndpoint || null,
              }
            : null;
      }

      /**
       * List the provider ids registered on the GreyCat server, via the exposed
       * `Openid::providers()`. Handy for rendering a login picker: fetch the ids,
       * then build a client for each with {@link OidcClient.fromProvider}.
       */
      static async listProviders(opts: ListProvidersOptions = {}): Promise<string[]> {
        const res = await rpc('openid::Openid::providers', [], opts);
        if (!res.ok) {
          throw new Error(`openid: providers() failed (${res.status})`);
        }
        return (await res.json()) as string[];
      }

      /**
       * Build a client from a provider id, using the server as the single source of
       * truth for issuer/client_id/redirect_uri/scopes (via the exposed
       * `Openid::public_config`).
       * @param id GreyCat provider id (as registered via Openid::register).
       * @param opts Overrides + transport options.
       */
      static async fromProvider(id: string, opts: FromProviderOptions = {}): Promise<OpenidClient> {
        const res = await rpc('openid::Openid::public_config', [id], opts);
        if (!res.ok) {
          throw new Error(`openid: public_config("${id}") failed (${res.status})`);
        }
        const cfg = (await res.json()) as OidcPublicConfig | null;
        if (!cfg) {
          throw new Error(`openid: provider "${id}" is not registered on the server`);
        }
        return new OpenidClient({
          provider: id,
          issuer: cfg.issuer,
          clientId: cfg.client_id,
          redirectUri: opts.redirectUri || cfg.redirect_uri,
          scopes: opts.scopes || cfg.scopes || undefined,
          extraAuthParams: opts.extraAuthParams,
          greycatOrigin: opts.greycatOrigin,
          credentials: opts.credentials,
        });
      }

      /**
       * Fetch and cache the provider's `/.well-known/openid-configuration`.
       * Called automatically by login()/handleRedirect(); exposed for preflight.
       */
      async discover(): Promise<OidcEndpoints> {
        if (this.endpoints) {
          return this.endpoints;
        }
        const url = this.issuer + '/.well-known/openid-configuration';
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) {
          throw new Error(`openid discovery failed (${res.status}) for ${url}`);
        }
        const doc = (await res.json()) as Partial<OidcEndpoints>;
        if (!doc.authorization_endpoint || !doc.token_endpoint) {
          throw new Error('openid discovery: missing authorization_endpoint or token_endpoint');
        }
        this.endpoints = {
          authorization_endpoint: doc.authorization_endpoint,
          token_endpoint: doc.token_endpoint,
          end_session_endpoint: doc.end_session_endpoint || null,
        };
        return this.endpoints;
      }

      /**
       * Begin the redirect. Generates PKCE + state + nonce, stashes them in
       * sessionStorage, and navigates the browser to the provider. Does not return
       * in the normal case (the page unloads).
       */
      async login(opts: OidcLoginOptions = {}): Promise<void> {
        const ep = await this.discover();
        const verifier = randomString(64);
        const challenge = await sha256Base64Url(verifier);
        const state = randomString(32);
        const nonce = randomString(32);

        const pending: PendingLogin = {
          state,
          nonce,
          verifier,
          redirectUri: this.redirectUri,
          returnTo: opts.returnTo || window.location.href,
        };
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));

        const params = new URLSearchParams({
          response_type: 'code',
          client_id: this.clientId,
          redirect_uri: this.redirectUri,
          scope: this.scopes.join(' '),
          state,
          nonce,
          code_challenge: challenge,
          code_challenge_method: 'S256',
        });
        for (const [k, v] of Object.entries(this.extraAuthParams)) {
          params.set(k, v);
        }
        const sep = ep.authorization_endpoint.includes('?') ? '&' : '?';
        window.location.assign(ep.authorization_endpoint + sep + params.toString());
      }

      /**
       * Finish the redirect if the current URL carries `?code=&state=`. Exchanges
       * the code for an ID token at the provider, validates state + nonce locally,
       * then calls Openid::token_login to obtain the GreyCat session cookie. Strips
       * the OAuth query params from the URL on success.
       *
       * Returns `null` when the URL is not an OAuth redirect (nothing to do).
       * @throws on provider error, state/nonce mismatch, or a failing token_login.
       */
      async handleRedirect(): Promise<HandleRedirectResult | null> {
        const q = new URLSearchParams(window.location.search);
        const error = q.get('error');
        const code = q.get('code');
        const state = q.get('state');
        if (!error && !code) {
          return null; // not a redirect callback
        }

        const raw = sessionStorage.getItem(PENDING_KEY);
        sessionStorage.removeItem(PENDING_KEY);

        if (error) {
          stripOauthParams();
          const desc = q.get('error_description');
          throw new Error(`openid: provider returned error "${error}"${desc ? ': ' + desc : ''}`);
        }
        if (!raw) {
          stripOauthParams();
          throw new Error('openid: no pending login found (state lost or callback replayed)');
        }
        const pending = JSON.parse(raw) as PendingLogin;
        if (!state || state !== pending.state) {
          stripOauthParams();
          throw new Error('openid: state mismatch (possible CSRF)');
        }

        const ep = await this.discover();

        // Exchange the authorization code for tokens. Public client: PKCE verifier,
        // no client_secret. Mirrors the body the GreyCat library builds server-side.
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: pending.redirectUri,
          client_id: this.clientId,
          code_verifier: pending.verifier,
          scope: this.scopes.join(' '),
        });
        const tokenRes = await fetch(ep.token_endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
          body: body.toString(),
        });
        if (!tokenRes.ok) {
          stripOauthParams();
          const text = await safeText(tokenRes);
          throw new Error(`openid: token endpoint failed (${tokenRes.status}) ${text}`);
        }
        const tokens = (await tokenRes.json()) as TokenResponse;
        const idToken = tokens.id_token;
        if (!idToken) {
          stripOauthParams();
          throw new Error("openid: token response has no id_token (request the 'openid' scope)");
        }

        // GreyCat's token_login does not verify the nonce, so do it here: bind this
        // ID token to the login we started.
        const claims = decodeJwtPayload(idToken);
        if (claims.nonce !== pending.nonce) {
          stripOauthParams();
          throw new Error('openid: nonce mismatch (possible token injection)');
        }

        // Trade the ID token for a GreyCat session. The response sets the
        // `greycat` cookie; `credentials` must allow it to be stored.
        await this.tokenLogin(idToken);

        // Keep the raw token around for RP-initiated logout (id_token_hint).
        try {
          sessionStorage.setItem(ID_TOKEN_KEY, idToken);
        } catch {
          // sessionStorage may be unavailable (private mode quota); logout hint is best-effort.
        }

        stripOauthParams();
        return { idToken, claims, returnTo: pending.returnTo };
      }

      /**
       * Call Openid::token_login(provider, jwt) on the GreyCat server. Normally
       * invoked by handleRedirect(); public for callers that obtained an ID token
       * by other means (a provider JS SDK, a native bridge, ...).
       * @param idToken a verifiable OIDC ID token (JWT) minted for this clientId.
       */
      async tokenLogin(idToken: string): Promise<Response> {
        const res = await this._call('openid::Openid::token_login', [this.provider, idToken]);
        if (!res.ok) {
          const text = await safeText(res);
          throw new Error(`openid: token_login failed (${res.status}) ${text}`);
        }
        return res;
      }

      /**
       * Clear the GreyCat session, and optionally bounce through the provider's
       * RP-initiated logout endpoint to end the session at the IdP too.
       * @returns the end-session URL when one exists, else null.
       */
      async logout(opts: OidcLogoutOptions = {}): Promise<string | null> {
        const redirect = opts.redirect !== false;
        // Clear the GreyCat cookie first.
        await this._call('runtime::Identity::logout', []);

        const idTokenHint = sessionStorage.getItem(ID_TOKEN_KEY);
        sessionStorage.removeItem(ID_TOKEN_KEY);
        if (!idTokenHint) {
          return null;
        }

        // Ask GreyCat to build the provider's end_session URL (null if unsupported).
        const res = await this._call('openid::Openid::end_session_url', [
          this.provider,
          idTokenHint,
          opts.postLogoutRedirectUri || null,
        ]);
        if (!res.ok) {
          return null;
        }
        const url = (await res.json()) as string | null;
        if (url && redirect) {
          window.location.assign(url);
        }
        return url || null;
      }

      /**
       * Low-level path-RPC call to a GreyCat @expose'd function, using this client's
       * greycatOrigin / credentials.
       * @param path e.g. "open::Openid::token_login"
       * @param args positional arguments, in declaration order
       */
      private _call(path: string, args: unknown[]): Promise<Response> {
        return rpc(path, args, {
          greycatOrigin: this.greycatOrigin,
          credentials: this.credentials,
        });
      }
    }

    // --- init strategies ---------------------------------------------------------

    /**
     * Server-driven OpenID strategy (recommended). GreyCat brokers the whole OAuth
     * dance via `Openid::login` / `Openid::callback`; the browser only follows
     * redirects and the session is carried by a cookie - no token or JWT in the page.
     *
     * Pass to `gc.sdk.init({ auth: gc.sdk.openidServerAuth('keycloak') })`, or use the
     * `{ openid: 'keycloak' }` shorthand on `init`.
     *
     * @param config a provider id (as registered via `Openid::register`) or an
     *               {@link OpenidServerConfig} for returnTo/origin overrides.
     */
    export function openidServerAuth(
      config: string | OpenidServerConfig,
    ): gc.sdk.AuthStrategy<OpenidServerResult | null> {
      const cfg: OpenidServerConfig = typeof config === 'string' ? { provider: config } : config;
      return {
        async authenticate(ctx): Promise<gc.sdk.AuthOutcome<OpenidServerResult | null>> {
          const tx: RpcOptions = { greycatOrigin: cfg.greycatOrigin ?? ctx.url, credentials: cfg.credentials };
          const q = new URLSearchParams(window.location.search);
          const code = q.get('code');
          const state = q.get('state');

          // STATE A - back from the provider: let the server finish the exchange.
          if (code && state) {
            const res = await rpc('openid::Openid::callback', [code, state], tx);
            stripOauthParams();
            if (!res.ok) {
              throw new Error(`openid: server callback failed (${res.status})`);
            }
            const returnTo = (await res.json()) as string | null;
            if (!(await hasSession(ctx, cfg.credentials))) {
              throw new Error('openid: callback succeeded but no session is visible');
            }
            return { kind: 'cookie', info: returnTo ? { returnTo } : null };
          }

          // STATE B - already signed in on a normal load.
          if (await hasSession(ctx, cfg.credentials)) {
            return { kind: 'cookie', info: null };
          }

          // STATE C - ask the server for the authorization URL, then leave.
          const res = await rpc('openid::Openid::login', [cfg.provider, cfg.returnTo ?? window.location.href], tx);
          if (!res.ok) {
            throw new Error(`openid: server login() failed (${res.status})`);
          }
          window.location.assign((await res.json()) as string);
          return { kind: 'redirecting' };
        },
      };
    }

    /**
     * Client-driven OpenID strategy (PKCE), for public clients where GreyCat does
     * not broker tokens: the browser performs the token exchange and validates the
     * ID token. Prefer {@link openidServerAuth} unless you specifically need this.
     *
     * Pass to `gc.sdk.init({ auth: gc.sdk.openidAuth(...) })`, or use the
     * `{ openidPkce: ... }` shorthand on `init`.
     *
     * @param config a provider id (resolved via `Openid::public_config`), an
     *               {@link OidcConfig}, or a pre-built {@link OpenidClient}.
     */
    export function openidPkceAuth(
      config: string | OidcConfig | OpenidClient,
    ): gc.sdk.AuthStrategy<HandleRedirectResult | null> {
      return {
        async authenticate(ctx): Promise<gc.sdk.AuthOutcome<HandleRedirectResult | null>> {
          const client =
            config instanceof OpenidClient
              ? config
              : typeof config === 'string'
                ? await OpenidClient.fromProvider(config, { greycatOrigin: ctx.url })
                : new OpenidClient({ greycatOrigin: ctx.url, ...config });

          // STATE A - returning from the provider: finish the exchange (sets the cookie).
          const redirect = await client.handleRedirect();
          if (redirect) {
            if (!(await hasSession(ctx, client.credentials))) {
              throw new Error('openid: token_login succeeded but no session is visible');
            }
            return { kind: 'cookie', info: redirect };
          }

          // STATE B - already signed in on a normal load.
          if (await hasSession(ctx, client.credentials)) {
            return { kind: 'cookie', info: null };
          }

          // STATE C - no session, not a callback: start the redirect dance.
          await client.login();
          return { kind: 'redirecting' };
        },
      };
    }

    // --- helpers -----------------------------------------------------------------

    /**
     * Cheap pre-ABI session probe over the JSON path: `runtime::Identity::current_id`
     * returns 200 when a session exists, 401 otherwise.
     */
    async function hasSession(ctx: gc.sdk.AuthContext, credentials?: RequestCredentials): Promise<boolean> {
      try {
        const id = await gc.sdk.callJson<number>('runtime::Identity::current_id', [], {
          url: ctx.url,
          signal: ctx.signal,
          credentials: credentials || 'same-origin',
        });
        return id !== 0;
      } catch (err) {
        // oxlint-disable-next-line typescript/no-explicit-any
        if ((err as any).status === 401) {
          return false;
        }
        throw err;
      }
    }

    /**
     * Path-RPC to a GreyCat @expose'd function. Standalone so the static factories
     * (listProviders / fromProvider) can call it without a constructed client.
     */
    function rpc(path: string, args: unknown[], opts: RpcOptions = {}): Promise<Response> {
      // `callJsonRaw` strips trailing slashes; default to same-origin (empty base).
      return gc.sdk.callJsonRaw(path, args, {
        url: opts.greycatOrigin || '',
        credentials: opts.credentials || 'same-origin',
      });
    }

    /** RFC 7636 code_verifier / opaque token: base64url of `bytes` random bytes. */
    function randomString(bytes: number): string {
      const buf = new Uint8Array(bytes);
      crypto.getRandomValues(buf);
      return base64UrlEncode(buf);
    }

    /** base64url(SHA-256(ascii)). */
    async function sha256Base64Url(ascii: string): Promise<string> {
      const data = new TextEncoder().encode(ascii);
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
      return base64UrlEncode(digest);
    }

    function base64UrlEncode(bytes: Uint8Array): string {
      let bin = '';
      for (let i = 0; i < bytes.length; i++) {
        bin += String.fromCharCode(bytes[i]);
      }
      return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function base64UrlDecode(s: string): Uint8Array {
      const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const bin = atob(padded);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        out[i] = bin.charCodeAt(i);
      }
      return out;
    }

    /** Decode the JWT payload (claims) without verifying the signature. */
    function decodeJwtPayload(jwt: string): OidcClaims {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('openid: malformed JWT');
      }
      const json = new TextDecoder().decode(base64UrlDecode(parts[1]));
      return JSON.parse(json) as OidcClaims;
    }

    /** Remove code/state/error from the current URL without reloading. */
    function stripOauthParams(): void {
      const url = new URL(window.location.href);
      for (const k of ['code', 'state', 'error', 'error_description', 'session_state', 'iss']) {
        url.searchParams.delete(k);
      }
      window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : '') + url.hash);
    }

    async function safeText(res: Response): Promise<string> {
      try {
        const t = await res.text();
        return t.length > 500 ? t.slice(0, 500) : t;
      } catch {
        return '';
      }
    }
  }
}
