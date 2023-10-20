# [std](/libs/std/)::[core](/libs/std/core/)::ti5d

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.

## Methods
### fn new(x0:&nbsp;[int](/libs/std/core/type.int.md), x1:&nbsp;[int](/libs/std/core/type.int.md), x2:&nbsp;[int](/libs/std/core/type.int.md), x3:&nbsp;[int](/libs/std/core/type.int.md), x4:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[ti5d](/libs/std/core/type.ti5d.md)<Badge text="native" /><Badge text="static" />

combine several integers to create the tuple
### fn x0():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

extract the value of dimension 0
### fn x1():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

extract the value of dimension 1
### fn x2():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

extract the value of dimension 2
### fn x3():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

extract the value of dimension 3
### fn x4():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

extract the value of dimension 4
