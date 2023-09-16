# [std](/libs/std/)::[core](/libs/std/core/)::valueOf(en:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[any](/libs/std/core/type.any.md)
Returns the value associated with the enumeration field.
If the field was declared without a value, `null` is returned.

```gcl
use util;

fn main() {
  Assert::equals(valueOf(ErrorCode::none), 0);
}
```
