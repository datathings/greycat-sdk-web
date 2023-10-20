# [std](/libs/std/)::[core](/libs/std/core/)::tf2d

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.

## Methods
### fn new(x0:&nbsp;[float](/libs/std/core/type.float.md), x1:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[tf2d](/libs/std/core/type.tf2d.md)<Badge text="native" /><Badge text="static" />

combine several floats to create the tuple
### fn x0():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

extract the value of dimension 0
### fn x1():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

extract the value of dimension 1
