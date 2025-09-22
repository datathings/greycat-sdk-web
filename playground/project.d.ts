// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace project {
    class chart$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart$args';
      nbRows: number | bigint;
      constructor(nbRows: number | bigint);
      static createFrom(fields: {nbRows: number | bigint}): chart$args;
    }

    class TimeZones extends gc.sdk.GCObject {
      static readonly _type = 'project::TimeZones';
      azores: gc.core.Date;
      utc: gc.core.Date;
      paris: gc.core.Date;
      athens: gc.core.Date;
      constructor(azores: gc.core.Date, utc: gc.core.Date, paris: gc.core.Date, athens: gc.core.Date);
      static createFrom(fields: {azores: gc.core.Date, utc: gc.core.Date, paris: gc.core.Date, athens: gc.core.Date}): TimeZones;
    }

    class Node extends gc.sdk.GCObject {
      static readonly _type = 'project::Node';
      id: string;
      value: any;
      link: gc.core.node<gc.project.Node> | null;
      constructor(id: string, value: any, link?: gc.core.node<gc.project.Node> | null);
      static createFrom(fields: {id: string, value: any, link?: gc.core.node<gc.project.Node> | null}): Node;
    }

    class Composed extends gc.sdk.GCObject {
      static readonly _type = 'project::Composed';
      a: number | bigint;
      b: number;
      constructor(a: number | bigint, b: number);
      static createFrom(fields: {a: number | bigint, b: number}): Composed;
    }

    class get_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_person$args';
    }

    class VisualCrossingProvider extends gc.sdk.GCObject {
      static readonly _type = 'project::VisualCrossingProvider';
      name: string;
      solar: gc.core.node<gc.project.SolarRadiation>;
      constructor(name: string, solar: gc.core.node<gc.project.SolarRadiation>);
      static createFrom(fields: {name: string, solar: gc.core.node<gc.project.SolarRadiation>}): VisualCrossingProvider;
    }

    class link_whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::link_whatever$args';
      l: gc.core.node<gc.project.Link>;
      constructor(l: gc.core.node<gc.project.Link>);
      static createFrom(fields: {l: gc.core.node<gc.project.Link>}): link_whatever$args;
    }

    class task_long_running$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running$args';
    }

    class TimedComposed extends gc.sdk.GCObject {
      static readonly _type = 'project::TimedComposed';
      time: gc.core.time;
      a: number | bigint;
      b: number;
      constructor(time: gc.core.time, a: number | bigint, b: number);
      static createFrom(fields: {time: gc.core.time, a: number | bigint, b: number}): TimedComposed;
    }

    class obj1$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj1$args';
    }

    class tree$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tree$args';
    }

    class Link extends gc.sdk.GCObject {
      static readonly _type = 'project::Link';
      name: string;
      next: gc.project.Link | null;
      constructor(name: string, next?: gc.project.Link | null);
      static createFrom(fields: {name: string, next?: gc.project.Link | null}): Link;
      static whatever(link: gc.core.node<gc.project.Link>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    }

    class chart_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_time$args';
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

    class heatmap$args extends gc.sdk.GCObject {
      static readonly _type = 'project::heatmap$args';
    }

    class obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj$args';
    }

    class array_of_ints$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_ints$args';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_ints$args;
    }

    class one_d_histogram_bins$args extends gc.sdk.GCObject {
      static readonly _type = 'project::one_d_histogram_bins$args';
    }

    class donut$args extends gc.sdk.GCObject {
      static readonly _type = 'project::donut$args';
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      activated: boolean;
      constructor(name: string, age: number | bigint, activated: boolean);
      static createFrom(fields: {name: string, age: number | bigint, activated: boolean}): Person;
    }

    class Obj2 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj2';
      prop1: string;
      prop2: globalThis.Array<gc.runtime.User | null>;
      prop3: globalThis.Map<string, gc.project.Person | null>;
      prop4: any | null;
      constructor(prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, gc.project.Person | null>, prop4?: any | null);
      static createFrom(fields: {prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, gc.project.Person | null>, prop4?: any | null}): Obj2;
    }

    class Shape extends gc.sdk.GCObject {
      static readonly _type = 'project::Shape';
    }

    class table_of_objects2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects2$args';
    }

    class mainTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mainTask$args';
    }

    class this_is_boom$args extends gc.sdk.GCObject {
      static readonly _type = 'project::this_is_boom$args';
    }

    class Link$whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::Link$whatever$args';
      link: gc.core.node<gc.project.Link>;
      constructor(link: gc.core.node<gc.project.Link>);
      static createFrom(fields: {link: gc.core.node<gc.project.Link>}): Link$whatever$args;
    }

    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
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

    class destructuring_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::destructuring_table$args';
    }

    class chart_colored_area$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_colored_area$args';
    }

    class display_fn$args extends gc.sdk.GCObject {
      static readonly _type = 'project::display_fn$args';
      fn_: gc.core.function_;
      constructor(fn_: gc.core.function_);
      static createFrom(fields: {fn_: gc.core.function_}): display_fn$args;
    }

    class complex_object$args extends gc.sdk.GCObject {
      static readonly _type = 'project::complex_object$args';
    }

    class display_fn_in_obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::display_fn_in_obj$args';
      o: gc.project.ObjWithFn;
      constructor(o: gc.project.ObjWithFn);
      static createFrom(fields: {o: gc.project.ObjWithFn}): display_fn_in_obj$args;
    }

    class mapTest$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mapTest$args';
    }

    class resolve_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::resolve_person$args';
    }

    class persons$args extends gc.sdk.GCObject {
      static readonly _type = 'project::persons$args';
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class add$args extends gc.sdk.GCObject {
      static readonly _type = 'project::add$args';
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): add$args;
    }

    class task_long_running2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running2$args';
    }

    class Circle extends gc.sdk.GCObject {
      static readonly _type = 'project::Circle';
      radius: number;
      constructor(radius: number);
      static createFrom(fields: {radius: number}): Circle;
    }

    class Book extends gc.sdk.GCObject {
      static readonly _type = 'project::Book';
      name: string;
      owner: gc.project.Person | null;
      constructor(name: string, owner?: gc.project.Person | null);
      static createFrom(fields: {name: string, owner?: gc.project.Person | null}): Book;
    }

    class Person2 extends gc.sdk.GCObject {
      static readonly _type = 'project::Person2';
      id: number | bigint;
      name: string;
      age: number | bigint;
      children: number | bigint;
      constructor(id: number | bigint, name: string, age: number | bigint, children: number | bigint);
      static createFrom(fields: {id: number | bigint, name: string, age: number | bigint, children: number | bigint}): Person2;
    }

    class array_of_nodes$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_nodes$args';
    }

    class MapContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::MapContainer';
      a: globalThis.Map<number | bigint, string>;
      b: globalThis.Map<gc.core.TimeZone, string>;
      c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>;
      d: globalThis.Array<gc.project.Person | null>;
      e: globalThis.Map<string, string | null>;
      constructor(a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>, d: globalThis.Array<gc.project.Person | null>, e: globalThis.Map<string, string | null>);
      static createFrom(fields: {a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, gc.project.Person | null>, d: globalThis.Array<gc.project.Person | null>, e: globalThis.Map<string, string | null>}): MapContainer;
    }

    class histogram_stats$args extends gc.sdk.GCObject {
      static readonly _type = 'project::histogram_stats$args';
    }

    class objects_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::objects_table$args';
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

    class big_map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::big_map$args';
    }

    class SensorData extends gc.sdk.GCObject {
      static readonly _type = 'project::SensorData';
      temperature: number;
      pression: number;
      humidity: number;
      constructor(temperature: number, pression: number, humidity: number);
      static createFrom(fields: {temperature: number, pression: number, humidity: number}): SensorData;
    }

    class table_of_objects3$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects3$args';
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

    class Triangle extends gc.sdk.GCObject {
      static readonly _type = 'project::Triangle';
      base: number;
      height: number;
      constructor(base: number, height: number);
      static createFrom(fields: {base: number, height: number}): Triangle;
    }

    class Meteo extends gc.sdk.GCObject {
      static readonly _type = 'project::Meteo';
      ideal_solar: gc.core.node<gc.project.SolarRadiation>;
      visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>;
      constructor(ideal_solar: gc.core.node<gc.project.SolarRadiation>, visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>);
      static createFrom(fields: {ideal_solar: gc.core.node<gc.project.SolarRadiation>, visual_crossing: gc.core.node<gc.project.VisualCrossingProvider>}): Meteo;
    }

    class real_example$args extends gc.sdk.GCObject {
      static readonly _type = 'project::real_example$args';
    }

    class now$args extends gc.sdk.GCObject {
      static readonly _type = 'project::now$args';
    }

    class ObjWithFn extends gc.sdk.GCObject {
      static readonly _type = 'project::ObjWithFn';
      fn: gc.core.function_;
      constructor(fn: gc.core.function_);
      static createFrom(fields: {fn: gc.core.function_}): ObjWithFn;
    }

    class Country extends gc.sdk.GCObject {
      static readonly _type = 'project::Country';
      name: string;
      timezone: gc.core.TimeZone;
      operating_stats: gc.core.node;
      last_updated_stats: gc.core.time | null;
      governorates: gc.core.nodeIndex;
      meteo: gc.core.node<gc.project.Meteo>;
      constructor(name: string, timezone: gc.core.TimeZone, operating_stats: gc.core.node, last_updated_stats: gc.core.time | null, governorates: gc.core.nodeIndex, meteo: gc.core.node<gc.project.Meteo>);
      static createFrom(fields: {name: string, timezone: gc.core.TimeZone, operating_stats: gc.core.node, last_updated_stats?: gc.core.time | null, governorates: gc.core.nodeIndex, meteo: gc.core.node<gc.project.Meteo>}): Country;
    }

    class SemiRecursive extends gc.sdk.GCObject {
      static readonly _type = 'project::SemiRecursive';
      sub: gc.project.SemiRecursive | null;
      constructor(sub?: gc.project.SemiRecursive | null);
      static createFrom(fields: {sub?: gc.project.SemiRecursive | null}): SemiRecursive;
    }

    class init_foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::init_foo$args';
    }

    class SeriesObject extends gc.sdk.GCObject {
      static readonly _type = 'project::SeriesObject';
      a: number | bigint;
      b: number;
      constructor(a: number | bigint, b: number);
      static createFrom(fields: {a: number | bigint, b: number}): SeriesObject;
    }

    class SolarRadiation extends gc.sdk.GCObject {
      static readonly _type = 'project::SolarRadiation';
      is_enabled: boolean;
      radiance: gc.core.nodeTime;
      instant_power: gc.core.nodeTime;
      constructor(is_enabled: boolean, radiance: gc.core.nodeTime, instant_power: gc.core.nodeTime);
      static createFrom(fields: {is_enabled: boolean, radiance: gc.core.nodeTime, instant_power: gc.core.nodeTime}): SolarRadiation;
    }

    class ComplexForm extends gc.sdk.GCObject {
      static readonly _type = 'project::ComplexForm';
      shapes: globalThis.Array<gc.project.Shape>;
      shape: gc.project.Shape;
      constructor(shapes: globalThis.Array<gc.project.Shape>, shape: gc.project.Shape);
      static createFrom(fields: {shapes: globalThis.Array<gc.project.Shape>, shape: gc.project.Shape}): ComplexForm;
    }

    class goodFnForTestingFnCallInput$args extends gc.sdk.GCObject {
      static readonly _type = 'project::goodFnForTestingFnCallInput$args';
      name: string;
      flag: boolean;
      item: gc.core.DurationUnit;
      optionalFlag: boolean | null;
      constructor(name: string, flag: boolean, item: gc.core.DurationUnit, optionalFlag?: boolean | null);
      static createFrom(fields: {name: string, flag: boolean, item: gc.core.DurationUnit, optionalFlag?: boolean | null}): goodFnForTestingFnCallInput$args;
    }

    class sample_huge_csv$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sample_huge_csv$args';
    }

    class anything$args extends gc.sdk.GCObject {
      static readonly _type = 'project::anything$args';
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): anything$args;
    }

    class ComplexObject extends gc.sdk.GCObject {
      static readonly _type = 'project::ComplexObject';
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

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      field: any | null;
      tuple: gc.core.Tuple<any, any>;
      constructor(field: any | null, tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {field?: any | null, tuple: gc.core.Tuple<any, any>}): Obj;
    }

    class task_without_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_without_params$args';
    }

    class hello$args extends gc.sdk.GCObject {
      static readonly _type = 'project::hello$args';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): hello$args;
    }

    class serie_of_obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::serie_of_obj$args';
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      id: number | bigint;
      kind: gc.project.SensorKind;
      constructor(id: number | bigint, kind: gc.project.SensorKind);
      static createFrom(fields: {id: number | bigint, kind: gc.project.SensorKind}): Sensor;
    }

    class Obj1 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj1';
      prop1: string;
      prop2: gc.runtime.User;
      prop3: gc.runtime.RuntimeInfo;
      constructor(prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo);
      static createFrom(fields: {prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo}): Obj1;
    }

    class bar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::bar$args';
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): task_with_params$args;
    }

    class Rect extends gc.sdk.GCObject {
      static readonly _type = 'project::Rect';
      width: number;
      height: number;
      constructor(width: number, height: number);
      static createFrom(fields: {width: number, height: number}): Rect;
    }

    class TimeRecord<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'project::TimeRecord';
      time: gc.core.time;
      value: T;
      constructor(time: gc.core.time, value?: T);
      static createFrom<T>(fields: {time: gc.core.time, value?: T}): TimeRecord;
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
    }

    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class KLine extends gc.sdk.GCObject {
      static readonly _type = 'project::KLine';
      open: number;
      close: number;
      volume: number | bigint;
      constructor(open: number, close: number, volume: number | bigint);
      static createFrom(fields: {open: number, close: number, volume: number | bigint}): KLine;
    }

    class obj2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj2$args';
    }

    class controlled_task$args extends gc.sdk.GCObject {
      static readonly _type = 'project::controlled_task$args';
      duration: gc.core.duration;
      constructor(duration: gc.core.duration);
      static createFrom(fields: {duration: gc.core.duration}): controlled_task$args;
    }

    class table_of_objects$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table_of_objects$args';
    }

    function init_foo($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function persons($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function chart(nbRows: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<any>>;
    function chart_time($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function chart_colored_area($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function donut($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function heatmap($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function hello(name: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    function table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function objects_table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Person>>;
    function task_without_params($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_with_params(name: string, age: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function controlled_task(duration: gc.core.duration, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function mainTask($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foo($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function bar($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function complex_object($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj1($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_person($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tree($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function add(a: number | bigint, b: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint>;
    function anything(v?: any | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function mapTest($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<gc.core.DurationUnit, gc.core.Tuple<string, number | bigint>>>;
    function goodFnForTestingFnCallInput(name: string, flag: boolean, item: gc.core.DurationUnit, optionalFlag?: boolean | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function now($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function link_whatever(l: gc.core.node<gc.project.Link>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function big_map($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function real_example($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.project.Country>;
    function array_of_ints(arr: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function resolve_person($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function serie_of_obj($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function sample_huge_csv($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table | null>;
    function destructuring_table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function this_is_boom($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function table_of_objects($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimeRecord<gc.project.Composed>>>;
    function table_of_objects2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimedComposed>>;
    function table_of_objects3($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    function one_d_histogram_bins($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.util.HistogramBin<number>>>;
    function histogram_stats($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.util.HistogramStats<number> | null>;
    function array_of_nodes($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<string>>>;
    function display_fn(fn_: gc.core.function_, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function display_fn_in_obj(o: gc.project.ObjWithFn, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
  }

  namespace any {
    class AnyInput extends gc.sdk.GCObject {
      static readonly _type = 'any::AnyInput';
      idk: any;
      constructor(idk: any);
      static createFrom(fields: {idk: any}): AnyInput;
    }

    class filter_something$args extends gc.sdk.GCObject {
      static readonly _type = 'any::filter_something$args';
      f: gc.any.Filters;
      constructor(f: gc.any.Filters);
      static createFrom(fields: {f: gc.any.Filters}): filter_something$args;
    }

    class array_any_map_any$args extends gc.sdk.GCObject {
      static readonly _type = 'any::array_any_map_any$args';
      arr: globalThis.Array<any | null>;
      map: globalThis.Map<any | null, any | null>;
      constructor(arr: globalThis.Array<any | null>, map: globalThis.Map<any | null, any | null>);
      static createFrom(fields: {arr: globalThis.Array<any | null>, map: globalThis.Map<any | null, any | null>}): array_any_map_any$args;
    }

    class Filters extends gc.sdk.GCObject {
      static readonly _type = 'any::Filters';
      a: number | bigint;
      b: string;
      constructor(a: number | bigint, b: string);
      static createFrom(fields: {a: number | bigint, b: string}): Filters;
    }

    function filter_something(f: gc.any.Filters, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function array_any_map_any(arr: globalThis.Array<any | null>, map: globalThis.Map<any | null, any | null>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
  }

  namespace object {
    class Filter extends gc.sdk.GCObject {
      static readonly _type = 'object::Filter';
      a: number | bigint;
      b: string | null;
      constructor(a: number | bigint, b?: string | null);
      static createFrom(fields: {a: number | bigint, b?: string | null}): Filter;
    }

  }

  namespace tx {
  }

  namespace heatmap {
    class MagSource extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::MagSource';
      static readonly $fields: MagSource[];
      key: MagSource.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: MagSource.Field);
      static ak: MagSource;
      static us: MagSource;
      static nn: MagSource;
    }
    namespace MagSource  {
      type Field = "ak"|"us"|"nn";
    }

    class Status extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::Status';
      static readonly $fields: Status[];
      key: Status.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Status.Field);
      static reviewed: Status;
    }
    namespace Status  {
      type Field = "reviewed";
    }

    class MagType extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::MagType';
      static readonly $fields: MagType[];
      key: MagType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: MagType.Field);
      static mww: MagType;
      static ml: MagType;
      static mw: MagType;
      static mwr: MagType;
      static mb: MagType;
    }
    namespace MagType  {
      type Field = "mww"|"ml"|"mw"|"mwr"|"mb";
    }

    class Record extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::Record';
      time: gc.core.time;
      latitude: number;
      longitude: number;
      depth: number;
      mag: number;
      magType: gc.heatmap.MagType;
      nst: number | bigint | null;
      gap: number | bigint | null;
      dmin: number | null;
      rms: number;
      net: gc.heatmap.Net;
      id: string;
      updated: gc.core.time;
      place: string;
      type: gc.heatmap.Type;
      horizontalError: number | null;
      depthError: number;
      magError: number | null;
      magNst: number | bigint | null;
      status: gc.heatmap.Status;
      locationSource: gc.heatmap.LocationSource;
      magSource: gc.heatmap.MagSource;
      constructor(time: gc.core.time, latitude: number, longitude: number, depth: number, mag: number, magType: gc.heatmap.MagType, nst: number | bigint | null, gap: number | bigint | null, dmin: number | null, rms: number, net: gc.heatmap.Net, id: string, updated: gc.core.time, place: string, type: gc.heatmap.Type, horizontalError: number | null, depthError: number, magError: number | null, magNst: number | bigint | null, status: gc.heatmap.Status, locationSource: gc.heatmap.LocationSource, magSource: gc.heatmap.MagSource);
      static createFrom(fields: {time: gc.core.time, latitude: number, longitude: number, depth: number, mag: number, magType: gc.heatmap.MagType, nst?: number | bigint | null, gap?: number | bigint | null, dmin?: number | null, rms: number, net: gc.heatmap.Net, id: string, updated: gc.core.time, place: string, type: gc.heatmap.Type, horizontalError?: number | null, depthError: number, magError?: number | null, magNst?: number | bigint | null, status: gc.heatmap.Status, locationSource: gc.heatmap.LocationSource, magSource: gc.heatmap.MagSource}): Record;
    }

    class Net extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::Net';
      static readonly $fields: Net[];
      key: Net.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Net.Field);
      static ak: Net;
      static us: Net;
      static nn: Net;
    }
    namespace Net  {
      type Field = "ak"|"us"|"nn";
    }

    class LocationSource extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::LocationSource';
      static readonly $fields: LocationSource[];
      key: LocationSource.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: LocationSource.Field);
      static ak: LocationSource;
      static us: LocationSource;
      static nn: LocationSource;
    }
    namespace LocationSource  {
      type Field = "ak"|"us"|"nn";
    }

    class Type extends gc.sdk.GCEnum {
      static readonly _type = 'heatmap::Type';
      static readonly $fields: Type[];
      key: Type.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Type.Field);
      static earthquake: Type;
    }
    namespace Type  {
      type Field = "earthquake";
    }

    class Earthquake extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::Earthquake';
      time: gc.core.time;
      location: gc.core.geo;
      depth: number;
      mag: number;
      magType: gc.heatmap.MagType;
      nst: number | bigint | null;
      gap: number | bigint | null;
      dmin: number | null;
      rms: number;
      net: gc.heatmap.Net;
      id: string;
      updated: gc.core.time;
      place: string;
      horizontalError: number | null;
      depthError: number;
      magError: number | null;
      magNst: number | bigint | null;
      magSource: gc.heatmap.MagSource;
      constructor(time: gc.core.time, location: gc.core.geo, depth: number, mag: number, magType: gc.heatmap.MagType, nst: number | bigint | null, gap: number | bigint | null, dmin: number | null, rms: number, net: gc.heatmap.Net, id: string, updated: gc.core.time, place: string, horizontalError: number | null, depthError: number, magError: number | null, magNst: number | bigint | null, magSource: gc.heatmap.MagSource);
      static createFrom(fields: {time: gc.core.time, location: gc.core.geo, depth: number, mag: number, magType: gc.heatmap.MagType, nst?: number | bigint | null, gap?: number | bigint | null, dmin?: number | null, rms: number, net: gc.heatmap.Net, id: string, updated: gc.core.time, place: string, horizontalError?: number | null, depthError: number, magError?: number | null, magNst?: number | bigint | null, magSource: gc.heatmap.MagSource}): Earthquake;
    }

    class earthquakes$args extends gc.sdk.GCObject {
      static readonly _type = 'heatmap::earthquakes$args';
    }

    function earthquakes($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.heatmap.Earthquake>>;
  }

  namespace cities {
    class City extends gc.sdk.GCObject {
      static readonly _type = 'cities::City';
      country: string;
      name: string;
      location: gc.core.geo;
      population: number | bigint;
      type: gc.cities.CapitalType;
      constructor(country: string, name: string, location: gc.core.geo, population: number | bigint, type: gc.cities.CapitalType);
      static createFrom(fields: {country: string, name: string, location: gc.core.geo, population: number | bigint, type: gc.cities.CapitalType}): City;
    }

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

  }

  namespace sdk {
    interface GreyCat {
        call(method: 'project::Link::whatever', args: [gc.core.node<gc.project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::Link::whatever', args: [gc.core.node<gc.project.Link>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::Link::whatever', args: [gc.core.node<gc.project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::init_foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::init_foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::init_foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::persons', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::persons', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::persons', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::chart', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.core.Table<any>>;
        spawn(method: 'project::chart', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::chart', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<any>>;
        call(method: 'project::chart_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::chart_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::chart_time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::chart_colored_area', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::chart_colored_area', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::chart_colored_area', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::donut', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::donut', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::donut', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::heatmap', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::heatmap', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::heatmap', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::hello', args: [string], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'project::hello', args: [string], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::hello', args: [string], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Person>>;
        spawn(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::objects_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.Person>>;
        call(method: 'project::task_without_params', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::task_without_params', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_without_params', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::task_long_running', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::task_long_running', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_long_running', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::task_long_running2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::task_long_running2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::task_long_running2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::controlled_task', args: [gc.core.duration], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::controlled_task', args: [gc.core.duration], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::controlled_task', args: [gc.core.duration], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::mainTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::mainTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::mainTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::bar', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::bar', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::bar', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::obj', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::complex_object', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::complex_object', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::complex_object', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::obj1', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::obj1', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::obj1', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::obj2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::obj2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::obj2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::get_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::get_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::get_person', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::tree', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::tree', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::tree', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::add', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<number | bigint>;
        spawn(method: 'project::add', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::add', args: [number | bigint, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number | bigint>;
        call(method: 'project::anything', args: [any | null], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::anything', args: [any | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::anything', args: [any | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::mapTest', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<gc.core.DurationUnit, gc.core.Tuple<string, number | bigint>>>;
        spawn(method: 'project::mapTest', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::mapTest', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<gc.core.DurationUnit, gc.core.Tuple<string, number | bigint>>>;
        call(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, gc.core.DurationUnit, boolean | null], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, gc.core.DurationUnit, boolean | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, gc.core.DurationUnit, boolean | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::now', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::now', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::now', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::link_whatever', args: [gc.core.node<gc.project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::link_whatever', args: [gc.core.node<gc.project.Link>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::link_whatever', args: [gc.core.node<gc.project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        spawn(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::big_map', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        call(method: 'project::real_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.project.Country>;
        spawn(method: 'project::real_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::real_example', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.project.Country>;
        call(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        spawn(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        call(method: 'project::resolve_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::resolve_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::resolve_person', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::serie_of_obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::serie_of_obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::serie_of_obj', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::sample_huge_csv', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table | null>;
        spawn(method: 'project::sample_huge_csv', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::sample_huge_csv', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table | null>;
        call(method: 'project::destructuring_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::destructuring_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::destructuring_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::this_is_boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::this_is_boom', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::this_is_boom', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::table_of_objects', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimeRecord<gc.project.Composed>>>;
        spawn(method: 'project::table_of_objects', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table_of_objects', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimeRecord<gc.project.Composed>>>;
        call(method: 'project::table_of_objects2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimedComposed>>;
        spawn(method: 'project::table_of_objects2', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table_of_objects2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<gc.project.TimedComposed>>;
        call(method: 'project::table_of_objects3', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'project::table_of_objects3', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::table_of_objects3', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'project::one_d_histogram_bins', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.util.HistogramBin<number>>>;
        spawn(method: 'project::one_d_histogram_bins', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::one_d_histogram_bins', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.util.HistogramBin<number>>>;
        call(method: 'project::histogram_stats', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.util.HistogramStats<number> | null>;
        spawn(method: 'project::histogram_stats', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::histogram_stats', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.util.HistogramStats<number> | null>;
        call(method: 'project::array_of_nodes', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<string>>>;
        spawn(method: 'project::array_of_nodes', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::array_of_nodes', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.node<string>>>;
        call(method: 'project::display_fn', args: [gc.core.function_], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::display_fn', args: [gc.core.function_], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::display_fn', args: [gc.core.function_], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::display_fn_in_obj', args: [gc.project.ObjWithFn], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::display_fn_in_obj', args: [gc.project.ObjWithFn], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::display_fn_in_obj', args: [gc.project.ObjWithFn], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'any::filter_something', args: [gc.any.Filters], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'any::filter_something', args: [gc.any.Filters], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'any::filter_something', args: [gc.any.Filters], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'heatmap::earthquakes', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.heatmap.Earthquake>>;
        spawn(method: 'heatmap::earthquakes', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'heatmap::earthquakes', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.heatmap.Earthquake>>;
    }
  }
  interface $TypesMap {
    'core::Array<project::Person2>': 0,
    'core::t2': 0,
    'core::node<project::VisualCrossingProvider>': 0,
    'core::Array<core::any>': 0,
    'core::Tuple<core::String,core::int>': 0,
    'core::TableColumnMapping': 0,
    'core::float': 0,
    'core::t2f': 0,
    'core::Map<core::DurationUnit,core::Tuple<core::String,core::int>>': 0,
    'core::Tuple<core::String,core::String>': 0,
    'core::node<core::Table?>': 0,
    'core::Array<project::Shape>': 0,
    'core::Array<core::any?>': 0,
    'core::nodeTime<project::SensorData>': 0,
    'core::Map<core::String,core::String?>': 0,
    'core::Array<core::String>': 0,
    'core::String': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::Array<heatmap::Earthquake>': 0,
    'core::field': 0,
    'core::node<project::Node>': 0,
    'core::time': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::Array<core::node?>': 0,
    'core::node<project::Person2?>': 0,
    'core::Map<core::any,core::int>': 0,
    'core::Array<io::File>': 0,
    'core::Table<core::any>': 0,
    'core::Array<runtime::Variable>': 0,
    'core::nodeIndex<core::String,core::int>': 0,
    'core::Array<project::SensorData>': 0,
    'core::SortOrder': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::nodeTime$sample$args': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::TimeZone': 0,
    'core::Array<runtime::DateTuple>': 0,
    'core::nodeGeo<heatmap::Earthquake>': 0,
    'core::Table<project::TimedComposed>': 0,
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::nodeGeo<cities::City>': 0,
    'core::null': 0,
    'core::node': 0,
    'core::node<core::String>': 0,
    'core::GeoBox': 0,
    'core::Map<core::String,core::String>': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::Tuple<core::time,project::KLine>': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::DurationUnit': 0,
    'core::nodeList': 0,
    'core::Table': 0,
    'core::Array<core::nodeTime>': 0,
    'core::Tuple<core::geo,heatmap::Earthquake>': 0,
    'core::bool': 0,
    'core::Array<core::int>': 0,
    'core::geo': 0,
    'core::node<project::Meteo>': 0,
    'core::Array<runtime::UserCredential>': 0,
    'core::ErrorCode': 0,
    'core::duration': 0,
    'core::Date': 0,
    'core::Map<core::String,core::any>': 0,
    'core::Array': 0,
    'core::Tuple<core::time,heatmap::Earthquake>': 0,
    'core::Array<runtime::UserGroupPolicy>': 0,
    'core::GeoCircle': 0,
    'core::str': 0,
    'core::any': 0,
    'core::char': 0,
    'core::GeoPoly': 0,
    'core::t3': 0,
    'core::Array<runtime::Frame>': 0,
    'core::Array<runtime::Role>': 0,
    'core::Map<core::String,runtime::UserCredential>': 0,
    'core::Table<project::Person>': 0,
    'core::Array<core::field>': 0,
    'core::node<project::Link>': 0,
    'core::Date$from_time$args': 0,
    'core::Tuple<core::String,core::float>': 0,
    'core::Error': 0,
    'core::function': 0,
    'core::Map<core::String,core::int>': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::node$resolve_all$args': 0,
    'core::NodeInfo': 0,
    'core::Tuple<core::time,core::float>': 0,
    'core::CalendarUnit': 0,
    'core::node<project::Person2>': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::Tuple<core::geo,core::any?>': 0,
    'core::Array<core::Tuple<core::String,core::int>>': 0,
    'core::Array<runtime::Permission>': 0,
    'core::nodeTime': 0,
    'core::Array<core::float>': 0,
    'core::nodeIndexBucket': 0,
    'core::Table$applyMappings$args': 0,
    'core::t4': 0,
    'core::TensorType': 0,
    'core::Array<core::int?>': 0,
    'core::FloatPrecision': 0,
    'core::nodeList$info$args': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::Array<core::Array<core::float>>': 0,
    'core::Tensor': 0,
    'core::Map<core::TimeZone,core::String>': 0,
    'core::Array<runtime::DayOfWeek>': 0,
    'core::nodeGeo$sample$args': 0,
    'core::Map<core::SamplingMode,project::Person?>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::nodeTime<core::float>': 0,
    'core::NodeInfo<core::int>': 0,
    'core::Array<runtime::User?>': 0,
    'core::Array<project::KLine>': 0,
    'core::Array<core::geo>': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::Tuple<core::int,core::int>': 0,
    'core::nodeIndexBucket<core::String,core::int>': 0,
    'core::Tuple<core::any,core::any>': 0,
    'core::type': 0,
    'core::SamplingMode': 0,
    'core::ErrorFrame': 0,
    'core::NodeInfo<core::time>': 0,
    'core::Tuple<core::time,project::SensorData>': 0,
    'core::nodeList$sample$args': 0,
    'core::Table<project::TimeRecord<project::Composed>>': 0,
    'core::nodeIndex': 0,
    'core::MathConstants': 0,
    'core::Map<core::String,project::Person?>': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::Buffer': 0,
    'core::Array<core::nodeList>': 0,
    'core::t4f': 0,
    'core::Array<project::Person?>': 0,
    'core::Tuple<core::geo,cities::City>': 0,
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::nodeTime$info$args': 0,
    'core::Array<runtime::Task>': 0,
    'core::nodeTime<heatmap::Earthquake>': 0,
    'core::Map': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::Tuple<core::int,core::any?>': 0,
    'core::Tuple': 0,
    'core::node<project::SolarRadiation>': 0,
    'core::t3f': 0,
    'core::Array<runtime::SecurityEntity>': 0,
    'core::nodeGeo$info$args': 0,
    'core::Array<util::HistogramBin<core::float>>': 0,
    'core::nodeTimeCursor': 0,
    'core::int': 0,
    'core::nodeTime<project::KLine>': 0,
    'core::Array<core::String?>': 0,
    'core::Map<core::any,core::any?>': 0,
    'core::nodeGeo': 0,
    'core::nodeIndex$info$args': 0,
    'core::Map<core::int,core::String>': 0,
    'core::Array<core::node<core::String>>': 0,
    'core::Array<runtime::Job>': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::Array<util::Quantizer>': 0,
    'runtime::SecurityFields$set$args': 0,
    'runtime::User$setPassword$args': 0,
    'runtime::Debug$get$args': 0,
    'runtime::Task$running$args': 0,
    'runtime::Scheduler': 0,
    'runtime::TaskStatus': 0,
    'runtime::Debug$all$args': 0,
    'runtime::Permission$all$args': 0,
    'runtime::DailyPeriodicity': 0,
    'runtime::SecurityFields$get$args': 0,
    'runtime::SecurityPolicy': 0,
    'runtime::User$me$args': 0,
    'runtime::Job': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::Runtime$openapi$args': 0,
    'runtime::Periodicity': 0,
    'runtime::User$current$args': 0,
    'runtime::PeriodicOptions': 0,
    'runtime::User$permissions$args': 0,
    'runtime::UserGroupPolicyType': 0,
    'runtime::Task$cancel$args': 0,
    'runtime::UserGroup': 0,
    'runtime::Frame': 0,
    'runtime::YearlyPeriodicity': 0,
    'runtime::Role': 0,
    'runtime::Scheduler$activate$args': 0,
    'runtime::Role$all$args': 0,
    'runtime::SecurityEntity$all$args': 0,
    'runtime::Task$history$args': 0,
    'runtime::User$tokenLogin$args': 0,
    'runtime::SecurityFields': 0,
    'runtime::OpenIDConnect$config$args': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::User$logout$args': 0,
    'runtime::UserCredential': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::Task': 0,
    'runtime::SecurityEntity': 0,
    'runtime::User$login$args': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::Variable': 0,
    'runtime::MergeStrategy': 0,
    'runtime::LicenseType': 0,
    'runtime::OpenIDConnect': 0,
    'runtime::Scheduler$list$args': 0,
    'runtime::FixedPeriodicity': 0,
    'runtime::User': 0,
    'runtime::DateTuple': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::UserGroupPolicy': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::Log': 0,
    'runtime::License': 0,
    'runtime::WeeklyPeriodicity': 0,
    'runtime::Scheduler$add$args': 0,
    'runtime::Month': 0,
    'runtime::SecurityEntity$set$args': 0,
    'runtime::Permission': 0,
    'runtime::LogLevel': 0,
    'runtime::Runtime': 0,
    'runtime::MonthlyPeriodicity': 0,
    'runtime::Debug': 0,
    'runtime::LogDataUsage': 0,
    'runtime::PeriodicTask': 0,
    'runtime::DayOfWeek': 0,
    'runtime::Scheduler$deactivate$args': 0,
    'runtime::Scheduler$find$args': 0,
    'runtime::User$renew$args': 0,
    'runtime::System': 0,
    'io::Reader<cities::City>': 0,
    'io::JsonReader': 0,
    'io::File': 0,
    'io::GcbReader': 0,
    'io::CsvReader<heatmap::Record>': 0,
    'io::TextWriter': 0,
    'io::JsonWriter': 0,
    'io::Smtp': 0,
    'io::CsvStatistics': 0,
    'io::Email': 0,
    'io::Csv$generate$args': 0,
    'io::SmtpMode': 0,
    'io::HttpMethod': 0,
    'io::CsvReader<cities::City>': 0,
    'io::FileWalker': 0,
    'io::Csv$sample$args': 0,
    'io::Reader': 0,
    'io::Csv': 0,
    'io::Writer': 0,
    'io::CsvReader': 0,
    'io::CsvSharding': 0,
    'io::Json': 0,
    'io::Csv$analyze$args': 0,
    'io::CsvAnalysisConfig': 0,
    'io::CsvWriter': 0,
    'io::GcbWriter': 0,
    'io::Reader<core::String>': 0,
    'io::HttpRequest': 0,
    'io::Reader<heatmap::Record>': 0,
    'io::CsvFormat': 0,
    'io::Reader<core::Array<core::float>>': 0,
    'io::HttpResponse': 0,
    'io::CsvColumnStatistics': 0,
    'io::Url': 0,
    'io::SmtpAuth': 0,
    'io::TextReader': 0,
    'io::CsvReader<core::Array<core::float>>': 0,
    'io::Http': 0,
    'io::XmlReader': 0,
    'util::GaussianProfile': 0,
    'util::MultiQuantizer': 0,
    'util::HistogramStats<core::float>': 0,
    'util::Crypto': 0,
    'util::Gaussian': 0,
    'util::SlidingWindow': 0,
    'util::HistogramBin': 0,
    'util::Quantizer<core::Array>': 0,
    'util::GaussianProfileSlot': 0,
    'util::QuantizerSlotBound<core::float>': 0,
    'util::TimeWindow': 0,
    'util::LinearQuantizer<core::float>': 0,
    'util::Quantizer': 0,
    'util::Histogram': 0,
    'util::HistogramStats': 0,
    'util::Histogram<core::float>': 0,
    'util::Plot': 0,
    'util::Gaussian<core::float>': 0,
    'util::CustomQuantizer': 0,
    'util::Random': 0,
    'util::LogQuantizer': 0,
    'util::ProgressTracker': 0,
    'util::LinearQuantizer': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::Queue': 0,
    'util::Quantizer<core::float>': 0,
    'util::Assert': 0,
    'util::QuantizerSlotBound': 0,
    'util::Stack': 0,
    'util::HistogramBin<core::float>': 0,
    'project::chart$args': 0,
    'project::TimeZones': 0,
    'project::Node': 0,
    'project::Composed': 0,
    'project::get_person$args': 0,
    'project::VisualCrossingProvider': 0,
    'project::link_whatever$args': 0,
    'project::task_long_running$args': 0,
    'project::TimedComposed': 0,
    'project::obj1$args': 0,
    'project::tree$args': 0,
    'project::Link': 0,
    'project::TimeRecord<project::Composed>': 0,
    'project::chart_time$args': 0,
    'project::TrafficLight': 0,
    'project::heatmap$args': 0,
    'project::obj$args': 0,
    'project::array_of_ints$args': 0,
    'project::one_d_histogram_bins$args': 0,
    'project::donut$args': 0,
    'project::Person': 0,
    'project::Obj2': 0,
    'project::Shape': 0,
    'project::table_of_objects2$args': 0,
    'project::mainTask$args': 0,
    'project::this_is_boom$args': 0,
    'project::Link$whatever$args': 0,
    'project::Root': 0,
    'project::destructuring_table$args': 0,
    'project::chart_colored_area$args': 0,
    'project::display_fn$args': 0,
    'project::complex_object$args': 0,
    'project::display_fn_in_obj$args': 0,
    'project::mapTest$args': 0,
    'project::resolve_person$args': 0,
    'project::persons$args': 0,
    'project::foo$args': 0,
    'project::add$args': 0,
    'project::task_long_running2$args': 0,
    'project::Circle': 0,
    'project::Book': 0,
    'project::Person2': 0,
    'project::array_of_nodes$args': 0,
    'project::MapContainer': 0,
    'project::histogram_stats$args': 0,
    'project::objects_table$args': 0,
    'project::Confidence': 0,
    'project::big_map$args': 0,
    'project::SensorData': 0,
    'project::table_of_objects3$args': 0,
    'project::SensorKind': 0,
    'project::RelayApp': 0,
    'project::Triangle': 0,
    'project::Meteo': 0,
    'project::real_example$args': 0,
    'project::now$args': 0,
    'project::ObjWithFn': 0,
    'project::Country': 0,
    'project::SemiRecursive': 0,
    'project::init_foo$args': 0,
    'project::SeriesObject': 0,
    'project::SolarRadiation': 0,
    'project::ComplexForm': 0,
    'project::goodFnForTestingFnCallInput$args': 0,
    'project::sample_huge_csv$args': 0,
    'project::anything$args': 0,
    'project::ComplexObject': 0,
    'project::Obj': 0,
    'project::task_without_params$args': 0,
    'project::hello$args': 0,
    'project::serie_of_obj$args': 0,
    'project::Sensor': 0,
    'project::Obj1': 0,
    'project::bar$args': 0,
    'project::task_with_params$args': 0,
    'project::Rect': 0,
    'project::TimeRecord': 0,
    'project::FooBar': 0,
    'project::table$args': 0,
    'project::KLine': 0,
    'project::obj2$args': 0,
    'project::controlled_task$args': 0,
    'project::table_of_objects$args': 0,
    'any::AnyInput': 0,
    'any::filter_something$args': 0,
    'any::array_any_map_any$args': 0,
    'any::Filters': 0,
    'object::Filter': 0,
    'heatmap::MagSource': 0,
    'heatmap::Status': 0,
    'heatmap::MagType': 0,
    'heatmap::Record': 0,
    'heatmap::Net': 0,
    'heatmap::LocationSource': 0,
    'heatmap::Type': 0,
    'heatmap::Earthquake': 0,
    'heatmap::earthquakes$args': 0,
    'cities::City': 0,
    'cities::CapitalType': 0,
  }

  interface $FieldsMap {
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::GeoPoly::points': 0,
    'core::Date$from_time$args::time': 0,
    'core::Date$from_time$args::tz': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'core::node$resolve_all$args::n': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::nodeIndexBucket::key': 0,
    'core::nodeIndexBucket::value': 0,
    'core::nodeIndexBucket::next': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::nodeList$info$args::nodes': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::nodeGeo$info$args::nodes': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeTimeCursor::req_time': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'runtime::SecurityFields$set$args::f': 0,
    'runtime::User$setPassword$args::name': 0,
    'runtime::User$setPassword$args::pass': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::DailyPeriodicity::hour': 0,
    'runtime::DailyPeriodicity::minute': 0,
    'runtime::DailyPeriodicity::second': 0,
    'runtime::DailyPeriodicity::timezone': 0,
    'runtime::SecurityPolicy::entities': 0,
    'runtime::SecurityPolicy::credentials': 0,
    'runtime::SecurityPolicy::fields': 0,
    'runtime::SecurityPolicy::keys': 0,
    'runtime::SecurityPolicy::keys_last_refresh': 0,
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::PeriodicOptions::activated': 0,
    'runtime::PeriodicOptions::start': 0,
    'runtime::PeriodicOptions::max_duration': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'runtime::UserGroup::id': 0,
    'runtime::UserGroup::name': 0,
    'runtime::UserGroup::activated': 0,
    'runtime::Frame::module': 0,
    'runtime::Frame::type': 0,
    'runtime::Frame::function': 0,
    'runtime::Frame::src': 0,
    'runtime::Frame::line': 0,
    'runtime::Frame::column': 0,
    'runtime::Frame::scope': 0,
    'runtime::YearlyPeriodicity::dates': 0,
    'runtime::YearlyPeriodicity::timezone': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'runtime::Scheduler$activate$args::function': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
    'runtime::User$tokenLogin$args::token': 0,
    'runtime::User$tokenLogin$args::use_cookie': 0,
    'runtime::SecurityFields::email': 0,
    'runtime::SecurityFields::name': 0,
    'runtime::SecurityFields::first_name': 0,
    'runtime::SecurityFields::last_name': 0,
    'runtime::SecurityFields::roles': 0,
    'runtime::SecurityFields::groups': 0,
    'runtime::UserCredential::offset': 0,
    'runtime::UserCredential::pass': 0,
    'runtime::Task$is_running$args::task_id': 0,
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
    'runtime::User$login$args::credentials': 0,
    'runtime::User$login$args::use_cookie': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::OpenIDConnect::url': 0,
    'runtime::OpenIDConnect::clientId': 0,
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
    'runtime::DateTuple::day': 0,
    'runtime::DateTuple::month': 0,
    'runtime::UserGroupPolicy::group_id': 0,
    'runtime::UserGroupPolicy::type': 0,
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
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::data': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::WeeklyPeriodicity::days': 0,
    'runtime::WeeklyPeriodicity::daily': 0,
    'runtime::Scheduler$add$args::function': 0,
    'runtime::Scheduler$add$args::periodicity': 0,
    'runtime::Scheduler$add$args::options': 0,
    'runtime::SecurityEntity$set$args::entity': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::MonthlyPeriodicity::days': 0,
    'runtime::MonthlyPeriodicity::daily': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::LogDataUsage::read_bytes': 0,
    'runtime::LogDataUsage::read_hits': 0,
    'runtime::LogDataUsage::read_wasted': 0,
    'runtime::LogDataUsage::write_bytes': 0,
    'runtime::LogDataUsage::write_hits': 0,
    'runtime::LogDataUsage::cache_bytes': 0,
    'runtime::LogDataUsage::cache_hits': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::periodicity': 0,
    'runtime::PeriodicTask::options': 0,
    'runtime::PeriodicTask::is_active': 0,
    'runtime::PeriodicTask::next_execution': 0,
    'runtime::PeriodicTask::execution_count': 0,
    'runtime::Scheduler$deactivate$args::function': 0,
    'runtime::Scheduler$find$args::function': 0,
    'runtime::User$renew$args::use_cookie': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'io::Csv$generate$args::stats': 0,
    'io::FileWalker::path': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
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
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'io::HttpRequest::method': 0,
    'io::HttpRequest::url': 0,
    'io::HttpRequest::headers': 0,
    'io::HttpRequest::body': 0,
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
    'io::HttpResponse::status_code': 0,
    'io::HttpResponse::headers': 0,
    'io::HttpResponse::content': 0,
    'io::HttpResponse::error_msg': 0,
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
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::XmlReader::path': 0,
    'io::XmlReader::pos': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::SlidingWindow::values': 0,
    'util::SlidingWindow::span': 0,
    'util::SlidingWindow::sum': 0,
    'util::SlidingWindow::sumsq': 0,
    'util::SlidingWindow::field': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
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
    'util::CustomQuantizer::min': 0,
    'util::CustomQuantizer::max': 0,
    'util::CustomQuantizer::step_starts': 0,
    'util::CustomQuantizer::open': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::LogQuantizer::min': 0,
    'util::LogQuantizer::max': 0,
    'util::LogQuantizer::bins': 0,
    'util::LogQuantizer::open': 0,
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'util::LinearQuantizer::min': 0,
    'util::LinearQuantizer::max': 0,
    'util::LinearQuantizer::bins': 0,
    'util::LinearQuantizer::open': 0,
    'util::Queue::values': 0,
    'util::Queue::capacity': 0,
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
    'util::Stack::values': 0,
    'project::chart$args::nbRows': 0,
    'project::TimeZones::azores': 0,
    'project::TimeZones::utc': 0,
    'project::TimeZones::paris': 0,
    'project::TimeZones::athens': 0,
    'project::Node::id': 0,
    'project::Node::value': 0,
    'project::Node::link': 0,
    'project::Composed::a': 0,
    'project::Composed::b': 0,
    'project::VisualCrossingProvider::name': 0,
    'project::VisualCrossingProvider::solar': 0,
    'project::link_whatever$args::l': 0,
    'project::TimedComposed::time': 0,
    'project::TimedComposed::a': 0,
    'project::TimedComposed::b': 0,
    'project::Link::name': 0,
    'project::Link::next': 0,
    'project::array_of_ints$args::arr': 0,
    'project::Person::name': 0,
    'project::Person::age': 0,
    'project::Person::activated': 0,
    'project::Obj2::prop1': 0,
    'project::Obj2::prop2': 0,
    'project::Obj2::prop3': 0,
    'project::Obj2::prop4': 0,
    'project::Link$whatever$args::link': 0,
    'project::display_fn$args::fn_': 0,
    'project::display_fn_in_obj$args::o': 0,
    'project::add$args::a': 0,
    'project::add$args::b': 0,
    'project::Circle::radius': 0,
    'project::Book::name': 0,
    'project::Book::owner': 0,
    'project::Person2::id': 0,
    'project::Person2::name': 0,
    'project::Person2::age': 0,
    'project::Person2::children': 0,
    'project::MapContainer::a': 0,
    'project::MapContainer::b': 0,
    'project::MapContainer::c': 0,
    'project::MapContainer::d': 0,
    'project::MapContainer::e': 0,
    'project::SensorData::temperature': 0,
    'project::SensorData::pression': 0,
    'project::SensorData::humidity': 0,
    'project::Triangle::base': 0,
    'project::Triangle::height': 0,
    'project::Meteo::ideal_solar': 0,
    'project::Meteo::visual_crossing': 0,
    'project::ObjWithFn::fn': 0,
    'project::Country::name': 0,
    'project::Country::timezone': 0,
    'project::Country::operating_stats': 0,
    'project::Country::last_updated_stats': 0,
    'project::Country::governorates': 0,
    'project::Country::meteo': 0,
    'project::SemiRecursive::sub': 0,
    'project::SeriesObject::a': 0,
    'project::SeriesObject::b': 0,
    'project::SolarRadiation::is_enabled': 0,
    'project::SolarRadiation::radiance': 0,
    'project::SolarRadiation::instant_power': 0,
    'project::ComplexForm::shapes': 0,
    'project::ComplexForm::shape': 0,
    'project::goodFnForTestingFnCallInput$args::name': 0,
    'project::goodFnForTestingFnCallInput$args::flag': 0,
    'project::goodFnForTestingFnCallInput$args::item': 0,
    'project::goodFnForTestingFnCallInput$args::optionalFlag': 0,
    'project::anything$args::v': 0,
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
    'project::Obj::field': 0,
    'project::Obj::tuple': 0,
    'project::hello$args::name': 0,
    'project::Sensor::id': 0,
    'project::Sensor::kind': 0,
    'project::Obj1::prop1': 0,
    'project::Obj1::prop2': 0,
    'project::Obj1::prop3': 0,
    'project::task_with_params$args::name': 0,
    'project::task_with_params$args::age': 0,
    'project::Rect::width': 0,
    'project::Rect::height': 0,
    'project::TimeRecord::time': 0,
    'project::TimeRecord::value': 0,
    'project::KLine::open': 0,
    'project::KLine::close': 0,
    'project::KLine::volume': 0,
    'project::controlled_task$args::duration': 0,
    'any::AnyInput::idk': 0,
    'any::filter_something$args::f': 0,
    'any::array_any_map_any$args::arr': 0,
    'any::array_any_map_any$args::map': 0,
    'any::Filters::a': 0,
    'any::Filters::b': 0,
    'object::Filter::a': 0,
    'object::Filter::b': 0,
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
    'cities::City::country': 0,
    'cities::City::name': 0,
    'cities::City::location': 0,
    'cities::City::population': 0,
    'cities::City::type': 0,
  }

  interface $FunctionsMap {
    'core::node::resolve_all': 0,
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::Table::applyMappings': 0,
    'core::Date::from_time': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'runtime::Scheduler::deactivate': 0,
    'runtime::Scheduler::activate': 0,
    'runtime::Scheduler::find': 0,
    'runtime::Scheduler::list': 0,
    'runtime::Scheduler::add': 0,
    'runtime::Role::all': 0,
    'runtime::SecurityFields::get': 0,
    'runtime::SecurityFields::set': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::SecurityEntity::set': 0,
    'runtime::SecurityEntity::all': 0,
    'runtime::OpenIDConnect::config': 0,
    'runtime::User::setPassword': 0,
    'runtime::User::permissions': 0,
    'runtime::User::me': 0,
    'runtime::User::current': 0,
    'runtime::User::renew': 0,
    'runtime::User::logout': 0,
    'runtime::User::tokenLogin': 0,
    'runtime::User::login': 0,
    'runtime::Permission::all': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::openapi': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::info': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
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
    'project::Link::whatever': 0,
    'any::filter_something': 0,
    'any::array_any_map_any': 0,
    'heatmap::earthquakes': 0,
  }

  export import t2 = gc.core.t2;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import float = gc.core.float;
  export import t2f = gc.core.t2f;
  export import String = gc.core.String;
  export import field = gc.core.field;
  export import time = gc.core.time;
  export import SortOrder = gc.core.SortOrder;
  export import TimeZone = gc.core.TimeZone;
  export import null_ = gc.core.null_;
  export import node = gc.core.node;
  export import GeoBox = gc.core.GeoBox;
  export import DurationUnit = gc.core.DurationUnit;
  export import nodeList = gc.core.nodeList;
  export import Table = gc.core.Table;
  export import bool = gc.core.bool;
  export import geo = gc.core.geo;
  export import ErrorCode = gc.core.ErrorCode;
  export import duration = gc.core.duration;
  export import Date = gc.core.Date;
  export import Array = gc.core.Array;
  export import GeoCircle = gc.core.GeoCircle;
  export import str = gc.core.str;
  export import char = gc.core.char;
  export import GeoPoly = gc.core.GeoPoly;
  export import t3 = gc.core.t3;
  export import Error = gc.core.Error;
  export import function_ = gc.core.function_;
  export import NodeInfo = gc.core.NodeInfo;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import nodeTime = gc.core.nodeTime;
  export import t4 = gc.core.t4;
  export import TensorType = gc.core.TensorType;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import Tensor = gc.core.Tensor;
  export import type = gc.core.type;
  export import SamplingMode = gc.core.SamplingMode;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import nodeIndex = gc.core.nodeIndex;
  export import MathConstants = gc.core.MathConstants;
  export import Buffer = gc.core.Buffer;
  export import t4f = gc.core.t4f;
  export import Map = gc.core.Map;
  export import Tuple = gc.core.Tuple;
  export import t3f = gc.core.t3f;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import int = gc.core.int;
  export import nodeGeo = gc.core.nodeGeo;
  export import Scheduler = gc.runtime.Scheduler;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import DailyPeriodicity = gc.runtime.DailyPeriodicity;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import Job = gc.runtime.Job;
  export import Periodicity = gc.runtime.Periodicity;
  export import PeriodicOptions = gc.runtime.PeriodicOptions;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import UserGroup = gc.runtime.UserGroup;
  export import YearlyPeriodicity = gc.runtime.YearlyPeriodicity;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import Task = gc.runtime.Task;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import LicenseType = gc.runtime.LicenseType;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import FixedPeriodicity = gc.runtime.FixedPeriodicity;
  export import User = gc.runtime.User;
  export import DateTuple = gc.runtime.DateTuple;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import Log = gc.runtime.Log;
  export import License = gc.runtime.License;
  export import WeeklyPeriodicity = gc.runtime.WeeklyPeriodicity;
  export import Month = gc.runtime.Month;
  export import LogLevel = gc.runtime.LogLevel;
  export import Runtime = gc.runtime.Runtime;
  export import MonthlyPeriodicity = gc.runtime.MonthlyPeriodicity;
  export import LogDataUsage = gc.runtime.LogDataUsage;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import DayOfWeek = gc.runtime.DayOfWeek;
  export import System = gc.runtime.System;
  export import JsonReader = gc.io.JsonReader;
  export import File = gc.io.File;
  export import GcbReader = gc.io.GcbReader;
  export import TextWriter = gc.io.TextWriter;
  export import JsonWriter = gc.io.JsonWriter;
  export import Smtp = gc.io.Smtp;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import Email = gc.io.Email;
  export import SmtpMode = gc.io.SmtpMode;
  export import HttpMethod = gc.io.HttpMethod;
  export import FileWalker = gc.io.FileWalker;
  export import Reader = gc.io.Reader;
  export import Csv = gc.io.Csv;
  export import Writer = gc.io.Writer;
  export import CsvReader = gc.io.CsvReader;
  export import CsvSharding = gc.io.CsvSharding;
  export import Json = gc.io.Json;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import CsvWriter = gc.io.CsvWriter;
  export import GcbWriter = gc.io.GcbWriter;
  export import HttpRequest = gc.io.HttpRequest;
  export import CsvFormat = gc.io.CsvFormat;
  export import HttpResponse = gc.io.HttpResponse;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import Url = gc.io.Url;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import TextReader = gc.io.TextReader;
  export import Http = gc.io.Http;
  export import XmlReader = gc.io.XmlReader;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Crypto = gc.util.Crypto;
  export import Gaussian = gc.util.Gaussian;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import HistogramBin = gc.util.HistogramBin;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import TimeWindow = gc.util.TimeWindow;
  export import Quantizer = gc.util.Quantizer;
  export import Histogram = gc.util.Histogram;
  export import HistogramStats = gc.util.HistogramStats;
  export import Plot = gc.util.Plot;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import Random = gc.util.Random;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import Queue = gc.util.Queue;
  export import Assert = gc.util.Assert;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Stack = gc.util.Stack;
  export import TimeZones = gc.project.TimeZones;
  export import Node = gc.project.Node;
  export import Composed = gc.project.Composed;
  export import VisualCrossingProvider = gc.project.VisualCrossingProvider;
  export import Link = gc.project.Link;
  export import TrafficLight = gc.project.TrafficLight;
  export import Person = gc.project.Person;
  export import Obj2 = gc.project.Obj2;
  export import Shape = gc.project.Shape;
  export import Circle = gc.project.Circle;
  export import Book = gc.project.Book;
  export import Person2 = gc.project.Person2;
  export import MapContainer = gc.project.MapContainer;
  export import Confidence = gc.project.Confidence;
  export import SensorData = gc.project.SensorData;
  export import SensorKind = gc.project.SensorKind;
  export import RelayApp = gc.project.RelayApp;
  export import Triangle = gc.project.Triangle;
  export import Meteo = gc.project.Meteo;
  export import Country = gc.project.Country;
  export import SemiRecursive = gc.project.SemiRecursive;
  export import SolarRadiation = gc.project.SolarRadiation;
  export import ComplexForm = gc.project.ComplexForm;
  export import ComplexObject = gc.project.ComplexObject;
  export import Obj = gc.project.Obj;
  export import Sensor = gc.project.Sensor;
  export import Obj1 = gc.project.Obj1;
  export import Rect = gc.project.Rect;
  export import FooBar = gc.project.FooBar;
  export import KLine = gc.project.KLine;
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
  export import AnyInput = gc.any.AnyInput;
  export import Filters = gc.any.Filters;
  export import filter_something = gc.any.filter_something;
  export import array_any_map_any = gc.any.array_any_map_any;
  export import MagType = gc.heatmap.MagType;
  export import Net = gc.heatmap.Net;
  export import Earthquake = gc.heatmap.Earthquake;
  export import earthquakes = gc.heatmap.earthquakes;
  export import City = gc.cities.City;
  export import CapitalType = gc.cities.CapitalType;
}
