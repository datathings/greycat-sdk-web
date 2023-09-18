# [std](/libs/std/)::[util](/libs/std/util/)::Gaussian

## Attributes

### count:&nbsp;[int](/libs/std/core/type.int.md)

### max:&nbsp;[float](/libs/std/core/type.float.md)

### min:&nbsp;[float](/libs/std/core/type.float.md)

### sum:&nbsp;[float](/libs/std/core/type.float.md)

### sum_sq:&nbsp;[float](/libs/std/core/type.float.md)

## Methods
### fn add(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

Adds a new value to the profile. Returns true if the value has successfully been added, false otherwise.
### fn avg():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the average of the accepted values in the profile.
### fn confidence(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Return the confidence given a value
### fn inverse_normalize(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Does value*(max-min)+min
### fn inverse_standardize(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Does (value*std)+avg
### fn normalize(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Does (value-min)/(max-min)
### fn probability(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the probability of obtaining `value` with respect to the normal law described by all the values from the profile.
### fn standardize(value:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Does (value-avg)/(std)
### fn std():&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" />

Returns the standard deviation of the accepted values in the profile.
