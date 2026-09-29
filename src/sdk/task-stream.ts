import type { GreyCat } from './greycat.js';

/** Where a {@link TaskStream} stands. `connecting` also covers a reconnect in progress. */
export type TaskStreamState = 'idle' | 'connecting' | 'open' | 'closed';

/**
 * Silence longer than this counts as a dead connection. The server writes a `: ping`
 * comment every 15s, so three missed pings.
 */
const WATCHDOG_MS = 45_000;
/** Delays before each reconnect attempt; the last one repeats. */
const RETRY_DELAYS_MS = [1_000, 5_000, 10_000, 20_000, 30_000];

export type TaskStreamHandlers = {
  /** The stream is open: events flow from here on. */
  onOpen(): void;
  /** A `task-progress` or `task-complete` frame, decoded. */
  onTask(task: gc.runtime.Task): void;
  /** The stream dropped, or a connect attempt failed; a retry may be scheduled. */
  onClose(): void;
};

/**
 * The `GET /runtime::Task::events` connection of an instance: the server pushes a frame
 * for every task the caller may see, as it reports progress and when it ends.
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

  constructor(g: GreyCat, handlers: TaskStreamHandlers) {
    this.#g = g;
    this.#handlers = handlers;
  }

  get state(): TaskStreamState {
    return this.#state;
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
    this.#state = 'idle';
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

    this.#state = 'open';
    this.#attempt = 0;
    this.#handlers.onOpen();

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
        buffered = this.#consume(buffered);
      }
    } catch {
      // aborted by the watchdog or by disconnect(), or the connection failed mid-stream
    } finally {
      clearTimeout(watchdog);
    }
    this.#dropped(ctrl, true);
  }

  /** Dispatches every complete frame in `text` and returns what is left of a partial one. */
  #consume(text: string): string {
    let start = 0;
    for (;;) {
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
    if ((event !== 'task-progress' && event !== 'task-complete') || data === '') {
      return;
    }
    let task: unknown;
    try {
      task = this.#g.deserializeWithHeader(fromBase64(data));
    } catch (err) {
      console.warn(`[TaskStream] undecodable ${event} frame`, err);
      return;
    }
    this.#handlers.onTask(task as gc.runtime.Task);
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
    const wasOpen = this.#state === 'open';
    this.#state = 'closed';
    if (wasOpen) {
      this.#handlers.onClose();
    }
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
