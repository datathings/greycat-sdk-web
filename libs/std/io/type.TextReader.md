# [std](/libs/std/)::[io](/libs/std/io/)::TextReader

Text reader utility can read text file line by line (utf-8)

## Methods
### fn available():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

return the amount of available bytes in reader.
### fn lineNumber():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

get the current lineNumber fron beginning (starting from 1)
### fn new(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[TextReader](/libs/std/io/type.TextReader.md)<Badge text="native" /><Badge text="static" />

create a new TextReader using the path as paramater
### fn readLine():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

read a full line of text from the reader
