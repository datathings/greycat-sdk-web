# [std](/libs/std/)::[util](/libs/std/util/)::Random

## Attributes

### seed:&nbsp;[int](/libs/std/core/type.int.md)

### v:&nbsp;[float](/libs/std/core/type.float.md)

## Methods
### fn char():&nbsp;[char](/libs/std/core/type.char.md)<Badge text="native" />

Generates a random char between 'a' and 'z'.
### fn gaussian(profile:&nbsp;[Gaussian](/libs/std/util/type.Gaussian.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Generates a random float from the gaussian `profile`.
### fn new():&nbsp;[Random](/libs/std/util/type.Random.md)<Badge text="native" /><Badge text="static" />

Creates a new instance of the Random object.
### fn normal(avg:&nbsp;[float](/libs/std/core/type.float.md), std:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Generates a random float from the normal distribution with average `avg` and standard deviation `std`.
### fn setSeed(seed:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Sets the seed of the random number generator using an int seed.
### fn uniform(min:&nbsp;[int](/libs/std/core/type.int.md), max:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Generates a random int between the interval [min,max[.
### fn uniformf(min:&nbsp;[float](/libs/std/core/type.float.md), max:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Generates a random float between the interval [min,max[.
### fn uniformGeo(min:&nbsp;[geo](/libs/std/core/type.geo.md), max:&nbsp;[geo](/libs/std/core/type.geo.md)):&nbsp;[geo](/libs/std/core/type.geo.md)<Badge text="native" />

Generates a random geo between the interval [min,max[.
