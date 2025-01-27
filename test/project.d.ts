// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace project {
    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      "project::n": gc.core.node<string | null>;
      "project::nt": gc.core.nodeTime<string>;
      "project::nl": gc.core.nodeList<string>;
      "project::ni": gc.core.nodeIndex<string, number>;
      "project::ng": gc.core.nodeGeo<string>;
    }

    class std_int_min_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_bigint$args';
    }

    class ambiguous$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous$args';
    }

    class foobar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foobar$args';
    }

    class vtable_test$args extends gc.sdk.GCObject {
      static readonly _type = 'project::vtable_test$args';
    }

    class an_error$args extends gc.sdk.GCObject {
      static readonly _type = 'project::an_error$args';
    }

    class map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::map$args';
    }

    class time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::time$args';
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
      tz: gc.core.TimeZone;
      name: string;
      int: number | bigint;
      foo: project.FooBar | null;
      values: globalThis.Array<any>;
      constructor(tz: gc.core.TimeZone, name: string, int: number | bigint, foo: project.FooBar | null, values: globalThis.Array<any>);
      static createFrom(fields: {tz: gc.core.TimeZone, name: string, int: number | bigint, foo?: project.FooBar | null, values: globalThis.Array<any>}): FooBar;
    }

    class slowTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::slowTask$args';
    }

    class std_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int$args';
    }

    class enum$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enum$args';
    }

    class get_node_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_list$args';
    }

    class table3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table3$args';
    }

    class some_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::some_table$args';
    }

    class NameConflict extends gc.sdk.GCEnum {
      static readonly _type = 'project::NameConflict';
      static readonly $fields: NameConflict[];
      key: NameConflict.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: NameConflict.Field, value?: unknown);
      static name: NameConflict;
      static $type: NameConflict;
      static constructor: NameConflict;
      static class: NameConflict;
      static async: NameConflict;
    }
    namespace NameConflict  {
      type Field = 'name'|'$type'|'constructor'|'class'|'async';
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class FloatPrecisionTest extends gc.sdk.GCObject {
      static readonly _type = 'project::FloatPrecisionTest';
      normal: number;
      precision: number;
      constructor(normal: number, precision: number);
      static createFrom(fields: {normal: number, precision: number}): FloatPrecisionTest;
    }

    class enumValue$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enumValue$args';
    }

    class sensor_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sensor_table$args';
    }

    class geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geo$args';
    }

    class get_node_geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_geo$args';
    }

    class ambiguous2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous2$args';
    }

    class tensor2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor2$args';
    }

    class CustomType extends gc.sdk.GCObject {
      static readonly _type = 'project::CustomType';
      string: string;
      int: number | bigint;
      float: number;
      bool: boolean;
      char: string;
      enum: gc.core.TimeZone;
      constructor(string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: gc.core.TimeZone);
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: gc.core.TimeZone}): CustomType;
    }

    class table2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table2$args';
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      id: string;
      temp: number;
      humidity: number;
      constructor(id: string, temp: number, humidity: number);
      static createFrom(fields: {id: string, temp: number, humidity: number}): Sensor;
    }

    class contacts$args extends gc.sdk.GCObject {
      static readonly _type = 'project::contacts$args';
      contacts: gc.core.Table<project.Contact>;
      constructor(contacts: gc.core.Table<project.Contact>);
      static createFrom(fields: {contacts: gc.core.Table<project.Contact>}): contacts$args;
    }

    class print_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::print_table$args';
      table: gc.core.Table;
      constructor(table: gc.core.Table);
      static createFrom(fields: {table: gc.core.Table}): print_table$args;
    }

    class Bar<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Bar';
      attr: T | null;
      constructor(attr?: T | null);
      static createFrom<T>(fields: {attr?: T | null}): Bar;
    }

    class blockingFn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::blockingFn$args';
    }

    class array_mono$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono$args';
    }

    class std_bool$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_bool$args';
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      different: string;
      age: number | bigint;
      constructor(different: string, age: number | bigint);
      static createFrom(fields: {different: string, age: number | bigint}): task_with_params$args;
    }

    class boom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::boom$args';
    }

    class gonna_timeout$args extends gc.sdk.GCObject {
      static readonly _type = 'project::gonna_timeout$args';
    }

    class float_f$args extends gc.sdk.GCObject {
      static readonly _type = 'project::float_f$args';
      f: number | null;
      constructor(f?: number | null);
      static createFrom(fields: {f?: number | null}): float_f$args;
    }

    class array$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array$args';
    }

    class Contact extends gc.sdk.GCObject {
      static readonly _type = 'project::Contact';
      firstname: string;
      lastname: string;
      age: number | bigint;
      constructor(firstname: string, lastname: string, age: number | bigint);
      static createFrom(fields: {firstname: string, lastname: string, age: number | bigint}): Contact;
    }

    class fn_pointer$args extends gc.sdk.GCObject {
      static readonly _type = 'project::fn_pointer$args';
    }

    class ArrayContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::ArrayContainer';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): ArrayContainer;
    }

    class read_stringlit$args extends gc.sdk.GCObject {
      static readonly _type = 'project::read_stringlit$args';
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): read_stringlit$args;
    }

    class create_nodeTimes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::create_nodeTimes$args';
    }

    class array3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array3$args';
    }

    class array_of_float$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_float$args';
      arr: globalThis.Array<number>;
      constructor(arr: globalThis.Array<number>);
      static createFrom(fields: {arr: globalThis.Array<number>}): array_of_float$args;
    }

    class computeTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::computeTask$args';
    }

    class tensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor$args';
    }

    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class array_of_string$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_string$args';
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): array_of_string$args;
    }

    class tensor3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor3$args';
    }

    class geos$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geos$args';
    }

    class longTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::longTask$args';
    }

    class get_node_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_time$args';
    }

    class std_int_min_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_number$args';
    }

    class std_int_max_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_bigint$args';
    }

    class get_node_index$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_index$args';
    }

    class get_node$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node$args';
    }

    class MyRow extends gc.sdk.GCObject {
      static readonly _type = 'project::MyRow';
      id: number | bigint;
      temp: number;
      data: project.Named;
      constructor(id: number | bigint, temp: number, data: project.Named);
      static createFrom(fields: {id: number | bigint, temp: number, data: project.Named}): MyRow;
    }

    class std_int_max_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_number$args';
    }

    class periodic_task$args extends gc.sdk.GCObject {
      static readonly _type = 'project::periodic_task$args';
    }

    class Foo extends gc.sdk.GCObject {
      static readonly _type = 'project::Foo';
      a: number | bigint | null;
      constructor(a?: number | bigint | null);
      static createFrom(fields: {a?: number | bigint | null}): Foo;
    }

    class identity$args extends gc.sdk.GCObject {
      static readonly _type = 'project::identity$args';
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): identity$args;
    }

    class array2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array2$args';
    }

    class array_mono2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono2$args';
    }

    class testTensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::testTensor$args';
    }

    class array_of_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_int$args';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_int$args;
    }

    class array_container$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_container$args';
      ac: project.ArrayContainer;
      constructor(ac: project.ArrayContainer);
      static createFrom(fields: {ac: project.ArrayContainer}): array_container$args;
    }

    class Confidence extends gc.sdk.GCEnum {
      static readonly _type = 'project::Confidence';
      static readonly $fields: Confidence[];
      key: Confidence.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Confidence.Field, value?: unknown);
      static High: Confidence;
      static Medium: Confidence;
      static Low: Confidence;
    }
    namespace Confidence  {
      type Field = 'High'|'Medium'|'Low';
    }

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      tuple: gc.core.Tuple<any, any>;
      constructor(tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {tuple: gc.core.Tuple<any, any>}): Obj;
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): Person;
    }

    class Named extends gc.sdk.GCObject {
      static readonly _type = 'project::Named';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): Named;
    }

    function map($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function array($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
    function array2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array3($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_mono($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function array_mono2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
    function table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function longTask($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function slowTask($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function computeTask($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function testTensor($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Tensor>;
    function tensor($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor3($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foo($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<project.Foo>;
    function task_with_params(different: string, age: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    function enum_($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function time($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function an_error($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function float_f(f?: number | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function blockingFn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function enumValue($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foobar($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function vtable_test($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<globalThis.Array<any>>>;
    function print_table(table: gc.core.Table, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function fn_pointer($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function identity(v?: any | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<any | null>;
    function array_container(ac: project.ArrayContainer, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function read_stringlit(arr: globalThis.Array<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function contacts(contacts: gc.core.Table<project.Contact>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_int(arr: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_float(arr: globalThis.Array<number>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_string(arr: globalThis.Array<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function boom($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function sensor_table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Sensor>>;
    function geo($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function geos($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function periodic_task($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.PeriodicTask>;
    function create_nodeTimes($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table3($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_bool($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_number($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_bigint($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_number($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_bigint($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function some_table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function gonna_timeout($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_time($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_list($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_index($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_geo($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
  }

  namespace sdk {
    interface GreyCat {
        call(method: 'project::map', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        spawn(method: 'project::map', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::map', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        call(method: 'project::array', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        spawn(method: 'project::array', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        call(method: 'project::array2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::array3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array3', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::array_mono', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        spawn(method: 'project::array_mono', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_mono', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        call(method: 'project::array_mono2', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
        spawn(method: 'project::array_mono2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_mono2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
        call(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::longTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::longTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::longTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::slowTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::slowTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::slowTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::computeTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::computeTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::computeTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::testTensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Tensor>;
        spawn(method: 'project::testTensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::testTensor', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Tensor>;
        call(method: 'project::tensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::tensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::tensor', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::tensor2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::tensor2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::tensor2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::tensor3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::tensor3', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::tensor3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<project.Foo>;
        spawn(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<project.Foo>;
        call(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'project::enum', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::enum', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::enum', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::table2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::table2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::time', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::time', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::an_error', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::an_error', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::an_error', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::float_f', args: [number | null], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::float_f', args: [number | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::float_f', args: [number | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::blockingFn', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::blockingFn', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::blockingFn', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::enumValue', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::enumValue', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::enumValue', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::foobar', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::foobar', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::foobar', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::vtable_test', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<globalThis.Array<any>>>;
        spawn(method: 'project::vtable_test', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::vtable_test', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<globalThis.Array<any>>>;
        call(method: 'project::print_table', args: [gc.core.Table], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::print_table', args: [gc.core.Table], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::print_table', args: [gc.core.Table], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::fn_pointer', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::fn_pointer', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::fn_pointer', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::identity', args: [any | null], signal?: globalThis.AbortSignal): Promise<any | null>;
        spawn(method: 'project::identity', args: [any | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::identity', args: [any | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<any | null>;
        call(method: 'project::array_container', args: [project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array_container', args: [project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_container', args: [project.ArrayContainer], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::read_stringlit', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::contacts', args: [gc.core.Table<project.Contact>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::contacts', args: [gc.core.Table<project.Contact>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::contacts', args: [gc.core.Table<project.Contact>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::array_of_float', args: [globalThis.Array<number>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array_of_float', args: [globalThis.Array<number>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_of_float', args: [globalThis.Array<number>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::array_of_string', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array_of_string', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_of_string', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::boom', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Sensor>>;
        spawn(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::sensor_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Sensor>>;
        call(method: 'project::geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::geo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::geos', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::geos', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::geos', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::periodic_task', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.PeriodicTask>;
        spawn(method: 'project::periodic_task', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::periodic_task', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.PeriodicTask>;
        call(method: 'project::create_nodeTimes', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::create_nodeTimes', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::create_nodeTimes', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::table3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::table3', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_bool', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_bool', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_bool', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_int', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_int_min_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_int_min_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_int_min_number', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_int_min_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_int_min_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_int_min_bigint', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_int_max_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_int_max_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_int_max_number', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::std_int_max_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::std_int_max_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::std_int_max_bigint', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::some_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::some_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::some_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::gonna_timeout', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::gonna_timeout', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::gonna_timeout', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_node', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_node', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_node', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_node_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_node_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_node_time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_node_list', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_node_list', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_node_list', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_node_index', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_node_index', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_node_index', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_node_geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_node_geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_node_geo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::ambiguous', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::ambiguous', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::ambiguous', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::ambiguous2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::ambiguous2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::ambiguous2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
    }
  }

  export import t3f = gc.core.t3f;
  export import str = gc.core.str;
  export import int = gc.core.int;
  export import function_ = gc.core.function_;
  export import NodeInfo = gc.core.NodeInfo;
  export import Tuple = gc.core.Tuple;
  export import GeoCircle = gc.core.GeoCircle;
  export import Array = gc.core.Array;
  export import GeoPoly = gc.core.GeoPoly;
  export import TimeZone = gc.core.TimeZone;
  export import SortOrder = gc.core.SortOrder;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import String = gc.core.String;
  export import t4 = gc.core.t4;
  export import field = gc.core.field;
  export import Map = gc.core.Map;
  export import DurationUnit = gc.core.DurationUnit;
  export import ErrorCode = gc.core.ErrorCode;
  export import t2 = gc.core.t2;
  export import Tensor = gc.core.Tensor;
  export import nodeList = gc.core.nodeList;
  export import GeoBox = gc.core.GeoBox;
  export import type = gc.core.type;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import null_ = gc.core.null_;
  export import Table = gc.core.Table;
  export import char = gc.core.char;
  export import geo = gc.core.geo;
  export import SamplingMode = gc.core.SamplingMode;
  export import nodeTime = gc.core.nodeTime;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import bool = gc.core.bool;
  export import Date = gc.core.Date;
  export import nodeIndex = gc.core.nodeIndex;
  export import Buffer = gc.core.Buffer;
  export import t3 = gc.core.t3;
  export import Error = gc.core.Error;
  export import t2f = gc.core.t2f;
  export import nodeGeo = gc.core.nodeGeo;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import duration = gc.core.duration;
  export import node = gc.core.node;
  export import t4f = gc.core.t4f;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import time = gc.core.time;
  export import float = gc.core.float;
  export import TensorType = gc.core.TensorType;
  export import MathConstants = gc.core.MathConstants;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import User = gc.runtime.User;
  export import StoreStat = gc.runtime.StoreStat;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import CallPerf = gc.runtime.CallPerf;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import Debug = gc.runtime.Debug;
  export import LogLevel = gc.runtime.LogLevel;
  export import Task = gc.runtime.Task;
  export import DebugVariable = gc.runtime.DebugVariable;
  export import LicenseType = gc.runtime.LicenseType;
  export import License = gc.runtime.License;
  export import DebugInfo = gc.runtime.DebugInfo;
  export import Job = gc.runtime.Job;
  export import DebugFrame = gc.runtime.DebugFrame;
  export import Runtime = gc.runtime.Runtime;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import Log = gc.runtime.Log;
  export import System = gc.runtime.System;
  export import UserRole = gc.runtime.UserRole;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import DebugBreakpoint = gc.runtime.DebugBreakpoint;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import UserGroup = gc.runtime.UserGroup;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import CsvColumnInteger = gc.io.CsvColumnInteger;
  export import CsvWriter = gc.io.CsvWriter;
  export import CsvColumn = gc.io.CsvColumn;
  export import CsvFormat = gc.io.CsvFormat;
  export import GcbReader = gc.io.GcbReader;
  export import CsvColumnTime = gc.io.CsvColumnTime;
  export import CsvValidateResult = gc.io.CsvValidateResult;
  export import GcbWriter = gc.io.GcbWriter;
  export import CsvColumnBoolean = gc.io.CsvColumnBoolean;
  export import CsvColumnDuration = gc.io.CsvColumnDuration;
  export import CsvColumnString = gc.io.CsvColumnString;
  export import File = gc.io.File;
  export import JsonReader = gc.io.JsonReader;
  export import Smtp = gc.io.Smtp;
  export import HttpHeader = gc.io.HttpHeader;
  export import SmtpMode = gc.io.SmtpMode;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import CsvSharding = gc.io.CsvSharding;
  export import JsonWriter = gc.io.JsonWriter;
  export import Email = gc.io.Email;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import Reader = gc.io.Reader;
  export import Json = gc.io.Json;
  export import CsvColumnFloat = gc.io.CsvColumnFloat;
  export import TextReader = gc.io.TextReader;
  export import CsvReader = gc.io.CsvReader;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import Url = gc.io.Url;
  export import Http = gc.io.Http;
  export import TextWriter = gc.io.TextWriter;
  export import TextEncoder = gc.io.TextEncoder;
  export import CsvColumnDate = gc.io.CsvColumnDate;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import CsvColumnIgnored = gc.io.CsvColumnIgnored;
  export import Writer = gc.io.Writer;
  export import FileWalker = gc.io.FileWalker;
  export import CsvAnalysis = gc.io.CsvAnalysis;
  export import TimeWindow = gc.util.TimeWindow;
  export import Assert = gc.util.Assert;
  export import Gaussian = gc.util.Gaussian;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import Plot = gc.util.Plot;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import Histogram = gc.util.Histogram;
  export import Stack = gc.util.Stack;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import Quantizer = gc.util.Quantizer;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Random = gc.util.Random;
  export import HistogramStats = gc.util.HistogramStats;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import Queue = gc.util.Queue;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import Crypto = gc.util.Crypto;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import FooBar = gc.project.FooBar;
  export import NameConflict = gc.project.NameConflict;
  export import FloatPrecisionTest = gc.project.FloatPrecisionTest;
  export import CustomType = gc.project.CustomType;
  export import Sensor = gc.project.Sensor;
  export import Bar = gc.project.Bar;
  export import Contact = gc.project.Contact;
  export import ArrayContainer = gc.project.ArrayContainer;
  export import MyRow = gc.project.MyRow;
  export import Foo = gc.project.Foo;
  export import Confidence = gc.project.Confidence;
  export import Obj = gc.project.Obj;
  export import Person = gc.project.Person;
  export import Named = gc.project.Named;
  export import map = gc.project.map;
  export import array = gc.project.array;
  export import array2 = gc.project.array2;
  export import array3 = gc.project.array3;
  export import array_mono = gc.project.array_mono;
  export import array_mono2 = gc.project.array_mono2;
  export import table = gc.project.table;
  export import longTask = gc.project.longTask;
  export import slowTask = gc.project.slowTask;
  export import computeTask = gc.project.computeTask;
  export import testTensor = gc.project.testTensor;
  export import tensor = gc.project.tensor;
  export import tensor2 = gc.project.tensor2;
  export import tensor3 = gc.project.tensor3;
  export import foo = gc.project.foo;
  export import task_with_params = gc.project.task_with_params;
  export import enum_ = gc.project.enum_;
  export import table2 = gc.project.table2;
  export import time = gc.project.time;
  export import an_error = gc.project.an_error;
  export import float_f = gc.project.float_f;
  export import blockingFn = gc.project.blockingFn;
  export import enumValue = gc.project.enumValue;
  export import foobar = gc.project.foobar;
  export import vtable_test = gc.project.vtable_test;
  export import print_table = gc.project.print_table;
  export import fn_pointer = gc.project.fn_pointer;
  export import identity = gc.project.identity;
  export import array_container = gc.project.array_container;
  export import read_stringlit = gc.project.read_stringlit;
  export import contacts = gc.project.contacts;
  export import array_of_int = gc.project.array_of_int;
  export import array_of_float = gc.project.array_of_float;
  export import array_of_string = gc.project.array_of_string;
  export import boom = gc.project.boom;
  export import sensor_table = gc.project.sensor_table;
  export import geo = gc.project.geo;
  export import geos = gc.project.geos;
  export import periodic_task = gc.project.periodic_task;
  export import create_nodeTimes = gc.project.create_nodeTimes;
  export import table3 = gc.project.table3;
  export import std_bool = gc.project.std_bool;
  export import std_int = gc.project.std_int;
  export import std_int_min_number = gc.project.std_int_min_number;
  export import std_int_min_bigint = gc.project.std_int_min_bigint;
  export import std_int_max_number = gc.project.std_int_max_number;
  export import std_int_max_bigint = gc.project.std_int_max_bigint;
  export import some_table = gc.project.some_table;
  export import gonna_timeout = gc.project.gonna_timeout;
  export import get_node = gc.project.get_node;
  export import get_node_time = gc.project.get_node_time;
  export import get_node_list = gc.project.get_node_list;
  export import get_node_index = gc.project.get_node_index;
  export import get_node_geo = gc.project.get_node_geo;
  export import ambiguous = gc.project.ambiguous;
  export import ambiguous2 = gc.project.ambiguous2;
}
