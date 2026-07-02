import { GCObject, GCEnum } from '../../GCObject.js';
import type { Value } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Map<K extends Value = any, V extends Value = any> extends GCObject {
  static readonly _type = 'core::Map' as const;

  constructor(readonly map: globalThis.Map<K, V> = new globalThis.Map()) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<K extends Value = any, V extends Value = any>(
    map: globalThis.Map<K, V>,
    g: GreyCat = $.default,
  ): gc.core.Map<K, V> {
    const ty = g.abi.types[g.abi.core.map];
    return new ty.ctor(map) as gc.core.Map<K, V>;
  }

  get size(): number {
    return this.map.size;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  set(key: K, value: V): this {
    this.map.set(key, value);
    return this;
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  forEach(
    callback: (value: V, key: K, map: globalThis.Map<K, V>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ): void {
    this.map.forEach(callback, thisArg);
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.map.size);
    w.write_map(this.map);
  }

  static override load<K extends Value = unknown, V extends Value = unknown>(
    r: AbiReader,
    ty: AbiType,
  ): globalThis.Map<K, V> {
    const len = r.read_vu32();
    const map = new globalThis.Map<K, V>();
    Object.defineProperty(map, '$type', { value: ty, enumerable: false });

    for (let i = 0; i < len; i++) {
      const key = r.deserialize() as K;
      const value = r.deserialize() as V;
      map.set(key, value);
    }

    return map;
  }

  override toJSON() {
    const json: Record<string, Value> = {};

    this.map.forEach((value, key) => {
      if (key === null) {
        json['null'] = value;
      } else if (key === undefined) {
        json['undefined'] = value;
      } else if (key instanceof GCEnum) {
        json[`${key.$type.name}::${key.key}`] = value;
      } else {
        json[`${key}`] = value;
      }
    });

    return json;
  }

  override valueOf() {
    return this.map;
  }
}
