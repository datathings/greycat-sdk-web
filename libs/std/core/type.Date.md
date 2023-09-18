# [std](/libs/std/)::[core](/libs/std/core/)::Date

## Methods
### fn add(value:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;any?<Badge text="native" />

Mutates the date by adding time.

For months and years edge cases, never go beyond the end of the target month; e.g.:
- adding 1 month to January [28..31], 2011 all result in February 28, 2011
- adding 1 year to February 29, 2012 results in February 28, 2013
- adding 1 month to February 28 always results in March 28; chain with endOf(DurationUnit::months) to make sure to align

If adding would result in an illegal date (e.g. 2020-03-29T02:00:00.000000 for Europe/Luxembourg),
resolves to after the timeshift (i.e. 2020-03-29T03:00:00.000000)
### fn ceiling(unit:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;any?<Badge text="native" />

Mutates the date by setting it to the end of a unit of time.
### fn clone():&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Clone the current date
### fn day():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

month's day from 1 to 31
### fn dayOfWeek():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

week's day from 0 (Sunday) to 6 (Saturday)
### fn dayOfYear():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

year's day from 0 to 365
### fn daysInMonth():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

number of days in this date's month (28 to 31)
### fn daysInYear():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

number of days in this date's year (365 or 366)
### fn diff(x:&nbsp;[Date](/libs/std/core/type.Date.md), y:&nbsp;[Date](/libs/std/core/type.Date.md), unit:&nbsp;[DurationUnit](/libs/std/core/enum.DurationUnit.md)):&nbsp;[float](/libs/std/core/type.float.md)<Badge text="native" /><Badge text="static" />

Returns the relative difference between two dates, according to the Gregorian calendar.
Difference is computed on human understanding of dates, regardless of each date's respective time zone
For years and months, especially when one date happens in February of a leap year,
differences remain human-friendly rather than consistent, i.e.:

```
2020-02-28T00:00:00:000000 - 2019-02-28T00:00:00:000000 == 1 year
2020-02-29T00:00:00:000000 - 2019-02-28T00:00:00:000000 > 1 year
2020-02-29T23:59:59:999999 - 2019-02-28T23:59:59:999999 > 1 year
2020-03-01T00:00:00:000000 - 2019-03-01T00:00:00:000000 == 1 year

2021-02-28T00:00:00:000000 - 2020-02-28T00:00:00:000000 == 1 year
2021-02-28T00:00:00:000000 - 2020-02-29T00:00:00:000000 < 1 year
2021-02-28T23:59:59:999999 - 2020-02-29T23:59:59:999999 < 1 year
2021-03-01T00:00:00:000000 - 2020-03-01T00:00:00:000000 == 1 year
```
### fn endOfWeek():&nbsp;any?<Badge text="native" />

Mutates the date by setting it to the end of the week, with respect to the time zone.
### fn equals(x:&nbsp;[Date](/libs/std/core/type.Date.md), y:&nbsp;[Date](/libs/std/core/type.Date.md), datePart:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Returns true if both dates are within the same period of time down to the passed date part
e.g., for:
- x = 2022-01-01T12:30:00.000000
- y = 2022-01-01T12:45:30:499999
isSame(x, y, datePart) will return true for datePart from year to hours, false otherwise.
### fn floor(unit:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;any?<Badge text="native" />

Mutates the date by setting it to the start of a unit of time.
### fn format(format:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the date converted to a string using `strftime` notation
### fn fromEpoch(epoch:&nbsp;[int](/libs/std/core/type.int.md), tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Constructs a Date from given epoch and time zone

Parameters:
- epoch: relative number of seconds from 1970-01-01T00:00:00Z
- tz: Time zone of the output date
### fn fromTime(time:&nbsp;[time](/libs/std/core/type.time.md), tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Constructs a Date from given time and time zone
### fn get(part:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Get date's part

Parameters:
- part: date part to get

Returns requested date part:
- years: gregorian calendar year
- months: year's month from 1 to 12
- days: month's day from 1 to 31
- hours: day's hours from 0 to 23
- minutes: hour's minutes from 0 to 59
- seconds: minute's seconds from 0 to 59
- microseconds: offset to the microsecond, from 0 to 999,999
### fn getTimeZone():&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)<Badge text="native" />

Returns the time zone of this date
### fn hours():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

day's hours from 0 to 23
### fn isLeap(year:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

true if passed year is a leap year
### fn leapYear():&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" />

