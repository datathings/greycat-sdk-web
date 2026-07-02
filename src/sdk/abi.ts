import { Reader, AbiWriter, type AbiReader } from './io.js';
import { PrimitiveType, type IGCObjectClass, type Value } from './types.js';
import { GCObject as GCObjectBase, GCEnum as GCEnumBase } from './GCObject.js';
import * as std_n_core from './std_n/core/index.js';
import { gcreg } from './registry.js';
import { __extend_std } from './std.ext.js';
class AbiCoreBuilder {
  public any = 0;
  public null_ = 0;
  public int = 0;
  public bool = 0;
  public string = 0;
  public duration = 0;
  public time = 0;
  public geo = 0;
  public node_list = 0;
  public node_index = 0;
  public node_time = 0;
  public node = 0;
  public node_geo = 0;
  public array = 0;
  public map = 0;
  public cubic = 0;
  public fn = 0;
  public type = 0;
  public timezone = 0;
  public date = 0;
  public table = 0;
  public tensortype = 0;
  public float = 0;
  public char = 0;
  public field = 0;

  toAbiCore(): AbiCore {
    return new AbiCore(
      this.any,
      this.null_,
      this.int,
      this.bool,
      this.string,
      this.duration,
      this.time,
      this.geo,
      this.node_list,
      this.node_index,
      this.node_time,
      this.node,
      this.node_geo,
      this.array,
      this.map,
      this.cubic,
      this.fn,
      this.type,
      this.timezone,
      this.date,
      this.table,
      this.tensortype,
      this.float,
      this.char,
      this.field,
    );
  }
}

export class AbiCore {
  constructor(
    readonly any: number,
    readonly null_: number,
    readonly int: number,
    readonly bool: number,
    readonly string: number,
    readonly duration: number,
    readonly time: number,
    readonly geo: number,
    readonly node_list: number,
    readonly node_index: number,
    readonly node_time: number,
    readonly node: number,
    readonly node_geo: number,
    readonly array: number,
    readonly map: number,
    readonly cubic: number,
    readonly fn: number,
    readonly type: number,
    readonly timezone: number,
    readonly date: number,
    readonly table: number,
    readonly tensortype: number,
    readonly float: number,
    readonly char: number,
    readonly field: number,
  ) {}
}

export class Abi {
  static readonly protocol_version = 3;

  readonly magic: number;
  readonly version: number;
  readonly crc: bigint;

  /** Maps all the ABI symbols to their respective offset in `this.symbols` */
  readonly symbol_ids: Map<string, number>;
  /** fqn `<module>::<name>` only */
  readonly type_by_fqn: Map<string, AbiType>;
  /** fqn `<module>::<name>` only */
  readonly fn_by_fqn: Map<string, AbiFunction>;
  /** Known core type ids (after abi link) */
  readonly core: AbiCore;

  readonly symbols: string[] = [];
  readonly types: AbiType[] = [];
  readonly functions: AbiFunction[] = [];

