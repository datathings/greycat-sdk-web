import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class nodeGeo<T = unknown> extends GCPrimitive {
  static readonly _type = 'core::nodeGeo' as const;

  constructor(public value: bigint = 0n) {
    super();
  }

  static create(value: bigint, g: GreyCat = $.default): gc.core.nodeGeo {
    const ty = g.abi.types[g.abi.core.node_geo];
    return new ty.ctor(value) as gc.core.nodeGeo;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.nodeGeo {
    const value = r.read_vu64_bigint();
    return new ty.ctor(value) as gc.core.nodeGeo;
  }

  // from: geo?, to: geo?, maxRows: int, mode: SamplingMode
  sample(
    from: gc.core.geo | null,
    to: gc.core.geo | null,
    maxRows: number | bigint,
    mode: gc.core.SamplingMode,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<gc.core.Table<[gc.core.geo, T]>> {
    return g.call('core::nodeGeo::sample', [[this], from, to, maxRows, mode], signal);
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node_geo);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS): string {
    return `${this.value}_nodeGeo`;
  }

  override valueOf() {
    return this.value;
  }

  override toJSON() {
    if (this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER) {
      return Number(this.value);
    }
    return `${this.value}`;
  }
}
