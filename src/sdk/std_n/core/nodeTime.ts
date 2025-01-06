import type { AbiReader, AbiWriter, AbiType, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class nodeTime<T = unknown> extends GCObject {
  static readonly _type = 'core::nodeTime' as const;

  constructor(type: AbiType, public value: bigint = 0n) {
    super(type);
  }

  static create(value: bigint, g: GreyCat = $.default): std.core.nodeTime {
    const ty = g.abi.types[g.abi.core.node_time];
    return new ty.factory(ty, value) as std.core.nodeTime;
  }

  static fromRef(ref: string, g: GreyCat = $.default): std.core.nodeTime {
    return nodeTime.create(BigInt(`0x${ref}`), g);
  }

  static load(r: AbiReader, ty: AbiType): std.core.nodeTime {
    const value = r.read_vu64_bigint();
    return new ty.factory(ty, value) as std.core.nodeTime;
  }

  sample(
    from: std.core.time | null,
    to: std.core.time | null,
    maxRows: number | bigint,
    mode: std.core.SamplingMode,
    maxDephasing: std.core.duration | null,
    tz: std.core.TimeZone | null,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<std.core.Table<[std.core.time, T]>> {
    return g.call(
      'core::nodeTime::sample',
      [[this], from, to, maxRows, mode, maxDephasing, tz],
      signal,
    );
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node_time);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  /**
   * Hexedecimal representation of the nodeTime's reference
   */
  get ref(): string {
    return this.value.toString(16);
  }

  override toString() {
    return `nodeTime:${this.ref}`;
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    return {
      _type: this.$type.name,
      ref: this.ref,
    };
  }
}
