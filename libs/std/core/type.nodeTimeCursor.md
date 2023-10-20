# [std](/libs/std/)::[core](/libs/std/core/)::nodeTimeCursor

Iterator to walk over value of nodeTime series. This utility type is very useful to create custom sampling methods.
this type can be paramaterize by generic type `T` to specialize the return of current value.

## Methods
### fn current():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

get the value of the current selected value in the time series.
### fn currentTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

get the time of the current selected value in the time series.
### fn first():&nbsp;any?<Badge text="native" />

set cursor to the first value of nodeTime
### fn init(nt:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?<Badge text="native" />

init cursor to the nt nodeTime, an already initialized cursor can be re-init with another nodeTime
### fn last():&nbsp;any?<Badge text="native" />

set cursor to the last value of nodeTime
### fn lessOrEq(t:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?<Badge text="native" />

set cursor to the previous value, lower or equal to t
### fn new():&nbsp;[nodeTimeCursor](/libs/std/core/type.nodeTimeCursor.md)<Badge text="native" /><Badge text="static" />

create a new instance of nodeTimeCustor
### fn next():&nbsp;any?<Badge text="native" />

set cursor to the next value starting from current one
### fn previous():&nbsp;any?<Badge text="native" />

set cursor to the previous value starting from current one
### fn skip(nb:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

jump over the n next values
