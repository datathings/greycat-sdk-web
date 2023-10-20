# [patterns](/libs/patterns/)::pattern_detectors
## Types
### [Detection](./type.Detection.md)


### [EuclideanPatternDetectionEngine](./type.EuclideanPatternDetectionEngine.md)


### [EuclideanPatternDetector](./type.EuclideanPatternDetector.md)


### [OverlappingDetection](./type.OverlappingDetection.md)


### [PatternDetectionEngine](./type.PatternDetectionEngine.md)


### [PatternDetectionEngineState](./type.PatternDetectionEngineState.md)


### [PatternDetectionSensitivity](./type.PatternDetectionSensitivity.md)


### [PatternDetector](./type.PatternDetector.md)


### [RandomPatternDetectionEngine](./type.RandomPatternDetectionEngine.md)


### [RandomPatternDetector](./type.RandomPatternDetector.md)


### [SaxPatternDetectionEngine](./type.SaxPatternDetectionEngine.md)


### [SaxPatternDetector](./type.SaxPatternDetector.md)


### [ScoreDetails](./type.ScoreDetails.md)


### [ScoreDetailsSingleton](./type.ScoreDetailsSingleton.md)


## Enums
### [MatchingNormalisation](./enum.MatchingNormalisation.md)


### [PatternDetectors](./enum.PatternDetectors.md)


### [PatternNullStrategy](./enum.PatternNullStrategy.md)


### [SamplingPolicy](./enum.SamplingPolicy.md)


## Functions
### fn [extrapolateSeries](./fn.extrapolateSeries)(timeseries:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), offset:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?
### fn [extrapolateWindow](./fn.extrapolateWindow)(timeWindow:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md), offset:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?
### fn [get_score](./fn.get_score)(normalised_score:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[float](/libs/std/core/type.float.md)
### fn [longest_pattern_duration](./fn.longest_pattern_duration)(patterns:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[duration](/libs/std/core/type.duration.md)
### fn [normalise_pattern](./fn.normalise_pattern)(pattern:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md), samplingPolicy:&nbsp;[SamplingPolicy](/libs/patterns/pattern_detectors/enum.SamplingPolicy.md)):&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md)
### fn [normalise_score](./fn.normalise_score)(score:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[int](/libs/std/core/type.int.md)
### fn [printnt](./fn.printnt)(nt:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?
