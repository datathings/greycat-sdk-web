import type {
  TaskLike,
  WithoutAbiOptions,
  WithAbiOptions,
  Auth,
  Cache,
  CacheData,
  CacheKey,
  Value,
  GCObject,
} from './exports.js';
import {
  Abi,
  AbiFunction,
  AbiType,
  AbiReader,
  AbiWriter,
  sha256hex,
  std,
  PrimitiveType,
  AbiTypeEvol,
} from './exports.js';
import { core } from './std_n/index.js';

/** Defaults to `location.origin` when available, fallbacks to `'http://127.0.0.1:8080'` otherwise */
export let DEFAULT_URL: URL;
try {
  DEFAULT_URL = new URL(globalThis.location?.origin ?? 'http://127.0.0.1:8080');
} catch {
  DEFAULT_URL = new URL('http://127.0.0.1:8080');
}

/**
 * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
 *
 * *The name `'default'` is reserved and is used when initializing without a specific name*.
 */
export const $: { [name: string]: GreyCat } = {};

const NOOP = (): void => void 0;
export const DEFAULT_LOGGER = (
  status: number,
  method: string,
  args?: unknown,
  value?: unknown,
): void => {
  const bg = status >= 400 ? '#e8590c' : '#1983c1';
  console.log('%cGreyCat', `background:${bg};color:#fff;padding:2px;font-weight:bold`, {
    method,
    args,
    response: value,
  });
};
export type DebugLogger = typeof DEFAULT_LOGGER;
let debugLogger: DebugLogger = NOOP;

/**
 * Registers a global debug logger that will be called for every remote procedure call.
 *
 * If `customLogger` is `undefined` the default console logger will be used.
 */
export function registerDebugLogger(customLogger: DebugLogger = DEFAULT_LOGGER): void {
  debugLogger = customLogger;
}

/**
 * Unregisters the global debug logger by replacing it with a no-op function.
 */
export function unregisterDebugLogger(): void {
  debugLogger = NOOP;
}

export function getDebuggerLogger(): DebugLogger {
  return debugLogger;
}

/**
 * @returns {[ArrayBuffer, string | undefined]} returns a tuple containing the ABI data and optionally the token if a login has occured
 */
export async function downloadAbi(
  {
    url = DEFAULT_URL,
    auth,
    signal,
    cache,
    capacity,
    libraries,
    unauthorizedHandler,
  }: WithoutAbiOptions = {
    url: DEFAULT_URL,
  },
): Promise<[ArrayBuffer, string | undefined]> {
  let token: string | undefined;

  if (auth) {
    token = await login({ ...auth, url, signal });
  }

  const headers: RequestInit['headers'] = { Accept: 'application/octet-stream' };
  if (token) {
    headers['Authorization'] = token;
  }

  const method = 'runtime::Runtime::abi';
  const key: CacheKey = [method];
  const cachedRes = await cache?.read(key);
  if (cachedRes) {
    headers['If-None-Match'] = cachedRes.etag;
  }

  const cleanUrl = normalizeUrl(url);
  const res = await fetch(`${cleanUrl}/${method}`, {
    method: 'POST',
    headers,
    signal,
  });
  if (res.status === 401) {
    // unauthorized
    debugLogger(res.status, method);
    // call handler if any
    unauthorizedHandler?.();
    throw new Error(`you need to be logged-in to access '${method}'`);
  } else if (res.status === 304) {
    if (cachedRes) {
      return [cachedRes.data, token];
    } else {
      // re-attempt
      return downloadAbi({
        auth,
        cache,
        capacity,
        libraries,
        signal,
        unauthorizedHandler,
        url,
      });
    }
  } else if (!res.ok) {
    throw new Error(`unable to fetch ABI (${res.status} ${res.statusText})`);
  }
  const data = await res.arrayBuffer();
  const etag = res.headers.get('etag');
  if (etag && cache) {
    await cache.write(key, { etag, data });
  }
  return [data, token];
}

