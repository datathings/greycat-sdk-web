# [std](/libs/std/)::[util](/libs/std/util/)::HistogramFloat

## Attributes

### table_off_count:&nbsp;[int](/libs/std/core/type.int.md)

### table_off_from:&nbsp;[int](/libs/std/core/type.int.md)

### table_off_percentage:&nbsp;[int](/libs/std/core/type.int.md)

### table_off_to:&nbsp;[int](/libs/std/core/type.int.md)

## Methods
### fn add(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />

add a value to the histogram with default count=1
### fn addWithCount(value:&nbsp;[float](/libs/std/core/type.float.md), count:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />
### fn all():&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" />
### fn avg():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the avg
### fn clear():&nbsp;any?<Badge text="native" />
### fn getCount(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

get the count of a specific value
### fn interval(from:&nbsp;[float](/libs/std/core/type.float.md), to:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" />

get the count of values in an interval [From;To[
### fn max():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the max
### fn min():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the min
### fn nbNull():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Get number of nulls
### fn percentage(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

get the percentage of a certain value
### fn percentile(percentile:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

get the value at a certain percentile
### fn percentiles(buckets:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" />

split [0 - 100[ to N intervals and get the value related to each percentile in an table
### fn sample(from:&nbsp;[float](/libs/std/core/type.float.md), to:&nbsp;[float](/libs/std/core/type.float.md), buckets:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" />

split [from - to[ to N intervals and get the count of each interval in an table
### fn setBounds(min:&nbsp;[float](/libs/std/core/type.float.md), max:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Get number of elements
### fn std():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the std
### fn sum():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the sum
### fn sumsq():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Get the sum squared
### fn toBoxPlot():&nbsp;[BoxPlotFloat](/libs/std/util/type.BoxPlotFloat.md)<Badge text="native" />
