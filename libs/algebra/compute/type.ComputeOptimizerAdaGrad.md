# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerAdaGrad

Optimizer that implements the [Adagrad algorithm](https://keras.io/api/optimizers/adagrad/).
Adagrad [Duchi et al., 2011](https://www.jmlr.org/papers/volume12/duchi11a/duchi11a.pdf) is an optimizer with parameter-specific learning rates, which are adapted relative to how frequently a parameter gets updated during training.
The more updates a parameter receives, the smaller the updates.

## Attributes

### initial_accumulator:&nbsp;[float](/libs/std/core/type.float.md)
Starting value for the accumulators (per-parameter momentum values). Must be non-negative. Defaults to 0.1

### initial_accumulator_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
A small constant for numerical stability. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
