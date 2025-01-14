// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace greycat {
  namespace project {
    class anything$args extends greycat.GCObject {
      static readonly _type = 'project::anything$args';
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): anything$args;
    }

    class SensorKind extends greycat.GCEnum {
      static readonly _type = 'project::SensorKind';
      static readonly $fields: SensorKind[];
      key: SensorKind.Field;
      constructor(type: greycat.AbiType, offset: number, key: SensorKind.Field, value?: unknown);
      static Temp: SensorKind;
      static Pressure: SensorKind;
    }
    namespace SensorKind  {
      type Field = 'Temp'|'Pressure';
    }

    class Node extends greycat.GCObject {
      static readonly _type = 'project::Node';
      id: string;
      value: any;
      link: greycat.core.node<project.Node> | null;
      constructor(id: string, value: any, link?: greycat.core.node<project.Node> | null);
      static createFrom(fields: {id: string, value: any, link?: greycat.core.node<project.Node> | null}): Node;
    }

    class chart_colored_area$args extends greycat.GCObject {
      static readonly _type = 'project::chart_colored_area$args';
    }

    class ComplexObject extends greycat.GCObject {
      static readonly _type = 'project::ComplexObject';
      string: string;
      int: number | bigint;
      float: number;
      bool: boolean;
      char: string;
      geo: greycat.core.geo;
      null: any | null;
      enum: greycat.core.TimeZone;
      array: globalThis.Array<any | null>;
      nodeTime: greycat.core.nodeTime;
      nodeIndex: greycat.core.nodeIndex;
      nodeList: greycat.core.nodeList;
      nodeGeo: greycat.core.nodeGeo;
      nested: any | null;
      map: globalThis.Map<string, any>;
      tuple: greycat.core.Tuple<any, any>;
      constructor(string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: greycat.core.geo, null_: any | null, enum_: greycat.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: greycat.core.nodeTime, nodeIndex: greycat.core.nodeIndex, nodeList: greycat.core.nodeList, nodeGeo: greycat.core.nodeGeo, nested: any | null, map: globalThis.Map<string, any>, tuple: greycat.core.Tuple<any, any>);
      static createFrom(fields: {string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: greycat.core.geo, null_?: any | null, enum_: greycat.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: greycat.core.nodeTime, nodeIndex: greycat.core.nodeIndex, nodeList: greycat.core.nodeList, nodeGeo: greycat.core.nodeGeo, nested?: any | null, map: globalThis.Map<string, any>, tuple: greycat.core.Tuple<any, any>}): ComplexObject;
    }

    class task_without_params$args extends greycat.GCObject {
      static readonly _type = 'project::task_without_params$args';
    }

    class now$args extends greycat.GCObject {
      static readonly _type = 'project::now$args';
    }

    class Link$whatever$args extends greycat.GCObject {
      static readonly _type = 'project::Link$whatever$args';
      link: greycat.core.node<project.Link>;
      constructor(link: greycat.core.node<project.Link>);
      static createFrom(fields: {link: greycat.core.node<project.Link>}): Link$whatever$args;
    }

    class array_of_ints$args extends greycat.GCObject {
      static readonly _type = 'project::array_of_ints$args';
      arr: globalThis.Array<number | bigint>;
      constructor(arr: globalThis.Array<number | bigint>);
      static createFrom(fields: {arr: globalThis.Array<number | bigint>}): array_of_ints$args;
    }

    class persons$args extends greycat.GCObject {
      static readonly _type = 'project::persons$args';
    }

    class obj1$args extends greycat.GCObject {
      static readonly _type = 'project::obj1$args';
    }

    class Obj2 extends greycat.GCObject {
      static readonly _type = 'project::Obj2';
      prop1: string;
      prop2: globalThis.Array<greycat.runtime.User | null>;
      prop3: globalThis.Map<string, project.Person | null>;
      prop4: any | null;
      constructor(prop1: string, prop2: globalThis.Array<greycat.runtime.User | null>, prop3: globalThis.Map<string, project.Person | null>, prop4?: any | null);
      static createFrom(fields: {prop1: string, prop2: globalThis.Array<greycat.runtime.User | null>, prop3: globalThis.Map<string, project.Person | null>, prop4?: any | null}): Obj2;
    }

    class FooBar extends greycat.GCObject {
      static readonly _type = 'project::FooBar';
    }

    class obj$args extends greycat.GCObject {
      static readonly _type = 'project::obj$args';
    }

    class table$args extends greycat.GCObject {
      static readonly _type = 'project::table$args';
    }

    class chart_time$args extends greycat.GCObject {
      static readonly _type = 'project::chart_time$args';
    }

    class task_long_running$args extends greycat.GCObject {
      static readonly _type = 'project::task_long_running$args';
    }

    class donut$args extends greycat.GCObject {
      static readonly _type = 'project::donut$args';
    }

    class Sensor extends greycat.GCObject {
      static readonly _type = 'project::Sensor';
      id: number | bigint;
      kind: project.SensorKind;
      constructor(id: number | bigint, kind: project.SensorKind);
      static createFrom(fields: {id: number | bigint, kind: project.SensorKind}): Sensor;
    }

    class Triangle extends greycat.GCObject {
      static readonly _type = 'project::Triangle';
      base: number;
      height: number;
      constructor(base: number, height: number);
      static createFrom(fields: {base: number, height: number}): Triangle;
    }

    class Confidence extends greycat.GCEnum {
      static readonly _type = 'project::Confidence';
      static readonly $fields: Confidence[];
      key: Confidence.Field;
      constructor(type: greycat.AbiType, offset: number, key: Confidence.Field, value?: unknown);
      static High: Confidence;
      static Medium: Confidence;
      static Low: Confidence;
    }
    namespace Confidence  {
      type Field = 'High'|'Medium'|'Low';
    }

    class mainTask$args extends greycat.GCObject {
      static readonly _type = 'project::mainTask$args';
    }

    class resolve_person$args extends greycat.GCObject {
      static readonly _type = 'project::resolve_person$args';
    }

    class bar$args extends greycat.GCObject {
      static readonly _type = 'project::bar$args';
    }

    class Obj1 extends greycat.GCObject {
      static readonly _type = 'project::Obj1';
      prop1: string;
      prop2: greycat.runtime.User;
      prop3: greycat.runtime.RuntimeInfo;
      constructor(prop1: string, prop2: greycat.runtime.User, prop3: greycat.runtime.RuntimeInfo);
      static createFrom(fields: {prop1: string, prop2: greycat.runtime.User, prop3: greycat.runtime.RuntimeInfo}): Obj1;
    }

    class add$args extends greycat.GCObject {
      static readonly _type = 'project::add$args';
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): add$args;
    }

    class link_whatever$args extends greycat.GCObject {
      static readonly _type = 'project::link_whatever$args';
      l: greycat.core.node<project.Link>;
      constructor(l: greycat.core.node<project.Link>);
      static createFrom(fields: {l: greycat.core.node<project.Link>}): link_whatever$args;
    }

    class hello$args extends greycat.GCObject {
      static readonly _type = 'project::hello$args';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): hello$args;
    }

    class serie_of_obj$args extends greycat.GCObject {
      static readonly _type = 'project::serie_of_obj$args';
    }

    class tree$args extends greycat.GCObject {
      static readonly _type = 'project::tree$args';
    }

    class Person extends greycat.GCObject {
      static readonly _type = 'project::Person';
      name: string;
      age: number | bigint;
      activated: boolean;
      constructor(name: string, age: number | bigint, activated: boolean);
      static createFrom(fields: {name: string, age: number | bigint, activated: boolean}): Person;
    }

    class Book extends greycat.GCObject {
      static readonly _type = 'project::Book';
      name: string;
      owner: project.Person | null;
      constructor(name: string, owner?: project.Person | null);
      static createFrom(fields: {name: string, owner?: project.Person | null}): Book;
    }

    class obj2$args extends greycat.GCObject {
      static readonly _type = 'project::obj2$args';
    }

    class SemiRecursive extends greycat.GCObject {
      static readonly _type = 'project::SemiRecursive';
      sub: project.SemiRecursive | null;
      constructor(sub?: project.SemiRecursive | null);
      static createFrom(fields: {sub?: project.SemiRecursive | null}): SemiRecursive;
    }

    class complex_object$args extends greycat.GCObject {
      static readonly _type = 'project::complex_object$args';
    }

    class KLine extends greycat.GCObject {
      static readonly _type = 'project::KLine';
      open: number;
      close: number;
      volume: number | bigint;
      constructor(open: number, close: number, volume: number | bigint);
      static createFrom(fields: {open: number, close: number, volume: number | bigint}): KLine;
    }

    class MapContainer extends greycat.GCObject {
      static readonly _type = 'project::MapContainer';
      a: globalThis.Map<number | bigint, string>;
      b: globalThis.Map<greycat.core.TimeZone, string>;
      c: globalThis.Map<greycat.core.SamplingMode, project.Person | null>;
      d: globalThis.Array<project.Person | null>;
      e: globalThis.Map<string, string | null>;
      constructor(a: globalThis.Map<number | bigint, string>, b: globalThis.Map<greycat.core.TimeZone, string>, c: globalThis.Map<greycat.core.SamplingMode, project.Person | null>, d: globalThis.Array<project.Person | null>, e: globalThis.Map<string, string | null>);
      static createFrom(fields: {a: globalThis.Map<number | bigint, string>, b: globalThis.Map<greycat.core.TimeZone, string>, c: globalThis.Map<greycat.core.SamplingMode, project.Person | null>, d: globalThis.Array<project.Person | null>, e: globalThis.Map<string, string | null>}): MapContainer;
    }

    class heatmap$args extends greycat.GCObject {
      static readonly _type = 'project::heatmap$args';
    }

    class TimeZones extends greycat.GCObject {
      static readonly _type = 'project::TimeZones';
      azores: greycat.core.Date;
      utc: greycat.core.Date;
      paris: greycat.core.Date;
      athens: greycat.core.Date;
      constructor(azores: greycat.core.Date, utc: greycat.core.Date, paris: greycat.core.Date, athens: greycat.core.Date);
      static createFrom(fields: {azores: greycat.core.Date, utc: greycat.core.Date, paris: greycat.core.Date, athens: greycat.core.Date}): TimeZones;
    }

    class Person2 extends greycat.GCObject {
      static readonly _type = 'project::Person2';
      id: number | bigint;
      name: string;
      age: number | bigint;
      children: number | bigint;
      constructor(id: number | bigint, name: string, age: number | bigint, children: number | bigint);
      static createFrom(fields: {id: number | bigint, name: string, age: number | bigint, children: number | bigint}): Person2;
    }

    class Rect extends greycat.GCObject {
      static readonly _type = 'project::Rect';
      width: number;
      height: number;
      constructor(width: number, height: number);
      static createFrom(fields: {width: number, height: number}): Rect;
    }

    class TrafficLight extends greycat.GCEnum {
      static readonly _type = 'project::TrafficLight';
      static readonly $fields: TrafficLight[];
      key: TrafficLight.Field;
      constructor(type: greycat.AbiType, offset: number, key: TrafficLight.Field, value?: unknown);
      static Green: TrafficLight;
      static Yellow: TrafficLight;
      static Red: TrafficLight;
    }
    namespace TrafficLight  {
      type Field = 'Green'|'Yellow'|'Red';
    }

    class task_with_params$args extends greycat.GCObject {
      static readonly _type = 'project::task_with_params$args';
      name: string;
      age: number | bigint;
      constructor(name: string, age: number | bigint);
      static createFrom(fields: {name: string, age: number | bigint}): task_with_params$args;
    }

    class init_foo$args extends greycat.GCObject {
      static readonly _type = 'project::init_foo$args';
    }

    class goodFnForTestingFnCallInput$args extends greycat.GCObject {
      static readonly _type = 'project::goodFnForTestingFnCallInput$args';
      name: string;
      flag: boolean;
      item: greycat.core.DurationUnit;
      optionalFlag: boolean | null;
      constructor(name: string, flag: boolean, item: greycat.core.DurationUnit, optionalFlag?: boolean | null);
      static createFrom(fields: {name: string, flag: boolean, item: greycat.core.DurationUnit, optionalFlag?: boolean | null}): goodFnForTestingFnCallInput$args;
    }

    class Root extends greycat.GCObject {
      static readonly _type = 'project::Root';
      "project::sensor": greycat.core.nodeTime<project.SensorData>;
      "project::serie_float": greycat.core.nodeTime<number>;
      "project::kline": greycat.core.nodeTime<project.KLine>;
      "project::nt": greycat.core.nodeTime;
      "project::person": greycat.core.node<project.Person2 | null>;
    }

    class chart$args extends greycat.GCObject {
      static readonly _type = 'project::chart$args';
      nbRows: number | bigint;
      constructor(nbRows: number | bigint);
      static createFrom(fields: {nbRows: number | bigint}): chart$args;
    }

    class get_person$args extends greycat.GCObject {
      static readonly _type = 'project::get_person$args';
    }

    class Shape extends greycat.GCObject {
      static readonly _type = 'project::Shape';
    }

    class ComplexForm extends greycat.GCObject {
      static readonly _type = 'project::ComplexForm';
      shapes: globalThis.Array<project.Shape>;
      shape: project.Shape;
      constructor(shapes: globalThis.Array<project.Shape>, shape: project.Shape);
      static createFrom(fields: {shapes: globalThis.Array<project.Shape>, shape: project.Shape}): ComplexForm;
    }

    class RelayApp extends greycat.GCEnum {
      static readonly _type = 'project::RelayApp';
      static readonly $fields: RelayApp[];
      key: RelayApp.Field;
      constructor(type: greycat.AbiType, offset: number, key: RelayApp.Field, value?: unknown);
      static pv: RelayApp;
      static pv_shelly: RelayApp;
      static ev: RelayApp;
      static ev_shelly: RelayApp;
      static empty: RelayApp;
    }
    namespace RelayApp  {
      type Field = 'pv'|'pv_shelly'|'ev'|'ev_shelly'|'empty';
    }

    class Obj extends greycat.GCObject {
      static readonly _type = 'project::Obj';
      field: any | null;
      tuple: greycat.core.Tuple<any, any>;
      constructor(field: any | null, tuple: greycat.core.Tuple<any, any>);
      static createFrom(fields: {field?: any | null, tuple: greycat.core.Tuple<any, any>}): Obj;
    }

    class mapTest$args extends greycat.GCObject {
      static readonly _type = 'project::mapTest$args';
    }

    class foo$args extends greycat.GCObject {
      static readonly _type = 'project::foo$args';
    }

    class one_d_histo_example$args extends greycat.GCObject {
      static readonly _type = 'project::one_d_histo_example$args';
    }

    class big_map$args extends greycat.GCObject {
      static readonly _type = 'project::big_map$args';
    }

    class Circle extends greycat.GCObject {
      static readonly _type = 'project::Circle';
      radius: number;
      constructor(radius: number);
      static createFrom(fields: {radius: number}): Circle;
    }

    class Link extends greycat.GCObject {
      static readonly _type = 'project::Link';
      name: string;
      next: project.Link | null;
      constructor(name: string, next?: project.Link | null);
      static createFrom(fields: {name: string, next?: project.Link | null}): Link;
      static whatever(link: greycat.core.node<project.Link>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    }

    class SensorData extends greycat.GCObject {
      static readonly _type = 'project::SensorData';
      temperature: number;
      pression: number;
      humidity: number;
      constructor(temperature: number, pression: number, humidity: number);
      static createFrom(fields: {temperature: number, pression: number, humidity: number}): SensorData;
    }

    class objects_table$args extends greycat.GCObject {
      static readonly _type = 'project::objects_table$args';
    }

    class task_long_running2$args extends greycat.GCObject {
      static readonly _type = 'project::task_long_running2$args';
    }

    function init_foo($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function persons($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function chart(nbRows: number | bigint, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function chart_time($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function chart_colored_area($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function donut($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function heatmap($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function hello(name: string, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    function table($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
    function objects_table($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Person>>;
    function task_without_params($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_with_params(name: string, age: number | bigint, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function task_long_running2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function mainTask($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function foo($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function bar($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function complex_object($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj1($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function obj2($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function get_person($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function tree($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function add(a: number | bigint, b: number | bigint, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint>;
    function anything(v?: any | null, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function mapTest($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function goodFnForTestingFnCallInput(name: string, flag: boolean, item: greycat.core.DurationUnit, optionalFlag?: boolean | null, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function now($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function link_whatever(l: greycat.core.node<project.Link>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function big_map($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
    function one_d_histo_example($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<greycat.util.Histogram>;
    function array_of_ints(arr: globalThis.Array<number | bigint>, $g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    function resolve_person($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    function serie_of_obj($g?: greycat.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
  }

  namespace tx {
  }

  namespace any {
    class AnyInput extends greycat.GCObject {
      static readonly _type = 'any::AnyInput';
      idk: any;
      constructor(idk: any);
      static createFrom(fields: {idk: any}): AnyInput;
    }

  }

}
declare namespace greycat {
  interface GreyCat {
      call(method: 'project::Link::whatever', args: [greycat.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::Link::whatever', args: [greycat.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::Link::whatever', args: [greycat.core.node<project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::init_foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::init_foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::init_foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::persons', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::persons', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::persons', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::chart', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::chart', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::chart', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::chart_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::chart_time', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::chart_time', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::chart_colored_area', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::chart_colored_area', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::chart_colored_area', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::donut', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::donut', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::donut', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::heatmap', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::heatmap', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::heatmap', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::hello', args: [string], signal?: globalThis.AbortSignal): Promise<string>;
      spawn(method: 'project::hello', args: [string], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::hello', args: [string], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
      call(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      spawn(method: 'project::table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table>;
      call(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Person>>;
      spawn(method: 'project::objects_table', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::objects_table', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.core.Table<project.Person>>;
      call(method: 'project::task_without_params', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_without_params', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::task_without_params', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::task_long_running', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_long_running', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::task_long_running', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::task_long_running2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_long_running2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::task_long_running2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::mainTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::mainTask', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::mainTask', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::foo', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::bar', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::bar', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::bar', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::obj', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::complex_object', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::complex_object', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::complex_object', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::obj1', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::obj1', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::obj1', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::obj2', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::obj2', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::obj2', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::get_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::get_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::get_person', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::tree', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::tree', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::tree', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::add', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<number | bigint>;
      spawn(method: 'project::add', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::add', args: [number | bigint, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number | bigint>;
      call(method: 'project::anything', args: [any | null], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::anything', args: [any | null], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::anything', args: [any | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::mapTest', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::mapTest', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::mapTest', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, greycat.core.DurationUnit, boolean | null], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, greycat.core.DurationUnit, boolean | null], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, greycat.core.DurationUnit, boolean | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::now', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::now', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::now', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::link_whatever', args: [greycat.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::link_whatever', args: [greycat.core.node<project.Link>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::link_whatever', args: [greycat.core.node<project.Link>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      spawn(method: 'project::big_map', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::big_map', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      call(method: 'project::one_d_histo_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.util.Histogram>;
      spawn(method: 'project::one_d_histo_example', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::one_d_histo_example', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<greycat.util.Histogram>;
      call(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
      spawn(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::array_of_ints', args: [globalThis.Array<number | bigint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
      call(method: 'project::resolve_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::resolve_person', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::resolve_person', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
      call(method: 'project::serie_of_obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
      spawn(method: 'project::serie_of_obj', args?: undefined, signal?: globalThis.AbortSignal): Promise<greycat.runtime.Task>;
      spawnAwait(method: 'project::serie_of_obj', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
  }
}
