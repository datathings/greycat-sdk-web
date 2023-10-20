# [algebra](/libs/algebra/)::[nn](/libs/algebra/nn/)::ClassificationNetwork

## Attributes

### calculate_probabilities:&nbsp;[bool](/libs/std/core/type.bool.md)

### from_logits:&nbsp;[bool](/libs/std/core/type.bool.md)

### has_class_weights:&nbsp;[bool](/libs/std/core/type.bool.md)

## Methods
### fn addActivationLayer(activation:&nbsp;[ComputeActivation](/libs/algebra/compute/type.ComputeActivation.md)):&nbsp;any?
### fn addDenseLayer(output:&nbsp;[int](/libs/std/core/type.int.md), use_bias:&nbsp;[bool](/libs/std/core/type.bool.md), activation:&nbsp;[ComputeActivation](/libs/algebra/compute/type.ComputeActivation.md), config:&nbsp;[InitializerConfig](/libs/algebra/nn/type.InitializerConfig.md)):&nbsp;any?
### fn addFilterLayer(output:&nbsp;[int](/libs/std/core/type.int.md), maskValues:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;any?
### fn addLinearLayer(output:&nbsp;[int](/libs/std/core/type.int.md), use_bias:&nbsp;[bool](/libs/std/core/type.bool.md), config:&nbsp;[InitializerConfig](/libs/algebra/nn/type.InitializerConfig.md)):&nbsp;any?
### fn addLSTMLayer(output:&nbsp;[int](/libs/std/core/type.int.md), layers:&nbsp;[int](/libs/std/core/type.int.md), sequences:&nbsp;[int](/libs/std/core/type.int.md), use_bias:&nbsp;[bool](/libs/std/core/type.bool.md), return_sequences:&nbsp;[bool](/libs/std/core/type.bool.md), bidirectional:&nbsp;[bool](/libs/std/core/type.bool.md), config:&nbsp;[InitializerConfig](/libs/algebra/nn/type.InitializerConfig.md)):&nbsp;any?
### fn build(learningMode:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md)
### fn checkConfiguration():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="abstract" />
### fn createBindings(nn:&nbsp;[NeuralNetwork](/libs/algebra/nn/type.NeuralNetwork.md), learningMode:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md)<Badge text="static" />
### fn endEpoch(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn getClassWeights(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getConfusion(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getInput(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getPrediction(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getProbability(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getTarget(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn initFilter(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md)):&nbsp;any?
### fn initForPrediction(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), batchSize:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?
### fn initPrePost(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn initWithBatch(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), batch:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)
### fn initWithMemory(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), maxMemory:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)
### fn miniBatch(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn new(inputs:&nbsp;[int](/libs/std/core/type.int.md), classes:&nbsp;[int](/libs/std/core/type.int.md), tensor_type:&nbsp;[TensorType](/libs/std/core/enum.TensorType.md), inputs_gradients:&nbsp;[bool](/libs/std/core/type.bool.md), fixed_batch_size:&nbsp;[int](/libs/std/core/type.int.md), seed:&nbsp;[int](/libs/std/core/type.int.md), calculate_probabilities:&nbsp;[bool](/libs/std/core/type.bool.md), from_logits:&nbsp;[bool](/libs/std/core/type.bool.md), has_class_weights:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[ClassificationNetwork](/libs/algebra/nn/type.ClassificationNetwork.md)<Badge text="static" />
### fn optimize(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn predict(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), input:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn resetConfusion(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn setLoss(loss_type:&nbsp;[ComputeClassificationLoss](/libs/algebra/compute/type.ComputeClassificationLoss.md), reduction:&nbsp;[ComputeReduction](/libs/algebra/compute/type.ComputeReduction.md)):&nbsp;any?
### fn setOptimizer(optimizer:&nbsp;[ComputeOptimizer](/libs/algebra/compute/type.ComputeOptimizer.md)):&nbsp;any?<Badge text="abstract" />
### fn setPostProcess(postProcess:&nbsp;[PostProcessType](/libs/algebra/nn/enum.PostProcessType.md), object:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?
### fn setPreProcess(preProcess:&nbsp;[PreProcessType](/libs/algebra/nn/enum.PreProcessType.md), object:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?
### fn test(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn train(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn validation(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
