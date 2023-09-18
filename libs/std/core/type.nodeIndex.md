# [std](/libs/std/)::[core](/libs/std/core/)::nodeIndex

## Methods
### fn get(key:&nbsp;[K](/libs/std/core/type.K.md)):&nbsp;[V](/libs/std/core/type.V.md)<Badge text="native" />

Returns the value associated with the `key` or `null`
### fn new():&nbsp;[nodeIndex](/libs/std/core/type.nodeIndex.md)<Badge text="native" /><Badge text="static" />

Creates a new `nodeIndex`.
### fn remove(key:&nbsp;[K](/libs/std/core/type.K.md)):&nbsp;any?<Badge text="native" />

Removes entry at `key`
### fn removeAll():&nbsp;any?<Badge text="native" />

Removes all elements from the Node map.
### fn sample(refs:&nbsp;[Array](/libs/std/core/type.Array.md), from:&nbsp;[any](/libs/std/core/type.any.md), maxRows:&nbsp;[int](/libs/std/core/type.int.md), mode:&nbsp;[SamplingMode](/libs/std/core/enum.SamplingMode.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" /><Badge text="static" />

Using `mode` sampling, samples maxRows elements from nodeIndexes in `refs`, starting from the key: from.
### fn set(key:&nbsp;[K](/libs/std/core/type.K.md), value:&nbsp;[V](/libs/std/core/type.V.md)):&nbsp;[V](/libs/std/core/type.V.md)<Badge text="native" />

Sets a `(key, value)` pair into the map and returns the given `value`.
If a value is already associated with that `key`, the previous value is overwritten.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the `nodeIndex`.
