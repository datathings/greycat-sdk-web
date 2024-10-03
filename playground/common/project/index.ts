// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
import * as $greycat from '@greycat/web';

export namespace project {
  export class Obj1 extends $greycat.GCObject {
    static readonly _type = 'project::Obj1';

    prop1!: string;
    prop2!: $greycat.std.runtime.User;
    prop3!: $greycat.std.runtime.RuntimeInfo;

    static createFrom({prop1, prop2, prop3}: {prop1: string, prop2: $greycat.std.runtime.User, prop3: $greycat.std.runtime.RuntimeInfo}, $g: $greycat.GreyCat = $greycat.$.default): Obj1 {
      return new Obj1($g.abi.libs_by_name.get(projectlib.name)!.mapped[0], prop1, prop2, prop3);
    }
    static create(prop1: string, prop2: $greycat.std.runtime.User, prop3: $greycat.std.runtime.RuntimeInfo, $g: $greycat.GreyCat = $greycat.$.default): Obj1 {
      return new Obj1($g.abi.libs_by_name.get(projectlib.name)!.mapped[0], prop1, prop2, prop3);
    }
  }

  export class Sensor extends $greycat.GCObject {
    static readonly _type = 'project::Sensor';

    id!: number | bigint;
    kind!: project.SensorKind;

    static createFrom({id, kind}: {id: number | bigint, kind: project.SensorKind}, $g: $greycat.GreyCat = $greycat.$.default): Sensor {
      return new Sensor($g.abi.libs_by_name.get(projectlib.name)!.mapped[1], id, kind);
    }
    static create(id: number | bigint, kind: project.SensorKind, $g: $greycat.GreyCat = $greycat.$.default): Sensor {
      return new Sensor($g.abi.libs_by_name.get(projectlib.name)!.mapped[1], id, kind);
    }
  }

  export class Obj2 extends $greycat.GCObject {
    static readonly _type = 'project::Obj2';

    prop1!: string;
    prop2!: globalThis.Array<$greycat.std.runtime.User>;
    prop3!: globalThis.Map<any, any | null>;
    prop4!: any | null;

    static createFrom({prop1, prop2, prop3, prop4}: {prop1: string, prop2: globalThis.Array<$greycat.std.runtime.User>, prop3: globalThis.Map<any, any | null>, prop4: any | null}, $g: $greycat.GreyCat = $greycat.$.default): Obj2 {
      return new Obj2($g.abi.libs_by_name.get(projectlib.name)!.mapped[2], prop1, prop2, prop3, prop4);
    }
    static create(prop1: string, prop2: globalThis.Array<$greycat.std.runtime.User>, prop3: globalThis.Map<any, any | null>, prop4: any | null, $g: $greycat.GreyCat = $greycat.$.default): Obj2 {
      return new Obj2($g.abi.libs_by_name.get(projectlib.name)!.mapped[2], prop1, prop2, prop3, prop4);
    }
  }

  export class Root extends $greycat.GCObject {
    static readonly _type = 'project::Root';


  }

  export class Person2 extends $greycat.GCObject {
    static readonly _type = 'project::Person2';

    name!: string;
    age!: number | bigint;
    children!: number | bigint;

    static createFrom({name, age, children}: {name: string, age: number | bigint, children: number | bigint}, $g: $greycat.GreyCat = $greycat.$.default): Person2 {
      return new Person2($g.abi.libs_by_name.get(projectlib.name)!.mapped[4], name, age, children);
    }
    static create(name: string, age: number | bigint, children: number | bigint, $g: $greycat.GreyCat = $greycat.$.default): Person2 {
      return new Person2($g.abi.libs_by_name.get(projectlib.name)!.mapped[4], name, age, children);
    }
  }

  export class TrafficLight extends $greycat.GCEnum {
    static readonly _type = 'project::TrafficLight';

