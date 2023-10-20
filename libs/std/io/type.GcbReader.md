# [std](/libs/std/)::[io](/libs/std/io/)::GcbReader

GreyCat Binary (abi encoded) reader utility can read/import a stream of serializable values from file.

## Methods
### fn available():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

return the amount of available bytes in reader.
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[GcbReader](/libs/std/io/type.GcbReader.md)<Badge text="native" /><Badge text="static" />

create a new GcbReader using the path as paramater.
### fn read():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />

read a value from the reader.
