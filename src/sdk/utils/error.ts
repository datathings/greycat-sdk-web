import { gcreg } from '../registry.js';
export function prettyError(err: unknown, defaultMsg: string): string {
  if (err instanceof Error) {
    // native JS error
    return err.message;
  }
  if (typeof err === 'string') {
    // string error
    return err;
  }
  if (err instanceof gcreg.core.Error) {
    // GreyCat error
    return err.message ?? defaultMsg;
  }
  return defaultMsg;
}

/**
 * The call stack of a GreyCat error, innermost call first, as one `    at fn (module.gcl:line:column)`
 * line per frame, each ending with a newline.
 */
export function errorFrames(err: gc.core.Error): string {
  // the server lists the frames outermost call first
  let frames = '';
  for (let i = err.stack.length - 1; i >= 0; i--) {
    const frame = err.stack[i];
    frames += `    at ${frame.function} (${frame.module}.gcl:${frame.line}:${frame.column})\n`;
  }
  return frames;
}
