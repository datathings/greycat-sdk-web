# [std](/libs/std/)::[core](/libs/std/core/)::String

Strings in GreyCat are not very different from other languages.
They however offer an additional feature to conveniently generate strings integrating business elements with an integrating templating system.

Also it is to be noted that Strings are objects in GreyCat, and therefore comply with the notion of ownership.
From time to time you might have the case that a String **cannot be attached** to an object. This is because the string is already attached to another object.
In that case, you need to [clone](/libs/std/core/type.String.html#fn-clone-string) the string and attach this clone to the object rather than the String directly.

## Methods
### fn clone():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Return a new string with same content than `this`
### fn compare(v:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Compare the string with `v`.

If the string is less than `v`, `-1` is returned.
If the string is more than `v`, `1` is returned.
If the string is equal to `v`, `0` is returned.
### fn contains(v:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Verify if the string contains the substring `v`.
Returns `true` if the string contains `v`, else returns `false`.
### fn endsWith(v:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Verify if the string ends with the substring `v`.
Returns `true` if the string ends with `v`, else returns `false`.
### fn get(v:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[char](/libs/std/core/type.char.md)<Badge text="native" />

Return the char referent to offset `v`.
Offset `v` needs to be within the string bounds, else it throws an `out of bounds` exception.
### fn indexOf(v:&nbsp;[char](/libs/std/core/type.char.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the index of the first appearence of the char `v` in the string.
If the char is not found in the string, return `-1`.
### fn indexOfFrom(v:&nbsp;[char](/libs/std/core/type.char.md), i:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the index of the first appearence of the char `v` in the string, starting from offset `i`.
If the char is not found in the string, return `-1`.
### fn indexOfString(v:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Verify if the string contains the substring `v`.
Returns position in the string, else returns -1
### fn indexOfStringFrom(v:&nbsp;[String](/libs/std/core/type.String.md), i:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Verify if the string contains the substring `v`, starting from offset `i`.
Returns position in the string, else returns -1
### fn lastIndexOf(v:&nbsp;[char](/libs/std/core/type.char.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the index of the last appearence of the char `v` in the string.
If the char is not found in the string, return `-1`.
### fn lowercase():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Return a new string with the letters in it formatted to lowercase
### fn replace(s:&nbsp;[String](/libs/std/core/type.String.md), s2:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

clone the current string and replace all occurence of s with s2
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the string
### fn slice(from:&nbsp;[int](/libs/std/core/type.int.md), to:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns a substring from offset `from` to offset `to` of the string.

`from` needs to be smaller than `to`, or `null` is returned.
`to` needs to be smaller than the size of the string, or `null` is returned.
Both parameters need to be positive, else it throws a `wrong parameters` exception.
### fn startsWith(v:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Verify if the string starts with the substring `v`.
Returns `true` if the string starts with `v`, else returns `false`.
### fn trim():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Removes leading and trailing characters from the string.
### fn uppercase():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Return a new string with the letters in it formatted to uppercase
