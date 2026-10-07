import { gcreg } from './registry.js';
import type { GreyCat } from './greycat.js';
import { TaskStream, type TaskEvent, type TaskStreamState } from './task-stream.js';

type SyncRun = () => void;
type AsyncRun = () => Promise<void>;
type Run = SyncRun | AsyncRun;

export class Poll {
  private _id_generator = 0;
  private _delays: Map<number, number> = new Map();
  private _run: Run;
  private _running = false;
  private _timeout: ReturnType<typeof setTimeout> | undefined;
  private _sleep: number = 0;

  constructor(run: Run) {
    this._run = run;
  }

  /**
   * @param every running delay in milliseconds; if `every <= 0` it does nothing and returns `-1`
   * @returns the id of this registration
   */
  register(every: number): number {
    if (every <= 0) {
      return -1;
    }
    const id = this._id_generator;
    this._id_generator += 1;
    this._delays.set(id, every);
    this._computeSleep();
    if (!this._running) {
      this._running = true;
      this._loop();
    }
    return id;
  }

  unregister(id: number): void {
    this._delays.delete(id);
    this._computeSleep();
  }

  clear(): void {
    clearTimeout(this._timeout);
    this._timeout = undefined;
    this._running = false;
    this._sleep = 0;
    this._delays.clear();
  }

  /**
   * Whether at least one registration is live. This follows the registrations, not the
   * timer: the loop only notices an empty set on its next tick, which is one timer
   * later than the `unregister` that emptied it.
   */
  isRunning(): boolean {
    return this._delays.size > 0;
  }

  private _loop = async () => {
    if (this._delays.size === 0) {
      this._timeout = undefined;
      this._sleep = 0;
      this._running = false;
      return;
    }
    const start = performance.now();
    try {
      await this._run();
    } catch (err) {
      console.warn(`[error] poller.run error catched`, err);
    }
    const elapsed = performance.now() - start;
    const delay = Math.max(0, this._sleep - elapsed);
    this._timeout = setTimeout(this._loop, delay);
  };

  private _computeSleep(): void {
    if (this._delays.size === 0) {
      this._sleep = 0;
      return;
    }
    let min = Infinity;
    for (const v of this._delays.values()) {
      if (v < min) {
        min = v;
      }
    }
    this._sleep = min;
  }
}

export type TaskId = number | bigint;

/** Called on every update with the fresh task, ending with the terminal one. */
export type TaskListener = (task: gc.runtime.Task) => void;

export type TaskErrorReason = 'inaccessible' | 'cancelled' | 'error';

/** How tracked tasks are currently refreshed. */
export type TaskTransport = 'stream' | 'poll';

/** Rejection carried by {@link TaskPoller.wait} when a task fails to complete. */
export class TaskError extends Error {
  readonly id: TaskId;
  readonly reason: TaskErrorReason;
  /** the terminal task, absent when the task is unknown or inaccessible */
  readonly task?: gc.runtime.Task;

  constructor(id: TaskId, reason: TaskErrorReason, task?: gc.runtime.Task) {
    super(`task '${id}' ${TaskError.#message(reason)}`);
    this.name = 'TaskError';
    this.id = id;
    this.reason = reason;
    this.task = task;
  }

  static #message(reason: TaskErrorReason): string {
    switch (reason) {
      case 'inaccessible':
        return 'is unknown or inaccessible';
      case 'cancelled':
        return 'was cancelled';
      case 'error':
        return 'ended with errors';
    }
  }
}

/** Payload of the `task:settle` event: a tracked task left the poller. */
export type TaskSettleEvent = {
  /** the terminal task; `null` when the task was unknown or inaccessible */
  task: gc.runtime.Task | null;
  /** `null` on success, a {@link TaskError} on cancel / failure / inaccessible */
  error: TaskError | null;
};

type Pending = {
  /** the id as the consumer gave it, carried by errors and events */
  id: TaskId;
  /** present once someone `wait`s for terminal completion */
  deferred?: PromiseWithResolvers<gc.runtime.Task>;
  /** reactive subscribers, notified on every update */
  listeners: Set<TaskListener>;
  /** the {@link Poll} registration id backing this task's cadence, `-1` while the stream delivers */
  pollId: number;
  /** the fastest cadence any consumer asked for */
  frequency: number;
  /** at least one snapshot was handled; a late one-off snapshot must not go backwards */
  updated: boolean;
};

/**
 * How many bound tasks are remembered at most. A task forgotten early is polled instead of
 * followed on the stream, which is slower but still correct.
 */
const MAX_BOUND = 1024;

/**
 * Tracks many tasks for their consumers, through the instance's task event stream when
 * it reports them and by polling otherwise.
 *
 * The stream only reports the tasks of the calls that named it. The instance names the
 * open stream in every call it spawns, and the tracker follows those tasks on it, from
 * their start to their end. Every other tracked task is polled: one spawned by another
 * instance, tab or page load, one of another user, one spawned while the stream was not
 * open, or bound to a stream that has since closed. Polling refreshes those tasks in one
 * batched `runtime::Task::tasks(ids)` call per tick, at the fastest cadence any consumer
 * requested. Consumers pick a style:
 *
 *  - {@link wait} resolves once a task reaches a terminal state (rejects with a {@link TaskError} on failure),
 *  - {@link subscribe} observes every update until the task settles.
 *
 * Both behave the same whatever the transport.
 */
