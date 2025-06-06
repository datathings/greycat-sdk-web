export interface StringifyProps {
  value: unknown;
  /**
   * use `name` to override node's ref with the given value
   */
  name?: string;
  /**
   * use `text` to completely override the type-check and display the given text
   */
  text?: string;
  tiny?: boolean;
  /** optional Date formatter used for: `core.time`, `core.Date` and `Date` */
  dateFmt?: Intl.DateTimeFormat;
  /** optional number formatter used for: `number` */
  numFmt?: Intl.NumberFormat;
  /**
   * pretty-print content if possible
   */
  pretty?: boolean;
  /** optional boolean to surround strings with doublequotes, defaults to `false` */
  quotedString?: boolean;
  /** optional timezone for datetime display */
  timezone?: gc.core.TimeZone;
  /** optional format for datetime display */
  format?: string;
}

/**
 * Best-effort to stringify the given value.
 */
export function stringify(props: StringifyProps): string {
  const { text, value, dateFmt, numFmt, name, tiny, pretty = false, timezone, format } = props;
  if (text) {
    return text;
  } else if (value instanceof gc.core.time) {
    return value.toString(timezone, format);
  } else if (value instanceof gc.core.duration) {
    return value.toString();
  } else if (typeof value === 'string') {
    if (tiny) {
      return props.quotedString ? `"${toStrTiny(value)}"` : toStrTiny(value);
    }
    return props.quotedString ? `"${value}"` : value;
  } else if (typeof value === 'number') {
    return numFmt ? numFmt.format(value) : `${value}`;
  } else if (value instanceof Date) {
    return dateFmt ? dateFmt.format(value) : value.toISOString();
  } else if (value instanceof gc.core.Date) {
    return value.toString();
  } else if (value instanceof gc.core.str) {
    return value.toString();
  } else if (value instanceof gc.core.Tuple) {
    const tmp = props.value;
    const tmpQuotedString = props.quotedString;
    props.value = value.x;
    props.quotedString = true;
    const x = stringify(props);
    props.value = value.y;
    const y = stringify(props);
    props.value = tmp;
    props.quotedString = tmpQuotedString;
    return `(${x}, ${y})`;
  } else if (gc.sdk.isNode(value)) {
    if (name) {
      const type = Object.getPrototypeOf(value).constructor._type.split('::')[1];
      return `${type}/${encodeURIComponent(name)}`;
    }
    return value.toString();
  } else if (value instanceof gc.core.geo) {
    if (tiny) {
      return `${value.lat.toFixed(2)}, ${value.lng.toFixed(2)}`;
    } else {
      return `${value.lat}, ${value.lng}`;
    }
  } else if (Array.isArray(value)) {
    return `Array { size: ${value.length} }`;
  } else if (value instanceof gc.sdk.GCEnum) {
    if (value.value) {
      const tmp = props.value;
      const tmpQuotedString = props.quotedString;
      props.value = value.value;
      props.quotedString = true;
      const en_value = stringify(props);
      props.value = tmp;
      props.quotedString = tmpQuotedString;
      if (value.$type.name.startsWith('core::')) {
        return `${value.$type.name.slice(6)}::${value.key}(${en_value})`;
      } else {
        return `${value.$type.name}::${value.key}(${en_value})`;
      }
    }
    if (value.$type.name.startsWith('core::')) {
      return `${value.$type.name.slice(6)}::${value.key}`;
    } else {
      return `${value.$type.name}::${value.key}`;
    }
  } else if ('Node' in globalThis && value instanceof globalThis['Node']) {
    return value.textContent ?? '';
  } else if (
    value instanceof gc.core.t2 ||
    value instanceof gc.core.t2f ||
    value instanceof gc.core.t3 ||
    value instanceof gc.core.t3f ||
    value instanceof gc.core.t4 ||
    value instanceof gc.core.t4f
  ) {
    return value.toString(numFmt);
  } else if (value instanceof Map) {
    return `Map { size: ${value.size} }`;
  } else if (typeof value === 'object') {
    if (value) {
      if (tiny) {
        const type: string | undefined = Object.getPrototypeOf(value).constructor._type;
        if (type) {
          if (name) {
            return `gc://${type}/${name}`;
          }
          return `gc://${type}`;
        }
        return `Object(${Object.keys(value).length})`;
      }
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty('toString')) {
        return value.toString();
      }
    }
    return JSON.stringify(value, bigintsAsString, pretty ? '  ' : undefined);
  }
  return String(value);
}

/**
 * Ellipsis a string after `max` character.
 * @param s
 * @param max
 * @returns
 */
// eslint-disable-next-line no-inner-declarations
function toStrTiny(s: string, max = 100) {
  if (s.length > max) {
    return `${s.slice(0, max)}...`;
  }
  return s;
}

/**
 * Stringifies `bigint`, the rest is left unchanged
 */
// eslint-disable-next-line no-inner-declarations
function bigintsAsString(_key: string, value: unknown): unknown {
  if (typeof value === 'bigint') {
    return `${value}`;
  }
  return value;
}
