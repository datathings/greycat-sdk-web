# [algebra](/libs/algebra/)::[ml](/libs/algebra/ml/)::Polynomial

## Methods
### fn compress(originalTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), polynomialTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), maxDegree:&nbsp;[int](/libs/std/core/type.int.md), maxError:&nbsp;[float](/libs/std/core/type.float.md), maxBufferSize:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="static" />
### fn decompress(originalTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), polynomialTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), maxError:&nbsp;[float](/libs/std/core/type.float.md), decompressedTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), errorTS:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?<Badge text="static" />
### fn getDegrees():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn learn(degrees:&nbsp;[int](/libs/std/core/type.int.md), X:&nbsp;[Tensor](/libs/std/core/type.Tensor.md), Y:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />
### fn new():&nbsp;[Polynomial](/libs/algebra/ml/type.Polynomial.md)<Badge text="native" /><Badge text="static" />
### fn predict(X:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />
### fn predictValue(x:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />
