# [std](/libs/std/)::[core](/libs/std/core/)::nodeTime

## Methods
### fn first():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content of the first/smallest timestamp in the timeserie
### fn firstTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Return the first/smallest timestamp in the timeserie.
### fn getAt(exactTime:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content at the timestamp `exactTime` in the timeserie.
If `exactTime` does not exist, returns `null`.
### fn info(nodes:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="static" />

Returns the size and range of the given timeseries
### fn last():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content of the last/biggest timestamp in the timeserie.
### fn lastTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Return the last/biggest timestamp in the timeserie.
### fn new():&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)<Badge text="native" /><Badge text="static" />

Return a new empty `nodeTime<T>` element.
### fn newAt(initial:&nbsp;[time](/libs/std/core/type.time.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)<Badge text="native" /><Badge text="static" />

Return a new `nodeTime<T>` element with `<initial, value>` pair set.
### fn next(v:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Return the next existing timestamp of `v`.
If a next element does not exist, return `null`.
### fn prev(v:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Return the previous existing timestamp of `v`. If a previous element does not exist, return `null`.
### fn rangeSize(from:&nbsp;[time](/libs/std/core/type.time.md), to:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Return the number of elements of the timeserie that are within the time interval [`from`,`to`].
### fn removeAll():&nbsp;any?<Badge text="native" />

Remove all elements from the timeserie.
### fn removeAt(exactTime:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?<Badge text="native" />

Remove element referent to timestamp `exactTime` from the timeserie.
### fn resolve():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content of the last entry in the timeserie. It achieves the same result as `*this`.
### fn resolveAt(reqTime:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content at the timestamp `reqTime` in the timeserie.
If `reqTime` does not exist, it returns the content of the closest previous timestamp found, returns `null` otherwise.

It achieves the same result as:
```gcl
use util;

fn main() {
  var n = nodeTime::newAt(42_time, "hello");

  var x;
  at (42_time) {
    x = *n;
  }

  Assert::equals(n.resolveAt(42_time), x);
}
```
### fn resolveAtWithin(reqTime:&nbsp;[time](/libs/std/core/type.time.md), max_dephase:&nbsp;[duration](/libs/std/core/type.duration.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content at the timestamp `reqTime` with error margin of `max_dephase` in the timeserie.
If `reqTime` does not exist, it returns the content of the closest previous timestamp found within `reqTime` and `reqTime - max_dephase`, returns `null` otherwise.
### fn resolveTimeAt(reqTime:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Return the timestamp referent to `reqTime` in the timeserie.
If `reqTime` does not exist, it returns the closest previous timestamp found, returns `null` otherwise.
### fn resolveTimeValueAt(reqTime:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;[Tuple](/libs/std/core/type.Tuple.md)<Badge text="native" />

Return a tuple `(timestamp, content)` referent to `reqTime` in the timeserie.
If `reqTime` does not exist, it returns the closest previous timestamp found and its content, returns `null` otherwise.
### fn sample(refs:&nbsp;[Array](/libs/std/core/type.Array.md), from:&nbsp;[time](/libs/std/core/type.time.md), to:&nbsp;[time](/libs/std/core/type.time.md), maxRows:&nbsp;[int](/libs/std/core/type.int.md), mode:&nbsp;[SamplingMode](/libs/std/core/enum.SamplingMode.md), maxDephasing:&nbsp;[duration](/libs/std/core/type.duration.md), tz:&nbsp;[TimeZone](/libs/std/core/type.TimeZone.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" /><Badge text="static" />

Sample, using `mode` sampling, the nodeTimes in `refs` within the interval [`from`, `to`].
Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
### fn setAt(exactTime:&nbsp;[time](/libs/std/core/type.time.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Set `value` to timestamp `exactTime` to the timeserie. Return the `value` set.
If `exactTime` already exists, it overwrites the previous content with `value`, else a new `(timestamp, content)` pair is added to the timeserie.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Return the size of the timeserie.
