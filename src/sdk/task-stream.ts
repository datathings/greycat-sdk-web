import type { GreyCat } from './greycat.js';

/**
 * Where a {@link TaskStream} stands. `connecting` also covers a reconnect in progress, and
 * lasts until the server sent the id of the stream.
 */
export type TaskStreamState = 'idle' | 'connecting' | 'open' | 'closed';

/**
 * Silence longer than this counts as a dead connection. The server writes a `: ping`
 * comment every 15s, so three missed pings.
 */
const WATCHDOG_MS = 45_000;
/** Delays before each reconnect attempt; the last one repeats. */
const RETRY_DELAYS_MS = [1_000, 5_000, 10_000, 20_000, 30_000];

/**
 * What a frame of the task event stream reports about a task:
 *
 *  - `started`: its code starts running, once, when it leaves the queue (a resume from
 *    `await` is not reported again, and a task cancelled while queued never starts),
 *  - `progress`: the whole percentage of its steps changed,
 *  - `breakpoint`: it paused on a `breakpoint`, its status is `breakpoint`,
 *  - `resumed`: it goes on after a breakpoint, its status is back to `running`,
 *  - `complete`: it ended, whatever its final status.
 */
export type TaskEventKind = 'started' | 'progress' | 'breakpoint' | 'resumed' | 'complete';

/** A decoded frame of the task event stream. */
export type TaskEvent = {
  kind: TaskEventKind;
  task: gc.runtime.Task;
};

/** The frames that carry a `runtime::Task`, by their `event:` name. */
const TASK_EVENTS: ReadonlyMap<string, TaskEventKind> = new Map([
  ['task-started', 'started'],
  ['task-progress', 'progress'],
  ['task-breakpoint', 'breakpoint'],
  ['task-resumed', 'resumed'],
  ['task-complete', 'complete'],
]);

export type TaskStreamHandlers = {
  /** The stream is open as `id`, and the calls naming it are reported from here on. */
  onOpen(id: string): void;
  /** A frame that carries a task, decoded. */
  onEvent(event: TaskEvent): void;
  /** The stream dropped, or a connect attempt failed; a retry may be scheduled. */
  onClose(): void;
};

/**
 * The `GET /runtime::Task::events` connection of an instance. The server opens it with a
 * `connected` frame carrying the id of the stream, then pushes a frame for every task of
 * a call that named that id in its `sse` request header, as the task starts, reports
 * progress, pauses on a breakpoint and ends. Calls that name no stream, or another one,
 * are not reported. A reconnect opens a stream with a new id.
 *
 * Frames are requested as GCB (`Accept: application/octet-stream`, base64 in the `data:`
 * line) and decoded with the instance's ABI, so they yield the same `runtime::Task`
 * objects an RPC does. Lost connections are retried with a growing delay; a server that
 * does not offer the endpoint (older core, Windows) or refuses the caller is not retried.
 */
export class TaskStream {
  #g: GreyCat;
  #handlers: TaskStreamHandlers;
  #state: TaskStreamState = 'idle';
  #ctrl: AbortController | undefined;
  #retry: ReturnType<typeof setTimeout> | undefined;
  #attempt = 0;
  /** `connect()` was called and `disconnect()` was not: drops are retried. */
  #wanted = false;
  /**
   * The id the server gave the open stream, kept as the decimal text it sent. It is an
   * unsigned 64-bit integer, which a `number` cannot always hold exactly.
   */
  #id: string | undefined;
  /** Callers of {@link opened} waiting for the outcome of the current attempt. */
  #waiters: Set<(open: boolean) => void> = new Set();

  constructor(g: GreyCat, handlers: TaskStreamHandlers) {
    this.#g = g;
    this.#handlers = handlers;
  }

  get state(): TaskStreamState {
    return this.#state;
  }

  /** The id of the open stream, to name in the `sse` header of a call, or `undefined` unless open. */
  get id(): string | undefined {
    return this.#id;
  }

  /**
   * Resolves `true` once the stream is open, `false` as soon as the attempt in progress
   * fails, the stream is closed, or `timeoutMs` passes. Resolves at once when the stream is
   * open, or idle.
   */
  opened(timeoutMs: number): Promise<boolean> {
    if (this.#state === 'open') {
      return Promise.resolve(true);
    }
    if (this.#state !== 'connecting') {
      return Promise.resolve(false);
    }
    return new Promise((resolve) => {
      const done = (open: boolean) => {
        clearTimeout(timer);
        this.#waiters.delete(done);
        resolve(open);
      };
      const timer = setTimeout(() => done(false), timeoutMs);
      unref(timer);
      this.#waiters.add(done);
    });
  }

