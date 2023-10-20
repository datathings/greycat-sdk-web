# [std](/libs/std/)::[io](/libs/std/io/)::CsvReader

CSV reader utility can read/import a stream of serializable values from CSV lines (utf-8)

## Methods
### fn available():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

return the amount of available bytes in reader.
### fn get_pos():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns current position (from beginning of file):
### fn lastLine():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

get last parsed line
### fn lastLineNumber():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

get last parsed line number
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md), format:&nbsp;[CsvFormat](/libs/std/io/type.CsvFormat.md)):&nbsp;[CsvReader](/libs/std/io/type.CsvReader.md)<Badge text="native" /><Badge text="static" />

create a new CsvReader using the path as paramater and csv format
csv format is clone during the call and any further modifications will not be taken into account in this reader.
### fn read():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />

Read a line within the CSV file, return an array of fields
### fn read_to(target:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

Read a line within the CSV file, fill the target parameter with results
target parameter can be an Array or a typed Object with or without CSVFormat columns
### fn set_pos(pos:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Sets current position (from beginning of file)
also resets the lastLine (if new position changes current position)