export interface GreyCat {
  /**
   * The generic param `T` is there only for convenience as no runtime checks are made on the deserialized value.
   *
   * @param method the exposed GreyCat function to call, without leading slash
   * (eg. `'runtime::User::me'`)
   * @param args the function's arguments to send along.
   *             If `args` is an `Array` it will be serialized with `AbiWriter` to the ABI-compliant bytes for you.
   *             If `args` is an `ArrayBuffer`, the bytes will be sent as-is.
   * @param signal an optional `AbortSignal` to cancel the underlying fetch call
   */
  call<T = unknown>(method: string, args?: Value[] | ArrayBuffer, signal?: AbortSignal): Promise<T>;

  /**
   * Spawns a GreyCat task.
   *
   * @param method the exposed GreyCat function to spawn, without leading slash
   * (eg. `'runtime::User::me'`)
   * @param args the function's arguments to send along.
   *             If `args` is an `Array` it will be serialized with `AbiWriter` to the ABI-compliant bytes for you.
   *             If `args` is an `ArrayBuffer`, the bytes will be sent as-is.
   * @param signal an optional `AbortSignal` to cancel the underlying fetch call
   */
  spawn(
    method: string,
    args?: Value[] | ArrayBuffer,
    signal?: AbortSignal,
  ): Promise<std.runtime.Task>;

  /**
   * Spawns a GreyCat task and actively awaits for its completion.
   *
   * *This is equivalent to `greycat.await(await greycat.spawn(...))`*
   *
   * @param method the exposed GreyCat function to spawn, without leading slash
   * (eg. `'runtime::User::me'`)
   * @param pollEvery the delay to wait between each poll in milliseconds (defaults to 2000ms)
   * @param args the function's arguments to send along.
   *             If `args` is an `Array` it will be serialized with `AbiWriter` to the ABI-compliant bytes for you.
   *             If `args` is an `ArrayBuffer`, the bytes will be sent as-is.
   * @param signal an optional `AbortSignal` to cancel the underlying fetch call
   */
  spawnAwait<T = unknown>(
    method: string,
    args?: Value[] | ArrayBuffer,
    pollEvery?: number,
    signal?: AbortSignal,
  ): Promise<T>;

  /**
   * Awaits the completion of the given GreyCat task.
   */
  await<T = unknown>(task: TaskLike, pollEvery?: number, signal?: AbortSignal): Promise<T>;

  getFile<T = unknown>(filepath: `${string}.gcb`, signal?: AbortSignal): Promise<T[]>;
  getFile<T = unknown>(filepath: string, signal?: AbortSignal): Promise<T | T[]>;
}

export class GreyCat {
  /** GreyCat's api endpoint normalized (does not contain a trailing slash) */
  readonly api: string;
  /** The current GreyCat ABI */
  readonly abi: Abi;
  /** used by `WriteBuffer` to initialize its capacity */
  readonly capacity: number;
  /** cache layer for request/response. Defaults to the `NoopCache`. */
  readonly cache: Cache;
  /** currently connected user permissions */
  permissions: string[];
  /** used when making authenticated requests */
  token: string | undefined;
  /** called when a request returns a status code 401 */
  unauthorizedHandler: (() => void) | undefined;
  /** called when a request has been sent with wrong ABI headers and therefore the response as status 422 */
  abiMismatchHandler: (() => void) | undefined;

