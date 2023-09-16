# [std](/libs/std/)::[util](/libs/std/util/)::SlidingWindow

`SlidingWindow`s are convenient to collect several values. Developers would simply create a `SlidingWindow` and specify the maximum number of values in the window.
The `SlidingWindow` will automatically discard the last element when the max size is reached.
In the following example, a `SlidingWindow` is used to compute the average over 5 values:

```gcl
use io;
use util;

fn main() {
  var sw = SlidingWindow::new();
  
  // sets the size of the window, in number of elements.
  sw.configure(5);
  
  for (var i = 0; i < 51; i++) {
    // add the value to the SlidingWindo.
    sw.add(i);
    
    // every five values
    if (i != 0 && i % 5 == 0) {
      // displays the average computed the last 5 values
      println("Average:${sw.avg()}");
    }
  }
}
```

`SlidingWindow`s can be iterated using for loops.
In that case the for loop iterates with 2 parameters for each element contained in the `SlidingWindow` the index and the value.

```gcl
for (index, value in slidingWindow) {
// ...
}
```

## Methods
### fn add(value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Adds a new value value to the window. Follwong this addition, the last value in the window is discarded if the maximum size is reached.
### fn avg():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the average of the values contained in the window.
### fn clear():&nbsp;any?<Badge text="native" />

Clears the window of all its values.
### fn configure(nbElem:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Configures the size of the window in number of elements `nbElem`.
### fn max():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the maximum of the values contained in the window.
### fn median():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the median of the values contained in the window.
### fn min():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the minimum of the values contained in the window.
### fn new():&nbsp;[SlidingWindow](/libs/std/util/type.SlidingWindow.md)<Badge text="native" /><Badge text="static" />

Creates a new SlidingWindow.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of values contained in the window.
### fn std():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the standard deviation of the values contained in the window.
### fn sum():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the sum of the values contained in the window.
