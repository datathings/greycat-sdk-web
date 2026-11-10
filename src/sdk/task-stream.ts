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
/** How long an instance waits for another one to say it holds the stream it is about to resume. */
const HOLDER_WAIT_MS = 75;

/**
 * What a frame of the task event stream reports about a task:
 *
 *  - `started`: its code starts running, once, when it leaves the queue (a resume from
 *    `await` is not reported again, and a task cancelled while queued never starts),
 *  - `progress`: the whole percentage of its steps changed,
 *  - `breakpoint`: it paused on a `breakpoint`, its status is `breakpoint`,
 *  - `resumed`: it goes on after a breakpoint, its status is back to what it was (`running`,
 *    or `await` when one of its `await` jobs paused),
 *  - `complete`: it ended, whatever its final status,
 *  - `state`: its current state, final or not, sent once by a stream that resumed a previous
 *    one, for each task it took over from it.
 */
export type TaskEventKind = 'started' | 'progress' | 'breakpoint' | 'resumed' | 'complete' | 'state';

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
  ['task-state', 'state'],
]);

/** Where the stream stands after a change, and its id while it is open. */
export type TaskStreamChange = {
  state: TaskStreamState;
  id: string | undefined;
};

export type TaskStreamHandlers = {
  /** The stream is open as `id`, and the calls naming it are reported from here on. */
  onOpen(id: string): void;
  /** A frame that carries a task, decoded. */
  onEvent(event: TaskEvent): void;
  /**
   * The server sent the `state` of every task the stream took over (`count` of them), and
   * reports the tasks of the previous stream from here on. A core that cannot resume a
   * stream never sends it.
   */
  onSynced(count: number): void;
  /** The stream dropped, or a connect attempt failed; a retry may be scheduled. */
  onClose(): void;
  /** The state changed, called after `onOpen` or `onClose`. */
  onChange(change: TaskStreamChange): void;
};

