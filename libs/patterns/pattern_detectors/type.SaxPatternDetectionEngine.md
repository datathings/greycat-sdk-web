# [patterns](/libs/patterns/)::[pattern_detectors](/libs/patterns/pattern_detectors/)::SaxPatternDetectionEngine

## Attributes

### alphabet:&nbsp;[String](/libs/std/core/type.String.md)

### alphabet_boundaries:&nbsp;[Array](/libs/std/core/type.Array.md)

### alphabet_size:&nbsp;[int](/libs/std/core/type.int.md)

### fingerprint_length:&nbsp;[int](/libs/std/core/type.int.md)

### lookup_table:&nbsp;[nodeIndex](/libs/std/core/type.nodeIndex.md)

### max_distance:&nbsp;[float](/libs/std/core/type.float.md)

### pattern_fingerprints:&nbsp;[Array](/libs/std/core/type.Array.md)

## Methods
### fn addPattern(from:&nbsp;[time](/libs/std/core/type.time.md), to:&nbsp;[time](/libs/std/core/type.time.md)):&nbsp;any?
### fn computeScores(prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn detect(sensitivity:&nbsp;[PatternDetectionSensitivity](/libs/patterns/pattern_detectors/type.PatternDetectionSensitivity.md), prefix:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn fingerprint_patterns():&nbsp;any?
### fn initScoring():&nbsp;any?<Badge text="abstract" />
### fn new(timeseries:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md), alphabet_size:&nbsp;[int](/libs/std/core/type.int.md), fingerprint_length:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[PatternDetectionEngine](/libs/patterns/pattern_detectors/type.PatternDetectionEngine.md)<Badge text="static" />
### fn paa(pattern:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[Array](/libs/std/core/type.Array.md)
### fn sax(paa:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;[String](/libs/std/core/type.String.md)
### fn score(index:&nbsp;[int](/libs/std/core/type.int.md), pattern:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md), timeWindow:&nbsp;[TimeWindow](/libs/std/util/type.TimeWindow.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="abstract" />
### fn setPatternsFromMarks(marks:&nbsp;[nodeTime](/libs/std/core/type.nodeTime.md)):&nbsp;any?
### fn setState(newState:&nbsp;[PatternDetectionEngineState](/libs/patterns/pattern_detectors/type.PatternDetectionEngineState.md)):&nbsp;any?
