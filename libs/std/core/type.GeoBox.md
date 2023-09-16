# [std](/libs/std/)::[core](/libs/std/core/)::GeoBox

GeoBoxes are used to represent a rectangular region of the globe. This can be used to define research zones for instance.
Boxes are created using two GeoPoint, the point located in the South-West of the box, and the point located at the North-East.
For instance, the box presented in the illustration would be created like this:

```gcl
var southWestPoint = geo::new(49.5822539410434 ,6.1110676306705045);
var northEastPoint = geo::new(49.60564545210348,6.148881308061391);
var geoBox = GeoBox::new(southWestPoint,northEastPoint);
```

## Attributes

### ne:&nbsp;[geo](/libs/std/core/type.geo.md)

### sw:&nbsp;[geo](/libs/std/core/type.geo.md)

## Methods
### fn contains(point:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true if the `GeoBox` contains the geo point `geo`, returns false otherwise.
### fn new(sw:&nbsp;[geo](/libs/std/core/type.geo.md), ne:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[GeoBox](/libs/std/core/type.GeoBox.md)<Badge text="native" /><Badge text="static" />

Returns a new `GeoBox`. The North-East point in represented by `ne` and the South-West point is represented by `sw`.
