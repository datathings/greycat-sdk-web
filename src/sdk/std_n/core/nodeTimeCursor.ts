import type { AbiType, AbiReader, AbiWriter } from '../../exports.js';
import { GCObject } from '../../exports.js';

export class nodeTimeCursor extends GCObject {
  static readonly _type = 'core::nodeTimeCursor' as const;

  constructor(type: AbiType, public value: bigint = 0n) {
    super(type);
    throw new Error(`${nodeTimeCursor._type}: is not implemented yet`);
  }

  static load(_r: AbiReader): nodeTimeCursor {
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
