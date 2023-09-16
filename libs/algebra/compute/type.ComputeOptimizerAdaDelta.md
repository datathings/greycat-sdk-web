# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizerAdaDelta

Optimizer that implements the [Adadelta algorithm](https://keras.io/api/optimizers/adadelta/)
Adadelta optimization is a stochastic gradient descent method that is based on adaptive learning rate per dimension to address two drawbacks:
The continual decay of learning rates throughout training.
The need for a manually selected global learning rate.
Adadelta [Zeiler, 2012](https://arxiv.org/abs/1212.5701) is a more robust extension of Adagrad that adapts learning rates based on a moving window of gradient updates, instead of accumulating all past gradients.
This way, Adadelta continues learning even when many updates have been done. Compared to Adagrad, in the original version of Adadelta you don't have to set an initial learning rate.

## Attributes

### decay_rate:&nbsp;[float](/libs/std/core/type.float.md)
The decay rate. Defaults to 0.95.

### decay_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### learning_rate_def:&nbsp;[float](/libs/std/core/type.float.md)

### smooth_epsilon:&nbsp;[float](/libs/std/core/type.float.md)
A small constant for numerical stability. Defaults to 1e-7

### smooth_epsilon_def:&nbsp;[float](/libs/std/core/type.float.md)
