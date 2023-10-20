# [patterns](/libs/patterns/)::[pattern_detectors](/libs/patterns/pattern_detectors/)::PatternDetectionEngine

## Attributes

### nullReplaceConstant:&nbsp;[float](/libs/std/core/type.float.md)

### nullStrategy:&nbsp;[PatternNullStrategy](/libs/patterns/pattern_detectors/type.PatternNullStrategy.md)

### samplingPolicy:&nbsp;[SamplingPolicy](/libs/patterns/pattern_detectors/type.SamplingPolicy.md)

### state:&nbsp;[PatternDetectionEngineState](/libs/patterns/pattern_detectors/type.PatternDetectionEngineState.md)

### timeseries:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)

## Methods
### fn addPattern(from:&nbsp;[time](/libs/std/core/type.time.md), to:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?
### fn computeScores(prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn detect(sensitivity:&nbsp;[PatternDetectionSensitivity](/libs/patterns/pattern_detectors/type.PatternDetectionSensitivity.md), prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn initScoring():&nbsp;any?<Badge text="abstract" />
### fn score(index:&nbsp;[int](/libs/std/core/type.int.md), pattern:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md), timeWindow:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="abstract" />
### fn setPatternsFromMarks(marks:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?
### fn setState(newState:&nbsp;[PatternDetectionEngineState](/libs/patterns/pattern_detectors/type.PatternDetectionEngineState.md)):&nbsp;any?
