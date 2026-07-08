import { gcreg } from './registry.js';
import type { GreyCat } from './greycat.js';

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

/** Called on every poll with the fresh task, ending with the terminal one. */
export type TaskListener = (task: gc.runtime.Task) => void;

export type TaskErrorReason = 'inaccessible' | 'cancelled' | 'error';

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
  /** present once someone `wait`s for terminal completion */
  deferred?: PromiseWithResolvers<gc.runtime.Task>;
  /** reactive subscribers, notified on every poll */
  listeners: Set<TaskListener>;
  /** the {@link Poll} registration id backing this task's cadence */
  pollId: number;
  /** the cadence currently registered for `pollId` */
  frequency: number;
};

/**
 * Multiplexes status polling for many tasks through a single {@link Poll}.
 *
 * Every registered task is refreshed in one batched `runtime::Task::tasks(ids)`
 * call per tick, at the fastest cadence any consumer requested. Consumers pick a
 * style:
 *
 *  - {@link wait} resolves once a task reaches a terminal state (rejects with a
 *    {@link TaskError} on failure),
 *  - {@link subscribe} observes every update until the task settles.
 *
 * Polling starts on the first consumer and stops once the last one is gone.
 */
export class TaskPoller {
  #g: GreyCat;
  #pending: Map<TaskId, Pending> = new Map();
  #poller: Poll;

  constructor(g: GreyCat) {
    this.#g = g;
    this.#poller = new Poll(this.#poll);
  }

  isRunning(): boolean {
    return this.#poller.isRunning();
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
        this.#settle(id, pending);
      }
    };
  }

  /** Get (or create) the shared entry for `id`, keeping its cadence at the min. */
  #ensure(id: TaskId, frequency: number): Pending {
    let pending = this.#pending.get(id);

    if (!pending) {
      // each consumer registers its own cadence: `Poll` runs at the min of all
      // live registrations and stops itself once the last one is unregistered.
      const pollId = this.#poller.register(frequency);
      pending = { listeners: new Set(), pollId, frequency };
      this.#pending.set(id, pending);
    } else if (frequency < pending.frequency) {
      // a faster consumer joined: re-register this id at the tighter cadence.
      this.#poller.unregister(pending.pollId);
      pending.pollId = this.#poller.register(frequency);
      pending.frequency = frequency;
    }

    return pending;
  }

  #has_consumers(pending: Pending): boolean {
    return pending.deferred !== undefined || pending.listeners.size > 0;
  }

  #settle(id: TaskId, pending: Pending): void {
    this.#poller.unregister(pending.pollId);
    this.#pending.delete(id);
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

  #poll = async (): Promise<void> => {
    const ids = [...this.#pending.keys()];
    if (ids.length === 0) {
      return;
    }

    // silence the debug logger so a fast cadence does not spam it every tick.
    const logger = this.#g.unregisterLogger();
    let updates: (gc.runtime.Task | null)[];
    try {
      updates = await gcreg.runtime.Task.tasks(ids, this.#g);
    } finally {
      this.#g.registerLogger(logger);
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const task = updates[i];
      const pending = this.#pending.get(id);
      if (pending === undefined) {
        continue;
      }

      if (task === null) {
        const error = new TaskError(id, 'inaccessible');
        pending.deferred?.reject(error);
        this.#g.emit('task:settle', { task: null, error });
        this.#settle(id, pending);
        continue;
      }

      // reactive update: instance listeners and per-task subscribers see every
      // poll, including the terminal one.
      this.#g.emit('task:update', task);
      this.#emit(pending, task);

      switch (task.status.key) {
        case 'ended':
          pending.deferred?.resolve(task);
          this.#g.emit('task:settle', { task, error: null });
          this.#settle(id, pending);
          break;
        case 'cancelled': {
          const error = new TaskError(id, 'cancelled', task);
          pending.deferred?.reject(error);
          this.#g.emit('task:settle', { task, error });
          this.#settle(id, pending);
          break;
        }
        case 'ended_with_errors':
        case 'error': {
          const error = new TaskError(id, 'error', task);
          pending.deferred?.reject(error);
          this.#g.emit('task:settle', { task, error });
          this.#settle(id, pending);
          break;
        }
        default:
          // 'waiting' | 'running' | 'await' | 'breakpoint': keep polling
          break;
      }
    }
  };
}
