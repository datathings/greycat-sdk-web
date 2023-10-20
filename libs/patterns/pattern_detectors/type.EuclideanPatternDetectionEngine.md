# [patterns](/libs/patterns/)::[pattern_detectors](/libs/patterns/pattern_detectors/)::EuclideanPatternDetectionEngine

## Attributes

### matchingNormalisation:&nbsp;[MatchingNormalisation](/libs/patterns/pattern_detectors/type.MatchingNormalisation.md)

### std:&nbsp;[float](/libs/std/core/type.float.md)

## Methods
### fn addPattern(from:&nbsp;[time](/libs/std/core/type.time.md), to:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?
### fn computeScores(prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn detect(sensitivity:&nbsp;[PatternDetectionSensitivity](/libs/patterns/pattern_detectors/type.PatternDetectionSensitivity.md), prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn initScoring():&nbsp;any?<Badge text="abstract" />
### fn new(timeseries:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;[EuclideanPatternDetectionEngine](/libs/patterns/pattern_detectors/type.EuclideanPatternDetectionEngine.md)<Badge text="static" />
### fn score(index:&nbsp;[int](/libs/std/core/type.int.md), pattern:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md), timeWindow:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="abstract" />
### fn setPatternsFromMarks(marks:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?
### fn setState(newState:&nbsp;[PatternDetectionEngineState](/libs/patterns/pattern_detectors/type.PatternDetectionEngineState.md)):&nbsp;any?
### fn toGaussian(series:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[Gaussian](/libs/std/util/type.Gaussian.md)<Badge text="static" />
