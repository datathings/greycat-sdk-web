# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerAdaMax

Optimizer that implements the [Adamax algorithm](https://keras.io/api/optimizers/adamax/).
Adamax, a variant of Adam based on the infinity norm, is a first-order gradient-based optimization method.
Due to its capability of adjusting the learning rate based on data characteristics, it is suited to learn time-variant process, e.g., speech data with dynamically changed noise conditions.
Default parameters follow those provided in the paper [Kingma et al., 2014](https://arxiv.org/abs/1412.6980).

## Attributes

### beta1:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the 1st moment estimates. Defaults to 0.9

### beta1_def:&nbsp;[float](/libs/std/core/type.float.md)

### beta2:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the exponentially weighted infinity norm. Defaults to 0.999

### beta2_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
A small constant for numerical stability. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
