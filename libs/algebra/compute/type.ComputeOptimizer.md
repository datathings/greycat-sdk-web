# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeOptimizer

ComputeOptimizer is an abstract class of optimizers for neural networks. 
As minimalistic common attributes, it hosts the learning rate with default value 0.001.
The difference is the 1/BatchSize ratio which can be seen as increasing the learning rate to BatchSize x learning rate.

## Attributes

### learning_rate:&nbsp;[float](/libs/std/core/type.float.md)
The learning rate. Defaults to 0.001.
