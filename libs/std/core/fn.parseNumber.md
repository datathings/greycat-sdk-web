# [std](/libs/std/)::[core](/libs/std/core/)::parseNumber(value:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[any](/libs/std/core/type.any.md)
Tries to parse a [`String`](/libs/std/core/type.String.html) and returns either a [`float`](/libs/std/core/type.float.html) or an [`int`](/libs/std/core/type.int.html).

If the parse fails, an [`Error`](/lib/std/core/type.Error.html) is thrown with a `code` of [`ErrorCode::runtime_error(20)`](/libs/std/core/enum.ErrorCode.html#runtime-error-20)
