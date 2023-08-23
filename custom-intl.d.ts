declare namespace Intl {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
  // and https://github.com/microsoft/TypeScript/issues/49231
  type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit';
  /**
   * @param key a key string indicating the category of values to be returned.
   * @returns a sorted array of unique string values indicating the values supported by the implementation for the given key.
   * @throws {RangeError} an unsupported key was passed as a parameter
   */
  function supportedValuesOf(key: Key): string[];
}
