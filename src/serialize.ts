import { AbiWriter, AbiReader, PrimitiveType, type Value, type Abi, $ } from './exports.js';

const JS_OBJECT = 254 as PrimitiveType;
const JS_UNDEFINED = 253 as PrimitiveType;

export class BinaryWriter extends AbiWriter {
  constructor(abi: Abi = $.default.abi) {
    super(abi);
  }

  override undefined(): void {
    this.write_u8(JS_UNDEFINED);
  }

  override object(value: object): void {
    try {
      super.object(value);
    } catch (err) {
      this.write_u8(JS_OBJECT);
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
    return bytesToHex(this.buffer);
  }
}

export class BinaryReader extends AbiReader {
  constructor(buf: ArrayBuffer, abi: Abi = $.default.abi) {
    super(abi, buf);
    this.deserializers[JS_OBJECT] = (r) => {
      const len = r.read_vu32();
      const object: { [key: string]: Value } = {};
      for (let i = 0; i < len; i++) {
        const key = r.deserialize() as string;
        const value = r.deserialize();
        object[key] = value;
      }
      return object as unknown as Value;
    };
    this.deserializers[JS_UNDEFINED] = () => undefined;
  }

  static fromHex<T = unknown>(hex: string): T {
    const buffer = hexToBytes(hex);
    const reader = new BinaryReader(buffer.buffer);
    return reader.deserialize() as T;
  }
}

export function serializeToHex(value: unknown): string {
  const writer = new BinaryWriter();
  writer.serialize(value as Value);
  return bytesToHex(writer.buffer);
}

export function deserializeFromHex<T = unknown>(hex: string): T {
  const reader = new BinaryReader(hexToBytes(hex).buffer);
  return reader.deserialize() as T;
}

// export async function loadStateFromDb<T extends { [key: string]: unknown }>(
//   defaultState: T,
//   name = 'app-state',
// ): Promise<T> {
//   const db = new IndexedDbWrapper(name, 1);
//   const bytes = await db.readBytes(name);
//   if (bytes) {
//     const reader = new BinaryReader(bytes.buffer);
//     return reader.deserialize() as unknown as T;
//   }
//   return defaultState;
// }

// export async function saveStateToDb(state: unknown, name = 'app-state') {
//   const writer = new BinaryWriter();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   writer.serialize(state as any);
//   const db = new IndexedDbWrapper(name, 1);
//   db.writeBytes(name, writer.buffer);
// }

const hexToBytes = (hexString: string) => {
  const length = hexString.length;
  const byteCount = length / 2;
  const uint8Array = new Uint8Array(byteCount);

  for (let i = 0; i < length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }

  return uint8Array;
};

const bytesToHex = (bytes: Uint8Array) => {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};