export class TaskPoller {
  #g: GreyCat;
  #pending: Map<TaskId, Pending> = new Map();
  #poller: Poll;
  #stream: TaskStream;
  /** `connect()` was called and `disconnect()` was not since. */
  #wanted = false;
  /**
   * Tasks spawned by a call that named the open stream, oldest first. Emptied whenever the
   * stream opens or goes, since a new stream reports none of the calls that named the old one.
   */
  #bound: Set<TaskId> = new Set();

  constructor(g: GreyCat) {
    this.#g = g;
    this.#poller = new Poll(this.#poll);
    this.#stream = new TaskStream(g, {
      onOpen: this.#onStreamOpen,
      onEvent: this.#onStreamEvent,
      onClose: this.#onStreamClose,
    });
  }

  /** Whether the polling fallback currently has at least one task to poll. */
  isRunning(): boolean {
    return this.#poller.isRunning();
  }

  /**
   * Which transport delivers updates right now. While it is `'stream'`, the tasks the
   * instance did not spawn on that stream are still polled.
   */
  get transport(): TaskTransport {
    return this.#stream.state === 'open' ? 'stream' : 'poll';
  }

  /** Where the event stream stands; `idle` until {@link connect} is called. */
  get streamState(): TaskStreamState {
    return this.#stream.state;
  }

  /**
   * The id of the open stream, which a call names in its `sse` request header to have its
   * task reported there, or `undefined` while the stream is not open. Kept as the decimal
   * text the server sent, since it may not fit a `number`.
   */
  get streamId(): string | undefined {
    return this.#stream.id;
  }

  /**
   * Opens the task event stream (`GET /runtime::Task::events`). `init` does this unless
   * `taskEvents: false`; call it on an `initWithAbi` instance. Dropped connections
   * reconnect on their own; a server without the endpoint is left alone and polling
   * serves the session.
   */
  connect(): void {
    this.#wanted = true;
    this.#stream.connect();
  }

  /**
   * Resolves `true` once the stream is open, `false` as soon as the attempt in progress
   * fails, the stream is not being opened, or `timeoutMs` passes. A task spawned before the
   * stream is open is polled for its whole life, which is why `init` waits on this.
   */
  opened(timeoutMs: number): Promise<boolean> {
    return this.#stream.opened(timeoutMs);
  }

  /**
   * Closes the event stream and stops reconnecting; tracked tasks fall back to polling.
   * A Node process holding a stream does not exit on its own: call this when done.
   */
  disconnect(): void {
    this.#wanted = false;
    this.#stream.disconnect();
    this.#streamGone();
  }

  /**
   * Closes the stream and opens it again with the instance's current credentials, if it
   * was asked for. Assigning `token` does this on its own; call it after a cookie login
   * or logout, which the instance cannot see.
   */
  reconnect(): void {
    if (!this.#wanted) {
      return;
    }
    this.#stream.disconnect();
    this.#streamGone();
    this.#stream.connect();
  }

  /**
   * Records that task `id` was spawned by a call naming the stream `streamId`, so the
   * stream reports it. Ignored unless that stream is still the open one. The instance calls
   * this for the calls it spawns.
   */
  bind(id: TaskId, streamId: string): void {
    if (streamId !== this.#stream.id) {
      return;
    }
    if (this.#bound.size >= MAX_BOUND) {
      const [oldest] = this.#bound;
      this.#bound.delete(oldest);
    }
    this.#bound.add(TaskPoller.#key(id));
  }

  /** Resolve once the task reaches a terminal state, reject on failure. */
  wait(id: TaskId, pollFrequency = this.#g.pollFrequency): Promise<gc.runtime.Task> {
    const pending = this.#ensure(id, pollFrequency);
    pending.deferred ??= Promise.withResolvers();
    return pending.deferred.promise;
  }

  /** Observe every update until the task settles. Returns an unsubscribe. */
  subscribe(id: TaskId, listener: TaskListener, pollFrequency = this.#g.pollFrequency): () => void {
    const pending = this.#ensure(id, pollFrequency);
    pending.listeners.add(listener);

    return () => {
      pending.listeners.delete(listener);
      if (!this.#has_consumers(pending)) {
        this.#settle(pending);
      }
    };
  }

  /** Get (or create) the shared entry for `id`, keeping its cadence at the min. */
  #ensure(id: TaskId, frequency: number): Pending {
    const key = TaskPoller.#key(id);
    let pending = this.#pending.get(key);

    if (!pending) {
      pending = { id, listeners: new Set(), pollId: -1, frequency, updated: false };
      this.#pending.set(key, pending);
      if (this.#bound.has(key)) {
        // the stream reports this task, but only from now on. A look tells whether it
        // already ended, or reported something before it was tracked.
        void this.#snapshot(key, pending);
      } else {
        // each consumer registers its own cadence: `Poll` runs at the min of all
        // live registrations and stops itself once the last one is unregistered.
        pending.pollId = this.#poller.register(frequency);
      }
    } else if (frequency < pending.frequency) {
      // a faster consumer joined: re-register this id at the tighter cadence.
      pending.frequency = frequency;
      if (pending.pollId !== -1) {
        this.#poller.unregister(pending.pollId);
        pending.pollId = this.#poller.register(frequency);
      }
    }

    return pending;
  }

  /** Map key for an id: a bigint within safe range is the same task as its number. */
  static #key(id: TaskId): TaskId {
    if (typeof id === 'bigint' && id <= BigInt(Number.MAX_SAFE_INTEGER) && id >= 0n) {
      return Number(id);
    }
    return id;
  }

  #has_consumers(pending: Pending): boolean {
    return pending.deferred !== undefined || pending.listeners.size > 0;
  }

  #settle(pending: Pending): void {
    this.#unpoll(pending);
    this.#pending.delete(TaskPoller.#key(pending.id));
  }

  #emit(pending: Pending, task: gc.runtime.Task): void {
    for (const listener of pending.listeners) {
      try {
        listener(task);
      } catch (err) {
        console.warn(`[TaskPoller] listener threw`, err);
      }
    }
  }

  /** A new stream reports none of the tasks tracked so far, so they stay polled. */
  #onStreamOpen = (): void => {
    this.#bound.clear();
  };

  #onStreamClose = (): void => {
    this.#streamGone();
  };

  #onStreamEvent = (event: TaskEvent): void => {
    // every frame the server pushes, tracked or not
    this.#g.emit('task:event', event);
    const key = TaskPoller.#key(event.task.task_id);
    if (event.kind === 'complete') {
      this.#bound.delete(key);
    }
    const pending = this.#pending.get(key);
    if (pending !== undefined) {
      this.#handle(pending, event.task);
    }
  };

  /** The stream closed or is about to reopen, and the tasks it followed are polled from now on. */
  #streamGone(): void {
    this.#bound.clear();
    for (const pending of this.#pending.values()) {
      if (pending.pollId === -1) {
        pending.pollId = this.#poller.register(pending.frequency);
      }
    }
  }

  #unpoll(pending: Pending): void {
    if (pending.pollId !== -1) {
      this.#poller.unregister(pending.pollId);
      pending.pollId = -1;
    }
  }

  /** Fetches every tracked task, silencing the debug logger. */
  async #fetch(ids: TaskId[]): Promise<(gc.runtime.Task | null)[]> {
    // silence the debug logger so a fast cadence does not spam it every tick.
    const logger = this.#g.unregisterLogger();
    try {
      return await gcreg.runtime.Task.tasks(ids, this.#g);
    } finally {
      this.#g.registerLogger(logger);
    }
  }

  /** One-off look at a task the stream reports, when it starts being tracked. */
  async #snapshot(key: TaskId, pending: Pending): Promise<void> {
    let task: gc.runtime.Task | null;
    try {
      [task] = await this.#fetch([key]);
    } catch (err) {
      console.warn(`[TaskPoller] snapshot of task '${key}' failed, polling it`, err);
      if (this.#pending.get(key) === pending && !pending.updated && pending.pollId === -1) {
        pending.pollId = this.#poller.register(pending.frequency);
      }
      return;
    }
    // gone, or already brought up to date by the stream in the meantime
    if (this.#pending.get(key) !== pending || pending.updated) {
      return;
    }
    this.#handle(pending, task);
  }

  #poll = async (): Promise<void> => {
    const ids = [...this.#pending.keys()];
    if (ids.length === 0) {
      return;
    }
    const updates = await this.#fetch(ids);
    for (let i = 0; i < ids.length; i++) {
      const pending = this.#pending.get(ids[i]);
      if (pending !== undefined) {
        this.#handle(pending, updates[i]);
      }
    }
  };

  /** Applies a fresh snapshot of a tracked task, from either transport. */
  #handle(pending: Pending, task: gc.runtime.Task | null): void {
    pending.updated = true;
    if (task === null) {
      const error = new TaskError(pending.id, 'inaccessible');
      pending.deferred?.reject(error);
      this.#g.emit('task:settle', { task: null, error });
      this.#settle(pending);
      return;
    }

    // reactive update: instance listeners and per-task subscribers see every
    // snapshot, including the terminal one.
    this.#g.emit('task:update', task);
    this.#emit(pending, task);

    if (!task.isTerminal()) {
      return;
    }
    if (task.status.key === 'ended') {
      pending.deferred?.resolve(task);
      this.#g.emit('task:settle', { task, error: null });
    } else {
      const reason = task.status.key === 'cancelled' ? 'cancelled' : 'error';
      const error = new TaskError(pending.id, reason, task);
      pending.deferred?.reject(error);
      this.#g.emit('task:settle', { task, error });
    }
    this.#settle(pending);
  }
}
