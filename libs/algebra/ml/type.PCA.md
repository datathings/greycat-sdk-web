# [algebra](/libs/algebra/)::[ml](/libs/algebra/ml/)::PCA

## Attributes

### threshold_def:&nbsp;[float](/libs/std/core/type.float.md)

## Methods
### fn avg():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Gets the avg tensor 1D [N]
### fn best_dim():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the recommended dimension to reatain for 95% variance
### fn clone():&nbsp;[PCA](/libs/algebra/ml/type.PCA.md)<Badge text="native" />

Clones the PCA objects
### fn correlation():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Gets the correlation matrix tensor 2D [N;N]
### fn dim_info():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Gets the dimensionality reduction information, a 1D tensor of N+1 size. starts with 0 dimension = 0 variance retained, ends with dimension N with 100% of the variance retained
### fn get_dim(threshold:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of dimensions needed to reach a certain threshold of variance retained
### fn inverse_transform(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Inverse transform the tensor from dim dimensions to N dimensions. This method can be called only after a learn and a set_dim
### fn learn(correlation:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), avg:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), std:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), threshold:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />

In order to learn PCA, you should create a GaussianND first, learn the correlation, avg, std, then call this method.
Threshold is optional positive parameter, less than 1, to set what level is considered for the best dimension. Default value is 0.95 or 95% of the variance.
### fn selected_dim():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the selected dimension from the set_dim method
### fn set_dim(dim:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

sets the dimension of the PCA to reduce the space, dim <=N
### fn space():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Gets the transformation space tensor [dim ; N] that gets multiplied for the PCA transformation
### fn std():&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Gets the standard deviation tensor 1D [N]
### fn transform(input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />

Forward transform the tensor from N dimensions to dim dimensions. This method can be called only after a learn and a set_dim
