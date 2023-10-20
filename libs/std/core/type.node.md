# [std](/libs/std/)::[core](/libs/std/core/)::node

node primitive type handle singleton value that must be stored to graph.
Generic type param can specialize the contains values.
As any nodes, node are stored to disk and compose the sets of Graph Nodes.
Node are useful to create a reference from an heavy object to be store as a light primitive value.

## Methods
### fn new(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[node](/libs/std/core/type.node.md)<Badge text="native" /><Badge text="static" />

Return a new `node<T>` element with `value` set as its content.
### fn resolve():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content of the address pointed by the node.
### fn resolve_all(n:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />

Return an array with the contents of the addresses pointed by the nodes in the array `n`
### fn set(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Sets `value` to the content of the address pointed by the node and returns the given `value`.
