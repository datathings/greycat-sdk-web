# [std](/libs/std/)::[io](/libs/std/io/)::TextWriter

Text writer utility can export values as text (utf-8), moslty used for line based format.

## Methods
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[TextWriter](/libs/std/io/type.TextWriter.md)<Badge text="native" /><Badge text="static" />

create a new TextWriter using the path as paramater.
### fn write(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

write the v param as text in writer.
### fn write_raw(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

write the v param as text in writer without escaping or protection for double quote.
### fn writeln(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />

write the v param as text in writer and add a line separator.
