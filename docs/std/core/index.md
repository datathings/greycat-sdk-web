## any 
> No documentation


## Array <Badge type="warning" text="@iterable" /> 
> No documentation


## bool <Badge type="warning" text="@primitive" /> 
> No documentation


## char <Badge type="warning" text="@primitive" /> 
> No documentation


## Date <Badge type="warning" text="@json_attr(&quot;tz?&quot;, &quot;core.TimeZone&quot;)" /> 
> No documentation


## duration <Badge type="warning" text="@json_attr(&quot;us&quot;, &quot;number&quot;)" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## Error <Badge type="warning" text="@json_attr(&quot;stack?&quot;, &quot;string[]&quot;)" /> 
> No documentation


## float <Badge type="warning" text="@primitive" /> 

 | Type      | Kind     | Size    | Min                      | Max                     |
 | -------   | -------- | ------- | ------------------------ | ----------------------- |
 | **float** | float    | 64 bits | -1.7976931348623157e+308 | 1.7976931348623157e+308 |
 
 If you want to deal with integers, use the [int](#int) type.


## function <Badge type="warning" text="@json_attr(&quot;name&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## geo <Badge type="warning" text="@json_attr(&quot;lng&quot;, &quot;number&quot;)" /> <Badge type="warning" text="@primitive" /> 

 GreyCat does not only provide for temporal data, but also for geographical data.
 In several occasions, data are not only recorded with their position in time, but also in space. Think for instance of mobility data.
 The `geo` type family provides base mechanisms to deal with geo locations.
 
 A `geo` is used to represent a precise location on the planet using latitude and longitude in decimal format.
 For instance, DataThings SA headquarters are located at `geo::new(49.59640167862028, 6.128662935665594);`.


## GeoBox 

 GeoBoxes are used to represent a rectangular region of the globe. This can be used to define research zones for instance.
 Boxes are created using two GeoPoint, the point located in the South-West of the box, and the point located at the North-East.
 For instance, the box presented in the illustration would be created like this:
 
 ```gcl
 var southWestPoint = geo::new(49.5822539410434 ,6.1110676306705045);
 var northEastPoint = geo::new(49.60564545210348,6.148881308061391);
 var geoBox = GeoBox::new(southWestPoint,northEastPoint);
 ```


## GeoCircle 

 GeoCircles are used to represent a circular region of the globe. This can be used to define research zones for instance.
 Circles are created using one GeoPoint as center, and a radius in meters.
 For instance, the circle presented in the illustration would be created like this:
 
 ```gcl
 var circleCenter = geo::new(49.59344102297059,6.129289252903732);
 var geoCircle = GeoCircle::new(circleCenter, 5000.0); //5Km
 ```


## GeoPoly 

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


## int <Badge type="warning" text="@primitive" /> 

 | Type      | Kind     | Size    | Min                      | Max                     |
 | -------   | -------- | ------- | ------------------------ | ----------------------- |
 | **int**   | signed   | 64 bits | -9223372036854775808     | 9223372036854775807     |
 
 If you want to deal with floating pointer numbers, use the [float](#float) type.


## Map <Badge type="warning" text="@iterable" /> 

 Maps can be used to store and fetch values using a key.
 
 ```gcl
 // Creates and initliaze a map
 var m = Map::new();
 ```


## node <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@deref(&quot;resolve&quot;)" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## nodeGeo <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@iterable" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## nodeIndex <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@iterable" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## nodeIndexBucket 
> No documentation


## nodeList <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@iterable" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## nodeTime <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" /> <Badge type="warning" text="@iterable" /> <Badge type="warning" text="@deref(&quot;resolve&quot;)" /> <Badge type="warning" text="@primitive" /> 
> No documentation


## nodeTimeCursor <Badge type="warning" text="@unserializable" /> 
> No documentation


## NodeTimeInfo 
> No documentation


## nodeTimeSingleton 

 nodeTime internal usage only


## String 

 Strings in GreyCat are not very different from other languages.
 They however offer an additional feature to conveniently generate strings integrating business elements with an integrating templating system.
 
 Also it is to be noted that Strings are objects in GreyCat, and therefore comply with the notion of ownership.
 From time to time you might have the case that a String **cannot be attached** to an object. This is because the string is already attached to another object.
 In that case, you need to [clone](#clone) the string and attach this clone to the object rather than the String directly.


## Table <Badge type="warning" text="@json_attr(&quot;data&quot;, &quot;Array&lt;Array&lt;T&gt;&gt;&quot;)" /> 
> No documentation


## TableColumnMeta 
> No documentation


## Tensor <Badge type="warning" text="@json_attr(&quot;data&quot;, &quot;any&quot;)" /> 
> No documentation


## tf2d <Badge type="warning" text="@primitive" /> 
> No documentation


## tf3d <Badge type="warning" text="@primitive" /> 
> No documentation


## tf4d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti10d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti2d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti3d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti4d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti5d <Badge type="warning" text="@primitive" /> 
> No documentation


## ti6d <Badge type="warning" text="@primitive" /> 
> No documentation


## time <Badge type="warning" text="@json_attr(&quot;tz?&quot;, &quot;core.TimeZone&quot;)" /> <Badge type="warning" text="@primitive" /> 

 Time manipulation is very common in GreyCat, which is why we have a primitive type for it.
 
 There are 2 ways to create a `time` value:
 - using the static `new` method conventionally
 - using the literal notation (eg. `0_time`)
 
 ```gcl
 use util;
 
 fn main() {
   Assert::equals(time::new(0, DurationUnit::s), 0_time);
 }
 ```


## Tuple 
> No documentation


