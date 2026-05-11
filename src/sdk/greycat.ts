namespace gc {
  /**
   * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
   *
   * *The name `'default'` is reserved and is used when initializing without a specific name*.
   */
  export const $: { [name: string]: sdk.GreyCat } = {};

  export namespace sdk {
    /**
     * Registers a GreyCat instance in the map of all known instances: `gc.$`
     */
    export function register(name: string, greycat: GreyCat): void {
      $[name] = greycat;
    }

    /**
     * Removes the GreyCat instance from the map of all known instances
     */
    export function unregister(name: string): void {
      delete $[name];
    }

    function initialize_functions(name: string, g: GreyCat): void {
      for (const fn of g.abi.functions) {
        const call = (...args: unknown[]) => {
          // oxlint-disable-next-line no-new-array
          const args_ = new Array(fn.params.length);
          for (let i = 0; i < fn.params.length; i++) {
            args_[i] = args[i];
          }
          const g = (args[fn.params.length] as GreyCat | undefined) ?? gc.$[name];
          const signal = args[fn.params.length + 1] as AbortSignal | undefined;
          return g.call(fn.fqn, args_, signal);
        };
        Object.defineProperty(call, 'name', {
          value: fn.fqn,
          writable: false,
          enumerable: false,
        });
        const spawn = (...args: unknown[]) => {
          // oxlint-disable-next-line no-new-array
          const args_ = new Array(fn.params.length);
          for (let i = 0; i < fn.params.length; i++) {
            args_[i] = args[i];
          }
          const g = (args[fn.params.length] as GreyCat | undefined) ?? gc.$[name];
          const signal = args[fn.params.length + 1] as AbortSignal | undefined;
          return g.spawn(fn.fqn, args_, signal);
        };
        Object.defineProperty(spawn, 'name', {
          value: `task#${fn.fqn}`,
          writable: false,
          enumerable: false,
        });
        Object.defineProperty(call, 'spawn', { value: spawn });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalGc = gc as any;
        if (!globalGc[fn.module]) {
          globalGc[fn.module] = {};
        }
        if (fn.type) {
          if (!globalGc[fn.module][fn.type]) {
            globalGc[fn.module][fn.type] = {};
          }
          globalGc[fn.module][fn.type][fn.name] = call;
        } else {
          globalGc[fn.module][fn.name] = call;
          if (globalGc[fn.name] === undefined) {
            globalGc[fn.name] = call;
          }
        }
      }
    }

    export const DEFAULT_URL = new URL('http://127.0.0.1:8080');

    const findGreyCat = async () => {
      if (globalThis.location === undefined) {
        // In Node.js context we do not have a location, therefore we use the default
        return DEFAULT_URL;
      }

      // in a browser context, we can try to find the best candidate by walking up the pathname
      const opts = { method: 'POST' };
      const attempts = location.pathname.split('/').length - 1;
      let prefix = '.';
      for (let i = 0; i < attempts; i++) {
        const res = await fetch(`${prefix}/runtime::Identity::current_id`, opts);
        if (res.status === 401 || res.status === 200) {
          let url: URL;
          if (location.pathname.endsWith('/')) {
            url = new URL(`${location.origin}${location.pathname}${prefix}`);
          } else {
            url = new URL(`${location.origin}${location.pathname}/${prefix}/..`);
          }
          return url;
        }
        prefix += '/..';
      }
      // unable to discover the endpoint, fallback to the default
      return DEFAULT_URL;
    };

    const NOOP_LOGGER = (): void => void 0;
    export const DEFAULT_LOGGER = (
      name: string,
      status: number,
      method: string,
      args?: unknown,
      value?: unknown,
    ): void => {
      const bg = status >= 400 ? '#e8590c' : '#1983c1';
      console.log(
        '%cGreyCat',
        `background:${bg};color:#fff;padding:2px;font-weight:bold`,
        `[${name}]`,
        {
          method,
          args,
          response: value,
        },
      );
    };
    export type DebugLogger = typeof DEFAULT_LOGGER;

    /**
     * @returns {[ArrayBuffer, string | undefined]} returns a tuple containing the ABI data and optionally the token if a login has occured
     */
    export async function downloadAbi(
      options: WithoutAbiOptions = {},
      logger: DebugLogger,
    ): Promise<[ArrayBuffer, string | undefined]> {
      const { auth, signal, cache, unauthorizedHandler, url = await findGreyCat() } = options;
      let token: string | undefined;

      if (auth) {
        if ('username' in auth) {
          token = await login({ ...auth, url, signal });
        } else {
          token = auth.token;
        }
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
        credentials: 'include',
        signal,
      });
      if (res.status === 401) {
        // unauthorized
        logger('_', res.status, method);
        // call handler if any
        unauthorizedHandler?.();
        throw new Error(`you need to be logged-in to access '${method}'`);
      } else if (res.status === 304) {
        if (cachedRes) {
          return [cachedRes.data, token];
        } else {
          // re-attempt
          return downloadAbi(
            {
              auth,
              cache,
              signal,
              unauthorizedHandler,
              url,
            },
            logger,
          );
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
     * *If the `auth` property is given, a first call to `runtime::Identity::login` will be made before anything else.*
     *
     * *For `libraries`, specifying `stdlib` is not required as it will always be loaded by default.*
     *
     * @param options
     * @returns a GreyCat instance to initiate call requests to the backend.
     * @throws on IO and ABI parse errors
     */
    export async function init(options: WithoutAbiOptions = {}): Promise<GreyCat> {
      const {
        name = 'default',
        url = await findGreyCat(),
        timezone,
        numFmt,
        cache,
        maxTasks,
        signal,
        auth,
        debug = false,
        unauthorizedHandler,
        abiMismatchHandler,
      } = options;
      const logger = debug ? DEFAULT_LOGGER : NOOP_LOGGER;

      const [data, token] = await downloadAbi(
        {
          url,
          auth,
          cache,
          maxTasks,
          unauthorizedHandler,
          abiMismatchHandler,
          signal,
        },
        logger,
      );
      const abi = new Abi(data);
      const cleanUrl = normalizeUrl(url);

      const wasm = await compileWasm();

      const g = new GreyCat(
        name,
        logger,
        cleanUrl,
        abi,
        wasm.module,
        wasm.instance.exports as unknown as gc.sdk.GreyCatWasmExports,
        timezone,
        numFmt,
        cache,
        maxTasks,
        undefined,
        token,
        unauthorizedHandler,
        abiMismatchHandler,
      );

      register(name, g);
      initialize_functions(name, g);

      try {
        g.permissions = await runtime.Identity.permissions(g);
      } catch {
        // we probably don't have the permission to access this endpoint
      }

      return g;
    }

    export function initWithAbi({
      name = 'default',
      debug = false,
      timezone,
      numFmt,
      cache,
      maxTasks,
      abi,
      module,
      exports,
      token,
      unauthorizedHandler,
      abiMismatchHandler,
      permissions = [],
      url = DEFAULT_URL,
    }: WithAbiOptions): GreyCat {
      const g = new GreyCat(
        name,
        debug ? DEFAULT_LOGGER : NOOP_LOGGER,
        normalizeUrl(url),
        abi,
        module,
        exports,
        timezone,
        numFmt,
        cache,
        maxTasks,
        permissions,
        token,
        unauthorizedHandler,
        abiMismatchHandler,
      );
      // register the instance
      register(name, g);
      // initialize runtime RPCs based on Abi
      initialize_functions(name, g);
      return g;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
    export interface GreyCat {
      /**
       * The generic param `T` is there only for convenience as no runtime checks are made on the deserialized value.
       *
       * @param method the exposed GreyCat function to call, without leading slash
       * (eg. `'runtime::Identity::current_id'`)
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
       * (eg. `'runtime::Identity::current_id'`)
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
       * (eg. `'runtime::Identity::current_id'`)
       * @param args the function's arguments to send along.
       *             If `args` is an `Array` it will be serialized with `AbiWriter` to the ABI-compliant bytes for you.
       *             If `args` is an `ArrayBuffer`, the bytes will be sent as-is.
       * @param opts configuration options for the wait
       * @param signal an optional `AbortSignal` to cancel the underlying fetch call
       */
      spawnAwait<T = unknown>(
        method: string,
        args?: Value[] | ArrayBuffer,
        opts?: sdk.TaskOptions,
        signal?: AbortSignal,
      ): Promise<T>;

      /**
       * Awaits the completion of the given GreyCat task.
       */
      await<T = unknown>(
        task: sdk.TaskLike<T>,
        opts?: sdk.TaskOptions,
        signal?: AbortSignal,
      ): Promise<T>;

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
      /**
       * Emitted everytime a task is spawn on this instance
       */
      on(ev: 'task', callback: sdk.EmitterCallback<gc.runtime.Task>): sdk.EmitterDisposable;
      /**
       * Emitted everytime this instance polls for tasks.
       * The array only contains the current history of tasks
       */
      on(
        ev: 'tasks-history',
        callback: sdk.EmitterCallback<gc.runtime.Task[]>,
      ): sdk.EmitterDisposable;
      /**
       * Emitted everytime this instance polls for tasks.
       * The array only contains the current running tasks
       */
      on(
        ev: 'tasks-running',
        callback: sdk.EmitterCallback<gc.runtime.Task[]>,
      ): sdk.EmitterDisposable;
      /**
       * Emitted everytime this instance polls for tasks.
       * The array contains the history and the running tasks
       */
      on(ev: 'tasks', callback: sdk.EmitterCallback<gc.runtime.Task[]>): sdk.EmitterDisposable;
    }

    interface GreyCatEvents {
      // prettier-ignore
      'task': gc.runtime.Task;
      'tasks-history': gc.runtime.Task[];
      'tasks-running': gc.runtime.Task[];
      // prettier-ignore
      'tasks': gc.runtime.Task[];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
    export class GreyCat extends sdk.Emitter<GreyCatEvents> {
      /** This instance name (must be the name registered in `gc.$`) */
      readonly name: string;
      /** GreyCat's api endpoint normalized (does not contain a trailing slash) */
      readonly api: string;
      /** The current GreyCat ABI */
      readonly abi: Abi;
      /** cache layer for request/response. Defaults to the `NoopCache`. */
      readonly cache: Cache;
      /** the default timezone of this instance */
      timezone: gc.core.TimeZone;
      /** the number formatter of this instance */
      numFmt: Intl.NumberFormat;
      /** server tasks, this list is automatically updated periodically */
      tasks: gc.runtime.Task[] = [];
      /** currently connected user permissions */
      permissions: string[];
      /** GreyCat Wasm Module */
      readonly module: WebAssembly.Module;
      /** GreyCat Wasm Exports */
      private _exports: GreyCatWasmExports;
      /** used when making authenticated requests */
      token: string | undefined;
      /** called when a request returns a status code 401 */
      unauthorizedHandler: (() => void) | undefined;
      /** called when a request has been sent with wrong ABI headers and therefore the response as status 422 */
      abiMismatchHandler: (() => void) | undefined;
      logger: DebugLogger;

      /** Re-used by the serialize methods to prevent re-allocations */
      private _writer: sdk.AbiWriter;
      private _max_tasks: number;
      private _fields_map: Map<string, AbiAttribute>;
      private _poll: gc.sdk.Poll;
      private _debug_id: number | bigint | undefined;

      constructor(
        name: string,
        logger: DebugLogger,
        api: string,
        abi: Abi,
        module: WebAssembly.Module,
        exports: GreyCatWasmExports,
        timezone: gc.core.TimeZone.Field | undefined,
        numFmt: Intl.NumberFormat | undefined,
        cache: Cache = new NoopCache(),
        maxTasks = 100,
        permissions: string[] = [],
        token?: string,
        unauthorizedHandler?: () => void,
        abiMismatchHandler?: () => void,
      ) {
        super();

        this.name = name;
        this.logger = logger;
        this.api = api;
        this.abi = abi;
        this.cache = cache;
        this._max_tasks = maxTasks;
        this.token = token;
        this.permissions = permissions;
        this.module = module;
        this._exports = exports;
        this._writer = new sdk.AbiWriter(abi, 4096);
        this.unauthorizedHandler = unauthorizedHandler;
        this.abiMismatchHandler = abiMismatchHandler;
        this._fields_map = new Map();
        this._poll = new sdk.Poll(async () => {
          try {
            await this.pollTasks();
          } catch {
            /* noop */
          }
        });

        if (timezone === undefined) {
          this.timezone =
            gc.core.TimeZone[
              new Intl.DateTimeFormat().resolvedOptions().timeZone as gc.core.TimeZone.Field
            ];
        } else {
          this.timezone = gc.core.TimeZone[timezone];
        }

        this.numFmt = numFmt ?? new Intl.NumberFormat(navigator.language, {});
      }

      clone(name: string): GreyCat {
        const greycat = new GreyCat(
          name,
          this.logger,
          this.api,
          this.abi,
          this.module,
          this._exports,
          this.timezone.key,
          this.numFmt,
          this.cache,
          this._max_tasks,
          this.permissions,
          this.token,
          this.unauthorizedHandler,
          this.abiMismatchHandler,
        );
        register(name, greycat);
        return greycat;
      }

      setDebugId(id: number | bigint | undefined) {
        this._debug_id = id;
      }

      isPollingTasks(): boolean {
        return this._poll.isRunning();
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

      /**
       * Subscribes to task updates that occur at least every `everyMs` milliseconds.
       *
       * GreyCat manages a single shared poller for all subscriptions. The backend is polled at the
       * fastest interval requested by any subscriber, and all registered callbacks are invoked at
       * that same frequency with the latest list of tasks.
       *
       * This lets multiple components receive up-to-date task data without each performing its own
       * network fetch — the polling is multiplexed through GreyCat.
       *
       * If you only need to react when tasks are refreshed (without triggering polling yourself),
       * use the event emitter directly via `greycat.on('tasks', ...)`.
       *
       * *Note that GreyCat will only start polling for tasks if at least one subscription exists
       * and will stop polling for tasks when the last subscription is disposed*
       *
       * @param everyMs Desired polling interval in milliseconds
       * @param callback Function called with the updated list of tasks
       * @returns A function that unsubscribes from the poller when invoked
       */
      subscribeToTaskPoll(everyMs: number, callback: (tasks: gc.runtime.Task[]) => void) {
        const id = this._poll.register(everyMs);
        const dispose = this.on('tasks', callback);
        return () => {
          this._poll.unregister(id);
          dispose();
        };
      }

      /**
       * Manually trigger a fetch of the `runtime::Task::history` and `runtime::Task::running`.
       *
       * *Calling this will also emit tasks events*
       */
      async pollTasks(): Promise<gc.runtime.Task[]> {
        const logger = this.unregisterLogger();
        const history = await gc.runtime.Task.history(0, this._max_tasks);
        this.registerLogger(logger);
        this.emit('tasks-history', history);

        const logger2 = this.unregisterLogger();
        const running = await gc.runtime.Task.running();
        this.registerLogger(logger2);
        this.emit('tasks-running', running);

        this.tasks.length = 0;
        this.tasks.push(...history);
        this.tasks.push(...running);

        this.emit('tasks', this.tasks);

        return this.tasks;
      }

      unregisterLogger(): DebugLogger {
        const logger = this.logger;
        this.logger = NOOP_LOGGER;
        return logger;
      }

      registerLogger(logger: DebugLogger): void {
        this.logger = logger;
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
        opts?: sdk.TaskOptions,
        signal?: AbortSignal,
      ): Promise<T> {
        const task = await this.rawCall<runtime.Task>(method, args, signal, true);
        return this.await(task, opts, signal);
      }

      async await<T = unknown>(
        task: sdk.TaskLike<T>,
        opts: sdk.TaskOptions = {},
        signal?: AbortSignal,
      ): Promise<T> {
        // trigger a poll right away to improve UX
        await this.pollTasks();

        const updated = this.getTask(task.task_id);
        if (updated === undefined || isTaskRunning(updated)) {
          const poll_id = this._poll.register(opts.pollEvery ?? 500);
          const { promise, resolve } = Promise.withResolvers<void>();
          const disposeTaskPollUpdate = this.on('tasks', async (tasks) => {
            const updated = tasks.find((t) => t.task_id === task.task_id);
            if (updated) {
              if (!isTaskRunning(updated)) {
                disposeTaskPollUpdate();
                resolve();
                return;
              }
              opts.onprogress?.(updated.progress);
            }
          });
          await promise; // wait for completion
          this._poll.unregister(poll_id);
        }

        opts.onprogress?.(1);

        // download and parse 'result.gcb' if found
        const result_route = `files/${task.user_id}/tasks/${task.task_id}/result.gcb`;
        const url = new URL(`${this.api}/${result_route}`);
        const res = await fetch(url, { signal });
        if (res.ok) {
          this.logger(this.name, res.status, url.pathname);
          const data = await res.arrayBuffer();
          if (data.byteLength === 0) {
            return undefined as T;
          }
          const reader = new AbiReader(this.abi, data);
          const value = reader.deserializeWithHeaders();
          if (!reader.is_empty) {
            throw new Error(`The request buffer for '${result_route}' has bytes left in it`);
          }
          if (value instanceof core.Error) {
            throw value;
          }
          return value as T;
        }
        if (res.status === 404) {
          this.logger(this.name, res.status, url.pathname);
          // 404 on result.gcb might probably mean that the task returned 'void', therefore we do not fail in this case
          return undefined as T;
        } else if (res.status === 403) {
          // forbidden
          this.logger(this.name, res.status, url.pathname);
          throw new Error(`file '${result_route}' access forbidden`);
        } else if (res.status === 401) {
          // unauthorized
          this.logger(this.name, res.status, url.pathname);
          this.token = undefined;
          this.unauthorizedHandler?.();
          throw new Error('unauthorized');
        }
        throw new Error(`unexpected error while getting file '${result_route}'`);
      }

      /**
       * This method is used internally by: `call(...)`, `spawn(...)` and `spawnAwait(...)`.
       *
       * @param uri the uri of the method to call (eg. `runtime::Identity::current_id`)
       * @param args the arguments of the method to call
       * @param signal an `AbortSignal` to cancel the request on demand
       * @param task whether or not to call the method as a task (defaults to `false`)
       * @param httpMethod the http method to use (defaults to `POST`)
       */
      async rawCall<T = unknown>(
        uri: string,
        args?: Value[] | ArrayBuffer,
        signal?: AbortSignal,
        task = false,
        httpMethod: 'POST' | 'GET' = 'POST',
      ): Promise<T> {
        const url = `${this.api}/${uri}`;
        let body: ArrayBuffer;
        if (args instanceof ArrayBuffer) {
          body = args;
        } else if (httpMethod === 'POST') {
          const fn = this.abi.fn_by_fqn.get(uri);
          if (!fn) {
            throw new Error(`function '${uri}' is not registered in the abi`);
          }
          body = fn.serialize(args);
        } else {
          body = this.serialize(args);
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
        if (this._debug_id !== undefined) {
          headers['task'] = '';
          headers['x-gc-debug'] = `${this._debug_id}`;
        }
        const key: CacheKey = [uri, body];
        const cachedRes = await this.cache.read(key);
        if (cachedRes) {
          headers['If-None-Match'] = cachedRes.etag;
        }
        const init: RequestInit = { method: httpMethod, headers, signal };
        if (httpMethod === 'POST') {
          init.body = body;
        }
        const res = await fetch(url, init);
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
          this.logger(this.name, res.status, uri, args, value);
          if (task) {
            this.emit('task', value as gc.runtime.Task);
          }
          if (this._debug_id !== undefined) {
            if (value instanceof gc.runtime.Task) {
              return (value as gc.runtime.Task<T>).result(undefined, $.default);
            } else {
              throw new Error(`expecting a core.Task response when debugId is set`);
            }
          }
          return value as T;
        } else if (res.status === 304) {
          if (cachedRes === null) {
            // try again
            return this.rawCall(uri, args, signal);
          }
          const value = this.deserializeWithHeader(cachedRes.data);
          this.logger(this.name, res.status, uri, args, value);
          return value as T;
        } else if (res.status === 401) {
          // unauthorized
          this.logger(this.name, res.status, uri, args);
          // reset token
          this.token = undefined;
          // call handler if any
          this.unauthorizedHandler?.();
          throw new Error(`you need to be logged-in to access '${uri}'`);
        } else if (res.status === 403) {
          // forbidden
          this.logger(this.name, res.status, uri, args);
          throw new Error(`access to '${uri}' is forbidden`);
        } else if (res.status === 404) {
          // not found
          this.logger(this.name, res.status, uri, args, null);
          throw new Error(`unknown method '${uri}'`);
        } else if (res.status === 422) {
          // unprocessable content (abi mismatch)
          this.logger(this.name, res.status, uri, args);
          // call handler if any
          this.abiMismatchHandler?.();
          throw new Error('ABI mismatch error');
        }
        const data = await res.arrayBuffer();
        const value = this.deserializeWithHeader(data);
        const err = value as core.Error | null;
        this.logger(this.name, res.status, uri, args, value);
        if (err === null) {
          throw new Error(`calling '${uri}' failed`);
        }
        throw new Error(`[greycat] ${err}\nCaused by: calling '${uri}'`);
      }

      /**
       * Serializes the given `value` into ABI-compliant binary format.
       */
      serialize(value: Value): ArrayBuffer {
        this._writer.clear();
        this._writer.serialize(value);
        return this._writer.buffer.buffer; // a slice copy of the writer buffer
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
        this._writer.clear();
        this._writer.headers();
        this._writer.serialize(value);
        return this._writer.buffer.buffer; // a slice copy of the writer buffer
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
       * Downloads a file from GreyCat
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
          this.logger(this.name, res.status, url.pathname + url.search);
          return res;
        }
        if (res.status === 404) {
          this.logger(this.name, res.status, url.pathname + url.search);
          throw new Error(`file '${filepath}' not found`);
        } else if (res.status === 403) {
          // forbidden
          this.logger(this.name, res.status, url.pathname + url.search);
          throw new Error(`file '${filepath}' access forbidden`);
        } else if (res.status === 401) {
          // unauthorized
          this.logger(this.name, res.status, url.pathname + url.search);
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
          this.logger(this.name, res.status, route);
          throw new Error('forbidden');
        } else if (res.status === 401) {
          // unauthorized
          this.logger(this.name, res.status, route);
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
          this.logger(this.name, res.status, route);
          throw new Error('forbidden');
        } else if (res.status === 401) {
          // unauthorized
          this.logger(this.name, res.status, route);
          this.token = undefined;
          this.unauthorizedHandler?.();
          throw new Error('unauthorized');
        }
        throw new Error(`unexpected error while deleting file '${filepath}'`);
      }

      /**
       * Constructs a non-native type by resolving the AbiType from its fqn and passing in the attributes values
       * @param name non-native type fqn (eg. 'runtime::Identity')
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

      findType(fqn: gc.$Types): AbiType | undefined {
        return this.abi.type_by_fqn.get(fqn);
      }

      findFn(fqn: gc.$Functions): AbiFunction | undefined {
        return this.abi.fn_by_fqn.get(fqn);
      }

      /**
       * Just like `findField` but will throw if unable to find the field
       * @param fqn
       * @returns
       */
      field(fqn: gc.$Fields): AbiAttribute {
        let field = this._fields_map.get(fqn);
        if (field) {
          return field;
        }
        const last_dcolon = fqn.lastIndexOf('::');
        if (last_dcolon === -1) {
          throw new Error(`malformed fqn (expecting: "module::type::field_name")`);
        }
        const type_fqn = fqn.slice(0, last_dcolon);
        const type = this.findType(type_fqn);
        if (!type) {
          throw new Error(`unknown type '${type_fqn}'`);
        }
        const field_name = fqn.slice(last_dcolon + 2);
        field = type.attrs.find((a) => a.name === field_name);
        if (field) {
          this._fields_map.set(fqn, field);
          return field;
        }
        throw new Error(`unknown type field '${fqn}'`);
      }

      findField(fqn: gc.$Fields): AbiAttribute | undefined {
        let field = this._fields_map.get(fqn);
        if (field) {
          return field;
        }
        const last_dcolon = fqn.lastIndexOf('::');
        if (last_dcolon === -1) {
          return;
        }
        const type_fqn = fqn.slice(0, last_dcolon);
        const type = this.findType(type_fqn);
        if (!type) {
          return;
        }
        const field_name = fqn.slice(last_dcolon + 2);
        field = type.attrs.find((a) => a.name === field_name);
        if (field) {
          this._fields_map.set(fqn, field);
          return field;
        }
        return;
      }

      /**
       * Just like `findFieldOffset` but will throw if unable to find the field
       * @param fqn
       * @returns
       */
      fieldOffset(fqn: gc.$Fields): number {
        return this.field(fqn).mapped_att_offset;
      }

      findFieldOffset(fqn: gc.$Fields): number | undefined {
        const attr = this.findField(fqn);
        if (attr) {
          return attr.mapped_att_offset;
        }
        return;
      }

      rootType(): AbiType {
        return this.abi.root();
      }

      root(signal?: AbortSignal): Promise<gc.project.Root> {
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

      parseTime(isoDate: string, tz = this.timezone): gc.core.time {
        // NOTE:
        // Wasm uses its stack backwards, starting by default at 1 page (64KB)
        // and going down towards 0. So we use the bottom of the stack for our data passing
        const res_ptr = 0;
        const str_ptr = 8;
        const dv = new DataView(this._exports.memory.buffer);

        dv.setBigInt64(res_ptr, 0n, true);

        const str_buf = new Uint8Array(this._exports.memory.buffer, str_ptr, isoDate.length);
        new TextEncoder().encodeInto(isoDate, str_buf);

        const res = this._exports.gc_dtz_time__parse(
          str_ptr,
          str_buf.byteLength,
          tz.offset,
          res_ptr,
        );

        if (!res) {
          throw new Error(`Invalid date`);
        }

        const epoch_us = dv.getBigInt64(res_ptr, true);
        return new gc.core.time(epoch_us);
      }

      printTime(
        time: gc.core.time,
        tz = this.timezone,
        format = '%Y-%m-%dT%H:%M:%S%.3f%z',
      ): string {
        // NOTE:
        // Wasm uses its stack backwards, starting by default at 1 page (64KB)
        // and going down towards 0. So we use the bottom of the stack for our data passing
        const format_buf = new Uint8Array(this._exports.memory.buffer, 0, format.length + 1);
        new TextEncoder().encodeInto(format, format_buf);
        format_buf[format.length] = 0; // ensures nul-byte terminated
        const out_ptr = format.length + 1;
        const n = this._exports.gc_dtz_time__print(BigInt(time.value), tz.offset, 0, out_ptr, 128);
        return new TextDecoder().decode(new Uint8Array(this._exports.memory.buffer, out_ptr, n));
      }
    }

    /**
     * Instantiates GreyCat's wasm module.
     *
     * *This is called implicitly by `gc.sdk.init()`, you should never call it manually*
     * @returns
     */
    export async function compileWasm(): Promise<{
      module: WebAssembly.Module;
      instance: WebAssembly.Instance & { exports: GreyCatWasmExports };
    }> {
      const importObject = {
        env: {
          js__on_memory_growth: () => {},
        },
      };

      return WebAssembly.instantiate(gc.sdk.WASM_BYTES, importObject) as unknown as {
        module: WebAssembly.Module;
        instance: WebAssembly.Instance & { exports: GreyCatWasmExports };
      };
    }

    export type CallJsonOptions = {
      /** Base URL of the GreyCat server. Default: `findGreyCat()`. */
      url?: URL | string;
      signal?: AbortSignal;
    };

    /**
     * Calls a GreyCat function over plain JSON HTTP — bypasses the binary
     * ABI protocol entirely.
     *
     * Useful before `gc.sdk.init()` (e.g. on a sign-in page where the ABI
     * download itself is gated behind auth) or when interoperating with
     * lightweight clients that don't ship the full SDK.
     *
     * Always sends `credentials: 'include'` so cookies set by the server
     * (e.g. the session cookie returned by `runtime::Identity::login`) are
     * stored and forwarded on subsequent calls.
     *
     * @param fn full function name, e.g. `runtime::Identity::current`
     * @param args positional arguments, JSON-serialised
     * @param options optional URL override and abort signal
     * @returns the JSON-parsed response (`null` for `204 No Content`)
     * @throws `Error` with `status` and the server's `message` on non-2xx
     */
    export async function callJson<T = unknown>(
      fn: string,
      args: unknown[] = [],
      options: CallJsonOptions = {},
    ): Promise<T> {
      const baseUrl = options.url ?? (await findGreyCat());
      const base = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : normalizeUrl(baseUrl);
      const res = await fetch(`${base}/${fn}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(args),
        signal: options.signal,
      });
      if (!res.ok) {
        const gc_err = await res.json();
        let message = 'unable to login';
        if (gc_err?.message?.length > 0) {
          message += ` (${gc_err.message})`;
        }
        const err = new Error(message);
        // oxlint-disable-next-line typescript/no-explicit-any
        (err as any).status = res.status;
        // oxlint-disable-next-line typescript/no-explicit-any
        (err as any).body = gc_err;
      }
      if (res.status === 204) {
        return null as T;
      }
      return res.json() as Promise<T>;
    }

    export type LoginOptions = IdentityAuth & {
      url?: URL;
      signal?: AbortSignal;
    };

    /**
     *
     * @param {LoginOptions} options
     * @returns the user token
     */
    export async function login(options: LoginOptions): Promise<string> {
      const { url = await findGreyCat(), signal, ...auth } = options;
      const res = await fetch(`${normalizeUrl(url)}/runtime::Identity::login`, {
        method: 'POST',
        body: JSON.stringify([auth.username, auth.password]),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'include',
        signal,
      });
      if (res.ok) {
        const token = (await res.json()) as string;
        return token;
      }
      const gc_err = await res.json();
      let message = 'unable to login';
      if (gc_err?.message?.length > 0) {
        message += ` (${gc_err.message})`;
      }
      const err = new Error(message);
      // oxlint-disable-next-line typescript/no-explicit-any
      (err as any).status = res.status;
      // oxlint-disable-next-line typescript/no-explicit-any
      (err as any).body = gc_err;
      throw err;
    }

    function isTaskRunning(task: gc.runtime.Task): boolean {
      switch (task.status.key) {
        case 'running':
        case 'waiting':
        case 'await':
        case 'breakpoint':
          return true;
        default:
          return false;
      }
    }

    export type LogoutOptions = {
      url?: URL;
      signal?: AbortSignal;
    };

    export async function logout(options: LogoutOptions = {}): Promise<void> {
      const { url = await findGreyCat(), signal } = options;
      const res = await fetch(`${normalizeUrl(url)}/runtime::Identity::logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'include',
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
