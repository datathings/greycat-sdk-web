# [std](/libs/std/)::[core](/libs/std/core/)::Error

Error type that encapsulate the instance passed to catch block or more generally throw to upper context in case of error.

## Methods
### fn code():&nbsp;[ErrorCode](/libs/std/core/enum.ErrorCode.md)<Badge text="native" />

Returns the error code of the error.
### fn new(value:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[Error](/libs/std/core/type.Error.md)<Badge text="native" /><Badge text="static" />

Returns a new error object with its value set to `value`.
### fn stack():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the error formated as a string.
### fn value():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

Returns the error value of the error.
