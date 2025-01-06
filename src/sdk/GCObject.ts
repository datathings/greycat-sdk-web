import type { AbiType, AbiWriter, Abi, Value } from './exports.js';
import { GCEnum, PrimitiveType } from './exports.js';

export interface GCObject {
  readonly $type: AbiType;
  readonly $attrs?: Value[];
  // because we don't know what could be inside
  // we need to allow any key to be potentially a value
  [key: string]: Value;
}

/**
 * A dynamic GreyCat type instance, used when no matching class found in the factory
 */
export class GCObject {
  readonly $attrs?: Value[];

  constructor(readonly $type: AbiType, ...fields: Value[]) {
    // TODO rename $attrs to $fields
    Object.defineProperty(this, '$attrs', { value: fields, enumerable: false });
    Object.defineProperties(this, $type.properties);
  }

  static from(value: unknown, abi: Abi): GCObject {
    if (typeof value !== 'object' || value === null || value === undefined) {
      throw new Error(`GCObject.from(o) must be called with an object`);
    }
    if ('_type' in value && typeof value._type === 'string') {
      const abi_type = abi.type_by_fqn.get(value._type);
      if (abi_type) {
        if (abi_type.is_enum) {
          if (!('field' in value && typeof value.field === 'string')) {
            throw new Error(
              `unable to find 'field' property on instance of enum '${abi_type.name}'`,
            );
          }
          return new GCEnum(
            abi_type,
            abi_type.attrs.findIndex((a) => a.name === value.field),
            value.field,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (value as any).value,
          );
        }

        const fields = new Array(abi_type.attrs.length);
        for (let i = 0; i < abi_type.attrs.length; i++) {
          const attr = abi_type.attrs[i];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields[i] = (value as any)[attr.name];
        }
        return new abi_type.factory(abi_type, fields);
      }
    }

    // TODO try to infer type based on duck-typing
    throw new Error(`Unable to infer type from given object`);
  }

  saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.object);
    w.write_vu32(this.$type.offset);
  }

  saveContent(w: AbiWriter): void {
    if (this.$type.nullable_nb_bytes > 0) {
      // nullable bitset
      const nullable_bitset = new Uint8Array(this.$type.nullable_nb_bytes);
      let nullable_offset = 0;
      let att;
      for (let offset = 0; offset < this.$type.attrs.length; offset++) {
        att = this.$type.attrs[offset];
        if (att.nullable) {
          let nullish = true;
          if (this.$attrs) {
            nullish = this.$attrs[offset] === null || this.$attrs[offset] === undefined;
          }
          if (nullish) {
            gc_object__set_null(nullable_bitset, nullable_offset);
          } else {
            gc_object__set_not_null(nullable_bitset, nullable_offset);
          }
          nullable_offset++;
        }
      }
      w.write_all(nullable_bitset);
    }

    // write object values
    if (this.$attrs) {
      for (let i = 0; i < this.$attrs.length; i++) {
        const att = this.$type.attrs[i];
        const value = this.$attrs[i];
        if (att.nullable && (value === null || value === undefined)) {
          // skip nullable field that is actually 'null'
          continue;
        }

        switch (att.sbi_type) {
          case PrimitiveType.bool: {
            w.write_bool(value as boolean);
            break;
          }
          case PrimitiveType.char: {
            w.write_i8((value as string).charCodeAt(0));
            break;
          }
          case PrimitiveType.int: {
            w.write_vi64(typeof value === 'bigint' ? value : BigInt(value as number));
            break;
          }
          case PrimitiveType.float: {
            w.write_pf64(value as number, att.precision);
            break;
          }
          case PrimitiveType.object: {
            if (this.$type.abi.types[att.abi_type].is_ambiguous) {
              w.write_vu32(att.abi_type);
            }
            if (Array.isArray(value)) {
              w.write_vu32(value.length);
              w.write_array(value);
            } else if (value instanceof Map) {
              w.write_vu32(value.size);
              w.write_map(value);
            } else if (typeof value === 'string') {
              w.raw_string(value);
            } else {
              const object = value as GCObject;
              if (w.abi.types[att.abi_type].is_abstract) {
                w.write_vu32(object.$type.offset);
              }
              object.saveContent(w);
            }
            break;
          }
          case PrimitiveType.undefined: {
            // when the type is undefined, we need the header to be written
            w.serialize(value);
            break;
          }
          case PrimitiveType.null: {
            // noop
            break;
          }
          default: {
            (value as GCObject).saveContent(w);
            break;
          }
        }
      }
    }
  }

  save(w: AbiWriter): void {
    this.saveHeader(w);
    this.saveContent(w);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): any {
    if (!this.$attrs) {
      return { _type: this.$type.name };
    }

    const json: Record<string, Value> = { _type: this.$type.name };
    for (let i = 0; i < this.$attrs.length; i++) {
      json[this.$type.attrs[i].name] = this.$attrs[i];
    }
    return json;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export function serialize_object(
  w: AbiWriter,
  type: AbiType,
  object: object,
  with_headers: boolean,
): void {
  if (with_headers) {
    w.write_u8(PrimitiveType.object);
    w.write_vu32(type.offset);
  }
  if (type.nullable_nb_bytes > 0) {
    // nullable bitset
    const nullable_bitset = new Uint8Array(type.nullable_nb_bytes);
    let nullable_offset = 0;
    let att;
    for (let offset = 0; offset < type.attrs.length; offset++) {
      att = type.attrs[offset];
      if (att.nullable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((object as any)[att.name] === null || (object as any)[att.name] === undefined) {
          gc_object__set_null(nullable_bitset, nullable_offset);
        } else {
          gc_object__set_not_null(nullable_bitset, nullable_offset);
        }
        nullable_offset++;
      }
    }
    w.write_all(nullable_bitset);
  }

  for (let i = 0; i < type.attrs.length; i++) {
    const att = type.attrs[i];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (object as any)[att.name];
    if (att.nullable && (value === null || value === undefined)) {
      // skip nullable field that is actually 'null'
      continue;
    }

    switch (att.sbi_type) {
      case PrimitiveType.bool:
        w.write_bool(value as boolean);
        break;
      case PrimitiveType.char:
        w.write_i8((value as string).charCodeAt(0));
        break;
      case PrimitiveType.int:
        w.write_vi64(typeof value === 'bigint' ? value : BigInt(value as number));
        break;
      case PrimitiveType.float:
        w.write_pf64(value as number, att.precision);
        break;
      case PrimitiveType.object:
        if (Array.isArray(value)) {
          w.write_vu32(value.length);
          for (let i = 0; i < value.length; i++) {
            w.serialize(value[i]);
          }
        } else if (value instanceof Map) {
          w.write_vu32(value.size);
          value.forEach((value, key) => {
            w.serialize(key);
            w.serialize(value);
          });
        } else if (typeof value === 'string') {
          w.raw_string(value);
        } else {
          const object = value as GCObject;
          if (w.abi.types[att.abi_type].is_abstract) {
            w.write_vu32(object.$type.offset);
          }
          object.saveContent(w);
        }
        break;
      case PrimitiveType.undefined:
        // when the type is undefined, we need the header to be written
        w.serialize(value);
        break;

      case PrimitiveType.null:
        // noop
        break;

      default:
        (value as GCObject).saveContent(w);
        break;
    }
  }
}

// The following:
//  - gc_object_bitset_block_size
//  - gc_object__set_not_null
//  - gc_object__set_null
//  - gc_object__is_not_null
// are translated from the C defined macros at in greycat/core machine.h
function gc_object__set_not_null(bitset: Uint8Array, offset: number): void {
  // Find the index of the Uint8Array element containing the bit we want to set to 1
  const bitsetIndex: number = offset >> 3; // Equivalent to integer division by 8

  // Find the position of the bit within the Uint8Array element
  const bitPosition: number = offset & 7; // Equivalent to offset % 8

  // Set the bit at the specified position to 1 using bitwise OR with 1 at that position
  bitset[bitsetIndex] |= 1 << bitPosition;
}

function gc_object__set_null(bitset: Uint8Array, offset: number): void {
  // Find the index of the Uint8Array element containing the bit we want to set to 0
  const bitsetIndex: number = offset >> 3; // Equivalent to integer division by 8

  // Find the position of the bit within the Uint8Array element
  const bitPosition: number = offset & 7; // Equivalent to offset % 8

  // Clear the bit at the specified position to 0 using bitwise AND with the complement of 1 at that position
  bitset[bitsetIndex] &= ~(1 << bitPosition);
}