    constructor(type: $greycat.AbiType, offset: number, public override key: TrafficLight.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static Green($g: $greycat.GreyCat = $greycat.$.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['Green'];
    }
    static Yellow($g: $greycat.GreyCat = $greycat.$.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['Yellow'];
    }
    static Red($g: $greycat.GreyCat = $greycat.$.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['Red'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): TrafficLight[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.enum_values as TrafficLight[];
    }
  }

  export namespace TrafficLight  {
    export type Field = 'Green'|'Yellow'|'Red';
  }
  export class ComplexObject extends $greycat.GCObject {
    static readonly _type = 'project::ComplexObject';

    string!: string;
    int!: number | bigint;
    float!: number;
    bool!: boolean;
    char!: string;
    geo!: $greycat.std.core.geo;
    null!: any | null;
    enum!: $greycat.std.core.TimeZone;
    array!: globalThis.Array<any | null>;
    nodeTime!: $greycat.std.core.nodeTime;
    nodeIndex!: $greycat.std.core.nodeIndex;
    nodeList!: $greycat.std.core.nodeList;
    nodeGeo!: $greycat.std.core.nodeGeo;
    nested!: any | null;
    nodeNested!: $greycat.std.core.node<project.ComplexObject> | null;
    map!: globalThis.Map<string, any>;
    tuple!: $greycat.std.core.Tuple<any, any>;

    static createFrom({string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map, tuple}: {string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: $greycat.std.core.geo, null_: any | null, enum_: $greycat.std.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: $greycat.std.core.nodeTime, nodeIndex: $greycat.std.core.nodeIndex, nodeList: $greycat.std.core.nodeList, nodeGeo: $greycat.std.core.nodeGeo, nested: any | null, nodeNested: $greycat.std.core.node<project.ComplexObject> | null, map: globalThis.Map<string, any>, tuple: $greycat.std.core.Tuple<any, any>}, $g: $greycat.GreyCat = $greycat.$.default): ComplexObject {
      return new ComplexObject($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map, tuple);
    }
    static create(string: string, int: number | bigint, float: number, bool: boolean, char: string, geo: $greycat.std.core.geo, null_: any | null, enum_: $greycat.std.core.TimeZone, array: globalThis.Array<any | null>, nodeTime: $greycat.std.core.nodeTime, nodeIndex: $greycat.std.core.nodeIndex, nodeList: $greycat.std.core.nodeList, nodeGeo: $greycat.std.core.nodeGeo, nested: any | null, nodeNested: $greycat.std.core.node<project.ComplexObject> | null, map: globalThis.Map<string, any>, tuple: $greycat.std.core.Tuple<any, any>, $g: $greycat.GreyCat = $greycat.$.default): ComplexObject {
      return new ComplexObject($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map, tuple);
    }
  }

  export class Link extends $greycat.GCObject {
    static readonly _type = 'project::Link';

    name!: string;
    next!: project.Link | null;

    static whatever(link: $greycat.std.core.node<project.Link>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
      return $g.call('project::Link::whatever', [link], $signal);
    };
    static createFrom({name, next}: {name: string, next: project.Link | null}, $g: $greycat.GreyCat = $greycat.$.default): Link {
      return new Link($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], name, next);
    }
    static create(name: string, next: project.Link | null, $g: $greycat.GreyCat = $greycat.$.default): Link {
      return new Link($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], name, next);
    }
  }

  export class SemiRecursive extends $greycat.GCObject {
    static readonly _type = 'project::SemiRecursive';

    sub!: project.SemiRecursive | null;

    static createFrom({sub}: {sub: project.SemiRecursive | null}, $g: $greycat.GreyCat = $greycat.$.default): SemiRecursive {
      return new SemiRecursive($g.abi.libs_by_name.get(projectlib.name)!.mapped[8], sub);
    }
    static create(sub: project.SemiRecursive | null, $g: $greycat.GreyCat = $greycat.$.default): SemiRecursive {
      return new SemiRecursive($g.abi.libs_by_name.get(projectlib.name)!.mapped[8], sub);
    }
  }

  export class FooBar extends $greycat.GCObject {
    static readonly _type = 'project::FooBar';


    static createFrom($g: $greycat.GreyCat = $greycat.$.default): FooBar {
      return new FooBar($g.abi.libs_by_name.get(projectlib.name)!.mapped[9]);
    }
    static create($g: $greycat.GreyCat = $greycat.$.default): FooBar {
      return new FooBar($g.abi.libs_by_name.get(projectlib.name)!.mapped[9]);
    }
  }

  export class TimeZones extends $greycat.GCObject {
    static readonly _type = 'project::TimeZones';

    azores!: $greycat.std.core.Date;
    utc!: $greycat.std.core.Date;
    paris!: $greycat.std.core.Date;
    athens!: $greycat.std.core.Date;

    static createFrom({azores, utc, paris, athens}: {azores: $greycat.std.core.Date, utc: $greycat.std.core.Date, paris: $greycat.std.core.Date, athens: $greycat.std.core.Date}, $g: $greycat.GreyCat = $greycat.$.default): TimeZones {
      return new TimeZones($g.abi.libs_by_name.get(projectlib.name)!.mapped[10], azores, utc, paris, athens);
    }
    static create(azores: $greycat.std.core.Date, utc: $greycat.std.core.Date, paris: $greycat.std.core.Date, athens: $greycat.std.core.Date, $g: $greycat.GreyCat = $greycat.$.default): TimeZones {
      return new TimeZones($g.abi.libs_by_name.get(projectlib.name)!.mapped[10], azores, utc, paris, athens);
    }
  }

