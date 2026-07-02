import type { Abi, AbiType } from './abi.js';
import type { AbiReader, AbiWriter } from './io.js';
import { PrimitiveType, type Value } from './types.js';
import type { GreyCat } from './greycat.js';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface GCObject {
  readonly $type: AbiType;
  readonly $fields?: Value[];
  // because we don't know what could be inside
  // we need to allow any key to be potentially a value
  // [key: string]: Value;
}

export interface ToStringOptions {
  /** When a display needs GreyCat this will be used, if undefined `gc.$.default` is used */
  g?: GreyCat;
  /** The TimeZone to display time value in */
  tz?: gc.core.TimeZone;
  /** The format used to display time, defaults to `'%Y-%m-%dT%H:%M:%S%.3f%z'` */
  timeFmt?: string;
  /** The format used to display number */
  numFmt?: Intl.NumberFormat;
  /** Whether or not to display the enum key only, default to `false` which results in `'enum_name::enum_key'` */
  enumKeyOnly?: boolean;
  /** Used between every parts of a duration, defaults to `' '` */
  durationSep?: string;
}

export const DEFAULT_TO_STRING_OPTIONS: ToStringOptions = {
  enumKeyOnly: false,
  durationSep: ' ',
};

/**
 * A dynamic GreyCat type instance, used when no matching class found in the factory
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class GCObject {
  // SAFETY: This is dynamically set when the Abi is loaded
  readonly $type!: AbiType;
  readonly $fields?: Value[];

  static from(value: unknown, abi: Abi): GCObject {
    if (typeof value !== 'object' || value === null || value === undefined) {
      throw new Error(`GCObject.from(o) must be called with an object`);
    }
    if ('_type' in value && typeof value._type === 'string') {
      const abi_type = abi.type_by_fqn.get(value._type);
      if (abi_type) {
        if (abi_type.is_enum) {
          if (!('field' in value && typeof value.field === 'string')) {
            throw new Error(`unable to find 'field' property on instance of enum '${abi_type.name}'`);
          }
          return abi_type.static_values![value.field];
        }

        // oxlint-disable-next-line no-new-array
        const fields = new Array(abi_type.attrs.length);
        for (let i = 0; i < abi_type.attrs.length; i++) {
          const attr = abi_type.attrs[i];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields[i] = (value as any)[attr.name];
        }
        return new abi_type.ctor(...fields);
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
          if (this.$fields) {
            nullish = this.$fields[offset] === null || this.$fields[offset] === undefined;
          }
          if (nullish) {
            GCObject.set_null(nullable_bitset, nullable_offset);
          } else {
            GCObject.set_not_null(nullable_bitset, nullable_offset);
          }
          nullable_offset++;
        }
      }
      w.write_all(nullable_bitset);
    }

    // write object values
    if (this.$fields) {
      for (let i = 0; i < this.$fields.length; i++) {
        const att = this.$type.attrs[i];
        const value = this.$fields[i];
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
            const att_ty = this.$type.abi.types[att.abi_type];
            if (Array.isArray(value)) {
              if (att_ty.is_ambiguous) {
                w.write_vu32(att.abi_type);
              }
              w.write_vu32(value.length);
              w.write_array(value);
            } else if (value instanceof Map) {
              if (att_ty.is_ambiguous) {
                w.write_vu32(att.abi_type);
              }
              w.write_vu32(value.size);
              w.write_map(value);
            } else if (typeof value === 'string') {
              w.raw_string(value);
            } else if (value instanceof GCObject) {
              if (att_ty.is_ambiguous) {
                w.write_vu32(value.$type.offset);
              }
              value.saveContent(w);
            } else {
              throw new Error(
                `unable to serialize object, expecting a GCObject for '${att.name}: ${w.abi.types[att.abi_type].name}', got ${typeof value}`,
              );
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
    if (!this.$fields) {
      return { _type: this.$type.name };
    }

    const json: Record<string, Value> = { _type: this.$type.name };
    for (let i = 0; i < this.$fields.length; i++) {
      json[this.$type.attrs[i].name] = this.$fields[i];
    }
    return json;
  }

  toString(_opts?: ToStringOptions): string {
    return JSON.stringify(this);
  }

  // The following:
  //  - gc_object_bitset_block_size
  //  - gc_object__set_not_null
  //  - gc_object__set_null
  //  - gc_object__is_not_null
  // are translated from the C defined macros at in greycat/core machine.h
  static set_not_null(bitset: Uint8Array, offset: number): void {
    // Find the index of the Uint8Array element containing the bit we want to set to 1
    const bitsetIndex: number = offset >> 3; // Equivalent to integer division by 8

    // Find the position of the bit within the Uint8Array element
    const bitPosition: number = offset & 7; // Equivalent to offset % 8

    // Set the bit at the specified position to 1 using bitwise OR with 1 at that position
    bitset[bitsetIndex] |= 1 << bitPosition;
  }

  static set_null(bitset: Uint8Array, offset: number): void {
    // Find the index of the Uint8Array element containing the bit we want to set to 0
    const bitsetIndex: number = offset >> 3; // Equivalent to integer division by 8

    // Find the position of the bit within the Uint8Array element
    const bitPosition: number = offset & 7; // Equivalent to offset % 8

    // Clear the bit at the specified position to 0 using bitwise AND with the complement of 1 at that position
    bitset[bitsetIndex] &= ~(1 << bitPosition);
  }

  static is_not_null(bitset: Uint8Array, offset: number): boolean {
    // Find the index of the Uint8Array element containing the bit we want to check
    const bitsetIndex: number = offset >> 3; // Equivalent to integer division by 8

    // Find the position of the bit within the Uint8Array element
    const bitPosition: number = offset & 7; // Equivalent to offset % 8

    // Check if the bit is set (equal to 1)
    const isBitSet: boolean = (bitset[bitsetIndex] >> bitPosition) & 1 ? true : false;

    return isBitSet;
  }

  static load(r: AbiReader, type: AbiType): unknown {
    const programType = type.abi.types[type.mapped_type_off];
    // oxlint-disable-next-line no-new-array
    const fields = new Array(programType.attrs.length);
    // initialize every elements to null
    for (let i = 0; i < fields.length; i++) {
      fields[i] = null;
    }
    const previous_nullable = r.take(type.nullable_nb_bytes);
    let nullable_offset = -1;
    for (let attOffset = 0; attOffset < type.attrs.length; attOffset++) {
      const att = type.attrs[attOffset];
      let value: Value;
      if (att.nullable) {
        nullable_offset++;
        if (!GCObject.is_not_null(previous_nullable, nullable_offset)) {
          continue;
        }
      }
      let loadType = att.sbi_type;
      if (loadType === PrimitiveType.undefined) {
        loadType = r.read_u8() as PrimitiveType;
      }

      const attType = r.abi.types[att.abi_type];
      switch (loadType) {
        case PrimitiveType.enum: {
          if (att.sbi_type === PrimitiveType.undefined) {
            // full read
            const enum_id = r.read_vu32();
            const enum_type = r.abi.types[enum_id];
            value = GCEnum.load(r, enum_type);
          } else {
            value = GCEnum.load(r, r.abi.types[attType.mapped_type_off]);
          }
          break;
        }
        case PrimitiveType.object: {
          let attObjectType = attType;
          if (attType.is_ambiguous || att.sbi_type === PrimitiveType.undefined) {
            attObjectType = r.abi.types[r.read_vu32()];
          }
          value = attObjectType.ctor.load(r, attObjectType);
          break;
        }
        case PrimitiveType.float: {
          value = r.read_pf64(att.precision);
          break;
        }
        default: {
          value = r.deserializers[loadType](r);
          break;
        }
      }
      if (att.mapped) {
        fields[att.mapped_att_offset] = value;
      }
    }
    return new programType.ctor(...fields);
  }
}

/** A marker class to distinguish between primitives and objects */
export abstract class GCPrimitive extends GCObject {}

export class GCEnum extends GCObject {
  constructor(
    /** offset of the field */
    public offset: number,
    /** name of the field */
    public key: string,
  ) {
    super();
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.enum);
    w.write_vu32(this.$type.offset);
  }

  override saveContent(w: AbiWriter): void {
    w.write_vu32(this.offset);
  }

  static override load(r: AbiReader, type: AbiType) {
    const programType = type.abi.types[type.mapped_type_off];
    const valueOffset = r.read_vu32();
    const abiTypeAtt = type.attrs[valueOffset];
    // this is an enum, so we know `static_values` is gonna be initialized
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return programType.static_values![abiTypeAtt.name];
  }

  override toString(opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS): string {
    if (opts.enumKeyOnly) {
      return this.key;
    }
    return `${this.$type.name}::${this.key}`;
  }

  override toJSON() {
    return `${this.key}`;
  }
}
