# [std](/libs/std/)::[util](/libs/std/util/)::Buffer

## Methods
### fn add(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Adds an element `v` at the end of the buffer, formatted as a string.
### fn addAndPad(v:&nbsp;[any](/libs/std/core/type.any.md), max:&nbsp;[int](/libs/std/core/type.int.md), pad:&nbsp;[char](/libs/std/core/type.char.md)):&nbsp;any?<Badge text="native" />

Adds at most `max` elements of `v` at the end of the buffer.
If `v` has less than `max` elements, fills the remaining places with `pad`.
### fn clear():&nbsp;any?<Badge text="native" />

Removes every element from the buffer.
### fn get(i:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[char](/libs/std/core/type.char.md)<Badge text="native" />

Returns the `i`th element of the buffer.
### fn new():&nbsp;[Buffer](/libs/std/util/type.Buffer.md)<Badge text="native" /><Badge text="static" />
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the buffer in number of characters.
### fn toString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the content of the entire buffer formatted as a string.
