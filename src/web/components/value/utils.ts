export interface StringifyProps extends gc.sdk.ToStringOptions {
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
  /**
   * pretty-print content if possible
   */
  pretty?: boolean;
  /** optional boolean to surround strings with doublequotes, defaults to `false` */
  quotedString?: boolean;
}

// TODO: remove `value` from `props` and pass it as its own argument
/**
 * Best-effort to stringify the given value.
 */
export function stringify(props: StringifyProps): string {
  const text = props.text;
  const value = props.value;
  const name = props.name;
  const tiny = props.tiny;
  const pretty = props.pretty ?? false;
  if (text) {
    return text;
  } else if (value instanceof gc.core.time) {
    return value.toString(props);
  } else if (value instanceof gc.core.duration) {
    return value.toString(props);
  } else if (typeof value === 'string') {
    if (tiny) {
      return props.quotedString ? `"${toStrTiny(value)}"` : toStrTiny(value);
    }
    return props.quotedString ? `"${value}"` : value;
  } else if (typeof value === 'number') {
    return props.numFmt ? props.numFmt.format(value) : `${value}`;
  } else if (value instanceof Date) {
    return gc.core.time.fromDate(value).toString(props);
  } else if (value instanceof gc.core.Date) {
    return value.toString(props);
  } else if (value instanceof gc.core.str) {
    return value.toString(props);
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
    return value.toString(props);
  } else if (value instanceof gc.core.geo) {
    if (tiny) {
      return `${value.lat.toFixed(2)}, ${value.lng.toFixed(2)}`;
    } else {
      return `${value.lat}, ${value.lng}`;
    }
  } else if (Array.isArray(value)) {
    if (value.length < 10) {
      const str = JSON.stringify(value, bigintAsStringOrNumber);
      if (str.length < 50) {
        return str;
      }
    }
    if (value.$type) {
      return `${value.$type.name} { size: ${value.length} }`;
    }
    return `Array { size: ${value.length} }`;
  } else if (value instanceof gc.sdk.GCEnum) {
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
    return value.toString(props);
  } else if (value instanceof Map) {
    return `Map { size: ${value.size} }`;
  } else if (value instanceof gc.runtime.Task) {
    const fn = value.type ? `${value.mod}::${value.type}::${value.fun}` : `${value.mod}::${value.fun}`;
    switch (value.status.key) {
      case 'ended':
      case 'ended_with_errors':
      case 'cancelled':
      case 'error':
        return `${value.user_id}/${value.task_id} ${fn} ${value.status.key}, started at ${value.start?.toString()} took ${value.duration?.toString()}`;
      default:
        return `${value.user_id}/${value.task_id} ${fn} ${value.status.key}, created at ${value.creation.toString()}`;
    }
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
    return JSON.stringify(value, bigintAsStringOrNumber, pretty ? '  ' : undefined);
  }
  return String(value);
}

/**
 * Ellipsis a string after `max` character.
 * @param s
 * @param max
 * @returns
 */
function toStrTiny(s: string, max = 100) {
  if (s.length > max) {
    return `${s.slice(0, max)}...`;
  }
  return s;
}

/**
 * Stringifies `bigint`, the rest is left unchanged
 */
function bigintAsStringOrNumber(_key: string, value: unknown): unknown {
  if (typeof value === 'bigint') {
    if (value < Number.MIN_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER) {
      return `${value}`;
    }
    return Number(value);
  }
  return value;
}
