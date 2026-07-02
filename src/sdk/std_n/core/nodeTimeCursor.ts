import { GCPrimitive } from '../../GCObject.js';
import type { AbiReader, AbiWriter } from '../../io.js';
export class nodeTimeCursor extends GCPrimitive {
  static readonly _type = 'core::nodeTimeCursor' as const;

  constructor(public value: bigint = 0n) {
    super();
    throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
  }

  static override load(_r: AbiReader): nodeTimeCursor {
    throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
  }

  override saveContent(_w: AbiWriter) {
    throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
  }

  override toJSON() {
    return {
      _type: this.$type.name,
    };
  }
}
