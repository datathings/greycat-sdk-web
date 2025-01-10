// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace greycat {
  namespace project {
    class gonna_timeout$args extends greycat.GCObject {
      static readonly _type = 'project::gonna_timeout$args';
      static createFrom($g?: greycat.GreyCat): gonna_timeout$args;
      static create($g?: greycat.GreyCat): gonna_timeout$args;
    }

    class Root extends greycat.GCObject {
      static readonly _type = 'project::Root';
      "project::n": greycat.core.node<string | null>;
      "project::nt": greycat.core.nodeTime<string>;
      "project::nl": greycat.core.nodeList<string>;
      "project::ni": greycat.core.nodeIndex<string, number>;
      "project::ng": greycat.core.nodeGeo<string>;
    }

    class array2$args extends greycat.GCObject {
      static readonly _type = 'project::array2$args';
      static createFrom($g?: greycat.GreyCat): array2$args;
      static create($g?: greycat.GreyCat): array2$args;
    }

    class identity$args extends greycat.GCObject {
      static readonly _type = 'project::identity$args';
      v: any | null;
      static createFrom(fields: {v?: any | null}, $g?: greycat.GreyCat): identity$args;
      static create(v?: any | null, $g?: greycat.GreyCat): identity$args;
    }

    class array_container$args extends greycat.GCObject {
      static readonly _type = 'project::array_container$args';
      ac: project.ArrayContainer;
      static createFrom(fields: {ac: project.ArrayContainer}, $g?: greycat.GreyCat): array_container$args;
      static create(ac: project.ArrayContainer, $g?: greycat.GreyCat): array_container$args;
    }

    class Foo extends greycat.GCObject {
      static readonly _type = 'project::Foo';
      a: number | bigint | null;
      static createFrom(fields: {a?: number | bigint | null}, $g?: greycat.GreyCat): Foo;
      static create(a?: number | bigint | null, $g?: greycat.GreyCat): Foo;
    }

    class foobar$args extends greycat.GCObject {
      static readonly _type = 'project::foobar$args';
      static createFrom($g?: greycat.GreyCat): foobar$args;
      static create($g?: greycat.GreyCat): foobar$args;
    }

    class array_mono$args extends greycat.GCObject {
      static readonly _type = 'project::array_mono$args';
      static createFrom($g?: greycat.GreyCat): array_mono$args;
      static create($g?: greycat.GreyCat): array_mono$args;
    }

    class enumValue$args extends greycat.GCObject {
      static readonly _type = 'project::enumValue$args';
      static createFrom($g?: greycat.GreyCat): enumValue$args;
      static create($g?: greycat.GreyCat): enumValue$args;
    }

    class tensor2$args extends greycat.GCObject {
      static readonly _type = 'project::tensor2$args';
      static createFrom($g?: greycat.GreyCat): tensor2$args;
      static create($g?: greycat.GreyCat): tensor2$args;
    }

    class Bar<T = any> extends greycat.GCObject {
      static readonly _type = 'project::Bar';
      attr: any | null;
      static createFrom<T>(fields: {attr?: any | null}, $g?: greycat.GreyCat): Bar;
      static create<T>(attr?: any | null, $g?: greycat.GreyCat): Bar<T>;
    }

    class std_int_max_bigint$args extends greycat.GCObject {
      static readonly _type = 'project::std_int_max_bigint$args';
      static createFrom($g?: greycat.GreyCat): std_int_max_bigint$args;
      static create($g?: greycat.GreyCat): std_int_max_bigint$args;
    }

    class float_f$args extends greycat.GCObject {
      static readonly _type = 'project::float_f$args';
      f: number | null;
      static createFrom(fields: {f?: number | null}, $g?: greycat.GreyCat): float_f$args;
      static create(f?: number | null, $g?: greycat.GreyCat): float_f$args;
    }

    class ambiguous2$args extends greycat.GCObject {
      static readonly _type = 'project::ambiguous2$args';
      static createFrom($g?: greycat.GreyCat): ambiguous2$args;
      static create($g?: greycat.GreyCat): ambiguous2$args;
    }

    class std_int_min_bigint$args extends greycat.GCObject {
      static readonly _type = 'project::std_int_min_bigint$args';
      static createFrom($g?: greycat.GreyCat): std_int_min_bigint$args;
      static create($g?: greycat.GreyCat): std_int_min_bigint$args;
    }

    class get_node_list$args extends greycat.GCObject {
      static readonly _type = 'project::get_node_list$args';
      static createFrom($g?: greycat.GreyCat): get_node_list$args;
      static create($g?: greycat.GreyCat): get_node_list$args;
    }

    class time$args extends greycat.GCObject {
      static readonly _type = 'project::time$args';
      static createFrom($g?: greycat.GreyCat): time$args;
      static create($g?: greycat.GreyCat): time$args;
    }

    class fn_pointer$args extends greycat.GCObject {
      static readonly _type = 'project::fn_pointer$args';
      static createFrom($g?: greycat.GreyCat): fn_pointer$args;
      static create($g?: greycat.GreyCat): fn_pointer$args;
    }

    class create_nodeTimes$args extends greycat.GCObject {
      static readonly _type = 'project::create_nodeTimes$args';
      static createFrom($g?: greycat.GreyCat): create_nodeTimes$args;
      static create($g?: greycat.GreyCat): create_nodeTimes$args;
    }

    class table3$args extends greycat.GCObject {
      static readonly _type = 'project::table3$args';
      static createFrom($g?: greycat.GreyCat): table3$args;
      static create($g?: greycat.GreyCat): table3$args;
    }

    class MyRow extends greycat.GCObject {
      static readonly _type = 'project::MyRow';
      id: number | bigint;
      temp: number;
      data: project.Named;
      static createFrom(fields: {id: number | bigint, temp: number, data: project.Named}, $g?: greycat.GreyCat): MyRow;
      static create(id: number | bigint, temp: number, data: project.Named, $g?: greycat.GreyCat): MyRow;
    }

    class Obj extends greycat.GCObject {
      static readonly _type = 'project::Obj';
      tuple: greycat.core.Tuple<any, any>;
      static createFrom(fields: {tuple: greycat.core.Tuple<any, any>}, $g?: greycat.GreyCat): Obj;
      static create(tuple: greycat.core.Tuple<any, any>, $g?: greycat.GreyCat): Obj;
    }

    class enum$args extends greycat.GCObject {
      static readonly _type = 'project::enum$args';
      static createFrom($g?: greycat.GreyCat): enum$args;
      static create($g?: greycat.GreyCat): enum$args;
    }

    class blockingFn$args extends greycat.GCObject {
      static readonly _type = 'project::blockingFn$args';
      static createFrom($g?: greycat.GreyCat): blockingFn$args;
      static create($g?: greycat.GreyCat): blockingFn$args;
    }

    class boom$args extends greycat.GCObject {
      static readonly _type = 'project::boom$args';
      static createFrom($g?: greycat.GreyCat): boom$args;
      static create($g?: greycat.GreyCat): boom$args;
    }

    class ArrayContainer extends greycat.GCObject {
      static readonly _type = 'project::ArrayContainer';
      arr: globalThis.Array<number | bigint>;
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}, $g?: greycat.GreyCat): ArrayContainer;
      static create(arr: globalThis.Array<number | bigint>, $g?: greycat.GreyCat): ArrayContainer;
    }

    class read_stringlit$args extends greycat.GCObject {
      static readonly _type = 'project::read_stringlit$args';
      arr: globalThis.Array<string>;
      static createFrom(fields: {arr: globalThis.Array<string>}, $g?: greycat.GreyCat): read_stringlit$args;
      static create(arr: globalThis.Array<string>, $g?: greycat.GreyCat): read_stringlit$args;
    }

    class print_table$args extends greycat.GCObject {
      static readonly _type = 'project::print_table$args';
      table: greycat.core.Table;
      static createFrom(fields: {table: greycat.core.Table}, $g?: greycat.GreyCat): print_table$args;
      static create(table: greycat.core.Table, $g?: greycat.GreyCat): print_table$args;
    }

    class slowTask$args extends greycat.GCObject {
      static readonly _type = 'project::slowTask$args';
      static createFrom($g?: greycat.GreyCat): slowTask$args;
      static create($g?: greycat.GreyCat): slowTask$args;
    }

    class Confidence extends greycat.GCEnum {
      static readonly _type = 'project::Confidence';
      key: Confidence.Field;
      constructor(type: greycat.AbiType, offset: number, key: Confidence.Field, value?: unknown);
      static High($g?: greycat.GreyCat): Confidence;
      static Medium($g?: greycat.GreyCat): Confidence;
      static Low($g?: greycat.GreyCat): Confidence;
      static $fields($g?: greycat.GreyCat): Confidence;
    }
    namespace Confidence  {
      type Field = 'High'|'Medium'|'Low';
    }

    class std_int_max_number$args extends greycat.GCObject {
      static readonly _type = 'project::std_int_max_number$args';
      static createFrom($g?: greycat.GreyCat): std_int_max_number$args;
      static create($g?: greycat.GreyCat): std_int_max_number$args;
    }

    class an_error$args extends greycat.GCObject {
      static readonly _type = 'project::an_error$args';
      static createFrom($g?: greycat.GreyCat): an_error$args;
      static create($g?: greycat.GreyCat): an_error$args;
    }

    class Named extends greycat.GCObject {
      static readonly _type = 'project::Named';
      name: string;
      static createFrom(fields: {name: string}, $g?: greycat.GreyCat): Named;
      static create(name: string, $g?: greycat.GreyCat): Named;
    }

    class periodic_task$args extends greycat.GCObject {
      static readonly _type = 'project::periodic_task$args';
      static createFrom($g?: greycat.GreyCat): periodic_task$args;
      static create($g?: greycat.GreyCat): periodic_task$args;
    }

    class get_node_index$args extends greycat.GCObject {
      static readonly _type = 'project::get_node_index$args';
      static createFrom($g?: greycat.GreyCat): get_node_index$args;
      static create($g?: greycat.GreyCat): get_node_index$args;
    }

    class vtable_test$args extends greycat.GCObject {
      static readonly _type = 'project::vtable_test$args';
      static createFrom($g?: greycat.GreyCat): vtable_test$args;
      static create($g?: greycat.GreyCat): vtable_test$args;
    }

    class FloatPrecisionTest extends greycat.GCObject {
      static readonly _type = 'project::FloatPrecisionTest';
      normal: number;
      precision: number;
      static createFrom(fields: {normal: number, precision: number}, $g?: greycat.GreyCat): FloatPrecisionTest;
      static create(normal: number, precision: number, $g?: greycat.GreyCat): FloatPrecisionTest;
    }

    class array_mono2$args extends greycat.GCObject {
      static readonly _type = 'project::array_mono2$args';
      static createFrom($g?: greycat.GreyCat): array_mono2$args;
      static create($g?: greycat.GreyCat): array_mono2$args;
    }

    class Contact extends greycat.GCObject {
      static readonly _type = 'project::Contact';
      firstname: string;
      lastname: string;
      age: number | bigint;
      static createFrom(fields: {firstname: string, lastname: string, age: number | bigint}, $g?: greycat.GreyCat): Contact;
      static create(firstname: string, lastname: string, age: number | bigint, $g?: greycat.GreyCat): Contact;
    }

    class contacts$args extends greycat.GCObject {
      static readonly _type = 'project::contacts$args';
      contacts: greycat.core.Table<project.Contact>;
      static createFrom(fields: {contacts: greycat.core.Table<project.Contact>}, $g?: greycat.GreyCat): contacts$args;
      static create(contacts: greycat.core.Table<project.Contact>, $g?: greycat.GreyCat): contacts$args;
    }

    class FooBar extends greycat.GCObject {
      static readonly _type = 'project::FooBar';
      tz: greycat.core.TimeZone;
      name: string;
      int: number | bigint;
      foo: project.FooBar | null;
      values: globalThis.Array<any>;
      static createFrom(fields: {tz: greycat.core.TimeZone, name: string, int: number | bigint, foo?: project.FooBar | null, values: globalThis.Array<any>}, $g?: greycat.GreyCat): FooBar;
      static create(tz: greycat.core.TimeZone, name: string, int: number | bigint, foo: project.FooBar | null, values: globalThis.Array<any>, $g?: greycat.GreyCat): FooBar;
    }

    class array_of_string$args extends greycat.GCObject {
      static readonly _type = 'project::array_of_string$args';
      arr: globalThis.Array<string>;
      static createFrom(fields: {arr: globalThis.Array<string>}, $g?: greycat.GreyCat): array_of_string$args;
      static create(arr: globalThis.Array<string>, $g?: greycat.GreyCat): array_of_string$args;
    }

    class std_int_min_number$args extends greycat.GCObject {
      static readonly _type = 'project::std_int_min_number$args';
      static createFrom($g?: greycat.GreyCat): std_int_min_number$args;
      static create($g?: greycat.GreyCat): std_int_min_number$args;
    }

    class array$args extends greycat.GCObject {
      static readonly _type = 'project::array$args';
      static createFrom($g?: greycat.GreyCat): array$args;
      static create($g?: greycat.GreyCat): array$args;
    }

    class longTask$args extends greycat.GCObject {
      static readonly _type = 'project::longTask$args';
      static createFrom($g?: greycat.GreyCat): longTask$args;
      static create($g?: greycat.GreyCat): longTask$args;
    }

    class tensor3$args extends greycat.GCObject {
      static readonly _type = 'project::tensor3$args';
      static createFrom($g?: greycat.GreyCat): tensor3$args;
      static create($g?: greycat.GreyCat): tensor3$args;
    }

    class geo$args extends greycat.GCObject {
      static readonly _type = 'project::geo$args';
      static createFrom($g?: greycat.GreyCat): geo$args;
      static create($g?: greycat.GreyCat): geo$args;
    }

    class task_with_params$args extends greycat.GCObject {
      static readonly _type = 'project::task_with_params$args';
      different: string;
      age: number | bigint;
      static createFrom(fields: {different: string, age: number | bigint}, $g?: greycat.GreyCat): task_with_params$args;
      static create(different: string, age: number | bigint, $g?: greycat.GreyCat): task_with_params$args;
    }

    class testTensor$args extends greycat.GCObject {
      static readonly _type = 'project::testTensor$args';
      static createFrom($g?: greycat.GreyCat): testTensor$args;
      static create($g?: greycat.GreyCat): testTensor$args;
    }

    class geos$args extends greycat.GCObject {
      static readonly _type = 'project::geos$args';
      static createFrom($g?: greycat.GreyCat): geos$args;
      static create($g?: greycat.GreyCat): geos$args;
    }

    class table2$args extends greycat.GCObject {
      static readonly _type = 'project::table2$args';
      static createFrom($g?: greycat.GreyCat): table2$args;
      static create($g?: greycat.GreyCat): table2$args;
    }

    class std_bool$args extends greycat.GCObject {
      static readonly _type = 'project::std_bool$args';
      static createFrom($g?: greycat.GreyCat): std_bool$args;
      static create($g?: greycat.GreyCat): std_bool$args;
    }

    class tensor$args extends greycat.GCObject {
      static readonly _type = 'project::tensor$args';
      static createFrom($g?: greycat.GreyCat): tensor$args;
      static create($g?: greycat.GreyCat): tensor$args;
    }

    class ambiguous$args extends greycat.GCObject {
      static readonly _type = 'project::ambiguous$args';
      static createFrom($g?: greycat.GreyCat): ambiguous$args;
      static create($g?: greycat.GreyCat): ambiguous$args;
    }

    class some_table$args extends greycat.GCObject {
      static readonly _type = 'project::some_table$args';
      static createFrom($g?: greycat.GreyCat): some_table$args;
      static create($g?: greycat.GreyCat): some_table$args;
    }

    class get_node_time$args extends greycat.GCObject {
      static readonly _type = 'project::get_node_time$args';
      static createFrom($g?: greycat.GreyCat): get_node_time$args;
      static create($g?: greycat.GreyCat): get_node_time$args;
    }

    class array3$args extends greycat.GCObject {
      static readonly _type = 'project::array3$args';
      static createFrom($g?: greycat.GreyCat): array3$args;
      static create($g?: greycat.GreyCat): array3$args;
    }

    class get_node_geo$args extends greycat.GCObject {
      static readonly _type = 'project::get_node_geo$args';
      static createFrom($g?: greycat.GreyCat): get_node_geo$args;
      static create($g?: greycat.GreyCat): get_node_geo$args;
    }

    class get_node$args extends greycat.GCObject {
      static readonly _type = 'project::get_node$args';
      static createFrom($g?: greycat.GreyCat): get_node$args;
      static create($g?: greycat.GreyCat): get_node$args;
    }

    class std_int$args extends greycat.GCObject {
      static readonly _type = 'project::std_int$args';
      static createFrom($g?: greycat.GreyCat): std_int$args;
      static create($g?: greycat.GreyCat): std_int$args;
    }

    class Sensor extends greycat.GCObject {
      static readonly _type = 'project::Sensor';
      id: string;
      temp: number;
      humidity: number;
      static createFrom(fields: {id: string, temp: number, humidity: number}, $g?: greycat.GreyCat): Sensor;
      static create(id: string, temp: number, humidity: number, $g?: greycat.GreyCat): Sensor;
    }

    class Person extends greycat.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      static createFrom(fields: {name: string, age: number | bigint}, $g?: greycat.GreyCat): Person;
      static create(name: string, age: number | bigint, $g?: greycat.GreyCat): Person;
    }

    class table$args extends greycat.GCObject {
      static readonly _type = 'project::table$args';
      static createFrom($g?: greycat.GreyCat): table$args;
      static create($g?: greycat.GreyCat): table$args;
    }

    class array_of_int$args extends greycat.GCObject {
      static readonly _type = 'project::array_of_int$args';
      arr: globalThis.Array<number | bigint>;
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}, $g?: greycat.GreyCat): array_of_int$args;
      static create(arr: globalThis.Array<number | bigint>, $g?: greycat.GreyCat): array_of_int$args;
    }

    class map$args extends greycat.GCObject {
      static readonly _type = 'project::map$args';
      static createFrom($g?: greycat.GreyCat): map$args;
      static create($g?: greycat.GreyCat): map$args;
    }

    class computeTask$args extends greycat.GCObject {
      static readonly _type = 'project::computeTask$args';
      static createFrom($g?: greycat.GreyCat): computeTask$args;
      static create($g?: greycat.GreyCat): computeTask$args;
    }

    class foo$args extends greycat.GCObject {
      static readonly _type = 'project::foo$args';
      static createFrom($g?: greycat.GreyCat): foo$args;
      static create($g?: greycat.GreyCat): foo$args;
    }

    class sensor_table$args extends greycat.GCObject {
      static readonly _type = 'project::sensor_table$args';
      static createFrom($g?: greycat.GreyCat): sensor_table$args;
      static create($g?: greycat.GreyCat): sensor_table$args;
    }

    class array_of_float$args extends greycat.GCObject {
      static readonly _type = 'project::array_of_float$args';
      arr: globalThis.Array<number>;
      static createFrom(fields: {arr: globalThis.Array<number>}, $g?: greycat.GreyCat): array_of_float$args;
      static create(arr: globalThis.Array<number>, $g?: greycat.GreyCat): array_of_float$args;
    }

    class CustomType extends greycat.GCObject {
      static readonly _type = 'project::CustomType';
      string: string;
      int: number | bigint;
      float: number;
      bool: boolean;
      char: string;
      enum_: greycat.core.TimeZone;
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: greycat.core.TimeZone}, $g?: greycat.GreyCat): CustomType;
      static create(string: string, int: number | bigint, float: number, bool: boolean, char: string, enum_: greycat.core.TimeZone, $g?: greycat.GreyCat): CustomType;
    }

    function map($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function array($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
    function array2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array3($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_mono($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function array_mono2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
    function table($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function longTask($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function slowTask($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function computeTask($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function testTensor($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Tensor>;
    function tensor($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tensor3($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foo($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<project.Foo>;
    function task_with_params(different: string, age: number | bigint, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    function enum_($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function time($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function an_error($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function float_f(f?: number | null, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function blockingFn($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function enumValue($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foobar($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function vtable_test($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function print_table(table: greycat.core.Table, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function fn_pointer($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function identity(v?: any | null, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<any | null>;
    function array_container(ac: project.ArrayContainer, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function read_stringlit(arr: globalThis.Array<string>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function contacts(contacts: greycat.core.Table<project.Contact>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_int(arr: globalThis.Array<number | bigint>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_float(arr: globalThis.Array<number>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_of_string(arr: globalThis.Array<string>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function boom($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function sensor_table($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Sensor>>;
    function geo($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function geos($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function periodic_task($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.runtime.PeriodicTask>;
    function create_nodeTimes($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table3($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_bool($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_number($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_min_bigint($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_number($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function std_int_max_bigint($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function some_table($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function gonna_timeout($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_time($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_list($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_index($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_node_geo($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function ambiguous2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
  }

}
declare namespace greycat {
  interface GreyCat {
      call(method: 'project::map', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      spawn(method: 'project::map', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::map', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      call(method: 'project::array', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
      spawn(method: 'project::array', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
      call(method: 'project::array2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::array3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array3', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::array_mono', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
      spawn(method: 'project::array_mono', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_mono', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
      call(method: 'project::array_mono2', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
      spawn(method: 'project::array_mono2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_mono2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<boolean>>;
      call(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::longTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::longTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::longTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::slowTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::slowTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::slowTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::computeTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::computeTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::computeTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::testTensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Tensor>;
      spawn(method: 'project::testTensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::testTensor', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Tensor>;
      call(method: 'project::tensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::tensor', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::tensor', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::tensor2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::tensor2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::tensor2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::tensor3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::tensor3', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::tensor3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<project.Foo>;
      spawn(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<project.Foo>;
      call(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<string>;
      spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
      call(method: 'project::enum', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::enum', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::enum', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::table2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::table2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::table2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::time', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::time', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::an_error', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::an_error', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::an_error', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::float_f', args: [number | null], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::float_f', args: [number | null], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::float_f', args: [number | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::blockingFn', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::blockingFn', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::blockingFn', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::enumValue', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::enumValue', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::enumValue', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::foobar', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::foobar', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::foobar', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::vtable_test', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::vtable_test', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::vtable_test', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::print_table', args: [greycat.core.Table], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::print_table', args: [greycat.core.Table], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::print_table', args: [greycat.core.Table], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::fn_pointer', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::fn_pointer', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::fn_pointer', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::identity', args: [any | null], signal?: globalThis.AbortSignal): Promise<any | null>;
      spawn(method: 'project::identity', args: [any | null], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::identity', args: [any | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<any | null>;
      call(method: 'project::array_container', args: [project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array_container', args: [project.ArrayContainer], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_container', args: [project.ArrayContainer], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::read_stringlit', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::read_stringlit', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::contacts', args: [greycat.core.Table<project.Contact>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::contacts', args: [greycat.core.Table<project.Contact>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::contacts', args: [greycat.core.Table<project.Contact>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_of_int', args: [globalThis.Array<number | bigint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::array_of_float', args: [globalThis.Array<number>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array_of_float', args: [globalThis.Array<number>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_of_float', args: [globalThis.Array<number>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::array_of_string', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::array_of_string', args: [globalThis.Array<string>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_of_string', args: [globalThis.Array<string>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::boom', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Sensor>>;
      spawn(method: 'project::sensor_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::sensor_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Sensor>>;
      call(method: 'project::geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::geo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::geos', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::geos', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::geos', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::periodic_task', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.PeriodicTask>;
      spawn(method: 'project::periodic_task', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::periodic_task', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.runtime.PeriodicTask>;
      call(method: 'project::create_nodeTimes', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::create_nodeTimes', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::create_nodeTimes', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::table3', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::table3', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::table3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_bool', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_bool', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_bool', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_int', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_int', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_int_min_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_int_min_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_int_min_number', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_int_min_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_int_min_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_int_min_bigint', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_int_max_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_int_max_number', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_int_max_number', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::std_int_max_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::std_int_max_bigint', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::std_int_max_bigint', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::some_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::some_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::some_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::gonna_timeout', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::gonna_timeout', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::gonna_timeout', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_node', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_node', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_node', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_node_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_node_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_node_time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_node_list', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_node_list', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_node_list', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_node_index', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_node_index', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_node_index', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_node_geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_node_geo', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_node_geo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::ambiguous', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::ambiguous', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::ambiguous', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::ambiguous2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::ambiguous2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::ambiguous2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
  }
}
