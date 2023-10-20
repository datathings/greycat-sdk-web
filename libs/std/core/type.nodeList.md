# [std](/libs/std/)::[core](/libs/std/core/)::nodeList

nodeList primitive type handle large series of values, eventually sparse.
Generic type params can specialize the contains values (V).
As any nodes, nodeList are stored to disk and compose the sets of Graph Nodes.
nodeList can handle very large series even if key are sparse and spread over the full int spectrum.

## Methods
### fn add(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Adds a new `(index, value)` pair to the nodeList. The index corresponds to the index following the last set element of the list.
### fn first():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value associated with the first element of the nodeList.
### fn firstIndex():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the first index of the nodeList.
### fn get(index:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value at `index` or `null`
### fn info(nodes:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="static" />

Returns the NodeInfo of all the nodeList passed as input paramaters.
The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeList in input array parameter.
### fn last():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value associated with the last element of the nodeList.
### fn lastIndex():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the las index of the nodeList.
### fn new():&nbsp;[nodeList](/libs/std/core/type.nodeList.md)<Badge text="native" /><Badge text="static" />

Creates a new `nodeList`.
### fn rangeSize(from:&nbsp;[int](/libs/std/core/type.int.md), to:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of elements which have been set or added to the nodeList and which index is contained within the interval `[from, to]`.
### fn remove(index:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Removes the element referent at index `index` from the nodeList.
### fn removeAll():&nbsp;any?<Badge text="native" />

Removes all elements from the nodeList.
### fn resolve(index:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value associated with the given `index` in the list.
If there is not value at the given `index`, resolve will return the closest non-`null` value with a smaller index than `index`.
### fn sample(refs:&nbsp;[Array](/libs/std/core/type.Array.md), from:&nbsp;[int](/libs/std/core/type.int.md), to:&nbsp;[int](/libs/std/core/type.int.md), maxRows:&nbsp;[int](/libs/std/core/type.int.md), mode:&nbsp;[SamplingMode](/libs/std/core/enum.SamplingMode.md), maxDephasing:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" /><Badge text="static" />

Sample, using `mode` sampling, the nodeLists in `refs` within the interval `[from, to]`.
Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
### fn set(index:&nbsp;[int](/libs/std/core/type.int.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Sets `value` at `index` in the nodeList. If a value is already inserted at `index` it is overwritten.
Returns the given `value`.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the `nodeList`.
