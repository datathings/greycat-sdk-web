namespace gc {
  export namespace sdk {
    /**
     * Based on the current duration value, returns an approximation of the better human "processable" value
     * and the unit for it.
     * @param duration
     * @returns
     */
    export function decomposeDuration(duration: core.duration): [number | bigint, core.DurationUnit] {
      if (duration.s === 0) {
        if (duration.us >= 10e5) {
          return [duration.s, core.DurationUnit.seconds];
        }
        if (duration.us >= 10e2) {
          return [duration.ms, core.DurationUnit.milliseconds];
        }
        return [duration.us, core.DurationUnit.microseconds];
      }
      if (duration.s >= 86_400) {
        // number of seconds in a day
        return [duration.s / 86_400, core.DurationUnit.days];
      }
      if (duration.s >= 3_600) {
        // number of seconds in an hour
        return [duration.s / 3_600, core.DurationUnit.hours];
      }
      if (duration.s >= 60) {
        // number of seconds in a minute
        return [duration.s / 60, core.DurationUnit.minutes];
      }
      return [duration.s, core.DurationUnit.seconds];
    }
  }
}
