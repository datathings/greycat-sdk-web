// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
/* oxlint-disable */
declare namespace gc {
  namespace project {
    class array_mono$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono$args';
    }

    class consume_custom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::consume_custom$args';
      static readonly $fields: consume_custom$args.$Fields;
      c: gc.project.Custom<string>;
      constructor(c: gc.project.Custom<string>);
      static createFrom(fields: {c: gc.project.Custom<string>}): consume_custom$args;
    }
    namespace consume_custom$args {
      interface $Fields {
        c: 0;
      }
    }

    class identity$args extends gc.sdk.GCObject {
      static readonly _type = 'project::identity$args';
      static readonly $fields: identity$args.$Fields;
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): identity$args;
    }
    namespace identity$args {
      interface $Fields {
        v: 0;
      }
    }

    class GenericType extends gc.sdk.GCObject {
      static readonly _type = 'project::GenericType';
      static readonly $fields: GenericType.$Fields;
      name: gc.project.SomeName;
    }
    namespace GenericType {
      interface $Fields {
        name: 0;
      }
    }

    class array$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array$args';
    }

    class array_of_float$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_float$args';
      static readonly $fields: array_of_float$args.$Fields;
      arr: globalThis.Array<number>;
      constructor(arr: globalThis.Array<number>);
      static createFrom(fields: {arr: globalThis.Array<number>}): array_of_float$args;
    }
    namespace array_of_float$args {
      interface $Fields {
        arr: 0;
      }
    }

    class vtable_test$args extends gc.sdk.GCObject {
      static readonly _type = 'project::vtable_test$args';
    }

    class array3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array3$args';
    }

    class read_stringlit$args extends gc.sdk.GCObject {
      static readonly _type = 'project::read_stringlit$args';
      static readonly $fields: read_stringlit$args.$Fields;
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): read_stringlit$args;
    }
    namespace read_stringlit$args {
      interface $Fields {
        arr: 0;
      }
    }

    class MyRow extends gc.sdk.GCObject {
      static readonly _type = 'project::MyRow';
      static readonly $fields: MyRow.$Fields;
      id: number | bigint;
      temp: number;
      data: gc.project.Named;
      constructor(id: number | bigint, temp: number, data: gc.project.Named);
      static createFrom(fields: {id: number | bigint, temp: number, data: gc.project.Named}): MyRow;
    }
    namespace MyRow {
      interface $Fields {
        id: 0;
        temp: 1;
        data: 2;
      }
    }

    class get_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_table$args';
    }

    class array2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array2$args';
    }

    class controlled_task$args extends gc.sdk.GCObject {
      static readonly _type = 'project::controlled_task$args';
      static readonly $fields: controlled_task$args.$Fields;
      duration: gc.core.duration;
      constructor(duration: gc.core.duration);
      static createFrom(fields: {duration: gc.core.duration}): controlled_task$args;
    }
    namespace controlled_task$args {
      interface $Fields {
        duration: 0;
      }
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      static readonly $fields: Sensor.$Fields;
      id: string;
      temp: number;
      humidity: number;
      constructor(id: string, temp: number, humidity: number);
      static createFrom(fields: {id: string, temp: number, humidity: number}): Sensor;
    }
    namespace Sensor {
      interface $Fields {
        id: 0;
        temp: 1;
        humidity: 2;
      }
    }

    class get_nodes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_nodes$args';
    }

    class table2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table2$args';
    }

    class NameConflict extends gc.sdk.GCEnum {
      static readonly _type = 'project::NameConflict';
      static readonly $fields: NameConflict[];
      key: NameConflict.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: NameConflict.Field);
      static name: NameConflict;
    }
    namespace NameConflict  {
      type Field = "name";
    }

    class Custom<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Custom';
      static readonly $fields: Custom.$Fields;
      x: T;
      constructor(x?: T);
      static createFrom<T>(fields: {x?: T}): Custom;
    }
    namespace Custom {
      interface $Fields {
        x: 0;
      }
    }

    class string_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::string_list$args';
      static readonly $fields: string_list$args.$Fields;
      list: globalThis.Array<string>;
      constructor(list: globalThis.Array<string>);
      static createFrom(fields: {list: globalThis.Array<string>}): string_list$args;
    }
    namespace string_list$args {
      interface $Fields {
        list: 0;
      }
    }

    class enum$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enum$args';
    }

    class create_nodeTimes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::create_nodeTimes$args';
    }

    class contacts$args extends gc.sdk.GCObject {
      static readonly _type = 'project::contacts$args';
      static readonly $fields: contacts$args.$Fields;
      contacts: gc.core.Table<gc.project.Contact>;
      constructor(contacts: gc.core.Table<gc.project.Contact>);
      static createFrom(fields: {contacts: gc.core.Table<gc.project.Contact>}): contacts$args;
    }
    namespace contacts$args {
      interface $Fields {
        contacts: 0;
      }
    }

    class CustomType extends gc.sdk.GCObject {
      static readonly _type = 'project::CustomType';
      static readonly $fields: CustomType.$Fields;
      string: string;
      int: number | bigint;
      float: number;
      bool: boolean;
      char: string;
      enum: gc.core.TimeZone;
      constructor(string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: gc.core.TimeZone);
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: gc.core.TimeZone}): CustomType;
    }
    namespace CustomType {
      interface $Fields {
        string: 0;
        int: 1;
        float: 2;
        bool: 3;
        char: 4;
        enum: 5;
      }
    }

    class Named extends gc.sdk.GCObject {
      static readonly _type = 'project::Named';
      static readonly $fields: Named.$Fields;
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): Named;
    }
    namespace Named {
      interface $Fields {
        name: 0;
      }
    }

    class print_shapes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::print_shapes$args';
      static readonly $fields: print_shapes$args.$Fields;
      shapes: globalThis.Array<gc.project.Shape>;
      constructor(shapes: globalThis.Array<gc.project.Shape>);
      static createFrom(fields: {shapes: globalThis.Array<gc.project.Shape>}): print_shapes$args;
    }
    namespace print_shapes$args {
      interface $Fields {
        shapes: 0;
      }
    }

    class ambiguous$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous$args';
    }

    class FloatPrecisionTest extends gc.sdk.GCObject {
      static readonly _type = 'project::FloatPrecisionTest';
      static readonly $fields: FloatPrecisionTest.$Fields;
      normal: number;
      precision: number;
      constructor(normal: number, precision: number);
      static createFrom(fields: {normal: number, precision: number}): FloatPrecisionTest;
    }
    namespace FloatPrecisionTest {
      interface $Fields {
        normal: 0;
        precision: 1;
      }
    }

    class testTensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::testTensor$args';
    }

    class time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::time$args';
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
      static readonly $fields: FooBar.$Fields;
      tz: gc.core.TimeZone;
      name: string;
      int: number | bigint;
      foo: gc.project.FooBar | null;
      values: globalThis.Array<any>;
      constructor(tz: gc.core.TimeZone, name: string, int: number | bigint, foo: gc.project.FooBar | null, values: globalThis.Array<any>);
      static createFrom(fields: {tz: gc.core.TimeZone, name: string, int: number | bigint, foo?: gc.project.FooBar | null, values: globalThis.Array<any>}): FooBar;
    }
    namespace FooBar {
      interface $Fields {
        tz: 0;
        name: 1;
        int: 2;
        foo: 3;
        values: 4;
      }
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class tensor$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor$args';
    }

    class load_within_stub$args extends gc.sdk.GCObject {
      static readonly _type = 'project::load_within_stub$args';
      static readonly $fields: load_within_stub$args.$Fields;
      map: gc.project.MapParams;
      constructor(map: gc.project.MapParams);
      static createFrom(fields: {map: gc.project.MapParams}): load_within_stub$args;
    }
    namespace load_within_stub$args {
      interface $Fields {
        map: 0;
      }
    }

    class Box<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Box';
      static readonly $fields: Box.$Fields;
      value: T;
      constructor(value?: T);
      static createFrom<T>(fields: {value?: T}): Box;
    }
    namespace Box {
      interface $Fields {
        value: 0;
      }
    }

    class gonna_timeout$args extends gc.sdk.GCObject {
      static readonly _type = 'project::gonna_timeout$args';
    }

    class boom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::boom$args';
    }

    class Bar<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::Bar';
      static readonly $fields: Bar.$Fields;
      attr: T | null;
      constructor(attr?: T | null);
      static createFrom<T>(fields: {attr?: T | null}): Bar;
    }
    namespace Bar {
      interface $Fields {
        attr: 0;
      }
    }

    class getPeriod$args extends gc.sdk.GCObject {
      static readonly _type = 'project::getPeriod$args';
      static readonly $fields: getPeriod$args.$Fields;
      days: gc.core.Tuple<number | bigint, number | bigint> | null;
      constructor(days?: gc.core.Tuple<number | bigint, number | bigint> | null);
      static createFrom(fields: {days?: gc.core.Tuple<number | bigint, number | bigint> | null}): getPeriod$args;
    }
    namespace getPeriod$args {
      interface $Fields {
        days: 0;
      }
    }

    class get_array$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_array$args';
    }

    class get_node_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_time$args';
    }

    class table3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table3$args';
    }

    class array_of_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_int$args';
      static readonly $fields: array_of_int$args.$Fields;
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_int$args;
    }
    namespace array_of_int$args {
      interface $Fields {
        arr: 0;
      }
    }

    class std_int_min_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_bigint$args';
    }

    class std_int_max_bigint$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_bigint$args';
    }

    class std_int_max_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_max_number$args';
    }

    class blockingFn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::blockingFn$args';
    }

    class Foo extends gc.sdk.GCObject {
      static readonly _type = 'project::Foo';
      static readonly $fields: Foo.$Fields;
      a: number | bigint | null;
      constructor(a?: number | bigint | null);
      static createFrom(fields: {a?: number | bigint | null}): Foo;
    }
    namespace Foo {
      interface $Fields {
        a: 0;
      }
    }

    class get_box_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_box_int$args';
    }

    class List<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::List';
      static readonly $fields: List.$Fields;
      elements: globalThis.Array<T>;
    }
    namespace List {
      interface $Fields {
        elements: 0;
      }
    }

    class std_int$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int$args';
    }

    class print_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::print_table$args';
      static readonly $fields: print_table$args.$Fields;
      table: gc.core.Table;
      constructor(table: gc.core.Table);
      static createFrom(fields: {table: gc.core.Table}): print_table$args;
    }
    namespace print_table$args {
      interface $Fields {
        table: 0;
      }
    }

    class task_without_result$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_without_result$args';
    }

    class std_bool$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_bool$args';
    }

    class std_int_min_number$args extends gc.sdk.GCObject {
      static readonly _type = 'project::std_int_min_number$args';
    }

    class Point extends gc.sdk.GCObject {
      static readonly _type = 'project::Point';
      static readonly $fields: Point.$Fields;
      x: number | bigint;
      y: number | bigint;
      constructor(x: number | bigint, y: number | bigint);
      static createFrom(fields: {x: number | bigint, y: number | bigint}): Point;
    }
    namespace Point {
      interface $Fields {
        x: 0;
        y: 1;
      }
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
      type Field = "High"|"Medium"|"Low";
    }

    class ArrayContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::ArrayContainer';
      static readonly $fields: ArrayContainer.$Fields;
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): ArrayContainer;
    }
    namespace ArrayContainer {
      interface $Fields {
        arr: 0;
      }
    }

    class Contact extends gc.sdk.GCObject {
      static readonly _type = 'project::Contact';
      static readonly $fields: Contact.$Fields;
      firstname: string;
      lastname: string;
      age: number | bigint;
      constructor(firstname: string, lastname: string, age: number | bigint);
      static createFrom(fields: {firstname: string, lastname: string, age: number | bigint}): Contact;
    }
    namespace Contact {
      interface $Fields {
        firstname: 0;
        lastname: 1;
        age: 2;
      }
    }

    class MapParams extends gc.sdk.GCObject {
      static readonly _type = 'project::MapParams';
      static readonly $fields: MapParams.$Fields;
      feeding_topo: gc.project.FooMap;
      constructor(feeding_topo: gc.project.FooMap);
      static createFrom(fields: {feeding_topo: gc.project.FooMap}): MapParams;
    }
    namespace MapParams {
      interface $Fields {
        feeding_topo: 0;
      }
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      static readonly $fields: Person.$Fields;
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): Person;
    }
    namespace Person {
      interface $Fields {
        name: 0;
        age: 1;
      }
    }

    class get_node_geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_geo$args';
    }

    class slowTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::slowTask$args';
    }

    class get_node_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_list$args';
    }

    class enumValue$args extends gc.sdk.GCObject {
      static readonly _type = 'project::enumValue$args';
    }

    class tensor2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor2$args';
    }

    class array_of_string$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_string$args';
      static readonly $fields: array_of_string$args.$Fields;
      arr: globalThis.Array<string>;
      constructor(arr: globalThis.Array<string>);
      static createFrom(fields: {arr: globalThis.Array<string>}): array_of_string$args;
    }
    namespace array_of_string$args {
      interface $Fields {
        arr: 0;
      }
    }

    class array_container$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_container$args';
      static readonly $fields: array_container$args.$Fields;
      ac: gc.project.ArrayContainer;
      constructor(ac: gc.project.ArrayContainer);
      static createFrom(fields: {ac: gc.project.ArrayContainer}): array_container$args;
    }
    namespace array_container$args {
      interface $Fields {
        ac: 0;
      }
    }

    class geos$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geos$args';
    }

    class ambiguous2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::ambiguous2$args';
    }

    class sensor_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sensor_table$args';
    }

    class fn_pointer$args extends gc.sdk.GCObject {
      static readonly _type = 'project::fn_pointer$args';
    }

    class something$args extends gc.sdk.GCObject {
      static readonly _type = 'project::something$args';
      static readonly $fields: something$args.$Fields;
      foo: gc.project.Baz;
      constructor(foo: gc.project.Baz);
      static createFrom(fields: {foo: gc.project.Baz}): something$args;
    }
    namespace something$args {
      interface $Fields {
        foo: 0;
      }
    }

    class TableEntry extends gc.sdk.GCObject {
      static readonly _type = 'project::TableEntry';
      static readonly $fields: TableEntry.$Fields;
      t: gc.core.time;
      v: any;
      constructor(t: gc.core.time, v: any);
      static createFrom(fields: {t: gc.core.time, v: any}): TableEntry;
    }
    namespace TableEntry {
      interface $Fields {
        t: 0;
        v: 1;
      }
    }

    class sum$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sum$args';
      static readonly $fields: sum$args.$Fields;
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): sum$args;
    }
    namespace sum$args {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class computeTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::computeTask$args';
    }

    class Rect extends gc.sdk.GCObject {
      static readonly _type = 'project::Rect';
      static readonly $fields: Rect.$Fields;
      area: number;
      constructor(area: number);
      static createFrom(fields: {area: number}): Rect;
    }
    namespace Rect {
      interface $Fields {
        area: 0;
      }
    }

    class Circle extends gc.sdk.GCObject {
      static readonly _type = 'project::Circle';
      static readonly $fields: Circle.$Fields;
      area: number;
      constructor(area: number);
      static createFrom(fields: {area: number}): Circle;
    }
    namespace Circle {
      interface $Fields {
        area: 0;
      }
    }

    class geo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::geo$args';
    }

    class some_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::some_table$args';
    }

    class table_bin$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_bin$args';
    }

    class node_string_list$args extends gc.sdk.GCObject {
      static readonly _type = 'project::node_string_list$args';
      static readonly $fields: node_string_list$args.$Fields;
      list: globalThis.Array<gc.core.node<string>>;
      constructor(list: globalThis.Array<gc.core.node<string>>);
      static createFrom(fields: {list: globalThis.Array<gc.core.node<string>>}): node_string_list$args;
    }
    namespace node_string_list$args {
      interface $Fields {
        list: 0;
      }
    }

    class get_node$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node$args';
    }

    class an_error$args extends gc.sdk.GCObject {
      static readonly _type = 'project::an_error$args';
    }

    class foobar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foobar$args';
    }

    class try_this$args extends gc.sdk.GCObject {
      static readonly _type = 'project::try_this$args';
    }

    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      static readonly $fields: Root.$Fields;
      "project::n": gc.core.node<string | null>;
      "project::nt": gc.core.nodeTime<string>;
      "project::nl": gc.core.nodeList<string>;
      "project::ni": gc.core.nodeIndex<string, number>;
      "project::ng": gc.core.nodeGeo<string>;
      "project::debug_node": gc.core.node<string | null>;
    }
    namespace Root {
      interface $Fields {
        "project::n": 0;
        "project::nt": 1;
        "project::nl": 2;
        "project::ni": 3;
        "project::ng": 4;
        "project::debug_node": 5;
      }
    }

    class FooMap extends gc.sdk.GCObject {
      static readonly _type = 'project::FooMap';
      static readonly $fields: FooMap.$Fields;
      name: gc.project.SomeName;
      substations: globalThis.Array<gc.core.node<gc.project.Point>>;
      constructor(name: gc.project.SomeName, substations: globalThis.Array<gc.core.node<gc.project.Point>>);
      static createFrom(fields: {name: gc.project.SomeName, substations: globalThis.Array<gc.core.node<gc.project.Point>>}): FooMap;
    }
    namespace FooMap {
      interface $Fields {
        name: 0;
        substations: 1;
      }
    }

    class float_f$args extends gc.sdk.GCObject {
      static readonly _type = 'project::float_f$args';
      static readonly $fields: float_f$args.$Fields;
      f: number | null;
      constructor(f?: number | null);
      static createFrom(fields: {f?: number | null}): float_f$args;
    }
    namespace float_f$args {
      interface $Fields {
        f: 0;
      }
    }

    class get_box_string$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_box_string$args';
    }

    class longTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::longTask$args';
    }

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      static readonly $fields: Obj.$Fields;
      tuple: gc.core.Tuple<any, any>;
      constructor(tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {tuple: gc.core.Tuple<any, any>}): Obj;
    }
    namespace Obj {
      interface $Fields {
        tuple: 0;
      }
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      static readonly $fields: task_with_params$args.$Fields;
      different: string;
      age: number | bigint;
      constructor(different: string, age: number | bigint);
      static createFrom(fields: {different: string, age: number | bigint}): task_with_params$args;
    }
    namespace task_with_params$args {
      interface $Fields {
        different: 0;
        age: 1;
      }
    }

    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class tensor3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tensor3$args';
    }

    class map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::map$args';
    }

    class array_mono2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_mono2$args';
    }

    class debug_fn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::debug_fn$args';
    }

    class Shape extends gc.sdk.GCObject {
      static readonly _type = 'project::Shape';
      static readonly $fields: Shape.$Fields;
      area: number;
    }
    namespace Shape {
      interface $Fields {
        area: 0;
      }
    }

    class Baz extends gc.sdk.GCObject {
      static readonly _type = 'project::Baz';
      static readonly $fields: Baz.$Fields;
      a: number | bigint | null;
      b: string;
      constructor(a: number | bigint | null, b: string);
      static createFrom(fields: {a?: number | bigint | null, b: string}): Baz;
    }
    namespace Baz {
      interface $Fields {
        a: 0;
        b: 1;
      }
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
      type Field = "aaa"|"foo_bar_baz_plop"|"bbbbbbb";
    }

    class get_node_index$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_node_index$args';
    }

    const map: gc.sdk.ExposedFn<[], globalThis.Map<any | null, any | null>>;
    const array: gc.sdk.ExposedFn<[], globalThis.Array<any | null>>;
    const array2: gc.sdk.ExposedFn<[], unknown>;
    const array3: gc.sdk.ExposedFn<[], unknown>;
    const array_mono: gc.sdk.ExposedFn<[], globalThis.Array<number | bigint>>;
    const array_mono2: gc.sdk.ExposedFn<[], globalThis.Array<boolean>>;
    const table: gc.sdk.ExposedFn<[], unknown>;
    const longTask: gc.sdk.ExposedFn<[], unknown>;
    const controlled_task: gc.sdk.ExposedFn<[gc.core.duration], unknown>;
    const sum: gc.sdk.ExposedFn<[number | bigint, number | bigint], number | bigint>;
    const slowTask: gc.sdk.ExposedFn<[], unknown>;
    const computeTask: gc.sdk.ExposedFn<[], unknown>;
    const testTensor: gc.sdk.ExposedFn<[], gc.core.Tensor>;
    const tensor: gc.sdk.ExposedFn<[], unknown>;
    const tensor2: gc.sdk.ExposedFn<[], unknown>;
    const tensor3: gc.sdk.ExposedFn<[], unknown>;
    const foo: gc.sdk.ExposedFn<[], gc.project.Foo>;
    const task_with_params: gc.sdk.ExposedFn<[string, number | bigint], string>;
    const task_without_result: gc.sdk.ExposedFn<[], unknown>;
    const enum_: gc.sdk.ExposedFn<[], unknown>;
    const table2: gc.sdk.ExposedFn<[], gc.core.Table>;
    const time: gc.sdk.ExposedFn<[], unknown>;
    const an_error: gc.sdk.ExposedFn<[], unknown>;
    const float_f: gc.sdk.ExposedFn<[number | null | undefined], unknown>;
    const blockingFn: gc.sdk.ExposedFn<[], unknown>;
    const enumValue: gc.sdk.ExposedFn<[], unknown>;
    const foobar: gc.sdk.ExposedFn<[], unknown>;
    const vtable_test: gc.sdk.ExposedFn<[], gc.core.Table<globalThis.Array<any>>>;
    const print_table: gc.sdk.ExposedFn<[gc.core.Table], unknown>;
    const fn_pointer: gc.sdk.ExposedFn<[], unknown>;
    const identity: gc.sdk.ExposedFn<[any | null | undefined], any | null>;
    const array_container: gc.sdk.ExposedFn<[gc.project.ArrayContainer], unknown>;
    const read_stringlit: gc.sdk.ExposedFn<[globalThis.Array<string>], unknown>;
    const contacts: gc.sdk.ExposedFn<[gc.core.Table<gc.project.Contact>], unknown>;
    const array_of_int: gc.sdk.ExposedFn<[globalThis.Array<number | bigint>], unknown>;
    const array_of_float: gc.sdk.ExposedFn<[globalThis.Array<number>], unknown>;
    const array_of_string: gc.sdk.ExposedFn<[globalThis.Array<string>], unknown>;
    const boom: gc.sdk.ExposedFn<[], unknown>;
    const sensor_table: gc.sdk.ExposedFn<[], gc.core.Table<gc.project.Sensor>>;
    const geo: gc.sdk.ExposedFn<[], unknown>;
    const geos: gc.sdk.ExposedFn<[], unknown>;
    const create_nodeTimes: gc.sdk.ExposedFn<[], unknown>;
    const table3: gc.sdk.ExposedFn<[], unknown>;
    const std_bool: gc.sdk.ExposedFn<[], unknown>;
    const std_int: gc.sdk.ExposedFn<[], unknown>;
    const std_int_min_number: gc.sdk.ExposedFn<[], unknown>;
    const std_int_min_bigint: gc.sdk.ExposedFn<[], unknown>;
    const std_int_max_number: gc.sdk.ExposedFn<[], unknown>;
    const std_int_max_bigint: gc.sdk.ExposedFn<[], unknown>;
    const some_table: gc.sdk.ExposedFn<[], unknown>;
    const gonna_timeout: gc.sdk.ExposedFn<[], unknown>;
    const get_node: gc.sdk.ExposedFn<[], gc.core.node<string | null>>;
    const get_node_time: gc.sdk.ExposedFn<[], gc.core.nodeTime<string>>;
    const get_node_list: gc.sdk.ExposedFn<[], gc.core.nodeList<string>>;
    const get_node_index: gc.sdk.ExposedFn<[], gc.core.nodeIndex<string, number>>;
    const get_node_geo: gc.sdk.ExposedFn<[], gc.core.nodeGeo<string>>;
    const ambiguous: gc.sdk.ExposedFn<[], unknown>;
    const ambiguous2: gc.sdk.ExposedFn<[], unknown>;
    const something: gc.sdk.ExposedFn<[gc.project.Baz], gc.project.Baz>;
    const getPeriod: gc.sdk.ExposedFn<[gc.core.Tuple<number | bigint, number | bigint> | null | undefined], unknown>;
    const consume_custom: gc.sdk.ExposedFn<[gc.project.Custom<string>], unknown>;
    const get_nodes: gc.sdk.ExposedFn<[], globalThis.Array<gc.core.node<gc.project.Point>>>;
    const load_within_stub: gc.sdk.ExposedFn<[gc.project.MapParams], unknown>;
    const print_shapes: gc.sdk.ExposedFn<[globalThis.Array<gc.project.Shape>], unknown>;
    const string_list: gc.sdk.ExposedFn<[globalThis.Array<string>], unknown>;
    const node_string_list: gc.sdk.ExposedFn<[globalThis.Array<gc.core.node<string>>], unknown>;
    const get_box_string: gc.sdk.ExposedFn<[], gc.project.Box<string>>;
    const get_box_int: gc.sdk.ExposedFn<[], gc.project.Box<number | bigint>>;
    const table_bin: gc.sdk.ExposedFn<[], globalThis.Array<gc.core.Table>>;
    const try_this: gc.sdk.ExposedFn<[], unknown>;
    const get_table: gc.sdk.ExposedFn<[], unknown>;
    const get_array: gc.sdk.ExposedFn<[], unknown>;
    const debug_fn: gc.sdk.ExposedFn<[], unknown>;
  }

  interface $TypesMap {
    'core::Map<core::any,core::any?>': 0,
    'core::GeoCircle': 0,
    'core::Array<runtime::PathItemObject>': 0,
    'core::str': 0,
    'core::Array<core::int>': 0,
    'core::Tuple<core::int,core::int>': 0,
    'core::node<core::String>': 0,
    'core::float': 0,
    'core::t3f': 0,
    'core::GeoBox': 0,
    'core::Table<project::TableEntry>': 0,
    'core::nodeTime<core::int>': 0,
    'core::Array<core::SearchResult<core::String,core::float>>': 0,
    'core::Array<io::File>': 0,
    'core::Array<core::float>': 0,
    'core::String': 0,
    'core::Tuple<core::float,core::any?>': 0,
    'core::Array<core::bool>': 0,
    'core::Tuple<core::any,core::any>': 0,
    'core::nodeTime<core::String>': 0,
    'core::nodeList': 0,
    'core::field': 0,
    'core::Table$applyMappings$args': 0,
    'core::time': 0,
    'core::Array<core::geo>': 0,
    'core::Array<core::SearchResult>': 0,
    'core::Array<project::Shape>': 0,
    'core::Array<runtime::DateTuple>': 0,
    'core::Map<core::String,runtime::ResponseObject>': 0,
    'core::nodeList<core::int>': 0,
    'core::nodeIndex<core::Tuple,core::any?>': 0,
    'core::Array<runtime::SecurityEntity>': 0,
    'core::Array<util::Quantizer>': 0,
    'core::Date': 0,
    'core::Array<core::nodeList>': 0,
    'core::nodeIndex<core::String,core::float>': 0,
    'core::ErrorFrame': 0,
    'core::nodeIndex$search_closest$args': 0,
    'core::Array<runtime::ResponseObject>': 0,
    'core::nodeList<core::nodeList<core::VectorLeaf>>': 0,
    'core::TimeZone': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::node<core::float>': 0,
    'core::Array<runtime::Frame>': 0,
    'core::Array<core::any?>': 0,
    'core::GeoPoly': 0,
    'core::Tuple<core::geo,core::any?>': 0,
    'core::Array<core::nodeTime>': 0,
    'core::null': 0,
    'core::t4f': 0,
    'core::node': 0,
    'core::TensorType': 0,
    'core::Tuple<core::geo,core::String>': 0,
    'core::Array<runtime::MediaTypeObject>': 0,
    'core::Array<core::Table>': 0,
    'core::ErrorCode': 0,
    'core::Array<runtime::Role>': 0,
    'core::Map<core::any,core::any>': 0,
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::nodeIndexBucket<core::String,core::float>': 0,
    'core::nodeList$sample$args': 0,
    'core::Table': 0,
    'core::Array<core::node?>': 0,
    'core::MathConstants': 0,
    'core::bool': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::Tuple<core::int,core::nodeList<core::VectorLeaf>>': 0,
    'core::duration': 0,
    'core::Table<project::Sensor>': 0,
    'core::Array': 0,
    'core::nodeGeo<core::String>': 0,
    'core::Map<core::String,core::String>': 0,
    'core::Map': 0,
    'core::SearchResult<core::Tuple,core::any?>': 0,
    'core::any': 0,
    'core::char': 0,
    'core::node<core::int>': 0,
    'core::Table<project::Contact>': 0,
    'core::Map<core::String,runtime::UserCredential>': 0,
    'core::Table<project::MyRow>': 0,
    'core::t2': 0,
    'core::Array<runtime::Task>': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::NodeInfo<core::time>': 0,
    'core::SearchResult': 0,
    'core::Tuple<core::int,core::VectorLeaf>': 0,
    'core::function': 0,
    'core::Array<runtime::DayOfWeek>': 0,
    'core::Array<core::SearchResult<core::Tuple,core::any?>>': 0,
    'core::Tuple<core::int,core::any?>': 0,
    'core::NodeInfo': 0,
    'core::nodeGeo$sample$args': 0,
    'core::nodeIndexBucket<core::Tuple,core::any?>': 0,
    'core::VectorIndex': 0,
    'core::Array<core::node<project::Point>>': 0,
    'core::Array<core::node<core::String>>': 0,
    'core::Map<core::String,runtime::PathItemObject>': 0,
    'core::DurationUnit': 0,
    'core::Array<core::any>': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::nodeTime': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::nodeIndexBucket': 0,
    'core::FloatPrecision': 0,
    'core::Map<core::String,core::int>': 0,
    'core::Array<runtime::UserGroupPolicy>': 0,
    'core::nodeList<core::String>': 0,
    'core::t3': 0,
    'core::Tuple<core::int,core::String>': 0,
    'core::nodeList$info$args': 0,
    'core::Tensor': 0,
    'core::geo': 0,
    'core::Array<runtime::Variable>': 0,
    'core::Buffer': 0,
    'core::Tuple<core::String,core::String>': 0,
    'core::Tuple<core::time,core::int>': 0,
    'core::Tuple<core::geo,core::CalendarUnit>': 0,
    'core::nodeGeo$info$args': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::Table<core::any>': 0,
    'core::TableColumnMapping': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::node<project::Point>': 0,
    'core::nodeList<core::VectorLeaf>': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::Array<core::String>': 0,
    'core::Map<core::String,runtime::HeaderObject>': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::type': 0,
    'core::SamplingMode': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::Error': 0,
    'core::Array<runtime::HeaderObject>': 0,
    'core::Vector': 0,
    'core::nodeTime<core::nodeGeo>': 0,
    'core::Tuple<core::time,core::nodeGeo>': 0,
    'core::Array<project::Named>': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::nodeIndex': 0,
    'core::CalendarUnit': 0,
    'core::Array<core::int?>': 0,
    'core::Table<core::Tuple<core::float,core::any?>>': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::nodeIndex$info$args': 0,
    'core::nodeGeo<core::CalendarUnit>': 0,
    'core::SearchResult<core::String,core::float>': 0,
    'core::node$resolve_all$args': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::Array<runtime::Permission>': 0,
    'core::TensorDistance': 0,
    'core::Map<core::String,runtime::MediaTypeObject>': 0,
    'core::node<core::String?>': 0,
    'core::NodeInfo<core::int>': 0,
    'core::SortOrder': 0,
    'core::Tuple': 0,
    'core::Array<runtime::UserCredential>': 0,
    'core::nodeGeo': 0,
    'core::Map<core::String,runtime::SchemaObject>': 0,
    'core::Array<runtime::Job>': 0,
    'core::nodeTime$info$args': 0,
    'core::nodeTime$sample$args': 0,
    'core::nodeTimeCursor': 0,
    'core::int': 0,
    'core::Table<core::Array<core::any>>': 0,
    'core::t2f': 0,
    'core::VectorLeaf': 0,
    'core::Array<core::field>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::Tuple<core::time,core::String>': 0,
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::Map<core::any,core::int>': 0,
    'core::t4': 0,
    'core::Array<runtime::SchemaObject>': 0,
    'runtime::Runtime': 0,
    'runtime::FixedPeriodicity': 0,
    'runtime::User': 0,
    'runtime::ChildProcess': 0,
    'runtime::YearlyPeriodicity': 0,
    'runtime::OpenIDConnect$config$args': 0,
    'runtime::Scheduler$add$args': 0,
    'runtime::SecurityFields': 0,
    'runtime::Debug$call$args': 0,
    'runtime::SecurityFields$set$args': 0,
    'runtime::SecurityEntity$all$args': 0,
    'runtime::Frame': 0,
    'runtime::UserGroupPolicyType': 0,
    'runtime::SecurityEntity': 0,
    'runtime::ResponseObject': 0,
    'runtime::ComponentsObject': 0,
    'runtime::Month': 0,
    'runtime::UserCredential': 0,
    'runtime::License': 0,
    'runtime::Task$history$args': 0,
    'runtime::Role$all$args': 0,
    'runtime::Task': 0,
    'runtime::User$me$args': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::UserGroup': 0,
    'runtime::User$logout$args': 0,
    'runtime::LogDataUsage': 0,
    'runtime::MergeStrategy': 0,
    'runtime::SchemaObject': 0,
    'runtime::Debug$all$args': 0,
    'runtime::PeriodicTask': 0,
    'runtime::ResponseCode': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::Log': 0,
    'runtime::Debug$get$args': 0,
    'runtime::Scheduler$activate$args': 0,
    'runtime::SecurityEntity$set$args': 0,
    'runtime::SchemaFormat': 0,
    'runtime::OpenApi': 0,
    'runtime::MonthlyPeriodicity': 0,
    'runtime::User$current$args': 0,
    'runtime::DailyPeriodicity': 0,
    'runtime::System': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::User$setPassword$args': 0,
    'runtime::DayOfWeek': 0,
    'runtime::PeriodicOptions': 0,
    'runtime::WeeklyPeriodicity': 0,
    'runtime::RequestBodyObject': 0,
    'runtime::Periodicity': 0,
    'runtime::Role': 0,
    'runtime::Permission$all$args': 0,
    'runtime::InfoObject': 0,
    'runtime::SchemaType': 0,
    'runtime::SecurityFields$get$args': 0,
    'runtime::Task$cancel$args': 0,
    'runtime::Scheduler$deactivate$args': 0,
    'runtime::Job': 0,
    'runtime::MediaTypeObject': 0,
    'runtime::User$tokenLogin$args': 0,
    'runtime::Debug': 0,
    'runtime::Permission': 0,
    'runtime::Task$running$args': 0,
    'runtime::User$renew$args': 0,
    'runtime::OpenApi$v3$args': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::OpenApiVersion': 0,
    'runtime::Scheduler': 0,
    'runtime::ChildProcessResult': 0,
    'runtime::DateTuple': 0,
    'runtime::Variable': 0,
    'runtime::Scheduler$list$args': 0,
    'runtime::UserGroupPolicy': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::OperationObject': 0,
    'runtime::PathItemObject': 0,
    'runtime::TaskStatus': 0,
    'runtime::OpenApiV3': 0,
    'runtime::OpenIDConnect': 0,
    'runtime::Scheduler$find$args': 0,
    'runtime::SecurityPolicy': 0,
    'runtime::HeaderObject': 0,
    'runtime::User$login$args': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::LogLevel': 0,
    'runtime::LicenseType': 0,
    'runtime::User$permissions$args': 0,
    'io::Writer': 0,
    'io::JsonWriter': 0,
    'io::Csv$sample$args': 0,
    'io::Csv': 0,
    'io::Smtp': 0,
    'io::Url': 0,
    'io::HttpRequest': 0,
    'io::CsvSharding': 0,
    'io::Reader<core::String>': 0,
    'io::FileWalker': 0,
    'io::Csv$analyze$args': 0,
    'io::CsvFormat': 0,
    'io::Csv$generate$args': 0,
    'io::XmlReader': 0,
    'io::GcbReader': 0,
    'io::CsvStatistics': 0,
    'io::File': 0,
    'io::SmtpAuth': 0,
    'io::HttpResponse': 0,
    'io::TextWriter': 0,
    'io::HttpMethod': 0,
    'io::CsvColumnStatistics': 0,
    'io::SmtpMode': 0,
    'io::CsvReader': 0,
    'io::TextReader': 0,
    'io::Email': 0,
    'io::JsonReader': 0,
    'io::Json': 0,
    'io::Reader': 0,
    'io::CsvAnalysisConfig': 0,
    'io::Http': 0,
    'io::GcbWriter': 0,
    'io::CsvWriter': 0,
    'util::MultiQuantizer': 0,
    'util::Random': 0,
    'util::Gaussian': 0,
    'util::TimeWindow': 0,
    'util::GaussianProfileSlot': 0,
    'util::GaussianProfile': 0,
    'util::Assert': 0,
    'util::Stack': 0,
    'util::ProgressTracker': 0,
    'util::HistogramBin': 0,
    'util::Quantizer<core::Array>': 0,
    'util::CustomQuantizer': 0,
    'util::Queue<core::int>': 0,
    'util::Stack<core::String>': 0,
    'util::LogQuantizer': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::Quantizer': 0,
    'util::Plot': 0,
    'util::Queue': 0,
    'util::HistogramStats': 0,
    'util::Crypto': 0,
    'util::Histogram': 0,
    'util::SlidingWindow': 0,
    'util::LinearQuantizer': 0,
    'util::QuantizerSlotBound': 0,
    'project::array_mono$args': 0,
    'project::consume_custom$args': 0,
    'project::identity$args': 0,
    'project::GenericType': 0,
    'project::array$args': 0,
    'project::array_of_float$args': 0,
    'project::vtable_test$args': 0,
    'project::array3$args': 0,
    'project::read_stringlit$args': 0,
    'project::MyRow': 0,
    'project::get_table$args': 0,
    'project::array2$args': 0,
    'project::controlled_task$args': 0,
    'project::Sensor': 0,
    'project::get_nodes$args': 0,
    'project::table2$args': 0,
    'project::NameConflict': 0,
    'project::Custom': 0,
    'project::string_list$args': 0,
    'project::enum$args': 0,
    'project::Box<core::String>': 0,
    'project::create_nodeTimes$args': 0,
    'project::Box<core::int>': 0,
    'project::contacts$args': 0,
    'project::CustomType': 0,
    'project::Named': 0,
    'project::print_shapes$args': 0,
    'project::ambiguous$args': 0,
    'project::FloatPrecisionTest': 0,
    'project::testTensor$args': 0,
    'project::time$args': 0,
    'project::FooBar': 0,
    'project::foo$args': 0,
    'project::tensor$args': 0,
    'project::load_within_stub$args': 0,
    'project::Box': 0,
    'project::gonna_timeout$args': 0,
    'project::boom$args': 0,
    'project::Bar': 0,
    'project::getPeriod$args': 0,
    'project::get_array$args': 0,
    'project::get_node_time$args': 0,
    'project::table3$args': 0,
    'project::array_of_int$args': 0,
    'project::std_int_min_bigint$args': 0,
    'project::std_int_max_bigint$args': 0,
    'project::std_int_max_number$args': 0,
    'project::blockingFn$args': 0,
    'project::Foo': 0,
    'project::get_box_int$args': 0,
    'project::List': 0,
    'project::std_int$args': 0,
    'project::print_table$args': 0,
    'project::task_without_result$args': 0,
    'project::std_bool$args': 0,
    'project::std_int_min_number$args': 0,
    'project::Custom<core::String>': 0,
    'project::Point': 0,
    'project::Confidence': 0,
    'project::ArrayContainer': 0,
    'project::Contact': 0,
    'project::MapParams': 0,
    'project::Person': 0,
    'project::get_node_geo$args': 0,
    'project::slowTask$args': 0,
    'project::get_node_list$args': 0,
    'project::enumValue$args': 0,
    'project::tensor2$args': 0,
    'project::array_of_string$args': 0,
    'project::array_container$args': 0,
    'project::geos$args': 0,
    'project::ambiguous2$args': 0,
    'project::sensor_table$args': 0,
    'project::fn_pointer$args': 0,
    'project::something$args': 0,
    'project::TableEntry': 0,
    'project::sum$args': 0,
    'project::computeTask$args': 0,
    'project::Rect': 0,
    'project::Circle': 0,
    'project::geo$args': 0,
    'project::some_table$args': 0,
    'project::table_bin$args': 0,
    'project::node_string_list$args': 0,
    'project::get_node$args': 0,
    'project::an_error$args': 0,
    'project::foobar$args': 0,
    'project::try_this$args': 0,
    'project::Root': 0,
    'project::FooMap': 0,
    'project::float_f$args': 0,
    'project::get_box_string$args': 0,
    'project::longTask$args': 0,
    'project::Obj': 0,
    'project::task_with_params$args': 0,
    'project::table$args': 0,
    'project::tensor3$args': 0,
    'project::map$args': 0,
    'project::array_mono2$args': 0,
    'project::debug_fn$args': 0,
    'project::Shape': 0,
    'project::Baz': 0,
    'project::SomeName': 0,
    'project::get_node_index$args': 0,
  }

  interface $FieldsMap {
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::nodeIndex$search_closest$args::i': 0,
    'core::nodeIndex$search_closest$args::key': 0,
    'core::nodeIndex$search_closest$args::max': 0,
    'core::GeoPoly::points': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::SearchResult::key': 0,
    'core::SearchResult::value': 0,
    'core::SearchResult::distance': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::VectorIndex::layers': 0,
    'core::VectorIndex::rng': 0,
    'core::nodeIndexBucket::key': 0,
    'core::nodeIndexBucket::value': 0,
    'core::nodeIndexBucket::next': 0,
    'core::nodeList$info$args::nodes': 0,
    'core::nodeGeo$info$args::nodes': 0,
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'core::Vector::buffer': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'core::node$resolve_all$args::n': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeTimeCursor::req_time': 0,
    'core::VectorLeaf::vector': 0,
    'core::VectorLeaf::list': 0,
    'core::VectorLeaf::i': 0,
    'core::VectorLeaf::value': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'runtime::FixedPeriodicity::every': 0,
    'runtime::User::id': 0,
    'runtime::User::name': 0,
    'runtime::User::activated': 0,
    'runtime::User::full_name': 0,
    'runtime::User::email': 0,
    'runtime::User::role': 0,
    'runtime::User::groups': 0,
    'runtime::User::groups_flags': 0,
    'runtime::User::external': 0,
    'runtime::ChildProcess::pid': 0,
    'runtime::YearlyPeriodicity::dates': 0,
    'runtime::YearlyPeriodicity::timezone': 0,
    'runtime::Scheduler$add$args::function': 0,
    'runtime::Scheduler$add$args::periodicity': 0,
    'runtime::Scheduler$add$args::options': 0,
    'runtime::SecurityFields::email': 0,
    'runtime::SecurityFields::name': 0,
    'runtime::SecurityFields::first_name': 0,
    'runtime::SecurityFields::last_name': 0,
    'runtime::SecurityFields::roles': 0,
    'runtime::SecurityFields::groups': 0,
    'runtime::Debug$call$args::id': 0,
    'runtime::Debug$call$args::func': 0,
    'runtime::Debug$call$args::args': 0,
    'runtime::SecurityFields$set$args::f': 0,
    'runtime::Frame::module': 0,
    'runtime::Frame::type': 0,
    'runtime::Frame::function': 0,
    'runtime::Frame::src': 0,
    'runtime::Frame::line': 0,
    'runtime::Frame::column': 0,
    'runtime::Frame::scope': 0,
    'runtime::ResponseObject::description': 0,
    'runtime::ResponseObject::headers': 0,
    'runtime::ResponseObject::content': 0,
    'runtime::ComponentsObject::schemas': 0,
    'runtime::UserCredential::offset': 0,
    'runtime::UserCredential::pass': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
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
    'runtime::UserGroup::id': 0,
    'runtime::UserGroup::name': 0,
    'runtime::UserGroup::activated': 0,
    'runtime::LogDataUsage::read_bytes': 0,
    'runtime::LogDataUsage::read_hits': 0,
    'runtime::LogDataUsage::read_wasted': 0,
    'runtime::LogDataUsage::write_bytes': 0,
    'runtime::LogDataUsage::write_hits': 0,
    'runtime::LogDataUsage::cache_bytes': 0,
    'runtime::LogDataUsage::cache_hits': 0,
    'runtime::SchemaObject::$ref': 0,
    'runtime::SchemaObject::type': 0,
    'runtime::SchemaObject::format': 0,
    'runtime::SchemaObject::nullable': 0,
    'runtime::SchemaObject::properties': 0,
    'runtime::SchemaObject::required': 0,
    'runtime::SchemaObject::items': 0,
    'runtime::SchemaObject::oneOf': 0,
    'runtime::SchemaObject::allOf': 0,
    'runtime::SchemaObject::minItems': 0,
    'runtime::SchemaObject::maxItems': 0,
    'runtime::SchemaObject::enum': 0,
    'runtime::SchemaObject::additionalProperties': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::periodicity': 0,
    'runtime::PeriodicTask::options': 0,
    'runtime::PeriodicTask::is_active': 0,
    'runtime::PeriodicTask::next_execution': 0,
    'runtime::PeriodicTask::execution_count': 0,
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::data': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::Scheduler$activate$args::function': 0,
    'runtime::SecurityEntity$set$args::entity': 0,
    'runtime::MonthlyPeriodicity::days': 0,
    'runtime::MonthlyPeriodicity::daily': 0,
    'runtime::DailyPeriodicity::hour': 0,
    'runtime::DailyPeriodicity::minute': 0,
    'runtime::DailyPeriodicity::second': 0,
    'runtime::DailyPeriodicity::timezone': 0,
    'runtime::Task$is_running$args::task_id': 0,
    'runtime::User$setPassword$args::name': 0,
    'runtime::User$setPassword$args::pass': 0,
    'runtime::PeriodicOptions::activated': 0,
    'runtime::PeriodicOptions::start': 0,
    'runtime::PeriodicOptions::max_duration': 0,
    'runtime::WeeklyPeriodicity::days': 0,
    'runtime::WeeklyPeriodicity::daily': 0,
    'runtime::RequestBodyObject::content': 0,
    'runtime::RequestBodyObject::required': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'runtime::InfoObject::title': 0,
    'runtime::InfoObject::version': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'runtime::Scheduler$deactivate$args::function': 0,
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::MediaTypeObject::schema': 0,
    'runtime::User$tokenLogin$args::token': 0,
    'runtime::User$tokenLogin$args::use_cookie': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::Debug::nb_calls': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::User$renew$args::use_cookie': 0,
    'runtime::ChildProcessResult::code': 0,
    'runtime::ChildProcessResult::stdout': 0,
    'runtime::ChildProcessResult::stderr': 0,
    'runtime::DateTuple::day': 0,
    'runtime::DateTuple::month': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::UserGroupPolicy::group_id': 0,
    'runtime::UserGroupPolicy::type': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::OperationObject::requestBody': 0,
    'runtime::OperationObject::responses': 0,
    'runtime::PathItemObject::description': 0,
    'runtime::PathItemObject::post': 0,
    'runtime::OpenApiV3::openapi': 0,
    'runtime::OpenApiV3::info': 0,
    'runtime::OpenApiV3::paths': 0,
    'runtime::OpenApiV3::components': 0,
    'runtime::OpenIDConnect::url': 0,
    'runtime::OpenIDConnect::clientId': 0,
    'runtime::Scheduler$find$args::function': 0,
    'runtime::SecurityPolicy::entities': 0,
    'runtime::SecurityPolicy::credentials': 0,
    'runtime::SecurityPolicy::fields': 0,
    'runtime::SecurityPolicy::keys': 0,
    'runtime::SecurityPolicy::keys_last_refresh': 0,
    'runtime::HeaderObject::description': 0,
    'runtime::HeaderObject::required': 0,
    'runtime::User$login$args::credentials': 0,
    'runtime::User$login$args::use_cookie': 0,
    'io::Writer::path': 0,
    'io::Writer::append': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::HttpRequest::method': 0,
    'io::HttpRequest::url': 0,
    'io::HttpRequest::headers': 0,
    'io::HttpRequest::body': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
    'io::FileWalker::path': 0,
    'io::Csv$analyze$args::files': 0,
    'io::Csv$analyze$args::config': 0,
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
    'io::Csv$generate$args::stats': 0,
    'io::XmlReader::path': 0,
    'io::XmlReader::pos': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::HttpResponse::status_code': 0,
    'io::HttpResponse::headers': 0,
    'io::HttpResponse::content': 0,
    'io::HttpResponse::error_msg': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
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
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::Reader::path': 0,
    'io::Reader::pos': 0,
    'io::CsvAnalysisConfig::header_lines': 0,
    'io::CsvAnalysisConfig::separator': 0,
    'io::CsvAnalysisConfig::string_delimiter': 0,
    'io::CsvAnalysisConfig::decimal_separator': 0,
    'io::CsvAnalysisConfig::thousands_separator': 0,
    'io::CsvAnalysisConfig::row_limit': 0,
    'io::CsvAnalysisConfig::enumerable_limit': 0,
    'io::CsvAnalysisConfig::date_check_limit': 0,
    'io::CsvAnalysisConfig::date_formats': 0,
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::TimeWindow::values': 0,
    'util::TimeWindow::span': 0,
    'util::TimeWindow::sum': 0,
    'util::TimeWindow::sumsq': 0,
    'util::TimeWindow::field': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::Stack::values': 0,
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
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
    'util::LinearQuantizer::min': 0,
    'util::LinearQuantizer::max': 0,
    'util::LinearQuantizer::bins': 0,
    'util::LinearQuantizer::open': 0,
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
    'project::consume_custom$args::c': 0,
    'project::identity$args::v': 0,
    'project::array_of_float$args::arr': 0,
    'project::read_stringlit$args::arr': 0,
    'project::MyRow::id': 0,
    'project::MyRow::temp': 0,
    'project::MyRow::data': 0,
    'project::controlled_task$args::duration': 0,
    'project::Sensor::id': 0,
    'project::Sensor::temp': 0,
    'project::Sensor::humidity': 0,
    'project::Custom::x': 0,
    'project::string_list$args::list': 0,
    'project::contacts$args::contacts': 0,
    'project::CustomType::string': 0,
    'project::CustomType::int': 0,
    'project::CustomType::float': 0,
    'project::CustomType::bool': 0,
    'project::CustomType::char': 0,
    'project::CustomType::enum': 0,
    'project::Named::name': 0,
    'project::print_shapes$args::shapes': 0,
    'project::FloatPrecisionTest::normal': 0,
    'project::FloatPrecisionTest::precision': 0,
    'project::FooBar::tz': 0,
    'project::FooBar::name': 0,
    'project::FooBar::int': 0,
    'project::FooBar::foo': 0,
    'project::FooBar::values': 0,
    'project::load_within_stub$args::map': 0,
    'project::Box::value': 0,
    'project::Bar::attr': 0,
    'project::getPeriod$args::days': 0,
    'project::array_of_int$args::arr': 0,
    'project::Foo::a': 0,
    'project::print_table$args::table': 0,
    'project::Point::x': 0,
    'project::Point::y': 0,
    'project::ArrayContainer::arr': 0,
    'project::Contact::firstname': 0,
    'project::Contact::lastname': 0,
    'project::Contact::age': 0,
    'project::MapParams::feeding_topo': 0,
    'project::Person::name': 0,
    'project::Person::age': 0,
    'project::array_of_string$args::arr': 0,
    'project::array_container$args::ac': 0,
    'project::something$args::foo': 0,
    'project::TableEntry::t': 0,
    'project::TableEntry::v': 0,
    'project::sum$args::a': 0,
    'project::sum$args::b': 0,
    'project::Rect::area': 0,
    'project::Circle::area': 0,
    'project::node_string_list$args::list': 0,
    'project::FooMap::name': 0,
    'project::FooMap::substations': 0,
    'project::float_f$args::f': 0,
    'project::Obj::tuple': 0,
    'project::task_with_params$args::different': 0,
    'project::task_with_params$args::age': 0,
    'project::Baz::a': 0,
    'project::Baz::b': 0,
  }

  interface $FunctionsMap {
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::node::resolve_all': 0,
    'core::Table::applyMappings': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeIndex::search_closest': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::info': 0,
    'runtime::User::setPassword': 0,
    'runtime::User::permissions': 0,
    'runtime::User::me': 0,
    'runtime::User::current': 0,
    'runtime::User::renew': 0,
    'runtime::User::logout': 0,
    'runtime::User::tokenLogin': 0,
    'runtime::User::login': 0,
    'runtime::SecurityFields::get': 0,
    'runtime::SecurityFields::set': 0,
    'runtime::SecurityEntity::set': 0,
    'runtime::SecurityEntity::all': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::OpenApi::v3': 0,
    'runtime::Role::all': 0,
    'runtime::Debug::call': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
    'runtime::Permission::all': 0,
    'runtime::Scheduler::deactivate': 0,
    'runtime::Scheduler::activate': 0,
    'runtime::Scheduler::find': 0,
    'runtime::Scheduler::list': 0,
    'runtime::Scheduler::add': 0,
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
    'project::controlled_task': 0,
    'project::sum': 0,
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
    'project::table_bin': 0,
    'project::try_this': 0,
    'project::get_table': 0,
    'project::get_array': 0,
    'project::debug_fn': 0,
  }

  export import GeoCircle = gc.core.GeoCircle;
  export import str = gc.core.str;
  export import float = gc.core.float;
  export import t3f = gc.core.t3f;
  export import GeoBox = gc.core.GeoBox;
  export import String = gc.core.String;
  export import nodeList = gc.core.nodeList;
  export import field = gc.core.field;
  export import Date = gc.core.Date;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import TimeZone = gc.core.TimeZone;
  export import GeoPoly = gc.core.GeoPoly;
  export import null_ = gc.core.null_;
  export import t4f = gc.core.t4f;
  export import node = gc.core.node;
  export import TensorType = gc.core.TensorType;
  export import ErrorCode = gc.core.ErrorCode;
  export import Table = gc.core.Table;
  export import MathConstants = gc.core.MathConstants;
  export import bool = gc.core.bool;
  export import duration = gc.core.duration;
  export import Array = gc.core.Array;
  export import Map = gc.core.Map;
  export import char = gc.core.char;
  export import t2 = gc.core.t2;
  export import SearchResult = gc.core.SearchResult;
  export import function_ = gc.core.function_;
  export import NodeInfo = gc.core.NodeInfo;
  export import VectorIndex = gc.core.VectorIndex;
  export import DurationUnit = gc.core.DurationUnit;
  export import nodeTime = gc.core.nodeTime;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import t3 = gc.core.t3;
  export import Tensor = gc.core.Tensor;
  export import Buffer = gc.core.Buffer;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import type = gc.core.type;
  export import SamplingMode = gc.core.SamplingMode;
  export import Error = gc.core.Error;
  export import Vector = gc.core.Vector;
  export import nodeIndex = gc.core.nodeIndex;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import TensorDistance = gc.core.TensorDistance;
  export import SortOrder = gc.core.SortOrder;
  export import Tuple = gc.core.Tuple;
  export import nodeGeo = gc.core.nodeGeo;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import int = gc.core.int;
  export import t2f = gc.core.t2f;
  export import t4 = gc.core.t4;
  export import Runtime = gc.runtime.Runtime;
  export import FixedPeriodicity = gc.runtime.FixedPeriodicity;
  export import User = gc.runtime.User;
  export import ChildProcess = gc.runtime.ChildProcess;
  export import YearlyPeriodicity = gc.runtime.YearlyPeriodicity;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import Month = gc.runtime.Month;
  export import License = gc.runtime.License;
  export import Task = gc.runtime.Task;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import UserGroup = gc.runtime.UserGroup;
  export import LogDataUsage = gc.runtime.LogDataUsage;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import Log = gc.runtime.Log;
  export import OpenApi = gc.runtime.OpenApi;
  export import MonthlyPeriodicity = gc.runtime.MonthlyPeriodicity;
  export import DailyPeriodicity = gc.runtime.DailyPeriodicity;
  export import System = gc.runtime.System;
  export import DayOfWeek = gc.runtime.DayOfWeek;
  export import PeriodicOptions = gc.runtime.PeriodicOptions;
  export import WeeklyPeriodicity = gc.runtime.WeeklyPeriodicity;
  export import Periodicity = gc.runtime.Periodicity;
  export import Job = gc.runtime.Job;
  export import Scheduler = gc.runtime.Scheduler;
  export import ChildProcessResult = gc.runtime.ChildProcessResult;
  export import DateTuple = gc.runtime.DateTuple;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import LogLevel = gc.runtime.LogLevel;
  export import LicenseType = gc.runtime.LicenseType;
  export import JsonWriter = gc.io.JsonWriter;
  export import Csv = gc.io.Csv;
  export import Smtp = gc.io.Smtp;
  export import Url = gc.io.Url;
  export import HttpRequest = gc.io.HttpRequest;
  export import CsvSharding = gc.io.CsvSharding;
  export import FileWalker = gc.io.FileWalker;
  export import CsvFormat = gc.io.CsvFormat;
  export import XmlReader = gc.io.XmlReader;
  export import GcbReader = gc.io.GcbReader;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import File = gc.io.File;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import HttpResponse = gc.io.HttpResponse;
  export import TextWriter = gc.io.TextWriter;
  export import HttpMethod = gc.io.HttpMethod;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import SmtpMode = gc.io.SmtpMode;
  export import CsvReader = gc.io.CsvReader;
  export import TextReader = gc.io.TextReader;
  export import Email = gc.io.Email;
  export import JsonReader = gc.io.JsonReader;
  export import Json = gc.io.Json;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import Http = gc.io.Http;
  export import GcbWriter = gc.io.GcbWriter;
  export import CsvWriter = gc.io.CsvWriter;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Random = gc.util.Random;
  export import Gaussian = gc.util.Gaussian;
  export import TimeWindow = gc.util.TimeWindow;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import Assert = gc.util.Assert;
  export import Stack = gc.util.Stack;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import HistogramBin = gc.util.HistogramBin;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import Plot = gc.util.Plot;
  export import Queue = gc.util.Queue;
  export import HistogramStats = gc.util.HistogramStats;
  export import Crypto = gc.util.Crypto;
  export import Histogram = gc.util.Histogram;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import GenericType = gc.project.GenericType;
  export import MyRow = gc.project.MyRow;
  export import Sensor = gc.project.Sensor;
  export import NameConflict = gc.project.NameConflict;
  export import Custom = gc.project.Custom;
  export import CustomType = gc.project.CustomType;
  export import Named = gc.project.Named;
  export import FloatPrecisionTest = gc.project.FloatPrecisionTest;
  export import FooBar = gc.project.FooBar;
  export import Bar = gc.project.Bar;
  export import Foo = gc.project.Foo;
  export import List = gc.project.List;
  export import Point = gc.project.Point;
  export import Confidence = gc.project.Confidence;
  export import ArrayContainer = gc.project.ArrayContainer;
  export import Contact = gc.project.Contact;
  export import Person = gc.project.Person;
  export import TableEntry = gc.project.TableEntry;
  export import Rect = gc.project.Rect;
  export import Circle = gc.project.Circle;
  export import FooMap = gc.project.FooMap;
  export import Obj = gc.project.Obj;
  export import Shape = gc.project.Shape;
  export import Baz = gc.project.Baz;
  export import SomeName = gc.project.SomeName;
  export import map = gc.project.map;
  export import array = gc.project.array;
  export import array2 = gc.project.array2;
  export import array3 = gc.project.array3;
  export import array_mono = gc.project.array_mono;
  export import array_mono2 = gc.project.array_mono2;
  export import table = gc.project.table;
  export import longTask = gc.project.longTask;
  export import controlled_task = gc.project.controlled_task;
  export import sum = gc.project.sum;
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
  export import geos = gc.project.geos;
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
  export import table_bin = gc.project.table_bin;
  export import try_this = gc.project.try_this;
  export import get_table = gc.project.get_table;
  export import get_array = gc.project.get_array;
  export import debug_fn = gc.project.debug_fn;
}
