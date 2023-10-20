# [std](/libs/std/)::[core](/libs/std/core/)::Tensor

Data structure specialize for numerical value.
Can handle any dimensions number and created by a shape paramter based in a list of dimension and their associated size.

## Methods
### fn add(pos:&nbsp;[Array](/libs/std/core/type.Array.md), value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Adds `value` to the element from the tensor in position `pos`.
### fn append(value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

can be value for 1d tensor, array for 2d tensor, or tensor in general with -1 dim
### fn clone():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a copy of tensor object.
### fn copyElementsFrom(src:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), startPos:&nbsp;[int](/libs/std/core/type.int.md), nbElem:&nbsp;[int](/libs/std/core/type.int.md), destinationPos:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Copies `nbElem` elements of `src` from position `startPos` into tensor starting at position `destinationPos`.
Throws an error if `destinationPos`+`nbElem` does not fit into tensor shape.
### fn dim():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of dimensions used in the tensor
### fn fill(value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

can be value for 1d tensor, array, or tensor to copy from
### fn get(pos:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the element of the tensor stored in postion `pos`. `pos` should be of same length as the shape of the tensor.
### fn getImag(pos:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the imaginary part of the element of the tensor stored in postion `pos`. `pos` should be of same length as the shape of the tensor.
### fn incPos(pos:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true if the position `pos` can still be incremented by one unit, false otherwise. If true, automatically modifies `pos` to next position.
### fn init(etype:&nbsp;[TensorType](/libs/std/core/enum.TensorType.md), shape:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;any?<Badge text="native" />

Initializes a Tensor object with value type `etype` and shape `shape`. Sets all values to 0 by default.
### fn initPos():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />

Returns the default starting position of the tensor.
### fn reset():&nbsp;any?<Badge text="native" />

Resets the tensor by deleting all its attributes.
### fn set(pos:&nbsp;[Array](/libs/std/core/type.Array.md), value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Sets `value` to position `pos` in the tensor.
### fn setCapacity(value:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

method to set capacity in number of elements, to avoid several resizes from append. Does not change the shape.
### fn setImag(pos:&nbsp;[Array](/libs/std/core/type.Array.md), value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Sets the imaginary part of the element of the tensor stored in postion `pos`. `pos` should be of same length as the shape of the tensor.
### fn shape():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />

Returns an array representing the shape of the tensor.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of elements in the tensor.
### fn sum():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the sum of all elements from the tensor. Only works with f64, f32, i64, i64 tensors.
### fn toString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />
### fn toTable():&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" />

Convert a 1D or 2D tensor to a table
### fn type():&nbsp;[TensorType](/libs/std/core/enum.TensorType.md)<Badge text="native" />

Returns the type of the tensor.
