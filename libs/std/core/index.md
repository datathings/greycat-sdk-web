# [std](/libs/std/)::core
## Types
### [any](./type.any.md)
wildcard type, typically to open field or variable definition to store any other types, including primitives.


### [Array](./type.Array.md)

<div class="pragmas">  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
</div>



### [bool](./type.bool.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

boolean primitive type, possible values are true or false literals.


### [char](./type.char.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

char primitive type, possible values are any ASCII char (utf-8 special char are not supported).


### [Date](./type.Date.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;iso&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;tz?&quot;, &quot;core.TimeZone&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>

Type that handle a precise moment in calendar.
It must not be confuse with time that are universal and unique.
Date are useful when event has to be compare of prcess according to human activity.


### [duration](./type.duration.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;s&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;us&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitive type that represent the difference between two time, especially useful to measure the difference between two event


### [Error](./type.Error.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;code&quot;, &quot;core.ErrorCode&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;msg?&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;value?&quot;, &quot;any&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;stack?&quot;, &quot;string[]&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>

Error type that encapsulate the instance passed to catch block or more generally throw to upper context in case of error.


### [float](./type.float.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

| Type      | Kind     | Size    | Min                      | Max                     |
| -------   | -------- | ------- | ------------------------ | ----------------------- |
| **float** | float    | 64 bits | -1.7976931348623157e+308 | 1.7976931348623157e+308 |

