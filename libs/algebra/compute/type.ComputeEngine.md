# [algebra](/libs/algebra/)::[compute](/libs/algebra/compute/)::ComputeEngine

## Methods
### fn backward(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn compile(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), maxBatchSize:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

returns memory size
### fn compileUsing(model:&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md), capacity:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

returns batch size
### fn configure(forwardOnly:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" />
### fn derive(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn endEpoch(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn forward(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn getCounters(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[ComputeCounter](/libs/algebra/compute/type.ComputeCounter.md)<Badge text="native" />
### fn getGrad(layer_name:&nbsp;[String](/libs/std/core/type.String.md), var_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />
### fn getSeed():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn getVar(layer_name:&nbsp;[String](/libs/std/core/type.String.md), var_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="native" />
### fn initialize():&nbsp;any?<Badge text="native" />
### fn loadState(target:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md)):&nbsp;any?<Badge text="native" />
### fn loadStateString(input:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn memorySize():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn new():&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)<Badge text="native" /><Badge text="static" />
### fn optimize(layer_name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;any?<Badge text="native" />
### fn resize(batchSize:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />
### fn saveState(target:&nbsp;[ComputeState](/libs/algebra/compute/type.ComputeState.md)):&nbsp;any?<Badge text="native" />
### fn saveStateString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />
### fn setSeed(seed:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />
