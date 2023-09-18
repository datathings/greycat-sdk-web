# [std](/libs/std/)::util
## Types
### [Assert](./type.Assert.md)
Assert is mainly used for testing purposes.
It verifies that assertions you make on the state of your data is correct, or throws an [Error](../core/#Error).


### [BoxPlotFloat](./type.BoxPlotFloat.md)


### [BoxPlotInt](./type.BoxPlotInt.md)


### [Buffer](./type.Buffer.md)


### [Crypto](./type.Crypto.md)


### [Gaussian](./type.Gaussian.md)


### [GaussianProfile](./type.GaussianProfile.md)


### [HistogramFloat](./type.HistogramFloat.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;nbNull&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;size&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;sum&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;sumsq&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;avg&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;std&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;min&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;max&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile25&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile50&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile75&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;whiskerLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;whiskerHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;countOutliersLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;countOutliersHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentageOutliersLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentageOutliersHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;samples&quot;, &quot;core.Table&lt;unknown&gt;&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>



### [HistogramInt](./type.HistogramInt.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;nbNull&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;size&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;sum&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;sumsq&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;avg&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;std&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;min&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;max&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile25&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile50&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentile75&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;whiskerLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;whiskerHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;countOutliersLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;countOutliersHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentageOutliersLow&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;percentageOutliersHigh&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;samples&quot;, &quot;core.Table&lt;unknown&gt;&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>



### [Iban](./type.Iban.md)


### [ProgressTracker](./type.ProgressTracker.md)
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


### [Quantizer](./type.Quantizer.md)


### [Queue](./type.Queue.md)

<div class="pragmas">  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
</div>

`Queues is a FIFO implementation. It can contain any kind of element.
If the capacity is specified, elements will be dropped when size (number of element in queue) reaches the capacity.
dropped <= [tail,...,head] <= add here
Iterations in for loops go from tail to head by default ([0..size]);


### [Random](./type.Random.md)


### [SlidingWindow](./type.SlidingWindow.md)

<div class="pragmas">  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
</div>

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


### [TimeWindow](./type.TimeWindow.md)

<div class="pragmas">  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
</div>

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


