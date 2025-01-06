import { std } from '../exports.js';

export function prettyError(err: unknown, defaultMsg: string): string {
  if (err instanceof Error) {
    // native JS error
    return err.message;
  }
  if (typeof err === 'string') {
    // string error
    return err;
  }
  if (err instanceof std.core.Error) {
    // GreyCat error
    return err.message ?? defaultMsg;
  }
  return defaultMsg;
}

/**
 * @param err
 * @param msg
 * @returns
 * @deprecated use `prettyError(...)` instead
 */
export function convertError(err: unknown, msg: string): string {
  return prettyError(err, msg) ?? msg;
}
