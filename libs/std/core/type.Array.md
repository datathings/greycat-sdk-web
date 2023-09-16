# [std](/libs/std/)::[core](/libs/std/core/)::Array

## Methods
### fn add(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;any?<Badge text="native" />

Add `value` to the end of the array, expanding it by one position.
### fn addAll(values:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;any?<Badge text="native" />

Add all elements in `values` to the end of the array in the same order, expanding it by values.size() positions.
### fn get(i:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the element referent to position `i` in the array.
Offset `i` needs to be within the array bounds, else it throws an `out of bounds` exception.
### fn indexOf(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the index of the first appearence of `value` in the array.
If it is not found in the array, return `-1`.
### fn new(size:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />

Return a new Array with `size` elements.
All elements of the array created have their value set to `null`.
### fn rangeEquals(start:&nbsp;[int](/libs/std/core/type.int.md), end:&nbsp;[int](/libs/std/core/type.int.md), v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true if each element of the array between `start` and `end` is equal to `v`.
### fn remove(i:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Removes the array element in the index `i`, decreasing the array by one position.
Offset `i` needs to be within the array bounds, else it throws an `out of bounds` exception.
### fn set(i:&nbsp;[int](/libs/std/core/type.int.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Set `value` to the position `i` of the array. Also return the `value` set.
Offset `i` needs to be within the array bounds, else it throws an `out of bounds` exception.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the array.
### fn sort(asc:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" />

Sorts the array using quicksort algorithm.
If `asc` is true, sorts in ascending order, else in descending order.
### fn swap(i:&nbsp;[int](/libs/std/core/type.int.md), j:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Swap the content of elements in the array between offset `i` and `j`.
Offset `i` and `j` need to be within the array bounds, else it throws an `out of bounds` exception.
