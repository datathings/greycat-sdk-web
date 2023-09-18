# [algebra](/libs/algebra/)::[ml](/libs/algebra/ml/)::GaussianND

## Methods
### fn avg():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the average of the dimension over all observations
### fn clear():&nbsp;any?<Badge text="native" />

Resets all the state of the gaussian ND for reusability of memory
### fn clone():&nbsp;[GaussianND](/libs/algebra/ml/type.GaussianND.md)<Badge text="native" />

Creates the gaussian ND to another one
### fn correlation():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 2D tensor of size [N ; N] where each value is the correlation of the dimension i with all other dimensions j
### fn covariance():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 2D tensor of size [N ; N] where each value is the covariance of the dimension i with all other dimensions j
### fn crop(from:&nbsp;[int](/libs/std/core/type.int.md), to:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[GaussianND](/libs/algebra/ml/type.GaussianND.md)<Badge text="native" />

Creates another gaussian ND with a subset of features
### fn dimensions():&nbsp;any?<Badge text="native" />

Returns N, the dimensions of the ND space
### fn inverse_min_max_scaling(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Takes a [batch ; N ] 2D tensor and returns another tensor of the same dimension where values are inverse normalization scaled to get back original values
### fn inverse_standard_scaling(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Takes a [batch ; N ] 2D tensor and returns another tensor of the same dimension where values are inverse standard scaled to get back original values
### fn learn(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;any?<Badge text="native" />

Learns from a tensor of [BatchSize x N dimension], each row is one observation, each column is one of the dimensions or features
### fn max():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the maximum of the dimension over all observations
### fn min():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the minimum of the dimension over all observations
### fn min_max_scaling(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Takes a [batch ; N ] 2D tensor and returns another tensor of the same dimension where values are scaled according to min max scaling (normalization (value - min) / (max - min))
### fn standard_scaling(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Takes a [batch ; N ] 2D tensor and returns another tensor of the same dimension where are values are scaled according to standard scaling (value - avg)/std
### fn std():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the standard deviation of the dimension over all observations
### fn sum():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the sum of the dimension over all observations
### fn sum_square():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Returns a 1D tensor of size [N] where each value is the sum of squares of the dimension over all observations
### fn total():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the total number of observations so far
