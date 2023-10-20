# [std](/libs/std/)::[core](/libs/std/core/)::duration

primitive type that represent the difference between two time, especially useful to measure the difference between two event

## Methods
### fn add(value:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" />

Adds the given value to the current duration using the `unit`.
### fn max(x:&nbsp;[duration](/libs/std/core/type.duration.md), y:&nbsp;[duration](/libs/std/core/type.duration.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" /><Badge text="static" />

Compares two durations `x` and `y` and returns the longest.
### fn min(x:&nbsp;[duration](/libs/std/core/type.duration.md), y:&nbsp;[duration](/libs/std/core/type.duration.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" /><Badge text="static" />

Compares two durations `x` and `y` and returns the shortest.
### fn new(v:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" /><Badge text="static" />

Returns a new duration using the given int value and time unit
### fn newf(v:&nbsp;[float](/libs/std/core/type.float.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" /><Badge text="static" />

Returns a new duration using the given float value and time unit
### fn substract(value:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[duration](/libs/std/core/type.duration.md)<Badge text="native" />

Substracts the given value to the current duration using the `unit`.
### fn to(unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the current duration as an int in the specified time unit.
### fn tof(unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the current duration as a float in the specified time unit.
### fn toString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns a string containing the duration in human-readable form.

```gcl
use util;

fn main() {
  var x = 42_ms;
  Assert::equals(x.toString(), "42ms");
}
```
