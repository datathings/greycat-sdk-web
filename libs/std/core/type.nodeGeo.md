# [std](/libs/std/)::[core](/libs/std/core/)::nodeGeo

## Methods
### fn first():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value associated with the nodeGeo which is located the most South-West.
### fn firstIndex():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the geographic coordinates of the nodeGeo which is located the most South-West.
### fn get(index:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value of the element referrent to the coordinates `index` in the nodeGeo. If `index` does not exist, returns null.
### fn last():&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value associated with the nodeGeo which is located the most North-East.
### fn lastIndex():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the geographic coordinates of the nodeGeo which is located the most North-East.
### fn new():&nbsp;[nodeGeo](/libs/std/core/type.nodeGeo.md)<Badge text="native" /><Badge text="static" />

Returns a new `nodeGeo<T>` element.
### fn rangeSize(from:&nbsp;[geo](/libs/std/core/type.geo.md), to:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of elements from the nodeGeo which coordinates are located inside the `GeoBox` defined by `from` and `to`.
### fn remove(index:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;any?<Badge text="native" />

Removes the element referrent to the coordinates `index` in the nodeGeo.
### fn removeAll():&nbsp;any?<Badge text="native" />

Removes all elements from the nodeGeo.
### fn resolve(index:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Returns the value of the element referrent to the coordinates `index` in the nodeGeo. If `index` does not exist, returns null.
### fn sample(refs:&nbsp;[Array](/libs/std/core/type.Array.md), from:&nbsp;[geo](/libs/std/core/type.geo.md), to:&nbsp;[geo](/libs/std/core/type.geo.md), maxRows:&nbsp;[int](/libs/std/core/type.int.md), mode:&nbsp;[SamplingMode](/libs/std/core/enum.SamplingMode.md)):&nbsp;[Table](/libs/std/core/type.Table.md)<Badge text="native" /><Badge text="static" />

Sample, using `mode` sampling, the nodeLists in `refs` within the `GeoBox` initialized with the geo points `from` and `to`.
Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
### fn set(index:&nbsp;[geo](/libs/std/core/type.geo.md), value:&nbsp;[T](/libs/std/core/type.T.md)):&nbsp;[T](/libs/std/core/type.T.md)<Badge text="native" />

Sets to `value` the value of the element referrent to the coordinates `index` in the nodeGeo.
If `index` does not exist, adds the corresponding `(index, value)` pair to the graph.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the nodeGeo.
