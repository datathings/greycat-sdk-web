# [std](/libs/std/)::[core](/libs/std/core/)::geo

GreyCat does not only provide for temporal data, but also for geographical data.
In several occasions, data are not only recorded with their position in time, but also in space. Think for instance of mobility data.
The `geo` type family provides base mechanisms to deal with geo locations.

A `geo` is used to represent a precise location on the planet using latitude and longitude in decimal format.
For instance, DataThings SA headquarters are located at `geo::new(49.59640167862028, 6.128662935665594);`.

## Attributes

### max:&nbsp;[geo](/libs/std/core/type.geo.md)

### min:&nbsp;[geo](/libs/std/core/type.geo.md)

## Methods
### fn distance(value:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the distance in meters separating the geo point and `value`.
### fn lat():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the latitude of a geo point.
### fn lng():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the longitude of geo point.
### fn new(lat:&nbsp;[float](/libs/std/core/type.float.md), lng:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" /><Badge text="static" />

Returns a new geo point, with coordinates (`lat`,`lng`).
### fn toGeohash():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns a string containing the GeoHash of the geo point coordinates.
### fn toString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns a string containing the coordinates of the geo point (eg. '49.999999988,6.00000002').
