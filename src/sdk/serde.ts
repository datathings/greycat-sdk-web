import { AbiWriter, AbiReader } from './io.js';
import { AbiFunction, AbiType, type Abi } from './abi.js';
import { GCObject } from './GCObject.js';
import type { PrimitiveType, Value } from './types.js';
import { $ } from './registry.js';
const JS_OBJECT = 254 as PrimitiveType;
const JS_UNDEFINED = 253 as PrimitiveType;
const ABI_FUNCTION = 252 as PrimitiveType;
const ABI_TYPE = 251 as PrimitiveType;

export class BinaryWriter extends AbiWriter {
  constructor(abi: Abi = $.default.abi, capacityOrBuffer?: number | ArrayBuffer) {
    super(abi, capacityOrBuffer);
  }

  override undefined(): void {
    this.write_u8(JS_UNDEFINED);
  }

  override js_object(value: object): void {
    if (value instanceof AbiFunction) {
      this.write_u8(ABI_FUNCTION);
      const bytes = this.txt.encode(value.fqn);
      this.write_vu32(bytes.length);
      this.write_all(bytes);
      return;
    }

    if (value instanceof AbiType) {
      this.write_u8(ABI_TYPE);
      const bytes = this.txt.encode(value.name);
      this.write_vu32(bytes.length);
      this.write_all(bytes);
      return;
    }

    try {
      GCObject.from(value, this.abi).save(this);
    } catch {
      this.write_u8(JS_OBJECT);
      const is_anon_object = value.constructor === Object;
      this.write_bool(is_anon_object);
      if (!is_anon_object) {
        const ctor_name_bytes = this.txt.encode(value.constructor.name);
        this.write_vu32(ctor_name_bytes.length);
        this.write_all(ctor_name_bytes);
      }
      const entries = Object.entries(value);
      this.write_vu32(entries.length);
      for (const [key, val] of entries) {
        this.serialize(key);
        this.serialize(val);
      }
    }
  }

  toHex(value: unknown): string {
    this.clear();
    this.serialize(value as Value);
    return toHex(this.buffer.buffer);
  }
}

// oxlint-disable-next-line typescript/no-explicit-any
export type BinaryReaderFactory = Record<string, new (...args: any[]) => any>;

export class BinaryReader extends AbiReader {
  constructor(
    buf: ArrayBuffer,
    abi: Abi = $.default.abi,
    readonly js_object_factory: BinaryReaderFactory = {},
  ) {
    super(abi, buf);
    this.deserializers[JS_OBJECT] = (r) => {
      const is_anon_object = r.read_bool();
      let ctor;
      if (!is_anon_object) {
        const ctor_name_len = r.read_vu32();
        const bytes = r.take(ctor_name_len);
        const ctor_name = this.txt.decode(bytes);
        ctor = this.js_object_factory[ctor_name];
      }
      const len = r.read_vu32();
      const object: { [key: string]: Value } = {};
      for (let i = 0; i < len; i++) {
        const key = r.deserialize() as string;
        const value = r.deserialize();
        object[key] = value;
      }
      if (typeof ctor === 'function') {
        Object.setPrototypeOf(object, ctor.prototype);
      }
      return object as unknown as Value;
    };
    this.deserializers[JS_UNDEFINED] = () => undefined;
    this.deserializers[ABI_FUNCTION] = (r) => {
      const len = r.read_vu32();
      const bytes = r.take(len);
      const fqn = this.txt.decode(bytes);
      return r.abi.fn_by_fqn.get(fqn);
    };
    this.deserializers[ABI_TYPE] = (r) => {
      const len = r.read_vu32();
      const bytes = r.take(len);
      const fqn = this.txt.decode(bytes);
      return r.abi.type_by_fqn.get(fqn);
    };
  }

  static fromHex<T = unknown>(hex: string, abi = $.default.abi): T {
    const buf = fromHex(hex);
    const reader = new BinaryReader(buf, abi);
    return reader.deserialize() as T;
  }
}

type BinaryReaderOptions = {
  abi?: Abi;
  capacityOrBuffer?: number | ArrayBuffer;
};

export function serializeToHex(value: unknown, options: BinaryReaderOptions = {}): string {
  const writer = new BinaryWriter(options.abi, options.capacityOrBuffer);
  writer.serialize(value as Value);
  return toHex(writer.buffer.buffer);
}

type BinaryWriterOptions = {
  abi?: Abi;
  js_factory?: BinaryReaderFactory;
};

export function deserializeFromHex<T = unknown>(hex: string, options: BinaryWriterOptions = {}): T {
  const buf = fromHex(hex);
  const reader = new BinaryReader(buf, options.abi, options.js_factory);
  return reader.deserialize() as T;
}

function hexByte(a: number, b: number): number {
  const b0 = a < 58 ? a - 48 : (a | 32) - 87;
  const b1 = b < 58 ? b - 48 : (b | 32) - 87;
  return (b0 << 4) | b1;
}

export function fromHex(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0, j = 0; i < hex.length; i += 2, j++) {
    bytes[j] = hexByte(hex.charCodeAt(i), hex.charCodeAt(i + 1));
  }
  return bytes.buffer;
}

// Pre-computed hex lookup-table: 0..255 -> "00".."ff"
const HEX_TABLE = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));

export const toHex = (buffer: ArrayBufferLike) => {
  const bytes = new Uint8Array(buffer);
  const chars = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    chars[i] = HEX_TABLE[bytes[i]];
  }
  return chars.join('');
};
