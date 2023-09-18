# [std](/libs/std/)::[core](/libs/std/core/)::valueEnum(enumValue:&nbsp;[any](/libs/std/core/type.any.md), offset:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[any](/libs/std/core/type.any.md)
Returns the enumeration value based on the given offset.
Calling this method with an `offset` of `0` will return the given `enumValue`.

```gcl
use util;

enum Constants {
  Zero(0);
  ApproxPi(3.14);
}

fn main() {
  Assert::equals(valueEnum(Constants::ApproxPi, -1), Constants::Zero);
}
```
