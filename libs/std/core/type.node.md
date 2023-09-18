# [std](/libs/std/)::[core](/libs/std/core/)::node

## Methods
### fn new(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[node](/libs/std/core/type.node.md)<Badge text="native" /><Badge text="static" />

Return a new `node<T>` element with `value` set as its content.
### fn resolve():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Return the content of the address pointed by the node.
### fn resolve_all(n:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />

Return an array with the contents of the addresses pointed by the nodes in the array `n`
### fn set(value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Sets `value` to the content of the address pointed by the node and returns the given `value`.