/**
 * The `GET /runtime::Task::events` connection of an instance. The server opens it with a
 * `connected` frame carrying the id of the stream, then pushes a frame for every task of
 * a call that named that id in its `sse` request header, as the task starts, reports
 * progress, pauses on a breakpoint and ends. Calls that name no stream, or another one,
 * are not reported. A reconnect opens a stream with a new id.
 *
 * A reconnect resumes the previous stream, so the new one takes over the running tasks the
 * old one reported (see {@link ResumePoint}). The request names the previous stream in its
 * `sse-resume` header as `<run>:<id>`, the run of the server and the id its `connected`
 * frame carried. The server then sends a `task-state` frame for each task it moved, and a
 * `synced` frame once done. A server started again since (another run), or a previous
 * stream still open, moves nothing. A reconnect after the connection dropped adds `; claim`,
 * which has the server close the previous stream if it still holds it open. Only the
 * instance that opened that stream claims it, so nothing else is using it.
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
  /**
   * `<run>:<id>` of the last stream this instance opened, kept while the stream is closed for
   * a pause or a retry, so that a retry can claim it and other tabs learn it is taken.
   * `undefined` before the first one, after {@link forget}, and with a core that cannot
   * resume a stream.
   */
  #held: string | undefined;
  #point: ResumePoint;

  constructor(g: GreyCat, handlers: TaskStreamHandlers) {
    this.#g = g;
    this.#handlers = handlers;
    this.#point = new ResumePoint(`greycat:task-stream:${g.name}@${g.api}`, () => this.#held);
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
    void this.#run(false);
  }

  /**
   * Drops the stream to resume, so the next connect opens a fresh one. For a change of
   * credentials, since the tasks of the previous stream belong to the previous login.
   */
  forget(): void {
    this.#held = undefined;
    this.#point.write(undefined);
  }

  /**
   * The page was left (`pagehide`) or came back from the back/forward cache (`pageshow`).
   * A page left stops answering for its stream, and keeps no channel open in the cache.
   */
  pageLeft(left: boolean): void {
    this.#point.suspend(left);
  }

  /** Closes the stream and cancels any pending retry. */
  disconnect(): void {
    this.#wanted = false;
    clearTimeout(this.#retry);
    this.#retry = undefined;
    this.#ctrl?.abort();
    this.#ctrl = undefined;
    this.#id = undefined;
    this.#setState('idle');
    this.#settleWaiters(false);
  }

  #setState(state: TaskStreamState): void {
    if (state === this.#state) {
      return;
    }
    this.#state = state;
    this.#handlers.onChange({ state, id: this.#id });
  }

  /** @param retry the stream dropped or the last attempt failed, and the previous stream may be claimed */
  async #run(retry: boolean): Promise<void> {
    this.#setState('connecting');
    const ctrl = new AbortController();
    this.#ctrl = ctrl;

    const resume = await this.#resumeHeader(retry);
    if (ctrl.signal.aborted) {
      return;
    }
    const headers: HeadersInit = { accept: 'application/octet-stream' };
    if (this.#g.token) {
      headers['Authorization'] = this.#g.token;
    }
    if (resume !== undefined) {
      headers['sse-resume'] = resume;
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
   * The `sse-resume` header of a connect attempt, or `undefined` to open a fresh stream.
   *
   * A retry claims the stream this instance held. Any other attempt resumes the stream
   * recorded for the tab, which the last page of the tab to open one wrote, and never
   * claims it: a page restored from the back/forward cache must resume the stream of the
   * page that followed it in the tab, not its own older one. A tab opened by `window.open`
   * starts with a copy of the record of its opener, whose stream may be paused (its page is
   * hidden by the new tab) but still in use, so a recorded stream that another live instance
   * says it holds is not resumed.
   */
  async #resumeHeader(retry: boolean): Promise<string | undefined> {
    if (retry && this.#held !== undefined) {
      return `${this.#held}; claim`;
    }
    const recorded = this.#point.read();
    if (recorded === undefined) {
      return undefined;
    }
    if (recorded !== this.#held && (await this.#point.isHeld(recorded, HOLDER_WAIT_MS))) {
      this.#point.write(undefined);
      return undefined;
    }
    return recorded;
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
    let run: string | undefined;
    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) {
        event = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        data += (data === '' ? '' : '\n') + line.slice(5).trim();
      } else if (line.startsWith('run:')) {
        run = line.slice(4).trim();
      }
      // comments (`: ping`) and unknown fields are ignored
    }
    if (event === 'connected') {
      this.#connected(data, run);
      return;
    }
    if (event === 'synced') {
      if (this.#state === 'open') {
        const count = Number.parseInt(data, 10);
        this.#handlers.onSynced(Number.isNaN(count) ? 0 : count);
      }
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

  /**
   * Reads the `connected` frame, whose `data:` is the id of the stream in plain text whatever
   * the `Accept`, and whose `run:` is the run of the server, a number that changes at every
   * start of the server. A core that cannot resume a stream sends no `run:`.
   */
  #connected(id: string, run: string | undefined): void {
    if (id === '' || this.#state !== 'connecting') {
      return;
    }
    this.#id = id;
    this.#held = run === undefined || run === '' ? undefined : `${run}:${id}`;
    this.#point.write(this.#held);
    this.#state = 'open';
    this.#attempt = 0;
    this.#handlers.onOpen(id);
    this.#handlers.onChange({ state: 'open', id });
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
    this.#handlers.onChange({ state: 'closed', id: undefined });
    this.#settleWaiters(false);
    if (!retry || !this.#wanted) {
      return;
    }
    const delay = RETRY_DELAYS_MS[Math.min(this.#attempt, RETRY_DELAYS_MS.length - 1)];
    this.#attempt += 1;
    this.#retry = setTimeout(() => {
      this.#retry = undefined;
      void this.#run(true);
    }, delay);
    unref(this.#retry);
  }
}

