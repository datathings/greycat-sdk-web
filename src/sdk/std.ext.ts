namespace gc {
  export namespace sdk {
    export function __extend_std() {
      const core_Error_ext = {
        toString(this: core.Error) {
          let err_msg = `${this.message ?? 'RuntimeError'}\n`;
          for (const frame of this.stack.reverse()) {
            err_msg += `    at ${frame.function} (${frame.module}.gcl:${frame.line}:${frame.column})\n`;
          }
          return err_msg;
        },
      };
      Object.assign(core.Error.prototype, core_Error_ext);

      // augment runtime.Task
      const runtime_Task_ext = {
        async getFile(this: runtime.Task, filepath: string, g: GreyCat = gc.$.default, signal?: AbortSignal) {
          if (filepath === 'result.gcb') {
            const res = await g.getFile(
              `${this.user_id}/tasks/${this.task_id}/${filepath}`,
              undefined,
              undefined,
              signal,
            );
            return res[0];
          }
          return g.getFile(`${this.user_id}/tasks/${this.task_id}/${filepath}`, undefined, undefined, signal);
        },
        result(this: runtime.Task, opts?: sdk.TaskOptions, g: GreyCat = gc.$.default, signal?: AbortSignal) {
          return g.await(this, opts, signal);
        },
        isRunning(this: runtime.Task, g: GreyCat = gc.$.default, signal?: AbortSignal) {
          return runtime.Task.is_running(this.task_id, g, signal);
        },
        on(_type: string, _callback: (...args: unknown[]) => void, _pollEvery = 500, _g: GreyCat = gc.$.default) {
          // TODO
        },
        getProgress(this: runtime.Task, g: GreyCat = gc.$.default): number | undefined | null {
          return g.getTask(this.task_id)?.progress;
        },
      };
      Object.assign(runtime.Task.prototype, runtime_Task_ext);

      // extend io.File
      const io_File_ext = {
        list(this: io.File, g: GreyCat = gc.$.default, signal?: AbortSignal): Promise<io.File[] | undefined> {
          if (this.path.endsWith('/')) {
            // directory
            return g.rawCall(`files${this.path}`, undefined, signal, false, 'GET');
          }
          return Promise.resolve(undefined);
        },
        resolve(this: io.File, maxDepth = 5, g: GreyCat = gc.$.default, signal?: AbortSignal): Promise<void> {
          return resolveFileChildrenRecursively(this, maxDepth, 0, g, signal);
        },
        download<T = unknown>(
          this: io.File,
          offset = 0,
          max?: number,
          g: GreyCat = gc.$.default,
          signal?: AbortSignal,
        ): Promise<T> {
          return g.getFile(this.path, offset, max, signal);
        },
      };
      Object.assign(io.File.prototype, io_File_ext);

      // extend core.Date
      const core_Date_ext = {
        toString(this: core.Date, _opts: gc.sdk.ToStringOptions = gc.sdk.DEFAULT_TO_STRING_OPTIONS) {
          const month = this.month.toString().padStart(2, '0');
          const day = this.day.toString().padStart(2, '0');
          const hour = this.hour.toString().padStart(2, '0');
          const min = this.minute.toString().padStart(2, '0');
          const sec = this.second.toString().padStart(2, '0');
          if (this.microsecond > 0) {
            return `${this.year}-${month}-${day}T${hour}:${min}:${sec}.${this.microsecond}`;
          } else {
            return `${this.year}-${month}-${day}T${hour}:${min}:${sec}`;
          }
        },
      };
      Object.assign(core.Date.prototype, core_Date_ext);
    }

    // eslint-disable-next-line no-inner-declarations
    function compareFile(a: io.File, b: io.File): number {
      const aDir = a.path.endsWith('/');
      const bDir = b.path.endsWith('/');

      // ensures directories are first
      if (aDir && !bDir) {
        return -1; // 'a' first
      }
      if (!aDir && bDir) {
        return 1; // 'b' first
      }

      return a.path.localeCompare(b.path, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }

    // eslint-disable-next-line no-inner-declarations
    async function resolveFileChildrenRecursively(
      file: io.File,
      maxDepth: number,
      currDepth: number,
      g?: GreyCat,
      signal?: AbortSignal,
    ) {
      if (currDepth == maxDepth) {
        return;
      }
      if (file.size == null) {
        // directory
        const children = await file.list(g, signal);
        if (children) {
          file.children = children;
          file.children.sort(compareFile);
          for (const child of children) {
            await resolveFileChildrenRecursively(child, maxDepth, ++currDepth, g, signal);
          }
        }
      }
    }
  }
}
