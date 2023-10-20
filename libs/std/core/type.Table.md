# [std](/libs/std/)::[core](/libs/std/core/)::Table

Table are specialize data structure to organize elements of any type in a two dimentional structure.
Can be specialize be a generatic type T.

## Methods
### fn cols():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of columns of the table.
### fn get(row:&nbsp;[int](/libs/std/core/type.int.md), col:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value located at row `row` and column `col` of the table.
### fn getMeta(col:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[TableColumnMeta](/libs/std/core/type.TableColumnMeta.md)<Badge text="native" />

Returns the meta_data about column `col` of the table.
### fn new(cols:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" /><Badge text="static" />

Returns a new table object, which `cols` columns.
### fn remove(from:&nbsp;[int](/libs/std/core/type.int.md), to:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Removes rows which indexes are within the interval `[from, to[`.
### fn rows():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of rows of the table. This number is based on the maximum index of a set column in the table, regardless of the skipped indices.
### fn set(row:&nbsp;[int](/libs/std/core/type.int.md), col:&nbsp;[int](/libs/std/core/type.int.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;any?<Badge text="native" />

Sets `value` at row `row` and column `col`.
### fn sort(col:&nbsp;[int](/libs/std/core/type.int.md), asc:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" />

Sorts rows of the table by values of column `col`. Sorts by ascending order if `asc` is set to true, sorts by descending order otherwise.
