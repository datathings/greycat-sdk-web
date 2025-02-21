// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace project {
    class Rect extends gc.sdk.GCObject {
      static readonly _type = 'project::Rect';
      width: number;
      height: number;
      constructor(width: number, height: number);
      static createFrom(fields: {width: number, height: number}): Rect;
    }

    class Book extends gc.sdk.GCObject {
      static readonly _type = 'project::Book';
      name: string;
      owner: project.Person | null;
      constructor(name: string, owner?: project.Person | null);
      static createFrom(fields: {name: string, owner?: project.Person | null}): Book;
    }

    class task_with_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_with_params$args';
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): task_with_params$args;
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

    class MapContainer extends gc.sdk.GCObject {
      static readonly _type = 'project::MapContainer';
      a: globalThis.Map<number | bigint, string>;
      b: globalThis.Map<gc.core.TimeZone, string>;
      c: globalThis.Map<gc.core.SamplingMode, project.Person | null>;
      d: globalThis.Array<project.Person | null>;
      e: globalThis.Map<string, string | null>;
      constructor(a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, project.Person | null>, d: globalThis.Array<project.Person | null>, e: globalThis.Map<string, string | null>);
      static createFrom(fields: {a: globalThis.Map<number | bigint, string>, b: globalThis.Map<gc.core.TimeZone, string>, c: globalThis.Map<gc.core.SamplingMode, project.Person | null>, d: globalThis.Array<project.Person | null>, e: globalThis.Map<string, string | null>}): MapContainer;
    }

    class donut$args extends gc.sdk.GCObject {
      static readonly _type = 'project::donut$args';
    }

    class bar$args extends gc.sdk.GCObject {
      static readonly _type = 'project::bar$args';
    }

    class Obj2 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj2';
      prop1: string;
      prop2: globalThis.Array<gc.runtime.User | null>;
      prop3: globalThis.Map<string, project.Person | null>;
      prop4: any | null;
      constructor(prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, project.Person | null>, prop4?: any | null);
      static createFrom(fields: {prop1: string, prop2: globalThis.Array<gc.runtime.User | null>, prop3: globalThis.Map<string, project.Person | null>, prop4?: any | null}): Obj2;
    }

    class serie_of_obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::serie_of_obj$args';
    }

    class obj2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj2$args';
    }

    class Shape extends gc.sdk.GCObject {
      static readonly _type = 'project::Shape';
    }

    class Node extends gc.sdk.GCObject {
      static readonly _type = 'project::Node';
      id: string;
      value: any;
      link: gc.core.node<project.Node> | null;
      constructor(id: string, value: any, link?: gc.core.node<project.Node> | null);
      static createFrom(fields: {id: string, value: any, link?: gc.core.node<project.Node> | null}): Node;
    }

    class persons$args extends gc.sdk.GCObject {
      static readonly _type = 'project::persons$args';
    }

    class Link$whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::Link$whatever$args';
      link: gc.core.node<project.Link>;
      constructor(link: gc.core.node<project.Link>);
      static createFrom(fields: {link: gc.core.node<project.Link>}): Link$whatever$args;
    }

    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      "project::sensor": gc.core.nodeTime<project.SensorData>;
      "project::serie_float": gc.core.nodeTime<number>;
      "project::kline": gc.core.nodeTime<project.KLine>;
      "project::nt": gc.core.nodeTime;
      "project::person": gc.core.node<project.Person2 | null>;
      "project::huge_table": gc.core.node<gc.core.Table | null>;
      "cities::cities": gc.core.nodeGeo<gc.cities.City>;
    }

    class chart_time$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_time$args';
    }

    class resolve_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::resolve_person$args';
    }

    class mapTest$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mapTest$args';
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

    class complex_object$args extends gc.sdk.GCObject {
      static readonly _type = 'project::complex_object$args';
    }

    class tree$args extends gc.sdk.GCObject {
      static readonly _type = 'project::tree$args';
    }

    class now$args extends gc.sdk.GCObject {
      static readonly _type = 'project::now$args';
    }

    class SensorKind extends gc.sdk.GCEnum {
      static readonly _type = 'project::SensorKind';
      static readonly $fields: SensorKind[];
      key: SensorKind.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SensorKind.Field, value?: unknown);
      static Temp: SensorKind;
      static Pressure: SensorKind;
    }
    namespace SensorKind  {
      type Field = 'Temp'|'Pressure';
    }

    class anything$args extends gc.sdk.GCObject {
      static readonly _type = 'project::anything$args';
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): anything$args;
    }

    class RelayApp extends gc.sdk.GCEnum {
      static readonly _type = 'project::RelayApp';
      static readonly $fields: RelayApp[];
      key: RelayApp.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: RelayApp.Field, value?: unknown);
      static pv: RelayApp;
      static pv_shelly: RelayApp;
      static ev: RelayApp;
      static ev_shelly: RelayApp;
      static empty: RelayApp;
    }
    namespace RelayApp  {
      type Field = 'pv'|'pv_shelly'|'ev'|'ev_shelly'|'empty';
    }

    class objects_table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::objects_table$args';
    }

    class big_map$args extends gc.sdk.GCObject {
      static readonly _type = 'project::big_map$args';
    }

    class chart_colored_area$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart_colored_area$args';
    }

    class obj1$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj1$args';
    }

    class Sensor extends gc.sdk.GCObject {
      static readonly _type = 'project::Sensor';
      id: number | bigint;
      kind: project.SensorKind;
      constructor(id: number | bigint, kind: project.SensorKind);
      static createFrom(fields: {id: number | bigint, kind: project.SensorKind}): Sensor;
    }

    class sample_huge_csv$args extends gc.sdk.GCObject {
      static readonly _type = 'project::sample_huge_csv$args';
    }

    class Triangle extends gc.sdk.GCObject {
      static readonly _type = 'project::Triangle';
      base: number;
      height: number;
      constructor(base: number, height: number);
      static createFrom(fields: {base: number, height: number}): Triangle;
    }

    class heatmap$args extends gc.sdk.GCObject {
      static readonly _type = 'project::heatmap$args';
    }

    class Obj1 extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj1';
      prop1: string;
      prop2: gc.runtime.User;
      prop3: gc.runtime.RuntimeInfo;
      constructor(prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo);
      static createFrom(fields: {prop1: string, prop2: gc.runtime.User, prop3: gc.runtime.RuntimeInfo}): Obj1;
    }

    class mainTask$args extends gc.sdk.GCObject {
      static readonly _type = 'project::mainTask$args';
    }

    class TrafficLight extends gc.sdk.GCEnum {
      static readonly _type = 'project::TrafficLight';
      static readonly $fields: TrafficLight[];
      key: TrafficLight.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TrafficLight.Field, value?: unknown);
      static Green: TrafficLight;
      static Yellow: TrafficLight;
      static Red: TrafficLight;
    }
    namespace TrafficLight  {
      type Field = 'Green'|'Yellow'|'Red';
    }

    class Obj extends gc.sdk.GCObject {
      static readonly _type = 'project::Obj';
      field: any | null;
      tuple: gc.core.Tuple<any, any>;
      constructor(field: any | null, tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {field?: any | null, tuple: gc.core.Tuple<any, any>}): Obj;
    }

    class one_d_histo_example$args extends gc.sdk.GCObject {
      static readonly _type = 'project::one_d_histo_example$args';
    }

    class task_long_running$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running$args';
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      activated: boolean;
      constructor(name: string, age: number | bigint, activated: boolean);
      static createFrom(fields: {name: string, age: number | bigint, activated: boolean}): Person;
    }

    class get_person$args extends gc.sdk.GCObject {
      static readonly _type = 'project::get_person$args';
    }

    class Link extends gc.sdk.GCObject {
      static readonly _type = 'project::Link';
      name: string;
      next: project.Link | null;
      constructor(name: string, next?: project.Link | null);
      static createFrom(fields: {name: string, next?: project.Link | null}): Link;
      static whatever(link: gc.core.node<project.Link>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    }

    class init_foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::init_foo$args';
    }

    class KLine extends gc.sdk.GCObject {
      static readonly _type = 'project::KLine';
      open: number;
      close: number;
      volume: number | bigint;
      constructor(open: number, close: number, volume: number | bigint);
      static createFrom(fields: {open: number, close: number, volume: number | bigint}): KLine;
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

    class add$args extends gc.sdk.GCObject {
      static readonly _type = 'project::add$args';
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): add$args;
    }

    class foo$args extends gc.sdk.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class obj$args extends gc.sdk.GCObject {
      static readonly _type = 'project::obj$args';
    }

    class chart$args extends gc.sdk.GCObject {
      static readonly _type = 'project::chart$args';
      nbRows: number | bigint;
      constructor(nbRows: number | bigint);
      static createFrom(fields: {nbRows: number | bigint}): chart$args;
    }

    class link_whatever$args extends gc.sdk.GCObject {
      static readonly _type = 'project::link_whatever$args';
      l: gc.core.node<project.Link>;
      constructor(l: gc.core.node<project.Link>);
      static createFrom(fields: {l: gc.core.node<project.Link>}): link_whatever$args;
    }

    class task_long_running2$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_long_running2$args';
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
      constructor(string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: gc.core.geo, null_: any | null, enum_: gc.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: gc.core.nodeTime, nodeIndex: gc.core.nodeIndex, nodeList: gc.core.nodeList, nodeGeo: gc.core.nodeGeo, nested: any | null, map: globalThis.Map<string, any>, tuple: gc.core.Tuple<any, any>);
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: gc.core.geo, null_?: any | null, enum_: gc.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: gc.core.nodeTime, nodeIndex: gc.core.nodeIndex, nodeList: gc.core.nodeList, nodeGeo: gc.core.nodeGeo, nested?: any | null, map: globalThis.Map<string, any>, tuple: gc.core.Tuple<any, any>}): ComplexObject;
    }

    class SemiRecursive extends gc.sdk.GCObject {
      static readonly _type = 'project::SemiRecursive';
      sub: project.SemiRecursive | null;
      constructor(sub?: project.SemiRecursive | null);
      static createFrom(fields: {sub?: project.SemiRecursive | null}): SemiRecursive;
    }

    class FooBar extends gc.sdk.GCObject {
      static readonly _type = 'project::FooBar';
    }

    class task_without_params$args extends gc.sdk.GCObject {
      static readonly _type = 'project::task_without_params$args';
    }

    class array_of_ints$args extends gc.sdk.GCObject {
      static readonly _type = 'project::array_of_ints$args';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_ints$args;
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

    class hello$args extends gc.sdk.GCObject {
      static readonly _type = 'project::hello$args';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): hello$args;
    }

    class table$args extends gc.sdk.GCObject {
      static readonly _type = 'project::table$args';
    }

    class SensorData extends gc.sdk.GCObject {
      static readonly _type = 'project::SensorData';
      temperature: number;
      pression: number;
      humidity: number;
      constructor(temperature: number, pression: number, humidity: number);
      static createFrom(fields: {temperature: number, pression: number, humidity: number}): SensorData;
    }

    class ComplexForm extends gc.sdk.GCObject {
      static readonly _type = 'project::ComplexForm';
      shapes: globalThis.Array<project.Shape>;
      shape: project.Shape;
      constructor(shapes: globalThis.Array<project.Shape>, shape: project.Shape);
      static createFrom(fields: {shapes: globalThis.Array<project.Shape>, shape: project.Shape}): ComplexForm;
    }

    class Circle extends gc.sdk.GCObject {
      static readonly _type = 'project::Circle';
      radius: number;
      constructor(radius: number);
      static createFrom(fields: {radius: number}): Circle;
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
    function objects_table($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Person>>;
    function task_without_params($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_with_params(name: string, age: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running2($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
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
    function link_whatever(l: gc.core.node<project.Link>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function big_map($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function one_d_histo_example($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.util.Histogram>;
    function array_of_ints(arr: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function resolve_person($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function serie_of_obj($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function sample_huge_csv($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table | null>;
  }

  namespace tx {
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
      constructor(type: gc.sdk.AbiType, offset: number, key: CapitalType.Field, value?: unknown);
      static Others: CapitalType;
      static "Administrative Capital": CapitalType;
      static "Seat of Government": CapitalType;
      static Capital: CapitalType;
      static "Legislative Capital": CapitalType;
      static "Economic Capital": CapitalType;
    }
    namespace CapitalType  {
      type Field = 'Others'|'Administrative Capital'|'Seat of Government'|'Capital'|'Legislative Capital'|'Economic Capital';
    }

  }

  namespace sdk {
    interface GreyCat {
        call(method: 'project::Link::whatever', args: [gc.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::Link::whatever', args: [gc.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::Link::whatever', args: [gc.core.node<project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
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
        call(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Person>>;
        spawn(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::objects_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table<project.Person>>;
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
        call(method: 'project::link_whatever', args: [gc.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'project::link_whatever', args: [gc.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::link_whatever', args: [gc.core.node<project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        spawn(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::big_map', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
        call(method: 'project::one_d_histo_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.util.Histogram>;
        spawn(method: 'project::one_d_histo_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'project::one_d_histo_example', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.util.Histogram>;
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
        call(method: 'any::filter_something', args: [gc.any.Filters], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'any::filter_something', args: [gc.any.Filters], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'any::filter_something', args: [gc.any.Filters], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'any::array_any_map_any', args: [globalThis.Array<any | null>, globalThis.Map<any | null, any | null>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
    }
  }

  export import Date = gc.core.Date;
  export import t4 = gc.core.t4;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import TimeZone = gc.core.TimeZone;
  export import t3 = gc.core.t3;
  export import int = gc.core.int;
  export import SortOrder = gc.core.SortOrder;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import t2 = gc.core.t2;
  export import t4f = gc.core.t4f;
  export import Array = gc.core.Array;
  export import Tuple = gc.core.Tuple;
  export import Map = gc.core.Map;
  export import String = gc.core.String;
  export import field = gc.core.field;
  export import Tensor = gc.core.Tensor;
  export import NodeInfo = gc.core.NodeInfo;
  export import char = gc.core.char;
  export import t3f = gc.core.t3f;
  export import MathConstants = gc.core.MathConstants;
  export import type = gc.core.type;
  export import null_ = gc.core.null_;
  export import nodeIndex = gc.core.nodeIndex;
  export import Table = gc.core.Table;
  export import bool = gc.core.bool;
  export import Buffer = gc.core.Buffer;
  export import GeoBox = gc.core.GeoBox;
  export import DurationUnit = gc.core.DurationUnit;
  export import nodeTime = gc.core.nodeTime;
  export import nodeList = gc.core.nodeList;
  export import GeoCircle = gc.core.GeoCircle;
  export import GeoPoly = gc.core.GeoPoly;
  export import Error = gc.core.Error;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import duration = gc.core.duration;
  export import geo = gc.core.geo;
  export import float = gc.core.float;
  export import function_ = gc.core.function_;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import time = gc.core.time;
  export import t2f = gc.core.t2f;
  export import TensorType = gc.core.TensorType;
  export import SamplingMode = gc.core.SamplingMode;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import node = gc.core.node;
  export import str = gc.core.str;
  export import nodeGeo = gc.core.nodeGeo;
  export import ErrorCode = gc.core.ErrorCode;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import Task = gc.runtime.Task;
  export import SecurityFields = gc.runtime.SecurityFields;
  export import CallPerf = gc.runtime.CallPerf;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import User = gc.runtime.User;
  export import UserGroupPolicy = gc.runtime.UserGroupPolicy;
  export import OpenIDConnect = gc.runtime.OpenIDConnect;
  export import System = gc.runtime.System;
  export import License = gc.runtime.License;
  export import StoreStat = gc.runtime.StoreStat;
  export import Log = gc.runtime.Log;
  export import SecurityEntity = gc.runtime.SecurityEntity;
  export import UserGroupPolicyType = gc.runtime.UserGroupPolicyType;
  export import Runtime = gc.runtime.Runtime;
  export import LogLevel = gc.runtime.LogLevel;
  export import UserGroup = gc.runtime.UserGroup;
  export import LicenseType = gc.runtime.LicenseType;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import Job = gc.runtime.Job;
  export import SecurityPolicy = gc.runtime.SecurityPolicy;
  export import JsonReader = gc.io.JsonReader;
  export import HttpHeader = gc.io.HttpHeader;
  export import Json = gc.io.Json;
  export import SmtpMode = gc.io.SmtpMode;
  export import CsvSharding = gc.io.CsvSharding;
  export import GcbReader = gc.io.GcbReader;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import CsvAnalysis = gc.io.CsvAnalysis;
  export import CsvReader = gc.io.CsvReader;
  export import Reader = gc.io.Reader;
  export import TextEncoder = gc.io.TextEncoder;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import GcbWriter = gc.io.GcbWriter;
  export import TextWriter = gc.io.TextWriter;
  export import FileWalker = gc.io.FileWalker;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import Url = gc.io.Url;
  export import Email = gc.io.Email;
  export import Smtp = gc.io.Smtp;
  export import File = gc.io.File;
  export import CsvWriter = gc.io.CsvWriter;
  export import Writer = gc.io.Writer;
  export import JsonWriter = gc.io.JsonWriter;
  export import TextReader = gc.io.TextReader;
  export import CsvFormat = gc.io.CsvFormat;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import Http = gc.io.Http;
  export import CsvValidateResult = gc.io.CsvValidateResult;
  export import Crypto = gc.util.Crypto;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import Assert = gc.util.Assert;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Histogram = gc.util.Histogram;
  export import Quantizer = gc.util.Quantizer;
  export import HistogramStats = gc.util.HistogramStats;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import Random = gc.util.Random;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Stack = gc.util.Stack;
  export import TimeWindow = gc.util.TimeWindow;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import Plot = gc.util.Plot;
  export import Queue = gc.util.Queue;
  export import Gaussian = gc.util.Gaussian;
  export import Rect = gc.project.Rect;
  export import Book = gc.project.Book;
  export import Confidence = gc.project.Confidence;
  export import MapContainer = gc.project.MapContainer;
  export import Obj2 = gc.project.Obj2;
  export import Shape = gc.project.Shape;
  export import Node = gc.project.Node;
  export import SensorKind = gc.project.SensorKind;
  export import RelayApp = gc.project.RelayApp;
  export import Sensor = gc.project.Sensor;
  export import Triangle = gc.project.Triangle;
  export import Obj1 = gc.project.Obj1;
  export import TrafficLight = gc.project.TrafficLight;
  export import Obj = gc.project.Obj;
  export import Person = gc.project.Person;
  export import Link = gc.project.Link;
  export import KLine = gc.project.KLine;
  export import Person2 = gc.project.Person2;
  export import ComplexObject = gc.project.ComplexObject;
  export import SemiRecursive = gc.project.SemiRecursive;
  export import FooBar = gc.project.FooBar;
  export import TimeZones = gc.project.TimeZones;
  export import SensorData = gc.project.SensorData;
  export import ComplexForm = gc.project.ComplexForm;
  export import Circle = gc.project.Circle;
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
  export import one_d_histo_example = gc.project.one_d_histo_example;
  export import array_of_ints = gc.project.array_of_ints;
  export import resolve_person = gc.project.resolve_person;
  export import serie_of_obj = gc.project.serie_of_obj;
  export import sample_huge_csv = gc.project.sample_huge_csv;
  export import AnyInput = gc.any.AnyInput;
  export import Filters = gc.any.Filters;
  export import filter_something = gc.any.filter_something;
  export import array_any_map_any = gc.any.array_any_map_any;
  export import City = gc.cities.City;
  export import CapitalType = gc.cities.CapitalType;
}
