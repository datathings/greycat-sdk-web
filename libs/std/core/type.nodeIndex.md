# [std](/libs/std/)::[core](/libs/std/core/)::nodeIndex

nodeIndex primitive type handle large series of values, indexed by their key.
Generic type params can specialize the contains values (V) and associated key (K).
As any nodes, nodeIndex are stored to disk and compose the sets of Graph Nodes.
nodeIndex offer a direct retrival in o(log(n)) by using the key.
This type can be compared to a hashing containers stored to disk, yet scalable.

## Methods
### fn get(key:&nbsp;[K](/libs/std/core/type.K.md)):&nbsp;[V](/libs/std/core/type.V.md)<Badge text="native" />

Returns the value associated with the `key` or `null`
### fn info(nodes:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="static" />

Returns the NodeInfo of all the nodeIndex passed as input paramaters.
The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeIndex in input array parameter.
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
