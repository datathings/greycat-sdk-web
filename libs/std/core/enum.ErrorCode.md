# [std](/libs/std/)::[core](/libs/std/core/)::ErrorCode
When an error is thrown at runtime by GreyCat, the `code` property
of the error will be one of this enumeration's value.

The `int` literal of each field represents the code that should be
returned by the runtime process on exit.

The only way to create an [Error](/libs/std/core/type.Error.html) is by throwing.

## Fields

### assign_error(10)

### dimensions_mismatch(17)

### forbidden(19)

### interrupted(11)

### none

### runtime_error(20)

### throw(12)

### timeout(18)

### too_deep_iterator(2)

### too_deep_workspace(1)

### unresolved_ref(9)

### unsupported_operation(15)

### unsupported_type(16)

### wrong_dimension(14)

### wrong_null(8)

### wrong_numeric(6)

### wrong_operand(3)

### wrong_param_type(5)

### wrong_params(4)

### wrong_state(7)

### wrong_type(13)