/** A message on the channel of a {@link ResumePoint}. */
type HolderMessage = { who: string } | { holds: string };

/**
 * Where an instance records the stream to resume, and how it learns whether another
 * instance still uses it. Does nothing outside a browser.
 *
 * The record (`<run>:<id>`) lives in `sessionStorage` under `key`, so it survives a reload
 * and a page change in the same tab, and is cleared with the tab. Live instances of every
 * tab of the origin share a `BroadcastChannel` named `key`: an instance about to resume a
 * recorded stream asks who holds it, and an instance answers for the stream it holds, even
 * while its stream is paused. The channel is closed while the page is left, so a page in
 * the back/forward cache answers nothing and keeps no channel open there.
 */
class ResumePoint {
  #key: string;
  #holds: () => string | undefined;
  #channel: BroadcastChannel | undefined;
  #suspended = false;
  /** Callers of {@link isHeld} waiting for an answer. */
  #asking: Set<(message: HolderMessage) => void> = new Set();

  constructor(key: string, holds: () => string | undefined) {
    this.#key = key;
    this.#holds = holds;
  }

  static get #inBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  read(): string | undefined {
    if (!ResumePoint.#inBrowser) {
      return undefined;
    }
    try {
      return sessionStorage.getItem(this.#key) ?? undefined;
    } catch {
      return undefined;
    }
  }

  /** Records `value`, or clears the record when `undefined`, and answers for it from now on. */
  write(value: string | undefined): void {
    if (!ResumePoint.#inBrowser) {
      return;
    }
    try {
      if (value === undefined) {
        sessionStorage.removeItem(this.#key);
      } else {
        sessionStorage.setItem(this.#key, value);
      }
    } catch {
      // storage disabled or full: the next page load opens a fresh stream
    }
    if (value !== undefined) {
      this.#open();
    }
  }

  /** Closes the channel while `suspended`, and opens it again after. */
  suspend(suspended: boolean): void {
    this.#suspended = suspended;
    if (suspended) {
      this.#channel?.close();
      this.#channel = undefined;
    } else if (this.#holds() !== undefined) {
      this.#open();
    }
  }

  /** Whether another live instance answers, within `waitMs`, that it holds the stream `value`. */
  isHeld(value: string, waitMs: number): Promise<boolean> {
    const channel = this.#open();
    if (channel === undefined) {
      return Promise.resolve(false);
    }
    return new Promise((resolve) => {
      const done = (held: boolean) => {
        clearTimeout(timer);
        this.#asking.delete(listener);
        resolve(held);
      };
      const listener = (message: HolderMessage) => {
        if ('holds' in message && message.holds === value) {
          done(true);
        }
      };
      const timer = setTimeout(() => done(false), waitMs);
      unref(timer);
      this.#asking.add(listener);
      this.#post(channel, { who: value });
    });
  }

  #open(): BroadcastChannel | undefined {
    if (this.#channel !== undefined) {
      return this.#channel;
    }
    if (this.#suspended || !ResumePoint.#inBrowser || typeof BroadcastChannel === 'undefined') {
      return undefined;
    }
    let channel: BroadcastChannel;
    try {
      channel = new BroadcastChannel(this.#key);
    } catch {
      return undefined;
    }
    channel.onmessage = (event: MessageEvent<HolderMessage>) => this.#receive(channel, event.data);
    (channel as { unref?: () => void }).unref?.();
    this.#channel = channel;
    return channel;
  }

  #receive(channel: BroadcastChannel, message: HolderMessage): void {
    if (typeof message !== 'object' || message === null) {
      return;
    }
    if ('who' in message) {
      const held = this.#holds();
      if (held !== undefined && held === message.who) {
        this.#post(channel, { holds: held });
      }
      return;
    }
    for (const listener of this.#asking) {
      listener(message);
    }
  }

  #post(channel: BroadcastChannel, message: HolderMessage): void {
    try {
      channel.postMessage(message);
    } catch {
      // closed in the meantime
    }
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
