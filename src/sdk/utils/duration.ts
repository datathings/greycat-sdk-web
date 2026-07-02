import { gcreg } from '../registry.js';
/**
 * Based on the current duration value, returns an approximation of the better human "processable" value
 * and the unit for it.
 * @param duration
 * @returns
 */
export function decomposeDuration(duration: gc.core.duration): [number | bigint, gc.core.DurationUnit] {
  if (duration.s === 0) {
    if (duration.us >= 10e5) {
      return [duration.s, gcreg.core.DurationUnit.seconds];
    }
    if (duration.us >= 10e2) {
      return [duration.ms, gcreg.core.DurationUnit.milliseconds];
    }
    return [duration.us, gcreg.core.DurationUnit.microseconds];
  }
  if (duration.s >= 86_400) {
    // number of seconds in a day
    return [duration.s / 86_400, gcreg.core.DurationUnit.days];
  }
  if (duration.s >= 3_600) {
    // number of seconds in an hour
    return [duration.s / 3_600, gcreg.core.DurationUnit.hours];
  }
  if (duration.s >= 60) {
    // number of seconds in a minute
    return [duration.s / 60, gcreg.core.DurationUnit.minutes];
  }
  return [duration.s, gcreg.core.DurationUnit.seconds];
}
