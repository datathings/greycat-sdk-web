// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace project {
    class something$args extends gc.sdk.GCObject {
      static readonly _type = 'project::something$args';
      foo: gc.project.Baz;
      constructor(foo: gc.project.Baz);
      static createFrom(fields: {foo: gc.project.Baz}): something$args;
    }

    class get_node_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_time$args';
    }

    class print_shapes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::print_shapes$args';
      shapes: globalThis.Array<gc.project.Shape>;
      constructor(shapes: globalThis.Array<gc.project.Shape>);
      static createFrom(fields: {shapes: globalThis.Array<gc.project.Shape>}): print_shapes$args;
    }

    class blockingFn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::blockingFn$args';
    }

    class std_int_max_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_bigint$args';
    }

    class Rect extends gc.sdk.GCObject {
      static readonly _type = 'project::Rect';
      area: number;
      constructor(area: number);
      static createFrom(fields: {area: number}): Rect;
    }

    class gonna_timeout$args extends gc.sdk.GCObject {
      static readonly _type = 'project::gonna_timeout$args';
    }

    class array2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array2$args';
    }

    class Foo extends gc.sdk.GCObject {
      static readonly _type = 'project::Foo';
      a: number | bigint | null;
      constructor(a?: number | bigint | null);
      static createFrom(fields: {a?: number | bigint | null}): Foo;
    }

    class Circle extends gc.sdk.GCObject {
      static readonly _type = 'project::Circle';
      area: number;
      constructor(area: number);
      static createFrom(fields: {area: number}): Circle;
    }

    class sensor_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sensor_table$args';
    }

    class Baz extends gc.sdk.GCObject {
      static readonly _type = 'project::Baz';
      a: number | bigint | null;
      b: string;
      constructor(a: number | bigint | null, b: string);
      static createFrom(fields: {a?: number | bigint | null, b: string}): Baz;
    }

    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class array_of_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_int$args';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_int$args;
    }

    class Shape extends gc.sdk.GCObject {
      static readonly _type = 'project::Shape';
      area: number;
    }

    class ambiguous$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous$args';
    }

    class create_nodeTimes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::create_nodeTimes$args';
    }

    class array_container$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_container$args';
      ac: gc.project.ArrayContainer;
      constructor(ac: gc.project.ArrayContainer);
      static createFrom(fields: {ac: gc.project.ArrayContainer}): array_container$args;
    }

    class std_bool$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_bool$args';
    }

    class get_box_string$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_box_string$args';
    }

    class MyRow extends gc.sdk.GCObject {
      static readonly _type = 'project::MyRow';
      id: number | bigint;
      temp: number;
      data: gc.project.Named;
      constructor(id: number | bigint, temp: number, data: gc.project.Named);
      static createFrom(fields: {id: number | bigint, temp: number, data: gc.project.Named}): MyRow;
    }

    class MapParams extends gc.sdk.GCObject {
      static readonly _type = 'project::MapParams';
      feeding_topo: gc.project.FooMap;
      constructor(feeding_topo: gc.project.FooMap);
      static createFrom(fields: {feeding_topo: gc.project.FooMap}): MapParams;
    }

    class GenericType extends gc.sdk.GCObject {
      static readonly _type = 'project::GenericType';
      name: gc.project.SomeName;
    }

    class task_without_result$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_without_result$args';
    }

    class std_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int$args';
    }

    class get_nodes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_nodes$args';
    }

    class Confidence extends gc.sdk.GCEnum {
      static readonly _type = 'project::Confidence';
      static readonly $fields: Confidence[];
      key: Confidence.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Confidence.Field);
      static High: Confidence;
      static Medium: Confidence;
      static Low: Confidence;
    }
    namespace Confidence  {
      type Field = 'High'|'Medium'|'Low';
    }

    class FooMap extends gc.sdk.GCObject {
      static readonly _type = 'project::FooMap';
      name: gc.project.SomeName;
      substations: globalThis.Array<gc.core.node<gc.project.Point>>;
      constructor(name: gc.project.SomeName, substations: globalThis.Array<gc.core.node<gc.project.Point>>);
      static createFrom(fields: {name: gc.project.SomeName, substations: globalThis.Array<gc.core.node<gc.project.Point>>}): FooMap;
    }

    class array_mono$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono$args';
    }

    class FloatPrecisionTest extends gc.sdk.GCObject {
      static readonly _type = 'project::FloatPrecisionTest';
      normal: number;
      precision: number;
      constructor(normal: number, precision: number);
      static createFrom(fields: {normal: number, precision: number}): FloatPrecisionTest;
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

    class float_f$args extends gc.sdk.GCObject {
      static readonly _type = 'project::float_f$args';
      f: number | null;
      constructor(f?: number | null);
      static createFrom(fields: {f?: number | null}): float_f$args;
    }

    class enumValue$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enumValue$args';
    }

    class enum$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enum$args';
    }

    class getPeriod$args extends gc.sdk.GCObject {
      static readonly _type = 'project::getPeriod$args';
      days: gc.core.Tuple<number | bigint, number | bigint> | null;
      constructor(days?: gc.core.Tuple<number | bigint, number | bigint> | null);
      static createFrom(fields: {days?: gc.core.Tuple<number | bigint, number | bigint> | null}): getPeriod$args;
    }

    class Contact extends gc.sdk.GCObject {
      static readonly _type = 'project::Contact';
      firstname: string;
      lastname: string;
      age: number | bigint;
      constructor(firstname: string, lastname: string, age: number | bigint);
      static createFrom(fields: {firstname: string, lastname: string, age: number | bigint}): Contact;
    }

    class std_int_max_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_number$args';
    }

    class Bar<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Bar';
      attr: T | null;
      constructor(attr?: T | null);
      static createFrom<T>(fields: {attr?: T | null}): Bar;
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class boom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::boom$args';
    }

    class time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::time$args';
    }

    class std_int_min_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_number$args';
    }

    class load_within_stub$args extends gc.sdk.GCObject {
      static readonly _type = 'project::load_within_stub$args';
      map: gc.project.MapParams;
      constructor(map: gc.project.MapParams);
      static createFrom(fields: {map: gc.project.MapParams}): load_within_stub$args;
    }

    class string_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::string_list$args';
      list: globalThis.Array<string>;
      constructor(list: globalThis.Array<string>);
      static createFrom(fields: {list: globalThis.Array<string>}): string_list$args;
    }

    class some_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::some_table$args';
    }

    class array_of_float$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_float$args';
      arr: globalThis.Array<number>;
      constructor(arr: globalThis.Array<number>);
      static createFrom(fields: {arr: globalThis.Array<number>}): array_of_float$args;
    }

    class geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geo$args';
    }

    class consume_custom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::consume_custom$args';
      c: gc.project.Custom<string>;
      constructor(c: gc.project.Custom<string>);
      static createFrom(fields: {c: gc.project.Custom<string>}): consume_custom$args;
    }

    class array$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array$args';
    }

    class table2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table2$args';
    }

    class Custom<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Custom';
      x: T;
      constructor(x?: T);
      static createFrom<T>(fields: {x?: T}): Custom;
    }

    class array3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array3$args';
    }

    class get_node_index$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_index$args';
    }

    class fn_pointer$args extends gc.sdk.GCObject {
      static readonly _type = 'project::fn_pointer$args';
    }

    class contacts$args extends gc.sdk.GCObject {
      static readonly _type = 'project::contacts$args';
      contacts: gc.core.Table<gc.project.Contact>;
      constructor(contacts: gc.core.Table<gc.project.Contact>);
      static createFrom(fields: {contacts: gc.core.Table<gc.project.Contact>}): contacts$args;
    }

    class array_mono2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono2$args';
    }

    class get_node_geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_geo$args';
    }

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      tuple: gc.core.Tuple<any, any>;
      constructor(tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {tuple: gc.core.Tuple<any, any>}): Obj;
    }

    class SomeName extends gc.sdk.GCEnum {
      static readonly _type = 'project::SomeName';
      static readonly $fields: SomeName[];
      key: SomeName.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SomeName.Field);
      static aaa: SomeName;
      static foo_bar_baz_plop: SomeName;
      static bbbbbbb: SomeName;
    }
    namespace SomeName  {
      type Field = 'aaa'|'foo_bar_baz_plop'|'bbbbbbb';
    }

    class ArrayContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::ArrayContainer';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): ArrayContainer;
    }

    class List<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::List';
      elements: globalThis.Array<T>;
    }

    class get_box_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_box_int$args';
    }

    class testTensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::testTensor$args';
    }

    class periodic_task$args extends gc.sdk.GCObject {
      static readonly _type = 'project::periodic_task$args';
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      id: string;
      temp: number;
      humidity: number;
      constructor(id: string, temp: number, humidity: number);
      static createFrom(fields: {id: string, temp: number, humidity: number}): Sensor;
    }

    class identity$args extends gc.sdk.GCObject {
      static readonly _type = 'project::identity$args';
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): identity$args;
    }

    class geos$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geos$args';
    }

    class node_string_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::node_string_list$args';
      list: globalThis.Array<gc.core.node<string>>;
      constructor(list: globalThis.Array<gc.core.node<string>>);
      static createFrom(fields: {list: globalThis.Array<gc.core.node<string>>}): node_string_list$args;
    }

    class map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::map$args';
    }

    class computeTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::computeTask$args';
    }

    class get_node$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node$args';
    }

    class get_node_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_list$args';
    }

    class foobar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foobar$args';
    }

    class table3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table3$args';
    }

    class std_int_min_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_bigint$args';
    }

    class tensor3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor3$args';
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
      tz: gc.core.TimeZone;
      name: string;
      int: number | bigint;
      foo: gc.project.FooBar | null;
      values: globalThis.Array<any>;
      constructor(tz: gc.core.TimeZone, name: string, int: number | bigint, foo: gc.project.FooBar | null, values: globalThis.Array<any>);
      static createFrom(fields: {tz: gc.core.TimeZone, name: string, int: number | bigint, foo?: gc.project.FooBar | null, values: globalThis.Array<any>}): FooBar;
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): Person;
    }

    class NameConflict extends gc.sdk.GCEnum {
      static readonly _type = 'project::NameConflict';
      static readonly $fields: NameConflict[];
      key: NameConflict.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: NameConflict.Field);
      static name: NameConflict;
    }
    namespace NameConflict  {
      type Field = 'name';
    }

    class vtable_test$args extends gc.sdk.GCObject {
      static readonly _type = 'project::vtable_test$args';
    }

    class tensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor$args';
    }

    class array_of_string$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_string$args';
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): array_of_string$args;
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      different: string;
      age: number | bigint;
      constructor(different: string, age: number | bigint);
      static createFrom(fields: {different: string, age: number | bigint}): task_with_params$args;
    }

    class longTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::longTask$args';
    }

    class tensor2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor2$args';
    }

    class Named extends gc.sdk.GCObject {
      static readonly _type = 'project::Named';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): Named;
    }

    class ambiguous2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous2$args';
    }

    class an_error$args extends gc.sdk.GCObject {
      static readonly _type = 'project::an_error$args';
    }

    class Box<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Box';
      value: T;
      constructor(value?: T);
      static createFrom<T>(fields: {value?: T}): Box;
    }

    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      "project::n": gc.core.node<string | null>;
      "project::nt": gc.core.nodeTime<string>;
      "project::nl": gc.core.nodeList<string>;
      "project::ni": gc.core.nodeIndex<string, number>;
      "project::ng": gc.core.nodeGeo<string>;
    }

    class Point extends gc.sdk.GCObject {
      static readonly _type = 'project::Point';
      x: number | bigint;
      y: number | bigint;
      constructor(x: number | bigint, y: number | bigint);
      static createFrom(fields: {x: number | bigint, y: number | bigint}): Point;
    }

    class slowTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::slowTask$args';
    }

    class read_stringlit$args extends gc.sdk.GCObject {
      static readonly _type = 'project::read_stringlit$args';
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): read_stringlit$args;
    }

    class print_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::print_table$args';
      table: gc.core.Table;
      constructor(table: gc.core.Table);
      static createFrom(fields: {table: gc.core.Table}): print_table$args;
    }

    function map(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function array(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
    function array2(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array3(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_mono(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function array_mono2(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
    function table(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function longTask(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function slowTask(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function computeTask(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function testTensor(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Tensor>;
    function tensor(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor2(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor3(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foo(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.project.Foo>;
    function task_with_params(different: string, age: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    function task_without_result(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function enum_(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table2(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function time(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function an_error(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function float_f(f?: number | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function blockingFn(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function enumValue(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foobar(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function vtable_test(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<globalThis.Array<any>>>;
    function print_table(table: gc.core.Table, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function fn_pointer(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function identity(v?: any | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<any | null>;
    function array_container(ac: gc.project.ArrayContainer, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function read_stringlit(arr: globalThis.Array<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function contacts(contacts: gc.core.Table<gc.project.Contact>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_int(arr: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_float(arr: globalThis.Array<number>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_string(arr: globalThis.Array<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function boom(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function sensor_table(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Sensor>>;
    function geo(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function geos(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function periodic_task(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.PeriodicTask>;
    function create_nodeTimes(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table3(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_bool(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_number(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_bigint(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_number(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_bigint(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function some_table(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function gonna_timeout(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_time(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_list(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_index(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_geo(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous2(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function something(foo: gc.project.Baz, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.project.Baz>;
    function getPeriod(days?: gc.core.Tuple<number | bigint, number | bigint> | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function consume_custom(c: gc.project.Custom<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_nodes(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<gc.project.Point>>>;
    function load_within_stub(map: gc.project.MapParams, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function print_shapes(shapes: globalThis.Array<gc.project.Shape>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function string_list(list: globalThis.Array<string>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function node_string_list(list: globalThis.Array<gc.core.node<string>>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_box_string(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.project.Box<string>>;
    function get_box_int(, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.project.Box<number | bigint>>;
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
        call(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.project.Foo>;
        spawn(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.project.Foo>;
        call(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'project::task_without_result', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::task_without_result', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_without_result', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
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
        call(method: 'project::array_container', args: [gc.project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::array_container', args: [gc.project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_container', args: [gc.project.ArrayContainer], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::read_stringlit', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::contacts', args: [gc.core.Table<gc.project.Contact>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::contacts', args: [gc.core.Table<gc.project.Contact>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::contacts', args: [gc.core.Table<gc.project.Contact>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
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
        call(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Sensor>>;
        spawn(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::sensor_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Sensor>>;
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
        call(method: 'project::something', args: [gc.project.Baz], signal?: globalThis.AbortSignal): Promise<gc.project.Baz>;
        spawn(method: 'project::something', args: [gc.project.Baz], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::something', args: [gc.project.Baz], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.project.Baz>;
        call(method: 'project::getPeriod', args: [gc.core.Tuple<number | bigint, number | bigint> | null], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::getPeriod', args: [gc.core.Tuple<number | bigint, number | bigint> | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::getPeriod', args: [gc.core.Tuple<number | bigint, number | bigint> | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::consume_custom', args: [gc.project.Custom<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::consume_custom', args: [gc.project.Custom<string>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::consume_custom', args: [gc.project.Custom<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_nodes', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<gc.project.Point>>>;
        spawn(method: 'project::get_nodes', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_nodes', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<gc.project.Point>>>;
        call(method: 'project::load_within_stub', args: [gc.project.MapParams], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::load_within_stub', args: [gc.project.MapParams], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::load_within_stub', args: [gc.project.MapParams], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::print_shapes', args: [globalThis.Array<gc.project.Shape>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::print_shapes', args: [globalThis.Array<gc.project.Shape>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::print_shapes', args: [globalThis.Array<gc.project.Shape>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::string_list', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::string_list', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::string_list', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::node_string_list', args: [globalThis.Array<gc.core.node<string>>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::node_string_list', args: [globalThis.Array<gc.core.node<string>>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::node_string_list', args: [globalThis.Array<gc.core.node<string>>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_box_string', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.project.Box<string>>;
        spawn(method: 'project::get_box_string', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_box_string', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.project.Box<string>>;
        call(method: 'project::get_box_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.project.Box<number | bigint>>;
        spawn(method: 'project::get_box_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_box_int', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.project.Box<number | bigint>>;
    }
  }
  interface $TypesMap {
    'core::ErrorCode': 0,
    'core::t4': 0,
    'core::Array<core::any?>': 0,
    'core::Array<core::geo>': 0,
    'core::Table': 0,
    'core::t3': 0,
    'core::nodeIndex': 0,
    'core::GeoCircle': 0,
    'core::nodeTime$info$args': 0,
    'core::TimeZone': 0,
    'core::Array<core::float>': 0,
    'core::Table<project::Contact>': 0,
    'core::t2': 0,
    'core::nodeList$sample$args': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::Array<io::HttpHeader>': 0,
    'core::String': 0,
    'core::Array<runtime::SecurityEntity>': 0,
    'core::Array<core::node<project::Point>>': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::GeoBox': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::t4f': 0,
    'core::Array<core::node<core::String>>': 0,
    'core::Array<core::int?>': 0,
    'core::Map<core::any,core::any>': 0,
    'core::Tuple<core::any,core::any>': 0,
    'core::CalendarUnit': 0,
    'core::field': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::Array<runtime::Task>': 0,
    'core::Buffer': 0,
    'core::nodeList<core::String>': 0,
    'core::Array<runtime::Job>': 0,
    'core::Array<util::Quantizer>': 0,
    'core::nodeList': 0,
    'core::Array<core::node?>': 0,
    'core::Table<core::any>': 0,
    'core::Array<runtime::Variable>': 0,
    'core::nodeTime': 0,
    'core::Array<core::any>': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::Map<core::String,runtime::UserCredential>': 0,
    'core::Tuple<core::String,core::String>': 0,
    'core::duration': 0,
    'core::Tensor': 0,
    'core::Array<core::nodeTime>': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::nodeGeo<core::CalendarUnit>': 0,
    'core::nodeTimeSingleton': 0,
    'core::Date$from_time$args': 0,
    'core::NodeInfo': 0,
    'core::SortOrder': 0,
    'core::Map<core::String,core::int>': 0,
    'core::nodeIndex<core::Tuple,core::any?>': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::Array<core::String>': 0,
    'core::t3f': 0,
    'core::MathConstants': 0,
    'core::node<core::String?>': 0,
    'core::type': 0,
    'core::null': 0,
    'core::SamplingMode': 0,
    'core::geo': 0,
    'core::Map': 0,
    'core::Error': 0,
    'core::nodeTimeCursor': 0,
    'core::node<core::String>': 0,
    'core::Table<project::MyRow>': 0,
    'core::nodeGeo': 0,
    'core::NodeInfo<core::int>': 0,
    'core::Map<core::any,core::any?>': 0,
    'core::Array<runtime::UserCredential>': 0,
    'core::Table$applyMappings$args': 0,
    'core::nodeList$info$args': 0,
    'core::node': 0,
    'core::DurationUnit': 0,
    'core::Array<runtime::UserGroupPolicy>': 0,
    'core::nodeTime<core::String>': 0,
    'core::TableColumnMapping': 0,
    'core::TensorType': 0,
    'core::Array<core::int>': 0,
    'core::Tuple': 0,
    'core::Array<core::bool>': 0,
    'core::time': 0,
    'core::nodeList<core::int>': 0,
    'core::bool': 0,
    'core::Map<core::any,core::int>': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::Tuple<core::time,core::String>': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::ErrorFrame': 0,
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::node$resolve_all$args': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::Array<project::Named>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::nodeIndex<core::String,core::float>': 0,
    'core::nodeGeo$info$args': 0,
    'core::Table<project::Sensor>': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::Array<core::field>': 0,
    'core::Array<core::nodeList>': 0,
    'core::Array': 0,
    'core::nodeTime<core::nodeGeo>': 0,
    'core::Array<project::Shape>': 0,
    'core::Map<core::String,core::String>': 0,
    'core::Array<runtime::Permission>': 0,
    'core::GeoPoly': 0,
    'core::FloatPrecision': 0,
    'core::Tuple<core::int,core::int>': 0,
    'core::any': 0,
    'core::char': 0,
    'core::NodeInfo<core::time>': 0,
    'core::float': 0,
    'core::Array<runtime::Frame>': 0,
    'core::nodeGeo$sample$args': 0,
    'core::node<core::int>': 0,
    'core::int': 0,
    'core::node<core::float>': 0,
    'core::t2f': 0,
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::Tuple<core::time,core::nodeGeo>': 0,
    'core::Array<runtime::Role>': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::Tuple<core::time,core::int>': 0,
    'core::Date': 0,
    'core::function': 0,
    'core::nodeGeo<core::String>': 0,
    'core::nodeIndex$info$args': 0,
    'core::Table<core::Array<core::any>>': 0,
    'core::str': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::nodeTime$sample$args': 0,
    'core::node<project::Point>': 0,
    'core::nodeTime<core::int>': 0,
    'core::Array<io::File>': 0,
    'runtime::User$tokenLogin$args': 0,
    'runtime::PeriodicTask$all$args': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::TaskStatus': 0,
    'runtime::SecurityFields': 0,
    'runtime::Task$running$args': 0,
    'runtime::SecurityPolicy': 0,
    'runtime::OpenIDConnect$config$args': 0,
    'runtime::User': 0,
    'runtime::User$setPassword$args': 0,
    'runtime::LogLevel': 0,
    'runtime::User$login$args': 0,
    'runtime::SecurityFields$get$args': 0,
    'runtime::MergeStrategy': 0,
    'runtime::License': 0,
    'runtime::User$logout$args': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::Frame': 0,
    'runtime::UserGroup': 0,
    'runtime::Debug': 0,
    'runtime::Role': 0,
    'runtime::Task$history$args': 0,
    'runtime::PeriodicTask': 0,
    'runtime::UserGroupPolicyType': 0,
    'runtime::User$renew$args': 0,
    'runtime::User$permissions$args': 0,
    'runtime::LicenseType': 0,
    'runtime::Permission$all$args': 0,
    'runtime::Variable': 0,
    'runtime::Log': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::Permission': 0,
    'runtime::Task': 0,
    'runtime::CallPerf': 0,
    'runtime::SecurityEntity': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::User$me$args': 0,
    'runtime::PeriodicTask$set$args': 0,
    'runtime::Runtime': 0,
    'runtime::SecurityEntity$set$args': 0,
    'runtime::Debug$get$args': 0,
    'runtime::UserGroupPolicy': 0,
    'runtime::Debug$all$args': 0,
    'runtime::OpenIDConnect': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::Job': 0,
    'runtime::SecurityFields$set$args': 0,
    'runtime::Task$cancel$args': 0,
    'runtime::User$current$args': 0,
    'runtime::SecurityEntity$all$args': 0,
    'runtime::System': 0,
    'runtime::UserCredential': 0,
    'runtime::Role$all$args': 0,
    'io::CsvStatistics': 0,
    'io::TextWriter': 0,
    'io::CsvSharding': 0,
    'io::JsonWriter': 0,
    'io::Csv$analyze$args': 0,
    'io::Csv': 0,
    'io::Reader<core::String>': 0,
    'io::CsvAnalysisConfig': 0,
    'io::GcbReader': 0,
    'io::TextReader': 0,
    'io::JsonReader': 0,
    'io::SmtpAuth': 0,
    'io::Csv$generate$args': 0,
    'io::HttpHeader': 0,
    'io::SmtpMode': 0,
    'io::Writer': 0,
    'io::Reader': 0,
    'io::Email': 0,
    'io::GcbWriter': 0,
    'io::CsvColumnStatistics': 0,
    'io::Csv$sample$args': 0,
    'io::Url': 0,
    'io::Http': 0,
    'io::Json': 0,
    'io::CsvFormat': 0,
    'io::File': 0,
    'io::CsvReader': 0,
    'io::CsvWriter': 0,
    'io::FileWalker': 0,
    'io::Smtp': 0,
    'util::Quantizer': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::HistogramBin': 0,
    'util::Crypto': 0,
    'util::MultiQuantizer': 0,
    'util::Quantizer<core::Array>': 0,
    'util::TimeWindow': 0,
    'util::Histogram': 0,
    'util::SlidingWindow': 0,
    'util::Random': 0,
    'util::GaussianProfile': 0,
    'util::Queue<core::int>': 0,
    'util::HistogramStats': 0,
    'util::GaussianProfileSlot': 0,
    'util::Stack': 0,
    'util::Gaussian': 0,
    'util::QuantizerSlotBound': 0,
    'util::LinearQuantizer': 0,
    'util::CustomQuantizer': 0,
    'util::Assert': 0,
    'util::Stack<core::String>': 0,
    'util::LogQuantizer': 0,
    'util::Plot': 0,
    'util::Queue': 0,
    'util::ProgressTracker': 0,
    'project::something$args': 0,
    'project::get_node_time$args': 0,
    'project::print_shapes$args': 0,
    'project::blockingFn$args': 0,
    'project::std_int_max_bigint$args': 0,
    'project::Rect': 0,
    'project::gonna_timeout$args': 0,
    'project::array2$args': 0,
    'project::Custom<core::String>': 0,
    'project::Foo': 0,
    'project::Circle': 0,
    'project::sensor_table$args': 0,
    'project::Baz': 0,
    'project::table$args': 0,
    'project::array_of_int$args': 0,
    'project::Shape': 0,
    'project::ambiguous$args': 0,
    'project::create_nodeTimes$args': 0,
    'project::array_container$args': 0,
    'project::std_bool$args': 0,
    'project::get_box_string$args': 0,
    'project::MyRow': 0,
    'project::MapParams': 0,
    'project::GenericType': 0,
    'project::task_without_result$args': 0,
    'project::std_int$args': 0,
    'project::get_nodes$args': 0,
    'project::Confidence': 0,
    'project::FooMap': 0,
    'project::array_mono$args': 0,
    'project::FloatPrecisionTest': 0,
    'project::CustomType': 0,
    'project::float_f$args': 0,
    'project::enumValue$args': 0,
    'project::enum$args': 0,
    'project::getPeriod$args': 0,
    'project::Contact': 0,
    'project::std_int_max_number$args': 0,
    'project::Bar': 0,
    'project::foo$args': 0,
    'project::boom$args': 0,
    'project::time$args': 0,
    'project::std_int_min_number$args': 0,
    'project::load_within_stub$args': 0,
    'project::string_list$args': 0,
    'project::some_table$args': 0,
    'project::array_of_float$args': 0,
    'project::geo$args': 0,
    'project::consume_custom$args': 0,
    'project::array$args': 0,
    'project::table2$args': 0,
    'project::Custom': 0,
    'project::array3$args': 0,
    'project::get_node_index$args': 0,
    'project::fn_pointer$args': 0,
    'project::contacts$args': 0,
    'project::array_mono2$args': 0,
    'project::get_node_geo$args': 0,
    'project::Obj': 0,
    'project::SomeName': 0,
    'project::ArrayContainer': 0,
    'project::List': 0,
    'project::get_box_int$args': 0,
    'project::testTensor$args': 0,
    'project::periodic_task$args': 0,
    'project::Sensor': 0,
    'project::identity$args': 0,
    'project::geos$args': 0,
    'project::node_string_list$args': 0,
    'project::map$args': 0,
    'project::computeTask$args': 0,
    'project::get_node$args': 0,
    'project::get_node_list$args': 0,
    'project::Box<core::String>': 0,
    'project::foobar$args': 0,
    'project::table3$args': 0,
    'project::std_int_min_bigint$args': 0,
    'project::tensor3$args': 0,
    'project::FooBar': 0,
    'project::Person': 0,
    'project::NameConflict': 0,
    'project::vtable_test$args': 0,
    'project::tensor$args': 0,
    'project::array_of_string$args': 0,
    'project::task_with_params$args': 0,
    'project::longTask$args': 0,
    'project::tensor2$args': 0,
    'project::Named': 0,
    'project::ambiguous2$args': 0,
    'project::an_error$args': 0,
    'project::Box': 0,
    'project::Root': 0,
    'project::Point': 0,
    'project::Box<core::int>': 0,
    'project::slowTask$args': 0,
    'project::read_stringlit$args': 0,
    'project::print_table$args': 0,
  }

  interface $FieldsMap {
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::nodeTimeSingleton::t': 0,
    'core::nodeTimeSingleton::v': 0,
    'core::Date$from_time$args::time': 0,
    'core::Date$from_time$args::tz': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeTimeCursor::req_time': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::nodeList$info$args::nodes': 0,
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::node$resolve_all$args::n': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'core::nodeGeo$info$args::nodes': 0,
    'core::GeoPoly::points': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'runtime::User$tokenLogin$args::token': 0,
    'runtime::User$tokenLogin$args::use_cookie': 0,
    'runtime::RuntimeInfo::version': 0,
    'runtime::RuntimeInfo::program_version': 0,
    'runtime::RuntimeInfo::arch': 0,
    'runtime::RuntimeInfo::timezone': 0,
    'runtime::RuntimeInfo::license': 0,
    'runtime::RuntimeInfo::io_threads': 0,
    'runtime::RuntimeInfo::bg_threads': 0,
    'runtime::RuntimeInfo::fg_threads': 0,
    'runtime::RuntimeInfo::mem_total': 0,
    'runtime::RuntimeInfo::mem_worker': 0,
    'runtime::RuntimeInfo::disk_data_bytes': 0,
    'runtime::SecurityFields::email': 0,
    'runtime::SecurityFields::name': 0,
    'runtime::SecurityFields::first_name': 0,
    'runtime::SecurityFields::last_name': 0,
    'runtime::SecurityFields::roles': 0,
    'runtime::SecurityFields::groups': 0,
    'runtime::SecurityPolicy::entities': 0,
    'runtime::SecurityPolicy::credentials': 0,
    'runtime::SecurityPolicy::fields': 0,
    'runtime::SecurityPolicy::keys': 0,
    'runtime::SecurityPolicy::keys_last_refresh': 0,
    'runtime::User::id': 0,
    'runtime::User::name': 0,
    'runtime::User::activated': 0,
    'runtime::User::full_name': 0,
    'runtime::User::email': 0,
    'runtime::User::role': 0,
    'runtime::User::groups': 0,
    'runtime::User::groups_flags': 0,
    'runtime::User::external': 0,
    'runtime::User$setPassword$args::name': 0,
    'runtime::User$setPassword$args::pass': 0,
    'runtime::User$login$args::credentials': 0,
    'runtime::User$login$args::use_cookie': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::Frame::module': 0,
    'runtime::Frame::type': 0,
    'runtime::Frame::function': 0,
    'runtime::Frame::src': 0,
    'runtime::Frame::line': 0,
    'runtime::Frame::column': 0,
    'runtime::Frame::scope': 0,
    'runtime::UserGroup::id': 0,
    'runtime::UserGroup::name': 0,
    'runtime::UserGroup::activated': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::user_id': 0,
    'runtime::PeriodicTask::arguments': 0,
    'runtime::PeriodicTask::start': 0,
    'runtime::PeriodicTask::every': 0,
    'runtime::User$renew$args::use_cookie': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::tag': 0,
    'runtime::Log::data': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::Task::user_id': 0,
    'runtime::Task::task_id': 0,
    'runtime::Task::mod': 0,
    'runtime::Task::type': 0,
    'runtime::Task::fun': 0,
    'runtime::Task::creation': 0,
    'runtime::Task::start': 0,
    'runtime::Task::duration': 0,
    'runtime::Task::status': 0,
    'runtime::Task::progress': 0,
    'runtime::CallPerf::duration': 0,
    'runtime::CallPerf::bytes_write_disk': 0,
    'runtime::CallPerf::bytes_write_disk_raw': 0,
    'runtime::CallPerf::bytes_read_disk': 0,
    'runtime::CallPerf::bytes_read_disk_raw': 0,
    'runtime::CallPerf::bytes_read_cache': 0,
    'runtime::Task$is_running$args::task_id': 0,
    'runtime::PeriodicTask$set$args::tasks': 0,
    'runtime::SecurityEntity$set$args::entity': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::UserGroupPolicy::group_id': 0,
    'runtime::UserGroupPolicy::type': 0,
    'runtime::OpenIDConnect::url': 0,
    'runtime::OpenIDConnect::clientId': 0,
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::SecurityFields$set$args::f': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'runtime::UserCredential::offset': 0,
    'runtime::UserCredential::pass': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::Csv$analyze$args::files': 0,
    'io::Csv$analyze$args::config': 0,
    'io::CsvAnalysisConfig::header_lines': 0,
    'io::CsvAnalysisConfig::separator': 0,
    'io::CsvAnalysisConfig::string_delimiter': 0,
    'io::CsvAnalysisConfig::decimal_separator': 0,
    'io::CsvAnalysisConfig::thousands_separator': 0,
    'io::CsvAnalysisConfig::row_limit': 0,
    'io::CsvAnalysisConfig::enumerable_limit': 0,
    'io::CsvAnalysisConfig::date_check_limit': 0,
    'io::CsvAnalysisConfig::date_formats': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::Csv$generate$args::stats': 0,
    'io::HttpHeader::name': 0,
    'io::HttpHeader::value': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'io::CsvColumnStatistics::name': 0,
    'io::CsvColumnStatistics::example': 0,
    'io::CsvColumnStatistics::null_count': 0,
    'io::CsvColumnStatistics::bool_count': 0,
    'io::CsvColumnStatistics::int_count': 0,
    'io::CsvColumnStatistics::float_count': 0,
    'io::CsvColumnStatistics::string_count': 0,
    'io::CsvColumnStatistics::date_count': 0,
    'io::CsvColumnStatistics::date_format_count': 0,
    'io::CsvColumnStatistics::enumerable_count': 0,
    'io::CsvColumnStatistics::profile': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::CsvFormat::header_lines': 0,
    'io::CsvFormat::separator': 0,
    'io::CsvFormat::string_delimiter': 0,
    'io::CsvFormat::decimal_separator': 0,
    'io::CsvFormat::thousands_separator': 0,
    'io::CsvFormat::trim': 0,
    'io::CsvFormat::format': 0,
    'io::CsvFormat::tz': 0,
    'io::CsvFormat::strict': 0,
    'io::CsvFormat::nearest_time': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'io::FileWalker::path': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::TimeWindow::values': 0,
    'util::TimeWindow::span': 0,
    'util::TimeWindow::sum': 0,
    'util::TimeWindow::sumsq': 0,
    'util::TimeWindow::field': 0,
    'util::Histogram::quantizer': 0,
    'util::Histogram::bins': 0,
    'util::Histogram::nb_rejected': 0,
    'util::Histogram::nb_accepted': 0,
    'util::Histogram::min': 0,
    'util::Histogram::max': 0,
    'util::Histogram::sum': 0,
    'util::Histogram::sumsq': 0,
    'util::SlidingWindow::values': 0,
    'util::SlidingWindow::span': 0,
    'util::SlidingWindow::sum': 0,
    'util::SlidingWindow::sumsq': 0,
    'util::SlidingWindow::field': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::HistogramStats::min': 0,
    'util::HistogramStats::max': 0,
    'util::HistogramStats::whisker_low': 0,
    'util::HistogramStats::whisker_high': 0,
    'util::HistogramStats::percentile1': 0,
    'util::HistogramStats::percentile5': 0,
    'util::HistogramStats::percentile10': 0,
    'util::HistogramStats::percentile20': 0,
    'util::HistogramStats::percentile25': 0,
    'util::HistogramStats::percentile50': 0,
    'util::HistogramStats::percentile75': 0,
    'util::HistogramStats::percentile80': 0,
    'util::HistogramStats::percentile90': 0,
    'util::HistogramStats::percentile95': 0,
    'util::HistogramStats::percentile99': 0,
    'util::HistogramStats::sum': 0,
    'util::HistogramStats::avg': 0,
    'util::HistogramStats::std': 0,
    'util::HistogramStats::size': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
    'util::Stack::values': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
    'util::LinearQuantizer::min': 0,
    'util::LinearQuantizer::max': 0,
    'util::LinearQuantizer::bins': 0,
    'util::LinearQuantizer::open': 0,
    'util::CustomQuantizer::min': 0,
    'util::CustomQuantizer::max': 0,
    'util::CustomQuantizer::step_starts': 0,
    'util::CustomQuantizer::open': 0,
    'util::LogQuantizer::min': 0,
    'util::LogQuantizer::max': 0,
    'util::LogQuantizer::bins': 0,
    'util::LogQuantizer::open': 0,
    'util::Queue::values': 0,
    'util::Queue::capacity': 0,
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'project::something$args::foo': 0,
    'project::print_shapes$args::shapes': 0,
    'project::Rect::area': 0,
    'project::Foo::a': 0,
    'project::Circle::area': 0,
    'project::Baz::a': 0,
    'project::Baz::b': 0,
    'project::array_of_int$args::arr': 0,
    'project::array_container$args::ac': 0,
    'project::MyRow::id': 0,
    'project::MyRow::temp': 0,
    'project::MyRow::data': 0,
    'project::MapParams::feeding_topo': 0,
    'project::FooMap::name': 0,
    'project::FooMap::substations': 0,
    'project::FloatPrecisionTest::normal': 0,
    'project::FloatPrecisionTest::precision': 0,
    'project::CustomType::string': 0,
    'project::CustomType::int': 0,
    'project::CustomType::float': 0,
    'project::CustomType::bool': 0,
    'project::CustomType::char': 0,
    'project::CustomType::enum': 0,
    'project::float_f$args::f': 0,
    'project::getPeriod$args::days': 0,
    'project::Contact::firstname': 0,
    'project::Contact::lastname': 0,
    'project::Contact::age': 0,
    'project::Bar::attr': 0,
    'project::load_within_stub$args::map': 0,
    'project::string_list$args::list': 0,
    'project::array_of_float$args::arr': 0,
    'project::consume_custom$args::c': 0,
    'project::Custom::x': 0,
    'project::contacts$args::contacts': 0,
    'project::Obj::tuple': 0,
    'project::ArrayContainer::arr': 0,
    'project::Sensor::id': 0,
    'project::Sensor::temp': 0,
    'project::Sensor::humidity': 0,
    'project::identity$args::v': 0,
    'project::node_string_list$args::list': 0,
    'project::FooBar::tz': 0,
    'project::FooBar::name': 0,
    'project::FooBar::int': 0,
    'project::FooBar::foo': 0,
    'project::FooBar::values': 0,
    'project::Person::name': 0,
    'project::Person::age': 0,
    'project::array_of_string$args::arr': 0,
    'project::task_with_params$args::different': 0,
    'project::task_with_params$args::age': 0,
    'project::Named::name': 0,
    'project::Box::value': 0,
    'project::Point::x': 0,
    'project::Point::y': 0,
    'project::read_stringlit$args::arr': 0,
    'project::print_table$args::table': 0,
  }

  interface $FunctionsMap {
    'core::Table::applyMappings': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'core::node::resolve_all': 0,
    'core::Date::from_time': 0,
    'runtime::SecurityFields::get': 0,
    'runtime::SecurityFields::set': 0,
    'runtime::User::setPassword': 0,
    'runtime::User::permissions': 0,
    'runtime::User::me': 0,
    'runtime::User::current': 0,
    'runtime::User::renew': 0,
    'runtime::User::logout': 0,
    'runtime::User::tokenLogin': 0,
    'runtime::User::login': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
    'runtime::Role::all': 0,
    'runtime::PeriodicTask::set': 0,
    'runtime::PeriodicTask::all': 0,
    'runtime::Permission::all': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::SecurityEntity::set': 0,
    'runtime::SecurityEntity::all': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::info': 0,
    'runtime::OpenIDConnect::config': 0,
    'io::Csv::sample': 0,
    'io::Csv::analyze': 0,
    'io::Csv::generate': 0,
    'project::map': 0,
    'project::array': 0,
    'project::array2': 0,
    'project::array3': 0,
    'project::array_mono': 0,
    'project::array_mono2': 0,
    'project::table': 0,
    'project::longTask': 0,
    'project::slowTask': 0,
    'project::computeTask': 0,
    'project::testTensor': 0,
    'project::tensor': 0,
    'project::tensor2': 0,
    'project::tensor3': 0,
    'project::foo': 0,
    'project::task_with_params': 0,
    'project::task_without_result': 0,
    'project::enum': 0,
    'project::table2': 0,
    'project::time': 0,
    'project::an_error': 0,
    'project::float_f': 0,
    'project::blockingFn': 0,
    'project::enumValue': 0,
    'project::foobar': 0,
    'project::vtable_test': 0,
    'project::print_table': 0,
    'project::fn_pointer': 0,
    'project::identity': 0,
    'project::array_container': 0,
    'project::read_stringlit': 0,
    'project::contacts': 0,
    'project::array_of_int': 0,
    'project::array_of_float': 0,
    'project::array_of_string': 0,
    'project::boom': 0,
    'project::sensor_table': 0,
    'project::geo': 0,
    'project::geos': 0,
    'project::periodic_task': 0,
    'project::create_nodeTimes': 0,
    'project::table3': 0,
    'project::std_bool': 0,
    'project::std_int': 0,
    'project::std_int_min_number': 0,
    'project::std_int_min_bigint': 0,
    'project::std_int_max_number': 0,
    'project::std_int_max_bigint': 0,
    'project::some_table': 0,
    'project::gonna_timeout': 0,
    'project::get_node': 0,
    'project::get_node_time': 0,
    'project::get_node_list': 0,
    'project::get_node_index': 0,
    'project::get_node_geo': 0,
    'project::ambiguous': 0,
    'project::ambiguous2': 0,
    'project::something': 0,
    'project::getPeriod': 0,
    'project::consume_custom': 0,
    'project::get_nodes': 0,
    'project::load_within_stub': 0,
    'project::print_shapes': 0,
    'project::string_list': 0,
    'project::node_string_list': 0,
    'project::get_box_string': 0,
    'project::get_box_int': 0,
  }

  export import ErrorCode = gc.core.ErrorCode;
  export import t4 = gc.core.t4;
  export import Table = gc.core.Table;
  export import t3 = gc.core.t3;
  export import nodeIndex = gc.core.nodeIndex;
  export import GeoCircle = gc.core.GeoCircle;
  export import TimeZone = gc.core.TimeZone;
  export import t2 = gc.core.t2;
  export import String = gc.core.String;
  export import GeoBox = gc.core.GeoBox;
  export import t4f = gc.core.t4f;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import field = gc.core.field;
  export import Buffer = gc.core.Buffer;
  export import nodeList = gc.core.nodeList;
  export import nodeTime = gc.core.nodeTime;
  export import duration = gc.core.duration;
  export import Tensor = gc.core.Tensor;
  export import NodeInfo = gc.core.NodeInfo;
  export import SortOrder = gc.core.SortOrder;
  export import t3f = gc.core.t3f;
  export import MathConstants = gc.core.MathConstants;
  export import type = gc.core.type;
  export import null_ = gc.core.null_;
  export import SamplingMode = gc.core.SamplingMode;
  export import geo = gc.core.geo;
  export import Map = gc.core.Map;
  export import Error = gc.core.Error;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import nodeGeo = gc.core.nodeGeo;
  export import node = gc.core.node;
  export import DurationUnit = gc.core.DurationUnit;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import TensorType = gc.core.TensorType;
  export import Tuple = gc.core.Tuple;
  export import time = gc.core.time;
  export import bool = gc.core.bool;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import Array = gc.core.Array;
  export import GeoPoly = gc.core.GeoPoly;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import char = gc.core.char;
  export import float = gc.core.float;
  export import int = gc.core.int;
  export import t2f = gc.core.t2f;
  export import Date = gc.core.Date;
  export import function_ = gc.core.function_;
  export import str = gc.core.str;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import User = gc.runtime.User;
  export import LogLevel = gc.runtime.LogLevel;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import License = gc.runtime.License;
  export import UserGroup = gc.runtime.UserGroup;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import LicenseType = gc.runtime.LicenseType;
  export import Log = gc.runtime.Log;
  export import Task = gc.runtime.Task;
  export import CallPerf = gc.runtime.CallPerf;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import Runtime = gc.runtime.Runtime;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import Job = gc.runtime.Job;
  export import System = gc.runtime.System;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import TextWriter = gc.io.TextWriter;
  export import CsvSharding = gc.io.CsvSharding;
  export import JsonWriter = gc.io.JsonWriter;
  export import Csv = gc.io.Csv;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import GcbReader = gc.io.GcbReader;
  export import TextReader = gc.io.TextReader;
  export import JsonReader = gc.io.JsonReader;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import HttpHeader = gc.io.HttpHeader;
  export import SmtpMode = gc.io.SmtpMode;
  export import Writer = gc.io.Writer;
  export import Reader = gc.io.Reader;
  export import Email = gc.io.Email;
  export import GcbWriter = gc.io.GcbWriter;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import Url = gc.io.Url;
  export import Http = gc.io.Http;
  export import Json = gc.io.Json;
  export import CsvFormat = gc.io.CsvFormat;
  export import File = gc.io.File;
  export import CsvReader = gc.io.CsvReader;
  export import CsvWriter = gc.io.CsvWriter;
  export import FileWalker = gc.io.FileWalker;
  export import Smtp = gc.io.Smtp;
  export import Quantizer = gc.util.Quantizer;
  export import HistogramBin = gc.util.HistogramBin;
  export import Crypto = gc.util.Crypto;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import TimeWindow = gc.util.TimeWindow;
  export import Histogram = gc.util.Histogram;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import Random = gc.util.Random;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import HistogramStats = gc.util.HistogramStats;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import Stack = gc.util.Stack;
  export import Gaussian = gc.util.Gaussian;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import Assert = gc.util.Assert;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import Plot = gc.util.Plot;
  export import Queue = gc.util.Queue;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import Rect = gc.project.Rect;
  export import Foo = gc.project.Foo;
  export import Circle = gc.project.Circle;
  export import Baz = gc.project.Baz;
  export import Shape = gc.project.Shape;
  export import MyRow = gc.project.MyRow;
  export import GenericType = gc.project.GenericType;
  export import Confidence = gc.project.Confidence;
  export import FooMap = gc.project.FooMap;
  export import FloatPrecisionTest = gc.project.FloatPrecisionTest;
  export import CustomType = gc.project.CustomType;
  export import Contact = gc.project.Contact;
  export import Bar = gc.project.Bar;
  export import Custom = gc.project.Custom;
  export import Obj = gc.project.Obj;
  export import SomeName = gc.project.SomeName;
  export import ArrayContainer = gc.project.ArrayContainer;
  export import List = gc.project.List;
  export import Sensor = gc.project.Sensor;
  export import FooBar = gc.project.FooBar;
  export import Person = gc.project.Person;
  export import NameConflict = gc.project.NameConflict;
  export import Named = gc.project.Named;
  export import Point = gc.project.Point;
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
  export import task_without_result = gc.project.task_without_result;
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
  export import something = gc.project.something;
  export import getPeriod = gc.project.getPeriod;
  export import consume_custom = gc.project.consume_custom;
  export import get_nodes = gc.project.get_nodes;
  export import load_within_stub = gc.project.load_within_stub;
  export import print_shapes = gc.project.print_shapes;
  export import string_list = gc.project.string_list;
  export import node_string_list = gc.project.node_string_list;
  export import get_box_string = gc.project.get_box_string;
  export import get_box_int = gc.project.get_box_int;
}