  #settleWaiters(open: boolean): void {
    for (const done of this.#waiters) {
      done(open);
    }
  }

  /** Opens the stream, or does nothing if it is open or being opened. */
  connect(): void {
    this.#wanted = true;
    if (this.#state === 'connecting' || this.#state === 'open') {
      return;
    }
    clearTimeout(this.#retry);
    this.#retry = undefined;
    this.#attempt = 0;
    void this.#run();
  }

  /** Closes the stream and cancels any pending retry. */
  disconnect(): void {
    this.#wanted = false;
    clearTimeout(this.#retry);
    this.#retry = undefined;
    this.#ctrl?.abort();
    this.#ctrl = undefined;
    this.#id = undefined;
    this.#state = 'idle';
    this.#settleWaiters(false);
  }

  async #run(): Promise<void> {
    this.#state = 'connecting';
    const ctrl = new AbortController();
    this.#ctrl = ctrl;

    const headers: HeadersInit = { accept: 'application/octet-stream' };
    if (this.#g.token) {
      headers['Authorization'] = this.#g.token;
    }
    let res: Response;
    try {
      res = await fetch(`${this.#g.api}/runtime::Task::events`, {
        headers,
        signal: ctrl.signal,
        credentials: this.#g.credentials ?? (this.#g.token ? 'omit' : 'include'),
      });
    } catch {
      this.#dropped(ctrl, true);
      return;
    }
    if (ctrl.signal.aborted) {
      return;
    }
    if (res.status === 401 || res.status === 403) {
      // not for this caller: polling reports the same status and runs the handler
      await res.body?.cancel().catch(() => {});
      this.#dropped(ctrl, false);
      return;
    }
    if (res.status === 404 || res.status === 400 || res.status === 501 || res.status === 503) {
      // the server has no stream to offer (older core, Windows): polling for the session
      await res.body?.cancel().catch(() => {});
      this.#dropped(ctrl, false);
      return;
    }
    // anything else that is not a stream is retried; that includes a 429 from a server
    // whose stream cap (`max_sse`, `max_sse_per_user`) is reached, which frees up later
    const contentType = res.headers.get('content-type') ?? '';
    if (!res.ok || !contentType.startsWith('text/event-stream') || res.body === null) {
      await res.body?.cancel().catch(() => {});
      this.#dropped(ctrl, true);
      return;
    }

    // the stream opens with its `connected` frame, read in the loop below
    // the watchdog aborts the fetch, which ends the read loop below like a drop would
    let watchdog = setTimeout(() => ctrl.abort(), WATCHDOG_MS);
    unref(watchdog);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffered = '';
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        clearTimeout(watchdog);
        watchdog = setTimeout(() => ctrl.abort(), WATCHDOG_MS);
        unref(watchdog);
        buffered += decoder.decode(value, { stream: true });
        buffered = this.#consume(ctrl, buffered);
      }
    } catch {
      // aborted by the watchdog or by disconnect(), or the connection failed mid-stream
    } finally {
      clearTimeout(watchdog);
    }
    this.#dropped(ctrl, true);
  }

  /**
   * Dispatches every complete frame in `text` and returns what is left of a partial one.
   * Stops once `ctrl` is no longer the current connection, since a handler may close or
   * restart the stream and the rest of the chunk then belongs to credentials that are gone.
   */
  #consume(ctrl: AbortController, text: string): string {
    let start = 0;
    for (;;) {
      if (this.#ctrl !== ctrl) {
        return '';
      }
      const end = text.indexOf('\n\n', start);
      if (end === -1) {
        return text.slice(start);
      }
      this.#frame(text.slice(start, end));
      start = end + 2;
    }
  }

  #frame(raw: string): void {
    let event = 'message';
    let data = '';
    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) {
        event = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        data += (data === '' ? '' : '\n') + line.slice(5).trim();
      }
      // comments (`: ping`) and unknown fields are ignored
    }
    if (event === 'connected') {
      this.#connected(data);
      return;
    }
    const kind = TASK_EVENTS.get(event);
    if (kind === undefined || data === '') {
      return;
    }
    let task: unknown;
    try {
      task = this.#g.deserializeWithHeader(fromBase64(data));
    } catch (err) {
      console.warn(`[TaskStream] undecodable ${event} frame`, err);
      return;
    }
    this.#handlers.onEvent({ kind, task: task as gc.runtime.Task });
  }

  /** Reads the `connected` frame, whose `data:` is the id of the stream in plain text whatever the `Accept`. */
  #connected(id: string): void {
    if (id === '' || this.#state !== 'connecting') {
      return;
    }
    this.#id = id;
    this.#state = 'open';
    this.#attempt = 0;
    this.#handlers.onOpen(id);
    this.#settleWaiters(true);
  }

  /**
   * The connection identified by `ctrl` is gone. Ignored when it is not the current one
   * (a stale read loop finishing after a `disconnect()` + `connect()`).
   */
  #dropped(ctrl: AbortController, retry: boolean): void {
    if (this.#ctrl !== ctrl) {
      return;
    }
    this.#ctrl = undefined;
    this.#id = undefined;
    const wasOpen = this.#state === 'open';
    this.#state = 'closed';
    if (wasOpen) {
      this.#handlers.onClose();
    }
    this.#settleWaiters(false);
    if (!retry || !this.#wanted) {
      return;
    }
    const delay = RETRY_DELAYS_MS[Math.min(this.#attempt, RETRY_DELAYS_MS.length - 1)];
    this.#attempt += 1;
    this.#retry = setTimeout(() => {
      this.#retry = undefined;
      void this.#run();
    }, delay);
    unref(this.#retry);
  }
}

/** Keeps a timer from holding a Node process open; a no-op in browsers. */
function unref(timer: ReturnType<typeof setTimeout>): void {
  (timer as { unref?: () => void }).unref?.();
}

function fromBase64(text: string): ArrayBuffer {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