  export class Confidence extends $greycat.GCEnum {
    static readonly _type = 'project::Confidence';

    constructor(type: $greycat.AbiType, offset: number, public override key: Confidence.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static High($g: $greycat.GreyCat = $greycat.$.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[11];
      return t.static_values['High'];
    }
    static Medium($g: $greycat.GreyCat = $greycat.$.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[11];
      return t.static_values['Medium'];
    }
    static Low($g: $greycat.GreyCat = $greycat.$.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[11];
      return t.static_values['Low'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): Confidence[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[11];
      return t.enum_values as Confidence[];
    }
  }

  export namespace Confidence  {
    export type Field = 'High'|'Medium'|'Low';
  }
  export class SensorKind extends $greycat.GCEnum {
    static readonly _type = 'project::SensorKind';

    constructor(type: $greycat.AbiType, offset: number, public override key: SensorKind.Field, value: $greycat.Value) {
      super(type, offset, key, value);
    }

    static Temp($g: $greycat.GreyCat = $greycat.$.default): SensorKind {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[12];
      return t.static_values['Temp'];
    }
    static Pressure($g: $greycat.GreyCat = $greycat.$.default): SensorKind {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[12];
      return t.static_values['Pressure'];
    }
    static $fields($g: $greycat.GreyCat = $greycat.$.default): SensorKind[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[12];
      return t.enum_values as SensorKind[];
    }
  }

  export namespace SensorKind  {
    export type Field = 'Temp'|'Pressure';
  }
  export function persons($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::persons', undefined, $signal);
  };
  export function chart(nbRows: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::chart', [nbRows], $signal);
  };
  export function chart_time($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<$greycat.std.core.Table> {
    return $g.call('project::chart_time', undefined, $signal);
  };
  export function chart_colored_area($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<$greycat.std.core.Table> {
    return $g.call('project::chart_colored_area', undefined, $signal);
  };
  export function donut($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<$greycat.std.core.Table> {
    return $g.call('project::donut', undefined, $signal);
  };
  export function heatmap($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::heatmap', undefined, $signal);
  };
  export function hello(name: string, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<string> {
    return $g.call('project::hello', [name], $signal);
  };
  export function table($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<$greycat.std.core.Table> {
    return $g.call('project::table', undefined, $signal);
  };
  export function task_without_params($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_without_params', undefined, $signal);
  };
  export function task_with_params(name: string, age: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_with_params', [name, age], $signal);
  };
  export function task_long_running($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_long_running', undefined, $signal);
  };
  export function mainTask($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::mainTask', undefined, $signal);
  };
  export function foo($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::foo', undefined, $signal);
  };
  export function bar($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::bar', undefined, $signal);
  };
  export function complex_object($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::complex_object', undefined, $signal);
  };
  export function obj1($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::obj1', undefined, $signal);
  };
  export function obj2($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::obj2', undefined, $signal);
  };
  export function add(a: number | bigint, b: number | bigint, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<number | bigint> {
    return $g.call('project::add', [a, b], $signal);
  };
  export function anything(v: any | null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::anything', [v], $signal);
  };
  export function mapTest($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::mapTest', undefined, $signal);
  };
  export function goodFnForTestingFnCallInput(name: string, flag: boolean, item: $greycat.std.core.DurationUnit, optionalFlag: boolean | null, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::goodFnForTestingFnCallInput', [name, flag, item, optionalFlag], $signal);
  };
  export function now($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::now', undefined, $signal);
  };
  export function link_whatever(l: $greycat.std.core.node<project.Link>, $g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::link_whatever', [l], $signal);
  };
  export function big_map($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<globalThis.Map<any | null, any | null>> {
    return $g.call('project::big_map', undefined, $signal);
  };
  export function one_d_histo_example($g: $greycat.GreyCat = $greycat.$.default, $signal?: AbortSignal): Promise<$greycat.std.util.Histogram> {
    return $g.call('project::one_d_histo_example', undefined, $signal);
  };
}

export const projectlib: $greycat.Library = {
  name: 'project',
  mapped: new globalThis.Array(13),
  configure(loaders, factories) {
    factories.set(project.Obj1._type, project.Obj1);
    factories.set(project.Sensor._type, project.Sensor);
    factories.set(project.Obj2._type, project.Obj2);
    factories.set(project.Root._type, project.Root);
    factories.set(project.Person2._type, project.Person2);
    factories.set(project.TrafficLight._type, project.TrafficLight);
    factories.set(project.ComplexObject._type, project.ComplexObject);
    factories.set(project.Link._type, project.Link);
    factories.set(project.SemiRecursive._type, project.SemiRecursive);
    factories.set(project.FooBar._type, project.FooBar);
    factories.set(project.TimeZones._type, project.TimeZones);
    factories.set(project.Confidence._type, project.Confidence);
    factories.set(project.SensorKind._type, project.SensorKind);
  },
  init(abi) {
    this.mapped[0] = abi.type_by_fqn.get(project.Obj1._type)!;
    this.mapped[1] = abi.type_by_fqn.get(project.Sensor._type)!;
    this.mapped[2] = abi.type_by_fqn.get(project.Obj2._type)!;
    this.mapped[3] = abi.type_by_fqn.get(project.Root._type)!;
    this.mapped[4] = abi.type_by_fqn.get(project.Person2._type)!;
    this.mapped[5] = abi.type_by_fqn.get(project.TrafficLight._type)!;
    this.mapped[5]?.resolveGeneratedOffsetWithValues('Green', null,'Yellow', null,'Red', null);
    this.mapped[6] = abi.type_by_fqn.get(project.ComplexObject._type)!;
    this.mapped[7] = abi.type_by_fqn.get(project.Link._type)!;
    this.mapped[8] = abi.type_by_fqn.get(project.SemiRecursive._type)!;
    this.mapped[9] = abi.type_by_fqn.get(project.FooBar._type)!;
    this.mapped[10] = abi.type_by_fqn.get(project.TimeZones._type)!;
    this.mapped[11] = abi.type_by_fqn.get(project.Confidence._type)!;
    this.mapped[11]?.resolveGeneratedOffsetWithValues('High', null,'Medium', null,'Low', null);
    this.mapped[12] = abi.type_by_fqn.get(project.SensorKind._type)!;
    this.mapped[12]?.resolveGeneratedOffsetWithValues('Temp', null,'Pressure', null);
  },
};

declare global {
  namespace greycat {
    interface GreyCat {
      call(method: 'project::Link::whatever', args: [$greycat.std.core.node<project.Link>], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::Link::whatever', args: [$greycat.std.core.node<project.Link>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::Link::whatever', args: [$greycat.std.core.node<project.Link>], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::persons', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::persons', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::persons', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::chart', args: [number | bigint], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::chart', args: [number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::chart', args: [number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::chart_time', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      spawn(method: 'project::chart_time', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::chart_time', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      call(method: 'project::chart_colored_area', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      spawn(method: 'project::chart_colored_area', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::chart_colored_area', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      call(method: 'project::donut', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      spawn(method: 'project::donut', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::donut', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      call(method: 'project::heatmap', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::heatmap', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::heatmap', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::hello', args: [string], signal?: AbortSignal): Promise<string>;
      spawn(method: 'project::hello', args: [string], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::hello', args: [string], pollEvery?: number, signal?: AbortSignal): Promise<string>;
      call(method: 'project::table', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      spawn(method: 'project::table', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$greycat.std.core.Table>;
      call(method: 'project::task_without_params', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_without_params', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::task_without_params', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::task_with_params', args: [string, number | bigint], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_with_params', args: [string, number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::task_with_params', args: [string, number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::task_long_running', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::task_long_running', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::task_long_running', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::mainTask', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::mainTask', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::mainTask', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::foo', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::foo', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::bar', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::bar', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::bar', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::complex_object', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::complex_object', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::complex_object', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::obj1', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::obj1', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::obj1', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::obj2', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::obj2', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::obj2', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::add', args: [number | bigint, number | bigint], signal?: AbortSignal): Promise<number | bigint>;
      spawn(method: 'project::add', args: [number | bigint, number | bigint], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::add', args: [number | bigint, number | bigint], pollEvery?: number, signal?: AbortSignal): Promise<number | bigint>;
      call(method: 'project::anything', args: [any | null], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::anything', args: [any | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::anything', args: [any | null], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::mapTest', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::mapTest', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::mapTest', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $greycat.std.core.DurationUnit, boolean | null], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $greycat.std.core.DurationUnit, boolean | null], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $greycat.std.core.DurationUnit, boolean | null], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::now', args?: undefined, signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::now', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::now', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::link_whatever', args: [$greycat.std.core.node<project.Link>], signal?: AbortSignal): Promise<unknown>;
      spawn(method: 'project::link_whatever', args: [$greycat.std.core.node<project.Link>], signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::link_whatever', args: [$greycat.std.core.node<project.Link>], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
      call(method: 'project::big_map', args?: undefined, signal?: AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      spawn(method: 'project::big_map', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::big_map', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<globalThis.Map<any | null, any | null>>;
      call(method: 'project::one_d_histo_example', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.util.Histogram>;
      spawn(method: 'project::one_d_histo_example', args?: undefined, signal?: AbortSignal): Promise<$greycat.std.runtime.Task>;
      spawnAwait(method: 'project::one_d_histo_example', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$greycat.std.util.Histogram>;
    }
  }
}
