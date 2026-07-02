import { GCPrimitive, DEFAULT_TO_STRING_OPTIONS, type ToStringOptions } from '../../GCObject.js';
import { PrimitiveType } from '../../types.js';
import type { AbiReader, AbiWriter } from '../../io.js';
import type { AbiType } from '../../abi.js';
import type { GreyCat } from '../../greycat.js';
import { $ } from '../../registry.js';
export class function_ extends GCPrimitive {
  static readonly _type = 'core::function' as const;

  constructor(
    public mod_off: number = 0,
    public ty_off: number = 0,
    public name_off: number = 0,
  ) {
    super();
  }

  static create(
    mod: string,
    type: string | undefined,
    name: string,
    g: GreyCat = $.default,
  ): gc.core.function_ {
    const ty = g.abi.types[g.abi.core.fn];
    return new ty.ctor(
      g.abi.symbol_ids.get(mod) ?? 0,
      type ? (g.abi.symbol_ids.get(type) ?? 0) : 0,
      g.abi.symbol_ids.get(name) ?? 0,
    ) as gc.core.function_;
  }

  static fromFqn(fqn: string, g: GreyCat = $.default): gc.core.function_ {
    const ty = g.abi.types[g.abi.core.fn];
    const parts = fqn.split('::');
    if (parts.length === 2) {
      return new ty.ctor(
        g.abi.symbol_ids.get(parts[0]) ?? 0,
        0,
        g.abi.symbol_ids.get(parts[1]) ?? 0,
      ) as gc.core.function_;
    }
    if (parts.length === 3) {
      return new ty.ctor(
        g.abi.symbol_ids.get(parts[0]) ?? 0,
        g.abi.symbol_ids.get(parts[1]) ?? 0,
        g.abi.symbol_ids.get(parts[2]) ?? 0,
      ) as gc.core.function_;
    }
    throw new Error(`invalid fqn '${fqn}' for a function`);
  }

  static override load(r: AbiReader, ty: AbiType): gc.core.function_ {
    const mod_off = r.read_vu32();
    const ty_off = r.read_vu32();
    const name_off = r.read_vu32();
    return new ty.ctor(mod_off, ty_off, name_off) as gc.core.function_;
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.function);
  }

  override saveContent(w: AbiWriter) {
    w.write_vu32(this.mod_off);
    w.write_vu32(this.ty_off);
    w.write_vu32(this.name_off);
  }

  /**
   * Function's fully qualified name (eg. `<module>::<type>::<name>`, `<type>` being optional)
   */
  get fqn(): string {
    const mod = this.$type.abi.symbols[this.mod_off];
    const name = this.$type.abi.symbols[this.name_off];
    if (this.ty_off === 0) {
      return `${mod}::${name}`;
    }
    const type = this.$type.abi.symbols[this.ty_off];
    return `${mod}::${type}::${name}`;
  }

  override toString(_opts: ToStringOptions = DEFAULT_TO_STRING_OPTIONS) {
    return this.fqn;
  }

  override toJSON() {
    return this.fqn;
  }
}
