// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
// @ts-nocheck
import * as $greycat from '../exports.js';

export namespace core {
  export class str extends $greycat.std_n.core.str {
  }

  export class nodeGeo$info$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeGeo$info$args';

    nodes!: globalThis.Array<core.nodeGeo>;

    static createFrom({nodes}: {nodes: globalThis.Array<core.nodeGeo>}, $g: $greycat.GreyCat = $greycat.$.default): nodeGeo$info$args {
      return new nodeGeo$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[1], nodes);
    }
    static create(nodes: globalThis.Array<core.nodeGeo>, $g: $greycat.GreyCat = $greycat.$.default): nodeGeo$info$args {
      return new nodeGeo$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[1], nodes);
    }
  }

  export class t4 extends $greycat.std_n.core.t4 {
  }

  export class nodeTime$info$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeTime$info$args';

    nodes!: globalThis.Array<core.nodeTime>;

    static createFrom({nodes}: {nodes: globalThis.Array<core.nodeTime>}, $g: $greycat.GreyCat = $greycat.$.default): nodeTime$info$args {
      return new nodeTime$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[3], nodes);
    }
    static create(nodes: globalThis.Array<core.nodeTime>, $g: $greycat.GreyCat = $greycat.$.default): nodeTime$info$args {
      return new nodeTime$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[3], nodes);
    }
  }

  export class int extends $greycat.std_n.core.int {
  }

  export class function_ extends $greycat.std_n.core.function_ {
  }

  export class Error extends $greycat.GCObject {
    static readonly _type = 'core::Error';

    message!: string | null;
    stack!: globalThis.Array<core.ErrorFrame>;

    static createFrom({message = null, stack}: {message?: string | null, stack: globalThis.Array<core.ErrorFrame>}, $g: $greycat.GreyCat = $greycat.$.default): Error {
      return new Error($g.abi.libs_by_name.get(stdlib.name)!.mapped[6], message, stack);
    }
    static create(message: string | null, stack: globalThis.Array<core.ErrorFrame>, $g: $greycat.GreyCat = $greycat.$.default): Error {
      return new Error($g.abi.libs_by_name.get(stdlib.name)!.mapped[6], message, stack);
    }
  }

  export class nodeList$info$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeList$info$args';

    nodes!: globalThis.Array<core.nodeList>;

    static createFrom({nodes}: {nodes: globalThis.Array<core.nodeList>}, $g: $greycat.GreyCat = $greycat.$.default): nodeList$info$args {
      return new nodeList$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[7], nodes);
    }
    static create(nodes: globalThis.Array<core.nodeList>, $g: $greycat.GreyCat = $greycat.$.default): nodeList$info$args {
      return new nodeList$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[7], nodes);
    }
  }

  export class nodeList<T = any> extends $greycat.std_n.core.nodeList<T> {
    static info(nodes: globalThis.Array<core.nodeList>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<number | bigint>>> {
      return $g.call('core::nodeList::info', [nodes], $signal);
    }
    static sample(refs: globalThis.Array<core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('core::nodeList::sample', [refs, from, to, maxRows, mode, maxDephasing], $signal);
    }
  }

  export class nodeGeo<T = any> extends $greycat.std_n.core.nodeGeo<T> {
    static info(nodes: globalThis.Array<core.nodeGeo>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.geo>>> {
      return $g.call('core::nodeGeo::info', [nodes], $signal);
    }
    static sample(refs: globalThis.Array<core.nodeGeo>, from: core.geo | null, to: core.geo | null, maxRows: number | bigint, mode: core.SamplingMode, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('core::nodeGeo::sample', [refs, from, to, maxRows, mode], $signal);
    }
  }

  export class nodeIndex$sample$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeIndex$sample$args';

    refs!: globalThis.Array<core.nodeIndex>;
    from!: any | null;
    maxRows!: number | bigint;
    mode!: core.SamplingMode;

    static createFrom({refs, from = null, maxRows, mode}: {refs: globalThis.Array<core.nodeIndex>, from?: any | null, maxRows: number | bigint, mode: core.SamplingMode}, $g: $greycat.GreyCat = $greycat.$.default): nodeIndex$sample$args {
      return new nodeIndex$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[10], refs, from, maxRows, mode);
    }
    static create(refs: globalThis.Array<core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: core.SamplingMode, $g: $greycat.GreyCat = $greycat.$.default): nodeIndex$sample$args {
      return new nodeIndex$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[10], refs, from, maxRows, mode);
    }
  }

  export class Array<T = any> extends $greycat.std_n.core.Array<T> {
  }

  export class Tensor extends $greycat.std_n.core.Tensor {
  }

  export class String extends $greycat.std_n.core.String {
  }

  export class field extends $greycat.std_n.core.field {
  }

  export class t3 extends $greycat.std_n.core.t3 {
  }

  export class Table<T = any> extends $greycat.std_n.core.Table<T> {
    static applyMappings(table: core.Table, mappings: globalThis.Array<core.TableColumnMapping>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('core::Table::applyMappings', [table, mappings], $signal);
    }
  }

  export class Date$fromTime$args extends $greycat.GCObject {
    static readonly _type = 'core::Date$fromTime$args';

    time!: core.time;
    tz!: core.TimeZone | null;

    static createFrom({time, tz = null}: {time: core.time, tz?: core.TimeZone | null}, $g: $greycat.GreyCat = $greycat.$.default): Date$fromTime$args {
      return new Date$fromTime$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[17], time, tz);
    }
    static create(time: core.time, tz: core.TimeZone | null = null, $g: $greycat.GreyCat = $greycat.$.default): Date$fromTime$args {
      return new Date$fromTime$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[17], time, tz);
    }
  }

  export class Date extends $greycat.GCObject {
    static readonly _type = 'core::Date';

    year!: number | bigint;
    month!: number | bigint;
    day!: number | bigint;
    hour!: number | bigint;
    minute!: number | bigint;
    second!: number | bigint;
    microsecond!: number | bigint;

    static fromTime(time: core.time, tz: core.TimeZone | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Date> {
      return $g.call('core::Date::fromTime', [time, tz], $signal);
    }
    static createFrom({year, month, day, hour, minute, second, microsecond}: {year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Date {
      return new Date($g.abi.libs_by_name.get(stdlib.name)!.mapped[18], year, month, day, hour, minute, second, microsecond);
    }
    static create(year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Date {
      return new Date($g.abi.libs_by_name.get(stdlib.name)!.mapped[18], year, month, day, hour, minute, second, microsecond);
    }
  }

  export class Table$applyMappings$args extends $greycat.GCObject {
    static readonly _type = 'core::Table$applyMappings$args';

    table!: core.Table;
    mappings!: globalThis.Array<core.TableColumnMapping>;

    static createFrom({table, mappings}: {table: core.Table, mappings: globalThis.Array<core.TableColumnMapping>}, $g: $greycat.GreyCat = $greycat.$.default): Table$applyMappings$args {
      return new Table$applyMappings$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[19], table, mappings);
    }
    static create(table: core.Table, mappings: globalThis.Array<core.TableColumnMapping>, $g: $greycat.GreyCat = $greycat.$.default): Table$applyMappings$args {
      return new Table$applyMappings$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[19], table, mappings);
    }
  }

  export class Buffer extends $greycat.std_n.core.Buffer {
  }

  export class nodeTimeCursor<T = any> extends $greycat.GCObject {
    static readonly _type = 'core::nodeTimeCursor';

    n!: core.nodeTime;
    req_time!: core.time | null;

    static createFrom<T>({n, req_time = null}: {n: core.nodeTime, req_time?: core.time | null}, $g: $greycat.GreyCat = $greycat.$.default): nodeTimeCursor {
      return new nodeTimeCursor($g.abi.libs_by_name.get(stdlib.name)!.mapped[21], n, req_time);
    }
    static create<T>(n: core.nodeTime, req_time: core.time | null = null, $g: $greycat.GreyCat = $greycat.$.default): nodeTimeCursor<T> {
      return new nodeTimeCursor($g.abi.libs_by_name.get(stdlib.name)!.mapped[21], n, req_time);
    }
  }

  export class node<T = any> extends $greycat.std_n.core.node<T> {
    static resolve_all(n: globalThis.Array<core.node | null>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<any | null>> {
      return $g.call('core::node::resolve_all', [n], $signal);
    }
  }

  export class GeoCircle extends $greycat.GCObject {
    static readonly _type = 'core::GeoCircle';

    center!: core.geo;
    radius!: number;

    static createFrom({center, radius}: {center: core.geo, radius: number}, $g: $greycat.GreyCat = $greycat.$.default): GeoCircle {
      return new GeoCircle($g.abi.libs_by_name.get(stdlib.name)!.mapped[23], center, radius);
    }
    static create(center: core.geo, radius: number, $g: $greycat.GreyCat = $greycat.$.default): GeoCircle {
      return new GeoCircle($g.abi.libs_by_name.get(stdlib.name)!.mapped[23], center, radius);
    }
  }

  export class SamplingMode extends $greycat.GCEnum {
    static readonly _type = 'core::SamplingMode';

    constructor(type: $greycat.AbiType, offset: number, public override key: SamplingMode.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static fixed($g: $greycat.GreyCat = $greycat.$.default): SamplingMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[24];
      return t.static_values['fixed'];
    }
    static fixed_reg($g: $greycat.GreyCat = $greycat.$.default): SamplingMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[24];
      return t.static_values['fixed_reg'];
    }
    static adaptative($g: $greycat.GreyCat = $greycat.$.default): SamplingMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[24];
      return t.static_values['adaptative'];
    }
    static dense($g: $greycat.GreyCat = $greycat.$.default): SamplingMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[24];
      return t.static_values['dense'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): SamplingMode[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[24];
      return t.enum_values as SamplingMode[];
    }
  }

  export namespace SamplingMode  {
    export type Field = 'fixed'|'fixed_reg'|'adaptative'|'dense';
  }
  export class GeoPoly extends $greycat.GCObject {
    static readonly _type = 'core::GeoPoly';

    points!: globalThis.Array<core.geo>;

    static createFrom({points}: {points: globalThis.Array<core.geo>}, $g: $greycat.GreyCat = $greycat.$.default): GeoPoly {
      return new GeoPoly($g.abi.libs_by_name.get(stdlib.name)!.mapped[25], points);
    }
    static create(points: globalThis.Array<core.geo>, $g: $greycat.GreyCat = $greycat.$.default): GeoPoly {
      return new GeoPoly($g.abi.libs_by_name.get(stdlib.name)!.mapped[25], points);
    }
  }

  export class MathConstants extends $greycat.GCObject {
    static readonly _type = 'core::MathConstants';


    static e($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['e'] as number;
    }
    static log_2e($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['log_2e'] as number;
    }
    static log_10e($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['log_10e'] as number;
    }
    static ln2($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['ln2'] as number;
    }
    static ln10($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['ln10'] as number;
    }
    static pi($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['pi'] as number;
    }
    static pi_2($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['pi_2'] as number;
    }
    static pi_4($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['pi_4'] as number;
    }
    static m1_pi($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['m1_pi'] as number;
    }
    static m2_pi($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['m2_pi'] as number;
    }
    static m2_sqrt_pi($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['m2_sqrt_pi'] as number;
    }
    static sqrt2($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['sqrt2'] as number;
    }
    static sqrt1_2($g: $greycat.GreyCat = $greycat.$.default): number {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[26];
      return  t.static_values['sqrt1_2'] as number;
    }
    static createFrom($g: $greycat.GreyCat = $greycat.$.default): MathConstants {
      return new MathConstants($g.abi.libs_by_name.get(stdlib.name)!.mapped[26]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): MathConstants {
      return new MathConstants($g.abi.libs_by_name.get(stdlib.name)!.mapped[26]);
    }
  }

  export class type extends $greycat.std_n.core.type {
  }

  export class nodeTimeSingleton extends $greycat.GCObject {
    static readonly _type = 'core::nodeTimeSingleton';

    t!: core.time;
    v!: any;

    static createFrom({t, v}: {t: core.time, v: any}, $g: $greycat.GreyCat = $greycat.$.default): nodeTimeSingleton {
      return new nodeTimeSingleton($g.abi.libs_by_name.get(stdlib.name)!.mapped[28], t, v);
    }
    static create(t: core.time, v: any, $g: $greycat.GreyCat = $greycat.$.default): nodeTimeSingleton {
      return new nodeTimeSingleton($g.abi.libs_by_name.get(stdlib.name)!.mapped[28], t, v);
    }
  }

  export class null_ extends $greycat.std_n.core.null_ {
  }

  export class NodeInfo<T = any> extends $greycat.GCObject {
    static readonly _type = 'core::NodeInfo';

    size!: number | bigint;
    from!: any | null;
    to!: any | null;

    static createFrom<T>({size, from = null, to = null}: {size: number | bigint, from?: any | null, to?: any | null}, $g: $greycat.GreyCat = $greycat.$.default): NodeInfo {
      return new NodeInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[30], size, from, to);
    }
    static create<T>(size: number | bigint, from: any | null = null, to: any | null = null, $g: $greycat.GreyCat = $greycat.$.default): NodeInfo<T> {
      return new NodeInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[30], size, from, to);
    }
  }

  export class char extends $greycat.std_n.core.char {
  }

  export class node$resolve_all$args extends $greycat.GCObject {
    static readonly _type = 'core::node$resolve_all$args';

    n!: globalThis.Array<core.node | null>;

    static createFrom({n}: {n: globalThis.Array<core.node | null>}, $g: $greycat.GreyCat = $greycat.$.default): node$resolve_all$args {
      return new node$resolve_all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[32], n);
    }
    static create(n: globalThis.Array<core.node | null>, $g: $greycat.GreyCat = $greycat.$.default): node$resolve_all$args {
      return new node$resolve_all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[32], n);
    }
  }

  export class TableColumnMapping extends $greycat.GCObject {
    static readonly _type = 'core::TableColumnMapping';

    column!: number | bigint;
    extractors!: globalThis.Array<any>;

    static createFrom({column, extractors}: {column: number | bigint, extractors: globalThis.Array<any>}, $g: $greycat.GreyCat = $greycat.$.default): TableColumnMapping {
      return new TableColumnMapping($g.abi.libs_by_name.get(stdlib.name)!.mapped[33], column, extractors);
    }
    static create(column: number | bigint, extractors: globalThis.Array<any>, $g: $greycat.GreyCat = $greycat.$.default): TableColumnMapping {
      return new TableColumnMapping($g.abi.libs_by_name.get(stdlib.name)!.mapped[33], column, extractors);
    }
  }

  export class nodeGeo$sample$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeGeo$sample$args';

    refs!: globalThis.Array<core.nodeGeo>;
    from!: core.geo | null;
    to!: core.geo | null;
    maxRows!: number | bigint;
    mode!: core.SamplingMode;

    static createFrom({refs, from = null, to = null, maxRows, mode}: {refs: globalThis.Array<core.nodeGeo>, from?: core.geo | null, to?: core.geo | null, maxRows: number | bigint, mode: core.SamplingMode}, $g: $greycat.GreyCat = $greycat.$.default): nodeGeo$sample$args {
      return new nodeGeo$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[34], refs, from, to, maxRows, mode);
    }
    static create(refs: globalThis.Array<core.nodeGeo>, from: core.geo | null, to: core.geo | null, maxRows: number | bigint, mode: core.SamplingMode, $g: $greycat.GreyCat = $greycat.$.default): nodeGeo$sample$args {
      return new nodeGeo$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[34], refs, from, to, maxRows, mode);
    }
  }

  export class nodeTime<T = any> extends $greycat.std_n.core.nodeTime<T> {
    static info(nodes: globalThis.Array<core.nodeTime>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.time>>> {
      return $g.call('core::nodeTime::info', [nodes], $signal);
    }
    static sample(refs: globalThis.Array<core.nodeTime>, from: core.time | null, to: core.time | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing: core.duration | null = null, tz: core.TimeZone | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('core::nodeTime::sample', [refs, from, to, maxRows, mode, maxDephasing, tz], $signal);
    }
  }

  export class ErrorCode extends $greycat.GCEnum {
    static readonly _type = 'core::ErrorCode';

    constructor(type: $greycat.AbiType, offset: number, public override key: ErrorCode.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static none($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['none'];
    }
    static interrupted($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['interrupted'];
    }
    static await_($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['await_'];
    }
    static timeout($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['timeout'];
    }
    static forbidden($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['forbidden'];
    }
    static runtime_error($g: $greycat.GreyCat = $greycat.$.default): ErrorCode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.static_values['runtime_error'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): ErrorCode[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[36];
      return t.enum_values as ErrorCode[];
    }
  }

  export namespace ErrorCode  {
    export type Field = 'none'|'interrupted'|'await'|'timeout'|'forbidden'|'runtime_error';
  }
  export class nodeList$sample$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeList$sample$args';

    refs!: globalThis.Array<core.nodeList>;
    from!: number | bigint | null;
    to!: number | bigint | null;
    maxRows!: number | bigint;
    mode!: core.SamplingMode;
    maxDephasing!: number | bigint | null;

    static createFrom({refs, from = null, to = null, maxRows, mode, maxDephasing = null}: {refs: globalThis.Array<core.nodeList>, from?: number | bigint | null, to?: number | bigint | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): nodeList$sample$args {
      return new nodeList$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[37], refs, from, to, maxRows, mode, maxDephasing);
    }
    static create(refs: globalThis.Array<core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): nodeList$sample$args {
      return new nodeList$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[37], refs, from, to, maxRows, mode, maxDephasing);
    }
  }

  export class TensorType extends $greycat.GCEnum {
    static readonly _type = 'core::TensorType';

    constructor(type: $greycat.AbiType, offset: number, public override key: TensorType.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static i32($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['i32'];
    }
    static i64($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['i64'];
    }
    static f32($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['f32'];
    }
    static f64($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['f64'];
    }
    static c64($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['c64'];
    }
    static c128($g: $greycat.GreyCat = $greycat.$.default): TensorType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.static_values['c128'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): TensorType[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[38];
      return t.enum_values as TensorType[];
    }
  }

  export namespace TensorType  {
    export type Field = 'i32'|'i64'|'f32'|'f64'|'c64'|'c128';
  }
  export class bool extends $greycat.std_n.core.bool {
  }

  export class DurationUnit extends $greycat.GCEnum {
    static readonly _type = 'core::DurationUnit';

    constructor(type: $greycat.AbiType, offset: number, public override key: DurationUnit.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static microseconds($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['microseconds'];
    }
    static milliseconds($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['milliseconds'];
    }
    static seconds($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['seconds'];
    }
    static minutes($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['minutes'];
    }
    static hours($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['hours'];
    }
    static days($g: $greycat.GreyCat = $greycat.$.default): DurationUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.static_values['days'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): DurationUnit[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[40];
      return t.enum_values as DurationUnit[];
    }
  }

  export namespace DurationUnit  {
    export type Field = 'microseconds'|'milliseconds'|'seconds'|'minutes'|'hours'|'days';
  }
  export class geo extends $greycat.std_n.core.geo {
  }

  export class GeoBox extends $greycat.GCObject {
    static readonly _type = 'core::GeoBox';

    sw!: core.geo;
    ne!: core.geo;

    static createFrom({sw, ne}: {sw: core.geo, ne: core.geo}, $g: $greycat.GreyCat = $greycat.$.default): GeoBox {
      return new GeoBox($g.abi.libs_by_name.get(stdlib.name)!.mapped[42], sw, ne);
    }
    static create(sw: core.geo, ne: core.geo, $g: $greycat.GreyCat = $greycat.$.default): GeoBox {
      return new GeoBox($g.abi.libs_by_name.get(stdlib.name)!.mapped[42], sw, ne);
    }
  }

  export class Map<K = any, V = any> extends $greycat.std_n.core.Map<K, V> {
  }

  export class Tuple<T = any, U = any> extends $greycat.GCObject {
    static readonly _type = 'core::Tuple';

    x!: T | null;
    y!: U | null;

    static createFrom<T, U>({x = null, y = null}: {x?: T | null, y?: U | null}, $g: $greycat.GreyCat = $greycat.$.default): Tuple {
      return new Tuple($g.abi.libs_by_name.get(stdlib.name)!.mapped[44], x, y);
    }
    static create<T, U>(x: T | null = null, y: U | null = null, $g: $greycat.GreyCat = $greycat.$.default): Tuple<T, U> {
      return new Tuple($g.abi.libs_by_name.get(stdlib.name)!.mapped[44], x, y);
    }
  }

  export class ErrorFrame extends $greycat.GCObject {
    static readonly _type = 'core::ErrorFrame';

    module!: string | null;
    function!: string;
    line!: number | bigint;
    column!: number | bigint;

    static createFrom({module = null, function_, line, column}: {module?: string | null, function_: string, line: number | bigint, column: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): ErrorFrame {
      return new ErrorFrame($g.abi.libs_by_name.get(stdlib.name)!.mapped[45], module, function_, line, column);
    }
    static create(module: string | null, function_: string, line: number | bigint, column: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): ErrorFrame {
      return new ErrorFrame($g.abi.libs_by_name.get(stdlib.name)!.mapped[45], module, function_, line, column);
    }
  }

  export class CalendarUnit extends $greycat.GCEnum {
    static readonly _type = 'core::CalendarUnit';

    constructor(type: $greycat.AbiType, offset: number, public override key: CalendarUnit.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static year($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['year'];
    }
    static month($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['month'];
    }
    static day($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['day'];
    }
    static hour($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['hour'];
    }
    static minute($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['minute'];
    }
    static second($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['second'];
    }
    static microsecond($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.static_values['microsecond'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): CalendarUnit[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[46];
      return t.enum_values as CalendarUnit[];
    }
  }

  export namespace CalendarUnit  {
    export type Field = 'year'|'month'|'day'|'hour'|'minute'|'second'|'microsecond';
  }
  export class nodeTime$sample$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeTime$sample$args';

    refs!: globalThis.Array<core.nodeTime>;
    from!: core.time | null;
    to!: core.time | null;
    maxRows!: number | bigint;
    mode!: core.SamplingMode;
    maxDephasing!: core.duration | null;
    tz!: core.TimeZone | null;

    static createFrom({refs, from = null, to = null, maxRows, mode, maxDephasing = null, tz = null}: {refs: globalThis.Array<core.nodeTime>, from?: core.time | null, to?: core.time | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing?: core.duration | null, tz?: core.TimeZone | null}, $g: $greycat.GreyCat = $greycat.$.default): nodeTime$sample$args {
      return new nodeTime$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[47], refs, from, to, maxRows, mode, maxDephasing, tz);
    }
    static create(refs: globalThis.Array<core.nodeTime>, from: core.time | null, to: core.time | null, maxRows: number | bigint, mode: core.SamplingMode, maxDephasing: core.duration | null = null, tz: core.TimeZone | null = null, $g: $greycat.GreyCat = $greycat.$.default): nodeTime$sample$args {
      return new nodeTime$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[47], refs, from, to, maxRows, mode, maxDephasing, tz);
    }
  }

  export class t2 extends $greycat.std_n.core.t2 {
  }

  export class FloatPrecision extends $greycat.GCEnum {
    static readonly _type = 'core::FloatPrecision';

    constructor(type: $greycat.AbiType, offset: number, public override key: FloatPrecision.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static p1($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p1'];
    }
    static p10($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p10'];
    }
    static p100($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p100'];
    }
    static p1000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p1000'];
    }
    static p10000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p10000'];
    }
    static p100000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p100000'];
    }
    static p1000000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p1000000'];
    }
    static p10000000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p10000000'];
    }
    static p100000000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p100000000'];
    }
    static p1000000000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p1000000000'];
    }
    static p10000000000($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.static_values['p10000000000'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): FloatPrecision[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[49];
      return t.enum_values as FloatPrecision[];
    }
  }

  export namespace FloatPrecision  {
    export type Field = 'p1'|'p10'|'p100'|'p1000'|'p10000'|'p100000'|'p1000000'|'p10000000'|'p100000000'|'p1000000000'|'p10000000000';
  }
  export class duration extends $greycat.std_n.core.duration {
  }

  export class t4f extends $greycat.std_n.core.t4f {
  }

  export class t2f extends $greycat.std_n.core.t2f {
  }

  export class TimeZone extends $greycat.GCEnum {
    static readonly _type = 'core::TimeZone';

    constructor(type: $greycat.AbiType, offset: number, public override key: TimeZone.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static Africa_Accra($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Accra'];
    }
    static Africa_Bamako($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Bamako'];
    }
    static Africa_Banjul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Banjul'];
    }
    static Africa_Conakry($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Conakry'];
    }
    static Africa_Dakar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Dakar'];
    }
    static Africa_Freetown($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Freetown'];
    }
    static Africa_Lome($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Lome'];
    }
    static Africa_Nouakchott($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Nouakchott'];
    }
    static Africa_Ouagadougou($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Ouagadougou'];
    }
    static Africa_Timbuktu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Timbuktu'];
    }
    static Atlantic_Reykjavik($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Reykjavik'];
    }
    static Atlantic_St_Helena($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_St_Helena'];
    }
    static Iceland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Iceland'];
    }
    static Egypt($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Egypt'];
    }
    static Africa_Maseru($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Maseru'];
    }
    static Africa_Mbabane($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Mbabane'];
    }
    static Africa_Bangui($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Bangui'];
    }
    static Africa_Brazzaville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Brazzaville'];
    }
    static Africa_Douala($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Douala'];
    }
    static Africa_Kinshasa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Kinshasa'];
    }
    static Africa_Libreville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Libreville'];
    }
    static Africa_Luanda($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Luanda'];
    }
    static Africa_Malabo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Malabo'];
    }
    static Africa_Niamey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Niamey'];
    }
    static Africa_Porto_Novo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Porto_Novo'];
    }
    static Africa_Blantyre($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Blantyre'];
    }
    static Africa_Bujumbura($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Bujumbura'];
    }
    static Africa_Gaborone($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Gaborone'];
    }
    static Africa_Harare($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Harare'];
    }
    static Africa_Kigali($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Kigali'];
    }
    static Africa_Lubumbashi($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Lubumbashi'];
    }
    static Africa_Lusaka($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Lusaka'];
    }
    static Africa_Addis_Ababa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Addis_Ababa'];
    }
    static Africa_Asmara($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Asmara'];
    }
    static Africa_Asmera($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Asmera'];
    }
    static Africa_Dar_es_Salaam($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Dar_es_Salaam'];
    }
    static Africa_Djibouti($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Djibouti'];
    }
    static Africa_Kampala($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Kampala'];
    }
    static Africa_Mogadishu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Mogadishu'];
    }
    static Indian_Antananarivo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Antananarivo'];
    }
    static Indian_Comoro($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Comoro'];
    }
    static Indian_Mayotte($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Mayotte'];
    }
    static Libya($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Libya'];
    }
    static America_Atka($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Atka'];
    }
    static US_Aleutian($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Aleutian'];
    }
    static US_Alaska($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Alaska'];
    }
    static America_Buenos_Aires($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Buenos_Aires'];
    }
    static America_Argentina_ComodRivadavia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_ComodRivadavia'];
    }
    static America_Catamarca($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Catamarca'];
    }
    static America_Cordoba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cordoba'];
    }
    static America_Rosario($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Rosario'];
    }
    static America_Jujuy($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Jujuy'];
    }
    static America_Mendoza($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Mendoza'];
    }
    static US_Central($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Central'];
    }
    static America_Shiprock($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Shiprock'];
    }
    static Navajo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Navajo'];
    }
    static US_Mountain($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Mountain'];
    }
    static US_Michigan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Michigan'];
    }
    static America_Yellowknife($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Yellowknife'];
    }
    static Canada_Mountain($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Mountain'];
    }
    static Canada_Atlantic($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Atlantic'];
    }
    static Cuba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Cuba'];
    }
    static America_Fort_Wayne($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Fort_Wayne'];
    }
    static America_Indianapolis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indianapolis'];
    }
    static US_East_Indiana($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_East_Indiana'];
    }
    static America_Knox_IN($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Knox_IN'];
    }
    static US_Indiana_Starke($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Indiana_Starke'];
    }
    static America_Pangnirtung($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Pangnirtung'];
    }
    static Jamaica($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Jamaica'];
    }
    static America_Louisville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Louisville'];
    }
    static US_Pacific($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Pacific'];
    }
    static Brazil_West($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Brazil_West'];
    }
    static Mexico_BajaSur($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Mexico_BajaSur'];
    }
    static Mexico_General($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Mexico_General'];
    }
    static US_Eastern($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Eastern'];
    }
    static Brazil_DeNoronha($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Brazil_DeNoronha'];
    }
    static America_Godthab($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Godthab'];
    }
    static America_Atikokan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Atikokan'];
    }
    static America_Cayman($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cayman'];
    }
    static America_Coral_Harbour($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Coral_Harbour'];
    }
    static America_Creston($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Creston'];
    }
    static US_Arizona($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Arizona'];
    }
    static America_Anguilla($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Anguilla'];
    }
    static America_Antigua($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Antigua'];
    }
    static America_Aruba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Aruba'];
    }
    static America_Blanc_Sablon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Blanc_Sablon'];
    }
    static America_Curacao($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Curacao'];
    }
    static America_Dominica($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Dominica'];
    }
    static America_Grenada($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Grenada'];
    }
    static America_Guadeloupe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Guadeloupe'];
    }
    static America_Kralendijk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Kralendijk'];
    }
    static America_Lower_Princes($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Lower_Princes'];
    }
    static America_Marigot($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Marigot'];
    }
    static America_Montserrat($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Montserrat'];
    }
    static America_Port_of_Spain($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Port_of_Spain'];
    }
    static America_St_Barthelemy($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Barthelemy'];
    }
    static America_St_Kitts($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Kitts'];
    }
    static America_St_Lucia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Lucia'];
    }
    static America_St_Thomas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Thomas'];
    }
    static America_St_Vincent($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Vincent'];
    }
    static America_Tortola($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Tortola'];
    }
    static America_Virgin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Virgin'];
    }
    static Canada_Saskatchewan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Saskatchewan'];
    }
    static America_Porto_Acre($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Porto_Acre'];
    }
    static Brazil_Acre($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Brazil_Acre'];
    }
    static Chile_Continental($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Chile_Continental'];
    }
    static Brazil_East($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Brazil_East'];
    }
    static Canada_Newfoundland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Newfoundland'];
    }
    static America_Ensenada($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Ensenada'];
    }
    static America_Santa_Isabel($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Santa_Isabel'];
    }
    static Mexico_BajaNorte($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Mexico_BajaNorte'];
    }
    static America_Montreal($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Montreal'];
    }
    static America_Nassau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Nassau'];
    }
    static America_Nipigon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Nipigon'];
    }
    static America_Thunder_Bay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Thunder_Bay'];
    }
    static Canada_Eastern($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Eastern'];
    }
    static Canada_Pacific($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Pacific'];
    }
    static Canada_Yukon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Yukon'];
    }
    static America_Rainy_River($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Rainy_River'];
    }
    static Canada_Central($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Canada_Central'];
    }
    static Asia_Ashkhabad($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ashkhabad'];
    }
    static Asia_Phnom_Penh($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Phnom_Penh'];
    }
    static Asia_Vientiane($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Vientiane'];
    }
    static Indian_Christmas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Christmas'];
    }
    static Asia_Dacca($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Dacca'];
    }
    static Asia_Muscat($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Muscat'];
    }
    static Indian_Mahe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Mahe'];
    }
    static Indian_Reunion($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Reunion'];
    }
    static Asia_Saigon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Saigon'];
    }
    static Hongkong($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Hongkong'];
    }
    static Asia_Tel_Aviv($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tel_Aviv'];
    }
    static Israel($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Israel'];
    }
    static Asia_Katmandu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Katmandu'];
    }
    static Asia_Calcutta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Calcutta'];
    }
    static Asia_Brunei($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Brunei'];
    }
    static Asia_Macao($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Macao'];
    }
    static Asia_Ujung_Pandang($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ujung_Pandang'];
    }
    static Europe_Nicosia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Nicosia'];
    }
    static Asia_Bahrain($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Bahrain'];
    }
    static Antarctica_Syowa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Syowa'];
    }
    static Asia_Aden($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Aden'];
    }
    static Asia_Kuwait($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kuwait'];
    }
    static ROK($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['ROK'];
    }
    static Asia_Chongqing($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Chongqing'];
    }
    static Asia_Chungking($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Chungking'];
    }
    static Asia_Harbin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Harbin'];
    }
    static PRC($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['PRC'];
    }
    static Asia_Kuala_Lumpur($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kuala_Lumpur'];
    }
    static Singapore($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Singapore'];
    }
    static ROC($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['ROC'];
    }
    static Iran($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Iran'];
    }
    static Asia_Thimbu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Thimbu'];
    }
    static Japan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Japan'];
    }
    static Asia_Ulan_Bator($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ulan_Bator'];
    }
    static Asia_Kashgar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kashgar'];
    }
    static Asia_Rangoon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Rangoon'];
    }
    static Indian_Cocos($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Cocos'];
    }
    static Atlantic_Faeroe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Faeroe'];
    }
    static Australia_South($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_South'];
    }
    static Australia_Queensland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Queensland'];
    }
    static Australia_Yancowinna($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Yancowinna'];
    }
    static Australia_North($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_North'];
    }
    static Australia_Currie($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Currie'];
    }
    static Australia_Tasmania($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Tasmania'];
    }
    static Australia_LHI($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_LHI'];
    }
    static Australia_Victoria($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Victoria'];
    }
    static Australia_West($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_West'];
    }
    static Australia_ACT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_ACT'];
    }
    static Australia_Canberra($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Canberra'];
    }
    static Australia_NSW($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_NSW'];
    }
    static GMT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GMT'];
    }
    static GMTx0($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GMTx0'];
    }
    static GMT_0($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GMT_0'];
    }
    static GMT0($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GMT0'];
    }
    static Greenwich($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Greenwich'];
    }
    static UCT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['UCT'];
    }
    static UTC($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['UTC'];
    }
    static Universal($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Universal'];
    }
    static Zulu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Zulu'];
    }
    static Europe_Ljubljana($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Ljubljana'];
    }
    static Europe_Podgorica($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Podgorica'];
    }
    static Europe_Sarajevo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Sarajevo'];
    }
    static Europe_Skopje($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Skopje'];
    }
    static Europe_Zagreb($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Zagreb'];
    }
    static Arctic_Longyearbyen($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Arctic_Longyearbyen'];
    }
    static Atlantic_Jan_Mayen($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Jan_Mayen'];
    }
    static Europe_Copenhagen($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Copenhagen'];
    }
    static Europe_Oslo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Oslo'];
    }
    static Europe_Stockholm($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Stockholm'];
    }
    static Europe_Amsterdam($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Amsterdam'];
    }
    static Europe_Luxembourg($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Luxembourg'];
    }
    static Europe_Tiraspol($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Tiraspol'];
    }
    static Eire($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Eire'];
    }
    static Europe_Mariehamn($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Mariehamn'];
    }
    static Asia_Istanbul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Istanbul'];
    }
    static Turkey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Turkey'];
    }
    static Europe_Kiev($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Kiev'];
    }
    static Europe_Uzhgorod($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Uzhgorod'];
    }
    static Europe_Zaporozhye($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Zaporozhye'];
    }
    static Portugal($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Portugal'];
    }
    static Europe_Belfast($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Belfast'];
    }
    static Europe_Guernsey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Guernsey'];
    }
    static Europe_Isle_of_Man($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Isle_of_Man'];
    }
    static Europe_Jersey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Jersey'];
    }
    static GB($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GB'];
    }
    static GB_Eire($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['GB_Eire'];
    }
    static W_SU($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['W_SU'];
    }
    static Europe_Monaco($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Monaco'];
    }
    static Europe_Bratislava($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Bratislava'];
    }
    static Europe_San_Marino($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_San_Marino'];
    }
    static Europe_Vatican($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Vatican'];
    }
    static Poland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Poland'];
    }
    static Europe_Busingen($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Busingen'];
    }
    static Europe_Vaduz($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Vaduz'];
    }
    static Indian_Kerguelen($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Kerguelen'];
    }
    static Antarctica_McMurdo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_McMurdo'];
    }
    static Antarctica_South_Pole($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_South_Pole'];
    }
    static NZ($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['NZ'];
    }
    static NZ_CHAT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['NZ_CHAT'];
    }
    static Chile_EasterIsland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Chile_EasterIsland'];
    }
    static Pacific_Pohnpei($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Pohnpei'];
    }
    static Pacific_Ponape($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Ponape'];
    }
    static Pacific_Saipan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Saipan'];
    }
    static Pacific_Johnston($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Johnston'];
    }
    static US_Hawaii($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Hawaii'];
    }
    static Pacific_Enderbury($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Enderbury'];
    }
    static Kwajalein($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Kwajalein'];
    }
    static Pacific_Midway($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Midway'];
    }
    static Pacific_Samoa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Samoa'];
    }
    static US_Samoa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['US_Samoa'];
    }
    static Antarctica_DumontDUrville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_DumontDUrville'];
    }
    static Pacific_Chuuk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Chuuk'];
    }
    static Pacific_Truk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Truk'];
    }
    static Pacific_Yap($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Yap'];
    }
    static Pacific_Funafuti($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Funafuti'];
    }
    static Pacific_Majuro($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Majuro'];
    }
    static Pacific_Wake($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Wake'];
    }
    static Pacific_Wallis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Wallis'];
    }
    static Africa_Abidjan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Abidjan'];
    }
    static Africa_Algiers($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Algiers'];
    }
    static Africa_Bissau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Bissau'];
    }
    static Africa_Cairo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Cairo'];
    }
    static Africa_Casablanca($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Casablanca'];
    }
    static Africa_Ceuta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Ceuta'];
    }
    static Africa_El_Aaiun($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_El_Aaiun'];
    }
    static Africa_Johannesburg($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Johannesburg'];
    }
    static Africa_Juba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Juba'];
    }
    static Africa_Khartoum($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Khartoum'];
    }
    static Africa_Lagos($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Lagos'];
    }
    static Africa_Maputo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Maputo'];
    }
    static Africa_Monrovia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Monrovia'];
    }
    static Africa_Nairobi($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Nairobi'];
    }
    static Africa_Ndjamena($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Ndjamena'];
    }
    static Africa_Sao_Tome($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Sao_Tome'];
    }
    static Africa_Tripoli($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Tripoli'];
    }
    static Africa_Tunis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Tunis'];
    }
    static Africa_Windhoek($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Africa_Windhoek'];
    }
    static America_Adak($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Adak'];
    }
    static America_Anchorage($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Anchorage'];
    }
    static America_Araguaina($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Araguaina'];
    }
    static America_Argentina_Buenos_Aires($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Buenos_Aires'];
    }
    static America_Argentina_Catamarca($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Catamarca'];
    }
    static America_Argentina_Cordoba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Cordoba'];
    }
    static America_Argentina_Jujuy($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Jujuy'];
    }
    static America_Argentina_La_Rioja($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_La_Rioja'];
    }
    static America_Argentina_Mendoza($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Mendoza'];
    }
    static America_Argentina_Rio_Gallegos($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Rio_Gallegos'];
    }
    static America_Argentina_Salta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Salta'];
    }
    static America_Argentina_San_Juan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_San_Juan'];
    }
    static America_Argentina_San_Luis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_San_Luis'];
    }
    static America_Argentina_Tucuman($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Tucuman'];
    }
    static America_Argentina_Ushuaia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Argentina_Ushuaia'];
    }
    static America_Asuncion($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Asuncion'];
    }
    static America_Bahia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Bahia'];
    }
    static America_Bahia_Banderas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Bahia_Banderas'];
    }
    static America_Barbados($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Barbados'];
    }
    static America_Belem($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Belem'];
    }
    static America_Belize($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Belize'];
    }
    static America_Boa_Vista($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Boa_Vista'];
    }
    static America_Bogota($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Bogota'];
    }
    static America_Boise($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Boise'];
    }
    static America_Cambridge_Bay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cambridge_Bay'];
    }
    static America_Campo_Grande($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Campo_Grande'];
    }
    static America_Cancun($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cancun'];
    }
    static America_Caracas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Caracas'];
    }
    static America_Cayenne($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cayenne'];
    }
    static America_Chicago($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Chicago'];
    }
    static America_Chihuahua($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Chihuahua'];
    }
    static America_Ciudad_Juarez($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Ciudad_Juarez'];
    }
    static America_Costa_Rica($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Costa_Rica'];
    }
    static America_Cuiaba($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Cuiaba'];
    }
    static America_Danmarkshavn($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Danmarkshavn'];
    }
    static America_Dawson($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Dawson'];
    }
    static America_Dawson_Creek($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Dawson_Creek'];
    }
    static America_Denver($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Denver'];
    }
    static America_Detroit($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Detroit'];
    }
    static America_Edmonton($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Edmonton'];
    }
    static America_Eirunepe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Eirunepe'];
    }
    static America_El_Salvador($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_El_Salvador'];
    }
    static America_Fort_Nelson($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Fort_Nelson'];
    }
    static America_Fortaleza($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Fortaleza'];
    }
    static America_Glace_Bay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Glace_Bay'];
    }
    static America_Goose_Bay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Goose_Bay'];
    }
    static America_Grand_Turk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Grand_Turk'];
    }
    static America_Guatemala($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Guatemala'];
    }
    static America_Guayaquil($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Guayaquil'];
    }
    static America_Guyana($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Guyana'];
    }
    static America_Halifax($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Halifax'];
    }
    static America_Havana($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Havana'];
    }
    static America_Hermosillo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Hermosillo'];
    }
    static America_Indiana_Indianapolis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Indianapolis'];
    }
    static America_Indiana_Knox($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Knox'];
    }
    static America_Indiana_Marengo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Marengo'];
    }
    static America_Indiana_Petersburg($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Petersburg'];
    }
    static America_Indiana_Tell_City($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Tell_City'];
    }
    static America_Indiana_Vevay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Vevay'];
    }
    static America_Indiana_Vincennes($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Vincennes'];
    }
    static America_Indiana_Winamac($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Indiana_Winamac'];
    }
    static America_Inuvik($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Inuvik'];
    }
    static America_Iqaluit($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Iqaluit'];
    }
    static America_Jamaica($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Jamaica'];
    }
    static America_Juneau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Juneau'];
    }
    static America_Kentucky_Louisville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Kentucky_Louisville'];
    }
    static America_Kentucky_Monticello($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Kentucky_Monticello'];
    }
    static America_La_Paz($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_La_Paz'];
    }
    static America_Lima($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Lima'];
    }
    static America_Los_Angeles($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Los_Angeles'];
    }
    static America_Maceio($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Maceio'];
    }
    static America_Managua($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Managua'];
    }
    static America_Manaus($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Manaus'];
    }
    static America_Martinique($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Martinique'];
    }
    static America_Matamoros($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Matamoros'];
    }
    static America_Mazatlan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Mazatlan'];
    }
    static America_Menominee($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Menominee'];
    }
    static America_Merida($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Merida'];
    }
    static America_Metlakatla($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Metlakatla'];
    }
    static America_Mexico_City($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Mexico_City'];
    }
    static America_Miquelon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Miquelon'];
    }
    static America_Moncton($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Moncton'];
    }
    static America_Monterrey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Monterrey'];
    }
    static America_Montevideo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Montevideo'];
    }
    static America_New_York($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_New_York'];
    }
    static America_Nome($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Nome'];
    }
    static America_Noronha($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Noronha'];
    }
    static America_North_Dakota_Beulah($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_North_Dakota_Beulah'];
    }
    static America_North_Dakota_Center($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_North_Dakota_Center'];
    }
    static America_North_Dakota_New_Salem($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_North_Dakota_New_Salem'];
    }
    static America_Nuuk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Nuuk'];
    }
    static America_Ojinaga($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Ojinaga'];
    }
    static America_Panama($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Panama'];
    }
    static America_Paramaribo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Paramaribo'];
    }
    static America_Phoenix($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Phoenix'];
    }
    static America_Port_au_Prince($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Port_au_Prince'];
    }
    static America_Porto_Velho($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Porto_Velho'];
    }
    static America_Puerto_Rico($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Puerto_Rico'];
    }
    static America_Punta_Arenas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Punta_Arenas'];
    }
    static America_Rankin_Inlet($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Rankin_Inlet'];
    }
    static America_Recife($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Recife'];
    }
    static America_Regina($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Regina'];
    }
    static America_Resolute($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Resolute'];
    }
    static America_Rio_Branco($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Rio_Branco'];
    }
    static America_Santarem($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Santarem'];
    }
    static America_Santiago($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Santiago'];
    }
    static America_Santo_Domingo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Santo_Domingo'];
    }
    static America_Sao_Paulo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Sao_Paulo'];
    }
    static America_Scoresbysund($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Scoresbysund'];
    }
    static America_Sitka($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Sitka'];
    }
    static America_St_Johns($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_St_Johns'];
    }
    static America_Swift_Current($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Swift_Current'];
    }
    static America_Tegucigalpa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Tegucigalpa'];
    }
    static America_Thule($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Thule'];
    }
    static America_Tijuana($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Tijuana'];
    }
    static America_Toronto($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Toronto'];
    }
    static America_Vancouver($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Vancouver'];
    }
    static America_Whitehorse($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Whitehorse'];
    }
    static America_Winnipeg($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Winnipeg'];
    }
    static America_Yakutat($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['America_Yakutat'];
    }
    static Antarctica_Casey($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Casey'];
    }
    static Antarctica_Davis($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Davis'];
    }
    static Antarctica_Macquarie($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Macquarie'];
    }
    static Antarctica_Mawson($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Mawson'];
    }
    static Antarctica_Palmer($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Palmer'];
    }
    static Antarctica_Rothera($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Rothera'];
    }
    static Antarctica_Troll($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Troll'];
    }
    static Antarctica_Vostok($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Antarctica_Vostok'];
    }
    static Asia_Almaty($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Almaty'];
    }
    static Asia_Amman($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Amman'];
    }
    static Asia_Anadyr($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Anadyr'];
    }
    static Asia_Aqtau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Aqtau'];
    }
    static Asia_Aqtobe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Aqtobe'];
    }
    static Asia_Ashgabat($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ashgabat'];
    }
    static Asia_Atyrau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Atyrau'];
    }
    static Asia_Baghdad($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Baghdad'];
    }
    static Asia_Baku($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Baku'];
    }
    static Asia_Bangkok($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Bangkok'];
    }
    static Asia_Barnaul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Barnaul'];
    }
    static Asia_Beirut($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Beirut'];
    }
    static Asia_Bishkek($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Bishkek'];
    }
    static Asia_Chita($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Chita'];
    }
    static Asia_Choibalsan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Choibalsan'];
    }
    static Asia_Colombo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Colombo'];
    }
    static Asia_Damascus($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Damascus'];
    }
    static Asia_Dhaka($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Dhaka'];
    }
    static Asia_Dili($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Dili'];
    }
    static Asia_Dubai($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Dubai'];
    }
    static Asia_Dushanbe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Dushanbe'];
    }
    static Asia_Famagusta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Famagusta'];
    }
    static Asia_Gaza($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Gaza'];
    }
    static Asia_Hebron($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Hebron'];
    }
    static Asia_Ho_Chi_Minh($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ho_Chi_Minh'];
    }
    static Asia_Hong_Kong($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Hong_Kong'];
    }
    static Asia_Hovd($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Hovd'];
    }
    static Asia_Irkutsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Irkutsk'];
    }
    static Asia_Jakarta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Jakarta'];
    }
    static Asia_Jayapura($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Jayapura'];
    }
    static Asia_Jerusalem($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Jerusalem'];
    }
    static Asia_Kabul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kabul'];
    }
    static Asia_Kamchatka($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kamchatka'];
    }
    static Asia_Karachi($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Karachi'];
    }
    static Asia_Kathmandu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kathmandu'];
    }
    static Asia_Khandyga($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Khandyga'];
    }
    static Asia_Kolkata($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kolkata'];
    }
    static Asia_Krasnoyarsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Krasnoyarsk'];
    }
    static Asia_Kuching($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Kuching'];
    }
    static Asia_Macau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Macau'];
    }
    static Asia_Magadan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Magadan'];
    }
    static Asia_Makassar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Makassar'];
    }
    static Asia_Manila($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Manila'];
    }
    static Asia_Nicosia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Nicosia'];
    }
    static Asia_Novokuznetsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Novokuznetsk'];
    }
    static Asia_Novosibirsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Novosibirsk'];
    }
    static Asia_Omsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Omsk'];
    }
    static Asia_Oral($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Oral'];
    }
    static Asia_Pontianak($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Pontianak'];
    }
    static Asia_Pyongyang($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Pyongyang'];
    }
    static Asia_Qatar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Qatar'];
    }
    static Asia_Qostanay($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Qostanay'];
    }
    static Asia_Qyzylorda($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Qyzylorda'];
    }
    static Asia_Riyadh($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Riyadh'];
    }
    static Asia_Sakhalin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Sakhalin'];
    }
    static Asia_Samarkand($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Samarkand'];
    }
    static Asia_Seoul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Seoul'];
    }
    static Asia_Shanghai($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Shanghai'];
    }
    static Asia_Singapore($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Singapore'];
    }
    static Asia_Srednekolymsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Srednekolymsk'];
    }
    static Asia_Taipei($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Taipei'];
    }
    static Asia_Tashkent($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tashkent'];
    }
    static Asia_Tbilisi($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tbilisi'];
    }
    static Asia_Tehran($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tehran'];
    }
    static Asia_Thimphu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Thimphu'];
    }
    static Asia_Tokyo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tokyo'];
    }
    static Asia_Tomsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Tomsk'];
    }
    static Asia_Ulaanbaatar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ulaanbaatar'];
    }
    static Asia_Urumqi($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Urumqi'];
    }
    static Asia_Ust_Nera($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Ust_Nera'];
    }
    static Asia_Vladivostok($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Vladivostok'];
    }
    static Asia_Yakutsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Yakutsk'];
    }
    static Asia_Yangon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Yangon'];
    }
    static Asia_Yekaterinburg($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Yekaterinburg'];
    }
    static Asia_Yerevan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Asia_Yerevan'];
    }
    static Atlantic_Azores($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Azores'];
    }
    static Atlantic_Bermuda($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Bermuda'];
    }
    static Atlantic_Canary($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Canary'];
    }
    static Atlantic_Cape_Verde($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Cape_Verde'];
    }
    static Atlantic_Faroe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Faroe'];
    }
    static Atlantic_Madeira($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Madeira'];
    }
    static Atlantic_South_Georgia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_South_Georgia'];
    }
    static Atlantic_Stanley($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Atlantic_Stanley'];
    }
    static Australia_Adelaide($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Adelaide'];
    }
    static Australia_Brisbane($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Brisbane'];
    }
    static Australia_Broken_Hill($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Broken_Hill'];
    }
    static Australia_Darwin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Darwin'];
    }
    static Australia_Eucla($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Eucla'];
    }
    static Australia_Hobart($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Hobart'];
    }
    static Australia_Lindeman($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Lindeman'];
    }
    static Australia_Lord_Howe($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Lord_Howe'];
    }
    static Australia_Melbourne($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Melbourne'];
    }
    static Australia_Perth($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Perth'];
    }
    static Australia_Sydney($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Australia_Sydney'];
    }
    static CET($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['CET'];
    }
    static CST6CDT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['CST6CDT'];
    }
    static EET($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['EET'];
    }
    static EST($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['EST'];
    }
    static EST5EDT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['EST5EDT'];
    }
    static Europe_Andorra($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Andorra'];
    }
    static Europe_Astrakhan($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Astrakhan'];
    }
    static Europe_Athens($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Athens'];
    }
    static Europe_Belgrade($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Belgrade'];
    }
    static Europe_Berlin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Berlin'];
    }
    static Europe_Brussels($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Brussels'];
    }
    static Europe_Bucharest($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Bucharest'];
    }
    static Europe_Budapest($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Budapest'];
    }
    static Europe_Chisinau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Chisinau'];
    }
    static Europe_Dublin($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Dublin'];
    }
    static Europe_Gibraltar($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Gibraltar'];
    }
    static Europe_Helsinki($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Helsinki'];
    }
    static Europe_Istanbul($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Istanbul'];
    }
    static Europe_Kaliningrad($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Kaliningrad'];
    }
    static Europe_Kirov($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Kirov'];
    }
    static Europe_Kyiv($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Kyiv'];
    }
    static Europe_Lisbon($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Lisbon'];
    }
    static Europe_London($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_London'];
    }
    static Europe_Madrid($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Madrid'];
    }
    static Europe_Malta($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Malta'];
    }
    static Europe_Minsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Minsk'];
    }
    static Europe_Moscow($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Moscow'];
    }
    static Europe_Paris($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Paris'];
    }
    static Europe_Prague($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Prague'];
    }
    static Europe_Riga($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Riga'];
    }
    static Europe_Rome($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Rome'];
    }
    static Europe_Samara($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Samara'];
    }
    static Europe_Saratov($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Saratov'];
    }
    static Europe_Simferopol($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Simferopol'];
    }
    static Europe_Sofia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Sofia'];
    }
    static Europe_Tallinn($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Tallinn'];
    }
    static Europe_Tirane($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Tirane'];
    }
    static Europe_Ulyanovsk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Ulyanovsk'];
    }
    static Europe_Vienna($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Vienna'];
    }
    static Europe_Vilnius($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Vilnius'];
    }
    static Europe_Volgograd($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Volgograd'];
    }
    static Europe_Warsaw($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Warsaw'];
    }
    static Europe_Zurich($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Europe_Zurich'];
    }
    static Factory($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Factory'];
    }
    static HST($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['HST'];
    }
    static Indian_Chagos($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Chagos'];
    }
    static Indian_Maldives($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Maldives'];
    }
    static Indian_Mauritius($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Indian_Mauritius'];
    }
    static MET($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['MET'];
    }
    static MST($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['MST'];
    }
    static MST7MDT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['MST7MDT'];
    }
    static PST8PDT($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['PST8PDT'];
    }
    static Pacific_Apia($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Apia'];
    }
    static Pacific_Auckland($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Auckland'];
    }
    static Pacific_Bougainville($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Bougainville'];
    }
    static Pacific_Chatham($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Chatham'];
    }
    static Pacific_Easter($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Easter'];
    }
    static Pacific_Efate($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Efate'];
    }
    static Pacific_Fakaofo($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Fakaofo'];
    }
    static Pacific_Fiji($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Fiji'];
    }
    static Pacific_Galapagos($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Galapagos'];
    }
    static Pacific_Gambier($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Gambier'];
    }
    static Pacific_Guadalcanal($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Guadalcanal'];
    }
    static Pacific_Guam($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Guam'];
    }
    static Pacific_Honolulu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Honolulu'];
    }
    static Pacific_Kanton($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Kanton'];
    }
    static Pacific_Kiritimati($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Kiritimati'];
    }
    static Pacific_Kosrae($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Kosrae'];
    }
    static Pacific_Kwajalein($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Kwajalein'];
    }
    static Pacific_Marquesas($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Marquesas'];
    }
    static Pacific_Nauru($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Nauru'];
    }
    static Pacific_Niue($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Niue'];
    }
    static Pacific_Norfolk($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Norfolk'];
    }
    static Pacific_Noumea($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Noumea'];
    }
    static Pacific_Pago_Pago($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Pago_Pago'];
    }
    static Pacific_Palau($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Palau'];
    }
    static Pacific_Pitcairn($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Pitcairn'];
    }
    static Pacific_Port_Moresby($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Port_Moresby'];
    }
    static Pacific_Rarotonga($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Rarotonga'];
    }
    static Pacific_Tahiti($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Tahiti'];
    }
    static Pacific_Tarawa($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Tarawa'];
    }
    static Pacific_Tongatapu($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['Pacific_Tongatapu'];
    }
    static WET($g: $greycat.GreyCat = $greycat.$.default): TimeZone {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.static_values['WET'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): TimeZone[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[53];
      return t.enum_values as TimeZone[];
    }
  }

  export namespace TimeZone  {
    export type Field = 'Africa_Accra'|'Africa_Bamako'|'Africa_Banjul'|'Africa_Conakry'|'Africa_Dakar'|'Africa_Freetown'|'Africa_Lome'|'Africa_Nouakchott'|'Africa_Ouagadougou'|'Africa_Timbuktu'|'Atlantic_Reykjavik'|'Atlantic_St_Helena'|'Iceland'|'Egypt'|'Africa_Maseru'|'Africa_Mbabane'|'Africa_Bangui'|'Africa_Brazzaville'|'Africa_Douala'|'Africa_Kinshasa'|'Africa_Libreville'|'Africa_Luanda'|'Africa_Malabo'|'Africa_Niamey'|'Africa_Porto_Novo'|'Africa_Blantyre'|'Africa_Bujumbura'|'Africa_Gaborone'|'Africa_Harare'|'Africa_Kigali'|'Africa_Lubumbashi'|'Africa_Lusaka'|'Africa_Addis_Ababa'|'Africa_Asmara'|'Africa_Asmera'|'Africa_Dar_es_Salaam'|'Africa_Djibouti'|'Africa_Kampala'|'Africa_Mogadishu'|'Indian_Antananarivo'|'Indian_Comoro'|'Indian_Mayotte'|'Libya'|'America_Atka'|'US_Aleutian'|'US_Alaska'|'America_Buenos_Aires'|'America_Argentina_ComodRivadavia'|'America_Catamarca'|'America_Cordoba'|'America_Rosario'|'America_Jujuy'|'America_Mendoza'|'US_Central'|'America_Shiprock'|'Navajo'|'US_Mountain'|'US_Michigan'|'America_Yellowknife'|'Canada_Mountain'|'Canada_Atlantic'|'Cuba'|'America_Fort_Wayne'|'America_Indianapolis'|'US_East_Indiana'|'America_Knox_IN'|'US_Indiana_Starke'|'America_Pangnirtung'|'Jamaica'|'America_Louisville'|'US_Pacific'|'Brazil_West'|'Mexico_BajaSur'|'Mexico_General'|'US_Eastern'|'Brazil_DeNoronha'|'America_Godthab'|'America_Atikokan'|'America_Cayman'|'America_Coral_Harbour'|'America_Creston'|'US_Arizona'|'America_Anguilla'|'America_Antigua'|'America_Aruba'|'America_Blanc_Sablon'|'America_Curacao'|'America_Dominica'|'America_Grenada'|'America_Guadeloupe'|'America_Kralendijk'|'America_Lower_Princes'|'America_Marigot'|'America_Montserrat'|'America_Port_of_Spain'|'America_St_Barthelemy'|'America_St_Kitts'|'America_St_Lucia'|'America_St_Thomas'|'America_St_Vincent'|'America_Tortola'|'America_Virgin'|'Canada_Saskatchewan'|'America_Porto_Acre'|'Brazil_Acre'|'Chile_Continental'|'Brazil_East'|'Canada_Newfoundland'|'America_Ensenada'|'America_Santa_Isabel'|'Mexico_BajaNorte'|'America_Montreal'|'America_Nassau'|'America_Nipigon'|'America_Thunder_Bay'|'Canada_Eastern'|'Canada_Pacific'|'Canada_Yukon'|'America_Rainy_River'|'Canada_Central'|'Asia_Ashkhabad'|'Asia_Phnom_Penh'|'Asia_Vientiane'|'Indian_Christmas'|'Asia_Dacca'|'Asia_Muscat'|'Indian_Mahe'|'Indian_Reunion'|'Asia_Saigon'|'Hongkong'|'Asia_Tel_Aviv'|'Israel'|'Asia_Katmandu'|'Asia_Calcutta'|'Asia_Brunei'|'Asia_Macao'|'Asia_Ujung_Pandang'|'Europe_Nicosia'|'Asia_Bahrain'|'Antarctica_Syowa'|'Asia_Aden'|'Asia_Kuwait'|'ROK'|'Asia_Chongqing'|'Asia_Chungking'|'Asia_Harbin'|'PRC'|'Asia_Kuala_Lumpur'|'Singapore'|'ROC'|'Iran'|'Asia_Thimbu'|'Japan'|'Asia_Ulan_Bator'|'Asia_Kashgar'|'Asia_Rangoon'|'Indian_Cocos'|'Atlantic_Faeroe'|'Australia_South'|'Australia_Queensland'|'Australia_Yancowinna'|'Australia_North'|'Australia_Currie'|'Australia_Tasmania'|'Australia_LHI'|'Australia_Victoria'|'Australia_West'|'Australia_ACT'|'Australia_Canberra'|'Australia_NSW'|'GMT'|'GMTx0'|'GMT_0'|'GMT0'|'Greenwich'|'UCT'|'UTC'|'Universal'|'Zulu'|'Europe_Ljubljana'|'Europe_Podgorica'|'Europe_Sarajevo'|'Europe_Skopje'|'Europe_Zagreb'|'Arctic_Longyearbyen'|'Atlantic_Jan_Mayen'|'Europe_Copenhagen'|'Europe_Oslo'|'Europe_Stockholm'|'Europe_Amsterdam'|'Europe_Luxembourg'|'Europe_Tiraspol'|'Eire'|'Europe_Mariehamn'|'Asia_Istanbul'|'Turkey'|'Europe_Kiev'|'Europe_Uzhgorod'|'Europe_Zaporozhye'|'Portugal'|'Europe_Belfast'|'Europe_Guernsey'|'Europe_Isle_of_Man'|'Europe_Jersey'|'GB'|'GB_Eire'|'W_SU'|'Europe_Monaco'|'Europe_Bratislava'|'Europe_San_Marino'|'Europe_Vatican'|'Poland'|'Europe_Busingen'|'Europe_Vaduz'|'Indian_Kerguelen'|'Antarctica_McMurdo'|'Antarctica_South_Pole'|'NZ'|'NZ_CHAT'|'Chile_EasterIsland'|'Pacific_Pohnpei'|'Pacific_Ponape'|'Pacific_Saipan'|'Pacific_Johnston'|'US_Hawaii'|'Pacific_Enderbury'|'Kwajalein'|'Pacific_Midway'|'Pacific_Samoa'|'US_Samoa'|'Antarctica_DumontDUrville'|'Pacific_Chuuk'|'Pacific_Truk'|'Pacific_Yap'|'Pacific_Funafuti'|'Pacific_Majuro'|'Pacific_Wake'|'Pacific_Wallis'|'Africa_Abidjan'|'Africa_Algiers'|'Africa_Bissau'|'Africa_Cairo'|'Africa_Casablanca'|'Africa_Ceuta'|'Africa_El_Aaiun'|'Africa_Johannesburg'|'Africa_Juba'|'Africa_Khartoum'|'Africa_Lagos'|'Africa_Maputo'|'Africa_Monrovia'|'Africa_Nairobi'|'Africa_Ndjamena'|'Africa_Sao_Tome'|'Africa_Tripoli'|'Africa_Tunis'|'Africa_Windhoek'|'America_Adak'|'America_Anchorage'|'America_Araguaina'|'America_Argentina_Buenos_Aires'|'America_Argentina_Catamarca'|'America_Argentina_Cordoba'|'America_Argentina_Jujuy'|'America_Argentina_La_Rioja'|'America_Argentina_Mendoza'|'America_Argentina_Rio_Gallegos'|'America_Argentina_Salta'|'America_Argentina_San_Juan'|'America_Argentina_San_Luis'|'America_Argentina_Tucuman'|'America_Argentina_Ushuaia'|'America_Asuncion'|'America_Bahia'|'America_Bahia_Banderas'|'America_Barbados'|'America_Belem'|'America_Belize'|'America_Boa_Vista'|'America_Bogota'|'America_Boise'|'America_Cambridge_Bay'|'America_Campo_Grande'|'America_Cancun'|'America_Caracas'|'America_Cayenne'|'America_Chicago'|'America_Chihuahua'|'America_Ciudad_Juarez'|'America_Costa_Rica'|'America_Cuiaba'|'America_Danmarkshavn'|'America_Dawson'|'America_Dawson_Creek'|'America_Denver'|'America_Detroit'|'America_Edmonton'|'America_Eirunepe'|'America_El_Salvador'|'America_Fort_Nelson'|'America_Fortaleza'|'America_Glace_Bay'|'America_Goose_Bay'|'America_Grand_Turk'|'America_Guatemala'|'America_Guayaquil'|'America_Guyana'|'America_Halifax'|'America_Havana'|'America_Hermosillo'|'America_Indiana_Indianapolis'|'America_Indiana_Knox'|'America_Indiana_Marengo'|'America_Indiana_Petersburg'|'America_Indiana_Tell_City'|'America_Indiana_Vevay'|'America_Indiana_Vincennes'|'America_Indiana_Winamac'|'America_Inuvik'|'America_Iqaluit'|'America_Jamaica'|'America_Juneau'|'America_Kentucky_Louisville'|'America_Kentucky_Monticello'|'America_La_Paz'|'America_Lima'|'America_Los_Angeles'|'America_Maceio'|'America_Managua'|'America_Manaus'|'America_Martinique'|'America_Matamoros'|'America_Mazatlan'|'America_Menominee'|'America_Merida'|'America_Metlakatla'|'America_Mexico_City'|'America_Miquelon'|'America_Moncton'|'America_Monterrey'|'America_Montevideo'|'America_New_York'|'America_Nome'|'America_Noronha'|'America_North_Dakota_Beulah'|'America_North_Dakota_Center'|'America_North_Dakota_New_Salem'|'America_Nuuk'|'America_Ojinaga'|'America_Panama'|'America_Paramaribo'|'America_Phoenix'|'America_Port_au_Prince'|'America_Porto_Velho'|'America_Puerto_Rico'|'America_Punta_Arenas'|'America_Rankin_Inlet'|'America_Recife'|'America_Regina'|'America_Resolute'|'America_Rio_Branco'|'America_Santarem'|'America_Santiago'|'America_Santo_Domingo'|'America_Sao_Paulo'|'America_Scoresbysund'|'America_Sitka'|'America_St_Johns'|'America_Swift_Current'|'America_Tegucigalpa'|'America_Thule'|'America_Tijuana'|'America_Toronto'|'America_Vancouver'|'America_Whitehorse'|'America_Winnipeg'|'America_Yakutat'|'Antarctica_Casey'|'Antarctica_Davis'|'Antarctica_Macquarie'|'Antarctica_Mawson'|'Antarctica_Palmer'|'Antarctica_Rothera'|'Antarctica_Troll'|'Antarctica_Vostok'|'Asia_Almaty'|'Asia_Amman'|'Asia_Anadyr'|'Asia_Aqtau'|'Asia_Aqtobe'|'Asia_Ashgabat'|'Asia_Atyrau'|'Asia_Baghdad'|'Asia_Baku'|'Asia_Bangkok'|'Asia_Barnaul'|'Asia_Beirut'|'Asia_Bishkek'|'Asia_Chita'|'Asia_Choibalsan'|'Asia_Colombo'|'Asia_Damascus'|'Asia_Dhaka'|'Asia_Dili'|'Asia_Dubai'|'Asia_Dushanbe'|'Asia_Famagusta'|'Asia_Gaza'|'Asia_Hebron'|'Asia_Ho_Chi_Minh'|'Asia_Hong_Kong'|'Asia_Hovd'|'Asia_Irkutsk'|'Asia_Jakarta'|'Asia_Jayapura'|'Asia_Jerusalem'|'Asia_Kabul'|'Asia_Kamchatka'|'Asia_Karachi'|'Asia_Kathmandu'|'Asia_Khandyga'|'Asia_Kolkata'|'Asia_Krasnoyarsk'|'Asia_Kuching'|'Asia_Macau'|'Asia_Magadan'|'Asia_Makassar'|'Asia_Manila'|'Asia_Nicosia'|'Asia_Novokuznetsk'|'Asia_Novosibirsk'|'Asia_Omsk'|'Asia_Oral'|'Asia_Pontianak'|'Asia_Pyongyang'|'Asia_Qatar'|'Asia_Qostanay'|'Asia_Qyzylorda'|'Asia_Riyadh'|'Asia_Sakhalin'|'Asia_Samarkand'|'Asia_Seoul'|'Asia_Shanghai'|'Asia_Singapore'|'Asia_Srednekolymsk'|'Asia_Taipei'|'Asia_Tashkent'|'Asia_Tbilisi'|'Asia_Tehran'|'Asia_Thimphu'|'Asia_Tokyo'|'Asia_Tomsk'|'Asia_Ulaanbaatar'|'Asia_Urumqi'|'Asia_Ust_Nera'|'Asia_Vladivostok'|'Asia_Yakutsk'|'Asia_Yangon'|'Asia_Yekaterinburg'|'Asia_Yerevan'|'Atlantic_Azores'|'Atlantic_Bermuda'|'Atlantic_Canary'|'Atlantic_Cape_Verde'|'Atlantic_Faroe'|'Atlantic_Madeira'|'Atlantic_South_Georgia'|'Atlantic_Stanley'|'Australia_Adelaide'|'Australia_Brisbane'|'Australia_Broken_Hill'|'Australia_Darwin'|'Australia_Eucla'|'Australia_Hobart'|'Australia_Lindeman'|'Australia_Lord_Howe'|'Australia_Melbourne'|'Australia_Perth'|'Australia_Sydney'|'CET'|'CST6CDT'|'EET'|'EST'|'EST5EDT'|'Europe_Andorra'|'Europe_Astrakhan'|'Europe_Athens'|'Europe_Belgrade'|'Europe_Berlin'|'Europe_Brussels'|'Europe_Bucharest'|'Europe_Budapest'|'Europe_Chisinau'|'Europe_Dublin'|'Europe_Gibraltar'|'Europe_Helsinki'|'Europe_Istanbul'|'Europe_Kaliningrad'|'Europe_Kirov'|'Europe_Kyiv'|'Europe_Lisbon'|'Europe_London'|'Europe_Madrid'|'Europe_Malta'|'Europe_Minsk'|'Europe_Moscow'|'Europe_Paris'|'Europe_Prague'|'Europe_Riga'|'Europe_Rome'|'Europe_Samara'|'Europe_Saratov'|'Europe_Simferopol'|'Europe_Sofia'|'Europe_Tallinn'|'Europe_Tirane'|'Europe_Ulyanovsk'|'Europe_Vienna'|'Europe_Vilnius'|'Europe_Volgograd'|'Europe_Warsaw'|'Europe_Zurich'|'Factory'|'HST'|'Indian_Chagos'|'Indian_Maldives'|'Indian_Mauritius'|'MET'|'MST'|'MST7MDT'|'PST8PDT'|'Pacific_Apia'|'Pacific_Auckland'|'Pacific_Bougainville'|'Pacific_Chatham'|'Pacific_Easter'|'Pacific_Efate'|'Pacific_Fakaofo'|'Pacific_Fiji'|'Pacific_Galapagos'|'Pacific_Gambier'|'Pacific_Guadalcanal'|'Pacific_Guam'|'Pacific_Honolulu'|'Pacific_Kanton'|'Pacific_Kiritimati'|'Pacific_Kosrae'|'Pacific_Kwajalein'|'Pacific_Marquesas'|'Pacific_Nauru'|'Pacific_Niue'|'Pacific_Norfolk'|'Pacific_Noumea'|'Pacific_Pago_Pago'|'Pacific_Palau'|'Pacific_Pitcairn'|'Pacific_Port_Moresby'|'Pacific_Rarotonga'|'Pacific_Tahiti'|'Pacific_Tarawa'|'Pacific_Tongatapu'|'WET';
  }
  export class time extends $greycat.std_n.core.time {
  }

  export class float extends $greycat.std_n.core.float {
  }

  export class nodeIndex$info$args extends $greycat.GCObject {
    static readonly _type = 'core::nodeIndex$info$args';

    nodes!: globalThis.Array<core.nodeIndex>;

    static createFrom({nodes}: {nodes: globalThis.Array<core.nodeIndex>}, $g: $greycat.GreyCat = $greycat.$.default): nodeIndex$info$args {
      return new nodeIndex$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[56], nodes);
    }
    static create(nodes: globalThis.Array<core.nodeIndex>, $g: $greycat.GreyCat = $greycat.$.default): nodeIndex$info$args {
      return new nodeIndex$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[56], nodes);
    }
  }

  export class SortOrder extends $greycat.GCEnum {
    static readonly _type = 'core::SortOrder';

    constructor(type: $greycat.AbiType, offset: number, public override key: SortOrder.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static asc($g: $greycat.GreyCat = $greycat.$.default): SortOrder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[57];
      return t.static_values['asc'];
    }
    static desc($g: $greycat.GreyCat = $greycat.$.default): SortOrder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[57];
      return t.static_values['desc'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): SortOrder[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[57];
      return t.enum_values as SortOrder[];
    }
  }

  export namespace SortOrder  {
    export type Field = 'asc'|'desc';
  }
  export class nodeIndex<K = any, V = any> extends $greycat.std_n.core.nodeIndex<K, V> {
    static info(nodes: globalThis.Array<core.nodeIndex>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo>> {
      return $g.call('core::nodeIndex::info', [nodes], $signal);
    }
    static sample(refs: globalThis.Array<core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: core.SamplingMode, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('core::nodeIndex::sample', [refs, from, maxRows, mode], $signal);
    }
  }

  export class t3f extends $greycat.std_n.core.t3f {
  }

}

