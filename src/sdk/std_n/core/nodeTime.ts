import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class nodeTime<T = unknown> extends GCPrimitive {
  static readonly _type = 'core::nodeTime' as const;

  constructor(public value: bigint = 0n) {
    super();
  }

  static create(value: bigint, g: GreyCat = $.default): gc.core.nodeTime {
    const ty = g.abi.types[g.abi.core.node_time];
    return new ty.ctor(value) as gc.core.nodeTime;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.nodeTime {
    const value = r.read_vu64_bigint();
    return new ty.ctor(value) as gc.core.nodeTime;
  }

  sample(
    from: gc.core.time | null,
    to: gc.core.time | null,
    maxRows: number | bigint,
    mode: gc.core.SamplingMode,
    maxDephasing: gc.core.duration | null,
    tz: gc.core.TimeZone | null,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<gc.core.Table<[gc.core.time, T]>> {
    return g.call('core::nodeTime::sample', [[this], from, to, maxRows, mode, maxDephasing, tz], signal);
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node_time);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `${this.value}_nodeTime`;
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
