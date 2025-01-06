// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TAKES EXTRA CARE WHEN MODIFYING THIS FILE
// TYPESCRIPT IS DISABLED, MAKING MISTAKES IS REALLY EASY
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
import { std, type GreyCat, $ } from './exports.js';

Object.assign(std.core.Error.prototype, {
  toString(this: std.core.Error) {
    let err_msg = `${this.message ?? 'RuntimeError'}\n`;
    for (const frame of this.stack) {
      err_msg += `    at ${frame.function} (${frame.module}.gcl:${frame.line}:${frame.column})\n`;
    }
    return err_msg;
  }
});

// augment std.runtime.Task
Object.assign(std.runtime.Task.prototype, {
  getFile<T = unknown>(
    this: std.runtime.Task,
    filepath: string,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<T | T[]> {
    return g.getFile<T>(`${this.user_id}/tasks/${this.task_id}/${filepath}`, signal);
  },
  await(this: std.runtime.Task, pollEvery?: number, g: GreyCat = $.default, signal?: AbortSignal) {
    return g.await(this, pollEvery, signal);
  },
  async result<T = unknown>(
    this: std.runtime.Task,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<T> {
    const results = await g.getFile<T>(`${this.user_id}/tasks/${this.task_id}/result.gcb`, signal);
    return results[0];
  },
  is_running(this: std.runtime.Task, g: GreyCat = $.default, signal?: AbortSignal) {
    return std.runtime.Task.is_running(this.task_id, g, signal);
  },
});

// extend std.io.File
Object.assign(std.io.File.prototype, {
  list(
    this: std.io.File,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<std.io.File[] | undefined> {
    if (this.path.endsWith('/')) {
      // directory
      return g.rawCall(`files${this.path}`, undefined, signal, false, 'GET');
    }
    return Promise.resolve(undefined);
  },
  resolve(
    this: std.io.File,
    maxDepth = 5,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<void> {
    return resolveFileChildrenRecursively(this, maxDepth, 0, g, signal);
  },
});

// extend std.core.Date
Object.assign(std.core.Date.prototype, {
  toString(this: std.core.Date) {
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
});

function compareFile(a: std.io.File, b: std.io.File): number {
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
  file: std.io.File,
  maxDepth: number,
  currDepth: number,
  g?: GreyCat,
  signal?: AbortSignal,
) {
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
