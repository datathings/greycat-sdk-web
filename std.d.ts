// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* oxlint-disable */
/* oxlint-disable */
declare namespace gc {
  namespace core {
    class DurationUnit extends gc.sdk.GCEnum {
      static readonly _type = 'core::DurationUnit';
      static readonly $fields: DurationUnit[];
      key: DurationUnit.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: DurationUnit.Field);
      static microseconds: DurationUnit;
      static milliseconds: DurationUnit;
      static seconds: DurationUnit;
      static minutes: DurationUnit;
      static hours: DurationUnit;
      static days: DurationUnit;
    }
    namespace DurationUnit  {
      type Field = "microseconds"|"milliseconds"|"seconds"|"minutes"|"hours"|"days";
    }

    class Table$applyMappings$args extends gc.sdk.GCObject {
      static readonly _type = 'core::Table$applyMappings$args';
      static readonly $fields: Table$applyMappings$args.$Fields;
      table: gc.core.Table;
      mappings: globalThis.Array<gc.core.TableColumnMapping>;
      constructor(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>);
      static createFrom(fields: {table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>}): Table$applyMappings$args;
    }
    namespace Table$applyMappings$args {
      interface $Fields {
        table: 0;
        mappings: 1;
      }
    }

    class nodeTime$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTime$sample$args';
      static readonly $fields: nodeTime$sample$args.$Fields;
      refs: globalThis.Array<gc.core.nodeTime>;
      from: gc.core.time | null;
      to: gc.core.time | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      maxDephasing: gc.core.duration | null;
      tz: gc.core.TimeZone | null;
      constructor(refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeTime>, from?: gc.core.time | null, to?: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null}): nodeTime$sample$args;
    }
    namespace nodeTime$sample$args {
      interface $Fields {
        refs: 0;
        from: 1;
        to: 2;
        maxRows: 3;
        mode: 4;
        maxDephasing: 5;
        tz: 6;
      }
    }

    class TensorDistance extends gc.sdk.GCEnum {
      static readonly _type = 'core::TensorDistance';
      static readonly $fields: TensorDistance[];
      key: TensorDistance.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TensorDistance.Field);
      static euclidean: TensorDistance;
      static l2sq: TensorDistance;
      static cosine: TensorDistance;
    }
    namespace TensorDistance  {
      type Field = "euclidean"|"l2sq"|"cosine";
    }

    class nodeList$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeList$info$args';
      static readonly $fields: nodeList$info$args.$Fields;
      nodes: globalThis.Array<gc.core.nodeList>;
      constructor(nodes: globalThis.Array<gc.core.nodeList>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeList>}): nodeList$info$args;
    }
    namespace nodeList$info$args {
      interface $Fields {
        nodes: 0;
      }
    }

    class Chars extends gc.sdk.GCObject {
      static readonly _type = 'core::Chars';
      static readonly $fields: Chars.$Fields;
      codepoints: globalThis.Array<string>;
      constructor(codepoints: globalThis.Array<string>);
      static createFrom(fields: {codepoints: globalThis.Array<string>}): Chars;
    }
    namespace Chars {
      interface $Fields {
        codepoints: 0;
      }
    }

    class ErrorCode extends gc.sdk.GCEnum {
      static readonly _type = 'core::ErrorCode';
      static readonly $fields: ErrorCode[];
      key: ErrorCode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: ErrorCode.Field);
      static none: ErrorCode;
      static interrupted: ErrorCode;
      static await: ErrorCode;
      static timeout: ErrorCode;
      static forbidden: ErrorCode;
      static runtime_error: ErrorCode;
    }
    namespace ErrorCode  {
      type Field = "none"|"interrupted"|"await"|"timeout"|"forbidden"|"runtime_error";
    }

    class nodeTimeCursor<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTimeCursor';
      static readonly $fields: nodeTimeCursor.$Fields;
      n: gc.core.nodeTime<T>;
      constructor(n: gc.core.nodeTime<T>);
      static createFrom<T>(fields: {n: gc.core.nodeTime<T>}): nodeTimeCursor;
    }
    namespace nodeTimeCursor {
      interface $Fields {
        n: 0;
      }
    }

    class nodeIndex$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$info$args';
      static readonly $fields: nodeIndex$info$args.$Fields;
      nodes: globalThis.Array<gc.core.nodeIndex>;
      constructor(nodes: globalThis.Array<gc.core.nodeIndex>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeIndex>}): nodeIndex$info$args;
    }
    namespace nodeIndex$info$args {
      interface $Fields {
        nodes: 0;
      }
    }

    class float extends gc.sdk.std_n.core.float {}

    class bool extends gc.sdk.std_n.core.bool {}

    class String extends gc.sdk.std_n.core.String {}

    class field extends gc.sdk.std_n.core.field {}

    class Buffer extends gc.sdk.std_n.core.Buffer {}

    class nodeIndex$search_closest$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$search_closest$args';
      static readonly $fields: nodeIndex$search_closest$args.$Fields;
      i: gc.core.nodeIndex;
      key: any;
      max: number | bigint;
      constructor(i: gc.core.nodeIndex, key: any, max: number | bigint);
      static createFrom(fields: {i: gc.core.nodeIndex, key: any, max: number | bigint}): nodeIndex$search_closest$args;
    }
    namespace nodeIndex$search_closest$args {
      interface $Fields {
        i: 0;
        key: 1;
        max: 2;
      }
    }

    class SortOrder extends gc.sdk.GCEnum {
      static readonly _type = 'core::SortOrder';
      static readonly $fields: SortOrder[];
      key: SortOrder.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SortOrder.Field);
      static asc: SortOrder;
      static desc: SortOrder;
    }
    namespace SortOrder  {
      type Field = "asc"|"desc";
    }

    class Error extends gc.sdk.GCObject {
      static readonly _type = 'core::Error';
      static readonly $fields: Error.$Fields;
      message: string | null;
      stack: globalThis.Array<gc.core.ErrorFrame>;
      constructor(message: string | null, stack: globalThis.Array<gc.core.ErrorFrame>);
      static createFrom(fields: {message?: string | null, stack: globalThis.Array<gc.core.ErrorFrame>}): Error;
    }
    namespace Error {
      interface $Fields {
        message: 0;
        stack: 1;
      }
    }

    class TableColumnMapping extends gc.sdk.GCObject {
      static readonly _type = 'core::TableColumnMapping';
      static readonly $fields: TableColumnMapping.$Fields;
      column: number | bigint;
      extractors: globalThis.Array<any>;
      constructor(column: number | bigint, extractors: globalThis.Array<any>);
      static createFrom(fields: {column: number | bigint, extractors: globalThis.Array<any>}): TableColumnMapping;
    }
    namespace TableColumnMapping {
      interface $Fields {
        column: 0;
        extractors: 1;
      }
    }

    class nodeGeo$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeGeo$info$args';
      static readonly $fields: nodeGeo$info$args.$Fields;
      nodes: globalThis.Array<gc.core.nodeGeo>;
      constructor(nodes: globalThis.Array<gc.core.nodeGeo>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeGeo>}): nodeGeo$info$args;
    }
    namespace nodeGeo$info$args {
      interface $Fields {
        nodes: 0;
      }
    }

    class node$resolve_all$args extends gc.sdk.GCObject {
      static readonly _type = 'core::node$resolve_all$args';
      static readonly $fields: node$resolve_all$args.$Fields;
      n: globalThis.Array<gc.core.node | null>;
      constructor(n: globalThis.Array<gc.core.node | null>);
      static createFrom(fields: {n: globalThis.Array<gc.core.node | null>}): node$resolve_all$args;
    }
    namespace node$resolve_all$args {
      interface $Fields {
        n: 0;
      }
    }

    class geo extends gc.sdk.std_n.core.geo {}

    class type extends gc.sdk.std_n.core.type {}

    class null_ extends gc.sdk.std_n.core.null_ {}

    class node<T = any> extends gc.sdk.std_n.core.node<T> {
      /**
       * Return an array with the contents of the addresses pointed by the nodes in the array `n`
       */
      static resolve_all: ((n: globalThis.Array<gc.core.node | null>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<any | null>>) & {
        spawn(n: globalThis.Array<gc.core.node | null>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<any | null>>>;
      };
    }

    class Tuple<T = any, U = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::Tuple';
      static readonly $fields: Tuple.$Fields;
      x: T;
      y: U;
      constructor(x?: T, y?: U);
      static createFrom<T, U>(fields: {x?: T, y?: U}): Tuple;
    }
    namespace Tuple {
      interface $Fields {
        x: 0;
        y: 1;
      }
    }

    class VectorVertex extends gc.sdk.GCObject {
      static readonly _type = 'core::VectorVertex';
      static readonly $fields: VectorVertex.$Fields;
      vector: gc.core.node<gc.core.Tensor>;
      level_sizes: globalThis.Array<number | bigint>;
      neighbour_nodes: globalThis.Array<gc.core.node<gc.core.VectorVertex> | null>;
      constructor(vector: gc.core.node<gc.core.Tensor>, level_sizes: globalThis.Array<number | bigint>, neighbour_nodes: globalThis.Array<gc.core.node<gc.core.VectorVertex> | null>);
      static createFrom(fields: {vector: gc.core.node<gc.core.Tensor>, level_sizes: globalThis.Array<number | bigint>, neighbour_nodes: globalThis.Array<gc.core.node<gc.core.VectorVertex> | null>}): VectorVertex;
    }
    namespace VectorVertex {
      interface $Fields {
        vector: 0;
        level_sizes: 1;
        neighbour_nodes: 2;
      }
    }

    class nodeIndexBucket<K = any, V = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndexBucket';
      static readonly $fields: nodeIndexBucket.$Fields;
      key: K;
      value: V;
      next: gc.core.nodeIndexBucket<K, V> | null;
      constructor(key?: K, value?: V, next?: gc.core.nodeIndexBucket<K, V> | null);
      static createFrom<K, V>(fields: {key?: K, value?: V, next?: gc.core.nodeIndexBucket<K, V> | null}): nodeIndexBucket;
    }
    namespace nodeIndexBucket {
      interface $Fields {
        key: 0;
        value: 1;
        next: 2;
      }
    }

    class nodeGeo$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeGeo$sample$args';
      static readonly $fields: nodeGeo$sample$args.$Fields;
      refs: globalThis.Array<gc.core.nodeGeo>;
      from: gc.core.geo | null;
      to: gc.core.geo | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      constructor(refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeGeo>, from?: gc.core.geo | null, to?: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode}): nodeGeo$sample$args;
    }
    namespace nodeGeo$sample$args {
      interface $Fields {
        refs: 0;
        from: 1;
        to: 2;
        maxRows: 3;
        mode: 4;
      }
    }

    class TensorType extends gc.sdk.GCEnum {
      static readonly _type = 'core::TensorType';
      static readonly $fields: TensorType[];
      key: TensorType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TensorType.Field);
      static i32: TensorType;
      static i64: TensorType;
      static f32: TensorType;
      static f64: TensorType;
      static c64: TensorType;
      static c128: TensorType;
    }
    namespace TensorType  {
      type Field = "i32"|"i64"|"f32"|"f64"|"c64"|"c128";
    }

    class nodeTime<T = any> extends gc.sdk.std_n.core.nodeTime<T> {
      /**
       * Returns the NodeInfo of all the nodeTime passed as input parameters.
       * The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeTime in input array parameter.
       */
      static info: ((nodes: globalThis.Array<gc.core.nodeTime>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>) & {
        spawn(nodes: globalThis.Array<gc.core.nodeTime>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>>;
      };
      /**
       * Sample, using `mode` sampling, the nodeTimes in `refs` within the interval [`from`, `to`].
       * Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
       */
      static sample: ((refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
    }

    class SamplingMode extends gc.sdk.GCEnum {
      static readonly _type = 'core::SamplingMode';
      static readonly $fields: SamplingMode[];
      key: SamplingMode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SamplingMode.Field);
      static fixed: SamplingMode;
      static fixed_reg: SamplingMode;
      static adaptative: SamplingMode;
      static dense: SamplingMode;
    }
    namespace SamplingMode  {
      type Field = "fixed"|"fixed_reg"|"adaptative"|"dense";
    }

    class nodeList$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeList$sample$args';
      static readonly $fields: nodeList$sample$args.$Fields;
      refs: globalThis.Array<gc.core.nodeList>;
      from: number | bigint | null;
      to: number | bigint | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      maxDephasing: number | bigint | null;
      constructor(refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeList>, from?: number | bigint | null, to?: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null}): nodeList$sample$args;
    }
    namespace nodeList$sample$args {
      interface $Fields {
        refs: 0;
        from: 1;
        to: 2;
        maxRows: 3;
        mode: 4;
        maxDephasing: 5;
      }
    }

    class nodeList<T = any> extends gc.sdk.std_n.core.nodeList<T> {
      /**
       * Returns the NodeInfo of all the nodeList passed as input parameters.
       * The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeList in input array parameter.
       */
      static info: ((nodes: globalThis.Array<gc.core.nodeList>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>) & {
        spawn(nodes: globalThis.Array<gc.core.nodeList>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.NodeInfo<number | bigint>>>>;
      };
      /**
       * Sample, using `mode` sampling, the nodeLists in `refs` within the interval `[from, to]`.
       * Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
       */
      static sample: ((refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
    }

    class int extends gc.sdk.std_n.core.int {}

    class Tensor extends gc.sdk.std_n.core.Tensor {}

    class GeoPoly extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoPoly';
      static readonly $fields: GeoPoly.$Fields;
      points: globalThis.Array<gc.core.geo>;
      constructor(points: globalThis.Array<gc.core.geo>);
      static createFrom(fields: {points: globalThis.Array<gc.core.geo>}): GeoPoly;
    }
    namespace GeoPoly {
      interface $Fields {
        points: 0;
      }
    }

    class char extends gc.sdk.std_n.core.char {}

    class FloatPrecision extends gc.sdk.GCEnum {
      static readonly _type = 'core::FloatPrecision';
      static readonly $fields: FloatPrecision[];
      key: FloatPrecision.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: FloatPrecision.Field);
      static p1: FloatPrecision;
      static p10: FloatPrecision;
      static p100: FloatPrecision;
      static p1000: FloatPrecision;
      static p10000: FloatPrecision;
      static p100000: FloatPrecision;
      static p1000000: FloatPrecision;
      static p10000000: FloatPrecision;
      static p100000000: FloatPrecision;
      static p1000000000: FloatPrecision;
      static p10000000000: FloatPrecision;
    }
    namespace FloatPrecision  {
      type Field = "p1"|"p10"|"p100"|"p1000"|"p10000"|"p100000"|"p1000000"|"p10000000"|"p100000000"|"p1000000000"|"p10000000000";
    }

    class ErrorFrame extends gc.sdk.GCObject {
      static readonly _type = 'core::ErrorFrame';
      static readonly $fields: ErrorFrame.$Fields;
      module: string | null;
      function: string;
      line: number | bigint;
      column: number | bigint;
      constructor(module: string | null, function_: string, line: number | bigint, column: number | bigint);
      static createFrom(fields: {module?: string | null, function_: string, line: number | bigint, column: number | bigint}): ErrorFrame;
    }
    namespace ErrorFrame {
      interface $Fields {
        module: 0;
        function: 1;
        line: 2;
        column: 3;
      }
    }

    class Table<T = any> extends gc.sdk.std_n.core.Table<T> {
      /**
       * Produces a new table by applying mappings to columns.
       */
      static applyMappings: ((table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
    }

    class function_ extends gc.sdk.std_n.core.function_ {}

    class nodeTime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTime$info$args';
      static readonly $fields: nodeTime$info$args.$Fields;
      nodes: globalThis.Array<gc.core.nodeTime>;
      constructor(nodes: globalThis.Array<gc.core.nodeTime>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeTime>}): nodeTime$info$args;
    }
    namespace nodeTime$info$args {
      interface $Fields {
        nodes: 0;
      }
    }

    class duration extends gc.sdk.std_n.core.duration {}

    class MathConstants extends gc.sdk.GCObject {
      static readonly _type = 'core::MathConstants';
    }

    class Map<K = any, V = any> extends gc.sdk.std_n.core.Map<K, V> {}

    class nodeIndex$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$sample$args';
      static readonly $fields: nodeIndex$sample$args.$Fields;
      refs: globalThis.Array<gc.core.nodeIndex>;
      from: any | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      constructor(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeIndex>, from?: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode}): nodeIndex$sample$args;
    }
    namespace nodeIndex$sample$args {
      interface $Fields {
        refs: 0;
        from: 1;
        maxRows: 2;
        mode: 3;
      }
    }

    class GeoBox extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoBox';
      static readonly $fields: GeoBox.$Fields;
      sw: gc.core.geo;
      ne: gc.core.geo;
      constructor(sw: gc.core.geo, ne: gc.core.geo);
      static createFrom(fields: {sw: gc.core.geo, ne: gc.core.geo}): GeoBox;
    }
    namespace GeoBox {
      interface $Fields {
        sw: 0;
        ne: 1;
      }
    }

    class Array<T = any> extends gc.sdk.std_n.core.Array<T> {}

    class CalendarUnit extends gc.sdk.GCEnum {
      static readonly _type = 'core::CalendarUnit';
      static readonly $fields: CalendarUnit[];
      key: CalendarUnit.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: CalendarUnit.Field);
      static year: CalendarUnit;
      static month: CalendarUnit;
      static day: CalendarUnit;
      static hour: CalendarUnit;
      static minute: CalendarUnit;
      static second: CalendarUnit;
      static microsecond: CalendarUnit;
    }
    namespace CalendarUnit  {
      type Field = "year"|"month"|"day"|"hour"|"minute"|"second"|"microsecond";
    }

    class nodeGeo<T = any> extends gc.sdk.std_n.core.nodeGeo<T> {
      /**
       * Returns the NodeInfo of all the nodeGeo passed as input parameters.
       * The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeGeo in input array parameter.
       */
      static info: ((nodes: globalThis.Array<gc.core.nodeGeo>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>) & {
        spawn(nodes: globalThis.Array<gc.core.nodeGeo>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>>;
      };
      /**
       * Sample, using `mode` sampling, the nodeLists in `refs` within the `GeoBox` initialized with the geo points `from` and `to`.
       * Also set that at most `maxRows` rows are allowed to the resulting Table and the max dephasing of points is `maxDephasing`.
       */
      static sample: ((refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
    }

    class nodeIndex<K = any, V = any> extends gc.sdk.std_n.core.nodeIndex<K, V> {
      static search_closest: ((i: gc.core.nodeIndex, key: any, max: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.SearchResult>>) & {
        spawn(i: gc.core.nodeIndex, key: any, max: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.SearchResult>>>;
      };
      /**
       * Returns the NodeInfo of all the nodeIndex passed as input parameters.
       * The return Array will have exactly the same size as input and every NodeInfo result will be positioned at the same offset than nodeIndex in input array parameter.
       */
      static info: ((nodes: globalThis.Array<gc.core.nodeIndex>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.NodeInfo>>) & {
        spawn(nodes: globalThis.Array<gc.core.nodeIndex>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.NodeInfo>>>;
      };
      /**
       * Using `mode` sampling, samples maxRows elements from nodeIndexes in `refs`, starting from the key: from.
       */
      static sample: ((refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
    }

    class SearchResult<K = any, V = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::SearchResult';
      static readonly $fields: SearchResult.$Fields;
      key: K;
      value: V;
      distance: number;
      constructor(key: K, value: V, distance: number);
      static createFrom<K, V>(fields: {key?: K, value?: V, distance: number}): SearchResult;
    }
    namespace SearchResult {
      interface $Fields {
        key: 0;
        value: 1;
        distance: 2;
      }
    }

    class time extends gc.sdk.std_n.core.time {}

    class Date extends gc.sdk.GCObject {
      static readonly _type = 'core::Date';
      static readonly $fields: Date.$Fields;
      year: number | bigint;
      month: number | bigint;
      day: number | bigint;
      hour: number | bigint;
      minute: number | bigint;
      second: number | bigint;
      microsecond: number | bigint;
      constructor(year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint);
      static createFrom(fields: {year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint}): Date;
    }
    namespace Date {
      interface $Fields {
        year: 0;
        month: 1;
        day: 2;
        hour: 3;
        minute: 4;
        second: 5;
        microsecond: 6;
      }
    }

    class NodeInfo<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::NodeInfo';
      static readonly $fields: NodeInfo.$Fields;
      size: number | bigint;
      from: T | null;
      to: T | null;
      constructor(size: number | bigint, from?: T | null, to?: T | null);
      static createFrom<T>(fields: {size: number | bigint, from?: T | null, to?: T | null}): NodeInfo;
    }
    namespace NodeInfo {
      interface $Fields {
        size: 0;
        from: 1;
        to: 2;
      }
    }

    class TimeZone extends gc.sdk.GCEnum {
      static readonly _type = 'core::TimeZone';
      static readonly $fields: TimeZone[];
      key: TimeZone.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TimeZone.Field);
      static UTC: TimeZone;
      static "Africa/Abidjan": TimeZone;
      static "Africa/Accra": TimeZone;
      static "Africa/Addis_Ababa": TimeZone;
      static "Africa/Algiers": TimeZone;
      static "Africa/Asmara": TimeZone;
      static "Africa/Asmera": TimeZone;
      static "Africa/Bamako": TimeZone;
      static "Africa/Bangui": TimeZone;
      static "Africa/Banjul": TimeZone;
      static "Africa/Bissau": TimeZone;
      static "Africa/Blantyre": TimeZone;
      static "Africa/Brazzaville": TimeZone;
      static "Africa/Bujumbura": TimeZone;
      static "Africa/Cairo": TimeZone;
      static "Africa/Casablanca": TimeZone;
      static "Africa/Ceuta": TimeZone;
      static "Africa/Conakry": TimeZone;
      static "Africa/Dakar": TimeZone;
      static "Africa/Dar_es_Salaam": TimeZone;
      static "Africa/Djibouti": TimeZone;
      static "Africa/Douala": TimeZone;
      static "Africa/El_Aaiun": TimeZone;
      static "Africa/Freetown": TimeZone;
      static "Africa/Gaborone": TimeZone;
      static "Africa/Harare": TimeZone;
      static "Africa/Johannesburg": TimeZone;
      static "Africa/Juba": TimeZone;
      static "Africa/Kampala": TimeZone;
      static "Africa/Khartoum": TimeZone;
      static "Africa/Kigali": TimeZone;
      static "Africa/Kinshasa": TimeZone;
      static "Africa/Lagos": TimeZone;
      static "Africa/Libreville": TimeZone;
      static "Africa/Lome": TimeZone;
      static "Africa/Luanda": TimeZone;
      static "Africa/Lubumbashi": TimeZone;
      static "Africa/Lusaka": TimeZone;
      static "Africa/Malabo": TimeZone;
      static "Africa/Maputo": TimeZone;
      static "Africa/Maseru": TimeZone;
      static "Africa/Mbabane": TimeZone;
      static "Africa/Mogadishu": TimeZone;
      static "Africa/Monrovia": TimeZone;
      static "Africa/Nairobi": TimeZone;
      static "Africa/Ndjamena": TimeZone;
      static "Africa/Niamey": TimeZone;
      static "Africa/Nouakchott": TimeZone;
      static "Africa/Ouagadougou": TimeZone;
      static "Africa/Porto-Novo": TimeZone;
      static "Africa/Sao_Tome": TimeZone;
      static "Africa/Timbuktu": TimeZone;
      static "Africa/Tripoli": TimeZone;
      static "Africa/Tunis": TimeZone;
      static "Africa/Windhoek": TimeZone;
      static "America/Adak": TimeZone;
      static "America/Anchorage": TimeZone;
      static "America/Anguilla": TimeZone;
      static "America/Antigua": TimeZone;
      static "America/Araguaina": TimeZone;
      static "America/Argentina/Buenos_Aires": TimeZone;
      static "America/Argentina/Catamarca": TimeZone;
      static "America/Argentina/ComodRivadavia": TimeZone;
      static "America/Argentina/Cordoba": TimeZone;
      static "America/Argentina/Jujuy": TimeZone;
      static "America/Argentina/La_Rioja": TimeZone;
      static "America/Argentina/Mendoza": TimeZone;
      static "America/Argentina/Rio_Gallegos": TimeZone;
      static "America/Argentina/Salta": TimeZone;
      static "America/Argentina/San_Juan": TimeZone;
      static "America/Argentina/San_Luis": TimeZone;
      static "America/Argentina/Tucuman": TimeZone;
      static "America/Argentina/Ushuaia": TimeZone;
      static "America/Aruba": TimeZone;
      static "America/Asuncion": TimeZone;
      static "America/Atikokan": TimeZone;
      static "America/Atka": TimeZone;
      static "America/Bahia": TimeZone;
      static "America/Bahia_Banderas": TimeZone;
      static "America/Barbados": TimeZone;
      static "America/Belem": TimeZone;
      static "America/Belize": TimeZone;
      static "America/Blanc-Sablon": TimeZone;
      static "America/Boa_Vista": TimeZone;
      static "America/Bogota": TimeZone;
      static "America/Boise": TimeZone;
      static "America/Buenos_Aires": TimeZone;
      static "America/Cambridge_Bay": TimeZone;
      static "America/Campo_Grande": TimeZone;
      static "America/Cancun": TimeZone;
      static "America/Caracas": TimeZone;
      static "America/Catamarca": TimeZone;
      static "America/Cayenne": TimeZone;
      static "America/Cayman": TimeZone;
      static "America/Chicago": TimeZone;
      static "America/Chihuahua": TimeZone;
      static "America/Ciudad_Juarez": TimeZone;
      static "America/Coral_Harbour": TimeZone;
      static "America/Cordoba": TimeZone;
      static "America/Costa_Rica": TimeZone;
      static "America/Coyhaique": TimeZone;
      static "America/Creston": TimeZone;
      static "America/Cuiaba": TimeZone;
      static "America/Curacao": TimeZone;
      static "America/Danmarkshavn": TimeZone;
      static "America/Dawson": TimeZone;
      static "America/Dawson_Creek": TimeZone;
      static "America/Denver": TimeZone;
      static "America/Detroit": TimeZone;
      static "America/Dominica": TimeZone;
      static "America/Edmonton": TimeZone;
      static "America/Eirunepe": TimeZone;
      static "America/El_Salvador": TimeZone;
      static "America/Ensenada": TimeZone;
      static "America/Fort_Nelson": TimeZone;
      static "America/Fort_Wayne": TimeZone;
      static "America/Fortaleza": TimeZone;
      static "America/Glace_Bay": TimeZone;
      static "America/Godthab": TimeZone;
      static "America/Goose_Bay": TimeZone;
      static "America/Grand_Turk": TimeZone;
      static "America/Grenada": TimeZone;
      static "America/Guadeloupe": TimeZone;
      static "America/Guatemala": TimeZone;
      static "America/Guayaquil": TimeZone;
      static "America/Guyana": TimeZone;
      static "America/Halifax": TimeZone;
      static "America/Havana": TimeZone;
      static "America/Hermosillo": TimeZone;
      static "America/Indiana/Indianapolis": TimeZone;
      static "America/Indiana/Knox": TimeZone;
      static "America/Indiana/Marengo": TimeZone;
      static "America/Indiana/Petersburg": TimeZone;
      static "America/Indiana/Tell_City": TimeZone;
      static "America/Indiana/Vevay": TimeZone;
      static "America/Indiana/Vincennes": TimeZone;
      static "America/Indiana/Winamac": TimeZone;
      static "America/Indianapolis": TimeZone;
      static "America/Inuvik": TimeZone;
      static "America/Iqaluit": TimeZone;
      static "America/Jamaica": TimeZone;
      static "America/Jujuy": TimeZone;
      static "America/Juneau": TimeZone;
      static "America/Kentucky/Louisville": TimeZone;
      static "America/Kentucky/Monticello": TimeZone;
      static "America/Knox_IN": TimeZone;
      static "America/Kralendijk": TimeZone;
      static "America/La_Paz": TimeZone;
      static "America/Lima": TimeZone;
      static "America/Los_Angeles": TimeZone;
      static "America/Louisville": TimeZone;
      static "America/Lower_Princes": TimeZone;
      static "America/Maceio": TimeZone;
      static "America/Managua": TimeZone;
      static "America/Manaus": TimeZone;
      static "America/Marigot": TimeZone;
      static "America/Martinique": TimeZone;
      static "America/Matamoros": TimeZone;
      static "America/Mazatlan": TimeZone;
      static "America/Mendoza": TimeZone;
      static "America/Menominee": TimeZone;
      static "America/Merida": TimeZone;
      static "America/Metlakatla": TimeZone;
      static "America/Mexico_City": TimeZone;
      static "America/Miquelon": TimeZone;
      static "America/Moncton": TimeZone;
      static "America/Monterrey": TimeZone;
      static "America/Montevideo": TimeZone;
      static "America/Montreal": TimeZone;
      static "America/Montserrat": TimeZone;
      static "America/Nassau": TimeZone;
      static "America/New_York": TimeZone;
      static "America/Nipigon": TimeZone;
      static "America/Nome": TimeZone;
      static "America/Noronha": TimeZone;
      static "America/North_Dakota/Beulah": TimeZone;
      static "America/North_Dakota/Center": TimeZone;
      static "America/North_Dakota/New_Salem": TimeZone;
      static "America/Nuuk": TimeZone;
      static "America/Ojinaga": TimeZone;
      static "America/Panama": TimeZone;
      static "America/Pangnirtung": TimeZone;
      static "America/Paramaribo": TimeZone;
      static "America/Phoenix": TimeZone;
      static "America/Port-au-Prince": TimeZone;
      static "America/Port_of_Spain": TimeZone;
      static "America/Porto_Acre": TimeZone;
      static "America/Porto_Velho": TimeZone;
      static "America/Puerto_Rico": TimeZone;
      static "America/Punta_Arenas": TimeZone;
      static "America/Rainy_River": TimeZone;
      static "America/Rankin_Inlet": TimeZone;
      static "America/Recife": TimeZone;
      static "America/Regina": TimeZone;
      static "America/Resolute": TimeZone;
      static "America/Rio_Branco": TimeZone;
      static "America/Rosario": TimeZone;
      static "America/Santa_Isabel": TimeZone;
      static "America/Santarem": TimeZone;
      static "America/Santiago": TimeZone;
      static "America/Santo_Domingo": TimeZone;
      static "America/Sao_Paulo": TimeZone;
      static "America/Scoresbysund": TimeZone;
      static "America/Shiprock": TimeZone;
      static "America/Sitka": TimeZone;
      static "America/St_Barthelemy": TimeZone;
      static "America/St_Johns": TimeZone;
      static "America/St_Kitts": TimeZone;
      static "America/St_Lucia": TimeZone;
      static "America/St_Thomas": TimeZone;
      static "America/St_Vincent": TimeZone;
      static "America/Swift_Current": TimeZone;
      static "America/Tegucigalpa": TimeZone;
      static "America/Thule": TimeZone;
      static "America/Thunder_Bay": TimeZone;
      static "America/Tijuana": TimeZone;
      static "America/Toronto": TimeZone;
      static "America/Tortola": TimeZone;
      static "America/Vancouver": TimeZone;
      static "America/Virgin": TimeZone;
      static "America/Whitehorse": TimeZone;
      static "America/Winnipeg": TimeZone;
      static "America/Yakutat": TimeZone;
      static "America/Yellowknife": TimeZone;
      static "Antarctica/Casey": TimeZone;
      static "Antarctica/Davis": TimeZone;
      static "Antarctica/DumontDUrville": TimeZone;
      static "Antarctica/Macquarie": TimeZone;
      static "Antarctica/Mawson": TimeZone;
      static "Antarctica/McMurdo": TimeZone;
      static "Antarctica/Palmer": TimeZone;
      static "Antarctica/Rothera": TimeZone;
      static "Antarctica/South_Pole": TimeZone;
      static "Antarctica/Syowa": TimeZone;
      static "Antarctica/Troll": TimeZone;
      static "Antarctica/Vostok": TimeZone;
      static "Arctic/Longyearbyen": TimeZone;
      static "Asia/Aden": TimeZone;
      static "Asia/Almaty": TimeZone;
      static "Asia/Amman": TimeZone;
      static "Asia/Anadyr": TimeZone;
      static "Asia/Aqtau": TimeZone;
      static "Asia/Aqtobe": TimeZone;
      static "Asia/Ashgabat": TimeZone;
      static "Asia/Ashkhabad": TimeZone;
      static "Asia/Atyrau": TimeZone;
      static "Asia/Baghdad": TimeZone;
      static "Asia/Bahrain": TimeZone;
      static "Asia/Baku": TimeZone;
      static "Asia/Bangkok": TimeZone;
      static "Asia/Barnaul": TimeZone;
      static "Asia/Beirut": TimeZone;
      static "Asia/Bishkek": TimeZone;
      static "Asia/Brunei": TimeZone;
      static "Asia/Calcutta": TimeZone;
      static "Asia/Chita": TimeZone;
      static "Asia/Choibalsan": TimeZone;
      static "Asia/Chongqing": TimeZone;
      static "Asia/Chungking": TimeZone;
      static "Asia/Colombo": TimeZone;
      static "Asia/Dacca": TimeZone;
      static "Asia/Damascus": TimeZone;
      static "Asia/Dhaka": TimeZone;
      static "Asia/Dili": TimeZone;
      static "Asia/Dubai": TimeZone;
      static "Asia/Dushanbe": TimeZone;
      static "Asia/Famagusta": TimeZone;
      static "Asia/Gaza": TimeZone;
      static "Asia/Harbin": TimeZone;
      static "Asia/Hebron": TimeZone;
      static "Asia/Ho_Chi_Minh": TimeZone;
      static "Asia/Hong_Kong": TimeZone;
      static "Asia/Hovd": TimeZone;
      static "Asia/Irkutsk": TimeZone;
      static "Asia/Istanbul": TimeZone;
      static "Asia/Jakarta": TimeZone;
      static "Asia/Jayapura": TimeZone;
      static "Asia/Jerusalem": TimeZone;
      static "Asia/Kabul": TimeZone;
      static "Asia/Kamchatka": TimeZone;
      static "Asia/Karachi": TimeZone;
      static "Asia/Kashgar": TimeZone;
      static "Asia/Kathmandu": TimeZone;
      static "Asia/Katmandu": TimeZone;
      static "Asia/Khandyga": TimeZone;
      static "Asia/Kolkata": TimeZone;
      static "Asia/Krasnoyarsk": TimeZone;
      static "Asia/Kuala_Lumpur": TimeZone;
      static "Asia/Kuching": TimeZone;
      static "Asia/Kuwait": TimeZone;
      static "Asia/Macao": TimeZone;
      static "Asia/Macau": TimeZone;
      static "Asia/Magadan": TimeZone;
      static "Asia/Makassar": TimeZone;
      static "Asia/Manila": TimeZone;
      static "Asia/Muscat": TimeZone;
      static "Asia/Nicosia": TimeZone;
      static "Asia/Novokuznetsk": TimeZone;
      static "Asia/Novosibirsk": TimeZone;
      static "Asia/Omsk": TimeZone;
      static "Asia/Oral": TimeZone;
      static "Asia/Phnom_Penh": TimeZone;
      static "Asia/Pontianak": TimeZone;
      static "Asia/Pyongyang": TimeZone;
      static "Asia/Qatar": TimeZone;
      static "Asia/Qostanay": TimeZone;
      static "Asia/Qyzylorda": TimeZone;
      static "Asia/Rangoon": TimeZone;
      static "Asia/Riyadh": TimeZone;
      static "Asia/Saigon": TimeZone;
      static "Asia/Sakhalin": TimeZone;
      static "Asia/Samarkand": TimeZone;
      static "Asia/Seoul": TimeZone;
      static "Asia/Shanghai": TimeZone;
      static "Asia/Singapore": TimeZone;
      static "Asia/Srednekolymsk": TimeZone;
      static "Asia/Taipei": TimeZone;
      static "Asia/Tashkent": TimeZone;
      static "Asia/Tbilisi": TimeZone;
      static "Asia/Tehran": TimeZone;
      static "Asia/Tel_Aviv": TimeZone;
      static "Asia/Thimbu": TimeZone;
      static "Asia/Thimphu": TimeZone;
      static "Asia/Tokyo": TimeZone;
      static "Asia/Tomsk": TimeZone;
      static "Asia/Ujung_Pandang": TimeZone;
      static "Asia/Ulaanbaatar": TimeZone;
      static "Asia/Ulan_Bator": TimeZone;
      static "Asia/Urumqi": TimeZone;
      static "Asia/Ust-Nera": TimeZone;
      static "Asia/Vientiane": TimeZone;
      static "Asia/Vladivostok": TimeZone;
      static "Asia/Yakutsk": TimeZone;
      static "Asia/Yangon": TimeZone;
      static "Asia/Yekaterinburg": TimeZone;
      static "Asia/Yerevan": TimeZone;
      static "Atlantic/Azores": TimeZone;
      static "Atlantic/Bermuda": TimeZone;
      static "Atlantic/Canary": TimeZone;
      static "Atlantic/Cape_Verde": TimeZone;
      static "Atlantic/Faeroe": TimeZone;
      static "Atlantic/Faroe": TimeZone;
      static "Atlantic/Jan_Mayen": TimeZone;
      static "Atlantic/Madeira": TimeZone;
      static "Atlantic/Reykjavik": TimeZone;
      static "Atlantic/South_Georgia": TimeZone;
      static "Atlantic/St_Helena": TimeZone;
      static "Atlantic/Stanley": TimeZone;
      static "Australia/ACT": TimeZone;
      static "Australia/Adelaide": TimeZone;
      static "Australia/Brisbane": TimeZone;
      static "Australia/Broken_Hill": TimeZone;
      static "Australia/Canberra": TimeZone;
      static "Australia/Currie": TimeZone;
      static "Australia/Darwin": TimeZone;
      static "Australia/Eucla": TimeZone;
      static "Australia/Hobart": TimeZone;
      static "Australia/LHI": TimeZone;
      static "Australia/Lindeman": TimeZone;
      static "Australia/Lord_Howe": TimeZone;
      static "Australia/Melbourne": TimeZone;
      static "Australia/NSW": TimeZone;
      static "Australia/North": TimeZone;
      static "Australia/Perth": TimeZone;
      static "Australia/Queensland": TimeZone;
      static "Australia/South": TimeZone;
      static "Australia/Sydney": TimeZone;
      static "Australia/Tasmania": TimeZone;
      static "Australia/Victoria": TimeZone;
      static "Australia/West": TimeZone;
      static "Australia/Yancowinna": TimeZone;
      static "Brazil/Acre": TimeZone;
      static "Brazil/DeNoronha": TimeZone;
      static "Brazil/East": TimeZone;
      static "Brazil/West": TimeZone;
      static CET: TimeZone;
      static CST6CDT: TimeZone;
      static "Canada/Atlantic": TimeZone;
      static "Canada/Central": TimeZone;
      static "Canada/Eastern": TimeZone;
      static "Canada/Mountain": TimeZone;
      static "Canada/Newfoundland": TimeZone;
      static "Canada/Pacific": TimeZone;
      static "Canada/Saskatchewan": TimeZone;
      static "Canada/Yukon": TimeZone;
      static "Chile/Continental": TimeZone;
      static "Chile/EasterIsland": TimeZone;
      static Cuba: TimeZone;
      static EET: TimeZone;
      static EST: TimeZone;
      static EST5EDT: TimeZone;
      static Egypt: TimeZone;
      static Eire: TimeZone;
      static "Etc/GMT": TimeZone;
      static "Etc/GMT+0": TimeZone;
      static "Etc/GMT+1": TimeZone;
      static "Etc/GMT+10": TimeZone;
      static "Etc/GMT+11": TimeZone;
      static "Etc/GMT+12": TimeZone;
      static "Etc/GMT+2": TimeZone;
      static "Etc/GMT+3": TimeZone;
      static "Etc/GMT+4": TimeZone;
      static "Etc/GMT+5": TimeZone;
      static "Etc/GMT+6": TimeZone;
      static "Etc/GMT+7": TimeZone;
      static "Etc/GMT+8": TimeZone;
      static "Etc/GMT+9": TimeZone;
      static "Etc/GMT-0": TimeZone;
      static "Etc/GMT-1": TimeZone;
      static "Etc/GMT-10": TimeZone;
      static "Etc/GMT-11": TimeZone;
      static "Etc/GMT-12": TimeZone;
      static "Etc/GMT-13": TimeZone;
      static "Etc/GMT-14": TimeZone;
      static "Etc/GMT-2": TimeZone;
      static "Etc/GMT-3": TimeZone;
      static "Etc/GMT-4": TimeZone;
      static "Etc/GMT-5": TimeZone;
      static "Etc/GMT-6": TimeZone;
      static "Etc/GMT-7": TimeZone;
      static "Etc/GMT-8": TimeZone;
      static "Etc/GMT-9": TimeZone;
      static "Etc/GMT0": TimeZone;
      static "Etc/Greenwich": TimeZone;
      static "Etc/UCT": TimeZone;
      static "Etc/UTC": TimeZone;
      static "Etc/Universal": TimeZone;
      static "Etc/Zulu": TimeZone;
      static "Europe/Amsterdam": TimeZone;
      static "Europe/Andorra": TimeZone;
      static "Europe/Astrakhan": TimeZone;
      static "Europe/Athens": TimeZone;
      static "Europe/Belfast": TimeZone;
      static "Europe/Belgrade": TimeZone;
      static "Europe/Berlin": TimeZone;
      static "Europe/Bratislava": TimeZone;
      static "Europe/Brussels": TimeZone;
      static "Europe/Bucharest": TimeZone;
      static "Europe/Budapest": TimeZone;
      static "Europe/Busingen": TimeZone;
      static "Europe/Chisinau": TimeZone;
      static "Europe/Copenhagen": TimeZone;
      static "Europe/Dublin": TimeZone;
      static "Europe/Gibraltar": TimeZone;
      static "Europe/Guernsey": TimeZone;
      static "Europe/Helsinki": TimeZone;
      static "Europe/Isle_of_Man": TimeZone;
      static "Europe/Istanbul": TimeZone;
      static "Europe/Jersey": TimeZone;
      static "Europe/Kaliningrad": TimeZone;
      static "Europe/Kiev": TimeZone;
      static "Europe/Kirov": TimeZone;
      static "Europe/Kyiv": TimeZone;
      static "Europe/Lisbon": TimeZone;
      static "Europe/Ljubljana": TimeZone;
      static "Europe/London": TimeZone;
      static "Europe/Luxembourg": TimeZone;
      static "Europe/Madrid": TimeZone;
      static "Europe/Malta": TimeZone;
      static "Europe/Mariehamn": TimeZone;
      static "Europe/Minsk": TimeZone;
      static "Europe/Monaco": TimeZone;
      static "Europe/Moscow": TimeZone;
      static "Europe/Nicosia": TimeZone;
      static "Europe/Oslo": TimeZone;
      static "Europe/Paris": TimeZone;
      static "Europe/Podgorica": TimeZone;
      static "Europe/Prague": TimeZone;
      static "Europe/Riga": TimeZone;
      static "Europe/Rome": TimeZone;
      static "Europe/Samara": TimeZone;
      static "Europe/San_Marino": TimeZone;
      static "Europe/Sarajevo": TimeZone;
      static "Europe/Saratov": TimeZone;
      static "Europe/Simferopol": TimeZone;
      static "Europe/Skopje": TimeZone;
      static "Europe/Sofia": TimeZone;
      static "Europe/Stockholm": TimeZone;
      static "Europe/Tallinn": TimeZone;
      static "Europe/Tirane": TimeZone;
      static "Europe/Tiraspol": TimeZone;
      static "Europe/Ulyanovsk": TimeZone;
      static "Europe/Uzhgorod": TimeZone;
      static "Europe/Vaduz": TimeZone;
      static "Europe/Vatican": TimeZone;
      static "Europe/Vienna": TimeZone;
      static "Europe/Vilnius": TimeZone;
      static "Europe/Volgograd": TimeZone;
      static "Europe/Warsaw": TimeZone;
      static "Europe/Zagreb": TimeZone;
      static "Europe/Zaporozhye": TimeZone;
      static "Europe/Zurich": TimeZone;
      static Factory: TimeZone;
      static GB: TimeZone;
      static "GB-Eire": TimeZone;
      static GMT: TimeZone;
      static "GMT+0": TimeZone;
      static "GMT-0": TimeZone;
      static GMT0: TimeZone;
      static Greenwich: TimeZone;
      static HST: TimeZone;
      static Hongkong: TimeZone;
      static Iceland: TimeZone;
      static "Indian/Antananarivo": TimeZone;
      static "Indian/Chagos": TimeZone;
      static "Indian/Christmas": TimeZone;
      static "Indian/Cocos": TimeZone;
      static "Indian/Comoro": TimeZone;
      static "Indian/Kerguelen": TimeZone;
      static "Indian/Mahe": TimeZone;
      static "Indian/Maldives": TimeZone;
      static "Indian/Mauritius": TimeZone;
      static "Indian/Mayotte": TimeZone;
      static "Indian/Reunion": TimeZone;
      static Iran: TimeZone;
      static Israel: TimeZone;
      static Jamaica: TimeZone;
      static Japan: TimeZone;
      static Kwajalein: TimeZone;
      static Libya: TimeZone;
      static MET: TimeZone;
      static MST: TimeZone;
      static MST7MDT: TimeZone;
      static "Mexico/BajaNorte": TimeZone;
      static "Mexico/BajaSur": TimeZone;
      static "Mexico/General": TimeZone;
      static NZ: TimeZone;
      static "NZ-CHAT": TimeZone;
      static Navajo: TimeZone;
      static PRC: TimeZone;
      static PST8PDT: TimeZone;
      static "Pacific/Apia": TimeZone;
      static "Pacific/Auckland": TimeZone;
      static "Pacific/Bougainville": TimeZone;
      static "Pacific/Chatham": TimeZone;
      static "Pacific/Chuuk": TimeZone;
      static "Pacific/Easter": TimeZone;
      static "Pacific/Efate": TimeZone;
      static "Pacific/Enderbury": TimeZone;
      static "Pacific/Fakaofo": TimeZone;
      static "Pacific/Fiji": TimeZone;
      static "Pacific/Funafuti": TimeZone;
      static "Pacific/Galapagos": TimeZone;
      static "Pacific/Gambier": TimeZone;
      static "Pacific/Guadalcanal": TimeZone;
      static "Pacific/Guam": TimeZone;
      static "Pacific/Honolulu": TimeZone;
      static "Pacific/Johnston": TimeZone;
      static "Pacific/Kanton": TimeZone;
      static "Pacific/Kiritimati": TimeZone;
      static "Pacific/Kosrae": TimeZone;
      static "Pacific/Kwajalein": TimeZone;
      static "Pacific/Majuro": TimeZone;
      static "Pacific/Marquesas": TimeZone;
      static "Pacific/Midway": TimeZone;
      static "Pacific/Nauru": TimeZone;
      static "Pacific/Niue": TimeZone;
      static "Pacific/Norfolk": TimeZone;
      static "Pacific/Noumea": TimeZone;
      static "Pacific/Pago_Pago": TimeZone;
      static "Pacific/Palau": TimeZone;
      static "Pacific/Pitcairn": TimeZone;
      static "Pacific/Pohnpei": TimeZone;
      static "Pacific/Ponape": TimeZone;
      static "Pacific/Port_Moresby": TimeZone;
      static "Pacific/Rarotonga": TimeZone;
      static "Pacific/Saipan": TimeZone;
      static "Pacific/Samoa": TimeZone;
      static "Pacific/Tahiti": TimeZone;
      static "Pacific/Tarawa": TimeZone;
      static "Pacific/Tongatapu": TimeZone;
      static "Pacific/Truk": TimeZone;
      static "Pacific/Wake": TimeZone;
      static "Pacific/Wallis": TimeZone;
      static "Pacific/Yap": TimeZone;
      static Poland: TimeZone;
      static Portugal: TimeZone;
      static ROC: TimeZone;
      static ROK: TimeZone;
      static Singapore: TimeZone;
      static Turkey: TimeZone;
      static UCT: TimeZone;
      static "US/Alaska": TimeZone;
      static "US/Aleutian": TimeZone;
      static "US/Arizona": TimeZone;
      static "US/Central": TimeZone;
      static "US/East-Indiana": TimeZone;
      static "US/Eastern": TimeZone;
      static "US/Hawaii": TimeZone;
      static "US/Indiana-Starke": TimeZone;
      static "US/Michigan": TimeZone;
      static "US/Mountain": TimeZone;
      static "US/Pacific": TimeZone;
      static "US/Samoa": TimeZone;
      static Universal: TimeZone;
      static "W-SU": TimeZone;
      static WET: TimeZone;
      static Zulu: TimeZone;
    }
    namespace TimeZone  {
      type Field = "UTC"|"Africa/Abidjan"|"Africa/Accra"|"Africa/Addis_Ababa"|"Africa/Algiers"|"Africa/Asmara"|"Africa/Asmera"|"Africa/Bamako"|"Africa/Bangui"|"Africa/Banjul"|"Africa/Bissau"|"Africa/Blantyre"|"Africa/Brazzaville"|"Africa/Bujumbura"|"Africa/Cairo"|"Africa/Casablanca"|"Africa/Ceuta"|"Africa/Conakry"|"Africa/Dakar"|"Africa/Dar_es_Salaam"|"Africa/Djibouti"|"Africa/Douala"|"Africa/El_Aaiun"|"Africa/Freetown"|"Africa/Gaborone"|"Africa/Harare"|"Africa/Johannesburg"|"Africa/Juba"|"Africa/Kampala"|"Africa/Khartoum"|"Africa/Kigali"|"Africa/Kinshasa"|"Africa/Lagos"|"Africa/Libreville"|"Africa/Lome"|"Africa/Luanda"|"Africa/Lubumbashi"|"Africa/Lusaka"|"Africa/Malabo"|"Africa/Maputo"|"Africa/Maseru"|"Africa/Mbabane"|"Africa/Mogadishu"|"Africa/Monrovia"|"Africa/Nairobi"|"Africa/Ndjamena"|"Africa/Niamey"|"Africa/Nouakchott"|"Africa/Ouagadougou"|"Africa/Porto-Novo"|"Africa/Sao_Tome"|"Africa/Timbuktu"|"Africa/Tripoli"|"Africa/Tunis"|"Africa/Windhoek"|"America/Adak"|"America/Anchorage"|"America/Anguilla"|"America/Antigua"|"America/Araguaina"|"America/Argentina/Buenos_Aires"|"America/Argentina/Catamarca"|"America/Argentina/ComodRivadavia"|"America/Argentina/Cordoba"|"America/Argentina/Jujuy"|"America/Argentina/La_Rioja"|"America/Argentina/Mendoza"|"America/Argentina/Rio_Gallegos"|"America/Argentina/Salta"|"America/Argentina/San_Juan"|"America/Argentina/San_Luis"|"America/Argentina/Tucuman"|"America/Argentina/Ushuaia"|"America/Aruba"|"America/Asuncion"|"America/Atikokan"|"America/Atka"|"America/Bahia"|"America/Bahia_Banderas"|"America/Barbados"|"America/Belem"|"America/Belize"|"America/Blanc-Sablon"|"America/Boa_Vista"|"America/Bogota"|"America/Boise"|"America/Buenos_Aires"|"America/Cambridge_Bay"|"America/Campo_Grande"|"America/Cancun"|"America/Caracas"|"America/Catamarca"|"America/Cayenne"|"America/Cayman"|"America/Chicago"|"America/Chihuahua"|"America/Ciudad_Juarez"|"America/Coral_Harbour"|"America/Cordoba"|"America/Costa_Rica"|"America/Coyhaique"|"America/Creston"|"America/Cuiaba"|"America/Curacao"|"America/Danmarkshavn"|"America/Dawson"|"America/Dawson_Creek"|"America/Denver"|"America/Detroit"|"America/Dominica"|"America/Edmonton"|"America/Eirunepe"|"America/El_Salvador"|"America/Ensenada"|"America/Fort_Nelson"|"America/Fort_Wayne"|"America/Fortaleza"|"America/Glace_Bay"|"America/Godthab"|"America/Goose_Bay"|"America/Grand_Turk"|"America/Grenada"|"America/Guadeloupe"|"America/Guatemala"|"America/Guayaquil"|"America/Guyana"|"America/Halifax"|"America/Havana"|"America/Hermosillo"|"America/Indiana/Indianapolis"|"America/Indiana/Knox"|"America/Indiana/Marengo"|"America/Indiana/Petersburg"|"America/Indiana/Tell_City"|"America/Indiana/Vevay"|"America/Indiana/Vincennes"|"America/Indiana/Winamac"|"America/Indianapolis"|"America/Inuvik"|"America/Iqaluit"|"America/Jamaica"|"America/Jujuy"|"America/Juneau"|"America/Kentucky/Louisville"|"America/Kentucky/Monticello"|"America/Knox_IN"|"America/Kralendijk"|"America/La_Paz"|"America/Lima"|"America/Los_Angeles"|"America/Louisville"|"America/Lower_Princes"|"America/Maceio"|"America/Managua"|"America/Manaus"|"America/Marigot"|"America/Martinique"|"America/Matamoros"|"America/Mazatlan"|"America/Mendoza"|"America/Menominee"|"America/Merida"|"America/Metlakatla"|"America/Mexico_City"|"America/Miquelon"|"America/Moncton"|"America/Monterrey"|"America/Montevideo"|"America/Montreal"|"America/Montserrat"|"America/Nassau"|"America/New_York"|"America/Nipigon"|"America/Nome"|"America/Noronha"|"America/North_Dakota/Beulah"|"America/North_Dakota/Center"|"America/North_Dakota/New_Salem"|"America/Nuuk"|"America/Ojinaga"|"America/Panama"|"America/Pangnirtung"|"America/Paramaribo"|"America/Phoenix"|"America/Port-au-Prince"|"America/Port_of_Spain"|"America/Porto_Acre"|"America/Porto_Velho"|"America/Puerto_Rico"|"America/Punta_Arenas"|"America/Rainy_River"|"America/Rankin_Inlet"|"America/Recife"|"America/Regina"|"America/Resolute"|"America/Rio_Branco"|"America/Rosario"|"America/Santa_Isabel"|"America/Santarem"|"America/Santiago"|"America/Santo_Domingo"|"America/Sao_Paulo"|"America/Scoresbysund"|"America/Shiprock"|"America/Sitka"|"America/St_Barthelemy"|"America/St_Johns"|"America/St_Kitts"|"America/St_Lucia"|"America/St_Thomas"|"America/St_Vincent"|"America/Swift_Current"|"America/Tegucigalpa"|"America/Thule"|"America/Thunder_Bay"|"America/Tijuana"|"America/Toronto"|"America/Tortola"|"America/Vancouver"|"America/Virgin"|"America/Whitehorse"|"America/Winnipeg"|"America/Yakutat"|"America/Yellowknife"|"Antarctica/Casey"|"Antarctica/Davis"|"Antarctica/DumontDUrville"|"Antarctica/Macquarie"|"Antarctica/Mawson"|"Antarctica/McMurdo"|"Antarctica/Palmer"|"Antarctica/Rothera"|"Antarctica/South_Pole"|"Antarctica/Syowa"|"Antarctica/Troll"|"Antarctica/Vostok"|"Arctic/Longyearbyen"|"Asia/Aden"|"Asia/Almaty"|"Asia/Amman"|"Asia/Anadyr"|"Asia/Aqtau"|"Asia/Aqtobe"|"Asia/Ashgabat"|"Asia/Ashkhabad"|"Asia/Atyrau"|"Asia/Baghdad"|"Asia/Bahrain"|"Asia/Baku"|"Asia/Bangkok"|"Asia/Barnaul"|"Asia/Beirut"|"Asia/Bishkek"|"Asia/Brunei"|"Asia/Calcutta"|"Asia/Chita"|"Asia/Choibalsan"|"Asia/Chongqing"|"Asia/Chungking"|"Asia/Colombo"|"Asia/Dacca"|"Asia/Damascus"|"Asia/Dhaka"|"Asia/Dili"|"Asia/Dubai"|"Asia/Dushanbe"|"Asia/Famagusta"|"Asia/Gaza"|"Asia/Harbin"|"Asia/Hebron"|"Asia/Ho_Chi_Minh"|"Asia/Hong_Kong"|"Asia/Hovd"|"Asia/Irkutsk"|"Asia/Istanbul"|"Asia/Jakarta"|"Asia/Jayapura"|"Asia/Jerusalem"|"Asia/Kabul"|"Asia/Kamchatka"|"Asia/Karachi"|"Asia/Kashgar"|"Asia/Kathmandu"|"Asia/Katmandu"|"Asia/Khandyga"|"Asia/Kolkata"|"Asia/Krasnoyarsk"|"Asia/Kuala_Lumpur"|"Asia/Kuching"|"Asia/Kuwait"|"Asia/Macao"|"Asia/Macau"|"Asia/Magadan"|"Asia/Makassar"|"Asia/Manila"|"Asia/Muscat"|"Asia/Nicosia"|"Asia/Novokuznetsk"|"Asia/Novosibirsk"|"Asia/Omsk"|"Asia/Oral"|"Asia/Phnom_Penh"|"Asia/Pontianak"|"Asia/Pyongyang"|"Asia/Qatar"|"Asia/Qostanay"|"Asia/Qyzylorda"|"Asia/Rangoon"|"Asia/Riyadh"|"Asia/Saigon"|"Asia/Sakhalin"|"Asia/Samarkand"|"Asia/Seoul"|"Asia/Shanghai"|"Asia/Singapore"|"Asia/Srednekolymsk"|"Asia/Taipei"|"Asia/Tashkent"|"Asia/Tbilisi"|"Asia/Tehran"|"Asia/Tel_Aviv"|"Asia/Thimbu"|"Asia/Thimphu"|"Asia/Tokyo"|"Asia/Tomsk"|"Asia/Ujung_Pandang"|"Asia/Ulaanbaatar"|"Asia/Ulan_Bator"|"Asia/Urumqi"|"Asia/Ust-Nera"|"Asia/Vientiane"|"Asia/Vladivostok"|"Asia/Yakutsk"|"Asia/Yangon"|"Asia/Yekaterinburg"|"Asia/Yerevan"|"Atlantic/Azores"|"Atlantic/Bermuda"|"Atlantic/Canary"|"Atlantic/Cape_Verde"|"Atlantic/Faeroe"|"Atlantic/Faroe"|"Atlantic/Jan_Mayen"|"Atlantic/Madeira"|"Atlantic/Reykjavik"|"Atlantic/South_Georgia"|"Atlantic/St_Helena"|"Atlantic/Stanley"|"Australia/ACT"|"Australia/Adelaide"|"Australia/Brisbane"|"Australia/Broken_Hill"|"Australia/Canberra"|"Australia/Currie"|"Australia/Darwin"|"Australia/Eucla"|"Australia/Hobart"|"Australia/LHI"|"Australia/Lindeman"|"Australia/Lord_Howe"|"Australia/Melbourne"|"Australia/NSW"|"Australia/North"|"Australia/Perth"|"Australia/Queensland"|"Australia/South"|"Australia/Sydney"|"Australia/Tasmania"|"Australia/Victoria"|"Australia/West"|"Australia/Yancowinna"|"Brazil/Acre"|"Brazil/DeNoronha"|"Brazil/East"|"Brazil/West"|"CET"|"CST6CDT"|"Canada/Atlantic"|"Canada/Central"|"Canada/Eastern"|"Canada/Mountain"|"Canada/Newfoundland"|"Canada/Pacific"|"Canada/Saskatchewan"|"Canada/Yukon"|"Chile/Continental"|"Chile/EasterIsland"|"Cuba"|"EET"|"EST"|"EST5EDT"|"Egypt"|"Eire"|"Etc/GMT"|"Etc/GMT+0"|"Etc/GMT+1"|"Etc/GMT+10"|"Etc/GMT+11"|"Etc/GMT+12"|"Etc/GMT+2"|"Etc/GMT+3"|"Etc/GMT+4"|"Etc/GMT+5"|"Etc/GMT+6"|"Etc/GMT+7"|"Etc/GMT+8"|"Etc/GMT+9"|"Etc/GMT-0"|"Etc/GMT-1"|"Etc/GMT-10"|"Etc/GMT-11"|"Etc/GMT-12"|"Etc/GMT-13"|"Etc/GMT-14"|"Etc/GMT-2"|"Etc/GMT-3"|"Etc/GMT-4"|"Etc/GMT-5"|"Etc/GMT-6"|"Etc/GMT-7"|"Etc/GMT-8"|"Etc/GMT-9"|"Etc/GMT0"|"Etc/Greenwich"|"Etc/UCT"|"Etc/UTC"|"Etc/Universal"|"Etc/Zulu"|"Europe/Amsterdam"|"Europe/Andorra"|"Europe/Astrakhan"|"Europe/Athens"|"Europe/Belfast"|"Europe/Belgrade"|"Europe/Berlin"|"Europe/Bratislava"|"Europe/Brussels"|"Europe/Bucharest"|"Europe/Budapest"|"Europe/Busingen"|"Europe/Chisinau"|"Europe/Copenhagen"|"Europe/Dublin"|"Europe/Gibraltar"|"Europe/Guernsey"|"Europe/Helsinki"|"Europe/Isle_of_Man"|"Europe/Istanbul"|"Europe/Jersey"|"Europe/Kaliningrad"|"Europe/Kiev"|"Europe/Kirov"|"Europe/Kyiv"|"Europe/Lisbon"|"Europe/Ljubljana"|"Europe/London"|"Europe/Luxembourg"|"Europe/Madrid"|"Europe/Malta"|"Europe/Mariehamn"|"Europe/Minsk"|"Europe/Monaco"|"Europe/Moscow"|"Europe/Nicosia"|"Europe/Oslo"|"Europe/Paris"|"Europe/Podgorica"|"Europe/Prague"|"Europe/Riga"|"Europe/Rome"|"Europe/Samara"|"Europe/San_Marino"|"Europe/Sarajevo"|"Europe/Saratov"|"Europe/Simferopol"|"Europe/Skopje"|"Europe/Sofia"|"Europe/Stockholm"|"Europe/Tallinn"|"Europe/Tirane"|"Europe/Tiraspol"|"Europe/Ulyanovsk"|"Europe/Uzhgorod"|"Europe/Vaduz"|"Europe/Vatican"|"Europe/Vienna"|"Europe/Vilnius"|"Europe/Volgograd"|"Europe/Warsaw"|"Europe/Zagreb"|"Europe/Zaporozhye"|"Europe/Zurich"|"Factory"|"GB"|"GB-Eire"|"GMT"|"GMT+0"|"GMT-0"|"GMT0"|"Greenwich"|"HST"|"Hongkong"|"Iceland"|"Indian/Antananarivo"|"Indian/Chagos"|"Indian/Christmas"|"Indian/Cocos"|"Indian/Comoro"|"Indian/Kerguelen"|"Indian/Mahe"|"Indian/Maldives"|"Indian/Mauritius"|"Indian/Mayotte"|"Indian/Reunion"|"Iran"|"Israel"|"Jamaica"|"Japan"|"Kwajalein"|"Libya"|"MET"|"MST"|"MST7MDT"|"Mexico/BajaNorte"|"Mexico/BajaSur"|"Mexico/General"|"NZ"|"NZ-CHAT"|"Navajo"|"PRC"|"PST8PDT"|"Pacific/Apia"|"Pacific/Auckland"|"Pacific/Bougainville"|"Pacific/Chatham"|"Pacific/Chuuk"|"Pacific/Easter"|"Pacific/Efate"|"Pacific/Enderbury"|"Pacific/Fakaofo"|"Pacific/Fiji"|"Pacific/Funafuti"|"Pacific/Galapagos"|"Pacific/Gambier"|"Pacific/Guadalcanal"|"Pacific/Guam"|"Pacific/Honolulu"|"Pacific/Johnston"|"Pacific/Kanton"|"Pacific/Kiritimati"|"Pacific/Kosrae"|"Pacific/Kwajalein"|"Pacific/Majuro"|"Pacific/Marquesas"|"Pacific/Midway"|"Pacific/Nauru"|"Pacific/Niue"|"Pacific/Norfolk"|"Pacific/Noumea"|"Pacific/Pago_Pago"|"Pacific/Palau"|"Pacific/Pitcairn"|"Pacific/Pohnpei"|"Pacific/Ponape"|"Pacific/Port_Moresby"|"Pacific/Rarotonga"|"Pacific/Saipan"|"Pacific/Samoa"|"Pacific/Tahiti"|"Pacific/Tarawa"|"Pacific/Tongatapu"|"Pacific/Truk"|"Pacific/Wake"|"Pacific/Wallis"|"Pacific/Yap"|"Poland"|"Portugal"|"ROC"|"ROK"|"Singapore"|"Turkey"|"UCT"|"US/Alaska"|"US/Aleutian"|"US/Arizona"|"US/Central"|"US/East-Indiana"|"US/Eastern"|"US/Hawaii"|"US/Indiana-Starke"|"US/Michigan"|"US/Mountain"|"US/Pacific"|"US/Samoa"|"Universal"|"W-SU"|"WET"|"Zulu";
    }

    class VectorIndex<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::VectorIndex';
      static readonly $fields: VectorIndex.$Fields;
      values: gc.core.nodeIndex<gc.core.node<gc.core.Tensor>, T> | null;
      count: number | bigint | null;
      max_level: number | bigint | null;
      entry_node_ref: gc.core.node<gc.core.VectorVertex> | null;
      rng: gc.util.Random | null;
      distance: gc.core.TensorDistance | null;
      constructor(values?: gc.core.nodeIndex<gc.core.node<gc.core.Tensor>, T> | null, count?: number | bigint | null, max_level?: number | bigint | null, entry_node_ref?: gc.core.node<gc.core.VectorVertex> | null, rng?: gc.util.Random | null, distance?: gc.core.TensorDistance | null);
      static createFrom<T>(fields: {values?: gc.core.nodeIndex<gc.core.node<gc.core.Tensor>, T> | null, count?: number | bigint | null, max_level?: number | bigint | null, entry_node_ref?: gc.core.node<gc.core.VectorVertex> | null, rng?: gc.util.Random | null, distance?: gc.core.TensorDistance | null}): VectorIndex;
    }
    namespace VectorIndex {
      interface $Fields {
        values: 0;
        count: 1;
        max_level: 2;
        entry_node_ref: 3;
        rng: 4;
        distance: 5;
      }
    }

    class GeoCircle extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoCircle';
      static readonly $fields: GeoCircle.$Fields;
      center: gc.core.geo;
      radius: number;
      constructor(center: gc.core.geo, radius: number);
      static createFrom(fields: {center: gc.core.geo, radius: number}): GeoCircle;
    }
    namespace GeoCircle {
      interface $Fields {
        center: 0;
        radius: 1;
      }
    }

  }

  namespace io {
    class S3Object extends gc.sdk.GCObject {
      static readonly _type = 'io::S3Object';
      static readonly $fields: S3Object.$Fields;
      key: string;
      last_modified: gc.core.time;
      size: number | bigint;
      etag: string;
      constructor(key: string, last_modified: gc.core.time, size: number | bigint, etag: string);
      static createFrom(fields: {key: string, last_modified: gc.core.time, size: number | bigint, etag: string}): S3Object;
    }
    namespace S3Object {
      interface $Fields {
        key: 0;
        last_modified: 1;
        size: 2;
        etag: 3;
      }
    }

    class JsonReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonReader';
      static readonly $fields: JsonReader.$Fields;
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): JsonReader;
    }
    namespace JsonReader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class GcbReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbReader';
      static readonly $fields: GcbReader.$Fields;
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): GcbReader;
    }
    namespace GcbReader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class Csv$analyze$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$analyze$args';
      static readonly $fields: Csv$analyze$args.$Fields;
      paths: globalThis.Array<string>;
      config: gc.io.CsvAnalysisConfig | null;
      constructor(paths: globalThis.Array<string>, config?: gc.io.CsvAnalysisConfig | null);
      static createFrom(fields: {paths: globalThis.Array<string>, config?: gc.io.CsvAnalysisConfig | null}): Csv$analyze$args;
    }
    namespace Csv$analyze$args {
      interface $Fields {
        paths: 0;
        config: 1;
      }
    }

    class Json<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Json';
    }

    class XmlReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::XmlReader';
      static readonly $fields: XmlReader.$Fields;
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): XmlReader;
    }
    namespace XmlReader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class FileWalker extends gc.sdk.GCObject {
      static readonly _type = 'io::FileWalker';
      static readonly $fields: FileWalker.$Fields;
      path: string;
      constructor(path: string);
      static createFrom(fields: {path: string}): FileWalker;
    }
    namespace FileWalker {
      interface $Fields {
        path: 0;
      }
    }

    class Csv$generate$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$generate$args';
      static readonly $fields: Csv$generate$args.$Fields;
      stats: gc.io.CsvStatistics;
      constructor(stats: gc.io.CsvStatistics);
      static createFrom(fields: {stats: gc.io.CsvStatistics}): Csv$generate$args;
    }
    namespace Csv$generate$args {
      interface $Fields {
        stats: 0;
      }
    }

    class HttpRequest extends gc.sdk.GCObject {
      static readonly _type = 'io::HttpRequest';
      static readonly $fields: HttpRequest.$Fields;
      method: gc.io.HttpMethod;
      url: string;
      headers: globalThis.Map<string, string> | null;
      body: string | null;
      timeout: gc.core.duration | null;
      constructor(method: gc.io.HttpMethod, url: string, headers?: globalThis.Map<string, string> | null, body?: string | null, timeout?: gc.core.duration | null);
      static createFrom(fields: {method: gc.io.HttpMethod, url: string, headers?: globalThis.Map<string, string> | null, body?: string | null, timeout?: gc.core.duration | null}): HttpRequest;
    }
    namespace HttpRequest {
      interface $Fields {
        method: 0;
        url: 1;
        headers: 2;
        body: 3;
        timeout: 4;
      }
    }

    class Csv extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv';
      /**
       * Aggregates reads into a `Table`
       *
       * By specifying `reader.pos` the reads will be made after the end of the line at that byte offset
       */
      static sample: ((reader: gc.io.CsvReader, max_lines?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.core.Table>) & {
        spawn(reader: gc.io.CsvReader, max_lines?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.core.Table>>;
      };
      /**
       * Analyses a collection of csv files to infer statistics eventually to generate types
       */
      static analyze: ((paths: globalThis.Array<string>, config?: gc.io.CsvAnalysisConfig | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.io.CsvStatistics>) & {
        spawn(paths: globalThis.Array<string>, config?: gc.io.CsvAnalysisConfig | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.io.CsvStatistics>>;
      };
      /**
       * Generates the necessary types and enums to read the records defined by this statistics
       */
      static generate: ((stats: gc.io.CsvStatistics, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<string>) & {
        spawn(stats: gc.io.CsvStatistics, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<string>>;
      };
    }

    class SmtpMode extends gc.sdk.GCEnum {
      static readonly _type = 'io::SmtpMode';
      static readonly $fields: SmtpMode[];
      key: SmtpMode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SmtpMode.Field);
      static plain: SmtpMode;
      static ssl_tls: SmtpMode;
      static starttls: SmtpMode;
    }
    namespace SmtpMode  {
      type Field = "plain"|"ssl_tls"|"starttls";
    }

    class CsvWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvWriter';
      static readonly $fields: CsvWriter.$Fields;
      path: string;
      append: boolean | null;
      format: gc.io.CsvFormat | null;
      constructor(path: string, append?: boolean | null, format?: gc.io.CsvFormat | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null, format?: gc.io.CsvFormat | null}): CsvWriter;
    }
    namespace CsvWriter {
      interface $Fields {
        path: 0;
        append: 1;
        format: 2;
      }
    }

    class Csv$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$sample$args';
      static readonly $fields: Csv$sample$args.$Fields;
      reader: gc.io.CsvReader;
      max_lines: number | bigint | null;
      constructor(reader: gc.io.CsvReader, max_lines?: number | bigint | null);
      static createFrom(fields: {reader: gc.io.CsvReader, max_lines?: number | bigint | null}): Csv$sample$args;
    }
    namespace Csv$sample$args {
      interface $Fields {
        reader: 0;
        max_lines: 1;
      }
    }

    class TextWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::TextWriter';
      static readonly $fields: TextWriter.$Fields;
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): TextWriter;
    }
    namespace TextWriter {
      interface $Fields {
        path: 0;
        append: 1;
      }
    }

    class CsvSharding extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvSharding';
      static readonly $fields: CsvSharding.$Fields;
      id: number | bigint;
      column: number | bigint;
      modulo: number | bigint;
      constructor(id: number | bigint, column: number | bigint, modulo: number | bigint);
      static createFrom(fields: {id: number | bigint, column: number | bigint, modulo: number | bigint}): CsvSharding;
    }
    namespace CsvSharding {
      interface $Fields {
        id: 0;
        column: 1;
        modulo: 2;
      }
    }

    class CsvColumnStatistics extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnStatistics';
      static readonly $fields: CsvColumnStatistics.$Fields;
      name: string | null;
      example: any | null;
      null_count: number | bigint;
      bool_count: number | bigint;
      int_count: number | bigint;
      float_count: number | bigint;
      string_count: number | bigint;
      date_count: number | bigint;
      date_format_count: globalThis.Map<string, number | bigint>;
      enumerable_count: globalThis.Map<any, number | bigint>;
      profile: gc.util.Gaussian;
      constructor(name: string | null, example: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: gc.util.Gaussian);
      static createFrom(fields: {name?: string | null, example?: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: gc.util.Gaussian}): CsvColumnStatistics;
    }
    namespace CsvColumnStatistics {
      interface $Fields {
        name: 0;
        example: 1;
        null_count: 2;
        bool_count: 3;
        int_count: 4;
        float_count: 5;
        string_count: 6;
        date_count: 7;
        date_format_count: 8;
        enumerable_count: 9;
        profile: 10;
      }
    }

    class GcbWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbWriter';
      static readonly $fields: GcbWriter.$Fields;
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): GcbWriter;
    }
    namespace GcbWriter {
      interface $Fields {
        path: 0;
        append: 1;
      }
    }

    class Url extends gc.sdk.GCObject {
      static readonly _type = 'io::Url';
      static readonly $fields: Url.$Fields;
      protocol: string | null;
      host: string | null;
      port: number | bigint | null;
      path: string | null;
      user: string | null;
      password: string | null;
      params: globalThis.Map<string, string> | null;
      hash: string | null;
      constructor(protocol?: string | null, host?: string | null, port?: number | bigint | null, path?: string | null, user?: string | null, password?: string | null, params?: globalThis.Map<string, string> | null, hash?: string | null);
      static createFrom(fields: {protocol?: string | null, host?: string | null, port?: number | bigint | null, path?: string | null, user?: string | null, password?: string | null, params?: globalThis.Map<string, string> | null, hash?: string | null}): Url;
    }
    namespace Url {
      interface $Fields {
        protocol: 0;
        host: 1;
        port: 2;
        path: 3;
        user: 4;
        password: 5;
        params: 6;
        hash: 7;
      }
    }

    class S3 extends gc.sdk.GCObject {
      static readonly _type = 'io::S3';
      static readonly $fields: S3.$Fields;
      host: string;
      region: string;
      credentials: gc.io.S3BasicCredentials;
      force_path_style: boolean | null;
      constructor(host: string, region: string, credentials: gc.io.S3BasicCredentials, force_path_style?: boolean | null);
      static createFrom(fields: {host: string, region: string, credentials: gc.io.S3BasicCredentials, force_path_style?: boolean | null}): S3;
    }
    namespace S3 {
      interface $Fields {
        host: 0;
        region: 1;
        credentials: 2;
        force_path_style: 3;
      }
    }

    class S3BasicCredentials extends gc.sdk.GCObject {
      static readonly _type = 'io::S3BasicCredentials';
      static readonly $fields: S3BasicCredentials.$Fields;
      access_key: string;
      secret_key: string;
      constructor(access_key: string, secret_key: string);
      static createFrom(fields: {access_key: string, secret_key: string}): S3BasicCredentials;
    }
    namespace S3BasicCredentials {
      interface $Fields {
        access_key: 0;
        secret_key: 1;
      }
    }

    class TextReader extends gc.sdk.GCObject {
      static readonly _type = 'io::TextReader';
      static readonly $fields: TextReader.$Fields;
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom(fields: {path: string, pos?: number | bigint | null}): TextReader;
    }
    namespace TextReader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class CsvAnalysisConfig extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvAnalysisConfig';
      static readonly $fields: CsvAnalysisConfig.$Fields;
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      row_limit: number | bigint | null;
      enumerable_limit: number | bigint | null;
      date_check_limit: number | bigint | null;
      date_formats: globalThis.Array<string> | null;
      constructor(header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, row_limit?: number | bigint | null, enumerable_limit?: number | bigint | null, date_check_limit?: number | bigint | null, date_formats?: globalThis.Array<string> | null);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, row_limit?: number | bigint | null, enumerable_limit?: number | bigint | null, date_check_limit?: number | bigint | null, date_formats?: globalThis.Array<string> | null}): CsvAnalysisConfig;
    }
    namespace CsvAnalysisConfig {
      interface $Fields {
        header_lines: 0;
        separator: 1;
        string_delimiter: 2;
        decimal_separator: 3;
        thousands_separator: 4;
        row_limit: 5;
        enumerable_limit: 6;
        date_check_limit: 7;
        date_formats: 8;
      }
    }

    class JsonWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonWriter';
      static readonly $fields: JsonWriter.$Fields;
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): JsonWriter;
    }
    namespace JsonWriter {
      interface $Fields {
        path: 0;
        append: 1;
      }
    }

    class SmtpAuth extends gc.sdk.GCEnum {
      static readonly _type = 'io::SmtpAuth';
      static readonly $fields: SmtpAuth[];
      key: SmtpAuth.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SmtpAuth.Field);
      static none: SmtpAuth;
      static plain: SmtpAuth;
      static login: SmtpAuth;
    }
    namespace SmtpAuth  {
      type Field = "none"|"plain"|"login";
    }

    class Smtp extends gc.sdk.GCObject {
      static readonly _type = 'io::Smtp';
      static readonly $fields: Smtp.$Fields;
      host: string;
      port: number | bigint;
      mode: gc.io.SmtpMode | null;
      authenticate: gc.io.SmtpAuth | null;
      user: string | null;
      pass: string | null;
      constructor(host: string, port: number | bigint, mode?: gc.io.SmtpMode | null, authenticate?: gc.io.SmtpAuth | null, user?: string | null, pass?: string | null);
      static createFrom(fields: {host: string, port: number | bigint, mode?: gc.io.SmtpMode | null, authenticate?: gc.io.SmtpAuth | null, user?: string | null, pass?: string | null}): Smtp;
    }
    namespace Smtp {
      interface $Fields {
        host: 0;
        port: 1;
        mode: 2;
        authenticate: 3;
        user: 4;
        pass: 5;
      }
    }

    class BinReader extends gc.sdk.GCObject {
      static readonly _type = 'io::BinReader';
      static readonly $fields: BinReader.$Fields;
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom(fields: {path: string, pos?: number | bigint | null}): BinReader;
    }
    namespace BinReader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class File extends gc.sdk.GCObject {
      static readonly _type = 'io::File';
      static readonly $fields: File.$Fields;
      path: string;
      size: number | bigint | null;
      last_modification: gc.core.time | null;
      constructor(path: string, size?: number | bigint | null, last_modification?: gc.core.time | null);
      static createFrom(fields: {path: string, size?: number | bigint | null, last_modification?: gc.core.time | null}): File;
    }
    namespace File {
      interface $Fields {
        path: 0;
        size: 1;
        last_modification: 2;
      }
    }

    class HttpResponse<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::HttpResponse';
      static readonly $fields: HttpResponse.$Fields;
      status_code: number | bigint;
      headers: globalThis.Map<string, string>;
      content: T | null;
      error_msg: string | null;
      constructor(status_code: number | bigint, headers: globalThis.Map<string, string>, content?: T | null, error_msg?: string | null);
      static createFrom<T>(fields: {status_code: number | bigint, headers: globalThis.Map<string, string>, content?: T | null, error_msg?: string | null}): HttpResponse;
    }
    namespace HttpResponse {
      interface $Fields {
        status_code: 0;
        headers: 1;
        content: 2;
        error_msg: 3;
      }
    }

    class CsvFormat extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat';
      static readonly $fields: CsvFormat.$Fields;
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      trim: boolean | null;
      format: string | null;
      tz: gc.core.TimeZone | null;
      strict: boolean | null;
      nearest_time: boolean | null;
      constructor(header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, trim?: boolean | null, format?: string | null, tz?: gc.core.TimeZone | null, strict?: boolean | null, nearest_time?: boolean | null);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, trim?: boolean | null, format?: string | null, tz?: gc.core.TimeZone | null, strict?: boolean | null, nearest_time?: boolean | null}): CsvFormat;
    }
    namespace CsvFormat {
      interface $Fields {
        header_lines: 0;
        separator: 1;
        string_delimiter: 2;
        decimal_separator: 3;
        thousands_separator: 4;
        trim: 5;
        format: 6;
        tz: 7;
        strict: 8;
        nearest_time: 9;
      }
    }

    class Reader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Reader';
      static readonly $fields: Reader.$Fields;
      path: string;
      pos: number | bigint | null;
    }
    namespace Reader {
      interface $Fields {
        path: 0;
        pos: 1;
      }
    }

    class Http<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Http';
    }

    class S3Bucket extends gc.sdk.GCObject {
      static readonly _type = 'io::S3Bucket';
      static readonly $fields: S3Bucket.$Fields;
      name: string;
      creation_date: gc.core.time;
      constructor(name: string, creation_date: gc.core.time);
      static createFrom(fields: {name: string, creation_date: gc.core.time}): S3Bucket;
    }
    namespace S3Bucket {
      interface $Fields {
        name: 0;
        creation_date: 1;
      }
    }

    class HttpMethod extends gc.sdk.GCEnum {
      static readonly _type = 'io::HttpMethod';
      static readonly $fields: HttpMethod[];
      key: HttpMethod.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: HttpMethod.Field);
      static GET: HttpMethod;
      static HEAD: HttpMethod;
      static POST: HttpMethod;
      static PUT: HttpMethod;
      static DELETE: HttpMethod;
      static CONNECT: HttpMethod;
      static OPTIONS: HttpMethod;
      static TRACE: HttpMethod;
      static PATCH: HttpMethod;
    }
    namespace HttpMethod  {
      type Field = "GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH";
    }

    class CsvStatistics extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvStatistics';
      static readonly $fields: CsvStatistics.$Fields;
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      columns: globalThis.Array<gc.io.CsvColumnStatistics>;
      line_count: number | bigint;
      fail_count: number | bigint;
      file_count: number | bigint;
      constructor(header_lines: number | bigint | null, separator: string | null, string_delimiter: string | null, decimal_separator: string | null, thousands_separator: string | null, columns: globalThis.Array<gc.io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns: globalThis.Array<gc.io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint}): CsvStatistics;
    }
    namespace CsvStatistics {
      interface $Fields {
        header_lines: 0;
        separator: 1;
        string_delimiter: 2;
        decimal_separator: 3;
        thousands_separator: 4;
        columns: 5;
        line_count: 6;
        fail_count: 7;
        file_count: 8;
      }
    }

    class Writer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Writer';
      static readonly $fields: Writer.$Fields;
      path: string;
      append: boolean | null;
    }
    namespace Writer {
      interface $Fields {
        path: 0;
        append: 1;
      }
    }

    class CsvReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvReader';
      static readonly $fields: CsvReader.$Fields;
      path: string;
      pos: number | bigint | null;
      format: gc.io.CsvFormat | null;
      sharding: gc.io.CsvSharding | null;
      constructor(path: string, pos?: number | bigint | null, format?: gc.io.CsvFormat | null, sharding?: gc.io.CsvSharding | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null, format?: gc.io.CsvFormat | null, sharding?: gc.io.CsvSharding | null}): CsvReader;
    }
    namespace CsvReader {
      interface $Fields {
        path: 0;
        pos: 1;
        format: 2;
        sharding: 3;
      }
    }

    class Email extends gc.sdk.GCObject {
      static readonly _type = 'io::Email';
      static readonly $fields: Email.$Fields;
      from: string;
      subject: string;
      body: string;
      body_is_html: boolean;
      to: globalThis.Array<string>;
      cc: globalThis.Array<string> | null;
      bcc: globalThis.Array<string> | null;
      constructor(from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc?: globalThis.Array<string> | null, bcc?: globalThis.Array<string> | null);
      static createFrom(fields: {from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc?: globalThis.Array<string> | null, bcc?: globalThis.Array<string> | null}): Email;
    }
    namespace Email {
      interface $Fields {
        from: 0;
        subject: 1;
        body: 2;
        body_is_html: 3;
        to: 4;
        cc: 5;
        bcc: 6;
      }
    }

  }

  namespace runtime {
    class McpClientRoots extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpClientRoots';
      static readonly $fields: McpClientRoots.$Fields;
      listChanged: boolean | null;
      constructor(listChanged?: boolean | null);
      static createFrom(fields: {listChanged?: boolean | null}): McpClientRoots;
    }
    namespace McpClientRoots {
      interface $Fields {
        listChanged: 0;
      }
    }

    class Debug$resume$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$resume$args';
      static readonly $fields: Debug$resume$args.$Fields;
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): Debug$resume$args;
    }
    namespace Debug$resume$args {
      interface $Fields {
        id: 0;
      }
    }

    class McpTasksResultParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksResultParams';
      static readonly $fields: McpTasksResultParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      taskId: string;
      constructor(_meta: globalThis.Map<string, any> | null, taskId: string);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, taskId: string}): McpTasksResultParams;
    }
    namespace McpTasksResultParams {
      interface $Fields {
        _meta: 0;
        taskId: 1;
      }
    }

    class Identity$current_id$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$current_id$args';
    }

    class FixedPeriodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::FixedPeriodicity';
      static readonly $fields: FixedPeriodicity.$Fields;
      every: gc.core.duration;
      constructor(every: gc.core.duration);
      static createFrom(fields: {every: gc.core.duration}): FixedPeriodicity;
    }
    namespace FixedPeriodicity {
      interface $Fields {
        every: 0;
      }
    }

    class McpServerCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpServerCapabilities';
      static readonly $fields: McpServerCapabilities.$Fields;
      experimental: globalThis.Map<string, globalThis.Map<string, any>> | null;
      logging: globalThis.Map<string, any> | null;
      completions: globalThis.Map<string, any> | null;
      prompts: gc.runtime.McpServerPromptsCapabilities | null;
      resources: gc.runtime.McpServerResourcesCapabilities | null;
      tools: gc.runtime.McpServerToolsCapabilities | null;
      tasks: gc.runtime.McpServerTasksCapabilities | null;
      constructor(experimental?: globalThis.Map<string, globalThis.Map<string, any>> | null, logging?: globalThis.Map<string, any> | null, completions?: globalThis.Map<string, any> | null, prompts?: gc.runtime.McpServerPromptsCapabilities | null, resources?: gc.runtime.McpServerResourcesCapabilities | null, tools?: gc.runtime.McpServerToolsCapabilities | null, tasks?: gc.runtime.McpServerTasksCapabilities | null);
      static createFrom(fields: {experimental?: globalThis.Map<string, globalThis.Map<string, any>> | null, logging?: globalThis.Map<string, any> | null, completions?: globalThis.Map<string, any> | null, prompts?: gc.runtime.McpServerPromptsCapabilities | null, resources?: gc.runtime.McpServerResourcesCapabilities | null, tools?: gc.runtime.McpServerToolsCapabilities | null, tasks?: gc.runtime.McpServerTasksCapabilities | null}): McpServerCapabilities;
    }
    namespace McpServerCapabilities {
      interface $Fields {
        experimental: 0;
        logging: 1;
        completions: 2;
        prompts: 3;
        resources: 4;
        tools: 5;
        tasks: 6;
      }
    }

    class McpTasksGetParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksGetParams';
      static readonly $fields: McpTasksGetParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      taskId: string;
      constructor(_meta: globalThis.Map<string, any> | null, taskId: string);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, taskId: string}): McpTasksGetParams;
    }
    namespace McpTasksGetParams {
      interface $Fields {
        _meta: 0;
        taskId: 1;
      }
    }

    class Runtime$root$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$root$args';
    }

    class Permission extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Permission';
      static readonly $fields: Permission.$Fields;
      name: string;
      description: string;
      constructor(name: string, description: string);
      static createFrom(fields: {name: string, description: string}): Permission;
      static all: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.Permission>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.Permission>>>;
      };
    }
    namespace Permission {
      interface $Fields {
        name: 0;
        description: 1;
      }
    }

    class OpenApi extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenApi';
      /**
       * Returns an `OpenApiV3` specification from the current program.
       * All exposed functions are exported as paths, with their parameters
       * and return types represented as schemas.
       */
      static v3: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.OpenApiV3>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.OpenApiV3>>;
      };
    }

    class Runtime$backup_full$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$backup_full$args';
    }

    class McpBaseMetadata extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpBaseMetadata';
      static readonly $fields: McpBaseMetadata.$Fields;
      name: string;
      title: string | null;
    }
    namespace McpBaseMetadata {
      interface $Fields {
        name: 0;
        title: 1;
      }
    }

    class Identity$login$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$login$args';
      static readonly $fields: Identity$login$args.$Fields;
      login: string;
      password: string;
      constructor(login: string, password: string);
      static createFrom(fields: {login: string, password: string}): Identity$login$args;
    }
    namespace Identity$login$args {
      interface $Fields {
        login: 0;
        password: 1;
      }
    }

    class ChildProcessResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::ChildProcessResult';
      static readonly $fields: ChildProcessResult.$Fields;
      code: number | bigint;
      stdout: string;
      stderr: string;
      constructor(code: number | bigint, stdout: string, stderr: string);
      static createFrom(fields: {code: number | bigint, stdout: string, stderr: string}): ChildProcessResult;
    }
    namespace ChildProcessResult {
      interface $Fields {
        code: 0;
        stdout: 1;
        stderr: 2;
      }
    }

    class McpToolsListResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpToolsListResult';
      static readonly $fields: McpToolsListResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
      tools: globalThis.Array<gc.runtime.McpTool>;
      constructor(_meta: globalThis.Map<string, any> | null, tools: globalThis.Array<gc.runtime.McpTool>);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, tools: globalThis.Array<gc.runtime.McpTool>}): McpToolsListResult;
    }
    namespace McpToolsListResult {
      interface $Fields {
        _meta: 0;
        tools: 1;
      }
    }

    class OperationObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OperationObject';
      static readonly $fields: OperationObject.$Fields;
      tags: globalThis.Array<string> | null;
      description: string | null;
      requestBody: gc.runtime.RequestBodyObject | null;
      responses: globalThis.Map<string, gc.runtime.ResponseObject> | null;
      constructor(tags?: globalThis.Array<string> | null, description?: string | null, requestBody?: gc.runtime.RequestBodyObject | null, responses?: globalThis.Map<string, gc.runtime.ResponseObject> | null);
      static createFrom(fields: {tags?: globalThis.Array<string> | null, description?: string | null, requestBody?: gc.runtime.RequestBodyObject | null, responses?: globalThis.Map<string, gc.runtime.ResponseObject> | null}): OperationObject;
    }
    namespace OperationObject {
      interface $Fields {
        tags: 0;
        description: 1;
        requestBody: 2;
        responses: 3;
      }
    }

    class Scheduler$activate$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler$activate$args';
      static readonly $fields: Scheduler$activate$args.$Fields;
      function: gc.core.function_;
      constructor(function_: gc.core.function_);
      static createFrom(fields: {function_: gc.core.function_}): Scheduler$activate$args;
    }
    namespace Scheduler$activate$args {
      interface $Fields {
        function: 0;
      }
    }

    class Scheduler$deactivate$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler$deactivate$args';
      static readonly $fields: Scheduler$deactivate$args.$Fields;
      function: gc.core.function_;
      constructor(function_: gc.core.function_);
      static createFrom(fields: {function_: gc.core.function_}): Scheduler$deactivate$args;
    }
    namespace Scheduler$deactivate$args {
      interface $Fields {
        function: 0;
      }
    }

    class McpToolsCallResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpToolsCallResult';
      static readonly $fields: McpToolsCallResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
      content: globalThis.Array<gc.runtime.McpContentBlock>;
      structuredContent: any | null;
      isError: boolean | null;
      constructor(_meta: globalThis.Map<string, any> | null, content: globalThis.Array<gc.runtime.McpContentBlock>, structuredContent?: any | null, isError?: boolean | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, content: globalThis.Array<gc.runtime.McpContentBlock>, structuredContent?: any | null, isError?: boolean | null}): McpToolsCallResult;
    }
    namespace McpToolsCallResult {
      interface $Fields {
        _meta: 0;
        content: 1;
        structuredContent: 2;
        isError: 3;
      }
    }

    class Month extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::Month';
      static readonly $fields: Month[];
      key: Month.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Month.Field);
      static Jan: Month;
      static Feb: Month;
      static Mar: Month;
      static Apr: Month;
      static May: Month;
      static Jun: Month;
      static Jul: Month;
      static Aug: Month;
      static Sep: Month;
      static Oct: Month;
      static Nov: Month;
      static Dec: Month;
    }
    namespace Month  {
      type Field = "Jan"|"Feb"|"Mar"|"Apr"|"May"|"Jun"|"Jul"|"Aug"|"Sep"|"Oct"|"Nov"|"Dec";
    }

    class McpTaskStatus extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::McpTaskStatus';
      static readonly $fields: McpTaskStatus[];
      key: McpTaskStatus.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: McpTaskStatus.Field);
      static working: McpTaskStatus;
      static input_required: McpTaskStatus;
      static completed: McpTaskStatus;
      static failed: McpTaskStatus;
      static cancelled: McpTaskStatus;
    }
    namespace McpTaskStatus  {
      type Field = "working"|"input_required"|"completed"|"failed"|"cancelled";
    }

    class ZoneUsage extends gc.sdk.GCObject {
      static readonly _type = 'runtime::ZoneUsage';
      static readonly $fields: ZoneUsage.$Fields;
      size: number | bigint;
      committed_blocks: number | bigint;
      reserved_blocks: number | bigint;
      blocks: number | bigint;
      cache: number | bigint;
      constructor(size: number | bigint, committed_blocks: number | bigint, reserved_blocks: number | bigint, blocks: number | bigint, cache: number | bigint);
      static createFrom(fields: {size: number | bigint, committed_blocks: number | bigint, reserved_blocks: number | bigint, blocks: number | bigint, cache: number | bigint}): ZoneUsage;
    }
    namespace ZoneUsage {
      interface $Fields {
        size: 0;
        committed_blocks: 1;
        reserved_blocks: 2;
        blocks: 3;
        cache: 4;
      }
    }

    class RequestBodyObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::RequestBodyObject';
      static readonly $fields: RequestBodyObject.$Fields;
      content: globalThis.Map<string, gc.runtime.MediaTypeObject>;
      required: boolean | null;
      constructor(content: globalThis.Map<string, gc.runtime.MediaTypeObject>, required?: boolean | null);
      static createFrom(fields: {content: globalThis.Map<string, gc.runtime.MediaTypeObject>, required?: boolean | null}): RequestBodyObject;
    }
    namespace RequestBodyObject {
      interface $Fields {
        content: 0;
        required: 1;
      }
    }

    class McpToolExecution extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpToolExecution';
      static readonly $fields: McpToolExecution.$Fields;
      taskSupport: gc.runtime.McpTaskSupport | null;
      constructor(taskSupport?: gc.runtime.McpTaskSupport | null);
      static createFrom(fields: {taskSupport?: gc.runtime.McpTaskSupport | null}): McpToolExecution;
    }
    namespace McpToolExecution {
      interface $Fields {
        taskSupport: 0;
      }
    }

    class McpClientCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpClientCapabilities';
      static readonly $fields: McpClientCapabilities.$Fields;
      experimental: globalThis.Map<string, any> | null;
      roots: gc.runtime.McpClientRoots | null;
      sampling: globalThis.Map<string, any> | null;
      elicitation: globalThis.Map<string, any> | null;
      tasks: gc.runtime.McpClientTasksCapabilities | null;
      constructor(experimental?: globalThis.Map<string, any> | null, roots?: gc.runtime.McpClientRoots | null, sampling?: globalThis.Map<string, any> | null, elicitation?: globalThis.Map<string, any> | null, tasks?: gc.runtime.McpClientTasksCapabilities | null);
      static createFrom(fields: {experimental?: globalThis.Map<string, any> | null, roots?: gc.runtime.McpClientRoots | null, sampling?: globalThis.Map<string, any> | null, elicitation?: globalThis.Map<string, any> | null, tasks?: gc.runtime.McpClientTasksCapabilities | null}): McpClientCapabilities;
    }
    namespace McpClientCapabilities {
      interface $Fields {
        experimental: 0;
        roots: 1;
        sampling: 2;
        elicitation: 3;
        tasks: 4;
      }
    }

    class Scheduler extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler';
      /**
       * Tries to find a task that matches `function` and deactivates it.
       *
       * Deactivating a task prevents it from being executed, but keeps the task configuration
       * in the scheduler. The task can be reactivated later with `activate()`.
       *
       * Returns `true` if a matching task was found and deactivated, `false` otherwise.
       */
      static deactivate: ((function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<boolean>) & {
        spawn(function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<boolean>>;
      };
      /**
       * Tries to find a task that matches `function` and activates it.
       *
       * Activating a task means it will be eligible for execution according to its periodicity.
       * If the task was previously deactivated, it will resume from its next scheduled time.
       *
       * Returns `true` if a matching task was found and activated, `false` otherwise.
       */
      static activate: ((function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<boolean>) & {
        spawn(function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<boolean>>;
      };
      /**
       * Looks for a task that matches the given `function`.
       *
       * Returns `null` if no matching task is found.
       * Uses function pointer equality for matching.
       */
      static find: ((function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.PeriodicTask | null>) & {
        spawn(function_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.PeriodicTask | null>>;
      };
      /**
       * Returns the current list of all scheduled tasks.
       *
       * The returned array includes both active and inactive tasks.
       * Use `PeriodicTask.is_active` to check individual task status.
       */
      static list: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.PeriodicTask>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.PeriodicTask>>>;
      };
      /**
       * Schedules a function to be executed as a task periodically.
       *
       * If a task with the same `function` already exists, it will be replaced with the new
       * configuration. The scheduler uses function pointer equality for task identification.
       *
       * Examples:
       * ```gcl
       * // Schedule a backup every day at 2 AM
       * Scheduler::add(
       *     backup_database,
       *     DailyPeriodicity { hour: 2 },
       *     null,
       * );
       *
       * // Schedule health checks every 5 minutes, starting in 1 hour
       * Scheduler::add(
       *     health_check,
       *     FixedPeriodicity { every: 5min },
       *     PeriodicOptions {
       *         start: time::now() + 1hour,
       *         max_duration: 30s
       *     }
       * );
       * ```
       */
      static add: ((function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options?: gc.runtime.PeriodicOptions | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn(function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options?: gc.runtime.PeriodicOptions | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
    }

    class YearlyPeriodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::YearlyPeriodicity';
      static readonly $fields: YearlyPeriodicity.$Fields;
      dates: globalThis.Array<gc.runtime.DateTuple>;
      timezone: gc.core.TimeZone | null;
      constructor(dates: globalThis.Array<gc.runtime.DateTuple>, timezone?: gc.core.TimeZone | null);
      static createFrom(fields: {dates: globalThis.Array<gc.runtime.DateTuple>, timezone?: gc.core.TimeZone | null}): YearlyPeriodicity;
    }
    namespace YearlyPeriodicity {
      interface $Fields {
        dates: 0;
        timezone: 1;
      }
    }

    class Permission$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Permission$all$args';
    }

    class Identity$create$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$create$args';
      static readonly $fields: Identity$create$args.$Fields;
      name: string;
      role: string;
      constructor(name: string, role: string);
      static createFrom(fields: {name: string, role: string}): Identity$create$args;
    }
    namespace Identity$create$args {
      interface $Fields {
        name: 0;
        role: 1;
      }
    }

    class Role$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Role$all$args';
    }

    class OpenApiV3 extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenApiV3';
      static readonly $fields: OpenApiV3.$Fields;
      openapi: gc.runtime.OpenApiVersion;
      info: gc.runtime.InfoObject;
      paths: globalThis.Map<string, gc.runtime.PathItemObject> | null;
      components: gc.runtime.ComponentsObject | null;
      constructor(openapi: gc.runtime.OpenApiVersion, info: gc.runtime.InfoObject, paths?: globalThis.Map<string, gc.runtime.PathItemObject> | null, components?: gc.runtime.ComponentsObject | null);
      static createFrom(fields: {openapi: gc.runtime.OpenApiVersion, info: gc.runtime.InfoObject, paths?: globalThis.Map<string, gc.runtime.PathItemObject> | null, components?: gc.runtime.ComponentsObject | null}): OpenApiV3;
    }
    namespace OpenApiV3 {
      interface $Fields {
        openapi: 0;
        info: 1;
        paths: 2;
        components: 3;
      }
    }

    class McpTextContent extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTextContent';
      static readonly $fields: McpTextContent.$Fields;
      type: gc.runtime.McpContentType;
      _meta: globalThis.Map<string, any> | null;
      annotations: gc.runtime.McpAnnotations | null;
      text: string;
      constructor(type: gc.runtime.McpContentType, _meta: globalThis.Map<string, any> | null, annotations: gc.runtime.McpAnnotations | null, text: string);
      static createFrom(fields: {type: gc.runtime.McpContentType, _meta?: globalThis.Map<string, any> | null, annotations?: gc.runtime.McpAnnotations | null, text: string}): McpTextContent;
    }
    namespace McpTextContent {
      interface $Fields {
        type: 0;
        _meta: 1;
        annotations: 2;
        text: 3;
      }
    }

    class McpTask extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTask';
      static readonly $fields: McpTask.$Fields;
      taskId: string;
      status: gc.runtime.McpTaskStatus;
      statusMessage: string | null;
      createdAt: gc.core.time;
      lastUpdatedAt: gc.core.time;
      ttl: gc.core.duration | null;
      pollInterval: gc.core.duration | null;
      constructor(taskId: string, status: gc.runtime.McpTaskStatus, statusMessage: string | null, createdAt: gc.core.time, lastUpdatedAt: gc.core.time, ttl?: gc.core.duration | null, pollInterval?: gc.core.duration | null);
      static createFrom(fields: {taskId: string, status: gc.runtime.McpTaskStatus, statusMessage?: string | null, createdAt: gc.core.time, lastUpdatedAt: gc.core.time, ttl?: gc.core.duration | null, pollInterval?: gc.core.duration | null}): McpTask;
    }
    namespace McpTask {
      interface $Fields {
        taskId: 0;
        status: 1;
        statusMessage: 2;
        createdAt: 3;
        lastUpdatedAt: 4;
        ttl: 5;
        pollInterval: 6;
      }
    }

    class McpAnnotations extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpAnnotations';
      static readonly $fields: McpAnnotations.$Fields;
      audience: globalThis.Array<gc.runtime.McpRole> | null;
      priority: gc.runtime.McpPriority | null;
      lastModified: string | null;
      constructor(audience?: globalThis.Array<gc.runtime.McpRole> | null, priority?: gc.runtime.McpPriority | null, lastModified?: string | null);
      static createFrom(fields: {audience?: globalThis.Array<gc.runtime.McpRole> | null, priority?: gc.runtime.McpPriority | null, lastModified?: string | null}): McpAnnotations;
    }
    namespace McpAnnotations {
      interface $Fields {
        audience: 0;
        priority: 1;
        lastModified: 2;
      }
    }

    class Periodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Periodicity';
    }

    class RuntimeUsage extends gc.sdk.GCObject {
      static readonly _type = 'runtime::RuntimeUsage';
      static readonly $fields: RuntimeUsage.$Fields;
      os_total_bytes: number | bigint;
      os_used_bytes: number | bigint;
      proc_virt_bytes: number | bigint;
      proc_res_bytes: number | bigint;
      proc_shr_bytes: number | bigint;
      global_memory: number | bigint;
      memory_drift: number | bigint;
      workers: globalThis.Array<gc.runtime.WorkerUsage>;
      zones: globalThis.Array<gc.runtime.ZoneUsage>;
      constructor(os_total_bytes: number | bigint, os_used_bytes: number | bigint, proc_virt_bytes: number | bigint, proc_res_bytes: number | bigint, proc_shr_bytes: number | bigint, global_memory: number | bigint, memory_drift: number | bigint, workers: globalThis.Array<gc.runtime.WorkerUsage>, zones: globalThis.Array<gc.runtime.ZoneUsage>);
      static createFrom(fields: {os_total_bytes: number | bigint, os_used_bytes: number | bigint, proc_virt_bytes: number | bigint, proc_res_bytes: number | bigint, proc_shr_bytes: number | bigint, global_memory: number | bigint, memory_drift: number | bigint, workers: globalThis.Array<gc.runtime.WorkerUsage>, zones: globalThis.Array<gc.runtime.ZoneUsage>}): RuntimeUsage;
    }
    namespace RuntimeUsage {
      interface $Fields {
        os_total_bytes: 0;
        os_used_bytes: 1;
        proc_virt_bytes: 2;
        proc_res_bytes: 3;
        proc_shr_bytes: 4;
        global_memory: 5;
        memory_drift: 6;
        workers: 7;
        zones: 8;
      }
    }

    class McpImplementation extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpImplementation';
      static readonly $fields: McpImplementation.$Fields;
      name: string;
      title: string | null;
      version: string;
      constructor(name: string, title: string | null, version: string);
      static createFrom(fields: {name: string, title?: string | null, version: string}): McpImplementation;
    }
    namespace McpImplementation {
      interface $Fields {
        name: 0;
        title: 1;
        version: 2;
      }
    }

    class McpAudioContent extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpAudioContent';
      static readonly $fields: McpAudioContent.$Fields;
      type: gc.runtime.McpContentType;
      _meta: globalThis.Map<string, any> | null;
      annotations: gc.runtime.McpAnnotations | null;
      data: string;
      mimeType: string;
      constructor(type: gc.runtime.McpContentType, _meta: globalThis.Map<string, any> | null, annotations: gc.runtime.McpAnnotations | null, data: string, mimeType: string);
      static createFrom(fields: {type: gc.runtime.McpContentType, _meta?: globalThis.Map<string, any> | null, annotations?: gc.runtime.McpAnnotations | null, data: string, mimeType: string}): McpAudioContent;
    }
    namespace McpAudioContent {
      interface $Fields {
        type: 0;
        _meta: 1;
        annotations: 2;
        data: 3;
        mimeType: 4;
      }
    }

    class Scheduler$list$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler$list$args';
    }

    class Scheduler$add$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler$add$args';
      static readonly $fields: Scheduler$add$args.$Fields;
      function: gc.core.function_;
      periodicity: gc.runtime.Periodicity;
      options: gc.runtime.PeriodicOptions | null;
      constructor(function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options?: gc.runtime.PeriodicOptions | null);
      static createFrom(fields: {function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options?: gc.runtime.PeriodicOptions | null}): Scheduler$add$args;
    }
    namespace Scheduler$add$args {
      interface $Fields {
        function: 0;
        periodicity: 1;
        options: 2;
      }
    }

    class Log extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Log';
      static readonly $fields: Log.$Fields;
      level: gc.runtime.LogLevel;
      time: gc.core.time;
      user_id: number | bigint | null;
      id: number | bigint | null;
      id2: number | bigint | null;
      src: gc.core.function_ | null;
      data: any | null;
      constructor(level: gc.runtime.LogLevel, time: gc.core.time, user_id?: number | bigint | null, id?: number | bigint | null, id2?: number | bigint | null, src?: gc.core.function_ | null, data?: any | null);
      static createFrom(fields: {level: gc.runtime.LogLevel, time: gc.core.time, user_id?: number | bigint | null, id?: number | bigint | null, id2?: number | bigint | null, src?: gc.core.function_ | null, data?: any | null}): Log;
    }
    namespace Log {
      interface $Fields {
        level: 0;
        time: 1;
        user_id: 2;
        id: 3;
        id2: 4;
        src: 5;
        data: 6;
      }
    }

    class LicenseType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::LicenseType';
      static readonly $fields: LicenseType[];
      key: LicenseType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: LicenseType.Field);
      static community: LicenseType;
      static enterprise: LicenseType;
      static testing: LicenseType;
    }
    namespace LicenseType  {
      type Field = "community"|"enterprise"|"testing";
    }

    class McpServerResourcesCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpServerResourcesCapabilities';
      static readonly $fields: McpServerResourcesCapabilities.$Fields;
      subscribe: boolean | null;
      listChanged: boolean | null;
      constructor(subscribe?: boolean | null, listChanged?: boolean | null);
      static createFrom(fields: {subscribe?: boolean | null, listChanged?: boolean | null}): McpServerResourcesCapabilities;
    }
    namespace McpServerResourcesCapabilities {
      interface $Fields {
        subscribe: 0;
        listChanged: 1;
      }
    }

    class McpInitializeResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpInitializeResult';
      static readonly $fields: McpInitializeResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
      protocolVersion: string;
      capabilities: gc.runtime.McpServerCapabilities;
      serverInfo: gc.runtime.McpImplementation;
      instructions: string | null;
      constructor(_meta: globalThis.Map<string, any> | null, protocolVersion: string, capabilities: gc.runtime.McpServerCapabilities, serverInfo: gc.runtime.McpImplementation, instructions?: string | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, protocolVersion: string, capabilities: gc.runtime.McpServerCapabilities, serverInfo: gc.runtime.McpImplementation, instructions?: string | null}): McpInitializeResult;
    }
    namespace McpInitializeResult {
      interface $Fields {
        _meta: 0;
        protocolVersion: 1;
        capabilities: 2;
        serverInfo: 3;
        instructions: 4;
      }
    }

    class McpTool extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTool';
      static readonly $fields: McpTool.$Fields;
      name: string;
      title: string | null;
      description: string | null;
      inputSchema: gc.runtime.SchemaObject;
      outputSchema: gc.runtime.SchemaObject | null;
      annotations: globalThis.Map<string, any> | null;
      execution: gc.runtime.McpToolExecution | null;
      constructor(name: string, title: string | null, description: string | null, inputSchema: gc.runtime.SchemaObject, outputSchema?: gc.runtime.SchemaObject | null, annotations?: globalThis.Map<string, any> | null, execution?: gc.runtime.McpToolExecution | null);
      static createFrom(fields: {name: string, title?: string | null, description?: string | null, inputSchema: gc.runtime.SchemaObject, outputSchema?: gc.runtime.SchemaObject | null, annotations?: globalThis.Map<string, any> | null, execution?: gc.runtime.McpToolExecution | null}): McpTool;
    }
    namespace McpTool {
      interface $Fields {
        name: 0;
        title: 1;
        description: 2;
        inputSchema: 3;
        outputSchema: 4;
        annotations: 5;
        execution: 6;
      }
    }

    class Identity$current$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$current$args';
    }

    class IdentityGrantType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::IdentityGrantType';
      static readonly $fields: IdentityGrantType[];
      key: IdentityGrantType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: IdentityGrantType.Field);
      static read: IdentityGrantType;
      static write: IdentityGrantType;
      static read_write: IdentityGrantType;
      static none: IdentityGrantType;
    }
    namespace IdentityGrantType  {
      type Field = "read"|"write"|"read_write"|"none";
    }

    class Identity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity';
      static readonly $fields: Identity.$Fields;
      id: number | bigint;
      name: string;
      role: string;
      grants: globalThis.Array<gc.runtime.IdentityGrant>;
      constructor(id: number | bigint, name: string, role: string, grants: globalThis.Array<gc.runtime.IdentityGrant>);
      static createFrom(fields: {id: number | bigint, name: string, role: string, grants: globalThis.Array<gc.runtime.IdentityGrant>}): Identity;
      static set_grants: ((name: string, grants: globalThis.Array<gc.runtime.IdentityGrant>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn(name: string, grants: globalThis.Array<gc.runtime.IdentityGrant>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
      /**
       * Sets the password for the user named `login`. Returns `false` if
       * no such user exists; throws if the caller is not authorized.
       *
       * A non-admin caller may only update their own password; admins may
       * update any user.
       */
      static set_password: ((name: string, pass: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<boolean>) & {
        spawn(name: string, pass: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<boolean>>;
      };
      /**
       * Returns the permission names granted to the calling user (e.g.
       * `["api", "files"]`). Returns `["public"]` for anonymous callers by default.
       */
      static permissions: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<string>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<string>>>;
      };
      /**
       * Clears the session cookie for the current connection.
       */
      static logout: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
      /**
       * Authenticates a user with `login`/`password` credentials and
       * returns a session token. Throws on bad credentials.
       *
       * The HTTP response also sets a `Set-Cookie: greycat=<TOKEN>` header.
       * Subsequent requests can authenticate either via:
       * - cookie: `Cookie: greycat=<TOKEN>`
       * - header: `Authorization: <TOKEN>` _(no `Bearer` prefix)_
       */
      static login: ((login: string, password: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<string>) & {
        spawn(login: string, password: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<string>>;
      };
      /**
       * Issues a session token for the user with the given `id`.
       *
       * `ttl` controls how long the token remains valid; if `null`, the
       * server's `default_validity_duration` is used.
       *
       * Throws if the user id does not exist.
       */
      static token: ((id: number | bigint, ttl?: gc.core.duration | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<string>) & {
        spawn(id: number | bigint, ttl?: gc.core.duration | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<string>>;
      };
      /**
       * Creates a new identity with the given `name` and `role` and returns
       * it. If an identity with that name already exists, the existing one
       * is returned unchanged (the role is not updated).
       */
      static create: ((name: string, role: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.Identity>) & {
        spawn(name: string, role: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.Identity>>;
      };
      /**
       * Returns every identity currently registered on the server.
       */
      static all: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.Identity>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.Identity>>>;
      };
      /**
       * Looks up an identity by its login name. Returns `null` if no
       * identity with that name exists.
       */
      static get_by_name: ((name: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.Identity | null>) & {
        spawn(name: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.Identity | null>>;
      };
      /**
       * Looks up an identity by its numeric id. Returns `null` if no
       * identity with that id exists.
       */
      static get_by_id: ((id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.Identity | null>) & {
        spawn(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.Identity | null>>;
      };
      /**
       * Returns the full `Identity` of the calling user.
       *
       * Requires authentication; anonymous callers receive a 403. Use
       * `current_id` for a public, lock-free check of the calling id.
       */
      static current: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.Identity>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.Identity>>;
      };
      /**
       * Returns the id of the calling user, or `0` if the caller is
       * unauthenticated.
       *
       * Cheap: does not touch the user database.
       */
      static current_id: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<number | bigint>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<number | bigint>>;
      };
    }
    namespace Identity {
      interface $Fields {
        id: 0;
        name: 1;
        role: 2;
        grants: 3;
      }
    }

    class Debug extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug';
      static readonly $fields: Debug.$Fields;
      id: number | bigint;
      frames: globalThis.Array<gc.runtime.Frame>;
      root: any;
      constructor(id: number | bigint, frames: globalThis.Array<gc.runtime.Frame>, root: any);
      static createFrom(fields: {id: number | bigint, frames: globalThis.Array<gc.runtime.Frame>, root: any}): Debug;
      static resume: ((id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
      static get: ((id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.Debug>) & {
        spawn(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.Debug>>;
      };
      static all: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<number | bigint>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<number | bigint>>>;
      };
    }
    namespace Debug {
      interface $Fields {
        id: 0;
        frames: 1;
        root: 2;
      }
    }

    class DayOfWeek extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::DayOfWeek';
      static readonly $fields: DayOfWeek[];
      key: DayOfWeek.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: DayOfWeek.Field);
      static Mon: DayOfWeek;
      static Tue: DayOfWeek;
      static Wed: DayOfWeek;
      static Thu: DayOfWeek;
      static Fri: DayOfWeek;
      static Sat: DayOfWeek;
      static Sun: DayOfWeek;
    }
    namespace DayOfWeek  {
      type Field = "Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"|"Sun";
    }

    class HeaderObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::HeaderObject';
      static readonly $fields: HeaderObject.$Fields;
      description: string | null;
      required: boolean | null;
      constructor(description?: string | null, required?: boolean | null);
      static createFrom(fields: {description?: string | null, required?: boolean | null}): HeaderObject;
    }
    namespace HeaderObject {
      interface $Fields {
        description: 0;
        required: 1;
      }
    }

    class Frame extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Frame';
      static readonly $fields: Frame.$Fields;
      module: string | null;
      type: string | null;
      function: string | null;
      src: string | null;
      line: number | bigint;
      column: number | bigint;
      scope: globalThis.Array<gc.runtime.Variable>;
      constructor(module: string | null, type: string | null, function_: string | null, src: string | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.Variable>);
      static createFrom(fields: {module?: string | null, type?: string | null, function_?: string | null, src?: string | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.Variable>}): Frame;
    }
    namespace Frame {
      interface $Fields {
        module: 0;
        type: 1;
        function: 2;
        src: 3;
        line: 4;
        column: 5;
        scope: 6;
      }
    }

    class Runtime$abi$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$abi$args';
    }

    class Identity$set_password$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$set_password$args';
      static readonly $fields: Identity$set_password$args.$Fields;
      name: string;
      pass: string;
      constructor(name: string, pass: string);
      static createFrom(fields: {name: string, pass: string}): Identity$set_password$args;
    }
    namespace Identity$set_password$args {
      interface $Fields {
        name: 0;
        pass: 1;
      }
    }

    class mcp_initialize$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_initialize$args';
      static readonly $fields: mcp_initialize$args.$Fields;
      params: gc.runtime.McpInitializeParams;
      constructor(params: gc.runtime.McpInitializeParams);
      static createFrom(fields: {params: gc.runtime.McpInitializeParams}): mcp_initialize$args;
    }
    namespace mcp_initialize$args {
      interface $Fields {
        params: 0;
      }
    }

    class McpTasksCreateResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksCreateResult';
      static readonly $fields: McpTasksCreateResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
      task: gc.runtime.McpTask;
      constructor(_meta: globalThis.Map<string, any> | null, task: gc.runtime.McpTask);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, task: gc.runtime.McpTask}): McpTasksCreateResult;
    }
    namespace McpTasksCreateResult {
      interface $Fields {
        _meta: 0;
        task: 1;
      }
    }

    class ChildProcess extends gc.sdk.GCObject {
      static readonly _type = 'runtime::ChildProcess';
      static readonly $fields: ChildProcess.$Fields;
      pid: number | bigint;
      constructor(pid: number | bigint);
      static createFrom(fields: {pid: number | bigint}): ChildProcess;
    }
    namespace ChildProcess {
      interface $Fields {
        pid: 0;
      }
    }

    class License extends gc.sdk.GCObject {
      static readonly _type = 'runtime::License';
      static readonly $fields: License.$Fields;
      name: string | null;
      start: gc.core.time;
      end: gc.core.time;
      company: string | null;
      max_memory: number | bigint;
      extra_1: number | bigint | null;
      extra_2: number | bigint | null;
      type: gc.runtime.LicenseType | null;
      constructor(name: string | null, start: gc.core.time, end: gc.core.time, company: string | null, max_memory: number | bigint, extra_1?: number | bigint | null, extra_2?: number | bigint | null, type?: gc.runtime.LicenseType | null);
      static createFrom(fields: {name?: string | null, start: gc.core.time, end: gc.core.time, company?: string | null, max_memory: number | bigint, extra_1?: number | bigint | null, extra_2?: number | bigint | null, type?: gc.runtime.LicenseType | null}): License;
    }
    namespace License {
      interface $Fields {
        name: 0;
        start: 1;
        end: 2;
        company: 3;
        max_memory: 4;
        extra_1: 5;
        extra_2: 6;
        type: 7;
      }
    }

    class Identity$permissions$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$permissions$args';
    }

    class Role extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Role';
      static readonly $fields: Role.$Fields;
      name: string;
      permissions: globalThis.Array<string>;
      constructor(name: string, permissions: globalThis.Array<string>);
      static createFrom(fields: {name: string, permissions: globalThis.Array<string>}): Role;
      static all: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.Role>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.Role>>>;
      };
    }
    namespace Role {
      interface $Fields {
        name: 0;
        permissions: 1;
      }
    }

    class McpInitializeParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpInitializeParams';
      static readonly $fields: McpInitializeParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      protocolVersion: string;
      capabilities: gc.runtime.McpClientCapabilities;
      clientInfo: gc.runtime.McpImplementation;
      constructor(_meta: globalThis.Map<string, any> | null, protocolVersion: string, capabilities: gc.runtime.McpClientCapabilities, clientInfo: gc.runtime.McpImplementation);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, protocolVersion: string, capabilities: gc.runtime.McpClientCapabilities, clientInfo: gc.runtime.McpImplementation}): McpInitializeParams;
    }
    namespace McpInitializeParams {
      interface $Fields {
        _meta: 0;
        protocolVersion: 1;
        capabilities: 2;
        clientInfo: 3;
      }
    }

    class Identity$get_by_id$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$get_by_id$args';
      static readonly $fields: Identity$get_by_id$args.$Fields;
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): Identity$get_by_id$args;
    }
    namespace Identity$get_by_id$args {
      interface $Fields {
        id: 0;
      }
    }

    class SchemaType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::SchemaType';
      static readonly $fields: SchemaType[];
      key: SchemaType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SchemaType.Field);
      static string: SchemaType;
      static number: SchemaType;
      static integer: SchemaType;
      static boolean: SchemaType;
      static object: SchemaType;
      static array: SchemaType;
      static null: SchemaType;
    }
    namespace SchemaType  {
      type Field = "string"|"number"|"integer"|"boolean"|"object"|"array"|"null";
    }

    class mcp_tools_list$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tools_list$args';
      static readonly $fields: mcp_tools_list$args.$Fields;
      params: gc.runtime.McpToolsListParams | null;
      constructor(params?: gc.runtime.McpToolsListParams | null);
      static createFrom(fields: {params?: gc.runtime.McpToolsListParams | null}): mcp_tools_list$args;
    }
    namespace mcp_tools_list$args {
      interface $Fields {
        params: 0;
      }
    }

    class Runtime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$info$args';
    }

    class WeeklyPeriodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::WeeklyPeriodicity';
      static readonly $fields: WeeklyPeriodicity.$Fields;
      days: globalThis.Array<gc.runtime.DayOfWeek>;
      daily: gc.runtime.DailyPeriodicity | null;
      constructor(days: globalThis.Array<gc.runtime.DayOfWeek>, daily?: gc.runtime.DailyPeriodicity | null);
      static createFrom(fields: {days: globalThis.Array<gc.runtime.DayOfWeek>, daily?: gc.runtime.DailyPeriodicity | null}): WeeklyPeriodicity;
    }
    namespace WeeklyPeriodicity {
      interface $Fields {
        days: 0;
        daily: 1;
      }
    }

    class WorkerUsage extends gc.sdk.GCObject {
      static readonly _type = 'runtime::WorkerUsage';
      static readonly $fields: WorkerUsage.$Fields;
      memory: number | bigint;
      cache: number | bigint;
      writes: number | bigint;
      reads: number | bigint;
      constructor(memory: number | bigint, cache: number | bigint, writes: number | bigint, reads: number | bigint);
      static createFrom(fields: {memory: number | bigint, cache: number | bigint, writes: number | bigint, reads: number | bigint}): WorkerUsage;
    }
    namespace WorkerUsage {
      interface $Fields {
        memory: 0;
        cache: 1;
        writes: 2;
        reads: 3;
      }
    }

    class ResponseCode extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::ResponseCode';
      static readonly $fields: ResponseCode[];
      key: ResponseCode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: ResponseCode.Field);
      static "200": ResponseCode;
      static "400": ResponseCode;
      static "404": ResponseCode;
    }
    namespace ResponseCode  {
      type Field = "200"|"400"|"404";
    }

    class TaskStatus extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::TaskStatus';
      static readonly $fields: TaskStatus[];
      key: TaskStatus.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TaskStatus.Field);
      static empty: TaskStatus;
      static waiting: TaskStatus;
      static running: TaskStatus;
      static await: TaskStatus;
      static cancelled: TaskStatus;
      static error: TaskStatus;
      static ended: TaskStatus;
      static ended_with_errors: TaskStatus;
      static breakpoint: TaskStatus;
    }
    namespace TaskStatus  {
      type Field = "empty"|"waiting"|"running"|"await"|"cancelled"|"error"|"ended"|"ended_with_errors"|"breakpoint";
    }

    class Identity$get_by_name$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$get_by_name$args';
      static readonly $fields: Identity$get_by_name$args.$Fields;
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): Identity$get_by_name$args;
    }
    namespace Identity$get_by_name$args {
      interface $Fields {
        name: 0;
      }
    }

    class InfoObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::InfoObject';
      static readonly $fields: InfoObject.$Fields;
      title: string;
      version: string;
      constructor(title: string, version: string);
      static createFrom(fields: {title: string, version: string}): InfoObject;
    }
    namespace InfoObject {
      interface $Fields {
        title: 0;
        version: 1;
      }
    }

    class McpTasksListParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksListParams';
      static readonly $fields: McpTasksListParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      cursor: string | null;
      constructor(_meta?: globalThis.Map<string, any> | null, cursor?: string | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, cursor?: string | null}): McpTasksListParams;
    }
    namespace McpTasksListParams {
      interface $Fields {
        _meta: 0;
        cursor: 1;
      }
    }

    class McpResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpResult';
      static readonly $fields: McpResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
    }
    namespace McpResult {
      interface $Fields {
        _meta: 0;
      }
    }

    class McpToolsListParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpToolsListParams';
      static readonly $fields: McpToolsListParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      cursor: string | null;
      constructor(_meta?: globalThis.Map<string, any> | null, cursor?: string | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, cursor?: string | null}): McpToolsListParams;
    }
    namespace McpToolsListParams {
      interface $Fields {
        _meta: 0;
        cursor: 1;
      }
    }

    class DailyPeriodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DailyPeriodicity';
      static readonly $fields: DailyPeriodicity.$Fields;
      hour: number | bigint | null;
      minute: number | bigint | null;
      second: number | bigint | null;
      timezone: gc.core.TimeZone | null;
      constructor(hour?: number | bigint | null, minute?: number | bigint | null, second?: number | bigint | null, timezone?: gc.core.TimeZone | null);
      static createFrom(fields: {hour?: number | bigint | null, minute?: number | bigint | null, second?: number | bigint | null, timezone?: gc.core.TimeZone | null}): DailyPeriodicity;
    }
    namespace DailyPeriodicity {
      interface $Fields {
        hour: 0;
        minute: 1;
        second: 2;
        timezone: 3;
      }
    }

    class SchemaObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SchemaObject';
      static readonly $fields: SchemaObject.$Fields;
      $ref: string | null;
      $defs: globalThis.Map<string, gc.runtime.SchemaObject> | null;
      type: any | null;
      format: gc.runtime.SchemaFormat | null;
      description: string | null;
      nullable: boolean | null;
      properties: globalThis.Map<string, gc.runtime.SchemaObject> | null;
      pattern: string | null;
      required: globalThis.Array<string> | null;
      items: gc.runtime.SchemaObject | null;
      oneOf: globalThis.Array<gc.runtime.SchemaObject> | null;
      allOf: globalThis.Array<gc.runtime.SchemaObject> | null;
      anyOf: globalThis.Array<gc.runtime.SchemaObject> | null;
      minItems: number | bigint | null;
      maxItems: number | bigint | null;
      enum: globalThis.Array<string> | null;
      additionalProperties: gc.runtime.SchemaObject | null;
      constructor($ref?: string | null, $defs?: globalThis.Map<string, gc.runtime.SchemaObject> | null, type?: any | null, format?: gc.runtime.SchemaFormat | null, description?: string | null, nullable?: boolean | null, properties?: globalThis.Map<string, gc.runtime.SchemaObject> | null, pattern?: string | null, required?: globalThis.Array<string> | null, items?: gc.runtime.SchemaObject | null, oneOf?: globalThis.Array<gc.runtime.SchemaObject> | null, allOf?: globalThis.Array<gc.runtime.SchemaObject> | null, anyOf?: globalThis.Array<gc.runtime.SchemaObject> | null, minItems?: number | bigint | null, maxItems?: number | bigint | null, enum_?: globalThis.Array<string> | null, additionalProperties?: gc.runtime.SchemaObject | null);
      static createFrom(fields: {$ref?: string | null, $defs?: globalThis.Map<string, gc.runtime.SchemaObject> | null, type?: any | null, format?: gc.runtime.SchemaFormat | null, description?: string | null, nullable?: boolean | null, properties?: globalThis.Map<string, gc.runtime.SchemaObject> | null, pattern?: string | null, required?: globalThis.Array<string> | null, items?: gc.runtime.SchemaObject | null, oneOf?: globalThis.Array<gc.runtime.SchemaObject> | null, allOf?: globalThis.Array<gc.runtime.SchemaObject> | null, anyOf?: globalThis.Array<gc.runtime.SchemaObject> | null, minItems?: number | bigint | null, maxItems?: number | bigint | null, enum_?: globalThis.Array<string> | null, additionalProperties?: gc.runtime.SchemaObject | null}): SchemaObject;
    }
    namespace SchemaObject {
      interface $Fields {
        $ref: 0;
        $defs: 1;
        type: 2;
        format: 3;
        description: 4;
        nullable: 5;
        properties: 6;
        pattern: 7;
        required: 8;
        items: 9;
        oneOf: 10;
        allOf: 11;
        anyOf: 12;
        minItems: 13;
        maxItems: 14;
        enum: 15;
        additionalProperties: 16;
      }
    }

    class Identity$set_grants$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$set_grants$args';
      static readonly $fields: Identity$set_grants$args.$Fields;
      name: string;
      grants: globalThis.Array<gc.runtime.IdentityGrant>;
      constructor(name: string, grants: globalThis.Array<gc.runtime.IdentityGrant>);
      static createFrom(fields: {name: string, grants: globalThis.Array<gc.runtime.IdentityGrant>}): Identity$set_grants$args;
    }
    namespace Identity$set_grants$args {
      interface $Fields {
        name: 0;
        grants: 1;
      }
    }

    class McpTaskCreateParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTaskCreateParams';
      static readonly $fields: McpTaskCreateParams.$Fields;
      ttl: gc.core.duration | null;
      constructor(ttl?: gc.core.duration | null);
      static createFrom(fields: {ttl?: gc.core.duration | null}): McpTaskCreateParams;
    }
    namespace McpTaskCreateParams {
      interface $Fields {
        ttl: 0;
      }
    }

    class Runtime$usage$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$usage$args';
    }

    class OpenApi$v3$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenApi$v3$args';
    }

    class McpResourceContent extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpResourceContent';
      static readonly $fields: McpResourceContent.$Fields;
      type: gc.runtime.McpContentType;
      _meta: globalThis.Map<string, any> | null;
      annotations: gc.runtime.McpAnnotations | null;
      uri: string;
      description: string | null;
      mimeType: string | null;
      size: number | bigint | null;
      constructor(type: gc.runtime.McpContentType, _meta: globalThis.Map<string, any> | null, annotations: gc.runtime.McpAnnotations | null, uri: string, description?: string | null, mimeType?: string | null, size?: number | bigint | null);
      static createFrom(fields: {type: gc.runtime.McpContentType, _meta?: globalThis.Map<string, any> | null, annotations?: gc.runtime.McpAnnotations | null, uri: string, description?: string | null, mimeType?: string | null, size?: number | bigint | null}): McpResourceContent;
    }
    namespace McpResourceContent {
      interface $Fields {
        type: 0;
        _meta: 1;
        annotations: 2;
        uri: 3;
        description: 4;
        mimeType: 5;
        size: 6;
      }
    }

    class Scheduler$find$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Scheduler$find$args';
      static readonly $fields: Scheduler$find$args.$Fields;
      function: gc.core.function_;
      constructor(function_: gc.core.function_);
      static createFrom(fields: {function_: gc.core.function_}): Scheduler$find$args;
    }
    namespace Scheduler$find$args {
      interface $Fields {
        function: 0;
      }
    }

    class LogDataUsage extends gc.sdk.GCObject {
      static readonly _type = 'runtime::LogDataUsage';
      static readonly $fields: LogDataUsage.$Fields;
      read_bytes: number | bigint;
      read_hits: number | bigint;
      read_wasted: number | bigint;
      write_bytes: number | bigint;
      write_hits: number | bigint;
      cache_bytes: number | bigint;
      cache_hits: number | bigint;
      constructor(read_bytes: number | bigint, read_hits: number | bigint, read_wasted: number | bigint, write_bytes: number | bigint, write_hits: number | bigint, cache_bytes: number | bigint, cache_hits: number | bigint);
      static createFrom(fields: {read_bytes: number | bigint, read_hits: number | bigint, read_wasted: number | bigint, write_bytes: number | bigint, write_hits: number | bigint, cache_bytes: number | bigint, cache_hits: number | bigint}): LogDataUsage;
    }
    namespace LogDataUsage {
      interface $Fields {
        read_bytes: 0;
        read_hits: 1;
        read_wasted: 2;
        write_bytes: 3;
        write_hits: 4;
        cache_bytes: 5;
        cache_hits: 6;
      }
    }

    class Identity$logout$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$logout$args';
    }

    class mcp_tasks_cancel$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tasks_cancel$args';
      static readonly $fields: mcp_tasks_cancel$args.$Fields;
      params: gc.runtime.McpTasksCancelParams;
      constructor(params: gc.runtime.McpTasksCancelParams);
      static createFrom(fields: {params: gc.runtime.McpTasksCancelParams}): mcp_tasks_cancel$args;
    }
    namespace mcp_tasks_cancel$args {
      interface $Fields {
        params: 0;
      }
    }

    class MergeStrategy extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::MergeStrategy';
      static readonly $fields: MergeStrategy[];
      key: MergeStrategy.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: MergeStrategy.Field);
      static strict: MergeStrategy;
      static first_wins: MergeStrategy;
      static last_wins: MergeStrategy;
    }
    namespace MergeStrategy  {
      type Field = "strict"|"first_wins"|"last_wins";
    }

    class McpServerTasksCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpServerTasksCapabilities';
      static readonly $fields: McpServerTasksCapabilities.$Fields;
      list: globalThis.Map<string, any> | null;
      cancel: globalThis.Map<string, any> | null;
      requests: globalThis.Map<string, globalThis.Map<string, any>> | null;
      constructor(list?: globalThis.Map<string, any> | null, cancel?: globalThis.Map<string, any> | null, requests?: globalThis.Map<string, globalThis.Map<string, any>> | null);
      static createFrom(fields: {list?: globalThis.Map<string, any> | null, cancel?: globalThis.Map<string, any> | null, requests?: globalThis.Map<string, globalThis.Map<string, any>> | null}): McpServerTasksCapabilities;
    }
    namespace McpServerTasksCapabilities {
      interface $Fields {
        list: 0;
        cancel: 1;
        requests: 2;
      }
    }

    class Identity$token$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$token$args';
      static readonly $fields: Identity$token$args.$Fields;
      id: number | bigint;
      ttl: gc.core.duration | null;
      constructor(id: number | bigint, ttl?: gc.core.duration | null);
      static createFrom(fields: {id: number | bigint, ttl?: gc.core.duration | null}): Identity$token$args;
    }
    namespace Identity$token$args {
      interface $Fields {
        id: 0;
        ttl: 1;
      }
    }

    class System extends gc.sdk.GCObject {
      static readonly _type = 'runtime::System';
      static get_all_envs: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.core.Tuple<string, string | null>>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.core.Tuple<string, string | null>>>>;
      };
    }

    class McpTasksListResult extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksListResult';
      static readonly $fields: McpTasksListResult.$Fields;
      _meta: globalThis.Map<string, any> | null;
      tasks: globalThis.Array<gc.runtime.McpTask>;
      nextCursor: string | null;
      constructor(_meta: globalThis.Map<string, any> | null, tasks: globalThis.Array<gc.runtime.McpTask>, nextCursor?: string | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, tasks: globalThis.Array<gc.runtime.McpTask>, nextCursor?: string | null}): McpTasksListResult;
    }
    namespace McpTasksListResult {
      interface $Fields {
        _meta: 0;
        tasks: 1;
        nextCursor: 2;
      }
    }

    class Variable extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Variable';
      static readonly $fields: Variable.$Fields;
      name: string | null;
      value: any | null;
      constructor(name?: string | null, value?: any | null);
      static createFrom(fields: {name?: string | null, value?: any | null}): Variable;
    }
    namespace Variable {
      interface $Fields {
        name: 0;
        value: 1;
      }
    }

    class RuntimeInfo extends gc.sdk.GCObject {
      static readonly _type = 'runtime::RuntimeInfo';
      static readonly $fields: RuntimeInfo.$Fields;
      version: string;
      program_version: string | null;
      arch: string;
      timezone: gc.core.TimeZone;
      license: gc.runtime.License;
      io_threads: number | bigint;
      bg_threads: number | bigint;
      fg_threads: number | bigint;
      mem_total: number | bigint;
      mem_worker: number | bigint;
      disk_data_bytes: number | bigint;
      constructor(version: string, program_version: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, disk_data_bytes: number | bigint);
      static createFrom(fields: {version: string, program_version?: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, disk_data_bytes: number | bigint}): RuntimeInfo;
    }
    namespace RuntimeInfo {
      interface $Fields {
        version: 0;
        program_version: 1;
        arch: 2;
        timezone: 3;
        license: 4;
        io_threads: 5;
        bg_threads: 6;
        fg_threads: 7;
        mem_total: 8;
        mem_worker: 9;
        disk_data_bytes: 10;
      }
    }

    class mcp_tasks_result$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tasks_result$args';
      static readonly $fields: mcp_tasks_result$args.$Fields;
      params: gc.runtime.McpTasksResultParams;
      constructor(params: gc.runtime.McpTasksResultParams);
      static createFrom(fields: {params: gc.runtime.McpTasksResultParams}): mcp_tasks_result$args;
    }
    namespace mcp_tasks_result$args {
      interface $Fields {
        params: 0;
      }
    }

    class MediaTypeObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::MediaTypeObject';
      static readonly $fields: MediaTypeObject.$Fields;
      schema: gc.runtime.SchemaObject;
      constructor(schema: gc.runtime.SchemaObject);
      static createFrom(fields: {schema: gc.runtime.SchemaObject}): MediaTypeObject;
    }
    namespace MediaTypeObject {
      interface $Fields {
        schema: 0;
      }
    }

    class McpPriority extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::McpPriority';
      static readonly $fields: McpPriority[];
      key: McpPriority.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: McpPriority.Field);
      static MostImportant: McpPriority;
      static LeastImportant: McpPriority;
    }
    namespace McpPriority  {
      type Field = "MostImportant"|"LeastImportant";
    }

    class Task$cancel$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$cancel$args';
      static readonly $fields: Task$cancel$args.$Fields;
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$cancel$args;
    }
    namespace Task$cancel$args {
      interface $Fields {
        task_id: 0;
      }
    }

    class OpenApiVersion extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::OpenApiVersion';
      static readonly $fields: OpenApiVersion[];
      key: OpenApiVersion.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: OpenApiVersion.Field);
      static "3.0.4": OpenApiVersion;
      static "3.1.0": OpenApiVersion;
    }
    namespace OpenApiVersion  {
      type Field = "3.0.4"|"3.1.0";
    }

    class McpTasksCancelParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpTasksCancelParams';
      static readonly $fields: McpTasksCancelParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      taskId: string;
      constructor(_meta: globalThis.Map<string, any> | null, taskId: string);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, taskId: string}): McpTasksCancelParams;
    }
    namespace McpTasksCancelParams {
      interface $Fields {
        _meta: 0;
        taskId: 1;
      }
    }

    class Runtime extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime';
      /**
       * Performs a full backup even if incremental delta are present in backup directory
       */
      static backup_full: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
      static root: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<any>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<any>>;
      };
      static abi: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
      };
      static usage: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.RuntimeUsage>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.RuntimeUsage>>;
      };
      static info: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.RuntimeInfo>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.RuntimeInfo>>;
      };
    }

    class PeriodicOptions extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicOptions';
      static readonly $fields: PeriodicOptions.$Fields;
      immediate: boolean | null;
      activated: boolean | null;
      start: gc.core.time | null;
      max_duration: gc.core.duration | null;
      constructor(immediate?: boolean | null, activated?: boolean | null, start?: gc.core.time | null, max_duration?: gc.core.duration | null);
      static createFrom(fields: {immediate?: boolean | null, activated?: boolean | null, start?: gc.core.time | null, max_duration?: gc.core.duration | null}): PeriodicOptions;
    }
    namespace PeriodicOptions {
      interface $Fields {
        immediate: 0;
        activated: 1;
        start: 2;
        max_duration: 3;
      }
    }

    class McpServerPromptsCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpServerPromptsCapabilities';
      static readonly $fields: McpServerPromptsCapabilities.$Fields;
      listChanged: boolean | null;
      constructor(listChanged?: boolean | null);
      static createFrom(fields: {listChanged?: boolean | null}): McpServerPromptsCapabilities;
    }
    namespace McpServerPromptsCapabilities {
      interface $Fields {
        listChanged: 0;
      }
    }

    class McpTaskSupport extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::McpTaskSupport';
      static readonly $fields: McpTaskSupport[];
      key: McpTaskSupport.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: McpTaskSupport.Field);
      static forbidden: McpTaskSupport;
      static required: McpTaskSupport;
      static optional: McpTaskSupport;
    }
    namespace McpTaskSupport  {
      type Field = "forbidden"|"required"|"optional";
    }

    class ResponseObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::ResponseObject';
      static readonly $fields: ResponseObject.$Fields;
      description: string;
      headers: globalThis.Map<string, gc.runtime.HeaderObject> | null;
      content: globalThis.Map<string, gc.runtime.MediaTypeObject> | null;
      constructor(description: string, headers?: globalThis.Map<string, gc.runtime.HeaderObject> | null, content?: globalThis.Map<string, gc.runtime.MediaTypeObject> | null);
      static createFrom(fields: {description: string, headers?: globalThis.Map<string, gc.runtime.HeaderObject> | null, content?: globalThis.Map<string, gc.runtime.MediaTypeObject> | null}): ResponseObject;
    }
    namespace ResponseObject {
      interface $Fields {
        description: 0;
        headers: 1;
        content: 2;
      }
    }

    class McpImageContent extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpImageContent';
      static readonly $fields: McpImageContent.$Fields;
      type: gc.runtime.McpContentType;
      _meta: globalThis.Map<string, any> | null;
      annotations: gc.runtime.McpAnnotations | null;
      data: string;
      mimeType: string;
      constructor(type: gc.runtime.McpContentType, _meta: globalThis.Map<string, any> | null, annotations: gc.runtime.McpAnnotations | null, data: string, mimeType: string);
      static createFrom(fields: {type: gc.runtime.McpContentType, _meta?: globalThis.Map<string, any> | null, annotations?: gc.runtime.McpAnnotations | null, data: string, mimeType: string}): McpImageContent;
    }
    namespace McpImageContent {
      interface $Fields {
        type: 0;
        _meta: 1;
        annotations: 2;
        data: 3;
        mimeType: 4;
      }
    }

    class Task$is_running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$is_running$args';
      static readonly $fields: Task$is_running$args.$Fields;
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$is_running$args;
    }
    namespace Task$is_running$args {
      interface $Fields {
        task_id: 0;
      }
    }

    class Debug$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$all$args';
    }

    class McpToolsCallParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpToolsCallParams';
      static readonly $fields: McpToolsCallParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
      name: string;
      arguments: any | null;
      task: gc.runtime.McpTaskCreateParams | null;
      constructor(_meta: globalThis.Map<string, any> | null, name: string, arguments_?: any | null, task?: gc.runtime.McpTaskCreateParams | null);
      static createFrom(fields: {_meta?: globalThis.Map<string, any> | null, name: string, arguments_?: any | null, task?: gc.runtime.McpTaskCreateParams | null}): McpToolsCallParams;
    }
    namespace McpToolsCallParams {
      interface $Fields {
        _meta: 0;
        name: 1;
        arguments: 2;
        task: 3;
      }
    }

    class mcp_tasks_get$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tasks_get$args';
      static readonly $fields: mcp_tasks_get$args.$Fields;
      params: gc.runtime.McpTasksGetParams;
      constructor(params: gc.runtime.McpTasksGetParams);
      static createFrom(fields: {params: gc.runtime.McpTasksGetParams}): mcp_tasks_get$args;
    }
    namespace mcp_tasks_get$args {
      interface $Fields {
        params: 0;
      }
    }

    class mcp_tools_call$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tools_call$args';
      static readonly $fields: mcp_tools_call$args.$Fields;
      params: gc.runtime.McpToolsCallParams;
      constructor(params: gc.runtime.McpToolsCallParams);
      static createFrom(fields: {params: gc.runtime.McpToolsCallParams}): mcp_tools_call$args;
    }
    namespace mcp_tools_call$args {
      interface $Fields {
        params: 0;
      }
    }

    class LogLevel extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::LogLevel';
      static readonly $fields: LogLevel[];
      key: LogLevel.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: LogLevel.Field);
      static error: LogLevel;
      static warn: LogLevel;
      static info: LogLevel;
      static perf: LogLevel;
      static trace: LogLevel;
    }
    namespace LogLevel  {
      type Field = "error"|"warn"|"info"|"perf"|"trace";
    }

    class PeriodicTask extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask';
      static readonly $fields: PeriodicTask.$Fields;
      function: gc.core.function_;
      periodicity: gc.runtime.Periodicity;
      options: gc.runtime.PeriodicOptions;
      is_active: boolean;
      next_execution: gc.core.time;
      execution_count: number | bigint;
      constructor(function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options: gc.runtime.PeriodicOptions, is_active: boolean, next_execution: gc.core.time, execution_count: number | bigint);
      static createFrom(fields: {function_: gc.core.function_, periodicity: gc.runtime.Periodicity, options: gc.runtime.PeriodicOptions, is_active: boolean, next_execution: gc.core.time, execution_count: number | bigint}): PeriodicTask;
    }
    namespace PeriodicTask {
      interface $Fields {
        function: 0;
        periodicity: 1;
        options: 2;
        is_active: 3;
        next_execution: 4;
        execution_count: 5;
      }
    }

    class McpServerToolsCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpServerToolsCapabilities';
      static readonly $fields: McpServerToolsCapabilities.$Fields;
      listChanged: boolean | null;
      constructor(listChanged?: boolean | null);
      static createFrom(fields: {listChanged?: boolean | null}): McpServerToolsCapabilities;
    }
    namespace McpServerToolsCapabilities {
      interface $Fields {
        listChanged: 0;
      }
    }

    class Task$running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$running$args';
    }

    class McpContentType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::McpContentType';
      static readonly $fields: McpContentType[];
      key: McpContentType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: McpContentType.Field);
      static text: McpContentType;
      static image: McpContentType;
      static audio: McpContentType;
      static resource_link: McpContentType;
      static resource: McpContentType;
    }
    namespace McpContentType  {
      type Field = "text"|"image"|"audio"|"resource_link"|"resource";
    }

    class System$get_all_envs$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::System$get_all_envs$args';
    }

    class McpContentBlock extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpContentBlock';
      static readonly $fields: McpContentBlock.$Fields;
      type: gc.runtime.McpContentType;
      _meta: globalThis.Map<string, any> | null;
      annotations: gc.runtime.McpAnnotations | null;
    }
    namespace McpContentBlock {
      interface $Fields {
        type: 0;
        _meta: 1;
        annotations: 2;
      }
    }

    class Job<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Job';
      static readonly $fields: Job.$Fields;
      function: gc.core.function_;
      arguments: globalThis.Array<any | null> | null;
      constructor(function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null);
      static createFrom<T>(fields: {function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null}): Job;
    }
    namespace Job {
      interface $Fields {
        function: 0;
        arguments: 1;
      }
    }

    class Task$history$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$history$args';
      static readonly $fields: Task$history$args.$Fields;
      offset: number | bigint;
      max: number | bigint;
      constructor(offset: number | bigint, max: number | bigint);
      static createFrom(fields: {offset: number | bigint, max: number | bigint}): Task$history$args;
    }
    namespace Task$history$args {
      interface $Fields {
        offset: 0;
        max: 1;
      }
    }

    class Task<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task';
      static readonly $fields: Task.$Fields;
      user_id: number | bigint;
      task_id: number | bigint;
      mod: string | null;
      type: string | null;
      fun: string | null;
      creation: gc.core.time;
      start: gc.core.time | null;
      duration: gc.core.duration | null;
      status: gc.runtime.TaskStatus;
      progress: number | null;
      constructor(user_id: number | bigint, task_id: number | bigint, mod: string | null, type: string | null, fun: string | null, creation: gc.core.time, start: gc.core.time | null, duration: gc.core.duration | null, status: gc.runtime.TaskStatus, progress?: number | null);
      static createFrom(fields: {user_id: number | bigint, task_id: number | bigint, mod?: string | null, type?: string | null, fun?: string | null, creation: gc.core.time, start?: gc.core.time | null, duration?: gc.core.duration | null, status: gc.runtime.TaskStatus, progress?: number | null}): Task;
      static is_running: ((task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<boolean>) & {
        spawn(task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<boolean>>;
      };
      static cancel: ((task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<boolean>) & {
        spawn(task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<boolean>>;
      };
      static history: ((offset: number | bigint, max: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.Task>>) & {
        spawn(offset: number | bigint, max: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.Task>>>;
      };
      static running: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<gc.runtime.Task>>) & {
        spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<gc.runtime.Task>>>;
      };
    }
    namespace Task {
      interface $Fields {
        user_id: 0;
        task_id: 1;
        mod: 2;
        type: 3;
        fun: 4;
        creation: 5;
        start: 6;
        duration: 7;
        status: 8;
        progress: 9;
      }
    }

    class SchemaFormat extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::SchemaFormat';
      static readonly $fields: SchemaFormat[];
      key: SchemaFormat.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SchemaFormat.Field);
      static int32: SchemaFormat;
      static int64: SchemaFormat;
      static float: SchemaFormat;
      static double: SchemaFormat;
      static byte: SchemaFormat;
      static binary: SchemaFormat;
      static date: SchemaFormat;
      static "date-time": SchemaFormat;
      static password: SchemaFormat;
    }
    namespace SchemaFormat  {
      type Field = "int32"|"int64"|"float"|"double"|"byte"|"binary"|"date"|"date-time"|"password";
    }

    class PathItemObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PathItemObject';
      static readonly $fields: PathItemObject.$Fields;
      description: string | null;
      post: gc.runtime.OperationObject | null;
      constructor(description?: string | null, post?: gc.runtime.OperationObject | null);
      static createFrom(fields: {description?: string | null, post?: gc.runtime.OperationObject | null}): PathItemObject;
    }
    namespace PathItemObject {
      interface $Fields {
        description: 0;
        post: 1;
      }
    }

    class ComponentsObject extends gc.sdk.GCObject {
      static readonly _type = 'runtime::ComponentsObject';
      static readonly $fields: ComponentsObject.$Fields;
      schemas: globalThis.Map<string, gc.runtime.SchemaObject> | null;
      constructor(schemas?: globalThis.Map<string, gc.runtime.SchemaObject> | null);
      static createFrom(fields: {schemas?: globalThis.Map<string, gc.runtime.SchemaObject> | null}): ComponentsObject;
    }
    namespace ComponentsObject {
      interface $Fields {
        schemas: 0;
      }
    }

    class McpRequestParams extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpRequestParams';
      static readonly $fields: McpRequestParams.$Fields;
      _meta: globalThis.Map<string, any> | null;
    }
    namespace McpRequestParams {
      interface $Fields {
        _meta: 0;
      }
    }

    class Debug$get$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$get$args';
      static readonly $fields: Debug$get$args.$Fields;
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): Debug$get$args;
    }
    namespace Debug$get$args {
      interface $Fields {
        id: 0;
      }
    }

    class IdentityGrant extends gc.sdk.GCObject {
      static readonly _type = 'runtime::IdentityGrant';
      static readonly $fields: IdentityGrant.$Fields;
      name: string;
      grant: gc.runtime.IdentityGrantType;
      constructor(name: string, grant: gc.runtime.IdentityGrantType);
      static createFrom(fields: {name: string, grant: gc.runtime.IdentityGrantType}): IdentityGrant;
    }
    namespace IdentityGrant {
      interface $Fields {
        name: 0;
        grant: 1;
      }
    }

    class McpClientTasksCapabilities extends gc.sdk.GCObject {
      static readonly _type = 'runtime::McpClientTasksCapabilities';
      static readonly $fields: McpClientTasksCapabilities.$Fields;
      list: globalThis.Map<string, any> | null;
      cancel: globalThis.Map<string, any> | null;
      requests: globalThis.Map<string, globalThis.Map<string, any>> | null;
      constructor(list?: globalThis.Map<string, any> | null, cancel?: globalThis.Map<string, any> | null, requests?: globalThis.Map<string, globalThis.Map<string, any>> | null);
      static createFrom(fields: {list?: globalThis.Map<string, any> | null, cancel?: globalThis.Map<string, any> | null, requests?: globalThis.Map<string, globalThis.Map<string, any>> | null}): McpClientTasksCapabilities;
    }
    namespace McpClientTasksCapabilities {
      interface $Fields {
        list: 0;
        cancel: 1;
        requests: 2;
      }
    }

    class mcp_tasks_list$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::mcp_tasks_list$args';
      static readonly $fields: mcp_tasks_list$args.$Fields;
      params: gc.runtime.McpTasksListParams | null;
      constructor(params?: gc.runtime.McpTasksListParams | null);
      static createFrom(fields: {params?: gc.runtime.McpTasksListParams | null}): mcp_tasks_list$args;
    }
    namespace mcp_tasks_list$args {
      interface $Fields {
        params: 0;
      }
    }

    class Identity$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Identity$all$args';
    }

    class DateTuple extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DateTuple';
      static readonly $fields: DateTuple.$Fields;
      day: number | bigint;
      month: gc.runtime.Month;
      constructor(day: number | bigint, month: gc.runtime.Month);
      static createFrom(fields: {day: number | bigint, month: gc.runtime.Month}): DateTuple;
    }
    namespace DateTuple {
      interface $Fields {
        day: 0;
        month: 1;
      }
    }

    class MonthlyPeriodicity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::MonthlyPeriodicity';
      static readonly $fields: MonthlyPeriodicity.$Fields;
      days: globalThis.Array<number | bigint>;
      daily: gc.runtime.DailyPeriodicity | null;
      constructor(days: globalThis.Array<number | bigint>, daily?: gc.runtime.DailyPeriodicity | null);
      static createFrom(fields: {days: globalThis.Array<number | bigint>, daily?: gc.runtime.DailyPeriodicity | null}): MonthlyPeriodicity;
    }
    namespace MonthlyPeriodicity {
      interface $Fields {
        days: 0;
        daily: 1;
      }
    }

    class McpRole extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::McpRole';
      static readonly $fields: McpRole[];
      key: McpRole.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: McpRole.Field);
      static user: McpRole;
      static assistant: McpRole;
    }
    namespace McpRole  {
      type Field = "user"|"assistant";
    }

    const mcp_initialize: ((params: gc.runtime.McpInitializeParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.McpInitializeResult>) & {
      spawn(params: gc.runtime.McpInitializeParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.McpInitializeResult>>;
    };
    const mcp_tools_list: ((params?: gc.runtime.McpToolsListParams | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.McpToolsListResult>) & {
      spawn(params?: gc.runtime.McpToolsListParams | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.McpToolsListResult>>;
    };
    const mcp_tools_call: ((params: gc.runtime.McpToolsCallParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<any>) & {
      spawn(params: gc.runtime.McpToolsCallParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<any>>;
    };
    const mcp_tasks_get: ((params: gc.runtime.McpTasksGetParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<any>) & {
      spawn(params: gc.runtime.McpTasksGetParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<any>>;
    };
    const mcp_tasks_result: ((params: gc.runtime.McpTasksResultParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.McpToolsCallResult>) & {
      spawn(params: gc.runtime.McpTasksResultParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.McpToolsCallResult>>;
    };
    const mcp_tasks_list: ((params?: gc.runtime.McpTasksListParams | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.McpTasksListResult>) & {
      spawn(params?: gc.runtime.McpTasksListParams | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.McpTasksListResult>>;
    };
    const mcp_tasks_cancel: ((params: gc.runtime.McpTasksCancelParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.runtime.McpTask>) & {
      spawn(params: gc.runtime.McpTasksCancelParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.runtime.McpTask>>;
    };
  }

  namespace util {
    class LinearQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::LinearQuantizer';
      static readonly $fields: LinearQuantizer.$Fields;
      min: T;
      max: T;
      bins: number | bigint;
      open: boolean | null;
      constructor(min: T, max: T, bins: number | bigint, open?: boolean | null);
      static createFrom<T>(fields: {min?: T, max?: T, bins: number | bigint, open?: boolean | null}): LinearQuantizer;
    }
    namespace LinearQuantizer {
      interface $Fields {
        min: 0;
        max: 1;
        bins: 2;
        open: 3;
      }
    }

    class GaussianProfile<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::GaussianProfile';
      static readonly $fields: GaussianProfile.$Fields;
      quantizer: gc.util.Quantizer<T>;
      precision: gc.core.FloatPrecision;
      bins: gc.core.Table<gc.util.GaussianProfileSlot | null> | null;
      value_min: number | null;
      nb_rejected: number | bigint | null;
      constructor(quantizer: gc.util.Quantizer<T>, precision: gc.core.FloatPrecision, bins?: gc.core.Table<gc.util.GaussianProfileSlot | null> | null, value_min?: number | null, nb_rejected?: number | bigint | null);
      static createFrom<T>(fields: {quantizer: gc.util.Quantizer<T>, precision: gc.core.FloatPrecision, bins?: gc.core.Table<gc.util.GaussianProfileSlot | null> | null, value_min?: number | null, nb_rejected?: number | bigint | null}): GaussianProfile;
    }
    namespace GaussianProfile {
      interface $Fields {
        quantizer: 0;
        precision: 1;
        bins: 2;
        value_min: 3;
        nb_rejected: 4;
      }
    }

    class TimeWindow<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::TimeWindow';
      static readonly $fields: TimeWindow.$Fields;
      values: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null;
      span: gc.core.duration;
      sum: number | null;
      sumsq: number | null;
      field: gc.core.field | null;
      constructor(values: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null, span: gc.core.duration, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null);
      static createFrom<T>(fields: {values?: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null, span: gc.core.duration, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null}): TimeWindow;
    }
    namespace TimeWindow {
      interface $Fields {
        values: 0;
        span: 1;
        sum: 2;
        sumsq: 3;
        field: 4;
      }
    }

    class GaussianProfileSlot extends gc.sdk.GCObject {
      static readonly _type = 'util::GaussianProfileSlot';
      static readonly $fields: GaussianProfileSlot.$Fields;
      sum: number | bigint;
      sumsq: number | bigint;
      count: number | bigint;
      constructor(sum: number | bigint, sumsq: number | bigint, count: number | bigint);
      static createFrom(fields: {sum: number | bigint, sumsq: number | bigint, count: number | bigint}): GaussianProfileSlot;
    }
    namespace GaussianProfileSlot {
      interface $Fields {
        sum: 0;
        sumsq: 1;
        count: 2;
      }
    }

    class Random extends gc.sdk.GCObject {
      static readonly _type = 'util::Random';
      static readonly $fields: Random.$Fields;
      seed: number | bigint | null;
      v: number | null;
      constructor(seed?: number | bigint | null, v?: number | null);
      static createFrom(fields: {seed?: number | bigint | null, v?: number | null}): Random;
    }
    namespace Random {
      interface $Fields {
        seed: 0;
        v: 1;
      }
    }

    class CustomQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::CustomQuantizer';
      static readonly $fields: CustomQuantizer.$Fields;
      min: T;
      max: T;
      step_starts: globalThis.Array<T>;
      open: boolean | null;
      constructor(min: T, max: T, step_starts: globalThis.Array<T>, open?: boolean | null);
      static createFrom<T>(fields: {min?: T, max?: T, step_starts: globalThis.Array<T>, open?: boolean | null}): CustomQuantizer;
    }
    namespace CustomQuantizer {
      interface $Fields {
        min: 0;
        max: 1;
        step_starts: 2;
        open: 3;
      }
    }

    class Stack<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Stack';
      static readonly $fields: Stack.$Fields;
      values: globalThis.Array<T> | null;
      constructor(values?: globalThis.Array<T> | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null}): Stack;
    }
    namespace Stack {
      interface $Fields {
        values: 0;
      }
    }

    class Uuid extends gc.sdk.GCObject {
      static readonly _type = 'util::Uuid';
    }

    class Quantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Quantizer';
    }

    class Gaussian<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Gaussian';
      static readonly $fields: Gaussian.$Fields;
      sum: number | null;
      sumsq: number | null;
      count: number | bigint | null;
      min: T | null;
      max: T | null;
      constructor(sum?: number | null, sumsq?: number | null, count?: number | bigint | null, min?: T | null, max?: T | null);
      static createFrom<T>(fields: {sum?: number | null, sumsq?: number | null, count?: number | bigint | null, min?: T | null, max?: T | null}): Gaussian;
    }
    namespace Gaussian {
      interface $Fields {
        sum: 0;
        sumsq: 1;
        count: 2;
        min: 3;
        max: 4;
      }
    }

    class SlidingWindow<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::SlidingWindow';
      static readonly $fields: SlidingWindow.$Fields;
      values: globalThis.Array<T> | null;
      span: number | bigint;
      sum: number | null;
      sumsq: number | null;
      field: gc.core.field | null;
      constructor(values: globalThis.Array<T> | null, span: number | bigint, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null, span: number | bigint, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null}): SlidingWindow;
    }
    namespace SlidingWindow {
      interface $Fields {
        values: 0;
        span: 1;
        sum: 2;
        sumsq: 3;
        field: 4;
      }
    }

    class HistogramStats<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::HistogramStats';
      static readonly $fields: HistogramStats.$Fields;
      min: T;
      max: T;
      whisker_low: T;
      whisker_high: T;
      percentile1: T;
      percentile5: T;
      percentile10: T;
      percentile20: T;
      percentile25: T;
      percentile50: T;
      percentile75: T;
      percentile80: T;
      percentile90: T;
      percentile95: T;
      percentile99: T;
      sum: number;
      avg: T;
      std: T;
      size: number | bigint;
      constructor(min: T, max: T, whisker_low: T, whisker_high: T, percentile1: T, percentile5: T, percentile10: T, percentile20: T, percentile25: T, percentile50: T, percentile75: T, percentile80: T, percentile90: T, percentile95: T, percentile99: T, sum: number, avg: T, std: T, size: number | bigint);
      static createFrom<T>(fields: {min?: T, max?: T, whisker_low?: T, whisker_high?: T, percentile1?: T, percentile5?: T, percentile10?: T, percentile20?: T, percentile25?: T, percentile50?: T, percentile75?: T, percentile80?: T, percentile90?: T, percentile95?: T, percentile99?: T, sum: number, avg?: T, std?: T, size: number | bigint}): HistogramStats;
    }
    namespace HistogramStats {
      interface $Fields {
        min: 0;
        max: 1;
        whisker_low: 2;
        whisker_high: 3;
        percentile1: 4;
        percentile5: 5;
        percentile10: 6;
        percentile20: 7;
        percentile25: 8;
        percentile50: 9;
        percentile75: 10;
        percentile80: 11;
        percentile90: 12;
        percentile95: 13;
        percentile99: 14;
        sum: 15;
        avg: 16;
        std: 17;
        size: 18;
      }
    }

    class Queue<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Queue';
      static readonly $fields: Queue.$Fields;
      values: globalThis.Array<T> | null;
      capacity: number | bigint | null;
      constructor(values?: globalThis.Array<T> | null, capacity?: number | bigint | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null, capacity?: number | bigint | null}): Queue;
    }
    namespace Queue {
      interface $Fields {
        values: 0;
        capacity: 1;
      }
    }

    class Crypto extends gc.sdk.GCObject {
      static readonly _type = 'util::Crypto';
    }

    class HistogramBin<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::HistogramBin';
      static readonly $fields: HistogramBin.$Fields;
      bin: gc.util.QuantizerSlotBound<T>;
      count: number | bigint;
      ratio: number;
      cumulative_count: number | bigint;
      cumulative_ratio: number;
      constructor(bin: gc.util.QuantizerSlotBound<T>, count: number | bigint, ratio: number, cumulative_count: number | bigint, cumulative_ratio: number);
      static createFrom<T>(fields: {bin: gc.util.QuantizerSlotBound<T>, count: number | bigint, ratio: number, cumulative_count: number | bigint, cumulative_ratio: number}): HistogramBin;
    }
    namespace HistogramBin {
      interface $Fields {
        bin: 0;
        count: 1;
        ratio: 2;
        cumulative_count: 3;
        cumulative_ratio: 4;
      }
    }

    class LogQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::LogQuantizer';
      static readonly $fields: LogQuantizer.$Fields;
      min: T;
      max: T;
      bins: number | bigint;
      open: boolean | null;
      constructor(min: T, max: T, bins: number | bigint, open?: boolean | null);
      static createFrom<T>(fields: {min?: T, max?: T, bins: number | bigint, open?: boolean | null}): LogQuantizer;
    }
    namespace LogQuantizer {
      interface $Fields {
        min: 0;
        max: 1;
        bins: 2;
        open: 3;
      }
    }

    class QuantizerSlotBound<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::QuantizerSlotBound';
      static readonly $fields: QuantizerSlotBound.$Fields;
      min: T;
      max: T;
      center: T;
      constructor(min?: T, max?: T, center?: T);
      static createFrom<T>(fields: {min?: T, max?: T, center?: T}): QuantizerSlotBound;
    }
    namespace QuantizerSlotBound {
      interface $Fields {
        min: 0;
        max: 1;
        center: 2;
      }
    }

    class ProgressTracker extends gc.sdk.GCObject {
      static readonly _type = 'util::ProgressTracker';
      static readonly $fields: ProgressTracker.$Fields;
      start: gc.core.time;
      total: number | bigint | null;
      counter: number | bigint | null;
      duration: gc.core.duration | null;
      progress: number | null;
      speed: number | null;
      remaining: gc.core.duration | null;
      constructor(start: gc.core.time, total?: number | bigint | null, counter?: number | bigint | null, duration?: gc.core.duration | null, progress?: number | null, speed?: number | null, remaining?: gc.core.duration | null);
      static createFrom(fields: {start: gc.core.time, total?: number | bigint | null, counter?: number | bigint | null, duration?: gc.core.duration | null, progress?: number | null, speed?: number | null, remaining?: gc.core.duration | null}): ProgressTracker;
    }
    namespace ProgressTracker {
      interface $Fields {
        start: 0;
        total: 1;
        counter: 2;
        duration: 3;
        progress: 4;
        speed: 5;
        remaining: 6;
      }
    }

    class MultiQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::MultiQuantizer';
      static readonly $fields: MultiQuantizer.$Fields;
      quantizers: globalThis.Array<gc.util.Quantizer<T>>;
      constructor(quantizers: globalThis.Array<gc.util.Quantizer<T>>);
      static createFrom<T>(fields: {quantizers: globalThis.Array<gc.util.Quantizer<T>>}): MultiQuantizer;
    }
    namespace MultiQuantizer {
      interface $Fields {
        quantizers: 0;
      }
    }

    class Assert extends gc.sdk.GCObject {
      static readonly _type = 'util::Assert';
    }

    class Histogram<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Histogram';
      static readonly $fields: Histogram.$Fields;
      quantizer: gc.util.Quantizer<T>;
      bins: globalThis.Array<number | bigint | null> | null;
      nb_rejected: number | bigint | null;
      nb_accepted: number | bigint | null;
      min: T | null;
      max: T | null;
      sum: number | null;
      sumsq: number | null;
      constructor(quantizer: gc.util.Quantizer<T>, bins?: globalThis.Array<number | bigint | null> | null, nb_rejected?: number | bigint | null, nb_accepted?: number | bigint | null, min?: T | null, max?: T | null, sum?: number | null, sumsq?: number | null);
      static createFrom<T>(fields: {quantizer: gc.util.Quantizer<T>, bins?: globalThis.Array<number | bigint | null> | null, nb_rejected?: number | bigint | null, nb_accepted?: number | bigint | null, min?: T | null, max?: T | null, sum?: number | null, sumsq?: number | null}): Histogram;
    }
    namespace Histogram {
      interface $Fields {
        quantizer: 0;
        bins: 1;
        nb_rejected: 2;
        nb_accepted: 3;
        min: 4;
        max: 5;
        sum: 6;
        sumsq: 7;
      }
    }

  }

}
