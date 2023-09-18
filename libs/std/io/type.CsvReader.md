# [std](/libs/std/)::[io](/libs/std/io/)::CsvReader

## Methods
### fn available():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn lastLine():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />
### fn lastLineNumber():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md), format:&nbsp;[CsvFormat](/libs/std/io/type.CsvFormat.md)):&nbsp;[CsvReader](/libs/std/io/type.CsvReader.md)<Badge text="native" /><Badge text="static" />
### fn read():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />

Read a line within the CSV file, return an array of fields
### fn read_to(target:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Read a line within the CSV file, fill the target parameter with results
target paraneter can be an Array or a typed Object with or without CSVFormat columns
