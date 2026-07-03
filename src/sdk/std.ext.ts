import type { GreyCat } from './greycat.js';
import { $, gcreg } from './registry.js';
import { DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from './GCObject.js';
import type { TaskOptions } from './types.js';
export function __extend_std() {
  const core_Error_ext = {
    toString(this: gc.core.Error) {
      let err_msg = `${this.message ?? 'RuntimeError'}\n`;
      for (const frame of this.stack.reverse()) {
        err_msg += `    at ${frame.function} (${frame.module}.gcl:${frame.line}:${frame.column})\n`;
      }
      return err_msg;
    },
  };
  Object.assign(gcreg.core.Error.prototype, core_Error_ext);

  // augment runtime.Task
  const runtime_Task_ext = {
    async getFile(this: gc.runtime.Task, filepath: string, g: GreyCat = $.default, signal?: AbortSignal) {
      if (filepath === 'result.gcb') {
        const res = await g.getFile(`${this.user_id}/tasks/${this.task_id}/${filepath}`, undefined, undefined, signal);
        return res[0];
      }
      return g.getFile(`${this.user_id}/tasks/${this.task_id}/${filepath}`, undefined, undefined, signal);
    },
    result(this: gc.runtime.Task, opts?: TaskOptions, g: GreyCat = $.default, signal?: AbortSignal) {
      return g.await(this, opts, signal);
    },
    isRunning(this: gc.runtime.Task, g: GreyCat = $.default, signal?: AbortSignal) {
      return gcreg.runtime.Task.is_running(this.task_id, g, signal);
    },
    on(_type: string, _callback: (...args: unknown[]) => void, _pollEvery = 500, _g: GreyCat = $.default) {
      // TODO
    },
    getProgress(this: gc.runtime.Task, g: GreyCat = $.default): number | undefined | null {
      return g.getTask(this.task_id)?.progress;
    },
  };
  Object.assign(gcreg.runtime.Task.prototype, runtime_Task_ext);

  // extend io.File
  const io_File_ext = {
    list(this: gc.io.File, g: GreyCat = $.default, signal?: AbortSignal): Promise<gc.io.File[] | undefined> {
      if (this.path.endsWith('/')) {
        // directory
        return g.rawCall(`files${this.path}`, undefined, signal, false, 'GET');
      }
      return Promise.resolve(undefined);
    },
    resolve(this: gc.io.File, maxDepth = 5, g: GreyCat = $.default, signal?: AbortSignal): Promise<void> {
      return resolveFileChildrenRecursively(this, maxDepth, 0, g, signal);
    },
    download<T = unknown>(
      this: gc.io.File,
      offset = 0,
      max?: number,
      g: GreyCat = $.default,
      signal?: AbortSignal,
    ): Promise<T> {
      return g.getFile(this.path, offset, max, signal);
    },
  };
  Object.assign(gcreg.io.File.prototype, io_File_ext);

  // extend core.Date
  const core_Date_ext = {
    toString(this: gc.core.Date, _opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
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
  Object.assign(gcreg.core.Date.prototype, core_Date_ext);
}

function compareFile(a: gc.io.File, b: gc.io.File): number {
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

async function resolveFileChildrenRecursively(
  file: gc.io.File,
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
