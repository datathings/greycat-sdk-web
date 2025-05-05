namespace gc {
  /**
   * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
   *
   * *The name `'default'` is reserved and is used when initializing without a specific name*.
   */
  export const $: { [name: string]: sdk.GreyCat } = {};

  export namespace sdk {
    /** Defaults to `location.origin` when available, fallbacks to `'http://127.0.0.1:8080'` otherwise */
    export let DEFAULT_URL: URL;
    try {
      DEFAULT_URL = new URL(globalThis.location?.origin ?? 'http://127.0.0.1:8080');
    } catch {
      DEFAULT_URL = new URL('http://127.0.0.1:8080');
    }

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
     * Unregisters the global debug logger by replacing it with a no-op function and returns it.
     */
    export function unregisterDebugLogger(): DebugLogger {
      const logger = debugLogger;
      debugLogger = NOOP;
      return logger;
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
    export async function init(
      {
        name = 'default',
        url = DEFAULT_URL,
        capacity,
        cache,
        pollTasks,
        maxTasks,
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
        pollTasks,
        maxTasks,
        unauthorizedHandler,
        abiMismatchHandler,
        signal,
      });
      const abi = new Abi(data);
      const cleanUrl = normalizeUrl(url);

      const g = new GreyCat(
        cleanUrl,
        abi,
        capacity,
        cache,
        pollTasks,
        maxTasks,
        undefined,
        token,
        unauthorizedHandler,
        abiMismatchHandler,
      );

      try {
        g.roles = await runtime.Role.all(g);
      } catch (err) {
        // in case we cannot process the permissions, let's just warn about it and go on
        console.warn(err);
      }

      try {
        g.permissions = await runtime.User.permissions(g);
      } catch (err) {
        // in case we cannot process the permissions, let's just warn about it and go on
        console.warn(err);
      }

      // register the instance
      $[name] = g;

      return g;
    }

    export function initWithAbi({
      name = 'default',
      url = DEFAULT_URL,
      capacity,
      cache,
      pollTasks,
      maxTasks,
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
        pollTasks,
        maxTasks,
        permissions,
        token,
        unauthorizedHandler,
        abiMismatchHandler,
      );
      $[name] = greycat;
      return greycat;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
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
      call<T = unknown>(
        method: string,
        args?: Value[] | ArrayBuffer,
        signal?: AbortSignal,
      ): Promise<T>;

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
      ): Promise<runtime.Task>;

      /**
       * Spawns a GreyCat task and actively awaits for its completion.
       *
       * *This is equivalent to `gc.sdk.await(await gc.sdk.spawn(...))`*
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
      await<T = unknown>(task: sdk.TaskLike, pollEvery?: number, signal?: AbortSignal): Promise<T>;

      getFile<T = unknown>(
        filepath: `${string}.gcb`,
        offset?: number,
        max?: number,
        signal?: AbortSignal,
      ): Promise<T[]>;
      getFile<T = unknown>(
        filepath: string,
        offset?: number,
        max?: number,
        signal?: AbortSignal,
      ): Promise<T | T[]>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
    export class GreyCat {
      /** GreyCat's api endpoint normalized (does not contain a trailing slash) */
      readonly api: string;
      /** The current GreyCat ABI */
      readonly abi: Abi;
      /** used by `WriteBuffer` to initialize its capacity */
      readonly capacity: number;
      /** cache layer for request/response. Defaults to the `NoopCache`. */
      readonly cache: Cache;
      /** program roles & permissions */
      roles: gc.runtime.Role[] = [];
      /** server tasks, this list is automatically updated periodically */
      tasks: gc.runtime.Task[] = [];
      /** currently connected user permissions */
      permissions: string[];
      /** used when making authenticated requests */
      token: string | undefined;
      /** called when a request returns a status code 401 */
      unauthorizedHandler: (() => void) | undefined;
      /** called when a request has been sent with wrong ABI headers and therefore the response as status 422 */
      abiMismatchHandler: (() => void) | undefined;

      private _tasks_polling: number | undefined;
      private _tasks_polling_delay: number;
      private _max_tasks: number;
      private _fields_map: Map<string, AbiAttribute>;

      constructor(
        api: string,
        abi: Abi,
        capacity = 4096,
        cache: Cache = new NoopCache(),
        pollTasks = 0,
        maxTasks = 100,
        permissions: string[] = [],
        token?: string,
        unauthorizedHandler?: () => void,
        abiMismatchHandler?: () => void,
      ) {
        this.api = api;
        this.abi = abi;
        this.capacity = capacity;
        this.cache = cache;
        this._tasks_polling_delay = pollTasks;
        this._max_tasks = maxTasks;
        this.token = token;
        this.permissions = permissions;
        this.unauthorizedHandler = unauthorizedHandler;
        this.abiMismatchHandler = abiMismatchHandler;
        this._fields_map = new Map();

        // initialize runtime RPCs based on Abi
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const fn of this.abi.functions) {
          const theFn = (...raw_args: unknown[]) => {
            const args = new Array(fn.params.length);
            for (let i = 0; i < fn.params.length; i++) {
              args[i] = raw_args[i];
            }
            const g = (raw_args[fn.params.length] as GreyCat | undefined) ?? this;
            const signal = raw_args[fn.params.length + 1] as AbortSignal | undefined;
            return g.call(fn.fqn, args, signal);
          };
          Object.defineProperties(theFn, {
            name: {
              value: fn.fqn,
              writable: false,
              enumerable: false,
            },
            // spawn: {
            //   value: (...raw_args: unknown[]) => {
            //     const args = new Array(fn.params.length);
            //     for (let i = 0; i < fn.params.length; i++) {
            //       args[i] = raw_args[i];
            //     }
            //     const signal = raw_args[fn.params.length] as AbortSignal | undefined;
            //     return this.spawn(fn.fqn, args, signal);
            //   },
            // },
            // spawnAwait: {
            //   value: (...raw_args: unknown[]) => {
            //     const args = new Array(fn.params.length);
            //     for (let i = 0; i < fn.params.length; i++) {
            //       args[i] = raw_args[i];
            //     }
            //     const pollEvery = raw_args[fn.params.length] as number | undefined;
            //     const signal = raw_args[fn.params.length + 1] as AbortSignal | undefined;
            //     return this.spawnAwait(fn.fqn, args, pollEvery, signal);
            //   },
            // },
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!(gc as any)[fn.module]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (gc as any)[fn.module] = {};
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!(gc as any)[fn.module]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (gc as any)[fn.module] = {};
          }
          if (fn.type) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!(gc as any)[fn.module][fn.type]) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (gc as any)[fn.module][fn.type] = {};
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (gc as any)[fn.module][fn.type][fn.name] = theFn;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (gc as any)[fn.module][fn.name] = theFn;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (gc as any)[fn.name] = theFn;
          }
        }

        this.startPollingTasks();
      }

      stopPollingTasks(): void {
        clearInterval(this._tasks_polling);
      }

      startPollingTasks(): void {
        if (this._tasks_polling_delay <= 0) {
          return;
        }
        // trigger a poll right away
        this.pollTasks().catch(() => {
          // ignore errors
        });
        // and setup the interval
        this._tasks_polling = setInterval(() => {
          this.pollTasks().catch(() => {
            // ignore errors
          });
        }, this._tasks_polling_delay);
      }

      /**
       * Returns the latest known information about a task.
       *
       * @param id the `task_id` of a `gc.runtime.Task` object
       */
      getTask(id: number | bigint): gc.runtime.Task | undefined {
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].task_id === id) {
            return this.tasks[i];
          }
        }
        return;
      }

      async pollTasks(): Promise<void> {
        const logger = unregisterDebugLogger();
        const history = await gc.runtime.Task.history(0, this._max_tasks);
        const running = await gc.runtime.Task.running();
        registerDebugLogger(logger);

        this.tasks.length = 0;
        this.tasks.push(...history);
        this.tasks.push(...running);
      }

      hasPermission(permission: string): boolean {
        return this.permissions.indexOf(permission) !== -1;
      }

      call<T = unknown>(
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
      ): Promise<runtime.Task> {
        return this.rawCall<runtime.Task>(method, args, signal, true);
      }

      async spawnAwait<T = unknown>(
        method: string,
        args?: Value[] | ArrayBuffer,
        pollEvery?: number,
        signal?: AbortSignal,
      ): Promise<T> {
        const task = await this.rawCall<runtime.Task>(method, args, signal, true);
        return this.await(task, pollEvery, signal);
      }

      async await<T = unknown>(
        task: sdk.TaskLike,
        pollEvery?: number,
        signal?: AbortSignal,
      ): Promise<T> {
        const delay = pollEvery ?? 2000;
        let running = await runtime.Task.is_running(task.task_id, this, signal);
        // eslint-disable-next-line no-constant-condition
        while (running) {
          // re-fetch task info while running
          await sleep(delay, signal);
          running = await runtime.Task.is_running(task.task_id, this, signal);
        }

        // download and parse 'result.gcb' if found
        const result_route = `files/${task.user_id}/tasks/${task.task_id}/result.gcb`;
        const url = new URL(`${this.api}/${result_route}`);
        const res = await fetch(url, { signal });
        if (res.ok) {
          debugLogger(res.status, url.pathname);
          const data = await res.arrayBuffer();
          if (data.byteLength === 0) {
            return undefined as T;
          }
          const reader = new AbiReader(this.abi, data);
          reader.headers(); // TODO do not ignore headers
          const value = reader.deserialize();
          if (!reader.is_empty) {
            throw new Error(`The request buffer for '${result_route}' has bytes left in it`);
          }
          if (value instanceof core.Error) {
            throw value;
          }
          return value as T;
        }
        if (res.status === 404) {
          debugLogger(res.status, url.pathname);
          // 404 on result.gcb might probably mean that the task returned 'void', therefore we do not fail in this case
          return undefined as T;
        } else if (res.status === 403) {
          // forbidden
          debugLogger(res.status, url.pathname);
          throw new Error(`file '${result_route}' access forbidden`);
        } else if (res.status === 401) {
          // unauthorized
          debugLogger(res.status, url.pathname);
          this.token = undefined;
          this.unauthorizedHandler?.();
          throw new Error('unauthorized');
        }
        throw new Error(`unexpected error while getting file '${result_route}'`);
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
          const fn = this.abi.fn_by_fqn.get(method);
          if (!fn) {
            throw new Error(`function '${method}' is not registered in the abi`);
          }
          body = fn.serialize(args, this.capacity);
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
        const err = value as core.Error | null;
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
       * Downloads a file from gc.sdk.
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
       * @param offset download the file starting at this offset
       * @param max download as much as `max` bytes (might be less than or equal to)
       * @param signal optional `AbortSignal` to cancel the request prematurely
       * @returns
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async getFile(filepath: string, offset?: number, max?: number, signal?: AbortSignal) {
        const res = await this.getFileResponse(filepath, offset, max, signal);
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
       * @param offset download the file starting at this offset
       * @param max download as much as `max` bytes (might be less than or equal to)
       * @param signal optional `AbortSignal` to cancel the request prematurely
       * @returns
       */
      async getFileResponse(
        filepath: string,
        offset?: number,
        max?: number,
        signal?: AbortSignal,
      ): Promise<Response> {
        const route = `files/${filepath}`;
        const url = new URL(`${this.api}/${route}`);
        if (offset !== undefined) {
          url.searchParams.set('offset', `${offset}`);
        }
        if (max !== undefined) {
          url.searchParams.set('max', `${max}`);
        }
        const res = await fetch(url, { signal });
        if (res.ok) {
          debugLogger(res.status, url.pathname + url.search);
          return res;
        }
        if (res.status === 404) {
          debugLogger(res.status, url.pathname + url.search);
          throw new Error(`file '${filepath}' not found`);
        } else if (res.status === 403) {
          // forbidden
          debugLogger(res.status, url.pathname + url.search);
          throw new Error(`file '${filepath}' access forbidden`);
        } else if (res.status === 401) {
          // unauthorized
          debugLogger(res.status, url.pathname + url.search);
          this.token = undefined;
          this.unauthorizedHandler?.();
          throw new Error('unauthorized');
        }
        throw new Error(`unexpected error while getting file '${filepath}'`);
      }

      /**
       * Uploads a file to gc.sdk.
       *
       * @param filepath eg. `path/to/file` *(do not include `/files/` in the path)*
       * @param file the file to upload
       * @param signal optional `AbortSignal` to cancel the request prematurely
       */
      async putFile(filepath: string, file: globalThis.File, signal?: AbortSignal): Promise<void> {
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
       * Deletes a file from gc.sdk.
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

      createGeo(lat: number, lng: number): core.geo {
        return this.abi.createGeo(lat, lng);
      }

      createFunctionByFqn(fqn: string): core.function_ {
        return this.abi.createFunctionByFqn(fqn);
      }

      createFunction(mod: string, type: string | undefined, name: string): core.function_ {
        return this.abi.createFunction(mod, type, name);
      }

      createNode(value: bigint): core.node {
        return this.abi.createNode(value);
      }

      createNodeList(value: bigint): core.nodeList {
        return this.abi.createNodeList(value);
      }

      createNodeIndex(value: bigint): core.nodeIndex {
        return this.abi.createNodeIndex(value);
      }

      createNodeGeo(value: bigint): core.nodeGeo {
        return this.abi.createNodeGeo(value);
      }

      createNodeTime(value: bigint): core.nodeTime {
        return this.abi.createNodeTime(value);
      }

      createTime(value: bigint | number): core.time {
        return this.abi.createTime(typeof value === 'bigint' ? value : BigInt(value));
      }

      createDuration(value: bigint | number): core.duration {
        return this.abi.createDuration(typeof value === 'bigint' ? value : BigInt(value));
      }

      createT2(x0: bigint | number, x1: bigint | number): core.t2 {
        return this.abi.createT2(x0, x1);
      }

      createT3(x0: bigint | number, x1: bigint | number, x2: bigint | number): core.t3 {
        return this.abi.createT3(x0, x1, x2);
      }

      createT4(
        x0: bigint | number,
        x1: bigint | number,
        x2: bigint | number,
        x3: bigint | number,
      ): core.t4 {
        return this.abi.createT4(x0, x1, x2, x3);
      }

      createStr(str: string) {
        return core.str.fromString(str, this);
      }

      createT2f(x0: number, x1: number): core.t2f {
        return this.abi.createT2f(x0, x1);
      }

      createT3f(x0: number, x1: number, x2: number): core.t3f {
        return this.abi.createT3f(x0, x1, x2);
      }

      createT4f(x0: number, x1: number, x2: number, x3: number): core.t4f {
        return this.abi.createT4f(x0, x1, x2, x3);
      }

      findType(fqn: gc.$Types): AbiType | undefined {
        return this.abi.type_by_fqn.get(fqn);
      }

      findFn(fqn: gc.$Functions): AbiFunction | undefined {
        return this.abi.fn_by_fqn.get(fqn);
      }

      findField(fqn: gc.$Fields): AbiAttribute | undefined {
        let field = this._fields_map.get(fqn);
        if (field) {
          return field;
        }
        const last_dcolon = fqn.lastIndexOf('::');
        if (last_dcolon === -1) {
          return undefined;
        }
        const type_fqn = fqn.slice(0, last_dcolon);
        const type = this.findType(type_fqn);
        if (!type) {
          return undefined;
        }
        const field_name = fqn.slice(last_dcolon + 2);
        field = type.attrs.find((a) => a.name === field_name);
        if (field) {
          this._fields_map.set(fqn, field);
        }
        return field;
      }

      rootType(): AbiType {
        return this.abi.root();
      }

      root(signal?: AbortSignal): Promise<Record<string, unknown>> {
        return runtime.Runtime.root(this, signal);
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

    /**
     * Sleeps for `delay` milliseconds. Returns `true` if aborted; `false` otherwise.
     */
    export function sleep(delay: number, signal?: AbortSignal): Promise<boolean> {
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

    export function normalizeUrl(url: URL): string {
      let end = url.href.length - 1;
      while (url.href[end] === '/') {
        end -= 1;
      }
      return url.href.slice(0, end + 1);
    }
  }
}
