import type { GCObject } from './GCObject.js';
import type { Abi, AbiType } from './abi.js';
import type { AbiReader } from './io.js';
import type { GreyCatWasmExports } from './registry.js';
import type { WasmSource } from './wasm.js';
import type { OpenidServerSpec, OpenidPkceSpec } from './openid.js';
import type { GreyCat } from './greycat.js';
// using Pick<...> to catch bug earlier if `runtime.Task` changes
// oxlint-disable-next-line typescript/no-explicit-any
export type TaskLike<T = any> = Pick<gc.runtime.Task<T>, 'user_id' | 'task_id'>;

export type TaskOptions = {
  /** Will poll the task at least once every `pollEvery` milliseconds. Defaults to `500` */
  pollEvery?: number;
  /** Will be called with the current progress of the task at least once every `pollEvery` milliseconds. */
  onprogress?: (progress: number | null) => void;
};

type ExtractValues<T> = T[keyof T];

// prettier-ignore
export const PrimitiveType = {
  null: 0,
  bool: 1,
  char: 2,
  int: 3,
  float: 4,
  node: 5,
  node_time: 6,
  node_index: 7,
  node_list: 8,
  node_geo: 9,
  geo: 10,
  time: 11,
  duration: 12,
  cubic: 13,
  enum: 14,
  object: 15,
  block_ref: 16,
  block_inline: 17,
  function: 18,
  undefined: 19,
  type: 20,
  field: 21,
  stringlit: 22,
  error: 23,
} as const;

export const PrimitiveTypeName = {
  0: 'null',
  1: 'bool',
  2: 'char',
  3: 'int',
  4: 'float',
  5: 'node',
  6: 'node_time',
  7: 'node_index',
  8: 'node_list',
  9: 'node_geo',
  10: 'geo',
  11: 'time',
  12: 'duration',
  13: 'cubic',
  14: 'enum',
  15: 'object',
  16: 'block_ref',
  17: 'block_inline',
  18: 'function',
  19: 'undefined',
  20: 'type',
  21: 'field',
  22: 'stringlit',
  23: 'error',
} as const;

export type PrimitiveType = ExtractValues<typeof PrimitiveType>;

export interface IGCObjectClass {
  // oxlint-disable-next-line typescript/no-explicit-any
  new (...fields: any[]): GCObject;
  _type: string;
  load: ILoader;
  $init?: () => void;
}
export type IPrimitiveLoader = (r: AbiReader) => Value;
export type ILoader = (r: AbiReader, type: AbiType) => Value;
export type Value = unknown;

export interface Options {
  /**
   * The name used to register this GreyCat instance.
   *
   * By default, `'default'` is used.
   */
  name?: string;
  /**
   * Whether or not to enable debug logging
   */
  debug?: boolean;
  /**
   * URL of the GreyCat server
   *
   * Defaults to:
   *  - `window.location.origin` in browser contexts
   *  - `'http://localhost:8080'` in other contexts (eg. Node.js)
   */
  url?: URL;
  /**
   * The default timezone of this instance
   *
   * Defaults to the host local
   */
  timezone?: gc.core.TimeZone.Field;
  /**
   * The default number format of this instance
   *
   * Defaults to the navigator language
   */
  numFmt?: Intl.NumberFormat;
  /**
   * A cache layer to use for requests/responses caching.
   *
   * Defaults to a `NoopCache`.
   */
  cache?: Cache;
  /**
   * The maximum number of tasks polled from the history.
   *
   * Defaults to `100`
   */
  maxTasks?: number;
  /**
   * Called when a request (from `gc.sdk.call(...)`) returns a status code 401.
   *
   * *You can also set this handler directly on the `GreyCat` instance after creating it*
   */
  unauthorizedHandler?: () => void;
  /**
   * Called when a request has been sent with mismatched ABI headers and the response status code is 422.
   *
   * *You can also set this handler directly on the `GreyCat` instance after creating it*
   */
  abiMismatchHandler?: () => void;
}

export type CacheKey = [method: string] | [method: string, params: ArrayBuffer];

export type CacheData = {
  etag: string;
  data: ArrayBuffer;
};

export interface Cache {
  write(key: CacheKey, data: CacheData): Promise<void>;
  /**
   * @param key
   * @returns `CacheData` on success, `null` on cache miss
   */
  read(key: CacheKey): Promise<CacheData | null>;
}

export type IdentityAuth = {
  username: string;
  password: string;
};
export type TokenAuth = {
  token: string;
};
export type Auth = IdentityAuth | TokenAuth;

/** Context handed to an {@link AuthStrategy} before the ABI download. */
export interface AuthContext {
  /** Normalized GreyCat base URL `init` resolved (no trailing slash). */
  url: string;
  signal?: AbortSignal;
}

/**
 * How a strategy wants the ABI request (and subsequent calls) authenticated.
 * The generic `T` is the strategy-specific payload surfaced on {@link Ready.auth}.
 */
