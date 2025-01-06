import type { GCObject, AbiReader, Abi, AbiType } from './exports.js';

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
  t2: 16,
  t3: 17,
  t4: 18,
  str: 19,
  t2f: 20,
  t3f: 21,
  t4f: 22,
  block_ref: 23,
  function: 24,
  undefined: 25,
  type: 26,
  field: 27,
  stringlit: 28,
  error: 29,
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
  16: 't2',
  17: 't3',
  18: 't4',
  19: 'str',
  20: 't2f',
  21: 't3f',
  22: 't4f',
  23: 'block_ref',
  24: 'function',
  25: 'undefined',
  26: 'type',
  27: 'field',
  28: 'stringlit',
  29: 'error',
} as const;

export type PrimitiveType = ExtractValues<typeof PrimitiveType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFactory = { new (type: AbiType, ...fields: any[]): GCObject };
export type IPrimitiveLoader = (r: AbiReader) => Value;
export type ILoader = (r: AbiReader, type: AbiType) => Value;
export type Value = unknown;

export interface Library {
  name: string;
  mapped: AbiType[];
  configure(loaders: Map<string, ILoader>, factories: Map<string, IFactory>): void;
  init(a: Abi): void;
}

export interface Options {
  /**
   * The name used to register this GreyCat instance.
   *
   * By default, `'default'` is used.
   */
  name?: string;
  /**
   * URL of the GreyCat server
   *
   * Defaults to:
   *  - `window.location.origin` in browser contexts
   *  - `'http://localhost:8080'` in other contexts (eg. Node.js)
   */
  url?: URL;
  /**
   * Write buffer capacity. Defaults to `4096` (4KB)
   */
  capacity?: number;
  /**
   * A cache layer to use for requests/responses caching.
   *
   * Defaults to a `NoopCache`.
   */
  cache?: Cache;
  /**
   * Called when a request (from `greycat.call(...)`) returns a status code 401.
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

export interface Auth {
  username: string;
  password: string;
  use_cookie?: boolean;
}

export interface WithoutAbiOptions extends Options {
  /** If defined, will call `runtime::User::login` prior to initialization */
  auth?: Auth;
  /** This signal is given to the request that loads the ABI. */
  signal?: AbortSignal;
  /** Libraries to use for (de-)serialization. By default, only "core" is loaded. */
  libraries?: Library[];
}

export interface WithAbiOptions extends Options {
  /** The ABI to use internally */
  abi: Abi;
  /** Optional auth token */
  token?: string;
  permissions?: string[];
}

export function primitiveType(type: AbiType): PrimitiveType {
  if (type.offset === type.abi.core.node) {
    return PrimitiveType.node;
  }
  if (type.offset === type.abi.core.node_time) {
    return PrimitiveType.node_time;
  }
  if (type.offset === type.abi.core.node_index) {
    return PrimitiveType.node_index;
  }
  if (type.offset === type.abi.core.node_list) {
    return PrimitiveType.node_list;
  }
  if (type.offset === type.abi.core.node_geo) {
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
  if (type.offset === type.abi.core.t2) {
    return PrimitiveType.t2;
  }
  if (type.offset === type.abi.core.t3) {
    return PrimitiveType.t3;
  }
  if (type.offset === type.abi.core.t4) {
    return PrimitiveType.t4;
  }
  if (type.offset === type.abi.core.str) {
    return PrimitiveType.str;
  }
  if (type.offset === type.abi.core.t2f) {
    return PrimitiveType.t2f;
  }
  if (type.offset === type.abi.core.t3f) {
    return PrimitiveType.t3f;
  }
  if (type.offset === type.abi.core.t4f) {
    return PrimitiveType.t4f;
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
