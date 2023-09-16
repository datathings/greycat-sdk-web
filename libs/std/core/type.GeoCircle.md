# [std](/libs/std/)::[core](/libs/std/core/)::GeoCircle

GeoCircles are used to represent a circular region of the globe. This can be used to define research zones for instance.
Circles are created using one GeoPoint as center, and a radius in meters.
For instance, the circle presented in the illustration would be created like this:

```gcl
var circleCenter = geo::new(49.59344102297059,6.129289252903732);
var geoCircle = GeoCircle::new(circleCenter, 5000.0); //5Km
```

## Attributes

### center:&nbsp;[geo](/libs/std/core/type.geo.md)

### radius:&nbsp;[float](/libs/std/core/type.float.md)

## Methods
### fn contains(point:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true if the `GeoCircle` contains the geo point geo, returns false otherwise.
### fn ne():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the North-East geo point of the bounding box containing the `GeoCircle`.
### fn new(center:&nbsp;[geo](/libs/std/core/type.geo.md), radius:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[GeoCircle](/libs/std/core/type.GeoCircle.md)<Badge text="native" /><Badge text="static" />

Returns a new `GeoCircle`, with center `geo` and radius `radius`.
### fn sw():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the South-West geo point of the bounding box containing the `GeoCircle`.
