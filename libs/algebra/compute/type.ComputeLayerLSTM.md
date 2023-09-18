# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeLayerLSTM

## Attributes

### auto_init_states:&nbsp;[bool](/libs/std/core/type.bool.md)
default value auto_init_states = true, this initializes the hx and cx states by 0 - should be false if you want to pilot the seequencing by yourself, then hx and cx needs to be binded by a proxy

### bias_initializer:&nbsp;[ComputeInitializer](/libs/algebra/compute/type.ComputeInitializer.md)

### bias_regularizer:&nbsp;[ComputeRegularizer](/libs/algebra/compute/type.ComputeRegularizer.md)

### bidirectional:&nbsp;[bool](/libs/std/core/type.bool.md)
default value bidirectional = false, if true: the output of LSTM gets doubled (one for passing on the sequence in natural order, one for passing in the opposite order

### inputs:&nbsp;[int](/libs/std/core/type.int.md)
defines the lstm inputs dimension

### layers:&nbsp;[int](/libs/std/core/type.int.md)

### outputs:&nbsp;[int](/libs/std/core/type.int.md)
defines the lstm outputs dimension at the exit of lstm, when bidirectional=true, the outputs should be an even number => the internal lstm output will be divided by 2 (half for each order of the sequence)

### return_sequences:&nbsp;[bool](/libs/std/core/type.bool.md)
default value return_sequences = true, when true returns the full 3D sequence (sequence, batch, outputs), when false it returns only the 2D of last sequence (batch, output)

### sequences:&nbsp;[int](/libs/std/core/type.int.md)

### type:&nbsp;[TensorType](/libs/std/core/enum.TensorType.md)

### use_bias:&nbsp;[bool](/libs/std/core/type.bool.md)
default value use_bias = true, lstm does input x weights + bias, if false, no bias added

### var_bias_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_cx_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_cy_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_hx_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_hy_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_c_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_cp_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_f_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_h_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_i_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_mult_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_o_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_internal_output_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_output_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_weight_name:&nbsp;[String](/libs/std/core/type.String.md)

### weight_regularizer:&nbsp;[ComputeRegularizer](/libs/algebra/compute/type.ComputeRegularizer.md)
