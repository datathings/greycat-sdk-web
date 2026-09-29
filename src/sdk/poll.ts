import { gcreg } from './registry.js';
import type { GreyCat } from './greycat.js';
import { TaskStream, type TaskStreamState } from './task-stream.js';

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

  isRunning(): boolean {
    return this._running;
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
 * Tracks many tasks for their consumers, through the instance's task event stream when
 * it is open and by polling otherwise.
 *
 * Over the stream the server pushes every progress report and the end of each task as
 * it happens. Polling refreshes every tracked task in one batched
 * `runtime::Task::tasks(ids)` call per tick, at the fastest cadence any consumer
 * requested; it runs whenever the stream is not open (never connected, connecting,
 * dropped and reconnecting, or disabled). Consumers pick a style:
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

  constructor(g: GreyCat) {
    this.#g = g;
    this.#poller = new Poll(this.#poll);
    this.#stream = new TaskStream(g, {
      onOpen: this.#onStreamOpen,
      onTask: this.#onStreamTask,
      onClose: this.#onStreamClose,
    });
  }

  /** Whether the polling fallback currently has at least one task to poll. */
  isRunning(): boolean {
    return this.#poller.isRunning();
  }

  /** Which transport delivers updates right now. */
  get transport(): TaskTransport {
    return this.#stream.state === 'open' ? 'stream' : 'poll';
  }

  /** Where the event stream stands; `idle` until {@link connect} is called. */
  get streamState(): TaskStreamState {
    return this.#stream.state;
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
   * Closes the event stream and stops reconnecting; tracked tasks fall back to polling.
   * A Node process holding a stream does not exit on its own: call this when done.
   */
  disconnect(): void {
    this.#wanted = false;
    this.#stream.disconnect();
    this.#resumePolling();
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
    this.#resumePolling();
    this.#stream.connect();
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
      if (this.transport === 'stream') {
        // the stream only carries what happens from now on: a task that already ended
        // (spawned a moment ago, or an old id) would never settle without a look
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
    if (pending.pollId !== -1) {
      this.#poller.unregister(pending.pollId);
      pending.pollId = -1;
    }
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

  /** The stream is open: it delivers from now on, and one poll catches up on the meantime. */
  #onStreamOpen = (): void => {
    for (const pending of this.#pending.values()) {
      if (pending.pollId !== -1) {
        this.#poller.unregister(pending.pollId);
        pending.pollId = -1;
      }
    }
    if (this.#pending.size !== 0) {
      void this.#poll();
    }
  };

  #onStreamClose = (): void => {
    this.#resumePolling();
  };

  #onStreamTask = (task: gc.runtime.Task): void => {
    // every frame the server pushes, tracked or not: what a task list needs
    this.#g.emit('task:event', task);
    const key = TaskPoller.#key(task.task_id);
    const pending = this.#pending.get(key);
    if (pending !== undefined) {
      this.#handle(pending, task);
    }
  };

  #resumePolling(): void {
    for (const pending of this.#pending.values()) {
      if (pending.pollId === -1) {
        pending.pollId = this.#poller.register(pending.frequency);
      }
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

  /** One-off look at a task registered while the stream was open. */
  async #snapshot(key: TaskId, pending: Pending): Promise<void> {
    let task: gc.runtime.Task | null;
    try {
      [task] = await this.#fetch([key]);
    } catch (err) {
      console.warn(`[TaskPoller] snapshot of task '${key}' failed`, err);
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

    switch (task.status.key) {
      case 'ended':
        pending.deferred?.resolve(task);
        this.#g.emit('task:settle', { task, error: null });
        this.#settle(pending);
        break;
      case 'cancelled': {
        const error = new TaskError(pending.id, 'cancelled', task);
        pending.deferred?.reject(error);
        this.#g.emit('task:settle', { task, error });
        this.#settle(pending);
        break;
      }
      case 'ended_with_errors':
      case 'error': {
        const error = new TaskError(pending.id, 'error', task);
        pending.deferred?.reject(error);
        this.#g.emit('task:settle', { task, error });
        this.#settle(pending);
        break;
      }
      default:
        // 'waiting' | 'running' | 'await' | 'breakpoint': keep tracking
        break;
    }
  }
}