true if this date's year is a leap year
### fn max(x:&nbsp;[Date](/libs/std/core/type.Date.md), y:&nbsp;[Date](/libs/std/core/type.Date.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Returns the latest chronological date, considered regardless of their respective time zones
If both are equal, defaults to returning x
### fn microseconds():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

offset to the microsecond, from 0 to 999,999
### fn min(x:&nbsp;[Date](/libs/std/core/type.Date.md), y:&nbsp;[Date](/libs/std/core/type.Date.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Returns the first chronological date, considered regardless of their respective time zones
If both are equal, defaults to returning x
### fn minutes():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

hour's minutes from 0 to 59
### fn month():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

year's month from 1 to 12
### fn new(year:&nbsp;[int](/libs/std/core/type.int.md), month:&nbsp;[int](/libs/std/core/type.int.md), day:&nbsp;[int](/libs/std/core/type.int.md), hours:&nbsp;[int](/libs/std/core/type.int.md), minutes:&nbsp;[int](/libs/std/core/type.int.md), seconds:&nbsp;[int](/libs/std/core/type.int.md), microseconds_offset:&nbsp;[int](/libs/std/core/type.int.md), tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Construct a Date from its parts

Parameters:
- year: valid gregorian calendar year
- month: year's month from 1 to 12
- day: month's day from 1 to 31
- hours: day's hours from 0 to 23
- minutes: hour's minutes from 0 to 59
- seconds: minute's seconds from 0 to 59
- microseconds_offset: offset to the microsecond, from 0 to 999,999
### fn parse(value:&nbsp;[String](/libs/std/core/type.String.md), format:&nbsp;[String](/libs/std/core/type.String.md), tz:&nbsp;[TimeZone](/libs/std/core/type.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" /><Badge text="static" />

Parses the string parameter as a time definition according to the format definition.
Here is the format available options [](https://www.gnu.org/software/libc/manual/html_node/Formatting-Calendar-Time.html).

Throws an error if the string does not comply the defined format.
In case the format parameter is null, ISO 8601 will be used. In case the TimeZone is null, UTC will be used instead.
### fn seconds():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

minute's seconds from 0 to 59
### fn set(value:&nbsp;[int](/libs/std/core/type.int.md), part:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Set date's part

Boundaries for each part:
- years: valid gregorian calendar year
- months: year's month from 1 to 12
- days: month's day from 1 to 31
- hours: day's hours from 0 to 23
- minutes: hour's minutes from 0 to 59
- seconds: minute's seconds from 0 to 59
- microseconds: offset to the microsecond, from 0 to 999,999

Parameters:
- value: integer value to attribute
- part: date part to set

Raises a runtime error if the call to set makes the date illegal
(e.g. 2020-03-29T02:00:00.000000 for Europe/Luxembourg).
The date is then left in the illegal state.
### fn setTimeZone(tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Mutates the current date by overrding the TimeZone DatePart without touching other DatePart
### fn shiftTimeZone(tz:&nbsp;[TimeZone](/libs/std/core/enum.TimeZone.md)):&nbsp;[Date](/libs/std/core/type.Date.md)<Badge text="native" />

Mutates the current date by changing the TimeZone and recompute all DatePart accordingly
### fn startOfWeek():&nbsp;any?<Badge text="native" />

Mutates the date by setting it to the start of the week, with respect to the time zone.
### fn substract(value:&nbsp;[int](/libs/std/core/type.int.md), unit:&nbsp;[DatePart](/libs/std/core/enum.DatePart.md)):&nbsp;any?<Badge text="native" />

Mutates the date by subtracting time.

If substracting would result in an illegal date (e.g. 2020-03-29T02:00:00.000000 for Europe/Luxembourg),
resolves to before the timeshift (i.e. 2020-03-29T01:00:00.000000)
### fn toString():&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" />

Returns the date of converted to ISO 8601 format (eg. 2022-06-15T14:01:53.359026Z).
### fn totalDaysInMonth(month:&nbsp;[int](/libs/std/core/type.int.md), year:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />

number of days in passed month of passed year (28 to 31)
### fn totalDaysInYear(year:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />

number of days in passed year (365 or 366)
### fn toTime():&nbsp;[time](/libs/std/core/type.time.md)<Badge text="native" />

Exports date back to UTC time
### fn weekOfYear():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

year's week from 1 to 53 according to ISO 8601
### fn year():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

gregorian calendar year
