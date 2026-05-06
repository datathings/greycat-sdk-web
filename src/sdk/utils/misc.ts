namespace gc {
  export namespace sdk {
    const NUM = '0123456789';
    const LOWER_ALPHA = 'abcdefghijklmnopqrstuvwxyz';
    const UPPER_ALPHA = LOWER_ALPHA.toUpperCase();
    const CHARS = NUM + LOWER_ALPHA + UPPER_ALPHA;
    const HUMAN_SIZE = ' KMGTPEZY';
    const GREYCAT_NUMBER_TYPES = ['core::float', 'core::int'];

    const hexLEtoBEbuf = new Uint8Array(8);
    const hexLEtoBEdv = new DataView(hexLEtoBEbuf.buffer);

    export enum SortOrd {
      asc = 0,
      desc = 1,
    }

    /**
     * Converts little-endian hexedecimal to there big-endian `BigInt`
     */
    export function hexLEtoBE(hex: string): bigint {
      const le = BigInt(hex.startsWith('0x') ? hex : `0x${hex}`);
      hexLEtoBEdv.setBigUint64(0, le, true);
      const be = hexLEtoBEdv.getBigUint64(0, false);
      return be;
    }

    /**
     * Converts big-endian hexedecimal to there little-endian `BigInt`
     */
    export function hexBEtoLE(hex: string): bigint {
      const be = BigInt(hex.startsWith('0x') ? hex : `0x${hex}`);
      hexLEtoBEdv.setBigUint64(0, be, false);
      const le = hexLEtoBEdv.getBigUint64(0, true);
      return le;
    }

    export function isGreycatNumber(type: string): boolean {
      return GREYCAT_NUMBER_TYPES.includes(type);
    }

    /**
     * Considered scalar:
     *  - `string`
     *  - `number`
     *  - `bigint`
     *  - `boolean`
     *  - `null`
     *  - `undefined`
     *  - `core::geo`
     *  - `core::time`
     *  - `core::duration`
     *  - `core::int`
     *  - `core::float`
     *  - `core::bool`
     *  - `core::String`
     *  - `core::str`
     *  - `core::Date`
     *  - `core::t2`
     *  - `core::t2f`
     *  - `core::t3`
     *  - `core::t3f`
     *  - `core::t4`
     *  - `core::t4f`
     *  - `GCEnum`
     *
     * @param val
     * @returns
     */
    export function isScalar(
      val: unknown,
    ): val is string | number | boolean | bigint | null | undefined {
      const type = typeof val;
      if (type === 'function') {
        return val === null;
      }
      if (type === 'object') {
        if (
          val instanceof GCEnum ||
          val instanceof gc.core.time ||
          val instanceof gc.core.int ||
          val instanceof gc.core.float ||
          val instanceof gc.core.bool ||
          val instanceof gc.core.duration ||
          val instanceof gc.core.Date ||
          val instanceof gc.core.geo
        ) {
          return true;
        }
        return val === null;
      }
      return true;
    }

    export function generateId(length = 5): string {
      let id = '';
      for (let i = 0; i < length; i++) {
        id += CHARS[randomInt(CHARS.length)];
      }
      return id;
    }

    /**
     * @param max maximum value (not included)
     * @returns an integer between `0` and `max` (not included)
     */
    export function randomInt(max: number): number {
      return Math.floor(Math.random() * max);
    }

    export function extractType(value: unknown): string {
      if (value === null || value === undefined) {
        return 'null';
      }

      if (value instanceof GCObject) {
        return value.$type.name;
      }

      if (typeof value === 'object') {
        if ('_type' in value && typeof value._type === 'string') {
          return value._type;
        }
        return `Object { ${Object.keys(value).length} }`;
      }

      if (value instanceof Array) {
        return `Array [ ${value.length} ]`;
      }

      return typeof value;
    }

    /**
     * Returns a human readable size from a number of bytes
     * @param bytes
     * @param fractionDigits — Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
     */
    export function humanSize(bytes: number, fractionDigits = 2): string {
      const magnitude = Math.min((Math.log(bytes) / Math.log(1024)) | 0, HUMAN_SIZE.length - 1);
      const result = bytes / Math.pow(1024, magnitude);
      const suffix = HUMAN_SIZE[magnitude].trim() + 'B';
      return result.toFixed(fractionDigits) + suffix;
    }

    export function extension(uri: string): string | undefined {
      const lastDot = uri.lastIndexOf('.');
      if (lastDot === -1) {
        return;
      }
      return uri.slice(lastDot + 1);
    }

    export function capitalize(txt: string): string {
      if (txt.length > 0) {
        return txt[0].toLocaleUpperCase() + txt.slice(1);
      }
      return txt;
    }

    export function isNode(
      value: unknown,
    ): value is core.node | core.nodeTime | core.nodeList | core.nodeIndex | core.nodeGeo {
      return (
        value instanceof core.node ||
        value instanceof core.nodeTime ||
        value instanceof core.nodeList ||
        value instanceof core.nodeIndex ||
        value instanceof core.nodeGeo
      );
    }

    export function clone<T>(value: T): T {
      switch (typeof value) {
        case 'object': {
          if (value === null) {
            return null as T;
          }
          if (value instanceof GCEnum) {
            return value;
          }
          if (value instanceof GCObject) {
            if (value.$type.is_native) {
              const fields = Object.values(value).map(clone);
              return new value.$type.ctor(...fields) as T;
            }
            if (value.$fields) {
              return new value.$type.ctor(...value.$fields) as T;
            }
            return new value.$type.ctor() as T;
          }
          if (Array.isArray(value)) {
            const res = new Array(value.length);
            for (let i = 0; i < value.length; i++) {
              res[i] = clone(value[i]);
            }
            return res as T;
          }
          if (value instanceof Map) {
            const res = new Map();
            value.forEach((value, key) => {
              res.set(clone(key), clone(value));
            });
            return res as T;
          }
          const res = {};
          for (const [key, val] of Object.entries(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (res as any)[clone(key)] = clone(val);
          }
          return res as T;
        }
        default:
          // all the primitives are copied anyways
          return value;
      }
    }
  }
}
