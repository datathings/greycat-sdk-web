# [std](/libs/std/)::[util](/libs/std/util/)::ProgressTracker

The `ProgressTracker` is used to monitor the progress of a computation, hence its performance.
It gives an overall performance measure since it's been started, and interim performances between two updates (laps).

The tracker must be initiated by a call to `start()`, then calls to `update(int)` will adjust the computed progress.
ProgressTracker can be printed at any time as a JSON.
The following code snippet illustrate the use of the ProgressTracker utility while parsing CSV file lines.

```gcl
use io;
use util;

fn main() {
 var file = open("data.csv") as File;
 var tracker = ProgressTracker::new();
 // convert in MB
 tracker.setMax(file.size() / (1024 * 1024));
 tracker.start();
 
 for (line_nb, line in file[1..]) {
   if (line_nb % 5_000_000 == 0) {
     tracker.update(file.pos() / (1024 * 1024));
     println(tracker);
   }
 }
}
```

## Attributes

### counter:&nbsp;[int](/libs/std/core/type.int.md)
sum of all update values

### duration:&nbsp;[duration](/libs/std/core/type.duration.md)
overall duration of the tracker

### progress:&nbsp;[float](/libs/std/core/type.float.md)
ratio of progress from 0 to 1

### remaining:&nbsp;[duration](/libs/std/core/type.duration.md)
expecte

### speed:&nbsp;[float](/libs/std/core/type.float.md)
recorded speed in counter per / s

### start:&nbsp;[time](/libs/std/core/type.time.md)

### total:&nbsp;[int](/libs/std/core/type.int.md)
total is the maximum expected update value

## Methods
### fn update(nb:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Updates the status of the progress by adding `nb` unit steps to the tracker and updating the time elapsed since last update.
