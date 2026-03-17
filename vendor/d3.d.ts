declare module 'd3' {
  /**
   * Version number in format _Major.Minor.BugFix_, like 7.0.0.
   */
  const version: string;
  export { version };

  export * from 'd3-array';
  export * from 'd3-axis';
  export * from 'd3-brush';
  export * from 'd3-chord';
  export * from 'd3-color';
  export * from 'd3-contour';
  export * from 'd3-delaunay';
  export * from 'd3-dispatch';
  export * from 'd3-drag';
  export * from 'd3-dsv';
  export * from 'd3-ease';
  export * from 'd3-fetch';
  export * from 'd3-force';
  export * from 'd3-format';
  export * from 'd3-geo';
  export * from 'd3-hierarchy';
  export * from 'd3-interpolate';
  export * from 'd3-path';
  export * from 'd3-polygon';
  export * from 'd3-quadtree';
  export * from 'd3-random';
  export * from 'd3-scale';
  export * from 'd3-scale-chromatic';
  export * from 'd3-selection';
  export * from 'd3-shape';
  export * from 'd3-time';
  export * from 'd3-time-format';
  export * from 'd3-timer';
  export * from 'd3-transition';
  export * from 'd3-zoom';
}

declare module 'd3-array' {
  /**
   * Administrivia: JavaScript primitive types and Date
   */
  export type Primitive = number | string | boolean | Date;

  /**
   * Administrivia: anything with a valueOf(): number method is comparable, so we allow it in numeric operations
   */
  export interface Numeric {
    valueOf(): number;
  }

  /**
   * Administrivia: a matrix of numeric values.
   * If height is not specified, it is inferred from the given width and data.length.
   */
  export interface Matrix {
    data: ArrayLike<number>;
    width: number;
    height?: number;
  }

  /**
   * Represents a nested/recursive InternMap type
   *
   * The first generic "TObject" refers to the type of the data object that is available in the accessor functions.
   * The second generic "TReduce" refers to the type of the data available at the deepest level (the result data).
   * The third generic "TKeys" refers to the type of the keys at each level of the nestes InternMap.
   */
  export type NestedInternMap<TObject, TReduce, TKeys extends unknown[]> = TKeys extends [infer TFirst, ...infer TRest]
    ? InternMap<TFirst, NestedInternMap<TObject, TReduce, TRest>>
    : TReduce;

  /**
   * Represents a nested/recursive Array type
   *
   * The first generic "TObject" refers to the type of the data object that is available in the accessor functions.
   * The second generic "TReduce" refers to the type of the data available at the deepest level (the result data).
   * The third generic "TKeys" refers to the type of the keys at each level of the nestes Array.
   */
  export type NestedArray<TObject, TReduce, TKeys extends unknown[]> = TKeys extends [infer TFirst, ...infer TRest]
    ? Array<[TFirst, NestedArray<TObject, TReduce, TRest>]>
    : TReduce;

  // --------------------------------------------------------------------------------------
  // Statistics
  // --------------------------------------------------------------------------------------

  /**
   * Return the minimum value in the array using natural order.
   */
  export function min(iterable: Iterable<string>): string | undefined;

  /**
   * Return the minimum value in the array using natural order.
   */
  export function min<T extends Numeric>(iterable: Iterable<T>): T | undefined;
  /**
   * Return the minimum value in the array using natural order.
   */
  export function min<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => string | undefined | null,
  ): string | undefined;
  /**
   * Return the minimum value in the array using natural order.
   */
  export function min<T, U extends Numeric>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
  ): U | undefined;

  /**
   * Return the index of the minimum value in the array using natural order.
   */
  export function minIndex(iterable: Iterable<unknown>): number;
  /**
   * Return the index of the minimum value in the array using natural order and a projection function to map values.
   */
  export function minIndex<TDatum>(
    iterable: Iterable<TDatum>,
    accessor: (datum: TDatum, index: number, array: Iterable<TDatum>) => unknown,
  ): number;
  /**
   * Return the index of the minimum value in the array using natural order.
   */
  export function minIndex(iterable: Iterable<unknown>): number;

  /**
   * Return the maximum value in the array of strings using natural order.
   */
  export function max(iterable: Iterable<string>): string | undefined;
  /**
   * Return the maximum value in the array of numbers using natural order.
   */
  export function max<T extends Numeric>(iterable: Iterable<T>): T | undefined;
  /**
   * Return the maximum value in the array using natural order and a projection function to map values to strings.
   */
  export function max<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => string | undefined | null,
  ): string | undefined;
  /**
   * Return the maximum value in the array using natural order and a projection function to map values to easily-sorted values.
   */
  export function max<T, U extends Numeric>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
  ): U | undefined;

  /**
   * Return the index of the maximum value in the array using natural order.
   */
  export function maxIndex(iterable: Iterable<unknown>): number;
  /**
   * Return the index of the maximum value in the array using natural order and a projection function to map values.
   */
  export function maxIndex<TDatum>(
    iterable: Iterable<TDatum>,
    accessor: (datum: TDatum, index: number, array: Iterable<TDatum>) => unknown,
  ): number;

  /**
   * Return the min and max simultaneously.
   */
  export function extent(iterable: Iterable<string>): [string, string] | [undefined, undefined];
  /**
   * Return the min and max simultaneously.
   */
  export function extent<T extends Numeric>(iterable: Iterable<T>): [T, T] | [undefined, undefined];
  /**
   * Return the min and max simultaneously.
   */
  export function extent<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => string | undefined | null,
  ): [string, string] | [undefined, undefined];
  /**
   * Return the min and max simultaneously.
   */
  export function extent<T, U extends Numeric>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
  ): [U, U] | [undefined, undefined];

  /**
   * Returns the mode of the given iterable, i.e. the value which appears the most often.
   * In case of equality, returns the first of the relevant values.
   * If the iterable contains no comparable values, returns undefined.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the mode.
   * This method ignores undefined, null and NaN values; this is useful for ignoring missing data.
   */
  export function mode(iterable: Iterable<Numeric | undefined | null>): number;
  /**
   * Returns the mode of the given iterable, i.e. the value which appears the most often.
   * In case of equality, returns the first of the relevant values.
   * If the iterable contains no comparable values, returns undefined.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the mode.
   * This method ignores undefined, null and NaN values; this is useful for ignoring missing data.
   */
  export function mode<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number;

  /**
   * Compute the sum of an array of numbers.
   */
  export function sum(iterable: Iterable<Numeric | undefined | null>): number;
  /**
   * Compute the sum of an array, using the given accessor to convert values to numbers.
   */
  export function sum<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number;

  /**
   * Return the mean of an array of numbers
   */
  export function mean(iterable: Iterable<Numeric | undefined | null>): number | undefined;
  /**
   * Return the mean of an array of numbers
   */
  export function mean<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number | undefined;

  /**
   * Return the median of an array of numbers
   */
  export function median(iterable: Iterable<Numeric | undefined | null>): number | undefined;
  /**
   * Return the median of an array of numbers
   */
  export function median<T>(
    iterable: Iterable<T>,
    accessor: (element: T, i: number, array: Iterable<T>) => number | undefined | null,
  ): number | undefined;

  /**
   * Like median, but returns the index of the element to the left of the median.
   */
  export function medianIndex(iterable: Iterable<Numeric | undefined | null>): number;
  /**
   * Like median, but returns the index of the element to the left of the median.
   */
  export function medianIndex<T>(
    iterable: Iterable<T>,
    accessor: (element: T, i: number, array: Iterable<T>) => number | undefined | null,
  ): number;

  /**
   * Returns the cumulative sum of the given iterable of numbers, as a Float64Array of the same length.
   * If the iterable contains no numbers, returns zeros.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the cumulative sum.
   * This method ignores undefined and NaN values; this is useful for ignoring missing data.
   */
  export function cumsum(iterable: Iterable<Numeric | undefined | null>): Float64Array;
  /**
   * Returns the cumulative sum of the given iterable of numbers, as a Float64Array of the same length.
   * If the iterable contains no numbers, returns zeros.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the cumulative sum.
   * This method ignores undefined and NaN values; this is useful for ignoring missing data.
   */
  export function cumsum<T>(
    iterable: Iterable<T>,
    accessor: (element: T, i: number, array: Iterable<T>) => number | undefined | null,
  ): Float64Array;

  /**
   * Returns the p-quantile of the given iterable of numbers, where p is a number in the range [0, 1].
   *
   * An optional accessor function may be specified, which is equivalent to calling array.map(accessor) before computing the quantile.
   */
  export function quantile(iterable: Iterable<Numeric | undefined | null>, p: number): number | undefined;
  /**
   * Returns the p-quantile of the given iterable of numbers, where p is a number in the range [0, 1].
   *
   * An optional accessor function may be specified, which is equivalent to calling array.map(accessor) before computing the quantile.
   */
  export function quantile<T>(
    iterable: Iterable<T>,
    p: number,
    accessor: (element: T, i: number, array: Iterable<T>) => number | undefined | null,
  ): number | undefined;

  /**
   * Similar to quantile, but returns the index to the left of p.
   */
  export function quantileIndex(iterable: Iterable<Numeric | undefined | null>, p: number): number;
  /**
   * Similar to quantile, but returns the index to the left of p.
   */
  export function quantileIndex<T>(
    iterable: Iterable<T>,
    p: number,
    accessor: (element: T, i: number, array: Iterable<T>) => number | undefined | null,
  ): number;

  /**
   * Similar to quantile, but expects the input to be a sorted array of values.
   * In contrast with quantile, the accessor is only called on the elements needed to compute the quantile.
   */
  export function quantileSorted(array: Array<Numeric | undefined | null>, p: number): number | undefined;
  /**
   * Similar to quantile, but expects the input to be a sorted array of values.
   * In contrast with quantile, the accessor is only called on the elements needed to compute the quantile.
   */
  export function quantileSorted<T>(
    array: T[],
    p: number,
    accessor: (element: T, i: number, array: T[]) => number | undefined | null,
  ): number | undefined;

  /**
   * Returns an array with the rank of each value in the iterable, i.e. the zero-based index of the value when the iterable is sorted.
   * Nullish values are sorted to the end and ranked NaN.
   * An optional comparator or accessor function may be specified; the latter is equivalent to calling array.map(accessor) before computing the ranks.
   * If comparator is not specified, it defaults to ascending.
   * Ties (equivalent values) all get the same rank, defined as the first time the value is found.
   */
  export function rank(iterable: Iterable<Numeric | undefined | null>): Float64Array;
  /**
   * Returns an array with the rank of each value in the iterable, i.e. the zero-based index of the value when the iterable is sorted.
   * Nullish values are sorted to the end and ranked NaN.
   * An optional comparator or accessor function may be specified; the latter is equivalent to calling array.map(accessor) before computing the ranks.
   * If comparator is not specified, it defaults to ascending.
   * Ties (equivalent values) all get the same rank, defined as the first time the value is found.
   */
  export function rank<T>(
    iterable: Iterable<T>,
    accessorOrComparator:
      | ((datum: T, index: number, array: Iterable<T>) => number | undefined | null)
      | ((a: T, b: T) => number | undefined | null),
  ): Float64Array;

  /**
   * Returns an unbiased estimator of the population variance of the given iterable of numbers using Welford’s algorithm.
   * If the iterable has fewer than two numbers, returns undefined.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the variance.
   * This method ignores undefined and NaN values; this is useful for ignoring missing data.
   */
  export function variance(iterable: Iterable<Numeric | undefined | null>): number | undefined;
  /**
   * Returns an unbiased estimator of the population variance of the given iterable of numbers using Welford’s algorithm.
   * If the iterable has fewer than two numbers, returns undefined.
   * An optional accessor function may be specified, which is equivalent to calling Array.from before computing the variance.
   * This method ignores undefined and NaN values; this is useful for ignoring missing data.
   */
  export function variance<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number | undefined;

  /**
   * Compute the standard deviation, defined as the square root of the bias-corrected variance, of the given array of numbers.
   */
  export function deviation(iterable: Iterable<Numeric | undefined | null>): number | undefined;
  /**
   * Compute the standard deviation, defined as the square root of the bias-corrected variance, of the given array,
   * using the given accessor to convert values to numbers.
   */
  export function deviation<T>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number | undefined;

  /**
   * Returns a full precision summation of the given values.
   * Although slower, d3.fsum can replace d3.sum wherever greater precision is needed. Uses d3.Adder.
   */
  export function fsum(values: Iterable<Numeric | undefined | null>): number;
  /**
   * Returns a full precision summation of the given values.
   * Although slower, d3.fsum can replace d3.sum wherever greater precision is needed. Uses d3.Adder.
   */
  export function fsum<T>(
    values: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): number;

  /**
   * Returns a full precision cumulative sum of the given values.
   * Although slower, d3.fcumsum can replace d3.cumsum when greater precision is needed. Uses d3.Adder.
   */
  export function fcumsum(values: Iterable<Numeric | undefined | null>): Float64Array;
  /**
   * Returns a full precision cumulative sum of the given values.
   * Although slower, d3.fcumsum can replace d3.cumsum when greater precision is needed. Uses d3.Adder.
   */
  export function fcumsum<T>(
    values: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => number | undefined | null,
  ): Float64Array;

  export class Adder {
    /**
     * Creates a full precision adder for IEEE 754 floating point numbers, setting its initial value to 0.
     */
    constructor();

    /**
     * Adds the specified number to the adder’s current value and returns the adder.
     */
    add(number: number): Adder;

    /**
     * Returns the IEEE 754 double precision representation of the adder’s current value.
     * Most useful as the short-hand notation +adder.
     */
    valueOf(): number;
  }

  // --------------------------------------------------------------------------------------
  // Search
  // --------------------------------------------------------------------------------------

  /**
   * Returns the least element of the specified iterable according to the specified comparator.
   * If comparator is not specified, it defaults to ascending.
   */
  export function least<T>(iterable: Iterable<T>, comparator?: (a: T, b: T) => number): T | undefined;
  /**
   * Returns the least element of the specified iterable according to the specified accessor.
   */
  export function least<T>(iterable: Iterable<T>, accessor: (a: T) => unknown): T | undefined;

  /**
   * Returns the index of the least element of the specified iterable according to the specified comparator.
   */
  export function leastIndex(iterable: Iterable<unknown>): number | undefined;
  /**
   * Returns the index of the least element of the specified iterable according to the specified comparator.
   */
  export function leastIndex<T>(iterable: Iterable<T>, comparator: (a: T, b: T) => number): number | undefined;
  /**
   * Returns the index of the least element of the specified iterable according to the specified accessor.
   */
  // tslint:disable-next-line:unified-signatures
  export function leastIndex<T>(iterable: Iterable<T>, accessor: (a: T) => unknown): number | undefined;

  /**
   * Returns the greatest element of the specified iterable according to the specified comparator or accessor.
   * If the given iterable contains no comparable elements (i.e., the comparator returns NaN when comparing each element to itself), returns undefined.
   * If comparator is not specified, it defaults to ascending.
   */
  export function greatest<T>(iterable: Iterable<T>, comparator?: (a: T, b: T) => number): T | undefined;
  /**
   * Returns the greatest element of the specified iterable according to the specified comparator or accessor.
   * If the given iterable contains no comparable elements (i.e., the comparator returns NaN when comparing each element to itself), returns undefined.
   * If comparator is not specified, it defaults to ascending.
   */
  export function greatest<T>(iterable: Iterable<T>, accessor: (a: T) => unknown): T | undefined;

  /**
   * Returns the index of the greatest element of the specified iterable according to the specified comparator or accessor.
   * If the given iterable contains no comparable elements (i.e., the comparator returns NaN when comparing each element to itself), returns -1.
   * If comparator is not specified, it defaults to ascending.
   */
  export function greatestIndex(iterable: Iterable<unknown>): number | undefined;
  /**
   * Returns the index of the greatest element of the specified iterable according to the specified comparator or accessor.
   * If the given iterable contains no comparable elements (i.e., the comparator returns NaN when comparing each element to itself), returns -1.
   * If comparator is not specified, it defaults to ascending.
   */
  export function greatestIndex<T>(iterable: Iterable<T>, comparator: (a: T, b: T) => number): number | undefined;
  /**
   * Returns the index of the greatest element of the specified iterable according to the specified comparator or accessor.
   * If the given iterable contains no comparable elements (i.e., the comparator returns NaN when comparing each element to itself), returns -1.
   * If comparator is not specified, it defaults to ascending.
   */
  // tslint:disable-next-line:unified-signatures
  export function greatestIndex<T>(iterable: Iterable<T>, accessor: (a: T) => unknown): number | undefined;

  export function bisectLeft(array: ArrayLike<number>, x: number, lo?: number, hi?: number): number;
  export function bisectLeft(array: ArrayLike<string>, x: string, lo?: number, hi?: number): number;
  export function bisectLeft(array: ArrayLike<Date>, x: Date, lo?: number, hi?: number): number;

  export function bisectRight(array: ArrayLike<number>, x: number, lo?: number, hi?: number): number;
  export function bisectRight(array: ArrayLike<string>, x: string, lo?: number, hi?: number): number;
  export function bisectRight(array: ArrayLike<Date>, x: Date, lo?: number, hi?: number): number;

  export function bisectCenter(array: ArrayLike<number>, x: number, lo?: number, hi?: number): number;
  export function bisectCenter(array: ArrayLike<string>, x: string, lo?: number, hi?: number): number;
  export function bisectCenter(array: ArrayLike<Date>, x: Date, lo?: number, hi?: number): number;

  export const bisect: typeof bisectRight;

  export interface Bisector<T, U> {
    left(array: ArrayLike<T>, x: U, lo?: number, hi?: number): number;
    right(array: ArrayLike<T>, x: U, lo?: number, hi?: number): number;
    center(array: ArrayLike<T>, x: U, lo?: number, hi?: number): number;
  }

  export function bisector<T, U>(comparator: (a: T, b: U) => number): Bisector<T, U>;
  // tslint:disable-next-line:unified-signatures
  export function bisector<T, U>(accessor: (x: T) => U): Bisector<T, U>;

  /**
   * Rearranges items so that all items in the [left, k] are the smallest. The k-th element will have the (k - left + 1)-th smallest value in [left, right].
   *
   * @param array The array to partially sort (in place).
   * @param k The middle index for partial sorting.
   * @param left The left index of the range to sort.
   * @param right The right index.
   * @param compare The compare function.
   */
  export function quickselect<T>(
    array: ArrayLike<T>,
    k: number,
    left?: number,
    right?: number,
    compare?: (a: Primitive | undefined, b: Primitive | undefined) => number,
  ): T[];

  // NB. this is limited to primitive values due to D3's use of the <, >, and >= operators. Results get weird for object instances.
  /**
   * Compares two primitive values for sorting (in ascending order).
   */
  export function ascending(a: Primitive | undefined, b: Primitive | undefined): number;

  // NB. this is limited to primitive values due to D3's use of the <, >, and >= operators. Results get weird for object instances.
  /**
   * Compares two primitive values for sorting (in descending order).
   */
  export function descending(a: Primitive | undefined, b: Primitive | undefined): number;

  // --------------------------------------------------------------------------------------
  // Transformations
  // --------------------------------------------------------------------------------------

  /**
   * Groups the specified iterable of values into an InternMap from key to array of value.
   *
   * @param iterable The iterable to group.
   * @param keys The key functions.
   */
  export function group<TObject, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedInternMap<TObject, TObject[], TKeys>;

  /**
   * Equivalent to group, but returns nested arrays instead of nested maps.
   *
   * @param iterable The iterable to group.
   * @param keys The key functions.
   */
  export function groups<TObject, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedArray<TObject, TObject[], TKeys>;

  /**
   * Equivalent to group, but returns a flat array of [key0, key1, …, values] instead of nested maps.
   *
   * @param iterable The iterable to group.
   * @param keys The key functions.
   */
  export function flatGroup<TObject, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): Array<[...TKeys, TObject[]]>;

  /**
   * Equivalent to group but returns a unique value per compound key instead of an array, throwing if the key is not unique.
   *
   * @param iterable The iterable to group.
   * @param key The key functions.
   */
  export function index<TObject, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedInternMap<TObject, TObject, TKeys>;

  /**
   * Equivalent to index, but returns nested arrays instead of nested maps.
   *
   * @param iterable The iterable to group.
   * @param keys The key functions.
   */
  export function indexes<TObject, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedArray<TObject, TObject, TKeys>;

  /**
   * Groups and reduces the specified array of values into an InternMap from key to value.
   *
   * @param iterable The iterable to group.
   * @param reduce The reduce function.
   * @param keys The key functions.
   */
  export function rollup<TObject, TReduce, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    reduce: (values: TObject[]) => TReduce,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedInternMap<TObject, TReduce, TKeys>;

  /**
   * Equivalent to rollup, but returns nested arrays instead of nested maps.
   *
   * @param iterable The iterable to group.
   * @param reduce The reduce function.
   * @param keys The key functions.
   */
  export function rollups<TObject, TReduce, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    reduce: (values: TObject[]) => TReduce,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): NestedArray<TObject, TReduce, TKeys>;

  /**
   * Equivalent to rollup, but returns a flat array of [key0, key1, …, value] instead of nested maps.
   *
   * @param iterable The iterable to group.
   * @param reduce The reduce function.
   * @param keys The key functions.
   */
  export function flatRollup<TObject, TReduce, TKeys extends unknown[]>(
    iterable: Iterable<TObject>,
    reduce: (values: TObject[]) => TReduce,
    ...keys: {
      [Index in keyof TKeys]: (value: TObject, index: number, values: TObject[]) => TKeys[Index];
    }
  ): Array<[...TKeys, TReduce]>;

  /**
   * Groups the specified iterable of elements according to the specified key function, sorts the groups according to the specified comparator, and then returns an array of keys in sorted order.
   * The comparator will be asked to compare two groups a and b and should return a negative value if a should be before b, a positive value if a should be after b, or zero for a partial ordering.
   */
  export function groupSort<TObject, TKey>(
    iterable: Iterable<TObject>,
    comparator: (a: TObject[], b: TObject[]) => number,
    key: (value: TObject) => TKey,
  ): TKey[];
  /**
   * Groups the specified iterable of elements according to the specified key function, sorts the groups according to the specified accessor, and then returns an array of keys in sorted order.
   */
  export function groupSort<TObject, TKey>(
    iterable: Iterable<TObject>,
    // tslint:disable-next-line:unified-signatures
    accessor: (value: TObject[]) => unknown,
    key: (value: TObject) => TKey,
  ): TKey[];

  /**
   * Returns the number of valid number values (i.e., not null, NaN, or undefined) in the specified iterable; accepts an accessor.
   *
   * @param iterable Input array.
   */
  export function count(iterable: Iterable<unknown>): number;
  /**
   * Returns the number of valid number values (i.e., not null, NaN, or undefined) in the specified iterable; accepts an accessor.
   *
   * @param iterable Input array.
   * @param accessor Accessor method.
   */
  export function count<TObject>(
    iterable: Iterable<TObject>,
    accessor: (a: TObject, b: TObject) => number | null | undefined,
  ): number;

  /**
   * Returns the Cartesian product of the two arrays a and b.
   * For each element i in the specified array a and each element j in the specified array b, in order,
   * it creates a two-element array for each pair.
   *
   * @param a First input array.
   * @param b Second input array.
   */
  export function cross<S, T>(a: Iterable<S>, b: Iterable<T>): Array<[S, T]>;

  /**
   * Returns the Cartesian product of the two arrays a and b.
   * For each element i in the specified array a and each element j in the specified array b, in order,
   * invokes the specified reducer function passing the element i and element j.
   *
   * @param a First input array.
   * @param b Second input array.
   * @param reducer A reducer function taking as input an element from "a" and "b" and returning a reduced value.
   */
  export function cross<S, T, U>(a: Iterable<S>, b: Iterable<T>, reducer: (a: S, b: T) => U): U[];

  /**
   * Merges the specified arrays into a single array.
   */
  export function merge<T>(iterables: Iterable<Iterable<T>>): T[];

  /**
   * For each adjacent pair of elements in the specified array, returns a new array of tuples of elements i and i - 1.
   * Returns the empty array if the input array has fewer than two elements.
   *
   * @param iterable Array of input elements
   */
  export function pairs<T>(iterable: Iterable<T>): Array<[T, T]>;
  /**
   * For each adjacent pair of elements in the specified array, in order, invokes the specified reducer function passing the element i and element i - 1.
   * Returns the resulting array of pair-wise reduced elements.
   * Returns the empty array if the input array has fewer than two elements.
   *
   * @param iterable Array of input elements
   * @param reducer A reducer function taking as input to adjacent elements of the input array and returning a reduced value.
   */
  export function pairs<T, U>(iterable: Iterable<T>, reducer: (a: T, b: T) => U): U[];

  /**
   * Returns a permutation of the specified source object (or array) using the specified iterable of keys.
   * The returned array contains the corresponding property of the source object for each key in keys, in order.
   * For example, `permute(["a", "b", "c"], [1, 2, 0]) // ["b", "c", "a"]`
   *
   * It is acceptable to have more keys than source elements, and for keys to be duplicated or omitted.
   */
  export function permute<T>(source: { [key: number]: T }, keys: Iterable<number>): T[];
  /**
   * Extract the values from an object into an array with a stable order. For example:
   * `var object = {yield: 27, year: 1931, site: "University Farm"};`
   * `d3.permute(object, ["site", "yield"]); // ["University Farm", 27]`
   */
  export function permute<T, K extends keyof T>(source: T, keys: Iterable<K>): Array<T[K]>;

  /**
   * Randomizes the order of the specified array using the Fisher–Yates shuffle.
   */
  export function shuffle<T>(array: T[], lo?: number, hi?: number): T[];
  export function shuffle(array: Int8Array, lo?: number, hi?: number): Int8Array;
  export function shuffle(array: Uint8Array, lo?: number, hi?: number): Uint8Array;
  export function shuffle(array: Uint8ClampedArray, lo?: number, hi?: number): Uint8ClampedArray;
  export function shuffle(array: Int16Array, lo?: number, hi?: number): Int16Array;
  export function shuffle(array: Uint16Array, lo?: number, hi?: number): Uint16Array;
  export function shuffle(array: Int32Array, lo?: number, hi?: number): Int32Array;
  export function shuffle(array: Uint32Array, lo?: number, hi?: number): Uint32Array;
  export function shuffle(array: Float32Array, lo?: number, hi?: number): Float32Array;
  export function shuffle(array: Float64Array, lo?: number, hi?: number): Float64Array;

  /**
   * Returns a shuffle function given the specified random source.
   */
  export function shuffler(random: () => number): typeof shuffle;

  /**
   * Generate an array of approximately count + 1 uniformly-spaced, nicely-rounded values between start and stop (inclusive).
   * Each value is a power of ten multiplied by 1, 2 or 5. See also d3.tickIncrement, d3.tickStep and linear.ticks.
   *
   * Ticks are inclusive in the sense that they may include the specified start and stop values if (and only if) they are exact,
   * nicely-rounded values consistent with the inferred step. More formally, each returned tick t satisfies start ≤ t and t ≤ stop.
   *
   * @param start Start value for ticks
   * @param stop Stop value for ticks
   * @param count count + 1 is the approximate number of ticks to be returned by d3.ticks.
   */
  export function ticks(start: number, stop: number, count: number): number[];

  /**
   * Returns the difference between adjacent tick values if the same arguments were passed to d3.ticks:
   * a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5.
   *
   * Like d3.tickStep, except requires that start is always less than or equal to stop, and if the tick step for the given start,
   * stop and count would be less than one, returns the negative inverse tick step instead.
   *
   * This method is always guaranteed to return an integer, and is used by d3.ticks to avoid guarantee that the returned tick values
   * are represented as precisely as possible in IEEE 754 floating point.
   *
   * @param start Start value for ticks
   * @param stop Stop value for ticks
   * @param count count + 1 is the approximate number of ticks to be returned by d3.ticks.
   */
  export function tickIncrement(start: number, stop: number, count: number): number;

  /**
   * Returns the difference between adjacent tick values if the same arguments were passed to d3.ticks:
   * a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5.
   *
   * Note that due to the limited precision of IEEE 754 floating point, the returned value may not be exact decimals;
   * use d3-format to format numbers for human consumption.
   *
   * @param start Start value for ticks
   * @param stop Stop value for ticks
   * @param count count + 1 is the approximate number of ticks to be returned by d3.ticks.
   */
  export function tickStep(start: number, stop: number, count: number): number;

  /**
   * Returns a new interval [niceStart, niceStop] covering the given interval [start, stop] and where niceStart and niceStop are guaranteed to align with the corresponding tick step.
   * Like d3.tickIncrement, this requires that start is less than or equal to stop.
   *
   * @param start Start value for ticks
   * @param stop Stop value for ticks
   * @param count count + 1 is the approximate number of ticks to be returned by d3.ticks.
   */
  export function nice(start: number, stop: number, count: number): [number, number];

  /**
   * Generates a 0-based numeric sequence. The output range does not include 'stop'.
   */
  export function range(stop: number): number[];
  /**
   * Generates a numeric sequence starting from the given start and stop values. 'step' defaults to 1. The output range does not include 'stop'.
   */
  // tslint:disable-next-line:unified-signatures
  export function range(start: number, stop: number, step?: number): number[];

  /**
   * Transpose a matrix provided in Array of Arrays format.
   */
  export function transpose<T>(matrix: ArrayLike<ArrayLike<T>>): T[][];

  /**
   * Returns an array of arrays, where the ith array contains the ith element from each of the argument arrays.
   * The returned array is truncated in length to the shortest array in arrays. If arrays contains only a single array, the returned array
   * contains one-element arrays. With no arguments, the returned array is empty.
   */
  export function zip<T>(...arrays: Array<ArrayLike<T>>): T[][];

  // --------------------------------------------------------------------------------------
  // Blur
  // --------------------------------------------------------------------------------------

  /**
   * Blurs an array of data in-place by applying three iterations of a moving average transform (box filter)
   * for a fast approximation of a Gaussian kernel of the given radius, a non-negative number.
   * Returns the given data.
   */
  export function blur(data: ArrayLike<number>, radius: number): ArrayLike<number>;

  /**
   * Blurs a matrix of the given width and height in-place by applying a horizontal blur of radius rx
   * and a vertical blur of radius ry (which defaults to rx).
   * The matrix values data are stored in a flat (one-dimensional) array.
   * If height is not specified, it is inferred from the given width and data.length.
   * Returns the blurred matrix {data, width, height}.
   */
  export function blur2(data: Matrix, rx: number, ry?: number): Matrix;

  /**
   * Blurs the given ImageData in-place, blurring each of the RGBA layers independently by applying an horizontal blur of radius rx
   * and a vertical blur of radius ry (which defaults to rx).
   * Returns the blurred ImageData.
   */
  export function blurImage(imageData: ImageData, rx: number, ry?: number): ImageData;

  // --------------------------------------------------------------------------------------
  // Iterables
  // --------------------------------------------------------------------------------------

  /**
   * Returns true if the given test function returns true for every value in the given iterable.
   * This method returns as soon as test returns a non-truthy value or all values are iterated over.
   * Equivalent to array.every.
   */
  export function every<T>(
    iterable: Iterable<T>,
    test: (value: T, index: number, iterable: Iterable<T>) => unknown,
  ): boolean;

  /**
   * Returns true if the given test function returns true for any value in the given iterable.
   * This method returns as soon as test returns a truthy value or all values are iterated over.
   * Equivalent to array.some.
   */
  export function some<T>(
    iterable: Iterable<T>,
    test: (value: T, index: number, iterable: Iterable<T>) => unknown,
  ): boolean;

  /**
   * Returns a new array containing the values from iterable, in order, for which the given test function returns true.
   * Equivalent to array.filter.
   */
  export function filter<T>(
    iterable: Iterable<T>,
    test: (value: T, index: number, iterable: Iterable<T>) => unknown,
  ): T[];

  /**
   * Returns a new array containing the mapped values from iterable, in order, as defined by given mapper function.
   * Equivalent to array.map and Array.from.
   */
  export function map<T, U>(iterable: Iterable<T>, mapper: (value: T, index: number, iterable: Iterable<T>) => U): U[];

  /**
   * Returns the reduced value defined by given reducer function, which is repeatedly invoked for each value in iterable, being passed the current reduced value and the next value.
   * Equivalent to array.reduce.
   */
  export function reduce<T>(
    iterable: Iterable<T>,
    reducer: (previousValue: T, currentValue: T, currentIndex: number, iterable: Iterable<T>) => T,
    initialValue?: T,
  ): T;
  /**
   * Returns the reduced value defined by given reducer function, which is repeatedly invoked for each value in iterable, being passed the current reduced value and the next value.
   * Equivalent to array.reduce.
   */
  export function reduce<T, U>(
    iterable: Iterable<T>,
    reducer: (previousValue: U, currentValue: T, currentIndex: number, iterable: Iterable<T>) => U,
    initialValue: U,
  ): U;

  /**
   * Returns an array containing the values in the given iterable in reverse order.
   * Equivalent to array.reverse, except that it does not mutate the given iterable.
   */
  export function reverse<T>(iterable: Iterable<T>): T[];

  /**
   * Returns an array containing the values in the given iterable in the sorted order defined by the given comparator function.
   * If comparator is not specified, it defaults to d3.ascending.
   * Equivalent to array.sort, except that it does not mutate the given iterable, and the comparator defaults to natural order instead of lexicographic order.
   */
  export function sort<T>(iterable: Iterable<T>, comparator?: (a: T, b: T) => number): T[];
  /**
   * Returns an array containing the values in the given iterable in the sorted order defined by the given accessor function.
   * This is equivalent to a comparator using natural order.
   * The accessor is only invoked once per element, and thus may be nondeterministic.
   * Multiple accessors may be specified to break ties.
   */
  export function sort<T>(iterable: Iterable<T>, ...accessors: Array<(a: T) => unknown>): T[];

  // --------------------------------------------------------------------------------------
  // Sets
  // --------------------------------------------------------------------------------------

  /**
   * Returns a new InternSet containing every value in iterable that is not in any of the others iterables.
   */
  export function difference<T>(iterable: Iterable<T>, ...others: Array<Iterable<T>>): InternSet<T>;

  /**
   * Returns a new InternSet containing every (distinct) value that appears in any of the given iterables.
   * The order of values in the returned set is based on their first occurrence in the given iterables.
   */
  export function union<T>(...iterables: Array<Iterable<T>>): InternSet<T>;

  /**
   * Returns a new InternSet containing every (distinct) value that appears in all of the given iterables.
   * The order of values in the returned set is based on their first occurrence in the given iterables.
   */
  export function intersection<T>(...iterables: Array<Iterable<T>>): InternSet<T>;

  /**
   * Returns true if a is a superset of b: if every value in the given iterable b is also in the given iterable a.
   */
  export function superset<T>(a: Iterable<T>, b: Iterable<T>): boolean;

  /**
   * Returns true if a is a subset of b: if every value in the given iterable a is also in the given iterable b.
   */
  export function subset<T>(a: Iterable<T>, b: Iterable<T>): boolean;

  /**
   * Returns true if a and b are disjoint: if a and b contain no shared value.
   */
  export function disjoint<T>(a: Iterable<T>, b: Iterable<T>): boolean;

  // --------------------------------------------------------------------------------------
  // Bins
  // --------------------------------------------------------------------------------------

  export interface Bin<Datum, Value extends number | Date | undefined> extends Array<Datum> {
    x0: Value | undefined;
    x1: Value | undefined;
  }

  /**
   * Type definition for threshold generator which returns the count of recommended thresholds
   */
  export type ThresholdCountGenerator<Value extends number | undefined = number | undefined> = (
    values: ArrayLike<Value>,
    min: number,
    max: number,
  ) => number;

  /**
   * Type definition for threshold generator which returns an array of recommended numbers thresholds
   */
  export type ThresholdNumberArrayGenerator<Value extends number | undefined> = (
    values: ArrayLike<Value>,
    min: number,
    max: number,
  ) => Value[];

  /**
   * Type definition for threshold generator which returns an array of recommended dates thresholds
   */
  export type ThresholdDateArrayGenerator<Value extends Date | undefined> = (
    values: ArrayLike<Value>,
    min: Date,
    max: Date,
  ) => Value[];

  export interface HistogramCommon<Datum, Value extends number | Date | undefined> {
    (data: ArrayLike<Datum>): Array<Bin<Datum, Value>>;

    value(): (d: Datum, i: number, data: ArrayLike<Datum>) => Value;
    value(valueAccessor: (d: Datum, i: number, data: ArrayLike<Datum>) => Value): this;
  }

  export interface HistogramGeneratorDate<Datum, Value extends Date | undefined> extends HistogramCommon<Datum, Date> {
    domain(): (values: ArrayLike<Value>) => [Date, Date];
    domain(domain: [Date, Date] | ((values: ArrayLike<Value>) => [Date, Date])): this;

    thresholds(): ThresholdDateArrayGenerator<Value>;
    /**
     * Set the array of values to be used as thresholds in determining the bins.
     *
     * Any threshold values outside the domain are ignored. The first bin.x0 is always equal to the minimum domain value,
     * and the last bin.x1 is always equal to the maximum domain value.
     *
     * @param thresholds Either an array of threshold values used for binning. The elements must
     * be of the same type as the materialized values of the histogram.
     * Or a function which accepts as arguments the array of materialized values, and
     * optionally the domain minimum and maximum. The function calculates and returns the array of values to be used as
     * thresholds in determining the bins.
     */
    thresholds(thresholds: ArrayLike<Value> | ThresholdDateArrayGenerator<Value>): this;
  }

  export interface HistogramGeneratorNumber<Datum, Value extends number | undefined> extends HistogramCommon<
    Datum,
    Value
  > {
    domain(): (values: Iterable<Value>) => [number, number] | [undefined, undefined];
    domain(domain: [number, number] | ((values: Iterable<Value>) => [number, number] | [undefined, undefined])): this;

    thresholds(): ThresholdCountGenerator<Value> | ThresholdNumberArrayGenerator<Value>;
    /**
     * Divide the domain uniformly into approximately count bins. IMPORTANT: This threshold
     * setting approach only works, when the materialized values are numbers!
     *
     * Any threshold values outside the domain are ignored. The first bin.x0 is always equal to the minimum domain value,
     * and the last bin.x1 is always equal to the maximum domain value.
     *
     * @param count Either the desired number of uniform bins or a function which accepts as arguments the array of
     * materialized values, and optionally the domain minimum and maximum. The function calculates and returns the
     * suggested number of bins.
     */
    thresholds(count: number | ThresholdCountGenerator<Value>): this;
    /**
     * Set the array of values to be used as thresholds in determining the bins.
     *
     * Any threshold values outside the domain are ignored. The first bin.x0 is always equal to the minimum domain value,
     * and the last bin.x1 is always equal to the maximum domain value.
     *
     * @param thresholds Either an array of threshold values used for binning. The elements must
     * be of the same type as the materialized values of the histogram.
     * Or a function which accepts as arguments the array of materialized values, and
     * optionally the domain minimum and maximum. The function calculates and returns the array of values to be used as
     * thresholds in determining the bins.
     */
    // tslint:disable-next-line:unified-signatures
    thresholds(thresholds: ArrayLike<Value> | ThresholdNumberArrayGenerator<Value>): this;
  }

  /**
   * @deprecated Use bin instead.
   */
  export function histogram(): HistogramGeneratorNumber<number, number>;

  /**
   * @deprecated Use bin instead.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function histogram<Datum, Value extends number | undefined>(): HistogramGeneratorNumber<Datum, Value>;

  /**
   * @deprecated Use bin instead.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function histogram<Datum, Value extends Date | undefined>(): HistogramGeneratorDate<Datum, Value>;

  export function bin(): HistogramGeneratorNumber<number, number>;
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function bin<Datum, Value extends number | undefined>(): HistogramGeneratorNumber<Datum, Value>;
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function bin<Datum, Value extends Date | undefined>(): HistogramGeneratorDate<Datum, Value>;

  // --------------------------------------------------------------------------------------
  // Histogram Thresholds
  // --------------------------------------------------------------------------------------

  export function thresholdFreedmanDiaconis(values: ArrayLike<number | undefined>, min: number, max: number): number; // of type ThresholdCountGenerator

  export function thresholdScott(values: ArrayLike<number | undefined>, min: number, max: number): number; // of type ThresholdCountGenerator

  export function thresholdSturges(values: ArrayLike<number | undefined>): number; // of type ThresholdCountGenerator

  // --------------------------------------------------------------------------------------
  // Interning
  // --------------------------------------------------------------------------------------

  /**
   * The InternMap class extends the native JavaScript Map class, allowing Dates and other non-primitive keys by bypassing the SameValueZero algorithm when determining key equality.
   */
  export class InternMap<K = any, V = any> extends Map<K, V> {}

  /**
   * The InternSet class extends the native JavaScript Set class, allowing Dates and other non-primitive keys by bypassing the SameValueZero algorithm when determining key equality.
   */
  export class InternSet<T = any> extends Set<T> {}
}

declare module 'd3-axis' {
  // Last module patch version validated against: 3.0.0

  import { Selection, TransitionLike } from 'd3-selection';

  // --------------------------------------------------------------------------
  // Shared Types and Interfaces
  // --------------------------------------------------------------------------

  /**
   * A helper type to alias elements which can serve as a domain for an axis.
   */
  export type AxisDomain = number | string | Date | { valueOf(): number };

  /**
   * A helper interface to describe the minimal contract to be met by a time interval
   * which can be passed into the Axis.ticks(...) or Axis.tickArguments(...) methods when
   * creating time series axes. Under normal circumstances the argument will be of type
   * TimeInterval or CountableTimeInterval as defined in d3-time.
   * NB: This helper interface has been created to avoid tight coupling of d3-axis to
   * d3-time at the level of definition files. I.e. d3-time is not a
   * dependency of d3-axis in the D3 Javascript implementation. This minimal contract
   * is based on an analysis of how d3-axis passes a time interval argument into a time scale,
   * if a time scale was set using Axis.scale(...). And in turn on how a time scale uses
   * the time interval when creating ticks from it.
   */
  export interface AxisTimeInterval {
    range(start: Date, stop: Date, step?: number): Date[];
  }

  /**
   * A helper interface to which a scale passed into axis must conform (at a minimum)
   * for axis to use the scale without error.
   */
  export interface AxisScale<Domain> {
    (x: Domain): number | undefined;
    domain(): Domain[];
    range(): number[];
    copy(): this;
    bandwidth?(): number;
    // TODO: Reconsider the below, note that the compiler does not differentiate the overloads w.r.t. optionality
    // ticks?(count?: number): Domain[];
    // ticks?(count?: AxisTimeInterval): Date[];
    // tickFormat?(count?: number, specifier?: string): ((d: number) => string);
    // tickFormat?(count?: number | AxisTimeInterval, specifier?: string): ((d: Date) => string);
  }

  /**
   * A helper type to alias elements which can serve as a container for an axis.
   */
  export type AxisContainerElement = SVGSVGElement | SVGGElement;

  /**
   * Interface defining an axis generator. The generic <Domain> is the type of the axis domain.
   */
  export interface Axis<Domain> {
    /**
     * Render the axis to the given context.
     *
     * @param context A selection of or a transition defined on SVG containers (either SVG or G elements).
     */
    (
      context:
        | Selection<SVGSVGElement, any, any, any>
        | Selection<SVGGElement, any, any, any>
        | TransitionLike<SVGSVGElement, any>
        | TransitionLike<SVGGElement, any>,
    ): void;

    /**
     * Gets the current scale underlying the axis.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    scale<A extends AxisScale<Domain>>(): A;

    /**
     * Sets the scale and returns the axis.
     *
     * @param scale The scale to be used for axis generation.
     */
    scale(scale: AxisScale<Domain>): this;

    /**
     * Sets the arguments that will be passed to scale.ticks and scale.tickFormat when the axis is rendered, and returns the axis generator.
     *
     * This method has no effect if the scale does not implement scale.ticks, as with band and point scales.
     *
     * This method is also a convenience function for axis.tickArguments.
     *
     * @param count Number of ticks that should be rendered.
     * @param specifier An optional format specifier to customize how the tick values are formatted.
     */
    ticks(count: number, specifier?: string): this;

    /**
     * Sets the arguments that will be passed to scale.ticks and scale.tickFormat when the axis is rendered, and returns the axis generator.
     * Use with a TIME SCALE ONLY.
     *
     * This method is also a convenience function for axis.tickArguments.
     *
     * @param interval A time interval used to generate date-based ticks. This is typically a TimeInterval/CountableTimeInterval as defined
     * in d3-time. E.g. as obtained by passing in d3.timeMinute.every(15).
     * @param specifier An optional format specifier to customize how the tick values are formatted.
     */
    // tslint:disable-next-line:unified-signatures
    ticks(interval: AxisTimeInterval, specifier?: string): this;

    /**
     * Sets the arguments that will be passed to scale.ticks and scale.tickFormat when the axis is rendered, and returns the axis generator.
     *
     * The meaning of the arguments depends on the axis’ scale type: most commonly, the arguments are a suggested count for the number of ticks
     * (or a time interval for time scales), and an optional format specifier to customize how the tick values are formatted.
     *
     * This method has no effect if the scale does not implement scale.ticks, as with band and point scales.
     *
     * To set the tick values explicitly, use axis.tickValues. To set the tick format explicitly, use axis.tickFormat.
     *
     * This method is also a convenience function for axis.tickArguments.
     */
    ticks(arg0: any, ...args: any[]): this;

    /**
     * Get an array containing the currently set arguments to be passed into scale.ticks and scale.tickFormat, which defaults to the empty array.
     */
    tickArguments(): any[];

    /**
     * Sets the arguments that will be passed to scale.ticks and scale.tickFormat when the axis is rendered, and returns the axis generator.
     *
     * This method has no effect if the scale does not implement scale.ticks, as with band and point scales.
     * To set the tick values explicitly, use axis.tickValues. To set the tick format explicitly, use axis.tickFormat.
     *
     * See also axis.ticks.
     *
     * @param args The meaning of the arguments depends on the axis’ scale type: most commonly, the arguments are a
     * suggested count for the number of ticks (or a time interval for time scales), and an optional format specifier to
     * customize how the tick values are formatted.
     */
    tickArguments(args: any[]): this;

    /**
     * Returns the current tick values, which defaults to null.
     */
    tickValues(): Domain[] | null;

    /**
     * Specified values to be used for ticks rather than using the scale’s automatic tick generator.
     * The explicit tick values take precedent over the tick arguments set by axis.tickArguments.
     * However, any tick arguments will still be passed to the scale’s tickFormat function if a
     * tick format is not also set.
     *
     * @param values An iterable with values from the Domain of the scale underlying the axis.
     */
    tickValues(values: Iterable<Domain>): this;

    /**
     * Clears any previously-set explicit tick values and reverts back to the scale’s tick generator.
     *
     * @param values null
     */
    tickValues(values: null): this;

    /**
     * Returns the currently set tick format function, which defaults to null.
     */
    tickFormat(): ((domainValue: Domain, index: number) => string) | null;

    /**
     * Sets the tick format function and returns the axis.
     *
     * @param format A function mapping a value from the axis Domain to a formatted string
     * for display purposes. When invoked, the format function is also passed a second argument representing the zero-based index
     * of the tick label in the array of generated tick labels.
     */
    tickFormat(format: (domainValue: Domain, index: number) => string): this;

    /**
     * Reset the tick format function. A null format indicates that the scale’s
     * default formatter should be used, which is generated by calling scale.tickFormat.
     * In this case, the arguments specified by axis.tickArguments
     * are likewise passed to scale.tickFormat.
     *
     * @param format null
     */
    tickFormat(format: null): this;

    /**
     * Get the current inner tick size, which defaults to 6.
     */
    tickSize(): number;
    /**
     * Set the inner and outer tick size to the specified value and return the axis.
     *
     * @param size Tick size in pixels (Default is 6).
     */
    tickSize(size: number): this;

    /**
     * Get the current inner tick size, which defaults to 6.
     * The inner tick size controls the length of the tick lines,
     * offset from the native position of the axis.
     */
    tickSizeInner(): number;

    /**
     * Set the inner tick size to the specified value and return the axis.
     * The inner tick size controls the length of the tick lines,
     * offset from the native position of the axis.
     *
     * @param size Tick size in pixels (Default is 6).
     */
    tickSizeInner(size: number): this;

    /**
     * Get the current outer tick size, which defaults to 6.
     * The outer tick size controls the length of the square ends of the domain path,
     * offset from the native position of the axis. Thus, the “outer ticks” are not actually
     * ticks but part of the domain path, and their position is determined by the associated
     * scale’s domain extent. Thus, outer ticks may overlap with the first or last inner tick.
     * An outer tick size of 0 suppresses the square ends of the domain path,
     * instead producing a straight line.
     */
    tickSizeOuter(): number;

    /**
     * Set the current outer tick size and return the axis.
     * The outer tick size controls the length of the square ends of the domain path,
     * offset from the native position of the axis. Thus, the “outer ticks” are not actually
     * ticks but part of the domain path, and their position is determined by the associated
     * scale’s domain extent. Thus, outer ticks may overlap with the first or last inner tick.
     * An outer tick size of 0 suppresses the square ends of the domain path,
     * instead producing a straight line.
     *
     * @param size Tick size in pixels (Default is 6).
     */
    tickSizeOuter(size: number): this;

    /**
     * Get the current padding, which defaults to 3.
     */
    tickPadding(): number;

    /**
     * Set the current padding and return the axis.
     *
     * @param padding Padding in pixels (Default is 3).
     */
    tickPadding(padding: number): this;

    /**
     * Returns the current offset which defaults to 0 on devices with a devicePixelRatio greater than 1, and 0.5px otherwise.
     * This default offset ensures crisp edges on low-resolution devices.
     */
    offset(): number;

    /**
     * Sets the offset to the specified value in pixels and returns the axis.
     * Defaults to 0 on devices with a devicePixelRatio greater than 1, and 0.5px otherwise.
     * This default offset ensures crisp edges on low-resolution devices.
     */
    offset(offset: number): this;
  }

  /**
   * Constructs a new top-oriented axis generator for the given scale, with empty tick arguments,
   * a tick size of 6 and padding of 3. In this orientation, ticks are drawn above the horizontal domain path.
   *
   * @param scale The scale to be used for axis generation.
   */
  export function axisTop<Domain extends AxisDomain>(scale: AxisScale<Domain>): Axis<Domain>;

  /**
   * Constructs a new right-oriented axis generator for the given scale, with empty tick arguments,
   * a tick size of 6 and padding of 3. In this orientation, ticks are drawn to the right of the vertical domain path.
   *
   * @param scale The scale to be used for axis generation.
   */
  export function axisRight<Domain extends AxisDomain>(scale: AxisScale<Domain>): Axis<Domain>;

  /**
   * Constructs a new bottom-oriented axis generator for the given scale, with empty tick arguments,
   * a tick size of 6 and padding of 3. In this orientation, ticks are drawn below the horizontal domain path.
   *
   * @param scale The scale to be used for axis generation.
   */
  export function axisBottom<Domain extends AxisDomain>(scale: AxisScale<Domain>): Axis<Domain>;

  /**
   * Constructs a new left-oriented axis generator for the given scale, with empty tick arguments,
   * a tick size of 6 and padding of 3. In this orientation, ticks are drawn to the left of the vertical domain path.
   *
   * @param scale The scale to be used for axis generation.
   */
  export function axisLeft<Domain extends AxisDomain>(scale: AxisScale<Domain>): Axis<Domain>;
}

declare module 'd3-brush' {
  // Last module patch version validated against: 3.0.0

  import { Selection, TransitionLike, ValueFn } from 'd3-selection';

  /**
   * Type alias for a BrushSelection. For a two-dimensional brush, it must be defined as [[x0, y0], [x1, y1]],
   * where x0 is the minimum x-value, y0 is the minimum y-value, x1 is the maximum x-value, and y1 is the maximum y-value.
   * For an x-brush, it must be defined as [x0, x1]; for a y-brush, it must be defined as [y0, y1].
   */
  export type BrushSelection = [[number, number], [number, number]] | [number, number];

  /**
   * A D3 brush behavior
   *
   * The generic refers to the type of the datum for the group element on which brush behavior is defined.
   */
  export interface BrushBehavior<Datum> {
    /**
     * Applies the brush to the specified group, which must be a selection of SVG G elements.
     * This function is typically not invoked directly, and is instead invoked via selection.call.
     *
     * For details see: {@link https://github.com/d3/d3-brush#_brush}
     *
     * @param group A D3 selection of SVG G elements.
     * @param args Optional arguments to be passed in.
     */
    (group: Selection<SVGGElement, Datum, any, any>, ...args: any[]): void;
    /**
     * Clear the active selection of the brush on the specified SVG G element(s) selection.
     *
     * @param group A selection or a transition of SVG G elements
     * @param selection The selection must be defined as an array of numbers, or null to clear the brush selection.
     * For a two-dimensional brush, it must be defined as [[x0, y0], [x1, y1]], where x0 is the minimum x-value, y0 is the minimum y-value, x1 is the maximum x-value, and y1 is the maximum y-value.
     * For an x-brush, it must be defined as [x0, x1]; for a y-brush, it must be defined as [y0, y1].
     * The selection may also be specified as a function which returns such an array;
     * if a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * The returned array defines the brush selection for that element.
     * @param event
     */
    move(
      group: Selection<SVGGElement, Datum, any, any> | TransitionLike<SVGGElement, Datum>,
      selection: null | BrushSelection | ValueFn<SVGGElement, Datum, BrushSelection>,
      event?: Event,
    ): void;

    /**
     * Clear the active selection of the brush on the specified SVG G element(s) selection.
     *
     * @param group A D3 selection of SVG G elements.
     * @param event
     */
    clear(group: Selection<SVGGElement, Datum, any, any>, event?: Event): void;

    /**
     * Returns the current extent accessor.
     */
    extent(): ValueFn<SVGGElement, Datum, [[number, number], [number, number]]>;
    /**
     * Set the brushable extent to the specified array of points and returns this brush.
     *
     * The brush extent determines the size of the invisible overlay and also constrains the brush selection;
     * the brush selection cannot go outside the brush extent.
     *
     * @param extent array of points [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner
     * and [x1, y1] is the bottom-right corner.
     */
    extent(extent: [[number, number], [number, number]]): this;
    /**
     * Set the brushable extent to the specified array of points returned by the accessor function
     * evaluated for each element in the selection/transition and returns this brush.
     *
     * The brush extent determines the size of the invisible overlay and also constrains the brush selection;
     * the brush selection cannot go outside the brush extent.
     *
     * @param extent An extent accessor function which is evaluated for each selected element,
     * in order, being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element. The function returns an array of points [[x0, y0], [x1, y1]],
     * where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner.
     */
    extent(extent: ValueFn<SVGGElement, Datum, [[number, number], [number, number]]>): this;

    /**
     * Returns the current filter function.
     */
    filter(): (this: SVGGElement, event: any, d: Datum) => boolean;
    /**
     * Sets the filter to the specified filter function and returns the brush.
     *
     * If the filter returns falsey, the initiating event is ignored and no brush gesture is started.
     * Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons,
     * since those buttons are typically intended for other purposes, such as the context menu.
     *
     * @param filterFn A filter function which is evaluated for each selected element,
     * in order, being passed the current event `event` and datum `d`, with the `this` context as the current DOM element.
     * The function returns a boolean value.
     */
    filter(filterFn: (this: SVGGElement, event: any, d: Datum) => boolean): this;

    /**
     * Returns the current touch support detector, which defaults to a function returning true,
     * if the "ontouchstart" event is supported on the current element.
     */
    touchable(): ValueFn<SVGGElement, Datum, boolean>;
    /**
     * Sets the touch support detector to the specified boolean value and returns the brush.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the brush is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A boolean value. true when touch event listeners should be applied to the corresponding element, otherwise false.
     */
    touchable(touchable: boolean): this;
    /**
     * Sets the touch support detector to the specified function and returns the drag behavior.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the brush is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A touch support detector function, which returns true when touch event listeners should be applied to the corresponding element.
     * The function is evaluated for each selected element to which the brush was applied, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element. The function returns a boolean value.
     */
    touchable(touchable: ValueFn<SVGGElement, Datum, boolean>): this;

    /**
     * Returns the current key modifiers flag.
     */
    keyModifiers(): boolean;
    /**
     * Sets the key modifiers flag and returns the brush.
     *
     * The key modifiers flag determines whether the brush listens to key events during brushing.
     * The default value is true.
     *
     * @param modifiers New value for key modifiers flag.
     */
    keyModifiers(modifiers: boolean): this;

    /**
     * Returns the current handle size, which defaults to six.
     */
    handleSize(): number;
    /**
     * Sets the size of the brush handles to the specified number and returns the brush.
     *
     * This method must be called before applying the brush to a selection;
     * changing the handle size does not affect brushes that were previously rendered.
     * The default size is 6.
     *
     * @param size Size of the handle.
     */
    handleSize(size: number): this;

    /**
     * Returns the first currently-assigned listener matching the specified typenames, if any.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "brush.foo"" and "brush.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (at the start of a brush gesture, such as on mousedown), brush (when the brush moves, such as on mousemove), or
     * end (at the end of a brush gesture, such as on mouseup.)
     */
    on(typenames: string): ((this: SVGGElement, event: any, d: Datum) => void) | undefined;
    /**
     * Removes the current event listeners for the specified typenames, if any.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "brush.foo"" and "brush.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (at the start of a brush gesture, such as on mousedown), brush (when the brush moves, such as on mousemove), or
     * end (at the end of a brush gesture, such as on mouseup.)
     * @param listener Use null to remove the listener.
     */
    on(typenames: string, listener: null): this;
    /**
     * Sets the event listener for the specified typenames and returns the brush.
     * If an event listener was already registered for the same type and name,
     * the existing listener is removed before the new listener is added.
     * When a specified event is dispatched, each listener will be invoked with the same context and arguments as selection.on listeners.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "brush.foo"" and "brush.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (at the start of a brush gesture, such as on mousedown), brush (when the brush moves, such as on mousemove), or
     * end (at the end of a brush gesture, such as on mouseup.)
     * @param listener An event listener function which is evaluated for each selected element,
     * in order, being passed the current event `event` and datum `d`, with the `this` context as the current DOM element.
     */
    on(typenames: string, listener: (this: SVGGElement, event: any, d: Datum) => void): this;
  }

  /**
   * Create a new two-dimensional brush.
   *
   * The generic "Datum" refers to the type of the data of the selected svg:g element to
   * which the returned BrushBehavior will be applied.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function brush<Datum>(): BrushBehavior<Datum>;
  /**
   * Creates a new one-dimensional brush along the x-dimension.
   *
   * The generic "Datum" refers to the type of the data of the selected svg:g element to
   * which the returned BrushBehavior will be applied.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function brushX<Datum>(): BrushBehavior<Datum>;
  /**
   * Creates a new one-dimensional brush along the y-dimension.
   *
   * The generic "Datum" refers to the type of the data of the selected svg:g element to
   * which the returned BrushBehavior will be applied.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function brushY<Datum>(): BrushBehavior<Datum>;

  /**
   * Return the current brush selection for the specified node. Internally, an element’s brush state is stored as element.__brush;
   * however, you should use this method rather than accessing it directly. If the given node has no selection, returns null.
   * Otherwise, the selection is defined as an array of numbers.
   *
   * @param node The node for which the brush selection should be returned.
   */
  export function brushSelection(node: SVGGElement): BrushSelection | null;

  /**
   * D3 brush event
   *
   * The generic refers to the type of the datum for the group element on which brush was defined.
   */
  export interface D3BrushEvent<Datum> {
    /**
     * The BrushBehavior associated with the event
     */
    target: BrushBehavior<Datum>;
    /**
     * The event type for the BrushEvent
     */
    type: 'start' | 'brush' | 'end' | string; // Leave failsafe string type for cases like 'brush.foo'
    /**
     * The current brush selection associated with the event.
     * This is null when the selection is empty.
     */
    selection: BrushSelection | null;
    /**
     * The underlying input event, such as mousemove or touchmove.
     */
    sourceEvent: any;
    /**
     * The mode of the brush.
     */
    mode: 'drag' | 'space' | 'handle' | 'center';
  }
}

declare module 'd3-chord' {
  // Last module patch version validated against: 3.0.1

  // ---------------------------------------------------------------------
  // Chord
  // ---------------------------------------------------------------------

  /**
   * A chord subgroup serving as source or target of a chord between two nodes i an j (where i may be equal to j).
   */
  export interface ChordSubgroup {
    /**
     * Start angle of the chord subgroup in radians
     */
    startAngle: number;

    /***
     * End angle of the chord subgroup in radians
     */
    endAngle: number;

    /**
     * The flow value in matrix[i][j] from node i to node j
     */
    value: number;

    /**
     * The node index i
     */
    index: number;
  }

  /**
   * A chord represents the combined bidirectional flow between two nodes i and j (where i may be equal to j)
   */
  export interface Chord {
    /**
     * Chord subgroup constituting the source of Chord
     */
    source: ChordSubgroup;
    /**
     * Chord subgroup constituting the Target of Chord
     */
    target: ChordSubgroup;
  }

  /**
   * A chord group for a given node i representing the combined outflow for node i,
   * corresponding to the elements matrix[i][0 … n - 1].
   */
  export interface ChordGroup {
    /**
     * The start angle of the chord group in radians
     */
    startAngle: number;

    /**
     * The end angle of the chord group in radians
     */
    endAngle: number;

    /**
     * The total outgoing flow value for node i
     */
    value: number;

    /**
     * The node index i
     */
    index: number;
  }

  /**
   * An array of chords, where each chord represents the combined bidirectional flow between two nodes i and j (where i may be equal to j).
   * The chords are based on a (n x n) matrix of flows between nodes.
   *
   * The chords are typically passed to d3.ribbon to display the network relationships.
   * The returned array includes only chord objects for which the value matrix[i][j] or matrix[j][i] is non-zero.
   * Furthermore, the returned array only contains unique chords: a given chord ij represents the bidirectional flow from i to j and from j to i,
   * and does not contain a duplicate chord ji; i and j are chosen such that the chord’s source always represents the larger of matrix[i][j] and matrix[j][i].
   * In other words, chord.source.index equals chord.target.subindex, chord.source.subindex equals chord.target.index,
   * chord.source.value is greater than or equal to chord.target.value, and chord.source.value is always greater than zero.
   */
  export interface Chords extends Array<Chord> {
    /**
     * An array of length n, where each group represents the combined outflow for node i,
     * corresponding to the elements matrix[i][0 … n - 1]
     */
    groups: ChordGroup[];
  }

  /**
   * A D3 chord diagram Layout to visualize relationships or network flow with an aesthetically-pleasing circular layout.
   *
   * The relationships are represented as a square matrix of size n×n, where the matrix represents the directed flow amongst a network (a complete digraph) of n nodes.
   */
  export interface ChordLayout {
    /**
     * Computes the chord layout for the specified square matrix of size n×n, where the matrix represents the directed flow amongst a network (a complete digraph) of n nodes.
     *
     * @param matrix An (n x n) matrix representing the directed flow amongst a network (a complete digraph) of n nodes.The given matrix must be an array of length n,
     * where each element matrix[i] is an array of n numbers, where each matrix[i][j] represents the flow from the ith node in the network to the jth node.
     * Each number matrix[i][j] must be nonnegative, though it can be zero if there is no flow from node i to node j.
     */
    (matrix: number[][]): Chords;

    /**
     * Returns the current pad angle in radians, which defaults to zero.
     */
    padAngle(): number;
    /**
     * Sets the pad angle between adjacent groups to the specified number in radians and returns this chord layout.
     *
     * The default is zero.
     *
     * @param angle Pad angle between adjacent groups in radians.
     */
    padAngle(angle: number): this;

    /**
     * Returns the current group comparator, which defaults to null.
     */
    sortGroups(): ((a: number, b: number) => number) | null;
    /**
     * Sets the group comparator to the specified function or null and returns this chord layout.
     * If the group comparator is non-null, it is used to sort the groups by their total outflow.
     * See also d3.ascending and d3.descending.
     */
    sortGroups(compare: null | ((a: number, b: number) => number)): this;

    /**
     * Returns the current subgroup comparator, which defaults to null.
     */
    sortSubgroups(): ((a: number, b: number) => number) | null;
    /**
     * Sets the subgroup comparator to the specified function or null and returns this chord layout.
     * If the subgroup comparator is non-null, it is used to sort the subgroups corresponding to matrix[i][0 … n - 1] for a given group i by their total outflow.
     * See also d3.ascending and d3.descending.
     */
    sortSubgroups(compare: null | ((a: number, b: number) => number)): this;

    /**
     * Returns the current chord comparator, which defaults to null.
     */
    sortChords(): ((a: number, b: number) => number) | null;
    /**
     * Sets the chord comparator to the specified function or null and returns this chord layout.
     * If the chord comparator is non-null, it is used to sort the chords by their combined flow; this only affects the z-order of the chords.
     * See also d3.ascending and d3.descending.
     */
    sortChords(compare: null | ((a: number, b: number) => number)): this;
  }

  /**
   * Constructs a new chord diagram layout with the default settings.
   */
  export function chord(): ChordLayout;

  /**
   * A chord layout for directional flows. The chord from i to j is generated from the value in matrix[i][j] only.
   */
  export function chordDirected(): ChordLayout;

  /**
   * A transposed chord layout. Useful to highlight outgoing (rather than incoming) flows.
   */
  export function chordTranspose(): ChordLayout;

  // ---------------------------------------------------------------------
  // Ribbon
  // ---------------------------------------------------------------------

  /**
   * A minimal interface to support the default accessors used by RibbonGenerator for properties of
   * source and target objects of a Ribbon.
   *
   * (Corresponds to ChordSubgroup)
   */
  export interface RibbonSubgroup {
    /**
     * Start angle of the ribbon subgroup in radians
     */
    startAngle: number;
    /**
     * End angle of the ribbon subgroup in radians
     */
    endAngle: number;
    /**
     * Radius of the ribbon subgroup
     */
    radius: number;
  }

  /**
   * A minimal interface to support the default source and target accessors used by RibbonGenerator.
   * (Corresponds to Chord)
   */
  export interface Ribbon {
    /**
     * Ribbon subgroup constituting the source of the Ribbon
     */
    source: RibbonSubgroup;
    /**
     * Ribbon subgroup constituting the target of the Ribbon
     */
    target: RibbonSubgroup;
  }

  /**
   * A ribbon generator to support rendering of chords in a chord diagram.
   *
   * The first generic corresponds to the type of the "this" context within which the ribbon generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type representing a chord for which the ribbon is to be generated. The default type is Ribbon.
   *
   * The third generic corresponds to the datum type of the chord subgroup, i.e. source or target of the cord. The default type is RibbonSubgroup.
   */
  export interface RibbonGenerator<This, RibbonDatum, RibbonSubgroupDatum> {
    /**
     * Generates a ribbon for the given arguments.
     *
     * IMPORTANT: If the ribbon generator has been configured with a rendering context,
     * then the ribbon is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum representing the chord for which the ribbon is to be generated.
     */
    (this: This, d: RibbonDatum, ...args: any[]): void;
    /**
     * Generates a ribbon for the given arguments.
     *
     * IMPORTANT: If the rendering context of the ribbon generator is null,
     * then the ribbon is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum representing the chord for which the ribbon is to be generated.
     */
    (this: This, d: RibbonDatum, ...args: any[]): string | null;

    /**
     * Returns the current source accessor, which defaults to a function returning the "source" property of the first argument passed into the accessor.
     */
    source(): (this: This, d: RibbonDatum, ...args: any[]) => RibbonSubgroupDatum;
    /**
     * Sets the source accessor to the specified function and returns this ribbon generator.
     *
     * @param source An accessor function returning the source datum of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the ribbon generator.
     */
    source(source: (this: This, d: RibbonDatum, ...args: any[]) => RibbonSubgroupDatum): this;

    /**
     * Returns the current target accessor, which defaults to a function returning the "target" property of the first argument passed into the accessor.
     */
    target(): (this: This, d: RibbonDatum, ...args: any[]) => RibbonSubgroupDatum;
    /**
     * Sets the target accessor to the specified function and returns this ribbon generator.
     *
     * @param target An accessor function returning the target datum of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the ribbon generator.
     */
    target(target: (this: This, d: RibbonDatum, ...args: any[]) => RibbonSubgroupDatum): this;

    /**
     * Returns the current radius accessor, which defaults to a function returning the "radius" property (assumed to be a number) of the source or
     * target object returned by the source or target accessor, respectively.
     */
    radius(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the radius to a fixed number and returns this ribbon generator.
     *
     * @param radius A fixed numeric value for the radius.
     */
    radius(radius: number): this;
    /**
     * Sets the radius accessor to the specified function and returns this ribbon generator.
     *
     * @param radius An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the radius value.
     */
    radius(radius: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current source radius accessor, which defaults to a function returning the "radius" property (assumed to be a number) of the source or
     * target object returned by the source or target accessor, respectively.
     */
    sourceRadius(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the source radius to a fixed number and returns this ribbon generator.
     *
     * @param radius A fixed numeric value for the source radius.
     */
    sourceRadius(radius: number): this;
    /**
     * Sets the source radius accessor to the specified function and returns this ribbon generator.
     *
     * @param radius An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the source radius value.
     */
    sourceRadius(radius: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current target radius accessor, which defaults to a function returning the "radius" property (assumed to be a number) of the source or
     * target object returned by the source or target accessor, respectively.
     */
    targetRadius(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the target radius to a fixed number and returns this ribbon generator.
     *
     * @param radius A fixed numeric value for the target radius.
     */
    targetRadius(radius: number): this;
    /**
     * Sets the target radius accessor to the specified function and returns this ribbon generator.
     *
     * @param radius An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the target radius value.
     */
    targetRadius(radius: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current start angle accessor, which defaults to a function returning the "startAngle" property (assumed to be a number in radians) of the source or
     * target object returned by the source or target accessor, respectively.
     */
    startAngle(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the start angle to a fixed number in radians and returns this ribbon generator.
     *
     * @param angle A fixed numeric value for the start angle in radians.
     */
    startAngle(angle: number): this;
    /**
     * Sets the start angle accessor to the specified function and returns this ribbon generator.
     *
     * @param angle An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the start angle in radians.
     */
    startAngle(angle: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current end angle accessor, which defaults to a function returning the "endAngle" property (assumed to be a number in radians) of the source or
     * target object returned by the source or target accessor, respectively.
     */
    endAngle(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the end angle to a fixed number in radians and returns this ribbon generator.
     *
     * @param angle A fixed numeric value for the end angle in radians.
     */
    endAngle(angle: number): this;
    /**
     * Sets the end angle accessor to the specified function and returns this ribbon generator.
     *
     * @param angle An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the end angle in radians.
     */
    endAngle(angle: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current pad angle accessor, which defaults to a function returning 0.
     */
    padAngle(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;
    /**
     * Sets the pad angle to a fixed number in radians and returns this ribbon generator.
     *
     * @param angle A fixed numeric value for the pad angle in radians.
     */
    padAngle(angle: number): this;
    /**
     * Sets the pad angle accessor to the specified function and returns this ribbon generator.
     *
     * @param angle An accessor function which is invoked for the source and target of the chord. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as the first argument the source or target object returned by the respective source or target accessor function of the generator.
     * It is also passed any additional arguments that were passed into the generator, with the exception of the first element representing the chord datum itself.
     * The function returns the pad angle in radians.
     */
    padAngle(angle: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this ribbon generator.
     * If the context is not null, then the generated ribbon is rendered to this context as a sequence of path method calls.
     * Otherwise, a path data string representing the generated ribbon is returned.
     * See also d3-path.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  export interface RibbonArrowGenerator<This, RibbonDatum, RibbonSubgroupDatum> extends RibbonGenerator<
    This,
    RibbonDatum,
    RibbonSubgroupDatum
  > {
    headRadius(): (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number;

    headRadius(radius: number): this;

    headRadius(radius: (this: This, d: RibbonSubgroupDatum, ...args: any[]) => number): this;
  }

  /**
   * Creates a new ribbon generator with the default settings.
   */
  export function ribbon(): RibbonGenerator<any, Ribbon, RibbonSubgroup>;
  /**
   * Creates a new ribbon generator with the default settings.
   *
   * Accessor functions must be configured for the ribbon generator, should the datum types differ from the defaults.
   *
   * The first generic corresponds to the datum type representing a chord for which the ribbon is to be generated. The default type is Chord.
   *
   * The second generic corresponds to the datum type of the chord subgroup, i.e. source or target of the cord. The default type is ChordSubgroup.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function ribbon<Datum, SubgroupDatum>(): RibbonGenerator<any, Datum, SubgroupDatum>;
  /**
   * Creates a new ribbon generator with the default settings.
   *
   * Accessor functions must be configured for the ribbon generator, should the datum types differ from the defaults.
   *
   * The first generic corresponds to the type of the "this" context within which the ribbon generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type representing a chord for which the ribbon is to be generated. The default type is Chord.
   *
   * The third generic corresponds to the datum type of the chord subgroup, i.e. source or target of the cord. The default type is ChordSubgroup.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function ribbon<This, Datum, SubgroupDatum>(): RibbonGenerator<This, Datum, SubgroupDatum>;

  /**
   * Creates a new arrow ribbon generator with the default settings.
   */
  export function ribbonArrow(): RibbonArrowGenerator<any, Ribbon, RibbonSubgroup>;
  /**
   * Creates a new arrow ribbon generator with the default settings.
   *
   * Accessor functions must be configured for the ribbon generator, should the datum types differ from the defaults.
   *
   * The first generic corresponds to the datum type representing a chord for which the ribbon is to be generated. The default type is Chord.
   *
   * The second generic corresponds to the datum type of the chord subgroup, i.e. source or target of the cord. The default type is ChordSubgroup.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function ribbonArrow<Datum, SubgroupDatum>(): RibbonArrowGenerator<any, Datum, SubgroupDatum>;
  /**
   * Creates a new arrow ribbon generator with the default settings.
   *
   * Accessor functions must be configured for the ribbon generator, should the datum types differ from the defaults.
   *
   * The first generic corresponds to the type of the "this" context within which the ribbon generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type representing a chord for which the ribbon is to be generated. The default type is Chord.
   *
   * The third generic corresponds to the datum type of the chord subgroup, i.e. source or target of the cord. The default type is ChordSubgroup.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function ribbonArrow<This, Datum, SubgroupDatum>(): RibbonArrowGenerator<This, Datum, SubgroupDatum>;
}

declare module 'd3-color' {
  // Last module patch version validated against: 3.1.0

  // ---------------------------------------------------------------------------
  // Shared Type Definitions and Interfaces
  // ---------------------------------------------------------------------------

  /**
   * Type allowing for color objects from a specified color space
   */
  export type ColorSpaceObject = RGBColor | HSLColor | LabColor | HCLColor | CubehelixColor;

  /**
   * A helper interface of methods common to color objects (including colors defined outside the d3-color standard module,
   * e.g. in d3-hsv). This interface
   */
  export interface ColorCommonInstance {
    /**
     * Returns true if and only if the color is displayable on standard hardware.
     * For example, this returns false for an RGB color if any channel value is less than zero or greater than 255, or if the opacity is not in the range [0, 1].
     */
    displayable(): boolean;
    /**
     * Returns a string representing this color according to the CSS Object Model specification,
     * such as rgb(247, 234, 186) or rgba(247, 234, 186, 0.2).
     * If this color is not displayable, a suitable displayable color is returned instead.
     * For example, RGB channel values greater than 255 are clamped to 255.
     */
    toString(): string;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB equivalent of this color. For RGB colors, that’s "this".
     */
    rgb(): RGBColor;
    /**
     * Returns a hexadecimal string representing this color.
     * If this color is not displayable, a suitable displayable color is returned instead.
     * For example, RGB channel values greater than 255 are clamped to 255.
     */
    hex(): string;
  }

  /**
   * A Color object which serves as a base class for
   * colorspace-specific sub-class implementations.
   */
  export interface Color {
    /**
     * Returns true if and only if the color is displayable on standard hardware.
     * For example, this returns false for an RGB color if any channel value is less than zero or greater than 255, or if the opacity is not in the range [0, 1].
     */
    displayable(): boolean; // Note: While this method is used in prototyping for colors of specific colorspaces, it should not be called directly, as 'this.rgb' would not be implemented on Color
    /**
     * Returns a string representing this color according to the CSS Object Model specification,
     * such as rgb(247, 234, 186) or rgba(247, 234, 186, 0.2).
     * If this color is not displayable, a suitable displayable color is returned instead.
     * For example, RGB channel values greater than 255 are clamped to 255.
     */
    toString(): string; // Note: While this method is used in prototyping for colors of specific colorspaces, it should not be called directly, as 'this.rgb' would not be implemented on Color
    /**
     * Returns a hexadecimal string representing this color in RGB space, such as #f7eaba.
     * If this color is not displayable, a suitable displayable color is returned instead.
     * For example, RGB channel values greater than 255 are clamped to 255.
     */
    formatHex(): string;
    /**
     * Returns a hexadecimal string representing this color in RGBA space, such as #f7eaba90.
     * If this color is not displayable, a suitable displayable color is returned instead.
     * For example, RGB channel values greater than 255 are clamped to 255.
     */
    formatHex8(): string;
    /**
     * Returns a string representing this color according to the CSS Color Module Level 3 specification, such as hsl(257, 50%, 80%) or hsla(257, 50%, 80%, 0.2).
     * If this color is not displayable, a suitable displayable color is returned instead by clamping S and L channel values to the interval [0, 100].
     */
    formatHsl(): string;
    /**
     * Returns a string representing this color according to the CSS Object Model specification, such as rgb(247, 234, 186) or rgba(247, 234, 186, 0.2).
     * If this color is not displayable, a suitable displayable color is returned instead by clamping RGB channel values to the interval [0, 255].
     */
    formatRgb(): string;
    /**
     * @deprecated Use color.formatHex.
     */
    hex(): string;
  }

  /**
   * A Color factory object, which may also be used with instanceof to test if an object is a color instance.
   */
  export interface ColorFactory extends Function {
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an RGB or HSL color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): RGBColor | HSLColor | null;
    /**
     * Converts the provided color instance and returns an RGB or HSL color.
     *
     * @param color A permissible color space instance.
     */
    (color: ColorSpaceObject | ColorCommonInstance): RGBColor | HSLColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: Color;
  }

  /**
   * An RGB color object.
   */
  export interface RGBColor extends Color {
    /**
     * Value of red channel
     */
    r: number;
    /**
     * Value of green channel
     */
    g: number;
    /**
     * Value of blue channel
     */
    b: number;
    /**
     * Opacity value
     */
    opacity: number;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB equivalent of this color.
     */
    rgb(): this;
    /**
     * Returns a copy of this color.
     *
     * @param values If values is specified, any enumerable own properties of values are assigned to the new returned color.
     */
    copy(values?: {
      r?: number | undefined;
      g?: number | undefined;
      b?: number | undefined;
      opacity?: number | undefined;
    }): this;
    /**
     * Returns a new RGB color where the r, g, and b channels are clamped to the range [0, 255] and rounded to the nearest integer value,
     * and the opacity is clamped to the range [0, 1].
     */
    clamp(): this;
  }

  /**
   * An RGB color factory object, which may also be used with instanceof to test if an object
   * is an RGB color instance.
   */
  export interface RGBColorFactory extends Function {
    /**
     * Constructs a new RGB color based on the specified channel values and opacity.
     *
     * @param r Red channel value.
     * @param g Green channel value.
     * @param b Blue channel value.
     * @param opacity Optional opacity value, defaults to 1.
     */
    (r: number, g: number, b: number, opacity?: number): RGBColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an RGB color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): RGBColor;
    /**
     * Converts the provided color instance and returns an RGB color. The color instance is converted to the RGB color space using color.rgb.
     * Note that unlike color.rgb this method always returns a new instance, even if color is already an RGB color.
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): RGBColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: RGBColor;
  }

  /**
   * An HSL color object.
   */
  export interface HSLColor extends Color {
    /**
     * Hue channel value.
     */
    h: number;
    /**
     * Saturation channel value.
     */
    s: number;
    /**
     * Lightness channel value.
     */
    l: number;
    /**
     * Opacity value.
     */
    opacity: number;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB color equivalent of this color.
     */
    rgb(): RGBColor;
    /**
     * Returns a copy of this color.
     *
     * @param values If values is specified, any enumerable own properties of values are assigned to the new returned color.
     */
    copy(values?: {
      h?: number | undefined;
      s?: number | undefined;
      l?: number | undefined;
      opacity?: number | undefined;
    }): this;
    /**
     * Returns a new HSL color where the h channel is clamped to the range [0, 360), and the s, l, and opacity channels are clamped to the range [0, 1].
     */
    clamp(): this;
  }

  /**
   * An HSL color factory object, which may also be used with instanceof to test if an object
   * is an HSL color instance.
   */
  export interface HSLColorFactory extends Function {
    /**
     * Constructs a new HSL color based on the specified channel values and opacity.
     *
     * @param h Hue channel value.
     * @param s Saturation channel value.
     * @param l Lightness channel value.
     * @param opacity Optional opacity value, defaults to 1.
     */
    (h: number, s: number, l: number, opacity?: number): HSLColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an HSL color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): HSLColor;
    /**
     * Converts the provided color instance and returns an HSL color.
     * The color instance is converted to the RGB color space using color.rgb and then converted to HSL.
     * (Colors already in the HSL color space skip the conversion to RGB.)
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): HSLColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: HSLColor;
  }

  /**
   * A Lab (CIELAB) color object.
   */
  export interface LabColor extends Color {
    /**
     * Lightness typically in the range [0, 100].
     */
    l: number;
    /**
     * Position between red/magenta and green typically in [-160, +160].
     */
    a: number;
    /**
     * Position between yellow and blue typically in [-160, +160].
     */
    b: number;
    /**
     * Opacity value
     */
    opacity: number;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB color equivalent of this color.
     */
    rgb(): RGBColor;
    /**
     * Returns a copy of this color.
     *
     * @param values If values is specified, any enumerable own properties of values are assigned to the new returned color.
     */
    copy(values?: {
      l?: number | undefined;
      a?: number | undefined;
      b?: number | undefined;
      opacity?: number | undefined;
    }): this;
  }

  /**
   * A Lab (CIELAB) color factory object, which may also be used with instanceof to test if an object
   * is a Lab color instance.
   */
  export interface LabColorFactory extends Function {
    /**
     * Constructs a new CIELAB color based on the specified channel values and opacity.
     *
     * @param l Lightness typically in the range [0, 100].
     * @param a Position between red/magenta and green typically in [-160, +160].
     * @param b Position between yellow and blue typically in [-160, +160].
     * @param opacity Optional opacity value, defaults to 1.
     */
    (l: number, a: number, b: number, opacity?: number): LabColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning a Lab color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): LabColor;
    /**
     * Converts the provided color instance and returns a Lab color.
     * The color instance is converted to the RGB color space using color.rgb and then converted to CIELAB.
     * (Colors already in the Lab color space skip the conversion to RGB,
     * and colors in the HCL color space are converted directly to CIELAB.)
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): LabColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: LabColor;
  }

  /**
   * A gray color factory for Lab (CIELAB) colors.
   */
  export type GrayColorFactory =
    /**
     * Constructs a new CIELAB color with the specified l value and a = b = 0.
     *
     * @param l Lightness typically in the range [0, 100].
     * @param opacity Optional opacity value, defaults to 1.
     */
    (l: number, opacity?: number) => LabColor;

  /**
   * An HCL (CIELCH) color object.
   */
  export interface HCLColor extends Color {
    /**
     * Hue channel value typically in [0, 360).
     */
    h: number;
    /**
     * Chroma channel value typically in [0, 230].
     */
    c: number;
    /**
     * Luminance channel value typically in the range [0, 100].
     */
    l: number;
    /**
     * Opacity value
     */
    opacity: number;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB color equivalent of this color.
     */
    rgb(): RGBColor;
    /**
     * Returns a copy of this color.
     *
     * @param values If values is specified, any enumerable own properties of values are assigned to the new returned color.
     */
    copy(values?: {
      h?: number | undefined;
      c?: number | undefined;
      l?: number | undefined;
      opacity?: number | undefined;
    }): this;
  }

  /**
   * An HCL (CIELCH) color factory object, which may also be used with instanceof to test if an object
   * is an HCL color instance.
   */
  export interface HCLColorFactory extends Function {
    /**
     * Constructs a new HCL color based on the specified channel values and opacity.
     *
     * @param h Hue channel value typically in [0, 360).
     * @param c Chroma channel value typically in [0, 230].
     * @param l Luminance channel value typically in the range [0, 100].
     * @param opacity Optional opacity value, defaults to 1.
     */
    (h: number, c: number, l: number, opacity?: number): HCLColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an HCL color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): HCLColor;
    /**
     * Converts the provided color instance and returns an HCL color.
     * The color instance is converted to the RGB color space using color.rgb and then converted to HCL.
     * (Colors already in the HCL color space skip the conversion to RGB,
     * and colors in the Lab color space are converted directly to HCL.)
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): HCLColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: HCLColor;
  }

  /**
   * An LCH (CIELCH) color factory function to create an HCL color object.
   */
  export interface LCHColorFactory {
    /**
     * Constructs a new HCL color based on the specified channel values and opacity.
     *
     * @param l Luminance channel value typically in the range [0, 100].
     * @param c Chroma channel value typically in [0, 230].
     * @param h Hue channel value typically in [0, 360).
     * @param opacity Optional opacity value, defaults to 1.
     */
    (l: number, c: number, h: number, opacity?: number): HCLColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an HCL color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): HCLColor;
    /**
     * Converts the provided color instance and returns an HCL color.
     * The color instance is converted to the RGB color space using color.rgb and then converted to HCL.
     * (Colors already in the HCL color space skip the conversion to RGB,
     * and colors in the Lab color space are converted directly to HCL.)
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): HCLColor;
  }

  /**
   * Dave Green’s Cubehelix color object.
   */
  export interface CubehelixColor extends Color {
    /**
     * Hue channel value.
     */
    h: number;
    /**
     * Saturation channel value.
     */
    s: number;
    /**
     * Lightness channel value.
     */
    l: number;
    /**
     * Opacity value.
     */
    opacity: number;
    /**
     * Returns a brighter copy of this color. If k is specified, it controls how much brighter the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much brighter the returned color should be.
     */
    brighter(k?: number): this;
    /**
     * Returns a darker copy of this color. If k is specified, it controls how much darker the returned color should be.
     * If k is not specified, it defaults to 1.
     *
     * @param k A color space dependent number to determine, how much darker the returned color should be.
     */
    darker(k?: number): this;
    /**
     * Returns the RGB color equivalent of this color.
     */
    rgb(): RGBColor;
    /**
     * Returns a copy of this color.
     *
     * @param values If values is specified, any enumerable own properties of values are assigned to the new returned color.
     */
    copy(values?: {
      h?: number | undefined;
      s?: number | undefined;
      l?: number | undefined;
      opacity?: number | undefined;
    }): this;
  }

  /**
   * A color factory object for Dave Green's Cubehelix colors, which may also be used with instanceof to test if an object
   * is a Cubehelix color instance.
   */
  export interface CubehelixColorFactory extends Function {
    /**
     * Constructs a new Cubehelix color based on the specified channel values and opacity.
     *
     * @param h Hue channel value.
     * @param s Saturation channel value.
     * @param l Lightness channel value.
     * @param opacity Optional opacity value, defaults to 1.
     */
    (h: number, s: number, l: number, opacity?: number): CubehelixColor;
    /**
     * Parses the specified CSS Color Module Level 3 specifier string, returning an Cubehelix color.
     * If the specifier was not valid, null is returned.
     *
     * @param cssColorSpecifier A CSS Color Module Level 3 specifier string.
     */
    (cssColorSpecifier: string): CubehelixColor;
    /**
     * Converts the provided color instance and returns a Cubehelix color.
     * The color instance is specified, it is converted to the RGB color space using color.rgb and then converted to Cubehelix.
     * (Colors already in the Cubehelix color space skip the conversion to RGB.)
     *
     * @param color A permissible color space instance.
     */
    // tslint:disable-next-line:unified-signatures
    (color: ColorSpaceObject | ColorCommonInstance): CubehelixColor;
    /**
     * Prototype of the factory, which can be used for instanceof testing
     */
    readonly prototype: CubehelixColor;
  }

  // --------------------------------------------------------------------------
  // Color object factories
  // --------------------------------------------------------------------------

  /**
   * A Color factory object, which may also be used with instanceof to test if an object is a color instance.
   */
  export const color: ColorFactory;

  /**
   * An RGB color factory object, which may also be used with instanceof to test if an object
   * is an RGB color instance.
   */
  export const rgb: RGBColorFactory;

  /**
   * An HSL color factory object, which may also be used with instanceof to test if an object
   * is an HSL color instance.
   */
  export const hsl: HSLColorFactory;

  /**
   * A Lab (CIELAB) color factory object, which may also be used with instanceof to test if an object
   * is a Lab color instance.
   */
  export const lab: LabColorFactory;

  /**
   * A gray color factory for Lab (CIELAB) colors.
   */
  export const gray: GrayColorFactory;

  /**
   * An HCL (CIELCH) color factory object, which may also be used with instanceof to test if an object
   * is an HCL color instance.
   */
  export const hcl: HCLColorFactory;

  /**
   * An LCH (CIELCH) color factory function to create an HCL color object.
   */
  export const lch: LCHColorFactory;

  /**
   * A color factory object for Dave Green's Cubehelix colors, which may also be used with instanceof to test if an object
   * is a Cubehelix color instance.
   */
  export const cubehelix: CubehelixColorFactory;
}

declare module 'd3-contour' {
  // Last module patch version validated against: 3.0.1

  import { ThresholdCountGenerator, ThresholdNumberArrayGenerator } from 'd3-array';
  import { MultiPolygon } from 'geojson';

  /**
   * An extended GeoJSON MultiPolygon representing a contour.
   */
  export interface ContourMultiPolygon extends MultiPolygon {
    /**
     * Threshold value of the contour.
     */
    value: number;
  }

  /**
   * A contour generator which computes contour polygons by applying marching squares to a rectangular array of numeric values.
   *
   * For each threshold value, the contour generator constructs a GeoJSON MultiPolygon geometry object representing the area
   * where the input values are greater than or equal to the threshold value.
   * The geometry is in planar coordinates, where ⟨i + 0.5, j + 0.5⟩ corresponds to element i + jn in the input values array.
   */
  export interface Contours {
    /**
     * Computes the contours for the given array of values, returning an array of GeoJSON MultiPolygon geometry objects.
     * Each geometry object represents the area where the input values are greater than or equal to the corresponding threshold value;
     * the threshold value for each geometry object is exposed as geometry.value.
     *
     * The returned geometry objects are typically passed to d3.geoPath to display,
     * using null or d3.geoIdentity as the associated projection
     *
     * @param values Array of input values. The input values must be an array of length n×m where [n, m] is the contour generator’s size;
     * furthermore, each values[i + jn] must represent the value at the position ⟨i, j⟩.
     */
    (values: number[]): ContourMultiPolygon[];

    /**
     * Computes a single contour, returning a GeoJSON MultiPolygon geometry object.
     * This geometry object represents the area where the input values are greater than or equal to the given threshold value;
     * the threshold value for the geometry object is exposed as geometry.value.
     *
     * @param values  Array of input values. The input values must be an array of length n×m where [n, m] is the contour generator’s size;
     * furthermore, each values[i + jn] must represent the value at the position ⟨i, j⟩.
     * @param threshold Threshold value.
     */
    contour(values: number[], threshold: number): ContourMultiPolygon;

    /**
     * Return the expected size of the input values grid, which defaults to [1,1].
     */
    size(): [number, number];
    /**
     * Sets the expected size of the input values grid to the contour generator and returns the contour generator.
     *
     * @param size Size of the input values grid specified as an array [n, m]
     * where n is the number of columns in the grid and m is the number of rows; n and m must be positive integers.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current smoothing flag, which defaults to true.
     */
    smooth(): boolean;
    /**
     * Sets whether or not the generated contour polygons are smoothed using linear interpolation and returns the contour generator.
     *
     * @param smooth Flag to enable linear interpolation. The default is "true".
     */
    smooth(smooth: boolean): this;

    /**
     * Returns the current threshold generator, which by default implements Sturges’ formula.
     */
    thresholds(): ThresholdCountGenerator<number> | ThresholdNumberArrayGenerator<number>;
    /**
     * Sets the threshold generator to the specified function or array and returns this contour generator.
     * Thresholds are defined as an array of values [x0, x1, …].
     * The first generated contour corresponds to the area where the input values are greater than or equal to x0;
     * the second contour corresponds to the area where the input values are greater than or equal to x1, and so on.
     * Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as geometry.value.
     * If a count is specified instead of an array of thresholds, then the input values’ extent will be uniformly divided into approximately count bins; see d3.ticks.
     */
    thresholds(
      thresholds: number | number[] | ThresholdCountGenerator<number> | ThresholdNumberArrayGenerator<number>,
    ): this;
  }

  /**
   * Construct a new contour generator with the default settings.
   */
  export function contours(): Contours;

  /**
   * A contour generator for density estimates.
   *
   * The generic refers to the data type of an element in the data array
   * used with the density contour generator. If omitted, the default setting assumes that,
   * the elements of the data array used with the density contour generator are two-element arrays.
   * The first element corresponds to the x-dimension, the second to the y-dimension.
   */
  export interface ContourDensity<Datum = [number, number]> {
    /**
     * Estimates the density contours for the given array of data, returning an array of GeoJSON MultiPolygon geometry objects.
     * Each geometry object represents the area where the estimated number of points per square pixel is greater than or equal to
     * the corresponding threshold value; the threshold value for each geometry object is exposed as geometry.value.
     * The returned geometry objects are typically passed to d3.geoPath to display, using null or d3.geoIdentity as the associated projection.
     * See also d3.contours.
     *
     * The x- and y-coordinate for each data point are computed using density.x and density.y.
     * The generated contours are only accurate within the estimator’s defined size.
     *
     * @param data Array of input data.
     */
    (data: Datum[]): ContourMultiPolygon[];

    /**
     * Returns the current x-coordinate accessor.
     * The default x-coordinate accessor is a functions which accepts as input a two-element array of numbers
     * and returns the element at index 0.
     */
    x(): (d: Datum) => number;
    /**
     * Sets the x-coordinate accessor and returns the density contour estimator.
     *
     * @param x An x-coordinate accessor function, which accepts as input an element of the input data array and returns the
     * x-coordinate.
     */
    x(x: (d: Datum) => number): this;

    /**
     * Returns the current y-coordinate accessor.
     * The default y-coordinate accessor is a functions which accepts as input a two-element array of numbers
     * and returns the element at index 1.
     */
    y(): (d: Datum) => number;
    /**
     * Sets the y-coordinate accessor and returns the density contour estimator.
     *
     * @param y An y-coordinate accessor function, which accepts as input an element of the input data array and returns the
     * y-coordinate.
     */
    y(y: (d: Datum) => number): this;

    /**
     * Returns the current point weight accessor.
     */
    weight(): (d: Datum) => number;

    /**
     * Sets the point weight accessor and returns the density contour estimator.
     *
     * @param weight A point weight accessor function.
     */
    weight(weight: (d: Datum) => number): this;

    /**
     * Returns the current size, which defaults to [960, 500].
     */
    size(): [number, number];
    /**
     * Sets the size of the density estimator to the specified bounds and returns the density contour estimator.
     *
     * @param size The size is specified as an array [width, height], where width is the maximum x-value and height is the maximum y-value.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current cell size, which defaults to 4.
     */
    cellSize(): number;
    /**
     * Sets the size of individual cells in the underlying bin grid to the specified positive integer and returns the density contour estimator.
     *
     * The cell size is rounded down to the nearest power of two. Smaller cells produce more detailed contour polygons, but are more expensive to compute.
     *
     * @param cellSize Cell size, a positive integer.
     */
    cellSize(cellSize: number): this;

    /**
     * Returns the current threshold generator, which by default generates about twenty nicely-rounded density thresholds.
     */
    thresholds(): ThresholdCountGenerator<number> | ThresholdNumberArrayGenerator<number>;
    /**
     * Sets the threshold generator to the specified function or array and returns this contour generator.
     * Thresholds are defined as an array of values [x0, x1, …].
     * The first generated density contour corresponds to the area where the estimated density is greater than or equal to x0;
     * the second contour corresponds to the area where the estimated density is greater than or equal to x1, and so on.
     * Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as geometry.value.
     * The first value x0 should typically be greater than zero.
     * If a count is specified instead of an array of thresholds, then approximately count uniformly-spaced nicely-rounded thresholds will be generated; see d3.ticks.
     */
    thresholds(
      thresholds: number | number[] | ThresholdCountGenerator<number> | ThresholdNumberArrayGenerator<number>,
    ): this;

    /**
     * Returns the current bandwidth, which defaults to 20.4939….
     */
    bandwidth(): number;
    /**
     * Sets the bandwidth (the standard deviation) of the Gaussian kernel and returns the density contour estimator.
     *
     * @param bandwidth Bandwidth (the standard deviation) of the Gaussian kernel.
     * The specified bandwidth is currently rounded to the nearest supported value by this implementation, and must be nonnegative.
     */
    bandwidth(bandwidth: number): this;
  }

  /**
   * Construct a new contour generator for density estimates.
   *
   * The generic refers to the data type of an element in the data array
   * used with the density contour generator. If omitted, the default setting assumes that,
   * the elements of the data array used with the density contour generator are two-element arrays.
   * The first element corresponds to the x-dimension, the second to the y-dimension.
   *
   * Important: ensure that the x- and y-accessor functions are configured to
   * match the data type used for the generic Datum.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function contourDensity<Datum = [number, number]>(): ContourDensity<Datum>;
}

declare module 'd3-delaunay' {
  /**
   * Delaunay triangulation
   */
  export class Delaunay<P> {
    /**
     * Returns the Delaunay triangulation for the given flat array [x0, y0, x1, y1, …] of points.
     */
    constructor(points: ArrayLike<number>);

    /**
     * Returns the Delaunay triangulation for the given array or iterable of points where each point is an array in the form: [x, y].
     */
    static from(points: ArrayLike<Delaunay.Point> | Iterable<Delaunay.Point>): Delaunay<Delaunay.Point>;
    /**
     * Returns the Delaunay triangulation for the given array or iterable of points.
     * Otherwise, the getX and getY functions are invoked for each point in order, and must return the respective x- and y-coordinate for each point.
     * If that is specified, the functions getX and getY are invoked with that as this.
     * (See Array.from for reference.)
     */
    static from<P>(
      points: ArrayLike<P> | Iterable<P>,
      getX: Delaunay.GetCoordinate<P, ArrayLike<P> | Iterable<P>>,
      getY: Delaunay.GetCoordinate<P, ArrayLike<P> | Iterable<P>>,
      that?: any,
    ): Delaunay<P>;

    /**
     * The coordinates of the points as an array [x0, y0, x1, y1, ...].
     * Typically, this is a Float64Array, however you can use any array-like type in the constructor.
     */
    points: ArrayLike<number>;

    /**
     * The halfedge indices as an Int32Array [j0, j1, ...].
     * For each index 0 <= i < halfedges.length, there is a halfedge from triangle vertex j = halfedges[i] to triangle vertex i.
     */
    halfedges: Int32Array;

    /**
     * An Int32Array of point indexes that form the convex hull in counterclockwise order.
     * If the points are collinear, returns them ordered.
     */
    hull: Uint32Array;

    /**
     * The triangle vertex indices as an Uint32Array [i0, j0, k0, i1, j1, k1, ...].
     * Each contiguous triplet of indices i, j, k forms a counterclockwise triangle.
     * The coordinates of the triangle's points can be found by going through 'points'.
     */
    triangles: Uint32Array;

    /**
     * The incoming halfedge indexes as a Int32Array [e0, e1, e2, ...].
     * For each point i, inedges[i] is the halfedge index e of an incoming halfedge.
     * For coincident points, the halfedge index is -1; for points on the convex hull, the incoming halfedge is on the convex hull; for other points, the choice of incoming halfedge is arbitrary.
     */
    inedges: Int32Array;

    /**
     * Returns the index of the input point that is closest to the specified point ⟨x, y⟩.
     * The search is started at the specified point i. If i is not specified, it defaults to zero.
     */
    find(x: number, y: number, i?: number): number;

    /**
     * Returns an iterable over the indexes of the neighboring points to the specified point i.
     * The iterable is empty if i is a coincident point.
     */
    neighbors(i: number): IterableIterator<number>;

    /**
     * Renders the edges of the Delaunay triangulation to an SVG path string.
     */
    render(): string;
    /**
     * Renders the edges of the Delaunay triangulation to the specified context.
     * The specified context must implement the context.moveTo and context.lineTo methods from the CanvasPathMethods API.
     */
    render(context: Delaunay.MoveContext & Delaunay.LineContext): void;

    /**
     * Renders the convex hull of the Delaunay triangulation to an SVG path string.
     */
    renderHull(): string;
    /**
     * Renders the convex hull of the Delaunay triangulation to the specified context.
     * The specified context must implement the context.moveTo and context.lineTo methods from the CanvasPathMethods API.
     */
    renderHull(context: Delaunay.MoveContext & Delaunay.LineContext): void;

    /**
     * Renders triangle i of the Delaunay triangulation to an SVG path string.
     */
    renderTriangle(i: number): string;
    /**
     * Renders triangle i of the Delaunay triangulation to the specified context.
     * The specified context must implement the context.moveTo, context.lineTo and context.closePath methods from the CanvasPathMethods API.
     */
    renderTriangle(i: number, context: Delaunay.MoveContext & Delaunay.LineContext & Delaunay.ClosableContext): void;

    /**
     * Renders the input points of the Delaunay triangulation to an SVG path string as circles with radius 2.
     */
    renderPoints(): string;
    /**
     * Renders the input points of the Delaunay triangulation to an SVG path string as circles with the specified radius.
     */
    renderPoints(context: undefined, radius: number): string;
    /**
     * Renders the input points of the Delaunay triangulation to the specified context as circles with the specified radius.
     * If radius is not specified, it defaults to 2.
     * The specified context must implement the context.moveTo and context.arc methods from the CanvasPathMethods API.
     */
    renderPoints(context: Delaunay.MoveContext & Delaunay.ArcContext, radius?: number): void;

    /**
     * Returns the closed polygon [[x0, y0], [x1, y1], ..., [x0, y0]] representing the convex hull.
     */
    hullPolygon(): Delaunay.Polygon;

    /**
     * Returns the closed polygon [[x0, y0], [x1, y1], [x2, y2], [x0, y0]] representing the triangle i.
     */
    trianglePolygon(i: number): Delaunay.Triangle;
    /**
     * Returns an iterable over the polygons for each triangle, in order.
     */
    trianglePolygons(): IterableIterator<Delaunay.Triangle>;

    /**
     * Updates the triangulation after the points have been modified in-place.
     */
    update(): this;

    /**
     * Returns the Voronoi diagram for the associated points.
     * When rendering, the diagram will be clipped to the specified bounds = [xmin, ymin, xmax, ymax].
     * If bounds is not specified, it defaults to [0, 0, 960, 500].
     * See To Infinity and Back Again for an interactive explanation of Voronoi cell clipping.
     */
    voronoi(bounds?: Delaunay.Bounds): Voronoi<P>;
  }

  export namespace Delaunay {
    /**
     * A point represented as an array tuple [x, y].
     */
    type Point = [number, number];

    /**
     * A closed polygon [[x0, y0], [x1, y1], [x2, y2], [x0, y0]] representing a triangle.
     */
    type Triangle = Point[];

    /**
     * A closed polygon [[x0, y0], [x1, y1], ..., [x0, y0]].
     */
    type Polygon = Point[];

    /**
     * A rectangular area [x, y, width, height].
     */
    type Bounds = [number, number, number, number];

    /**
     * A function to extract a x- or y-coordinate from the specified point.
     */
    type GetCoordinate<P, PS> = (point: P, i: number, points: PS) => number;

    /**
     * An interface for the rect() method of the CanvasPathMethods API.
     */
    interface RectContext {
      /**
       * rect() method of the CanvasPathMethods API.
       */
      rect(x: number, y: number, width: number, height: number): void;
    }

    /**
     * An interface for the moveTo() method of the CanvasPathMethods API.
     */
    interface MoveContext {
      /**
       * moveTo() method of the CanvasPathMethods API.
       */
      moveTo(x: number, y: number): void;
    }

    /**
     * An interface for the lineTo() method of the CanvasPathMethods API.
     */
    interface LineContext {
      /**
       * lineTo() method of the CanvasPathMethods API.
       */
      lineTo(x: number, y: number): void;
    }

    /**
     * An interface for the arc() method of the CanvasPathMethods API.
     */
    interface ArcContext {
      /**
       * arc() method of the CanvasPathMethods API.
       */
      arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
    }

    /**
     * An interface for the closePath() method of the CanvasPathMethods API.
     */
    interface ClosableContext {
      /**
       * closePath() method of the CanvasPathMethods API.
       */
      closePath(): void;
    }
  }

  /**
   * Voronoi regions
   */
  export class Voronoi<P> {
    /**
     * The Voronoi diagram’s associated Delaunay triangulation.
     */
    delaunay: Delaunay<P>;

    /**
     * The circumcenters of the Delaunay triangles [cx0, cy0, cx1, cy1, ...].
     * Each contiguous pair of coordinates cx, cy is the circumcenter for the corresponding triangle.
     * These circumcenters form the coordinates of the Voronoi cell polygons.
     */
    circumcenters: Float64Array;

    /**
     * An array [vx0, vy0, wx0, wy0, ...] where each non-zero quadruple describes an open (infinite) cell
     * on the outer hull, giving the directions of two open half-lines.
     */
    vectors: Float64Array;

    /**
     * The bounds of the viewport [xmin, ymin, xmax, ymax] for rendering the Voronoi diagram.
     * These values only affect the rendering methods (voronoi.render, voronoi.renderBounds, cell.render).
     */
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;

    /**
     * Returns true if the cell with the specified index i contains the specified point ⟨x, y⟩.
     * (This method is not affected by the associated Voronoi diagram’s viewport bounds.)
     */
    contains(i: number, x: number, y: number): boolean;

    /**
     * Returns an iterable over the indexes of the cells that share a common edge with the specified cell i.
     * Voronoi neighbors are always neighbors on the Delaunay graph, but the converse is false when the common edge has been clipped out by the Voronoi diagram’s viewport.
     */
    neighbors(i: number): Iterable<number>;

    /**
     * Renders the mesh of Voronoi cells to an SVG path string.
     */
    render(): string;
    /**
     * Renders the mesh of Voronoi cells to the specified context.
     * The specified context must implement the context.moveTo and context.lineTo methods from the CanvasPathMethods API.
     */
    render(context: Delaunay.MoveContext & Delaunay.LineContext): void;

    /**
     * Renders the viewport extent to an SVG path string.
     */
    renderBounds(): string;
    /**
     * Renders the viewport extent to the specified context.
     * The specified context must implement the context.rect method from the CanvasPathMethods API.
     * Equivalent to context.rect(voronoi.xmin, voronoi.ymin, voronoi.xmax - voronoi.xmin, voronoi.ymax - voronoi.ymin).
     */
    renderBounds(context: Delaunay.RectContext): void;

    /**
     * Renders the cell with the specified index i to an SVG path string.
     */
    renderCell(i: number): string;
    /**
     * Renders the cell with the specified index i to the specified context.
     * The specified context must implement the context.moveTo, context.lineTo, and context.closePath methods from the CanvasPathMethods API.
     */
    renderCell(i: number, context: Delaunay.MoveContext & Delaunay.LineContext & Delaunay.ClosableContext): void;

    /**
     * Returns an iterable over the non-empty polygons for each cell, with the cell index as property.
     */
    cellPolygons(): IterableIterator<Delaunay.Polygon & { index: number }>;

    /**
     * Returns the convex, closed polygon [[x0, y0], [x1, y1], ..., [x0, y0]] representing the cell for the specified point i.
     */
    cellPolygon(i: number): Delaunay.Polygon;

    /**
     * Updates the Voronoi diagram and underlying triangulation after the points have been modified in-place — useful for Lloyd’s relaxation.
     */
    update(): this;
  }
}

declare module 'd3-dispatch' {
  // Last module patch version validated against: 3.0.1

  export interface Dispatch<T extends object> {
    /**
     * Like `function.apply`, invokes each registered callback for the specified type,
     * passing the callback the specified arguments, with `that` as the `this` context.
     *
     * @param type A specified event type.
     * @param that The `this` context for the callback.
     * @param args Additional arguments to be passed to the callback.
     * @throws "unknown type" on unknown event type.
     */
    apply(type: string, that?: T, args?: any[]): void;

    /**
     * Like `function.call`, invokes each registered callback for the specified type,
     * passing the callback the specified arguments, with `that` as the `this` context.
     * See dispatch.apply for more information.
     *
     * @param type A specified event type.
     * @param that The `this` context for the callback.
     * @param args Additional arguments to be passed to the callback.
     * @throws "unknown type" on unknown event type.
     */
    call(type: string, that?: T, ...args: any[]): void;

    /**
     * Returns a copy of this dispatch object.
     * Changes to this dispatch do not affect the returned copy and vice versa.
     */
    copy(): Dispatch<T>;

    /**
     * Returns the callback for the specified typenames, if any.
     * If multiple typenames are specified, the first matching callback is returned.
     */
    on(typenames: string): ((this: T, ...args: any[]) => void) | undefined;
    /**
     * Adds or removes the callback for the specified typenames.
     * If a callback function is specified, it is registered for the specified (fully-qualified) typenames.
     * If a callback was already registered for the given typenames, the existing callback is removed before the new callback is added.
     * The specified typenames is a string, such as start or end.foo.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as start.foo and start.bar.
     * To specify multiple typenames, separate typenames with spaces, such as start end or start.foo start.bar.
     * To remove all callbacks for a given name foo, say dispatch.on(".foo", null).
     */
    on(typenames: string, callback: null | ((this: T, ...args: any[]) => void)): this;
  }

  /**
   * Creates a new dispatch for the specified event types. Each type is a string, such as "start" or "end".
   *
   * @param types The event types.
   * @throws "illegal type" on empty string or duplicated event types.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function dispatch<T extends object>(...types: string[]): Dispatch<T>;
}

declare module 'd3-drag' {
  // Last module patch version validated against: 3.0.0

  import { Selection, ValueFn } from 'd3-selection';

  // --------------------------------------------------------------------------
  // Shared Type Definitions and Interfaces
  // --------------------------------------------------------------------------

  /**
   * DraggedElementBaseType serves as an alias for the 'minimal' data type which can be selected
   * without 'd3-drag' (and related code in 'd3-selection') trying to use properties internally which would otherwise not
   * be supported.
   */
  export type DraggedElementBaseType = Element;

  /**
   * Container element type usable for mouse/touch functions
   */
  export type DragContainerElement = HTMLElement | SVGSVGElement | SVGGElement; // HTMLElement includes HTMLCanvasElement

  /**
   * The subject datum should at a minimum expose x and y properties, so that the relative position
   * of the subject and the pointer can be preserved during the drag gesture.
   */
  export interface SubjectPosition {
    /**
     * x-coordinate
     */
    x: number;
    /**
     * y-coordinate
     */
    y: number;
  }

  /**
   * A D3 Drag Behavior
   *
   * The first generic refers to the type of element to be dragged.
   * The second generic refers to the type of the datum of the dragged element.
   * The third generic refers to the type of the drag behavior subject.
   *
   * The subject of a drag gesture represents the thing being dragged.
   * It is computed when an initiating input event is received,
   * such as a mousedown or touchstart, immediately before the drag gesture starts.
   * The subject is then exposed as event.subject on subsequent drag events for this gesture.
   *
   * The default subject is the datum of the element in the originating selection (see drag)
   * that received the initiating input event; if this datum is undefined,
   * an object representing the coordinates of the pointer is created.
   * When dragging circle elements in SVG, the default subject is thus the datum of the circle being dragged.
   * With Canvas, the default subject is the canvas element’s datum (regardless of where on the canvas you click).
   * In this case, a custom subject accessor would be more appropriate,
   * such as one that picks the closest circle to the mouse within a given search radius.
   */
  export interface DragBehavior<GElement extends DraggedElementBaseType, Datum, Subject> extends Function {
    /**
     * Applies the drag behavior to the selected elements.
     * This function is typically not invoked directly, and is instead invoked via selection.call.
     *
     * For details see: {@link https://github.com/d3/d3-drag#_drag}
     *
     * @param selection A D3 selection of elements.
     * @param args Optional arguments to be passed in.
     */
    (selection: Selection<GElement, Datum, any, any>, ...args: any[]): void;

    /**
     * Returns the current container accessor function.
     */
    container(): ValueFn<GElement, Datum, DragContainerElement>;
    /**
     * Sets the container accessor to the specified function and returns the drag behavior.
     *
     * The container of a drag gesture determines the coordinate system of subsequent drag events, affecting event.x and event.y.
     * The element returned by the container accessor is subsequently passed to d3.pointer to determine the local coordinates of the pointer.
     *
     * The default container accessor returns the parent node of the element in the originating selection (see drag)
     * that received the initiating input event. This is often appropriate when dragging SVG or HTML elements,
     * since those elements are typically positioned relative to a parent. For dragging graphical elements with a Canvas,
     * however, you may want to redefine the container as the initiating element itself, using "this" in the accessor
     * function.
     *
     * @param accessor A container accessor function which is evaluated for each selected element,
     * in order, being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element. The function returns the container element.
     */
    container(accessor: ValueFn<GElement, Datum, DragContainerElement>): this;
    /**
     * Sets the container accessor to the specified object and returns the drag behavior.
     *
     * The container of a drag gesture determines the coordinate system of subsequent drag events, affecting event.x and event.y.
     * The element returned by the container accessor is subsequently passed to d3.pointer to determine the local coordinates of the pointer.
     *
     * The default container accessor returns the parent node of the element in the originating selection (see drag)
     * that received the initiating input event. This is often appropriate when dragging SVG or HTML elements,
     * since those elements are typically positioned relative to a parent. For dragging graphical elements with a Canvas,
     * however, you may want to redefine the container as the initiating element itself, such as drag.container(canvas).
     *
     * @param container Container element for the drag gesture.
     */
    container(container: DragContainerElement): this;

    /**
     * Returns the current filter function.
     */
    filter(): (this: GElement, event: any, d: Datum) => boolean;
    /**
     * Sets the event filter to the specified filter function and returns the drag behavior.
     *
     * If the filter returns falsey, the initiating event is ignored and no drag gesture is started.
     * Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons,
     * since those buttons are typically intended for other purposes, such as the context menu.
     *
     * @param filterFn A filter function which is evaluated for each selected element,
     * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
     * The function returns a boolean value.
     */
    filter(filterFn: (this: GElement, event: any, d: Datum) => boolean): this;

    /**
     * Returns the current touch support detector, which defaults to a function returning true,
     * if the "ontouchstart" event is supported on the current element.
     */
    touchable(): ValueFn<GElement, Datum, boolean>;
    /**
     * Sets the touch support detector to the specified boolean value and returns the drag behavior.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the drag behavior is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A boolean value. true when touch event listeners should be applied to the corresponding element, otherwise false.
     */
    touchable(touchable: boolean): this;
    /**
     * Sets the touch support detector to the specified function and returns the drag behavior.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the drag behavior is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A touch support detector function, which returns true when touch event listeners should be applied to the corresponding element.
     * The function is evaluated for each selected element to which the drag behavior was applied, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element. The function returns a boolean value.
     */
    touchable(touchable: ValueFn<GElement, Datum, boolean>): this;

    /**
     *  Returns the current subject accessor functions.
     */
    subject(): (this: GElement, event: any, d: Datum) => Subject;
    /**
     * Sets the subject accessor to the specified function and returns the drag behavior.
     *
     * The subject of a drag gesture represents the thing being dragged.
     * It is computed when an initiating input event is received,
     * such as a mousedown or touchstart, immediately before the drag gesture starts.
     * The subject is then exposed as event.subject on subsequent drag events for this gesture.
     *
     * The default subject is the datum of the element in the originating selection (see drag)
     * that received the initiating input event; if this datum is undefined,
     * an object representing the coordinates of the pointer is created.
     * When dragging circle elements in SVG, the default subject is thus the datum of the circle being dragged.
     * With Canvas, the default subject is the canvas element’s datum (regardless of where on the canvas you click).
     * In this case, a custom subject accessor would be more appropriate,
     * such as one that picks the closest circle to the mouse within a given search radius.
     *
     * The subject of a drag gesture may not be changed after the gesture starts.
     *
     * During the evaluation of the subject accessor, event is a beforestart drag event.
     * Use event.sourceEvent to access the initiating input event and event.identifier to access the touch identifier.
     * The event.x and event.y are relative to the container, and are computed using d3.pointer.
     *
     * @param accessor An extent accessor function which is evaluated for each selected element,
     * in order, being passed the current event (`event`) and datum `d`, with the `this` context as the current DOM element.
     * The returned subject should be an object that exposes x and y properties,
     * so that the relative position of the subject and the pointer can be preserved during the drag gesture.
     * If the subject is null or undefined, no drag gesture is started for this pointer;
     * however, other starting touches may yet start drag gestures.
     */
    subject(accessor: (this: GElement, event: any, d: Datum) => Subject): this;

    /**
     * Return the current click distance threshold, which defaults to zero.
     */
    clickDistance(): number;
    /**
     * Set the maximum distance that the mouse can move between mousedown and mouseup that will trigger
     * a subsequent click event. If at any point between mousedown and mouseup the mouse is greater than or equal to
     * distance from its position on mousedown, the click event following mouseup will be suppressed.
     *
     * @param distance The distance threshold between mousedown and mouseup measured in client coordinates (event.clientX and event.clientY).
     * The default is zero.
     */
    clickDistance(distance: number): this;

    /**
     * Return the first currently-assigned listener matching the specified typenames, if any.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     */
    on(typenames: string): ((this: GElement, event: any, d: Datum) => void) | undefined;
    /**
     * Remove the current event listeners for the specified typenames, if any, return the drag behavior.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     * @param listener Use null to remove the listener.
     */
    on(typenames: string, listener: null): this;
    /**
     * Set the event listener for the specified typenames and return the drag behavior.
     * If an event listener was already registered for the same type and name,
     * the existing listener is removed before the new listener is added.
     * When a specified event is dispatched, each listener will be invoked with the same context and arguments as selection.on listeners.
     *
     * Changes to registered listeners via drag.on during a drag gesture do not affect the current drag gesture.
     * Instead, you must use event.on, which also allows you to register temporary event listeners for the current drag gesture.
     * Separate events are dispatched for each active pointer during a drag gesture.
     * For example, if simultaneously dragging multiple subjects with multiple fingers, a start event is dispatched for each finger,
     * even if both fingers start touching simultaneously.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     * @param listener An event listener function which is evaluated for each selected element,
     * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
     */
    on(typenames: string, listener: (this: GElement, event: any, d: Datum) => void): this;
  }

  /**
   * Creates a new drag behavior. The returned behavior, drag, is both an object and a function, and is
   * typically applied to selected elements via selection.call.
   *
   * Use this signature when using the default subject accessor.
   *
   * The first generic refers to the type of element to be dragged.
   * The second generic refers to the type of the datum of the dragged element.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function drag<GElement extends DraggedElementBaseType, Datum>(): DragBehavior<
    GElement,
    Datum,
    Datum | SubjectPosition
  >;
  /**
   * Creates a new drag behavior. The returned behavior, drag, is both an object and a function, and is
   * typically applied to selected elements via selection.call.
   *
   * Use this signature when using a custom subject accessor.
   *
   * The first generic refers to the type of element to be dragged.
   * The second generic refers to the type of the datum of the dragged element.
   * The third generic refers to the type of the drag behavior subject.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function drag<GElement extends DraggedElementBaseType, Datum, Subject>(): DragBehavior<
    GElement,
    Datum,
    Subject
  >;

  /**
   * D3 Drag event
   *
   * The first generic refers to the type of element to be dragged.
   * The second generic refers to the type of the datum of the dragged element.
   * The third generic refers to the type of the drag behavior subject.
   */
  export interface D3DragEvent<GElement extends DraggedElementBaseType, Datum, Subject> {
    /**
     * The DragBehavior associated with the event
     */
    target: DragBehavior<GElement, Datum, Subject>;
    /**
     * The event type for the DragEvent
     */
    type: 'start' | 'drag' | 'end' | string; // Leave failsafe string type for cases like 'drag.foo'
    /**
     * The drag subject, defined by drag.subject.
     */
    subject: Subject;
    /**
     * The new x-coordinate of the subject, relative to the container
     */
    x: number;
    /**
     * The new y-coordinate of the subject, relative to the container
     */
    y: number;
    /**
     * The change in x-coordinate since the previous drag event.
     */
    dx: number;
    /**
     * The change in y-coordinate since the previous drag event.
     */
    dy: number;
    /**
     * The string “mouse”, or a numeric touch identifier.
     */
    identifier: 'mouse' | number;
    /**
     * The number of currently active drag gestures (on start and end, not including this one).
     *
     * The event.active field is useful for detecting the first start event and the last end event
     * in a sequence of concurrent drag gestures: it is zero when the first drag gesture starts,
     * and zero when the last drag gesture ends.
     */
    active: number;
    /**
     * The underlying input event, such as mousemove or touchmove.
     */
    sourceEvent: any;
    /**
     * Return the first currently-assigned listener matching the specified typenames, if any.
     *
     * Equivalent to drag.on, but only applies to the current drag gesture. Before the drag gesture starts,
     * a copy of the current drag event listeners is made. This copy is bound to the current drag gesture
     * and modified by event.on. This is useful for temporary listeners that only receive events for the current drag gesture.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     */
    on(typenames: string): ((this: GElement, event: any, d: Datum) => void) | undefined;
    /**
     * Remove the current event listeners for the specified typenames, if any, return the drag behavior.
     *
     * Equivalent to drag.on, but only applies to the current drag gesture. Before the drag gesture starts,
     * a copy of the current drag event listeners is made. This copy is bound to the current drag gesture
     * and modified by event.on. This is useful for temporary listeners that only receive events for the current drag gesture.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     * @param listener Use null to remove the listener.
     */
    on(typenames: string, listener: null): this;
    /**
     * Set the event listener for the specified typenames and return the drag behavior.
     * If an event listener was already registered for the same type and name,
     * the existing listener is removed before the new listener is added.
     * When a specified event is dispatched, each listener will be invoked with the same context and arguments as selection.on listeners.
     *
     * Equivalent to drag.on, but only applies to the current drag gesture. Before the drag gesture starts,
     * a copy of the current drag event listeners is made. This copy is bound to the current drag gesture
     * and modified by event.on. This is useful for temporary listeners that only receive events for the current drag gesture.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after a new pointer becomes active [on mousedown or touchstart]), drag (after an active pointer moves [on mousemove or touchmove], or
     * end (after an active pointer becomes inactive [on mouseup, touchend or touchcancel].)
     * @param listener An event listener function which is evaluated for each selected element,
     * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
     */
    on(typenames: string, listener: (this: GElement, event: any, d: Datum) => void): this;
  }

  /**
   * Prevents native drag-and-drop and text selection on the specified window.
   * As an alternative to preventing the default action of mousedown events,
   * this method prevents undesirable default actions following mousedown. In supported browsers,
   * this means capturing dragstart and selectstart events, preventing the associated default actions,
   * and immediately stopping their propagation. In browsers that do not support selection events,
   * the user-select CSS property is set to none on the document element.
   * This method is intended to be called on mousedown, followed by d3.dragEnable on mouseup.
   *
   * @param window The window for which drag should be disabled.
   */
  export function dragDisable(window: Window): void;

  /**
   * Allows native drag-and-drop and text selection on the specified window; undoes the effect of d3.dragDisable.
   * This method is intended to be called on mouseup, preceded by d3.dragDisable on mousedown.
   * If noclick is true, this method also temporarily suppresses click events.
   * The suppression of click events expires after a zero-millisecond timeout,
   * such that it only suppress the click event that would immediately follow the current mouseup event, if any.
   *
   * @param window The window for which drag should be (re-)enabled.
   * @param noClick An optional flag. If noclick is true, this method also temporarily suppresses click events.
   */
  export function dragEnable(window: Window, noClick?: boolean): void;
}

declare module 'd3-dsv' {
  // Last module patch version validated against: 3.0.1

  // ------------------------------------------------------------------------------------------
  // Shared Types and Interfaces
  // ------------------------------------------------------------------------------------------

  /**
   * An object representing a DSV parsed row with values represented as strings.
   */
  export type DSVRowString<Columns extends string = string> = {
    [key in Columns]: string;
  };

  /**
   * An object in raw format before parsing, that is with only string values.
   */
  export type DSVRaw<T extends object> = {
    [key in keyof T]: string;
  };

  /**
   * An object representing a DSV parsed row with values represented as an arbitrary datatype, depending
   * on the performed parsed row mapping.
   *
   * @deprecated Use `object` instead.
   */
  export interface DSVRowAny {
    [key: string]: any;
  }

  /**
   * An array object representing all deserialized rows. The array is enhanced with a property listing
   * the names of the parsed columns.
   */
  export interface DSVRowArray<Columns extends string = string> extends Array<DSVRowString<Columns>> {
    /**
     * List of column names.
     */
    columns: Columns[];
  }

  /**
   * An array object representing all parsed rows. The array is enhanced with a property listing
   * the names of the parsed columns.
   */
  export interface DSVParsedArray<T> extends Array<T> {
    /**
     * List of column names.
     */
    columns: Array<keyof T>;
  }

  // ------------------------------------------------------------------------------------------
  // CSV Parsers and Formatters
  // ------------------------------------------------------------------------------------------

  // csvParse(...) ============================================================================

  /**
   * Parses the specified string, which must be in the comma-separated values format, returning an array of objects representing the parsed rows.
   *
   * Unlike csvParseRows, this method requires that the first line of the CSV content contains a comma-separated list of column names;
   * these column names become the attributes on the returned objects.
   *
   * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
   *
   * Equivalent to `dsvFormat(",").parse`.
   * Note: requires unsafe-eval content security policy.
   *
   * @param csvString A string, which must be in the comma-separated values format.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function csvParse<Columns extends string>(csvString: string): DSVRowArray<Columns>;
  /**
   * Parses the specified string, which must be in the comma-separated values format, returning an array of objects representing the parsed rows.
   *
   * Unlike csvParseRows, this method requires that the first line of the CSV content contains a comma-separated list of column names;
   * these column names become the attributes on the returned objects.
   *
   * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
   *
   * Equivalent to `dsvFormat(",").parse`.
   * Note: requires unsafe-eval content security policy.
   *
   * @param csvString A string, which must be in the comma-separated values format.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function csvParse<ParsedRow extends object, Columns extends string>(
    csvString: string,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): DSVParsedArray<ParsedRow>;

  // csvParseRows(...) ========================================================================

  /**
   * Parses the specified string, which must be in the comma-separated values format, returning an array of arrays representing the parsed rows.
   *
   * Unlike csvParse, this method treats the header line as a standard row, and should be used whenever CSV content does not contain a header.
   * Each row is represented as an array rather than an object. Rows may have variable length.
   *
   * If a row conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types.
   * In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the + operator), but better is to specify a row conversion function.
   *
   * Equivalent to `dsvFormat(",").parseRows`.
   *
   * @param csvString A string, which must be in the comma-separated values format.
   */
  export function csvParseRows(csvString: string): string[][];
  /**
   * Parses the specified string, which must be in the comma-separated values format, returning an array of arrays representing the parsed rows.
   *
   * Unlike csvParse, this method treats the header line as a standard row, and should be used whenever CSV content does not contain a header.
   * Each row is represented as an array rather than an object. Rows may have variable length.
   *
   * Equivalent to `dsvFormat(",").parseRows`.
   *
   * @param csvString A string, which must be in the comma-separated values format.
   * @param row A row conversion function which is invoked for each row, being passed an array representing the current row (d), the index (i)
   * starting at zero for the first row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function csvParseRows<ParsedRow extends object>(
    csvString: string,
    row: (rawRow: string[], index: number) => ParsedRow | undefined | null,
  ): ParsedRow[];

  // csvFormat(...) ============================================================================

  /**
   * Formats the specified array of object rows as comma-separated values, returning a string.
   * This operation is the inverse of csvParse. Each row will be separated by a newline (\n),
   * and each column within each row will be separated by the comma-delimiter.
   * Values that contain either the comma-delimiter, a double-quote (") or a newline will be escaped using double-quotes.
   *
   * If columns is not specified, the list of column names that forms the header row is determined by the union of all properties on all objects in rows;
   * the order of columns is nondeterministic.
   *
   * Equivalent to `dsvFormat(",").format`.
   *
   * @param rows Array of object rows.
   * @param columns An array of strings representing the column names.
   */
  export function csvFormat<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

  // csvFormatBody(...) ============================================================================

  /**
   * Equivalent to dsvFormat(",").formatBody.
   *
   * @param rows Array of object rows.
   * @param columns An array of strings representing the column names.
   */
  export function csvFormatBody<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

  // csvFormatRows(...) ========================================================================

  /**
   * Formats the specified array of array of string rows as comma-separated values, returning a string.
   * This operation is the reverse of csvParseRows. Each row will be separated by a newline (\n),
   * and each column within each row will be separated by the comma-delimiter.
   * Values that contain either the comma-delimiter, a double-quote (") or a newline will be escaped using double-quotes.
   *
   * To convert an array of objects to an array of arrays while explicitly specifying the columns, use array.map.
   * If you like, you can also array.concat this result with an array of column names to generate the first row.
   *
   * Equivalent to `dsvFormat(",").formatRows`.
   *
   * @param rows An array of array of string rows.
   */
  export function csvFormatRows(rows: readonly string[][]): string;

  // csvFormatRow(...) ========================================================================

  /**
   * Equivalent to dsvFormat(",").formatRow.
   *
   * @param row An array of strings representing a row.
   */
  export function csvFormatRow(row: readonly string[]): string;

  // csvFormatValue(...) ========================================================================

  /**
   * Equivalent to dsvFormat(",").formatValue.
   *
   * @param value A value.
   */
  export function csvFormatValue(value: string): string;

  // ------------------------------------------------------------------------------------------
  // TSV Parsers and Formatters
  // ------------------------------------------------------------------------------------------

  // tsvParse(...) ============================================================================

  /**
   * Parses the specified string, which must be in the tab-separated values format, returning an array of objects representing the parsed rows.
   *
   * Unlike tsvParseRows, this method requires that the first line of the TSV content contains a tab-separated list of column names;
   * these column names become the attributes on the returned objects.
   *
   * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
   *
   * Equivalent to `dsvFormat("\t").parse`.
   * Note: requires unsafe-eval content security policy.
   *
   * @param tsvString A string, which must be in the tab-separated values format.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function tsvParse<Columns extends string>(tsvString: string): DSVRowArray<Columns>;
  /**
   * Parses the specified string, which must be in the tab-separated values format, returning an array of objects representing the parsed rows.
   *
   * Unlike tsvParseRows, this method requires that the first line of the TSV content contains a tab-separated list of column names;
   * these column names become the attributes on the returned objects.
   *
   * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
   *
   * Equivalent to `dsvFormat("\t").parse`.
   * Note: requires unsafe-eval content security policy.
   *
   * @param tsvString A string, which must be in the tab-separated values format.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function tsvParse<ParsedRow extends object, Columns extends string>(
    tsvString: string,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): DSVParsedArray<ParsedRow>;

  // tsvParseRows(...) ========================================================================

  /**
   * Parses the specified string, which must be in the tab-separated values format, returning an array of arrays representing the parsed rows.
   *
   * Unlike tsvParse, this method treats the header line as a standard row, and should be used whenever TSV content does not contain a header.
   * Each row is represented as an array rather than an object. Rows may have variable length.
   *
   * If a row conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types.
   * In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the + operator), but better is to specify a row conversion function.
   *
   * Equivalent to `dsvFormat("\t").parseRows`.
   *
   * @param tsvString A string, which must be in the tab-separated values format.
   */
  export function tsvParseRows(tsvString: string): string[][];
  /**
   * Parses the specified string, which must be in the tab-separated values format, returning an array of arrays representing the parsed rows.
   *
   * Unlike tsvParse, this method treats the header line as a standard row, and should be used whenever TSV content does not contain a header.
   * Each row is represented as an array rather than an object. Rows may have variable length.
   *
   * Equivalent to `dsvFormat("\t").parseRows`.
   *
   * @param tsvString A string, which must be in the tab-separated values format.
   * @param row A row conversion function which is invoked for each row, being passed an array representing the current row (d), the index (i)
   * starting at zero for the first row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function tsvParseRows<ParsedRow extends object>(
    tsvString: string,
    row: (rawRow: string[], index: number) => ParsedRow | undefined | null,
  ): ParsedRow[];

  // tsvFormat(...) ============================================================================

  /**
   * Formats the specified array of object rows as tab-separated values, returning a string.
   * This operation is the inverse of tsvParse. Each row will be separated by a newline (\n),
   * and each column within each row will be separated by the tab-delimiter.
   * Values that contain either the tab-delimiter, a double-quote (") or a newline will be escaped using double-quotes.
   *
   * If columns is not specified, the list of column names that forms the header row is determined by the union of all properties on all objects in rows;
   * the order of columns is nondeterministic.
   *
   * Equivalent to `dsvFormat("\t").format`.
   *
   * @param rows Array of object rows.
   * @param columns An array of strings representing the column names.
   */
  export function tsvFormat<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

  // tsvFormatBody(...) ============================================================================

  /**
   * Equivalent to dsvFormat("\t").formatBody.
   *
   * @param rows Array of object rows.
   * @param columns An array of strings representing the column names.
   */
  export function tsvFormatBody<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

  // tsvFormatRows(...) ========================================================================

  /**
   * Formats the specified array of array of string rows as tab-separated values, returning a string.
   * This operation is the reverse of tsvParseRows. Each row will be separated by a newline (\n),
   * and each column within each row will be separated by the tab-delimiter.
   * Values that contain either the tab-delimiter, a double-quote (") or a newline will be escaped using double-quotes.
   *
   * To convert an array of objects to an array of arrays while explicitly specifying the columns, use array.map.
   * If you like, you can also array.concat this result with an array of column names to generate the first row.
   *
   * Equivalent to `dsvFormat("\t").formatRows`.
   *
   * @param rows An array of array of string rows.
   */
  export function tsvFormatRows(rows: readonly string[][]): string;

  // tsvFormatRow(...) ========================================================================

  /**
   * Equivalent to dsvFormat("\t").formatRow.
   *
   * @param row An array of strings representing a row.
   */
  export function tsvFormatRow(row: readonly string[]): string;

  // tsvFormatValue(...) ========================================================================

  /**
   * Equivalent to dsvFormat("\t").formatValue.
   *
   * @param value A value.
   */
  export function tsvFormatValue(value: string): string;

  // ------------------------------------------------------------------------------------------
  // DSV Generalized Parsers and Formatters
  // ------------------------------------------------------------------------------------------

  /**
   * A DSV parser and formatter
   */
  export interface DSV {
    /**
     * Parses the specified string, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of objects representing the parsed rows.
     *
     * Unlike dsv.parseRows, this method requires that the first line of the DSV content contains a delimiter-separated list of column names;
     * these column names become the attributes on the returned objects.
     *
     * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
     *
     * If the column names are not unique, only the last value is returned for each name; to access all values, use dsv.parseRows instead.
     *
     * Note: requires unsafe-eval content security policy.
     *
     * @param dsvString A string, which must be in the delimiter-separated values format with the appropriate delimiter.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    parse<Columns extends string>(dsvString: string): DSVRowArray<Columns>;
    /**
     * Parses the specified string, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of objects representing the parsed rows.
     *
     * Unlike dsv.parseRows, this method requires that the first line of the DSV content contains a delimiter-separated list of column names;
     * these column names become the attributes on the returned objects.
     *
     * The returned array also exposes a columns property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary).
     *
     * If the column names are not unique, only the last value is returned for each name; to access all values, use dsv.parseRows instead.
     *
     * Note: requires unsafe-eval content security policy.
     *
     * @param dsvString A string, which must be in the delimiter-separated values format with the appropriate delimiter.
     * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
     * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
     * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
     * In effect, row is similar to applying a map and filter operator to the returned rows.
     */
    parse<ParsedRow extends object, Columns extends string>(
      dsvString: string,
      row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
    ): DSVParsedArray<ParsedRow>;

    /**
     * Parses the specified string, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of arrays representing the parsed rows.
     *
     * Unlike dsv.parse, this method treats the header line as a standard row, and should be used whenever DSV content does not contain a header.
     * Each row is represented as an array rather than an object. Rows may have variable length.
     *
     * If a row conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types.
     * In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the + operator), but better is to specify a row conversion function.
     *
     * @param dsvString A string, which must be in the delimiter-separated values format with the appropriate delimiter.
     */
    parseRows(dsvString: string): string[][];
    /**
     * Parses the specified string, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of arrays representing the parsed rows.
     *
     * Unlike dsv.parse, this method treats the header line as a standard row, and should be used whenever DSV content does not contain a header.
     * Each row is represented as an array rather than an object. Rows may have variable length.
     *
     * @param dsvString A string, which must be in the delimiter-separated values format with the appropriate delimiter.
     * @param row A row conversion function which is invoked for each row, being passed an array representing the current row (d), the index (i)
     * starting at zero for the first row, and the array of column names. If the returned value is null or undefined,
     * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
     * In effect, row is similar to applying a map and filter operator to the returned rows.
     */
    parseRows<ParsedRow extends object>(
      dsvString: string,
      row: (rawRow: string[], index: number) => ParsedRow | undefined | null,
    ): ParsedRow[];

    /**
     * Formats the specified array of object rows as delimiter-separated values, returning a string.
     * This operation is the inverse of dsv.parse. Each row will be separated by a newline (\n),
     * and each column within each row will be separated by the delimiter (such as a comma, ,).
     * Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.
     *
     * If columns is not specified, the list of column names that forms the header row is determined by the union of all properties on all objects in rows;
     * the order of columns is nondeterministic.
     *
     * @param rows Array of object rows.
     * @param columns An array of strings representing the column names.
     */
    format<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

    /**
     * Equivalent to dsv.format, but omits the header row.
     * This is useful, for example, when appending rows to an existing file.
     *
     * @param rows Array of object rows.
     * @param columns An array of strings representing the column names.
     */
    formatBody<T extends object>(rows: readonly T[], columns?: ReadonlyArray<keyof T>): string;

    /**
     * Formats the specified array of array of string rows as delimiter-separated values, returning a string.
     * This operation is the reverse of dsv.parseRows. Each row will be separated by a newline (\n),
     * and each column within each row will be separated by the delimiter (such as a comma, ,).
     * Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.
     *
     * To convert an array of objects to an array of arrays while explicitly specifying the columns, use array.map.
     * If you like, you can also array.concat this result with an array of column names to generate the first row.
     *
     * @param rows An array of array of string rows.
     */
    formatRows(rows: readonly string[][]): string;

    /**
     * Formats a single array row of strings as delimiter-separated values, returning a string.
     * Each column within the row will be separated by the delimiter (such as a comma, ,).
     * Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.
     *
     * @param row An array of strings representing a row.
     */
    formatRow(row: readonly string[]): string;

    /**
     * Format a single value or string as a delimiter-separated value, returning a string.
     * A value that contains either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.
     *
     * @param value A value.
     */
    formatValue(value: string): string;
  }

  /**
   * Constructs a new DSV parser and formatter for the specified delimiter.
   *
   * @param delimiter A delimiter character. The delimiter must be a single character (i.e., a single 16-bit code unit);
   * so, ASCII delimiters are fine, but emoji delimiters are not.
   */
  export function dsvFormat(delimiter: string): DSV;

  /**
   * Infers the types of values on the object and coerces them accordingly, returning the mutated object.
   * This function is intended to be used as a row accessor function in conjunction with dsv.parse and dsv.parseRows.
   *
   * @param object An object (or array) representing a parsed row
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function autoType<ParsedRow extends object | undefined | null, Columns extends string>(
    object: DSVRowString<Columns> | readonly string[],
  ): ParsedRow;
}

declare module 'd3-ease' {
  // Last module patch version validated against: 3.0.1

  // --------------------------------------------------------------------------
  // Easing Functions
  // --------------------------------------------------------------------------

  /**
   * Linear easing; the identity function; linear(t) returns t.
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeLinear(normalizedTime: number): number;

  /**
   * Symmetric quadratic easing; scales quadIn for t in [0, 0.5] and quadOut for t in [0.5, 1]. Also equivalent to poly.exponent(2).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeQuad(normalizedTime: number): number;

  /**
   * Quadratic easing; equivalent to polyIn.exponent(2).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeQuadIn(normalizedTime: number): number;

  /**
   * Reverse quadratic easing; equivalent to 1 - quadIn(1 - t). Also equivalent to polyOut.exponent(2).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeQuadOut(normalizedTime: number): number;

  /**
   * Symmetric quadratic easing; scales quadIn for t in [0, 0.5] and quadOut for t in [0.5, 1]. Also equivalent to poly.exponent(2).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeQuadInOut(normalizedTime: number): number;

  /**
   * Symmetric cubic easing; scales cubicIn for t in [0, 0.5] and cubicOut for t in [0.5, 1]. Also equivalent to poly.exponent(3).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCubic(normalizedTime: number): number;

  /**
   * Cubic easing; equivalent to polyIn.exponent(3).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCubicIn(normalizedTime: number): number;

  /**
   * Reverse cubic easing; equivalent to 1 - cubicIn(1 - t). Also equivalent to polyOut.exponent(3).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCubicOut(normalizedTime: number): number;

  /**
   * Symmetric cubic easing; scales cubicIn for t in [0, 0.5] and cubicOut for t in [0.5, 1]. Also equivalent to poly.exponent(3).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCubicInOut(normalizedTime: number): number;

  /**
   * Polynomial easing function factory
   */
  export interface PolynomialEasingFactory {
    /**
     * Calculate eased time.
     * @param normalizedTime Normalized time typically in the range [0, 1]
     */
    (normalizedTime: number): number;
    /**
     * Returns a new polynomial easing with the specified exponent e.
     * If the exponent is not specified, it defaults to 3, equivalent to cubic.
     *
     * @param e Exponent for polynomial easing.
     */
    exponent(e: number): PolynomialEasingFactory;
  }

  /**
   * Symmetric polynomial easing/easing factory; scales polyIn for t in [0, 0.5] and polyOut for t in [0.5, 1].
   * If the exponent is not specified, it defaults to 3, equivalent to cubic.
   */
  export const easePoly: PolynomialEasingFactory;
  /**
   * Polynomial easing/easing factory; raises t to the specified exponent.
   * If the exponent is not specified, it defaults to 3, equivalent to cubicIn.
   */
  export const easePolyIn: PolynomialEasingFactory;

  /**
   * Reverse polynomial easing/easing factory; equivalent to 1 - polyIn(1 - t).
   * If the exponent is not specified, it defaults to 3, equivalent to cubicOut.
   */
  export const easePolyOut: PolynomialEasingFactory;

  /**
   * Symmetric polynomial easing/easing factory; scales polyIn for t in [0, 0.5] and polyOut for t in [0.5, 1].
   * If the exponent is not specified, it defaults to 3, equivalent to cubic.
   */
  export const easePolyInOut: PolynomialEasingFactory;

  /**
   * Symmetric sinusoidal easing; scales sinIn for t in [0, 0.5] and sinOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeSin(normalizedTime: number): number;

  /**
   * Sinusoidal easing; returns sin(t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeSinIn(normalizedTime: number): number;

  /**
   * Reverse sinusoidal easing; equivalent to 1 - sinIn(1 - t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeSinOut(normalizedTime: number): number;

  /**
   * Symmetric sinusoidal easing; scales sinIn for t in [0, 0.5] and sinOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeSinInOut(normalizedTime: number): number;

  /**
   * Symmetric exponential easing; scales expIn for t in [0, 0.5] and expOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeExp(normalizedTime: number): number;

  /**
   * Exponential easing; raises 2 to the exponent 10 * (t - 1).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeExpIn(normalizedTime: number): number;

  /**
   * Reverse exponential easing; equivalent to 1 - expIn(1 - t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeExpOut(normalizedTime: number): number;

  /**
   * Symmetric exponential easing; scales expIn for t in [0, 0.5] and expOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeExpInOut(normalizedTime: number): number;

  /**
   * Symmetric circular easing; scales circleIn for t in [0, 0.5] and circleOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCircle(normalizedTime: number): number;

  /**
   * Circular easing.
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCircleIn(normalizedTime: number): number;

  /**
   * Reverse circular easing; equivalent to 1 - circleIn(1 - t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCircleOut(normalizedTime: number): number;

  /**
   * Symmetric circular easing; scales circleIn for t in [0, 0.5] and circleOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeCircleInOut(normalizedTime: number): number;

  /**
   * Reverse bounce easing; equivalent to 1 - bounceIn(1 - t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeBounce(normalizedTime: number): number;

  /**
   * Bounce easing, like a rubber ball.
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeBounceIn(normalizedTime: number): number;

  /**
   * Reverse bounce easing; equivalent to 1 - bounceIn(1 - t).
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeBounceOut(normalizedTime: number): number;

  /**
   * Symmetric bounce easing; scales bounceIn for t in [0, 0.5] and bounceOut for t in [0.5, 1].
   *
   * @param normalizedTime Normalized time typically in the range [0, 1]
   */
  export function easeBounceInOut(normalizedTime: number): number;

  /**
   * Anticipatory easing function factory
   */
  export interface BackEasingFactory {
    /**
     * Calculate eased time.
     * @param normalizedTime Normalized time typically in the range [0, 1]
     */
    (normalizedTime: number): number;
    /**
     * Returns a new back easing with the specified overshoot s.
     * The degree of overshoot is configurable; if not specified, it defaults to 1.70158.
     *
     * @param s Overshoot parameter
     */
    overshoot(s: number): BackEasingFactory;
  }

  /**
   * Symmetric anticipatory easing; scales backIn for t in [0, 0.5] and backOut for t in [0.5, 1].
   * The degree of overshoot is configurable; it not specified, it defaults to 1.70158.
   */
  export const easeBack: BackEasingFactory;

  /**
   * Anticipatory easing, like a dancer bending their knees before jumping off the floor.
   * The degree of overshoot is configurable; it not specified, it defaults to 1.70158.
   */
  export const easeBackIn: BackEasingFactory;

  /**
   * Reverse anticipatory easing; equivalent to 1 - backIn(1 - t).
   * The degree of overshoot is configurable; it not specified, it defaults to 1.70158.
   */
  export const easeBackOut: BackEasingFactory;

  /**
   * Symmetric anticipatory easing; scales backIn for t in [0, 0.5] and backOut for t in [0.5, 1].
   * The degree of overshoot is configurable; it not specified, it defaults to 1.70158.
   */
  export const easeBackInOut: BackEasingFactory;

  /**
   * Elastic easing function factory
   */
  export interface ElasticEasingFactory {
    /**
     * Calculate eased time.
     * @param normalizedTime Normalized time typically in the range [0, 1]
     */
    (normalizedTime: number): number;
    /**
     * Returns a new elastic easing with the specified amplitude a.
     * Defaults to 1,if not specified.
     *
     * @param a Amplitude for elastic easing.
     */
    amplitude(a: number): ElasticEasingFactory;
    /**
     * Returns a new elastic easing with the specified amplitude a.
     * Defaults to 0.3,if not specified.
     *
     * @param p Period for elastic easing.
     */
    period(p: number): ElasticEasingFactory;
  }

  /**
   * Reverse elastic easing; equivalent to 1 - elasticIn(1 - t).
   * The amplitude and period of the oscillation are configurable;
   * if not specified, they default to 1 and 0.3, respectively.
   */
  export const easeElastic: ElasticEasingFactory;

  /**
   * Elastic easing, like a rubber band.
   * The amplitude and period of the oscillation are configurable;
   * if not specified, they default to 1 and 0.3, respectively.
   */
  export const easeElasticIn: ElasticEasingFactory;

  /**
   * Reverse elastic easing; equivalent to 1 - elasticIn(1 - t).
   * The amplitude and period of the oscillation are configurable;
   * if not specified, they default to 1 and 0.3, respectively.
   */
  export const easeElasticOut: ElasticEasingFactory;

  /**
   * Symmetric elastic easing; scales elasticIn for t in [0, 0.5] and elasticOut for t in [0.5, 1].
   * The amplitude and period of the oscillation are configurable;
   * if not specified, they default to 1 and 0.3, respectively.
   */
  export const easeElasticInOut: ElasticEasingFactory;
}

declare module 'd3-fetch' {
  // Last module patch version validated against: 3.0.1

  import { DSVParsedArray, DSVRowArray, DSVRowString } from 'd3-dsv';

  /**
   * Fetches the binary file at the specified input URL and returns it as a Promise of a Blob.
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function blob(url: string, init?: RequestInit): Promise<Blob>;

  /**
   * Fetches the binary file at the specified input URL and returns it as a Promise of an ArrayBuffer.
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function buffer(url: string, init?: RequestInit): Promise<ArrayBuffer>;

  /**
   * Fetches the CSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows. The values of the properties of the parsed row
   * objects are represented as strings.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * The generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function csv<Columns extends string>(url: string, init?: RequestInit): Promise<DSVRowArray<Columns>>;
  /**
   * Fetches the CSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.csvParse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.csvParse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function csv<ParsedRow extends object, Columns extends string = string>(
    url: string,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;
  /**
   * Fetches the CSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * The init object is passed along to the underlying call to fetch.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.csvParse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param init An request initialization object.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.csvParse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function csv<ParsedRow extends object, Columns extends string = string>(
    url: string,
    init: RequestInit,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;

  /**
   * Fetches the DSV file with the specified delimiter character at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows. The values of the properties of the parsed row
   * objects are represented as strings.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * The generic parameter describes the column names as a union of string literal types.
   *
   * @param delimiter The delimiter character used in the DSV file to be fetched.
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function dsv<Columns extends string>(
    delimiter: string,
    url: string,
    init?: RequestInit,
  ): Promise<DSVRowArray<Columns>>;
  /**
   * Fetches the DSV file with the specified delimiter character at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.parse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param delimiter The delimiter character used in the DSV file to be fetched.
   * @param url A valid URL string.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function dsv<ParsedRow extends object, Columns extends string = string>(
    delimiter: string,
    url: string,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;
  /**
   * Fetches the DSV file with the specified delimiter character at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * The init object is passed along to the underlying call to fetch.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.parse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param delimiter The delimiter character used in the DSV file to be fetched.
   * @param url A valid URL string.
   * @param init An request initialization object.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.parse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function dsv<ParsedRow extends object, Columns extends string = string>(
    delimiter: string,
    url: string,
    init: RequestInit,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;

  /**
   * Fetches the file at the specified input URL as text, parses it as HTML and returns a Promise of an HTML DOM Document.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function html(url: string, init?: RequestInit): Promise<Document>;

  /**
   * Fetches the image at the specified input URL and returns a promise of an HTML image element.
   *
   * If init is specified, sets any additional properties on the image before loading.
   *
   * @param url A valid URL string.
   * @param init An optional object of image properties to set.
   */
  export function image(url: string, init?: Partial<HTMLImageElement>): Promise<HTMLImageElement>;

  /**
   * Fetches the json file at the specified input URL and returns it as a Promise of a parsed JSON object.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * If the server returns a status code of [204 No Content](https://developer.mozilla.org/docs/Web/HTTP/Status/204)
   * or [205 Reset Content](https://developer.mozilla.org/docs/Web/HTTP/Status/205), the promise resolves to `undefined`.
   *
   * The generic parameter describes the type of the object parsed from the returned JSON.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function json<ParsedJSONObject extends any>(
    url: string,
    init?: RequestInit,
  ): Promise<ParsedJSONObject | undefined>;

  /**
   * Fetches the file at the specified input URL as text, parses it as SVG and returns a Promise of an SVG Document.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function svg(url: string, init?: RequestInit): Promise<Document>;

  /**
   * Fetches the text file at the specified input URL and returns it as a Promise of a string.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function text(url: string, init?: RequestInit): Promise<string>;

  /**
   * Fetches the TSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * The generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function tsv<Columns extends string>(url: string, init?: RequestInit): Promise<DSVRowArray<Columns>>;
  /**
   * Fetches the TSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows. The values of the properties of the parsed row
   * objects are represented as strings.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.tsvParse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.tsvParse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function tsv<ParsedRow extends object, Columns extends string = string>(
    url: string,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;
  /**
   * Fetches the TSV file at the specified input URL and returns
   * a promise of an array of objects representing the parsed rows.
   *
   * The init object is passed along to the underlying call to fetch.
   *
   * The specified row conversion function is used to map and filter row objects to a more-specific representation;
   * see dsv.tsvParse for details.
   *
   * The first generic parameter describes the type of the object representation of a parsed row.
   * The second generic parameter describes the column names as a union of string literal types.
   *
   * @param url A valid URL string.
   * @param init An request initialization object.
   * @param row A row conversion function which is invoked for each row, being passed an object representing the current row (d),
   * the index (i) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined,
   * the row is skipped and will be omitted from the array returned by dsv.tsvParse; otherwise, the returned value defines the corresponding row object.
   * In effect, row is similar to applying a map and filter operator to the returned rows.
   */
  export function tsv<ParsedRow extends object, Columns extends string = string>(
    url: string,
    init: RequestInit,
    row: (rawRow: DSVRowString<Columns>, index: number, columns: Columns[]) => ParsedRow | undefined | null,
  ): Promise<DSVParsedArray<ParsedRow>>;

  /**
   * Fetches the file at the specified input URL as text, parses it as XML and returns a Promise of an XML Document.
   *
   * If init is specified, it is passed along to the underlying call to fetch.
   *
   * @param url A valid URL string.
   * @param init An optional request initialization object.
   */
  export function xml(url: string, init?: RequestInit): Promise<XMLDocument>;
}

declare module 'd3-force' {
  // Last module patch version validated against: 3.0.0

  // -----------------------------------------------------------------------
  // Force Simulation
  // -----------------------------------------------------------------------

  /**
   * The base data structure for the datum of a Simulation Node.
   * The optional properties contained in this data structure are internally assigned
   * by the Simulation upon (re-)initialization.
   *
   * When defining a data type to use for node data, it should be an extension of this interface
   * and respect the already "earmarked" properties used by the simulation.
   *
   * IMPORTANT: Prior to initialization, the following properties are optional: index, x, y, vx, and vy.
   * After initialization they will be defined. The optional properties fx and fy are ONLY defined,
   * if the node's position has been fixed.
   */
  export interface SimulationNodeDatum {
    /**
     * Node’s zero-based index into nodes array. This property is set during the initialization process of a simulation.
     */
    index?: number | undefined;
    /**
     * Node’s current x-position
     */
    x?: number | undefined;
    /**
     * Node’s current y-position
     */
    y?: number | undefined;
    /**
     * Node’s current x-velocity
     */
    vx?: number | undefined;
    /**
     * Node’s current y-velocity
     */
    vy?: number | undefined;
    /**
     * Node’s fixed x-position (if position was fixed)
     */
    fx?: number | null | undefined;
    /**
     * Node’s fixed y-position (if position was fixed)
     */
    fy?: number | null | undefined;
  }

  /**
   * The base data structure for the datum of a Simulation Link, as used by ForceLink.
   * The optional properties contained in this data structure are internally assigned
   * by when initializing with ForceLink.links(...)
   *
   * IMPORTANT: The source and target properties may be internally mutated in type during the
   * ForceLink initialization process (possibly being changed from a node index in the nodes array,
   * or a node id string to the simulation node object which was mapped in using the current
   * ForceLink.id(...) accessor function.)
   */
  export interface SimulationLinkDatum<NodeDatum extends SimulationNodeDatum> {
    /**
     * Link’s source node.
     * For convenience, a link’s source and target properties may be initialized using numeric or string identifiers rather than object references; see link.id.
     * When the link force is initialized (or re-initialized, as when the nodes or links change), any link.source or link.target property which is not an object
     * is replaced by an object reference to the corresponding node with the given identifier.
     * After initialization, the source property represents the source node object.
     */
    source: NodeDatum | string | number;
    /**
     * Link’s source link
     * For convenience, a link’s source and target properties may be initialized using numeric or string identifiers rather than object references; see link.id.
     * When the link force is initialized (or re-initialized, as when the nodes or links change), any link.source or link.target property which is not an object
     * is replaced by an object reference to the corresponding node with the given identifier.
     * After initialization, the target property represents the target node object.
     */
    target: NodeDatum | string | number;
    /**
     * The zero-based index into the links array. Internally generated when calling ForceLink.links(...)
     */
    index?: number | undefined;
  }

  /**
   * A Force Simulation
   *
   * The first generic refers to the type of the datum associated with a node in the simulation.
   * The second generic refers to the type of the datum associated with a link in the simulation, if applicable.
   */
  export interface Simulation<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum> | undefined,
  > {
    /**
     * Restart the simulation’s internal timer and return the simulation.
     * In conjunction with simulation.alphaTarget or simulation.alpha, this method can be used to “reheat” the simulation during interaction,
     * such as when dragging a node, or to resume the simulation after temporarily pausing it with simulation.stop.
     */
    restart(): this;

    /**
     * Stop the simulation’s internal timer, if it is running, and return the simulation. If the timer is already stopped, this method does nothing.
     * This method is useful for running the simulation manually; see simulation.tick.
     */
    stop(): this;

    /**
     * Manually steps the simulation by the specified number of *iterations*, and returns the simulation. If *iterations* is not specified, it defaults to 1 (single step).
     *
     * For each iteration, it increments the current alpha by (alphaTarget - alpha) × alphaDecay; then invokes each registered force, passing the new alpha;
     * then decrements each node’s velocity by velocity × velocityDecay; lastly increments each node’s position by velocity.
     *
     * This method does not dispatch events; events are only dispatched by the internal timer when the simulation is started automatically upon
     * creation or by calling simulation.restart. The natural number of ticks when the simulation is started is
     * ⌈log(alphaMin) / log(1 - alphaDecay)⌉; by default, this is 300.
     */
    tick(iterations?: number): this;

    /**
     * Returns the simulation’s array of nodes as specified to the constructor.
     */
    nodes(): NodeDatum[];
    /**
     * Set the simulation’s nodes to the specified array of objects, initialize their positions and velocities if necessary,
     * and then re-initialize any bound forces; Returns the simulation.
     *
     * Each node must be an object. The following properties are assigned by the simulation:
     * - index (the node’s zero-based index into nodes)
     * - x (the node’s current x-position)
     * - y (the node’s current y-position)
     * - vx (the node’s current x-velocity)
     * - vy (the node’s current y-velocity)
     *
     * The position [x,y] and velocity [vx,vy] may be subsequently modified by forces and by the simulation.
     * If either vx or vy is NaN, the velocity is initialized to [0,0]. If either x or y is NaN, the position is initialized in a phyllotaxis arrangement,
     * so chosen to ensure a deterministic, uniform distribution.
     *
     * To fix a node in a given position, you may specify two additional properties:
     * - fx (the node’s fixed x-position)
     * - fy (the node’s fixed y-position)
     *
     * At the end of each tick, after the application of any forces, a node with a defined node.fx has node.x reset to this value and node.vx set to zero;
     * likewise, a node with a defined node.fy has node.y reset to this value and node.vy set to zero.
     * To unfix a node that was previously fixed, set node.fx and node.fy to null, or delete these properties.
     *
     * If the specified array of nodes is modified, such as when nodes are added to or removed from the simulation,
     * this method must be called again with the new (or changed) array to notify the simulation and bound forces of the change;
     * the simulation does not make a defensive copy of the specified array.
     */
    nodes(nodesData: NodeDatum[]): this;

    /**
     * Return the current alpha of the simulation, which defaults to 1.
     *
     * alpha is roughly analogous to temperature in simulated annealing.
     * It decreases over time as the simulation “cools down”.
     * When alpha reaches alphaMin, the simulation stops; see simulation.restart.
     */
    alpha(): number;
    /**
     * Set the current alpha to the specified number in the range [0,1] and return this simulation.
     * The default is 1.
     *
     * alpha is roughly analogous to temperature in simulated annealing.
     * It decreases over time as the simulation “cools down”.
     * When alpha reaches alphaMin, the simulation stops; see simulation.restart.
     *
     * @param alpha Current alpha of simulation.
     */
    alpha(alpha: number): this;

    /**
     * Return the current minimum alpha value, which defaults to 0.001.
     */
    alphaMin(): number;
    /**
     * Set the minimum alpha to the specified number in the range [0,1] and return this simulation.
     * The default is 0.001. The simulation’s internal timer stops when the current alpha is less than the minimum alpha.
     * The default alpha decay rate of ~0.0228 corresponds to 300 iterations.
     *
     * @param min Minimum alpha of simulation.
     */
    alphaMin(min: number): this;

    /**
     * Return the current alpha decay rate, which defaults to 0.0228… = 1 - pow(0.001, 1 / 300) where 0.001 is the default minimum alpha.
     */
    alphaDecay(): number;
    /**
     * Set the alpha decay rate to the specified number in the range [0,1] and return this simulation.
     * The default is 0.0228… = 1 - pow(0.001, 1 / 300) where 0.001 is the default minimum alpha.
     *
     * The alpha decay rate determines how quickly the current alpha interpolates towards the desired target alpha;
     * since the default target alpha is zero, by default this controls how quickly the simulation cools.
     * Higher decay rates cause the simulation to stabilize more quickly, but risk getting stuck in a local minimum;
     * lower values cause the simulation to take longer to run, but typically converge on a better layout.
     * To have the simulation run forever at the current alpha, set the decay rate to zero;
     * alternatively, set a target alpha greater than the minimum alpha.
     *
     * @param decay Alpha decay rate.
     */
    alphaDecay(decay: number): this;

    /**
     * Returns the current target alpha value, which defaults to 0.
     */
    alphaTarget(): number;
    /**
     * Set the current target alpha to the specified number in the range [0,1] and return this simulation.
     * The default is 0.
     *
     * @param target Alpha target value.
     */
    alphaTarget(target: number): this;

    /**
     * Return the current target alpha value, which defaults to 0.4.
     */
    velocityDecay(): number;
    /**
     * Set the velocity decay factor to the specified number in the range [0,1] and return this simulation.
     * The default is 0.4.
     *
     * The decay factor is akin to atmospheric friction; after the application of any forces during a tick,
     * each node’s velocity is multiplied by 1 - decay. As with lowering the alpha decay rate,
     * less velocity decay may converge on a better solution, but risks numerical instabilities and oscillation.
     *
     * @param decay Velocity Decay.
     */
    velocityDecay(decay: number): this;

    /**
     * Return the force with the specified name, or undefined if there is no such force.
     * (By default, new simulations have no forces.)
     *
     * Given that it is in general not known, what type of force has been registered under
     * a specified name, use the generic to cast the result to the appropriate type, if known.
     *
     * @param name Name of the registered force.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    force<F extends Force<NodeDatum, LinkDatum>>(name: string): F | undefined;
    /**
     * If force is specified, assigns the force for the specified name and returns this simulation.
     * To remove the force with the given name, pass null as the force.
     */
    force(name: string, force: null | Force<NodeDatum, LinkDatum>): this;

    /**
     * Return the node closest to the position [x,y] with the given search radius.
     * If radius is not specified, it defaults to infinity.
     * If there is no node within the search area, returns undefined.
     *
     * @param x x-coordinate
     * @param y y-coordinate
     * @param radius Optional search radius. Defaults to infinity.
     */
    find(x: number, y: number, radius?: number): NodeDatum | undefined;

    /**
     * Returns this simulation’s current random source which defaults to a fixed-seed linear congruential generator.
     * See also random.source.
     */
    randomSource(): () => number;
    /**
     * Sets the function used to generate random numbers; this should be a function that returns a number between 0 (inclusive) and 1 (exclusive).
     *
     * @param source The function used to generate random numbers.
     */
    randomSource(source: () => number): this;

    /**
     * Return the first currently-assigned listener matching the specified typenames, if any.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace. Each typename is a type,
     * optionally followed by a period (.) and a name, such as "tick.foo" and "tick.bar"; the name allows multiple listeners to be registered for the same type.
     * The type must be one of the following: "tick" (after each tick of the simulation’s internal timer) or
     * "end" (after the simulation’s timer stops when alpha < alphaMin).
     */
    on(typenames: 'tick' | 'end' | string): ((this: Simulation<NodeDatum, LinkDatum>) => void) | undefined;
    /**
     * Sets the event listener for the specified typenames and returns this simulation.
     * If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added.
     * If listener is null, removes the current event listeners for the specified typenames, if any.
     * When a specified event is dispatched, each listener will be invoked with the this context as the simulation.
     */
    on(typenames: 'tick' | 'end' | string, listener: null | ((this: this) => void)): this;
  }

  /**
   * Create a new simulation with the specified array of nodes and no forces.
   * If nodes is not specified, it defaults to the empty array.
   * The simulator starts automatically; use simulation.on to listen for tick events as the simulation runs.
   * If you wish to run the simulation manually instead, call simulation.stop, and then call simulation.tick as desired.
   *
   * Use this signature, when creating a simulation WITHOUT link force(s).
   *
   * The generic refers to the type of the data for a node.
   *
   * @param nodesData Optional array of nodes data, defaults to empty array.
   */
  export function forceSimulation<NodeDatum extends SimulationNodeDatum>(
    nodesData?: NodeDatum[],
  ): Simulation<NodeDatum, undefined>;
  /**
   * Create a new simulation with the specified array of nodes and no forces.
   * If nodes is not specified, it defaults to the empty array.
   * The simulator starts automatically; use simulation.on to listen for tick events as the simulation runs.
   * If you wish to run the simulation manually instead, call simulation.stop, and then call simulation.tick as desired.
   *
   * Use this signature, when creating a simulation WITH link force(s).
   *
   * The first generic refers to the type of data for a node.
   * The second generic refers to the type of data for a link.
   *
   * @param nodesData Optional array of nodes data, defaults to empty array.
   */
  export function forceSimulation<
    NodeDatum extends SimulationNodeDatum,
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    LinkDatum extends SimulationLinkDatum<NodeDatum>,
  >(nodesData?: NodeDatum[]): Simulation<NodeDatum, LinkDatum>;

  // ----------------------------------------------------------------------
  // Forces
  // ----------------------------------------------------------------------

  /**
   * A force is simply a function that modifies nodes’ positions or velocities; in this context, a force can apply a classical physical force such as electrical charge or gravity,
   * or it can resolve a geometric constraint, such as keeping nodes within a bounding box or keeping linked nodes a fixed distance apart.
   *
   * Forces typically read the node’s current position [x,y] and then add to (or subtract from) the node’s velocity [vx,vy].
   * However, forces may also “peek ahead” to the anticipated next position of the node, [x + vx,y + vy]; this is necessary for resolving geometric constraints through iterative relaxation.
   * Forces may also modify the position directly, which is sometimes useful to avoid adding energy to the simulation, such as when recentering the simulation in the viewport.
   *
   * Forces may optionally implement force.initialize to receive the simulation’s array of nodes.
   */
  export interface Force<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum> | undefined,
  > {
    /**
     * Apply this force, optionally observing the specified alpha.
     * Typically, the force is applied to the array of nodes previously passed to force.initialize,
     * however, some forces may apply to a subset of nodes, or behave differently.
     * For example, d3.forceLink applies to the source and target of each link.
     */
    (alpha: number): void;
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize?(nodes: NodeDatum[], random: () => number): void;
  }

  // Centering ------------------------------------------------------------

  /**
   * The centering force translates nodes uniformly so that the mean position of all nodes
   * (the center of mass if all nodes have equal weight) is at the given position [x,y].
   * This force modifies the positions of nodes on each application; it does not modify velocities,
   * as doing so would typically cause the nodes to overshoot and oscillate around the desired center.
   * This force helps keeps nodes in the center of the viewport, and unlike the positioning force,
   * it does not distort their relative positions.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceCenter<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     * Return the current x-coordinate of the centering position, which defaults to zero.
     */
    x(): number;
    /**
     * Set the x-coordinate of the centering position.
     *
     * @param x x-coordinate.
     */
    x(x: number): this;

    /**
     * Return the current y-coordinate of the centering position, which defaults to zero.
     */
    y(): number;
    /**
     * Set the y-coordinate of the centering position.
     *
     * @param y y-coordinate.
     */
    y(y: number): this;

    /**
     * Returns the force’s current strength, which defaults to 1.
     */
    strength(): number;

    /**
     * Sets the centering force’s strength.
     * A reduced strength of e.g. 0.05 softens the movements on interactive graphs in which new nodes enter or exit the graph.
     * @param strength The centering force's strength.
     */
    strength(strength: number): this;
  }

  /**
   * Create a new centering force with the specified x- and y- coordinates.
   * If x and y are not specified, they default to [0,0].
   *
   * The centering force translates nodes uniformly so that the mean position of all nodes
   * (the center of mass if all nodes have equal weight) is at the given position [x,y].
   * This force modifies the positions of nodes on each application; it does not modify velocities,
   * as doing so would typically cause the nodes to overshoot and oscillate around the desired center.
   * This force helps keeps nodes in the center of the viewport, and unlike the positioning force,
   * it does not distort their relative positions.
   *
   * The generic refers to the type of data for a node.
   *
   * @param x An optional x-coordinate for the centering position, defaults to 0.
   * @param y An optional y-coordinate for the centering position, defaults to 0.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function forceCenter<NodeDatum extends SimulationNodeDatum>(x?: number, y?: number): ForceCenter<NodeDatum>;

  // Collision ------------------------------------------------------------

  /**
   * The collision force treats nodes as circles with a given radius, rather than points, and prevents nodes from overlapping.
   * More formally, two nodes a and b are separated so that the distance between a and b is at least radius(a) + radius(b).
   * To reduce jitter, this is by default a “soft” constraint with a configurable strength and iteration count.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceCollide<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     * Returns the current radius accessor function.
     */
    radius(): (node: NodeDatum, i: number, nodes: NodeDatum[]) => number;
    /**
     * Sets the radius accessor to the specified number or function, re-evaluates the radius accessor for each node, and returns this force.
     * The radius accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the radius of each node is only recomputed when the
     * force is initialized or when this method is called with a new radius, and not on every application of the force.
     */
    radius(radius: number | ((node: NodeDatum, i: number, nodes: NodeDatum[]) => number)): this;

    /**
     * Return the current strength, which defaults to 1.
     */
    strength(): number;
    /**
     * Set the force strength to the specified number in the range [0,1] and return this force.
     * The default strength is 1.
     *
     * Overlapping nodes are resolved through iterative relaxation.
     * For each node, the other nodes that are anticipated to overlap at the next tick (using the anticipated positions [x + vx,y + vy]) are determined;
     * the node’s velocity is then modified to push the node out of each overlapping node.
     * The change in velocity is dampened by the force’s strength such that the resolution of simultaneous overlaps can be blended together to find a stable solution.
     *
     * @param strength Strength.
     */
    strength(strength: number): this;

    /**
     * Return the current iteration count which defaults to 1.
     */
    iterations(): number;
    /**
     * Sets the number of iterations per application to the specified number and return this force.
     *
     * Increasing the number of iterations greatly increases the rigidity of the constraint and avoids partial overlap of nodes,
     * but also increases the runtime cost to evaluate the force.
     *
     * @param iterations Number of iterations.
     */
    iterations(iterations: number): this;
  }

  /**
   * Creates a new circle collision force with the specified radius.
   * If radius is not specified, it defaults to the constant one for all nodes.
   */
  export function forceCollide<NodeDatum extends SimulationNodeDatum>(
    radius?: number | ((node: NodeDatum, i: number, nodes: NodeDatum[]) => number),
  ): ForceCollide<NodeDatum>;

  // Link ----------------------------------------------------------------

  /**
   * The link force pushes linked nodes together or apart according to the desired link distance.
   * The strength of the force is proportional to the difference between the linked nodes’ distance and the target distance, similar to a spring force.
   *
   * The first generic refers to the type of data for a node.
   * The second generic refers to the type of data for a link.
   */
  export interface ForceLink<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum>,
  > extends Force<NodeDatum, LinkDatum> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     * Return the current array of links, which defaults to the empty array.
     */
    links(): LinkDatum[];
    /**
     * Set the array of links associated with this force, recompute the distance and strength parameters for each link, and return this force.
     *
     * Each link is an object with the following properties:
     * * source - the link’s source node; see simulation.nodes
     * * target - the link’s target node; see simulation.nodes
     * * index - the zero-based index into links, assigned by this method
     *
     * For convenience, a link’s source and target properties may be initialized using numeric or string identifiers rather than object references; see link.id.
     * When the link force is initialized (or re-initialized, as when the nodes or links change), any link.source or link.target property which is not an object
     * is replaced by an object reference to the corresponding node with the given identifier.
     * If the specified array of links is modified, such as when links are added to or removed from the simulation,
     * this method must be called again with the new (or changed) array to notify the force of the change;
     * the force does not make a defensive copy of the specified array.
     *
     * @param links An array of link data.
     */
    links(links: LinkDatum[]): this;

    /**
     * Return the current node id accessor, which defaults to the numeric node.index.
     */
    id(): (node: NodeDatum, i: number, nodesData: NodeDatum[]) => string | number;
    /**
     * Set the node id accessor to the specified function and return this force.
     *
     * The default id accessor allows each link’s source and target to be specified as a zero-based index
     * into the nodes array.
     *
     * The id accessor is invoked for each node whenever the force is initialized,
     * as when the nodes or links change, being passed the node, the zero-based index of the node in the node array, and the node array.
     *
     * @param id A node id accessor function which is invoked for each node in the simulation,
     * being passed the node, the zero-based index of the node in the node array, and the node array. It returns a string or number to represent the node id which can be used
     * for matching link source and link target strings during the ForceLink initialization.
     */
    id(id: (node: NodeDatum, i: number, nodesData: NodeDatum[]) => string | number): this;

    /**
     * Return the current distance accessor, which defaults to implying a default distance of 30.
     */
    distance(): (link: LinkDatum, i: number, links: LinkDatum[]) => number;
    /**
     * Sets the distance accessor to the specified number or function, re-evaluates the distance accessor for each link, and returns this force.
     * The distance accessor is invoked for each link, being passed the link and its zero-based index.
     * The resulting number is then stored internally, such that the distance of each link is only recomputed when the
     * force is initialized or when this method is called with a new distance, and not on every application of the force.
     */
    distance(distance: number | ((link: LinkDatum, i: number, links: LinkDatum[]) => number)): this;

    /**
     * Return the current strength accessor.
     * For details regarding the default behavior see: {@link https://github.com/d3/d3-force#link_strength}
     */
    strength(): (link: LinkDatum, i: number, links: LinkDatum[]) => number;
    /**
     * Sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each link, and returns this force.
     * The strength accessor is invoked for each link, being passed the link and its zero-based index.
     * The resulting number is then stored internally, such that the strength of each link is only recomputed when the
     * force is initialized or when this method is called with a new strength, and not on every application of the force.
     */
    strength(strength: number | ((link: LinkDatum, i: number, links: LinkDatum[]) => number)): this;

    /**
     * Return the current iteration count which defaults to 1.
     */
    iterations(): number;
    /**
     * Sets the number of iterations per application to the specified number and return this force.
     *
     * Increasing the number of iterations greatly increases the rigidity of the constraint and is useful for complex structures such as lattices,
     * but also increases the runtime cost to evaluate the force.
     *
     * @param iterations Number of iterations.
     */
    iterations(iterations: number): this;
  }

  /**
   * Creates a new link force with the specified links and default parameters.
   * If links is not specified, it defaults to the empty array.
   */
  export function forceLink<NodeDatum extends SimulationNodeDatum, LinksDatum extends SimulationLinkDatum<NodeDatum>>(
    links?: LinksDatum[],
  ): ForceLink<NodeDatum, LinksDatum>;

  // Many Body ----------------------------------------------------------------

  /**
   * The many-body (or n-body) force applies mutually amongst all nodes. It can be used to simulate gravity (attraction) if the strength is positive,
   * or electrostatic charge (repulsion) if the strength is negative. This implementation uses quadtrees and the Barnes–Hut approximation to greatly
   * improve performance; the accuracy can be customized using the theta parameter.
   *
   * Unlike links, which only affect two linked nodes, the charge force is global: every node affects every other node, even if they are on disconnected subgraphs.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceManyBody<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     * Return the current strength accessor.
     *
     * For details regarding the default behavior see: {@link https://github.com/d3/d3-force#manyBody_strength}
     */
    strength(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force.
     * A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
     * The strength accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the strength of each node is only recomputed when the
     * force is initialized or when this method is called with a new strength, and not on every application of the force.
     */
    strength(strength: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current value of the Barnes–Hut approximation criterion , which defaults to 0.9
     */
    theta(): number;
    /**
     * Set the Barnes–Hut approximation criterion to the specified number and returns this force.
     *
     * To accelerate computation, this force implements the Barnes–Hut approximation which takes O(n log n) per application
     * where n is the number of nodes. For each application, a quadtree stores the current node positions;
     * then for each node, the combined force of all other nodes on the given node is computed.
     * For a cluster of nodes that is far away, the charge force can be approximated by treating the cluster as a single, larger node.
     * The theta parameter determines the accuracy of the approximation:
     * if the ratio w / l of the width w of the quadtree cell to the distance l from the node to the cell’s center of mass is less than theta,
     * all nodes in the given cell are treated as a single node rather than individually.
     *
     * The default value is 0.9.
     *
     * @param theta Value for the theta parameter.
     */
    theta(theta: number): this;

    /**
     * Returns the current minimum distance over which this force is considered, which defaults to 1.
     */
    distanceMin(): number;
    /**
     * Sets the minimum distance between nodes over which this force is considered.
     *
     * A minimum distance establishes an upper bound on the strength of the force between two nearby nodes, avoiding instability.
     * In particular, it avoids an infinitely-strong force if two nodes are exactly coincident; in this case, the direction of the force is random.
     *
     * The default value is 1.
     *
     * @param distance The minimum distance between nodes over which this force is considered.
     */
    distanceMin(distance: number): this;

    /**
     * Returns the current maximum distance over which this force is considered, which defaults to infinity.
     */
    distanceMax(): number;
    /**
     * Sets the maximum distance between nodes over which this force is considered.
     *
     * Specifying a finite maximum distance improves performance and produces a more localized layout.
     *
     * The default value is infinity.
     *
     * @param distance The maximum distance between nodes over which this force is considered.
     */
    distanceMax(distance: number): this;
  }

  /**
   * Creates a new many-body force with the default parameters.
   *
   * The many-body (or n-body) force applies mutually amongst all nodes. It can be used to simulate gravity (attraction) if the strength is positive,
   * or electrostatic charge (repulsion) if the strength is negative. This implementation uses quadtrees and the Barnes–Hut approximation to greatly
   * improve performance; the accuracy can be customized using the theta parameter.
   *
   * Unlike links, which only affect two linked nodes, the charge force is global: every node affects every other node, even if they are on disconnected subgraphs.
   *
   * The generic refers to the type of data for a node.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function forceManyBody<NodeDatum extends SimulationNodeDatum>(): ForceManyBody<NodeDatum>;

  // Positioning ----------------------------------------------------------------

  /**
   * The x-positioning force pushes nodes towards a desired position along the given dimension with a configurable strength.
   * The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position.
   * While this force can be used to position individual nodes, it is intended primarily for global forces that apply to all (or most) nodes.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceX<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     *  Returns the current strength accessor, which defaults to a constant strength for all nodes of 0.1.
     */
    strength(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force.
     * The strength determines how much to increment the node’s x-velocity: (x - node.x) × strength.
     * For example, a value of 0.1 indicates that the node should move a tenth of the way from its current x-position to the target x-position with each application.
     * Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints.
     * A value outside the range [0,1] is not recommended.
     * The strength accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the strength of each node is only recomputed when the
     * force is initialized or when this method is called with a new strength, and not on every application of the force.
     */
    strength(strength: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current x-accessor, which defaults to a function returning 0 for all nodes.
     */
    x(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the x-coordinate accessor to the specified number or function, re-evaluates the x-accessor for each node, and returns this force.
     * The x-accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the target x-coordinate of each node is only recomputed
     * when the force is initialized or when this method is called with a new x, and not on every application of the force.
     */
    x(x: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;
  }

  /**
   * Creates a new positioning force along the x-axis towards the given position x.
   * If x is not specified, it defaults to 0.
   */
  export function forceX<NodeDatum extends SimulationNodeDatum>(
    x?: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number),
  ): ForceX<NodeDatum>;

  /**
   * The y-positioning force pushes nodes towards a desired position along the given dimension with a configurable strength.
   * The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position.
   * While this force can be used to position individual nodes, it is intended primarily for global forces that apply to all (or most) nodes.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceY<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Supplies the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     *  Returns the current strength accessor, which defaults to a constant strength for all nodes of 0.1.
     */
    strength(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force.
     * The strength determines how much to increment the node’s y-velocity: (y - node.y) × strength.
     * For example, a value of 0.1 indicates that the node should move a tenth of the way from its current y-position to the target y-position with each application.
     * Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints.
     * A value outside the range [0,1] is not recommended.
     * The strength accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the strength of each node is only recomputed when the
     * force is initialized or when this method is called with a new strength, and not on every application of the force.
     */
    strength(strength: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current y-accessor, which defaults to a function returning 0 for all nodes.
     */
    y(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the y-coordinate accessor to the specified number or function, re-evaluates the y-accessor for each node, and returns this force.
     * The y-accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the target y-coordinate of each node is only recomputed
     * when the force is initialized or when this method is called with a new y, and not on every application of the force.
     */
    y(y: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;
  }

  /**
   * Creates a new positioning force along the y-axis towards the given position y.
   * If y is not specified, it defaults to 0.
   */
  export function forceY<NodeDatum extends SimulationNodeDatum>(
    y?: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number),
  ): ForceY<NodeDatum>;

  /**
   * The radial force is similar to the x- and y-positioning forces, except it pushes nodes towards the closest point on a given circle.
   * The circle is of the specified radius centered at ⟨x,y⟩. If x and y are not specified, they default to ⟨0,0⟩.
   * The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position.
   * While this force can be used to position individual nodes, it is intended primarily for global forces that apply to all (or most) nodes.
   *
   * The generic refers to the type of data for a node.
   */
  export interface ForceRadial<NodeDatum extends SimulationNodeDatum> extends Force<NodeDatum, any> {
    /**
     * Assigns the array of nodes and random source to this force. This method is called when a force is bound to a simulation via simulation.force
     * and when the simulation’s nodes change via simulation.nodes.
     *
     * A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.
     */
    initialize(nodes: NodeDatum[], random: () => number): void;

    /**
     *  Returns the current strength accessor, which defaults to a constant strength for all nodes of 0.1.
     */
    strength(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force.
     * The strength determines how much to increment the node’s x- and y-velocity.
     * For example, a value of 0.1 indicates that the node should move a tenth of the way from its current position to the closest point on the circle with each application.
     * Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints.
     * A value outside the range [0,1] is not recommended.
     * The strength accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the strength of each node is only recomputed when the
     * force is initialized or when this method is called with a new strength, and not on every application of the force.
     */
    strength(strength: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current radius accessor for the circle.
     */
    radius(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the circle radius to the specified number or function, re-evaluates the radius accessor for each node, and returns this force.
     * The radius accessor is invoked for each node in the simulation, being passed the node and its zero-based index.
     * The resulting number is then stored internally, such that the target radius of each node is only recomputed when
     * the force is initialized or when this method is called with a new radius, and not on every application of the force.
     */
    radius(radius: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current x-accessor for the circle center, which defaults to a function returning 0 for all nodes.
     */
    x(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the x-coordinate of the circle center to the specified number and returns this force.
     */
    x(x: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;

    /**
     * Return the current y-accessor for the circle center, which defaults to a function returning 0 for all nodes.
     */
    y(): (d: NodeDatum, i: number, data: NodeDatum[]) => number;
    /**
     * Sets the y-coordinate of the circle center to the specified number and returns this force.
     */
    y(y: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number)): this;
  }

  /**
   * Create a new radial positioning force towards a circle of the specified radius centered at ⟨x,y⟩.
   * If x and y are not specified, they default to ⟨0,0⟩.
   *
   * The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position.
   * While this force can be used to position individual nodes, it is intended primarily for global forces that apply to all (or most) nodes.
   *
   * The generic refers to the type of data for a node.
   */
  export function forceRadial<NodeDatum extends SimulationNodeDatum>(
    radius: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number),
    x?: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number),
    y?: number | ((d: NodeDatum, i: number, data: NodeDatum[]) => number),
  ): ForceRadial<NodeDatum>;
}

declare module 'd3-format' {
  // Last module patch version validated against: 3.0.1

  /**
   * Specification of locale to use when creating a new FormatLocaleObject
   */
  export interface FormatLocaleDefinition {
    /**
     * The decimal point (e.g., ".")
     */
    decimal: string;
    /**
     * The group separator (e.g., ","). Note that the thousands property is a misnomer, as
     * the grouping definition allows groups other than thousands.
     */
    thousands: string;
    /**
     * The array of group sizes (e.g., [3]), cycled as needed.
     */
    grouping: number[];
    /**
     * The currency prefix and suffix (e.g., ["$", ""]).
     */
    currency: [string, string];
    /**
     * An optional array of ten strings to replace the numerals 0-9.
     */
    numerals?: string[] | undefined;
    /**
     * An optional symbol to replace the `percent` suffix; the percent suffix (defaults to "%").
     */
    percent?: string | undefined;
    /**
     * Optional; the minus sign (defaults to "−").
     */
    minus?: string | undefined;
    /**
     * Optional; the not-a-number value (defaults "NaN").
     */
    nan?: string | undefined;
  }

  /**
   * A Format Locale Object
   */
  export interface FormatLocaleObject {
    /**
     * Returns a new format function for the given string specifier. The returned function
     * takes a number as the only argument, and returns a string representing the formatted number.
     *
     * @param specifier A Specifier string.
     * @throws Error on invalid format specifier.
     */
    format(specifier: string): (n: number | { valueOf(): number }) => string;

    /**
     * Returns a new format function for the given string specifier. The returned function
     * takes a number as the only argument, and returns a string representing the formatted number.
     * The returned function will convert values to the units of the appropriate SI prefix for the
     * specified numeric reference value before formatting in fixed point notation.
     *
     * @param specifier A Specifier string.
     * @param value The reference value to determine the appropriate SI prefix.
     * @throws Error on invalid format specifier.
     */
    formatPrefix(specifier: string, value: number): (n: number | { valueOf(): number }) => string;
  }

  /**
   * A Format Specifier
   *
   * For details see: {@link https://github.com/d3/d3-format#locale_format}
   */
  export interface FormatSpecifierObject {
    /**
     * fill can be any character. The presence of a fill character is signaled by the align character following it.
     */
    fill?: string | undefined;
    /**
     * Alignment used for format, as set by choosing one of the following:
     *
     * '>' - Forces the field to be right-aligned within the available space. (Default behavior).
     * '<' - Forces the field to be left-aligned within the available space.
     * '^' - Forces the field to be centered within the available space.
     * '=' - Like '>', but with any sign and symbol to the left of any padding.
     */
    align?: string | undefined;
    /**
     * The sign can be:
     *
     * '-' - nothing for positive and a minus sign for negative. (Default behavior.)
     * '+' - a plus sign for positive and a minus sign for negative.
     * '(' - nothing for positive and parentheses for negative.
     * ' ' (space) - a space for positive and a minus sign for negative.
     */
    sign?: string | undefined;
    /**
     * The symbol can be:
     *
     * '$' - apply currency symbols per the locale definition.
     * '#' - for binary, octal, or hexadecimal notation, prefix by 0b, 0o, or 0x, respectively.
     * '' (none) - no symbol. (Default behavior.)
     */
    symbol?: string | undefined;
    /**
     * The zero (0) option enables zero-padding; this implicitly sets fill to 0 and align to =.
     */
    zero?: string | undefined;
    /**
     * The width defines the minimum field width;
     * if not specified, then the width will be determined by the content.
     */
    width?: string | undefined;
    /**
     * The comma (,) option enables the use of a group separator, such as a comma for thousands.
     */
    comma?: string | undefined;
    /**
     * Depending on the type, the precision either indicates the number of digits that follow the decimal point (types 'f' and '%'),
     * or the number of significant digits (types '' (none), 'e', 'g', 'r', 's' and 'p'). If the precision is not specified,
     * it defaults to 6 for all types except '' (none), which defaults to 12.
     * Precision is ignored for integer formats (types 'b', 'o', 'd', 'x', 'X' and 'c').
     *
     * See precisionFixed and precisionRound for help picking an appropriate precision.
     */
    precision?: string | undefined;
    /**
     * The '~' option trims insignificant trailing zeros across all format types.
     * This is most commonly used in conjunction with types 'r', 'e', 's' and '%'.
     */
    trim?: string | undefined;
    /**
     * The available type values are:
     *
     * 'e' - exponent notation.
     * 'f' - fixed point notation.
     * 'g' - either decimal or exponent notation, rounded to significant digits.
     * 'r' - decimal notation, rounded to significant digits.
     * 's' - decimal notation with an SI prefix, rounded to significant digits.
     * '%' - multiply by 100, and then decimal notation with a percent sign.
     * 'p' - multiply by 100, round to significant digits, and then decimal notation with a percent sign.
     * 'b' - binary notation, rounded to integer.
     * 'o' - octal notation, rounded to integer.
     * 'd' - decimal notation, rounded to integer.
     * 'x' - hexadecimal notation, using lower-case letters, rounded to integer.
     * 'X' - hexadecimal notation, using upper-case letters, rounded to integer.
     * 'c' - converts the integer to the corresponding unicode character before printing.
     *
     * The type '' (none) is also supported as shorthand for '~g' (with a default precision of 12 instead of 6), and
     * the type 'n' is shorthand for ',g'. For the 'g', 'n' and '' (none) types,
     * decimal notation is used if the resulting string would have precision or fewer digits; otherwise, exponent notation is used.
     */
    type?: string | undefined;
  }

  /**
   * Create a new locale-based object which exposes format(...) and formatPrefix(...)
   * methods for the specified locale.
   *
   * @param locale A Format locale definition.
   */
  export function formatLocale(locale: FormatLocaleDefinition): FormatLocaleObject;

  /**
   * Create a new locale-based object which exposes format(...) and formatPrefix(...)
   * methods for the specified locale definition. The specified locale definition will be
   * set as the new default locale definition.
   *
   * @param defaultLocale A Format locale definition to be used as default.
   */
  export function formatDefaultLocale(defaultLocale: FormatLocaleDefinition): FormatLocaleObject;

  /**
   * Returns a new format function for the given string specifier. The returned function
   * takes a number as the only argument, and returns a string representing the formatted number.
   *
   * Uses the current default locale.
   *
   * The general form of a specifier is [[fill]align][sign][symbol][0][width][,][.precision][~][type].
   * For reference, an explanation of the segments of the specifier string, refer to the FormatSpecifier interface properties.
   *
   * @param specifier A Specifier string.
   * @throws Error on invalid format specifier.
   */
  export function format(specifier: string): (n: number | { valueOf(): number }) => string;

  /**
   * Returns a new format function for the given string specifier. The returned function
   * takes a number as the only argument, and returns a string representing the formatted number.
   * The returned function will convert values to the units of the appropriate SI prefix for the
   * specified numeric reference value before formatting in fixed point notation.
   *
   * Uses the current default locale.
   *
   * The general form of a specifier is [[fill]align][sign][symbol][0][width][,][.precision][~][type].
   * For reference, an explanation of the segments of the specifier string, refer to the FormatSpecifier interface properties.
   *
   * @param specifier A Specifier string.
   * @param value The reference value to determine the appropriate SI prefix.
   * @throws Error on invalid format specifier.
   */
  export function formatPrefix(specifier: string, value: number): (n: number | { valueOf(): number }) => string;

  /**
   * A Format Specifier
   *
   * For details see: {@link https://github.com/d3/d3-format#locale_format}
   */
  export class FormatSpecifier {
    /**
     * Given the specified specifier object, returning an object with exposed fields that correspond to the format specification mini-language and a toString method that reconstructs the specifier.
     * @param specifier A specifier object.
     */
    constructor(specifier: FormatSpecifierObject);
    /**
     * fill can be any character. The presence of a fill character is signaled by the align character following it.
     */
    fill: string;
    /**
     * Alignment used for format, as set by choosing one of the following:
     *
     * '>' - Forces the field to be right-aligned within the available space. (Default behavior).
     * '<' - Forces the field to be left-aligned within the available space.
     * '^' - Forces the field to be centered within the available space.
     * '=' - Like '>', but with any sign and symbol to the left of any padding.
     */
    align: '>' | '<' | '^' | '=';
    /**
     * The sign can be:
     *
     * '-' - nothing for positive and a minus sign for negative. (Default behavior.)
     * '+' - a plus sign for positive and a minus sign for negative.
     * '(' - nothing for positive and parentheses for negative.
     * ' ' (space) - a space for positive and a minus sign for negative.
     */
    sign: '-' | '+' | '(' | ' ';
    /**
     * The symbol can be:
     *
     * '$' - apply currency symbols per the locale definition.
     * '#' - for binary, octal, or hexadecimal notation, prefix by 0b, 0o, or 0x, respectively.
     * '' (none) - no symbol. (Default behavior.)
     */
    symbol: '$' | '#' | '';
    /**
     * The zero (0) option enables zero-padding; this implicitly sets fill to 0 and align to =.
     */
    zero: boolean;
    /**
     * The width defines the minimum field width;
     * if not specified, then the width will be determined by the content.
     */
    width: number | undefined;
    /**
     * The comma (,) option enables the use of a group separator, such as a comma for thousands.
     */
    comma: boolean;
    /**
     * Depending on the type, the precision either indicates the number of digits that follow the decimal point (types 'f' and '%'),
     * or the number of significant digits (types '' (none), 'e', 'g', 'r', 's' and 'p'). If the precision is not specified,
     * it defaults to 6 for all types except '' (none), which defaults to 12.
     * Precision is ignored for integer formats (types 'b', 'o', 'd', 'x', 'X' and 'c').
     *
     * See precisionFixed and precisionRound for help picking an appropriate precision.
     */
    precision: number | undefined;
    /**
     * The '~' option trims insignificant trailing zeros across all format types.
     * This is most commonly used in conjunction with types 'r', 'e', 's' and '%'.
     */
    trim: boolean;
    /**
     * The available type values are:
     *
     * 'e' - exponent notation.
     * 'f' - fixed point notation.
     * 'g' - either decimal or exponent notation, rounded to significant digits.
     * 'r' - decimal notation, rounded to significant digits.
     * 's' - decimal notation with an SI prefix, rounded to significant digits.
     * '%' - multiply by 100, and then decimal notation with a percent sign.
     * 'p' - multiply by 100, round to significant digits, and then decimal notation with a percent sign.
     * 'b' - binary notation, rounded to integer.
     * 'o' - octal notation, rounded to integer.
     * 'd' - decimal notation, rounded to integer.
     * 'x' - hexadecimal notation, using lower-case letters, rounded to integer.
     * 'X' - hexadecimal notation, using upper-case letters, rounded to integer.
     * 'c' - converts the integer to the corresponding unicode character before printing.
     *
     * The type '' (none) is also supported as shorthand for '~g' (with a default precision of 12 instead of 6), and
     * the type 'n' is shorthand for ',g'. For the 'g', 'n' and '' (none) types,
     * decimal notation is used if the resulting string would have precision or fewer digits; otherwise, exponent notation is used.
     */
    type: 'e' | 'f' | 'g' | 'r' | 's' | '%' | 'p' | 'b' | 'o' | 'd' | 'x' | 'X' | 'c' | '' | 'n';
    /**
     * Return the object as a specifier string.
     */
    toString(): string;
  }

  /**
   * Parses the specified specifier, returning an object with exposed fields that correspond to the
   * format specification mini-language and a toString method that reconstructs the specifier.
   *
   * The general form of a specifier is [[fill]align][sign][symbol][0][width][,][.precision][~][type].
   * For reference, an explanation of the segments of the specifier string, refer to the FormatSpecifier interface properties.
   *
   * @param specifier A specifier string.
   * @throws Error on invalid format specifier.
   */
  export function formatSpecifier(specifier: string): FormatSpecifier;

  /**
   * Returns a suggested decimal precision for fixed point notation given the specified numeric step value.
   *
   * @param step The step represents the minimum absolute difference between values that will be formatted.
   * (This assumes that the values to be formatted are also multiples of step.)
   */
  export function precisionFixed(step: number): number;

  /**
   * Returns a suggested decimal precision for use with locale.formatPrefix given the specified
   * numeric step and reference value.
   *
   * @param step The step represents the minimum absolute difference between values that will be formatted.
   * (This assumes that the values to be formatted are also multiples of step.)
   * @param value Reference value determines which SI prefix will be used.
   */
  export function precisionPrefix(step: number, value: number): number;

  /**
   * Returns a suggested decimal precision for format types that round to significant digits
   * given the specified numeric step and max values.
   *
   * @param step The step represents the minimum absolute difference between values that will be formatted.
   * (This assumes that the values to be formatted are also multiples of step.)
   * @param max max represents the largest absolute value that will be formatted.
   */
  export function precisionRound(step: number, max: number): number;
}

declare module 'd3-geo' {
  // Last module patch version validated against: 3.0.1

  import * as GeoJSON from 'geojson';

  // ----------------------------------------------------------------------
  // Shared Interfaces and Types
  // ----------------------------------------------------------------------

  /**
   * A basic geometry for a sphere, which is supported by d3-geo
   * beyond the GeoJSON geometries.
   */
  export interface GeoSphere {
    /**
     * Sphere geometry type
     */
    type: 'Sphere';
  }

  /**
   * Type Alias for GeoJSON Geometry Object and GeoSphere additional
   * geometry supported by d3-geo
   */
  export type GeoGeometryObjects = GeoJSON.GeometryObject | GeoSphere;

  /**
   * A GeoJSON-style GeometryCollection which supports GeoJSON geometry objects
   * and additionally GeoSphere.
   *
   * The generic refers to the type(s) of d3-geo geometry objects contained in the collection.
   */
  export interface ExtendedGeometryCollection<GeometryType extends GeoGeometryObjects = GeoGeometryObjects> {
    type: string;
    bbox?: number[] | undefined;
    crs?:
      | {
          type: string;
          properties: any;
        }
      | undefined;
    geometries: GeometryType[];
  }

  /**
   * A GeoJSON-style Feature which support features built on GeoJSON GeometryObjects
   * or GeoSphere.
   *
   * The first generic refers to the type(s) of d3-geo geometry objects underlying the ExtendedFeature.
   * Unless explicitly ruled out, the geometry value is nullable.
   *
   * The second generic refers to the data type of the properties of the ExtendedFeature. Unless explicitly ruled out,
   * the properties value is nullable.
   */
  export interface ExtendedFeature<
    GeometryType extends GeoGeometryObjects | null = GeoGeometryObjects | null,
    Properties extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties,
  >
    extends GeoJSON.GeoJsonObject {
    geometry: GeometryType;
    properties: Properties;
    id?: string | number | undefined;
  }

  /**
   * A GeoJSON-style FeatureCollection which supports GeoJSON features
   * and features built on GeoSphere
   *
   * The generic refers to the type of ExtendedFeature contained in the ExtendedFeatureCollection.
   */
  export interface ExtendedFeatureCollection<FeatureType extends ExtendedFeature = ExtendedFeature>
    extends GeoJSON.GeoJsonObject {
    features: FeatureType[];
  }

  /**
   * Type Alias for permissible objects which can be used with d3-geo
   * methods
   */
  export type GeoPermissibleObjects =
    | GeoGeometryObjects
    | ExtendedGeometryCollection
    | ExtendedFeature
    | ExtendedFeatureCollection;

  // ----------------------------------------------------------------------
  // Spherical Math
  // ----------------------------------------------------------------------

  /**
   * Returns the spherical area of the specified GeoJSON object in steradians.
   * This is the spherical equivalent of path.area.
   */
  export function geoArea(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
  ): number;

  /**
   * Returns the spherical bounding box for the specified GeoJSON object.
   * The bounding box is represented by a two-dimensional array: [[left, bottom], [right, top]],
   * where left is the minimum longitude, bottom is the minimum latitude, right is maximum longitude, and top is the maximum latitude.
   * All coordinates are given in degrees.
   * (Note that in projected planar coordinates, the minimum latitude is typically the maximum y-value, and the maximum latitude is typically the minimum y-value.)
   * This is the spherical equivalent of path.bounds.
   */
  export function geoBounds(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
  ): [[number, number], [number, number]];

  /**
   * Returns the spherical centroid of the specified GeoJSON object.
   * This is the spherical equivalent of path.centroid.
   */
  export function geoCentroid(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
  ): [number, number];

  /**
   * Returns true if and only if the specified GeoJSON object contains the specified point, or false if the object does not contain the point.
   * The point must be specified as a two-element array [longitude, latitude] in degrees.
   * For Point and MultiPoint geometries, an exact test is used; for a Sphere, true is always returned; for other geometries, an epsilon threshold is applied.
   */
  export function geoContains(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    point: [number, number],
  ): boolean;

  /**
   * Returns the great-arc distance in radians between the two points a and b.
   * Each point must be specified as a two-element array [longitude, latitude] in degrees.
   *
   * @param a Point specified as a two-element array [longitude, latitude] in degrees.
   * @param b Point specified as a two-element array [longitude, latitude] in degrees.
   */
  export function geoDistance(a: [number, number], b: [number, number]): number;

  /**
   * Returns the great-arc length of the specified GeoJSON object in radians.
   * For polygons, returns the perimeter of the exterior ring plus that of any interior rings.
   * This is the spherical equivalent of path.measure.
   */
  export function geoLength(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
  ): number;

  /**
   * Returns an interpolator function given two points a and b.
   * Each point must be specified as a two-element array [longitude, latitude] in degrees.
   *
   * @param a Point specified as a two-element array [longitude, latitude] in degrees.
   * @param b Point specified as a two-element array [longitude, latitude] in degrees.
   */
  export function geoInterpolate(a: [number, number], b: [number, number]): (t: number) => [number, number];

  /**
   * A Geo Rotation
   */
  export interface GeoRotation {
    /**
     * Returns a new array [longitude, latitude] in degrees representing the rotated point of the given point.
     *
     * @param point The point must be specified as a two-element array [longitude, latitude] in degrees.
     */
    (point: [number, number]): [number, number];

    /**
     * Returns a new array [longitude, latitude] in degrees representing the point of the given rotated point; the inverse of rotation.
     *
     * @param point The rotated point must be specified as a two-element array [longitude, latitude] in degrees.
     */
    invert(point: [number, number]): [number, number];
  }

  /**
   * Returns a rotation function for the given angles.
   *
   * @param angles  A two- or three-element array of numbers [lambda, phi, gamma] specifying the rotation angles in degrees about each spherical axis.
   * (These correspond to yaw, pitch and roll.) If the rotation angle gamma is omitted, it defaults to 0.
   */
  export function geoRotation(angles: [number, number] | [number, number, number]): GeoRotation;

  // ----------------------------------------------------------------------
  // Spherical Shapes
  // ----------------------------------------------------------------------

  // geoCircle ============================================================

  /**
   * A new circle generator
   *
   * The first generic corresponds to the "this"-context within which the geo circle generator will be invoked.
   *
   * The second generic corresponds to the type of the Datum which will be passed into the geo circle generator.
   */
  export interface GeoCircleGenerator<This = any, Datum = any> {
    /**
     * Returns a new GeoJSON geometry object of type “Polygon” approximating a circle on the surface of a sphere,
     * with the current center, radius and precision. Any arguments are passed to the accessors.
     */
    (this: This, d?: Datum, ...args: any[]): GeoJSON.Polygon;

    /**
     * Returns the current center accessor, which defaults to a function returning [0, 0].
     */
    center(): (this: This, d: Datum, ...args: any[]) => [number, number];
    /**
     * Sets the circle center to the specified point [longitude, latitude] in degrees, and returns this circle generator.
     * The center may also be specified as a function; this function will be invoked whenever a circle is generated, being passed any arguments passed to the circle generator.
     */
    center(center: [number, number] | ((this: This, d: Datum, ...args: any[]) => [number, number])): this;

    /**
     * Returns the current radius accessor, which defaults to a function returning 90.
     */
    radius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the circle radius to the specified angle in degrees, and returns this circle generator.
     * The radius may also be specified as a function; this function will be invoked whenever a circle is generated, being passed any arguments passed to the circle generator.
     */
    radius(radius: number | ((this: This, d: Datum, ...args: any[]) => number)): this;

    /**
     * Returns the current precision accessor, which defaults to a function returning 6.
     */
    precision(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the circle precision to the specified angle in degrees, and returns this circle generator.
     * The precision may also be specified as a function; this function will be invoked whenever a circle is generated, being passed any arguments passed to the circle generator.
     */
    precision(precision: number | ((this: This, d: Datum, ...args: any[]) => number)): this;
  }

  /**
   * Returns a new geo circle generator
   */
  export function geoCircle(): GeoCircleGenerator;
  /**
   * Returns a new geo circle generator
   *
   * The generic corresponds to the data type of the first argument passed into the geo circle generator and its accessor functions.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function geoCircle<Datum>(): GeoCircleGenerator<any, Datum>;
  /**
   * Returns a new geo circle generator
   *
   * The first generic corresponds to the "this" context within which the geo circle generator and its accessors will be invoked.
   *
   * The second generic corresponds to the data type of the first argument passed into the geo circle generator and its accessor functions.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function geoCircle<This, Datum>(): GeoCircleGenerator<This, Datum>;

  // geoGraticule ============================================================

  /**
   * A Feature generator for graticules: a uniform grid of meridians and parallels for showing projection distortion.
   * The default graticule has meridians and parallels every 10° between ±80° latitude; for the polar regions, there are meridians every 90°.
   */
  export interface GeoGraticuleGenerator {
    /**
     * Returns a GeoJSON MultiLineString geometry object representing all meridians and parallels for this graticule.
     */
    (): GeoJSON.MultiLineString;

    /**
     * Returns an array of GeoJSON LineString geometry objects, one for each meridian or parallel for this graticule.
     */
    lines(): GeoJSON.LineString[];

    /**
     * Returns a GeoJSON Polygon geometry object representing the outline of this graticule, i.e. along the meridians and parallels defining its extent.
     */
    outline(): GeoJSON.Polygon;

    /**
     * Returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.
     */
    extent(): [[number, number], [number, number]];
    /**
     * Sets the major and minor extents of this graticule.
     *
     * @param extent Extent to use for major and minor extent of graticule.
     */
    extent(extent: [[number, number], [number, number]]): this;

    /**
     * Returns the current major extent, which defaults to ⟨⟨-180°, -90° + ε⟩, ⟨180°, 90° - ε⟩⟩.
     */
    extentMajor(): [[number, number], [number, number]];
    /**
     * Sets the major extent of this graticule.
     *
     * @param extent Major extent of graticule.
     */
    extentMajor(extent: [[number, number], [number, number]]): this;

    /**
     * Returns the current minor extent, which defaults to  ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.
     */
    extentMinor(): [[number, number], [number, number]];
    /**
     * Sets the minor extent of this graticule.
     *
     * @param extent Minor extent of graticule.
     */
    extentMinor(extent: [[number, number], [number, number]]): this;

    /**
     * Returns the current minor step, which defaults to ⟨10°, 10°⟩.
     */
    step(): [number, number];
    /**
     * Sets the major and minor step for this graticule
     *
     * @param step Major and minor step to use for this graticule.
     */
    step(step: [number, number]): this;

    /**
     * Returns the current major step, which defaults to ⟨90°, 360°⟩.
     */
    stepMajor(): [number, number];
    /**
     * Sets the major step for this graticule.
     *
     * @param step Major step.
     */
    stepMajor(step: [number, number]): this;

    /**
     * Returns the current major step, which defaults to ⟨10°, 10°⟩.
     */
    stepMinor(): [number, number];
    /**
     * Sets the minor step for this graticule.
     *
     * @param step Minor step.
     */
    stepMinor(step: [number, number]): this;

    /**
     * Returns the current precision, which defaults to 2.5°.
     */
    precision(): number;
    /**
     * Sets the precision for this graticule, in degrees.
     *
     * @param angle Precision in degrees.
     */
    precision(angle: number): this;
  }

  /**
   * Constructs a feature generator for creating graticules: a uniform grid of meridians and parallels for showing projection distortion.
   * The default graticule has meridians and parallels every 10° between ±80° latitude; for the polar regions, there are meridians every 90°.
   */
  export function geoGraticule(): GeoGraticuleGenerator;

  /**
   * A convenience method for directly generating the default 10° global graticule as a GeoJSON MultiLineString geometry object.
   */
  export function geoGraticule10(): GeoJSON.MultiLineString;

  // ----------------------------------------------------------------------
  // Projections
  // ----------------------------------------------------------------------

  /**
   * A D3 geo stream. D3 transforms geometry using a sequence of function calls, rather than materializing intermediate representations, to minimize overhead.
   * Streams must implement several methods to receive input geometry. Streams are inherently stateful; the meaning of a point depends on whether the point is inside of a line,
   * and likewise a line is distinguished from a ring by a polygon. Despite the name “stream”, these method calls are currently synchronous.
   */
  export interface GeoStream {
    /**
     * Indicates the end of a line or ring. Within a polygon, indicates the end of a ring.
     * Unlike GeoJSON, the redundant closing coordinate of a ring is not indicated via point, and instead is implied via lineEnd within a polygon.
     */
    lineEnd(): void;

    /**
     * Indicates the start of a line or ring. Within a polygon, indicates the start of a ring. The first ring of a polygon is the exterior ring, and is typically clockwise.
     * Any subsequent rings indicate holes in the polygon, and are typically counterclockwise.
     */
    lineStart(): void;

    /**
     * Indicates a point with the specified coordinates x and y (and optionally z). The coordinate system is unspecified and implementation-dependent;
     * for example, projection streams require spherical coordinates in degrees as input. Outside the context of a polygon or line,
     * a point indicates a point geometry object (Point or MultiPoint). Within a line or polygon ring, the point indicates a control point.
     *
     * @param x x-coordinate of point.
     * @param y y-coordinate of point.
     * @param z Optional z-coordinate of point.
     */
    point(x: number, y: number, z?: number): void;

    /**
     * Indicates the end of a polygon.
     */
    polygonEnd(): void;

    /**
     * Indicates the start of a polygon. The first line of a polygon indicates the exterior ring, and any subsequent lines indicate interior holes.
     */
    polygonStart(): void;

    /**
     * Indicates the sphere (the globe; the unit sphere centered at ⟨0,0,0⟩).
     */
    sphere?(): void;
  }

  // geoStream(...) =======================================================

  /**
   * Streams the specified GeoJSON object to the specified projection stream.
   * While both features and geometry objects are supported as input, the stream interface only describes the geometry, and thus additional feature properties are not visible to streams.
   */
  export function geoStream(
    object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    stream: GeoStream,
  ): void;

  // ----------------------------------------------------------------------
  // Projections
  // ----------------------------------------------------------------------

  /**
   * Raw projections are point transformation functions that are used to implement custom projections; they typically passed to d3.geoProjection or d3.geoProjectionMutator.
   * They are exposed here to facilitate the derivation of related projections.
   * Raw projections take spherical coordinates [lambda, phi] in radians (not degrees!) and return a point [x, y], typically in the unit square centered around the origin.
   */
  export interface GeoRawProjection {
    /**
     * Projects the specified point [lambda, phi] in radians, returning a new point [x, y] in unitless coordinates.
     * @param lambda Spherical lambda coordinate in radians.
     * @param phi Spherical phi coordinate in radians.
     */
    (lambda: number, phi: number): [number, number];

    /**
     * Inverts the projected point [x, y] in unitless coordinates, returning an unprojected point in spherical coordinates [lambda, phi] in radians.
     * @param x x-coordinate (unitless).
     * @param y y-coordinate (unitless).
     */
    invert?(x: number, y: number): [number, number];
  }

  /**
   * An object implementing a stream method
   */
  export interface GeoStreamWrapper {
    /**
     * Returns a projection stream for the specified output stream. Any input geometry is projected before being streamed to the output stream.
     * A typical projection involves several geometry transformations: the input geometry is first converted to radians, rotated on three axes,
     * clipped to the small circle or cut along the antimeridian, and lastly projected to the plane with adaptive resampling, scale and translation.
     *
     * @param stream An input stream
     */
    stream(stream: GeoStream): GeoStream;
  }

  /**
   * A Geographic Projection to transform spherical polygonal geometry to planar polygonal geometry.
   * D3 provides implementations of several classes of standard projections:
   *
   * - Azimuthal
   * - Composite
   * - Conic
   * - Cylindrical
   *
   * For many more projections, see d3-geo-projection. You can implement custom projections using d3.geoProjection or d3.geoProjectionMutator.
   */
  export interface GeoProjection extends GeoStreamWrapper {
    /**
     * Returns a new array [x, y] (typically in pixels) representing the projected point of the given point.
     * The point must be specified as a two-element array [longitude, latitude] in degrees.
     * May return null if the specified point has no defined projected position, such as when the point is outside the clipping bounds of the projection.
     *
     * @param point A point specified as a two-dimensional array [longitude, latitude] in degrees.
     */
    (point: [number, number]): [number, number] | null;

    /**
     * Returns a new array [longitude, latitude] in degrees representing the unprojected point of the given projected point.
     * May return null if the specified point has no defined projected position, such as when the point is outside the clipping bounds of the projection.
     *
     * @param point The projected point, specified as a two-element array [x, y] (typically in pixels).
     */
    invert?(point: [number, number]): [number, number] | null;

    /**
     * Returns the current spherical clipping function.
     * Pre-clipping occurs in geographic coordinates. Cutting along the antimeridian line,
     * or clipping along a small circle are the most common strategies.
     */
    preclip(): (stream: GeoStream) => GeoStream;
    /**
     * Sets the projection’s spherical clipping to the specified function and returns the projection.
     * Pre-clipping occurs in geographic coordinates. Cutting along the antimeridian line, or clipping along a small circle are the most common strategies.
     *
     * @param preclip A spherical clipping function. Clipping functions are implemented as transformations of a projection stream.
     * Pre-clipping operates on spherical coordinates, in radians.
     */
    preclip(preclip: (stream: GeoStream) => GeoStream): this;

    /**
     * Returns the current cartesian clipping function.
     * Post-clipping occurs on the plane, when a projection is bounded to a certain extent such as a rectangle.
     */
    postclip(): (stream: GeoStream) => GeoStream;
    /**
     * Sets the projection’s cartesian clipping to the specified function and returns the projection.
     *
     * @param postclip A cartesian clipping function. Clipping functions are implemented as transformations of a projection stream.
     * Post-clipping operates on planar coordinates, in pixels.
     */
    postclip(postclip: (stream: GeoStream) => GeoStream): this;

    /**
     * Returns the current clip angle which defaults to null.
     *
     * null switches to antimeridian cutting rather than small-circle clipping.
     */
    clipAngle(): number | null;
    /**
     * Sets the projection’s clipping circle radius to the specified angle in degrees and returns the projection.
     * If angle is null, switches to antimeridian cutting rather than small-circle clipping.
     */
    clipAngle(angle: null | number): this;

    /**
     * Returns the current viewport clip extent which defaults to null.
     */
    clipExtent(): [[number, number], [number, number]] | null;
    /**
     * Sets the projection’s viewport clip extent to the specified bounds in pixels and returns the projection.
     * The extent bounds are specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left-side of the viewport, y₀ is the top, x₁ is the right and y₁ is the bottom.
     * If extent is null, no viewport clipping is performed.
     */
    clipExtent(extent: null | [[number, number], [number, number]]): this;

    /**
     * Returns the current scale factor; the default scale is projection-specific.
     *
     * The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.
     */
    scale(): number;
    /**
     * Sets the projection’s scale factor to the specified value and returns the projection.
     * The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.
     *
     * @param scale Scale factor to be used for the projection; the default scale is projection-specific.
     */
    scale(scale: number): this;

    /**
     * Returns the current translation offset which defaults to [480, 250] and places ⟨0°,0°⟩ at the center of a 960×500 area.
     * The translation offset determines the pixel coordinates of the projection’s center.
     */
    translate(): [number, number];
    /**
     * Sets the projection’s translation offset to the specified two-element array [tx, ty] and returns the projection.
     * The translation offset determines the pixel coordinates of the projection’s center. The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.
     *
     * @param point A two-element array [tx, ty] specifying the translation offset. The default translation offset of defaults to [480, 250] places ⟨0°,0°⟩ at the center of a 960×500 area.
     */
    translate(point: [number, number]): this;

    /**
     * Returns the current center of the projection, which defaults to ⟨0°,0°⟩.
     */
    center(): [number, number];
    /**
     * Sets the projection’s center to the specified center,
     * a two-element array of longitude and latitude in degrees and returns the projection.
     * The default is ⟨0°,0°⟩.
     *
     * @param point A point specified as a two-dimensional array [longitude, latitude] in degrees.
     */
    center(point: [number, number]): this;

    /**
     * Returns the projection’s current angle, which defaults to 0°.
     */
    angle(): number;
    /**
     * Sets the projection’s post-projection planar rotation angle to the specified angle in degrees and returns the projection.
     * @param angle The new rotation angle of the projection.
     */
    angle(angle: number): this;

    /**
     * Returns true if x-reflection is enabled, which defaults to false.
     */
    reflectX(): boolean;
    /**
     * Sets whether or not the x-dimension is reflected (negated) in the output.
     * @param reflect Whether or not the x-dimension is reflected (negated) in the output.
     */
    reflectX(reflect: boolean): this;

    /**
     * Returns true if y-reflection is enabled, which defaults to false.
     */
    reflectY(): boolean;
    /**
     * Sets whether or not the y-dimension is reflected (negated) in the output.
     * @param reflect Whether or not the y-dimension is reflected (negated) in the output.
     */
    reflectY(reflect: boolean): this;

    /**
     * Returns the current rotation [lambda, phi, gamma] specifying the rotation angles in degrees about each spherical axis.
     * (These correspond to yaw, pitch and roll.) which defaults [0, 0, 0].
     */
    rotate(): [number, number, number];

    /**
     * Sets the projection’s three-axis rotation to the specified angles, which must be a two- or three-element array of numbers.
     *
     * @param angles  A two- or three-element array of numbers [lambda, phi, gamma] specifying the rotation angles in degrees about each spherical axis.
     * (These correspond to yaw, pitch and roll.) If the rotation angle gamma is omitted, it defaults to 0.
     */
    rotate(angles: [number, number] | [number, number, number]): this;

    /**
     * Returns the projection’s current resampling precision which defaults to square root of 0.5.
     * This value corresponds to the Douglas–Peucker distance.
     */
    precision(): number;
    /**
     * Sets the threshold for the projection’s adaptive resampling to the specified value in pixels and returns the projection.
     * This value corresponds to the Douglas–Peucker distance.
     *
     * @param precision A numeric value in pixels to use as the threshold for the projection’s adaptive resampling.
     */
    precision(precision: number): this;

    /**
     * Sets the projection’s scale and translate to fit the specified GeoJSON object in the center of the given extent.
     * The extent is specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left side of the bounding box, y₀ is the top, x₁ is the right and y₁ is the bottom.
     * Returns the projection.
     */
    fitExtent(
      extent: [[number, number], [number, number]],
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;

    /**
     * A convenience method for projection.fitExtent where the top-left corner of the extent is [0, 0].
     */
    fitSize(
      size: [number, number],
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;

    /**
     * A convenience method for projection.fitSize where the height is automatically chosen from the aspect ratio of object and the given constraint on width.
     */
    fitWidth(
      width: number,
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;

    /**
     * A convenience method for projection.fitSize where the width is automatically chosen from the aspect ratio of object and the given constraint on height.
     */
    fitHeight(
      height: number,
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;
  }

  /**
   * A Conic Projection
   */
  export interface GeoConicProjection extends GeoProjection {
    /**
     * Return the standard parallels for the conic projection in degrees.
     */
    parallels(): [number, number];
    /**
     * Set the standard parallels for the conic projection in degrees and return the projection.
     *
     * @param value A two-dimensional array representing the standard parallels in degrees.
     */
    parallels(value: [number, number]): this;
  }

  // geoPath ==============================================================

  /**
   * A minimal rendering context for a GeoPath generator. The minimum implemented
   * methods are a subset of the CanvasRenderingContext2D API.
   *
   * For reference to the CanvasRenderingContext2D see https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D
   */
  export interface GeoContext {
    /**
     * Adds an arc to the path with center point (x, y) and radius r starting at startAngle and ending at endAngle.
     * The arc is drawn in clockwise direction by default.
     *
     * @param x x-coordinate of arc center point.
     * @param y y-coordinate of arc center point.
     * @param radius Radius of arc.
     * @param startAngle The starting angle of the arc, measured clockwise from the positive x axis and expressed in radians.
     * @param endAngle The end angle of the arc, measured clockwise from the positive x axis and expressed in radians.
     * @param anticlockwise Optional boolean flag, if true the arc is drawn counter-clockwise between the two angles.
     */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;

    /**
     * Start a new path by emptying the list of sub-paths.
     */
    beginPath(): void;

    /**
     * Causes the point of the pen to move back to the start of the current sub-path.
     * It tries to draw a straight line from the current point to the start.
     * If the shape has already been closed or has only one point, this function does nothing.
     */
    closePath(): void;

    /**
     * Connects the last point in the sub-path to the x, y coordinates with a straight line (but does not actually draw it).
     *
     * @param x The x-coordinate for the end of the line.
     * @param y The y-coordinate for the end of the line.
     */
    lineTo(x: number, y: number): void;

    /**
     * Move the starting point of a new sub-path to the (x, y) coordinates.
     *
     * @param x The x-coordinate for the new starting point.
     * @param y The y-coordinate for the new starting point.
     */
    moveTo(x: number, y: number): void;
  }

  /**
   * A Geo Path generator
   *
   * The first generic corresponds to the "this"-context within which the geo path generator will be invoked.
   * This could be e.g. the DOMElement bound to "this" when using selection.attr("d", ...) with the path generator.
   *
   * The second generic corresponds to the type of the DatumObject which will be passed into the geo path generator for rendering.
   */
  export interface GeoPath<This = any, DatumObject extends GeoPermissibleObjects = GeoPermissibleObjects> {
    /**
     * Renders the given object, which may be any GeoJSON feature or geometry object:
     *
     * + Point - a single position.
     * + MultiPoint - an array of positions.
     * + LineString - an array of positions forming a continuous line.
     * + MultiLineString - an array of arrays of positions forming several lines.
     * + Polygon - an array of arrays of positions forming a polygon (possibly with holes).
     * + MultiPolygon - a multidimensional array of positions forming multiple polygons.
     * + GeometryCollection - an array of geometry objects.
     * + Feature - a feature containing one of the above geometry objects.
     * + FeatureCollection - an array of feature objects.
     *
     * The type Sphere is also supported, which is useful for rendering the outline of the globe; a sphere has no coordinates.
     *
     * Any additional arguments are passed along to the pointRadius accessor.
     *
     * IMPORTANT: If the rendering context of the geoPath generator is null,
     * then the geoPath is returned as an SVG path data string.
     *
     * Separate path elements are typically slower than a single path element. However, distinct path elements are useful for styling and interaction (e.g., click or mouseover).
     * Canvas rendering (see path.context) is typically faster than SVG, but requires more effort to implement styling and interaction.
     *
     * The first generic type of the GeoPath generator used, must correspond to the "this" context bound to the function upon invocation.
     *
     * @param object An object to be rendered.
     */
    (this: This, object: DatumObject, ...args: any[]): string | null;
    /**
     * Renders the given object, which may be any GeoJSON feature or geometry object:
     *
     * + Point - a single position.
     * + MultiPoint - an array of positions.
     * + LineString - an array of positions forming a continuous line.
     * + MultiLineString - an array of arrays of positions forming several lines.
     * + Polygon - an array of arrays of positions forming a polygon (possibly with holes).
     * + MultiPolygon - a multidimensional array of positions forming multiple polygons.
     * + GeometryCollection - an array of geometry objects.
     * + Feature - a feature containing one of the above geometry objects.
     * + FeatureCollection - an array of feature objects.
     *
     * The type Sphere is also supported, which is useful for rendering the outline of the globe; a sphere has no coordinates.
     *
     * Any additional arguments are passed along to the pointRadius accessor.
     *
     * IMPORTANT: If the geoPath generator has been configured with a rendering context,
     * then the geoPath is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * Separate path elements are typically slower than a single path element. However, distinct path elements are useful for styling and interaction (e.g., click or mouseover).
     * Canvas rendering (see path.context) is typically faster than SVG, but requires more effort to implement styling and interaction.
     *
     * The first generic type of the GeoPath generator used, must correspond to the "this" context bound to the function upon invocation.
     *
     * @param object An object to be rendered.
     */
    (this: This, object: DatumObject, ...args: any[]): void;

    /**
     * Returns the projected planar area (typically in square pixels) for the specified GeoJSON object.
     * Point, MultiPoint, LineString and MultiLineString geometries have zero area. For Polygon and MultiPolygon geometries,
     * this method first computes the area of the exterior ring, and then subtracts the area of any interior holes.
     * This method observes any clipping performed by the projection; see projection.clipAngle and projection.clipExtent. This is the planar equivalent of d3.geoArea.
     *
     * @param object An object for which the area is to be calculated.
     */
    area(object: DatumObject): number;

    /**
     * Returns the projected planar bounding box (typically in pixels) for the specified GeoJSON object.
     * The bounding box is represented by a two-dimensional array: [[x₀, y₀], [x₁, y₁]], where x₀ is the minimum x-coordinate, y₀ is the minimum y-coordinate,
     * x₁ is maximum x-coordinate, and y₁ is the maximum y-coordinate.
     *
     * This is handy for, say, zooming in to a particular feature. (Note that in projected planar coordinates,
     * the minimum latitude is typically the maximum y-value, and the maximum latitude is typically the minimum y-value.)
     * This method observes any clipping performed by the projection; see projection.clipAngle and projection.clipExtent. This is the planar equivalent of d3.geoBounds.
     *
     * @param object An object for which the bounds are to be calculated.
     */
    bounds(object: DatumObject): [[number, number], [number, number]];

    /**
     * Returns the projected planar centroid (typically in pixels) for the specified GeoJSON object.
     * This is handy for, say, labeling state or county boundaries, or displaying a symbol map.
     * For example, a noncontiguous cartogram might scale each state around its centroid.
     * This method observes any clipping performed by the projection; see projection.clipAngle and projection.clipExtent. This is the planar equivalent of d3.geoCentroid.
     *
     * @param object An object for which the centroid is to be calculated.
     */
    centroid(object: DatumObject): [number, number];

    /**
     * Returns the projected planar length (typically in pixels) for the specified GeoJSON object.
     * Point and MultiPoint geometries have zero length. For Polygon and MultiPolygon geometries, this method computes the summed length of all rings.
     *
     * This method observes any clipping performed by the projection; see projection.clipAngle and projection.clipExtent. This is the planar equivalent of d3.geoLength.
     *
     * @param object An object for which the measure is to be calculated.
     */
    measure(object: DatumObject): number;

    /**
     * Returns the current render context which defaults to null.
     *
     * Use the generic to cast the return type of the rendering context, if it is known for a specific application.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    context<C extends GeoContext | null>(): C;

    /**
     * sets the current render context and returns the path generator.
     * If the context is null, then the path generator will return an SVG path string;
     * if the context is non-null, the path generator will instead call methods on the specified context to render geometry.
     */
    context(context: null | GeoContext): this;

    /**
     * Get the current projection. The generic parameter can be used to cast the result to the
     * correct, known type of the projection, e.g. GeoProjection or GeoConicProjection. Otherwise,
     * the return type defaults to the minimum type requirement for a projection which
     * can be passed into a GeoPath.
     *
     * Use the generic to cast the return type of the projection, if it is known for a specific application.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    projection<P extends GeoConicProjection | GeoProjection | GeoStreamWrapper | null>(): P;

    /**
     * Sets the current projection to the specified projection.
     * The null projection represents the identity transformation: the input geometry is not projected and is instead rendered directly in raw coordinates.
     * This can be useful for fast rendering of pre-projected geometry, or for fast rendering of the equirectangular projection.
     */
    projection(projection: null | GeoProjection | GeoStreamWrapper): this;

    /**
     * Returns the current radius or radius accessor used to determine the radius for the display of Point and MultiPoint geometries.
     * The default is a constant radius of 4.5.
     */
    pointRadius(): ((this: This, object: DatumObject, ...args: any[]) => number) | number;

    /**
     * Sets the radius used to display Point and MultiPoint geometries to the specified number.
     * While the radius is commonly specified as a number constant, it may also be specified as a function which is computed per feature, being passed the any arguments passed to the path generator.
     * For example, if your GeoJSON data has additional properties, you might access those properties inside the radius function to vary the point size;
     * alternatively, you could d3.symbol and a projection for greater flexibility.
     */
    pointRadius(value: number | ((this: This, object: DatumObject, ...args: any[]) => number)): this;

    /**
     * Returns the current number of digits, which defaults to 3.
     */
    digits(): number;
    /**
     * Sets the number of fractional digits for coordinates generated in SVG path strings.
     * @param digits New amount of digits
     */
    digits(digits: number): this;
  }

  /**
   * Creates a new geographic path generator.
   *
   * The default projection is the null projection. The null projection represents the identity transformation, i.e.
   * the input geometry is not projected and is instead rendered directly in raw coordinates.
   * This can be useful for fast rendering of pre-projected geometry, or for fast rendering of the equirectangular projection.
   *
   * The default context is null, which implies that the path generator will return an SVG path string.
   *
   * @param projection An (optional) current projection to be used. Typically this is one of D3’s built-in geographic projections;
   * however, any object that exposes a projection.stream function can be used, enabling the use of custom projections.
   * See D3’s transforms for more examples of arbitrary geometric transformations. Setting the projection to "null" uses the identity projection. The default  value is "null", the identity projection.
   * @param context An (optional) rendering context to be used. If a context is provided, it must at least implement the interface described by GeoContext, a subset of the CanvasRenderingContext2D API.
   * Setting the context to "null" means that the path generator will return an SVG path string representing the to be rendered object. The default is "null".
   */
  export function geoPath(projection?: GeoProjection | GeoStreamWrapper | null, context?: GeoContext | null): GeoPath;
  /**
   * Creates a new geographic path generator with the default settings.
   *
   * The default projection is the null projection. The null projection represents the identity transformation:
   * the input geometry is not projected and is instead rendered directly in raw coordinates.
   * This can be useful for fast rendering of pre-projected geometry, or for fast rendering of the equirectangular projection.
   *
   * The default context is null, which implies that the path generator will return an SVG path string.
   *
   * The generic corresponds to the type of the DatumObject which will be passed into the geo path generator for rendering
   *
   * @param projection An (optional) current projection to be used. Typically this is one of D3’s built-in geographic projections;
   * however, any object that exposes a projection.stream function can be used, enabling the use of custom projections.
   * See D3’s transforms for more examples of arbitrary geometric transformations. Setting the projection to "null" uses the identity projection. The default  value is "null", the identity projection.
   * @param context An (optional) rendering context to be used. If a context is provided, it must at least implement the interface described by GeoContext, a subset of the CanvasRenderingContext2D API.
   * Setting the context to "null" means that the path generator will return an SVG path string representing the to be rendered object. The default is "null".
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function geoPath<DatumObject extends GeoPermissibleObjects>(
    projection?: GeoProjection | GeoStreamWrapper | null,
    context?: GeoContext | null,
  ): GeoPath<any, DatumObject>;
  /**
   * Creates a new geographic path generator with the default settings.
   *
   * The default projection is the null projection. The null projection represents the identity transformation:
   * the input geometry is not projected and is instead rendered directly in raw coordinates.
   * This can be useful for fast rendering of pre-projected geometry, or for fast rendering of the equirectangular projection.
   *
   * The default context is null, which implies that the path generator will return an SVG path string.
   *
   * The first generic corresponds to the "this"-context within which the geo path generator will be invoked.
   * This could be e.g. the DOMElement bound to "this" when using selection.attr("d", ...) with the path generator.
   *
   * The second generic corresponds to the type of the DatumObject which will be passed into the geo path generator for rendering.
   *
   * @param projection An (optional) current projection to be used. Typically this is one of D3’s built-in geographic projections;
   * however, any object that exposes a projection.stream function can be used, enabling the use of custom projections.
   * See D3’s transforms for more examples of arbitrary geometric transformations. Setting the projection to "null" uses the identity projection. The default  value is "null", the identity projection.
   * @param context An (optional) rendering context to be used. If a context is provided, it must at least implement the interface described by GeoContext, a subset of the CanvasRenderingContext2D API.
   * Setting the context to "null" means that the path generator will return an SVG path string representing the to be rendered object. The default is "null".
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function geoPath<This, DatumObject extends GeoPermissibleObjects>(
    projection?: GeoProjection | GeoStreamWrapper | null,
    context?: GeoContext | null,
  ): GeoPath<This, DatumObject>;

  // geoProjection ==========================================================

  /**
   * Constructs a new projection from the specified raw projection, project.
   * The project function takes the longitude and latitude of a given point in radians,
   * often referred to as lambda (λ) and phi (φ), and returns a two-element array [x, y] representing its unit projection.
   * The project function does not need to scale or translate the point, as these are applied automatically by projection.scale, projection.translate, and projection.center.
   * Likewise, the project function does not need to perform any spherical rotation, as projection.rotate is applied prior to projection.
   *
   * If the project function exposes an invert method, the returned projection will also expose projection.invert.
   */
  export function geoProjection(project: GeoRawProjection): GeoProjection;

  // geoProjectionMutator ====================================================

  /**
   * Constructs a new projection from the specified raw projection factory and returns a mutate function to call whenever the raw projection changes.
   * The factory must return a raw projection. The returned mutate function returns the wrapped projection.
   *
   * When creating a mutable projection, the mutate function is typically not exposed.
   */
  export function geoProjectionMutator(factory: (...args: any[]) => GeoRawProjection): () => GeoProjection;

  // Pre-Defined Projections and Raw Projections =============================

  // Azimuthal Projections ---------------------------------------------------

  /**
   * The azimuthal equal-area projection.
   */
  export function geoAzimuthalEqualArea(): GeoProjection;

  /**
   * The raw azimuthal equal-area projection.
   */
  export function geoAzimuthalEqualAreaRaw(): GeoRawProjection;

  /**
   * The azimuthal equidistant projection.
   */
  export function geoAzimuthalEquidistant(): GeoProjection;
  /**
   * The raw azimuthal equidistant projection.
   */
  export function geoAzimuthalEquidistantRaw(): GeoRawProjection;

  /**
   * The gnomonic projection.
   */
  export function geoGnomonic(): GeoProjection;

  /**
   * The raw gnomonic projection.
   */
  export function geoGnomonicRaw(): GeoRawProjection;

  /**
   * The orthographic projection.
   */
  export function geoOrthographic(): GeoProjection;

  /**
   * The raw orthographic projection.
   */
  export function geoOrthographicRaw(): GeoRawProjection;

  /**
   * The stereographic projection.
   */
  export function geoStereographic(): GeoProjection;

  /**
   * The raw stereographic projection.
   */
  export function geoStereographicRaw(): GeoRawProjection;

  /**
   * The Equal Eartch projection, by Bojan Šavrič et al., 2018.
   */
  export function geoEqualEarth(): GeoProjection;

  /**
   * The raw Equal Earth projection, by Bojan Šavrič et al., 2018.
   */
  export function geoEqualEarthRaw(): GeoRawProjection;

  // Composite Projections ---------------------------------------------------

  /**
   * A U.S.-centric composite projection of three d3.geoConicEqualArea projections: d3.geoAlbers is used for the lower forty-eight states,
   * and separate conic equal-area projections are used for Alaska and Hawaii. Note that the scale for Alaska is diminished: it is projected at 0.35× its true relative area.
   *
   * Composite consist of several projections that are composed into a single display. The constituent projections have fixed clip, center and rotation,
   * and thus composite projections do not support projection.center, projection.rotate, projection.clipAngle, or projection.clipExtent.
   */
  export function geoAlbersUsa(): GeoProjection;

  // Conic Projections -------------------------------------------------------

  /**
   * The Albers’ equal area-conic projection. This is a U.S.-centric configuration of d3.geoConicEqualArea.
   */
  export function geoAlbers(): GeoConicProjection;

  /**
   * The conic conformal projection. The parallels default to [30°, 30°] resulting in flat top.
   */
  export function geoConicConformal(): GeoConicProjection;

  /**
   * The raw conic conformal projection.
   */
  export function geoConicConformalRaw(phi0: number, phi1: number): GeoRawProjection;

  /**
   * The Albers’ equal-area conic projection.
   */
  export function geoConicEqualArea(): GeoConicProjection;

  /**
   * The raw Albers’ equal-area conic projection.
   */
  export function geoConicEqualAreaRaw(phi0: number, phi1: number): GeoRawProjection;

  /**
   * The conic equidistant projection.
   */
  export function geoConicEquidistant(): GeoConicProjection;

  /**
   * The raw conic equidistant projection.
   */
  export function geoConicEquidistantRaw(phi0: number, phi1: number): GeoRawProjection;

  // Cylindrical Projections ------------------------------------------------

  /**
   * The equirectangular (plate carrée) projection.
   */
  export function geoEquirectangular(): GeoProjection;

  /**
   * The raw equirectangular (plate carrée) projection.
   */
  export function geoEquirectangularRaw(): GeoRawProjection;

  /**
   * The spherical Mercator projection.
   * Defines a default projection.clipExtent such that the world is projected to a square, clipped to approximately ±85° latitude.
   */
  export function geoMercator(): GeoProjection;
  /**
   * The raw spherical Mercator projection.
   */
  export function geoMercatorRaw(): GeoRawProjection;

  /**
   * The transverse spherical Mercator projection.
   * Defines a default projection.clipExtent such that the world is projected to a square, clipped to approximately ±85° latitude.
   */
  export function geoTransverseMercator(): GeoProjection;

  /**
   * The raw transverse spherical Mercator projection.
   */
  export function geoTransverseMercatorRaw(): GeoRawProjection;

  /**
   * The Natural Earth projection is a pseudocylindrical projection designed by Tom Patterson. It is neither conformal nor equal-area, but appealing to the eye for small-scale maps of the whole world.
   */
  export function geoNaturalEarth1(): GeoProjection;

  /**
   * The raw pseudo-cylindircal Natural Earth projection.
   */
  export function geoNaturalEarth1Raw(): GeoRawProjection;

  // ----------------------------------------------------------------------
  // Projection Transforms
  // ----------------------------------------------------------------------

  // geoTransform(...) ====================================================

  /**
   * A Prototype interface which serves as a template for the implementation of a geometric transform using geoTransform(...)
   * It serves as a reference for the custom methods which can be passed into geoTransform as argument to crete a generalized
   * transform projection.
   */
  export interface GeoTransformPrototype {
    /**
     * Indicates the end of a line or ring. Within a polygon, indicates the end of a ring.
     * Unlike GeoJSON, the redundant closing coordinate of a ring is not indicated via point, and instead is implied via lineEnd within a polygon.
     */
    lineEnd?(this: this & { stream: GeoStream }): void;
    /**
     * Indicates the start of a line or ring. Within a polygon, indicates the start of a ring. The first ring of a polygon is the exterior ring, and is typically clockwise.
     * Any subsequent rings indicate holes in the polygon, and are typically counterclockwise.
     */
    lineStart?(this: this & { stream: GeoStream }): void;
    /**
     * Indicates a point with the specified coordinates x and y (and optionally z). The coordinate system is unspecified and implementation-dependent;
     * for example, projection streams require spherical coordinates in degrees as input. Outside the context of a polygon or line,
     * a point indicates a point geometry object (Point or MultiPoint). Within a line or polygon ring, the point indicates a control point.
     *
     * @param x x-coordinate of point.
     * @param y y-coordinate of point.
     * @param z Optional z-coordinate of point.
     */
    point?(this: this & { stream: GeoStream }, x: number, y: number, z?: number): void;
    /**
     * Indicates the end of a polygon.
     */
    polygonEnd?(this: this & { stream: GeoStream }): void;
    /**
     * Indicates the start of a polygon. The first line of a polygon indicates the exterior ring, and any subsequent lines indicate interior holes.
     */
    polygonStart?(this: this & { stream: GeoStream }): void;
    /**
     * Indicates the sphere (the globe; the unit sphere centered at ⟨0,0,0⟩).
     */
    sphere?(this: this & { stream: GeoStream }): void;
  }

  // TODO: Review whether GeoStreamWrapper should be included into return value union type, i.e. ({ stream: (s: GeoStream) => (T & GeoStream & GeoStreamWrapper)})?
  // It probably should be omitted for purposes of this API. The stream method added to (T & GeoStream) is more of a private member used internally to
  // implement the Transform factory

  /**
   * Defines an arbitrary transform using the methods defined on the specified methods object.
   * Any undefined methods will use pass-through methods that propagate inputs to the output stream.
   *
   * @param methods An object with custom method implementations, which are used to create a transform projection.
   */
  export function geoTransform<T extends GeoTransformPrototype>(methods: T): { stream(s: GeoStream): T & GeoStream };

  // geoIdentity() =================================================================

  /**
   * @deprecated Misspelled name. Use GeoIdentityTransform.
   */
  export type GeoIdentityTranform = GeoIdentityTransform;

  /**
   * Geo Identity Transform
   */
  export interface GeoIdentityTransform extends GeoStreamWrapper {
    /**
     * Returns a new array [x, y] (typically in pixels) representing the projected point of the given point.
     * The point must be specified as a two-element array [longitude, latitude] in degrees.
     * May return null if the specified point has no defined projected position, such as when the point is outside the clipping bounds of the projection.
     *
     * @param point A point specified as a two-dimensional array [longitude, latitude] in degrees.
     */
    (point: [number, number]): [number, number] | null;

    /**
     * Returns a new array [longitude, latitude] in degrees representing the unprojected point of the given projected point.
     * May return null if the specified point has no defined projected position, such as when the point is outside the clipping bounds of the projection.
     *
     * @param point The projected point, specified as a two-element array [x, y] (typically in pixels).
     */
    invert(point: [number, number]): [number, number] | null;

    /**
     * Returns the current cartesian clipping function.
     * Post-clipping occurs on the plane, when a projection is bounded to a certain extent such as a rectangle.
     */
    postclip(): (stream: GeoStream) => GeoStream;
    /**
     * Sets the projection’s cartesian clipping to the specified function and returns the projection.
     *
     * @param postclip A cartesian clipping function. Clipping functions are implemented as transformations of a projection stream.
     * Post-clipping operates on planar coordinates, in pixels.
     */
    postclip(postclip: (stream: GeoStream) => GeoStream): this;

    /**
     * Returns the current scale factor.
     *
     * The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.
     */
    scale(): number;
    /**
     * Sets the projection’s scale factor to the specified value and returns the projection.
     * The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.
     *
     * @param scale Scale factor to be used for the projection.
     */
    scale(scale: number): this;

    /**
     * Returns the current translation offset.
     * The translation offset determines the pixel coordinates of the projection’s center.
     */
    translate(): [number, number];
    /**
     * Sets the projection’s translation offset to the specified two-element array [tx, ty] and returns the projection.
     * The translation offset determines the pixel coordinates of the projection’s center.
     *
     * @param point A two-element array [tx, ty] specifying the translation offset.
     */
    translate(point: [number, number]): this;

    /**
     * Returns the projection’s current angle, which defaults to 0°.
     */
    angle(): number;
    /**
     * Sets the projection’s post-projection planar rotation angle to the specified angle in degrees and returns the projection.
     * @param angle The new rotation angle of the projection.
     */
    angle(angle: number): this;

    /**
     * Sets the projection’s scale and translate to fit the specified GeoJSON object in the center of the given extent.
     * The extent is specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left side of the bounding box, y₀ is the top, x₁ is the right and y₁ is the bottom. Returns the projection.
     */
    fitExtent(
      extent: [[number, number], [number, number]],
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;

    /**
     * A convenience method for projection.fitExtent where the top-left corner of the extent is [0, 0].
     */
    fitSize(
      size: [number, number],
      object: ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects | ExtendedGeometryCollection,
    ): this;

    /**
     * Returns the current viewport clip extent which defaults to null.
     */
    clipExtent(): [[number, number], [number, number]] | null;
    /**
     * Sets the projection’s viewport clip extent to the specified bounds in pixels and returns the projection.
     * The extent bounds are specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left-side of the viewport, y₀ is the top, x₁ is the right and y₁ is the bottom.
     * If extent is null, no viewport clipping is performed.
     */
    clipExtent(extent: null | [[number, number], [number, number]]): this;

    /**
     * Returns true if x-reflection is enabled, which defaults to false.
     */
    reflectX(): boolean;
    /**
     * Sets whether or not the x-dimension is reflected (negated) in the output.
     *
     * @param reflect true = reflect x-dimension, false = do not reflect x-dimension.
     */
    reflectX(reflect: boolean): this;

    /**
     * Returns true if y-reflection is enabled, which defaults to false.
     */
    reflectY(): boolean;
    /**
     * Sets whether or not the y-dimension is reflected (negated) in the output.
     *
     * This is especially useful for transforming from standard spatial reference systems,
     * which treat positive y as pointing up, to display coordinate systems such as Canvas and SVG,
     * which treat positive y as pointing down.
     *
     * @param reflect true = reflect y-dimension, false = do not reflect y-dimension.
     */
    reflectY(reflect: boolean): this;
  }

  /**
   * Returns the identity transform which can be used to scale, translate and clip planar geometry.
   */
  export function geoIdentity(): GeoIdentityTransform;

  // ----------------------------------------------------------------------
  // Clipping Functions
  // ----------------------------------------------------------------------

  /**
   * A clipping function transforming a stream such that geometries (lines or polygons) that cross the antimeridian line are cut in two, one on each side.
   * Typically used for pre-clipping.
   */
  export function geoClipAntimeridian(stream: GeoStream): GeoStream;

  /**
   * Generates a clipping function transforming a stream such that geometries are bounded by a small circle of radius angle around the projection’s center.
   * Typically used for pre-clipping.
   *
   * @param angle A clipping angle.
   */
  export function geoClipCircle(angle: number): (stream: GeoStream) => GeoStream;

  /**
   * Generates a clipping function transforming a stream such that geometries are bounded by a rectangle of coordinates [[x0, y0], [x1, y1]].
   * Typically used for post-clipping.
   *
   * @param x0 x0 coordinate.
   * @param y0 y0 coordinate.
   * @param x1 x1 coordinate.
   * @param y1 y1 coordinate.
   */
  export function geoClipRectangle(x0: number, y0: number, x1: number, y1: number): (stream: GeoStream) => GeoStream;
}

declare module 'd3-hierarchy' {
  // Last module patch version validated against: 3.1.2

  // -----------------------------------------------------------------------
  // Hierarchy
  // -----------------------------------------------------------------------

  export interface HierarchyLink<Datum> {
    /**
     * The source of the link.
     */
    source: HierarchyNode<Datum>;

    /**
     * The target of the link.
     */
    target: HierarchyNode<Datum>;
  }

  export interface HierarchyNode<Datum> {
    new (data: Datum): this;

    /**
     * The associated data, as specified to the constructor.
     */
    data: Datum;

    /**
     * Zero for the root node, and increasing by one for each descendant generation.
     */
    readonly depth: number;

    /**
     * Zero for leaf nodes, and the greatest distance from any descendant leaf for internal nodes.
     */
    readonly height: number;

    /**
     * The parent node, or null for the root node.
     */
    parent: this | null;

    /**
     * An array of child nodes, if any; undefined for leaf nodes.
     */
    children?: this[] | undefined;

    /**
     * Aggregated numeric value as calculated by `sum(value)` or `count()`, if previously invoked.
     */
    readonly value?: number | undefined;

    /**
     * Optional node id string set by `StratifyOperator`, if hierarchical data was created from tabular data using stratify().
     */
    readonly id?: string | undefined;

    /**
     * The x position of this node. Set after a tree has been laid out by `tree` or `cluster`.
     *
     * ```
     * const root = d3.hierarchy(datum);
     * const treeLayout = d3.tree();
     * treeLayout(root);
     * // x and y are now set on root and its descendants
     * ```
     */
    x?: number | undefined;

    /**
     * The y position of this node. Set after a tree has been laid out by `tree` or `cluster`.
     *
     * ```
     * const root = d3.hierarchy(datum);
     * const treeLayout = d3.tree();
     * treeLayout(root);
     * // x and y are now set on root and its descendants
     * ```
     */
    y?: number | undefined;

    /**
     * Returns the array of ancestors nodes, starting with this node, then followed by each parent up to the root.
     */
    ancestors(): this[];

    /**
     * Returns the array of descendant nodes, starting with this node, then followed by each child in topological order.
     */
    descendants(): this[];

    /**
     * Returns the array of leaf nodes in traversal order; leaves are nodes with no children.
     */
    leaves(): this[];

    /**
     * Returns the first node in the hierarchy from this node for which the specified filter returns a truthy value. undefined if no such node is found.
     * @param filter Filter.
     */
    find(filter: (node: this) => boolean): this | undefined;

    /**
     * Returns the shortest path through the hierarchy from this node to the specified target node.
     * The path starts at this node, ascends to the least common ancestor of this node and the target node, and then descends to the target node.
     *
     * @param target The target node.
     */
    path(target: this): this[];

    /**
     * Returns an array of links for this node, where each link is an object that defines source and target properties.
     * The source of each link is the parent node, and the target is a child node.
     */
    links(): Array<HierarchyLink<Datum>>;

    /**
     * Evaluates the specified value function for this node and each descendant in post-order traversal, and returns this node.
     * The `node.value` property of each node is set to the numeric value returned by the specified function plus the combined value of all descendants.
     *
     * @param value The value function is passed the node’s data, and must return a non-negative number.
     */
    sum(value: (d: Datum) => number): this;

    /**
     * Computes the number of leaves under this node and assigns it to `node.value`, and similarly for every descendant of node.
     * If this node is a leaf, its count is one. Returns this node.
     */
    count(): this;

    /**
     * Sorts the children of this node, if any, and each of this node’s descendants’ children,
     * in pre-order traversal using the specified compare function, and returns this node.
     *
     * @param compare The compare function is passed two nodes a and b to compare.
     * If a should be before b, the function must return a value less than zero;
     * if b should be before a, the function must return a value greater than zero;
     * otherwise, the relative order of a and b are not specified. See `array.sort` for more.
     */
    sort(compare: (a: this, b: this) => number): this;

    /**
     * Returns an iterator over the node’s descendants in breadth-first order.
     */
    [Symbol.iterator](): Iterator<this>;

    /**
     * Invokes the specified function for node and each descendant in breadth-first order,
     * such that a given node is only visited if all nodes of lesser depth have already been visited,
     * as well as all preceding nodes of the same depth.
     *
     * @param func The specified function is passed the current descendant, the zero-based traversal index, and this node.
     * @param that If that is specified, it is the this context of the callback.
     */
    each<T = undefined>(func: (this: T, node: this, index: number, thisNode: this) => void, that?: T): this;

    /**
     * Invokes the specified function for node and each descendant in post-order traversal,
     * such that a given node is only visited after all of its descendants have already been visited.
     *
     * @param func The specified function is passed the current descendant, the zero-based traversal index, and this node.
     * @param that If that is specified, it is the this context of the callback.
     */
    eachAfter<T = undefined>(func: (this: T, node: this, index: number, thisNode: this) => void, that?: T): this;

    /**
     * Invokes the specified function for node and each descendant in pre-order traversal,
     * such that a given node is only visited after all of its ancestors have already been visited.
     *
     * @param func The specified function is passed the current descendant, the zero-based traversal index, and this node.
     * @param that If that is specified, it is the this context of the callback.
     */
    eachBefore<T = undefined>(func: (this: T, node: this, index: number, thisNode: this) => void, that?: T): this;

    /**
     * Return a deep copy of the subtree starting at this node. The returned deep copy shares the same data, however.
     * The returned node is the root of a new tree; the returned node’s parent is always null and its depth is always zero.
     */
    copy(): this;
  }

  /**
   * Constructs a root node from the specified hierarchical data.
   *
   * @param data The root specified data.
   * If *data* is a Map, it is implicitly converted to the entry [undefined, *data*],
   * and the children accessor instead defaults to `(d) => Array.isArray(d) ? d[1] : null;`.
   * @param children The specified children accessor function is invoked for each datum, starting with the root data,
   * and must return an iterable of data representing the children, if any.
   * If children is not specified, it defaults to: `(d) => d.children`.
   */
  export function hierarchy<Datum>(
    data: Datum,
    children?: (d: Datum) => Iterable<Datum> | null | undefined,
  ): HierarchyNode<Datum>;

  // -----------------------------------------------------------------------
  // Stratify
  // -----------------------------------------------------------------------

  export interface StratifyOperator<Datum> {
    /**
     * Generates a new hierarchy from the specified tabular data. Each node in the returned object has a shallow copy of the properties
     * from the corresponding data object, excluding the following reserved properties: id, parentId, children.
     *
     * @param data The root specified data.
     * @throws Error on missing id, ambiguous id, cycle, multiple roots or no root.
     */
    (data: Datum[]): HierarchyNode<Datum>;

    /**
     * Returns the current id accessor, which defaults to: `(d) => d.id`.
     */
    id(): (d: Datum, i: number, data: Datum[]) => string | null | '' | undefined;
    /**
     * Sets the id accessor to the given function.
     * The id accessor is invoked for each element in the input data passed to the stratify operator.
     * The returned string is then used to identify the node's relationships in conjunction with the parent id.
     * For leaf nodes, the id may be undefined, null or the empty string; otherwise, the id must be unique.
     *
     * @param id The id accessor.
     */
    id(id: (d: Datum, i: number, data: Datum[]) => string | null | '' | undefined): this;

    /**
     * Returns the current parent id accessor, which defaults to: `(d) => d.parentId`.
     */
    parentId(): (d: Datum, i: number, data: Datum[]) => string | null | '' | undefined;
    /**
     * Sets the parent id accessor to the given function.
     * The parent id accessor is invoked for each element in the input data passed to the stratify operator.
     * The returned string is then used to identify the node's relationships in conjunction with the id.
     * For the root node, the parent id should be undefined, null or the empty string.
     * There must be exactly one root node in the input data, and no circular relationships.
     *
     * @param parentId The parent id accessor.
     */
    parentId(parentId: (d: Datum, i: number, data: Datum[]) => string | null | '' | undefined): this;

    /**
     * Returns the current path accessor, which defaults to undefined.
     */
    path(): ((d: Datum, i: number, data: Datum[]) => string) | null | undefined;
    /**
     * If path is specified, sets the path accessor to the given function and returns this stratify operator.
     * Otherwise, returns the current path accessor, which defaults to undefined.
     * If a path accessor is set, the id and parentId arguments are ignored,
     * and a unix-like hierarchy is computed on the slash-delimited strings
     * returned by the path accessor, imputing parent nodes and ids as necessary.
     *
     * @param path The path accessor.
     */
    path(path: ((d: Datum, i: number, data: Datum[]) => string) | null | undefined): this;
  }

  /**
   * Constructs a new stratify operator with the default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function stratify<Datum>(): StratifyOperator<Datum>;

  // -----------------------------------------------------------------------
  // Cluster
  // -----------------------------------------------------------------------

  export interface HierarchyPointLink<Datum> {
    /**
     * The source of the link.
     */
    source: HierarchyPointNode<Datum>;

    /**
     * The target of the link.
     */
    target: HierarchyPointNode<Datum>;
  }

  export interface HierarchyPointNode<Datum> extends HierarchyNode<Datum> {
    /**
     * The x-coordinate of the node.
     */
    x: number;

    /**
     * The y-coordinate of the node.
     */
    y: number;

    /**
     * Returns an array of links for this node, where each link is an object that defines source and target properties.
     * The source of each link is the parent node, and the target is a child node.
     */
    links(): Array<HierarchyPointLink<Datum>>;
  }

  export interface ClusterLayout<Datum> {
    /**
     * Lays out the specified root hierarchy.
     * You may want to call `root.sort` before passing the hierarchy to the cluster layout.
     *
     * @param root The specified root hierarchy.
     */
    (root: HierarchyNode<Datum>): HierarchyPointNode<Datum>;

    /**
     * Returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a node size will be used instead.
     */
    size(): [number, number] | null;
    /**
     * Sets this cluster layout’s size to the specified [width, height] array and returns the cluster layout.
     * The size represent an arbitrary coordinate system; for example, to produce a radial layout,
     * a size of [360, radius] corresponds to a breadth of 360° and a depth of radius.
     *
     * @param size The specified two-element size array.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current node size, which defaults to null. A node size of null indicates that a layout size will be used instead.
     */
    nodeSize(): [number, number] | null;
    /**
     * Sets this cluster layout’s node size to the specified [width, height] array and returns this cluster layout.
     * When a node size is specified, the root node is always positioned at <0, 0>.
     *
     * @param size The specified two-element size array.
     */
    nodeSize(size: [number, number]): this;

    /**
     * Returns the current separation accessor, which defaults to: `(a, b) => a.parent == b.parent ? 1 : 2`.
     */
    separation(): (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number;
    /**
     * Sets the separation accessor to the specified function and returns this cluster layout.
     * The separation accessor is used to separate neighboring leaves.
     *
     * @param separation The separation function is passed two leaves a and b, and must return the desired separation.
     * The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.
     */
    separation(separation: (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number): this;
  }

  /**
   * Creates a new cluster layout with default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function cluster<Datum>(): ClusterLayout<Datum>;

  // -----------------------------------------------------------------------
  // Tree
  // -----------------------------------------------------------------------

  export interface TreeLayout<Datum> {
    /**
     * Lays out the specified root hierarchy.
     * You may want to call `root.sort` before passing the hierarchy to the tree layout.
     *
     * @param root The specified root hierarchy.
     */
    (root: HierarchyNode<Datum>): HierarchyPointNode<Datum>;

    /**
     * Returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a node size will be used instead.
     */
    size(): [number, number] | null;
    /**
     * Sets this tree layout’s size to the specified [width, height] array and returns the tree layout.
     * The size represent an arbitrary coordinate system; for example, to produce a radial layout,
     * a size of [360, radius] corresponds to a breadth of 360° and a depth of radius.
     *
     * @param size The specified two-element size array.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current node size, which defaults to null. A node size of null indicates that a layout size will be used instead.
     */
    nodeSize(): [number, number] | null;
    /**
     * Sets this tree layout’s node size to the specified [width, height] array and returns this tree layout.
     * When a node size is specified, the root node is always positioned at <0, 0>.
     *
     * @param size The specified two-element size array.
     */
    nodeSize(size: [number, number]): this;

    /**
     * Returns the current separation accessor, which defaults to: `(a, b) => a.parent == b.parent ? 1 : 2`.
     */
    separation(): (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number;
    /**
     * Sets the separation accessor to the specified function and returns this tree layout.
     * The separation accessor is used to separate neighboring nodes.
     *
     * @param separation The separation function is passed two nodes a and b, and must return the desired separation.
     * The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.
     */
    separation(separation: (a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => number): this;
  }

  /**
   * Creates a new tree layout with default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function tree<Datum>(): TreeLayout<Datum>;

  // -----------------------------------------------------------------------
  // Treemap
  // -----------------------------------------------------------------------

  export interface HierarchyRectangularLink<Datum> {
    /**
     * The source of the link.
     */
    source: HierarchyRectangularNode<Datum>;

    /**
     * The target of the link.
     */
    target: HierarchyRectangularNode<Datum>;
  }

  export interface HierarchyRectangularNode<Datum> extends HierarchyNode<Datum> {
    /**
     * The left edge of the rectangle.
     */
    x0: number;

    /**
     * The top edge of the rectangle
     */
    y0: number;

    /**
     * The right edge of the rectangle.
     */
    x1: number;

    /**
     * The bottom edge of the rectangle.
     */
    y1: number;

    /**
     * Returns an array of links for this node, where each link is an object that defines source and target properties.
     * The source of each link is the parent node, and the target is a child node.
     */
    links(): Array<HierarchyRectangularLink<Datum>>;
  }

  export interface TreemapLayout<Datum> {
    /**
     * Lays out the specified root hierarchy.
     * You must call `root.sum` before passing the hierarchy to the treemap layout.
     * You probably also want to call `root.sort` to order the hierarchy before computing the layout.
     *
     * @param root The specified root hierarchy.
     */
    (root: HierarchyNode<Datum>): HierarchyRectangularNode<Datum>;

    /**
     * Returns the current tiling method, which defaults to `d3.treemapSquarify` with the golden ratio.
     */
    tile(): (node: HierarchyRectangularNode<Datum>, x0: number, y0: number, x1: number, y1: number) => void;
    /**
     * Sets the tiling method to the specified function and returns this treemap layout.
     *
     * @param tile The specified tiling function.
     */
    tile(tile: (node: HierarchyRectangularNode<Datum>, x0: number, y0: number, x1: number, y1: number) => void): this;

    /**
     * Returns the current size, which defaults to [1, 1].
     */
    size(): [number, number];
    /**
     * Sets this treemap layout’s size to the specified [width, height] array and returns this treemap layout.
     *
     * @param size The specified two-element size array.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current rounding state, which defaults to false.
     */
    round(): boolean;
    /**
     * Enables or disables rounding according to the given boolean and returns this treemap layout.
     *
     * @param round The specified boolean flag.
     */
    round(round: boolean): this;

    /**
     * Returns the current inner padding function.
     */
    padding(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the inner and outer padding to the specified number and returns this treemap layout.
     *
     * @param padding The specified padding value.
     */
    padding(padding: number): this;
    /**
     * Sets the inner and outer padding to the specified function and returns this treemap layout.
     *
     * @param padding The specified padding function.
     */
    padding(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current inner padding function, which defaults to the constant zero.
     */
    paddingInner(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the inner padding to the specified number and returns this treemap layout.
     * The inner padding is used to separate a node’s adjacent children.
     *
     * @param padding The specified inner padding value.
     */
    paddingInner(padding: number): this;
    /**
     * Sets the inner padding to the specified function and returns this treemap layout.
     * The function is invoked for each node with children, being passed the current node.
     * The inner padding is used to separate a node’s adjacent children.
     *
     * @param padding The specified inner padding function.
     */
    paddingInner(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current top padding function.
     */
    paddingOuter(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the top, right, bottom and left padding to the specified function and returns this treemap layout.
     *
     * @param padding The specified padding outer value.
     */
    paddingOuter(padding: number): this;
    /**
     * Sets the top, right, bottom and left padding to the specified function and returns this treemap layout.
     *
     * @param padding The specified padding outer function.
     */
    paddingOuter(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current top padding function, which defaults to the constant zero.
     */
    paddingTop(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the top padding to the specified number and returns this treemap layout.
     * The top padding is used to separate the top edge of a node from its children.
     *
     * @param padding The specified top padding value.
     */
    paddingTop(padding: number): this;
    /**
     * Sets the top padding to the specified function and returns this treemap layout.
     * The function is invoked for each node with children, being passed the current node.
     * The top padding is used to separate the top edge of a node from its children.
     *
     * @param padding The specified top padding function.
     */
    paddingTop(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current right padding function, which defaults to the constant zero.
     */
    paddingRight(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the right padding to the specified number and returns this treemap layout.
     * The right padding is used to separate the right edge of a node from its children.
     *
     * @param padding The specified right padding value.
     */
    paddingRight(padding: number): this;
    /**
     * Sets the right padding to the specified function and returns this treemap layout.
     * The function is invoked for each node with children, being passed the current node.
     * The right padding is used to separate the right edge of a node from its children.
     *
     * @param padding The specified right padding function.
     */
    paddingRight(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current bottom padding function, which defaults to the constant zero.
     */
    paddingBottom(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the bottom padding to the specified number and returns this treemap layout.
     * The bottom padding is used to separate the bottom edge of a node from its children.
     *
     * @param padding The specified bottom padding value.
     */
    paddingBottom(padding: number): this;
    /**
     * Sets the bottom padding to the specified function and returns this treemap layout.
     * The function is invoked for each node with children, being passed the current node.
     * The bottom padding is used to separate the bottom edge of a node from its children.
     *
     * @param padding The specified bottom padding function.
     */
    paddingBottom(padding: (node: HierarchyRectangularNode<Datum>) => number): this;

    /**
     * Returns the current left padding function, which defaults to the constant zero.
     */
    paddingLeft(): (node: HierarchyRectangularNode<Datum>) => number;
    /**
     * Sets the left padding to the specified number and returns this treemap layout.
     * The left padding is used to separate the left edge of a node from its children.
     *
     * @param padding The specified left padding value.
     */
    paddingLeft(padding: number): this;
    /**
     * Sets the left padding to the specified function and returns this treemap layout.
     * The function is invoked for each node with children, being passed the current node.
     * The left padding is used to separate the left edge of a node from its children.
     *
     * @param padding The specified left padding function.
     */
    paddingLeft(padding: (node: HierarchyRectangularNode<Datum>) => number): this;
  }

  /**
   * Creates a new treemap layout with default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function treemap<Datum>(): TreemapLayout<Datum>;

  // Tiling functions ------------------------------------------------------

  /**
   * Recursively partitions the specified nodes into an approximately-balanced binary tree,
   * choosing horizontal partitioning for wide rectangles and vertical partitioning for tall rectangles.
   */
  export function treemapBinary(
    node: HierarchyRectangularNode<any>,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): void;

  /**
   * Divides the rectangular area specified by x0, y0, x1, y1 horizontally according the value of each of the specified node’s children.
   * The children are positioned in order, starting with the left edge (x0) of the given rectangle.
   * If the sum of the children’s values is less than the specified node’s value (i.e., if the specified node has a non-zero internal value),
   * the remaining empty space will be positioned on the right edge (x1) of the given rectangle.
   */
  export function treemapDice(
    node: HierarchyRectangularNode<any>,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): void;

  /**
   * Divides the rectangular area specified by x0, y0, x1, y1 vertically according the value of each of the specified node’s children.
   * The children are positioned in order, starting with the top edge (y0) of the given rectangle.
   * If the sum of the children’s values is less than the specified node’s value (i.e., if the specified node has a non-zero internal value),
   * the remaining empty space will be positioned on the bottom edge (y1) of the given rectangle.
   */
  export function treemapSlice(
    node: HierarchyRectangularNode<any>,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): void;

  /**
   * If the specified node has odd depth, delegates to treemapSlice; otherwise delegates to treemapDice.
   */
  export function treemapSliceDice(
    node: HierarchyRectangularNode<any>,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): void;

  // TODO: Test Factory code
  export interface RatioSquarifyTilingFactory {
    (node: HierarchyRectangularNode<any>, x0: number, y0: number, x1: number, y1: number): void;

    /**
     * Specifies the desired aspect ratio of the generated rectangles.
     * Note that the orientation of the generated rectangles (tall or wide) is not implied by the ratio.
     * Furthermore, the rectangles ratio are not guaranteed to have the exact specified aspect ratio.
     * If not specified, the aspect ratio defaults to the golden ratio, φ = (1 + sqrt(5)) / 2, per Kong et al.
     *
     * @param ratio The specified ratio value greater than or equal to one.
     */
    ratio(ratio: number): RatioSquarifyTilingFactory;
  }

  /**
   * Implements the squarified treemap algorithm by Bruls et al., which seeks to produce rectangles of a given aspect ratio.
   */
  export const treemapSquarify: RatioSquarifyTilingFactory;

  /**
   * Like `d3.treemapSquarify`, except preserves the topology (node adjacencies) of the previous layout computed by `d3.treemapResquarify`,
   * if there is one and it used the same target aspect ratio. This tiling method is good for animating changes to treemaps because
   * it only changes node sizes and not their relative positions, thus avoiding distracting shuffling and occlusion.
   * The downside of a stable update, however, is a suboptimal layout for subsequent updates: only the first layout uses the Bruls et al. squarified algorithm.
   */
  export const treemapResquarify: RatioSquarifyTilingFactory;

  // -----------------------------------------------------------------------
  // Partition
  // -----------------------------------------------------------------------

  export interface PartitionLayout<Datum> {
    /**
     * Lays out the specified root hierarchy.
     * You must call `root.sum` before passing the hierarchy to the partition layout.
     * You probably also want to call `root.sort` to order the hierarchy before computing the layout.
     *
     * @param root The specified root hierarchy.
     */
    (root: HierarchyNode<Datum>): HierarchyRectangularNode<Datum>;

    /**
     * Returns the current size, which defaults to [1, 1].
     */
    size(): [number, number];
    /**
     * Sets this partition layout’s size to the specified [width, height] array and returns this partition layout.
     *
     * @param size The specified two-element size array.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current rounding state, which defaults to false.
     */
    round(): boolean;
    /**
     * Enables or disables rounding according to the given boolean and returns this partition layout.
     *
     * @param round The specified boolean flag.
     */
    round(round: boolean): this;

    /**
     * Returns the current padding, which defaults to zero.
     */
    padding(): number;
    /**
     * Sets the padding to the specified number and returns this partition layout.
     * The padding is used to separate a node’s adjacent children.
     *
     * @param padding The specified padding value.
     */
    padding(padding: number): this;
  }

  /**
   * Creates a new partition layout with the default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function partition<Datum>(): PartitionLayout<Datum>;

  // -----------------------------------------------------------------------
  // Pack
  // -----------------------------------------------------------------------

  export interface HierarchyCircularLink<Datum> {
    /**
     * The source of the link.
     */
    source: HierarchyCircularNode<Datum>;

    /**
     * The target of the link.
     */
    target: HierarchyCircularNode<Datum>;
  }

  export interface HierarchyCircularNode<Datum> extends HierarchyNode<Datum> {
    /**
     * The x-coordinate of the circle’s center.
     */
    x: number;

    /**
     * The y-coordinate of the circle’s center.
     */
    y: number;

    /**
     * The radius of the circle.
     */
    r: number;

    /**
     * Returns an array of links for this node, where each link is an object that defines source and target properties.
     * The source of each link is the parent node, and the target is a child node.
     */
    links(): Array<HierarchyCircularLink<Datum>>;
  }

  export interface PackLayout<Datum> {
    /**
     * Lays out the specified root hierarchy.
     * You must call `root.sum` before passing the hierarchy to the pack layout.
     * You probably also want to call `root.sort` to order the hierarchy before computing the layout.
     *
     * @param root The specified root hierarchy.
     */
    (root: HierarchyNode<Datum>): HierarchyCircularNode<Datum>;

    /**
     * Returns the current radius accessor, which defaults to null.
     */
    radius(): null | ((node: HierarchyCircularNode<Datum>) => number);
    /**
     * Sets the pack layout’s radius accessor to the specified function and returns this pack layout.
     * If the radius accessor is null, the radius of each leaf circle is derived from the leaf `node.value` (computed by `node.sum`);
     * the radii are then scaled proportionally to fit the layout size.
     * If the radius accessor is not null, the radius of each leaf circle is specified exactly by the function.
     *
     * @param radius The specified radius accessor.
     */
    radius(radius: null | ((node: HierarchyCircularNode<Datum>) => number)): this;

    /**
     * Returns the current size, which defaults to [1, 1].
     */
    size(): [number, number];
    /**
     * Sets this pack layout’s size to the specified [width, height] array and returns this pack layout.
     *
     * @param size The specified two-element size array.
     */
    size(size: [number, number]): this;

    /**
     * Returns the current padding accessor, which defaults to the constant zero.
     */
    padding(): (node: HierarchyCircularNode<Datum>) => number;
    /**
     * Sets this pack layout’s padding accessor to the specified number and returns this pack layout.
     * Returns the current padding accessor, which defaults to the constant zero.
     *
     * When siblings are packed, tangent siblings will be separated by approximately the specified padding;
     * the enclosing parent circle will also be separated from its children by approximately the specified padding.
     * If an explicit radius is not specified, the padding is approximate because a two-pass algorithm
     * is needed to fit within the layout size: the circles are first packed without padding;
     * a scaling factor is computed and applied to the specified padding; and lastly the circles are re-packed with padding.
     *
     * @param padding The specified padding value.
     */
    padding(padding: number): this;
    /**
     * Sets this pack layout’s padding accessor to the specified function and returns this pack layout.
     * Returns the current padding accessor, which defaults to the constant zero.
     *
     * When siblings are packed, tangent siblings will be separated by approximately the specified padding;
     * the enclosing parent circle will also be separated from its children by approximately the specified padding.
     * If an explicit radius is not specified, the padding is approximate because a two-pass algorithm
     * is needed to fit within the layout size: the circles are first packed without padding;
     * a scaling factor is computed and applied to the specified padding; and lastly the circles are re-packed with padding.
     *
     * @param padding The specified padding function.
     */
    padding(padding: (node: HierarchyCircularNode<Datum>) => number): this;
  }

  /**
   * Creates a new pack layout with the default settings.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function pack<Datum>(): PackLayout<Datum>;

  // -----------------------------------------------------------------------
  // Pack Siblings and Enclosure
  // -----------------------------------------------------------------------

  export interface PackRadius {
    /**
     * The radius of the circle.
     */
    r: number;

    /**
     * The x-coordinate of the circle’s center.
     */
    x?: number | undefined;

    /**
     * The y-coordinate of the circle’s center.
     */
    y?: number | undefined;
  }

  export interface PackCircle {
    /**
     * The radius of the circle.
     */
    r: number;

    /**
     * The x-coordinate of the circle’s center.
     */
    x: number;

    /**
     * The y-coordinate of the circle’s center.
     */
    y: number;
  }

  // TODO: Since packSiblings manipulates the circles array in place, technically the x and y properties
  // are optional on invocation, but will be created after execution for each entry.

  /**
   * Packs the specified array of circles, each of which must have a `circle.r` property specifying the circle’s radius.
   * The circles are positioned according to the front-chain packing algorithm by Wang et al.
   *
   * @param circles The specified array of circles to pack.
   */
  export function packSiblings<Datum extends PackRadius>(circles: Datum[]): Array<Datum & PackCircle>;

  /**
   * Computes the smallest circle that encloses the specified array of circles, each of which must have
   * a `circle.r` property specifying the circle’s radius, and `circle.x` and `circle.y` properties specifying the circle’s center.
   * The enclosing circle is computed using the Matoušek-Sharir-Welzl algorithm. (See also Apollonius’ Problem.)
   *
   * @param circles The specified array of circles to pack.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function packEnclose<Datum extends PackCircle>(circles: Datum[]): PackCircle;
}

declare module 'd3-interpolate' {
  // Last module patch version validated against: 3.0.1

  import { ColorCommonInstance } from 'd3-color';

  // ---------------------------------------------------------------------------
  // Shared Type Definitions and Interfaces
  // ---------------------------------------------------------------------------

  export interface ZoomInterpolator extends Function {
    (t: number): ZoomView;
    /**
     * Recommended duration of zoom transition in milliseconds.
     */
    duration: number;

    /**
     * Given a zoom interpolator, returns a new zoom interpolator using the specified curvature rho.
     * When rho is close to 0, the interpolator is almost linear.
     * The default curvature is sqrt(2).
     * @param rho
     */
    rho(rho: number): this;
  }

  export interface ColorGammaInterpolationFactory extends Function {
    (a: string | ColorCommonInstance, b: string | ColorCommonInstance): (t: number) => string;
    /**
     * Returns a new interpolator factory of the same type using the specified *gamma*.
     * For example, to interpolate from purple to orange with a gamma of 2.2 in RGB space: `d3.interpolateRgb.gamma(2.2)("purple", "orange")`.
     * See Eric Brasseur’s article, [Gamma error in picture scaling](https://web.archive.org/web/20160112115812/http://www.4p8.com/eric.brasseur/gamma.html), for more on gamma correction.
     */
    gamma(g: number): ColorGammaInterpolationFactory;
  }

  /**
   * Type zoomView is used to represent a numeric array with three elements.
   * In order of appearance the elements correspond to:
   * - cx: *x*-coordinate of the center of the viewport
   * - cy: *y*-coordinate of the center of the viewport
   * - width: size of the viewport
   */
  export type ZoomView = [number, number, number];

  export type TypedArray =
    | Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array;

  export type NumberArray = TypedArray | DataView;

  // ---------------------------------------------------------------------------
  // Interpolation Function Factories
  // ---------------------------------------------------------------------------

  /**
   * Returns an `null` constant interpolator.
   */
  export function interpolate(a: any, b: null): (t: number) => null;
  /**
   * Returns an boolean constant interpolator of value `b`.
   */
  export function interpolate(a: any, b: boolean): (t: number) => boolean;
  /**
   * Returns a `interpolateRgb` interpolator.
   */
  export function interpolate(a: string | ColorCommonInstance, b: ColorCommonInstance): (t: number) => string;
  /**
   * Returns a `interpolateDate` interpolator.
   */
  export function interpolate(a: Date, b: Date): (t: number) => Date;
  /**
   * Returns a `interpolateNumber` interpolator.
   */
  export function interpolate(
    a: number | { valueOf(): number },
    b: number | { valueOf(): number },
  ): (t: number) => number;
  /**
   * Returns a `interpolateNumberArray` interpolator.
   */
  export function interpolate<T extends NumberArray>(a: NumberArray | number[], b: T): (t: number) => T;
  /**
   * Returns a `interpolateString` interpolator. If `b` is a string coercible to a color use use `interpolateRgb`.
   */
  export function interpolate(a: string | { toString(): string }, b: string): (t: number) => string;
  /**
   * Returns a `interpolateArray` interpolator.
   */
  export function interpolate<U extends any[]>(a: any[], b: U): (t: number) => U;
  /**
   * Returns a `interpolateObject` interpolator.
   */
  export function interpolate<U extends object>(a: any, b: U): (t: number) => U;

  /**
   * Returns an interpolator between the two numbers `a` and `b`.
   * The returned interpolator is equivalent to: `(t) => a * (1 - t) + b * t`.
   */
  export function interpolateNumber(
    a: number | { valueOf(): number },
    b: number | { valueOf(): number },
  ): (t: number) => number;

  /**
   * Returns an interpolator between the two numbers `a` and `b`; the interpolator is similar to `interpolateNumber`,
   * except it will round the resulting value to the nearest integer.
   */
  export function interpolateRound(
    a: number | { valueOf(): number },
    b: number | { valueOf(): number },
  ): (t: number) => number;

  /**
   * Returns an interpolator between the two strings `a` and `b`.
   * The string interpolator finds numbers embedded in `a` and `b`, where each number is of the form understood by JavaScript.
   * A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.
   *
   * For each number embedded in `b`, the interpolator will attempt to find a corresponding number in `a`.
   * If a corresponding number is found, a numeric interpolator is created using `interpolateNumber`.
   * The remaining parts of the string `b` are used as a template.
   *
   * For example, if `a` is `"300 12px sans-serif"`, and `b` is `"500 36px Comic-Sans"`, two embedded numbers are found.
   * The remaining static parts (of string `b`) are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`).
   * The result of the interpolator at `t` = 0.5 is `"400 24px Comic-Sans"`.
   */
  export function interpolateString(
    a: string | { toString(): string },
    b: string | { toString(): string },
  ): (t: number) => string;

  /**
   * Returns an interpolator between the two dates `a` and `b`.
   *
   * Note: *no defensive copy* of the returned date is created; the same Date instance is returned for every evaluation of the interpolator.
   * No copy is made for performance reasons; interpolators are often part of the inner loop of animated transitions.
   */
  export function interpolateDate(a: Date, b: Date): (t: number) => Date;

  export type ArrayInterpolator<A extends any[]> = (t: number) => A;

  /**
   * Returns an interpolator between the two arrays `a` and `b`. Internally, an array template is created that is the same length in `b`.
   * For each element in `b`, if there exists a corresponding element in `a`, a generic interpolator is created for the two elements using `interpolate`.
   * If there is no such element, the static value from `b` is used in the template.
   * Then, for the given parameter `t`, the template’s embedded interpolators are evaluated. The updated array template is then returned.
   *
   * For example, if `a` is the array `[0, 1]` and `b` is the array `[1, 10, 100]`, then the result of the interpolator for `t = 0.5` is the array `[0.5, 5.5, 100]`.
   *
   * Note: *no defensive copy* of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator.
   * No copy is made for performance reasons; interpolators are often part of the inner loop of animated transitions.
   */
  export function interpolateArray<A extends any[]>(a: any[], b: A): ArrayInterpolator<A>;
  /**
   * interpolateNumberArray is called
   */
  export function interpolateArray<T extends NumberArray>(a: NumberArray | number[], b: T): (t: number) => T;

  /**
   * Returns an interpolator between the two arrays of numbers a and b.
   * Internally, an array template is created that is the same type and length as b.
   * For each element in b, if there exists a corresponding element in a, the values are directly interpolated in the array template.
   * If there is no such element, the static value from b is copied.
   * The updated array template is then returned.
   *
   * Note: For performance reasons, no defensive copy is made of the template array and the arguments a and b; modifications of these arrays may affect subsequent evaluation of the interpolator.
   */
  export function interpolateNumberArray<T extends NumberArray | number[]>(
    a: NumberArray | number[],
    b: T,
  ): (t: number) => T;

  /**
   * Returns an interpolator between the two objects `a` and `b`. Internally, an object template is created that has the same properties as `b`.
   * For each property in `b`, if there exists a corresponding property in `a`, a generic interpolator is created for the two elements using `interpolate`.
   * If there is no such property, the static value from `b` is used in the template.
   * Then, for the given parameter `t`, the template's embedded interpolators are evaluated and the updated object template is then returned.
   *
   * For example, if `a` is the object `{x: 0, y: 1}` and `b` is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for `t = 0.5` is the object `{x: 0.5, y: 5.5, z: 100}`.
   *
   * Note: *no defensive copy* of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator.
   * No copy is made for performance reasons; interpolators are often part of the inner loop of animated transitions.
   */
  export function interpolateObject<U extends object>(a: any, b: U): (t: number) => U;

  /**
   * Returns an interpolator between the two 2D CSS transforms represented by `a` and `b`.
   * Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.
   * This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).
   */
  export function interpolateTransformCss(a: string, b: string): (t: number) => string;

  /**
   * Returns an interpolator between the two 2D SVG transforms represented by `a` and `b`.
   * Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.
   * This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).
   */
  export function interpolateTransformSvg(a: string, b: string): (t: number) => string;

  /**
   * Returns an interpolator between the two views `a` and `b` of a two-dimensional plane,
   * based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf).
   * Each view is defined as an array of three numbers: *cx*, *cy* and *width*.
   * The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.
   *
   * The returned interpolator exposes a *duration* property which encodes the recommended transition duration in milliseconds.
   * This duration is based on the path length of the curved trajectory through *x,y* space.
   * If you want to a slower or faster transition, multiply this by an arbitrary scale factor (*V* as described in the original paper).
   */
  export function interpolateZoom(a: ZoomView, b: ZoomView): ZoomInterpolator;

  /**
   * Returns a discrete interpolator for the given array of values. The returned interpolator maps `t` in `[0, 1 / n)` to values[0],
   * `t` in `[1 / n, 2 / n)` to `values[1]`, and so on, where `n = values.length`. In effect, this is a lightweight quantize scale with a fixed domain of [0, 1].
   */
  export function interpolateDiscrete<T>(values: T[]): (t: number) => T;

  // Sampling ------------------------------------------------------------------

  /**
   * Returns `n` uniformly-spaced samples from the specified `interpolator`, where `n` is an integer greater than one.
   * The first sample is always at `t = 0`, and the last sample is always at `t = 1`.
   * This can be useful in generating a fixed number of samples from a given interpolator,
   * such as to derive the range of a [quantize scale](https://github.com/d3/d3-scale#quantize-scales) from a [continuous interpolator](https://github.com/d3/d3-scale#interpolateWarm).
   *
   * Caution: this method will not work with interpolators that do not return defensive copies of their output,
   * such as `d3.interpolateArray`, `d3.interpolateDate` and `d3.interpolateObject`. For those interpolators, you must wrap the interpolator and create a copy for each returned value.
   */
  export function quantize<T>(interpolator: (t: number) => T, n: number): T[];

  // Color Spaces

  /**
   * Returns an RGB color space interpolator between the two colors `a` and `b` with a configurable gamma. If the gamma is not specified, it defaults to 1.0.
   * The colors `a` and `b` need not be in RGB; they will be converted to RGB using [`d3.rgb`](https://github.com/d3/d3-color#rgb). The return value of the interpolator is an RGB string.
   */
  export const interpolateRgb: ColorGammaInterpolationFactory;

  /**
   * Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to RGB color space.
   * Implicit control points are generated such that the interpolator returns `colors[0]` at `t = 0` and `colors[colors.length - 1]` at `t = 1`.
   * Opacity interpolation is not currently supported. See also `d3.interpolateBasis`, and see [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) for examples.
   */
  export function interpolateRgbBasis(colors: Array<string | ColorCommonInstance>): (t: number) => string;

  /**
   * Returns a uniform nonrational B-spline interpolator through the specified array of colors, which are converted to RGB color space.
   * The control points are implicitly repeated such that the resulting spline has cyclical C² continuity when repeated around `t` in [0,1];
   * this is useful, for example, to create cyclical color scales. Opacity interpolation is not currently supported.
   * See also `d3.interpolateBasisClosed, and see [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) for examples.
   */
  export function interpolateRgbBasisClosed(colors: Array<string | ColorCommonInstance>): (t: number) => string;

  /**
   * Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL;
   * they will be converted to HSL using `d3.hsl`. If either color’s hue or saturation is NaN, the opposing color’s channel value is used.
   * The shortest path between hues is used. The return value of the interpolator is an RGB string.
   */
  export function interpolateHsl(
    a: string | ColorCommonInstance,
    b: string | ColorCommonInstance,
  ): (t: number) => string;

  /**
   * Like `interpolateHsl`, but does not use the shortest path between hues.
   */
  export function interpolateHslLong(
    a: string | ColorCommonInstance,
    b: string | ColorCommonInstance,
  ): (t: number) => string;

  /**
   * Returns a Lab color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in Lab;
   * they will be converted to Lab using `d3.lab`. The return value of the interpolator is an RGB string.
   */
  export function interpolateLab(
    a: string | ColorCommonInstance,
    b: string | ColorCommonInstance,
  ): (t: number) => string;

  /**
   * Returns an HCL color space interpolator between the two colors `a` and `b`. The colors `a` and `b` need not be in HCL;
   * they will be converted to HCL using `d3.hcl`. If either color’s hue or chroma is NaN, the opposing color’s channel value is used.
   * The shortest path between hues is used. The return value of the interpolator is an RGB string.
   */
  export function interpolateHcl(
    a: string | ColorCommonInstance,
    b: string | ColorCommonInstance,
  ): (t: number) => string;

  /**
   * Like `interpolateHcl`, but does not use the shortest path between hues.
   */
  export function interpolateHclLong(
    a: string | ColorCommonInstance,
    b: string | ColorCommonInstance,
  ): (t: number) => string;

  /**
   * Returns a Cubehelix color space interpolator between the two colors `a` and `b` using a configurable `gamma`.
   * If the gamma is not specified, it defaults to 1.0. The colors `a` and `b` need not be in Cubehelix;
   * they will be converted to Cubehelix using [`d3.cubehelix`](https://github.com/d3/d3-color#cubehelix).
   * If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.
   */
  export const interpolateCubehelix: ColorGammaInterpolationFactory;

  /**
   * Like `interpolateCubehelix`, but does not use the shortest path between hues.
   */
  export const interpolateCubehelixLong: ColorGammaInterpolationFactory;

  /**
   * Returns an interpolator between the two hue angles `a` and `b`. If either hue is NaN, the opposing value is used.
   * The shortest path between hues is used. The return value of the interpolator is a number in `[0, 360)`.
   */
  export function interpolateHue(a: number, b: number): (t: number) => number;

  // Splines -------------------------------------------------------------------

  /**
   * Returns a uniform nonrational B-spline interpolator through the specified array of `values`, which must be numbers.
   * Implicit control points are generated such that the interpolator returns `values[0]` at `t` = 0 and `values[values.length - 1]` at `t` = 1.
   * See also [`d3.curveBasis`](https://github.com/d3/d3-shape#curveBasis).
   */
  export function interpolateBasis(splineNodes: number[]): (t: number) => number;

  /**
   * Returns a uniform nonrational B-spline interpolator through the specified array of `values`, which must be numbers.
   * The control points are implicitly repeated such that the resulting one-dimensional spline has cyclical C² continuity when repeated around `t` in [0,1].
   * See also [`d3.curveBasisClosed`](https://github.com/d3/d3-shape#curveBasisClosed).
   */
  export function interpolateBasisClosed(splineNodes: number[]): (t: number) => number;

  // Piecewise -----------------------------------------------------------------

  /**
   * Returns a piecewise zoom interpolator, composing zoom interpolators for each adjacent pair of zoom view.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through three different zoom views: `d3.piecewise(d3.interpolateZoom, [[0, 0, 1], [0, 0, 10], [0, 0, 15]])`.
   *
   * interpolate defaults to d3.interpolate.
   */
  export function piecewise(values: ZoomView[]): ZoomInterpolator;
  /**
   * Returns a piecewise zoom interpolator, composing zoom interpolators for each adjacent pair of zoom view.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through three different zoom views: `d3.piecewise(d3.interpolateZoom, [[0, 0, 1], [0, 0, 10], [0, 0, 15]])`.
   */
  export function piecewise(
    interpolate: (a: ZoomView, b: ZoomView) => ZoomInterpolator,
    values: ZoomView[],
  ): ZoomInterpolator;

  /**
   * Returns a piecewise array interpolator, composing array interpolators for each adjacent pair of arrays.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through three different arrays: `d3.piecewise(d3.interpolateArray, [[0, 0, 1], [0, 0, 10], [0, 0, 15]])`.
   *
   * interpolate defaults to d3.interpolate.
   */
  export function piecewise<A extends any[]>(values: A[]): ArrayInterpolator<A>;
  /**
   * Returns a piecewise array interpolator, composing array interpolators for each adjacent pair of arrays.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through three different arrays: `d3.piecewise(d3.interpolateArray, [[0, 0, 1], [0, 0, 10], [0, 0, 15]])`.
   */
  export function piecewise<A extends any[]>(
    interpolate: (a: any[], b: A) => ArrayInterpolator<A>,
    values: A[],
  ): ArrayInterpolator<A>;

  /**
   * Returns a piecewise interpolator, composing interpolators for each adjacent pair of values.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through red, green and blue: `d3.piecewise(d3.interpolateRgb.gamma(2.2), ["red", "green", "blue"])`.
   *
   * interpolate defaults to d3.interpolate.
   */
  export function piecewise(values: unknown[]): (t: number) => any;
  /**
   * Returns a piecewise interpolator, composing interpolators for each adjacent pair of values.
   * The returned interpolator maps `t` in `[0, 1 / (n - 1)]` to `interpolate(values[0], values[1])`, `t` in `[1 / (n - 1), 2 / (n - 1)]` to `interpolate(values[1], values[2])`,
   * and so on, where `n = values.length`. In effect, this is a lightweight linear scale.
   * For example, to blend through red, green and blue: `d3.piecewise(d3.interpolateRgb.gamma(2.2), ["red", "green", "blue"])`.
   */
  export function piecewise<TData>(interpolate: (a: TData, b: TData) => unknown, values: TData[]): (t: number) => any;
}

declare module 'd3-path' {
  // Last module patch version validated against: 3.1.0

  /**
   * A D3 path serializer implementing CanvasPathMethods
   */
  export interface Path {
    /**
     * Move to the specified point ⟨x, y⟩. Equivalent to context.moveTo and SVG’s “moveto” command.
     *
     * @param x x-Coordinate of point to move to
     * @param y y-Coordinate of point to move to
     */
    moveTo(x: number, y: number): void;

    /**
     * Ends the current subpath and causes an automatic straight line to be drawn from the current point to the initial point of the current subpath.
     * Equivalent to context.closePath and SVG’s “closepath” command.
     */
    closePath(): void;

    /**
     * Draws a straight line from the current point to the specified point ⟨x, y⟩.
     * Equivalent to context.lineTo and SVG’s “lineto” command.
     *
     * @param x x-Coordinate of point to draw the line to
     * @param y y-Coordinate of point to draw the line to
     */
    lineTo(x: number, y: number): void;

    /**
     * Draws a quadratic Bézier segment from the current point to the specified point ⟨x, y⟩, with the specified control point ⟨cpx, cpy⟩.
     * Equivalent to context.quadraticCurveTo and SVG’s quadratic Bézier curve commands.
     *
     * @param cpx x-Coordinate of the control point for the quadratic Bézier curve
     * @param cpy y-Coordinate of the control point for the quadratic Bézier curve
     * @param x x-Coordinate of point to draw the curve to
     * @param y y-Coordinate of point to draw the curve to
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

    /**
     * Draws a cubic Bézier segment from the current point to the specified point ⟨x, y⟩, with the specified control points ⟨cpx1, cpy1⟩ and ⟨cpx2, cpy2⟩.
     * Equivalent to context.bezierCurveTo and SVG’s cubic Bézier curve commands.
     *
     * @param cpx1 x-Coordinate of the first control point for the Bézier curve
     * @param cpy1 y-Coordinate of the first control point for the Bézier curve
     * @param cpx2 x-Coordinate of the second control point for the Bézier curve
     * @param cpy2 y-Coordinate of the second control point for the Bézier curve
     * @param x x-Coordinate of point to draw the curve to
     * @param y y-Coordinate of point to draw the curve to
     */
    bezierCurveTo(cpx1: number, cpy1: number, cpx2: number, cpy2: number, x: number, y: number): void;

    /**
     * Draws a circular arc segment with the specified radius that starts tangent to the line between the current point and the specified point ⟨x1, y1⟩
     * and ends tangent to the line between the specified points ⟨x1, y1⟩ and ⟨x2, y2⟩. If the first tangent point is not equal to the current point,
     * a straight line is drawn between the current point and the first tangent point. Equivalent to context.arcTo and uses SVG’s elliptical arc curve commands.
     *
     * @param x1 x-Coordinate of the first tangent point
     * @param y1 y-Coordinate of the first tangent point
     * @param x2 x-Coordinate of the second tangent point
     * @param y2 y-Coordinate of the second tangent point
     * @param radius  Radius of the arc segment
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

    /**
     * Draws a circular arc segment with the specified center ⟨x, y⟩, radius, startAngle and endAngle. If anticlockwise is true,
     * the arc is drawn in the anticlockwise direction; otherwise, it is drawn in the clockwise direction.
     * If the current point is not equal to the starting point of the arc, a straight line is drawn from the current point to the start of the arc.
     * Equivalent to context.arc and uses SVG’s elliptical arc curve commands.
     *
     * @param x x-Coordinate of the center point of the arc segment
     * @param y y-Coordinate of the center point of the arc segment
     * @param radius Radius of the arc segment
     * @param startAngle Start angle of arc segment
     * @param endAngle End angle of arc segment
     * @param anticlockwise Flag indicating directionality (true = anti-clockwise, false = clockwise)
     */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;

    /**
     * Creates a new subpath containing just the four points ⟨x, y⟩, ⟨x + w, y⟩, ⟨x + w, y + h⟩, ⟨x, y + h⟩,
     * with those four points connected by straight lines, and then marks the subpath as closed. Equivalent to context.rect and uses SVG’s “lineto” commands.
     *
     * @param x x-Coordinate of starting point for drawing the rectangle
     * @param y y-Coordinate of starting point for drawing the rectangle
     * @param w Width of rectangle
     * @param h Height of rectangle
     */
    rect(x: number, y: number, w: number, h: number): void;

    /**
     * Returns the string representation of this path according to SVG’s path data specification.
     */
    toString(): string;
  }

  /**
   * Construct a D3 Path serializer
   */
  export function path(): Path;

  /**
   * Like {@link path}, except limits the digits after the decimal to the specified number of digits.
   * Useful for reducing the size of generated SVG path data.
   */
  export function pathRound(digits?: number): Path;
}

declare module 'd3-polygon' {
  // Last module patch version validated against: 3.0.1

  /**
   * Returns the signed area of the specified polygon. If the vertices of the polygon are in counterclockwise order
   * (assuming a coordinate system where the origin <0,0> is in the top-left corner), the returned area is positive;
   * otherwise it is negative, or zero.
   *
   * @param polygon Array of coordinates <x0, y0>, <x1, y1> and so on.
   */
  export function polygonArea(polygon: Array<[number, number]>): number;

  /**
   * Returns the centroid of the specified polygon.
   *
   * @param polygon Array of coordinates <x0, y0>, <x1, y1> and so on.
   */
  export function polygonCentroid(polygon: Array<[number, number]>): [number, number];

  /**
   * Returns the convex hull of the specified points using Andrew’s monotone chain algorithm.
   * The returned hull is represented as an array containing a subset of the input points arranged in
   * counterclockwise order. Returns null if points has fewer than three elements.
   *
   * @param points Array of coordinates <x0, y0>, <x1, y1> and so on.
   */
  export function polygonHull(points: Array<[number, number]>): Array<[number, number]> | null;

  /**
   * Returns true if and only if the specified point is inside the specified polygon.
   *
   * @param polygon Array of coordinates <x0, y0>, <x1, y1> and so on.
   * @param point Coordinates of point <x, y>.
   */
  export function polygonContains(polygon: Array<[number, number]>, point: [number, number]): boolean;

  /**
   * Returns the length of the perimeter of the specified polygon.
   *
   * @param polygon Array of coordinates <x0, y0>, <x1, y1> and so on.
   */
  export function polygonLength(polygon: Array<[number, number]>): number;
}

declare module 'd3-quadtree' {
  // Last module patch version validated against: 3.0.1

  /**
   * Leaf node of the quadtree.
   */
  export interface QuadtreeLeaf<T> {
    /**
     * The data associated with this point, as passed to quadtree.add.
     */
    data: T;

    /**
     * The next datum in this leaf, if any.
     */
    next?: QuadtreeLeaf<T> | undefined;

    /**
     * The length property may be used to distinguish leaf nodes from internal nodes: it is undefined for leaf nodes, and 4 for internal nodes.
     */
    length?: undefined;
  }

  /**
   * Internal nodes of the quadtree are represented as four-element arrays in left-to-right, top-to-bottom order:
   *
   * 0 - the top-left quadrant, if any.
   * 1 - the top-right quadrant, if any.
   * 2 - the bottom-left quadrant, if any.
   * 3 - the bottom-right quadrant, if any.
   *
   * A child quadrant may be undefined if it is empty.
   */
  export interface QuadtreeInternalNode<T> extends Array<QuadtreeInternalNode<T> | QuadtreeLeaf<T> | undefined> {
    /**
     * The length property may be used to distinguish leaf nodes from internal nodes: it is undefined for leaf nodes, and 4 for internal nodes.
     */
    length: 4;
  }

  export interface Quadtree<T> {
    /**
     * Returns the current x-accessor, which defaults to: `x(d) => d[0]`.
     */
    x(): (d: T) => number;
    /**
     * Sets the current x-coordinate accessor and returns the quadtree.
     * The x-accessors must be consistent, returning the same value given the same input.
     *
     * @param x The x-coordinate accessor.
     */
    x(x: (d: T) => number): this;

    /**
     * Returns the current y-accessor, which defaults to: `y(d) => d[1]`.
     */
    y(): (d: T) => number;
    /**
     * Sets the current y-coordinate accessor and returns the quadtree.
     * The y-accessors must be consistent, returning the same value given the same input.
     *
     * @param y The y-coordinate accessor.
     */
    y(y: (d: T) => number): this;

    /**
     * Returns the quadtree's current extent `[[x0, y0], [x1, y1]]`,
     * where `x0` and `y0` are the inclusive lower bounds and `x1` and `y1` are the inclusive upper bounds,
     * or `undefined` if the quadtree has no extent.
     */
    extent(): [[number, number], [number, number]] | undefined;
    /**
     * Expands the quadtree to cover the specified points `[[x0, y0], [x1, y1]]` and returns the quadtree.
     * The extent may also be expanded by calling `quadtree.cover` or `quadtree.add`.
     *
     * @param extend The specified points to cover.
     */
    extent(extend: [[number, number], [number, number]]): this;

    /**
     * Expands the quadtree to cover the specified point ⟨x,y⟩, and returns the quadtree.
     * * If the quadtree’s extent already covers the specified point, this method does nothing.
     * * If the quadtree has an extent, the extent is repeatedly doubled to cover the specified point, wrapping the root node as necessary.
     * * If the quadtree is empty, the extent is initialized to the extent `[[⌊x⌋, ⌊y⌋], [⌈x⌉, ⌈y⌉]]`.
     * Rounding is necessary such that if the extent is later doubled, the boundaries of existing quadrants do not change due to floating point error.
     *
     * @param x The x-coordinate for the specified point to cover.
     * @param y The y-coordinate for the specified point to cover.
     */
    cover(x: number, y: number): this;

    /**
     * Adds the specified datum to the quadtree, deriving its coordinates ⟨x,y⟩ using the current x- and y-accessors, and returns the quadtree.
     * If the new point is outside the current extent of the quadtree, the quadtree is automatically expanded to cover the new point.
     *
     * @param datum The specified datum to add.
     */
    add(datum: T): this;

    /**
     * Adds the specified array of data to the quadtree, deriving each element’s coordinates ⟨x,y⟩ using the current x- and y-accessors, and return this quadtree.
     * This is approximately equivalent to calling quadtree.add repeatedly.
     * However, this method results in a more compact quadtree because the extent of the data is computed first before adding the data.
     *
     * @param data The specified array of data to add.
     */
    addAll(data: T[]): this;

    /**
     * Removes the specified datum to the quadtree, deriving its coordinates ⟨x,y⟩ using the current x- and y-accessors, and returns the quadtree.
     * If the specified datum does not exist in this quadtree, this method does nothing.
     *
     * @param datum The specified datum to remove.
     */
    remove(datum: T): this;

    /**
     * Removes the specified data to the quadtree, deriving their coordinates ⟨x,y⟩ using the current x- and y-accessors, and returns the quadtree.
     * If a specified datum does not exist in this quadtree, it is ignored.
     *
     * @param data The specified array of data to remove.
     */
    removeAll(data: T[]): this;

    /**
     * Returns a copy of the quadtree. All nodes in the returned quadtree are identical copies of the corresponding node in the quadtree;
     * however, any data in the quadtree is shared by reference and not copied.
     */
    copy(): Quadtree<T>;

    /**
     * Returns the root node of the quadtree.
     */
    root(): QuadtreeInternalNode<T> | QuadtreeLeaf<T>;

    /**
     * Returns an array of all data in the quadtree.
     */
    data(): T[];

    /**
     * Returns the total number of data in the quadtree.
     */
    size(): number;

    /**
     * Returns the datum closest to the position ⟨x,y⟩ with the given search radius. If radius is not specified, it defaults to infinity.
     * If there is no datum within the search area, returns undefined.
     *
     * @param x The x-coordinate for the search position.
     * @param y The y-coordinate for the search position.
     * @param radius The optional search radius.
     */
    find(x: number, y: number, radius?: number): T | undefined;

    /**
     * Visits each node in the quadtree in pre-order traversal, invoking the specified callback with arguments `node`, `x0`, `y0`, `x1`, `y1` for each node,
     * where `node` is the node being visited, ⟨x0, y0⟩ are the lower bounds of the node, and ⟨x1, y1⟩ are the upper bounds, and returns the quadtree.
     *
     * If the callback returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited.
     * This can be used to quickly visit only parts of the tree.
     * Note, however, that child quadrants are always visited in sibling order: top-left, top-right, bottom-left, bottom-right.
     * In cases such as search, visiting siblings in a specific order may be faster.
     *
     * @param callback The callback invoked for each node.
     */
    visit(
      callback: (
        node: QuadtreeInternalNode<T> | QuadtreeLeaf<T>,
        x0: number,
        y0: number,
        x1: number,
        y1: number,
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      ) => void | boolean,
    ): this;

    /**
     * Visits each node in the quadtree in post-order traversal, invoking the specified callback with arguments `node`, `x0`, `y0`, `x1`, `y1` for each node,
     * where `node` is the node being visited, ⟨x0, y0⟩ are the lower bounds of the node, and ⟨x1, y1⟩ are the upper bounds, and returns the quadtree.
     *
     * @param callback The callback invoked for each node.
     */
    visitAfter(
      callback: (
        node: QuadtreeInternalNode<T> | QuadtreeLeaf<T>,
        x0: number,
        y0: number,
        x1: number,
        y1: number,
      ) => void,
    ): this;
  }

  /**
   * Creates a new, empty quadtree with an empty extent and the default x- and y-accessors.
   * If data is specified, adds the specified array of data to the quadtree.
   */
  export function quadtree<T = [number, number]>(data?: T[]): Quadtree<T>;
  /**
   * Creates a new, empty quadtree with an empty extent and the default x- and y-accessors.
   * Adds the specified array of data to the quadtree.
   * Sets the x- and y- accessors to the specified functions before adding the specified array of data to the quadtree.
   */
  export function quadtree<T = [number, number]>(data: T[], x: (d: T) => number, y: (d: T) => number): Quadtree<T>;
}

declare module 'd3-random' {
  // Last module patch version validated against: 3.0.1

  export interface RandomNumberGenerationSource {
    /**
     * Returns the same type of function for generating random numbers but where the given random number
     * generator source is used as the source of randomness instead of Math.random.
     * This is useful when a seeded random number generator is preferable to Math.random.
     *
     * @param source Source (pseudo-)random number generator implementing the Math.random interface.
     * The given random number generator must implement the same interface as Math.random and
     * only return values in the range [0, 1).
     */
    source(source: () => number): this;
  }

  /**
   * A configurable random number generator for the uniform distribution.
   */
  export interface RandomUniform extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a uniform distribution.
     * The minimum allowed value of a returned number is min (inclusive), and the maximum is max (exclusive).
     * Min defaults to 0; if max is not specified, it defaults to 1.
     *
     * @param max The maximum allowed value of a returned number, defaults to 1.
     */
    (max?: number): () => number;
    /**
     * Returns a function for generating random numbers with a uniform distribution.
     * The minimum allowed value of a returned number is min (inclusive), and the maximum is max (exclusive).
     *
     * @param min The minimum allowed value of a returned number.
     * @param max The maximum allowed value of a returned number.
     */
    // tslint:disable-next-line:unified-signatures
    (min: number, max: number): () => number;
  }

  export const randomUniform: RandomUniform;

  /**
   * A configurable random integer generator for the uniform distribution.
   */
  export interface RandomInt extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random integers with a uniform distribution.
     * The minimum allowed value of a returned number is ⌊min⌋ (inclusive), and the maximum is ⌊max - 1⌋ (inclusive)
     * Min defaults to 0.
     *
     * @param max The maximum allowed value of a returned number.
     */
    (max: number): () => number;
    /**
     * Returns a function for generating random integers with a uniform distribution.
     * The minimum allowed value of a returned number is ⌊min⌋ (inclusive), and the maximum is ⌊max - 1⌋ (inclusive)
     *
     * @param min The minimum allowed value of a returned number.
     * @param max The maximum allowed value of a returned number.
     */
    // tslint:disable-next-line:unified-signatures
    (min: number, max: number): () => number;
  }

  export const randomInt: RandomInt;

  /**
   * A configurable random number generator for the normal (Gaussian) distribution.
   */
  export interface RandomNormal extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a normal (Gaussian) distribution.
     * The expected value of the generated numbers is mu, with the given standard deviation sigma.
     * If mu is not specified, it defaults to 0; if sigma is not specified, it defaults to 1.
     *
     * @param mu Expected value, defaults to 0.
     * @param sigma Standard deviation, defaults to 1.
     */
    (mu?: number, sigma?: number): () => number;
  }

  export const randomNormal: RandomNormal;

  /**
   * A configurable random number generator for the log-normal distribution.
   */
  export interface RandomLogNormal extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a log-normal distribution. The expected value of the random variable’s natural logarithm is mu,
     * with the given standard deviation sigma. If mu is not specified, it defaults to 0; if sigma is not specified, it defaults to 1.
     *
     * @param mu Expected value, defaults to 0.
     * @param sigma Standard deviation, defaults to 1.
     */
    (mu?: number, sigma?: number): () => number;
  }

  export const randomLogNormal: RandomLogNormal;

  /**
   * A configurable random number generator for the Bates distribution.
   */
  export interface RandomBates extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a Bates distribution with n independent variables.
     * The case of fractional n is handled as with d3.randomIrwinHall, and d3.randomBates(0) is equivalent to d3.randomUniform().
     *
     * @param n Number of independent random variables to use.
     */
    (n: number): () => number;
  }

  export const randomBates: RandomBates;

  /**
   * A configurable random number generator for the Irwin–Hall distribution.
   */
  export interface RandomIrwinHall extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with an Irwin–Hall distribution with n independent variables.
     * If the fractional part of n is non-zero, this is treated as adding d3.randomUniform() times that fractional part to the integral part.
     *
     * @param n Number of independent random variables to use.
     */
    (n: number): () => number;
  }

  export const randomIrwinHall: RandomIrwinHall;

  /**
   * A configurable random number generator for the exponential distribution.
   */
  export interface RandomExponential extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with an exponential distribution with the rate lambda;
     * equivalent to time between events in a Poisson process with a mean of 1 / lambda.
     *
     * @param lambda Expected time between events.
     */
    (lambda: number): () => number;
  }

  export const randomExponential: RandomExponential;

  /**
   * A configurable random number generator with an Pareto distribution.
   */
  export interface RandomPareto extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a Pareto distribution with the shape alpha.
     * The value alpha must be a positive value.
     *
     * @param alpha alpha
     */
    (alpha: number): () => number;
  }

  export const randomPareto: RandomPareto;

  /**
   * A configurable random 0 or 1 generator according to a Bernoulli distribution.
   */
  export interface RandomBernoulli extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating either 1 or 0 according to a Bernoulli distribution with 1 being returned with success probability p and 0 with failure probability q = 1 - p.
     * The value p is in the range [0, 1].
     *
     * @param p p
     */
    (p: number): () => number;
  }

  export const randomBernoulli: RandomBernoulli;

  /**
   * A configurable random number generator with a geometric distribution.
   */
  export interface RandomGeometric extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating numbers with a geometric distribution with success probability p.
     * The value p is in the range [0, 1].
     *
     * @param p Success probability
     */
    (p: number): () => number;
  }

  export const randomGeometric: RandomGeometric;

  /**
   * A configurable random number generator with a binomial distribution.
   */
  export interface RandomBinomial extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating numbers with a geometric distribution with success probability p.
     * The value p is in the range (0, 1].
     *
     * @param p Success probability
     */
    (p: number): () => number;
  }

  export const randomBinomial: RandomBinomial;

  /**
   * A configurable random number generator with a gamma distribution.
   */
  export interface RandomGamma extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a gamma distribution with k the shape parameter and theta the scale parameter.
     * The value k must be a positive value; if theta is not specified, it defaults to 1.
     *
     * @param k Shape parameter
     * @param theta Scale paramter
     */
    (k: number, theta?: number): () => number;
  }

  export const randomGamma: RandomGamma;

  /**
   * A configurable random number generator with a beta distribution.
   */
  export interface RandomBeta extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a beta distribution with alpha and beta shape parameters, which must both be positive.
     *
     * @param alpha Shape parameter
     * @param beta Shape paramter
     */
    (alpha: number, beta: number): () => number;
  }

  export const randomBeta: RandomBeta;

  /**
   * A configurable random number generator with one of the generalized extreme value distributions.
   */
  export interface RandomWeibull extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with one of the generalized extreme value distributions, depending on k:
     * If k is positive, the Weibull distribution with shape parameter k
     * If k is zero, the Gumbel distribution
     * If k is negative, the Fréchet distribution with shape parameter −k
     * In all three cases, a is the location parameter and b is the scale parameter.
     * If a is not specified, it defaults to 0; if b is not specified, it defaults to 1.
     *
     * @param k Shape parameter
     * @param a Location parameter
     * @param b Scale parameter
     */
    (k: number, a?: number, b?: number): () => number;
  }

  export const randomWeibull: RandomWeibull;

  /**
   * A configurable random number generator with a Cauchy distribution.
   */
  export interface RandomCauchy extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a Cauchy distribution.
     * a and b have the same meanings and default values as in d3.randomWeibull.
     *
     * @param a Location parameter
     * @param b Scale parameter
     */
    (a?: number, b?: number): () => number;
  }

  export const randomCauchy: RandomCauchy;

  /**
   * A configurable random number generator with a logistic distribution.
   */
  export interface RandomLogistic extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a logistic distribution.
     * a and b have the same meanings and default values as in d3.randomWeibull.
     *
     * @param a Location parameter
     * @param b Scale parameter
     */
    (a?: number, b?: number): () => number;
  }

  export const randomLogistic: RandomLogistic;

  /**
   * A configurable random number generator with a Poisson distribution.
   */
  export interface RandomPoisson extends RandomNumberGenerationSource {
    /**
     * Returns a function for generating random numbers with a Poisson distribution with mean lambda.
     *
     * @param lambda Mean
     */
    (lambda: number): () => number;
  }

  export const randomPoisson: RandomPoisson;

  /**
   * Returns a linear congruential generator;
   * this function can be called repeatedly to obtain pseudorandom values well-distributed on the interval [0,1) and with a long period (up to 1 billion numbers), similar to Math.random.
   * A seed can be specified as a real number in the interval [0,1) or as any integer.
   * In the latter case, only the lower 32 bits are considered.
   * Two generators instanced with the same seed generate the same sequence, allowing to create reproducible pseudo-random experiments.
   * If the seed is not specified, one is chosen using Math.random.
   *
   * @param seed A seed that is either a real number in the interval [0,1) or any integer.
   */
  export function randomLcg(seed?: number): () => number;
}

declare module 'd3-scale' {
  // Last module patch version validated against: 4.0.2

  import { CountableTimeInterval, TimeInterval } from 'd3-time';

  // -------------------------------------------------------------------------------
  // Shared Types and Interfaces
  // -------------------------------------------------------------------------------

  /**
   * An Interpolator factory returns an interpolator function.
   *
   * The first generic corresponds to the data type of the interpolation boundaries.
   * The second generic corresponds to the data type of the return type of the interpolator.
   */
  export interface InterpolatorFactory<T, U> {
    /**
     * Construct a new interpolator function, based on the provided interpolation boundaries.
     *
     * @param a Start boundary of the interpolation interval.
     * @param b End boundary of the interpolation interval.
     */
    (a: T, b: T): (t: number) => U;
  }

  export type NumberValue = number | { valueOf(): number };

  export type UnknownReturnType<Unknown, DefaultUnknown> = [Unknown] extends [never] ? DefaultUnknown : Unknown;

  /**
   * A helper interface for a continuous scale defined over a numeric domain.
   */
  export interface ScaleContinuousNumeric<Range, Output, Unknown = never> {
    /**
     * Given a value from the domain, returns the corresponding value from the range, subject to interpolation, if any.
     *
     * If the given value is outside the domain, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the range.
     *
     * Note: The interpolation function applied by the scale may change the output type from the range type as part of the interpolation.
     *
     * @param value A numeric value from the domain.
     */
    (value: NumberValue): Output | Unknown;

    /**
     * Given a value from the range, returns the corresponding value from the domain. Inversion is useful for interaction,
     * say to determine the data value corresponding to the position of the mouse.
     *
     * If the given value is outside the range, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the domain.
     *
     * IMPORTANT: This method is only supported if the range is numeric. If the range is not numeric, returns NaN.
     *
     * For a valid value y in the range, continuous(continuous.invert(y)) approximately equals y;
     * similarly, for a valid value x in the domain, continuous.invert(continuous(x)) approximately equals x.
     * The scale and its inverse may not be exact due to the limitations of floating point precision.
     *
     * @param value A numeric value from the range.
     */
    invert(value: NumberValue): number;

    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): number[];
    /**
     * Sets the scale’s domain to the specified array of numbers. The array must contain two or more elements.
     * If the elements in the given array are not numbers, they will be coerced to numbers
     *
     * Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.
     *
     * Internally, a piecewise scale performs a binary search for the range interpolator corresponding to the given domain value.
     * Thus, the domain must be in ascending or descending order. If the domain and range have different lengths N and M, only the first min(N,M) elements in each are observed.
     *
     * @param domain Array of numeric domain values.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns a copy of the scale’s current range.
     */
    range(): Range[];
    /**
     * Sets the scale’s range to the specified array of values.
     *
     * The array must contain two or more elements. Unlike the domain, elements in the given array need not be numbers;
     * any value that is supported by the underlying interpolator will work, though note that numeric ranges are required for invert.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Sets the scale’s range to the specified array of values while also setting the scale’s interpolator to interpolateRound.
     *
     * The rounding interpolator is sometimes useful for avoiding antialiasing artifacts,
     * though also consider the shape-rendering “crispEdges” styles. Note that this interpolator can only be used with numeric ranges.
     *
     * The array must contain two or more elements. Unlike the domain, elements in the given array need not be numbers;
     * any value that is supported by the underlying interpolator will work, though note that numeric ranges are required for invert.
     *
     * @param range Array of range values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns whether or not the scale currently clamps values to within the range.
     */
    clamp(): boolean;
    /**
     * Enables or disables clamping, respectively. If clamping is disabled and the scale is passed a value outside the domain,
     * the scale may return a value outside the range through extrapolation.
     *
     * If clamping is enabled, the return value of the scale is always within the scale’s range. Clamping similarly applies to the "invert" method.
     *
     * @param clamp A flag to enable (true) or disable (false) clamping.
     */
    clamp(clamp: boolean): this;

    /**
     * Returns approximately count representative values from the scale’s domain.
     *
     * If count is not specified, it defaults to 10.
     *
     * The returned tick values are uniformly spaced, have human-readable values (such as multiples of powers of 10),
     * and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.
     * The specified count is only a hint; the scale may return more or fewer values depending on the domain. See also d3-array’s ticks.
     *
     * @param count Optional approximate number of ticks to be returned. If count is not specified, it defaults to 10.
     */
    ticks(count?: number): number[];

    /**
     * Returns a number format function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values.
     * The specified count should have the same value as the count that is used to generate the tick values.
     *
     * @param count Approximate number of ticks to be used when calculating precision for the number format function.
     * @param specifier An optional valid format specifier string which allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
     * If specifier uses the format type "s", the scale will return a SI-prefix format based on the largest value in the domain.
     * If the specifier already specifies a precision, this method is equivalent to locale.format.
     */
    tickFormat(count?: number, specifier?: string): (d: NumberValue) => string;

    /**
     * Extends the domain so that it starts and ends on nice round values.
     * This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value.
     * An optional tick count argument allows greater control over the step size used to extend the bounds,
     * guaranteeing that the returned ticks will exactly cover the domain.
     * Nicing is useful if the domain is computed from data, say using extent, and may be irregular.
     * For example, for a domain of [0.201479…, 0.996679…], a nice domain might be [0.2, 1.0].
     * If the domain has more than two values, nicing the domain only affects the first and last value.
     *
     * Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using continuous.domain.
     * You must re-nice the scale after setting the new domain, if desired.
     *
     * @param count An optional number of ticks expected to be used.
     */
    nice(count?: number): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  /**
   * Returns a number format function suitable for displaying a tick value,
   * automatically computing the appropriate precision based on the fixed interval between tick values, as determined by d3.tickStep.
   *
   * @param start Start
   * @param stop Stop
   * @param count Approximate number of ticks to be used when calculating precision for the number format function.
   * @param specifier An optional specifier allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
   * If specifier uses the format type s, the scale will return a SI-prefix format based on the larger absolute value of start and stop.
   * If the specifier already specifies a precision, this method is equivalent to locale.format.
   */
  export function tickFormat(
    start: number,
    stop: number,
    count: number,
    specifier?: string,
  ): (d: NumberValue) => string;

  // -------------------------------------------------------------------------------
  // Linear Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * A linear continuous scale defined over a numeric domain.
   *
   * Continuous scales map a continuous, quantitative input domain to a continuous output range.
   * Each range value y can be expressed as a function of the domain value x: y = mx + b.
   *
   * If the range is also numeric, the mapping may be inverted.
   *
   * Note that the data types of the range and output of the scale must be compatible with the interpolator applied by the scale.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the output elements generated by the scale.
   *
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   */
  export interface ScaleLinear<Range, Output, Unknown = never> extends ScaleContinuousNumeric<Range, Output, Unknown> {
    /**
     * Returns the scale’s current interpolator factory, which defaults to interpolate.
     */
    interpolate(): InterpolatorFactory<any, any>;

    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate(interpolate: InterpolatorFactory<Range, Output>): this;
    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * The generic "NewOutput" can be used to change the scale to have a different output element type corresponding to the new interpolation factory.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate<NewOutput>(interpolate: InterpolatorFactory<Range, NewOutput>): ScaleLinear<Range, NewOutput, Unknown>;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleLinear<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new continuous scale with the specified range, the default interpolator and clamping disabled.
   * The domain defaults to [0, 1].
   * If range is not specified, it defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleLinear<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleLinear<Range, Output, Unknown>;
  /**
   * Constructs a new continuous scale with the specified domain and range, the default interpolator and clamping disabled.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of numeric domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleLinear<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleLinear<Range, Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Power Scale Factories
  // -------------------------------------------------------------------------------

  /**
   * A continuous power scale defined over a numeric domain.
   *
   * Continuous scales map a continuous, quantitative input domain to a continuous output range.
   *
   * Each range value y can be expressed as a function of the domain value x: y = mx^k + b, where k is the exponent value.
   * Power scales also support negative domain values, in which case the input value and the resulting output value are multiplied by -1.
   *
   * If the range is also numeric, the mapping may be inverted.
   *
   * Note that the data types of the range and output of the scale must be compatible with the interpolator applied by the scale.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the output elements generated by the scale.
   *
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   */
  export interface ScalePower<Range, Output, Unknown = never> extends ScaleContinuousNumeric<Range, Output, Unknown> {
    /**
     * Returns the scale’s current interpolator factory, which defaults to interpolate.
     */
    interpolate(): InterpolatorFactory<any, any>;

    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate(interpolate: InterpolatorFactory<Range, Output>): this;
    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * The generic "NewOutput" can be used to change the scale to have a different output element type corresponding to the new interpolation factory.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate<NewOutput>(interpolate: InterpolatorFactory<Range, NewOutput>): ScalePower<Range, NewOutput, Unknown>;

    /**
     * If exponent is not specified, returns the current exponent, which defaults to 1.
     * (Note that this is effectively a linear scale until you set a different exponent.)
     */
    exponent(): number;
    /**
     * Sets the current exponent to the given numeric value.
     * (Note that this is effectively a linear scale until you set a different exponent.)
     */
    exponent(exponent: number): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScalePower<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new continuous scale with the specified range, the exponent 1, the default interpolator and clamping disabled.
   * The domain defaults to [0, 1].
   * If range is not specified, it defaults to [0, 1].
   * (Note that this is effectively a linear scale until you set a different exponent.)
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scalePow<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScalePower<Range, Output, Unknown>;
  /**
   * Constructs a new continuous scale with the specified domain and range, the exponent 1, the default interpolator and clamping disabled.
   * (Note that this is effectively a linear scale until you set a different exponent.)
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of numeric domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scalePow<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScalePower<Range, Output, Unknown>;

  /**
   * Constructs a new continuous power scale with the specified range, the exponent 0.5, the default interpolator and clamping disabled.
   * The domain defaults to [0, 1].
   * If range is not specified, it defaults to [0, 1].
   * This is a convenience method equivalent to d3.scalePow().exponent(0.5).
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSqrt<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScalePower<Range, Output, Unknown>;
  /**
   * Constructs a new continuous power scale with the specified domain and range, the exponent 0.5, the default interpolator and clamping disabled.
   * This is a convenience method equivalent to d3.scalePow().exponent(0.5).
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of numeric domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSqrt<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScalePower<Range, Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Logarithmic Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * A continuous logarithmic scale defined over a numeric domain.
   *
   * Continuous scales map a continuous, quantitative input domain to a continuous output range.
   *
   * The mapping to the range value y can be expressed as a function of the domain value x: y = m log(x) + b.
   *
   * As log(0) = -∞, a log scale domain must be strictly-positive or strictly-negative; the domain must not include or cross zero.
   * A log scale with a positive domain has a well-defined behavior for positive values, and a log scale with a negative domain has a well-defined behavior for negative values.
   * (For a negative domain, input and output values are implicitly multiplied by -1.)
   * The behavior of the scale is undefined if you pass a negative value to a log scale with a positive domain or vice versa.
   *
   * If the range is also numeric, the mapping may be inverted.
   *
   * Note that the data types of the range and output of the scale must be compatible with the interpolator applied by the scale.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the output elements generated by the scale.
   *
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   */
  export interface ScaleLogarithmic<Range, Output, Unknown = never> extends ScaleContinuousNumeric<
    Range,
    Output,
    Unknown
  > {
    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): number[];
    /**
     * Sets the scale’s domain to the specified array of numbers. The array must contain two or more elements.
     * If the elements in the given array are not numbers, they will be coerced to numbers
     *
     * As log(0) = -∞, a log scale domain must be strictly-positive or strictly-negative; the domain must not include or cross zero.
     * A log scale with a positive domain has a well-defined behavior for positive values, and a log scale with a negative domain has a well-defined behavior for negative values.
     * (For a negative domain, input and output values are implicitly multiplied by -1.)
     * The behavior of the scale is undefined if you pass a negative value to a log scale with a positive domain or vice versa.
     *
     * Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.
     *
     * Internally, a piecewise scale performs a binary search for the range interpolator corresponding to the given domain value.
     * Thus, the domain must be in ascending or descending order. If the domain and range have different lengths N and M, only the first min(N,M) elements in each are observed.
     *
     * @param domain Array of numeric domain values.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns the scale’s current interpolator factory, which defaults to interpolate.
     */
    interpolate(): InterpolatorFactory<any, any>;

    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate(interpolate: InterpolatorFactory<Range, Output>): this;
    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * The generic "NewOutput" can be used to change the scale to have a different output element type corresponding to the new interpolation factory.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate<NewOutput>(
      interpolate: InterpolatorFactory<Range, NewOutput>,
    ): ScaleLogarithmic<Range, NewOutput, Unknown>;

    /**
     * Returns approximately count representative values from the scale’s domain.
     *
     * If count is not specified, it defaults to 10.
     *
     * If the base is an integer, the returned ticks are uniformly spaced within each integer power of base; otherwise, one tick per power of base is returned.
     * The returned ticks are guaranteed to be within the extent of the domain. If the orders of magnitude in the domain is greater than count, then at most one tick per power is returned.
     * Otherwise, the tick values are unfiltered, but note that you can use log.tickFormat to filter the display of tick labels.
     *
     * @param count Optional approximate number of ticks to be returned. If count is not specified, it defaults to 10.
     */
    ticks(count?: number): number[];

    /**
     * Returns a number format function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values.
     *
     * The specified count typically has the same value as the count that is used to generate the tick values.
     * If there are too many ticks, the formatter may return the empty string for some of the tick labels;
     * however, note that the ticks are still shown.
     * To disable filtering, specify a count of Infinity. When specifying a count, you may also provide a format specifier or format function.
     * For example, to get a tick formatter that will display 20 ticks of a currency, say log.tickFormat(20, "$,f").
     * If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format.
     * This provides a convenient way of specifying a format whose precision will be automatically set by the scale.
     *
     * @param count Approximate number of ticks to be used when calculating precision for the number format function.
     * @param specifier An optional valid format specifier string which allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
     * For example, to get a tick formatter that will display 20 ticks of a currency, say log.tickFormat(20, "$,f").
     * If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format.
     * This provides a convenient way of specifying a format whose precision will be automatically set by the scale.
     */
    tickFormat(count?: number, specifier?: string): (d: NumberValue) => string;

    /**
     * Extends the domain to integer powers of base. For example, for a domain of [0.201479…, 0.996679…], and base 10, the nice domain is [0.1, 1].
     * If the domain has more than two values, nicing the domain only affects the first and last value.
     *
     * Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using continuous.domain.
     * You must re-nice the scale after setting the new domain, if desired.
     */
    nice(): this;

    /**
     * Returns the current base, which defaults to 10.
     */
    base(): number;
    /**
     * Sets the base for this logarithmic scale to the specified value.
     */
    base(base: number): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleLogarithmic<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new continuous scale with the specified range, the base 10, the default interpolator and clamping disabled.
   * The domain defaults to [1, 10].
   * If range is not specified, it defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleLog<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleLogarithmic<Range, Output, Unknown>;
  /**
   * Constructs a new continuous scale with the specified domain and range, the base 10, the default interpolator and clamping disabled.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of numeric domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleLog<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleLogarithmic<Range, Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Symlog Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * A bi-symmetric log transformation for wide-range data by Webber scale defined over a numeric domain.
   *
   * Continuous scales map a continuous, quantitative input domain to a continuous output range.
   *
   * See “A bi-symmetric log transformation for wide-range data” by Webber for more
   *
   * If the range is also numeric, the mapping may be inverted.
   *
   * Note that the data types of the range and output of the scale must be compatible with the interpolator applied by the scale.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the output elements generated by the scale.
   *
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   */
  export interface ScaleSymLog<Range, Output, Unknown = never> extends ScaleContinuousNumeric<Range, Output, Unknown> {
    /**
     * Returns a number format function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values.
     *
     * The specified count typically has the same value as the count that is used to generate the tick values.
     * If there are too many ticks, the formatter may return the empty string for some of the tick labels;
     * however, note that the ticks are still shown.
     * To disable filtering, specify a count of Infinity. When specifying a count, you may also provide a format specifier or format function.
     * For example, to get a tick formatter that will display 20 ticks of a currency, say log.tickFormat(20, "$,f").
     * If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format.
     * This provides a convenient way of specifying a format whose precision will be automatically set by the scale.
     *
     * @param count Approximate number of ticks to be used when calculating precision for the number format function.
     * @param specifier An optional valid format specifier string which allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
     * For example, to get a tick formatter that will display 20 ticks of a currency, say log.tickFormat(20, "$,f").
     * If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format.
     * This provides a convenient way of specifying a format whose precision will be automatically set by the scale.
     */
    tickFormat(count?: number, specifier?: string): (d: NumberValue) => string;
    /**
     * Returns the current constant, which defaults to 1.
     */
    constant(): number;
    /**
     * Sets the symlog constant to the specified number and returns this scale;
     * otherwise returns the current value of the symlog constant, which defaults to 1. See “A bi-symmetric log transformation for wide-range data” by Webber for more.
     */
    constant(constant: number): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleSymLog<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new continuous scale with the specified range, the constant 1, the default interpolator and clamping disabled.
   * The domain defaults to [0, 1].
   * If range is not specified, it defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSymlog<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleSymLog<Range, Output, Unknown>;
  /**
   * Constructs a new continuous scale with the specified domain and range, the constant 1, the default interpolator and clamping disabled.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of numeric domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSymlog<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleSymLog<Range, Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Identity Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Identity scales are a special case of linear scales where the domain and range are identical; the scale and its invert method are thus the identity function.
   * These scales are occasionally useful when working with pixel coordinates, say in conjunction with an axis.
   *
   * The generic corresponds to the data type of the unknown value.
   */
  export interface ScaleIdentity<Unknown = never> {
    /**
     * Given a value from the domain, returns the corresponding value from the range, subject to interpolation, if any.
     *
     * If the given value is outside the domain, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the range.
     *
     * Note: The interpolation function applied by the scale may change the output type from the range type as part of the interpolation.
     *
     * @param value A numeric value from the domain.
     */
    (value: NumberValue): number | Unknown;

    /**
     * Given a value from the range, returns the corresponding value from the domain. Inversion is useful for interaction,
     * say to determine the data value corresponding to the position of the mouse.
     *
     * If the given value is outside the range, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the domain.
     *
     * IMPORTANT: This method is only supported if the range is numeric. If the range is not numeric, returns NaN.
     *
     * For a valid value y in the range, continuous(continuous.invert(y)) approximately equals y;
     * similarly, for a valid value x in the domain, continuous.invert(continuous(x)) approximately equals x.
     * The scale and its inverse may not be exact due to the limitations of floating point precision.
     *
     * @param value A numeric value from the range.
     */
    invert(value: NumberValue): number;

    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): number[];
    /**
     * Sets the scale’s domain to the specified array of numbers. The array must contain two or more elements.
     * If the elements in the given array are not numbers, they will be coerced to numbers
     *
     * Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.
     *
     * Internally, a piecewise scale performs a binary search for the range interpolator corresponding to the given domain value.
     * Thus, the domain must be in ascending or descending order. If the domain and range have different lengths N and M, only the first min(N,M) elements in each are observed.
     *
     * @param domain Array of numeric domain values.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns a copy of the scale’s current range.
     */
    range(): number[];
    /**
     * Sets the scale’s range to the specified array of values.
     *
     * The array must contain two or more elements. Unlike the domain, elements in the given array need not be numbers;
     * any value that is supported by the underlying interpolator will work, though note that numeric ranges are required for invert.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<NumberValue>): this;

    /**
     * Returns approximately count representative values from the scale’s domain.
     *
     * If count is not specified, it defaults to 10.
     *
     * The returned tick values are uniformly spaced, have human-readable values (such as multiples of powers of 10),
     * and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.
     * The specified count is only a hint; the scale may return more or fewer values depending on the domain. See also d3-array’s ticks.
     *
     * @param count Optional approximate number of ticks to be returned. If count is not specified, it defaults to 10.
     */
    ticks(count?: number): number[];

    /**
     * Returns a number format function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values.
     * The specified count should have the same value as the count that is used to generate the tick values.
     *
     * @param count Approximate number of ticks to be used when calculating precision for the number format function.
     * @param specifier An optional valid format specifier string which allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
     * If specifier uses the format type "s", the scale will return a SI-prefix format based on the largest value in the domain.
     * If the specifier already specifies a precision, this method is equivalent to locale.format.
     */
    tickFormat(count?: number, specifier?: string): (d: NumberValue) => string;

    /**
     * Extends the domain so that it starts and ends on nice round values.
     * This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value.
     * An optional tick count argument allows greater control over the step size used to extend the bounds,
     * guaranteeing that the returned ticks will exactly cover the domain.
     * Nicing is useful if the domain is computed from data, say using extent, and may be irregular.
     * For example, for a domain of [0.201479…, 0.996679…], a nice domain might be [0.2, 1.0].
     * If the domain has more than two values, nicing the domain only affects the first and last value.
     *
     * Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using continuous.domain.
     * You must re-nice the scale after setting the new domain, if desired.
     *
     * @param count An optional number of ticks expected to be used.
     */
    nice(count?: number): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleIdentity<NewUnknown>;
  }

  /**
   * Constructs a new identity scale with the specified domain and range.
   * If range is not specified, it defaults to [0, 1].
   *
   * The generic corresponds to the data type of the unknown value.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleIdentity<Unknown = never>(range?: Iterable<NumberValue>): ScaleIdentity<Unknown>;

  // -------------------------------------------------------------------------------
  // Radial Scale Factory
  // -------------------------------------------------------------------------------

  export interface ScaleRadial<Range, Output, Unknown = never> extends ScaleContinuousNumeric<Range, Output, Unknown> {
    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleRadial<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new radial scale with the specified range.
   * The domain defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * The range must be set in accordance with the range element type.
   *
   * @param range Iterable of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleRadial<Range = number, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleRadial<Range, Range, Unknown>;
  /**
   * Constructs a new radial scale with the specified domain and range.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * The range must be set in accordance with the range element type.
   *
   * @param domain Iterable of numeric domain values.
   * @param range Iterable of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleRadial<Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleRadial<Range, Range, Unknown>;

  // -------------------------------------------------------------------------------
  // Time Scale Factories
  // -------------------------------------------------------------------------------

  /**
   * A linear scale defined over a temporal domain.
   *
   * Time scales implement ticks based on calendar intervals, taking the pain out of generating axes for temporal domains.
   *
   * If the range is numeric, the mapping may be inverted to return a date.
   *
   * Note that the data types of the range and output of the scale must be compatible with the interpolator applied by the scale.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the output elements generated by the scale.
   *
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   */
  export interface ScaleTime<Range, Output, Unknown = never> {
    /**
     * Given a value from the domain, returns the corresponding value from the range, subject to interpolation, if any.
     *
     * If the given value is outside the domain, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the range.
     *
     * Note: The interpolation function applied by the scale may change the output type from the range type as part of the interpolation.
     *
     * @param value A temporal value from the domain. If the value is not a Date, it will be coerced to Date.
     */
    (value: Date | NumberValue): Output | Unknown;

    /**
     * Given a value from the range, returns the corresponding value from the domain. Inversion is useful for interaction,
     * say to determine the data value corresponding to the position of the mouse.
     *
     * If the given value is outside the range, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the domain.
     *
     * IMPORTANT: This method is only supported if the range is numeric. If the range is not numeric, returns Invalid Date.
     *
     * For a valid value y in the range, time(time.invert(y)) equals y; similarly, for a valid value x in the domain, time.invert(time(x)) equals x.
     * The invert method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.
     *
     * @param value A numeric value from the range.
     */
    invert(value: NumberValue): Date;

    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): Date[];

    /**
     * Sets the scale’s domain to the specified array of temporal domain values. The array must contain two or more elements.
     * If the elements in the given array are not dates, they will be coerced to dates.
     *
     * Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale.
     *
     * Internally, a piecewise scale performs a binary search for the range interpolator corresponding to the given domain value.
     * Thus, the domain must be in ascending or descending order. If the domain and range have different lengths N and M, only the first min(N,M) elements in each are observed.
     *
     * @param domain Array of temporal domain values. Numeric values will be coerced to dates.
     */
    domain(domain: Iterable<Date | NumberValue>): this;

    /**
     * Returns a copy of the scale’s current range.
     */
    range(): Range[];
    /**
     * Sets the scale’s range to the specified array of values.
     *
     * The array must contain two or more elements. Unlike the domain, elements in the given array need not be temporal domain values;
     * any value that is supported by the underlying interpolator will work, though note that numeric ranges are required for invert.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Sets the scale’s range to the specified array of values while also setting the scale’s interpolator to interpolateRound.
     *
     * The rounding interpolator is sometimes useful for avoiding antialiasing artifacts,
     * though also consider the shape-rendering “crispEdges” styles. Note that this interpolator can only be used with numeric ranges.
     *
     * The array must contain two or more elements. Unlike the domain, elements in the given array need not be temporal domain values;
     * any value that is supported by the underlying interpolator will work, though note that numeric ranges are required for invert.
     *
     * @param range Array of range values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns whether or not the scale currently clamps values to within the range.
     */
    clamp(): boolean;
    /**
     * Enables or disables clamping, respectively. If clamping is disabled and the scale is passed a value outside the domain,
     * the scale may return a value outside the range through extrapolation.
     *
     * If clamping is enabled, the return value of the scale is always within the scale’s range. Clamping similarly applies to the "invert" method.
     *
     * @param clamp A flag to enable (true) or disable (false) clamping.
     */
    clamp(clamp: boolean): this;

    /**
     * Returns the scale’s current interpolator factory, which defaults to interpolate.
     */
    interpolate(): InterpolatorFactory<any, any>;

    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate(interpolate: InterpolatorFactory<Range, Output>): this;
    /**
     * Sets the scale’s range interpolator factory. This interpolator factory is used to create interpolators for each adjacent pair of values from the range;
     * these interpolators then map a normalized domain parameter t in [0, 1] to the corresponding value in the range.
     *
     * Note: the default interpolator may reuse return values. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place.
     * If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance);
     * however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
     *
     * As part of the interpolation process the interpolated value from the range may be converted to a corresponding output value.
     *
     * The generic "NewOutput" can be used to change the scale to have a different output element type corresponding to the new interpolation factory.
     *
     * @param interpolate An interpolation factory. The generics for Range and Output of the scale must correspond to the interpolation factory applied to the scale.
     */
    interpolate<NewOutput>(interpolate: InterpolatorFactory<Range, NewOutput>): ScaleTime<Range, NewOutput, Unknown>;

    /**
     * Returns representative dates from the scale’s domain. The returned tick values are uniformly-spaced (mostly),
     * have sensible values (such as every day at midnight), and are guaranteed to be within the extent of the domain.
     * Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.
     *
     * An optional count may be specified to affect how many ticks are generated. If count is not specified, it defaults to 10.
     * The specified count is only a hint; the scale may return more or fewer values depending on the domain.
     *
     * @param count Expected number of ticks.
     */
    ticks(count?: number): Date[];
    /**
     * Returns representative dates from the scale’s domain. The returned tick values are uniformly-spaced (mostly),
     * have sensible values (such as every day at midnight), and are guaranteed to be within the extent of the domain.
     * Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.
     *
     * The specified time interval controls the ticks generated and returned. To prune the generated ticks for a given time interval,
     * use interval.every(...) or interval.filter(...).
     *
     * @param interval A time interval to specify the expected ticks.
     */
    ticks(interval: TimeInterval): Date[];

    /**
     * Returns a time format function suitable for displaying tick values.
     *
     * The default multi-scale time format chooses a human-readable representation based on the specified date as follows:
     *
     *  - %Y - for year boundaries, such as 2011.
     *  - %B - for month boundaries, such as February.
     *  - %b %d - for week boundaries, such as Feb 06.
     *  - %a %d - for day boundaries, such as Mon 07.
     *  - %I %p - for hour boundaries, such as 01 AM.
     *  - %I:%M - for minute boundaries, such as 01:23.
     *  - :%S - for second boundaries, such as :45.
     *  - .%L - milliseconds for all other times, such as .012.
     *
     * Although somewhat unusual, this default behavior has the benefit of providing both local and global context:
     * for example, formatting a sequence of ticks as [11 PM, Mon 07, 01 AM] reveals information about hours, dates, and day simultaneously,
     * rather than just the hours [11 PM, 12 AM, 01 AM].
     *
     * The specified count is currently ignored, but is accepted for consistency with other scales such as continuous.tickFormat.
     *
     * @param count Expected number of ticks. (Currently ignored)
     * @param specifier An optional valid date format specifier string (see d3-time-format).
     */
    tickFormat(count?: number, specifier?: string): (d: Date) => string;
    /**
     * Returns a time format function suitable for displaying tick values.
     *
     * The specified time interval is currently ignored, but is accepted for consistency with other scales such as continuous.tickFormat.
     *
     * @param interval A time interval to specify the expected ticks. (Currently ignored)
     * @param specifier An optional valid date format specifier string (see d3-time-format).
     */
    tickFormat(interval: TimeInterval, specifier?: string): (d: Date) => string;

    /**
     * Extends the domain so that it starts and ends on nice round values.
     * This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value.
     *
     * An optional count argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned ticks will exactly cover the domain.
     *
     * Nicing is useful if the domain is computed from data, say using extent, and may be irregular.
     * For example, for a domain of [2009-07-13T00:02, 2009-07-13T23:48], the nice domain is [2009-07-13, 2009-07-14].
     * If the domain has more than two values, nicing the domain only affects the first and last value.
     *
     * @param count Expected number of ticks.
     */
    nice(count?: number): this;
    /**
     * Extends the domain so that it starts and ends on nice round values.
     * This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value.
     *
     * A time interval may be specified to explicitly set the ticks.
     * If an interval is specified, an optional step may also be specified to skip some ticks.
     * For example, time.nice(d3.timeSecond.every(10)) will extend the domain to an even ten seconds (0, 10, 20, etc.).
     * See time.ticks and interval.every for further detail.
     *
     * Nicing is useful if the domain is computed from data, say using extent, and may be irregular.
     * For example, for a domain of [2009-07-13T00:02, 2009-07-13T23:48], the nice domain is [2009-07-13, 2009-07-14].
     * If the domain has more than two values, nicing the domain only affects the first and last value.
     *
     * @param interval A time interval to specify the expected ticks.
     */
    nice(interval: CountableTimeInterval): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleTime<Range, Output, NewUnknown>;
  }

  /**
   * Constructs a new time scale with the specified range, the default interpolator and clamping disabled.
   * The domain defaults to [2000-01-01, 2000-01-02].
   * If range is not specified, it defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleTime<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleTime<Range, Output, Unknown>;
  /**
   * Constructs a new time scale with the specified domain and range, the default interpolator and clamping disabled.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of temporal domain values. Numeric values will be coerced to dates.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleTime<Range, Output = Range, Unknown = never>(
    domain: Iterable<Date | NumberValue>,
    range: Iterable<Range>,
  ): ScaleTime<Range, Output, Unknown>;

  /**
   * Constructs a new time scale using Coordinated Universal Time (UTC) with the specified range, the default interpolator and clamping disabled.
   * The domain defaults to [2000-01-01, 2000-01-02].
   * If range is not specified, it defaults to [0, 1].
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleUtc<Range = number, Output = Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleTime<Range, Output, Unknown>;
  /**
   * Constructs a new time scale using Coordinated Universal Time (UTC) with the specified domain and range, the default interpolator and clamping disabled.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the output elements generated by the scale.
   * The third generic corresponds to the data type of the unknown value.
   *
   * If range element and output element type differ, the interpolator factory used with the scale must match this behavior and
   * convert the interpolated range element to a corresponding output element.
   *
   * The range must be set in accordance with the range element type.
   *
   * The interpolator factory may be set using the interpolate(...) method of the scale.
   *
   * @param domain Array of temporal domain values. Numeric values will be coerced to dates.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleUtc<Range, Output = Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleTime<Range, Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Sequential Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Sequential scales are similar to continuous scales in that they map a continuous, numeric input domain to a continuous output range.
   * However, unlike continuous scales, the input domain and output range of a sequential scale always has exactly two elements,
   * and the output range is typically specified as an interpolator rather than an array of values.
   * These scales do not expose invert and interpolate methods.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   *
   * The second generic corresponds to the data type of the unknown value.
   */
  export interface ScaleSequentialBase<Output, Unknown = never> {
    /**
     * Given a value from the domain, returns the corresponding value from the output range, subject to interpolation.
     *
     * If the given value is outside the domain, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the range.
     *
     * @param value A numeric value from the domain.
     */
    (value: NumberValue): Output | Unknown;

    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): [number, number];
    /**
     * Sets the scale’s domain to the specified array of numbers. The array must contain exactly two elements.
     * If the elements in the given array are not numbers, they will be coerced to numbers
     *
     * @param domain A two-element array of numeric domain values.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns whether or not the scale currently clamps values to within the range.
     */
    clamp(): boolean;
    /**
     * Enables or disables clamping, respectively. If clamping is disabled and the scale is passed a value outside the domain,
     * the scale may return a value outside the range through extrapolation.
     *
     * If clamping is enabled, the return value of the scale is always within the scale’s range. Clamping similarly applies to the "invert" method.
     *
     * @param clamp A flag to enable (true) or disable (false) clamping.
     */
    clamp(clamp: boolean): this;

    /**
     * See continuous.range.
     */
    range(): [Output, Output];
    /**
     * See continuous.range.
     * The given two-element array is converted to an interpolator function using d3.interpolate.
     *
     * @param range Range values.
     */
    range(range: Iterable<Output>): this;

    /**
     * See continuous.rangeRound.
     * If range is specified, implicitly uses d3.interpolateRound as the interpolator.
     *
     * @param range Range values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  export interface ScaleSequential<Output, Unknown = never> extends ScaleSequentialBase<Output, Unknown> {
    /**
     * Returns the current interpolator underlying the scale.
     */
    interpolator(): (t: number) => Output;
    /**
     * Sets the scale’s interpolator to the specified function.
     *
     * @param interpolator An interpolator function mapping a value from the [0, 1] interval to an output value.
     */
    interpolator(interpolator: (t: number) => Output): this;
    /**
     * Sets the scale’s interpolator to the specified function.
     *
     * The generic corresponds to a the new output type of the scale. The output type of the scale is determined by the output type of the interpolator function.
     *
     * @param interpolator An interpolator function mapping a value from the [0, 1] interval to an output value.
     */
    interpolator<NewOutput>(interpolator: (t: number) => NewOutput): ScaleSequential<NewOutput, Unknown>;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleSequential<Output, NewUnknown>;
  }

  /**
   * Constructs a new sequential scale with the specified interpolator function or array.
   * The domain defaults to [0, 1].
   * If interpolator is not specified, it defaults to the identity function.
   * When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the minimum value and 1 represents the maximum value.
   *
   * If interpolator is an array, it represents the scale’s two-element output range and is converted to an interpolator function using d3.interpolate.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function or array to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequential<Output = number, Unknown = never>(
    interpolator?: ((t: number) => Output) | Iterable<Output>,
  ): ScaleSequential<Output, Unknown>;
  /**
   * Constructs a new sequential scale with the specified domain and interpolator function or array.
   * When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the minimum value and 1 represents the maximum value.
   *
   * If interpolator is an array, it represents the scale’s two-element output range and is converted to an interpolator function using d3.interpolate.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function or array to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequential<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: ((t: number) => Output) | Iterable<Output>,
  ): ScaleSequential<Output, Unknown>;

  /**
   * A sequential scale with a logarithmic transform, analogous to a log scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialLog<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;
  /**
   * A sequential scale with a logarithmic transform, analogous to a log scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialLog<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;

  /**
   * A sequential scale with a exponential transform, analogous to a power scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialPow<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;
  /**
   * A sequential scale with a exponential transform, analogous to a power scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialPow<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;

  /**
   * A sequential scale with a square-root transform, analogous to a d3.scaleSqrt.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second third generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialSqrt<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;
  /**
   * A sequential scale with a square-root transform, analogous to a d3.scaleSqrt.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialSqrt<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;

  /**
   * A sequential scale with a symmetric logarithmic transform, analogous to a symlog scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialSymlog<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;
  /**
   * A sequential scale with a symmetric logarithmic transform, analogous to a symlog scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialSymlog<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleSequential<Output, Unknown>;

  export interface ScaleSequentialQuantile<Output, Unknown = never> extends ScaleSequentialBase<Output, Unknown> {
    /**
     * Returns an array of n + 1 quantiles.
     * For example, if n = 4, returns an array of five numbers: the minimum value, the first quartile, the median, the third quartile, and the maximum.
     */
    quantiles(): number[];

    /**
     * Returns the current interpolator underlying the scale.
     */
    interpolator(): (t: number) => Output;
    /**
     * Sets the scale’s interpolator to the specified function.
     *
     * @param interpolator An interpolator function mapping a value from the [0, 1] interval to an output value.
     */
    interpolator(interpolator: (t: number) => Output): this;
    /**
     * Sets the scale’s interpolator to the specified function.
     *
     * The generic corresponds to a the new output type of the scale. The output type of the scale is determined by the output type of the interpolator function.
     *
     * @param interpolator An interpolator function mapping a value from the [0, 1] interval to an output value.
     */
    interpolator<NewOutput>(interpolator: (t: number) => NewOutput): ScaleSequentialQuantile<NewOutput, Unknown>;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleSequentialQuantile<Output, NewUnknown>;
  }

  /**
   * A sequential scale using a p-quantile transform, analogous to a quantile scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialQuantile<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleSequentialQuantile<Output, Unknown>;
  /**
   * A sequential scale using a p-quantile transform, analogous to a quantile scale.
   *
   * The first generic corresponds to the data type of the output of the interpolator underlying the scale.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric domain values.
   * @param interpolator The interpolator function to be used with the scale.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleSequentialQuantile<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleSequentialQuantile<Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Diverging Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Diverging scales, like sequential scales, are similar to continuous scales in that they map a continuous, numeric input domain to a continuous output range.
   * However, unlike continuous scales, the input domain and output range of a diverging scale always has exactly three elements,
   * and the output range is typically specified as an interpolator rather than an array of values.
   * These scales do not expose invert and interpolate methods.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   *
   * The second generic corresponds to the data type of the unknown value.
   */
  export interface ScaleDiverging<Output, Unknown = never> {
    /**
     * Given a value from the domain, returns the corresponding value subject to interpolation.
     *
     * If the given value is outside the domain, and clamping is not enabled, the mapping may be extrapolated such that the returned value is outside the range.
     *
     * @param value A numeric value from the domain.
     */
    (value: NumberValue): Output | Unknown;

    /**
     * Returns a copy of the scale’s current domain.
     */
    domain(): [number, number, number];
    /**
     * Sets the scale’s domain to the specified array of numbers.
     * The domain must be numeric and must contain exactly three values. The default domain is [0, 0.5, 1].
     * If the elements in the given array are not numbers, they will be coerced to numbers
     *
     * @param domain Array of three numeric domain values.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns whether or not the scale currently clamps values to within the range.
     */
    clamp(): boolean;
    /**
     * Enables or disables clamping, respectively. If clamping is disabled and the scale is passed a value outside the domain,
     * the scale may return a value outside the range through extrapolation.
     *
     * If clamping is enabled, the return value of the scale is always within the interpolator scale’s range.
     *
     * @param clamp A flag to enable (true) or disable (false) clamping.
     */
    clamp(clamp: boolean): this;

    /**
     * Returns the scale’s current interpolator.
     */
    interpolator(): (t: number) => Output;
    /**
     * Sets the scale’s interpolator to the specified function.
     *
     * @param interpolator The scale’s interpolator.
     */
    interpolator(interpolator?: (t: number) => Output): this;

    /**
     * See continuous.range.
     */
    range(): [Output, Output, Output];
    /**
     * See continuous.range.
     * The given two-element array is converted to an interpolator function using d3.interpolate and d3.piecewise.
     *
     * @param range Range values.
     */
    range(range: Iterable<Output>): this;

    /**
     * See continuous.rangeRound.
     * If range is specified, implicitly uses d3.interpolateRound as the interpolator.
     *
     * @param range Range values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleDiverging<Output, NewUnknown>;
  }

  /**
   * Constructs a new diverging scale with the specified interpolator function or array.
   * The domain defaults to [0, 0.5, 1].
   * If interpolator is not specified, it defaults to the identity function.
   * When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1],
   * where 0 represents the extreme negative value, 0.5 represents the neutral value, and 1 represents the extreme positive value.
   *
   * If interpolator is an array, it represents the scale’s three-element output range and is converted to an interpolator function using d3.interpolate and d3.piecewise.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The scale’s interpolator function or array.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDiverging<Output = number, Unknown = never>(
    interpolator?: ((t: number) => Output) | Iterable<Output>,
  ): ScaleDiverging<Output, Unknown>;
  /**
   * Constructs a new diverging scale with the specified domain and interpolator function or array.
   * When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1],
   * where 0 represents the extreme negative value, 0.5 represents the neutral value, and 1 represents the extreme positive value.
   *
   * If interpolator is an array, it represents the scale’s three-element output range and is converted to an interpolator function using d3.interpolate and d3.piecewise.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of three numeric domain values.
   * @param interpolator The scale’s interpolator function or array.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDiverging<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: ((t: number) => Output) | Iterable<Output>,
  ): ScaleDiverging<Output, Unknown>;

  /**
   * A diverging scale with a logarithmic transform, analogous to a log scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingLog<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;
  /**
   * A diverging scale with a logarithmic transform, analogous to a log scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of three numeric domain values.
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingLog<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;

  /**
   * A diverging scale with a exponential transform, analogous to a power scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingPow<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;
  /**
   * A diverging scale with a exponential transform, analogous to a power scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of three numeric domain values.
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingPow<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;

  /**
   * A diverging scale with a square-root transform, analogous to a d3.scaleSqrt.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingSqrt<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;
  /**
   * A diverging scale with a square-root transform, analogous to a d3.scaleSqrt.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of three numeric domain values.
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingSqrt<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;

  /**
   * A diverging scale with a symmetric logarithmic transform, analogous to a symlog scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingSymlog<Output = number, Unknown = never>(
    interpolator?: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;
  /**
   * A diverging scale with a symmetric logarithmic transform, analogous to a symlog scale.
   *
   * The first generic corresponds to the data type of the interpolator return type.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of three numeric domain values.
   * @param interpolator The scale’s interpolator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleDivergingSymlog<Output, Unknown = never>(
    domain: Iterable<NumberValue>,
    interpolator: (t: number) => Output,
  ): ScaleDiverging<Output, Unknown>;

  // -------------------------------------------------------------------------------
  // Quantize Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Quantize scales are similar to linear scales, except they use a discrete rather than continuous range.
   * The continuous input domain is divided into uniform segments based on the number of values in (i.e., the cardinality of) the output range.
   *
   * Each range value y can be expressed as a quantized linear function of the domain value x: y = m round(x) + b.
   *
   * The first generic corresponds to the data type of the range elements.
   *
   * The second generic corresponds to the data type of the unknown value.
   */
  export interface ScaleQuantize<Range, Unknown = never> {
    /**
     * Given a value in the input domain, returns the corresponding value in the output range.
     */
    (value: NumberValue): Range | Unknown;
    /**
     * Returns the extent of values in the domain [x0, x1] for the corresponding value in the range: the inverse of quantize.
     * This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.
     *
     * If an invalid range value is entered, returns [NaN, NaN].
     *
     * @param value A value from the range.
     */
    invertExtent(value: Range): [number, number];

    /**
     * Returns the scale’s current domain.
     */
    domain(): [number, number];

    /**
     * Sets the scale’s domain to the specified two-element array of numbers.
     * If the elements in the given array are not numbers, they will be coerced to numbers.
     *
     * @param domain A two-element array of numeric values defining the domain.
     */
    domain(domain: Iterable<NumberValue>): this;

    /**
     * Returns the scale’s current range.
     */
    range(): Range[];
    /**
     * Sets the scale’s range to the specified array of values. The array may contain any number of discrete values.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Returns approximately count representative values from the scale’s domain.
     *
     * If count is not specified, it defaults to 10.
     *
     * The returned tick values are uniformly spaced, have human-readable values (such as multiples of powers of 10),
     * and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.
     * The specified count is only a hint; the scale may return more or fewer values depending on the domain. See also d3-array’s ticks.
     *
     * @param count Optional approximate number of ticks to be returned. If count is not specified, it defaults to 10.
     */
    ticks(count?: number): number[];

    /**
     * Returns a number format function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values.
     * The specified count should have the same value as the count that is used to generate the tick values.
     *
     * @param count Approximate number of ticks to be used when calculating precision for the number format function.
     * @param specifier An optional valid format specifier string which allows a custom format where the precision of the format is automatically set by the scale as appropriate for the tick interval.
     * If specifier uses the format type "s", the scale will return a SI-prefix format based on the largest value in the domain.
     * If the specifier already specifies a precision, this method is equivalent to locale.format.
     */
    tickFormat(count?: number, specifier?: string): (d: NumberValue) => string;

    /**
     * Extends the domain so that it starts and ends on nice round values.
     * This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value.
     *
     * Nicing is useful if the domain is computed from data, say using extent, and may be irregular.
     * For example, for a domain of [0.201479…, 0.996679…], a nice domain might be [0.2, 1.0].
     *
     * Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using continuous.domain.
     * You must re-nice the scale after setting the new domain, if desired.
     *
     * @param count An optional number of ticks expected to be used.
     */
    nice(count?: number): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleQuantize<Range, NewUnknown>;

    /**
     * Returns the array of computed thresholds within the domain.
     */
    thresholds(): number[];

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  /**
   * Constructs a new quantize scale with the specified range.
   * The domain defaults to [0, 1].
   * If range is not specified, it defaults to [0, 1].
   * Thus, the default quantize scale is equivalent to the Math.round function.
   *
   * The range must be set corresponding to the type of the range elements.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleQuantize<Range = number, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleQuantize<Range, Unknown>;
  /**
   * Constructs a new quantize scale with the specified domain and range.
   * Thus, the default quantize scale is equivalent to the Math.round function.
   *
   * The range must be set corresponding to the type of the range elements.
   *
   * The first generic corresponds to the data type of the range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain A two-element array of numeric values defining the domain.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleQuantize<Range, Unknown = never>(
    domain: Iterable<NumberValue>,
    range: Iterable<Range>,
  ): ScaleQuantize<Range, Unknown>;

  // -------------------------------------------------------------------------------
  // Quantile Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Quantile scales map a sampled input domain to a discrete range.
   * The domain is considered continuous and thus the scale will accept any reasonable input value;
   * however, the domain is specified as a discrete set of sample values.
   * The number of values in (the cardinality of) the output range determines the number of quantiles that will be computed from the domain.
   * To compute the quantiles, the domain is sorted, and treated as a population of discrete values; see d3-array’s quantile.
   *
   * The first generic corresponds to the data type of range elements.
   *
   * The second generic corresponds to the data type of the unknown value.
   */
  export interface ScaleQuantile<Range, Unknown = never> {
    /**
     * Given a value in the input domain, returns the corresponding value in the output range.
     *
     * @param value A numeric value in the input domain.
     */
    (value: NumberValue): Range | Unknown;

    /**
     * Returns the extent of values in the domain [x0, x1] for the corresponding value in the range: the inverse of quantile.
     * This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.
     *
     * @param value A value from the range.
     */
    invertExtent(value: Range): [number, number];

    /**
     * Returns the scale’s current domain.
     */
    domain(): number[];
    /**
     * Sets the domain of the quantile scale to the specified set of discrete numeric values.
     * The array must not be empty, and must contain at least one numeric value; NaN, null and undefined values are ignored and not considered part of the sample population.
     *
     * If the elements in the given array are not numbers, they will be coerced to numbers. A copy of the input array is sorted and stored internally.
     *
     * @param domain Array of domain values.
     */
    domain(domain: Iterable<NumberValue | null | undefined>): this;

    /**
     * Returns the current range.
     */
    range(): Range[];
    /**
     * Sets the discrete values in the range. The array must not be empty.
     * The number of values in (the cardinality, or length, of) the range array determines the number of quantiles that are computed.
     *
     * For example, to compute quartiles, range must be an array of four elements such as [0, 1, 2, 3].
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Returns the quantile thresholds. If the range contains n discrete values, the returned array will contain n - 1 thresholds.
     * Values less than the first threshold are considered in the first quantile;
     * values greater than or equal to the first threshold but less than the second threshold are in the second quantile, and so on.
     * Internally, the thresholds array is used with bisect to find the output quantile associated with the given input value.
     */
    quantiles(): number[];

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleQuantile<Range, NewUnknown>;
  }

  /**
   * Constructs a new quantile scale with the specified range.
   * The domain defaults to the empty array.
   * If range is not specified, it defaults to the empty array.
   * The quantile scale is invalid until both a domain and range are specified.
   *
   * The first generic corresponds to the data type of range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleQuantile<Range = number, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleQuantile<Range, Unknown>;
  /**
   * Constructs a new quantile scale with the specified domain and range.
   * The quantile scale is invalid until both a domain and range are specified.
   *
   * The first generic corresponds to the data type of range elements.
   * The second generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleQuantile<Range, Unknown = never>(
    domain: Iterable<NumberValue | null | undefined>,
    range: Iterable<Range>,
  ): ScaleQuantile<Range, Unknown>;

  // -------------------------------------------------------------------------------
  // Threshold Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Threshold scales are similar to quantize scales, except they allow you to map arbitrary subsets of the domain to discrete values in the range.
   * The input domain is still continuous, and divided into slices based on a set of threshold values.
   *
   * If the number of values in the scale’s range is N+1, the number of values in the scale’s domain must be N.
   * If there are fewer than N elements in the domain, the additional values in the range are ignored.
   * If there are more than N elements in the domain, the scale may return undefined for some inputs.
   *
   * The first generic corresponds to the data type of domain values.
   * The second generic corresponds to the data type of range values.
   * The third generic corresponds to the data type of the unknown value.
   */
  export interface ScaleThreshold<Domain extends number | string | Date, Range, Unknown = never> {
    /**
     * Given a value in the input domain, returns the corresponding value in the output range.
     *
     * @param value A domain value.
     */
    (value: Domain): Range | Unknown;

    /**
     * Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, representing the inverse mapping from range to domain.
     * This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.
     *
     * @param value A range value.
     */
    invertExtent(value: Range): [Domain | undefined, Domain | undefined];

    /**
     * Returns the scale’s current domain.
     */
    domain(): Domain[];
    /**
     * Sets the scale’s domain to the specified array of values. The values must be in sorted ascending order, or the behavior of the scale is undefined.
     * The values are typically numbers, but any naturally ordered values (such as strings) will work; a threshold scale can be used to encode any type that is ordered.
     * If the number of values in the scale’s range is N+1, the number of values in the scale’s domain must be N.
     * If there are fewer than N elements in the domain, the additional values in the range are ignored.
     * If there are more than N elements in the domain, the scale may return undefined for some inputs.
     *
     * @param domain Array of domain values.
     */
    domain(domain: Iterable<Domain>): this;

    /**
     * Returns the scale’s current range.
     */
    range(): Range[];
    /**
     * Sets the scale’s range to the specified array of values. If the number of values in the scale’s domain is N, the number of values in the scale’s range must be N+1.
     * If there are fewer than N+1 elements in the range, the scale may return undefined for some inputs.
     * If there are more than N+1 elements in the range, the additional values are ignored.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;

    /**
     * Returns the current unknown value, which defaults to undefined.
     */
    unknown(): UnknownReturnType<Unknown, undefined>;
    /**
     * Sets the output value of the scale for undefined (or NaN) input values and returns this scale.
     *
     * @param value The output value of the scale for undefined (or NaN) input values.
     */
    unknown<NewUnknown>(value: NewUnknown): ScaleThreshold<Domain, Range, NewUnknown>;
  }

  /**
   * Constructs a new threshold scale with the specified range.
   * The domain defaults to [0.5].
   * If range is not specified, it defaults to [0, 1].
   * Thus, the default threshold scale is equivalent to the Math.round function for numbers; for example threshold(0.49) returns 0, and threshold(0.51) returns 1.
   *
   * The first generic corresponds to the data type of domain values.
   * The second generic corresponds to the data type of range values.
   * The third generic corresponds to the data type of the unknown value.
   *
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleThreshold<Domain extends number | string | Date = number, Range = number, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleThreshold<Domain, Range, Unknown>;
  /**
   * Constructs a new threshold scale with the specified domain and range.
   * Thus, the default threshold scale is equivalent to the Math.round function for numbers; for example threshold(0.49) returns 0, and threshold(0.51) returns 1.
   *
   * The first generic corresponds to the data type of domain values.
   * The second generic corresponds to the data type of range values.
   * The third generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of domain values.
   * @param range Array of range values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleThreshold<Domain extends number | string | Date, Range, Unknown = never>(
    domain: Iterable<Domain>,
    range: Iterable<Range>,
  ): ScaleThreshold<Domain, Range, Unknown>;

  // -------------------------------------------------------------------------------
  // Ordinal Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Unlike continuous scales, ordinal scales have a discrete domain and range. For example, an ordinal scale might map a set of named categories to a set of colors,
   * or determine the horizontal positions of columns in a column chart.
   *
   * The first element in the domain will be mapped to the first element in range, the second domain value to the second range value, and so on.
   * If there are fewer elements in the range than in the domain, the scale will reuse values from the start of the range.
   *
   * The first generic corresponds to the data type of domain values.
   * The second generic corresponds to the data type of range values.
   * The third generic corresponds to the data type of the unknown value.
   */
  export interface ScaleOrdinal<Domain extends { toString(): string }, Range, Unknown = never> {
    /**
     * Given a value in the input domain, returns the corresponding value in the output range.
     * If the given value is not in the scale’s domain, returns the unknown; or, if the unknown value is implicit (the default),
     * then the value is implicitly added to the domain and the next-available value in the range is assigned to value,
     * such that this and subsequent invocations of the scale given the same input value return the same output value.
     *
     * @param x A value from the domain.
     */
    (x: Domain): Range | Unknown;

    /**
     * Returns the scale's current domain.
     */
    domain(): Domain[];
    /**
     * Sets the domain to the specified array of values.
     *
     * The first element in domain will be mapped to the first element in the range,
     * the second domain value to the second range value, and so on.
     *
     * Domain values are stored internally in an InternMap from primitive value to index; the resulting index is then used to retrieve a value from the range.
     * Thus, an ordinal scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding range value.
     *
     * Setting the domain on an ordinal scale is optional if the unknown value is implicit (the default).
     * In this case, the domain will be inferred implicitly from usage by assigning each unique value passed to the scale a new value from the range.
     * Note that an explicit domain is recommended to ensure deterministic behavior, as inferring the domain from usage will be dependent on ordering.
     *
     * @param domain Array of domain values.
     */
    domain(domain: Iterable<Domain>): this;

    /**
     * Returns the scale's current range.
     */
    range(): Range[];
    /**
     * Sets the range of the ordinal scale to the specified array of values.
     *
     * The first element in the domain will be mapped to the first element in range, the second domain value to the second range value, and so on.
     *
     * If there are fewer elements in the range than in the domain, the scale will reuse values from the start of the range.
     *
     * @param range Array of range values.
     */
    range(range: Iterable<Range>): this;

    /**
     * Returns the current unknown value, which defaults to "implicit".
     */
    unknown(): UnknownReturnType<Unknown, { name: 'implicit' }>;
    /**
     * Sets the output value of the scale for unknown input values and returns this scale.
     * The implicit value enables implicit domain construction. scaleImplicit can be used as a convenience to set the implicit value.
     *
     * @param value Unknown value to be used or scaleImplicit to set implicit scale generation.
     */
    unknown<NewUnknown>(
      value: NewUnknown,
    ): NewUnknown extends { name: 'implicit' } ? ScaleOrdinal<Domain, Range> : ScaleOrdinal<Domain, Range, NewUnknown>;

    /**
     * Returns an exact copy of this ordinal scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  /**
   * Constructs a new ordinal scale with the specified range.
   * The domain defaults to the empty array.
   * If range is not specified, it defaults to the empty array; an ordinal scale always returns undefined until a non-empty range is defined.
   *
   * The generic corresponds to the data type of range elements.
   *
   * @param range An optional array of range values to initialize the scale with.
   */
  export function scaleOrdinal<Range>(range?: Iterable<Range>): ScaleOrdinal<string, Range>;
  /**
   * Constructs a new ordinal scale with the specified range.
   * The domain defaults to the empty array.
   * If range is not specified, it defaults to the empty array; an ordinal scale always returns undefined until a non-empty range is defined.
   *
   * The first generic corresponds to the data type of domain elements.
   * The second generic corresponds to the data type of range elements.
   * The third generic corresponds to the data type of the unknown value.
   *
   * @param range An optional array of range values to initialize the scale with.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleOrdinal<Domain extends { toString(): string }, Range, Unknown = never>(
    range?: Iterable<Range>,
  ): ScaleOrdinal<Domain, Range, Unknown>;
  /**
   * Constructs a new ordinal scale with the specified domain and range.
   *
   * The first generic corresponds to the data type of domain elements.
   * The second generic corresponds to the data type of range elements.
   * The third generic corresponds to the data type of the unknown value.
   *
   * @param domain Array of domain values.
   * @param range An optional array of range values to initialize the scale with.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleOrdinal<Domain extends { toString(): string }, Range, Unknown = never>(
    domain: Iterable<Domain>,
    range: Iterable<Range>,
  ): ScaleOrdinal<Domain, Range, Unknown>;

  /**
   * A special value for ordinal.unknown that enables implicit domain construction: unknown values are implicitly added to the domain.
   */
  export const scaleImplicit: { name: 'implicit' };

  // -------------------------------------------------------------------------------
  // Band Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Band scales are like ordinal scales except the output range is continuous and numeric.
   * Discrete output values are automatically computed by the scale by dividing the continuous range into uniform bands.
   * Band scales are typically used for bar charts with an ordinal or categorical dimension.
   * The unknown value of a band scale is effectively undefined: they do not allow implicit domain construction.
   *
   * The generic corresponds to the data type of domain elements.
   */
  export interface ScaleBand<Domain extends { toString(): string }> {
    /**
     * Given a value in the input domain, returns the start of the corresponding band derived from the output range.
     * If the given value is not in the scale’s domain, returns undefined.
     *
     * @param x  A value from the domain.
     */
    (x: Domain): number | undefined;

    /**
     * Returns to scale's current domain
     */
    domain(): Domain[];
    /**
     * Sets the domain to the specified array of values. The first element in domain will be mapped to the first band, the second domain value to the second band, and so on.
     * Domain values are stored internally in an InternMap from primitive value to index; the resulting index is then used to determine the band.
     * Thus, a band scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding band.
     *
     * @param domain Array of domain values.
     */
    domain(domain: Iterable<Domain>): this;

    /**
     * Returns the scale’s current range, which defaults to [0, 1].
     */
    range(): [number, number];
    /**
     * Sets the scale’s range to the specified two-element array of numbers. If the elements in the given array are not numbers, they will be coerced to numbers.
     * The default range is [0, 1].
     *
     * @param range A two-element array of numeric values.
     */
    range(range: Iterable<NumberValue>): this;

    /**
     * Sets the scale’s range to the specified two-element array of numbers while also enabling rounding.
     * If the elements in the given array are not numbers, they will be coerced to numbers.
     *
     * Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the shape-rendering “crispEdges” styles.
     *
     * @param range A two-element array of numeric values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns the current rounding status for the scale: enabled (= true) or disabled (= false).
     */
    round(): boolean;
    /**
     * Enables or disables rounding accordingly. If rounding is enabled, the start and stop of each band will be integers.
     * Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the shape-rendering “crispEdges” styles.
     * Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding!
     * Use band.align to specify how the leftover space is distributed.
     *
     * @param round Enable rounding (= true), disable rounding (= false).
     */
    round(round: boolean): this;

    /**
     * Returns the current inner padding which defaults to 0.
     */
    paddingInner(): number;
    /**
     * Sets the inner padding to the specified value which must be in the range [0, 1].
     * The inner padding determines the ratio of the range that is reserved for blank space between bands.
     *
     * The default setting is 0.
     *
     * @param padding Value for inner padding in [0, 1] interval.
     */
    paddingInner(padding: number): this;

    /**
     * Returns the current outer padding which defaults to 0.
     */
    paddingOuter(): number;
    /**
     * Sets the outer padding to the specified value which must be in the range [0, 1].
     * The outer padding determines the ratio of the range that is reserved for blank space before the first band and after the last band.
     *
     * The default setting is 0.
     *
     * @param padding Value for outer padding in [0, 1] interval.
     */
    paddingOuter(padding: number): this;

    /**
     * Returns the inner padding.
     */
    padding(): number;
    /**
     * A convenience method for setting the inner and outer padding to the same padding value.
     *
     * @param padding Value for inner and outer padding in [0, 1] interval.
     */
    padding(padding: number): this;

    /**
     * Returns the current alignment which defaults to 0.5.
     */
    align(): number;
    /**
     * Sets the alignment to the specified value which must be in the range [0, 1].
     *
     * The default is 0.5.
     *
     * The alignment determines how any leftover unused space in the range is distributed.
     * A value of 0.5 indicates that the outer patter should be equally distributed before the first band and after the last band;
     * i.e., the bands should be centered within the range. A value of 0 or 1 may be used to shift the bands to one side, say to position them adjacent to an axis.
     *
     * @param align Value for alignment setting in [0, 1] interval.
     */
    align(align: number): this;

    /**
     * Returns the width of each band.
     */
    bandwidth(): number;

    /**
     * Returns the distance between the starts of adjacent bands.
     */
    step(): number;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  /**
   * Constructs a new band scale with the specified range, no padding, no rounding and center alignment.
   * The domain defaults to the empty domain.
   * If range is not specified, it defaults to the unit range [0, 1].
   *
   * The generic corresponds to the data type of domain elements.
   *
   * @param range A two-element array of numeric values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scaleBand<Domain extends { toString(): string } = string>(
    range?: Iterable<NumberValue>,
  ): ScaleBand<Domain>;
  /**
   * Constructs a new band scale with the specified domain and range, no padding, no rounding and center alignment.
   *
   * The generic corresponds to the data type of domain elements.
   *
   * @param domain Array of domain values.
   * @param range A two-element array of numeric values.
   */
  export function scaleBand<Domain extends { toString(): string }>(
    domain: Iterable<Domain>,
    range: Iterable<NumberValue>,
  ): ScaleBand<Domain>;

  // -------------------------------------------------------------------------------
  // Point Scale Factory
  // -------------------------------------------------------------------------------

  /**
   * Point scales are a variant of band scales with the bandwidth fixed to zero.
   * Point scales are typically used for scatterplots with an ordinal or categorical dimension.
   * The unknown value of a point scale is always undefined: they do not allow implicit domain construction.
   *
   * The generic corresponds to the data type of domain elements.
   */
  export interface ScalePoint<Domain extends { toString(): string }> {
    /**
     * Given a value in the input domain, returns the corresponding point derived from the output range.
     * If the given value is not in the scale’s domain, returns undefined.
     *
     * @param x  A value from the domain.
     */
    (x: Domain): number | undefined;

    /**
     * Returns the scale's current domain.
     */
    domain(): Domain[];
    /**
     * Sets the domain to the specified array of values. The first element in domain will be mapped to the first point, the second domain value to the second point, and so on.
     * Domain values are stored internally in an InternMap from primitive value to index; the resulting index is then used to determine the point.
     * Thus, a point scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding point.
     *
     * @param domain Array of domain values.
     */
    domain(domain: Iterable<Domain>): this;

    /**
     * Returns the scale’s current range, which defaults to [0, 1].
     */
    range(): [number, number];
    /**
     * Sets the scale’s range to the specified two-element array of numbers.
     * If the elements in the given array are not numbers, they will be coerced to numbers.
     * The default range is [0, 1].
     *
     * @param range A two-element array of numeric values.
     */
    range(range: Iterable<NumberValue>): this;

    /**
     * Sets the scale’s range to the specified two-element array of numbers while also enabling rounding.
     * If the elements in the given array are not numbers, they will be coerced to numbers.
     *
     * Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the shape-rendering “crispEdges” styles.
     *
     * @param range A two-element array of numeric values.
     */
    rangeRound(range: Iterable<NumberValue>): this;

    /**
     * Returns the current rounding status for the scale: enabled (= true) or disabled (= false).
     */
    round(): boolean;
    /**
     * Enables or disables rounding accordingly. If rounding is enabled, the position of each point will be integers.
     * Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the shape-rendering “crispEdges” styles.
     * Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding!
     * Use point.align to specify how the leftover space is distributed.
     *
     * @param round Enable rounding (= true), disable rounding (= false).
     */
    round(round: boolean): this;

    /**
     * Returns the current outer padding which defaults to 0.
     * The outer padding determines the ratio of the range that is reserved for blank space
     * before the first point and after the last point.
     */
    padding(): number;
    /**
     * Sets the outer padding to the specified value which must be in the range [0, 1].
     * The outer padding determines the ratio of the range that is reserved for blank space
     * before the first point and after the last point.
     *
     * The default is 0.
     *
     * @param padding Value for outer padding in [0, 1] interval.
     */
    padding(padding: number): this;

    /**
     * Returns the current alignment which defaults to 0.5.
     */
    align(): number;
    /**
     * Sets the alignment to the specified value which must be in the range [0, 1].
     *
     * The alignment determines how any leftover unused space in the range is distributed.
     * A value of 0.5 indicates that the leftover space should be equally distributed before the first point and after the last point;
     * i.e., the points should be centered within the range. A value of 0 or 1 may be used to shift the points to one side, say to position them adjacent to an axis.
     *
     * The default value is 0.5.
     *
     * @param align Value for alignment setting in [0, 1] interval.
     */
    align(align: number): this;

    /**
     * Return 0.
     */
    bandwidth(): number;

    /**
     * Returns the distance between the starts of adjacent points.
     */
    step(): number;

    /**
     * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
     */
    copy(): this;
  }

  /**
   * Constructs a new point scale with the specified range, no padding, no rounding and center alignment.
   * The domain defaults to the empty domain.
   * If range is not specified, it defaults to the unit range [0, 1].
   *
   * The generic corresponds to the data type of domain elements.
   *
   * @param range A two-element array of numeric values.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function scalePoint<Domain extends { toString(): string } = string>(
    range?: Iterable<NumberValue>,
  ): ScalePoint<Domain>;
  /**
   * Constructs a new point scale with the specified domain and range, no padding, no rounding and center alignment.
   * The domain defaults to the empty domain.
   *
   * The generic corresponds to the data type of domain elements.
   *
   * @param domain Array of domain values.
   * @param range A two-element array of numeric values.
   */
  export function scalePoint<Domain extends { toString(): string }>(
    domain: Iterable<Domain>,
    range: Iterable<NumberValue>,
  ): ScalePoint<Domain>;
}

declare module 'd3-scale-chromatic' {
  // Last module patch version validated against: 3.0.0

  // -----------------------------------------------------------------------
  // Categorical
  // -----------------------------------------------------------------------
  /**
   * An array of ten categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeCategory10: readonly string[];
  /**
   * An array of eight categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeAccent: readonly string[];
  /**
   * An array of eight categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeDark2: readonly string[];
  /**
   * An array of ten categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeObservable10: readonly string[];
  /**
   * An array of twelve categorical colors represented as RGB hexadecimal strings.
   */
  export const schemePaired: readonly string[];
  /**
   * An array of nine categorical colors represented as RGB hexadecimal strings.
   */
  export const schemePastel1: readonly string[];
  /**
   * An array of eight categorical colors represented as RGB hexadecimal strings.
   */
  export const schemePastel2: readonly string[];
  /**
   * An array of nine categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeSet1: readonly string[];
  /**
   * An array of eight categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeSet2: readonly string[];
  /**
   * An array of twelve categorical colors represented as RGB hexadecimal strings.
   */
  export const schemeSet3: readonly string[];
  /**
   * An array of ten categorical colors authored by Tableau as part of Tableau 10 represented as RGB hexadecimal strings.
   */
  export const schemeTableau10: readonly string[];

  // -----------------------------------------------------------------------
  // Diverging
  // -----------------------------------------------------------------------
  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “BrBG” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateBrBG(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “BrBG” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeBrBG[9] contains an array of nine strings representing the nine colors of the
   *  brown-blue-green diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeBrBG: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PRGn” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePRGn(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PRGn” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePRGn[9] contains an array of nine strings representing the nine colors of the
   *  purple-green diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemePRGn: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PiYG” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePiYG(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PiYG” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePiYG[9] contains an array of nine strings representing the nine colors of the
   *  pink-yellow-green diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemePiYG: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PuOr” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePuOr(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PuOr” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePuOr[9] contains an array of nine strings representing the nine colors of the
   *  purple-orange diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemePuOr: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “RdBu” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateRdBu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “RdBu” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeRdBu[9] contains an array of nine strings representing the nine colors of the
   *  red-blue diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeRdBu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “RdGy” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateRdGy(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “RdGy” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeRdGy[9] contains an array of nine strings representing the nine colors of the
   *  red-grey diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeRdGy: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “RdYlBu” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateRdYlBu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “RdYlBu” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeRdYlBu[9] contains an array of nine strings representing the nine colors of the
   *  red-yellow-blue diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeRdYlBu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “RdYlGn” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateRdYlGn(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “RdYlGn” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeRdYlGn[9] contains an array of nine strings representing the nine colors of the
   *  red-yellow-green diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeRdYlGn: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Spectral” diverging color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateSpectral(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Spectral” diverging color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeSpectral[9] contains an array of nine strings representing the nine colors of the
   *  spectral diverging color scheme. Diverging color schemes support a size k ranging from 3 to 11.
   */
  export const schemeSpectral: ReadonlyArray<readonly string[]>;

  // -----------------------------------------------------------------------
  // Sequential
  // -----------------------------------------------------------------------
  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateBlues(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Blues” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeBlues[9] contains an array of nine strings representing the nine colors of the
   *  blue sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeBlues: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Greens” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateGreens(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Greens” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeGreens[9] contains an array of nine strings representing the nine colors of the
   *  green sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeGreens: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Greys” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateGreys(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Greys” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeGreys[9] contains an array of nine strings representing the nine colors of the
   *  grey sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeGreys: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Oranges” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateOranges(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Oranges” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeOranges[9] contains an array of nine strings representing the nine colors of the
   *  orange sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeOranges: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Purples” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePurples(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Purples” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePurples[9] contains an array of nine strings representing the nine colors of the
   *  purple sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemePurples: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “Reds” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateReds(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “Reds” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeReds[9] contains an array of nine strings representing the nine colors of the
   *  red sequential color scheme. Sequential, single-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeReds: ReadonlyArray<readonly string[]>;

  // -----------------------------------------------------------------------
  // Sequential(Multi-Hue)
  // -----------------------------------------------------------------------

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “turbo” color scheme by Anton Mikhailov.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateTurbo(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “viridis” perceptually-uniform color scheme designed by van der Walt, Smith and Firing for matplotlib,
   * represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateViridis(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “inferno” perceptually-uniform color scheme designed by van der Walt and Smith for matplotlib,
   * represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateInferno(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “magma” perceptually-uniform color scheme designed by van der Walt and Smith for matplotlib,
   * represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateMagma(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “plasma” perceptually-uniform color scheme designed by van der Walt and Smith for matplotlib,
   * represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolatePlasma(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “plasma” perceptually-uniform color scheme designed by van der Walt and Smith for matplotlib,
   * represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateCividis(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from a 180° rotation of Niccoli’s perceptual rainbow, represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateWarm(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from Niccoli’s perceptual rainbow, represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateCool(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from d3.interpolateWarm scale from [0.0, 0.5] followed by the d3.interpolateCool scale from [0.5, 1.0],
   * thus implementing the cyclical less-angry rainbow color scheme.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateRainbow(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “sinebow” color scheme by Jim Bumgardner and Charlie Loyd.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateSinebow(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from Green’s default Cubehelix represented as an RGB string.
   *
   * @param t A number in the interval [0, 1].
   */
  export function interpolateCubehelixDefault(t: number): string;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “BuGn” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateBuGn(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “BuGn” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeBuGn[9] contains an array of nine strings representing the nine colors of the
   *  blue-green sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeBuGn: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “BuPu” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateBuPu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “BuPu” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeBuPu[9] contains an array of nine strings representing the nine colors of the
   *  blue-purple sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeBuPu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “GnBu” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateGnBu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “GnBu” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeGnBu[9] contains an array of nine strings representing the nine colors of the
   *  green-blue sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeGnBu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “OrRd” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateOrRd(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “OrRd” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeOrRd[9] contains an array of nine strings representing the nine colors of the
   *  orange-red sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeOrRd: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PuBuGn” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePuBuGn(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PuBuGn” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePuBuGn[9] contains an array of nine strings representing the nine colors of the
   *  purple-blue-green sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemePuBuGn: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PuBu” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePuBu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PuBu” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePuBu[9] contains an array of nine strings representing the nine colors of the
   *  purple-blue sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemePuBu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “PuRd” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolatePuRd(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “PuRd” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemePuRd[9] contains an array of nine strings representing the nine colors of the
   *  purple-red sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemePuRd: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “RdPu” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateRdPu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “RdPu” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeRdPu[9] contains an array of nine strings representing the nine colors of the
   *  red-purple sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeRdPu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “YlGnBu” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateYlGnBu(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “YlGnBu” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeYlGnBu[9] contains an array of nine strings representing the nine colors of the
   *  yellow-green-blue sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeYlGnBu: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “YlGn” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateYlGn(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “YlGn” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeYlGn[9] contains an array of nine strings representing the nine colors of the
   *  yellow-green sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeYlGn: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “YlOrBr” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateYlOrBr(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “YlOrBr” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeYlOrBr[9] contains an array of nine strings representing the nine colors of the
   *  yellow-orange-brown sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeYlOrBr: ReadonlyArray<readonly string[]>;

  /**
   * Given a number t in the range [0,1], returns the corresponding color from the “YlOrRd” sequential color scheme represented as an RGB string.
   *
   * @param t Number in the range [0, 1].
   */
  export function interpolateYlOrRd(t: number): string;

  /**
   * An array of arrays of hexadecimal color strings from the “YlOrRd” sequential color scheme. The kth element of this array contains
   *  the color scheme of size k; for example, d3.schemeYlOrRd[9] contains an array of nine strings representing the nine colors of the
   *  yellow-orange-red sequential color scheme. Sequential, multi-hue color schemes support a size k ranging from 3 to 9.
   */
  export const schemeYlOrRd: ReadonlyArray<readonly string[]>;
}

declare module 'd3-selection' {
  // Last module patch version validated against: 3.0.0

  // --------------------------------------------------------------------------
  // Shared Type Definitions and Interfaces
  // --------------------------------------------------------------------------

  /**
   * BaseType serves as an alias for the 'minimal' data type which can be selected
   * without 'd3-selection' trying to use properties internally which would otherwise not
   * be supported.
   */
  export type BaseType = Element | EnterElement | Document | Window | null;

  /**
   * KeyType serves as alias for valid types that d3 supports as key for data binding
   */
  export type KeyType = string | number;

  /**
   * A helper interface which covers arguments like NodeListOf<T> or HTMLCollectionOf<T>
   * argument types
   */
  export interface ArrayLike<T> {
    length: number;
    item(index: number): T | null;
    [index: number]: T;
  }

  /**
   * An interface describing the element type of the Enter Selection group elements
   * created when invoking selection.enter().
   */
  export interface EnterElement {
    ownerDocument: Document;
    namespaceURI: string;
    appendChild(newChild: Node): Node;
    insertBefore(newChild: Node, refChild: Node): Node;
    querySelector(selectors: string): Element;
    querySelectorAll(selectors: string): NodeListOf<Element>;
  }

  /**
   * Container element type usable for mouse/touch functions
   */
  export type ContainerElement = HTMLElement | SVGSVGElement | SVGGElement;

  /**
   * A User interface event (e.g. mouse event, touch or MSGestureEvent) with captured clientX and clientY properties.
   */
  export interface ClientPointEvent {
    clientX: number;
    clientY: number;
  }

  /**
   * Interface for optional parameters map, when dispatching custom events
   * on a selection
   */
  export interface CustomEventParameters {
    /**
     * If true, the event is dispatched to ancestors in reverse tree order
     */
    bubbles: boolean;
    /**
     * If true, event.preventDefault is allowed
     */
    cancelable: boolean;
    /**
     * Any custom data associated with the event
     */
    detail: any;
  }

  /**
   * Callback type for selections and transitions
   */
  export type ValueFn<T extends BaseType, Datum, Result> = (
    this: T,
    datum: Datum,
    index: number,
    groups: T[] | ArrayLike<T>,
  ) => Result;

  /**
   * TransitionLike is a helper interface to represent a quasi-Transition, without specifying the full Transition  interface in this file.
   * For example, wherever d3-zoom allows a Transition to be passed in as an argument, it internally immediately invokes its `selection()`
   * method to retrieve the underlying Selection object before proceeding.
   * d3-brush uses a subset of Transition methods internally.
   * The use of this interface instead of the full imported Transition interface is [referred] to achieve
   * two things:
   * (1) the d3-transition module may not be required by a projects use case,
   * (2) it avoids possible complications from 'module augmentation' from d3-transition to Selection.
   */
  export interface TransitionLike<GElement extends BaseType, Datum> {
    selection(): Selection<GElement, Datum, any, any>;
    on(type: string, listener: null): TransitionLike<GElement, Datum>;
    on(type: string, listener: ValueFn<GElement, Datum, void>): TransitionLike<GElement, Datum>;
    tween(name: string, tweenFn: null): TransitionLike<GElement, Datum>;
    tween(name: string, tweenFn: ValueFn<GElement, Datum, (t: number) => void>): TransitionLike<GElement, Datum>;
  }

  // --------------------------------------------------------------------------
  // All Selection related interfaces and function
  // --------------------------------------------------------------------------

  /**
   * Select the first element that matches the specified selector string. If no elements match the selector, returns an empty selection.
   * If multiple elements match the selector, only the first matching element (in document order) will be selected.
   *
   * The first generic  "GElement" refers to the type of element to be selected. The second generic "OldDatum" refers to the type of the
   * datum, on the selected element. This is useful when re-selecting an element with a previously set, know datum type.
   *
   * @param selector CSS selector string
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function select<GElement extends BaseType, OldDatum>(
    selector: string,
  ): Selection<GElement, OldDatum, HTMLElement, any>;
  /**
   * Select the specified node element.
   *
   * The first generic  "GElement" refers to the type of element to be selected. The second generic "OldDatum" refers to the type of the
   * datum, on the selected element. This is useful when re-selecting an element with a previously set, know datum type.
   *
   * @param node An element to be selected
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function select<GElement extends BaseType, OldDatum>(
    node: GElement,
  ): Selection<GElement, OldDatum, null, undefined>;

  /**
   * Create an empty selection.
   */
  export function selectAll(selector?: null): Selection<null, undefined, null, undefined>;
  /**
   * Select all elements that match the specified selector string. The elements will be selected in document order (top-to-bottom).
   * If no elements in the document match the selector, returns an empty selection.
   *
   * The first generic "GElement" refers to the type of element to be selected. The second generic "OldDatum" refers to the type of the
   * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
   *
   * @param selector CSS selector string
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function selectAll<GElement extends BaseType, OldDatum>(
    selector: string,
  ): Selection<GElement, OldDatum, HTMLElement, any>;
  /**
   * Select the specified array, array-like, or iterable of nodes.
   * This is useful if you already have a reference to nodes, such as `this.childNodes` within an event listener or a global such as `document.links`.
   * The nodes may instead be an iterable, or a pseudo-array such as a NodeList.
   *
   * The first generic "GElement" refers to the type of element to be selected.
   * The second generic "OldDatum" refers to the type of the datum, of a selected element.
   *
   * @param nodes An array, array-like, or iterable of nodes
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function selectAll<GElement extends BaseType, OldDatum>(
    nodes: GElement[] | ArrayLike<GElement> | Iterable<GElement>,
  ): Selection<GElement, OldDatum, null, undefined>;

  /**
   * A D3 Selection of elements.
   *
   * The first generic "GElement" refers to the type of the selected element(s).
   * The second generic "Datum" refers to the type of the datum of a selected element(s).
   * The third generic "PElement" refers to the type of the parent element(s) in the D3 selection.
   * The fourth generic "PDatum" refers to the type of the datum of the parent element(s).
   */
  export interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    // Sub-selection -------------------------

    /**
     * For each selected element, select the first descendant element that matches the specified selector string.
     * If no element matches the specified selector for the current element, the element at the current index will
     * be null in the returned selection. If multiple elements match the selector, only the first matching element
     * in document order is selected. Selection.select does not affect grouping: it preserves the existing group
     * structure and indexes, and propagates data (if any) to selected children.
     *
     * If the current element has associated data, this data is propagated to the
     * corresponding selected element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    select<DescElement extends BaseType>(selector: string): Selection<DescElement, Datum, PElement, PDatum>;
    /**
     * Create an empty sub-selection. Selection.select does not affect grouping: it preserves the existing group
     * structure and indexes.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    select<DescElement extends BaseType>(selector: null): Selection<null, undefined, PElement, PDatum>;
    /**
     * For each selected element, select the descendant element returned by the selector function.
     * If no element is returned by the selector function for the current element, the element at the
     * current index will be null in the returned selection. Selection.select does not affect grouping:
     * it preserves the existing group structure and indexes, and propagates data (if any) to selected children.
     *
     * If the current element has associated data, this data is propagated to the
     * corresponding selected element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector A selector function, which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * It must return an element, or null if there is no matching element.
     */
    select<DescElement extends BaseType>(
      selector: ValueFn<GElement, Datum, DescElement>,
    ): Selection<DescElement, Datum, PElement, PDatum>;

    /**
     * Create an empty sub-selection. Selection.selectAll does affect grouping: The elements in the returned
     * selection are grouped by their corresponding parent node in this selection, the group at the current index will be empty.
     */
    selectAll(selector?: null): Selection<null, undefined, GElement, Datum>;
    /**
     * For each selected element, selects the descendant elements that match the specified selector string. The elements in the returned
     * selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector
     * for the current element, the group at the current index will be empty. Selection.selectAll does affect grouping: each selected descendant
     * is grouped by the parent element in the originating selection.
     *
     * The selected elements do not inherit data from this selection; use selection.data to propagate data to children.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectAll<DescElement extends BaseType, OldDatum>(
      selector: string,
    ): Selection<DescElement, OldDatum, GElement, Datum>;
    /**
     * For each selected element, selects the descendant elements returned by the selector function. The elements in the returned
     * selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector
     * for the current element, the group at the current index will be empty. Selection.selectAll does affect grouping: each selected descendant
     * is grouped by the parent element in the originating selection.
     *
     * The selected elements do not inherit data from this selection; use selection.data to propagate data to children.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector A selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an array of elements
     * (or an iterable, or a pseudo-array, such as a NodeList), or the empty array if there are no matching elements.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectAll<DescElement extends BaseType, OldDatum>(
      selector: ValueFn<GElement, Datum, DescElement[] | ArrayLike<DescElement> | Iterable<DescElement>>,
    ): Selection<DescElement, OldDatum, GElement, Datum>;

    /**
     * Filters the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector A CSS selector string to match when filtering.
     */
    filter(selector: string): Selection<GElement, Datum, PElement, PDatum>;
    /**
     * Filters the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * The generic refers to the type of element which will be selected after applying the filter, i.e. if the element types
     * contained in a pre-filter selection are narrowed to a subset as part of the filtering.
     *
     * @param selector A CSS selector string to match when filtering.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    filter<FilteredElement extends BaseType>(selector: string): Selection<FilteredElement, Datum, PElement, PDatum>;
    /**
     * Filter the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector  A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return true
     * for an element to be included, and false otherwise.
     */
    filter(selector: ValueFn<GElement, Datum, boolean>): Selection<GElement, Datum, PElement, PDatum>;
    /**
     * Filter the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector  A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return true
     * for an element to be included, and false otherwise.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    filter<FilteredElement extends BaseType>(
      selector: ValueFn<GElement, Datum, boolean>,
    ): Selection<FilteredElement, Datum, PElement, PDatum>;

    /**
     * Returns a new selection merging this selection with the specified other selection or transition.
     * The returned selection has the same number of groups and the same parents as this selection.
     * Any missing (null) elements in this selection are filled with the corresponding element,
     * if present (not null), from the specified selection. (If the other selection has additional groups or parents,
     * they are ignored.)
     *
     * This method is commonly used to merge the enter and update selections after a data-join.
     * After modifying the entering and updating elements separately, you can merge the two selections and
     * perform operations on both without duplicate code.
     *
     * This method is not intended for concatenating arbitrary selections, however: if both this selection
     * and the specified other selection have (non-null) elements at the same index, this selection’s element
     * is returned in the merge and the other selection’s element is ignored.
     *
     * @param other Selection to be merged.
     */
    merge(
      other: Selection<GElement, Datum, PElement, PDatum> | TransitionLike<GElement, Datum>,
    ): Selection<GElement, Datum, PElement, PDatum>;

    /**
     * Returns a new selection with the (first) child of each element of the current selection matching the selector.
     * Selects the first child that matches (if any).
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChild<DescElement extends BaseType>(selector?: string): Selection<DescElement, Datum, PElement, PDatum>;
    /**
     * Returns a new selection with the (first) child of each element of the current selection matching the selector.
     *
     * The first generic represents the type of the descendant element to be selected.
     * The second generic represents the type of any of the child elements.
     *
     * @param selector A selector function, which is evaluated for each of the children nodes, in order, being passed the child (child), the child’s index (i), and the list of children (children);
     * the method selects the first child for which the selector return truthy, if any.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChild<ResultElement extends BaseType, ChildElement extends BaseType>(
      selector: (child: ChildElement, i: number, children: ChildElement[]) => boolean,
    ): Selection<ResultElement, Datum, PElement, PDatum>;

    /**
     * Returns a new selection with the children of each element of the current selection matching the selector.
     * Selects the children that match (if any)
     *
     * The first generic represents the type of the descendant element to be selected.
     * The second generic refers to the type of the datum of the element to be selected.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChildren<DescElement extends BaseType, OldDatum>(
      selector?: string,
    ): Selection<DescElement, OldDatum, GElement, Datum>;
    /**
     * Returns a new selection with the children of each element of the current selection matching the selector.
     *
     * The first generic represents the type of the descendant element to be selected.
     * The second generic refers to the type of the datum of the element to be selected.
     * The third generic represents the type of any of the child elements.
     *
     * @param selector A selector function, which is evaluated for each of the children nodes, in order, being passed the child (child), the child’s index (i), and the list of children (children);
     * the method selects the first child for which the selector return truthy, if any.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChildren<ResultElement extends BaseType, ResultDatum, ChildElement extends BaseType>(
      selector: (child: ChildElement, i: number, children: ChildElement[]) => boolean,
    ): Selection<ResultElement, ResultDatum, GElement, Datum>;

    /**
     * Returns the selection (for symmetry with transition.selection).
     */
    selection(): this;

    // Modifying -------------------------------

    /**
     * Return the current value of the specified attribute for the first (non-null) element in the selection.
     * This is generally useful only if you know that the selection contains exactly one element.
     *
     * @param name Name of the attribute
     */
    attr(name: string): string;
    /**
     * Sets the attribute with the specified name to the specified value on the selected elements and returns this selection.
     * If the value is a constant, all elements are given the same attribute value;
     * otherwise, if the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s attribute.
     * A null value will remove the specified attribute.
     */
    attr(
      name: string,
      value:
        | null
        | string
        | number
        | boolean
        | ReadonlyArray<string | number>
        | ValueFn<GElement, Datum, null | string | number | boolean | ReadonlyArray<string | number>>,
    ): this;

    /**
     * Returns true if and only if the first (non-null) selected element has the specified classes.
     * This is generally useful only if you know the selection contains exactly one element.
     *
     * @param names A string of space-separated class names.
     */
    classed(names: string): boolean;
    /**
     * Assigns or unassigns the specified CSS class names on the selected elements by setting
     * the class attribute or modifying the classList property and returns this selection.
     * If the constant value is truthy, then all elements are assigned the specified classes; otherwise, the classes are unassigned.
     *
     * @param names A string of space-separated class names.
     * @param value A boolean flag (true = assign / false = unassign)
     */
    classed(names: string, value: boolean): this;
    /**
     * Assigns or unassigns the specified CSS class names on the selected elements by setting
     * the class attribute or modifying the classList property and returns this selection.
     * The assign/unassign status for the individual selected elements is determined by the boolean return
     * value of the value function.
     *
     * @param names A string of space-separated class names.
     * @param value A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to assign or unassign classes on each element.
     */
    classed(names: string, value: ValueFn<GElement, Datum, boolean>): this;

    /**
     * Returns the current value of the specified style property for the first (non-null) element in the selection.
     * The current value is defined as the element’s inline value, if present, and otherwise its computed value.
     * Accessing the current style value is generally useful only if you know the selection contains exactly one element.
     *
     * @param name Name of the style
     */
    style(name: string): string;
    /**
     * Clear the style with the specified name for the selected elements and returns this selection.
     *
     * @param name Name of the style
     * @param value null,to clear the style
     */
    style(name: string, value: null): this;
    /**
     * Sets the value of the style with the specified name for the selected elements and returns this selection.
     * All elements are given the same style value.
     *
     * @param name Name of the style
     * @param value Constant value for the style
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(name: string, value: string | number | boolean, priority?: null | 'important'): this;
    /**
     * Sets the value of the style with the specified name for the selected elements and returns this selection.
     * The value for the individual selected elements is determined by the value function.
     *
     * @param name Name of the style
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).  A null value will clear the style.
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(
      name: string,
      value: ValueFn<GElement, Datum, string | number | boolean | null>,
      priority?: null | 'important',
    ): this;

    /**
     * Return the current value of the specified property for the first (non-null) element in the selection.
     * This is generally useful only if you know that the selection contains exactly one element.
     *
     * @param name Name of the property
     */
    property(name: string): any;
    /**
     * Look up a local variable on the first node of this selection. Note that this is not equivalent to `local.get(selection.node())` in that it will not look up locals set on the parent node(s).
     *
     * @param name The `d3.local` variable to look up.
     */
    property<T>(name: Local<T>): T | undefined;
    /**
     * Sets the property with the specified name to the specified value on selected elements.
     * If the value is a constant, then all elements are given the same property value;
     * otherwise, if the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s property. A null value will delete the specified property.
     */
    property(name: string, value: ValueFn<GElement, Datum, any> | null): this;
    /**
     * Sets the value of the property with the specified name for the selected elements and returns this selection.
     * All elements are given the same property value.
     *
     * @param name Name of the property
     * @param value Constant value for the property
     */
    property(name: string, value: any): this;
    /**
     * Store a value in a `d3.local` variable.
     * This is equivalent to `selection.each(function (d, i, g) { name.set(this, value.call(this, d, i, g)); })` but more concise.
     *
     * @param name A `d3.local` variable
     * @param value A callback that returns the value to store
     */
    property<T>(name: Local<T>, value: ValueFn<GElement, Datum, T>): this;
    /**
     * Store a value in a `d3.local` variable for each node in the selection.
     * This is equivalent to `selection.each(function () { name.set(this, value); })` but more concise.
     *
     * @param name A `d3.local` variable
     * @param value A callback that returns the value to store
     */
    property<T>(name: Local<T>, value: T): this;

    /**
     * Returns the text content for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    text(): string;
    /**
     * Sets the text content to the specified value on all selected elements, replacing any existing child elements.
     * If the value is a constant, then all elements are given the same text content;
     * otherwise, if the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s text content.
     * A null value will clear the content.
     */
    text(value: null | string | number | boolean | ValueFn<GElement, Datum, string | number | boolean | null>): this;

    /**
     * Returns a string representation of the inner HTML for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    html(): string;
    /**
     * Sets the inner HTML to the specified value on all selected elements, replacing any existing child elements.
     * If the value is a constant, then all elements are given the same inner HTML;
     * otherwise, if the value is a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s inner HTML.
     * A null value will clear the content.
     */
    html(value: null | string | ValueFn<GElement, Datum, string | null>): this;

    /**
     * Appends a new element of this type (tag name) as the last child of each selected element,
     * or before the next following sibling in the update selection if this is an enter selection.
     * The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data;
     * however, note that selection.order may still be required if updating elements change order
     * (i.e., if the order of new data is inconsistent with old data).
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * @param type A string representing the tag name.
     */
    append<K extends keyof ElementTagNameMap>(type: K): Selection<ElementTagNameMap[K], Datum, PElement, PDatum>;
    /**
     * Appends a new element of this type (tag name) as the last child of each selected element,
     * or before the next following sibling in the update selection if this is an enter selection.
     * The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data;
     * however, note that selection.order may still be required if updating elements change order
     * (i.e., if the order of new data is inconsistent with old data).
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type A string representing the tag name. The specified name may have a namespace prefix, such as svg:text
     * to specify a text attribute in the SVG namespace. If no namespace is specified, the namespace will be inherited
     * from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used
     * (for example, svg implies svg:svg)
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    append<ChildElement extends BaseType>(type: string): Selection<ChildElement, Datum, PElement, PDatum>;
    /**
     * Appends a new element of the type provided by the element creator function as the last child of each selected element,
     * or before the next following sibling in the update selection if this is an enter selection.
     * The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data;
     * however, note that selection.order may still be required if updating elements change order
     * (i.e., if the order of new data is inconsistent with old data).
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type A creator function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return
     * an element to be appended. (The function typically creates a new element, but it may instead return an existing element.)
     */
    append<ChildElement extends BaseType>(
      type: ValueFn<GElement, Datum, ChildElement>,
    ): Selection<ChildElement, Datum, PElement, PDatum>;

    /**
     * Inserts a new element of the specified type (tag name) before the first element matching the specified
     * before selector for each selected element. For example, a before selector :first-child will prepend nodes before the first child.
     * If before is not specified, it defaults to null. (To append elements in an order consistent with bound data, use selection.append.)
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type A string representing the tag name for the element type to be inserted.
     * @param before One of:
     *   * A CSS selector string for the element before which the insertion should occur.
     *   * A child selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     *     the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return the child element
     *     before which the element should be inserted.
     */
    insert<K extends keyof ElementTagNameMap>(
      type: K,
      before?: string | ValueFn<GElement, Datum, BaseType>,
    ): Selection<ElementTagNameMap[K], Datum, PElement, PDatum>;
    /**
     * Inserts a new element of the specified type (tag name) before the first element matching the specified
     * before selector for each selected element. For example, a before selector :first-child will prepend nodes before the first child.
     * If before is not specified, it defaults to null. (To append elements in an order consistent with bound data, use selection.append.)
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type One of:
     *   * A string representing the tag name for the element type to be inserted. The specified name may have a namespace prefix,
     *     such as svg:text to specify a text attribute in the SVG namespace. If no namespace is specified, the namespace will be inherited
     *     from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used
     *     (for example, svg implies svg:svg)
     *   * A creator function which is evaluated for each selected element, in order, being passed the current datum (d),
     *     the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return
     *     an element to be inserted. (The function typically creates a new element, but it may instead return an existing element.)
     * @param before One of:
     *   * A CSS selector string for the element before which the insertion should occur.
     *   * A child selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     *     the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return the child element
     *     before which the element should be inserted.
     */
    insert<ChildElement extends BaseType>(
      type: string | ValueFn<GElement, Datum, ChildElement>,
      before?: string | ValueFn<GElement, Datum, BaseType>,
    ): Selection<ChildElement, Datum, PElement, PDatum>;

    /**
     * Removes the selected elements from the document.
     * Returns this selection (the removed elements) which are now detached from the DOM.
     */
    remove(): this;

    /**
     * Inserts clones of the selected elements immediately following the selected elements and returns a selection of the newly
     * added clones. If deep is true, the descendant nodes of the selected elements will be cloned as well. Otherwise, only the elements
     * themselves will be cloned.
     *
     * @param deep Perform deep cloning if this flag is set to true.
     */
    clone(deep?: boolean): Selection<GElement, Datum, PElement, PDatum>;

    /**
     * Return a new selection that contains a copy of each group in this selection sorted according
     * to the compare function. After sorting, re-inserts elements to match the resulting order (per selection.order).
     *
     * Note that sorting is not guaranteed to be stable; however, it is guaranteed to have the same
     * behavior as your browser’s built-in sort method on arrays.
     *
     * @param comparator An optional comparator function, which defaults to "ascending". The function is passed
     * two elements’ data a and b to compare. It should return either a negative, positive, or zero value.
     * If negative, then a should be before b; if positive, then a should be after b; otherwise, a and b are
     * considered equal and the order is arbitrary.
     */
    sort(comparator?: (a: Datum, b: Datum) => number): this;

    /**
     * Re-insert elements into the document such that the document order of each group matches the selection order.
     * This is equivalent to calling selection.sort if the data is already sorted, but much faster.
     */
    order(): this;

    /**
     * Re-insert each selected element, in order, as the last child of its parent.
     */
    raise(): this;

    /**
     * Re-insert each selected element, in order, as the first child of its parent.
     */
    lower(): this;

    // Data Join ---------------------------------

    /**
     * Returns the array of data for the selected elements.
     */
    data(): Datum[];
    /**
     * Joins the specified array of data with the selected elements, returning a new selection that represents
     * the update selection: the elements successfully bound to data. Also defines the enter and exit selections on
     * the returned selection, which can be used to add or remove elements to correspond to the new data.
     *
     * The data is specified for each group in the selection. If the selection has multiple groups
     * (such as d3.selectAll followed by selection.selectAll), then data should typically be specified as a function.
     *
     * If a key function is not specified, then the first datum in data is assigned to the first selected element,
     * the second datum to the second selected element, and so on.
     * A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index,
     * by computing a string identifier for each datum and element.
     *
     * The update and enter selections are returned in data order, while the exit selection preserves the selection
     * order prior to the join. If a key function is specified, the order of elements in the selection may not match
     * their order in the document; use selection.order or selection.sort as needed.
     *
     * This method cannot be used to clear bound data; use selection.datum instead.
     *
     * For details see: {@link https://github.com/d3/d3-selection#joining-data }
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param data The specified data is an array or iterable of arbitrary values (e.g., numbers or objects)
     * or a value function which will be evaluated for each group in order, being passed the group’s parent datum
     * (d, which may be undefined), the group index (i), and the selection’s parent nodes (nodes),
     * with this as the group’s parent element. The function returns an array or iterable of values for each group.
     * @param key An optional key function which is evaluated for each selected element, in order, being passed the
     * current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]); the returned string is the element’s key.
     * The key function is then also evaluated for each new datum in data, being passed the current datum (d),
     * the current index (i), and the group’s new data, with this as the group’s parent DOM element (nodes[i]); the returned string is the datum’s key.
     * The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key,
     * the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.
     */
    data<NewDatum>(
      data: NewDatum[] | Iterable<NewDatum> | ValueFn<PElement, PDatum, NewDatum[] | Iterable<NewDatum>>,
      key?: ValueFn<GElement | PElement, Datum | NewDatum, KeyType>,
    ): Selection<GElement, NewDatum, PElement, PDatum>;

    /**
     * Appends, removes and reorders elements as necessary to match the data that was previously bound by `selection.data`, returning the merged enter and update selection.
     * This method is a convenient alternative to the more explicit `selection.enter`, `selection.exit`, `selection.append` and `selection.remove`.
     *
     * The "matching" logic is determined by the key function passed to `selection.data`.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    join<K extends keyof ElementTagNameMap, OldDatum = Datum>(
      enter: K,
      update?: (
        elem: Selection<GElement, Datum, PElement, PDatum>,
      ) => Selection<GElement, Datum, PElement, PDatum> | TransitionLike<GElement, Datum> | undefined,
      exit?: (elem: Selection<GElement, OldDatum, PElement, PDatum>) => void,
    ): Selection<GElement | ElementTagNameMap[K], Datum, PElement, PDatum>;
    /**
     * Appends, removes and reorders elements as necessary to match the data that was previously bound by `selection.data`, returning the merged enter and update selection.
     * This method is a convenient alternative to the more explicit `selection.enter`, `selection.exit`, `selection.append` and `selection.remove`.
     *
     * The "matching" logic is determined by the key function passed to `selection.data`.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    join<ChildElement extends BaseType, OldDatum = Datum>(
      enter:
        | string
        | ((
            elem: Selection<EnterElement, Datum, PElement, PDatum>,
          ) => Selection<ChildElement, Datum, PElement, PDatum> | TransitionLike<GElement, Datum>),
      update?: (
        elem: Selection<GElement, Datum, PElement, PDatum>,
      ) => Selection<GElement, Datum, PElement, PDatum> | TransitionLike<GElement, Datum> | undefined,
      exit?: (elem: Selection<GElement, OldDatum, PElement, PDatum>) => void,
    ): Selection<ChildElement | GElement, Datum, PElement, PDatum>;

    /**
     * Return the enter selection: placeholder nodes for each datum that had no corresponding DOM element
     * in the selection. (The enter selection is empty for selections not returned by selection.data.)
     */
    enter(): Selection<EnterElement, Datum, PElement, PDatum>;

    /**
     * Returns the exit selection: existing DOM elements in the selection for which no new datum was found.
     * (The exit selection is empty for selections not returned by selection.data.)
     *
     * IMPORTANT: The generic refers to the type of the old datum associated with the exit selection elements.
     * Ensure you set the generic to the correct type, if you need to access the data on the exit selection in
     * follow-up steps, e.g. to set styles as part of an exit transition before removing them.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    exit<OldDatum>(): Selection<GElement, OldDatum, PElement, PDatum>;

    /**
     * Returns the bound datum for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    datum(): Datum;
    /**
     * Delete the bound data for each element in the selection.
     */
    datum(value: null): Selection<GElement, undefined, PElement, PDatum>;
    /**
     * Sets the element’s bound data using the specified value function on all selected elements.
     * Unlike selection.data, this method does not compute a join and does not affect
     * indexes or the enter and exit selections.
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param value A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element (nodes[i]). The function is then used to set each element’s new data.
     * A null value will delete the bound data.
     */
    datum<NewDatum>(value: ValueFn<GElement, Datum, NewDatum>): Selection<GElement, NewDatum, PElement, PDatum>;
    /**
     * Sets the element’s bound data to the specified value on all selected elements.
     * Unlike selection.data, this method does not compute a join and does not affect
     * indexes or the enter and exit selections.
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param value A value object to be used as the datum for each element.
     */
    datum<NewDatum>(value: NewDatum): Selection<GElement, NewDatum, PElement, PDatum>;

    // Event Handling -------------------

    /**
     * Return the currently-assigned listener for the specified event typename on the first (non-null) selected element,
     * if any, If multiple typenames are specified, the first matching listener is returned.
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     */
    on(typenames: string): ((this: GElement, event: any, d: Datum) => void) | undefined;
    /**
     * Remove a listener for the specified event type names. To remove all listeners for a given name,
     * pass null as the listener and ".foo" as the typename, where foo is the name; to remove all listeners with no name, specify "." as the typename.
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     * @param listener null to indicate removal of listener
     */
    on(typenames: string, listener: null): this;
    /**
     * Add an event listener for the specified event type names. If an event listener was previously registered for the same typename
     * on a selected element, the old listener is removed before the new listener is added.
     *
     * When a specified event is dispatched on a selected node, the specified listener will be evaluated for each selected element.
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     * @param listener A listener function which will be evaluated for each selected element,
     * being passed the current event (event) and the current datum (d), with this as the current DOM element (event.currentTarget).
     * Listeners always see the latest datum for their element.
     * Note: while you can use event.pageX and event.pageY directly,
     * it is often convenient to transform the event position to the local coordinate system of that element that received the event using d3.pointer.
     * @param options An optional options object may specify characteristics about the event listener, such as wehether it is captures or passive; see element.addEventListener.
     */
    on(typenames: string, listener: (this: GElement, event: any, d: Datum) => void, options?: any): this;

    /**
     * Dispatches a custom event of the specified type to each selected element, in order.
     * An optional parameters map may be specified to set additional properties of the event.
     *
     * @param type Name of event to dispatch
     * @param parameters An optional value map with custom event parameters
     */
    dispatch(type: string, parameters?: CustomEventParameters): this;
    /**
     * Dispatches a custom event of the specified type to each selected element, in order.
     * An optional value function returning a parameters map for each element in the selection may be specified to set additional properties of the event.
     *
     * @param type Name of event to dispatch
     * @param parameters A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element (nodes[i]). It must return the parameters map for the current element.
     */
    dispatch(type: string, parameters?: ValueFn<GElement, Datum, CustomEventParameters>): this;

    // Control Flow ----------------------

    /**
     * Invoke the specified function for each selected element, passing in the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously.
     *
     * @param func A function which is invoked for each selected element,
     *             being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     */
    each(func: ValueFn<GElement, Datum, void>): this;

    /**
     * Invoke the specified function exactly once, passing in this selection along with any optional arguments.
     * Returns this selection.
     *
     * @param func A function which is passed this selection as the first argument along with any optional arguments.
     * @param args List of optional arguments to be passed to the callback function.
     */
    call<Args extends any[]>(
      func: (selection: Selection<GElement, Datum, PElement, PDatum>, ...args: Args) => void,
      ...args: Args
    ): this;

    /**
     * Return true if this selection contains no (non-null) elements.
     */
    empty(): boolean;

    /**
     * Return an array of all (non-null) elements in this selection.
     */
    nodes(): GElement[];

    /**
     * Return the first (non-null) element in this selection. If the selection is empty, returns null.
     */
    node(): GElement | null;

    /**
     * Returns the total number of elements in this selection.
     */
    size(): number;

    /**
     * Returns an iterator over the selected (non-null) elements.
     */
    [Symbol.iterator](): Iterator<GElement>;
  }

  /**
   * Selects the root element, document.documentElement. This function can also be used to test for selections
   * (instanceof d3.selection) or to extend the selection prototype.
   */
  export type SelectionFn = () => Selection<HTMLElement, any, null, undefined>;

  /**
   * Selects the root element, document.documentElement. This function can also be used to test for selections
   * (instanceof d3.selection) or to extend the selection prototype.
   */
  export const selection: SelectionFn;

  // ---------------------------------------------------------------------------
  // pointer.js and pointers.js related
  // ---------------------------------------------------------------------------

  /**
   * Returns a two-element array of numbers [x, y] representing the coordinates of the specified event relative to the specified target.
   * event can be a MouseEvent, a PointerEvent, a Touch, or a custom event holding a UIEvent as event.sourceEvent.
   *
   * If target is not specified, it defaults to the source event’s currentTarget property, if available.
   * If the target is an SVG element, the event’s coordinates are transformed using the inverse of the screen coordinate transformation matrix.
   * If the target is an HTML element, the event’s coordinates are translated relative to the top-left corner of the target’s bounding client rectangle.
   * (As such, the coordinate system can only be translated relative to the client coordinates. See also GeometryUtils.)
   * Otherwise, [event.pageX, event.pageY] is returned.
   *
   * @param event The specified event.
   * @param target The target which the coordinates are relative to.
   */
  export function pointer(event: any, target?: any): [number, number];

  /**
   * Returns an array [[x0, y0], [x1, y1]…] of coordinates of the specified event’s pointer locations relative to the specified target.
   * For touch events, the returned array of positions corresponds to the event.touches array; for other events, returns a single-element array.
   *
   * If target is not specified, it defaults to the source event’s currentTarget property, if any.
   *
   * @param event The specified event.
   * @param target The target which the coordinates are relative to.
   */
  export function pointers(event: any, target?: any): Array<[number, number]>;

  // ---------------------------------------------------------------------------
  // style
  // ---------------------------------------------------------------------------

  /**
   * Returns the value of the style property with the specified name for the specified node.
   * If the node has an inline style with the specified name, its value is returned; otherwise, the computed property value is returned.
   * See also selection.style.
   *
   * @param node A DOM node (e.g. HTMLElement, SVGElement) for which to retrieve the style property.
   * @param name Style property name.
   */
  export function style(node: Element, name: string): string;

  // ---------------------------------------------------------------------------
  // local.js related
  // ---------------------------------------------------------------------------

  export interface Local<T> {
    /**
     * Retrieves a local variable stored on the node (or one of its parents).
     *
     * @param node A node element.
     */
    get(node: Element): T | undefined;
    /**
     * Deletes the value associated with the given node. Values stored on ancestors are not affected, meaning that child nodes will still see inherited values.
     *
     * This function returns true if there was a value stored directly on the node, and false otherwise.
     *
     * @param node A node element.
     */
    remove(node: Element): boolean;
    /**
     * Store a value for this local variable. Calling `.get()` on children of this node will also retrieve the variable's value.
     *
     * @param node A node element.
     * @param value Value to store locally
     */
    set(node: Element, value: T): T;
    /**
     * Obtain a string with the internally assigned property name for the local
     * which is used to store the value on a node
     */
    toString(): string;
  }

  /**
   * Obtain a new local variable
   *
   * The generic refers to the type of the variable to store locally.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function local<T>(): Local<T>;

  // ---------------------------------------------------------------------------
  // namespace.js related
  // ---------------------------------------------------------------------------

  /**
   * Interface for object literal containing local name with related fully qualified namespace
   */
  export interface NamespaceLocalObject {
    /**
     * Fully qualified namespace
     */
    space: string;
    /**
     * Name of the local to be namespaced.
     */
    local: string;
  }

  /**
   * Obtain an object with properties of fully qualified namespace string and
   * name of local by parsing a shorthand string "prefix:local". If the prefix
   * does not exist in the "namespaces" object provided by d3-selection, then
   * the local name is returned as a simple string.
   *
   * @param prefixedLocal A string composed of the namespace prefix and local
   * name separated by colon, e.g. "svg:text".
   */
  export function namespace(prefixedLocal: string): NamespaceLocalObject | string;

  // ---------------------------------------------------------------------------
  // namespaces.js related
  // ---------------------------------------------------------------------------

  /**
   * Interface for maps of namespace prefixes to corresponding fully qualified namespace strings
   */
  export interface NamespaceMap {
    [prefix: string]: string;
  }

  /**
   * Map of namespace prefixes to corresponding fully qualified namespace strings
   */
  export const namespaces: NamespaceMap;

  // ---------------------------------------------------------------------------
  // window.js related
  // ---------------------------------------------------------------------------

  /**
   * Returns the owner window for the specified node. If node is a node, returns the owner document’s default view;
   * if node is a document, returns its default view; otherwise returns the node.
   *
   * @param DOMNode A DOM element
   */
  export function window(DOMNode: Window | Document | Element): Window;

  // ---------------------------------------------------------------------------
  // creator.js and matcher.js Complex helper closure generating functions
  // for explicit bound-context dependent use
  // ---------------------------------------------------------------------------

  /**
   * Given the specified element name, returns a single-element selection containing
   * a detached element of the given name in the current document.
   *
   * @param name tag name of the element to be added.
   */
  export function create<K extends keyof ElementTagNameMap>(
    name: K,
  ): Selection<ElementTagNameMap[K], undefined, null, undefined>;
  /**
   * Given the specified element name, returns a single-element selection containing
   * a detached element of the given name in the current document.
   *
   * @param name Tag name of the element to be added. See "namespace" for details on supported namespace prefixes,
   * such as for SVG elements.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function create<NewGElement extends Element>(name: string): Selection<NewGElement, undefined, null, undefined>;

  /**
   * Given the specified element name, returns a function which creates an element of the given name,
   * assuming that "this" is the parent element.
   *
   * @param name Tag name of the element to be added.
   */
  export function creator<K extends keyof ElementTagNameMap>(name: K): (this: BaseType) => ElementTagNameMap[K];
  /**
   * Given the specified element name, returns a function which creates an element of the given name,
   * assuming that "this" is the parent element.
   *
   * The generic refers to the type of the new element to be returned by the creator function.
   *
   * @param name Tag name of the element to be added. See "namespace" for details on supported namespace prefixes,
   * such as for SVG elements.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function creator<NewGElement extends Element>(name: string): (this: BaseType) => NewGElement;

  /**
   * Given the specified selector, returns a function which returns true if "this" element matches the specified selector.
   *
   * @param selector A CSS selector string.
   */
  export function matcher(selector: string): (this: BaseType) => boolean;

  // ----------------------------------------------------------------------------
  // selector.js and selectorAll.js related functions
  // ----------------------------------------------------------------------------

  /**
   * Given the specified selector, returns a function which returns the first descendant of "this" element
   * that matches the specified selector.
   *
   * The generic refers to the type of the returned descendant element.
   *
   * @param selector A CSS selector string.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function selector<DescElement extends Element>(selector: string): (this: BaseType) => DescElement;

  /**
   * Given the specified selector, returns a function which returns all descendants of "this" element that match the specified selector.
   *
   * The generic refers to the type of the returned descendant element.
   *
   * @param selector A CSS selector string.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function selectorAll<DescElement extends Element>(
    selector: string,
  ): (this: BaseType) => NodeListOf<DescElement>;
}

declare module 'd3-shape' {
  // Last module patch version validated against: 3.1.0

  import { Path } from 'd3-path';

  // -----------------------------------------------------------------------------------
  // Shared Types and Interfaces
  // -----------------------------------------------------------------------------------

  /**
   * @deprecated
   * This interface is used to bridge the gap between two incompatible versions of TypeScript (see [#25944](https://github.com/Microsoft/TypeScript/pull/25944)).
   * Use `CanvasPathMethods` instead with TS <= 3.0 and `CanvasPath` with TS >= 3.1.
   */
  export interface CanvasPath_D3Shape {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    closePath(): void;
    ellipse(
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
      rotation: number,
      startAngle: number,
      endAngle: number,
      anticlockwise?: boolean,
    ): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
  }

  // -----------------------------------------------------------------------------------
  // Arc Generator
  // -----------------------------------------------------------------------------------

  /**
   * Interface corresponding to the minimum data type assumed by the accessor functions of the Arc generator.
   */
  export interface DefaultArcObject {
    /**
     * Inner radius of arc.
     */
    innerRadius: number;
    /**
     * Outer radius of arc.
     */
    outerRadius: number;
    /**
     * Start angle of arc. The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    startAngle: number;
    /**
     * End angle of arc. The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    endAngle: number;
    /**
     * Optional. Pad angle of arc in radians.
     */
    padAngle?: number | undefined;
  }

  /**
   * The arc generator produces a circular or annular sector, as in a pie or donut chart.
   *
   * If the difference between the start and end angles (the angular span) is greater than τ, the arc generator will produce a complete circle or annulus.
   * If it is less than τ, arcs may have rounded corners and angular padding. Arcs are always centered at ⟨0,0⟩; use a transform (see: SVG, Canvas) to move the arc to a different position.
   *
   * See also the pie generator, which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.
   *
   * The first generic corresponds to the type of the "this" context within which the arc generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type for which the arc is to be generated.
   */
  export interface Arc<This, Datum> {
    /**
     * Generates an arc for the given arguments.
     *
     * IMPORTANT: If the rendering context of the arc generator is null,
     * then the arc is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    (this: This, d: Datum, ...args: any[]): string | null;
    /**
     * Generates an arc for the given arguments.
     *
     * IMPORTANT: If the arc generator has been configured with a rendering context,
     * then the arc is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    (this: This, d: Datum, ...args: any[]): void;

    /**
     * Computes the midpoint [x, y] of the center line of the arc that would be generated by the given arguments.
     *
     * To be consistent with the generated arc, the accessors must be deterministic, i.e., return the same value given the same arguments.
     * The midpoint is defined as (startAngle + endAngle) / 2 and (innerRadius + outerRadius) / 2.
     *
     * Note that this is not the geometric center of the arc, which may be outside the arc;
     * this method is merely a convenience for positioning labels.
     *
     * The method is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that are passed into the arc generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    centroid(d: Datum, ...args: any[]): [number, number];

    /**
     * Returns the current inner radius accessor, which defaults to a function returning the innerRadius property
     * of the first argument passed into it.
     */
    innerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the inner radius to the specified number and returns this arc generator.
     *
     * Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a sqrt scale.
     * More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius Constant radius.
     */
    innerRadius(radius: number): this;
    /**
     * Sets the inner radius to the specified function and returns this arc generator.
     *
     * Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a sqrt scale.
     * More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    innerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current outer radius accessor, which defaults to a function returning the outerRadius property
     * of the first argument passed into it.
     */
    outerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the outer radius to the specified number and returns this arc generator.
     *
     * Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart,
     * often in conjunction with a sqrt scale. More commonly, a constant outer radius is used for a pie or donut chart.
     * If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius Constant radius.
     */
    outerRadius(radius: number): this;
    /**
     * Sets the outer radius to the specified function and returns this arc generator.
     *
     * Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart,
     * often in conjunction with a sqrt scale. More commonly, a constant outer radius is used for a pie or donut chart.
     * If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    outerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current corner radius accessor, which defaults to a function returning a constant value of zero.
     */
    cornerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the corner radius to the specified number and returns this arc generator.
     *
     * If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius.
     * For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded.
     *
     * The corner radius may not be larger than (outerRadius - innerRadius) / 2.
     * In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect.
     * This is occurs more often with the inner corners.
     *
     * @param radius Constant radius.
     */
    cornerRadius(radius: number): this;
    /**
     * Sets the corner radius to the specified function and returns this arc generator.
     *
     * The corner radius may not be larger than (outerRadius - innerRadius) / 2.
     * In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect.
     * This is occurs more often with the inner corners.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    cornerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current start angle accessor, which defaults to a function returning the startAngle property
     * of the first argument passed into it.
     */
    startAngle(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the start angle to the specified number and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle Constant angle in radians.
     */
    startAngle(angle: number): this;
    /**
     * Sets the start angle to the specified function and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    startAngle(angle: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current end angle accessor, which defaults to a function returning the endAngle property
     * of the first argument passed into it.
     */
    endAngle(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the end angle to the specified number and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle Constant angle in radians.
     */
    endAngle(angle: number): this;
    /**
     * Sets the end angle to the specified function and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    endAngle(angle: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current pad angle accessor, which defaults to a function returning the padAngle property
     * of the first argument passed into it, or false if no data are passed in or the property is not defined.
     */
    padAngle(): (this: This, d: Datum, ...args: any[]) => number | undefined;
    /**
     * Sets the pad angle to the specified number and returns this arc generator.
     *
     * The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as padRadius * padAngle. This distance is subtracted equally from the start and end of the arc.
     * If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored. If the inner radius or angular span is small relative to the pad angle,
     * it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector.
     * For this reason, padding is typically only applied to annular sectors (i.e., when innerRadius is positive).
     *
     * The recommended minimum inner radius when using padding is outerRadius * padAngle / sin(θ), where θ is the angular span of the smallest arc before padding.
     * For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels.
     *
     * Often, the pad angle is not set directly on the arc generator, but is instead computed by the pie generator so as to ensure that the area of padded arcs is proportional to their value;
     * see pie.padAngle. See the pie padding animation for illustration.
     * If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.
     *
     * @param angle Constant angle in radians.
     */
    padAngle(angle: number | undefined): this;
    /**
     * Sets the pad angle to the specified function and returns this arc generator.
     *
     * The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as padRadius * padAngle. This distance is subtracted equally from the start and end of the arc.
     * If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored. If the inner radius or angular span is small relative to the pad angle,
     * it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector.
     * For this reason, padding is typically only applied to annular sectors (i.e., when innerRadius is positive).
     *
     * The recommended minimum inner radius when using padding is outerRadius * padAngle / sin(θ), where θ is the angular span of the smallest arc before padding.
     * For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels.
     *
     * Often, the pad angle is not set directly on the arc generator, but is instead computed by the pie generator so as to ensure that the area of padded arcs is proportional to their value;
     * see pie.padAngle. See the pie padding animation for illustration.
     * If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    padAngle(angle: (this: This, d: Datum, ...args: any[]) => number | undefined): this;

    /**
     * Returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt(innerRadius * innerRadius + outerRadius * outerRadius).
     */
    padRadius(): ((this: This, d: Datum, ...args: any[]) => number) | null;
    /**
     * Sets the pad radius to the specified function or number and returns this arc generator.
     * The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius * padAngle.
     */
    padRadius(radius: null | number | ((this: This, d: Datum, ...args: any[]) => number)): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this arc generator.
     * If context is not specified, returns the current context, which defaults to null.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * Constructs a new arc generator with the default settings.
   *
   * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   */
  export function arc(): Arc<any, DefaultArcObject>;
  /**
   * Constructs a new arc generator with the default settings.
   *
   * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The generic corresponds to the datum type representing a arc.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function arc<Datum>(): Arc<any, Datum>;
  /**
   * Constructs a new arc generator with the default settings.
   *
   * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The first generic corresponds to the type of the "this" context within which the arc generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type representing a arc.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function arc<This, Datum>(): Arc<This, Datum>;

  // -----------------------------------------------------------------------------------
  // Pie Generator
  // -----------------------------------------------------------------------------------

  /**
   * Element of the Arc Datums Array created by invoking the Pie generator.
   *
   * The generic refers to the data type of an element in the input array passed into the Pie generator.
   */
  export interface PieArcDatum<T> {
    /**
     * The input datum; the corresponding element in the input data array of the Pie generator.
     */
    data: T;
    /**
     * The numeric value of the arc.
     */
    value: number;
    /**
     * The zero-based sorted index of the arc.
     */
    index: number;
    /**
     * The start angle of the arc.
     * If the pie generator was configured to be used for the arc generator,
     * then the units are in radians with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    startAngle: number;
    /**
     * The end angle of the arc.
     * If the pie generator was configured to be used for the arc generator,
     * then the units are in radians with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    endAngle: number;
    /**
     * The pad angle of the arc. If the pie generator was configured to be used for the arc generator, than the units are in radians.
     */
    padAngle: number;
  }

  /**
   * The pie generator does not produce a shape directly, but instead computes the necessary angles to represent a tabular dataset as a pie or donut chart;
   * these angles can then be passed to an arc generator.
   *
   * The first generic corresponds to the type of the "this" context within which the pie generator and its accessor functions will be invoked.
   *
   * The second generic refers to the data type of an element in the input array passed into the Pie generator.
   */
  export interface Pie<This, Datum> {
    /**
     * Generates a pie for the given array of data, returning an array of objects representing each datum’s arc angles.
     * Any additional arguments are arbitrary; they are simply propagated to the pie generator’s accessor functions along with the this object.
     * The length of the returned array is the same as data, and each element i in the returned array corresponds to the element i in the input data.
     *
     * This representation is designed to work with the arc generator’s default startAngle, endAngle and padAngle accessors.
     * The angular units are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify angles in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param data Array of data elements.
     */
    (this: This, data: Datum[], ...args: any[]): Array<PieArcDatum<Datum>>;

    /**
     * Returns the current value accessor, which defaults to a function returning the first argument passed into it.
     * The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using valueOf.
     */
    value(): (d: Datum, i: number, data: Datum[]) => number;
    /**
     * Sets the value accessor to use the specified constant number and returns this pie generator.
     *
     * @param value Constant value to be used.
     */
    value(value: number): this;
    /**
     * Sets the value accessor to use the specified function and returns this pie generator.
     *
     * When a pie is generated, the value accessor will be invoked for each element in the input data array.
     * The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using valueOf.
     * If your data are not simply numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum.
     *
     * @param value A value accessor function, which is invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * It returns a numeric value.
     */
    value(value: (d: Datum, i: number, data: Datum[]) => number): this;

    /**
     * Returns the current data comparator, which defaults to null.
     */
    sort(): ((a: Datum, b: Datum) => number) | null;
    /**
     * Sets the data comparator to the specified function and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     * Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the data comparator implicitly sets the value comparator to null.
     *
     * Sorting does not affect the order of the generated arc array which is always in the same order as the input data array; it merely affects the computed angles of each arc.
     * The first arc starts at the start angle and the last arc ends at the end angle.
     *
     * @param comparator A compare function takes two arguments a and b, each elements from the input data array.
     * If the arc for a should be before the arc for b, then the comparator must return a number less than zero;
     * if the arc for a should be after the arc for b, then the comparator must return a number greater than zero;
     * returning zero means that the relative order of a and b is unspecified.
     */
    sort(comparator: (a: Datum, b: Datum) => number): this;
    /**
     * Sets the data comparator to null and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     *
     * @param comparator null, to set the pie generator to use the original input order or use the sortValues comparator, if any.
     */
    sort(comparator: null): this;

    /**
     * Returns the current value comparator, which defaults to descending value.
     */
    sortValues(): ((a: number, b: number) => number) | null;
    /**
     * Sets the value comparator to the specified function and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     * Otherwise, the data is sorted according to the data comparator, and the resulting order is used.
     * Setting the value comparator implicitly sets the data comparator to null.
     *
     * The value comparator is similar to the data comparator, except the two arguments a and b are values derived from the input data array using the value accessor, not the data elements.
     * If the arc for a should be before the arc for b, then the comparator must return a number less than zero;
     * if the arc for a should be after the arc for b, then the comparator must return a number greater than zero;
     * returning zero means that the relative order of a and b is unspecified.
     */
    sortValues(comparator: ((a: number, b: number) => number) | null): this;

    /**
     * Returns the current start angle accessor, which defaults to a function returning a constant zero.
     */
    startAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the overall start angle of the pie to the specified number and returns this pie generator.
     *
     * The default start angle is zero.
     *
     * The start angle here means the overall start angle of the pie, i.e., the start angle of the first arc.
     * The start angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param angle A constant angle.
     */
    startAngle(angle: number): this;
    /**
     * Sets the overall start angle of the pie to the specified function and returns this pie generator.
     *
     * The default start angle is zero.
     *
     * The start angle here means the overall start angle of the pie, i.e., the start angle of the first arc.
     * The start angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    startAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;

    /**
     * Returns the current end angle accessor, which defaults to a function returning a constant 2*pi.
     */
    endAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the overall end angle of the pie to the specified number and returns this pie generator.
     *
     * The default end angle is 2*pi.
     *
     * The end angle here means the overall end angle of the pie, i.e., the end angle of the last arc.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * The value of the end angle is constrained to startAngle ± τ, such that |endAngle - startAngle| ≤ τ.
     *
     * @param angle A constant angle.
     */
    endAngle(angle: number): this;
    /**
     * Sets the overall end angle of the pie to the specified function and returns this pie generator.
     *
     * The default end angle is 2*pi.
     *
     * The end angle here means the overall end angle of the pie, i.e., the end angle of the last arc.
     * The end angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * The value of the end angle is constrained to startAngle ± τ, such that |endAngle - startAngle| ≤ τ.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    endAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;

    /**
     * Returns the current pad angle accessor, which defaults to a function returning a constant zero.
     */
    padAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the pad angle to the specified number and returns this pie generator.
     *
     * The pad angle here means the angular separation between each adjacent arc.
     * The total amount of padding reserved is the specified angle times the number of elements in the input data array, and at most |endAngle - startAngle|;
     * the remaining space is then divided proportionally by value such that the relative area of each arc is preserved.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator, you should specify an angle in radians.
     *
     * @param angle A constant angle.
     */
    padAngle(angle: number): this;
    /**
     * Sets the pad angle to the specified function and returns this pie generator.
     *
     * The pad angle here means the angular separation between each adjacent arc.
     * The total amount of padding reserved is the specified angle times the number of elements in the input data array, and at most |endAngle - startAngle|;
     * the remaining space is then divided proportionally by value such that the relative area of each arc is preserved.
     * The pad angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator, you should specify an angle in radians.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    padAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;
  }

  /**
   * Constructs a new pie generator with the default settings.
   *
   * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   */
  export function pie(): Pie<any, number | { valueOf(): number }>;
  /**
   * Constructs a new pie generator with the default settings.
   *
   * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The generic refers to the data type of an element in the input array passed into the Pie generator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function pie<Datum>(): Pie<any, Datum>;
  /**
   * Constructs a new pie generator with the default settings.
   *
   * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The first generic corresponds to the type of the "this" context within which the pie generator and its accessor functions will be invoked.
   *
   * The second generic refers to the data type of an element in the input array passed into the Pie generator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function pie<This, Datum>(): Pie<This, Datum>;

  // -----------------------------------------------------------------------------------
  // Line Generators
  // -----------------------------------------------------------------------------------

  /**
   * The line generator produces a spline or polyline, as in a line chart.
   * Lines also appear in many other visualization types, such as the links in hierarchical edge bundling.
   *
   * The generic refers to the data type of an element in the input array passed into the line generator.
   */
  export interface Line<Datum> {
    /**
     * Generates a line for the given array of data. Depending on this line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the rendering context of the line generator is null,
     * then the line is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a line for the given array of data. Depending on this line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the line generator has been configured with a rendering context,
     * then the line is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current x-coordinate accessor function, which defaults to a function returning first element of a two-element array of numbers.
     */
    x(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the x accessor to the specified number and returns this line generator.
     *
     * @param x A constant x-coordinate value.
     */
    x(x: number): this;
    /**
     * Sets the x accessor to the specified function and returns this line generator.
     *
     * When a line is generated, the x accessor will be invoked for each defined element in the input data array.
     *
     * The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param x A coordinate accessor function which returns the x-coordinate value. The x accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y-coordinate accessor function, which defaults to a function returning second element of a two-element array of numbers.
     */
    y(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the y accessor to the specified number and returns this line generator.
     *
     * @param y A constant y-coordinate value.
     */
    y(y: number): this;
    /**
     * Sets the y accessor to the specified function and returns this line generator.
     *
     * When a line is generated, the y accessor will be invoked for each defined element in the input data array.
     *
     * The default y accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param y A coordinate accessor function which returns the y-coordinate value. The y accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x and y accessors will subsequently be evaluated and the point will be added to the current line segment.
     * Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.
     * As a result, the generated line may have several discrete segments.
     *
     * Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x and y accessors will subsequently be evaluated and the point will be added to the current line segment.
     * Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.
     * As a result, the generated line may have several discrete segments.
     *
     * Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory | CurveFactoryLineOnly;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory | CurveFactoryLineOnly>(): C;
    /**
     * Sets the curve factory and returns this line generator.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory | CurveFactoryLineOnly): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this line generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * Constructs a new line generator with the default settings.
   *
   * If x or y are specified, sets the corresponding accessors to the specified function or number and returns this line generator.
   *
   * The generic refers to the data type of an element in the input array passed into the line generator.
   *
   * @param x Sets the x accessor
   * @param y Sets the y accessor
   */
  export function line<Datum = [number, number]>(
    x?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y?: number | ((d: Datum, index: number, data: Datum[]) => number),
  ): Line<Datum>;

  /**
   * The radial line generator produces a spline or polyline, as in a line chart.
   *
   * A radial line generator is equivalent to the standard Cartesian line generator,
   * except the x and y accessors are replaced with angle and radius accessors.
   * Radial lines are always positioned relative to ⟨0,0⟩; use a transform (see: SVG, Canvas) to change the origin.
   *
   * The generic refers to the data type of an element in the input array passed into the line generator.
   */
  export interface LineRadial<Datum> {
    /**
     * Generates a radial line for the given array of data. Depending on this radial line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the rendering context of the radial line generator is null,
     * then the radial line is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a radial line for the given array of data. Depending on this radial line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the radial line generator.
     *
     * IMPORTANT: If the radial line generator has been configured with a rendering context,
     * then the radial line is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current angle accessor function, which defaults to a function returning first element of a two-element array of numbers.
     */
    angle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the angle accessor to the specified number and returns this radial line generator.
     *
     * @param angle A constant angle value in radians, with 0 at -y (12 o’clock).
     */
    angle(angle: number): this;
    /**
     * Sets the angle accessor to the specified function and returns this radial line generator.
     *
     * When a radial line is generated, the angle accessor will be invoked for each defined element in the input data array.
     *
     * The default angle accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param angle An angle accessor function which returns the angle value in radians, with 0 at -y (12 o’clock). The angle accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    angle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current radius accessor function, which defaults to a function returning second element of a two-element array of numbers.
     */
    radius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the radius accessor to the specified number and returns this radial line generator.
     *
     * @param radius A constant radius value.
     */
    radius(radius: number): this;
    /**
     * Sets the radius accessor to the specified function and returns this radial line generator.
     *
     * When a radial line is generated, the radius accessor will be invoked for each defined element in the input data array.
     *
     * The default radius accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param radius A radius accessor function which returns the radius value. The radius accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    radius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this radial line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the angle and radius accessors will subsequently be evaluated and the point will be added to the current radial line segment.
     * Otherwise, the element will be skipped, the current radial line segment will be ended, and a new radial line segment will be generated for the next defined point.
     * As a result, the generated radial line may have several discrete segments.
     *
     * Note that if a radial line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this radial line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the angle and radius accessors will subsequently be evaluated and the point will be added to the current radial line segment.
     * Otherwise, the element will be skipped, the current radial line segment will be ended, and a new radial line segment will be generated for the next defined point.
     * As a result, the generated radial line may have several discrete segments.
     *
     * Note that if a radial line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory | CurveFactoryLineOnly;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory | CurveFactoryLineOnly>(): C;
    /**
     * Sets the curve factory and returns this radial line generator.
     *
     * Note that curveMonotoneX or curveMonotoneY are not recommended for radial lines because they assume that the data is monotonic in x or y,
     * which is typically untrue of radial lines.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory | CurveFactoryLineOnly): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Equivalent to line.context.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * Constructs a new radial line generator with the default settings.
   *
   * Ensure that the accessors used with the radial line generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   */
  export function lineRadial(): LineRadial<[number, number]>;
  /**
   * Constructs a new radial line generator with the default settings.
   *
   * Ensure that the accessors used with the radial line generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The generic refers to the data type of an element in the input array passed into the radial line generator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function lineRadial<Datum>(): LineRadial<Datum>;

  /**
   * @deprecated Use LineRadial<Datum>
   */
  export type RadialLine<Datum> = LineRadial<Datum>;

  /**
   * @deprecated Use lineRadial()
   */
  export function radialLine(): RadialLine<[number, number]>;
  /**
   * @deprecated Use lineRadial<Datum>()
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function radialLine<Datum>(): RadialLine<Datum>;

  // -----------------------------------------------------------------------------------
  // Area Generators
  // -----------------------------------------------------------------------------------

  /**
   * The area generator produces an area, as in an area chart. An area is defined by two bounding lines, either splines or polylines.
   * Typically, the two lines share the same x-values (x0 = x1), differing only in y-value (y0 and y1); most commonly, y0 is defined as a constant representing zero.
   * The first line (the topline) is defined by x1 and y1 and is rendered first; the second line (the baseline) is defined by x0 and y0 and is rendered second, with the points in reverse order.
   * With a curveLinear curve, this produces a clockwise polygon.
   *
   * The generic refers to the data type of an element in the input array passed into the area generator.
   */
  export interface Area<Datum> {
    /**
     * Generates an area for the given array of data. Depending on this area generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the area generator.
     *
     * IMPORTANT: If the rendering context of the area generator is null,
     * then the area is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates an area for the given array of data. Depending on this area generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the area generator.
     *
     * IMPORTANT: If the area generator has been configured with a rendering context,
     * then the area is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current x0 accessor. The default x0 accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    x(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets x0 to a constant number x and x1 to null and returns this area generator.
     *
     * Setting x1 to null indicates that the previously-computed x0 value should be reused for the x1 value.
     *
     * @param x A constant value to be used for x0.
     */
    x(x: number): this;
    /**
     * Sets x0 to the specified function x and x1 to null and returns this area generator.
     *
     * The default x0 accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current x0 accessor. The default x0 accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    x0(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets x0 to a constant number and returns this area generator.
     *
     * @param x A constant value.
     */
    x0(x: number): this;
    /**
     * Sets x0 to the specified function and returns this area generator.
     *
     * The default x0 accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x0(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current x1 accessor, which defaults to null, indicating that the previously-computed x0 value should be reused for the x1 value.
     */
    x1(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Sets the x1 accessor to the specified number and returns this area generator.
     */
    x1(x: null | number): this;
    /**
     * Sets x1 to the specified function and returns this area generator.
     *
     * The default x1 accessor is null, indicating that the previously-computed x0 value should be reused for the x1 value.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x1. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x1(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y0 accessor. The default y0 accessor is a function returning a constant value of zero.
     */
    y(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets y0 to a constant number y and y1 to null and returns this area generator.
     *
     * Setting y1 to null indicates that the previously-computed y0 value should be reused for the y1 value.
     *
     * @param y A constant value to be used for y0.
     */
    y(y: number): this;
    /**
     * Sets y0 to the accessor function y and y1 to null and returns this area generator.
     *
     * The default y0 accessor returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y0 accessor. The default y0 accessor is a function a constant value of zero.
     */
    y0(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets y0 to a constant number and returns this area generator.
     *
     * @param y A constant value.
     */
    y0(y: number): this;
    /**
     * Sets y0 to the specified function and returns this area generator.
     *
     * The default y0 accessor is a function which returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y0(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y1 accessor or null. The default y1 accessor is a function returning the second element of a
     * two-element array of numbers.
     *
     * If the y1 accessor is null, the previously-computed y0 value is reused for the y1 value.
     */
    y1(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * sets the y1 accessor to the specified number and returns this area generator.
     */
    y1(y: null | number): this;
    /**
     * Sets y1 to the specified function and returns this area generator.
     *
     * The default y1 accessor assumes that the input data are two-element arrays of numbers and returns the second element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y1. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y1(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     * When an area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x0, x1, y0 and y1 accessors will subsequently be evaluated and the point will be added to the current area segment.
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     * When an area is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x0, x1, y0 and y1 accessors will subsequently be evaluated and the point will be added to the current area segment.
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory>(): C;
    /**
     * Sets the curve factory and returns this area generator.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this area generator.
     */
    context(context: CanvasRenderingContext2D | null): this;

    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineX0(): Line<Datum>;
    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineY0(): Line<Datum>;

    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x1-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineX1(): Line<Datum>;
    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y1-accessor.
     */
    lineY1(): Line<Datum>;
  }

  /**
   * Constructs a new area generator with the default settings.
   *
   * If x, y0 or y1 are specified, sets the corresponding accessors to the specified function or number and returns this area generator.
   *
   * The generic refers to the data type of an element in the input array passed into the area generator.
   *
   * @param x Sets the x accessor.
   * @param y0 Sets the y0 accessor.
   * @param y1 Sets the y1 accessor.
   */
  export function area<Datum = [number, number]>(
    x?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y0?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y1?: number | ((d: Datum, index: number, data: Datum[]) => number),
  ): Area<Datum>;

  /**
   * A radial area generator.
   *
   * A radial area generator is equivalent to the standard Cartesian area generator,
   * except the x and y accessors are replaced with angle and radius accessors.
   * Radial areas are always positioned relative to ⟨0,0⟩; use a transform (see: SVG, Canvas) to change the origin.
   *
   * The generic refers to the data type of an element in the input array passed into the area generator.
   */
  export interface AreaRadial<Datum> {
    /**
     * Generates a radial area for the given array of data.
     *
     * IMPORTANT: If the rendering context of the radial area generator is null,
     * then the radial area is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a radial area for the given array of data.
     *
     * IMPORTANT: If the radial area generator has been configured with a rendering context,
     * then the radial area is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current startAngle accessor. The default startAngle accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    angle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets startAngle to a constant number angle and endAngle to null and returns this radial area generator.
     *
     * Setting endAngle to null indicates that the previously-computed startAngle value should be reused for the endAngle value.
     *
     * @param angle A constant value in radians with 0 at -y (12 o’clock).
     */
    angle(angle: number): this;
    /**
     * Sets startAngle to the specified function angle and endAngle to null and returns this radial area generator.
     *
     * The default startAngle accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for startAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    angle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current startAngle accessor. The default startAngle accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    startAngle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets startAngle to a constant number and returns this radial area generator.
     *
     * @param angle A constant value in radians with 0 at -y (12 o’clock).
     */
    startAngle(angle: number): this;
    /**
     * Sets startAngle to the specified function and returns this radial area generator.
     *
     * The default startAngle accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for startAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    startAngle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current endAngle accessor, which defaults to null, indicating that the previously-computed startAngle value should be reused for the endAngle value.
     */
    endAngle(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Equivalent to area.x1, except the accessor returns the angle in radians, with 0 at -y (12 o’clock).
     * Note: typically angle is used instead of setting separate start and end angles.
     */
    endAngle(angle: null | number): this;
    /**
     * Sets endAngle to the specified function and returns this radial area generator.
     *
     * The default endAngle accessor is null, indicating that the previously-computed startAngle value should be reused for the endAngle value.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for endAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    endAngle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current innerRadius accessor. The default innerRadius accessor is a function returning a constant value of zero.
     */
    radius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets innerRadius to a constant number radius and outerRadius to null and returns this radial area generator.
     *
     * Setting outerRadius to null indicates that the previously-computed innerRadius value should be reused for the outerRadius value.
     *
     * @param radius A constant value to be used for innerRadius.
     */
    radius(radius: number): this;
    /**
     * Sets innerRadius to the accessor function radius and outerRadius to null and returns this radial area generator.
     *
     * The default innerRadius accessor returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for innerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    radius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current innerRadius accessor. The default innerRadius accessor is a function a constant value of zero.
     */
    innerRadius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets innerRadius to a constant number and returns this radial area generator.
     *
     * @param radius A constant value.
     */
    innerRadius(radius: number): this;
    /**
     * Sets innerRadius to the specified function and returns this radial area generator.
     *
     * The default innerRadius accessor is a function which returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for innerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    innerRadius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current outerRadius accessor or null. The default outerRadius accessor is a function returning the second element of a
     * two-element array of numbers.
     *
     * If the outerRadius accessor is null, the previously-computed innerRadius value is reused for the outerRadius value.
     */
    outerRadius(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Equivalent to area.y1, except the accessor returns the radius: the distance from the origin ⟨0,0⟩.
     */
    outerRadius(radius: null | number): this;
    /**
     * Sets outerRadius to the specified function and returns this radial area generator.
     *
     * The default outerRadius accessor assumes that the input data are two-element arrays of numbers and returns the second element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for outerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    outerRadius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this radial area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the startAngle, endAngle, innerRadius and outerRadius accessors will subsequently be evaluated and the point will be added to the current area segment.
     *
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this radial area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the startAngle, endAngle, innerRadius and outerRadius accessors will subsequently be evaluated and the point will be added to the current area segment.
     *
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory>(): C;
    /**
     * Sets the curve factory and returns this radial area generator.
     *
     * Note that curveMonotoneX or curveMonotoneY are not recommended for radial areas because they assume that the data is monotonic in x or y, which is typically untrue of radial areas.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Equivalent to line.context.
     */
    context(context: CanvasRenderingContext2D | null): this;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineStartAngle(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineInnerRadius(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s end angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineEndAngle(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s outer radius accessor.
     */
    lineOuterRadius(): LineRadial<Datum>;
  }

  /**
   * Constructs a new radial area generator with the default settings.
   *
   * Ensure that the accessors used with the area generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   */
  export function areaRadial(): AreaRadial<[number, number]>;
  /**
   * Constructs a new radial area generator with the default settings.
   *
   * Ensure that the accessors used with the area generator correspond to the arguments passed into them,
   * or set them to constants as appropriate.
   *
   * The generic refers to the data type of an element in the input array passed into the radial area generator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function areaRadial<Datum>(): AreaRadial<Datum>;

  /**
   * @deprecated Use AreaRadial interface
   */
  export type RadialArea<Datum> = AreaRadial<Datum>;

  /**
   * @deprecated Use areaRadial()
   */
  export function radialArea(): RadialArea<[number, number]>;
  /**
   * @deprecated Use areaRadial<Datum>()
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function radialArea<Datum>(): RadialArea<Datum>;

  // -----------------------------------------------------------------------------------
  // Curve Factories
  // -----------------------------------------------------------------------------------

  /**
   * A minimal interface for a curve generator which supports only the rendering of lines.
   * Methods for related to the rendering of areas are not implemented in this minimal interface.
   *
   * While lines are defined as a sequence of two-dimensional [x, y] points,
   * there remains the task of transforming this discrete representation into a continuous shape: i.e., how to interpolate between the points.
   * A curve generator serves this purpose.
   *
   * Curves are typically not constructed or used directly, instead being passed to line.curve.
   */
  export interface CurveGeneratorLineOnly {
    /**
     * Indicates the start of a new line segment. Zero or more points will follow.
     */
    lineStart(): void;
    /**
     * Indicates the end of the current line segment.
     */
    lineEnd(): void;
    /**
     * Indicates a new point in the current line segment with the given x- and y-values.
     */
    point(x: number, y: number): void;
  }

  /**
   * A factory for curve generators addressing only lines, but not areas.
   */
  export type CurveFactoryLineOnly =
    /**
     * Returns a "lines only" curve generator which renders to the specified context.
     *
     * @param context A rendering context.
     */
    (context: CanvasRenderingContext2D | Path) => CurveGeneratorLineOnly;

  /**
   * A minimal interface for a curve generator which supports the rendering of lines and areas.
   *
   * While lines are defined as a sequence of two-dimensional [x, y] points,
   * and areas are similarly defined by a topline and a baseline,
   * there remains the task of transforming this discrete representation into a continuous shape: i.e., how to interpolate between the points.
   * A curve generator serves this purpose.
   *
   * Curves are typically not constructed or used directly, instead being passed to line.curve and area.curve.
   */
  export interface CurveGenerator extends CurveGeneratorLineOnly {
    /**
     * Indicates the start of a new area segment.
     * Each area segment consists of exactly two line segments: the topline, followed by the baseline, with the baseline points in reverse order.
     */
    areaStart(): void;
    /**
     * Indicates the end of the current area segment.
     */
    areaEnd(): void;
  }

  /**
   * A factory for curve generators addressing both lines and areas.
   */
  export type CurveFactory =
    /**
     * Returns a curve generator which renders to the specified context.
     *
     * @param context A rendering context.
     */
    (context: CanvasRenderingContext2D | Path) => CurveGenerator;

  /**
   * A curve factory for cubic basis spline generators.
   *
   * The curve generators produce a cubic basis spline using the specified control points.
   * The first and last points are triplicated such that the spline starts at the first point and ends at the last point,
   * and is tangent to the line between the first and second points, and to the line between the penultimate and last points.
   */
  export const curveBasis: CurveFactory;

  /**
   * A curve factory for closed cubic basis spline generators.
   *
   * The curve generators produce a closed cubic basis spline using the specified control points.
   * When a line segment ends, the first three control points are repeated, producing a closed loop with C2 continuity.
   */
  export const curveBasisClosed: CurveFactory;

  /**
   * A curve factory for open cubic basis spline generators.
   *
   * The curve generators produce a cubic basis spline using the specified control points.
   * Unlike basis, the first and last points are not repeated, and thus the curve typically does not intersect these points.
   */
  export const curveBasisOpen: CurveFactory;

  /**
   * Produces a Bézier curve between each pair of points, with horizontal tangents at each point.
   */
  export const curveBumpX: CurveFactory;

  /**
   * Produces a Bézier curve between each pair of points, with vertical tangents at each point.
   */
  export const curveBumpY: CurveFactory;

  /**
   * A curve factory for straightened cubic basis spline generators.
   *
   * The curve generators produce a straightened cubic basis spline using the specified control points,
   * with the spline straightened according to the curve’s beta, which defaults to 0.85.
   * This curve is typically used in hierarchical edge bundling to disambiguate connections,
   * as proposed by Danny Holten in Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data.
   *
   * This curve does not implement curve.areaStart and curve.areaEnd; it is intended to work with d3.line, not d3.area.
   */
  export interface CurveBundleFactory extends CurveFactoryLineOnly {
    /**
     * Returns a bundle curve factory with the specified beta in the range [0, 1], representing the bundle strength.
     * If beta equals zero, a straight line between the first and last point is produced; if beta equals one,
     * a standard basis spline is produced.
     *
     * @param beta A constant value in the [0, 1] interval.
     */
    beta(beta: number): this;
  }

  /**
   * A curve factory for straightened cubic basis spline generators.
   *
   * The curve generators produce a straightened cubic basis spline using the specified control points,
   * with the spline straightened according to the curve’s beta, which defaults to 0.85.
   * This curve is typically used in hierarchical edge bundling to disambiguate connections,
   * as proposed by Danny Holten in Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data.
   *
   * This curve does not implement curve.areaStart and curve.areaEnd; it is intended to work with d3.line, not d3.area.
   */
  export const curveBundle: CurveBundleFactory;

  /**
   * A curve factory for cubic cardinal spline generators.
   */
  export interface CurveCardinalFactory extends CurveFactory {
    /**
     * Returns a cardinal curve factory with the specified tension in the range [0, 1].
     * The tension determines the length of the tangents: a tension of one yields all zero tangents, equivalent to curveLinear; a tension of zero produces a uniform Catmull–Rom spline.
     *
     * @param tension A constant in the [0, 1] interval.
     */
    tension(tension: number): this;
  }

  /**
   * A curve factory for cubic cardinal spline generators.
   *
   * The curve generators produce a cubic cardinal spline using the specified control points, with one-sided differences used for the first and last piece.
   * The default tension is 0.
   */
  export const curveCardinal: CurveCardinalFactory;

  /**
   * A curve factory for closed cubic cardinal spline generators.
   *
   * The curve generators produce closed cubic cardinal spline using the specified control points.
   * When a line segment ends, the first three control points are repeated, producing a closed loop.
   * The default tension is 0.
   */
  export const curveCardinalClosed: CurveCardinalFactory;

  /**
   * A curve factory for open cubic cardinal spline generators.
   *
   * The curve generators produce a cubic cardinal spline using the specified control points.
   * Unlike curveCardinal, one-sided differences are not used for the first and last piece,
   * and thus the curve starts at the second point and ends at the penultimate point.
   * The default tension is 0.
   */
  export const curveCardinalOpen: CurveCardinalFactory;

  /**
   * A curve factory for cubic Catmull–Rom spline generators.
   */
  export interface CurveCatmullRomFactory extends CurveFactory {
    /**
     * Returns a cubic Catmull–Rom curve factory with the specified alpha in the range [0, 1].
     * If alpha is zero, produces a uniform spline, equivalent to curveCardinal with a tension of zero;
     * if alpha is one, produces a chordal spline; if alpha is 0.5, produces a centripetal spline.
     * Centripetal splines are recommended to avoid self-intersections and overshoot.
     *
     * @param alpha A constant in the [0, 1] interval.
     */
    alpha(alpha: number): this;
  }

  /**
   * A curve factory for cubic Catmull–Rom spline generators.
   *
   * The curve generators produce a cubic Catmull–Rom spline using the specified control points and the parameter alpha,
   * which defaults to 0.5, as proposed by Yuksel et al. in On the Parameterization of Catmull–Rom Curves,
   * with one-sided differences used for the first and last piece.
   */
  export const curveCatmullRom: CurveCatmullRomFactory;

  /**
   * A curve factory for cubic Catmull–Rom spline generators.
   *
   * The curve generators produce a closed cubic Catmull–Rom spline using the specified control points and the parameter alpha,
   * which defaults to 0.5, as proposed by Yuksel et al. When a line segment ends,
   * the first three control points are repeated, producing a closed loop.
   */
  export const curveCatmullRomClosed: CurveCatmullRomFactory;

  /**
   * A curve factory for cubic Catmull–Rom spline generators.
   *
   * The curve generators produce a cubic Catmull–Rom spline using the specified control points and the parameter alpha,
   * which defaults to 0.5, as proposed by Yuksel et al. Unlike curveCatmullRom, one-sided differences are not used for the first and last piece,
   * and thus the curve starts at the second point and ends at the penultimate point.
   */
  export const curveCatmullRomOpen: CurveCatmullRomFactory;

  /**
   * A curve factory for polyline generators.
   *
   * The curve generators produce a polyline through the specified points.
   */
  export const curveLinear: CurveFactory;

  /**
   * A curve factory for closed polyline generators.
   *
   * The curve generators produce a closed polyline through the specified points by repeating the first point when the line segment ends.
   */
  export const curveLinearClosed: CurveFactory;

  /**
   * A curve factory for cubic spline generators preserving monotonicity in y.
   *
   * The curve generators produce a cubic spline that preserves monotonicity in y, assuming monotonicity in x, as proposed by Steffen in A simple method for monotonic interpolation in one dimension:
   * “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations.
   * Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”
   */
  export const curveMonotoneX: CurveFactory;

  /**
   * A curve factory for cubic spline generators preserving monotonicity in x.
   *
   * The curve generators produce a cubic spline that preserves monotonicity in x, assuming monotonicity in y, as proposed by Steffen in A simple method for monotonic interpolation in one dimension:
   * “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations.
   * Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”
   */
  export const curveMonotoneY: CurveFactory;

  /**
   * A curve factory for natural cubic spline generators.
   *
   * The curve generators produce a natural cubic spline with the second derivative of the spline set to zero at the endpoints.
   */
  export const curveNatural: CurveFactory;

  /**
   * A curve factory for step function (midpoint) generators.
   *
   * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
   * The y-value changes at the midpoint of each pair of adjacent x-values.
   */
  export const curveStep: CurveFactory;

  /**
   * A curve factory for step function (after) generators.
   *
   * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
   * The y-value changes after the x-value.
   */
  export const curveStepAfter: CurveFactory;

  /**
   * A curve factory for step function (before) generators.
   *
   * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
   * The y-value changes before the x-value.
   */
  export const curveStepBefore: CurveFactory;

  // -----------------------------------------------------------------------------------
  // LINKS
  // -----------------------------------------------------------------------------------

  /**
   * An interface describing the default Link Data structure expected
   * by the Link and LinkRadial generators.
   */
  export interface DefaultLinkObject {
    /**
     * Source node of the link.
     *
     * For a link in a Cartesian coordinate system, the two element array contains
     * the coordinates [x, y].
     *
     * For a radial link, the two element array contains
     * the coordinates [angle, radius]. The angle is stated in radians, with 0 at -y (12 o’clock).
     * The radius measures the distance from the origin ⟨0,0⟩.
     */
    source: [number, number];
    /**
     * Target node of the link.
     *
     * For a link in a Cartesian coordinate system, the two element array contains
     * the coordinates [x, y].
     *
     * For a radial link, the two element array contains
     * the coordinates [angle, radius]. The angle is stated in radians, with 0 at -y (12 o’clock).
     * The radius measures the distance from the origin ⟨0,0⟩.
     */
    target: [number, number];
  }

  /**
   * A link generator for a Cartesian coordinate system. The link shape generates a smooth cubic Bézier curve from a
   * source point to a target point. The tangents of the curve at the start and end are either vertical, horizontal.
   *
   * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  export interface Link<This, LinkDatum, NodeDatum> {
    /**
     * Generates a link for the given arguments.
     *
     * IMPORTANT: If the rendering context of the link generator is null,
     * then the link is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): string | null;
    /**
     * Generates an link for the given arguments.
     *
     * IMPORTANT: If the link generator has been configured with a rendering context,
     * then the link is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): void;

    /**
     * Returns the current source node accessor function.
     * The default source accessor function returns a two element array [x, y].
     */
    source(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the source accessor to the specified function and returns this link generator.
     *
     * @param source Source node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the link generator. The default target accessor function returns a two element array [x, y].
     */
    source(source: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current target node accessor function.
     * The default target accessor function returns a two element array [x, y].
     */
    target(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the target accessor to the specified function and returns this link generator.
     *
     * @param target Target node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the link generator. The default target accessor function returns a two element array [x, y].
     */
    target(target: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current x-accessor, which defaults to a function accepting an number array
     * as its argument an returning the first element of the array.
     */
    x(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the x-accessor to the specified function and returns this link generator.
     *
     * @param x x-coordinate accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the link generator.
     */
    x(x: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current y-accessor, which defaults to a function accepting an number array
     * as its argument an returning the second element of the array.
     */
    y(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the y-accessor to the specified function and returns this link generator.
     *
     * @param y y-coordinate accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the link generator.
     */
    y(y: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this link generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
   *
   * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
   */
  export function link(curve: CurveFactory): Link<any, DefaultLinkObject, [number, number]>;
  /**
   * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The second generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function link<LinkDatum, NodeDatum>(curve: CurveFactory): Link<any, LinkDatum, NodeDatum>;
  /**
   * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function link<This, LinkDatum, NodeDatum>(curve: CurveFactory): Link<This, LinkDatum, NodeDatum>;

  /**
   * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
   *
   * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
   */
  export function linkHorizontal(): Link<any, DefaultLinkObject, [number, number]>;
  /**
   * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The second generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkHorizontal<LinkDatum, NodeDatum>(): Link<any, LinkDatum, NodeDatum>;
  /**
   * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkHorizontal<This, LinkDatum, NodeDatum>(): Link<This, LinkDatum, NodeDatum>;

  /**
   * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
   *
   * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
   */
  export function linkVertical(): Link<any, DefaultLinkObject, [number, number]>;
  /**
   * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The second generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkVertical<LinkDatum, NodeDatum>(): Link<any, LinkDatum, NodeDatum>;
  /**
   * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkVertical<This, LinkDatum, NodeDatum>(): Link<This, LinkDatum, NodeDatum>;

  /**
   * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
   *
   * The first generic corresponds to the type of the "this" context within which the radial link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  export interface LinkRadial<This, LinkDatum, NodeDatum> {
    /**
     * Generates a radial link for the given arguments.
     *
     * IMPORTANT: If the rendering context of the radial link generator is null,
     * then the link is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): string | null;
    /**
     * Generates an link for the given arguments.
     *
     * IMPORTANT: If the radial link generator has been configured with a rendering context,
     * then the link is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): void;

    /**
     * Returns the current source node accessor function.
     * The default source accessor function returns a two element array [x, y].
     */
    source(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the source accessor to the specified function and returns this radial link generator.
     *
     * @param source Source node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the radial link generator. The default target accessor function returns a two element array [x, y].
     */
    source(source: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current target node accessor function.
     * The default target accessor function returns a two element array [x, y].
     */
    target(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the target accessor to the specified function and returns this radial link generator.
     *
     * @param target Target node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the radial link generator. The default target accessor function returns a two element array [x, y].
     */
    target(target: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current angle accessor, which defaults to a function accepting an number array
     * as its argument an returning the first element of the array.
     */
    angle(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the angle accessor to the specified function and returns this radial link generator.
     * The angle is stated in radians, with 0 at -y (12 o’clock).
     *
     * @param angle Angle accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the radial link generator.
     */
    angle(angle: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current radius accessor, which defaults to a function accepting an number array
     * as its argument an returning the second element of the array.
     */
    radius(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the radius accessor to the specified function and returns this radial link generator.
     * The radius is measured as the distance from the origin ⟨0,0⟩.
     *
     * @param radius Radius accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the radial link generator.
     */
    radius(radius: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this link generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * @deprecated Use LinkRadial interface
   */
  export type RadialLink<This, LinkDatum, NodeDatum> = LinkRadial<This, LinkDatum, NodeDatum>;

  /**
   * Constructs a new default link generator with radial tangents, for example, to visualize links in a tree diagram
   * rooted in the center of the display.
   *
   * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
   */
  export function linkRadial(): LinkRadial<any, DefaultLinkObject, [number, number]>;
  /**
   * Constructs a new link generator with radial tangents, for example, to visualize links in a tree diagram
   * rooted in the center of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The second generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkRadial<LinkDatum, NodeDatum>(): LinkRadial<any, LinkDatum, NodeDatum>;
  /**
   * Constructs a new link generator with radial tangents, for example, to visualize links in a tree diagram
   * rooted in the center of the display.
   *
   * Important: Ensure that the accessor functions are configured to work with the link and node datum types
   * specified in the generics.
   *
   * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
   *
   * The second generic corresponds to the datum type of the link object for which the link is to be generated.
   *
   * The third generic corresponds to the datum type of the source/target node contained in the link object.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function linkRadial<This, LinkDatum, NodeDatum>(): LinkRadial<This, LinkDatum, NodeDatum>;

  // -----------------------------------------------------------------------------------
  // SYMBOLS
  // -----------------------------------------------------------------------------------

  /**
   * A Symbol Type.
   *
   * Symbol types are typically not used directly, instead being passed to symbol.type.
   * However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface.
   * You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.
   */
  export interface SymbolType {
    /**
     * Renders this symbol type to the specified context with the specified size in square pixels. The context implements the CanvasPath interface.
     * (Note that this is a subset of the CanvasRenderingContext2D interface!)
     *
     * @param context A rendering context implementing CanvasPath.
     * @param size Size of the symbol to draw.
     */
    draw(context: CanvasPath_D3Shape, size: number): void;
  }

  /**
   * A symbol generator.
   *
   * Symbols provide a categorical shape encoding as is commonly used in scatterplots. Symbols are always centered at ⟨0,0⟩;
   * use a transform (see: SVG, Canvas) to move the arc to a different position.
   *
   * The first generic corresponds to the "this" context within which the symbol generator is invoked.
   * The second generic corresponds to the data type of the datum underlying the symbol.
   */
  export interface Symbol<This, Datum> {
    /**
     * Generates a symbol for the given arguments.
     *
     * IMPORTANT: If the rendering context of the symbol generator is null,
     * then the symbol is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels.
     *
     * @param d The datum for which the symbol is to be generated.
     */
    (this: This, d?: Datum, ...args: any[]): string | null;
    /**
     * Generates an symbol for the given arguments.
     *
     * IMPORTANT: If the symbol generator has been configured with a rendering context,
     * then the symbol is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels.
     *
     * @param d The datum for which the symbol is to be generated.
     */
    (this: This, d?: Datum, ...args: any[]): void;
    /**
     * Returns the current size accessor, which defaults to a function returning a constant value of 64.
     */
    size(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the size to the specified number and returns this symbol generator.
     *
     * @param size A fixed size (area in square pixels).
     */
    size(size: number): this;
    /**
     * Sets the size to the specified function and returns this symbol generator.
     *
     * Specifying the size as a function is useful for constructing a scatterplot with a size encoding.
     * If you wish to scale the symbol to fit a given bounding box, rather than by area, try SVG’s getBBox.
     *
     * @param size An accessor function returning a number to be used as a symbol size. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the symbol generator.
     */
    size(size: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current symbol type accessor, which defaults to a function returning the circle symbol type.
     */
    type(): (this: This, d: Datum, ...args: any[]) => SymbolType;
    /**
     * Sets the symbol type to the specified symbol type and returns this symbol generator.
     *
     * @param type A constant symbol type.
     */
    type(type: SymbolType): this;
    /**
     * Sets the symbol type to the specified function and returns this symbol generator.
     *
     * @param type An accessor function returning a symbol type. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the symbol generator. See symbols for the set of built-in symbol types.
     * To implement a custom symbol type, return an object that implements symbolType.draw.
     */
    type(type: (this: This, d: Datum, ...args: any[]) => SymbolType): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this symbol generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
  }

  /**
   * Constructs a new symbol generator of the specified type and size.
   * If not specified, type defaults to a circle, and size defaults to 64.
   *
   * The first generic corresponds to the "this" context within which the symbol generator is invoked.
   * The second generic corresponds to the data type of the datum underlying the symbol.
   *
   * @param type The specified type.
   * @param size The specified size.
   */
  export function symbol<Datum = any>(
    type?: SymbolType | ((this: any, d: Datum, ...args: any[]) => SymbolType),
    size?: number | ((this: any, d: Datum, ...args: any[]) => number),
  ): Symbol<any, Datum>;

  /**
   * Constructs a new symbol generator of the specified type and size.
   * If not specified, type defaults to a circle, and size defaults to 64.
   *
   * The first generic corresponds to the "this" context within which the symbol generator is invoked.
   * The second generic corresponds to the data type of the datum underlying the symbol.
   *
   * @param type The specified type.
   * @param size The specified size.
   */
  export function symbol<This, Datum>(
    type?: SymbolType | ((this: This, d: Datum, ...args: any[]) => SymbolType),
    size?: number | ((this: This, d: Datum, ...args: any[]) => number),
  ): Symbol<This, Datum>;

  /**
   * An array containing a set of symbol types designed for filling: circle, cross, diamond, square, star, triangle, and wye.
   * Useful for constructing the range of an ordinal scale should you wish to use a shape encoding for categorical data.
   */
  export const symbolsFill: SymbolType[];

  /**
   * An array containing a set of symbol types designed for stroking: circle, plus, x, triangle2, asterisk, square2, and diamond2.
   * Useful for constructing the range of an ordinal scale should you wish to use a shape encoding for categorical data.
   */
  export const symbolsStroke: SymbolType[];

  /**
   * @deprecated Use symbolsFill
   */
  export const symbols: SymbolType[];

  /**
   * The asterisk symbol type; intended for stroking.
   */
  export const symbolAsterisk: SymbolType;

  /**
   * The circle symbol type; intended for either filling or stroking.
   */
  export const symbolCircle: SymbolType;

  /**
   * The Greek cross symbol type, with arms of equal length; intended for filling.
   */
  export const symbolCross: SymbolType;

  /**
   * The rhombus symbol type; intended for filling.
   */
  export const symbolDiamond: SymbolType;

  /**
   * The rotated square symbol type; intended for stroking.
   */
  export const symbolDiamond2: SymbolType;

  /**
   * The plus symbol type; intended for stroking.
   */
  export const symbolPlus: SymbolType;

  /**
   * The square symbol type; intended for filling.
   */
  export const symbolSquare: SymbolType;

  /**
   * The square2 symbol type; intended for stroking.
   */
  export const symbolSquare2: SymbolType;

  /**
   * The pentagonal star (pentagram) symbol type; intended for filling.
   */
  export const symbolStar: SymbolType;

  /**
   * The up-pointing triangle symbol type; intended for filling.
   */
  export const symbolTriangle: SymbolType;

  /**
   * The up-pointing triangle symbol type; intended for stroking.
   */
  export const symbolTriangle2: SymbolType;

  /**
   * The Y-shape symbol type; intended for filling.
   */
  export const symbolWye: SymbolType;

  /**
   * The X-shape symbol type; intended for stroking.
   */
  export const symbolX: SymbolType;

  /**
   * The X-shape symbol type; intended for stroking.
   */
  export const symbolTimes: SymbolType;

  // -----------------------------------------------------------------------------------
  // pointRadial
  // -----------------------------------------------------------------------------------

  /**
   * Returns the point [x, y] for the given angle and the given radius.
   * @param angle Angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
   * @param radius Radius.
   */
  export function pointRadial(angle: number, radius: number): [number, number];

  // -----------------------------------------------------------------------------------
  // STACKS
  // -----------------------------------------------------------------------------------

  /**
   * Each series point j in a stack chart corresponds to the jth element in the input data.
   * Each point is represented as an array [y0, y1] where y0 is the lower value (baseline) and y1 is the upper value (topline);
   * the difference between y0 and y1 corresponds to the computed value for this point.
   *
   * SeriesPoint is a [number, number] two-element Array with added data and index properties
   * related to the data element which formed the basis for theSeriesPoint.
   */
  export interface SeriesPoint<Datum> extends Array<number> {
    /**
     * Corresponds to y0, the lower value (baseline).
     */
    0: number;
    /**
     * Corresponds to y1, the upper value (topline).
     */
    1: number;
    /**
     * The data element underlying the series point.
     */
    data: Datum;
  }

  /**
   * The series are determined by the keys accessor; each series i in the returned array corresponds to the ith key.
   * Each series is an array of points, where each point j corresponds to the jth element in the input data.
   *
   * The key for each series is available as series.key, and the index as series.index.
   */
  export interface Series<Datum, Key> extends Array<SeriesPoint<Datum>> {
    /**
     * Key of the series.
     */
    key: Key;
    /**
     * Index of the series in the series array returned by stack generator.
     */
    index: number;
  }

  /**
   * A stack generator.
   *
   * Some shape types can be stacked, placing one shape adjacent to another.
   * For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by product category, stacking bars vertically.
   * This is equivalent to subdividing a bar chart by an ordinal dimension (such as product category) and applying a color encoding.
   *
   * Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories, as only the bottom layer of the stack is aligned.
   * So, chose the stack order carefully, and consider a streamgraph. (See also grouped charts.)
   *
   * Like the pie generator, the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an area generator or use directly, say to position bars.
   *
   * The first generic corresponds to the "this" context in which the stack generator and its accessor functions are invoked.
   *
   * The second generic corresponds to the data type of an element in the data array passed into the stack generator.
   *
   * The third generic corresponds to the data type of key used to identify a series.
   */
  export interface Stack<This, Datum, Key> {
    /**
     * Generates a stack for the given array of data, returning an array representing each series.
     * The resulting array has one element per series. Each series in then typically passed to an area generator to render an area chart,
     * or used to construct rectangles for a bar chart.
     *
     * Any additional arguments are arbitrary; they are simply propagated to the generator’s accessor functions along with the this object.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum>, ...args: any[]): Array<Series<Datum, Key>>;

    /**
     * Returns the current keys accessor, which defaults to the empty array.
     */
    keys(): (this: This, data: Datum[], ...args: any[]) => Key[];
    /**
     * Sets the keys accessor to the specified function or array and returns this stack generator.
     * A series (layer) is generated for each key.
     * Keys are typically strings, but they may be arbitrary values.
     * The series’ key is passed to the value accessor, along with each data point, to compute the point’s value.
     */
    keys(keys: Iterable<Key> | ((this: This, data: Datum[], ...args: any[]) => Key[])): this;

    /**
     * Returns the current value accessor, which defaults to a function return the property corresponding to the relevant key from the data element.
     *
     * Thus, by default the stack generator assumes that the input data is an array of objects, with each object exposing named properties with numeric values; see stack for an example.
     */
    value(): (d: Datum, key: Key, i: number, data: Datum[]) => number;
    /**
     * Sets the value accessor to the specified number and returns this stack generator.
     *
     * @param value A constant value.
     */
    value(value: number): this;
    /**
     * Sets the value accessor to the specified function and returns this stack generator.
     *
     * @param value A value accessor function which returns the numeric value for a given data element and key combination. The accessor function is invoked for each data element and key being passed
     * the datum, the key, index of the data element in the input data array, and the complete data array.
     */
    value(value: (d: Datum, key: Key, i: number, data: Datum[]) => number): this;

    /**
     * Returns the current order accessor, which defaults to stackOrderNone; this uses the order given by the key accessor.
     */
    order(): (series: Series<Datum, Key>) => Iterable<number>;
    /**
     * Sets the order accessor to the specified array and returns this stack generator.
     */
    order(order: null | Iterable<number>): this;
    /**
     * Sets the order accessor to the specified function and returns this stack generator.
     *
     * The stack order is computed prior to the offset; thus, the lower value for all points is zero at the time the order is computed.
     * The index attribute for each series is also not set until after the order is computed.
     *
     * See stack orders for the built-in orders.
     *
     * @param order A function returning a sort order array. It is passed the generated series array and must return an array of numeric indexes representing the stack order.
     */
    order(order: (series: Series<Datum, Key>) => Iterable<number>): this;

    /**
     * Returns the current offset accessor, which defaults to stackOffsetNone; this uses a zero baseline.
     */
    offset(): (series: Series<Datum, Key>, order: number[]) => void;
    /**
     * Reset the offset to use stackOffsetNone; this uses a zero baseline.
     *
     * @param offset null to set to the default stackOffsetNone.
     */
    offset(offset: null): this;
    /**
     * Sets the offset accessor to the specified function and returns this stack generator.
     *
     * @param offset A function which is passed the generated series array and the order index array;
     *               it is then responsible for updating the lower and upper values in the series array.
     */
    offset(offset: (series: Series<Datum, Key>, order: number[]) => void): this;
  }

  /**
   * Constructs a new stack generator with the default settings.
   *
   * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
   */
  export function stack(): Stack<any, { [key: string]: number }, string>;
  /**
   * Constructs a new stack generator with the default settings.
   *
   * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
   *
   * The generic corresponds to the data type of an element in the data array passed into the stack generator.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function stack<Datum>(): Stack<any, Datum, string>;
  /**
   * Constructs a new stack generator with the default settings.
   *
   * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
   *
   * The first generic corresponds to the data type of an element in the data array passed into the stack generator.
   *
   * The second generic corresponds to the data type of key used to identify a series.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function stack<Datum, Key>(): Stack<any, Datum, Key>;
  /**
   * Constructs a new stack generator with the default settings.
   *
   * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
   *
   * The first generic corresponds to the "this" context in which the stack generator and its accessor functions are invoked.
   *
   * The second generic corresponds to the data type of an element in the data array passed into the stack generator.
   *
   * The third generic corresponds to the data type of key used to identify a series.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function stack<This, Datum, Key>(): Stack<This, Datum, Key>;

  /**
   * Returns a series order such that the earliest series (according to the maximum value) is at the bottom.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderAppearance(series: Series<any, any>): number[];

  /**
   * Returns a series order such that the smallest series (according to the sum of values) is at the bottom.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderAscending(series: Series<any, any>): number[];

  /**
   * Returns a series order such that the largest series (according to the sum of values) is at the bottom.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderDescending(series: Series<any, any>): number[];

  /**
   * Returns a series order such that the larger series (according to the sum of values) are on the inside and the smaller series are on the outside.
   * This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderInsideOut(series: Series<any, any>): number[];

  /**
   * Returns the given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderNone(series: Series<any, any>): number[];

  /**
   * Returns the reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
   *
   * @param series A series generated by a stack generator.
   */
  export function stackOrderReverse(series: Series<any, any>): number[];

  /**
   * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
   *
   * @param series A series generated by a stack generator.
   * @param order An array of numeric indexes representing the stack order.
   */
  export function stackOffsetExpand(series: Series<any, any>, order: Iterable<number>): void;

  /**
   * Positive values are stacked above zero, while negative values are stacked below zero.
   *
   * @param series A series generated by a stack generator.
   * @param order An array of numeric indexes representing the stack order.
   */
  export function stackOffsetDiverging(series: Series<any, any>, order: Iterable<number>): void;

  /**
   * Applies a zero baseline.
   *
   * @param series A series generated by a stack generator.
   * @param order An array of numeric indexes representing the stack order.
   */
  export function stackOffsetNone(series: Series<any, any>, order: Iterable<number>): void;

  /**
   * Shifts the baseline down such that the center of the streamgraph is always at zero.
   *
   * @param series A series generated by a stack generator.
   * @param order An array of numeric indexes representing the stack order.
   */
  export function stackOffsetSilhouette(series: Series<any, any>, order: Iterable<number>): void;

  /**
   * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order.
   * See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
   *
   * @param series A series generated by a stack generator.
   * @param order An array of numeric indexes representing the stack order.
   */
  export function stackOffsetWiggle(series: Series<any, any>, order: Iterable<number>): void;
}

declare module 'd3-time' {
  // Last module patch version validated against: 3.0.0

  // ---------------------------------------------------------------
  // Interfaces
  // ---------------------------------------------------------------

  /**
   * A D3 Time Interval
   */
  export interface TimeInterval {
    /**
     * Returns a new date representing the latest interval boundary date before or equal to date.
     * Equivalent to interval.floor, except it date is not specified, it defaults to the current time.
     * For example, d3.timeYear(date) and d3.timeYear.floor(date) are equivalent.
     *
     * For example, timeDay(date) typically returns 12:00 AM local time on the given date.
     *
     * This function is idempotent: if the specified date is already floored to the current interval,
     * a new date with an identical time is returned.
     * Furthermore, the returned date is the minimum expressible value of the associated interval,
     * such that interval.floor(interval.floor(date) - 1) returns the preceding interval boundary date.
     *
     * Note that the == and === operators do not compare by value with Date objects,
     * and thus you cannot use them to tell whether the specified date has already been floored.
     * Instead, coerce to a number and then compare.
     *
     * This is more reliable than testing whether the time is 12:00 AM, as in some time zones midnight may not exist due to daylight saving.
     *
     * @param date A date object.
     */
    (date?: Date): Date;

    /**
     * Returns a new date representing the latest interval boundary date before or equal to date.
     *
     * For example, timeDay.floor(date) typically returns 12:00 AM local time on the given date.
     *
     * This method is idempotent: if the specified date is already floored to the current interval,
     * a new date with an identical time is returned.
     * Furthermore, the returned date is the minimum expressible value of the associated interval,
     * such that interval.floor(interval.floor(date) - 1) returns the preceding interval boundary date.
     *
     * Note that the == and === operators do not compare by value with Date objects,
     * and thus you cannot use them to tell whether the specified date has already been floored.
     * Instead, coerce to a number and then compare.
     *
     * This is more reliable than testing whether the time is 12:00 AM, as in some time zones midnight may not exist due to daylight saving.
     *
     * @param date A date object.
     */
    floor(date: Date): Date;

    /**
     * Returns a new date representing the closest interval boundary date to date.
     *
     * For example, timeDay.round(date) typically returns 12:00 AM local time on the given date if it is on or before noon,
     * and 12:00 AM of the following day if it is after noon.
     *
     * This method is idempotent: if the specified date is already rounded to the current interval, a new date with an identical time is returned.
     *
     * @param date A date object.
     */
    round(date: Date): Date;

    /**
     * Returns a new date representing the earliest interval boundary date after or equal to date.
     *
     * For example, timeDay.ceil(date) typically returns 12:00 AM local time on the date following the given date.
     *
     * This method is idempotent: if the specified date is already ceilinged to the current interval,
     * a new date with an identical time is returned. Furthermore,
     * the returned date is the maximum expressible value of the associated interval,
     * such that interval.ceil(interval.ceil(date) + 1) returns the following interval boundary date.
     *
     * @param date A date object.
     */
    ceil(date: Date): Date;

    /**
     * Returns a new date equal to date plus step intervals.
     *
     * If step is not specified it defaults to 1.
     *
     * This method does not round the specified date to the interval. For example, if date is today at 5:34 PM,
     * then timeDay.offset(date, 1) returns 5:34 PM tomorrow (even if daylight saving changes!).
     *
     * @param date A date object.
     * @param step An optional number of steps to apply when calculating the offset date.
     * If step is negative, then the returned date will be before the specified date;
     * if step is zero, then a copy of the specified date is returned; if step is not an integer, it is floored.
     */
    offset(date: Date, step?: number): Date;

    /**
     * Returns an array of dates representing every interval boundary after or equal to start (inclusive) and before stop (exclusive).
     *
     * If step is specified, then every step-th boundary will be returned; for example,
     * for the timeDay interval a step of 2 will return every other day.
     * If step is not an integer, it is floored.
     *
     * The first date in the returned array is the earliest boundary after or equal to start;
     * subsequent dates are offset by step intervals and floored.
     * Thus, two overlapping ranges may be inconsistent.
     *
     * To make ranges consistent when a step is specified, use CountableInterval.every instead.
     *
     * @param start A start date object for the range.
     * @param stop A stop date object for the range.
     * @param step An optional number of steps to apply when calculating the dates in the range.
     */
    range(start: Date, stop: Date, step?: number): Date[];

    /**
     * Returns a new interval that is a filtered subset of this interval using the specified test function.
     *
     * @param test A test function which is passed a date and should return true if and only if
     * the specified date should be considered part of the interval.
     */
    filter(test: (date: Date) => boolean): TimeInterval;
  }

  /**
   * A D3 Countable Time Interval
   */
  export interface CountableTimeInterval extends TimeInterval {
    /**
     * Returns the number of interval boundaries after start (exclusive) and before or equal to end (inclusive).
     *
     * Note that this behavior is slightly different than interval.range,
     * because its purpose is to return the zero-based number of the specified end date relative to the specified start date.
     *
     * @param start A start date object.
     * @param end An end date object.
     */
    count(start: Date, end: Date): number;
    /**
     * Returns a filtered view of this interval representing every stepth date.
     *
     * The meaning of step is dependent on this interval’s parent interval as defined by the field function.
     *
     * For example, timeMinute.every(15) returns an interval representing every fifteen minutes,
     * starting on the hour: :00, :15, :30, :45, etc. Note that for some intervals,
     * the resulting dates may not be uniformly-spaced;
     * timeDay’s parent interval is timeMonth, and thus the interval number resets at the start of each month.
     *
     * If step is not valid, returns null. If step is one, returns this interval.
     *
     * This method can be used in conjunction with interval.range to ensure that two overlapping ranges are consistent.
     *
     * The returned filtered interval does not support interval.count. See also interval.filter.
     *
     * @param step Number of steps.
     */
    every(step: number): TimeInterval | null;
  }

  // ---------------------------------------------------------------
  // Custom (Countable)Interval Factories
  // ---------------------------------------------------------------

  /**
   * Constructs a new custom interval given the specified floor and offset functions.
   *
   * The returned custom interval is not countable, i.e. does not expose the methods "count(..)" and "every(...)".
   *
   * @param floor A floor function which takes a single date as an argument and rounds it down to the nearest interval boundary.
   * @param offset An offset function which takes a date and an integer step as arguments and advances
   * the specified date by the specified number of boundaries; the step may be positive, negative or zero.
   */
  export function timeInterval(floor: (date: Date) => void, offset: (date: Date, step: number) => void): TimeInterval;
  /**
   * Constructs a new custom interval given the specified floor, offset and count functions.
   *
   * The returned custom interval is countable and exposes the methods "count(..)" and "every(...)".
   *
   * Note: due to an internal optimization, the specified count function must not invoke interval.count on other time intervals.
   *
   * @param floor A floor function which takes a single date as an argument and rounds it down to the nearest interval boundary.
   * @param offset An offset function which takes a date and an integer step as arguments and advances
   * the specified date by the specified number of boundaries; the step may be positive, negative or zero.
   * @param count A count function which takes a start date and an end date, already floored to the current interval,
   * and returns the number of boundaries between the start (exclusive) and end (inclusive).
   * Note: due to an internal optimization, the specified count function must not invoke interval.count on other time intervals.
   * @param field An optional field function which takes a date, already floored to the current interval,
   * and returns the field value of the specified date,
   * corresponding to the number of boundaries between this date (exclusive) and the latest previous parent boundary.
   * For example, for the timeDay interval, this returns the number of days since the start of the month.
   * If a field function is not specified, it defaults to counting the number of interval boundaries since
   * the UNIX epoch of January 1, 1970 UTC. The field function defines the behavior of interval.every.
   */
  export function timeInterval(
    floor: (date: Date) => void,
    offset: (date: Date, step: number) => void,
    count: (start: Date, end: Date) => number,
    field?: (date: Date) => number,
  ): CountableTimeInterval;

  // ---------------------------------------------------------------
  // Built-In Factories and Date Array Creators
  // ---------------------------------------------------------------

  // local time ----------------------------------------------------------

  /**
   * Milliseconds Interval in Local Time; the shortest available time unit.
   */
  export const timeMillisecond: CountableTimeInterval;

  /**
   * This is a convenience alias for timeMillisecond.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeMilliseconds(start: Date, stop: Date, step?: number): Date[];

  /**
   * Seconds Interval in Local Time; seconds (e.g., 01:23:45.0000 AM); 1,000 milliseconds.
   */
  export const timeSecond: CountableTimeInterval;

  /**
   * This is a convenience alias for timeSecond.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeSeconds(start: Date, stop: Date, step?: number): Date[];

  /**
   * Minutes Interval in Local Time; minutes (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript ignores leap seconds.
   */
  export const timeMinute: CountableTimeInterval;

  /**
   * This is a convenience alias for timeMinute.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeMinutes(start: Date, stop: Date, step?: number): Date[];

  /**
   * Hours Interval in Local Time; Hours (e.g., 01:00 AM); 60 minutes.
   *
   * Note that advancing time by one hour in local time can return the same hour or skip an hour due to daylight saving.
   */
  export const timeHour: CountableTimeInterval;

  /**
   * This is a convenience alias for timeHour.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeHours(start: Date, stop: Date, step?: number): Date[];

  /**
   * Days Interval in Local Time; days (e.g., February 7, 2012 at 12:00 AM); typically 24 hours.
   * Days in local time may range from 23 to 25 hours due to daylight saving.
   */
  export const timeDay: CountableTimeInterval;

  /**
   * This is a convenience alias for timeDay.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeDays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval in Local Time. Alias for sunday; 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeWeek: CountableTimeInterval;

  /**
   * This is a convenience alias for timeWeek.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeWeeks(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Sunday-based weeks in Local Time (e.g., February 5, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeSunday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeSunday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeSundays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Monday-based weeks in Local Time (e.g., February 6, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeMonday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeMonday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeMondays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Tuesday-based weeks in Local Time (e.g., February 7, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeTuesday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeTuesday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeTuesdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Wednesday-based weeks in Local Time (e.g., February 8, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeWednesday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeWednesday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeWednesdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Thursday-based weeks in Local Time (e.g., February 9, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeThursday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeThursday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeThursdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Friday-based weeks in Local Time (e.g., February 10, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeFriday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeFriday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeFridays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Saturday-based weeks in Local Time (e.g., February 11, 2012 at 12:00 AM).
   * 7 days and typically 168 hours.
   *
   * Weeks in local time may range from 167 to 169 hours due on daylight saving.
   */
  export const timeSaturday: CountableTimeInterval;

  /**
   * This is a convenience alias for timeSaturday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeSaturdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Month Interval in Local Time; months (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.
   */
  export const timeMonth: CountableTimeInterval;

  /**
   * This is a convenience alias for timeMonth.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeMonths(start: Date, stop: Date, step?: number): Date[];

  /**
   * Year Interval in Local Time; years (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.
   */
  export const timeYear: CountableTimeInterval;

  /**
   * This is a convenience alias for timeYear.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function timeYears(start: Date, stop: Date, step?: number): Date[];

  // utc Coordinated Universal Time ----------------------------------------------------------

  /**
   * Milliseconds Interval in Coordinated Universal Time (UTC); the shortest available time unit.
   */
  export const utcMillisecond: CountableTimeInterval;

  /**
   * This is a convenience alias for utcMillisecond.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcMilliseconds(start: Date, stop: Date, step?: number): Date[];

  /**
   * Seconds Interval in Coordinated Universal Time (UTC); seconds (e.g., 01:23:45.0000 AM); 1,000 milliseconds.
   */
  export const utcSecond: CountableTimeInterval;

  /**
   * This is a convenience alias for utcSecond.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcSeconds(start: Date, stop: Date, step?: number): Date[];

  /**
   * Minutes Interval in Coordinated Universal Time (UTC); minutes (e.g., 01:02:00 AM); 60 seconds.
   * Note that ECMAScript ignores leap seconds.
   */
  export const utcMinute: CountableTimeInterval;

  /**
   * This is a convenience alias for utcMinute.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcMinutes(start: Date, stop: Date, step?: number): Date[];

  /**
   * Hours Interval in Coordinated Universal Time (UTC); Hours (e.g., 01:00 AM); 60 minutes.
   */
  export const utcHour: CountableTimeInterval;

  /**
   * This is a convenience alias for utcHour.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcHours(start: Date, stop: Date, step?: number): Date[];

  /**
   * Days Interval in Coordinated Universal Time (UTC); days (e.g., February 7, 2012 at 12:00 AM); 24 hours.
   */
  export const utcDay: CountableTimeInterval;

  /**
   * This is a convenience alias for utcDay.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcDays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval in Local Time. Alias for sunday; 7 days and 168 hours.
   */
  export const utcWeek: CountableTimeInterval;

  /**
   * This is a convenience alias for utcWeek.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcWeeks(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Sunday-based weeks in Coordinated Universal Time (UTC) (e.g., February 5, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcSunday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcSunday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcSundays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Monday-based weeks in Coordinated Universal Time (UTC) (e.g., February 6, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcMonday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcMonday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcMondays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Tuesday-based weeks in Coordinated Universal Time (UTC) (e.g., February 7, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcTuesday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcTuesday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcTuesdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Wednesday-based weeks in Coordinated Universal Time (UTC) (e.g., February 8, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcWednesday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcWednesday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcWednesdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Thursday-based weeks in Coordinated Universal Time (UTC) (e.g., February 9, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcThursday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcThursday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcThursdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Friday-based weeks in Coordinated Universal Time (UTC) (e.g., February 10, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcFriday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcFriday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcFridays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Week Interval for Saturday-based weeks in Coordinated Universal Time (UTC) (e.g., February 11, 2012 at 12:00 AM).
   * 7 days and 168 hours.
   */
  export const utcSaturday: CountableTimeInterval;

  /**
   * This is a convenience alias for utcSaturday.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcSaturdays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Month Interval in Coordinated Universal Time (UTC); months (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.
   */
  export const utcMonth: CountableTimeInterval;

  /**
   * This is a convenience alias for utcMonth.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcMonths(start: Date, stop: Date, step?: number): Date[];

  /**
   * Year Interval in Coordinated Universal Time (UTC); years (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.
   */
  export const utcYear: CountableTimeInterval;

  /**
   * This is a convenience alias for utcYear.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function utcYears(start: Date, stop: Date, step?: number): Date[];

  /**
   * Like d3.utcDay, except it counts days since the UNIX epoch (January 1, 1970) such that interval.every returns uniformly-spaced dates rather than varying based on day-of-month.
   */
  export const unixDay: CountableTimeInterval;

  /**
   * This is a convenience alias for unixDay.range(...).
   *
   * @param start A start date object for the range.
   * @param stop A stop date object for the range.
   * @param step An optional number of steps to apply when calculating the dates in the range.
   */
  export function unixDays(start: Date, stop: Date, step?: number): Date[];

  /**
   * Equivalent to d3.utcTicks, but in local time.
   */
  export function timeTicks(start: Date, stop: Date, count: number): Date[];

  /**
   * Returns the time interval that would be used by d3.timeTicks given the same arguments.
   */
  export function timeTickInterval(start: Date, stop: Date, count: number): TimeInterval | null;

  /**
   * Returns an array of approximately count dates at regular intervals between start and stop (inclusive).
   * If stop is before start, dates are returned in reverse chronological order; otherwise dates are returned in chronological order.
   */
  export function utcTicks(start: Date, stop: Date, count: number): Date[];

  /**
   * Returns the time interval that would be used by d3.utcTicks given the same arguments.
   * If there is no associated interval, such as when start or stop is invalid, returns null.
   */
  export function utcTickInterval(start: Date, stop: Date, count: number): TimeInterval | null;
}

declare module 'd3-time-format' {
  // Last module patch version validated against: 4.0.0

  /**
   * Specification of time locale to use when creating a new TimeLocaleObject
   */
  export interface TimeLocaleDefinition {
    /**
     * The date and time (%c) format specifier (e.g., "%a %b %e %X %Y").
     */
    dateTime: string;
    /**
     * The date (%x) format specifier (e.g., "%m/%d/%Y").
     */
    date: string;
    /**
     *  The time (%X) format specifier (e.g., "%H:%M:%S").
     */
    time: string;
    /**
     * The A.M. and P.M. equivalents (e.g., ["AM", "PM"]).
     */
    periods: [string, string];
    /**
     * The full names of the weekdays, starting with Sunday.
     */
    days: [string, string, string, string, string, string, string];
    /**
     * The abbreviated names of the weekdays, starting with Sunday.
     */
    shortDays: [string, string, string, string, string, string, string];
    /**
     * The full names of the months (starting with January).
     */
    months: [string, string, string, string, string, string, string, string, string, string, string, string];
    /**
     * the abbreviated names of the months (starting with January).
     */
    shortMonths: [string, string, string, string, string, string, string, string, string, string, string, string];
  }

  /**
   * Interface describing a time-locale-based object which exposes time-formatting/parsing
   * methods for a specified locale definition.
   */
  export interface TimeLocaleObject {
    /**
     * Returns a new formatter for the given string specifier. The specifier string may contain the following directives:
     * - %a - abbreviated weekday name.*
     * - %A - full weekday name.*
     * - %b - abbreviated month name.*
     * - %B - full month name.*
     * - %c - the locale’s date and time, such as %x, %X.*
     * - %d - zero-padded day of the month as a decimal number [01,31].
     * - %e - space-padded day of the month as a decimal number [ 1,31]; equivalent to %_d.
     * - %f - microseconds as a decimal number [000000, 999999].
     * - %g - ISO 8601 week-based year without century as a decimal number [00,99].
     * - %G - ISO 8601 week-based year with century as a decimal number.
     * - %H - hour (24-hour clock) as a decimal number [00,23].
     * - %I - hour (12-hour clock) as a decimal number [01,12].
     * - %j - day of the year as a decimal number [001,366].
     * - %m - month as a decimal number [01,12].
     * - %M - minute as a decimal number [00,59].
     * - %L - milliseconds as a decimal number [000, 999].
     * - %p - either AM or PM.*
     * - %q - quarter of the year as a decimal number [1,4].
     * - %Q - milliseconds since UNIX epoch.
     * - %s - seconds since UNIX epoch.
     * - %S - second as a decimal number [00,61].
     * - %u - Monday-based (ISO) weekday as a decimal number [1,7].
     * - %U - Sunday-based week of the year as a decimal number [00,53].
     * - %V - ISO 8601 week number of the year as a decimal number [01, 53].
     * - %w - Sunday-based weekday as a decimal number [0,6].
     * - %W - Monday-based week of the year as a decimal number [00,53].
     * - %x - the locale’s date, such as %-m/%-d/%Y.*
     * - %X - the locale’s time, such as %-I:%M:%S %p.*
     * - %y - year without century as a decimal number [00,99].
     * - %Y - year with century as a decimal number.
     * - %Z - time zone offset, such as -0700, -07:00, -07, or Z.
     * - %% - a literal percent sign (%).
     *
     * Directives marked with an asterisk (*) may be affected by the locale definition.
     *
     * For %U, all days in a new year preceding the first Sunday are considered to be in week 0.
     * For %W, all days in a new year preceding the first Monday are considered to be in week 0.
     * Week numbers are computed using interval.count. For example, 2015-52 and 2016-00 represent Monday, December 28, 2015, while 2015-53 and 2016-01 represent Monday, January 4, 2016.
     * This differs from the ISO week date specification (%V), which uses a more complicated definition!
     *
     * For %V,%g and %G, per the strftime man page:
     *
     * In this system, weeks start on a Monday, and are numbered from 01, for the first week, up to 52 or 53, for the last week.
     * Week 1 is the first week where four or more days fall within the new year (or, synonymously, week 01 is: the first week of the year that contains a Thursday;
     * or, the week that has 4 January in it). If the ISO week number belongs to the previous or next year, that year is used instead.
     *
     * The % sign indicating a directive may be immediately followed by a padding modifier:
     *
     * 1) 0 - zero-padding
     * 2) _ - space-padding
     * 3) - disable padding
     *
     * If no padding modifier is specified, the default is 0 for all directives except %e, which defaults to _.
     * (In some implementations of strftime and strptime, a directive may include an optional field width or precision; this feature is not yet implemented.)
     *
     * The returned function formats a specified date, returning the corresponding string.
     *
     * @param specifier A specifier string for the date format.
     */
    format(specifier: string): (date: Date) => string;
    /**
     * Returns a new parser for the given string specifier. The specifier string may contain the same directives as locale.format (TimeLocaleObject.format).
     * The %d and %e directives are considered equivalent for parsing.
     *
     * The returned function parses a specified string, returning the corresponding date or null if the string could not be parsed according to this format’s specifier.
     * Parsing is strict: if the specified string does not exactly match the associated specifier, this method returns null.
     *
     * For example, if the associated specifier is %Y-%m-%dT%H:%M:%SZ, then the string "2011-07-01T19:15:28Z" will be parsed as expected,
     * but "2011-07-01T19:15:28", "2011-07-01 19:15:28" and "2011-07-01" will return null. (Note that the literal Z here is different from the time zone offset directive %Z.)
     * If a more flexible parser is desired, try multiple formats sequentially until one returns non-null.
     *
     * @param specifier A specifier string for the date format.
     */
    parse(specifier: string): (dateString: string) => Date | null;
    /**
     * Equivalent to locale.format (TimeLocaleObject.format), except all directives are interpreted as Coordinated Universal Time (UTC) rather than local time.
     *
     * @param specifier A specifier string for the date format.
     */
    utcFormat(specifier: string): (date: Date) => string;
    /**
     * Equivalent to locale.parse (TimeLocaleObject.parse), except all directives are interpreted as Coordinated Universal Time (UTC) rather than local time.
     *
     * @param specifier A specifier string for the date format.
     */
    utcParse(specifier: string): (dateString: string) => Date | null;
  }

  /**
   * Create a new time-locale-based object which exposes time-formatting
   * methods for the specified locale definition.
   *
   * @param definition A time locale definition.
   */
  export function timeFormatLocale(definition: TimeLocaleDefinition): TimeLocaleObject;

  /**
   * Create a new time-locale-based object which exposes time-formatting
   * methods for the specified locale definition. The new time locale definition
   * will be set as the new default time locale.
   *
   * @param definition A time locale definition.
   */
  export function timeFormatDefaultLocale(definition: TimeLocaleDefinition): TimeLocaleObject;

  /**
   * Returns a new formatter for the given string specifier. The returned function formats a specified date, returning the corresponding string.
   *
   * An alias for locale.format (TimeLocaleObject.format) on the default locale.
   *
   * @param specifier A specifier string for the date format.
   */
  export function timeFormat(specifier: string): (date: Date) => string;

  /**
   * Returns a new parser for the given string specifier.
   *
   * An alias for locale.parse (TimeLocaleObject.parse) on the default locale.
   *
   * @param specifier A specifier string for the date format.
   */
  export function timeParse(specifier: string): (dateString: string) => Date | null;

  /**
   * Equivalent to timeFormat, except all directives are interpreted as Coordinated Universal Time (UTC) rather than local time.
   *
   * An alias for locale.utcFormat (TimeLocaleObject.utcFormat) on the default locale.
   *
   * @param specifier A specifier string for the date format.
   */
  export function utcFormat(specifier: string): (date: Date) => string;

  /**
   * Equivalent to timeParse, except all directives are interpreted as Coordinated Universal Time (UTC) rather than local time.
   *
   * An alias for locale.utcParse (TimeLocaleObject.utcParse) on the default locale.
   *
   * @param specifier A specifier string for the date format.
   */
  export function utcParse(specifier: string): (dateString: string) => Date | null;

  /**
   * The full ISO 8601 UTC time formatter. Where available, this method will use Date.toISOString to format.
   *
   * @param date A date to format.
   */
  export function isoFormat(date: Date): string;

  /**
   * The full ISO 8601 UTC time parser. Where available, this method will use the Date constructor to parse strings.
   * If you depend on strict validation of the input format according to ISO 8601, you should construct a UTC parser function using utcParse.
   *
   * @param dateString A string encoded date to parse.
   */
  export function isoParse(dateString: string): Date | null;
}

declare module 'd3-timer' {
  // Last module patch version validated against: 3.0.1

  /**
   * Returns the current time as defined by performance.now if available, and Date.now if not.
   * The current time is updated at the start of a frame; it is thus consistent during the frame, and any timers scheduled during the same frame will be synchronized.
   * If this method is called outside of a frame, such as in response to a user event, the current time is calculated and then fixed until the next frame,
   * again ensuring consistent timing during event handling.
   */
  export function now(): number;

  export interface Timer {
    /**
     * Restart a timer with the specified callback and optional delay and time.
     * This is equivalent to stopping this timer and creating a new timer with the specified arguments,
     * although this timer retains the original invocation priority.
     *
     * @param callback A callback function to be invoked and passed in the apparent
     * elapsed time since the timer became active in milliseconds.
     * @param delay An optional numeric delay in milliseconds (default = 0) relative to time.
     * @param time An optional time in milliseconds relative to which the delay is calculated (default = now).
     */
    restart(callbackFn: (elapsed: number) => void, delay?: number, time?: number): void;

    /**
     * Stop the timer.
     */
    stop(): void;
  }

  /**
   * Schedules and returns a new timer, invoking the specified callback repeatedly until the timer is stopped.
   * The callback is passed the (apparent) elapsed time since the timer became active.
   *
   * @param callback A callback function to be invoked and passed in the apparent
   * elapsed time since the timer became active in milliseconds.
   * @param delay An optional numeric delay in milliseconds (default = 0) relative to time.
   * @param time An optional time in milliseconds relative to which the delay is calculated (default = now).
   */
  export function timer(callback: (elapsed: number) => void, delay?: number, time?: number): Timer;

  /**
   * Immediately invoke any eligible timer callbacks.
   */
  export function timerFlush(): void;

  /**
   * Schedules and returns a new timer, invoking the specified callback. The timer is stopped automatically
   * on its first callback. The callback is passed the (apparent) elapsed time since the timer became active.
   *
   * @param callback A callback function to be invoked and passed in the apparent
   * elapsed time since the timer became active in milliseconds.
   * @param delay An optional numeric delay in milliseconds (default = 0) relative to time.
   * @param time An optional time in milliseconds relative to which the delay is calculated (default = now).
   */
  export function timeout(callback: (elapsed: number) => void, delay?: number, time?: number): Timer;

  /**
   * Schedules and returns a new timer, invoking the specified callback repeatedly every 'delay' milliseconds
   * until the timer is stopped.
   * The callback is passed the (apparent) elapsed time since the timer became active.
   *
   * @param callback A callback function to be invoked and passed in the apparent
   * elapsed time since the timer became active in milliseconds.
   * @param delay An optional numeric delay in milliseconds between repeat invocations of the callback.
   * If not specified, the interval timer behaves like the regular timer.
   * @param time An optional time in milliseconds relative to which the initial delay is calculated (default = now).
   */
  export function interval(callback: (elapsed: number) => void, delay?: number, time?: number): Timer;
}

declare module 'd3-transition' {
  // Last module patch version validated against: 3.0.1

  import { ArrayLike, BaseType, Selection, ValueFn } from 'd3-selection';

  /**
   * Extend interface 'Selection' by declaration merging with 'd3-selection'
   */
  module 'd3-selection' {
    /**
     * A D3 Selection of elements.
     *
     * The first generic "GElement" refers to the type of the selected element(s).
     * The second generic "Datum" refers to the type of the datum of a selected element(s).
     * The third generic "PElement" refers to the type of the parent element(s) in the D3 selection.
     * The fourth generic "PDatum" refers to the type of the datum of the parent element(s).
     */
    interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
      /**
       * Interrupts the active transition of the specified name on the selected elements, and cancels any pending transitions with the specified name, if any.
       * If a name is not specified, null is used.
       *
       * IMPORTANT: Interrupting a transition on an element has no effect on any transitions on any descendant elements.
       * For example, an axis transition consists of multiple independent, synchronized transitions on the descendants of the axis G element
       * (the tick lines, the tick labels, the domain path, etc.). To interrupt the axis transition, you must therefore interrupt the descendants.
       *
       * @param name Name of the transition.
       */
      interrupt(name?: string): this;
      /**
       * Returns a new transition on the given selection with the specified name. If a name is not specified, null is used.
       * The new transition is only exclusive with other transitions of the same name.
       *
       * @param name Name of the transition.
       */
      transition(name?: string): Transition<GElement, Datum, PElement, PDatum>;
      /**
       * Returns a new transition on the given selection.
       *
       * When using a transition instance, the returned transition has the same id and name as the specified transition.
       * If a transition with the same id already exists on a selected element, the existing transition is returned for that element.
       * Otherwise, the timing of the returned transition is inherited from the existing transition of the same id on the nearest ancestor of each selected element.
       * Thus, this method can be used to synchronize a transition across multiple selections,
       * or to re-select a transition for specific elements and modify its configuration.
       *
       * If the specified transition is not found on a selected node or its ancestors (such as if the transition already ended),
       * the default timing parameters are used; however, in a future release, this will likely be changed to throw an error.
       *
       * @param transition A transition instance.
       */
      transition(transition: Transition<BaseType, any, any, any>): Transition<GElement, Datum, PElement, PDatum>;
    }
  }

  /**
   * Return the active transition on the specified node with the specified name, if any.
   * If no name is specified, null is used. Returns null if there is no such active transition on the specified node.
   * This method is useful for creating chained transitions.
   *
   * The first generic "GElement" refers to the type of element on which the returned active transition was defined. The second generic "Datum" refers to the type of the
   * datum, of a selected element on which the transition is defined. The third generic refers to the type of the parent elements in the returned Transition.
   * The fourth generic refers to the type of the datum defined on the parent elements in the returned Transition.
   *
   * @param node Element for which the active transition should be returned.
   * @param name Name of the transition.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function active<GElement extends BaseType, Datum, PElement extends BaseType, PDatum>(
    node: GElement,
    name?: string,
  ): Transition<GElement, Datum, PElement, PDatum> | null;

  /**
   * Interrupts the active transition of the specified name on the specified node, and cancels any pending transitions with the specified name, if any.
   * If a name is not specified, null is used.
   *
   * @param node Element for which the transition should be interrupted.
   * @param name Name of the transition to be interrupted. If a name is not specified, null is used.
   */
  export function interrupt(node: BaseType, name?: string): void;

  /**
   * A D3 Transition.
   *
   * The first generic "GElement" refers to the type of the selected element(s) in the Transition.
   * The second generic "Datum" refers to the type of the datum of a selected element(s) in the Transition.
   * The third generic "PElement" refers to the type of the parent element(s) in the D3 selection in the Transition.
   * The fourth generic "PDatum" refers to the type of the datum of the parent element(s) in the Transition.
   */
  export interface Transition<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    // Sub-selection -------------------------

    /**
     * For each selected element, select the first descendant element that matches the specified selector string, if any,
     * and returns a transition on the resulting selection. The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    select<DescElement extends BaseType>(selector: string): Transition<DescElement, Datum, PElement, PDatum>;
    /**
     * For each selected element, select the descendant element returned by the selector function, if any,
     * and returns a transition on the resulting selection. The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector A selector function, which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * It must return an element, or null if there is no matching element.
     */
    select<DescElement extends BaseType>(
      selector: ValueFn<GElement, Datum, DescElement>,
    ): Transition<DescElement, Datum, PElement, PDatum>;

    /**
     * For each selected element, select all descendant elements that match the specified selector string, if any,
     * and returns a transition on the resulting selection. The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector CSS selector string
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectAll<DescElement extends BaseType, OldDatum>(
      selector: string,
    ): Transition<DescElement, OldDatum, GElement, Datum>;
    /**
     * For each selected element, select all descendant elements returned by the selector function, if any,
     * and returns a transition on the resulting selection. The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector A selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an array of elements
     * (or a pseudo-array, such as a NodeList), or the empty array if there are no matching elements.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectAll<DescElement extends BaseType, OldDatum>(
      selector: ValueFn<GElement, Datum, DescElement[] | ArrayLike<DescElement>>,
    ): Transition<DescElement, OldDatum, GElement, Datum>;

    /**
     * For each selected element, selects the first child element that matches the specified selector string, if any, and returns a transition on the resulting selection.
     * The selector may be specified either as a selector string or a function.
     * If a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element.
     * The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.
     * This method is equivalent to deriving the selection for this transition via transition.selection,
     * creating a subselection via selection.selectChild, and then creating a new transition via selection.transition.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChild<DescElement extends BaseType, OldDatum>(
      selector?: string | ValueFn<GElement, Datum, DescElement>,
    ): Transition<DescElement, OldDatum, GElement, Datum>;

    /**
     * For each selected element, selects all children that match the specified selector string, if any, and returns a transition on the resulting selection.
     * The selector may be specified either as a selector string or a function.
     * If a function, it is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element.
     * The new transition has the same id, name and timing as this transition;
     * however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.
     * This method is equivalent to deriving the selection for this transition via transition.selection,
     * creating a subselection via selection.selectChildren, and then creating a new transition via selection.transition.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    selectChildren<DescElement extends BaseType, OldDatum>(
      selector?: string | ValueFn<GElement, Datum, DescElement>,
    ): Transition<DescElement, OldDatum, GElement, Datum>;

    /**
     * Return the selection corresponding to this transition.
     */
    selection(): Selection<GElement, Datum, PElement, PDatum>;

    /**
     * Returns a new transition on the same selected elements as this transition, scheduled to start when this transition ends.
     * The new transition inherits a reference time equal to this transition’s time plus its delay and duration.
     * The new transition also inherits this transition’s name, duration, and easing.
     * This method can be used to schedule a sequence of chained transitions.
     *
     * A delay configured for the new transition will be relative to the previous transition.
     */
    transition(): Transition<GElement, Datum, PElement, PDatum>;

    // Modifying -------------------------------

    /**
     * For each selected element, assigns the attribute tween for the attribute with the specified name to the specified target value.
     * The starting value of the tween is the attribute’s value when the transition starts.
     * If the target value is null, the attribute is removed when the transition starts.
     */
    attr(name: string, value: null | string | number | boolean): this;
    /**
     * For each selected element, assigns the attribute tween for the attribute with the specified name to the specified target value.
     * The starting value of the tween is the attribute’s value when the transition starts.
     * The target value is return value of the value function evaluated for the selected element.
     *
     * An interpolator is chosen based on the type of the target value, using the following algorithm:
     * 1.) If value is a number, use interpolateNumber.
     * 2.) If value is a color or a string coercible to a color, use interpolateRgb.
     * 3.) Use interpolateString.
     *
     * To apply a different interpolator, use transition.attrTween.
     *
     * @param name Name of the attribute.
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * A null value will clear the attribute at the start of the transition.
     */
    attr(name: string, value: ValueFn<GElement, Datum, string | number | boolean | null>): this;

    /**
     * Return the current interpolator factory for attribute with the specified name, or undefined if no such tween exists.
     *
     * @param name Name of attribute.
     */
    attrTween(name: string): ValueFn<GElement, Datum, (this: GElement, t: number) => string> | undefined;
    /**
     * Remove the previously-assigned attribute tween of the specified name, if any.
     *
     * @param name Name of attribute.
     * @param factory Use null to remove previously-assigned attribute tween.
     */
    attrTween(name: string, factory: null): this;
    /**
     * Assign the attribute tween for the attribute with the specified name to the specified interpolator factory.
     * An interpolator factory is a function that returns an interpolator; when the transition starts, the factory is evaluated for each selected element.
     * The returned interpolator will then be invoked for each frame of the transition, in order,
     * being passed the eased time t, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the attribute value.
     * The interpolator must return a string.
     *
     * @param name Name of attribute.
     * @param factory An interpolator factory which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The interpolator factory returns a string interpolator,
     * which takes as its argument eased time t, typically in the range [0, 1] and returns the interpolated string.
     */
    attrTween(name: string, factory: ValueFn<GElement, Datum, (this: GElement, t: number) => string>): this;

    /**
     * For each selected element, the style with the specified name will be cleared at the start of the transition.
     *
     * @param name Name of the style.
     * @param value Use null to clear the style.
     */
    style(name: string, value: null): this;
    /**
     * For each selected element, assigns the style tween for the style with the specified name to the specified target value with the
     * specified priority.
     * The starting value of the tween is the style’s inline value if present, and otherwise its computed value.
     * The target value is the specified constant value for all elements.
     *
     * An interpolator is chosen based on the type of the target value, using the following algorithm:
     * 1.) If value is a number, use interpolateNumber.
     * 2.) If value is a color or a string coercible to a color, use interpolateRgb.
     * 3.) Use interpolateString.
     *
     * To apply a different interpolator, use transition.attrTween.
     *
     * @param name Name of the style.
     * @param value Target value for the style.
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(name: string, value: string | number | boolean, priority?: null | 'important'): this;
    /**
     * For each selected element, assigns the style tween for the style with the specified name to the specified target value with the
     * specified priority.
     * The starting value of the tween is the style's inline value if present, and otherwise its computed value.
     * The target value is return value of the value function evaluated for the selected element.
     *
     * An interpolator is chosen based on the type of the target value, using the following algorithm:
     * 1.) If value is a number, use interpolateNumber.
     * 2.) If value is a color or a string coercible to a color, use interpolateRgb.
     * 3.) Use interpolateString.
     *
     * To apply a different interpolator, use transition.attrTween.
     *
     * @param name Name of the style.
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * A null value will clear the style at the start of the transition.
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(
      name: string,
      value: ValueFn<GElement, Datum, string | number | boolean | null>,
      priority?: null | 'important',
    ): this;

    /**
     * Return the current interpolator factory for style with the specified name, or undefined if no such tween exists.
     *
     * @param name Name of style.
     */
    styleTween(name: string): ValueFn<GElement, Datum, (this: GElement, t: number) => string> | undefined;
    /**
     * Remove the previously-assigned style tween of the specified name, if any.
     *
     * @param name Name of style.
     * @param factory Use null to remove previously-assigned style tween.
     */
    styleTween(name: string, factory: null): this;
    /**
     * Assign the style tween for the style with the specified name to the specified interpolator factory.
     * An interpolator factory is a function that returns an interpolator; when the transition starts, the factory is evaluated for each selected element.
     * The returned interpolator will then be invoked for each frame of the transition, in order,
     * being passed the eased time t, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the style value.
     * The interpolator must return a string.
     *
     * @param name Name of style.
     * @param factory An interpolator factory which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The interpolator factory returns a string interpolator,
     * which takes as its argument eased time t, typically in the range [0, 1] and returns the interpolated string.
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    styleTween(
      name: string,
      factory: ValueFn<GElement, Datum, (this: GElement, t: number) => string>,
      priority?: null | 'important',
    ): this;

    /**
     * For each selected element, sets the text content to the specified target value when the transition starts.
     * A null value will clear the content.
     */
    text(value: null | string | number | boolean): this;
    /**
     * For each selected element, sets the text content returned by the value function for each selected element when the transition starts.
     *
     * To interpolate text rather than to set it on start, use transition.textTween (for example) or append a replacement element and cross-fade opacity (for example).
     * Text is not interpolated by default because it is usually undesirable.
     *
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * A null value will clear the text content at the start of the transition.
     */
    text(value: ValueFn<GElement, Datum, string | number | boolean>): this;

    /**
     * Returns the current interpolator factory for text, or undefined if no such tween exists.
     */
    textTween(): ValueFn<GElement, Datum, (this: GElement, t: number) => string> | undefined;
    /**
     * Removes the previously-assigned text tween, if any
     *
     * @param factory Use null to remove previously-assigned text tween.
     */
    textTween(factory: null): this;
    /**
     * Assigns the text tween to the specified interpolator factory.
     * An interpolator factory is a function that returns an interpolator; when the transition starts, the factory is evaluated for each selected element,
     * in order, being passed the current datum d and index i, with the this context as the current DOM element.
     * The returned interpolator will then be invoked for each frame of the transition, in order, being passed the eased time t, typically in the range [0, 1].
     * Lastly, the return value of the interpolator will be used to set the text.
     * The interpolator must return a string.
     *
     * @param factory An interpolator factory is a function that returns an interpolator; when the transition starts, the factory is evaluated for each selected element,
     * in order, being passed the current datum d and index i, with the this context as the current DOM element.
     * The returned interpolator will then be invoked for each frame of the transition, in order, being passed the eased time t, typically in the range [0, 1].
     * Lastly, the return value of the interpolator will be used to set the text.
     * The interpolator must return a string.
     */
    textTween(factory: ValueFn<GElement, Datum, (this: GElement, t: number) => string>): this;

    /**
     * For each selected element, removes the element when the transition ends, as long as the element has no other active or pending transitions.
     * If the element has other active or pending transitions, does nothing.
     */
    remove(): this;

    /**
     * Returns the tween with the specified name, or undefined, if no tween was previously assigned to
     * that name.
     *
     * @param name Name of tween.
     */
    tween(name: string): ValueFn<GElement, Datum, (this: GElement, t: number) => void> | undefined;
    /**
     * Removes the tween with the specified name, if a tween was previously assigned to
     * that name.
     *
     * @param name Name of tween.
     * @param tweenFn Use null to remove a previously-assigned tween.
     */
    tween(name: string, tweenFn: null): this;
    /**
     * For each selected element, assigns the tween with the specified name with the specified value function.
     * The value must be specified as a function that returns a function.
     * When the transition starts, the value function is evaluated for each selected element.
     * The returned function is then invoked for each frame of the transition, in order,
     * being passed the eased time t, typically in the range [0, 1].
     *
     * @param name Name of tween.
     * @param tweenFn A tween function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The tween function returns a function
     * which takes as its argument eased time t, typically in the range [0, 1] and performs the tweening activities for each transition frame.
     */
    tween(name: string, tweenFn: ValueFn<GElement, Datum, (this: GElement, t: number) => void>): this;

    /**
     * Returns a new transition merging this transition with the specified other transition,
     * which must have the same id as this transition. The returned transition has the same number of groups,
     * the same parents, the same name and the same id as this transition.
     * Any missing (null) elements in this transition are filled with the corresponding element, if present (not null), from the other transition.
     *
     * @param other The transition to be merged.
     */
    merge(other: Transition<GElement, Datum, PElement, PDatum>): Transition<GElement, Datum, PElement, PDatum>;

    /**
     * For each selected element, selects only the elements that match the specified filter, and returns a transition on the resulting selection.
     *
     * The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * @param filter A CSS selector string.
     */
    filter(filter: string): Transition<GElement, Datum, PElement, PDatum>;
    /**
     * For each selected element, selects only the elements that match the specified filter, and returns a transition on the resulting selection.
     *
     * The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * The generic refers to the type of element which will be selected after applying the filter, i.e. if the element types
     * contained in a pre-filter selection are narrowed to a subset as part of the filtering.
     *
     * @param filter A CSS selector string.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    filter<FilteredElement extends BaseType>(filter: string): Transition<FilteredElement, Datum, PElement, PDatum>;
    /**
     * For each selected element, selects only the elements that match the specified filter, and returns a transition on the resulting selection.
     *
     * The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * @param filter A filter function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The filter function returns a boolean indicating,
     * whether the selected element matches.
     */
    filter(filter: ValueFn<GElement, Datum, boolean>): Transition<GElement, Datum, PElement, PDatum>;
    /**
     * For each selected element, selects only the elements that match the specified filter, and returns a transition on the resulting selection.
     *
     * The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element,
     * the existing transition is returned for that element.
     *
     * The generic refers to the type of element which will be selected after applying the filter, i.e. if the element types
     * contained in a pre-filter selection are narrowed to a subset as part of the filtering.
     *
     * @param filter A filter function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The filter function returns a boolean indicating,
     * whether the selected element matches.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    filter<FilteredElement extends BaseType>(
      filter: ValueFn<GElement, Datum, boolean>,
    ): Transition<FilteredElement, Datum, PElement, PDatum>;

    // Event Handling -------------------

    /**
     * Return the currently-assigned listener for the specified event typename on the first (non-null) selected element, if any.
     * If multiple typenames are specified, the first matching listener is returned.
     *
     * @param typenames The typenames is one of the following string event types: start (when the transition starts), end (when the transition ends),
     * interrupt (when the transition is interrupted), cancel(when the transition is cancelled).
     * Note that these are not native DOM events. The type may be optionally followed by a period (.) and a name;
     * the optional name allows multiple callbacks to be registered to receive events of the same type, such as "start.foo"" and "start.bar".
     * To specify multiple typenames, separate typenames with spaces, such as "interrupt end"" or "start.foo start.bar".
     */
    on(typenames: string): ValueFn<GElement, Datum, void> | undefined;
    /**
     * Remove all listeners for a given name.
     *
     * @param typenames Name of the event type for which the listener should be removed. To remove all listeners for a given name use ".foo"
     * as the typename, where foo is the name; to remove all listeners with no name, specify "." as the typename.
     * @param listener Use null to remove listeners.
     */
    on(typenames: string, listener: null): this;
    /**
     * Add a listener to each selected element for the specified event typenames.
     *
     * When a specified transition event is dispatched on a selected node, the specified listener will be invoked for each transitioning element.
     * Listeners always see the latest datum for their element, but the index is a property of the selection and is fixed when the listener is assigned;
     * to update the index, re-assign the listener.
     *
     * @param typenames The typenames is one of the following string event types: start (when the transition starts), end (when the transition ends),
     * interrupt (when the transition is interrupted), cancel(when the transition is cancelled).
     * Note that these are not native DOM events. The type may be optionally followed by a period (.) and a name;
     * the optional name allows multiple callbacks to be registered to receive events of the same type, such as "start.foo"" and "start.bar".
     * To specify multiple typenames, separate typenames with spaces, such as "interrupt end"" or "start.foo start.bar".
     * @param listener A listener function which will be evaluated for each selected element, being passed the current datum (d), the current index (i),
     * and the current group (nodes), with this as the current DOM element (nodes[i]). Listeners always see the latest datum for their element,
     * but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener.
     */
    on(typenames: string, listener: ValueFn<GElement, Datum, void>): this;

    /**
     * Returns a promise that resolves when every selected element finishes transitioning. If any element’s transition is cancelled or interrupted, the promise rejects.
     */
    end(): Promise<void>;

    // Control Flow ----------------------

    /**
     * Invoke the specified function for each selected element, passing the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously.
     *
     * @param func A function which is invoked for each selected element,
     *             being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     */
    each(func: ValueFn<GElement, Datum, void>): this;

    /**
     * Invoke the specified function exactly once, passing in this transition along with any optional arguments.
     * Returns this transition.
     *
     * @param func A function which is passed this transition as the first argument along with any optional arguments.
     * @param args List of optional arguments to be passed to the callback function.
     */
    call(
      func: (transition: Transition<GElement, Datum, PElement, PDatum>, ...args: any[]) => any,
      ...args: any[]
    ): this;

    /**
     * Return true if this transition contains no (non-null) elements.
     */
    empty(): boolean;

    /**
     * Return the first (non-null) element in this transition. If the transition is empty, returns null.
     */
    node(): GElement | null;

    /**
     * Return an array of all (non-null) elements in this transition.
     */
    nodes(): GElement[];

    /**
     * Returns the total number of elements in this transition.
     */
    size(): number;

    // Transition Configuration ----------------------

    /**
     * Returns the current value of the delay for the first (non-null) element in the transition.
     * This is generally useful only if you know that the transition contains exactly one element.
     */
    delay(): number;
    /**
     * For each selected element, sets the transition delay to the specified value in milliseconds.
     * If a delay is not specified, it defaults to zero.
     *
     * @param milliseconds Number of milliseconds for the delay.
     */
    delay(milliseconds: number): this;
    /**
     * For each selected element, sets the transition delay to the value in milliseconds returned by the
     * value function.
     *
     * @param milliseconds A value function which is evaluated for each selected element, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The return value is a number
     * specifying the delay in milliseconds.
     */
    delay(milliseconds: ValueFn<GElement, Datum, number>): this;

    /**
     * Returns the current value of the duration for the first (non-null) element in the transition.
     * This is generally useful only if you know that the transition contains exactly one element.
     */
    duration(): number;
    /**
     * For each selected element, sets the transition duration to the specified value in milliseconds.
     * If a duration is not specified, it defaults to 250ms.
     *
     * @param duration Number of milliseconds for the duration.
     */
    duration(milliseconds: number): this;
    /**
     * For each selected element, sets the transition duration to the value in milliseconds returned by the
     * value function.
     *
     * @param milliseconds A value function which is evaluated for each selected element, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). The return value is a number
     * specifying the duration in milliseconds.
     */
    duration(milliseconds: ValueFn<GElement, Datum, number>): this;

    /**
     * Returns the current easing function for the first (non-null) element in the transition.
     * This is generally useful only if you know that the transition contains exactly one element.
     */
    ease(): (normalizedTime: number) => number;
    /**
     * Specifies the transition easing function for all selected elements. The value must be specified as a function.
     * The easing function is invoked for each frame of the animation, being passed the normalized time t in the range [0, 1];
     * it must then return the eased time tʹ which is typically also in the range [0, 1].
     * A good easing function should return 0 if t = 0 and 1 if t = 1. If an easing function is not specified,
     * it defaults to d3.easeCubic.
     *
     * @param easingFn An easing function which is passed the normalized time t in the range [0, 1];
     * it must then return the eased time tʹ which is typically also in the range [0, 1].
     * A good easing function should return 0 if t = 0 and 1 if t = 1.
     */
    ease(easingFn: (normalizedTime: number) => number): this;

    /**
     * Specifies a factory for the transition easing function.
     *
     * @param factory The factory must be a function.
     * It is invoked for each node of the selection, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element.
     * It must return an easing function.
     */
    easeVarying(factory: ValueFn<GElement, Datum, (normalizedTime: number) => number>): this;
  }

  /**
   * Represents the union of the Selection and Transition types for any usages that operate on both.
   * Typically used for functions which take in either a selection or transition and set or update attributes.
   */
  export type SelectionOrTransition<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> =
    | Selection<GElement, Datum, PElement, PDatum>
    | Transition<GElement, Datum, PElement, PDatum>;

  /**
   * Returns a new transition with the specified name. If a name is not specified, null is used.
   * The new transition is only exclusive with other transitions of the same name.
   *
   * The generic "OldDatum" refers to the type of a previously-set datum of the selected element in the Transition.
   *
   * @param name Name of the transition.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function transition<OldDatum>(name?: string): Transition<BaseType, OldDatum, null, undefined>;

  /**
   * Returns a new transition from an existing transition.
   *
   * When using a transition instance, the returned transition has the same id and name as the specified transition.
   *
   * The generic "OldDatum" refers to the type of a previously-set datum of the selected element in the Transition.
   *
   * @param transition A transition instance.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function transition<OldDatum>(
    transition: Transition<BaseType, any, BaseType, any>,
  ): Transition<BaseType, OldDatum, null, undefined>;
}

declare module 'd3-zoom' {
  // Last module patch version validated against: 3.0.0

  import { ZoomView } from 'd3-interpolate';
  import { Selection, TransitionLike, ValueFn } from 'd3-selection';

  // --------------------------------------------------------------------------
  // Shared Type Definitions and Interfaces
  // --------------------------------------------------------------------------

  /**
   * ZoomedElementBaseType serves as an alias for the 'minimal' data type which can be selected
   * without 'd3-zoom' (and related code in 'd3-selection') trying to use properties internally which would otherwise not
   * be supported.
   */
  export type ZoomedElementBaseType = Element;

  /**
   * Minimal interface for a continuous scale.
   * This interface is used as a minimum contract for scale objects
   * that  can be passed into zoomTransform methods rescaleX and rescaleY
   */
  export interface ZoomScale {
    domain(): number[] | Date[];
    domain(domain: Array<Date | number>): this;
    range(): number[];
    range(range: number[]): this;
    copy(): ZoomScale;
    invert(value: number): number | Date;
  }

  // --------------------------------------------------------------------------
  // Zoom Behavior
  // --------------------------------------------------------------------------

  /**
   * A D3 Zoom Behavior
   *
   * The first generic refers to the type of reference element to which the zoom behavior is attached.
   * The second generic refers to the type of the datum of the reference element.
   */
  export interface ZoomBehavior<ZoomRefElement extends ZoomedElementBaseType, Datum> extends Function {
    /**
     * Applies this zoom behavior to the specified selection, binding the necessary event listeners to
     * allow panning and zooming, and initializing the zoom transform on each selected element to the identity transform if not already defined. This function is typically not invoked directly,
     * and is instead invoked via selection.call.
     *
     * For details see: {@link https://github.com/d3/d3-zoom#_zoom}
     *
     * @param selection A D3 selection of elements.
     * @param args Optional arguments to be passed in.
     */
    (selection: Selection<ZoomRefElement, Datum, any, any>, ...args: any[]): void;
    /**
     * If selection is a selection, sets the current zoom transform of the selected elements to the specified transform, instantaneously emitting start, zoom and end events.
     * If selection is a transition, defines a “zoom” tween to the specified transform using d3.interpolateZoom, emitting a start event when the transition starts,
     * zoom events for each tick of the transition, and then an end event when the transition ends (or is interrupted).
     * The transition will attempt to minimize the visual movement around the specified point; if the point is not specified, it defaults to the center of the viewport extent.
     *
     * This function is typically not invoked directly, and is instead invoked via selection.call or transition.call.
     *
     * @param selection A selection or a transition.
     * @param transform A zoom transform or a function that returns a zoom transform.
     * If a function, it is invoked for each selected element, being passed the current event (event) and datum d, with the this context as the current DOM element.
     * @param point A two-element array [x, y] or a function that returns such an array.
     * If a function, it is invoked for each selected element, being passed the current event (event) and datum d, with the this context as the current DOM element.
     */
    transform(
      selection: Selection<ZoomRefElement, Datum, any, any> | TransitionLike<ZoomRefElement, Datum>,
      transform: ZoomTransform | ((this: ZoomRefElement, event: any, d: Datum) => ZoomTransform),
      point?: [number, number] | ((this: ZoomRefElement, event: any, d: Datum) => [number, number]),
    ): void;

    /**
     * If selection is a selection, translates the current zoom transform of the selected elements by x and y, such that the new tx1 = tx0 + kx and ty1 = ty0 + ky.
     * If selection is a transition, defines a “zoom” tween translating the current transform.
     * This method is a convenience method for zoom.transform.
     *
     * @param selection A selection or a transition.
     * @param x A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * @param y A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     */
    translateBy(
      selection: Selection<ZoomRefElement, Datum, any, any> | TransitionLike<ZoomRefElement, Datum>,
      x: number | ValueFn<ZoomRefElement, Datum, number>,
      y: number | ValueFn<ZoomRefElement, Datum, number>,
    ): void;

    /**
     * If selection is a selection, translates the current zoom transform of the selected elements such that the given position ⟨x,y⟩ appears at given point p.
     * The new tx = px - kx and ty = py - ky. If p is not specified, it defaults to the center of the viewport extent.
     * If selection is a transition, defines a “zoom” tween translating the current transform. This method is a convenience method for zoom.transform.
     *
     * Translates the current zoom transform of the selected elements such that the specified position ⟨x,y⟩ appears at the center of the viewport extent.
     * The new tx = cx - kx and ty = cy - ky, where ⟨cx,cy⟩ is the center.
     *
     * x is provided as a constant for all elements.
     * y is provided as a constant for all elements.
     *
     * @param selection A selection or a transition.
     * @param x A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * @param y A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * @param p A two-element array [px,py] or a function
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     */
    translateTo(
      selection: Selection<ZoomRefElement, Datum, any, any> | TransitionLike<ZoomRefElement, Datum>,
      x: number | ValueFn<ZoomRefElement, Datum, number>,
      y: number | ValueFn<ZoomRefElement, Datum, number>,
      p?: [number, number] | ValueFn<ZoomRefElement, Datum, [number, number]>,
    ): void;

    /**
     * If selection is a selection, scales the current zoom transform of the selected elements by k, such that the new k₁ = k₀k.
     * The reference point p does move.
     * If p is not specified, it defaults to the center of the viewport extent.
     * If selection is a transition, defines a “zoom” tween translating the current transform.
     * This method is a convenience method for zoom.transform.
     *
     * @param selection A selection or a transition.
     * @param k Scale factor. A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * @param p A two-element array [px,py] or a function.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     */
    scaleBy(
      selection: Selection<ZoomRefElement, Datum, any, any> | TransitionLike<ZoomRefElement, Datum>,
      k: number | ValueFn<ZoomRefElement, Datum, number>,
      p?: [number, number] | ValueFn<ZoomRefElement, Datum, [number, number]>,
    ): void;

    /**
     * If selection is a selection, scales the current zoom transform of the selected elements to k, such that the new k₁ = k.
     * The reference point p does move.
     * If p is not specified, it defaults to the center of the viewport extent.
     * If selection is a transition, defines a “zoom” tween translating the current transform.
     * This method is a convenience method for zoom.transform.
     *
     * @param selection: A selection or a transition.
     * @param k Scale factor. A number or a function that returns a number.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     * @param p A two-element array [px,py] or a function.
     * If a function, it is invoked for each selected element, being passed the current datum d and index i, with the this context as the current DOM element.
     */
    scaleTo(
      selection: Selection<ZoomRefElement, Datum, any, any> | TransitionLike<ZoomRefElement, Datum>,
      k: number | ValueFn<ZoomRefElement, Datum, number>,
      p?: [number, number],
    ): void;

    /**
     * Returns the current constraint function.
     * The default implementation attempts to ensure that the viewport extent does not go outside the translate extent.
     */
    constrain(): (
      transform: ZoomTransform,
      extent: [[number, number], [number, number]],
      translateExtent: [[number, number], [number, number]],
    ) => ZoomTransform;
    /**
     * Sets the transform constraint function to the specified function and returns the zoom behavior.
     *
     * @param constraint A constraint function which returns a transform given the current transform, viewport extent and translate extent.
     * The default implementation attempts to ensure that the viewport extent does not go outside the translate extent.
     */
    constrain(
      constraint: (
        transform: ZoomTransform,
        extent: [[number, number], [number, number]],
        translateExtent: [[number, number], [number, number]],
      ) => ZoomTransform,
    ): this;

    /**
     * Returns the current filter function.
     */
    filter(): (this: ZoomRefElement, event: any, datum: Datum) => boolean;
    /**
     * Sets the filter to the specified filter function and returns the zoom behavior.
     * The filter function is invoked in the zoom initiating event handlers of each element to which the zoom behavior was applied.
     *
     * If the filter returns falsey, the initiating event is ignored and no zoom gesture is started.
     * Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons,
     * since those buttons are typically intended for other purposes, such as the context menu.
     *
     * @param filter A filter function which is invoked in the zoom initiating event handlers of each element to which the zoom behavior was applied,
     * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
     * The function returns a boolean value.
     */
    filter(filter: (this: ZoomRefElement, event: any, datum: Datum) => boolean): this;

    /**
     * Returns the current touch support detector, which defaults to a function returning true,
     * if the "ontouchstart" event is supported on the current element.
     */
    touchable(): ValueFn<ZoomRefElement, Datum, boolean>;
    /**
     * Sets the touch support detector to the specified boolean value and returns the zoom behavior.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the zoom behavior is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A boolean value. true when touch event listeners should be applied to the corresponding element, otherwise false.
     */
    touchable(touchable: boolean): this;
    /**
     * Sets the touch support detector to the specified function and returns the zoom behavior.
     *
     * Touch event listeners are only registered if the detector returns truthy for the corresponding element when the zoom behavior is applied.
     * The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example,
     * fails detection.
     *
     * @param touchable A touch support detector function, which returns true when touch event listeners should be applied to the corresponding element.
     * The function is evaluated for each selected element to which the zoom behavior was applied, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element. The function returns a boolean value.
     */
    touchable(touchable: ValueFn<ZoomRefElement, Datum, boolean>): this;

    /**
     * Returns the current wheelDelta function.
     */
    wheelDelta(): ValueFn<ZoomRefElement, Datum, number>;
    /**
     * Sets the wheel delta function to the specified function and returns the zoom behavior. The wheel delta function which is invoked in the wheel event handler
     * of each element to which the zoom behavior was applied.
     * The value Δ returned by the wheel delta function determines the amount of scaling applied in response to a WheelEvent.
     * The scale factor transform.k is multiplied by 2Δ; for example, a Δ of +1 doubles the scale factor, Δ of -1 halves the scale factor.
     *
     * @param delta Wheel delta function which is invoked in the wheel event handler of each element to which the zoom behavior was applied,
     * in order, being passed the wheel event that triggered the handler,
     * with this as the current DOM element. The function returns a numeric value.
     */
    wheelDelta(delta: ((event: WheelEvent) => number) | number): this;

    /**
     * Return the current extent accessor, which defaults to [[0, 0], [width, height]] where width is the client width of the element and height is its client height;
     * for SVG elements, the nearest ancestor SVG element’s width and height is used. In this case,
     * the owner SVG element must have defined width and height attributes rather than (for example) relying on CSS properties or the viewBox attribute;
     * SVG provides no programmatic method for retrieving the initial viewport size. Alternatively, consider using element.getBoundingClientRect.
     * (In Firefox, element.clientWidth and element.clientHeight is zero for SVG elements!)
     */
    extent(): (this: ZoomRefElement, datum: Datum) => [[number, number], [number, number]];
    /**
     * Set the viewport extent to the specified array of points [[x0, y0], [x1, y1]],
     * where [x0, y0] is the top-left corner of the viewport and [x1, y1] is the bottom-right corner of the viewport,
     * and return this zoom behavior.
     *
     * The viewport extent affects several functions: the center of the viewport remains fixed during changes by zoom.scaleBy and zoom.scaleTo;
     * the viewport center and dimensions affect the path chosen by d3.interpolateZoom; and the viewport extent is needed to enforce the optional translate extent.
     *
     * @param extent An extent specified as an array of two coordinates.
     */
    extent(extent: [[number, number], [number, number]]): this;
    /**
     * Set the viewport extent to the array of points [[x0, y0], [x1, y1]] returned by the
     * extent accessor function, and return this zoom behavior.
     * The extent accessor function is evaluated for each element.
     *
     * [x0, y0] is the top-left corner of the viewport and [x1, y1] is the bottom-right corner of the viewport.
     *
     * The viewport extent affects several functions: the center of the viewport remains fixed during changes by zoom.scaleBy and zoom.scaleTo;
     * the viewport center and dimensions affect the path chosen by d3.interpolateZoom; and the viewport extent is needed to enforce the optional translate extent.
     *
     * The default is [[0, 0], [width, height]] where width is the client width of the element and height is its client height;
     * for SVG elements, the nearest ancestor SVG element’s width and height is used.
     * In this case, the owner SVG element must have defined width and height attributes rather than (for example) relying on CSS properties or the viewBox attribute;
     * SVG provides no programmatic method for retrieving the initial viewport size. Alternatively, consider using element.getBoundingClientRect.
     * (In Firefox, element.clientWidth and element.clientHeight is zero for SVG elements!)
     *
     * @param extent An extent accessor function which is evaluated for each selected element, being passed the current datum d, with the this context as the current DOM element.
     * The function returns the extent array.
     */
    extent(extent: (this: ZoomRefElement, datum: Datum) => [[number, number], [number, number]]): this;

    /**
     * Return the current scale extent.
     */
    scaleExtent(): [number, number];
    /**
     * Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor,
     * and return this zoom behavior.
     *
     * The scale extent restricts zooming in and out. It is enforced on interaction and when using zoom.scaleBy, zoom.scaleTo and zoom.translateBy;
     * however, it is not enforced when using zoom.transform to set the transform explicitly.
     *
     * The default scale extent is [0, infinity].
     *
     * If the user tries to zoom by wheeling when already at the corresponding limit of the scale extent, the wheel events will be ignored and not initiate a zoom gesture.
     * This allows the user to scroll down past a zoomable area after zooming in, or to scroll up after zooming out.
     * If you would prefer to always prevent scrolling on wheel input regardless of the scale extent, register a wheel event listener to prevent the browser default behavior
     *
     * @param extent A scale extent array of two numbers representing the scale boundaries.
     */
    scaleExtent(extent: [number, number]): this;

    /**
     * Return the current translate extent.
     */
    translateExtent(): [[number, number], [number, number]];
    /**
     * Set the translate extent to the specified array of points [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner of the world and [x1, y1]
     * is the bottom-right corner of the world, and return this zoom behavior.
     *
     * The translate extent restricts panning, and may cause translation on zoom out. It is enforced on interaction and when using zoom.scaleBy, zoom.scaleTo and zoom.translateBy;
     * however, it is not enforced when using zoom.transform to set the transform explicitly.
     *
     * The default scale extent is [[-infinity, infinity], [-infinity, infinity]].
     *
     * @param extent A translate extent array, i.e. an array of two arrays, each representing a point.
     */
    translateExtent(extent: [[number, number], [number, number]]): this;

    /**
     * Return the current click distance threshold, which defaults to zero.
     */
    clickDistance(): number;
    /**
     * Set the maximum distance that the mouse can move between mousedown and mouseup that will trigger
     * a subsequent click event. If at any point between mousedown and mouseup the mouse is greater than or equal to
     * distance from its position on mousedown, the click event following mouseup will be suppressed.
     *
     * @param distance The distance threshold between mousedown and mouseup measured in client coordinates (event.clientX and event.clientY).
     * The default is zero.
     */
    clickDistance(distance: number): this;

    /**
     * Return the current tap distance threshold, which defaults to 10.
     */
    tapDistance(): number;
    /**
     * Sets the maximum distance that a double-tap gesture can move between first touchstart and second touchend that will trigger a subsequent double-click event.
     *
     * @param distance The distance threshold between mousedown and mouseup measured in client coordinates (event.clientX and event.clientY).
     * The default is 10.
     */
    tapDistance(distance: number): this;

    /**
     * Get the duration for zoom transitions on double-click and double-tap in milliseconds.
     */
    duration(): number;
    /**
     * Set the duration for zoom transitions on double-click and double-tap to the specified number of milliseconds and returns the zoom behavior.
     *
     * To disable double-click and double-tap transitions, you can remove the zoom behavior’s dblclick event listener after applying the zoom behavior to the selection.
     *
     * @param duration in milliseconds.
     */
    duration(duration: number): this;

    /**
     * Returns the current interpolation factory, which defaults to d3.interpolateZoom to implement smooth zooming.
     */
    interpolate<
      // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
      InterpolationFactory extends (a: ZoomView, b: ZoomView) => (t: number) => ZoomView,
    >(): InterpolationFactory;

    /**
     * Sets the interpolation factory for zoom transitions to the specified function.
     * Use the default d3.interpolateZoom to implement smooth zooming.
     * To apply direct interpolation between two views, try d3.interpolate instead.
     *
     * Each view is defined as an array of three numbers: cx, cy and width. The first two coordinates cx, cy represent the center of the viewport;
     * the last coordinate width represents the size of the viewport.
     *
     * @param interpolatorFactory An interpolator factory to be used to generate interpolators between zooms for transitions.
     */
    interpolate(interpolatorFactory: (a: ZoomView, b: ZoomView) => (t: number) => ZoomView): this;

    /**
     * Return the first currently-assigned listener matching the specified typenames, if any.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after zooming begins [such as mousedown]), zoom (after a change to the zoom  transform [such as mousemove], or
     * end (after an active pointer becomes inactive [such as on mouseup].)
     */
    on(typenames: string): ((this: ZoomRefElement, event: any, d: Datum) => void) | undefined;
    /**
     * Remove the current event listeners for the specified typenames, if any, return the drag behavior.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after zooming begins [such as mousedown]), zoom (after a change to the zoom  transform [such as mousemove], or
     * end (after an active pointer becomes inactive [such as on mouseup].)
     * @param listener Use null to remove the listener.
     */
    on(typenames: string, listener: null): this;
    /**
     * Set the event listener for the specified typenames and return the zoom behavior.
     * If an event listener was already registered for the same type and name,
     * the existing listener is removed before the new listener is added.
     * When a specified event is dispatched, each listener will be invoked with the same context and arguments as selection.on listeners.
     *
     * @param typenames The typenames is a string containing one or more typename separated by whitespace.
     * Each typename is a type, optionally followed by a period (.) and a name, such as "drag.foo"" and "drag.bar";
     * the name allows multiple listeners to be registered for the same type. The type must be one of the following:
     * start (after zooming begins [such as mousedown]), zoom (after a change to the zoom  transform [such as mousemove], or
     * end (after an active pointer becomes inactive [such as on mouseup].)
     * @param listener An event listener function which is evaluated for each selected element,
     * in order, being passed the current event (event) and datum d, with the this context as the current DOM element.
     */
    on(typenames: string, listener: (this: ZoomRefElement, event: any, d: Datum) => void): this;
  }

  /**
   * Creates a new zoom behavior. The returned behavior, zoom, is both an object and a function,
   * and is typically applied to selected elements via selection.call.
   *
   * The first generic refers to the type of reference element to which the zoom behavior is attached.
   * The second generic refers to the type of the datum of the reference element.
   */
  // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
  export function zoom<ZoomRefElement extends ZoomedElementBaseType, Datum>(): ZoomBehavior<ZoomRefElement, Datum>;

  // --------------------------------------------------------------------------
  // Zoom Event
  // --------------------------------------------------------------------------

  /**
   * A D3 Zoom Event
   *
   * The first generic refers to the type of reference element to which the zoom behavior is attached.
   * The second generic refers to the type of the datum of the reference element.
   */
  export interface D3ZoomEvent<ZoomRefElement extends ZoomedElementBaseType, Datum> {
    /**
     * The ZoomBehavior associated with the event
     */
    target: ZoomBehavior<ZoomRefElement, Datum>;
    /**
     * The event type for the zoom event
     */
    type: 'start' | 'zoom' | 'end' | string; // Leave failsafe string type for cases like 'zoom.foo'
    /**
     * The current zoom transform
     */
    transform: ZoomTransform;
    /**
     * The underlying input event, such as mousemove or touchmove.
     */
    sourceEvent: any;
  }

  // --------------------------------------------------------------------------
  // Zoom Transforms
  // --------------------------------------------------------------------------

  /**
   * A zoom transform
   *
   * The zoom behavior stores the zoom state on the element to which the zoom behavior was applied, not on the zoom behavior itself.
   * This is because the zoom behavior can be applied to many elements simultaneously, and each element can be zoomed independently.
   * The zoom state can change either on user interaction or programmatically via zoom.transform.
   *
   * To retrieve the zoom state, use event.transform on the current zoom event within a zoom event listener (see zoom.on), or use d3.zoomTransform for a given node.
   * The latter is particularly useful for modifying the zoom state programmatically,
   * say to implement buttons for zooming in and out.
   *
   * For details see {@link https://github.com/d3/d3-zoom#zoom-transforms}
   */
  export class ZoomTransform {
    /**
     * Returns a transform with scale k and translation (x, y).
     */
    constructor(k: number, x: number, y: number);

    /**
     * The translation amount tx along the x-axis.
     * This property should be considered read-only; instead of mutating a transform,
     * use transform.scale and transform.translate to derive a new transform.
     * Also see zoom.scaleBy, zoom.scaleTo and zoom.translateBy for convenience methods on the zoom behavior.
     */
    readonly x: number;

    /**
     * The translation amount ty along the y-axis
     * This property should be considered read-only; instead of mutating a transform,
     * use transform.scale and transform.translate to derive a new transform.
     * Also see zoom.scaleBy, zoom.scaleTo and zoom.translateBy for convenience methods on the zoom behavior.
     */
    readonly y: number;

    /**
     * The scale factor k.
     * This property should be considered read-only; instead of mutating a transform,
     * use transform.scale and transform.translate to derive a new transform.
     * Also see zoom.scaleBy, zoom.scaleTo and zoom.translateBy for convenience methods on the zoom behavior.
     */
    readonly k: number;

    /**
     * Return the transformation of the specified point which is a two-element array of numbers [x, y].
     * The returned point is equal to [xk + tx, yk + ty].
     *
     * @param point Point coordinates [x, y]
     */
    apply(point: [number, number]): [number, number];

    /**
     * Return the transformation of the specified x-coordinate, xk + tx.
     *
     * @param x Value of x-coordinate.
     */
    applyX(x: number): number;

    /**
     * Return the transformation of the specified y-coordinate, yk + ty.
     *
     * @param y Value of y-coordinate.
     */
    applyY(y: number): number;

    /**
     * Return the inverse transformation of the specified point which is a two-element array of numbers [x, y].
     * The returned point is equal to [(x - tx) / k, (y - ty) / k].
     *
     * @param point Point coordinates [x, y]
     */
    invert(point: [number, number]): [number, number];

    /**
     * Return the inverse transformation of the specified x-coordinate, (x - tx) / k.
     *
     * @param x Value of x-coordinate.
     */
    invertX(x: number): number;

    /**
     * Return the inverse transformation of the specified y-coordinate, (y - ty) / k.
     *
     * @param y Value of y-coordinate.
     */
    invertY(y: number): number;

    /**
     * Returns a copy of the continuous scale x whose domain is transformed.
     * This is implemented by first applying the inverse x-transform on the scale’s range,
     * and then applying the inverse scale to compute the corresponding domain
     *
     * The scale x must use d3.interpolateNumber; do not use continuous.rangeRound as this
     * reduces the accuracy of continuous.invert and can lead to an inaccurate rescaled domain.
     * This method does not modify the input scale x; x thus represents the untransformed scale,
     * while the returned scale represents its transformed view.
     *
     * @param xScale A continuous scale for x-dimension.
     */
    rescaleX<S extends ZoomScale>(xScale: S): S;

    /**
     * Returns a copy of the continuous scale y whose domain is transformed.
     * This is implemented by first applying the inverse y-transform on the scale’s range,
     * and then applying the inverse scale to compute the corresponding domain
     *
     * The scale y must use d3.interpolateNumber; do not use continuous.rangeRound as this
     * reduces the accuracy of continuous.invert and can lead to an inaccurate rescaled domain.
     * This method does not modify the input scale x; x thus represents the untransformed scale,
     * while the returned scale represents its transformed view.
     *
     * @param yScale A continuous scale for y-dimension.
     */
    rescaleY<S extends ZoomScale>(yScale: S): S;

    /**
     * Return a transform whose scale k1 is equal to k0 × k, where k0 is this transform’s scale.
     *
     * @param k A scale factor.
     */
    scale(k: number): ZoomTransform;

    /**
     * Return a string representing the SVG transform corresponding to this transform.
     */
    toString(): string;

    /**
     * Returns a transform whose translation tx1 and ty1 is equal to tx0 + tkx and ty0 + tky,
     * where tx0 and ty0 is this transform’s translation and tk is this transform’s scale.
     *
     * @param x Amount of translation in x-direction.
     * @param y Amount of translation in y-direction.
     */
    translate(x: number, y: number): ZoomTransform;
  }

  /**
   * Returns the current transform for the specified node. Note that node should typically be a DOM element, and not a selection.
   * (A selection may consist of multiple nodes, in different states, and this function only returns a single transform.) If you have a selection, call selection.node first.
   * In the context of an event listener, the node is typically the element that received the input event (which should be equal to event.transform), "this".
   * Internally, an element’s transform is stored as element.__zoom; however, you should use this method rather than accessing it directly.
   * If the given node has no defined transform, returns the identity transformation.
   * The returned transform represents a two-dimensional transformation matrix
   *
   * For details see {@link https://github.com/d3/d3-zoom#zoom-transforms}
   *
   * @param node An element for which to retrieve its current zoom transform.
   */
  export function zoomTransform(node: ZoomedElementBaseType): ZoomTransform;

  /**
   * The identity transform, where k = 1, tx = ty = 0.
   */
  export const zoomIdentity: ZoomTransform;
}