  constructor(buffer: ArrayBuffer) {
    this.symbol_ids = new Map();
    this.type_by_fqn = new Map();
    this.fn_by_fqn = new Map();
    const core = new AbiCoreBuilder();

    const cursor = new Reader(buffer);

    const major = cursor.read_u16();

    if (major !== Abi.protocol_version) {
      throw new Error(`ABI protocol version mismatch (expected=${Abi.protocol_version}, actual=${major})`);
    }

    this.magic = cursor.read_u16();
    this.version = cursor.read_u32();
    this.crc = cursor.read_u64();

    /* const symbols_size = */ cursor.read_u64();
    const nb_symbols = cursor.read_u32();
    // oxlint-disable-next-line no-new-array
    this.symbols = new Array(nb_symbols + 1);
    this.symbols[0] = ''; // symbol zero is a special symbol for "not found"

    for (let i = 1; i < this.symbols.length; i++) {
      const len = cursor.read_vu32();
      const symbol = cursor.read_string(len);
      this.symbols[i] = symbol;
      this.symbol_ids.set(symbol, i);
    }

    /* const types_size = */ cursor.read_u64(); // unused
    const nb_types = cursor.read_u32();
    /* const nb_attrs = */ cursor.read_u32(); // unused

    // oxlint-disable-next-line no-new-array
    this.types = new Array(nb_types);

    for (let i = 0; i < this.types.length; i++) {
      const module = cursor.read_vu32();
      const name = cursor.read_vu32();
      const lib = cursor.read_vu32();
      const generic_abi_type = cursor.read_vu32();
      const g1_abi_type_desc = cursor.read_vu32();
      const g2_abi_type_desc = cursor.read_vu32();
      const super_type = cursor.read_vu32();
      /* const companion_type_id = */ cursor.read_vu32(); // unused

      const attributes_len = cursor.read_vu32();
      /* const attributes_offset =  */ cursor.read_vu32(); // unused
      /* const mapped_prog_type_offset =  */ cursor.read_vu32(); // unused
      const mapped_abi_type_offset = cursor.read_vu32();
      const masked_abi_type_offset = cursor.read_vu32();
      const nullable_nb_bytes = cursor.read_vu32();
      const flags = cursor.read_u8();
      const is_native = (flags & 1) !== 0;
      const is_abstract = (flags & (1 << 1)) !== 0;
      const is_enum = (flags & (1 << 2)) !== 0;
      const is_masked = (flags & (1 << 3)) !== 0;
      const is_ambiguous = (flags & (1 << 4)) !== 0;
      const is_volatile = (flags & (1 << 5)) !== 0;

      // oxlint-disable-next-line no-new-array
      const attrs: AbiAttribute[] = new Array(attributes_len);
      for (let i = 0; i < attributes_len; i++) {
        const name = cursor.read_vu32();
        const abi_type = cursor.read_vu32();
        const prog_type_offset = cursor.read_vu32();
        const mapped_any_offset = cursor.read_vu32();
        const mapped_att_offset = cursor.read_vu32();
        const sbi_type = cursor.read_u8();
        const precision = cursor.read_u8() as AbiPrecision;
        const flags = cursor.read_u8();
        const nullable = (flags & 1) !== 0;
        const mapped = (flags & (1 << 1)) !== 0;

        attrs[i] = new AbiAttribute(
          this.symbols[name],
          abi_type,
          prog_type_offset,
          mapped_any_offset,
          mapped_att_offset,
          sbi_type as PrimitiveType,
          nullable,
          mapped,
          precision,
        );
      }

      const lib_name = this.symbols[lib];
      const module_name = this.symbols[module];
      const type_name = this.symbols[name];

      const key = `${module_name}::${type_name}`;
      const type = new AbiType(
        i,
        lib,
        module,
        name,
        generic_abi_type,
        g1_abi_type_desc,
        g2_abi_type_desc,
        super_type,
        mapped_abi_type_offset,
        masked_abi_type_offset,
        nullable_nb_bytes,
        is_native,
        is_abstract,
        is_enum,
        is_masked,
        is_ambiguous,
        is_volatile,
        attrs,
        lib_name === 'std' && module_name === 'core',
        this,
      );
      if (type.mapped_type_off == i) {
        this.type_by_fqn.set(key, type);
      }
      this.types[i] = type;
      if (lib_name === 'std' && module_name === 'core') {
        switch (type_name) {
          case 'any':
            core.any = i;
            break;
          case 'null':
            core.null_ = i;
            break;
          case 'bool':
            core.bool = i;
            break;
          case 'String':
            core.string = i;
            break;
          case 'Array':
            core.array = i;
            break;
          case 'Map':
            core.map = i;
            break;
          case 'geo':
            core.geo = i;
            break;
          case 'duration':
            core.duration = i;
            break;
          case 'time':
            core.time = i;
            break;
          case 'node':
            core.node = i;
            break;
          case 'nodeTime':
            core.node_time = i;
            break;
          case 'nodeList':
            core.node_list = i;
            break;
          case 'nodeGeo':
            core.node_geo = i;
            break;
          case 'nodeIndex':
            core.node_index = i;
            break;
          case 'cubic':
            core.cubic = i;
            break;
          case 'function':
            core.fn = i;
            break;
          case 'type':
            core.type = i;
            break;
          case 'TimeZone':
            core.timezone = i;
            break;
          case 'Date':
            core.date = i;
            break;
          case 'Table':
            core.table = i;
            break;
          case 'TensorType':
            core.tensortype = i;
            break;
          case 'float':
            core.float = i;
            break;
          case 'int':
            core.int = i;
            break;
          case 'char':
            core.char = i;
            break;
          case 'field':
            core.field = i;
            break;
          default:
            // noop
            break;
        }
      }
    }
    __extend_std();

    this.core = core.toAbiCore();

    /* const functions_size = */ cursor.read_u64();
    const functions_len = cursor.read_u32();
    // oxlint-disable-next-line no-new-array
    this.functions = new Array(functions_len);
    for (let i = 0; i < functions_len; i++) {
      const module = cursor.read_vu32();
      const type = cursor.read_vu32();
      const name = cursor.read_vu32();
      const lib = cursor.read_vu32();
      const arity = cursor.read_vu32();
      // oxlint-disable-next-line no-new-array
      const attrs = new Array(arity);
      // oxlint-disable-next-line no-new-array
      const params = new Array(arity);
      for (let p = 0; p < arity; p++) {
        const nullable = cursor.read_u8() === 1;
        const param_type = cursor.read_vu32();
        const param_symbol = cursor.read_vu32();
        params[p] = new AbiParam(this.symbols[param_symbol], this.types[param_type], nullable);
        attrs[p] = new AbiAttribute(
          this.symbols[param_symbol],
          param_type,
          0,
          0,
          0,
          PrimitiveType.null,
          nullable,
          true,
          AbiPrecision.p_0,
        );
      }
      const return_type = cursor.read_vu32();
      const flags = cursor.read_u8();
      const return_nullable = (flags & 1) !== 0;

      const lib_name = this.symbols[lib];
      const module_name = this.symbols[module];
      const type_name = this.symbols[type];
      const fn_name = this.symbols[name];

      const fqn = type === 0 ? `${module_name}::${fn_name}` : `${module_name}::${type_name}::${fn_name}`;

      let args_type_name: string;
      if (type === 0) {
        args_type_name = `${module_name}::${fn_name}$args`;
      } else {
        args_type_name = `${module_name}::${type_name}$${fn_name}$args`;
      }

      this.functions[i] = new AbiFunction(
        this,
        lib === 0 ? 'project' : lib_name,
        module_name,
        type === 0 ? undefined : type_name,
        fn_name,
        module,
        type,
        name,
        fqn,
        params,
        this.types[return_type],
        return_nullable,
        this.type_by_fqn.get(args_type_name)!,
      );
      this.fn_by_fqn.set(fqn, this.functions[i]);
    }

    const create_monomorphic_class = (type: AbiType, supertype: IGCObjectClass): IGCObjectClass => {
      const GCObject = class extends (supertype as any) {
        static _type = type.name;
        constructor(values: any[]) {
          super(values);
          Object.defineProperty(this, '$type', {
            value: type,
            enumerable: false,
            writable: true, // we need to be able to update $type for generics
          });
          this.$init?.();
        }
      };
      return GCObject as IGCObjectClass;
    };

    // link monomorphized types to there known native generic type
    for (let i = 0; i < nb_types; i++) {
      const type = this.types[i];
      if (type.generic_abi_type === 0) {
        continue;
      }
      switch (type.generic_abi_type) {
        case this.core.array: {
          type.ctor = create_monomorphic_class(type, gcreg.core.Array);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.table: {
          type.ctor = create_monomorphic_class(type, gcreg.core.Table);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.map: {
          type.ctor = create_monomorphic_class(type, gcreg.core.Map);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.node: {
          type.ctor = create_monomorphic_class(type, gcreg.core.node);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.node_time: {
          type.ctor = create_monomorphic_class(type, gcreg.core.nodeTime);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.node_list: {
          type.ctor = create_monomorphic_class(type, gcreg.core.nodeList);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.node_index: {
          type.ctor = create_monomorphic_class(type, gcreg.core.nodeIndex);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        case this.core.node_geo: {
          type.ctor = create_monomorphic_class(type, gcreg.core.nodeGeo);
          (gcreg as any)[this.symbols[type.module]][this.symbols[type.symbol]] = type.ctor;
          break;
        }
        default:
          // use the generic constructor for non-native monomorphic types
          // type.ctor = this.types[type.generic_abi_type].ctor;
          break;
      }
    }

    for (let i = 0; i < this.types.length; i++) {
      Object.freeze(this.types[i]);
    }
  }

  /**
   *
   * @param typeFqn eg. 'core::String'
   * @param fields optional array of values that will be used as fields (order is important and must match the abi type definition)
   * @returns
   */
  create<T = GCObjectBase>(typeFqn: string, fields?: Value[]): T {
    const type = this.type_by_fqn.get(typeFqn);
    if (type === undefined) {
      throw new Error(`unknown type '${typeFqn}'`);
    }
    return this.createValue<T>(type, fields);
  }

  createValue<T = GCObjectBase>(type: AbiType, fields?: Value[]): T {
    if (fields) {
      return new type.ctor(...fields) as T;
    }
    return new type.ctor() as T;
  }

  createFunctionByFqn(fqn: string) {
    const split = fqn.split('::');
    if (split.length === 2) {
      return this.createFunction(split[0], undefined, split[1]);
    } else if (split.length === 3) {
      return this.createFunction(split[0], split[1], split[2]);
    }
    throw new Error(`invalid function fqn '${fqn}' (expecting '<module>::<name>' or '<module>::<type>::<name>')`);
  }

  createFunction(mod: string, type: string | undefined, name: string) {
    const modOff = this.symbol_ids.get(mod) ?? 0;
    const typeOff = type ? this.symbol_ids.get(type) : 0;
    const nameOff = this.symbol_ids.get(name) ?? 0;
    const t = this.types[this.core.fn];
    return new t.ctor(modOff, typeOff, nameOff) as gc.core.function_;
  }

  createNode(value: bigint) {
    const t = this.types[this.core.node];
    return new t.ctor(value) as gc.core.node;
  }

  createNodeList(value: bigint) {
    const t = this.types[this.core.node_list];
    return new t.ctor(value) as gc.core.nodeList;
  }

  createNodeIndex(value: bigint) {
    const t = this.types[this.core.node_index];
    return new t.ctor(value) as gc.core.nodeIndex;
  }

  createNodeGeo(value: bigint) {
    const t = this.types[this.core.node_geo];
    return new t.ctor(value) as gc.core.nodeGeo;
  }

  createNodeTime(value: bigint) {
    const t = this.types[this.core.node_time];
    return new t.ctor(value) as gc.core.nodeTime;
  }

  createGeo(lat: number, lng: number) {
    const value = std_n_core.geoEncode(lat, lng);
    const t = this.types[this.core.geo];
    return new t.ctor(value) as gc.core.geo;
  }

  createTime(value: bigint) {
    const t = this.types[this.core.time];
    return new t.ctor(value) as gc.core.time;
  }

  createDuration(value: bigint) {
    const t = this.types[this.core.duration];
    return new t.ctor(value) as gc.core.duration;
  }

  root(): AbiType {
    const root = this.type_by_fqn.get('project::Root');
    if (!root) {
      throw new Error(`Abi type 'project::Root' should be defined`);
    }
    return root;
  }
}

type AbiTypeProperties = {
  [name: PropertyKey]: PropertyDescriptor & ThisType<GCObjectBase>;
};

export class AbiType {
  /** can either be `GCEnum` in case of enum or the static fields `Value` in case of `GCObject` */
  static_values?: Record<string, any> = {};
  /** the enum instances of that type (singleton) */
  readonly enum_values?: GCEnumBase[];
  ctor: IGCObjectClass;

  constructor(
    /**
     * Offset of this type in `Abi.types[]`
     */
    readonly offset: number,
    readonly lib: number,
    readonly module: number,
    readonly symbol: number,
    readonly generic_abi_type: number,
    readonly g1_abi_type_desc: number,
    readonly g2_abi_type_desc: number,
    readonly super_type: number,
    readonly mapped_type_off: number,
    readonly masked_type_off: number,
    readonly nullable_nb_bytes: number,
    readonly is_native: boolean,
    readonly is_abstract: boolean,
    readonly is_enum: boolean,
    readonly is_masked: boolean,
    readonly is_ambiguous: boolean,
    readonly is_volatile: boolean,
    readonly attrs: AbiAttribute[],
    /**
     * Whether or not this type is from `std::core`
     */
    readonly is_core: boolean,
    readonly abi: Abi,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const type = this;
    const module_name = abi.symbols[module];
    let type_name = abi.symbols[symbol];
    if (is_enum) {
      const GCEnum = class extends GCEnumBase {
        static readonly _type = type.name;
        constructor(offset = 0, key = '') {
          super(offset, key);
          Object.defineProperty(this, '$type', {
            value: type,
            enumerable: false,
            // we don't need writability for enums
          });
        }
      };
      this.ctor = GCEnum;
      this.static_values = {};
      if (offset === mapped_type_off) {
        // initialize all enum fields
        // oxlint-disable-next-line no-new-array
        this.enum_values = new Array(attrs.length);
        for (let offset = 0; offset < attrs.length; offset++) {
          const en_field_name = attrs[offset].name;
          const en = new this.ctor(offset, en_field_name) as GCEnumBase;
          this.static_values[en_field_name] = en;
          this.enum_values[offset] = en;
          Object.defineProperty(this.ctor, en_field_name, {
            value: en,
            enumerable: true,
          });
          // (this.ctor as any)[en_field_name] = en;
        }
        Object.defineProperty(this.ctor, '$fields', {
          value: this.enum_values,
          enumerable: true,
        });
      }
    } else if (is_native) {
      if (module_name === 'core') {
        switch (type_name) {
          case 'function': {
            type_name = 'function_';
            const GCObject = class extends std_n_core.function_ {
              constructor(mod_off = 0, ty_off = 0, name_off = 0) {
                super(mod_off, ty_off, name_off);
                Object.defineProperty(this, '$type', {
                  value: type,
                  enumerable: false,
                });
              }
            };
            this.ctor = GCObject;
            break;
          }
          case 'null': {
            type_name = 'null_';
            const GCObject = class extends std_n_core.null_ {
              constructor() {
                super();
                Object.defineProperty(this, '$type', {
                  value: type,
                  enumerable: false,
                });
              }
            };
            this.ctor = GCObject;
            break;
          }
          case 'any': {
            const GCObject = class extends GCObjectBase {
              static readonly _type = type.name;
              constructor() {
                super();
                Object.defineProperty(this, '$type', {
                  value: type,
                  enumerable: false,
                });
              }
            };
            this.ctor = GCObject;
            break;
          }
          default: {
            if ((std_n_core as any)[type_name]) {
              const GCObject = class extends (std_n_core as any)[type_name] {
                static readonly _type = type.name;
                constructor(...args: any[]) {
                  super(...args);
                  Object.defineProperty(this, '$type', {
                    value: type,
                    enumerable: false,
                    writable: g1_abi_type_desc !== 0, // we need to be able to update $type for generics
                  });
                  this.$init?.();
                }
              } as IGCObjectClass;
              this.ctor = GCObject;
            } else {
              // console.warn(`unable to find native class for: ${type.name}`);
              const GCObject = class extends GCObjectBase {
                static readonly _type = type.name;
                constructor() {
                  super();
                  throw new Error(`native type '${module_name}::${type_name}' has no implementation`);
                }

                static override load(_: AbiReader, type: AbiType) {
                  throw new Error(`unable to load native type '${type.name}', no native class defined`);
                }
              };
              this.ctor = GCObject;
            }
            break;
          }
        }
      } else {
        throw new Error(
          `native type '${abi.symbols[lib]}::${module_name}::${type_name}' cannot be declared outside of 'std::core'`,
        );
      }
    } else {
      const properties: AbiTypeProperties = {};
      const offsets: Record<string, number> = {};

      for (let i = 0; i < this.attrs.length; i++) {
        const attr = this.attrs[i];
        properties[attr.name] = {
          enumerable: true,
          get() {
            return this.$fields![i];
          },
          set(v) {
            this.$fields![i] = v;
          },
        };

        offsets[attr.name] = i;
      }
      let GCObject: IGCObjectClass;
      if (generic_abi_type === 0) {
        GCObject = class extends GCObjectBase {
          static readonly _type = type.name;
          constructor(...fields: unknown[]) {
            super();
            Object.defineProperty(this, '$type', {
              value: type,
              enumerable: false,
              writable: g1_abi_type_desc !== 0, // we need to be able to update $type for generics
            });
            Object.defineProperty(this, '$fields', { value: fields, enumerable: false });
            Object.defineProperties(this, properties);
          }

          static createFrom(o: object) {
            const fields = new globalThis.Array(type.attrs.length);
            for (let i = 0; i < type.attrs.length; i++) {
              const attr = type.attrs[i];
              fields[i] = (o as any)[attr.name];
            }
            return new type.ctor(...fields);
          }
        };
      } else {
        GCObject = class extends abi.types[generic_abi_type].ctor {
          static override readonly _type = type.name;
          constructor(...fields: unknown[]) {
            super(...fields);
            Object.defineProperty(this, '$type', {
              value: type,
              enumerable: false,
              writable: false,
            });
          }
        };
      }
      this.ctor = GCObject;
      Object.defineProperty(this.ctor, '$fields', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: offsets,
      });
    }

    Object.defineProperty(this.ctor.constructor, 'name', {
      value: abi.symbols[symbol],
      writable: false,
      enumerable: false,
    });

    if (type.mapped_type_off != this.offset) {
      return;
    }

    // Dynamically store the constructor
    if (!Object.hasOwn(gcreg, module_name)) {
      (gcreg as any)[module_name] = {};
    }
    // Store the constructor using its fqn
    (gcreg as any)[module_name][type_name] = this.ctor;
    // Store the constructor using the shortcut
    if (typeof (gcreg as any)[type_name] === 'function') {
      delete (gcreg as any)[type_name];
    } else if (type_name.indexOf('$') !== -1) {
      // noop
    } else {
      (gcreg as any)[type_name] = this.ctor;
    }
  }

  g1(): number {
    return this.g1_abi_type_desc >> 1;
  }

  g1Nullable(): boolean {
    return (this.g1_abi_type_desc & 0b00000001) === 1;
  }

  g2(): number {
    return this.g2_abi_type_desc >> 1;
  }

  g2Nullable(): boolean {
    return (this.g2_abi_type_desc & 0b00000001) === 1;
  }

  /**
   * Fully-qualified-name (eg. `'core::Array<core::int>'`)
   */
  get name(): string {
    // const lib = this.abi.symbols[this.lib];
    const mod = this.abi.symbols[this.module];
    const name = this.abi.symbols[this.symbol];
    return `${mod}::${name}`;
  }

  toJSON() {
    return {
      ...this,
      lib: this.abi.symbols[this.lib],
      module: this.abi.symbols[this.module],
      symbol: this.abi.symbols[this.symbol],
    };
  }
}

export class AbiAttribute {
  constructor(
    /** attribute name */
    readonly name: string,
    readonly abi_type: number,
    readonly prog_type_offset: number,
    readonly mapped_any_offset: number,
    readonly mapped_att_offset: number,
    readonly sbi_type: PrimitiveType,
    readonly nullable: boolean,
    readonly mapped: boolean,
    readonly precision: AbiPrecision,
  ) {}
}

export enum AbiPrecision {
  p_0 = 0,
  p_10 = 1,
  p_100 = 2,
  p_1_000 = 3,
  p_10_000 = 4,
  p_100_000 = 5,
  p_1_000_000 = 6,
  p_10_000_000 = 7,
  p_100_000_000 = 8,
  p_1_000_000_000 = 9,
  p_10_000_000_000 = 10,
}

export const F64_DIVIDERS = [
  1.0, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, 10000000.0, 100000000.0, 1000000000.0, 10000000000.0,
] as const;

export class AbiFunction {
  constructor(
    readonly abi: Abi,
    readonly lib: string,
    readonly module: string,
    readonly type: string | undefined,
    readonly name: string,
    readonly module_id: number,
    readonly type_id: number,
    readonly name_id: number,
    readonly fqn: string,
    readonly params: AbiParam[],
    readonly return_type: AbiType,
    readonly return_type_nullable: boolean,
    readonly args_type: AbiType,
  ) {}

  /**
   * @returns an instance of `gc.core.function_` that points to that `AbiFunction`
   */
  toFunction(): gc.core.function_ {
    return new gcreg.core.function_(this.module_id, this.type_id, this.name_id);
  }

  /**
   * Serializes the given `args` following this functions parameters signature
   * @param abi
   * @param args
   * @returns
   */
  serialize(args?: Value[], capacity?: number): ArrayBuffer {
    const writer = new AbiWriter(this.abi, capacity);
    writer.headers();
    if (args && args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        const param = this.params[i];
        const arg = args[i];
        writer.serialize(arg, param.type);
      }
    }
    return writer.buffer.buffer;
  }
}

export class AbiParam {
  constructor(
    readonly name: string,
    readonly type: AbiType,
    readonly nullable: boolean,
  ) {}
}

/**
 * Linkedlist node
 */
export interface node<T> {
  prev?: node<T>;
  data: T;
  next?: node<T>;
}

export class AbiTypeEvol {
  readonly head: Readonly<node<AbiType>>;
  readonly tail: Readonly<node<AbiType>>;
  readonly size: number;

  /**
   * Given any `AbiType` it will leverage the abi to find the head and tail.
   * @param ty
   */
  constructor(ty: AbiType) {
    this.size = 0;

    const tail: node<AbiType> = { data: ty.abi.types[ty.mapped_type_off] };
    while (tail.data.offset != tail.data.mapped_type_off) {
      tail.data = ty.abi.types[tail.data.mapped_type_off];
    }
    this.tail = tail;
    let node: node<AbiType> | undefined = this.tail;
    while (node) {
      this.size++;
      if (node.data.masked_type_off <= 0) {
        break;
      }
      node.prev = { data: ty.abi.types[node.data.masked_type_off], next: node };
      node = node.prev;
    }

    this.head = node;
  }

  /**
   * @returns an iterator that yields `node<AbiType>` starting at the oldest version
   * and moving forward towards the latest update of that type.
   *
   * *Note: Here `node` refer to a linkedlist node with `prev` and `next` properties.*
   */
  forward() {
    const head = this.head;
    return {
      *[Symbol.iterator]() {
        let curr: node<AbiType> | undefined = head;
        while (curr) {
          yield curr;
          if (!curr.next) {
            return;
          }
          curr = curr.next;
        }
      },
    };
  }

  /**
   * @returns an iterator that yields `node<AbiType>` starting at the newest version
   * and moving backward towards the oldest update of that type.
   *
   * *Note: Here `node` refer to a linkedlist node with `prev` and `next` properties.*
   */
  backward() {
    const tail = this.tail;
    return {
      *[Symbol.iterator]() {
        let curr: node<AbiType> | undefined = tail;
        while (curr) {
          yield curr;
          if (!curr.prev) {
            return;
          }
          curr = curr.prev;
        }
      },
    };
  }
}
