# [std](/libs/std/)::[io](/libs/std/io/)::JsonReader

## Methods
### fn available():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn ignore_types():&nbsp;any?<Badge text="native" />

configure the reader to ignore _types json fields potentially parsed.
After this call, all JSON Object parsed will be transformed as GreyCat maps;
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[JsonReader](/libs/std/io/type.JsonReader.md)<Badge text="native" /><Badge text="static" />
### fn parse(data:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" /><Badge text="static" />

Parse the `data` content and returns it as a JSON object
### fn read():&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
### fn readComma(f:&nbsp;[File](/libs/std/io/type.File.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Try to parse the immediate next comma, if it exists
To use when crawling JSON arrays element by element
Return true if a comma was found, false otherwise
### fn skipUntil(f:&nbsp;[File](/libs/std/io/type.File.md), token:&nbsp;[char](/libs/std/core/type.char.md)):&nbsp;any?<Badge text="native" />

Skip file until right after next JSON token potentially preceding a JSON object (`[,:`) is found
Raise an exception if the end of file was reached before any match was found
