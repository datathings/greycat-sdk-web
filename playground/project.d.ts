// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
/* oxlint-disable */
declare namespace gc {
  namespace project {
    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class persons$args extends gc.sdk.GCObject {
      static readonly _type = 'project::persons$args';
    }

    class table_of_objects$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects$args';
    }

    class obj1$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj1$args';
    }

    class table_of_objects3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects3$args';
    }

    class link_whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::link_whatever$args';
      static readonly $fields: link_whatever$args.$Fields;
      l: gc.core.node<gc.project.Link>;
      constructor(l: gc.core.node<gc.project.Link>);
      static createFrom(fields: {l: gc.core.node<gc.project.Link>}): link_whatever$args;
    }
    namespace link_whatever$args {
      interface $Fields {
        l: 0;
      }
    }

    class task_long_running$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running$args';
    }

    class Link$whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::Link$whatever$args';
      static readonly $fields: Link$whatever$args.$Fields;
      link: gc.core.node<gc.project.Link>;
      constructor(link: gc.core.node<gc.project.Link>);
      static createFrom(fields: {link: gc.core.node<gc.project.Link>}): Link$whatever$args;
    }
    namespace Link$whatever$args {
      interface $Fields {
        link: 0;
      }
    }

    class chart$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart$args';
      static readonly $fields: chart$args.$Fields;
      nbRows: number | bigint;
      constructor(nbRows: number | bigint);
      static createFrom(fields: {nbRows: number | bigint}): chart$args;
    }
    namespace chart$args {
      interface $Fields {
        nbRows: 0;
      }
    }

    class Level extends gc.sdk.GCEnum {
      static readonly _type = 'project::Level';
      static readonly $fields: Level[];
      key: Level.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Level.Field);
      static High: Level;
      static Normal: Level;
      static Low: Level;
    }
    namespace Level  {
      type Field = "High"|"Normal"|"Low";
    }

    class real_example$args extends gc.sdk.GCObject {
      static readonly _type = 'project::real_example$args';
    }

    class TrafficLight extends gc.sdk.GCEnum {
      static readonly _type = 'project::TrafficLight';
      static readonly $fields: TrafficLight[];
      key: TrafficLight.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TrafficLight.Field);
      static Green: TrafficLight;
      static Yellow: TrafficLight;
      static Red: TrafficLight;
    }
    namespace TrafficLight  {
      type Field = "Green"|"Yellow"|"Red";
    }

    class Rect extends gc.sdk.GCObject {
      static readonly _type = 'project::Rect';
      static readonly $fields: Rect.$Fields;
      width: number;
      height: number;
      constructor(width: number, height: number);
      static createFrom(fields: {width: number, height: number}): Rect;
    }
    namespace Rect {
      interface $Fields {
        width: 0;
        height: 1;
      }
    }

    class display_fn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::display_fn$args';
      static readonly $fields: display_fn$args.$Fields;
      fn_: gc.core.function_;
      constructor(fn_: gc.core.function_);
      static createFrom(fields: {fn_: gc.core.function_}): display_fn$args;
    }
    namespace display_fn$args {
      interface $Fields {
        fn_: 0;
      }
    }

    class ObjWithFn extends gc.sdk.GCObject {
      static readonly _type = 'project::ObjWithFn';
      static readonly $fields: ObjWithFn.$Fields;
      fn: gc.core.function_;
      constructor(fn: gc.core.function_);
      static createFrom(fields: {fn: gc.core.function_}): ObjWithFn;
    }
    namespace ObjWithFn {
      interface $Fields {
        fn: 0;
      }
    }

    class bar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::bar$args';
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
    }

    class People extends gc.sdk.GCObject {
      static readonly _type = 'project::People';
      static readonly $fields: People.$Fields;
      Index: number | bigint;
      "User id": string;
      "First Name": string;
      "Last Name": string;
      Sex: gc.project.Sex;
      Email: string;
      Phone: string;
      "Date of birth": gc.core.time;
      "Job Title": string;
      constructor(Index: number | bigint, User_id: string, First_Name: string, Last_Name: string, Sex: gc.project.Sex, Email: string, Phone: string, Date_of_birth: gc.core.time, Job_Title: string);
      static createFrom(fields: {Index: number | bigint, "User id": string, "First Name": string, "Last Name": string, Sex: gc.project.Sex, Email: string, Phone: string, "Date of birth": gc.core.time, "Job Title": string}): People;
    }
    namespace People {
      interface $Fields {
        Index: 0;
        "User id": 1;
        "First Name": 2;
        "Last Name": 3;
        Sex: 4;
        Email: 5;
        Phone: 6;
        "Date of birth": 7;
        "Job Title": 8;
      }
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

    class table_of_objects2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects2$args';
    }

    class boxes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::boxes$args';
    }

    class this_is_boom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::this_is_boom$args';
    }

    class Node extends gc.sdk.GCObject {
      static readonly _type = 'project::Node';
      static readonly $fields: Node.$Fields;
      id: string;
      value: any;
      link: gc.core.node<gc.project.Node> | null;
      constructor(id: string, value: any, link?: gc.core.node<gc.project.Node> | null);
      static createFrom(fields: {id: string, value: any, link?: gc.core.node<gc.project.Node> | null}): Node;
    }
    namespace Node {
      interface $Fields {
        id: 0;
        value: 1;
        link: 2;
      }
    }

    class TimeRecord<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::TimeRecord';
      static readonly $fields: TimeRecord.$Fields;
      time: gc.core.time;
      value: T;
      constructor(time: gc.core.time, value?: T);
      static createFrom<T>(fields: {time: gc.core.time, value?: T}): TimeRecord;
    }
    namespace TimeRecord {
      interface $Fields {
        time: 0;
        value: 1;
      }
    }

    class people$args extends gc.sdk.GCObject {
      static readonly _type = 'project::people$args';
    }

    class MyData extends gc.sdk.GCObject {
      static readonly _type = 'project::MyData';
      static readonly $fields: MyData.$Fields;
      level: gc.project.Level;
      value: number;
      constructor(level: gc.project.Level, value: number);
      static createFrom(fields: {level: gc.project.Level, value: number}): MyData;
    }
    namespace MyData {
      interface $Fields {
        level: 0;
        value: 1;
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

    class array_of_nodes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_nodes$args';
    }

    class tree$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tree$args';
    }

    class obj2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj2$args';
    }

    class histogram_stats$args extends gc.sdk.GCObject {
      static readonly _type = 'project::histogram_stats$args';
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      static readonly $fields: Sensor.$Fields;
      id: number | bigint;
      kind: gc.project.SensorKind;
      constructor(id: number | bigint, kind: gc.project.SensorKind);
      static createFrom(fields: {id: number | bigint, kind: gc.project.SensorKind}): Sensor;
    }
    namespace Sensor {
      interface $Fields {
        id: 0;
        kind: 1;
      }
    }

    class resolve_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::resolve_person$args';
    }

    class Box extends gc.sdk.GCObject {
      static readonly _type = 'project::Box';
      static readonly $fields: Box.$Fields;
      value: number | bigint;
      constructor(value: number | bigint);
      static createFrom(fields: {value: number | bigint}): Box;
    }
    namespace Box {
      interface $Fields {
        value: 0;
      }
    }

    class obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj$args';
    }

    class SeriesObject extends gc.sdk.GCObject {
      static readonly _type = 'project::SeriesObject';
      static readonly $fields: SeriesObject.$Fields;
      a: number | bigint;
      b: number;
      constructor(a: number | bigint, b: number);
      static createFrom(fields: {a: number | bigint, b: number}): SeriesObject;
    }
    namespace SeriesObject {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class init_foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::init_foo$args';
    }

    class sample_huge_csv$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sample_huge_csv$args';
    }

    class mapTest$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mapTest$args';
    }

    class goodFnForTestingFnCallInput$args extends gc.sdk.GCObject {
      static readonly _type = 'project::goodFnForTestingFnCallInput$args';
      static readonly $fields: goodFnForTestingFnCallInput$args.$Fields;
      name: string;
      flag: boolean;
      item: gc.core.DurationUnit;
      optionalFlag: boolean | null;
      constructor(name: string, flag: boolean, item: gc.core.DurationUnit, optionalFlag?: boolean | null);
      static createFrom(fields: {name: string, flag: boolean, item: gc.core.DurationUnit, optionalFlag?: boolean | null}): goodFnForTestingFnCallInput$args;
    }
    namespace goodFnForTestingFnCallInput$args {
      interface $Fields {
        name: 0;
        flag: 1;
        item: 2;
        optionalFlag: 3;
      }
    }

    class big_map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::big_map$args';
    }

    class Obj2 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj2';
      static readonly $fields: Obj2.$Fields;
      prop1: string;
      prop2: globalThis.Array<gc.runtime.User | null>;
      prop3: globalThis.Map<string, gc.project.Person | null>;
      prop4: any | null;
      constructor(prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, gc.project.Person | null>, prop4?: any | null);
      static createFrom(fields: {prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, gc.project.Person | null>, prop4?: any | null}): Obj2;
    }
    namespace Obj2 {
      interface $Fields {
        prop1: 0;
        prop2: 1;
        prop3: 2;
        prop4: 3;
      }
    }

    class chart_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_time$args';
    }

    class task_long_running2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running2$args';
    }

    class complex_object$args extends gc.sdk.GCObject {
      static readonly _type = 'project::complex_object$args';
    }

    class Person2 extends gc.sdk.GCObject {
      static readonly _type = 'project::Person2';
      static readonly $fields: Person2.$Fields;
      id: number | bigint;
      name: string;
      age: number | bigint;
      children: number | bigint;
      constructor(id: number | bigint, name: string, age: number | bigint, children: number | bigint);
      static createFrom(fields: {id: number | bigint, name: string, age: number | bigint, children: number | bigint}): Person2;
    }
    namespace Person2 {
      interface $Fields {
        id: 0;
        name: 1;
        age: 2;
        children: 3;
      }
    }

    class TimeZones extends gc.sdk.GCObject {
      static readonly _type = 'project::TimeZones';
      static readonly $fields: TimeZones.$Fields;
      azores: gc.core.Date;
      utc: gc.core.Date;
      paris: gc.core.Date;
      athens: gc.core.Date;
      constructor(azores: gc.core.Date, utc: gc.core.Date, paris: gc.core.Date, athens: gc.core.Date);
      static createFrom(fields: {azores: gc.core.Date, utc: gc.core.Date, paris: gc.core.Date, athens: gc.core.Date}): TimeZones;
    }
    namespace TimeZones {
      interface $Fields {
        azores: 0;
        utc: 1;
        paris: 2;
        athens: 3;
      }
    }

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      static readonly $fields: Obj.$Fields;
      field: any | null;
      tuple: gc.core.Tuple<any, any>;
      constructor(field: any | null, tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {field?: any | null, tuple: gc.core.Tuple<any, any>}): Obj;
    }
    namespace Obj {
      interface $Fields {
        field: 0;
        tuple: 1;
      }
    }

    class Triangle extends gc.sdk.GCObject {
      static readonly _type = 'project::Triangle';
      static readonly $fields: Triangle.$Fields;
      base: number;
      height: number;
      constructor(base: number, height: number);
      static createFrom(fields: {base: number, height: number}): Triangle;
    }
    namespace Triangle {
      interface $Fields {
        base: 0;
        height: 1;
      }
    }

    class Circle extends gc.sdk.GCObject {
      static readonly _type = 'project::Circle';
      static readonly $fields: Circle.$Fields;
      radius: number;
      constructor(radius: number);
      static createFrom(fields: {radius: number}): Circle;
    }
    namespace Circle {
      interface $Fields {
        radius: 0;
      }
    }

    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      static readonly $fields: Root.$Fields;
      "project::sensor": gc.core.nodeTime<gc.project.SensorData>;
      "project::serie_float": gc.core.nodeTime<number>;
      "project::kline": gc.core.nodeTime<gc.project.KLine>;
      "project::nt": gc.core.nodeTime;
      "project::non_overlapping_1": gc.core.nodeTime<number>;
      "project::non_overlapping_2": gc.core.nodeTime<number>;
      "project::non_overlapping_3": gc.core.nodeTime<number>;
      "project::simple_index": gc.core.nodeIndex<string, number | bigint>;
      "project::person": gc.core.node<gc.project.Person2 | null>;
      "project::huge_table": gc.core.node<gc.core.Table | null>;
      "heatmap::earthquakes_by_geo": gc.core.nodeGeo<gc.heatmap.Earthquake>;
      "heatmap::earthquakes_by_time": gc.core.nodeTime<gc.heatmap.Earthquake>;
      "cities::cities": gc.core.nodeGeo<gc.cities.City>;
    }
    namespace Root {
      interface $Fields {
        "project::sensor": 0;
        "project::serie_float": 1;
        "project::kline": 2;
        "project::nt": 3;
        "project::non_overlapping_1": 4;
        "project::non_overlapping_2": 5;
        "project::non_overlapping_3": 6;
        "project::simple_index": 7;
        "project::person": 8;
        "project::huge_table": 9;
        "heatmap::earthquakes_by_geo": 10;
        "heatmap::earthquakes_by_time": 11;
        "cities::cities": 12;
      }
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class SolarRadiation extends gc.sdk.GCObject {
      static readonly _type = 'project::SolarRadiation';
      static readonly $fields: SolarRadiation.$Fields;
      is_enabled: boolean;
      radiance: gc.core.nodeTime;
      instant_power: gc.core.nodeTime;
      constructor(is_enabled: boolean, radiance: gc.core.nodeTime, instant_power: gc.core.nodeTime);
      static createFrom(fields: {is_enabled: boolean, radiance: gc.core.nodeTime, instant_power: gc.core.nodeTime}): SolarRadiation;
    }
    namespace SolarRadiation {
      interface $Fields {
        is_enabled: 0;
        radiance: 1;
        instant_power: 2;
      }
    }

    class Book extends gc.sdk.GCObject {
      static readonly _type = 'project::Book';
      static readonly $fields: Book.$Fields;
      name: string;
      owner: gc.project.Person | null;
      constructor(name: string, owner?: gc.project.Person | null);
      static createFrom(fields: {name: string, owner?: gc.project.Person | null}): Book;
    }
    namespace Book {
      interface $Fields {
        name: 0;
        owner: 1;
      }
    }

    class SensorKind extends gc.sdk.GCEnum {
      static readonly _type = 'project::SensorKind';
      static readonly $fields: SensorKind[];
      key: SensorKind.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SensorKind.Field);
      static Temp: SensorKind;
      static Pressure: SensorKind;
    }
    namespace SensorKind  {
      type Field = "Temp"|"Pressure";
    }

    class get_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_person$args';
    }

    class KLine extends gc.sdk.GCObject {
      static readonly _type = 'project::KLine';
      static readonly $fields: KLine.$Fields;
      open: number;
      close: number;
      volume: number | bigint;
      constructor(open: number, close: number, volume: number | bigint);
      static createFrom(fields: {open: number, close: number, volume: number | bigint}): KLine;
    }
    namespace KLine {
      interface $Fields {
        open: 0;
        close: 1;
        volume: 2;
      }
    }

    class RelayApp extends gc.sdk.GCEnum {
      static readonly _type = 'project::RelayApp';
      static readonly $fields: RelayApp[];
      key: RelayApp.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: RelayApp.Field);
      static pv: RelayApp;
      static pv_shelly: RelayApp;
      static ev: RelayApp;
      static ev_shelly: RelayApp;
      static empty: RelayApp;
    }
    namespace RelayApp  {
      type Field = "pv"|"pv_shelly"|"ev"|"ev_shelly"|"empty";
    }

    class task_without_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_without_params$args';
    }

    class ComplexObject extends gc.sdk.GCObject {
      static readonly _type = 'project::ComplexObject';
      static readonly $fields: ComplexObject.$Fields;
      string: string;
      int: number | bigint;
      float: number;
      bool: boolean;
      char: string;
      geo: gc.core.geo;
      null: any | null;
      enum: gc.core.TimeZone;
      array: globalThis.Array<any | null>;
      nodeTime: gc.core.nodeTime;
      nodeIndex: gc.core.nodeIndex;
      nodeList: gc.core.nodeList;
      nodeGeo: gc.core.nodeGeo;
      nested: any | null;
      map: globalThis.Map<string, any>;
      tuple: gc.core.Tuple<any, any>;
      t2: gc.core.t2;
      t2f: gc.core.t2f;
      t3: gc.core.t3;
      t3f: gc.core.t3f;
      t4: gc.core.t4;
      t4f: gc.core.t4f;
      str: gc.core.str;
      date: gc.core.Date;
      constructor(string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: gc.core.geo, null_: any | null, enum_: gc.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: gc.core.nodeTime, nodeIndex: gc.core.nodeIndex, nodeList: gc.core.nodeList, nodeGeo: gc.core.nodeGeo, nested: any | null, map: globalThis.Map<string, any>, tuple: gc.core.Tuple<any, any>, t2: gc.core.t2, t2f: gc.core.t2f, t3: gc.core.t3, t3f: gc.core.t3f, t4: gc.core.t4, t4f: gc.core.t4f, str: gc.core.str, date: gc.core.Date);
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: gc.core.geo, null_?: any | null, enum_: gc.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: gc.core.nodeTime, nodeIndex: gc.core.nodeIndex, nodeList: gc.core.nodeList, nodeGeo: gc.core.nodeGeo, nested?: any | null, map: globalThis.Map<string, any>, tuple: gc.core.Tuple<any, any>, t2: gc.core.t2, t2f: gc.core.t2f, t3: gc.core.t3, t3f: gc.core.t3f, t4: gc.core.t4, t4f: gc.core.t4f, str: gc.core.str, date: gc.core.Date}): ComplexObject;
    }
    namespace ComplexObject {
      interface $Fields {
        string: 0;
        int: 1;
        float: 2;
        bool: 3;
        char: 4;
        geo: 5;
        null: 6;
        enum: 7;
        array: 8;
        nodeTime: 9;
        nodeIndex: 10;
        nodeList: 11;
        nodeGeo: 12;
        nested: 13;
        map: 14;
        tuple: 15;
        t2: 16;
        t2f: 17;
        t3: 18;
        t3f: 19;
        t4: 20;
        t4f: 21;
        str: 22;
        date: 23;
      }
    }

    class Obj1 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj1';
      static readonly $fields: Obj1.$Fields;
      prop1: string;
      prop2: gc.runtime.User;
      prop3: gc.runtime.RuntimeInfo;
      constructor(prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo);
      static createFrom(fields: {prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo}): Obj1;
    }
    namespace Obj1 {
      interface $Fields {
        prop1: 0;
        prop2: 1;
        prop3: 2;
      }
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      static readonly $fields: Person.$Fields;
      name: string;
      age: number | bigint;
      activated: boolean;
      constructor(name: string, age: number | bigint, activated: boolean);
      static createFrom(fields: {name: string, age: number | bigint, activated: boolean}): Person;
    }
    namespace Person {
      interface $Fields {
        name: 0;
        age: 1;
        activated: 2;
      }
    }

    class heatmap$args extends gc.sdk.GCObject {
      static readonly _type = 'project::heatmap$args';
    }

    class TimedComposed extends gc.sdk.GCObject {
      static readonly _type = 'project::TimedComposed';
      static readonly $fields: TimedComposed.$Fields;
      time: gc.core.time;
      a: number | bigint;
      b: number;
      constructor(time: gc.core.time, a: number | bigint, b: number);
      static createFrom(fields: {time: gc.core.time, a: number | bigint, b: number}): TimedComposed;
    }
    namespace TimedComposed {
      interface $Fields {
        time: 0;
        a: 1;
        b: 2;
      }
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      static readonly $fields: task_with_params$args.$Fields;
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): task_with_params$args;
    }
    namespace task_with_params$args {
      interface $Fields {
        name: 0;
        age: 1;
      }
    }

    class anything$args extends gc.sdk.GCObject {
      static readonly _type = 'project::anything$args';
      static readonly $fields: anything$args.$Fields;
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): anything$args;
    }
    namespace anything$args {
      interface $Fields {
        v: 0;
      }
    }

    class UrlEntry extends gc.sdk.GCObject {
      static readonly _type = 'project::UrlEntry';
      static readonly $fields: UrlEntry.$Fields;
      name: string;
      value: string;
      constructor(name: string, value: string);
      static createFrom(fields: {name: string, value: string}): UrlEntry;
    }
    namespace UrlEntry {
      interface $Fields {
        name: 0;
        value: 1;
      }
    }

    class array_of_ints$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_ints$args';
      static readonly $fields: array_of_ints$args.$Fields;
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_ints$args;
    }
    namespace array_of_ints$args {
      interface $Fields {
        arr: 0;
      }
    }

    class ComplexForm extends gc.sdk.GCObject {
      static readonly _type = 'project::ComplexForm';
      static readonly $fields: ComplexForm.$Fields;
      shapes: globalThis.Array<gc.project.Shape>;
      shape: gc.project.Shape;
      constructor(shapes: globalThis.Array<gc.project.Shape>, shape: gc.project.Shape);
      static createFrom(fields: {shapes: globalThis.Array<gc.project.Shape>, shape: gc.project.Shape}): ComplexForm;
    }
    namespace ComplexForm {
      interface $Fields {
        shapes: 0;
        shape: 1;
      }
    }

    class display_fn_in_obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::display_fn_in_obj$args';
      static readonly $fields: display_fn_in_obj$args.$Fields;
      o: gc.project.ObjWithFn;
      constructor(o: gc.project.ObjWithFn);
      static createFrom(fields: {o: gc.project.ObjWithFn}): display_fn_in_obj$args;
    }
    namespace display_fn_in_obj$args {
      interface $Fields {
        o: 0;
      }
    }

    class serie_of_obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::serie_of_obj$args';
    }

    class Sex extends gc.sdk.GCEnum {
      static readonly _type = 'project::Sex';
      static readonly $fields: Sex[];
      key: Sex.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Sex.Field);
      static Male: Sex;
      static Female: Sex;
    }
    namespace Sex  {
      type Field = "Male"|"Female";
    }

    class SensorData extends gc.sdk.GCObject {
      static readonly _type = 'project::SensorData';
      static readonly $fields: SensorData.$Fields;
      temperature: number;
      pression: number;
      humidity: number;
      constructor(temperature: number, pression: number, humidity: number);
      static createFrom(fields: {temperature: number, pression: number, humidity: number}): SensorData;
    }
    namespace SensorData {
      interface $Fields {
        temperature: 0;
        pression: 1;
        humidity: 2;
      }
    }

    class add$args extends gc.sdk.GCObject {
      static readonly _type = 'project::add$args';
      static readonly $fields: add$args.$Fields;
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): add$args;
    }
    namespace add$args {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class SemiRecursive extends gc.sdk.GCObject {
      static readonly _type = 'project::SemiRecursive';
      static readonly $fields: SemiRecursive.$Fields;
      sub: gc.project.SemiRecursive | null;
      constructor(sub?: gc.project.SemiRecursive | null);
      static createFrom(fields: {sub?: gc.project.SemiRecursive | null}): SemiRecursive;
    }
    namespace SemiRecursive {
      interface $Fields {
        sub: 0;
      }
    }

    class Meteo extends gc.sdk.GCObject {
      static readonly _type = 'project::Meteo';
      static readonly $fields: Meteo.$Fields;
      ideal_solar: gc.core.node<gc.project.SolarRadiation>;
      visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>;
      constructor(ideal_solar: gc.core.node<gc.project.SolarRadiation>, visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>);
      static createFrom(fields: {ideal_solar: gc.core.node<gc.project.SolarRadiation>, visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>}): Meteo;
    }
    namespace Meteo {
      interface $Fields {
        ideal_solar: 0;
        visual_crossing: 1;
      }
    }

    class data_array$args extends gc.sdk.GCObject {
      static readonly _type = 'project::data_array$args';
    }

    class one_d_histogram_bins$args extends gc.sdk.GCObject {
      static readonly _type = 'project::one_d_histogram_bins$args';
    }

    class chart_colored_area$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_colored_area$args';
    }

    class donut$args extends gc.sdk.GCObject {
      static readonly _type = 'project::donut$args';
    }

    class table_with_urls$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_with_urls$args';
    }

    class Shape extends gc.sdk.GCObject {
      static readonly _type = 'project::Shape';
    }

    class mainTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mainTask$args';
    }

    class objects_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::objects_table$args';
    }

    class MapContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::MapContainer';
      static readonly $fields: MapContainer.$Fields;
      a: globalThis.Map<number | bigint, string>;
      b: globalThis.Map<gc.core.TimeZone, string>;
      c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>;
      d: globalThis.Array<gc.project.Person | null>;
      e: globalThis.Map<string, string | null>;
      constructor(a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>, d: globalThis.Array<gc.project.Person | null>, e: globalThis.Map<string, string | null>);
      static createFrom(fields: {a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>, d: globalThis.Array<gc.project.Person | null>, e: globalThis.Map<string, string | null>}): MapContainer;
    }
    namespace MapContainer {
      interface $Fields {
        a: 0;
        b: 1;
        c: 2;
        d: 3;
        e: 4;
      }
    }

    class Composed extends gc.sdk.GCObject {
      static readonly _type = 'project::Composed';
      static readonly $fields: Composed.$Fields;
      a: number | bigint;
      b: number;
      constructor(a: number | bigint, b: number);
      static createFrom(fields: {a: number | bigint, b: number}): Composed;
    }
    namespace Composed {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class hello$args extends gc.sdk.GCObject {
      static readonly _type = 'project::hello$args';
      static readonly $fields: hello$args.$Fields;
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): hello$args;
    }
    namespace hello$args {
      interface $Fields {
        name: 0;
      }
    }

    class Link extends gc.sdk.GCObject {
      static readonly _type = 'project::Link';
      static readonly $fields: Link.$Fields;
      name: string;
      next: gc.project.Link | null;
      constructor(name: string, next?: gc.project.Link | null);
      static createFrom(fields: {name: string, next?: gc.project.Link | null}): Link;
      static whatever: gc.sdk.ExposedFn<[gc.core.node<gc.project.Link>], unknown>;
    }
    namespace Link {
      interface $Fields {
        name: 0;
        next: 1;
      }
    }

    class Country extends gc.sdk.GCObject {
      static readonly _type = 'project::Country';
      static readonly $fields: Country.$Fields;
      name: string;
      timezone: gc.core.TimeZone;
      operating_stats: gc.core.node;
      last_updated_stats: gc.core.time | null;
      governorates: gc.core.nodeIndex;
      meteo: gc.core.node<gc.project.Meteo>;
      constructor(name: string, timezone: gc.core.TimeZone, operating_stats: gc.core.node, last_updated_stats: gc.core.time | null, governorates: gc.core.nodeIndex, meteo: gc.core.node<gc.project.Meteo>);
      static createFrom(fields: {name: string, timezone: gc.core.TimeZone, operating_stats: gc.core.node, last_updated_stats?: gc.core.time | null, governorates: gc.core.nodeIndex, meteo: gc.core.node<gc.project.Meteo>}): Country;
    }
    namespace Country {
      interface $Fields {
        name: 0;
        timezone: 1;
        operating_stats: 2;
        last_updated_stats: 3;
        governorates: 4;
        meteo: 5;
      }
    }

    class VisualCrossingProvider extends gc.sdk.GCObject {
      static readonly _type = 'project::VisualCrossingProvider';
      static readonly $fields: VisualCrossingProvider.$Fields;
      name: string;
      solar: gc.core.node<gc.project.SolarRadiation>;
      constructor(name: string, solar: gc.core.node<gc.project.SolarRadiation>);
      static createFrom(fields: {name: string, solar: gc.core.node<gc.project.SolarRadiation>}): VisualCrossingProvider;
    }
    namespace VisualCrossingProvider {
      interface $Fields {
        name: 0;
        solar: 1;
      }
    }

    class destructuring_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::destructuring_table$args';
    }

    class now$args extends gc.sdk.GCObject {
      static readonly _type = 'project::now$args';
    }

    const init_foo: gc.sdk.ExposedFn<[], unknown>;
    const persons: gc.sdk.ExposedFn<[], globalThis.Array<gc.project.Person2>>;
    const chart: gc.sdk.ExposedFn<[number | bigint], gc.core.Table<any>>;
    const chart_time: gc.sdk.ExposedFn<[], gc.core.Table>;
    const chart_colored_area: gc.sdk.ExposedFn<[], gc.core.Table>;
    const donut: gc.sdk.ExposedFn<[], gc.core.Table>;
    const heatmap: gc.sdk.ExposedFn<[], gc.core.Table>;
    const hello: gc.sdk.ExposedFn<[string], string>;
    const table: gc.sdk.ExposedFn<[], gc.core.Table>;
    const objects_table: gc.sdk.ExposedFn<[], gc.core.Table<gc.project.Person>>;
    const task_without_params: gc.sdk.ExposedFn<[], unknown>;
    const task_with_params: gc.sdk.ExposedFn<[string, number | bigint], unknown>;
    const task_long_running: gc.sdk.ExposedFn<[], unknown>;
    const task_long_running2: gc.sdk.ExposedFn<[], unknown>;
    const controlled_task: gc.sdk.ExposedFn<[gc.core.duration], unknown>;
    const mainTask: gc.sdk.ExposedFn<[], unknown>;
    const foo: gc.sdk.ExposedFn<[], unknown>;
    const bar: gc.sdk.ExposedFn<[], unknown>;
    const obj: gc.sdk.ExposedFn<[], unknown>;
    const complex_object: gc.sdk.ExposedFn<[], unknown>;
    const obj1: gc.sdk.ExposedFn<[], unknown>;
    const obj2: gc.sdk.ExposedFn<[], unknown>;
    const get_person: gc.sdk.ExposedFn<[], unknown>;
    const tree: gc.sdk.ExposedFn<[], unknown>;
    const add: gc.sdk.ExposedFn<[number | bigint, number | bigint], number | bigint>;
    const anything: gc.sdk.ExposedFn<[any | null | undefined], unknown>;
    const mapTest: gc.sdk.ExposedFn<[], globalThis.Map<gc.core.DurationUnit, gc.core.Tuple<string, number | bigint>>>;
    const goodFnForTestingFnCallInput: gc.sdk.ExposedFn<[string, boolean, gc.core.DurationUnit, boolean | null | undefined], unknown>;
    const now: gc.sdk.ExposedFn<[], unknown>;
    const link_whatever: gc.sdk.ExposedFn<[gc.core.node<gc.project.Link>], unknown>;
    const big_map: gc.sdk.ExposedFn<[], globalThis.Map<any | null, any | null>>;
    const real_example: gc.sdk.ExposedFn<[], gc.project.Country>;
    const array_of_ints: gc.sdk.ExposedFn<[globalThis.Array<number | bigint>], globalThis.Array<number | bigint>>;
    const resolve_person: gc.sdk.ExposedFn<[], unknown>;
    const serie_of_obj: gc.sdk.ExposedFn<[], unknown>;
    const sample_huge_csv: gc.sdk.ExposedFn<[], gc.core.Table | null>;
    const destructuring_table: gc.sdk.ExposedFn<[], gc.core.Table>;
    const this_is_boom: gc.sdk.ExposedFn<[], unknown>;
    const table_of_objects: gc.sdk.ExposedFn<[], gc.core.Table<gc.project.TimeRecord<gc.project.Composed>>>;
    const table_of_objects2: gc.sdk.ExposedFn<[], gc.core.Table<gc.project.TimedComposed>>;
    const table_of_objects3: gc.sdk.ExposedFn<[], gc.core.Table>;
    const one_d_histogram_bins: gc.sdk.ExposedFn<[], globalThis.Array<gc.util.HistogramBin<number>>>;
    const histogram_stats: gc.sdk.ExposedFn<[], gc.util.HistogramStats<number> | null>;
    const array_of_nodes: gc.sdk.ExposedFn<[], globalThis.Array<gc.core.node<string>>>;
    const display_fn: gc.sdk.ExposedFn<[gc.core.function_], unknown>;
    const display_fn_in_obj: gc.sdk.ExposedFn<[gc.project.ObjWithFn], unknown>;
    const people: gc.sdk.ExposedFn<[], globalThis.Array<gc.project.People>>;
    const boxes: gc.sdk.ExposedFn<[], globalThis.Array<gc.project.Box | null>>;
    const data_array: gc.sdk.ExposedFn<[], globalThis.Array<gc.project.MyData>>;
    const table_with_urls: gc.sdk.ExposedFn<[], globalThis.Array<gc.project.UrlEntry>>;
  }

  namespace any {
    class array_any_map_any$args extends gc.sdk.GCObject {
      static readonly _type = 'any::array_any_map_any$args';
      static readonly $fields: array_any_map_any$args.$Fields;
      arr: globalThis.Array<any | null>;
      map: globalThis.Map<any | null, any | null>;
      constructor(arr: globalThis.Array<any | null>, map: globalThis.Map<any | null, any | null>);
      static createFrom(fields: {arr: globalThis.Array<any | null>, map: globalThis.Map<any | null, any | null>}): array_any_map_any$args;
    }
    namespace array_any_map_any$args {
      interface $Fields {
        arr: 0;
        map: 1;
      }
    }

    class filter_something$args extends gc.sdk.GCObject {
      static readonly _type = 'any::filter_something$args';
      static readonly $fields: filter_something$args.$Fields;
      f: gc.any.Filters;
      constructor(f: gc.any.Filters);
      static createFrom(fields: {f: gc.any.Filters}): filter_something$args;
    }
    namespace filter_something$args {
      interface $Fields {
        f: 0;
      }
    }

    class AnyInput extends gc.sdk.GCObject {
      static readonly _type = 'any::AnyInput';
      static readonly $fields: AnyInput.$Fields;
      idk: any;
      constructor(idk: any);
      static createFrom(fields: {idk: any}): AnyInput;
    }
    namespace AnyInput {
      interface $Fields {
        idk: 0;
      }
    }

    class Filters extends gc.sdk.GCObject {
      static readonly _type = 'any::Filters';
      static readonly $fields: Filters.$Fields;
      a: number | bigint;
      b: string;
      constructor(a: number | bigint, b: string);
      static createFrom(fields: {a: number | bigint, b: string}): Filters;
    }
    namespace Filters {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    const filter_something: gc.sdk.ExposedFn<[gc.any.Filters], unknown>;
    const array_any_map_any: gc.sdk.ExposedFn<[globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], unknown>;
  }

  namespace object {
    class Filter extends gc.sdk.GCObject {
      static readonly _type = 'object::Filter';
      static readonly $fields: Filter.$Fields;
      a: number | bigint;
      b: string | null;
      constructor(a: number | bigint, b?: string | null);
      static createFrom(fields: {a: number | bigint, b?: string | null}): Filter;
    }
    namespace Filter {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

  }

  namespace tx {
  }

  namespace heatmap {
    class Type extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::Type';
      static readonly $fields: Type[];
      key: Type.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Type.Field);
      static explosion: Type;
      static earthquake: Type;
      static landslide: Type;
      static "quarry blast": Type;
      static rockslide: Type;
    }
    namespace Type  {
      type Field = "explosion"|"earthquake"|"landslide"|"quarry blast"|"rockslide";
    }

    class Status extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::Status';
      static readonly $fields: Status[];
      key: Status.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Status.Field);
      static automatic: Status;
      static reviewed: Status;
    }
    namespace Status  {
      type Field = "automatic"|"reviewed";
    }

    class all_earthquakes$args extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::all_earthquakes$args';
    }

    class Earthquake extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::Earthquake';
      static readonly $fields: Earthquake.$Fields;
      time: gc.core.time;
      location: gc.core.geo;
      depth: number;
      mag: number | null;
      magType: string | null;
      nst: number | bigint | null;
      gap: number | bigint | null;
      dmin: number | null;
      rms: number | null;
      net: string;
      id: string;
      updated: gc.core.time;
      place: string;
      horizontalError: number | null;
      depthError: number | null;
      magError: number | null;
      magNst: number | bigint | null;
      magSource: string;
      constructor(time: gc.core.time, location: gc.core.geo, depth: number, mag: number | null, magType: string | null, nst: number | bigint | null, gap: number | bigint | null, dmin: number | null, rms: number | null, net: string, id: string, updated: gc.core.time, place: string, horizontalError: number | null, depthError: number | null, magError: number | null, magNst: number | bigint | null, magSource: string);
      static createFrom(fields: {time: gc.core.time, location: gc.core.geo, depth: number, mag?: number | null, magType?: string | null, nst?: number | bigint | null, gap?: number | bigint | null, dmin?: number | null, rms?: number | null, net: string, id: string, updated: gc.core.time, place: string, horizontalError?: number | null, depthError?: number | null, magError?: number | null, magNst?: number | bigint | null, magSource: string}): Earthquake;
    }
    namespace Earthquake {
      interface $Fields {
        time: 0;
        location: 1;
        depth: 2;
        mag: 3;
        magType: 4;
        nst: 5;
        gap: 6;
        dmin: 7;
        rms: 8;
        net: 9;
        id: 10;
        updated: 11;
        place: 12;
        horizontalError: 13;
        depthError: 14;
        magError: 15;
        magNst: 16;
        magSource: 17;
      }
    }

    class major_earthquakes$args extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::major_earthquakes$args';
    }

    class Record extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::Record';
      static readonly $fields: Record.$Fields;
      time: gc.core.time;
      latitude: number;
      longitude: number;
      depth: number;
      mag: number | null;
      magType: string | null;
      nst: number | bigint | null;
      gap: number | bigint | null;
      dmin: number | null;
      rms: number | null;
      net: string;
      id: string;
      updated: gc.core.time;
      place: string;
      type: gc.heatmap.Type;
      horizontalError: number | null;
      depthError: number | null;
      magError: number | null;
      magNst: number | bigint | null;
      status: gc.heatmap.Status;
      locationSource: string;
      magSource: string;
      constructor(time: gc.core.time, latitude: number, longitude: number, depth: number, mag: number | null, magType: string | null, nst: number | bigint | null, gap: number | bigint | null, dmin: number | null, rms: number | null, net: string, id: string, updated: gc.core.time, place: string, type: gc.heatmap.Type, horizontalError: number | null, depthError: number | null, magError: number | null, magNst: number | bigint | null, status: gc.heatmap.Status, locationSource: string, magSource: string);
      static createFrom(fields: {time: gc.core.time, latitude: number, longitude: number, depth: number, mag?: number | null, magType?: string | null, nst?: number | bigint | null, gap?: number | bigint | null, dmin?: number | null, rms?: number | null, net: string, id: string, updated: gc.core.time, place: string, type: gc.heatmap.Type, horizontalError?: number | null, depthError?: number | null, magError?: number | null, magNst?: number | bigint | null, status: gc.heatmap.Status, locationSource: string, magSource: string}): Record;
    }
    namespace Record {
      interface $Fields {
        time: 0;
        latitude: 1;
        longitude: 2;
        depth: 3;
        mag: 4;
        magType: 5;
        nst: 6;
        gap: 7;
        dmin: 8;
        rms: 9;
        net: 10;
        id: 11;
        updated: 12;
        place: 13;
        type: 14;
        horizontalError: 15;
        depthError: 16;
        magError: 17;
        magNst: 18;
        status: 19;
        locationSource: 20;
        magSource: 21;
      }
    }

    const major_earthquakes: gc.sdk.ExposedFn<[], globalThis.Array<gc.heatmap.Earthquake>>;
    const all_earthquakes: gc.sdk.ExposedFn<[], globalThis.Array<gc.heatmap.Earthquake>>;
  }

  namespace cities {
    class CapitalType extends gc.sdk.GCEnum {
      static readonly _type = 'cities::CapitalType';
      static readonly $fields: CapitalType[];
      key: CapitalType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: CapitalType.Field);
      static Others: CapitalType;
      static "Administrative Capital": CapitalType;
      static "Seat of Government": CapitalType;
      static Capital: CapitalType;
      static "Legislative Capital": CapitalType;
      static "Economic Capital": CapitalType;
    }
    namespace CapitalType  {
      type Field = "Others"|"Administrative Capital"|"Seat of Government"|"Capital"|"Legislative Capital"|"Economic Capital";
    }

    class City extends gc.sdk.GCObject {
      static readonly _type = 'cities::City';
      static readonly $fields: City.$Fields;
      country: string;
      name: string;
      location: gc.core.geo;
      population: number | bigint;
      type: gc.cities.CapitalType;
      constructor(country: string, name: string, location: gc.core.geo, population: number | bigint, type: gc.cities.CapitalType);
      static createFrom(fields: {country: string, name: string, location: gc.core.geo, population: number | bigint, type: gc.cities.CapitalType}): City;
    }
    namespace City {
      interface $Fields {
        country: 0;
        name: 1;
        location: 2;
        population: 3;
        type: 4;
      }
    }

  }

  namespace complex_factory {
    class cable_views$args extends gc.sdk.GCObject {
      static readonly _type = 'complex_factory::cable_views$args';
    }

    class VoltageLevel extends gc.sdk.GCEnum {
      static readonly _type = 'complex_factory::VoltageLevel';
      static readonly $fields: VoltageLevel[];
      key: VoltageLevel.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: VoltageLevel.Field);
      static low: VoltageLevel;
      static medium: VoltageLevel;
      static high: VoltageLevel;
      static extra_high: VoltageLevel;
      static ultra_high: VoltageLevel;
    }
    namespace VoltageLevel  {
      type Field = "low"|"medium"|"high"|"extra_high"|"ultra_high";
    }

    class Cable extends gc.sdk.GCObject {
      static readonly _type = 'complex_factory::Cable';
      static readonly $fields: Cable.$Fields;
      voltageLevel: gc.complex_factory.VoltageLevel | null;
      constructor(voltageLevel?: gc.complex_factory.VoltageLevel | null);
      static createFrom(fields: {voltageLevel?: gc.complex_factory.VoltageLevel | null}): Cable;
    }
    namespace Cable {
      interface $Fields {
        voltageLevel: 0;
      }
    }

    class CableView extends gc.sdk.GCObject {
      static readonly _type = 'complex_factory::CableView';
      static readonly $fields: CableView.$Fields;
      node: gc.core.node<T>;
      coordinates: gc.core.geo | null;
      shortDescr: string | null;
      deletionDate: gc.core.time | null;
      cableId: string | null;
      voltageLevel: gc.complex_factory.VoltageLevel | null;
      voltageValue_kV: number | null;
      meta: string;
      length_m: number;
      regionalCenter: string | null;
      isSimulated: boolean;
      constructor(node: gc.core.node<T>, coordinates: gc.core.geo | null, shortDescr: string | null, deletionDate: gc.core.time | null, cableId: string | null, voltageLevel: gc.complex_factory.VoltageLevel | null, voltageValue_kV: number | null, meta: string, length_m: number, regionalCenter: string | null, isSimulated: boolean);
      static createFrom(fields: {node: gc.core.node<T>, coordinates?: gc.core.geo | null, shortDescr?: string | null, deletionDate?: gc.core.time | null, cableId?: string | null, voltageLevel?: gc.complex_factory.VoltageLevel | null, voltageValue_kV?: number | null, meta: string, length_m: number, regionalCenter?: string | null, isSimulated: boolean}): CableView;
    }
    namespace CableView {
      interface $Fields {
        node: 0;
        coordinates: 1;
        shortDescr: 2;
        deletionDate: 3;
        cableId: 4;
        voltageLevel: 5;
        voltageValue_kV: 6;
        meta: 7;
        length_m: 8;
        regionalCenter: 9;
        isSimulated: 10;
      }
    }

    class GridElementView<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'complex_factory::GridElementView';
      static readonly $fields: GridElementView.$Fields;
      node: gc.core.node<T>;
      coordinates: gc.core.geo | null;
      shortDescr: string | null;
      deletionDate: gc.core.time | null;
    }
    namespace GridElementView {
      interface $Fields {
        node: 0;
        coordinates: 1;
        shortDescr: 2;
        deletionDate: 3;
      }
    }

    const cable_views: gc.sdk.ExposedFn<[], globalThis.Array<gc.complex_factory.CableView>>;
  }

  interface $TypesMap {
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::nodeGeo<heatmap::Earthquake>': 0,
    'core::Tuple<core::int,core::any?>': 0,
    'core::Array<project::UrlEntry>': 0,
    'core::Tuple<core::String,core::String>': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::Array<runtime::PathItemObject>': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::float': 0,
    'core::Map<core::SamplingMode,project::Person?>': 0,
    'core::Array<core::any>': 0,
    'core::Array<core::field>': 0,
    'core::Array<runtime::HeaderObject>': 0,
    'core::nodeGeo': 0,
    'core::Map<core::String,runtime::UserCredential>': 0,
    'core::Array<core::SearchResult>': 0,
    'core::nodeGeo$info$args': 0,
    'core::String': 0,
    'core::Array<core::node?>': 0,
    'core::Tuple<core::geo,heatmap::Earthquake>': 0,
    'core::node<core::String>': 0,
    'core::nodeTime<heatmap::Earthquake>': 0,
    'core::nodeList': 0,
    'core::field': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::Buffer': 0,
    'core::nodeGeo$sample$args': 0,
    'core::SearchResult<core::Tensor,core::any?>': 0,
    'core::Tuple<core::int,core::VectorVertex>': 0,
    'core::Array<core::SearchResult<core::Tensor,core::any?>>': 0,
    'core::time': 0,
    'core::Array<project::SensorData>': 0,
    'core::nodeList<core::Tensor>': 0,
    'core::Tuple<core::time,heatmap::Earthquake>': 0,
    'core::Array<complex_factory::CableView>': 0,
    'core::MathConstants': 0,
    'core::Array<runtime::Permission>': 0,
    'core::TimeZone': 0,
    'core::node<project::Node>': 0,
    'core::Array<project::Box?>': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::Array<runtime::Frame>': 0,
    'core::Tuple<core::String,core::float>': 0,
    'core::Map<core::String,core::int>': 0,
    'core::null': 0,
    'core::str': 0,
    'core::Table$applyMappings$args': 0,
    'core::node': 0,
    'core::Array<runtime::Variable>': 0,
    'core::Array<runtime::Role>': 0,
    'core::Map<core::any,core::int>': 0,
    'core::Array<core::float>': 0,
    'core::VectorVertex': 0,
    'core::ErrorFrame': 0,
    'core::Array<runtime::UserCredential>': 0,
    'core::Array<project::People>': 0,
    'core::nodeTime$info$args': 0,
    'core::Map<core::String,core::any>': 0,
    'core::Array<core::node<core::String>>': 0,
    'core::Array<core::int>': 0,
    'core::Array<runtime::UserGroupPolicy>': 0,
    'core::nodeList$sample$args': 0,
    'core::nodeTime<core::float>': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::Table': 0,
    'core::Array<project::Person2>': 0,
    'core::t2f': 0,
    'core::Tuple<core::String,core::int>': 0,
    'core::bool': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::node<project::Link>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::nodeList$info$args': 0,
    'core::duration': 0,
    'core::Array<util::HistogramBin<core::float>>': 0,
    'core::Table<project::TimedComposed>': 0,
    'core::Array': 0,
    'core::nodeIndex<core::String,core::int>': 0,
    'core::Array<core::Tuple<core::String,core::int>>': 0,
    'core::Array<runtime::DayOfWeek>': 0,
    'core::Array<project::MyData>': 0,
    'core::any': 0,
    'core::char': 0,
    'core::SortOrder': 0,
    'core::node<core::Table?>': 0,
    'core::Array<core::nodeTime>': 0,
    'core::GeoCircle': 0,
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::Array<core::String>': 0,
    'core::SearchResult': 0,
    'core::Tuple<core::geo,core::any?>': 0,
    'core::function': 0,
    'core::Table<core::any>': 0,
    'core::Array<runtime::DateTuple>': 0,
    'core::NodeInfo': 0,
    'core::Map<core::String,runtime::PathItemObject>': 0,
    'core::node<project::Meteo>': 0,
    'core::Map<core::int,core::String>': 0,
    'core::VectorIndex': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::nodeList<core::VectorVertex>': 0,
    'core::t3f': 0,
    'core::TensorType': 0,
    'core::nodeTime': 0,
    'core::nodeTime$sample$args': 0,
    'core::Tuple<core::time,project::SensorData>': 0,
    'core::Array<runtime::SchemaObject>': 0,
    'core::nodeIndexBucket': 0,
    'core::Map<core::String,runtime::HeaderObject>': 0,
    'core::node<project::SolarRadiation>': 0,
    'core::FloatPrecision': 0,
    'core::Tuple<core::int,core::Tensor>': 0,
    'core::t2': 0,
    'core::Map<core::String,core::String>': 0,
    'core::Tuple<core::time,core::float>': 0,
    'core::Array<project::Person?>': 0,
    'core::node<complex_factory::Cable>': 0,
    'core::CalendarUnit': 0,
    'core::Array<core::int?>': 0,
    'core::nodeIndexBucket<core::String,core::int>': 0,
    'core::Array<core::any?>': 0,
    'core::Map': 0,
    'core::TensorDistance': 0,
    'core::Map<core::DurationUnit,core::Tuple<core::String,core::int>>': 0,
    'core::nodeTime<project::KLine>': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::Map<core::String,runtime::MediaTypeObject>': 0,
    'core::Map<core::String,runtime::ResponseObject>': 0,
    'core::nodeTime<project::SensorData>': 0,
    'core::node<project::VisualCrossingProvider>': 0,
    'core::NodeInfo<core::int>': 0,
    'core::SearchResult<core::String,core::int>': 0,
    'core::Array<core::SearchResult<core::String,core::int>>': 0,
    'core::NodeInfo<core::time>': 0,
    'core::t3': 0,
    'core::Table<project::TimeRecord<project::Composed>>': 0,
    'core::nodeIndex$info$args': 0,
    'core::type': 0,
    'core::SamplingMode': 0,
    'core::Array<heatmap::Earthquake>': 0,
    'core::Map<core::String,core::String?>': 0,
    'core::Array<runtime::User?>': 0,
    'core::node<project::Person2?>': 0,
    'core::TableColumnMapping': 0,
    'core::Array<runtime::Job>': 0,
    'core::nodeGeo<cities::City>': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::Map<core::String,project::Person?>': 0,
    'core::nodeIndex': 0,
    'core::Map<core::String,runtime::SchemaObject>': 0,
    'core::GeoBox': 0,
    'core::Array<core::nodeList>': 0,
    'core::Array<runtime::MediaTypeObject>': 0,
    'core::Array<util::Quantizer>': 0,
    'core::Array<runtime::SecurityEntity>': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::Table<project::Person>': 0,
    'core::Array<runtime::ResponseObject>': 0,
    'core::Map<core::TimeZone,core::String>': 0,
    'core::Tuple<core::int,core::int>': 0,
    'core::Tuple<core::any,core::any>': 0,
    'core::Map<core::any,core::any?>': 0,
    'core::geo': 0,
    'core::node<project::Person2>': 0,
    'core::Tuple': 0,
    'core::Tuple<core::time,project::KLine>': 0,
    'core::node$resolve_all$args': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::GeoPoly': 0,
    'core::Array<io::File>': 0,
    'core::Array<core::Array<core::float>>': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::nodeTimeCursor': 0,
    'core::t4f': 0,
    'core::nodeIndex$search_closest$args': 0,
    'core::int': 0,
    'core::Array<project::KLine>': 0,
    'core::Array<core::geo>': 0,
    'core::t4': 0,
    'core::Date': 0,
    'core::Tuple<core::geo,cities::City>': 0,
    'core::DurationUnit': 0,
    'core::Array<core::String?>': 0,
    'core::Tensor': 0,
    'core::ErrorCode': 0,
    'core::Array<project::Shape>': 0,
    'core::Array<runtime::Task>': 0,
    'core::Error': 0,
    'runtime::MediaTypeObject': 0,
    'runtime::Debug$all$args': 0,
    'runtime::User': 0,
    'runtime::OpenApi$v3$args': 0,
    'runtime::Role$all$args': 0,
    'runtime::SecurityEntity$all$args': 0,
    'runtime::User$permissions$args': 0,
    'runtime::SecurityPolicy': 0,
    'runtime::SecurityFields$set$args': 0,
    'runtime::ResponseCode': 0,
    'runtime::FixedPeriodicity': 0,
    'runtime::User$setPassword$args': 0,
    'runtime::Task$history$args': 0,
    'runtime::Debug$get$args': 0,
    'runtime::User$renew$args': 0,
    'runtime::ComponentsObject': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::SecurityEntity': 0,
    'runtime::Task': 0,
    'runtime::SecurityEntity$set$args': 0,
    'runtime::DailyPeriodicity': 0,
    'runtime::Scheduler$list$args': 0,
    'runtime::Scheduler$deactivate$args': 0,
    'runtime::ChildProcess': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::Job': 0,
    'runtime::Role': 0,
    'runtime::Variable': 0,
    'runtime::Debug': 0,
    'runtime::SecurityFields': 0,
    'runtime::User$tokenLogin$args': 0,
    'runtime::Log': 0,
    'runtime::Scheduler$find$args': 0,
    'runtime::HeaderObject': 0,
    'runtime::User$current$args': 0,
    'runtime::MergeStrategy': 0,
    'runtime::YearlyPeriodicity': 0,
    'runtime::LogDataUsage': 0,
    'runtime::OpenIDConnect': 0,
    'runtime::License': 0,
    'runtime::DateTuple': 0,
    'runtime::WeeklyPeriodicity': 0,
    'runtime::Permission$all$args': 0,
    'runtime::PathItemObject': 0,
    'runtime::Task$cancel$args': 0,
    'runtime::PeriodicTask': 0,
    'runtime::OpenApiVersion': 0,
    'runtime::DayOfWeek': 0,
    'runtime::UserGroup': 0,
    'runtime::PeriodicOptions': 0,
    'runtime::UserCredential': 0,
    'runtime::Permission': 0,
    'runtime::Task$running$args': 0,
    'runtime::SchemaFormat': 0,
    'runtime::OperationObject': 0,
    'runtime::SchemaObject': 0,
    'runtime::Runtime': 0,
    'runtime::RequestBodyObject': 0,
    'runtime::Frame': 0,
    'runtime::OpenIDConnect$config$args': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::ResponseObject': 0,
    'runtime::System': 0,
    'runtime::Scheduler$add$args': 0,
    'runtime::InfoObject': 0,
    'runtime::UserGroupPolicyType': 0,
    'runtime::Periodicity': 0,
    'runtime::Scheduler$activate$args': 0,
    'runtime::SchemaType': 0,
    'runtime::Month': 0,
    'runtime::OpenApiV3': 0,
    'runtime::User$me$args': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::User$logout$args': 0,
    'runtime::SecurityFields$get$args': 0,
    'runtime::ChildProcessResult': 0,
    'runtime::UserGroupPolicy': 0,
    'runtime::TaskStatus': 0,
    'runtime::LicenseType': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::OpenApi': 0,
    'runtime::User$login$args': 0,
    'runtime::MonthlyPeriodicity': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::LogLevel': 0,
    'runtime::Scheduler': 0,
    'io::HttpResponse': 0,
    'io::CsvSharding': 0,
    'io::JsonReader': 0,
    'io::Csv$sample$args': 0,
    'io::Email': 0,
    'io::HttpRequest': 0,
    'io::CsvReader<project::People>': 0,
    'io::Reader': 0,
    'io::SmtpAuth': 0,
    'io::Reader<core::String>': 0,
    'io::CsvAnalysisConfig': 0,
    'io::CsvReader<core::Array<core::float>>': 0,
    'io::Reader<core::Array<core::float>>': 0,
    'io::CsvReader': 0,
    'io::Writer': 0,
    'io::JsonWriter': 0,
    'io::TextWriter': 0,
    'io::Smtp': 0,
    'io::XmlReader': 0,
    'io::Url': 0,
    'io::CsvReader<cities::City>': 0,
    'io::SmtpMode': 0,
    'io::Reader<cities::City>': 0,
    'io::FileWalker': 0,
    'io::CsvStatistics': 0,
    'io::CsvReader<heatmap::Record>': 0,
    'io::HttpMethod': 0,
    'io::Reader<heatmap::Record>': 0,
    'io::CsvColumnStatistics': 0,
    'io::GcbWriter': 0,
    'io::Reader<project::People>': 0,
    'io::TextReader': 0,
    'io::Csv': 0,
    'io::File': 0,
    'io::Csv$generate$args': 0,
    'io::Csv$analyze$args': 0,
    'io::Json': 0,
    'io::CsvWriter': 0,
    'io::GcbReader': 0,
    'io::CsvFormat': 0,
    'io::Http': 0,
    'util::Quantizer<core::float>': 0,
    'util::QuantizerSlotBound': 0,
    'util::QuantizerSlotBound<core::float>': 0,
    'util::Histogram': 0,
    'util::HistogramStats<core::float>': 0,
    'util::Histogram<core::float>': 0,
    'util::Quantizer': 0,
    'util::SlidingWindow': 0,
    'util::LinearQuantizer': 0,
    'util::Stack': 0,
    'util::Random': 0,
    'util::MultiQuantizer': 0,
    'util::Assert': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::Plot': 0,
    'util::CustomQuantizer': 0,
    'util::HistogramBin<core::float>': 0,
    'util::TimeWindow': 0,
    'util::Queue': 0,
    'util::GaussianProfile': 0,
    'util::Crypto': 0,
    'util::Quantizer<core::Array>': 0,
    'util::HistogramBin': 0,
    'util::HistogramStats': 0,
    'util::Gaussian<core::float>': 0,
    'util::ProgressTracker': 0,
    'util::Gaussian': 0,
    'util::GaussianProfileSlot': 0,
    'util::LogQuantizer': 0,
    'util::LinearQuantizer<core::float>': 0,
    'project::table$args': 0,
    'project::persons$args': 0,
    'project::table_of_objects$args': 0,
    'project::obj1$args': 0,
    'project::table_of_objects3$args': 0,
    'project::link_whatever$args': 0,
    'project::task_long_running$args': 0,
    'project::Link$whatever$args': 0,
    'project::chart$args': 0,
    'project::Level': 0,
    'project::real_example$args': 0,
    'project::TrafficLight': 0,
    'project::Rect': 0,
    'project::display_fn$args': 0,
    'project::ObjWithFn': 0,
    'project::bar$args': 0,
    'project::TimeRecord<project::Composed>': 0,
    'project::FooBar': 0,
    'project::People': 0,
    'project::controlled_task$args': 0,
    'project::table_of_objects2$args': 0,
    'project::boxes$args': 0,
    'project::this_is_boom$args': 0,
    'project::Node': 0,
    'project::TimeRecord': 0,
    'project::people$args': 0,
    'project::MyData': 0,
    'project::Confidence': 0,
    'project::array_of_nodes$args': 0,
    'project::tree$args': 0,
    'project::obj2$args': 0,
    'project::histogram_stats$args': 0,
    'project::Sensor': 0,
    'project::resolve_person$args': 0,
    'project::Box': 0,
    'project::obj$args': 0,
    'project::SeriesObject': 0,
    'project::init_foo$args': 0,
    'project::sample_huge_csv$args': 0,
    'project::mapTest$args': 0,
    'project::goodFnForTestingFnCallInput$args': 0,
    'project::big_map$args': 0,
    'project::Obj2': 0,
    'project::chart_time$args': 0,
    'project::task_long_running2$args': 0,
    'project::complex_object$args': 0,
    'project::Person2': 0,
    'project::TimeZones': 0,
    'project::Obj': 0,
    'project::Triangle': 0,
    'project::Circle': 0,
    'project::Root': 0,
    'project::foo$args': 0,
    'project::SolarRadiation': 0,
    'project::Book': 0,
    'project::SensorKind': 0,
    'project::get_person$args': 0,
    'project::KLine': 0,
    'project::RelayApp': 0,
    'project::task_without_params$args': 0,
    'project::ComplexObject': 0,
    'project::Obj1': 0,
    'project::Person': 0,
    'project::heatmap$args': 0,
    'project::TimedComposed': 0,
    'project::task_with_params$args': 0,
    'project::anything$args': 0,
    'project::UrlEntry': 0,
    'project::array_of_ints$args': 0,
    'project::ComplexForm': 0,
    'project::display_fn_in_obj$args': 0,
    'project::serie_of_obj$args': 0,
    'project::Sex': 0,
    'project::SensorData': 0,
    'project::add$args': 0,
    'project::SemiRecursive': 0,
    'project::Meteo': 0,
    'project::data_array$args': 0,
    'project::one_d_histogram_bins$args': 0,
    'project::chart_colored_area$args': 0,
    'project::donut$args': 0,
    'project::table_with_urls$args': 0,
    'project::Shape': 0,
    'project::mainTask$args': 0,
    'project::objects_table$args': 0,
    'project::MapContainer': 0,
    'project::Composed': 0,
    'project::hello$args': 0,
    'project::Link': 0,
    'project::Country': 0,
    'project::VisualCrossingProvider': 0,
    'project::destructuring_table$args': 0,
    'project::now$args': 0,
    'any::array_any_map_any$args': 0,
    'any::filter_something$args': 0,
    'any::AnyInput': 0,
    'any::Filters': 0,
    'object::Filter': 0,
    'heatmap::Type': 0,
    'heatmap::Status': 0,
    'heatmap::all_earthquakes$args': 0,
    'heatmap::Earthquake': 0,
    'heatmap::major_earthquakes$args': 0,
    'heatmap::Record': 0,
    'cities::CapitalType': 0,
    'cities::City': 0,
    'complex_factory::cable_views$args': 0,
    'complex_factory::VoltageLevel': 0,
    'complex_factory::Cable': 0,
    'complex_factory::CableView': 0,
    'complex_factory::GridElementView': 0,
    'complex_factory::GridElementView<complex_factory::Cable>': 0,
  }

  interface $FieldsMap {
    'core::nodeGeo$info$args::nodes': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::VectorVertex::level': 0,
    'core::VectorVertex::neighbours': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'core::nodeList$info$args::nodes': 0,
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::SearchResult::key': 0,
    'core::SearchResult::value': 0,
    'core::SearchResult::distance': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::VectorIndex::vectors': 0,
    'core::VectorIndex::values': 0,
    'core::VectorIndex::count': 0,
    'core::VectorIndex::max_level': 0,
    'core::VectorIndex::entry_index': 0,
    'core::VectorIndex::vertices': 0,
    'core::VectorIndex::rng': 0,
    'core::VectorIndex::distance': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'core::nodeIndexBucket::key': 0,
    'core::nodeIndexBucket::value': 0,
    'core::nodeIndexBucket::next': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::node$resolve_all$args::n': 0,
    'core::GeoPoly::points': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeTimeCursor::req_time': 0,
    'core::nodeIndex$search_closest$args::i': 0,
    'core::nodeIndex$search_closest$args::key': 0,
    'core::nodeIndex$search_closest$args::max': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'runtime::MediaTypeObject::schema': 0,
    'runtime::User::id': 0,
    'runtime::User::name': 0,
    'runtime::User::activated': 0,
    'runtime::User::full_name': 0,
    'runtime::User::email': 0,
    'runtime::User::role': 0,
    'runtime::User::groups': 0,
    'runtime::User::groups_flags': 0,
    'runtime::User::external': 0,
    'runtime::SecurityPolicy::entities': 0,
    'runtime::SecurityPolicy::credentials': 0,
    'runtime::SecurityPolicy::fields': 0,
    'runtime::SecurityPolicy::keys': 0,
    'runtime::SecurityPolicy::keys_last_refresh': 0,
    'runtime::SecurityFields$set$args::f': 0,
    'runtime::FixedPeriodicity::every': 0,
    'runtime::User$setPassword$args::name': 0,
    'runtime::User$setPassword$args::pass': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::User$renew$args::use_cookie': 0,
    'runtime::ComponentsObject::schemas': 0,
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
    'runtime::SecurityEntity$set$args::entity': 0,
    'runtime::DailyPeriodicity::hour': 0,
    'runtime::DailyPeriodicity::minute': 0,
    'runtime::DailyPeriodicity::second': 0,
    'runtime::DailyPeriodicity::timezone': 0,
    'runtime::Scheduler$deactivate$args::function': 0,
    'runtime::ChildProcess::pid': 0,
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
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::SecurityFields::email': 0,
    'runtime::SecurityFields::name': 0,
    'runtime::SecurityFields::first_name': 0,
    'runtime::SecurityFields::last_name': 0,
    'runtime::SecurityFields::roles': 0,
    'runtime::SecurityFields::groups': 0,
    'runtime::User$tokenLogin$args::token': 0,
    'runtime::User$tokenLogin$args::use_cookie': 0,
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::data': 0,
    'runtime::Scheduler$find$args::function': 0,
    'runtime::HeaderObject::description': 0,
    'runtime::HeaderObject::required': 0,
    'runtime::YearlyPeriodicity::dates': 0,
    'runtime::YearlyPeriodicity::timezone': 0,
    'runtime::LogDataUsage::read_bytes': 0,
    'runtime::LogDataUsage::read_hits': 0,
    'runtime::LogDataUsage::read_wasted': 0,
    'runtime::LogDataUsage::write_bytes': 0,
    'runtime::LogDataUsage::write_hits': 0,
    'runtime::LogDataUsage::cache_bytes': 0,
    'runtime::LogDataUsage::cache_hits': 0,
    'runtime::OpenIDConnect::url': 0,
    'runtime::OpenIDConnect::clientId': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::DateTuple::day': 0,
    'runtime::DateTuple::month': 0,
    'runtime::WeeklyPeriodicity::days': 0,
    'runtime::WeeklyPeriodicity::daily': 0,
    'runtime::PathItemObject::description': 0,
    'runtime::PathItemObject::post': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::periodicity': 0,
    'runtime::PeriodicTask::options': 0,
    'runtime::PeriodicTask::is_active': 0,
    'runtime::PeriodicTask::next_execution': 0,
    'runtime::PeriodicTask::execution_count': 0,
    'runtime::UserGroup::id': 0,
    'runtime::UserGroup::name': 0,
    'runtime::UserGroup::activated': 0,
    'runtime::PeriodicOptions::activated': 0,
    'runtime::PeriodicOptions::start': 0,
    'runtime::PeriodicOptions::max_duration': 0,
    'runtime::UserCredential::offset': 0,
    'runtime::UserCredential::pass': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::OperationObject::requestBody': 0,
    'runtime::OperationObject::responses': 0,
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
    'runtime::RequestBodyObject::content': 0,
    'runtime::RequestBodyObject::required': 0,
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
    'runtime::Scheduler$add$args::function': 0,
    'runtime::Scheduler$add$args::periodicity': 0,
    'runtime::Scheduler$add$args::options': 0,
    'runtime::InfoObject::title': 0,
    'runtime::InfoObject::version': 0,
    'runtime::Scheduler$activate$args::function': 0,
    'runtime::OpenApiV3::openapi': 0,
    'runtime::OpenApiV3::info': 0,
    'runtime::OpenApiV3::paths': 0,
    'runtime::OpenApiV3::components': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::ChildProcessResult::code': 0,
    'runtime::ChildProcessResult::stdout': 0,
    'runtime::ChildProcessResult::stderr': 0,
    'runtime::UserGroupPolicy::group_id': 0,
    'runtime::UserGroupPolicy::type': 0,
    'runtime::Task$is_running$args::task_id': 0,
    'runtime::User$login$args::credentials': 0,
    'runtime::User$login$args::use_cookie': 0,
    'runtime::MonthlyPeriodicity::days': 0,
    'runtime::MonthlyPeriodicity::daily': 0,
    'io::HttpResponse::status_code': 0,
    'io::HttpResponse::headers': 0,
    'io::HttpResponse::content': 0,
    'io::HttpResponse::error_msg': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'io::HttpRequest::method': 0,
    'io::HttpRequest::url': 0,
    'io::HttpRequest::headers': 0,
    'io::HttpRequest::body': 0,
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
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::Writer::path': 0,
    'io::Writer::append': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'io::XmlReader::path': 0,
    'io::XmlReader::pos': 0,
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::FileWalker::path': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
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
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::Csv$generate$args::stats': 0,
    'io::Csv$analyze$args::files': 0,
    'io::Csv$analyze$args::config': 0,
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
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
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
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
    'util::Stack::values': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::CustomQuantizer::min': 0,
    'util::CustomQuantizer::max': 0,
    'util::CustomQuantizer::step_starts': 0,
    'util::CustomQuantizer::open': 0,
    'util::TimeWindow::values': 0,
    'util::TimeWindow::span': 0,
    'util::TimeWindow::sum': 0,
    'util::TimeWindow::sumsq': 0,
    'util::TimeWindow::field': 0,
    'util::Queue::values': 0,
    'util::Queue::capacity': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
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
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
    'util::LogQuantizer::min': 0,
    'util::LogQuantizer::max': 0,
    'util::LogQuantizer::bins': 0,
    'util::LogQuantizer::open': 0,
    'project::link_whatever$args::l': 0,
    'project::Link$whatever$args::link': 0,
    'project::chart$args::nbRows': 0,
    'project::Rect::width': 0,
    'project::Rect::height': 0,
    'project::display_fn$args::fn_': 0,
    'project::ObjWithFn::fn': 0,
    'project::People::Index': 0,
    'project::People::User id': 0,
    'project::People::First Name': 0,
    'project::People::Last Name': 0,
    'project::People::Sex': 0,
    'project::People::Email': 0,
    'project::People::Phone': 0,
    'project::People::Date of birth': 0,
    'project::People::Job Title': 0,
    'project::controlled_task$args::duration': 0,
    'project::Node::id': 0,
    'project::Node::value': 0,
    'project::Node::link': 0,
    'project::TimeRecord::time': 0,
    'project::TimeRecord::value': 0,
    'project::MyData::level': 0,
    'project::MyData::value': 0,
    'project::Sensor::id': 0,
    'project::Sensor::kind': 0,
    'project::Box::value': 0,
    'project::SeriesObject::a': 0,
    'project::SeriesObject::b': 0,
    'project::goodFnForTestingFnCallInput$args::name': 0,
    'project::goodFnForTestingFnCallInput$args::flag': 0,
    'project::goodFnForTestingFnCallInput$args::item': 0,
    'project::goodFnForTestingFnCallInput$args::optionalFlag': 0,
    'project::Obj2::prop1': 0,
    'project::Obj2::prop2': 0,
    'project::Obj2::prop3': 0,
    'project::Obj2::prop4': 0,
    'project::Person2::id': 0,
    'project::Person2::name': 0,
    'project::Person2::age': 0,
    'project::Person2::children': 0,
    'project::TimeZones::azores': 0,
    'project::TimeZones::utc': 0,
    'project::TimeZones::paris': 0,
    'project::TimeZones::athens': 0,
    'project::Obj::field': 0,
    'project::Obj::tuple': 0,
    'project::Triangle::base': 0,
    'project::Triangle::height': 0,
    'project::Circle::radius': 0,
    'project::SolarRadiation::is_enabled': 0,
    'project::SolarRadiation::radiance': 0,
    'project::SolarRadiation::instant_power': 0,
    'project::Book::name': 0,
    'project::Book::owner': 0,
    'project::KLine::open': 0,
    'project::KLine::close': 0,
    'project::KLine::volume': 0,
    'project::ComplexObject::string': 0,
    'project::ComplexObject::int': 0,
    'project::ComplexObject::float': 0,
    'project::ComplexObject::bool': 0,
    'project::ComplexObject::char': 0,
    'project::ComplexObject::geo': 0,
    'project::ComplexObject::null': 0,
    'project::ComplexObject::enum': 0,
    'project::ComplexObject::array': 0,
    'project::ComplexObject::nodeTime': 0,
    'project::ComplexObject::nodeIndex': 0,
    'project::ComplexObject::nodeList': 0,
    'project::ComplexObject::nodeGeo': 0,
    'project::ComplexObject::nested': 0,
    'project::ComplexObject::map': 0,
    'project::ComplexObject::tuple': 0,
    'project::ComplexObject::t2': 0,
    'project::ComplexObject::t2f': 0,
    'project::ComplexObject::t3': 0,
    'project::ComplexObject::t3f': 0,
    'project::ComplexObject::t4': 0,
    'project::ComplexObject::t4f': 0,
    'project::ComplexObject::str': 0,
    'project::ComplexObject::date': 0,
    'project::Obj1::prop1': 0,
    'project::Obj1::prop2': 0,
    'project::Obj1::prop3': 0,
    'project::Person::name': 0,
    'project::Person::age': 0,
    'project::Person::activated': 0,
    'project::TimedComposed::time': 0,
    'project::TimedComposed::a': 0,
    'project::TimedComposed::b': 0,
    'project::task_with_params$args::name': 0,
    'project::task_with_params$args::age': 0,
    'project::anything$args::v': 0,
    'project::UrlEntry::name': 0,
    'project::UrlEntry::value': 0,
    'project::array_of_ints$args::arr': 0,
    'project::ComplexForm::shapes': 0,
    'project::ComplexForm::shape': 0,
    'project::display_fn_in_obj$args::o': 0,
    'project::SensorData::temperature': 0,
    'project::SensorData::pression': 0,
    'project::SensorData::humidity': 0,
    'project::add$args::a': 0,
    'project::add$args::b': 0,
    'project::SemiRecursive::sub': 0,
    'project::Meteo::ideal_solar': 0,
    'project::Meteo::visual_crossing': 0,
    'project::MapContainer::a': 0,
    'project::MapContainer::b': 0,
    'project::MapContainer::c': 0,
    'project::MapContainer::d': 0,
    'project::MapContainer::e': 0,
    'project::Composed::a': 0,
    'project::Composed::b': 0,
    'project::hello$args::name': 0,
    'project::Link::name': 0,
    'project::Link::next': 0,
    'project::Country::name': 0,
    'project::Country::timezone': 0,
    'project::Country::operating_stats': 0,
    'project::Country::last_updated_stats': 0,
    'project::Country::governorates': 0,
    'project::Country::meteo': 0,
    'project::VisualCrossingProvider::name': 0,
    'project::VisualCrossingProvider::solar': 0,
    'any::array_any_map_any$args::arr': 0,
    'any::array_any_map_any$args::map': 0,
    'any::filter_something$args::f': 0,
    'any::AnyInput::idk': 0,
    'any::Filters::a': 0,
    'any::Filters::b': 0,
    'object::Filter::a': 0,
    'object::Filter::b': 0,
    'heatmap::Earthquake::time': 0,
    'heatmap::Earthquake::location': 0,
    'heatmap::Earthquake::depth': 0,
    'heatmap::Earthquake::mag': 0,
    'heatmap::Earthquake::magType': 0,
    'heatmap::Earthquake::nst': 0,
    'heatmap::Earthquake::gap': 0,
    'heatmap::Earthquake::dmin': 0,
    'heatmap::Earthquake::rms': 0,
    'heatmap::Earthquake::net': 0,
    'heatmap::Earthquake::id': 0,
    'heatmap::Earthquake::updated': 0,
    'heatmap::Earthquake::place': 0,
    'heatmap::Earthquake::horizontalError': 0,
    'heatmap::Earthquake::depthError': 0,
    'heatmap::Earthquake::magError': 0,
    'heatmap::Earthquake::magNst': 0,
    'heatmap::Earthquake::magSource': 0,
    'heatmap::Record::time': 0,
    'heatmap::Record::latitude': 0,
    'heatmap::Record::longitude': 0,
    'heatmap::Record::depth': 0,
    'heatmap::Record::mag': 0,
    'heatmap::Record::magType': 0,
    'heatmap::Record::nst': 0,
    'heatmap::Record::gap': 0,
    'heatmap::Record::dmin': 0,
    'heatmap::Record::rms': 0,
    'heatmap::Record::net': 0,
    'heatmap::Record::id': 0,
    'heatmap::Record::updated': 0,
    'heatmap::Record::place': 0,
    'heatmap::Record::type': 0,
    'heatmap::Record::horizontalError': 0,
    'heatmap::Record::depthError': 0,
    'heatmap::Record::magError': 0,
    'heatmap::Record::magNst': 0,
    'heatmap::Record::status': 0,
    'heatmap::Record::locationSource': 0,
    'heatmap::Record::magSource': 0,
    'cities::City::country': 0,
    'cities::City::name': 0,
    'cities::City::location': 0,
    'cities::City::population': 0,
    'cities::City::type': 0,
    'complex_factory::Cable::voltageLevel': 0,
    'complex_factory::CableView::node': 0,
    'complex_factory::CableView::coordinates': 0,
    'complex_factory::CableView::shortDescr': 0,
    'complex_factory::CableView::deletionDate': 0,
    'complex_factory::CableView::cableId': 0,
    'complex_factory::CableView::voltageLevel': 0,
    'complex_factory::CableView::voltageValue_kV': 0,
    'complex_factory::CableView::meta': 0,
    'complex_factory::CableView::length_m': 0,
    'complex_factory::CableView::regionalCenter': 0,
    'complex_factory::CableView::isSimulated': 0,
  }

  interface $FunctionsMap {
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::node::resolve_all': 0,
    'core::Table::applyMappings': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeIndex::search_closest': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'runtime::User::setPassword': 0,
    'runtime::User::permissions': 0,
    'runtime::User::me': 0,
    'runtime::User::current': 0,
    'runtime::User::renew': 0,
    'runtime::User::logout': 0,
    'runtime::User::tokenLogin': 0,
    'runtime::User::login': 0,
    'runtime::SecurityEntity::set': 0,
    'runtime::SecurityEntity::all': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::Role::all': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
    'runtime::SecurityFields::get': 0,
    'runtime::SecurityFields::set': 0,
    'runtime::OpenIDConnect::config': 0,
    'runtime::Permission::all': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::info': 0,
    'runtime::OpenApi::v3': 0,
    'runtime::Scheduler::deactivate': 0,
    'runtime::Scheduler::activate': 0,
    'runtime::Scheduler::find': 0,
    'runtime::Scheduler::list': 0,
    'runtime::Scheduler::add': 0,
    'io::Csv::sample': 0,
    'io::Csv::analyze': 0,
    'io::Csv::generate': 0,
    'project::init_foo': 0,
    'project::persons': 0,
    'project::chart': 0,
    'project::chart_time': 0,
    'project::chart_colored_area': 0,
    'project::donut': 0,
    'project::heatmap': 0,
    'project::hello': 0,
    'project::table': 0,
    'project::objects_table': 0,
    'project::task_without_params': 0,
    'project::task_with_params': 0,
    'project::task_long_running': 0,
    'project::task_long_running2': 0,
    'project::controlled_task': 0,
    'project::mainTask': 0,
    'project::foo': 0,
    'project::bar': 0,
    'project::obj': 0,
    'project::complex_object': 0,
    'project::obj1': 0,
    'project::obj2': 0,
    'project::get_person': 0,
    'project::tree': 0,
    'project::add': 0,
    'project::anything': 0,
    'project::mapTest': 0,
    'project::goodFnForTestingFnCallInput': 0,
    'project::now': 0,
    'project::link_whatever': 0,
    'project::big_map': 0,
    'project::real_example': 0,
    'project::array_of_ints': 0,
    'project::resolve_person': 0,
    'project::serie_of_obj': 0,
    'project::sample_huge_csv': 0,
    'project::destructuring_table': 0,
    'project::this_is_boom': 0,
    'project::table_of_objects': 0,
    'project::table_of_objects2': 0,
    'project::table_of_objects3': 0,
    'project::one_d_histogram_bins': 0,
    'project::histogram_stats': 0,
    'project::array_of_nodes': 0,
    'project::display_fn': 0,
    'project::display_fn_in_obj': 0,
    'project::people': 0,
    'project::boxes': 0,
    'project::data_array': 0,
    'project::table_with_urls': 0,
    'project::Link::whatever': 0,
    'any::filter_something': 0,
    'any::array_any_map_any': 0,
    'heatmap::major_earthquakes': 0,
    'heatmap::all_earthquakes': 0,
    'complex_factory::cable_views': 0,
  }

  export import float = gc.core.float;
  export import nodeGeo = gc.core.nodeGeo;
  export import String = gc.core.String;
  export import nodeList = gc.core.nodeList;
  export import field = gc.core.field;
  export import Buffer = gc.core.Buffer;
  export import time = gc.core.time;
  export import MathConstants = gc.core.MathConstants;
  export import TimeZone = gc.core.TimeZone;
  export import null_ = gc.core.null_;
  export import str = gc.core.str;
  export import node = gc.core.node;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import Table = gc.core.Table;
  export import t2f = gc.core.t2f;
  export import bool = gc.core.bool;
  export import duration = gc.core.duration;
  export import Array = gc.core.Array;
  export import char = gc.core.char;
  export import SortOrder = gc.core.SortOrder;
  export import GeoCircle = gc.core.GeoCircle;
  export import SearchResult = gc.core.SearchResult;
  export import function_ = gc.core.function_;
  export import NodeInfo = gc.core.NodeInfo;
  export import VectorIndex = gc.core.VectorIndex;
  export import t3f = gc.core.t3f;
  export import TensorType = gc.core.TensorType;
  export import nodeTime = gc.core.nodeTime;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import t2 = gc.core.t2;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import Map = gc.core.Map;
  export import TensorDistance = gc.core.TensorDistance;
  export import t3 = gc.core.t3;
  export import type = gc.core.type;
  export import SamplingMode = gc.core.SamplingMode;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import nodeIndex = gc.core.nodeIndex;
  export import GeoBox = gc.core.GeoBox;
  export import geo = gc.core.geo;
  export import Tuple = gc.core.Tuple;
  export import GeoPoly = gc.core.GeoPoly;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import t4f = gc.core.t4f;
  export import int = gc.core.int;
  export import t4 = gc.core.t4;
  export import Date = gc.core.Date;
  export import DurationUnit = gc.core.DurationUnit;
  export import Tensor = gc.core.Tensor;
  export import ErrorCode = gc.core.ErrorCode;
  export import Error = gc.core.Error;
  export import User = gc.runtime.User;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import FixedPeriodicity = gc.runtime.FixedPeriodicity;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import Task = gc.runtime.Task;
  export import DailyPeriodicity = gc.runtime.DailyPeriodicity;
  export import ChildProcess = gc.runtime.ChildProcess;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import Job = gc.runtime.Job;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import Log = gc.runtime.Log;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import YearlyPeriodicity = gc.runtime.YearlyPeriodicity;
  export import LogDataUsage = gc.runtime.LogDataUsage;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import License = gc.runtime.License;
  export import DateTuple = gc.runtime.DateTuple;
  export import WeeklyPeriodicity = gc.runtime.WeeklyPeriodicity;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import DayOfWeek = gc.runtime.DayOfWeek;
  export import UserGroup = gc.runtime.UserGroup;
  export import PeriodicOptions = gc.runtime.PeriodicOptions;
  export import Runtime = gc.runtime.Runtime;
  export import System = gc.runtime.System;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import Periodicity = gc.runtime.Periodicity;
  export import Month = gc.runtime.Month;
  export import ChildProcessResult = gc.runtime.ChildProcessResult;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import LicenseType = gc.runtime.LicenseType;
  export import OpenApi = gc.runtime.OpenApi;
  export import MonthlyPeriodicity = gc.runtime.MonthlyPeriodicity;
  export import LogLevel = gc.runtime.LogLevel;
  export import Scheduler = gc.runtime.Scheduler;
  export import HttpResponse = gc.io.HttpResponse;
  export import CsvSharding = gc.io.CsvSharding;
  export import JsonReader = gc.io.JsonReader;
  export import Email = gc.io.Email;
  export import HttpRequest = gc.io.HttpRequest;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import CsvReader = gc.io.CsvReader;
  export import JsonWriter = gc.io.JsonWriter;
  export import TextWriter = gc.io.TextWriter;
  export import Smtp = gc.io.Smtp;
  export import XmlReader = gc.io.XmlReader;
  export import Url = gc.io.Url;
  export import SmtpMode = gc.io.SmtpMode;
  export import FileWalker = gc.io.FileWalker;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import HttpMethod = gc.io.HttpMethod;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import GcbWriter = gc.io.GcbWriter;
  export import TextReader = gc.io.TextReader;
  export import Csv = gc.io.Csv;
  export import File = gc.io.File;
  export import Json = gc.io.Json;
  export import CsvWriter = gc.io.CsvWriter;
  export import GcbReader = gc.io.GcbReader;
  export import CsvFormat = gc.io.CsvFormat;
  export import Http = gc.io.Http;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Histogram = gc.util.Histogram;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import Stack = gc.util.Stack;
  export import Random = gc.util.Random;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Assert = gc.util.Assert;
  export import Plot = gc.util.Plot;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import TimeWindow = gc.util.TimeWindow;
  export import Queue = gc.util.Queue;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import Crypto = gc.util.Crypto;
  export import HistogramBin = gc.util.HistogramBin;
  export import HistogramStats = gc.util.HistogramStats;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import Gaussian = gc.util.Gaussian;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import TrafficLight = gc.project.TrafficLight;
  export import Rect = gc.project.Rect;
  export import FooBar = gc.project.FooBar;
  export import Node = gc.project.Node;
  export import Confidence = gc.project.Confidence;
  export import Sensor = gc.project.Sensor;
  export import Box = gc.project.Box;
  export import Obj2 = gc.project.Obj2;
  export import Person2 = gc.project.Person2;
  export import TimeZones = gc.project.TimeZones;
  export import Obj = gc.project.Obj;
  export import Triangle = gc.project.Triangle;
  export import Circle = gc.project.Circle;
  export import SolarRadiation = gc.project.SolarRadiation;
  export import Book = gc.project.Book;
  export import SensorKind = gc.project.SensorKind;
  export import KLine = gc.project.KLine;
  export import RelayApp = gc.project.RelayApp;
  export import ComplexObject = gc.project.ComplexObject;
  export import Obj1 = gc.project.Obj1;
  export import Person = gc.project.Person;
  export import UrlEntry = gc.project.UrlEntry;
  export import ComplexForm = gc.project.ComplexForm;
  export import SensorData = gc.project.SensorData;
  export import SemiRecursive = gc.project.SemiRecursive;
  export import Meteo = gc.project.Meteo;
  export import Shape = gc.project.Shape;
  export import MapContainer = gc.project.MapContainer;
  export import Composed = gc.project.Composed;
  export import Link = gc.project.Link;
  export import Country = gc.project.Country;
  export import VisualCrossingProvider = gc.project.VisualCrossingProvider;
  export import AnyInput = gc.any.AnyInput;
  export import Filters = gc.any.Filters;
  export import Earthquake = gc.heatmap.Earthquake;
  export import CapitalType = gc.cities.CapitalType;
  export import City = gc.cities.City;
  export import VoltageLevel = gc.complex_factory.VoltageLevel;
  export import Cable = gc.complex_factory.Cable;
  export import CableView = gc.complex_factory.CableView;
  export import GridElementView = gc.complex_factory.GridElementView;
  export import init_foo = gc.project.init_foo;
  export import persons = gc.project.persons;
  export import chart = gc.project.chart;
  export import chart_time = gc.project.chart_time;
  export import chart_colored_area = gc.project.chart_colored_area;
  export import donut = gc.project.donut;
  export import heatmap = gc.project.heatmap;
  export import hello = gc.project.hello;
  export import table = gc.project.table;
  export import objects_table = gc.project.objects_table;
  export import task_without_params = gc.project.task_without_params;
  export import task_with_params = gc.project.task_with_params;
  export import task_long_running = gc.project.task_long_running;
  export import task_long_running2 = gc.project.task_long_running2;
  export import controlled_task = gc.project.controlled_task;
  export import mainTask = gc.project.mainTask;
  export import foo = gc.project.foo;
  export import bar = gc.project.bar;
  export import obj = gc.project.obj;
  export import complex_object = gc.project.complex_object;
  export import obj1 = gc.project.obj1;
  export import obj2 = gc.project.obj2;
  export import get_person = gc.project.get_person;
  export import tree = gc.project.tree;
  export import add = gc.project.add;
  export import anything = gc.project.anything;
  export import mapTest = gc.project.mapTest;
  export import goodFnForTestingFnCallInput = gc.project.goodFnForTestingFnCallInput;
  export import now = gc.project.now;
  export import link_whatever = gc.project.link_whatever;
  export import big_map = gc.project.big_map;
  export import real_example = gc.project.real_example;
  export import array_of_ints = gc.project.array_of_ints;
  export import resolve_person = gc.project.resolve_person;
  export import serie_of_obj = gc.project.serie_of_obj;
  export import sample_huge_csv = gc.project.sample_huge_csv;
  export import destructuring_table = gc.project.destructuring_table;
  export import this_is_boom = gc.project.this_is_boom;
  export import table_of_objects = gc.project.table_of_objects;
  export import table_of_objects2 = gc.project.table_of_objects2;
  export import table_of_objects3 = gc.project.table_of_objects3;
  export import one_d_histogram_bins = gc.project.one_d_histogram_bins;
  export import histogram_stats = gc.project.histogram_stats;
  export import array_of_nodes = gc.project.array_of_nodes;
  export import display_fn = gc.project.display_fn;
  export import display_fn_in_obj = gc.project.display_fn_in_obj;
  export import people = gc.project.people;
  export import boxes = gc.project.boxes;
  export import data_array = gc.project.data_array;
  export import table_with_urls = gc.project.table_with_urls;
  export import filter_something = gc.any.filter_something;
  export import array_any_map_any = gc.any.array_any_map_any;
  export import major_earthquakes = gc.heatmap.major_earthquakes;
  export import all_earthquakes = gc.heatmap.all_earthquakes;
  export import cable_views = gc.complex_factory.cable_views;
}