  private constructor(
    api: string,
    abi: Abi,
    capacity = 4096,
    cache: Cache = new NoopCache(),
    permissions: string[],
    token?: string,
    unauthorizedHandler?: () => void,
    abiMismatchHandler?: () => void,
  ) {
    this.api = api;
    this.abi = abi;
    this.capacity = capacity;
    this.cache = cache;
    this.token = token;
    this.unauthorizedHandler = unauthorizedHandler;
    this.abiMismatchHandler = abiMismatchHandler;
    this.permissions = permissions;

    // initialize runtime RPCs based on Abi
    for (const fn of this.abi.functions) {
      const create_fn =
        (method: string) =>
        (...args: unknown[]) => {
          const method_args = args.slice(0, fn.params.length);
          const signal = args[fn.params.length];
          this.call(method, method_args, signal instanceof AbortSignal ? signal : undefined);
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(this.call as any)[fn.module]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.call as any)[fn.module] = {};
      }
      if (fn.type) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(this.call as any)[fn.module][fn.type]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this.call as any)[fn.module][fn.type] = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.call as any)[fn.module][fn.type][fn.name] = create_fn(
          `${fn.module}::${fn.type}::${fn.name}`,
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.call as any)[fn.module][fn.name] = create_fn(`${fn.module}::${fn.name}`);
      }
    }
  }

  /**
   * Initializes a GreyCat client using the given `options`.
   *
   * This method is asynchronous as it needs to download the ABI in order to communicate with the server.
   *
   * *If the `auth` property is given, a first call to `runtime::User::login` will be made before anything else.*
   *
   * *For `libraries`, specifying `stdlib` is not required as it will always be loaded by default.*
   *
   * @param options
   * @returns a GreyCat instance to initiate call requests to the backend.
   * @throws on IO and ABI parse errors
   */
  static async init(
    {
      name = 'default',
      url = DEFAULT_URL,
      libraries,
      capacity,
      cache,
      signal,
      auth,
      unauthorizedHandler,
      abiMismatchHandler,
    }: WithoutAbiOptions = { url: DEFAULT_URL },
  ): Promise<GreyCat> {
    const [data, token] = await downloadAbi({
      url,
      auth,
      capacity,
      cache,
      unauthorizedHandler,
      abiMismatchHandler,
      signal,
    });
    const abi = new Abi(data, libraries);
    const cleanUrl = normalizeUrl(url);

    const greycat = new GreyCat(
      cleanUrl,
      abi,
      capacity,
      cache,
      [],
      token,
      unauthorizedHandler,
      abiMismatchHandler,
    );

    try {
      greycat.permissions = await std.runtime.User.permissions(greycat);
    } catch (err) {
      // in case we cannot process the permissions, let's just warn about it and go on
      console.warn('unable to fetch User::permissions()', err);
    }

    // register the instance
    $[name] = greycat;

    return greycat;
  }

  static initWithAbi({
    name = 'default',
    url = DEFAULT_URL,
    capacity,
    cache,
    abi,
    token,
    unauthorizedHandler,
    abiMismatchHandler,
    permissions = [],
  }: WithAbiOptions): GreyCat {
    const greycat = new GreyCat(
      normalizeUrl(url),
      abi,
      capacity,
      cache,
      permissions,
      token,
      unauthorizedHandler,
      abiMismatchHandler,
    );
    $[name] = greycat;
    return greycat;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.indexOf(permission) !== -1;
  }

  async call<T = unknown>(
    method: string,
    args?: Value[] | ArrayBuffer,
    signal?: AbortSignal,
  ): Promise<T> {
    return this.rawCall(method, args, signal, false);
  }

  spawn(
    method: string,
    args?: Value[] | ArrayBuffer,
    signal?: AbortSignal,
  ): Promise<std.runtime.Task> {
    return this.rawCall<std.runtime.Task>(method, args, signal, true);
  }

  async spawnAwait<T = unknown>(
    method: string,
    args?: Value[] | ArrayBuffer,
    pollEvery?: number,
    signal?: AbortSignal,
  ): Promise<T> {
    const task = await this.rawCall<std.runtime.Task>(method, args, signal, true);
    return this.await(task, pollEvery, signal);
  }

  async await<T = unknown>(task: TaskLike, pollEvery?: number, signal?: AbortSignal): Promise<T> {
    let running = await std.runtime.Task.is_running(task.task_id, this, signal);
    // eslint-disable-next-line no-constant-condition
    while (running) {
      // re-fetch task info, on first fetch we only wait 250ms
      await sleep(pollEvery ?? 2000, signal);
      running = await std.runtime.Task.is_running(task.task_id, this, signal);
    }
    const [result] = await this.getFile<T>(
      `${task.user_id}/tasks/${task.task_id}/result.gcb`,
      signal,
    );
    if (result instanceof std.core.Error) {
      throw result;
    }
    return result;
  }

  /**
   * This method is used internally by: `call(...)`, `spawn(...)` and `spawnAwait(...)`.
   */
  async rawCall<T = unknown>(
    method: string,
    args?: Value[] | ArrayBuffer,
    signal?: AbortSignal,
    task = false,
    httpMethod = 'POST',
  ): Promise<T> {
    const url = `${this.api}/${method}`;
    let body: ArrayBuffer;
    if (args instanceof ArrayBuffer) {
      body = args;
    } else {
      const writer = new AbiWriter(this.abi, this.capacity);
      writer.headers();
      if (args && args.length > 0) {
        const fn = this.abi.fn_by_fqn.get(method);
        for (let i = 0; i < args.length; i++) {
          const param = fn?.params[i];
          const arg = args[i];
          if (!param) {
            writer.serialize(arg);
          } else if (param.type.offset === this.abi.core.float) {
            if (arg === null) {
              writer.null();
            } else if (typeof arg === 'number') {
              writer.float(arg as number);
            } else {
              writer.serialize(arg);
            }
          } else if (param.type.offset === this.abi.core.char) {
            if (arg === null) {
              writer.null();
            } else if (typeof arg === 'string') {
              writer.char(arg as string);
            } else {
              writer.serialize(arg);
            }
          } else if (param.type.generic_abi_type === this.abi.core.array && Array.isArray(arg)) {
            // monomorphic array
            writer.write_u8(PrimitiveType.object);
            writer.write_vu32(param.type.offset);
            writer.write_vu32(arg.length);
            writer.write_array(arg);
          } else if (param.type.generic_abi_type === this.abi.core.map && arg instanceof Map) {
            // monomorphic map
            writer.write_u8(PrimitiveType.object);
            writer.write_vu32(param.type.offset);
            writer.write_vu32(arg.size);
            writer.write_map(arg);
          } else if (
            param.type.generic_abi_type === this.abi.core.table &&
            arg instanceof core.Table
          ) {
            writer.write_u8(PrimitiveType.object);
            writer.write_vu32(param.type.offset);
            arg.saveContent(writer);
          } else {
            writer.serialize(arg);
          }
        }
      }
      body = writer.buffer.buffer;
    }
    const headers: HeadersInit = {
      accept: 'application/octet-stream',
      'content-type': 'application/octet-stream',
    };
    if (this.token) {
      headers['Authorization'] = this.token;
    }
    if (task) {
      headers['task'] = '';
    }
    const key: CacheKey = [method, body];
    const cachedRes = await this.cache.read(key);
    if (cachedRes) {
      headers['If-None-Match'] = cachedRes.etag;
    }
    const res = await fetch(url, {
      method: httpMethod,
      body: httpMethod === 'GET' ? undefined : body,
      headers,
      signal,
    });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.arrayBuffer();
      if (data.byteLength === 0) {
        return null as T;
      }
      const value = this.deserializeWithHeader(data);
      const etag = res.headers.get('etag');
      if (etag) {
        await this.cache.write(key, { etag, data });
      }
      debugLogger(res.status, method, args, value);
      return value as T;
    } else if (res.status === 304) {
      if (cachedRes === null) {
        // try again
        return this.rawCall(method, args, signal);
      }
      const value = this.deserializeWithHeader(cachedRes.data);
      debugLogger(res.status, method, args, value);
      return value as T;
    } else if (res.status === 401) {
      // unauthorized
      debugLogger(res.status, method, args);
      // reset token
      this.token = undefined;
      // call handler if any
      this.unauthorizedHandler?.();
      throw new Error(`you need to be logged-in to access '${method}'`);
    } else if (res.status === 403) {
      // forbidden
      debugLogger(res.status, method, args);
      throw new Error(`access to '${method}' is forbidden`);
    } else if (res.status === 404) {
      // not found
      debugLogger(res.status, method, args, null);
      throw new Error(`unknown method '${method}'`);
    } else if (res.status === 422) {
      // unprocessable content (abi mismatch)
      debugLogger(res.status, method, args);
      // call handler if any
      this.abiMismatchHandler?.();
      throw new Error('ABI mismatch error');
    }
    const data = await res.arrayBuffer();
    const value = this.deserializeWithHeader(data);
    const err = value as std.core.Error | null;
    debugLogger(res.status, method, args, value);
    if (err === null) {
      throw new Error(`calling '${method}' failed`);
    }
    throw new Error(`[greycat] ${err}\nCaused by: calling '${method}'`);
  }

  /**
   * Serializes the given `value` into ABI-compliant binary format.
   *
   * *If you want to re-use the write buffer, to reduce allocations, use `AbiWriter` directly*
   */
  serialize(value: Value): ArrayBuffer {
    const writer = new AbiWriter(this.abi, this.capacity);
    writer.serialize(value);
    return writer.buffer.buffer;
  }

  /**
   * Serializes the given `value` into ABI-compliant binary format.
   *
   * The returned buffer will also contain the ABI headers.
   *
   * @param value
   * @returns
   */
  serializeWithHeaders(value: Value): ArrayBuffer {
    const writer = new AbiWriter(this.abi, this.capacity);
    writer.headers();
    writer.serialize(value);
    return writer.buffer.buffer;
  }

  /**
   * Deserializes **one** value from the given `ArrayBuffer`.
   */
  deserialize(data: ArrayBuffer): Value {
    return new AbiReader(this.abi, data).deserialize();
  }

  /**
   * Deserializes all values from the given `ArrayBuffer`.
   */
  deserializeAll(data: ArrayBuffer): Value[] {
    return Array.from(new AbiReader(this.abi, data));
  }

  /**
   * Deserializes ABI headers, then deserializes **one** value from the given `ArrayBuffer`.
   *
   * If the headers do not match, `abiMismatchHandler` will be called if defined.
   *
   * *No matter what, the error will be thrown.*
   */
  deserializeWithHeader(data: ArrayBuffer): Value {
    const reader = new AbiReader(this.abi, data);
    try {
      reader.headers();
    } catch (err) {
      this.abiMismatchHandler?.();
      throw err;
    }
    return reader.deserialize();
  }

  /**
   * Deserializes the headers and all values from the given `ArrayBuffer`.
   */
  deserializeAllWithHeader(data: ArrayBuffer): [[number, number, number], Value[]] {
    const reader = new AbiReader(this.abi, data);
    const headers = reader.headers();
    const values = Array.from(reader);
    return [headers, values];
  }

  createReader(data: ArrayBuffer): AbiReader {
    return new AbiReader(this.abi, data);
  }

  /**
   * Downloads a file from GreyCat.
   *
   * Deserializes the content of the file based on the extension:
   *
   *  - `.gcb`: deserializes the payload as an array of GreyCat values if `filepath` ends with `.gcb`, returns the `ArrayBuffer` otherwise
   *  - `.json`: deserializes the payload as JSON
   *  - `others`: returns the payload as a string
   *
   * *This uses `getFileResponse(filepath, signal)` under-the-hood*.
   *
   * @param filepath eg. `path/to/file` *(do not include `/files/` in the path)*
   * @param signal optional `AbortSignal` to cancel the request prematurely
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getFile(filepath: string, signal?: AbortSignal) {
    const res = await this.getFileResponse(filepath, signal);
    if (filepath.endsWith('.json')) {
      return res.json();
    } else if (filepath.endsWith('.gcb')) {
      const data = await res.arrayBuffer();
      if (data.byteLength === 0) {
        return undefined;
      }
      const reader = new AbiReader(this.abi, data);
      reader.headers(); // TODO do not ignore headers
      return Array.from(reader);
    }
    return res.text();
  }

  /**
   * Request GreyCat for a file and returns the received `Response` on success.
   *
   * *This method should be used when you want to keep control over "how" to read the body bytes (eg. `res.text()`, `res.arrayBuffer()`, etc.).*
   *
   * @param filepath eg. `path/to/file` *(do not include `/files/` in the path)*
   * @param signal optional `AbortSignal` to cancel the request prematurely
   * @returns
   */
  async getFileResponse(filepath: string, signal?: AbortSignal): Promise<Response> {
    const route = `files/${filepath}`;
    const res = await fetch(`${this.api}/${route}`, { signal });
    if (res.ok) {
      debugLogger(res.status, route);
      return res;
    }
    if (res.status === 404) {
      debugLogger(res.status, route);
      throw new Error(`file '${filepath}' not found`);
    } else if (res.status === 403) {
      // forbidden
      debugLogger(res.status, route);
      throw new Error(`file '${filepath}' access forbidden`);
    } else if (res.status === 401) {
      // unauthorized
      debugLogger(res.status, route);
      this.token = undefined;
      this.unauthorizedHandler?.();
      throw new Error('unauthorized');
    }
    throw new Error(`unexpected error while getting file '${filepath}'`);
  }

  /**
   * Uploads a file to GreyCat.
   *
   * @param filepath eg. `path/to/file` *(do not include `/files/` in the path)*
   * @param file the file to upload
   * @param signal optional `AbortSignal` to cancel the request prematurely
   */
  async putFile(filepath: string, file: File, signal?: AbortSignal): Promise<void> {
    const route = `files/${filepath}`;
    const res = await fetch(`${this.api}/${route}`, { method: 'PUT', body: file, signal });
    if (res.ok) {
      return;
    }
    if (res.status === 403) {
      // forbidden
      debugLogger(res.status, route);
      throw new Error('forbidden');
    } else if (res.status === 401) {
      // unauthorized
      debugLogger(res.status, route);
      this.token = undefined;
      this.unauthorizedHandler?.();
      throw new Error('unauthorized');
    }
    throw new Error(`unexpected error while uploading file '${filepath}'`);
  }

  /**
   * Deletes a file from GreyCat.
   *
   * @param filepath eg. `path/to/file` *(do not include `/files/` in the path)*
   * @param signal optional `AbortSignal` to cancel the request prematurely
   */
  async deleteFile(filepath: string, signal?: AbortSignal): Promise<void> {
    const route = `files/${filepath}`;
    const res = await fetch(`${this.api}/${route}`, { method: 'DELETE', signal });
    if (res.ok) {
      return;
    }
    if (res.status === 403) {
      // forbidden
      debugLogger(res.status, route);
      throw new Error('forbidden');
    } else if (res.status === 401) {
      // unauthorized
      debugLogger(res.status, route);
      this.token = undefined;
      this.unauthorizedHandler?.();
      throw new Error('unauthorized');
    }
    throw new Error(`unexpected error while deleting file '${filepath}'`);
  }

  /**
   * Constructs a non-native type by resolving the AbiType from its fqn and passing in the attributes values
   * @param name non-native type fqn (eg. 'runtime::User')
   * @param attributes
   * @returns
   */
  create(name: string, attributes: Value[]): GCObject {
    return this.abi.create(name, attributes);
  }

  // createArray(arr: unknown[], generic_param_type?: { _type: string }) {
  //   if (generic_param_type) {
  //     const param_type = this.abi.type_by_fqn.get(generic_param_type._type);
  //     if (!param_type) {
  //       throw new Error(`unable to find type '${generic_param_type._type}'`);
  //     }

  //   }
  // }

  createGeo(lat: number, lng: number): std.core.geo {
    return this.abi.createGeo(lat, lng);
  }

  createFunctionByFqn(fqn: string): std.core.function_ {
    return this.abi.createFunctionByFqn(fqn);
  }

  createFunction(mod: string, type: string | undefined, name: string): std.core.function_ {
    return this.abi.createFunction(mod, type, name);
  }

  createNode(value: bigint): std.core.node {
    return this.abi.createNode(value);
  }

  createNodeList(value: bigint): std.core.nodeList {
    return this.abi.createNodeList(value);
  }

  createNodeIndex(value: bigint): std.core.nodeIndex {
    return this.abi.createNodeIndex(value);
  }

  createNodeGeo(value: bigint): std.core.nodeGeo {
    return this.abi.createNodeGeo(value);
  }

  createNodeTime(value: bigint): std.core.nodeTime {
    return this.abi.createNodeTime(value);
  }

  createTime(value: bigint | number): std.core.time {
    return this.abi.createTime(typeof value === 'bigint' ? value : BigInt(value));
  }

  createDuration(value: bigint | number): std.core.duration {
    return this.abi.createDuration(typeof value === 'bigint' ? value : BigInt(value));
  }

  createT2(x0: bigint | number, x1: bigint | number): std.core.t2 {
    return this.abi.createT2(x0, x1);
  }

  createT3(x0: bigint | number, x1: bigint | number, x2: bigint | number): std.core.t3 {
    return this.abi.createT3(x0, x1, x2);
  }

  createT4(
    x0: bigint | number,
    x1: bigint | number,
    x2: bigint | number,
    x3: bigint | number,
  ): std.core.t4 {
    return this.abi.createT4(x0, x1, x2, x3);
  }

  createStr(str: string) {
    return std.core.str.fromString(str, this);
  }

  createT2f(x0: number, x1: number): std.core.t2f {
    return this.abi.createT2f(x0, x1);
  }

  createT3f(x0: number, x1: number, x2: number): std.core.t3f {
    return this.abi.createT3f(x0, x1, x2);
  }

  createT4f(x0: number, x1: number, x2: number, x3: number): std.core.t4f {
    return this.abi.createT4f(x0, x1, x2, x3);
  }

  findType(fqn: string): AbiType | undefined {
    return this.abi.type_by_fqn.get(fqn);
  }

  findFn(fqn: string): AbiFunction | undefined {
    return this.abi.fn_by_fqn.get(fqn);
  }

  rootType(): AbiType {
    return this.abi.root();
  }

  root(signal?: AbortSignal): Promise<Record<string, unknown>> {
    return std.runtime.Runtime.root(this, signal);
  }

  /**
   * @returns an array of `AbiTypeEvol` for all `AbiType` that have been updated
   * according to the current ABI.
   */
  evolutions() {
    const evolutions: AbiTypeEvol[] = [];
    for (const ty of this.abi.types) {
      if (ty.masked_type_off === 0) {
        const evol = new AbiTypeEvol(ty);
        if (evol.size > 1) {
          evolutions.push(evol);
        }
      }
    }
    return evolutions;
  }
}

