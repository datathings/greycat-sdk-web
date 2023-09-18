# [std](/libs/std/)::[core](/libs/std/core/)::GeoPoly

GeoPoly are used to represent a region of the globe in the form of a polygon. This can be used to define research zones for instance.
Polygons are created using an array of GeoPoint, each pont representing a vertice of the polygon.
For instance, the circle presented in the illustration would be created like this:

```gcl
var geoPoly = GeoPoly { points: [
  geo::new(49.608409550910544,6.129028242685877),
  geo::new(49.59876193206722 ,6.136720934104233),
  // ...
  geo::new(49.59897875345364 ,6.121836245523696),
  geo::new(49.608409550910544,6.129028242685877),
]};
```

## Attributes

### points:&nbsp;[Array](/libs/std/core/type.Array.md)

## Methods
### fn contains(point:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Returns true if the `GeoPoly` contains the geo point `geo`, returns false otherwise.
### fn ne():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the North-East point of the bounding box containing the GeoPoly.
### fn sw():&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Returns the South-West point of the bounding box containing the GeoPoly.