export namespace runtime {
  export class Log extends $greycat.GCObject {
    static readonly _type = 'runtime::Log';

    level!: runtime.LogLevel;
    time!: core.time;
    user_id!: number | bigint | null;
    id!: number | bigint | null;
    id2!: number | bigint | null;
    src!: string | null;
    tag!: string | null;
    data!: any | null;

    static createFrom({level, time, user_id = null, id = null, id2 = null, src = null, tag = null, data = null}: {level: runtime.LogLevel, time: core.time, user_id?: number | bigint | null, id?: number | bigint | null, id2?: number | bigint | null, src?: string | null, tag?: string | null, data?: any | null}, $g: $greycat.GreyCat = $greycat.$.default): Log {
      return new Log($g.abi.libs_by_name.get(stdlib.name)!.mapped[60], level, time, user_id, id, id2, src, tag, data);
    }
    static create(level: runtime.LogLevel, time: core.time, user_id: number | bigint | null = null, id: number | bigint | null = null, id2: number | bigint | null = null, src: string | null = null, tag: string | null = null, data: any | null = null, $g: $greycat.GreyCat = $greycat.$.default): Log {
      return new Log($g.abi.libs_by_name.get(stdlib.name)!.mapped[60], level, time, user_id, id, id2, src, tag, data);
    }
  }

