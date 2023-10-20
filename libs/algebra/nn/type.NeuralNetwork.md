# [algebra](/libs/algebra/)::[nn](/libs/algebra/nn/)::NeuralNetwork

## Attributes

### _lastLayer:&nbsp;[String](/libs/std/core/type.String.md)

### _lastOutput:&nbsp;[String](/libs/std/core/type.String.md)

### err_incompatible_loss:&nbsp;[String](/libs/std/core/type.String.md)

### err_last_layer_wrong:&nbsp;[String](/libs/std/core/type.String.md)

### err_layer_not_supported:&nbsp;[String](/libs/std/core/type.String.md)

### err_minimum_layers:&nbsp;[String](/libs/std/core/type.String.md)

### err_negative_in_out:&nbsp;[String](/libs/std/core/type.String.md)

### err_tensor_type_not_supported:&nbsp;[String](/libs/std/core/type.String.md)

### fixed_batch_size:&nbsp;[int](/libs/std/core/type.int.md)

### inputs:&nbsp;[int](/libs/std/core/type.int.md)

### inputs_gradients:&nbsp;[bool](/libs/std/core/type.bool.md)

### inputs_sequences:&nbsp;[int](/libs/std/core/type.int.md)

### layer_classification_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_confusion_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_loss_display_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_loss_learn_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_main_layers_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_placeholders_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_postprocess_display_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_postprocess_learn_name:&nbsp;[String](/libs/std/core/type.String.md)

### layer_preprocess_name:&nbsp;[String](/libs/std/core/type.String.md)

### layers:&nbsp;[Array](/libs/std/core/type.Array.md)

### lossLayer:&nbsp;[ComputeLayerLoss](/libs/algebra/compute/type.ComputeLayerLoss.md)

### optimizer:&nbsp;[ComputeOptimizer](/libs/algebra/compute/type.ComputeOptimizer.md)

### outputs:&nbsp;[int](/libs/std/core/type.int.md)

### outputs_sequences:&nbsp;[int](/libs/std/core/type.int.md)

### postProcessObject:&nbsp;[any](/libs/std/core/type.any.md)

### postProcessType:&nbsp;[PostProcessType](/libs/algebra/nn/type.PostProcessType.md)

### preProcessObject:&nbsp;[any](/libs/std/core/type.any.md)

### preProcessType:&nbsp;[PreProcessType](/libs/algebra/nn/type.PreProcessType.md)

### randomizeSeed:&nbsp;[bool](/libs/std/core/type.bool.md)

### seed:&nbsp;[int](/libs/std/core/type.int.md)

### seq_confusion:&nbsp;[String](/libs/std/core/type.String.md)

### seq_decode:&nbsp;[String](/libs/std/core/type.String.md)

### seq_encode:&nbsp;[String](/libs/std/core/type.String.md)

### seq_learn:&nbsp;[String](/libs/std/core/type.String.md)

### seq_loss_display:&nbsp;[String](/libs/std/core/type.String.md)

### seq_post_process:&nbsp;[String](/libs/std/core/type.String.md)

### seq_predict:&nbsp;[String](/libs/std/core/type.String.md)

### tensor_type:&nbsp;[TensorType](/libs/std/core/enum.TensorType.md)

### var_classifier_class_weights:&nbsp;[String](/libs/std/core/type.String.md)

### var_classifier_classes:&nbsp;[String](/libs/std/core/type.String.md)

### var_classifier_confusion:&nbsp;[String](/libs/std/core/type.String.md)

### var_classifier_probabilities:&nbsp;[String](/libs/std/core/type.String.md)

### var_enc_inputs_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_avg:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_max:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_min:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_space:&nbsp;[String](/libs/std/core/type.String.md)

### var_input_std:&nbsp;[String](/libs/std/core/type.String.md)

### var_inputs_name:&nbsp;[String](/libs/std/core/type.String.md)

### var_output_avg:&nbsp;[String](/libs/std/core/type.String.md)

### var_output_max:&nbsp;[String](/libs/std/core/type.String.md)

### var_output_min:&nbsp;[String](/libs/std/core/type.String.md)

### var_output_std:&nbsp;[String](/libs/std/core/type.String.md)

### var_targets_name:&nbsp;[String](/libs/std/core/type.String.md)

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
### fn getInput(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn getTarget(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn initFilter(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md)):&nbsp;any?
### fn initForPrediction(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), batchSize:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?
### fn initPrePost(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn initWithBatch(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), batch:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)
### fn initWithMemory(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), state:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md), maxMemory:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)
### fn miniBatch(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn optimize(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?
### fn setOptimizer(optimizer:&nbsp;[ComputeOptimizer](/libs/algebra/compute/type.ComputeOptimizer.md)):&nbsp;any?<Badge text="abstract" />
### fn setPostProcess(postProcess:&nbsp;[PostProcessType](/libs/algebra/nn/enum.PostProcessType.md), object:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?
### fn setPreProcess(preProcess:&nbsp;[PreProcessType](/libs/algebra/nn/enum.PreProcessType.md), object:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?
### fn test(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn train(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
### fn validation(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)
