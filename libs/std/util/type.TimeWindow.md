# [std](/libs/std/)::[util](/libs/std/util/)::TimeWindow

Windows are FIFO(_First In First Out_) structures with a fixed size.
They are used to collect a number of **numerical** values, and provides handy methods to get statistics on this set of values.

There exist two types of windows in GreyCat, `TimeWindow`s where the size is defined in time
(thus the number of values can vary), and `SlidingWindow`s where the number of elements is fixed.

`TimeWindow`s are convenient to collect values within a given period of time.
Developers would simply create a `TimeWindow` and specify the maximum time separating the first and last value of the set.
The `TimeWindow` will automatically discard old elements when the max duration between elements is reached.
In the following example, a `TimeWindow` is used to compute the average of a value by periods of 5 seconds:

```gcl
use io;
use util;

fn main() {
  var tw = TimeWindow::new();
  
  // sets the size of the window, in time.
  tw.configure(5s);
  
  for (var t = 0; t < 51; t++) {
    // add the value to the time window.
    tw.add(time::new(t, DurationUnit::seconds), t);
    
    // every five seconds
    if (t != 0 && t % 5 == 0) {
      // displays the average computed over all values from the last 5 seconds
      println("Average: ${tw.avg()}");
    }
  }
}
```

`TimeWindow`s can be iterated using for loops.
In that case the for loop iterates with 2 parameters for each element contained in the `TimeWindow` the time and the value.

```gcl
for (time, value in timeWindow) {
  // ...
}
```

## Methods
### fn add(t:&nbsp;[time](/libs/std/core/type.time.md), value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Adds a new value `value` to the window at time `t`.
Following this addition, any value which exceeds the period of time configured from the most recent timepoint will be discarded from the window.
### fn avg():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the average of the values contained in the window.
### fn clear():&nbsp;any?<Badge text="native" />

Clears the window of all its values.
### fn configure(value:&nbsp;[duration](/libs/std/core/type.duration.md)):&nbsp;any?<Badge text="native" />

Configures the size of the window in time.
### fn first():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
### fn firstTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Returns the time of the first element contained in the TimeWindow, or null if empty.
### fn last():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
### fn lastTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Returns the time of the last element contained in the TimeWindow, or null if empty.
### fn max():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the maximum of the values contained in the window.
### fn median():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the median of the values contained in the window.
### fn min():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the minimum of the values contained in the window.
### fn new():&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md)<Badge text="native" /><Badge text="static" />

Creates a new TimeWindow.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of values contained in the window.
### fn std():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the standard deviation of the values contained in the window.
### fn sum():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the sum of the values contained in the window.
### fn update(t:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?<Badge text="native" />

Moves the time window in time, so the window contains the time `t` given in parameter, without needing to add a value.