  export class SecurityFields$set$args extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityFields$set$args';

    f!: runtime.SecurityFields;

    static createFrom({f}: {f: runtime.SecurityFields}, $g: $greycat.GreyCat = $greycat.$.default): SecurityFields$set$args {
      return new SecurityFields$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[61], f);
    }
    static create(f: runtime.SecurityFields, $g: $greycat.GreyCat = $greycat.$.default): SecurityFields$set$args {
      return new SecurityFields$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[61], f);
    }
  }

  export class User extends $greycat.GCObject {
    static readonly _type = 'runtime::User';

    id!: number | bigint;
    name!: string;
    activated!: boolean;
    full_name!: string | null;
    email!: string | null;
    role!: string | null;
    permissions_flags!: number | bigint | null;
    groups!: globalThis.Array<runtime.UserGroupPolicy> | null;
    groups_flags!: number | bigint | null;
    external!: boolean;

    static getToken(id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
      return $g.call('runtime::User::getToken', [id], $signal);
    }
    static setPassword(name: string, pass: string, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<boolean> {
      return $g.call('runtime::User::setPassword', [name, pass], $signal);
    }
    static permissions($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<string>> {
      return $g.call('runtime::User::permissions', undefined, $signal);
    }
    static me($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<runtime.User> {
      return $g.call('runtime::User::me', undefined, $signal);
    }
    static current($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<number | bigint> {
      return $g.call('runtime::User::current', undefined, $signal);
    }
    static renew(use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
      return $g.call('runtime::User::renew', [use_cookie], $signal);
    }
    static logout($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::User::logout', undefined, $signal);
    }
    static tokenLogin(token: string, use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
      return $g.call('runtime::User::tokenLogin', [token, use_cookie], $signal);
    }
    static login(credentials: string, use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
      return $g.call('runtime::User::login', [credentials, use_cookie], $signal);
    }
    static createFrom({id, name, activated, full_name = null, email = null, role = null, permissions_flags = null, groups = null, groups_flags = null, external}: {id: number | bigint, name: string, activated: boolean, full_name?: string | null, email?: string | null, role?: string | null, permissions_flags?: number | bigint | null, groups?: globalThis.Array<runtime.UserGroupPolicy> | null, groups_flags?: number | bigint | null, external: boolean}, $g: $greycat.GreyCat = $greycat.$.default): User {
      return new User($g.abi.libs_by_name.get(stdlib.name)!.mapped[62], id, name, activated, full_name, email, role, permissions_flags, groups, groups_flags, external);
    }
    static create(id: number | bigint, name: string, activated: boolean, full_name: string | null, email: string | null, role: string | null, permissions_flags: number | bigint | null, groups: globalThis.Array<runtime.UserGroupPolicy> | null, groups_flags: number | bigint | null, external: boolean, $g: $greycat.GreyCat = $greycat.$.default): User {
      return new User($g.abi.libs_by_name.get(stdlib.name)!.mapped[62], id, name, activated, full_name, email, role, permissions_flags, groups, groups_flags, external);
    }
  }

  export class LogLevel extends $greycat.GCEnum {
    static readonly _type = 'runtime::LogLevel';

    constructor(type: $greycat.AbiType, offset: number, public override key: LogLevel.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static error($g: $greycat.GreyCat = $greycat.$.default): LogLevel {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.static_values['error'];
    }
    static warn($g: $greycat.GreyCat = $greycat.$.default): LogLevel {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.static_values['warn'];
    }
    static info($g: $greycat.GreyCat = $greycat.$.default): LogLevel {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.static_values['info'];
    }
    static perf($g: $greycat.GreyCat = $greycat.$.default): LogLevel {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.static_values['perf'];
    }
    static trace($g: $greycat.GreyCat = $greycat.$.default): LogLevel {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.static_values['trace'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): LogLevel[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[63];
      return t.enum_values as LogLevel[];
    }
  }

  export namespace LogLevel  {
    export type Field = 'error'|'warn'|'info'|'perf'|'trace';
  }
  export class User$logout$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$logout$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): User$logout$args {
      return new User$logout$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[64]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): User$logout$args {
      return new User$logout$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[64]);
    }
  }

  export class User$current$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$current$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): User$current$args {
      return new User$current$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[65]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): User$current$args {
      return new User$current$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[65]);
    }
  }

  export class PeriodicTask$set$args extends $greycat.GCObject {
    static readonly _type = 'runtime::PeriodicTask$set$args';

    tasks!: globalThis.Array<runtime.PeriodicTask>;

    static createFrom({tasks}: {tasks: globalThis.Array<runtime.PeriodicTask>}, $g: $greycat.GreyCat = $greycat.$.default): PeriodicTask$set$args {
      return new PeriodicTask$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[66], tasks);
    }
    static create(tasks: globalThis.Array<runtime.PeriodicTask>, $g: $greycat.GreyCat = $greycat.$.default): PeriodicTask$set$args {
      return new PeriodicTask$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[66], tasks);
    }
  }

  export class PeriodicTask$all$args extends $greycat.GCObject {
    static readonly _type = 'runtime::PeriodicTask$all$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): PeriodicTask$all$args {
      return new PeriodicTask$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[67]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): PeriodicTask$all$args {
      return new PeriodicTask$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[67]);
    }
  }

  export class License extends $greycat.GCObject {
    static readonly _type = 'runtime::License';

    name!: string | null;
    start!: core.time;
    end!: core.time;
    company!: string | null;
    max_memory!: number | bigint;
    extra_1!: number | bigint | null;
    extra_2!: number | bigint | null;
    type!: runtime.LicenseType | null;

    static createFrom({name = null, start, end, company = null, max_memory, extra_1 = null, extra_2 = null, type = null}: {name?: string | null, start: core.time, end: core.time, company?: string | null, max_memory: number | bigint, extra_1?: number | bigint | null, extra_2?: number | bigint | null, type?: runtime.LicenseType | null}, $g: $greycat.GreyCat = $greycat.$.default): License {
      return new License($g.abi.libs_by_name.get(stdlib.name)!.mapped[68], name, start, end, company, max_memory, extra_1, extra_2, type);
    }
    static create(name: string | null, start: core.time, end: core.time, company: string | null, max_memory: number | bigint, extra_1: number | bigint | null = null, extra_2: number | bigint | null = null, type: runtime.LicenseType | null = null, $g: $greycat.GreyCat = $greycat.$.default): License {
      return new License($g.abi.libs_by_name.get(stdlib.name)!.mapped[68], name, start, end, company, max_memory, extra_1, extra_2, type);
    }
  }

  export class Task extends $greycat.GCObject {
    static readonly _type = 'runtime::Task';

    user_id!: number | bigint;
    task_id!: number | bigint;
    mod!: string | null;
    type!: string | null;
    fun!: string | null;
    creation!: core.time;
    start!: core.time | null;
    duration!: core.duration | null;
    status!: runtime.TaskStatus;
    progress!: number | null;

    static is_running(task_id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<boolean> {
      return $g.call('runtime::Task::is_running', [task_id], $signal);
    }
    static cancel(task_id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<boolean> {
      return $g.call('runtime::Task::cancel', [task_id], $signal);
    }
    static history(offset: number | bigint, max: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>> {
      return $g.call('runtime::Task::history', [offset, max], $signal);
    }
    static running($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>> {
      return $g.call('runtime::Task::running', undefined, $signal);
    }
    static createFrom({user_id, task_id, mod = null, type = null, fun = null, creation, start = null, duration = null, status, progress = null}: {user_id: number | bigint, task_id: number | bigint, mod?: string | null, type?: string | null, fun?: string | null, creation: core.time, start?: core.time | null, duration?: core.duration | null, status: runtime.TaskStatus, progress?: number | null}, $g: $greycat.GreyCat = $greycat.$.default): Task {
      return new Task($g.abi.libs_by_name.get(stdlib.name)!.mapped[69], user_id, task_id, mod, type, fun, creation, start, duration, status, progress);
    }
    static create(user_id: number | bigint, task_id: number | bigint, mod: string | null, type: string | null, fun: string | null, creation: core.time, start: core.time | null, duration: core.duration | null, status: runtime.TaskStatus, progress: number | null = null, $g: $greycat.GreyCat = $greycat.$.default): Task {
      return new Task($g.abi.libs_by_name.get(stdlib.name)!.mapped[69], user_id, task_id, mod, type, fun, creation, start, duration, status, progress);
    }
  }

  export class SecurityFields$get$args extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityFields$get$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): SecurityFields$get$args {
      return new SecurityFields$get$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[70]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): SecurityFields$get$args {
      return new SecurityFields$get$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[70]);
    }
  }

  export class User$getToken$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$getToken$args';

    id!: number | bigint;

    static createFrom({id}: {id: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): User$getToken$args {
      return new User$getToken$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[71], id);
    }
    static create(id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): User$getToken$args {
      return new User$getToken$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[71], id);
    }
  }

  export class Debug$workers$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$workers$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Debug$workers$args {
      return new Debug$workers$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[72]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Debug$workers$args {
      return new Debug$workers$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[72]);
    }
  }

  export class Debug extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug';


    static info(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<runtime.DebugInfo> {
      return $g.call('runtime::Debug::info', [worker], $signal);
    }
    static resume(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::Debug::resume', [worker], $signal);
    }
    static pause(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::Debug::pause', [worker], $signal);
    }
    static workers($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<number | bigint>> {
      return $g.call('runtime::Debug::workers', undefined, $signal);
    }
    static remove(bps: globalThis.Array<runtime.DebugBreakpoint>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::Debug::remove', [bps], $signal);
    }
    static add(bps: globalThis.Array<runtime.DebugBreakpoint>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::Debug::add', [bps], $signal);
    }
    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Debug {
      return new Debug($g.abi.libs_by_name.get(stdlib.name)!.mapped[73]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Debug {
      return new Debug($g.abi.libs_by_name.get(stdlib.name)!.mapped[73]);
    }
  }

  export class Debug$resume$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$resume$args';

    worker!: number | bigint;

    static createFrom({worker}: {worker: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Debug$resume$args {
      return new Debug$resume$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[74], worker);
    }
    static create(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Debug$resume$args {
      return new Debug$resume$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[74], worker);
    }
  }

  export class SecurityPolicy extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityPolicy';

    entities!: globalThis.Array<runtime.SecurityEntity> | null;
    credentials!: globalThis.Map<string, runtime.UserCredential> | null;
    roles!: globalThis.Map<string, runtime.UserRole> | null;
    fields!: runtime.SecurityFields | null;
    keys!: globalThis.Map<string, string> | null;
    keys_last_refresh!: core.time | null;

    static permissions($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<string>> {
      return $g.call('runtime::SecurityPolicy::permissions', undefined, $signal);
    }
    static createFrom({entities = null, credentials = null, roles = null, fields = null, keys = null, keys_last_refresh = null}: {entities?: globalThis.Array<runtime.SecurityEntity> | null, credentials?: globalThis.Map<string, runtime.UserCredential> | null, roles?: globalThis.Map<string, runtime.UserRole> | null, fields?: runtime.SecurityFields | null, keys?: globalThis.Map<string, string> | null, keys_last_refresh?: core.time | null}, $g: $greycat.GreyCat = $greycat.$.default): SecurityPolicy {
      return new SecurityPolicy($g.abi.libs_by_name.get(stdlib.name)!.mapped[75], entities, credentials, roles, fields, keys, keys_last_refresh);
    }
    static create(entities: globalThis.Array<runtime.SecurityEntity> | null = null, credentials: globalThis.Map<string, runtime.UserCredential> | null = null, roles: globalThis.Map<string, runtime.UserRole> | null = null, fields: runtime.SecurityFields | null = null, keys: globalThis.Map<string, string> | null = null, keys_last_refresh: core.time | null = null, $g: $greycat.GreyCat = $greycat.$.default): SecurityPolicy {
      return new SecurityPolicy($g.abi.libs_by_name.get(stdlib.name)!.mapped[75], entities, credentials, roles, fields, keys, keys_last_refresh);
    }
  }

  export class UserCredential extends $greycat.GCObject {
    static readonly _type = 'runtime::UserCredential';

    offset!: number | bigint;
    pass!: string | null;

    static createFrom({offset, pass = null}: {offset: number | bigint, pass?: string | null}, $g: $greycat.GreyCat = $greycat.$.default): UserCredential {
      return new UserCredential($g.abi.libs_by_name.get(stdlib.name)!.mapped[76], offset, pass);
    }
    static create(offset: number | bigint, pass: string | null = null, $g: $greycat.GreyCat = $greycat.$.default): UserCredential {
      return new UserCredential($g.abi.libs_by_name.get(stdlib.name)!.mapped[76], offset, pass);
    }
  }

  export class Job<T = any> extends $greycat.GCObject {
    static readonly _type = 'runtime::Job';

    function!: core.function_;
    arguments!: globalThis.Array<any | null> | null;

    static createFrom<T>({function_, arguments_ = null}: {function_: core.function_, arguments_?: globalThis.Array<any | null> | null}, $g: $greycat.GreyCat = $greycat.$.default): Job {
      return new Job($g.abi.libs_by_name.get(stdlib.name)!.mapped[77], function_, arguments_);
    }
    static create<T>(function_: core.function_, arguments_: globalThis.Array<any | null> | null = null, $g: $greycat.GreyCat = $greycat.$.default): Job<T> {
      return new Job($g.abi.libs_by_name.get(stdlib.name)!.mapped[77], function_, arguments_);
    }
  }

  export class Runtime$info$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Runtime$info$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Runtime$info$args {
      return new Runtime$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[78]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Runtime$info$args {
      return new Runtime$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[78]);
    }
  }

  export class DebugVariable extends $greycat.GCObject {
    static readonly _type = 'runtime::DebugVariable';

    name!: string | null;
    value!: any | null;

    static createFrom({name = null, value = null}: {name?: string | null, value?: any | null}, $g: $greycat.GreyCat = $greycat.$.default): DebugVariable {
      return new DebugVariable($g.abi.libs_by_name.get(stdlib.name)!.mapped[79], name, value);
    }
    static create(name: string | null = null, value: any | null = null, $g: $greycat.GreyCat = $greycat.$.default): DebugVariable {
      return new DebugVariable($g.abi.libs_by_name.get(stdlib.name)!.mapped[79], name, value);
    }
  }

  export class RuntimeInfo extends $greycat.GCObject {
    static readonly _type = 'runtime::RuntimeInfo';

    version!: string;
    program_version!: string | null;
    arch!: string;
    timezone!: core.TimeZone;
    license!: runtime.License;
    io_threads!: number | bigint;
    bg_threads!: number | bigint;
    fg_threads!: number | bigint;
    mem_total!: number | bigint;
    mem_worker!: number | bigint;
    nb_ctx!: number | bigint;
    store_stats!: runtime.StoreStat | null;

    static createFrom({version, program_version = null, arch, timezone, license, io_threads, bg_threads, fg_threads, mem_total, mem_worker, nb_ctx, store_stats = null}: {version: string, program_version?: string | null, arch: string, timezone: core.TimeZone, license: runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, nb_ctx: number | bigint, store_stats?: runtime.StoreStat | null}, $g: $greycat.GreyCat = $greycat.$.default): RuntimeInfo {
      return new RuntimeInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[80], version, program_version, arch, timezone, license, io_threads, bg_threads, fg_threads, mem_total, mem_worker, nb_ctx, store_stats);
    }
    static create(version: string, program_version: string | null, arch: string, timezone: core.TimeZone, license: runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, nb_ctx: number | bigint, store_stats: runtime.StoreStat | null = null, $g: $greycat.GreyCat = $greycat.$.default): RuntimeInfo {
      return new RuntimeInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[80], version, program_version, arch, timezone, license, io_threads, bg_threads, fg_threads, mem_total, mem_worker, nb_ctx, store_stats);
    }
  }

  export class SecurityFields extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityFields';

    email!: string | null;
    name!: string | null;
    first_name!: string | null;
    last_name!: string | null;
    roles!: globalThis.Map<string, string> | null;
    groups!: globalThis.Map<string, string> | null;

    static get($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<runtime.SecurityFields | null> {
      return $g.call('runtime::SecurityFields::get', undefined, $signal);
    }
    static set(f: runtime.SecurityFields, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::SecurityFields::set', [f], $signal);
    }
    static createFrom({email = null, name = null, first_name = null, last_name = null, roles = null, groups = null}: {email?: string | null, name?: string | null, first_name?: string | null, last_name?: string | null, roles?: globalThis.Map<string, string> | null, groups?: globalThis.Map<string, string> | null}, $g: $greycat.GreyCat = $greycat.$.default): SecurityFields {
      return new SecurityFields($g.abi.libs_by_name.get(stdlib.name)!.mapped[81], email, name, first_name, last_name, roles, groups);
    }
    static create(email: string | null = null, name: string | null = null, first_name: string | null = null, last_name: string | null = null, roles: globalThis.Map<string, string> | null = null, groups: globalThis.Map<string, string> | null = null, $g: $greycat.GreyCat = $greycat.$.default): SecurityFields {
      return new SecurityFields($g.abi.libs_by_name.get(stdlib.name)!.mapped[81], email, name, first_name, last_name, roles, groups);
    }
  }

  export class CallPerf extends $greycat.GCObject {
    static readonly _type = 'runtime::CallPerf';

    duration!: core.duration;
    bytes_write_disk!: number | bigint;
    bytes_write_disk_raw!: number | bigint;
    bytes_read_disk!: number | bigint;
    bytes_read_disk_raw!: number | bigint;
    bytes_read_cache!: number | bigint;

    static createFrom({duration, bytes_write_disk, bytes_write_disk_raw, bytes_read_disk, bytes_read_disk_raw, bytes_read_cache}: {duration: core.duration, bytes_write_disk: number | bigint, bytes_write_disk_raw: number | bigint, bytes_read_disk: number | bigint, bytes_read_disk_raw: number | bigint, bytes_read_cache: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): CallPerf {
      return new CallPerf($g.abi.libs_by_name.get(stdlib.name)!.mapped[82], duration, bytes_write_disk, bytes_write_disk_raw, bytes_read_disk, bytes_read_disk_raw, bytes_read_cache);
    }
    static create(duration: core.duration, bytes_write_disk: number | bigint, bytes_write_disk_raw: number | bigint, bytes_read_disk: number | bigint, bytes_read_disk_raw: number | bigint, bytes_read_cache: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): CallPerf {
      return new CallPerf($g.abi.libs_by_name.get(stdlib.name)!.mapped[82], duration, bytes_write_disk, bytes_write_disk_raw, bytes_read_disk, bytes_read_disk_raw, bytes_read_cache);
    }
  }

  export class TaskStatus extends $greycat.GCEnum {
    static readonly _type = 'runtime::TaskStatus';

    constructor(type: $greycat.AbiType, offset: number, public override key: TaskStatus.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static empty($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['empty'];
    }
    static waiting($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['waiting'];
    }
    static running($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['running'];
    }
    static await_($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['await_'];
    }
    static cancelled($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['cancelled'];
    }
    static error($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['error'];
    }
    static ended($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['ended'];
    }
    static ended_with_errors($g: $greycat.GreyCat = $greycat.$.default): TaskStatus {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.static_values['ended_with_errors'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): TaskStatus[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[83];
      return t.enum_values as TaskStatus[];
    }
  }

  export namespace TaskStatus  {
    export type Field = 'empty'|'waiting'|'running'|'await'|'cancelled'|'error'|'ended'|'ended_with_errors';
  }
  export class User$renew$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$renew$args';

    use_cookie!: boolean;

    static createFrom({use_cookie}: {use_cookie: boolean}, $g: $greycat.GreyCat = $greycat.$.default): User$renew$args {
      return new User$renew$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[84], use_cookie);
    }
    static create(use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default): User$renew$args {
      return new User$renew$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[84], use_cookie);
    }
  }

  export class UserRole$set$args extends $greycat.GCObject {
    static readonly _type = 'runtime::UserRole$set$args';

    value!: runtime.UserRole;

    static createFrom({value}: {value: runtime.UserRole}, $g: $greycat.GreyCat = $greycat.$.default): UserRole$set$args {
      return new UserRole$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[85], value);
    }
    static create(value: runtime.UserRole, $g: $greycat.GreyCat = $greycat.$.default): UserRole$set$args {
      return new UserRole$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[85], value);
    }
  }

  export class DebugFrame extends $greycat.GCObject {
    static readonly _type = 'runtime::DebugFrame';

    module!: string | null;
    function!: core.function_ | null;
    line!: number | bigint;
    column!: number | bigint;
    scope!: globalThis.Array<runtime.DebugVariable>;

    static createFrom({module = null, function_ = null, line, column, scope}: {module?: string | null, function_?: core.function_ | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<runtime.DebugVariable>}, $g: $greycat.GreyCat = $greycat.$.default): DebugFrame {
      return new DebugFrame($g.abi.libs_by_name.get(stdlib.name)!.mapped[86], module, function_, line, column, scope);
    }
    static create(module: string | null, function_: core.function_ | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<runtime.DebugVariable>, $g: $greycat.GreyCat = $greycat.$.default): DebugFrame {
      return new DebugFrame($g.abi.libs_by_name.get(stdlib.name)!.mapped[86], module, function_, line, column, scope);
    }
  }

  export class UserGroup extends $greycat.GCObject {
    static readonly _type = 'runtime::UserGroup';

    id!: number | bigint;
    name!: string;
    activated!: boolean;

    static createFrom({id, name, activated}: {id: number | bigint, name: string, activated: boolean}, $g: $greycat.GreyCat = $greycat.$.default): UserGroup {
      return new UserGroup($g.abi.libs_by_name.get(stdlib.name)!.mapped[87], id, name, activated);
    }
    static create(id: number | bigint, name: string, activated: boolean, $g: $greycat.GreyCat = $greycat.$.default): UserGroup {
      return new UserGroup($g.abi.libs_by_name.get(stdlib.name)!.mapped[87], id, name, activated);
    }
  }

  export class User$tokenLogin$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$tokenLogin$args';

    token!: string;
    use_cookie!: boolean;

    static createFrom({token, use_cookie}: {token: string, use_cookie: boolean}, $g: $greycat.GreyCat = $greycat.$.default): User$tokenLogin$args {
      return new User$tokenLogin$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[88], token, use_cookie);
    }
    static create(token: string, use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default): User$tokenLogin$args {
      return new User$tokenLogin$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[88], token, use_cookie);
    }
  }

  export class UserRole$remove$args extends $greycat.GCObject {
    static readonly _type = 'runtime::UserRole$remove$args';

    name!: string;

    static createFrom({name}: {name: string}, $g: $greycat.GreyCat = $greycat.$.default): UserRole$remove$args {
      return new UserRole$remove$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[89], name);
    }
    static create(name: string, $g: $greycat.GreyCat = $greycat.$.default): UserRole$remove$args {
      return new UserRole$remove$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[89], name);
    }
  }

  export class Task$running$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Task$running$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Task$running$args {
      return new Task$running$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[90]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Task$running$args {
      return new Task$running$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[90]);
    }
  }

  export class User$setPassword$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$setPassword$args';

    name!: string;
    pass!: string;

    static createFrom({name, pass}: {name: string, pass: string}, $g: $greycat.GreyCat = $greycat.$.default): User$setPassword$args {
      return new User$setPassword$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[91], name, pass);
    }
    static create(name: string, pass: string, $g: $greycat.GreyCat = $greycat.$.default): User$setPassword$args {
      return new User$setPassword$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[91], name, pass);
    }
  }

  export class System extends $greycat.GCObject {
    static readonly _type = 'runtime::System';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): System {
      return new System($g.abi.libs_by_name.get(stdlib.name)!.mapped[92]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): System {
      return new System($g.abi.libs_by_name.get(stdlib.name)!.mapped[92]);
    }
  }

  export class Debug$pause$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$pause$args';

    worker!: number | bigint;

    static createFrom({worker}: {worker: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Debug$pause$args {
      return new Debug$pause$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[93], worker);
    }
    static create(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Debug$pause$args {
      return new Debug$pause$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[93], worker);
    }
  }

  export class LicenseType extends $greycat.GCEnum {
    static readonly _type = 'runtime::LicenseType';

    constructor(type: $greycat.AbiType, offset: number, public override key: LicenseType.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static community($g: $greycat.GreyCat = $greycat.$.default): LicenseType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[94];
      return t.static_values['community'];
    }
    static enterprise($g: $greycat.GreyCat = $greycat.$.default): LicenseType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[94];
      return t.static_values['enterprise'];
    }
    static testing($g: $greycat.GreyCat = $greycat.$.default): LicenseType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[94];
      return t.static_values['testing'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): LicenseType[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[94];
      return t.enum_values as LicenseType[];
    }
  }

  export namespace LicenseType  {
    export type Field = 'community'|'enterprise'|'testing';
  }
  export class OpenIDConnect extends $greycat.GCObject {
    static readonly _type = 'runtime::OpenIDConnect';

    url!: string;
    clientId!: string;

    static config($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<runtime.OpenIDConnect | null> {
      return $g.call('runtime::OpenIDConnect::config', undefined, $signal);
    }
    static createFrom({url, clientId}: {url: string, clientId: string}, $g: $greycat.GreyCat = $greycat.$.default): OpenIDConnect {
      return new OpenIDConnect($g.abi.libs_by_name.get(stdlib.name)!.mapped[95], url, clientId);
    }
    static create(url: string, clientId: string, $g: $greycat.GreyCat = $greycat.$.default): OpenIDConnect {
      return new OpenIDConnect($g.abi.libs_by_name.get(stdlib.name)!.mapped[95], url, clientId);
    }
  }

  export class SecurityPolicy$permissions$args extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityPolicy$permissions$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): SecurityPolicy$permissions$args {
      return new SecurityPolicy$permissions$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[96]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): SecurityPolicy$permissions$args {
      return new SecurityPolicy$permissions$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[96]);
    }
  }

  export class Runtime$abi$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Runtime$abi$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Runtime$abi$args {
      return new Runtime$abi$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[97]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Runtime$abi$args {
      return new Runtime$abi$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[97]);
    }
  }

  export class Debug$info$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$info$args';

    worker!: number | bigint;

    static createFrom({worker}: {worker: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Debug$info$args {
      return new Debug$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[98], worker);
    }
    static create(worker: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Debug$info$args {
      return new Debug$info$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[98], worker);
    }
  }

  export class UserRole$all$args extends $greycat.GCObject {
    static readonly _type = 'runtime::UserRole$all$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): UserRole$all$args {
      return new UserRole$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[99]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): UserRole$all$args {
      return new UserRole$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[99]);
    }
  }

  export class SecurityEntity$set$args extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityEntity$set$args';

    entity!: runtime.SecurityEntity;

    static createFrom({entity}: {entity: runtime.SecurityEntity}, $g: $greycat.GreyCat = $greycat.$.default): SecurityEntity$set$args {
      return new SecurityEntity$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[100], entity);
    }
    static create(entity: runtime.SecurityEntity, $g: $greycat.GreyCat = $greycat.$.default): SecurityEntity$set$args {
      return new SecurityEntity$set$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[100], entity);
    }
  }

  export class User$permissions$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$permissions$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): User$permissions$args {
      return new User$permissions$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[101]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): User$permissions$args {
      return new User$permissions$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[101]);
    }
  }

  export class UserGroupPolicy extends $greycat.GCObject {
    static readonly _type = 'runtime::UserGroupPolicy';

    group_id!: number | bigint;
    type!: runtime.UserGroupPolicyType;

    static createFrom({group_id, type}: {group_id: number | bigint, type: runtime.UserGroupPolicyType}, $g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicy {
      return new UserGroupPolicy($g.abi.libs_by_name.get(stdlib.name)!.mapped[102], group_id, type);
    }
    static create(group_id: number | bigint, type: runtime.UserGroupPolicyType, $g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicy {
      return new UserGroupPolicy($g.abi.libs_by_name.get(stdlib.name)!.mapped[102], group_id, type);
    }
  }

  export class Runtime$root$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Runtime$root$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Runtime$root$args {
      return new Runtime$root$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[103]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Runtime$root$args {
      return new Runtime$root$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[103]);
    }
  }

  export class SecurityEntity$all$args extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityEntity$all$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): SecurityEntity$all$args {
      return new SecurityEntity$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[104]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): SecurityEntity$all$args {
      return new SecurityEntity$all$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[104]);
    }
  }

  export class PeriodicTask extends $greycat.GCObject {
    static readonly _type = 'runtime::PeriodicTask';

    function!: core.function_ | null;
    user_id!: number | bigint;
    arguments!: globalThis.Array<any | null> | null;
    start!: core.time;
    every!: core.duration;

    static set(tasks: globalThis.Array<runtime.PeriodicTask>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::PeriodicTask::set', [tasks], $signal);
    }
    static all($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<runtime.PeriodicTask>> {
      return $g.call('runtime::PeriodicTask::all', undefined, $signal);
    }
    static createFrom({function_ = null, user_id, arguments_ = null, start, every}: {function_?: core.function_ | null, user_id: number | bigint, arguments_?: globalThis.Array<any | null> | null, start: core.time, every: core.duration}, $g: $greycat.GreyCat = $greycat.$.default): PeriodicTask {
      return new PeriodicTask($g.abi.libs_by_name.get(stdlib.name)!.mapped[105], function_, user_id, arguments_, start, every);
    }
    static create(function_: core.function_ | null, user_id: number | bigint, arguments_: globalThis.Array<any | null> | null, start: core.time, every: core.duration, $g: $greycat.GreyCat = $greycat.$.default): PeriodicTask {
      return new PeriodicTask($g.abi.libs_by_name.get(stdlib.name)!.mapped[105], function_, user_id, arguments_, start, every);
    }
  }

  export class UserGroupPolicyType extends $greycat.GCEnum {
    static readonly _type = 'runtime::UserGroupPolicyType';

    constructor(type: $greycat.AbiType, offset: number, public override key: UserGroupPolicyType.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static read($g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicyType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[106];
      return t.static_values['read'];
    }
    static write($g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicyType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[106];
      return t.static_values['write'];
    }
    static execute($g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicyType {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[106];
      return t.static_values['execute'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): UserGroupPolicyType[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[106];
      return t.enum_values as UserGroupPolicyType[];
    }
  }

  export namespace UserGroupPolicyType  {
    export type Field = 'read'|'write'|'execute';
  }
  export class Runtime extends $greycat.GCObject {
    static readonly _type = 'runtime::Runtime';


    static root($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<any> {
      return $g.call('runtime::Runtime::root', undefined, $signal);
    }
    static abi($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::Runtime::abi', undefined, $signal);
    }
    static info($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<runtime.RuntimeInfo> {
      return $g.call('runtime::Runtime::info', undefined, $signal);
    }
    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Runtime {
      return new Runtime($g.abi.libs_by_name.get(stdlib.name)!.mapped[107]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Runtime {
      return new Runtime($g.abi.libs_by_name.get(stdlib.name)!.mapped[107]);
    }
  }

  export class Debug$add$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$add$args';

    bps!: globalThis.Array<runtime.DebugBreakpoint>;

    static createFrom({bps}: {bps: globalThis.Array<runtime.DebugBreakpoint>}, $g: $greycat.GreyCat = $greycat.$.default): Debug$add$args {
      return new Debug$add$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[108], bps);
    }
    static create(bps: globalThis.Array<runtime.DebugBreakpoint>, $g: $greycat.GreyCat = $greycat.$.default): Debug$add$args {
      return new Debug$add$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[108], bps);
    }
  }

  export class User$me$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$me$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): User$me$args {
      return new User$me$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[109]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): User$me$args {
      return new User$me$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[109]);
    }
  }

  export class DebugInfo extends $greycat.GCObject {
    static readonly _type = 'runtime::DebugInfo';

    scopes!: globalThis.Array<runtime.DebugFrame>;
    root!: any;

    static createFrom({scopes, root}: {scopes: globalThis.Array<runtime.DebugFrame>, root: any}, $g: $greycat.GreyCat = $greycat.$.default): DebugInfo {
      return new DebugInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[110], scopes, root);
    }
    static create(scopes: globalThis.Array<runtime.DebugFrame>, root: any, $g: $greycat.GreyCat = $greycat.$.default): DebugInfo {
      return new DebugInfo($g.abi.libs_by_name.get(stdlib.name)!.mapped[110], scopes, root);
    }
  }

  export class Debug$remove$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Debug$remove$args';

    bps!: globalThis.Array<runtime.DebugBreakpoint>;

    static createFrom({bps}: {bps: globalThis.Array<runtime.DebugBreakpoint>}, $g: $greycat.GreyCat = $greycat.$.default): Debug$remove$args {
      return new Debug$remove$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[111], bps);
    }
    static create(bps: globalThis.Array<runtime.DebugBreakpoint>, $g: $greycat.GreyCat = $greycat.$.default): Debug$remove$args {
      return new Debug$remove$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[111], bps);
    }
  }

  export class DebugBreakpoint extends $greycat.GCObject {
    static readonly _type = 'runtime::DebugBreakpoint';

    module!: string;
    line!: number | bigint;
    column!: number | bigint;

    static createFrom({module, line, column}: {module: string, line: number | bigint, column: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): DebugBreakpoint {
      return new DebugBreakpoint($g.abi.libs_by_name.get(stdlib.name)!.mapped[112], module, line, column);
    }
    static create(module: string, line: number | bigint, column: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): DebugBreakpoint {
      return new DebugBreakpoint($g.abi.libs_by_name.get(stdlib.name)!.mapped[112], module, line, column);
    }
  }

  export class StoreStat extends $greycat.GCObject {
    static readonly _type = 'runtime::StoreStat';

    capacity_bytes!: number | bigint;
    allocated_bytes!: number | bigint;
    allocated_ratio!: number;
    remained_bytes!: number | bigint;
    remained_ratio!: number;
    used_bytes!: number | bigint;
    used_ratio!: number;
    available_bytes!: number | bigint;
    available_ratio!: number;

    static createFrom({capacity_bytes, allocated_bytes, allocated_ratio, remained_bytes, remained_ratio, used_bytes, used_ratio, available_bytes, available_ratio}: {capacity_bytes: number | bigint, allocated_bytes: number | bigint, allocated_ratio: number, remained_bytes: number | bigint, remained_ratio: number, used_bytes: number | bigint, used_ratio: number, available_bytes: number | bigint, available_ratio: number}, $g: $greycat.GreyCat = $greycat.$.default): StoreStat {
      return new StoreStat($g.abi.libs_by_name.get(stdlib.name)!.mapped[113], capacity_bytes, allocated_bytes, allocated_ratio, remained_bytes, remained_ratio, used_bytes, used_ratio, available_bytes, available_ratio);
    }
    static create(capacity_bytes: number | bigint, allocated_bytes: number | bigint, allocated_ratio: number, remained_bytes: number | bigint, remained_ratio: number, used_bytes: number | bigint, used_ratio: number, available_bytes: number | bigint, available_ratio: number, $g: $greycat.GreyCat = $greycat.$.default): StoreStat {
      return new StoreStat($g.abi.libs_by_name.get(stdlib.name)!.mapped[113], capacity_bytes, allocated_bytes, allocated_ratio, remained_bytes, remained_ratio, used_bytes, used_ratio, available_bytes, available_ratio);
    }
  }

  export class UserRole extends $greycat.GCObject {
    static readonly _type = 'runtime::UserRole';

    name!: string;
    permissions!: globalThis.Array<string>;

    static set(value: runtime.UserRole, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::UserRole::set', [value], $signal);
    }
    static remove(name: string, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('runtime::UserRole::remove', [name], $signal);
    }
    static all($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<runtime.UserRole>> {
      return $g.call('runtime::UserRole::all', undefined, $signal);
    }
    static createFrom({name, permissions}: {name: string, permissions: globalThis.Array<string>}, $g: $greycat.GreyCat = $greycat.$.default): UserRole {
      return new UserRole($g.abi.libs_by_name.get(stdlib.name)!.mapped[114], name, permissions);
    }
    static create(name: string, permissions: globalThis.Array<string>, $g: $greycat.GreyCat = $greycat.$.default): UserRole {
      return new UserRole($g.abi.libs_by_name.get(stdlib.name)!.mapped[114], name, permissions);
    }
  }

  export class OpenIDConnect$config$args extends $greycat.GCObject {
    static readonly _type = 'runtime::OpenIDConnect$config$args';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): OpenIDConnect$config$args {
      return new OpenIDConnect$config$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[115]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): OpenIDConnect$config$args {
      return new OpenIDConnect$config$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[115]);
    }
  }

  export class User$login$args extends $greycat.GCObject {
    static readonly _type = 'runtime::User$login$args';

    credentials!: string;
    use_cookie!: boolean;

    static createFrom({credentials, use_cookie}: {credentials: string, use_cookie: boolean}, $g: $greycat.GreyCat = $greycat.$.default): User$login$args {
      return new User$login$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[116], credentials, use_cookie);
    }
    static create(credentials: string, use_cookie: boolean, $g: $greycat.GreyCat = $greycat.$.default): User$login$args {
      return new User$login$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[116], credentials, use_cookie);
    }
  }

  export class Task$is_running$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Task$is_running$args';

    task_id!: number | bigint;

    static createFrom({task_id}: {task_id: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Task$is_running$args {
      return new Task$is_running$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[117], task_id);
    }
    static create(task_id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Task$is_running$args {
      return new Task$is_running$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[117], task_id);
    }
  }

  export class SecurityEntity extends $greycat.GCObject {
    static readonly _type = 'runtime::SecurityEntity';

    id!: number | bigint;
    name!: string;
    activated!: boolean;

    static set(entity: runtime.SecurityEntity, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<number | bigint | null> {
      return $g.call('runtime::SecurityEntity::set', [entity], $signal);
    }
    static all($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Array<runtime.SecurityEntity>> {
      return $g.call('runtime::SecurityEntity::all', undefined, $signal);
    }
  }

  export class Task$history$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Task$history$args';

    offset!: number | bigint;
    max!: number | bigint;

    static createFrom({offset, max}: {offset: number | bigint, max: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Task$history$args {
      return new Task$history$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[119], offset, max);
    }
    static create(offset: number | bigint, max: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Task$history$args {
      return new Task$history$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[119], offset, max);
    }
  }

  export class Task$cancel$args extends $greycat.GCObject {
    static readonly _type = 'runtime::Task$cancel$args';

    task_id!: number | bigint;

    static createFrom({task_id}: {task_id: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Task$cancel$args {
      return new Task$cancel$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[120], task_id);
    }
    static create(task_id: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Task$cancel$args {
      return new Task$cancel$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[120], task_id);
    }
  }

}

export namespace io {
  export class SmtpAuth extends $greycat.GCEnum {
    static readonly _type = 'io::SmtpAuth';

    constructor(type: $greycat.AbiType, offset: number, public override key: SmtpAuth.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static none($g: $greycat.GreyCat = $greycat.$.default): SmtpAuth {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[121];
      return t.static_values['none'];
    }
    static plain($g: $greycat.GreyCat = $greycat.$.default): SmtpAuth {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[121];
      return t.static_values['plain'];
    }
    static login($g: $greycat.GreyCat = $greycat.$.default): SmtpAuth {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[121];
      return t.static_values['login'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): SmtpAuth[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[121];
      return t.enum_values as SmtpAuth[];
    }
  }

  export namespace SmtpAuth  {
    export type Field = 'none'|'plain'|'login';
  }
  export class CsvFormat$generate$args extends $greycat.GCObject {
    static readonly _type = 'io::CsvFormat$generate$args';

    format!: io.CsvFormat;
    ident_col!: number | bigint | null;
    time_col!: number | bigint | null;

    static createFrom({format, ident_col = null, time_col = null}: {format: io.CsvFormat, ident_col?: number | bigint | null, time_col?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$generate$args {
      return new CsvFormat$generate$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[122], format, ident_col, time_col);
    }
    static create(format: io.CsvFormat, ident_col: number | bigint | null = null, time_col: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$generate$args {
      return new CsvFormat$generate$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[122], format, ident_col, time_col);
    }
  }

  export class CsvFormat$validate$args extends $greycat.GCObject {
    static readonly _type = 'io::CsvFormat$validate$args';

    path!: string;
    format!: io.CsvFormat;
    max_rows!: number | bigint | null;
    max_invalid!: number | bigint | null;
    invalid_path!: string | null;

    static createFrom({path, format, max_rows = null, max_invalid = null, invalid_path = null}: {path: string, format: io.CsvFormat, max_rows?: number | bigint | null, max_invalid?: number | bigint | null, invalid_path?: string | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$validate$args {
      return new CsvFormat$validate$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[123], path, format, max_rows, max_invalid, invalid_path);
    }
    static create(path: string, format: io.CsvFormat, max_rows: number | bigint | null = null, max_invalid: number | bigint | null = null, invalid_path: string | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$validate$args {
      return new CsvFormat$validate$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[123], path, format, max_rows, max_invalid, invalid_path);
    }
  }

  export class JsonReader<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::JsonReader';

    path!: string;
    pos!: number | bigint | null;

    static createFrom<T>({path, pos = null}: {path: string, pos?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): JsonReader {
      return new JsonReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[124], path, pos);
    }
    static create<T>(path: string, pos: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): JsonReader<T> {
      return new JsonReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[124], path, pos);
    }
  }

  export class CsvColumnIgnored extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnIgnored';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;

    static createFrom({name = null, mandatory = null, offset = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnIgnored {
      return new CsvColumnIgnored($g.abi.libs_by_name.get(stdlib.name)!.mapped[125], name, mandatory, offset);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnIgnored {
      return new CsvColumnIgnored($g.abi.libs_by_name.get(stdlib.name)!.mapped[125], name, mandatory, offset);
    }
  }

  export class Json<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::Json';


    static createFrom<T>($g: $greycat.GreyCat = $greycat.$.default): Json {
      return new Json($g.abi.libs_by_name.get(stdlib.name)!.mapped[126]);
    }
    static create<T>($g: $greycat.GreyCat = $greycat.$.default): Json<T> {
      return new Json($g.abi.libs_by_name.get(stdlib.name)!.mapped[126]);
    }
  }

  export class CsvColumnFloat extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnFloat';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;

    static createFrom({name = null, mandatory = null, offset = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnFloat {
      return new CsvColumnFloat($g.abi.libs_by_name.get(stdlib.name)!.mapped[127], name, mandatory, offset);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnFloat {
      return new CsvColumnFloat($g.abi.libs_by_name.get(stdlib.name)!.mapped[127], name, mandatory, offset);
    }
  }

  export class CsvColumnInteger extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnInteger';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;

    static createFrom({name = null, mandatory = null, offset = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnInteger {
      return new CsvColumnInteger($g.abi.libs_by_name.get(stdlib.name)!.mapped[128], name, mandatory, offset);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnInteger {
      return new CsvColumnInteger($g.abi.libs_by_name.get(stdlib.name)!.mapped[128], name, mandatory, offset);
    }
  }

  export class CsvColumnBoolean extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnBoolean';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;

    static createFrom({name = null, mandatory = null, offset = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnBoolean {
      return new CsvColumnBoolean($g.abi.libs_by_name.get(stdlib.name)!.mapped[129], name, mandatory, offset);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnBoolean {
      return new CsvColumnBoolean($g.abi.libs_by_name.get(stdlib.name)!.mapped[129], name, mandatory, offset);
    }
  }

  export class CsvStatistics extends $greycat.GCObject {
    static readonly _type = 'io::CsvStatistics';

    header_lines!: number | bigint | null;
    separator!: string | null;
    string_delimiter!: string | null;
    decimal_separator!: string | null;
    thousands_separator!: string | null;
    columns!: globalThis.Array<io.CsvColumnStatistics>;
    line_count!: number | bigint;
    fail_count!: number | bigint;
    file_count!: number | bigint;

    static createFrom({header_lines = null, separator = null, string_delimiter = null, decimal_separator = null, thousands_separator = null, columns, line_count, fail_count, file_count}: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns: globalThis.Array<io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): CsvStatistics {
      return new CsvStatistics($g.abi.libs_by_name.get(stdlib.name)!.mapped[130], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, columns, line_count, fail_count, file_count);
    }
    static create(header_lines: number | bigint | null, separator: string | null, string_delimiter: string | null, decimal_separator: string | null, thousands_separator: string | null, columns: globalThis.Array<io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): CsvStatistics {
      return new CsvStatistics($g.abi.libs_by_name.get(stdlib.name)!.mapped[130], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, columns, line_count, fail_count, file_count);
    }
  }

  export class Http extends $greycat.GCObject {
    static readonly _type = 'io::Http';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Http {
      return new Http($g.abi.libs_by_name.get(stdlib.name)!.mapped[131]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Http {
      return new Http($g.abi.libs_by_name.get(stdlib.name)!.mapped[131]);
    }
  }

  export class CsvColumn extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumn';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;

  }

  export class CsvAnalysisConfig extends $greycat.GCObject {
    static readonly _type = 'io::CsvAnalysisConfig';

    header_lines!: number | bigint | null;
    separator!: string | null;
    string_delimiter!: string | null;
    decimal_separator!: string | null;
    thousands_separator!: string | null;
    row_limit!: number | bigint | null;
    enumerable_limit!: number | bigint | null;
    date_check_limit!: number | bigint | null;
    date_formats!: globalThis.Array<string> | null;

    static enumerable_limit_default($g: $greycat.GreyCat = $greycat.$.default): bigint {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[133];
      return  t.static_values['enumerable_limit_default'] as bigint;
    }
    static date_check_limit_default($g: $greycat.GreyCat = $greycat.$.default): bigint {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[133];
      return  t.static_values['date_check_limit_default'] as bigint;
    }
    static createFrom({header_lines = null, separator = null, string_delimiter = null, decimal_separator = null, thousands_separator = null, row_limit = null, enumerable_limit = null, date_check_limit = null, date_formats = null}: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, row_limit?: number | bigint | null, enumerable_limit?: number | bigint | null, date_check_limit?: number | bigint | null, date_formats?: globalThis.Array<string> | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysisConfig {
      return new CsvAnalysisConfig($g.abi.libs_by_name.get(stdlib.name)!.mapped[133], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, row_limit, enumerable_limit, date_check_limit, date_formats);
    }
    static create(header_lines: number | bigint | null = null, separator: string | null = null, string_delimiter: string | null = null, decimal_separator: string | null = null, thousands_separator: string | null = null, row_limit: number | bigint | null = null, enumerable_limit: number | bigint | null = null, date_check_limit: number | bigint | null = null, date_formats: globalThis.Array<string> | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysisConfig {
      return new CsvAnalysisConfig($g.abi.libs_by_name.get(stdlib.name)!.mapped[133], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, row_limit, enumerable_limit, date_check_limit, date_formats);
    }
  }

  export class CsvAnalysis$analyze$args extends $greycat.GCObject {
    static readonly _type = 'io::CsvAnalysis$analyze$args';

    file_path!: string;
    config!: io.CsvAnalysisConfig | null;

    static createFrom({file_path, config = null}: {file_path: string, config?: io.CsvAnalysisConfig | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysis$analyze$args {
      return new CsvAnalysis$analyze$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[134], file_path, config);
    }
    static create(file_path: string, config: io.CsvAnalysisConfig | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysis$analyze$args {
      return new CsvAnalysis$analyze$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[134], file_path, config);
    }
  }

  export class File extends $greycat.GCObject {
    static readonly _type = 'io::File';

    path!: string;
    size!: number | bigint | null;
    last_modification!: core.time | null;

    static createFrom({path, size = null, last_modification = null}: {path: string, size?: number | bigint | null, last_modification?: core.time | null}, $g: $greycat.GreyCat = $greycat.$.default): File {
      return new File($g.abi.libs_by_name.get(stdlib.name)!.mapped[135], path, size, last_modification);
    }
    static create(path: string, size: number | bigint | null = null, last_modification: core.time | null = null, $g: $greycat.GreyCat = $greycat.$.default): File {
      return new File($g.abi.libs_by_name.get(stdlib.name)!.mapped[135], path, size, last_modification);
    }
  }

  export class Reader<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::Reader';

    path!: string;
    pos!: number | bigint | null;

  }

  export class TextReader extends $greycat.GCObject {
    static readonly _type = 'io::TextReader';

    path!: string;
    pos!: number | bigint | null;

    static createFrom({path, pos = null}: {path: string, pos?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): TextReader {
      return new TextReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[137], path, pos);
    }
    static create(path: string, pos: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): TextReader {
      return new TextReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[137], path, pos);
    }
  }

  export class TextEncoder extends $greycat.GCEnum {
    static readonly _type = 'io::TextEncoder';

    constructor(type: $greycat.AbiType, offset: number, public override key: TextEncoder.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static plain($g: $greycat.GreyCat = $greycat.$.default): TextEncoder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[138];
      return t.static_values['plain'];
    }
    static base64($g: $greycat.GreyCat = $greycat.$.default): TextEncoder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[138];
      return t.static_values['base64'];
    }
    static base64url($g: $greycat.GreyCat = $greycat.$.default): TextEncoder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[138];
      return t.static_values['base64url'];
    }
    static hexadecimal($g: $greycat.GreyCat = $greycat.$.default): TextEncoder {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[138];
      return t.static_values['hexadecimal'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): TextEncoder[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[138];
      return t.enum_values as TextEncoder[];
    }
  }

  export namespace TextEncoder  {
    export type Field = 'plain'|'base64'|'base64url'|'hexadecimal';
  }
  export class SmtpMode extends $greycat.GCEnum {
    static readonly _type = 'io::SmtpMode';

    constructor(type: $greycat.AbiType, offset: number, public override key: SmtpMode.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static plain($g: $greycat.GreyCat = $greycat.$.default): SmtpMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[139];
      return t.static_values['plain'];
    }
    static ssl_tls($g: $greycat.GreyCat = $greycat.$.default): SmtpMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[139];
      return t.static_values['ssl_tls'];
    }
    static starttls($g: $greycat.GreyCat = $greycat.$.default): SmtpMode {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[139];
      return t.static_values['starttls'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): SmtpMode[] {
      const t = $g.abi.libs_by_name.get(stdlib.name)!.mapped[139];
      return t.enum_values as SmtpMode[];
    }
  }

  export namespace SmtpMode  {
    export type Field = 'plain'|'ssl_tls'|'starttls';
  }
  export class CsvWriter<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::CsvWriter';

    path!: string;
    append!: boolean | null;
    format!: io.CsvFormat | null;

    static createFrom<T>({path, append = null, format = null}: {path: string, append?: boolean | null, format?: io.CsvFormat | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvWriter {
      return new CsvWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[140], path, append, format);
    }
    static create<T>(path: string, append: boolean | null = null, format: io.CsvFormat | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvWriter<T> {
      return new CsvWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[140], path, append, format);
    }
  }

  export class Email extends $greycat.GCObject {
    static readonly _type = 'io::Email';

    from!: string;
    subject!: string;
    body!: string;
    body_is_html!: boolean;
    to!: globalThis.Array<string>;
    cc!: globalThis.Array<string> | null;
    bcc!: globalThis.Array<string> | null;

    static createFrom({from, subject, body, body_is_html, to, cc = null, bcc = null}: {from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc?: globalThis.Array<string> | null, bcc?: globalThis.Array<string> | null}, $g: $greycat.GreyCat = $greycat.$.default): Email {
      return new Email($g.abi.libs_by_name.get(stdlib.name)!.mapped[141], from, subject, body, body_is_html, to, cc, bcc);
    }
    static create(from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc: globalThis.Array<string> | null = null, bcc: globalThis.Array<string> | null = null, $g: $greycat.GreyCat = $greycat.$.default): Email {
      return new Email($g.abi.libs_by_name.get(stdlib.name)!.mapped[141], from, subject, body, body_is_html, to, cc, bcc);
    }
  }

  export class Url extends $greycat.GCObject {
    static readonly _type = 'io::Url';

    protocol!: string | null;
    host!: string | null;
    port!: number | bigint | null;
    path!: string | null;
    params!: globalThis.Map<string, string> | null;
    hash!: string | null;

    static createFrom({protocol = null, host = null, port = null, path = null, params = null, hash = null}: {protocol?: string | null, host?: string | null, port?: number | bigint | null, path?: string | null, params?: globalThis.Map<string, string> | null, hash?: string | null}, $g: $greycat.GreyCat = $greycat.$.default): Url {
      return new Url($g.abi.libs_by_name.get(stdlib.name)!.mapped[142], protocol, host, port, path, params, hash);
    }
    static create(protocol: string | null = null, host: string | null = null, port: number | bigint | null = null, path: string | null = null, params: globalThis.Map<string, string> | null = null, hash: string | null = null, $g: $greycat.GreyCat = $greycat.$.default): Url {
      return new Url($g.abi.libs_by_name.get(stdlib.name)!.mapped[142], protocol, host, port, path, params, hash);
    }
  }

  export class Writer<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::Writer';

    path!: string;
    append!: boolean | null;

  }

  // @ts-expect-error
  export class JsonWriter<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::JsonWriter';

    path!: string;
    append!: boolean | null;

    // @ts-expect-error
    static createFrom<T>({path, append = null}: {path: string, append?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): JsonWriter {
      return new JsonWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[144], path, append);
    }
    static create<T>(path: string, append: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): JsonWriter<T> {
      return new JsonWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[144], path, append);
    }
  }

  export class CsvColumnString extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnString';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;
    trim!: boolean | null;
    try_number!: boolean | null;
    try_json!: boolean | null;
    values!: globalThis.Array<string> | null;
    encoder!: io.TextEncoder | null;

    static createFrom({name = null, mandatory = null, offset = null, trim = null, try_number = null, try_json = null, values = null, encoder = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, trim?: boolean | null, try_number?: boolean | null, try_json?: boolean | null, values?: globalThis.Array<string> | null, encoder?: io.TextEncoder | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnString {
      return new CsvColumnString($g.abi.libs_by_name.get(stdlib.name)!.mapped[145], name, mandatory, offset, trim, try_number, try_json, values, encoder);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, trim: boolean | null = null, try_number: boolean | null = null, try_json: boolean | null = null, values: globalThis.Array<string> | null = null, encoder: io.TextEncoder | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnString {
      return new CsvColumnString($g.abi.libs_by_name.get(stdlib.name)!.mapped[145], name, mandatory, offset, trim, try_number, try_json, values, encoder);
    }
  }

  // @ts-expect-error
  export class TextWriter<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::TextWriter';

    path!: string;
    append!: boolean | null;

    // @ts-expect-error
    static createFrom<T>({path, append = null}: {path: string, append?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): TextWriter {
      return new TextWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[146], path, append);
    }
    static create<T>(path: string, append: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): TextWriter<T> {
      return new TextWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[146], path, append);
    }
  }

  export class CsvSharding extends $greycat.GCObject {
    static readonly _type = 'io::CsvSharding';

    id!: number | bigint;
    column!: number | bigint;
    modulo!: number | bigint;

    static createFrom({id, column, modulo}: {id: number | bigint, column: number | bigint, modulo: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): CsvSharding {
      return new CsvSharding($g.abi.libs_by_name.get(stdlib.name)!.mapped[147], id, column, modulo);
    }
    static create(id: number | bigint, column: number | bigint, modulo: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): CsvSharding {
      return new CsvSharding($g.abi.libs_by_name.get(stdlib.name)!.mapped[147], id, column, modulo);
    }
  }

  export class CsvFormat$infer$args extends $greycat.GCObject {
    static readonly _type = 'io::CsvFormat$infer$args';

    analysis!: io.CsvStatistics;

    static createFrom({analysis}: {analysis: io.CsvStatistics}, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$infer$args {
      return new CsvFormat$infer$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[148], analysis);
    }
    static create(analysis: io.CsvStatistics, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$infer$args {
      return new CsvFormat$infer$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[148], analysis);
    }
  }

  export class FileWalker extends $greycat.GCObject {
    static readonly _type = 'io::FileWalker';

    path!: string;

    static createFrom({path}: {path: string}, $g: $greycat.GreyCat = $greycat.$.default): FileWalker {
      return new FileWalker($g.abi.libs_by_name.get(stdlib.name)!.mapped[149], path);
    }
    static create(path: string, $g: $greycat.GreyCat = $greycat.$.default): FileWalker {
      return new FileWalker($g.abi.libs_by_name.get(stdlib.name)!.mapped[149], path);
    }
  }

  // @ts-expect-error
  export class GcbWriter<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::GcbWriter';

    path!: string;
    append!: boolean | null;

    // @ts-expect-error
    static createFrom<T>({path, append = null}: {path: string, append?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): GcbWriter {
      return new GcbWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[150], path, append);
    }
    static create<T>(path: string, append: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): GcbWriter<T> {
      return new GcbWriter($g.abi.libs_by_name.get(stdlib.name)!.mapped[150], path, append);
    }
  }

  export class CsvValidateResult extends $greycat.GCObject {
    static readonly _type = 'io::CsvValidateResult';

    line_count!: number | bigint;
    fail_count!: number | bigint;
    invalid_count!: globalThis.Array<number | bigint>;

    static createFrom({line_count, fail_count, invalid_count}: {line_count: number | bigint, fail_count: number | bigint, invalid_count: globalThis.Array<number | bigint>}, $g: $greycat.GreyCat = $greycat.$.default): CsvValidateResult {
      return new CsvValidateResult($g.abi.libs_by_name.get(stdlib.name)!.mapped[151], line_count, fail_count, invalid_count);
    }
    static create(line_count: number | bigint, fail_count: number | bigint, invalid_count: globalThis.Array<number | bigint>, $g: $greycat.GreyCat = $greycat.$.default): CsvValidateResult {
      return new CsvValidateResult($g.abi.libs_by_name.get(stdlib.name)!.mapped[151], line_count, fail_count, invalid_count);
    }
  }

  export class CsvColumnTime extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnTime';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;
    unit!: core.DurationUnit | null;

    static createFrom({name = null, mandatory = null, offset = null, unit = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: core.DurationUnit | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnTime {
      return new CsvColumnTime($g.abi.libs_by_name.get(stdlib.name)!.mapped[152], name, mandatory, offset, unit);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, unit: core.DurationUnit | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnTime {
      return new CsvColumnTime($g.abi.libs_by_name.get(stdlib.name)!.mapped[152], name, mandatory, offset, unit);
    }
  }

  export class CsvColumnStatistics extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnStatistics';

    name!: string | null;
    example!: any | null;
    null_count!: number | bigint;
    bool_count!: number | bigint;
    int_count!: number | bigint;
    float_count!: number | bigint;
    string_count!: number | bigint;
    date_count!: number | bigint;
    date_format_count!: globalThis.Map<string, number | bigint>;
    enumerable_count!: globalThis.Map<any, number | bigint>;
    profile!: util.Gaussian;

    static createFrom({name = null, example = null, null_count, bool_count, int_count, float_count, string_count, date_count, date_format_count, enumerable_count, profile}: {name?: string | null, example?: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: util.Gaussian}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnStatistics {
      return new CsvColumnStatistics($g.abi.libs_by_name.get(stdlib.name)!.mapped[153], name, example, null_count, bool_count, int_count, float_count, string_count, date_count, date_format_count, enumerable_count, profile);
    }
    static create(name: string | null, example: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: util.Gaussian, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnStatistics {
      return new CsvColumnStatistics($g.abi.libs_by_name.get(stdlib.name)!.mapped[153], name, example, null_count, bool_count, int_count, float_count, string_count, date_count, date_format_count, enumerable_count, profile);
    }
  }

  // @ts-expect-error
  export class CsvReader<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::CsvReader';

    path!: string;
    pos!: number | bigint | null;
    format!: io.CsvFormat | null;
    sharding!: io.CsvSharding | null;

    // @ts-expect-error
    static createFrom<T>({path, pos = null, format = null, sharding = null}: {path: string, pos?: number | bigint | null, format?: io.CsvFormat | null, sharding?: io.CsvSharding | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvReader {
      return new CsvReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[154], path, pos, format, sharding);
    }
    static create<T>(path: string, pos: number | bigint | null = null, format: io.CsvFormat | null = null, sharding: io.CsvSharding | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvReader<T> {
      return new CsvReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[154], path, pos, format, sharding);
    }
  }

  export class CsvColumnDate extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnDate';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;
    format!: string | null;
    tz!: core.TimeZone | null;
    as_time!: boolean | null;

    static createFrom({name = null, mandatory = null, offset = null, format = null, tz = null, as_time = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, format?: string | null, tz?: core.TimeZone | null, as_time?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnDate {
      return new CsvColumnDate($g.abi.libs_by_name.get(stdlib.name)!.mapped[155], name, mandatory, offset, format, tz, as_time);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, format: string | null = null, tz: core.TimeZone | null = null, as_time: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnDate {
      return new CsvColumnDate($g.abi.libs_by_name.get(stdlib.name)!.mapped[155], name, mandatory, offset, format, tz, as_time);
    }
  }

  export class CsvAnalysis extends $greycat.GCObject {
    static readonly _type = 'io::CsvAnalysis';

    config!: io.CsvAnalysisConfig | null;
    statistics!: io.CsvStatistics | null;

    static analyze(file_path: string, config: io.CsvAnalysisConfig | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<io.CsvStatistics> {
      return $g.call('io::CsvAnalysis::analyze', [file_path, config], $signal);
    }
    static createFrom({config = null, statistics = null}: {config?: io.CsvAnalysisConfig | null, statistics?: io.CsvStatistics | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysis {
      return new CsvAnalysis($g.abi.libs_by_name.get(stdlib.name)!.mapped[156], config, statistics);
    }
    static create(config: io.CsvAnalysisConfig | null = null, statistics: io.CsvStatistics | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvAnalysis {
      return new CsvAnalysis($g.abi.libs_by_name.get(stdlib.name)!.mapped[156], config, statistics);
    }
  }

  export class Smtp extends $greycat.GCObject {
    static readonly _type = 'io::Smtp';

    host!: string;
    port!: number | bigint;
    mode!: io.SmtpMode | null;
    authenticate!: io.SmtpAuth | null;
    user!: string | null;
    pass!: string | null;

    static createFrom({host, port, mode = null, authenticate = null, user = null, pass = null}: {host: string, port: number | bigint, mode?: io.SmtpMode | null, authenticate?: io.SmtpAuth | null, user?: string | null, pass?: string | null}, $g: $greycat.GreyCat = $greycat.$.default): Smtp {
      return new Smtp($g.abi.libs_by_name.get(stdlib.name)!.mapped[157], host, port, mode, authenticate, user, pass);
    }
    static create(host: string, port: number | bigint, mode: io.SmtpMode | null = null, authenticate: io.SmtpAuth | null = null, user: string | null = null, pass: string | null = null, $g: $greycat.GreyCat = $greycat.$.default): Smtp {
      return new Smtp($g.abi.libs_by_name.get(stdlib.name)!.mapped[157], host, port, mode, authenticate, user, pass);
    }
  }

  export class CsvColumnDuration extends $greycat.GCObject {
    static readonly _type = 'io::CsvColumnDuration';

    name!: string | null;
    mandatory!: boolean | null;
    offset!: number | bigint | null;
    unit!: core.DurationUnit | null;

    static createFrom({name = null, mandatory = null, offset = null, unit = null}: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: core.DurationUnit | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnDuration {
      return new CsvColumnDuration($g.abi.libs_by_name.get(stdlib.name)!.mapped[158], name, mandatory, offset, unit);
    }
    static create(name: string | null = null, mandatory: boolean | null = null, offset: number | bigint | null = null, unit: core.DurationUnit | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvColumnDuration {
      return new CsvColumnDuration($g.abi.libs_by_name.get(stdlib.name)!.mapped[158], name, mandatory, offset, unit);
    }
  }

  // @ts-expect-error
  export class GcbReader<T = any> extends $greycat.GCObject {
    static readonly _type = 'io::GcbReader';

    path!: string;
    pos!: number | bigint | null;

    // @ts-expect-error
    static createFrom<T>({path, pos = null}: {path: string, pos?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): GcbReader {
      return new GcbReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[159], path, pos);
    }
    static create<T>(path: string, pos: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): GcbReader<T> {
      return new GcbReader($g.abi.libs_by_name.get(stdlib.name)!.mapped[159], path, pos);
    }
  }

  export class HttpHeader extends $greycat.GCObject {
    static readonly _type = 'io::HttpHeader';

    name!: string;
    value!: string;

    static createFrom({name, value}: {name: string, value: string}, $g: $greycat.GreyCat = $greycat.$.default): HttpHeader {
      return new HttpHeader($g.abi.libs_by_name.get(stdlib.name)!.mapped[160], name, value);
    }
    static create(name: string, value: string, $g: $greycat.GreyCat = $greycat.$.default): HttpHeader {
      return new HttpHeader($g.abi.libs_by_name.get(stdlib.name)!.mapped[160], name, value);
    }
  }

  export class CsvFormat$sample$args extends $greycat.GCObject {
    static readonly _type = 'io::CsvFormat$sample$args';

    path!: string;
    format!: io.CsvFormat | null;
    offset!: number | bigint | null;
    max!: number | bigint | null;

    static createFrom({path, format = null, offset = null, max = null}: {path: string, format?: io.CsvFormat | null, offset?: number | bigint | null, max?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$sample$args {
      return new CsvFormat$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[161], path, format, offset, max);
    }
    static create(path: string, format: io.CsvFormat | null = null, offset: number | bigint | null = null, max: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat$sample$args {
      return new CsvFormat$sample$args($g.abi.libs_by_name.get(stdlib.name)!.mapped[161], path, format, offset, max);
    }
  }

  export class CsvFormat extends $greycat.GCObject {
    static readonly _type = 'io::CsvFormat';

    header_lines!: number | bigint | null;
    separator!: string | null;
    string_delimiter!: string | null;
    decimal_separator!: string | null;
    thousands_separator!: string | null;
    columns_size!: number | bigint | null;
    columns!: globalThis.Array<io.CsvColumn> | null;

    static infer(analysis: io.CsvStatistics, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<io.CsvFormat> {
      return $g.call('io::CsvFormat::infer', [analysis], $signal);
    }
    static sample(path: string, format: io.CsvFormat | null = null, offset: number | bigint | null = null, max: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<core.Table> {
      return $g.call('io::CsvFormat::sample', [path, format, offset, max], $signal);
    }
    static validate(path: string, format: io.CsvFormat, max_rows: number | bigint | null = null, max_invalid: number | bigint | null = null, invalid_path: string | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<io.CsvValidateResult> {
      return $g.call('io::CsvFormat::validate', [path, format, max_rows, max_invalid, invalid_path], $signal);
    }
    static generate(format: io.CsvFormat, ident_col: number | bigint | null = null, time_col: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
      return $g.call('io::CsvFormat::generate', [format, ident_col, time_col], $signal);
    }
    static createFrom({header_lines = null, separator = null, string_delimiter = null, decimal_separator = null, thousands_separator = null, columns_size = null, columns = null}: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns_size?: number | bigint | null, columns?: globalThis.Array<io.CsvColumn> | null}, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat {
      return new CsvFormat($g.abi.libs_by_name.get(stdlib.name)!.mapped[162], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, columns_size, columns);
    }
    static create(header_lines: number | bigint | null = null, separator: string | null = null, string_delimiter: string | null = null, decimal_separator: string | null = null, thousands_separator: string | null = null, columns_size: number | bigint | null = null, columns: globalThis.Array<io.CsvColumn> | null = null, $g: $greycat.GreyCat = $greycat.$.default): CsvFormat {
      return new CsvFormat($g.abi.libs_by_name.get(stdlib.name)!.mapped[162], header_lines, separator, string_delimiter, decimal_separator, thousands_separator, columns_size, columns);
    }
  }

}

export namespace util {
  export class LogQuantizer<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::LogQuantizer';

    min!: any | null;
    max!: any | null;
    bins!: number | bigint;
    open!: boolean | null;

    static createFrom<T>({min = null, max = null, bins, open = null}: {min?: any | null, max?: any | null, bins: number | bigint, open?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): LogQuantizer {
      return new LogQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[163], min, max, bins, open);
    }
    static create<T>(min: any | null, max: any | null, bins: number | bigint, open: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): LogQuantizer<T> {
      return new LogQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[163], min, max, bins, open);
    }
  }

  export class Queue<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::Queue';

    values!: globalThis.Array<any | null> | null;
    capacity!: number | bigint | null;

    static createFrom<T>({values = null, capacity = null}: {values?: globalThis.Array<any | null> | null, capacity?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): Queue {
      return new Queue($g.abi.libs_by_name.get(stdlib.name)!.mapped[164], values, capacity);
    }
    static create<T>(values: globalThis.Array<any | null> | null = null, capacity: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): Queue<T> {
      return new Queue($g.abi.libs_by_name.get(stdlib.name)!.mapped[164], values, capacity);
    }
  }

  export class CustomQuantizer<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::CustomQuantizer';

    min!: any | null;
    max!: any | null;
    step_starts!: globalThis.Array<any | null>;
    open!: boolean | null;

    static createFrom<T>({min = null, max = null, step_starts, open = null}: {min?: any | null, max?: any | null, step_starts: globalThis.Array<any | null>, open?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): CustomQuantizer {
      return new CustomQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[165], min, max, step_starts, open);
    }
    static create<T>(min: any | null, max: any | null, step_starts: globalThis.Array<any | null>, open: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): CustomQuantizer<T> {
      return new CustomQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[165], min, max, step_starts, open);
    }
  }

  export class TimeWindow<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::TimeWindow';

    values!: core.Table<core.Tuple<core.time, any | null>> | null;
    span!: core.duration;
    sum!: number | null;
    sumsq!: number | null;
    field!: core.field | null;

    static createFrom<T>({values = null, span, sum = null, sumsq = null, field = null}: {values?: core.Table<core.Tuple<core.time, any | null>> | null, span: core.duration, sum?: number | null, sumsq?: number | null, field?: core.field | null}, $g: $greycat.GreyCat = $greycat.$.default): TimeWindow {
      return new TimeWindow($g.abi.libs_by_name.get(stdlib.name)!.mapped[166], values, span, sum, sumsq, field);
    }
    static create<T>(values: core.Table<core.Tuple<core.time, any | null>> | null, span: core.duration, sum: number | null = null, sumsq: number | null = null, field: core.field | null = null, $g: $greycat.GreyCat = $greycat.$.default): TimeWindow<T> {
      return new TimeWindow($g.abi.libs_by_name.get(stdlib.name)!.mapped[166], values, span, sum, sumsq, field);
    }
  }

  export class Assert extends $greycat.GCObject {
    static readonly _type = 'util::Assert';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Assert {
      return new Assert($g.abi.libs_by_name.get(stdlib.name)!.mapped[167]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Assert {
      return new Assert($g.abi.libs_by_name.get(stdlib.name)!.mapped[167]);
    }
  }

  export class Gaussian extends $greycat.GCObject {
    static readonly _type = 'util::Gaussian';

    sum!: number | null;
    sumsq!: number | null;
    count!: number | bigint | null;
    min!: number | null;
    max!: number | null;

    static createFrom({sum = null, sumsq = null, count = null, min = null, max = null}: {sum?: number | null, sumsq?: number | null, count?: number | bigint | null, min?: number | null, max?: number | null}, $g: $greycat.GreyCat = $greycat.$.default): Gaussian {
      return new Gaussian($g.abi.libs_by_name.get(stdlib.name)!.mapped[168], sum, sumsq, count, min, max);
    }
    static create(sum: number | null = null, sumsq: number | null = null, count: number | bigint | null = null, min: number | null = null, max: number | null = null, $g: $greycat.GreyCat = $greycat.$.default): Gaussian {
      return new Gaussian($g.abi.libs_by_name.get(stdlib.name)!.mapped[168], sum, sumsq, count, min, max);
    }
  }

  export class Histogram<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::Histogram';

    quantizer!: util.Quantizer;
    bins!: globalThis.Array<number | bigint | null> | null;
    nb_rejected!: number | bigint | null;

    static createFrom<T>({quantizer, bins = null, nb_rejected = null}: {quantizer: util.Quantizer, bins?: globalThis.Array<number | bigint | null> | null, nb_rejected?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): Histogram {
      return new Histogram($g.abi.libs_by_name.get(stdlib.name)!.mapped[169], quantizer, bins, nb_rejected);
    }
    static create<T>(quantizer: util.Quantizer, bins: globalThis.Array<number | bigint | null> | null = null, nb_rejected: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): Histogram<T> {
      return new Histogram($g.abi.libs_by_name.get(stdlib.name)!.mapped[169], quantizer, bins, nb_rejected);
    }
  }

  export class Stack<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::Stack';

    values!: globalThis.Array<any | null> | null;

    static createFrom<T>({values = null}: {values?: globalThis.Array<any | null> | null}, $g: $greycat.GreyCat = $greycat.$.default): Stack {
      return new Stack($g.abi.libs_by_name.get(stdlib.name)!.mapped[170], values);
    }
    static create<T>(values: globalThis.Array<any | null> | null = null, $g: $greycat.GreyCat = $greycat.$.default): Stack<T> {
      return new Stack($g.abi.libs_by_name.get(stdlib.name)!.mapped[170], values);
    }
  }

  export class Crypto extends $greycat.GCObject {
    static readonly _type = 'util::Crypto';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Crypto {
      return new Crypto($g.abi.libs_by_name.get(stdlib.name)!.mapped[171]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Crypto {
      return new Crypto($g.abi.libs_by_name.get(stdlib.name)!.mapped[171]);
    }
  }

  export class ProgressTracker extends $greycat.GCObject {
    static readonly _type = 'util::ProgressTracker';

    start!: core.time;
    total!: number | bigint | null;
    counter!: number | bigint | null;
    duration!: core.duration | null;
    progress!: number | null;
    speed!: number | null;
    remaining!: core.duration | null;

    static createFrom({start, total = null, counter = null, duration = null, progress = null, speed = null, remaining = null}: {start: core.time, total?: number | bigint | null, counter?: number | bigint | null, duration?: core.duration | null, progress?: number | null, speed?: number | null, remaining?: core.duration | null}, $g: $greycat.GreyCat = $greycat.$.default): ProgressTracker {
      return new ProgressTracker($g.abi.libs_by_name.get(stdlib.name)!.mapped[172], start, total, counter, duration, progress, speed, remaining);
    }
    static create(start: core.time, total: number | bigint | null = null, counter: number | bigint | null = null, duration: core.duration | null = null, progress: number | null = null, speed: number | null = null, remaining: core.duration | null = null, $g: $greycat.GreyCat = $greycat.$.default): ProgressTracker {
      return new ProgressTracker($g.abi.libs_by_name.get(stdlib.name)!.mapped[172], start, total, counter, duration, progress, speed, remaining);
    }
  }

  export class Quantizer<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::Quantizer';


  }

  export class GaussianProfile<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::GaussianProfile';

    quantizer!: util.Quantizer;
    precision!: core.FloatPrecision;
    bins!: core.Table<util.GaussianProfileSlot | null> | null;
    value_min!: number | null;
    nb_rejected!: number | bigint | null;

    static createFrom<T>({quantizer, precision, bins = null, value_min = null, nb_rejected = null}: {quantizer: util.Quantizer, precision: core.FloatPrecision, bins?: core.Table<util.GaussianProfileSlot | null> | null, value_min?: number | null, nb_rejected?: number | bigint | null}, $g: $greycat.GreyCat = $greycat.$.default): GaussianProfile {
      return new GaussianProfile($g.abi.libs_by_name.get(stdlib.name)!.mapped[174], quantizer, precision, bins, value_min, nb_rejected);
    }
    static create<T>(quantizer: util.Quantizer, precision: core.FloatPrecision, bins: core.Table<util.GaussianProfileSlot | null> | null = null, value_min: number | null = null, nb_rejected: number | bigint | null = null, $g: $greycat.GreyCat = $greycat.$.default): GaussianProfile<T> {
      return new GaussianProfile($g.abi.libs_by_name.get(stdlib.name)!.mapped[174], quantizer, precision, bins, value_min, nb_rejected);
    }
  }

  export class GaussianProfileSlot extends $greycat.GCObject {
    static readonly _type = 'util::GaussianProfileSlot';

    sum!: number | bigint;
    sumsq!: number | bigint;
    count!: number | bigint;

    static createFrom({sum, sumsq, count}: {sum: number | bigint, sumsq: number | bigint, count: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): GaussianProfileSlot {
      return new GaussianProfileSlot($g.abi.libs_by_name.get(stdlib.name)!.mapped[175], sum, sumsq, count);
    }
    static create(sum: number | bigint, sumsq: number | bigint, count: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): GaussianProfileSlot {
      return new GaussianProfileSlot($g.abi.libs_by_name.get(stdlib.name)!.mapped[175], sum, sumsq, count);
    }
  }

  export class HistogramStats extends $greycat.GCObject {
    static readonly _type = 'util::HistogramStats';

    min!: number;
    max!: number;
    whisker_low!: number;
    whisker_high!: number;
    percentile1!: number;
    percentile5!: number;
    percentile25!: number;
    percentile50!: number;
    percentile75!: number;
    percentile95!: number;
    percentile99!: number;
    count_outliers_low!: number | bigint;
    count_outliers_high!: number | bigint;
    percentage_outliers_low!: number;
    percentage_outliers_high!: number;
    sum!: number;
    avg!: number;
    std!: number;
    size!: number | bigint;

    static createFrom({min, max, whisker_low, whisker_high, percentile1, percentile5, percentile25, percentile50, percentile75, percentile95, percentile99, count_outliers_low, count_outliers_high, percentage_outliers_low, percentage_outliers_high, sum, avg, std, size}: {min: number, max: number, whisker_low: number, whisker_high: number, percentile1: number, percentile5: number, percentile25: number, percentile50: number, percentile75: number, percentile95: number, percentile99: number, count_outliers_low: number | bigint, count_outliers_high: number | bigint, percentage_outliers_low: number, percentage_outliers_high: number, sum: number, avg: number, std: number, size: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): HistogramStats {
      return new HistogramStats($g.abi.libs_by_name.get(stdlib.name)!.mapped[176], min, max, whisker_low, whisker_high, percentile1, percentile5, percentile25, percentile50, percentile75, percentile95, percentile99, count_outliers_low, count_outliers_high, percentage_outliers_low, percentage_outliers_high, sum, avg, std, size);
    }
    static create(min: number, max: number, whisker_low: number, whisker_high: number, percentile1: number, percentile5: number, percentile25: number, percentile50: number, percentile75: number, percentile95: number, percentile99: number, count_outliers_low: number | bigint, count_outliers_high: number | bigint, percentage_outliers_low: number, percentage_outliers_high: number, sum: number, avg: number, std: number, size: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): HistogramStats {
      return new HistogramStats($g.abi.libs_by_name.get(stdlib.name)!.mapped[176], min, max, whisker_low, whisker_high, percentile1, percentile5, percentile25, percentile50, percentile75, percentile95, percentile99, count_outliers_low, count_outliers_high, percentage_outliers_low, percentage_outliers_high, sum, avg, std, size);
    }
  }

  export class Random extends $greycat.GCObject {
    static readonly _type = 'util::Random';

    seed!: number | bigint | null;
    v!: number | null;

    static createFrom({seed = null, v = null}: {seed?: number | bigint | null, v?: number | null}, $g: $greycat.GreyCat = $greycat.$.default): Random {
      return new Random($g.abi.libs_by_name.get(stdlib.name)!.mapped[177], seed, v);
    }
    static create(seed: number | bigint | null = null, v: number | null = null, $g: $greycat.GreyCat = $greycat.$.default): Random {
      return new Random($g.abi.libs_by_name.get(stdlib.name)!.mapped[177], seed, v);
    }
  }

  export class MultiQuantizer<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::MultiQuantizer';

    dimensions!: globalThis.Array<util.Quantizer>;

    static createFrom<T>({dimensions}: {dimensions: globalThis.Array<util.Quantizer>}, $g: $greycat.GreyCat = $greycat.$.default): MultiQuantizer {
      return new MultiQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[178], dimensions);
    }
    static create<T>(dimensions: globalThis.Array<util.Quantizer>, $g: $greycat.GreyCat = $greycat.$.default): MultiQuantizer<T> {
      return new MultiQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[178], dimensions);
    }
  }

  export class QuantizerSlotBound<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::QuantizerSlotBound';

    min!: any | null;
    max!: any | null;
    center!: any | null;

    static createFrom<T>({min = null, max = null, center = null}: {min?: any | null, max?: any | null, center?: any | null}, $g: $greycat.GreyCat = $greycat.$.default): QuantizerSlotBound {
      return new QuantizerSlotBound($g.abi.libs_by_name.get(stdlib.name)!.mapped[179], min, max, center);
    }
    static create<T>(min: any | null = null, max: any | null = null, center: any | null = null, $g: $greycat.GreyCat = $greycat.$.default): QuantizerSlotBound<T> {
      return new QuantizerSlotBound($g.abi.libs_by_name.get(stdlib.name)!.mapped[179], min, max, center);
    }
  }

  export class Plot extends $greycat.GCObject {
    static readonly _type = 'util::Plot';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): Plot {
      return new Plot($g.abi.libs_by_name.get(stdlib.name)!.mapped[180]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): Plot {
      return new Plot($g.abi.libs_by_name.get(stdlib.name)!.mapped[180]);
    }
  }

  export class SlidingWindow<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::SlidingWindow';

    values!: globalThis.Array<any | null> | null;
    span!: number | bigint;
    sum!: number | null;
    sumsq!: number | null;
    field!: core.field | null;

    static createFrom<T>({values = null, span, sum = null, sumsq = null, field = null}: {values?: globalThis.Array<any | null> | null, span: number | bigint, sum?: number | null, sumsq?: number | null, field?: core.field | null}, $g: $greycat.GreyCat = $greycat.$.default): SlidingWindow {
      return new SlidingWindow($g.abi.libs_by_name.get(stdlib.name)!.mapped[181], values, span, sum, sumsq, field);
    }
    static create<T>(values: globalThis.Array<any | null> | null, span: number | bigint, sum: number | null = null, sumsq: number | null = null, field: core.field | null = null, $g: $greycat.GreyCat = $greycat.$.default): SlidingWindow<T> {
      return new SlidingWindow($g.abi.libs_by_name.get(stdlib.name)!.mapped[181], values, span, sum, sumsq, field);
    }
  }

  export class LinearQuantizer<T = any> extends $greycat.GCObject {
    static readonly _type = 'util::LinearQuantizer';

    min!: T | null;
    max!: T | null;
    bins!: number | bigint;
    open!: boolean | null;

    static createFrom<T>({min = null, max = null, bins, open = null}: {min?: T | null, max?: T | null, bins: number | bigint, open?: boolean | null}, $g: $greycat.GreyCat = $greycat.$.default): LinearQuantizer {
      return new LinearQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[182], min, max, bins, open);
    }
    static create<T>(min: T | null, max: T | null, bins: number | bigint, open: boolean | null = null, $g: $greycat.GreyCat = $greycat.$.default): LinearQuantizer<T> {
      return new LinearQuantizer($g.abi.libs_by_name.get(stdlib.name)!.mapped[182], min, max, bins, open);
    }
  }

}

export const stdlib: $greycat.Library = {
  name: 'std',
  mapped: new globalThis.Array(183),
  configure(loaders, factories) {
    factories.set(core.str._type, core.str);
    loaders.set(core.str._type, $greycat.std_n.core.str.load);
    factories.set(core.nodeGeo$info$args._type, core.nodeGeo$info$args);
    factories.set(core.t4._type, core.t4);
    loaders.set(core.t4._type, $greycat.std_n.core.t4.load);
    factories.set(core.nodeTime$info$args._type, core.nodeTime$info$args);
    factories.set(core.int._type, core.int);
    loaders.set(core.int._type, $greycat.std_n.core.int.load);
    factories.set(core.function_._type, core.function_);
    loaders.set(core.function_._type, $greycat.std_n.core.function_.load);
    factories.set(core.Error._type, core.Error);
    factories.set(core.nodeList$info$args._type, core.nodeList$info$args);
    factories.set(core.nodeList._type, core.nodeList);
    loaders.set(core.nodeList._type, $greycat.std_n.core.nodeList.load);
    factories.set(core.nodeGeo._type, core.nodeGeo);
    loaders.set(core.nodeGeo._type, $greycat.std_n.core.nodeGeo.load);
    factories.set(core.nodeIndex$sample$args._type, core.nodeIndex$sample$args);
    factories.set(core.Array._type, core.Array);
    loaders.set(core.Array._type, $greycat.std_n.core.Array.load);
    factories.set(core.Tensor._type, core.Tensor);
    loaders.set(core.Tensor._type, $greycat.std_n.core.Tensor.load);
    factories.set(core.String._type, core.String);
    loaders.set(core.String._type, $greycat.std_n.core.String.load);
    factories.set(core.field._type, core.field);
    loaders.set(core.field._type, $greycat.std_n.core.field.load);
    factories.set(core.t3._type, core.t3);
    loaders.set(core.t3._type, $greycat.std_n.core.t3.load);
    factories.set(core.Table._type, core.Table);
    loaders.set(core.Table._type, $greycat.std_n.core.Table.load);
    factories.set(core.Date$fromTime$args._type, core.Date$fromTime$args);
    factories.set(core.Date._type, core.Date);
    factories.set(core.Table$applyMappings$args._type, core.Table$applyMappings$args);
    factories.set(core.Buffer._type, core.Buffer);
    loaders.set(core.Buffer._type, $greycat.std_n.core.Buffer.load);
    factories.set(core.nodeTimeCursor._type, core.nodeTimeCursor);
    factories.set(core.node._type, core.node);
    loaders.set(core.node._type, $greycat.std_n.core.node.load);
    factories.set(core.GeoCircle._type, core.GeoCircle);
    factories.set(core.SamplingMode._type, core.SamplingMode);
    factories.set(core.GeoPoly._type, core.GeoPoly);
    factories.set(core.MathConstants._type, core.MathConstants);
    factories.set(core.type._type, core.type);
    loaders.set(core.type._type, $greycat.std_n.core.type.load);
    factories.set(core.nodeTimeSingleton._type, core.nodeTimeSingleton);
    factories.set(core.null_._type, core.null_);
    loaders.set(core.null_._type, $greycat.std_n.core.null_.load);
    factories.set(core.NodeInfo._type, core.NodeInfo);
    factories.set(core.char._type, core.char);
    loaders.set(core.char._type, $greycat.std_n.core.char.load);
    factories.set(core.node$resolve_all$args._type, core.node$resolve_all$args);
    factories.set(core.TableColumnMapping._type, core.TableColumnMapping);
    factories.set(core.nodeGeo$sample$args._type, core.nodeGeo$sample$args);
    factories.set(core.nodeTime._type, core.nodeTime);
    loaders.set(core.nodeTime._type, $greycat.std_n.core.nodeTime.load);
    factories.set(core.ErrorCode._type, core.ErrorCode);
    factories.set(core.nodeList$sample$args._type, core.nodeList$sample$args);
    factories.set(core.TensorType._type, core.TensorType);
    factories.set(core.bool._type, core.bool);
    loaders.set(core.bool._type, $greycat.std_n.core.bool.load);
    factories.set(core.DurationUnit._type, core.DurationUnit);
    factories.set(core.geo._type, core.geo);
    loaders.set(core.geo._type, $greycat.std_n.core.geo.load);
    factories.set(core.GeoBox._type, core.GeoBox);
    factories.set(core.Map._type, core.Map);
    loaders.set(core.Map._type, $greycat.std_n.core.Map.load);
    factories.set(core.Tuple._type, core.Tuple);
    factories.set(core.ErrorFrame._type, core.ErrorFrame);
    factories.set(core.CalendarUnit._type, core.CalendarUnit);
    factories.set(core.nodeTime$sample$args._type, core.nodeTime$sample$args);
    factories.set(core.t2._type, core.t2);
    loaders.set(core.t2._type, $greycat.std_n.core.t2.load);
    factories.set(core.FloatPrecision._type, core.FloatPrecision);
    factories.set(core.duration._type, core.duration);
    loaders.set(core.duration._type, $greycat.std_n.core.duration.load);
    factories.set(core.t4f._type, core.t4f);
    loaders.set(core.t4f._type, $greycat.std_n.core.t4f.load);
    factories.set(core.t2f._type, core.t2f);
    loaders.set(core.t2f._type, $greycat.std_n.core.t2f.load);
    factories.set(core.TimeZone._type, core.TimeZone);
    factories.set(core.time._type, core.time);
    loaders.set(core.time._type, $greycat.std_n.core.time.load);
    factories.set(core.float._type, core.float);
    loaders.set(core.float._type, $greycat.std_n.core.float.load);
    factories.set(core.nodeIndex$info$args._type, core.nodeIndex$info$args);
    factories.set(core.SortOrder._type, core.SortOrder);
    factories.set(core.nodeIndex._type, core.nodeIndex);
    loaders.set(core.nodeIndex._type, $greycat.std_n.core.nodeIndex.load);
    factories.set(core.t3f._type, core.t3f);
    loaders.set(core.t3f._type, $greycat.std_n.core.t3f.load);
    factories.set(runtime.Log._type, runtime.Log);
    factories.set(runtime.SecurityFields$set$args._type, runtime.SecurityFields$set$args);
    factories.set(runtime.User._type, runtime.User);
    factories.set(runtime.LogLevel._type, runtime.LogLevel);
    factories.set(runtime.User$logout$args._type, runtime.User$logout$args);
    factories.set(runtime.User$current$args._type, runtime.User$current$args);
    factories.set(runtime.PeriodicTask$set$args._type, runtime.PeriodicTask$set$args);
    factories.set(runtime.PeriodicTask$all$args._type, runtime.PeriodicTask$all$args);
    factories.set(runtime.License._type, runtime.License);
    factories.set(runtime.Task._type, runtime.Task);
    factories.set(runtime.SecurityFields$get$args._type, runtime.SecurityFields$get$args);
    factories.set(runtime.User$getToken$args._type, runtime.User$getToken$args);
    factories.set(runtime.Debug$workers$args._type, runtime.Debug$workers$args);
    factories.set(runtime.Debug._type, runtime.Debug);
    factories.set(runtime.Debug$resume$args._type, runtime.Debug$resume$args);
    factories.set(runtime.SecurityPolicy._type, runtime.SecurityPolicy);
    factories.set(runtime.UserCredential._type, runtime.UserCredential);
    factories.set(runtime.Job._type, runtime.Job);
    factories.set(runtime.Runtime$info$args._type, runtime.Runtime$info$args);
    factories.set(runtime.DebugVariable._type, runtime.DebugVariable);
    factories.set(runtime.RuntimeInfo._type, runtime.RuntimeInfo);
    factories.set(runtime.SecurityFields._type, runtime.SecurityFields);
    factories.set(runtime.CallPerf._type, runtime.CallPerf);
    factories.set(runtime.TaskStatus._type, runtime.TaskStatus);
    factories.set(runtime.User$renew$args._type, runtime.User$renew$args);
    factories.set(runtime.UserRole$set$args._type, runtime.UserRole$set$args);
    factories.set(runtime.DebugFrame._type, runtime.DebugFrame);
    factories.set(runtime.UserGroup._type, runtime.UserGroup);
    factories.set(runtime.User$tokenLogin$args._type, runtime.User$tokenLogin$args);
    factories.set(runtime.UserRole$remove$args._type, runtime.UserRole$remove$args);
    factories.set(runtime.Task$running$args._type, runtime.Task$running$args);
    factories.set(runtime.User$setPassword$args._type, runtime.User$setPassword$args);
    factories.set(runtime.System._type, runtime.System);
    factories.set(runtime.Debug$pause$args._type, runtime.Debug$pause$args);
    factories.set(runtime.LicenseType._type, runtime.LicenseType);
    factories.set(runtime.OpenIDConnect._type, runtime.OpenIDConnect);
    factories.set(runtime.SecurityPolicy$permissions$args._type, runtime.SecurityPolicy$permissions$args);
    factories.set(runtime.Runtime$abi$args._type, runtime.Runtime$abi$args);
    factories.set(runtime.Debug$info$args._type, runtime.Debug$info$args);
    factories.set(runtime.UserRole$all$args._type, runtime.UserRole$all$args);
    factories.set(runtime.SecurityEntity$set$args._type, runtime.SecurityEntity$set$args);
    factories.set(runtime.User$permissions$args._type, runtime.User$permissions$args);
    factories.set(runtime.UserGroupPolicy._type, runtime.UserGroupPolicy);
    factories.set(runtime.Runtime$root$args._type, runtime.Runtime$root$args);
    factories.set(runtime.SecurityEntity$all$args._type, runtime.SecurityEntity$all$args);
    factories.set(runtime.PeriodicTask._type, runtime.PeriodicTask);
    factories.set(runtime.UserGroupPolicyType._type, runtime.UserGroupPolicyType);
    factories.set(runtime.Runtime._type, runtime.Runtime);
    factories.set(runtime.Debug$add$args._type, runtime.Debug$add$args);
    factories.set(runtime.User$me$args._type, runtime.User$me$args);
    factories.set(runtime.DebugInfo._type, runtime.DebugInfo);
    factories.set(runtime.Debug$remove$args._type, runtime.Debug$remove$args);
    factories.set(runtime.DebugBreakpoint._type, runtime.DebugBreakpoint);
    factories.set(runtime.StoreStat._type, runtime.StoreStat);
    factories.set(runtime.UserRole._type, runtime.UserRole);
    factories.set(runtime.OpenIDConnect$config$args._type, runtime.OpenIDConnect$config$args);
    factories.set(runtime.User$login$args._type, runtime.User$login$args);
    factories.set(runtime.Task$is_running$args._type, runtime.Task$is_running$args);
    factories.set(runtime.SecurityEntity._type, runtime.SecurityEntity);
    factories.set(runtime.Task$history$args._type, runtime.Task$history$args);
    factories.set(runtime.Task$cancel$args._type, runtime.Task$cancel$args);
    factories.set(io.SmtpAuth._type, io.SmtpAuth);
    factories.set(io.CsvFormat$generate$args._type, io.CsvFormat$generate$args);
    factories.set(io.CsvFormat$validate$args._type, io.CsvFormat$validate$args);
    factories.set(io.JsonReader._type, io.JsonReader);
    factories.set(io.CsvColumnIgnored._type, io.CsvColumnIgnored);
    factories.set(io.Json._type, io.Json);
    factories.set(io.CsvColumnFloat._type, io.CsvColumnFloat);
    factories.set(io.CsvColumnInteger._type, io.CsvColumnInteger);
    factories.set(io.CsvColumnBoolean._type, io.CsvColumnBoolean);
    factories.set(io.CsvStatistics._type, io.CsvStatistics);
    factories.set(io.Http._type, io.Http);
    factories.set(io.CsvColumn._type, io.CsvColumn);
    factories.set(io.CsvAnalysisConfig._type, io.CsvAnalysisConfig);
    factories.set(io.CsvAnalysis$analyze$args._type, io.CsvAnalysis$analyze$args);
    factories.set(io.File._type, io.File);
    factories.set(io.Reader._type, io.Reader);
    factories.set(io.TextReader._type, io.TextReader);
    factories.set(io.TextEncoder._type, io.TextEncoder);
    factories.set(io.SmtpMode._type, io.SmtpMode);
    factories.set(io.CsvWriter._type, io.CsvWriter);
    factories.set(io.Email._type, io.Email);
    factories.set(io.Url._type, io.Url);
    factories.set(io.Writer._type, io.Writer);
    factories.set(io.JsonWriter._type, io.JsonWriter);
    factories.set(io.CsvColumnString._type, io.CsvColumnString);
    factories.set(io.TextWriter._type, io.TextWriter);
    factories.set(io.CsvSharding._type, io.CsvSharding);
    factories.set(io.CsvFormat$infer$args._type, io.CsvFormat$infer$args);
    factories.set(io.FileWalker._type, io.FileWalker);
    factories.set(io.GcbWriter._type, io.GcbWriter);
    factories.set(io.CsvValidateResult._type, io.CsvValidateResult);
    factories.set(io.CsvColumnTime._type, io.CsvColumnTime);
    factories.set(io.CsvColumnStatistics._type, io.CsvColumnStatistics);
    factories.set(io.CsvReader._type, io.CsvReader);
    factories.set(io.CsvColumnDate._type, io.CsvColumnDate);
    factories.set(io.CsvAnalysis._type, io.CsvAnalysis);
    factories.set(io.Smtp._type, io.Smtp);
    factories.set(io.CsvColumnDuration._type, io.CsvColumnDuration);
    factories.set(io.GcbReader._type, io.GcbReader);
    factories.set(io.HttpHeader._type, io.HttpHeader);
    factories.set(io.CsvFormat$sample$args._type, io.CsvFormat$sample$args);
    factories.set(io.CsvFormat._type, io.CsvFormat);
    factories.set(util.LogQuantizer._type, util.LogQuantizer);
    factories.set(util.Queue._type, util.Queue);
    factories.set(util.CustomQuantizer._type, util.CustomQuantizer);
    factories.set(util.TimeWindow._type, util.TimeWindow);
    factories.set(util.Assert._type, util.Assert);
    factories.set(util.Gaussian._type, util.Gaussian);
    factories.set(util.Histogram._type, util.Histogram);
    factories.set(util.Stack._type, util.Stack);
    factories.set(util.Crypto._type, util.Crypto);
    factories.set(util.ProgressTracker._type, util.ProgressTracker);
    factories.set(util.Quantizer._type, util.Quantizer);
    factories.set(util.GaussianProfile._type, util.GaussianProfile);
    factories.set(util.GaussianProfileSlot._type, util.GaussianProfileSlot);
    factories.set(util.HistogramStats._type, util.HistogramStats);
    factories.set(util.Random._type, util.Random);
    factories.set(util.MultiQuantizer._type, util.MultiQuantizer);
    factories.set(util.QuantizerSlotBound._type, util.QuantizerSlotBound);
    factories.set(util.Plot._type, util.Plot);
    factories.set(util.SlidingWindow._type, util.SlidingWindow);
    factories.set(util.LinearQuantizer._type, util.LinearQuantizer);
  },
  init(abi) {
    this.mapped[0] = abi.type_by_fqn.get(core.str._type)!;
    this.mapped[1] = abi.type_by_fqn.get(core.nodeGeo$info$args._type)!;
    this.mapped[2] = abi.type_by_fqn.get(core.t4._type)!;
    this.mapped[3] = abi.type_by_fqn.get(core.nodeTime$info$args._type)!;
    this.mapped[4] = abi.type_by_fqn.get(core.int._type)!;
    if (this.mapped[4]) {
      this.mapped[4].static_values = {'min': -9223372036854775808n,'max': 9223372036854775807n,};
    }
    this.mapped[5] = abi.type_by_fqn.get(core.function_._type)!;
    this.mapped[6] = abi.type_by_fqn.get(core.Error._type)!;
    this.mapped[7] = abi.type_by_fqn.get(core.nodeList$info$args._type)!;
    this.mapped[8] = abi.type_by_fqn.get(core.nodeList._type)!;
    this.mapped[9] = abi.type_by_fqn.get(core.nodeGeo._type)!;
    this.mapped[10] = abi.type_by_fqn.get(core.nodeIndex$sample$args._type)!;
    this.mapped[11] = abi.type_by_fqn.get(core.Array._type)!;
    this.mapped[12] = abi.type_by_fqn.get(core.Tensor._type)!;
    this.mapped[13] = abi.type_by_fqn.get(core.String._type)!;
    this.mapped[14] = abi.type_by_fqn.get(core.field._type)!;
    this.mapped[15] = abi.type_by_fqn.get(core.t3._type)!;
    this.mapped[16] = abi.type_by_fqn.get(core.Table._type)!;
    this.mapped[17] = abi.type_by_fqn.get(core.Date$fromTime$args._type)!;
    this.mapped[18] = abi.type_by_fqn.get(core.Date._type)!;
    this.mapped[19] = abi.type_by_fqn.get(core.Table$applyMappings$args._type)!;
    this.mapped[20] = abi.type_by_fqn.get(core.Buffer._type)!;
    this.mapped[21] = abi.type_by_fqn.get(core.nodeTimeCursor._type)!;
    this.mapped[22] = abi.type_by_fqn.get(core.node._type)!;
    this.mapped[23] = abi.type_by_fqn.get(core.GeoCircle._type)!;
    this.mapped[24] = abi.type_by_fqn.get(core.SamplingMode._type)!;
    this.mapped[24]?.resolveGeneratedOffsetWithValues('fixed', 0,'fixed_reg', 1,'adaptative', 2,'dense', 3);
    this.mapped[25] = abi.type_by_fqn.get(core.GeoPoly._type)!;
    this.mapped[26] = abi.type_by_fqn.get(core.MathConstants._type)!;
    if (this.mapped[26]) {
      this.mapped[26].static_values = {'e': 2.7182818285,'log_2e': 1.4426950409,'log_10e': 0.4342944819,'ln2': 0.6931471806,'ln10': 2.302585093,'pi': 3.1415926536,'pi_2': 1.5707963268,'pi_4': 0.7853981634,'m1_pi': 0.3183098862,'m2_pi': 0.6366197724,'m2_sqrt_pi': 1.1283791671,'sqrt2': 1.4142135624,'sqrt1_2': 0.7071067812,};
    }
    this.mapped[27] = abi.type_by_fqn.get(core.type._type)!;
    this.mapped[28] = abi.type_by_fqn.get(core.nodeTimeSingleton._type)!;
    this.mapped[29] = abi.type_by_fqn.get(core.null_._type)!;
    this.mapped[30] = abi.type_by_fqn.get(core.NodeInfo._type)!;
    this.mapped[31] = abi.type_by_fqn.get(core.char._type)!;
    this.mapped[32] = abi.type_by_fqn.get(core.node$resolve_all$args._type)!;
    this.mapped[33] = abi.type_by_fqn.get(core.TableColumnMapping._type)!;
    this.mapped[34] = abi.type_by_fqn.get(core.nodeGeo$sample$args._type)!;
    this.mapped[35] = abi.type_by_fqn.get(core.nodeTime._type)!;
    this.mapped[36] = abi.type_by_fqn.get(core.ErrorCode._type)!;
    this.mapped[36]?.resolveGeneratedOffsetWithValues('none', 0,'interrupted', 1,'await', 2,'timeout', 6,'forbidden', 7,'runtime_error', 8);
    this.mapped[37] = abi.type_by_fqn.get(core.nodeList$sample$args._type)!;
    this.mapped[38] = abi.type_by_fqn.get(core.TensorType._type)!;
    this.mapped[38]?.resolveGeneratedOffsetWithValues('i32', 4,'i64', 8,'f32', 4,'f64', 8,'c64', 8,'c128', 16);
    this.mapped[39] = abi.type_by_fqn.get(core.bool._type)!;
    this.mapped[40] = abi.type_by_fqn.get(core.DurationUnit._type)!;
    this.mapped[40]?.resolveGeneratedOffsetWithValues('microseconds', 1,'milliseconds', 1000,'seconds', 1000000,'minutes', 60000000,'hours', 3600000000,'days', 86400000000);
    this.mapped[41] = abi.type_by_fqn.get(core.geo._type)!;
    if (this.mapped[41]) {
      this.mapped[41].static_values = {'min': abi.createGeo(-85.0511287602,-179.9999999581),'max': abi.createGeo(85.0511287602,179.9999999581),};
    }
    this.mapped[42] = abi.type_by_fqn.get(core.GeoBox._type)!;
    this.mapped[43] = abi.type_by_fqn.get(core.Map._type)!;
    this.mapped[44] = abi.type_by_fqn.get(core.Tuple._type)!;
    this.mapped[45] = abi.type_by_fqn.get(core.ErrorFrame._type)!;
    this.mapped[46] = abi.type_by_fqn.get(core.CalendarUnit._type)!;
    this.mapped[46]?.resolveGeneratedOffsetWithValues('year', 0,'month', 1,'day', 2,'hour', 3,'minute', 4,'second', 5,'microsecond', 6);
    this.mapped[47] = abi.type_by_fqn.get(core.nodeTime$sample$args._type)!;
    this.mapped[48] = abi.type_by_fqn.get(core.t2._type)!;
    this.mapped[49] = abi.type_by_fqn.get(core.FloatPrecision._type)!;
    this.mapped[49]?.resolveGeneratedOffsetWithValues('p1', 1.0,'p10', 0.1,'p100', 0.01,'p1000', 0.001,'p10000', 0.0001,'p100000', 0.00001,'p1000000', 0.000001,'p10000000', 0.0000001,'p100000000', 0.00000001,'p1000000000', 0.000000001,'p10000000000', 0.9999999994E-10);
    this.mapped[50] = abi.type_by_fqn.get(core.duration._type)!;
    this.mapped[51] = abi.type_by_fqn.get(core.t4f._type)!;
    this.mapped[52] = abi.type_by_fqn.get(core.t2f._type)!;
    this.mapped[53] = abi.type_by_fqn.get(core.TimeZone._type)!;
    this.mapped[53]?.resolveGeneratedOffsetWithValues('Africa_Accra', "Africa/Accra",'Africa_Bamako', "Africa/Bamako",'Africa_Banjul', "Africa/Banjul",'Africa_Conakry', "Africa/Conakry",'Africa_Dakar', "Africa/Dakar",'Africa_Freetown', "Africa/Freetown",'Africa_Lome', "Africa/Lome",'Africa_Nouakchott', "Africa/Nouakchott",'Africa_Ouagadougou', "Africa/Ouagadougou",'Africa_Timbuktu', "Africa/Timbuktu",'Atlantic_Reykjavik', "Atlantic/Reykjavik",'Atlantic_St_Helena', "Atlantic/St_Helena",'Iceland', "Iceland",'Egypt', "Egypt",'Africa_Maseru', "Africa/Maseru",'Africa_Mbabane', "Africa/Mbabane",'Africa_Bangui', "Africa/Bangui",'Africa_Brazzaville', "Africa/Brazzaville",'Africa_Douala', "Africa/Douala",'Africa_Kinshasa', "Africa/Kinshasa",'Africa_Libreville', "Africa/Libreville",'Africa_Luanda', "Africa/Luanda",'Africa_Malabo', "Africa/Malabo",'Africa_Niamey', "Africa/Niamey",'Africa_Porto_Novo', "Africa/Porto-Novo",'Africa_Blantyre', "Africa/Blantyre",'Africa_Bujumbura', "Africa/Bujumbura",'Africa_Gaborone', "Africa/Gaborone",'Africa_Harare', "Africa/Harare",'Africa_Kigali', "Africa/Kigali",'Africa_Lubumbashi', "Africa/Lubumbashi",'Africa_Lusaka', "Africa/Lusaka",'Africa_Addis_Ababa', "Africa/Addis_Ababa",'Africa_Asmara', "Africa/Asmara",'Africa_Asmera', "Africa/Asmera",'Africa_Dar_es_Salaam', "Africa/Dar_es_Salaam",'Africa_Djibouti', "Africa/Djibouti",'Africa_Kampala', "Africa/Kampala",'Africa_Mogadishu', "Africa/Mogadishu",'Indian_Antananarivo', "Indian/Antananarivo",'Indian_Comoro', "Indian/Comoro",'Indian_Mayotte', "Indian/Mayotte",'Libya', "Libya",'America_Atka', "America/Atka",'US_Aleutian', "US/Aleutian",'US_Alaska', "US/Alaska",'America_Buenos_Aires', "America/Buenos_Aires",'America_Argentina_ComodRivadavia', "America/Argentina/ComodRivadavia",'America_Catamarca', "America/Catamarca",'America_Cordoba', "America/Cordoba",'America_Rosario', "America/Rosario",'America_Jujuy', "America/Jujuy",'America_Mendoza', "America/Mendoza",'US_Central', "US/Central",'America_Shiprock', "America/Shiprock",'Navajo', "Navajo",'US_Mountain', "US/Mountain",'US_Michigan', "US/Michigan",'America_Yellowknife', "America/Yellowknife",'Canada_Mountain', "Canada/Mountain",'Canada_Atlantic', "Canada/Atlantic",'Cuba', "Cuba",'America_Fort_Wayne', "America/Fort_Wayne",'America_Indianapolis', "America/Indianapolis",'US_East_Indiana', "US/East-Indiana",'America_Knox_IN', "America/Knox_IN",'US_Indiana_Starke', "US/Indiana-Starke",'America_Pangnirtung', "America/Pangnirtung",'Jamaica', "Jamaica",'America_Louisville', "America/Louisville",'US_Pacific', "US/Pacific",'Brazil_West', "Brazil/West",'Mexico_BajaSur', "Mexico/BajaSur",'Mexico_General', "Mexico/General",'US_Eastern', "US/Eastern",'Brazil_DeNoronha', "Brazil/DeNoronha",'America_Godthab', "America/Godthab",'America_Atikokan', "America/Atikokan",'America_Cayman', "America/Cayman",'America_Coral_Harbour', "America/Coral_Harbour",'America_Creston', "America/Creston",'US_Arizona', "US/Arizona",'America_Anguilla', "America/Anguilla",'America_Antigua', "America/Antigua",'America_Aruba', "America/Aruba",'America_Blanc_Sablon', "America/Blanc-Sablon",'America_Curacao', "America/Curacao",'America_Dominica', "America/Dominica",'America_Grenada', "America/Grenada",'America_Guadeloupe', "America/Guadeloupe",'America_Kralendijk', "America/Kralendijk",'America_Lower_Princes', "America/Lower_Princes",'America_Marigot', "America/Marigot",'America_Montserrat', "America/Montserrat",'America_Port_of_Spain', "America/Port_of_Spain",'America_St_Barthelemy', "America/St_Barthelemy",'America_St_Kitts', "America/St_Kitts",'America_St_Lucia', "America/St_Lucia",'America_St_Thomas', "America/St_Thomas",'America_St_Vincent', "America/St_Vincent",'America_Tortola', "America/Tortola",'America_Virgin', "America/Virgin",'Canada_Saskatchewan', "Canada/Saskatchewan",'America_Porto_Acre', "America/Porto_Acre",'Brazil_Acre', "Brazil/Acre",'Chile_Continental', "Chile/Continental",'Brazil_East', "Brazil/East",'Canada_Newfoundland', "Canada/Newfoundland",'America_Ensenada', "America/Ensenada",'America_Santa_Isabel', "America/Santa_Isabel",'Mexico_BajaNorte', "Mexico/BajaNorte",'America_Montreal', "America/Montreal",'America_Nassau', "America/Nassau",'America_Nipigon', "America/Nipigon",'America_Thunder_Bay', "America/Thunder_Bay",'Canada_Eastern', "Canada/Eastern",'Canada_Pacific', "Canada/Pacific",'Canada_Yukon', "Canada/Yukon",'America_Rainy_River', "America/Rainy_River",'Canada_Central', "Canada/Central",'Asia_Ashkhabad', "Asia/Ashkhabad",'Asia_Phnom_Penh', "Asia/Phnom_Penh",'Asia_Vientiane', "Asia/Vientiane",'Indian_Christmas', "Indian/Christmas",'Asia_Dacca', "Asia/Dacca",'Asia_Muscat', "Asia/Muscat",'Indian_Mahe', "Indian/Mahe",'Indian_Reunion', "Indian/Reunion",'Asia_Saigon', "Asia/Saigon",'Hongkong', "Hongkong",'Asia_Tel_Aviv', "Asia/Tel_Aviv",'Israel', "Israel",'Asia_Katmandu', "Asia/Katmandu",'Asia_Calcutta', "Asia/Calcutta",'Asia_Brunei', "Asia/Brunei",'Asia_Macao', "Asia/Macao",'Asia_Ujung_Pandang', "Asia/Ujung_Pandang",'Europe_Nicosia', "Europe/Nicosia",'Asia_Bahrain', "Asia/Bahrain",'Antarctica_Syowa', "Antarctica/Syowa",'Asia_Aden', "Asia/Aden",'Asia_Kuwait', "Asia/Kuwait",'ROK', "ROK",'Asia_Chongqing', "Asia/Chongqing",'Asia_Chungking', "Asia/Chungking",'Asia_Harbin', "Asia/Harbin",'PRC', "PRC",'Asia_Kuala_Lumpur', "Asia/Kuala_Lumpur",'Singapore', "Singapore",'ROC', "ROC",'Iran', "Iran",'Asia_Thimbu', "Asia/Thimbu",'Japan', "Japan",'Asia_Ulan_Bator', "Asia/Ulan_Bator",'Asia_Kashgar', "Asia/Kashgar",'Asia_Rangoon', "Asia/Rangoon",'Indian_Cocos', "Indian/Cocos",'Atlantic_Faeroe', "Atlantic/Faeroe",'Australia_South', "Australia/South",'Australia_Queensland', "Australia/Queensland",'Australia_Yancowinna', "Australia/Yancowinna",'Australia_North', "Australia/North",'Australia_Currie', "Australia/Currie",'Australia_Tasmania', "Australia/Tasmania",'Australia_LHI', "Australia/LHI",'Australia_Victoria', "Australia/Victoria",'Australia_West', "Australia/West",'Australia_ACT', "Australia/ACT",'Australia_Canberra', "Australia/Canberra",'Australia_NSW', "Australia/NSW",'GMT', "GMT",'GMTx0', "GMT+0",'GMT_0', "GMT-0",'GMT0', "GMT0",'Greenwich', "Greenwich",'UCT', "UCT",'UTC', "UTC",'Universal', "Universal",'Zulu', "Zulu",'Europe_Ljubljana', "Europe/Ljubljana",'Europe_Podgorica', "Europe/Podgorica",'Europe_Sarajevo', "Europe/Sarajevo",'Europe_Skopje', "Europe/Skopje",'Europe_Zagreb', "Europe/Zagreb",'Arctic_Longyearbyen', "Arctic/Longyearbyen",'Atlantic_Jan_Mayen', "Atlantic/Jan_Mayen",'Europe_Copenhagen', "Europe/Copenhagen",'Europe_Oslo', "Europe/Oslo",'Europe_Stockholm', "Europe/Stockholm",'Europe_Amsterdam', "Europe/Amsterdam",'Europe_Luxembourg', "Europe/Luxembourg",'Europe_Tiraspol', "Europe/Tiraspol",'Eire', "Eire",'Europe_Mariehamn', "Europe/Mariehamn",'Asia_Istanbul', "Asia/Istanbul",'Turkey', "Turkey",'Europe_Kiev', "Europe/Kiev",'Europe_Uzhgorod', "Europe/Uzhgorod",'Europe_Zaporozhye', "Europe/Zaporozhye",'Portugal', "Portugal",'Europe_Belfast', "Europe/Belfast",'Europe_Guernsey', "Europe/Guernsey",'Europe_Isle_of_Man', "Europe/Isle_of_Man",'Europe_Jersey', "Europe/Jersey",'GB', "GB",'GB_Eire', "GB-Eire",'W_SU', "W-SU",'Europe_Monaco', "Europe/Monaco",'Europe_Bratislava', "Europe/Bratislava",'Europe_San_Marino', "Europe/San_Marino",'Europe_Vatican', "Europe/Vatican",'Poland', "Poland",'Europe_Busingen', "Europe/Busingen",'Europe_Vaduz', "Europe/Vaduz",'Indian_Kerguelen', "Indian/Kerguelen",'Antarctica_McMurdo', "Antarctica/McMurdo",'Antarctica_South_Pole', "Antarctica/South_Pole",'NZ', "NZ",'NZ_CHAT', "NZ-CHAT",'Chile_EasterIsland', "Chile/EasterIsland",'Pacific_Pohnpei', "Pacific/Pohnpei",'Pacific_Ponape', "Pacific/Ponape",'Pacific_Saipan', "Pacific/Saipan",'Pacific_Johnston', "Pacific/Johnston",'US_Hawaii', "US/Hawaii",'Pacific_Enderbury', "Pacific/Enderbury",'Kwajalein', "Kwajalein",'Pacific_Midway', "Pacific/Midway",'Pacific_Samoa', "Pacific/Samoa",'US_Samoa', "US/Samoa",'Antarctica_DumontDUrville', "Antarctica/DumontDUrville",'Pacific_Chuuk', "Pacific/Chuuk",'Pacific_Truk', "Pacific/Truk",'Pacific_Yap', "Pacific/Yap",'Pacific_Funafuti', "Pacific/Funafuti",'Pacific_Majuro', "Pacific/Majuro",'Pacific_Wake', "Pacific/Wake",'Pacific_Wallis', "Pacific/Wallis",'Africa_Abidjan', "Africa/Abidjan",'Africa_Algiers', "Africa/Algiers",'Africa_Bissau', "Africa/Bissau",'Africa_Cairo', "Africa/Cairo",'Africa_Casablanca', "Africa/Casablanca",'Africa_Ceuta', "Africa/Ceuta",'Africa_El_Aaiun', "Africa/El_Aaiun",'Africa_Johannesburg', "Africa/Johannesburg",'Africa_Juba', "Africa/Juba",'Africa_Khartoum', "Africa/Khartoum",'Africa_Lagos', "Africa/Lagos",'Africa_Maputo', "Africa/Maputo",'Africa_Monrovia', "Africa/Monrovia",'Africa_Nairobi', "Africa/Nairobi",'Africa_Ndjamena', "Africa/Ndjamena",'Africa_Sao_Tome', "Africa/Sao_Tome",'Africa_Tripoli', "Africa/Tripoli",'Africa_Tunis', "Africa/Tunis",'Africa_Windhoek', "Africa/Windhoek",'America_Adak', "America/Adak",'America_Anchorage', "America/Anchorage",'America_Araguaina', "America/Araguaina",'America_Argentina_Buenos_Aires', "America/Argentina/Buenos_Aires",'America_Argentina_Catamarca', "America/Argentina/Catamarca",'America_Argentina_Cordoba', "America/Argentina/Cordoba",'America_Argentina_Jujuy', "America/Argentina/Jujuy",'America_Argentina_La_Rioja', "America/Argentina/La_Rioja",'America_Argentina_Mendoza', "America/Argentina/Mendoza",'America_Argentina_Rio_Gallegos', "America/Argentina/Rio_Gallegos",'America_Argentina_Salta', "America/Argentina/Salta",'America_Argentina_San_Juan', "America/Argentina/San_Juan",'America_Argentina_San_Luis', "America/Argentina/San_Luis",'America_Argentina_Tucuman', "America/Argentina/Tucuman",'America_Argentina_Ushuaia', "America/Argentina/Ushuaia",'America_Asuncion', "America/Asuncion",'America_Bahia', "America/Bahia",'America_Bahia_Banderas', "America/Bahia_Banderas",'America_Barbados', "America/Barbados",'America_Belem', "America/Belem",'America_Belize', "America/Belize",'America_Boa_Vista', "America/Boa_Vista",'America_Bogota', "America/Bogota",'America_Boise', "America/Boise",'America_Cambridge_Bay', "America/Cambridge_Bay",'America_Campo_Grande', "America/Campo_Grande",'America_Cancun', "America/Cancun",'America_Caracas', "America/Caracas",'America_Cayenne', "America/Cayenne",'America_Chicago', "America/Chicago",'America_Chihuahua', "America/Chihuahua",'America_Ciudad_Juarez', "America/Ciudad_Juarez",'America_Costa_Rica', "America/Costa_Rica",'America_Cuiaba', "America/Cuiaba",'America_Danmarkshavn', "America/Danmarkshavn",'America_Dawson', "America/Dawson",'America_Dawson_Creek', "America/Dawson_Creek",'America_Denver', "America/Denver",'America_Detroit', "America/Detroit",'America_Edmonton', "America/Edmonton",'America_Eirunepe', "America/Eirunepe",'America_El_Salvador', "America/El_Salvador",'America_Fort_Nelson', "America/Fort_Nelson",'America_Fortaleza', "America/Fortaleza",'America_Glace_Bay', "America/Glace_Bay",'America_Goose_Bay', "America/Goose_Bay",'America_Grand_Turk', "America/Grand_Turk",'America_Guatemala', "America/Guatemala",'America_Guayaquil', "America/Guayaquil",'America_Guyana', "America/Guyana",'America_Halifax', "America/Halifax",'America_Havana', "America/Havana",'America_Hermosillo', "America/Hermosillo",'America_Indiana_Indianapolis', "America/Indiana/Indianapolis",'America_Indiana_Knox', "America/Indiana/Knox",'America_Indiana_Marengo', "America/Indiana/Marengo",'America_Indiana_Petersburg', "America/Indiana/Petersburg",'America_Indiana_Tell_City', "America/Indiana/Tell_City",'America_Indiana_Vevay', "America/Indiana/Vevay",'America_Indiana_Vincennes', "America/Indiana/Vincennes",'America_Indiana_Winamac', "America/Indiana/Winamac",'America_Inuvik', "America/Inuvik",'America_Iqaluit', "America/Iqaluit",'America_Jamaica', "America/Jamaica",'America_Juneau', "America/Juneau",'America_Kentucky_Louisville', "America/Kentucky/Louisville",'America_Kentucky_Monticello', "America/Kentucky/Monticello",'America_La_Paz', "America/La_Paz",'America_Lima', "America/Lima",'America_Los_Angeles', "America/Los_Angeles",'America_Maceio', "America/Maceio",'America_Managua', "America/Managua",'America_Manaus', "America/Manaus",'America_Martinique', "America/Martinique",'America_Matamoros', "America/Matamoros",'America_Mazatlan', "America/Mazatlan",'America_Menominee', "America/Menominee",'America_Merida', "America/Merida",'America_Metlakatla', "America/Metlakatla",'America_Mexico_City', "America/Mexico_City",'America_Miquelon', "America/Miquelon",'America_Moncton', "America/Moncton",'America_Monterrey', "America/Monterrey",'America_Montevideo', "America/Montevideo",'America_New_York', "America/New_York",'America_Nome', "America/Nome",'America_Noronha', "America/Noronha",'America_North_Dakota_Beulah', "America/North_Dakota/Beulah",'America_North_Dakota_Center', "America/North_Dakota/Center",'America_North_Dakota_New_Salem', "America/North_Dakota/New_Salem",'America_Nuuk', "America/Nuuk",'America_Ojinaga', "America/Ojinaga",'America_Panama', "America/Panama",'America_Paramaribo', "America/Paramaribo",'America_Phoenix', "America/Phoenix",'America_Port_au_Prince', "America/Port-au-Prince",'America_Porto_Velho', "America/Porto_Velho",'America_Puerto_Rico', "America/Puerto_Rico",'America_Punta_Arenas', "America/Punta_Arenas",'America_Rankin_Inlet', "America/Rankin_Inlet",'America_Recife', "America/Recife",'America_Regina', "America/Regina",'America_Resolute', "America/Resolute",'America_Rio_Branco', "America/Rio_Branco",'America_Santarem', "America/Santarem",'America_Santiago', "America/Santiago",'America_Santo_Domingo', "America/Santo_Domingo",'America_Sao_Paulo', "America/Sao_Paulo",'America_Scoresbysund', "America/Scoresbysund",'America_Sitka', "America/Sitka",'America_St_Johns', "America/St_Johns",'America_Swift_Current', "America/Swift_Current",'America_Tegucigalpa', "America/Tegucigalpa",'America_Thule', "America/Thule",'America_Tijuana', "America/Tijuana",'America_Toronto', "America/Toronto",'America_Vancouver', "America/Vancouver",'America_Whitehorse', "America/Whitehorse",'America_Winnipeg', "America/Winnipeg",'America_Yakutat', "America/Yakutat",'Antarctica_Casey', "Antarctica/Casey",'Antarctica_Davis', "Antarctica/Davis",'Antarctica_Macquarie', "Antarctica/Macquarie",'Antarctica_Mawson', "Antarctica/Mawson",'Antarctica_Palmer', "Antarctica/Palmer",'Antarctica_Rothera', "Antarctica/Rothera",'Antarctica_Troll', "Antarctica/Troll",'Antarctica_Vostok', "Antarctica/Vostok",'Asia_Almaty', "Asia/Almaty",'Asia_Amman', "Asia/Amman",'Asia_Anadyr', "Asia/Anadyr",'Asia_Aqtau', "Asia/Aqtau",'Asia_Aqtobe', "Asia/Aqtobe",'Asia_Ashgabat', "Asia/Ashgabat",'Asia_Atyrau', "Asia/Atyrau",'Asia_Baghdad', "Asia/Baghdad",'Asia_Baku', "Asia/Baku",'Asia_Bangkok', "Asia/Bangkok",'Asia_Barnaul', "Asia/Barnaul",'Asia_Beirut', "Asia/Beirut",'Asia_Bishkek', "Asia/Bishkek",'Asia_Chita', "Asia/Chita",'Asia_Choibalsan', "Asia/Choibalsan",'Asia_Colombo', "Asia/Colombo",'Asia_Damascus', "Asia/Damascus",'Asia_Dhaka', "Asia/Dhaka",'Asia_Dili', "Asia/Dili",'Asia_Dubai', "Asia/Dubai",'Asia_Dushanbe', "Asia/Dushanbe",'Asia_Famagusta', "Asia/Famagusta",'Asia_Gaza', "Asia/Gaza",'Asia_Hebron', "Asia/Hebron",'Asia_Ho_Chi_Minh', "Asia/Ho_Chi_Minh",'Asia_Hong_Kong', "Asia/Hong_Kong",'Asia_Hovd', "Asia/Hovd",'Asia_Irkutsk', "Asia/Irkutsk",'Asia_Jakarta', "Asia/Jakarta",'Asia_Jayapura', "Asia/Jayapura",'Asia_Jerusalem', "Asia/Jerusalem",'Asia_Kabul', "Asia/Kabul",'Asia_Kamchatka', "Asia/Kamchatka",'Asia_Karachi', "Asia/Karachi",'Asia_Kathmandu', "Asia/Kathmandu",'Asia_Khandyga', "Asia/Khandyga",'Asia_Kolkata', "Asia/Kolkata",'Asia_Krasnoyarsk', "Asia/Krasnoyarsk",'Asia_Kuching', "Asia/Kuching",'Asia_Macau', "Asia/Macau",'Asia_Magadan', "Asia/Magadan",'Asia_Makassar', "Asia/Makassar",'Asia_Manila', "Asia/Manila",'Asia_Nicosia', "Asia/Nicosia",'Asia_Novokuznetsk', "Asia/Novokuznetsk",'Asia_Novosibirsk', "Asia/Novosibirsk",'Asia_Omsk', "Asia/Omsk",'Asia_Oral', "Asia/Oral",'Asia_Pontianak', "Asia/Pontianak",'Asia_Pyongyang', "Asia/Pyongyang",'Asia_Qatar', "Asia/Qatar",'Asia_Qostanay', "Asia/Qostanay",'Asia_Qyzylorda', "Asia/Qyzylorda",'Asia_Riyadh', "Asia/Riyadh",'Asia_Sakhalin', "Asia/Sakhalin",'Asia_Samarkand', "Asia/Samarkand",'Asia_Seoul', "Asia/Seoul",'Asia_Shanghai', "Asia/Shanghai",'Asia_Singapore', "Asia/Singapore",'Asia_Srednekolymsk', "Asia/Srednekolymsk",'Asia_Taipei', "Asia/Taipei",'Asia_Tashkent', "Asia/Tashkent",'Asia_Tbilisi', "Asia/Tbilisi",'Asia_Tehran', "Asia/Tehran",'Asia_Thimphu', "Asia/Thimphu",'Asia_Tokyo', "Asia/Tokyo",'Asia_Tomsk', "Asia/Tomsk",'Asia_Ulaanbaatar', "Asia/Ulaanbaatar",'Asia_Urumqi', "Asia/Urumqi",'Asia_Ust_Nera', "Asia/Ust-Nera",'Asia_Vladivostok', "Asia/Vladivostok",'Asia_Yakutsk', "Asia/Yakutsk",'Asia_Yangon', "Asia/Yangon",'Asia_Yekaterinburg', "Asia/Yekaterinburg",'Asia_Yerevan', "Asia/Yerevan",'Atlantic_Azores', "Atlantic/Azores",'Atlantic_Bermuda', "Atlantic/Bermuda",'Atlantic_Canary', "Atlantic/Canary",'Atlantic_Cape_Verde', "Atlantic/Cape_Verde",'Atlantic_Faroe', "Atlantic/Faroe",'Atlantic_Madeira', "Atlantic/Madeira",'Atlantic_South_Georgia', "Atlantic/South_Georgia",'Atlantic_Stanley', "Atlantic/Stanley",'Australia_Adelaide', "Australia/Adelaide",'Australia_Brisbane', "Australia/Brisbane",'Australia_Broken_Hill', "Australia/Broken_Hill",'Australia_Darwin', "Australia/Darwin",'Australia_Eucla', "Australia/Eucla",'Australia_Hobart', "Australia/Hobart",'Australia_Lindeman', "Australia/Lindeman",'Australia_Lord_Howe', "Australia/Lord_Howe",'Australia_Melbourne', "Australia/Melbourne",'Australia_Perth', "Australia/Perth",'Australia_Sydney', "Australia/Sydney",'CET', "CET",'CST6CDT', "CST6CDT",'EET', "EET",'EST', "EST",'EST5EDT', "EST5EDT",'Europe_Andorra', "Europe/Andorra",'Europe_Astrakhan', "Europe/Astrakhan",'Europe_Athens', "Europe/Athens",'Europe_Belgrade', "Europe/Belgrade",'Europe_Berlin', "Europe/Berlin",'Europe_Brussels', "Europe/Brussels",'Europe_Bucharest', "Europe/Bucharest",'Europe_Budapest', "Europe/Budapest",'Europe_Chisinau', "Europe/Chisinau",'Europe_Dublin', "Europe/Dublin",'Europe_Gibraltar', "Europe/Gibraltar",'Europe_Helsinki', "Europe/Helsinki",'Europe_Istanbul', "Europe/Istanbul",'Europe_Kaliningrad', "Europe/Kaliningrad",'Europe_Kirov', "Europe/Kirov",'Europe_Kyiv', "Europe/Kyiv",'Europe_Lisbon', "Europe/Lisbon",'Europe_London', "Europe/London",'Europe_Madrid', "Europe/Madrid",'Europe_Malta', "Europe/Malta",'Europe_Minsk', "Europe/Minsk",'Europe_Moscow', "Europe/Moscow",'Europe_Paris', "Europe/Paris",'Europe_Prague', "Europe/Prague",'Europe_Riga', "Europe/Riga",'Europe_Rome', "Europe/Rome",'Europe_Samara', "Europe/Samara",'Europe_Saratov', "Europe/Saratov",'Europe_Simferopol', "Europe/Simferopol",'Europe_Sofia', "Europe/Sofia",'Europe_Tallinn', "Europe/Tallinn",'Europe_Tirane', "Europe/Tirane",'Europe_Ulyanovsk', "Europe/Ulyanovsk",'Europe_Vienna', "Europe/Vienna",'Europe_Vilnius', "Europe/Vilnius",'Europe_Volgograd', "Europe/Volgograd",'Europe_Warsaw', "Europe/Warsaw",'Europe_Zurich', "Europe/Zurich",'Factory', "Factory",'HST', "HST",'Indian_Chagos', "Indian/Chagos",'Indian_Maldives', "Indian/Maldives",'Indian_Mauritius', "Indian/Mauritius",'MET', "MET",'MST', "MST",'MST7MDT', "MST7MDT",'PST8PDT', "PST8PDT",'Pacific_Apia', "Pacific/Apia",'Pacific_Auckland', "Pacific/Auckland",'Pacific_Bougainville', "Pacific/Bougainville",'Pacific_Chatham', "Pacific/Chatham",'Pacific_Easter', "Pacific/Easter",'Pacific_Efate', "Pacific/Efate",'Pacific_Fakaofo', "Pacific/Fakaofo",'Pacific_Fiji', "Pacific/Fiji",'Pacific_Galapagos', "Pacific/Galapagos",'Pacific_Gambier', "Pacific/Gambier",'Pacific_Guadalcanal', "Pacific/Guadalcanal",'Pacific_Guam', "Pacific/Guam",'Pacific_Honolulu', "Pacific/Honolulu",'Pacific_Kanton', "Pacific/Kanton",'Pacific_Kiritimati', "Pacific/Kiritimati",'Pacific_Kosrae', "Pacific/Kosrae",'Pacific_Kwajalein', "Pacific/Kwajalein",'Pacific_Marquesas', "Pacific/Marquesas",'Pacific_Nauru', "Pacific/Nauru",'Pacific_Niue', "Pacific/Niue",'Pacific_Norfolk', "Pacific/Norfolk",'Pacific_Noumea', "Pacific/Noumea",'Pacific_Pago_Pago', "Pacific/Pago_Pago",'Pacific_Palau', "Pacific/Palau",'Pacific_Pitcairn', "Pacific/Pitcairn",'Pacific_Port_Moresby', "Pacific/Port_Moresby",'Pacific_Rarotonga', "Pacific/Rarotonga",'Pacific_Tahiti', "Pacific/Tahiti",'Pacific_Tarawa', "Pacific/Tarawa",'Pacific_Tongatapu', "Pacific/Tongatapu",'WET', "WET");
    this.mapped[54] = abi.type_by_fqn.get(core.time._type)!;
    if (this.mapped[54]) {
      this.mapped[54].static_values = {'min': abi.createTime(-9223372036854775808n),'max': abi.createTime(9223372036854775807n),};
    }
    this.mapped[55] = abi.type_by_fqn.get(core.float._type)!;
    if (this.mapped[55]) {
      this.mapped[55].static_values = {'min': -1.7976931349E308,'max': 1.7976931349E308,};
    }
    this.mapped[56] = abi.type_by_fqn.get(core.nodeIndex$info$args._type)!;
    this.mapped[57] = abi.type_by_fqn.get(core.SortOrder._type)!;
    this.mapped[57]?.resolveGeneratedOffsetWithValues('asc', null,'desc', null);
    this.mapped[58] = abi.type_by_fqn.get(core.nodeIndex._type)!;
    this.mapped[59] = abi.type_by_fqn.get(core.t3f._type)!;
    this.mapped[60] = abi.type_by_fqn.get(runtime.Log._type)!;
    this.mapped[61] = abi.type_by_fqn.get(runtime.SecurityFields$set$args._type)!;
    this.mapped[62] = abi.type_by_fqn.get(runtime.User._type)!;
    this.mapped[63] = abi.type_by_fqn.get(runtime.LogLevel._type)!;
    this.mapped[63]?.resolveGeneratedOffsetWithValues('error', null,'warn', null,'info', null,'perf', null,'trace', null);
    this.mapped[64] = abi.type_by_fqn.get(runtime.User$logout$args._type)!;
    this.mapped[65] = abi.type_by_fqn.get(runtime.User$current$args._type)!;
    this.mapped[66] = abi.type_by_fqn.get(runtime.PeriodicTask$set$args._type)!;
    this.mapped[67] = abi.type_by_fqn.get(runtime.PeriodicTask$all$args._type)!;
    this.mapped[68] = abi.type_by_fqn.get(runtime.License._type)!;
    this.mapped[69] = abi.type_by_fqn.get(runtime.Task._type)!;
    this.mapped[70] = abi.type_by_fqn.get(runtime.SecurityFields$get$args._type)!;
    this.mapped[71] = abi.type_by_fqn.get(runtime.User$getToken$args._type)!;
    this.mapped[72] = abi.type_by_fqn.get(runtime.Debug$workers$args._type)!;
    this.mapped[73] = abi.type_by_fqn.get(runtime.Debug._type)!;
    this.mapped[74] = abi.type_by_fqn.get(runtime.Debug$resume$args._type)!;
    this.mapped[75] = abi.type_by_fqn.get(runtime.SecurityPolicy._type)!;
    this.mapped[76] = abi.type_by_fqn.get(runtime.UserCredential._type)!;
    this.mapped[77] = abi.type_by_fqn.get(runtime.Job._type)!;
    this.mapped[78] = abi.type_by_fqn.get(runtime.Runtime$info$args._type)!;
    this.mapped[79] = abi.type_by_fqn.get(runtime.DebugVariable._type)!;
    this.mapped[80] = abi.type_by_fqn.get(runtime.RuntimeInfo._type)!;
    this.mapped[81] = abi.type_by_fqn.get(runtime.SecurityFields._type)!;
    this.mapped[82] = abi.type_by_fqn.get(runtime.CallPerf._type)!;
    this.mapped[83] = abi.type_by_fqn.get(runtime.TaskStatus._type)!;
    this.mapped[83]?.resolveGeneratedOffsetWithValues('empty', 0,'waiting', 1,'running', 2,'await', 3,'cancelled', 4,'error', 5,'ended', 6,'ended_with_errors', 7);
    this.mapped[84] = abi.type_by_fqn.get(runtime.User$renew$args._type)!;
    this.mapped[85] = abi.type_by_fqn.get(runtime.UserRole$set$args._type)!;
    this.mapped[86] = abi.type_by_fqn.get(runtime.DebugFrame._type)!;
    this.mapped[87] = abi.type_by_fqn.get(runtime.UserGroup._type)!;
    this.mapped[88] = abi.type_by_fqn.get(runtime.User$tokenLogin$args._type)!;
    this.mapped[89] = abi.type_by_fqn.get(runtime.UserRole$remove$args._type)!;
    this.mapped[90] = abi.type_by_fqn.get(runtime.Task$running$args._type)!;
    this.mapped[91] = abi.type_by_fqn.get(runtime.User$setPassword$args._type)!;
    this.mapped[92] = abi.type_by_fqn.get(runtime.System._type)!;
    this.mapped[93] = abi.type_by_fqn.get(runtime.Debug$pause$args._type)!;
    this.mapped[94] = abi.type_by_fqn.get(runtime.LicenseType._type)!;
    this.mapped[94]?.resolveGeneratedOffsetWithValues('community', 0,'enterprise', 1,'testing', 2);
    this.mapped[95] = abi.type_by_fqn.get(runtime.OpenIDConnect._type)!;
    this.mapped[96] = abi.type_by_fqn.get(runtime.SecurityPolicy$permissions$args._type)!;
    this.mapped[97] = abi.type_by_fqn.get(runtime.Runtime$abi$args._type)!;
    this.mapped[98] = abi.type_by_fqn.get(runtime.Debug$info$args._type)!;
    this.mapped[99] = abi.type_by_fqn.get(runtime.UserRole$all$args._type)!;
    this.mapped[100] = abi.type_by_fqn.get(runtime.SecurityEntity$set$args._type)!;
    this.mapped[101] = abi.type_by_fqn.get(runtime.User$permissions$args._type)!;
    this.mapped[102] = abi.type_by_fqn.get(runtime.UserGroupPolicy._type)!;
    this.mapped[103] = abi.type_by_fqn.get(runtime.Runtime$root$args._type)!;
    this.mapped[104] = abi.type_by_fqn.get(runtime.SecurityEntity$all$args._type)!;
    this.mapped[105] = abi.type_by_fqn.get(runtime.PeriodicTask._type)!;
    this.mapped[106] = abi.type_by_fqn.get(runtime.UserGroupPolicyType._type)!;
    this.mapped[106]?.resolveGeneratedOffsetWithValues('read', 0,'write', 1,'execute', 2);
    this.mapped[107] = abi.type_by_fqn.get(runtime.Runtime._type)!;
    this.mapped[108] = abi.type_by_fqn.get(runtime.Debug$add$args._type)!;
    this.mapped[109] = abi.type_by_fqn.get(runtime.User$me$args._type)!;
    this.mapped[110] = abi.type_by_fqn.get(runtime.DebugInfo._type)!;
    this.mapped[111] = abi.type_by_fqn.get(runtime.Debug$remove$args._type)!;
    this.mapped[112] = abi.type_by_fqn.get(runtime.DebugBreakpoint._type)!;
    this.mapped[113] = abi.type_by_fqn.get(runtime.StoreStat._type)!;
    this.mapped[114] = abi.type_by_fqn.get(runtime.UserRole._type)!;
    this.mapped[115] = abi.type_by_fqn.get(runtime.OpenIDConnect$config$args._type)!;
    this.mapped[116] = abi.type_by_fqn.get(runtime.User$login$args._type)!;
    this.mapped[117] = abi.type_by_fqn.get(runtime.Task$is_running$args._type)!;
    this.mapped[118] = abi.type_by_fqn.get(runtime.SecurityEntity._type)!;
    this.mapped[119] = abi.type_by_fqn.get(runtime.Task$history$args._type)!;
    this.mapped[120] = abi.type_by_fqn.get(runtime.Task$cancel$args._type)!;
    this.mapped[121] = abi.type_by_fqn.get(io.SmtpAuth._type)!;
    this.mapped[121]?.resolveGeneratedOffsetWithValues('none', 0,'plain', 1,'login', 2);
    this.mapped[122] = abi.type_by_fqn.get(io.CsvFormat$generate$args._type)!;
    this.mapped[123] = abi.type_by_fqn.get(io.CsvFormat$validate$args._type)!;
    this.mapped[124] = abi.type_by_fqn.get(io.JsonReader._type)!;
    this.mapped[125] = abi.type_by_fqn.get(io.CsvColumnIgnored._type)!;
    this.mapped[126] = abi.type_by_fqn.get(io.Json._type)!;
    this.mapped[127] = abi.type_by_fqn.get(io.CsvColumnFloat._type)!;
    this.mapped[128] = abi.type_by_fqn.get(io.CsvColumnInteger._type)!;
    this.mapped[129] = abi.type_by_fqn.get(io.CsvColumnBoolean._type)!;
    this.mapped[130] = abi.type_by_fqn.get(io.CsvStatistics._type)!;
    this.mapped[131] = abi.type_by_fqn.get(io.Http._type)!;
    this.mapped[132] = abi.type_by_fqn.get(io.CsvColumn._type)!;
    this.mapped[133] = abi.type_by_fqn.get(io.CsvAnalysisConfig._type)!;
    if (this.mapped[133]) {
      this.mapped[133].static_values = {'enumerable_limit_default': 100,'date_check_limit_default': 100,};
    }
    this.mapped[134] = abi.type_by_fqn.get(io.CsvAnalysis$analyze$args._type)!;
    this.mapped[135] = abi.type_by_fqn.get(io.File._type)!;
    this.mapped[136] = abi.type_by_fqn.get(io.Reader._type)!;
    this.mapped[137] = abi.type_by_fqn.get(io.TextReader._type)!;
    this.mapped[138] = abi.type_by_fqn.get(io.TextEncoder._type)!;
    this.mapped[138]?.resolveGeneratedOffsetWithValues('plain', null,'base64', null,'base64url', null,'hexadecimal', null);
    this.mapped[139] = abi.type_by_fqn.get(io.SmtpMode._type)!;
    this.mapped[139]?.resolveGeneratedOffsetWithValues('plain', 0,'ssl_tls', 1,'starttls', 2);
    this.mapped[140] = abi.type_by_fqn.get(io.CsvWriter._type)!;
    this.mapped[141] = abi.type_by_fqn.get(io.Email._type)!;
    this.mapped[142] = abi.type_by_fqn.get(io.Url._type)!;
    this.mapped[143] = abi.type_by_fqn.get(io.Writer._type)!;
    this.mapped[144] = abi.type_by_fqn.get(io.JsonWriter._type)!;
    this.mapped[145] = abi.type_by_fqn.get(io.CsvColumnString._type)!;
    this.mapped[146] = abi.type_by_fqn.get(io.TextWriter._type)!;
    this.mapped[147] = abi.type_by_fqn.get(io.CsvSharding._type)!;
    this.mapped[148] = abi.type_by_fqn.get(io.CsvFormat$infer$args._type)!;
    this.mapped[149] = abi.type_by_fqn.get(io.FileWalker._type)!;
    this.mapped[150] = abi.type_by_fqn.get(io.GcbWriter._type)!;
    this.mapped[151] = abi.type_by_fqn.get(io.CsvValidateResult._type)!;
    this.mapped[152] = abi.type_by_fqn.get(io.CsvColumnTime._type)!;
    this.mapped[153] = abi.type_by_fqn.get(io.CsvColumnStatistics._type)!;
    this.mapped[154] = abi.type_by_fqn.get(io.CsvReader._type)!;
    this.mapped[155] = abi.type_by_fqn.get(io.CsvColumnDate._type)!;
    this.mapped[156] = abi.type_by_fqn.get(io.CsvAnalysis._type)!;
    this.mapped[157] = abi.type_by_fqn.get(io.Smtp._type)!;
    this.mapped[158] = abi.type_by_fqn.get(io.CsvColumnDuration._type)!;
    this.mapped[159] = abi.type_by_fqn.get(io.GcbReader._type)!;
    this.mapped[160] = abi.type_by_fqn.get(io.HttpHeader._type)!;
    this.mapped[161] = abi.type_by_fqn.get(io.CsvFormat$sample$args._type)!;
    this.mapped[162] = abi.type_by_fqn.get(io.CsvFormat._type)!;
    this.mapped[163] = abi.type_by_fqn.get(util.LogQuantizer._type)!;
    this.mapped[164] = abi.type_by_fqn.get(util.Queue._type)!;
    this.mapped[165] = abi.type_by_fqn.get(util.CustomQuantizer._type)!;
    this.mapped[166] = abi.type_by_fqn.get(util.TimeWindow._type)!;
    this.mapped[167] = abi.type_by_fqn.get(util.Assert._type)!;
    this.mapped[168] = abi.type_by_fqn.get(util.Gaussian._type)!;
    this.mapped[169] = abi.type_by_fqn.get(util.Histogram._type)!;
    this.mapped[170] = abi.type_by_fqn.get(util.Stack._type)!;
    this.mapped[171] = abi.type_by_fqn.get(util.Crypto._type)!;
    this.mapped[172] = abi.type_by_fqn.get(util.ProgressTracker._type)!;
    this.mapped[173] = abi.type_by_fqn.get(util.Quantizer._type)!;
    this.mapped[174] = abi.type_by_fqn.get(util.GaussianProfile._type)!;
    this.mapped[175] = abi.type_by_fqn.get(util.GaussianProfileSlot._type)!;
    this.mapped[176] = abi.type_by_fqn.get(util.HistogramStats._type)!;
    this.mapped[177] = abi.type_by_fqn.get(util.Random._type)!;
    this.mapped[178] = abi.type_by_fqn.get(util.MultiQuantizer._type)!;
    this.mapped[179] = abi.type_by_fqn.get(util.QuantizerSlotBound._type)!;
    this.mapped[180] = abi.type_by_fqn.get(util.Plot._type)!;
    this.mapped[181] = abi.type_by_fqn.get(util.SlidingWindow._type)!;
    this.mapped[182] = abi.type_by_fqn.get(util.LinearQuantizer._type)!;
  },
};

declare global {
  namespace greycat {
    interface GreyCat {
      call(method: 'core::nodeList::info', args: [globalThis.Array<core.nodeList>], signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<number | bigint>>>;
      spawn(method: 'core::nodeList::info', args: [globalThis.Array<core.nodeList>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeList::info', args: [globalThis.Array<core.nodeList>], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<number | bigint>>>;
      call(method: 'core::nodeList::sample', args: [globalThis.Array<core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, core.SamplingMode, number | bigint | null], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'core::nodeList::sample', args: [globalThis.Array<core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, core.SamplingMode, number | bigint | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeList::sample', args: [globalThis.Array<core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, core.SamplingMode, number | bigint | null], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'core::nodeGeo::info', args: [globalThis.Array<core.nodeGeo>], signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.geo>>>;
      spawn(method: 'core::nodeGeo::info', args: [globalThis.Array<core.nodeGeo>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeGeo::info', args: [globalThis.Array<core.nodeGeo>], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.geo>>>;
      call(method: 'core::nodeGeo::sample', args: [globalThis.Array<core.nodeGeo>, core.geo | null, core.geo | null, number | bigint, core.SamplingMode], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'core::nodeGeo::sample', args: [globalThis.Array<core.nodeGeo>, core.geo | null, core.geo | null, number | bigint, core.SamplingMode], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeGeo::sample', args: [globalThis.Array<core.nodeGeo>, core.geo | null, core.geo | null, number | bigint, core.SamplingMode], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'core::Table::applyMappings', args: [core.Table, globalThis.Array<core.TableColumnMapping>], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'core::Table::applyMappings', args: [core.Table, globalThis.Array<core.TableColumnMapping>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::Table::applyMappings', args: [core.Table, globalThis.Array<core.TableColumnMapping>], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'core::Date::fromTime', args: [core.time, core.TimeZone | null], signal?: AbortSignal): Promise<core.Date>;
      spawn(method: 'core::Date::fromTime', args: [core.time, core.TimeZone | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::Date::fromTime', args: [core.time, core.TimeZone | null], pollEvery?: number, signal?: AbortSignal): Promise<core.Date>;
      call(method: 'core::node::resolve_all', args: [globalThis.Array<core.node | null>], signal?: AbortSignal): Promise<globalThis.Array<any | null>>;
      spawn(method: 'core::node::resolve_all', args: [globalThis.Array<core.node | null>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::node::resolve_all', args: [globalThis.Array<core.node | null>], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<any | null>>;
      call(method: 'core::nodeTime::info', args: [globalThis.Array<core.nodeTime>], signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.time>>>;
      spawn(method: 'core::nodeTime::info', args: [globalThis.Array<core.nodeTime>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeTime::info', args: [globalThis.Array<core.nodeTime>], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo<core.time>>>;
      call(method: 'core::nodeTime::sample', args: [globalThis.Array<core.nodeTime>, core.time | null, core.time | null, number | bigint, core.SamplingMode, core.duration | null, core.TimeZone | null], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'core::nodeTime::sample', args: [globalThis.Array<core.nodeTime>, core.time | null, core.time | null, number | bigint, core.SamplingMode, core.duration | null, core.TimeZone | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeTime::sample', args: [globalThis.Array<core.nodeTime>, core.time | null, core.time | null, number | bigint, core.SamplingMode, core.duration | null, core.TimeZone | null], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'core::nodeIndex::info', args: [globalThis.Array<core.nodeIndex>], signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo>>;
      spawn(method: 'core::nodeIndex::info', args: [globalThis.Array<core.nodeIndex>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeIndex::info', args: [globalThis.Array<core.nodeIndex>], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<core.NodeInfo>>;
      call(method: 'core::nodeIndex::sample', args: [globalThis.Array<core.nodeIndex>, any | null, number | bigint, core.SamplingMode], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'core::nodeIndex::sample', args: [globalThis.Array<core.nodeIndex>, any | null, number | bigint, core.SamplingMode], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'core::nodeIndex::sample', args: [globalThis.Array<core.nodeIndex>, any | null, number | bigint, core.SamplingMode], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'runtime::User::getToken', args: [number | bigint], signal?: AbortSignal): Promise<string>;
      spawn(method: 'runtime::User::getToken', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::getToken', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<string>;
      call(method: 'runtime::User::setPassword', args: [string, string], signal?: AbortSignal): Promise<boolean>;
      spawn(method: 'runtime::User::setPassword', args: [string, string], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::setPassword', args: [string, string], pollEvery?: number, signal?: AbortSignal): Promise<boolean>;
      call(method: 'runtime::User::permissions', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<string>>;
      spawn(method: 'runtime::User::permissions', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::permissions', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<string>>;
      call(method: 'runtime::User::me', args?: undefined, signal?: AbortSignal): Promise<runtime.User>;
      spawn(method: 'runtime::User::me', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::me', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<runtime.User>;
      call(method: 'runtime::User::current', args?: undefined, signal?: AbortSignal): Promise<number | bigint>;
      spawn(method: 'runtime::User::current', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::current', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<number | bigint>;
      call(method: 'runtime::User::renew', args: [boolean], signal?: AbortSignal): Promise<string>;
      spawn(method: 'runtime::User::renew', args: [boolean], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::renew', args: [boolean], pollEvery?: number, signal?: AbortSignal): Promise<string>;
      call(method: 'runtime::User::logout', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::User::logout', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::logout', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::User::tokenLogin', args: [string, boolean], signal?: AbortSignal): Promise<string>;
      spawn(method: 'runtime::User::tokenLogin', args: [string, boolean], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::tokenLogin', args: [string, boolean], pollEvery?: number, signal?: AbortSignal): Promise<string>;
      call(method: 'runtime::User::login', args: [string, boolean], signal?: AbortSignal): Promise<string>;
      spawn(method: 'runtime::User::login', args: [string, boolean], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::User::login', args: [string, boolean], pollEvery?: number, signal?: AbortSignal): Promise<string>;
      call(method: 'runtime::Task::is_running', args: [number | bigint], signal?: AbortSignal): Promise<boolean>;
      spawn(method: 'runtime::Task::is_running', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Task::is_running', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<boolean>;
      call(method: 'runtime::Task::cancel', args: [number | bigint], signal?: AbortSignal): Promise<boolean>;
      spawn(method: 'runtime::Task::cancel', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Task::cancel', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<boolean>;
      call(method: 'runtime::Task::history', args: [number | bigint, number | bigint], signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>>;
      spawn(method: 'runtime::Task::history', args: [number | bigint, number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Task::history', args: [number | bigint, number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>>;
      call(method: 'runtime::Task::running', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>>;
      spawn(method: 'runtime::Task::running', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Task::running', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<runtime.Task>>;
      call(method: 'runtime::Debug::info', args: [number | bigint], signal?: AbortSignal): Promise<runtime.DebugInfo>;
      spawn(method: 'runtime::Debug::info', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::info', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<runtime.DebugInfo>;
      call(method: 'runtime::Debug::resume', args: [number | bigint], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::Debug::resume', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::resume', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::Debug::pause', args: [number | bigint], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::Debug::pause', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::pause', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::Debug::workers', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<number | bigint>>;
      spawn(method: 'runtime::Debug::workers', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::workers', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<number | bigint>>;
      call(method: 'runtime::Debug::remove', args: [globalThis.Array<runtime.DebugBreakpoint>], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::Debug::remove', args: [globalThis.Array<runtime.DebugBreakpoint>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::remove', args: [globalThis.Array<runtime.DebugBreakpoint>], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::Debug::add', args: [globalThis.Array<runtime.DebugBreakpoint>], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::Debug::add', args: [globalThis.Array<runtime.DebugBreakpoint>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Debug::add', args: [globalThis.Array<runtime.DebugBreakpoint>], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::SecurityPolicy::permissions', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<string>>;
      spawn(method: 'runtime::SecurityPolicy::permissions', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::SecurityPolicy::permissions', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<string>>;
      call(method: 'runtime::SecurityFields::get', args?: undefined, signal?: AbortSignal): Promise<runtime.SecurityFields | null>;
      spawn(method: 'runtime::SecurityFields::get', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::SecurityFields::get', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<runtime.SecurityFields | null>;
      call(method: 'runtime::SecurityFields::set', args: [runtime.SecurityFields], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::SecurityFields::set', args: [runtime.SecurityFields], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::SecurityFields::set', args: [runtime.SecurityFields], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: AbortSignal): Promise<runtime.OpenIDConnect | null>;
      spawn(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::OpenIDConnect::config', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<runtime.OpenIDConnect | null>;
      call(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<runtime.PeriodicTask>], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<runtime.PeriodicTask>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<runtime.PeriodicTask>], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<runtime.PeriodicTask>>;
      spawn(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::PeriodicTask::all', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<runtime.PeriodicTask>>;
      call(method: 'runtime::Runtime::root', args?: undefined, signal?: AbortSignal): Promise<any>;
      spawn(method: 'runtime::Runtime::root', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Runtime::root', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<any>;
      call(method: 'runtime::Runtime::abi', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::Runtime::abi', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Runtime::abi', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::Runtime::info', args?: undefined, signal?: AbortSignal): Promise<runtime.RuntimeInfo>;
      spawn(method: 'runtime::Runtime::info', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::Runtime::info', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<runtime.RuntimeInfo>;
      call(method: 'runtime::UserRole::set', args: [runtime.UserRole], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::UserRole::set', args: [runtime.UserRole], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::UserRole::set', args: [runtime.UserRole], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::UserRole::remove', args: [string], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'runtime::UserRole::remove', args: [string], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::UserRole::remove', args: [string], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'runtime::UserRole::all', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<runtime.UserRole>>;
      spawn(method: 'runtime::UserRole::all', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::UserRole::all', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<runtime.UserRole>>;
      call(method: 'runtime::SecurityEntity::set', args: [runtime.SecurityEntity], signal?: AbortSignal): Promise<number | bigint | null>;
      spawn(method: 'runtime::SecurityEntity::set', args: [runtime.SecurityEntity], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::SecurityEntity::set', args: [runtime.SecurityEntity], pollEvery?: number, signal?: AbortSignal): Promise<number | bigint | null>;
      call(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: AbortSignal): Promise<globalThis.Array<runtime.SecurityEntity>>;
      spawn(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'runtime::SecurityEntity::all', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Array<runtime.SecurityEntity>>;
      call(method: 'io::CsvAnalysis::analyze', args: [string, io.CsvAnalysisConfig | null], signal?: AbortSignal): Promise<io.CsvStatistics>;
      spawn(method: 'io::CsvAnalysis::analyze', args: [string, io.CsvAnalysisConfig | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'io::CsvAnalysis::analyze', args: [string, io.CsvAnalysisConfig | null], pollEvery?: number, signal?: AbortSignal): Promise<io.CsvStatistics>;
      call(method: 'io::CsvFormat::infer', args: [io.CsvStatistics], signal?: AbortSignal): Promise<io.CsvFormat>;
      spawn(method: 'io::CsvFormat::infer', args: [io.CsvStatistics], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'io::CsvFormat::infer', args: [io.CsvStatistics], pollEvery?: number, signal?: AbortSignal): Promise<io.CsvFormat>;
      call(method: 'io::CsvFormat::sample', args: [string, io.CsvFormat | null, number | bigint | null, number | bigint | null], signal?: AbortSignal): Promise<core.Table>;
      spawn(method: 'io::CsvFormat::sample', args: [string, io.CsvFormat | null, number | bigint | null, number | bigint | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'io::CsvFormat::sample', args: [string, io.CsvFormat | null, number | bigint | null, number | bigint | null], pollEvery?: number, signal?: AbortSignal): Promise<core.Table>;
      call(method: 'io::CsvFormat::validate', args: [string, io.CsvFormat, number | bigint | null, number | bigint | null, string | null], signal?: AbortSignal): Promise<io.CsvValidateResult>;
      spawn(method: 'io::CsvFormat::validate', args: [string, io.CsvFormat, number | bigint | null, number | bigint | null, string | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'io::CsvFormat::validate', args: [string, io.CsvFormat, number | bigint | null, number | bigint | null, string | null], pollEvery?: number, signal?: AbortSignal): Promise<io.CsvValidateResult>;
      call(method: 'io::CsvFormat::generate', args: [io.CsvFormat, number | bigint | null, number | bigint | null], signal?: AbortSignal): Promise<string>;
      spawn(method: 'io::CsvFormat::generate', args: [io.CsvFormat, number | bigint | null, number | bigint | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'io::CsvFormat::generate', args: [io.CsvFormat, number | bigint | null, number | bigint | null], pollEvery?: number, signal?: AbortSignal): Promise<string>;
    }
  }
}
export namespace runtime {
  export interface Task {
    /**
     * Downloads a task file.
     *
     * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
     *
     * Returns a `T[]` because ".gcb" files can contain multiple values.
     *
     * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
     * what is inside the requested file. But it gives no verifications on the content of the data.
     */
    getFile<T = unknown>(
      filepath: `${string}.gcb`,
      g?: $greycat.GreyCat,
      signal?: AbortSignal,
    ): Promise<T[]>;
    /**
     * Downloads a task file.
     *
     * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
     *
     * Returns either a `T` or a `T[]` based on the extension of the file. All files will return `T` except ".gcb" files which
     * can contain more than one value, therefore `T[]`.
     *
     * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
     * what is inside the requested file. But it gives no verifications on the content of the data.
     */
    getFile<T = unknown>(filepath: string, g?: $greycat.GreyCat, signal?: AbortSignal): Promise<T | T[]>;

    /**
     * Returns the result of the task.
     *
     * *This is equivalent to `task.getFile('result.gcb')`*
     */
    result<T = unknown>(g?: $greycat.GreyCat, signal?: AbortSignal): Promise<T>;

    /**
     * Awaits for the completion of the task.
     *
     * *NB: "completion" does not mean success*
     *
     * @param pollEvery will check the status of the task once every `pollEvery` milliseconds
     * @param g
     * @param signal
     */
    await<T = unknown>(pollEvery?: number, g?: $greycat.GreyCat, signal?: AbortSignal): Promise<T>;

    /**
     * Whether or not this task is live or completed.
     * @param g 
     * @param signal 
     */
    is_running(g?: $greycat.GreyCat, signal?: AbortSignal): Promise<boolean>;
  }
}

export namespace io {
  export interface File {
    children?: File[];

    /**
     * Lists the current children of this file.
     *
     * If this file is not a directory, returns `undefined`.
     */
    list(g?: $greycat.GreyCat, signal?: AbortSignal): Promise<File[] | undefined>;

    /**
     * Resolves this file's children recursively to a maximum depth of `maxDepth` (defaults to `5`)
     */
    resolve(maxDepth?: number, g?: $greycat.GreyCat, signal?: AbortSignal): Promise<void>;
  }
}

export namespace core {
  export interface Date {
    /**
     * ISO8601-ish representation of this date
     */
    toString(): string;
  }
}
