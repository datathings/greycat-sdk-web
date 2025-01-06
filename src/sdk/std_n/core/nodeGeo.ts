import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, $ } from '../../exports.js';

export class nodeGeo<T = unknown> extends GCObject {
  static readonly _type = 'core::nodeGeo' as const;

  constructor(type: AbiType, public value: bigint = 0n) {
    super(type);
  }

  static create(value: bigint, g: GreyCat = $.default): std.core.nodeGeo {
    const ty = g.abi.types[g.abi.core.node_geo];
    return new ty.factory(ty, value) as std.core.nodeGeo;
  }

  static fromRef(ref: string, g: GreyCat = $.default): std.core.nodeGeo {
    return nodeGeo.create(BigInt(`0x${ref}`), g);
  }

  static load(r: AbiReader, ty: AbiType): std.core.nodeGeo {
    const value = r.read_vu64_bigint();
    return new ty.factory(ty, value) as std.core.nodeGeo;
  }

  // from: geo?, to: geo?, maxRows: int, mode: SamplingMode
  sample(
    from: std.core.geo | null,
    to: std.core.geo | null,
    maxRows: number | bigint,
    mode: std.core.SamplingMode,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<std.core.Table<[std.core.geo, T]>> {
    return g.call('core::nodeGeo::sample', [[this], from, to, maxRows, mode], signal);
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node_geo);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  /**
   * Hexedecimal representation of the nodeGeo's reference
   */
  get ref(): string {
    return this.value.toString(16);
  }

  override toString(): string {
    return `nodeGeo:${this.ref}`;
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
