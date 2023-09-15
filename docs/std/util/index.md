## Assert 

 Assert is mainly used for testing purposes.
 It verifies that assertions you make on the state of your data is correct, or throws an [Error](/libraries/std/core/Error/index.html).


## BoxPlotFloat 
> No documentation


## BoxPlotInt 
> No documentation


## Buffer 
> No documentation


## Crypto 
> No documentation


## Gaussian 
> No documentation


## GaussianProfile 
> No documentation


## HistogramFloat <Badge type="warning" text="@json_attr(&quot;samples&quot;, &quot;core.Table&lt;unknown&gt;&quot;)" /> 
> No documentation


## HistogramInt <Badge type="warning" text="@json_attr(&quot;samples&quot;, &quot;core.Table&lt;unknown&gt;&quot;)" /> 
> No documentation


## Iban 
> No documentation


## ProgressTracker 

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


## Quantizer 
> No documentation


## Queue <Badge type="warning" text="@iterable" /> 

 `Queues is a FIFO implementation. It can contain any kind of element.
 If the capacity is specified, elements will be dropped when size (number of element in queue) reaches the capacity.
 dropped <= [tail,...,head] <= add here
 Iterations in for loops go from tail to head by default ([0..size]);


## Random 
> No documentation


## SlidingWindow <Badge type="warning" text="@iterable" /> 

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


## TimeWindow <Badge type="warning" text="@iterable" /> 

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


