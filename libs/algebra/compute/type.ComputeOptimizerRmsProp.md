# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerRmsProp

Optimizer that implements the [RMSprop algorithm](https://keras.io/api/optimizers/rmsprop/).
It maintains a moving (discounted) average of the square of gradients
Divide the gradient by the root of this average
This implementation of RMSprop uses plain momentum, not Nesterov momentum.
The centered version additionally maintains a moving average of the gradients, and uses that average to estimate the variance.
The algorith is discribed by [Hinton, 2012](http://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf)

## Attributes

### decay_rate:&nbsp;[float](/libs/std/core/type.float.md)
Discounting factor for the old gradients. Defaults to 0.9

### decay_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
epsilon: A small constant for numerical stability. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
