import { std, type GreyCat, $ } from '../exports.js';

/**
 * Based on the current duration value, returns an approximation of the better human "processable" value
 * and the unit for it.
 * @param duration
 * @returns
 */
export function decomposeDuration(
  duration: std.core.duration,
  g: GreyCat = $.default,
): [number | bigint, std.core.DurationUnit] {
  if (duration.s === 0) {
    if (duration.us >= 10e5) {
      return [duration.s, std.core.DurationUnit.seconds(g)];
    }
    if (duration.us >= 10e2) {
      return [duration.ms, std.core.DurationUnit.milliseconds(g)];
    }
    return [duration.us, std.core.DurationUnit.microseconds(g)];
  }
  if (duration.s >= 86_400) {
    // number of seconds in a day
    return [duration.s / 86_400, std.core.DurationUnit.days(g)];
  }
  if (duration.s >= 3_600) {
    // number of seconds in an hour
    return [duration.s / 3_600, std.core.DurationUnit.hours(g)];
  }
  if (duration.s >= 60) {
    // number of seconds in a minute
    return [duration.s / 60, std.core.DurationUnit.minutes(g)];
  }
  return [duration.s, std.core.DurationUnit.seconds(g)];
}
