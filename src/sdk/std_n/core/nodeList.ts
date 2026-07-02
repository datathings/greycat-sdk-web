import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class nodeList<T = unknown> extends GCPrimitive {
  static readonly _type = 'core::nodeList' as const;

  constructor(public value: bigint = 0n) {
    super();
  }

  static create(value: bigint, g: GreyCat = $.default): gc.core.nodeList {
    const ty = g.abi.types[g.abi.core.node_list];
    return new ty.ctor(value) as gc.core.nodeList;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.nodeList {
    const value = r.read_vu64_bigint();
    return new ty.ctor(value) as gc.core.nodeList;
  }

  sample(
    from: number | bigint | null,
    to: number | bigint | null,
    maxRows: number | bigint,
    mode: gc.core.SamplingMode,
    maxDephasing: number | bigint | null,
    g: GreyCat = $.default,
    signal?: AbortSignal,
  ): Promise<gc.core.Table<[number | bigint, T]>> {
    return g.call('core::nodeList::sample', [[this], from, to, maxRows, mode, maxDephasing], signal);
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node_list);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `${this.value}_nodeList`;
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