export type AuthOutcome<T = void> =
  /** Send `token` as the `Authorization` header (password/token path). */
  | { kind: 'token'; token: string; info: T }
  /** A session cookie is already established; rely on `credentials: 'include'`. */
  | { kind: 'cookie'; info: T }
  /** The browser is navigating away (e.g. OIDC redirect); `init` must bail. */
  | { kind: 'redirecting' };

/**
 * A pluggable way to authenticate an `init`, run once before the ABI download.
 * Built-ins: {@link gc.sdk.passwordAuth}, {@link gc.sdk.tokenAuth},
 * {@link gc.sdk.openidServerAuth}, {@link gc.sdk.openidPkceAuth}.
 */
export interface AuthStrategy<T = void> {
  authenticate(ctx: AuthContext): Promise<AuthOutcome<T>>;
}

/** Ready arm of an `init` driven by a strategy or an openid spec. */
export interface Ready<T = void> {
  greycat: GreyCat;
  /** Whatever the strategy resolved (e.g. OIDC claims + returnTo), else `undefined`. */
  auth: T;
}

/** Returned by `init` when a strategy navigated the browser away. */
export interface Redirecting {
  redirecting: true;
}

export interface WithoutAbiOptions extends Options {
  /**
   * How to authenticate before the ABI is downloaded. Accepts:
   *
   *  - `undefined` - no authentication (default).
   *  - `{ username, password }` - logs in via `runtime::Identity::login`, then
   *    sends the returned token as the `Authorization` header.
   *  - `{ token }` - sends a pre-obtained token as the `Authorization` header.
   *  - `{ openid: provider }` - **server-driven OpenID** (recommended). GreyCat
   *    brokers the whole OAuth dance (`Openid::login` / `Openid::callback`); the
   *    browser only follows redirects and the session is carried by a cookie.
   *    `provider` is the id registered via `Openid::register` (e.g. `"keycloak"`),
   *    or an {@link OpenidServerConfig} for `returnTo`/origin overrides.
   *  - `{ openidPkce: ... }` - **client-driven OpenID (PKCE)**, for public clients
   *    where GreyCat does not broker tokens. Takes a provider id or {@link OidcConfig}.
   *  - an {@link AuthStrategy} - a custom or built-in strategy instance.
   *
   * When an openid spec or a strategy is used, `init` resolves to
   * {@link Ready} `| `{@link Redirecting} instead of a bare `GreyCat` (the page
   * may navigate away to the identity provider). Use {@link gc.sdk.isRedirecting}
   * to narrow.
   */
  auth?: Auth | AuthStrategy | OpenidServerSpec | OpenidPkceSpec;
  /** This signal is given to the request that loads the ABI. */
  signal?: AbortSignal;
  /**
   * GreyCat wasm source, needed by `GreyCat.parseTime`/`printTime`.
   *
   *  - `undefined` (default): loads the `greycat.wasm` packaged with `@greycat/web`.
   *    A load failure logs a warning and `init` proceeds without wasm.
   *  - `URL | Response | BufferSource | WebAssembly.Module`: loads that source
   *    (see `compileWasm`). A load failure rejects `init`.
   *  - `false`: skips wasm loading; `parseTime`/`printTime` will throw.
   */
  wasm?: WasmSource | false;
}

export interface WithAbiOptions extends Options {
  /** The ABI to use internally */
  abi: Abi;
  /** Wasm module (use `compileWasm()`) */
  module?: WebAssembly.Module;
  /** Wasm instance exports (use `compileWasm()`) */
  exports?: GreyCatWasmExports;
  /** Optional auth token */
  token?: string;
  permissions?: string[];
}

export function primitiveType(type: AbiType): PrimitiveType {
  if (type.offset === type.abi.core.node || type.generic_abi_type === type.abi.core.node) {
    return PrimitiveType.node;
  }
  if (type.offset === type.abi.core.node_time || type.generic_abi_type === type.abi.core.node_time) {
    return PrimitiveType.node_time;
  }
  if (type.offset === type.abi.core.node_index || type.generic_abi_type === type.abi.core.node_index) {
    return PrimitiveType.node_index;
  }
  if (type.offset === type.abi.core.node_list || type.generic_abi_type === type.abi.core.node_list) {
    return PrimitiveType.node_list;
  }
  if (type.offset === type.abi.core.node_geo || type.generic_abi_type === type.abi.core.node_geo) {
    return PrimitiveType.node_geo;
  }
  if (type.offset === type.abi.core.geo) {
    return PrimitiveType.geo;
  }
  if (type.offset === type.abi.core.time) {
    return PrimitiveType.time;
  }
  if (type.offset === type.abi.core.duration) {
    return PrimitiveType.duration;
  }
  if (type.offset === type.abi.core.cubic) {
    return PrimitiveType.cubic;
  }
  if (type.offset === type.abi.core.fn) {
    return PrimitiveType.function;
  }
  if (type.offset === type.abi.core.type) {
    return PrimitiveType.type;
  }
  if (type.offset === type.abi.core.field) {
    return PrimitiveType.field;
  }
  return PrimitiveType.object;
}