export type LoginOptions = Auth & {
  url?: URL;
  signal?: AbortSignal;
};

/**
 *
 * @param {LoginOptions} opts
 * @returns the user token
 */
export async function login({
  username,
  password,
  use_cookie = false,
  url = DEFAULT_URL,
  signal,
}: LoginOptions): Promise<string> {
  const credentials = btoa(`${username}:${sha256hex(password)}`);
  const body = JSON.stringify([credentials, use_cookie]);
  const res = await fetch(`${normalizeUrl(url)}/runtime::User::login`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal,
  });

  if (res.ok) {
    return (await res.json()) as string;
  }
  throw new Error(`unable to login (${res.status} ${res.statusText})`);
}

export type LogoutOptions = {
  url?: URL;
  signal?: AbortSignal;
};

/**
 * @param {LogoutOptions} opts
 */
export async function logout({ url = DEFAULT_URL, signal }: LogoutOptions = {}): Promise<void> {
  const res = await fetch(`${normalizeUrl(url)}/runtime::User::logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal,
  });
  if (res.ok) {
    return;
  }
  throw new Error(`unable to logout (${res.status} ${res.statusText})`);
}

/**
 * A cache impl that does nothing.
 */
class NoopCache implements Cache {
  async write(_key: CacheKey, _data: CacheData): Promise<void> {
    // noop
  }
  async read(_key: CacheKey): Promise<CacheData | null> {
    // noop
    return null;
  }
}

function normalizeUrl(url: URL): string {
  let end = url.href.length - 1;
  while (url.href[end] === '/') {
    end -= 1;
  }
  return url.href.slice(0, end + 1);
}

export class TaskCancelled extends Error {
  constructor(readonly task: TaskLike) {
    super(`task ${task.task_id} from user ${task.user_id} cancelled`);
  }
}

/**
 * Sleeps for `delay` milliseconds. Returns `true` if aborted; `false` otherwise.
 */
function sleep(delay: number, signal?: AbortSignal): Promise<boolean> {
  if (delay <= 0) {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => resolve(false), delay);
    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      resolve(true);
    });
  });
}
