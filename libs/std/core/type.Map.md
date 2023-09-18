# [std](/libs/std/)::[core](/libs/std/core/)::Map

Maps can be used to store and fetch values using a key.

## Methods
### fn get(key:&nbsp;[K](/libs/std/core/type.K.md)):&nbsp;[V](/libs/std/core/type.V.md)<Badge text="native" />

Return the value referent to key `key` in the map.
Key `key` needs to be a primitive object or a String, else it throws a `wrong parameters` exception.
### fn new():&nbsp;[Map](/libs/std/core/type.Map.md)<Badge text="native" /><Badge text="static" />

Return a new `Map<K, V>` element, that is initialized empty.
### fn remove(key:&nbsp;[K](/libs/std/core/type.K.md)):&nbsp;any?<Badge text="native" />

Removes the `(key, value)` pair referent to key `key` from the map, decreasing its size by one.
Key `key` needs to be a primitive object or a String, else it throws a `wrong parameters` exception.
### fn set(key:&nbsp;[K](/libs/std/core/type.K.md), value:&nbsp;[V](/libs/std/core/type.V.md)):&nbsp;[V](/libs/std/core/type.V.md)<Badge text="native" />

Set the `(key, value)` pair into the map. Also return the `value` set.
Key `key` needs to be a primitive object or a String, else it throws a `wrong parameters` exception.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the size of the map.
### fn values():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />

Returns the values of the `(key, value)` pairs in the map as an array.
