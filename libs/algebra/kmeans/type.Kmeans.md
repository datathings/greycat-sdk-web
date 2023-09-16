# [algebra](/libs/algebra/)::[kmeans](/libs/algebra/kmeans/)::Kmeans

## Attributes

### layer_backward:&nbsp;[String](/libs/std/core/type.String.md)

### layer_end_round:&nbsp;[String](/libs/std/core/type.String.md)

### layer_forward:&nbsp;[String](/libs/std/core/type.String.md)

### layer_init_round:&nbsp;[String](/libs/std/core/type.String.md)

### layer_placeholders:&nbsp;[String](/libs/std/core/type.String.md)

### layer_stats:&nbsp;[String](/libs/std/core/type.String.md)

### seq_backward:&nbsp;[String](/libs/std/core/type.String.md)

### seq_end_round:&nbsp;[String](/libs/std/core/type.String.md)

### seq_forward:&nbsp;[String](/libs/std/core/type.String.md)

### seq_init_round:&nbsp;[String](/libs/std/core/type.String.md)

### seq_stats:&nbsp;[String](/libs/std/core/type.String.md)

### var_assignement:&nbsp;[String](/libs/std/core/type.String.md)

### var_avg_cluster_distances:&nbsp;[String](/libs/std/core/type.String.md)

### var_centroid_distances:&nbsp;[String](/libs/std/core/type.String.md)

### var_count_centroids:&nbsp;[String](/libs/std/core/type.String.md)

### var_count_cluster_distances:&nbsp;[String](/libs/std/core/type.String.md)

### var_distance:&nbsp;[String](/libs/std/core/type.String.md)

### var_input:&nbsp;[String](/libs/std/core/type.String.md)

### var_min_distance:&nbsp;[String](/libs/std/core/type.String.md)

### var_sum_centroids:&nbsp;[String](/libs/std/core/type.String.md)

### var_sum_cluster_distances:&nbsp;[String](/libs/std/core/type.String.md)

### var_sum_min_distance:&nbsp;[String](/libs/std/core/type.String.md)

### varo_centroids:&nbsp;[String](/libs/std/core/type.String.md)

## Methods
### fn calculate_stats(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?<Badge text="static" />

A method that can be called at the end of all rounds once, to calculate the stats of the model
### fn cluster(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), minibatch:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

A method to cluster a minibatch and gets its corresponding assigned cluster ID
### fn configure(nb_clusters:&nbsp;[int](/libs/std/core/type.int.md), nb_features:&nbsp;[int](/libs/std/core/type.int.md), tensor_type:&nbsp;[TensorType](/libs/std/core/enum.TensorType.md), features_min:&nbsp;[float](/libs/std/core/type.float.md), features_max:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[ComputeModel](/libs/algebra/compute/type.ComputeModel.md)<Badge text="static" />

Configures the clustering problem, needs the number of cluster, number of features, and from which distribution to draw the initial centroids [features_min;features_max]
### fn end_round(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?<Badge text="static" />

A method that needs to be called at the end of each training round to finilize the round
### fn getAssignement(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the assignement tensor of the last minibatch
### fn getBestDistances(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the distance tensor of the last minibatch to the closest best centroid, tensor dimension is [minibatch; 1]
### fn getClustersAvgOfDistances(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the avg distances in each cluster. This method can be called only after calculate_stats is called
### fn getClustersCentroids(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the centroids of each cluster, tensor dimension is [nbCluster, nbFeatures]
### fn getClustersCounts(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the number of elements in each cluster
### fn getClustersDistancesToEachOther(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the distances of clusters between each others, tensor dimension will be [nbCluster;nbCluster]. This method can be called only after calculate_stats is called
### fn getClustersSumOfDistances(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the sum of distances of each cluster separatly
### fn getDistances(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the distance tensor of the last minibatch to all cluster centroids, tensor dimension is [minibatch; nbCluster]
### fn getSumOfDistances(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;[Tensor](/libs/std/core/type.Tensor.md)<Badge text="static" />

Gets the sum of distances of all batches, equivalent to total loss metric
### fn init_round(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md)):&nbsp;any?<Badge text="static" />

A method that needs to be called at the beginning of each training round to reset to 0 all the counters
### fn initialize(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), seed:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="static" />

Initialize the engine for clustering. This method has to becalled before running anything
### fn learn(engine:&nbsp;[ComputeEngine](/libs/algebra/compute/type.ComputeEngine.md), minibatch:&nbsp;[Tensor](/libs/std/core/type.Tensor.md)):&nbsp;any?<Badge text="static" />

A method to learn from a minibatch
