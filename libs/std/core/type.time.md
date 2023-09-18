# [std](/libs/std/)::[core](/libs/std/core/)::time

Time manipulation is very common in GreyCat, which is why we have a primitive type for it.

There are 2 ways to create a `time` value:
- using the static `new` method conventionally
- using the literal notation (eg. `0_time`)

```gcl
use util;

fn main() {
  Assert::equals(time::new(0, DurationUnit::s), 0_time);
}
```

## Attributes

### max:&nbsp;[time](/libs/std/core/type.time.md)

### min:&nbsp;[time](/libs/std/core/type.time.md)

## Methods
### fn current():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

Returns the current contextual time, defaults to `time::min`
### fn max(x:&nbsp;[time](/libs/std/core/type.time.md), y:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

Compares two durations `x` and `y` and returns the greater one.
### fn min(x:&nbsp;[time](/libs/std/core/type.time.md), y:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

Compares two times `x` and `y` and returns the lesser one.
### fn new(epoch:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

Returns a new time object, which date is set to `epoch` time units `unit` away from 1970-01-01T00:00:00Z. `epoch` can be signed.
### fn now():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

Returns the current system time
### fn parse(value:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" /><Badge text="static" />

parse the string parameter as a time definition following the ISO 8601 format. Throws an error if the string does not comply the defined format.
### fn to(unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the time of the object converted to the time unit `unit`. This correspond to an epoch definition adapted to the DurationUnit.
### fn toDate(tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Returns the date representation of this time for a specific time zone
### fn toDateUTC():&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Returns the date representation of this time for the UTC time zone
