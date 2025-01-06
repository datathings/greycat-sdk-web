import { std, type GreyCat, $ } from '../exports.js';

interface CancellableTaskPromise extends Promise<void> {
  /**
   * **Cancels the remote task** and polls one last time for updated info
   */
  cancel: () => void;
  /**
   * Stops polling for info (leaving the remote task running)
   */
  stop: () => void;
}

// using Pick<...> to catch bug earlier if `runtime.Task` changes
export type TaskLike = Pick<std.runtime.Task, 'user_id' | 'task_id'>;

export class TaskHandler {
  private _promise: CancellableTaskPromise | null = null;

  /**
   * Constructs a `TaskHandler` by giving a `runtime.Task` or something that has at least the properties:
   *  - `user_id: number | bigint`
   *  - `task_id: number | bigint`
   */
  constructor(readonly task: TaskLike) {}

  /**
   * Starts to poll for completion periodically.
   *
   * *Does nothing if already started*
   *
   * @param delay delay in milliseconds between every poll (defaults to `2000` milliseconds)
   * @returns
   */
  start(delay = 2000): Promise<void> {
    if (this._promise) {
      // already started
      return this._promise;
    }
    this._promise = this._poll(delay);
    return this._promise;
  }

  /**
   * **Cancels the remote task** and polls one last time for updated info
   * @returns the *after-cancel* info of the task
   */
  async cancel(): Promise<void> {
    if (!this._promise) {
      // not started
      return;
    }
    this._promise.cancel();
    return this._promise;
  }

  /**
   * Stops polling for info (leaving the remote task running)
   */
  async stop(): Promise<void> {
    if (!this._promise) {
      // not started
      return;
    }
    this._promise.stop();
    await this._promise;
    return;
  }

  /**
   * Convenience method to download and deserialize this task's "result.gcb".
   *
   * *This is wrapper around `greycat.getFile('<user_id>/tasks/<task_id>/result.gcb')`*
   */
  result<T = unknown>(g: GreyCat = $.default): Promise<T> {
    return g.getFile(`${this.task.user_id}/tasks/${this.task.task_id}/result.gcb`);
  }

  /**
   * This will delete all the files related to the task and cannot be undone.
   *
   * *This is wrapper around `greycat.deleteFile('<user_id>/tasks/<task_id>/')`*
   */
  delete(g: GreyCat = $.default): Promise<void> {
    return g.deleteFile(`${this.task.user_id}/tasks/${this.task.task_id}/`);
  }

  /**
   * Convenience method to download and deserialize a file from the task's directory.
   *
   * Calling:
   * ```ts
   * handler.getFile('some-file.txt')
   * ```
   * is equivalent to:
   * ```ts
   * greycat.$.default.getFile(`${handler.task.user_id}/tasks/${handler.task.task_id}/some-file.txt`)
   * ```
   */
  getFile<T = unknown>(filepath: string, g: GreyCat = $.default): Promise<T> {
    return g.getFile(`${this.task.user_id}/tasks/${this.task.task_id}/${filepath}`);
  }

  private _poll(delay: number): CancellableTaskPromise {
    const cancelCtrl = new AbortController();
    const stopCtrl = new AbortController();

    const promise = new Promise<void>((resolve, reject) => {
      // const user_id = this.task.user_id;
      const task_id = this.task.task_id;

      const internalPoll = async () => {
        let running = await std.runtime.Task.is_running(task_id);
        while (running) {
          if (cancelCtrl.signal.aborted) {
            await std.runtime.Task.cancel(task_id);
            break;
          }
          if (stopCtrl.signal.aborted) {
            break;
          }
          await new Promise((resolve) => {
            // TODO sleeping cannot be cancelled, it should
            setTimeout(resolve, delay);
          });
          if (cancelCtrl.signal.aborted) {
            await std.runtime.Task.cancel(task_id);
            break;
          }
          if (stopCtrl.signal.aborted) {
            break;
          }
          running = await std.runtime.Task.is_running(task_id);
        }
      };

      internalPoll().then(resolve, reject);
    });
    (promise as CancellableTaskPromise).cancel = () => cancelCtrl.abort();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (promise as CancellableTaskPromise).stop = () => stopCtrl.abort();

    return promise as CancellableTaskPromise;
  }
}
