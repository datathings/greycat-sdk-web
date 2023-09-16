# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerNadam

Optimizer that implements the [Nadam algorithm](https://keras.io/api/optimizers/Nadam/).
Much like Adam is essentially RMSprop with momentum, Nadam is Adam with Nesterov momentum
Reference: [Dozat, 2015](http://cs229.stanford.edu/proj2015/054_report.pdf)

## Attributes

### beta1:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the 1st moment estimates. Defaults to 0.9

### beta1_def:&nbsp;[float](/libs/std/core/type.float.md)

### beta2:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the 2nd moment estimates. Defaults to 0.999

### beta2_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
A small constant for numerical stability. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
