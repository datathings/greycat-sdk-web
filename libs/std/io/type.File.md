# [std](/libs/std/)::[io](/libs/std/io/)::File

represents a file entry within operating system file system, can be plain file or directory.

## Attributes

### last_modification:&nbsp;[time](/libs/std/core/type.time.md)
last modification of the file

### path:&nbsp;[String](/libs/std/core/type.String.md)
path of the file entry

### size:&nbsp;[int](/libs/std/core/type.int.md)

## Methods
### fn baseDir():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

Returns the relative path to the directory for files

*Accessible remotely at `/files/`*
### fn copy(src_path:&nbsp;[String](/libs/std/core/type.String.md), target_path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Copy the file from disk
### fn delete(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Deletes the file or directory from disk
### fn extension():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the name of the extension specific to the file
### fn isDir():&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true in case the File describes a directory (therefore path ends with a '/'), false otherwise
### fn mkdir(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Create directory and sub directory
### fn name():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the name of the file
### fn open(path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[File](/libs/std/io/type.File.md)<Badge text="native" /><Badge text="static" />

Retrieve File from a path, return null if file not found
### fn rename(old_path:&nbsp;[String](/libs/std/core/type.String.md), new_path:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Rename the file or directory from disk
### fn sha256():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the sha256 of the file, null in case of directory
### fn taskDir():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

Returns the relative path to the directory of the current task

*Accessible remotely at `/files/<user_id>/tasks/<task_id>/`*
### fn userDir():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

Returns the relative path to the directory of the current user

*Accessible remotely at `/files/<user_id>/`*
