import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class node<T = unknown> extends GCPrimitive {
  static readonly _type = 'core::node' as const;

  constructor(public value: bigint = 0n) {
    super();
  }

  static create(value: bigint, g: GreyCat = $.default): gc.core.node {
    const ty = g.abi.types[g.abi.core.node];
    return new ty.ctor(value) as gc.core.node;
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.node {
    const value = r.read_vu64_bigint();
    return new ty.ctor(value) as gc.core.node;
  }

  /**
   * Resolves the value of this node.
   *
   * *This is sugar above a call to `core::node::resolve_all([this])` that returns the first element of the array*
   *
   * @param g the GreyCat instance to use, defaults to `gc.$.default`
   * @param signal to prematurely abort the request
   */
  async resolve(g: GreyCat = $.default, signal?: AbortSignal): Promise<T> {
    const [res] = await g.call<Array<T>>('core::node::resolve_all', [[this]], signal);
    return res;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.node);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu64(this.value);
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return `${this.value}_node`;
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
