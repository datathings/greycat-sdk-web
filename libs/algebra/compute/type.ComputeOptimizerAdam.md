# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerAdam

Optimizer that implements the [Adam algorithm](https://keras.io/api/optimizers/adam/).
Adam optimization is a stochastic gradient descent method that is based on adaptive estimation of first-order and second-order moments.
According to [Kingma et al., 2014](https://arxiv.org/abs/1412.6980), the method is computationally efficient, has little memory requirement,
invariant to diagonal rescaling of gradients, and is well suited for problems that are large in terms of data/parameters.

## Attributes

### beta1:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the 1st moment estimates. Defaults to 0.9

### beta1_def:&nbsp;[float](/libs/std/core/type.float.md)

### beta2:&nbsp;[float](/libs/std/core/type.float.md)
The exponential decay rate for the 2nd moment estimates. Defaults to 0.999.

### beta2_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
A small constant for numerical stability. This epsilon is \"epsilon hat\" in the Kingma and Ba paper (in the formula just before Section 2.1), not the epsilon in Algorithm 1 of the paper. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
