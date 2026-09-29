# Auth: sessions, login, 401

## The forms `init` accepts

```ts
await gc.sdk.init({ auth: { username, password } });   // Identity::login, keeps the token
await gc.sdk.init({ auth: { token } });                 // one minted with `greycat token`
await gc.sdk.init({ auth: { openid: spec } });          // server-driven OpenID redirect
await gc.sdk.init({ auth: { openidPkce: spec } });      // browser-side PKCE
await gc.sdk.init({ auth: strategy });                  // your own AuthStrategy
await gc.sdk.init();                                    // cookie session, or anonymous
```

The OpenID forms may resolve to a `Redirecting` value while the browser
navigates to the provider; check `gc.sdk.isRedirecting(result)` before using
it as an instance. `gc.sdk.passwordAuth` and `gc.sdk.tokenAuth` build the
built-in strategies for composition.

## Token or cookie

A token is sent as `Authorization: <token>` on every request, with fetch
`credentials: 'omit'`. Without a token the SDK sends `credentials: 'include'`,
so the `greycat=` session cookie set by `Identity::login` carries the identity.
`credentials` in the options overrides that choice; set `'omit'` for an
explicit anonymous session across origins.

The instance exposes what it holds: `greycat.token`, `greycat.permissions`,
`greycat.hasPermission(name)`.

## Changing the login on a live instance

```ts
await greycat.login({ username, password });   // or { token }
await greycat.logout();
```

`login` exchanges a password pair for a token through `Identity::login` or
takes a token as is, then: every following request carries it, the
permissions are reloaded, the task event stream restarts under the new login,
and `auth:changed` fires with `{ loggedIn: true }`. On failure it rejects with
the login's `HttpError` and the instance is untouched.

`logout` calls `Identity::logout`, drops the token, clears the permissions,
closes the stream, and fires `auth:changed` with `{ loggedIn: false }`. Local
state is cleared even when the server call fails. `gc.sdk.logout()` with no
`url` delegates to the default instance.

Assigning `greycat.token` directly also restarts or closes the stream, but
does not reload permissions. A cookie session established outside the
instance is invisible to it: call `greycat.tasks.reconnect()` afterwards.

## What a 401 does

Every request path routes a 401 through one place, `greycat.unauthorized`:

1. the token is dropped, which closes the task event stream,
2. `auth:lost` fires once with `{ status: 401, route }`,
3. `unauthorizedHandler` is called,
4. the request rejects with an `HttpError` of status 401.

A burst of requests failing together fires `auth:lost` once, once per lost
token. A session without a token has nothing to drop, so it fires at most once
a second. The task event stream itself stays silent on a 401: it closes and is
not retried, so an anonymous page does not report a lost login it never had.

Put the "show the login form" logic in an `auth:lost` listener or in
`unauthorizedHandler`, then call `greycat.login(auth)`; no reload is needed.

```ts
greycat.on('auth:lost', () => showLogin());
greycat.on('auth:changed', ({ loggedIn }) => loggedIn ? showApp() : showLogin());
```

## ABI mismatch

`abiMismatchHandler` runs when the server answers 422 or a response header
carries an ABI the instance does not know: the project changed since `init`.
The usual handler reloads the page.