If you want to deal with integers, use the [int](/libs/std/core/#int) type.


### [function](./type.function.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;name&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

function pointer primtive type, store to disk is feasible but should be use consciously together with program upgrade.


### [geo](./type.geo.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;lat&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;lng&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

GreyCat does not only provide for temporal data, but also for geographical data.
In several occasions, data are not only recorded with their position in time, but also in space. Think for instance of mobility data.
The `geo` type family provides base mechanisms to deal with geo locations.

A `geo` is used to represent a precise location on the planet using latitude and longitude in decimal format.
For instance, DataThings SA headquarters are located at `geo::new(49.59640167862028, 6.128662935665594);`.


### [GeoBox](./type.GeoBox.md)
GeoBoxes are used to represent a rectangular region of the globe. This can be used to define research zones for instance.
Boxes are created using two GeoPoint, the point located in the South-West of the box, and the point located at the North-East.
For instance, the box presented in the illustration would be created like this:

```gcl
var southWestPoint = geo::new(49.5822539410434 ,6.1110676306705045);
var northEastPoint = geo::new(49.60564545210348,6.148881308061391);
var geoBox = GeoBox::new(southWestPoint,northEastPoint);
```


### [GeoCircle](./type.GeoCircle.md)
GeoCircles are used to represent a circular region of the globe. This can be used to define research zones for instance.
Circles are created using one GeoPoint as center, and a radius in meters.
For instance, the circle presented in the illustration would be created like this:

```gcl
var circleCenter = geo::new(49.59344102297059,6.129289252903732);
var geoCircle = GeoCircle::new(circleCenter, 5000.0); //5Km
```


### [GeoPoly](./type.GeoPoly.md)
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


### [int](./type.int.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

| Type      | Kind     | Size    | Min                      | Max                     |
| -------   | -------- | ------- | ------------------------ | ----------------------- |
| **int**   | signed   | 64 bits | -9223372036854775808     | 9223372036854775807     |

If you want to deal with floating pointer numbers, use the [float](/libs/std/core/#float) type.


### [Map](./type.Map.md)

<div class="pragmas">  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
</div>

Maps can be used to store and fetch values using a key.


### [node](./type.node.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@deref(&quot;resolve&quot;)"  />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

node primitive type handle singleton value that must be stored to graph.
Generic type param can specialize the contains values.
As any nodes, node are stored to disk and compose the sets of Graph Nodes.
Node are useful to create a reference from an heavy object to be store as a light primitive value.


### [nodeGeo](./type.nodeGeo.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

nodeGeo primitive type handle large series of geographical indexed values, eventually sparse.
Generic type params can specialize the contains values (V).
As any nodes, nodeGeo are stored to disk and compose the sets of Graph Nodes.
nodeGeo can handle very large series even if key are sparse and spread over the full geo spectrum.


### [nodeIndex](./type.nodeIndex.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

nodeIndex primitive type handle large series of values, indexed by their key.
Generic type params can specialize the contains values (V) and associated key (K).
As any nodes, nodeIndex are stored to disk and compose the sets of Graph Nodes.
nodeIndex offer a direct retrival in o(log(n)) by using the key.
This type can be compared to a hashing containers stored to disk, yet scalable.


### [nodeIndexBucket](./type.nodeIndexBucket.md)
nodeIndex internal usage only


### [NodeInfo](./type.NodeInfo.md)
Statistics data about any graph nodes, in particular size and values range, can be genercially paramaterize by `T`


### [nodeList](./type.nodeList.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

nodeList primitive type handle large series of values, eventually sparse.
Generic type params can specialize the contains values (V).
As any nodes, nodeList are stored to disk and compose the sets of Graph Nodes.
nodeList can handle very large series even if key are sparse and spread over the full int spectrum.


### [nodeTime](./type.nodeTime.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;ref&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@iterable" title="This type can be used in for..of loops" />
  <Badge type="warning" text="@deref(&quot;resolve&quot;)"  />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

nodeTime primitive type handle temporal series of values.
Generic type param can specialize the contains values.
As any nodes, nodeTime are stored to disk and compose the sets of Graph Nodes.


### [nodeTimeCursor](./type.nodeTimeCursor.md)

<div class="pragmas">  <Badge type="warning" text="@unserializable" title="This type does not need to be handled in bindings" />
</div>

Iterator to walk over value of nodeTime series. This utility type is very useful to create custom sampling methods.
this type can be paramaterize by generic type `T` to specialize the return of current value.


### [nodeTimeSingleton](./type.nodeTimeSingleton.md)
nodeTime internal usage only


### [String](./type.String.md)
Strings in GreyCat are not very different from other languages.
They however offer an additional feature to conveniently generate strings integrating business elements with an integrating templating system.

Also it is to be noted that Strings are objects in GreyCat, and therefore comply with the notion of ownership.
From time to time you might have the case that a String **cannot be attached** to an object. This is because the string is already attached to another object.
In that case, you need to [clone](/libs/std/core/type.String.html#fn-clone-string) the string and attach this clone to the object rather than the String directly.


### [Table](./type.Table.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;meta&quot;, &quot;core.TableColumnMeta[]&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;data&quot;, &quot;Array&lt;Array&lt;T&gt;&gt;&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>

Table are specialize data structure to organize elements of any type in a two dimentional structure.
Can be specialize be a generatic type T.


### [TableColumnMeta](./type.TableColumnMeta.md)
Meta data associated to a Table column.
These meta data can represent basic statistics for column that handle only numerical values


### [Tensor](./type.Tensor.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;dim&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;shape&quot;, &quot;number[]&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;type&quot;, &quot;core.TensorType&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;data&quot;, &quot;any&quot;)" title="Describes the property name and type when serialized to JSON" />
</div>

Data structure specialize for numerical value.
Can handle any dimensions number and created by a shape paramter based in a list of dimension and their associated size.


### [tf2d](./type.tf2d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [tf3d](./type.tf3d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [tf4d](./type.tf4d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti10d](./type.ti10d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti2d](./type.ti2d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode two integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of two values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti3d](./type.ti3d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode three integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti4d](./type.ti4d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode four integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti5d](./type.ti5d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [ti6d](./type.ti6d.md)

<div class="pragmas">  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

primitve type that encode five integers as a morton code.
as a primitive value this is lighter than storing a tuple or array of values
also the result is a comparable value that can be used in any list like data structure while respecting the ordering of all dimensions.
it is important to notice that the maximal precision depends of the number of dimensions.


### [time](./type.time.md)

<div class="pragmas">  <Badge type="warning" text="@json_attr(&quot;epoch&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;us&quot;, &quot;number&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;iso?&quot;, &quot;string&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@json_attr(&quot;tz?&quot;, &quot;core.TimeZone&quot;)" title="Describes the property name and type when serialized to JSON" />
  <Badge type="warning" text="@primitive" title="This is a primitive type" />
</div>

time represent a universal and precise moment in time. It has to be opposed to date that represent a moment in human calendar and that can be mapped eventually to several time.
There are 2 ways to create a `time` value:
- using the static `new` method conventionally
- using the literal notation (eg. `0_time`)

```gcl
use util;

fn main() {
  Assert::equals(time::new(0, DurationUnit::s), 0_time);
}
```


### [Tuple](./type.Tuple.md)
Simple association data structure to handle couple of values.
Can be specialize by generic type T and U repectively for left and right hand values.


## Enums
### [DatePart](./enum.DatePart.md)
Defines part of calendar dates


### [DurationUnit](./enum.DurationUnit.md)
enumeration of duration units commonly used, functions that manipulate
[time](/libs/std/core/type.time.html), [Date](/libs/std/core/type.Date.html) or [Duration](/libs/std/core/type.Duration.html).


### [ErrorCode](./enum.ErrorCode.md)
When an error is thrown at runtime by GreyCat, the `code` property
of the error will be one of this enumeration's value.

The `int` literal of each field represents the code that should be
returned by the runtime process on exit.

The only way to create an [Error](/libs/std/core/type.Error.html) is by throwing.


### [SamplingMode](./enum.SamplingMode.md)
sampling mode used to parameterize the sample function on nodes.
sampling mode define the shape of result of sampling methods.


### [TensorType](./enum.TensorType.md)
Type that define numerical precision of Tensor data structure


### [TimeZone](./enum.TimeZone.md)
Enum that list all available TimeZone in GreyCat.


## Functions
### fn [clone](./fn.clone)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
Returns a clone of the given value.
The main usage of this function is for [`Map`](/libs/std/core/type.Map.html)'s keys.
### fn [debug](./fn.debug)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print formatted debug log to output log file if log level is greater or equals to debug
### fn [error](./fn.error)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print formatted error log to output log file if log level is greater or equals to error
### fn [info](./fn.info)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print formatted info log to output log file if log level is greater or equals to info
### fn [parseNumber](./fn.parseNumber)(value:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
Tries to parse a [`String`](/libs/std/core/type.String.html) and returns either a [`float`](/libs/std/core/type.float.html) or an [`int`](/libs/std/core/type.int.html).

If the parse fails, an [`Error`](/lib/std/core/type.Error.html) is thrown with a `code` of [`ErrorCode::runtime_error(20)`](/libs/std/core/enum.ErrorCode.html#runtime-error-20)
### fn [print](./fn.print)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print the value without line break to the default console (or file output for task)
### fn [println](./fn.println)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print the value and a line break to the default console (or file output for task)
### fn [sameType](./fn.sameType)(p:&nbsp;[any](/libs/std/core/type.any.md), p2:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />
Return true if both param share the same type, false otherwise
### fn [setFrom](./fn.setFrom)(dst:&nbsp;[any](/libs/std/core/type.any.md), src:&nbsp;[any](/libs/std/core/type.any.md), clone:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;any?<Badge text="native" />
Assign all fields of src object to dst object, optional paramater to clone or transfer ownership
### fn [trace](./fn.trace)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print formatted trace log to output log file if log level is greater or equals to trace
### fn [valueEnum](./fn.valueEnum)(enumValue:&nbsp;[any](/libs/std/core/type.any.md), offset:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
Returns the enumeration value based on the given offset.
Calling this method with an `offset` of `0` will return the given `enumValue`.

```gcl
use util;

enum Constants {
  Zero(0);
  ApproxPi(3.14);
}

fn main() {
  Assert::equals(valueEnum(Constants::ApproxPi, -1), Constants::Zero);
}
```
### fn [valueOf](./fn.valueOf)(en:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;[any](/libs/std/core/type.any.md)<Badge text="native" />
Returns the value associated with the enumeration field.
If the field was declared without a value, `null` is returned.

```gcl
use util;

fn main() {
  Assert::equals(valueOf(ErrorCode::none), 0);
}
```
### fn [warn](./fn.warn)(v:&nbsp;[any](/libs/std/core/type.any.md)):&nbsp;any?<Badge text="native" />
Print formatted warning log to output log file if log level is greater or equals to warn
