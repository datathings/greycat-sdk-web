# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerFtrl

Optimizer that implements the [FTRL algorithm](https://keras.io/api/optimizers/ftrl/).
\"Follow The Regularized Leader\" (FTRL) is an optimization algorithm developed at Google for click-through rate prediction in the early 2010s.
It is most suitable for shallow models with large and sparse feature spaces. The algorithm is described by [McMahan et al., 2013](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41159.pdf).

## Attributes

### beta:&nbsp;[float](/libs/std/core/type.float.md)
A float value, representing the beta value from the paper. Defaults to 0.0

### beta_def:&nbsp;[float](/libs/std/core/type.float.md)

### lambda1:&nbsp;[float](/libs/std/core/type.float.md)
l1_regularization_strength, a float value, must be greater than or equal to zero. Defaults to 0.0

### lambda1_def:&nbsp;[float](/libs/std/core/type.float.md)

### lambda2:&nbsp;[float](/libs/std/core/type.float.md)
l2_regularization_strength, a float value, must be greater than or equal to zero. Defaults to 0.0

### lambda2_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)
