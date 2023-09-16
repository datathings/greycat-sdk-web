# [std](/libs/std/)::[util](/libs/std/util/)::Assert

Assert is mainly used for testing purposes.
It verifies that assertions you make on the state of your data is correct, or throws an [Error](../core/#Error).

## Methods
### fn equals(a:&nbsp;[any](/libs/std/core/type.any.md), b:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `a` is equal to `b`, throws an error if not. `a` and `b` can be of any type.
### fn equalsd(a:&nbsp;[float](/libs/std/core/type.float.md), b:&nbsp;[float](/libs/std/core/type.float.md), epsilon:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `a` is equal to `b`, throws an error if not. `a` and `b` must be floats.
### fn equalst(a:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), b:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), epsilon:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `a` is equal to `b`, throws an error if not. `a` and `b` must be tensors.
### fn isFalse(v:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `v` is false, throws an error if not.
### fn isNotNull(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `v` is not null, throws an error if not.
### fn isNull(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `v` is null, throws an error if not.
### fn isTrue(v:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

Verifies that `v` is true, throws an error if not.
