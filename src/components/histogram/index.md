# `<gui-histogram-chart />`

## General example of histogram usage in TS
  ```
  const histogramEl = document.createElement('gui-histogram-chart');
  const table = await greycat.call<core.Table>('project::histogram_table');
  histogramEl.columns = [2, 3];
  histogramEl.table = table;
  ```

## histogram.table property

Each column in the `table.cols` array should be an array with the following information:

- `table.cols[0]` = list of starting positions on the x-axis for each bar. Ex: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
- `table.cols[1]` = list of ending positions on the x-axis for each bar. Ex: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
- `table.cols[2]` = list of heights (y values) for each bar. Ex: [20.0, 15.0, 30.0, 20.0, 10.0, 1.0, 1.0, 1.0, 1.0, 1.0]
- `table.cols[3]` = list of accumulated heights (z values) after each bar. Ex: [20.0, 35.0, 65.0, 85.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0]

Metadata (`meta`) of table:

- `table.meta[i]`
- `meta` should have properties like `min` and `max` for each relevant axis.

Example of how you can create the table in GCL:

  ```gcl
  @expose
  fn histogram_table(): Table {
    var rand = Random::new();
    var table = Table::new(4);
    var accumulated_percentage = 0.0;
    var buffer = 1000.0;
    var n = 10;

    for (var i = 0; i < n; i++) {
      table.set(i, 0, i * 10);
      table.set(i, 1, (i + 1) * 10);
      var percentage = rand.uniformf(0.0, buffer);
      if (i == n - 1) {
        percentage = buffer;
      }
      accumulated_percentage = accumulated_percentage + percentage;
      buffer =  buffer - percentage;
      table.set(i, 2, percentage);
      table.set(i, 3, accumulated_percentage);
    }

    return table;
  }
  ```

## Histogram.columns property:

-  Should be a list of 2 numbers:
  -    `columns[0]` - is the id of column for y values
  -    `columns[1]` - is the id of column for z values
  