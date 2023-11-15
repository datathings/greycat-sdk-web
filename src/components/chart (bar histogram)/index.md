# `Custom <gui-chart /> for histogram`
![Histogram](assets/histogram.png)

## General example of histogram usage in TS
  ```TS
  const chartEl = document.createElement('gui-chart');
  const table = await greycat.default.call<core.Table>('project::histogram_table');

  chartEl.setConfig({
    table,
    xAxis: {
      scale: 'linear',
    },
    yAxes: {
      bars: {
        position: 'left',
      },
      acc: {
        position: 'right',
      },
    },
    series: [
      {
        type: 'bar',
        yAxis: 'bars',
        // indexes for bar X axis's starting and ending positions
        spanCol: [0, 1],
        color: 'orange',
        yCol: 2,
      },
      {
        // Line series to show the accumulative visualization of histogram data
        // Red line chart in the example picture above.
        type: 'line',
        yAxis: 'acc',
        width: 2,
        markerShape: 'square',
        markerWidth: 10,
        color: 'red',
        xCol: 0,
        yCol: 3,
      },
    ],
  });
  ```

## Recommended way of providing table into custom gui-chart (histogram) web component

  Use native gcl `HistogramFloat` or `HistogramInt` types. And use instance functions called `add()` or `addWithCount()`
  to accumulate the histogram data into the object. Finally, call `all()` function to get the histogram table, as shown
  in the below example.

  ```ts
  @expose
  fn histogram_table(): Table {
    var csvFormat = CsvFormat {};
    csvFormat.separator = ',';
    csvFormat.header_lines = 1;
    var csv = CsvReader::new("some_data.csv", csvFormat);

    var histogramHeight = HistogramFloat {};
    var histogramWeight = HistogramFloat {};
    while (csv.available() > 0) {
      var res = csv.read();
      var height_inch = res[1] as float;
      var weight_pound = res[2] as float; 

      var height_cm = height_inch * 2.54;
      var weight_kg = weight_pound * 0.453592;

      histogramHeight.add(height_cm);
      histogramWeight.add(weight_kg);
    }

    return histogramHeight.all();
  }
  ```

## Histogram table definition

  ```TS
  Each column in the `table.cols` array should be an array with the following information:

  - `table.cols[0]` = list of starting positions on the x-axis for each bar. Ex: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
  - `table.cols[1]` = list of ending positions on the x-axis for each bar. Ex: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  - `table.cols[2]` = list of heights (y values) for each bar. Ex: [20.0, 15.0, 30.0, 20.0, 10.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  - `table.cols[3]` = list of accumulated heights (z values) after each bar. Ex: [20.0, 35.0, 65.0, 85.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0]
  ```
