// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
import * as $sdk from '@greycat/web';

export namespace project {
  export class TrafficLight extends $sdk.GCEnum {
    static readonly _type = 'project::TrafficLight';

    constructor(type: $sdk.AbiType, offset: number, public override key: TrafficLight.Field, value: $sdk.Value) {
      super(type, offset, key, value);
    }

    static Green($g: $sdk.GreyCat = globalThis.greycat.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return t.static_values['Green'];
    }
    static Yellow($g: $sdk.GreyCat = globalThis.greycat.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return t.static_values['Yellow'];
    }
    static Red($g: $sdk.GreyCat = globalThis.greycat.default): TrafficLight {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return t.static_values['Red'];
    }
    static $fields($g: $sdk.GreyCat = globalThis.greycat.default): TrafficLight[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[0];
      return t.enum_values as TrafficLight[];
    }
  }

  export namespace TrafficLight  {
    export type Field = 'Green'|'Yellow'|'Red';
  }
  export class ComplexObject extends $sdk.GCObject {
    static readonly _type = 'project::ComplexObject';

    string!: string;
    int!: bigint | number;
    float!: number;
    bool!: boolean;
    char!: string;
    geo!: $sdk.std.core.geo;
    null!: any;
    enum!: $sdk.std.core.TimeZone;
    array!: globalThis.Array<any>;
    nodeTime!: $sdk.std.core.nodeTime;
    nodeIndex!: $sdk.std.core.nodeIndex;
    nodeList!: $sdk.std.core.nodeList;
    nodeGeo!: $sdk.std.core.nodeGeo;
    nested!: any;
    nodeNested!: $sdk.std.core.node | null;
    map!: globalThis.Map<string, any>;

    static createFrom({string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map}: {string: string, int: bigint | number, float: number, bool: boolean, char: string, geo: $sdk.std.core.geo, null_: any | null, enum_: $sdk.std.core.TimeZone, array: globalThis.Array<any>, nodeTime: $sdk.std.core.nodeTime, nodeIndex: $sdk.std.core.nodeIndex, nodeList: $sdk.std.core.nodeList, nodeGeo: $sdk.std.core.nodeGeo, nested: any, nodeNested: $sdk.std.core.node | null, map: globalThis.Map<string, any>}, $g: $sdk.GreyCat = globalThis.greycat.default): ComplexObject {
      return new ComplexObject($g.abi.libs_by_name.get(projectlib.name)!.mapped[1], string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map);
    }
    static create(string: string, int: bigint | number, float: number, bool: boolean, char: string, geo: $sdk.std.core.geo, null_: any | null, enum_: $sdk.std.core.TimeZone, array: globalThis.Array<any>, nodeTime: $sdk.std.core.nodeTime, nodeIndex: $sdk.std.core.nodeIndex, nodeList: $sdk.std.core.nodeList, nodeGeo: $sdk.std.core.nodeGeo, nested: any, nodeNested: $sdk.std.core.node | null, map: globalThis.Map<string, any>, $g: $sdk.GreyCat = globalThis.greycat.default): ComplexObject {
      return new ComplexObject($g.abi.libs_by_name.get(projectlib.name)!.mapped[1], string, int, float, bool, char, geo, null_, enum_, array, nodeTime, nodeIndex, nodeList, nodeGeo, nested, nodeNested, map);
    }
  }

  export class SemiRecursive extends $sdk.GCObject {
    static readonly _type = 'project::SemiRecursive';

    sub!: project.SemiRecursive | null;

    static createFrom({sub}: {sub: project.SemiRecursive | null}, $g: $sdk.GreyCat = globalThis.greycat.default): SemiRecursive {
      return new SemiRecursive($g.abi.libs_by_name.get(projectlib.name)!.mapped[2], sub);
    }
    static create(sub: project.SemiRecursive | null, $g: $sdk.GreyCat = globalThis.greycat.default): SemiRecursive {
      return new SemiRecursive($g.abi.libs_by_name.get(projectlib.name)!.mapped[2], sub);
    }
  }

  export class FooBar extends $sdk.GCObject {
    static readonly _type = 'project::FooBar';


    static createFrom($g: $sdk.GreyCat = globalThis.greycat.default): FooBar {
      return new FooBar($g.abi.libs_by_name.get(projectlib.name)!.mapped[3]);
    }
    static create($g: $sdk.GreyCat = globalThis.greycat.default): FooBar {
      return new FooBar($g.abi.libs_by_name.get(projectlib.name)!.mapped[3]);
    }
  }

  export class SensorKind extends $sdk.GCEnum {
    static readonly _type = 'project::SensorKind';

    constructor(type: $sdk.AbiType, offset: number, public override key: SensorKind.Field, value: $sdk.Value) {
      super(type, offset, key, value);
    }

    static Temp($g: $sdk.GreyCat = globalThis.greycat.default): SensorKind {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[4];
      return t.static_values['Temp'];
    }
    static Pressure($g: $sdk.GreyCat = globalThis.greycat.default): SensorKind {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[4];
      return t.static_values['Pressure'];
    }
    static $fields($g: $sdk.GreyCat = globalThis.greycat.default): SensorKind[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[4];
      return t.enum_values as SensorKind[];
    }
  }

  export namespace SensorKind  {
    export type Field = 'Temp'|'Pressure';
  }
  export class Confidence extends $sdk.GCEnum {
    static readonly _type = 'project::Confidence';

    constructor(type: $sdk.AbiType, offset: number, public override key: Confidence.Field, value: $sdk.Value) {
      super(type, offset, key, value);
    }

    static High($g: $sdk.GreyCat = globalThis.greycat.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['High'];
    }
    static Medium($g: $sdk.GreyCat = globalThis.greycat.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['Medium'];
    }
    static Low($g: $sdk.GreyCat = globalThis.greycat.default): Confidence {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.static_values['Low'];
    }
    static $fields($g: $sdk.GreyCat = globalThis.greycat.default): Confidence[] {
      const t = $g.abi.libs_by_name.get(projectlib.name)!.mapped[5];
      return t.enum_values as Confidence[];
    }
  }

  export namespace Confidence  {
    export type Field = 'High'|'Medium'|'Low';
  }
  export class Link extends $sdk.GCObject {
    static readonly _type = 'project::Link';

    name!: string;
    next!: project.Link | null;

    static createFrom({name, next}: {name: string, next: project.Link | null}, $g: $sdk.GreyCat = globalThis.greycat.default): Link {
      return new Link($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], name, next);
    }
    static create(name: string, next: project.Link | null, $g: $sdk.GreyCat = globalThis.greycat.default): Link {
      return new Link($g.abi.libs_by_name.get(projectlib.name)!.mapped[6], name, next);
    }
  }

  export class Sensor extends $sdk.GCObject {
    static readonly _type = 'project::Sensor';

    id!: bigint | number;
    kind!: project.SensorKind;

    static createFrom({id, kind}: {id: bigint | number, kind: project.SensorKind}, $g: $sdk.GreyCat = globalThis.greycat.default): Sensor {
      return new Sensor($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], id, kind);
    }
    static create(id: bigint | number, kind: project.SensorKind, $g: $sdk.GreyCat = globalThis.greycat.default): Sensor {
      return new Sensor($g.abi.libs_by_name.get(projectlib.name)!.mapped[7], id, kind);
    }
  }

  export function boxplot_float($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::boxplot_float', undefined, $signal);
  };
  export function chart(nbRows: bigint | number, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::chart', [nbRows], $signal);
  };
  export function chart_time($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('project::chart_time', undefined, $signal);
  };
  export function chart_colored_area($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('project::chart_colored_area', undefined, $signal);
  };
  export function donut($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('project::donut', undefined, $signal);
  };
  export function heatmap($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::heatmap', undefined, $signal);
  };
  export function hello(name: string, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<string> {
    return $g.call('project::hello', [name], $signal);
  };
  export function histogram_table($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('project::histogram_table', undefined, $signal);
  };
  export function table($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<$sdk.std.core.Table> {
    return $g.call('project::table', undefined, $signal);
  };
  export function task_without_params($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_without_params', undefined, $signal);
  };
  export function task_with_params(name: string, age: bigint | number, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_with_params', [name, age], $signal);
  };
  export function task_long_running($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::task_long_running', undefined, $signal);
  };
  export function mainTask($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::mainTask', undefined, $signal);
  };
  export function foo($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::foo', undefined, $signal);
  };
  export function bar($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::bar', undefined, $signal);
  };
  export function complex_object($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::complex_object', undefined, $signal);
  };
  export function obj1($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::obj1', undefined, $signal);
  };
  export function obj2($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::obj2', undefined, $signal);
  };
  export function add(a: bigint | number, b: bigint | number, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<bigint | number> {
    return $g.call('project::add', [a, b], $signal);
  };
  export function anything(v: any | null, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::anything', [v], $signal);
  };
  export function mapTest($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::mapTest', undefined, $signal);
  };
  export function goodFnForTestingFnCallInput(name: string, flag: boolean, item: $sdk.std.core.DurationUnit, optionalFlag: boolean | null, $g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::goodFnForTestingFnCallInput', [name, flag, item, optionalFlag], $signal);
  };
  export function now($g: $sdk.GreyCat = globalThis.greycat.default, $signal?: AbortSignal): Promise<unknown> {
    return $g.call('project::now', undefined, $signal);
  };
}

export namespace $anon$ {
  export class Anon0 extends $sdk.GCObject {
    static readonly _type = '::<string,int,float,bool,char,geo,null,array,nodeTime,nodeIndex,nodeList,nodeGeo,enum>';

    string!: any;
    int!: any;
    float!: any;
    bool!: any;
    char!: any;
    geo!: any;
    null!: any;
    array!: any;
    nodeTime!: any;
    nodeIndex!: any;
    nodeList!: any;
    nodeGeo!: any;
    enum!: any;
  }
  export class Anon1 extends $sdk.GCObject {
    static readonly _type = '::<prop1,prop2,prop3>';

    prop1!: any;
    prop2!: any;
    prop3!: any;
  }
  export class Anon2 extends $sdk.GCObject {
    static readonly _type = '::<foo,baz>';

    foo!: any;
    baz!: any;
  }
  export class Anon3 extends $sdk.GCObject {
    static readonly _type = '::<azores,utc,paris,athens>';

    azores!: any;
    utc!: any;
    paris!: any;
    athens!: any;
  }
}

export const projectlib: $sdk.Library = {
  name: 'project',
  mapped: new globalThis.Array(12),
  configure(_loaders, factories) {
    factories.set(project.TrafficLight._type, project.TrafficLight);
    factories.set(project.ComplexObject._type, project.ComplexObject);
    factories.set(project.SemiRecursive._type, project.SemiRecursive);
    factories.set(project.FooBar._type, project.FooBar);
    factories.set(project.SensorKind._type, project.SensorKind);
    factories.set(project.Confidence._type, project.Confidence);
    factories.set(project.Link._type, project.Link);
    factories.set(project.Sensor._type, project.Sensor);
    factories.set($anon$.Anon0._type, $anon$.Anon0);
    factories.set($anon$.Anon1._type, $anon$.Anon1);
    factories.set($anon$.Anon2._type, $anon$.Anon2);
    factories.set($anon$.Anon3._type, $anon$.Anon3);
  },
  init(abi) {
    this.mapped[0] = abi.type_by_fqn.get(project.TrafficLight._type)!;
    this.mapped[0]?.resolveGeneratedOffsetWithValues('Green', null,'Yellow', null,'Red', null);
    this.mapped[1] = abi.type_by_fqn.get(project.ComplexObject._type)!;
    this.mapped[2] = abi.type_by_fqn.get(project.SemiRecursive._type)!;
    this.mapped[3] = abi.type_by_fqn.get(project.FooBar._type)!;
    this.mapped[4] = abi.type_by_fqn.get(project.SensorKind._type)!;
    this.mapped[4]?.resolveGeneratedOffsetWithValues('Temp', null,'Pressure', null);
    this.mapped[5] = abi.type_by_fqn.get(project.Confidence._type)!;
    this.mapped[5]?.resolveGeneratedOffsetWithValues('High', null,'Medium', null,'Low', null);
    this.mapped[6] = abi.type_by_fqn.get(project.Link._type)!;
    this.mapped[7] = abi.type_by_fqn.get(project.Sensor._type)!;
    this.mapped[8] = abi.type_by_fqn.get($anon$.Anon0._type)!;
    this.mapped[9] = abi.type_by_fqn.get($anon$.Anon1._type)!;
    this.mapped[10] = abi.type_by_fqn.get($anon$.Anon2._type)!;
    this.mapped[11] = abi.type_by_fqn.get($anon$.Anon3._type)!;
  },
};

declare module '@greycat/web' {
  interface GreyCat {
    call(method: 'project::boxplot_float', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::boxplot_float', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::boxplot_float', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::chart', args: [bigint | number, ], signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::chart', args: [bigint | number, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::chart', args: [bigint | number, ], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::chart_time', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    spawn(method: 'project::chart_time', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::chart_time', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    call(method: 'project::chart_colored_area', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    spawn(method: 'project::chart_colored_area', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::chart_colored_area', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    call(method: 'project::donut', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    spawn(method: 'project::donut', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::donut', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    call(method: 'project::heatmap', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::heatmap', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::heatmap', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::hello', args: [string, ], signal?: AbortSignal): Promise<string>;
    spawn(method: 'project::hello', args: [string, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::hello', args: [string, ], pollEvery?: number, signal?: AbortSignal): Promise<string>;
    call(method: 'project::histogram_table', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    spawn(method: 'project::histogram_table', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::histogram_table', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    call(method: 'project::table', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    spawn(method: 'project::table', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::table', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<$sdk.std.core.Table>;
    call(method: 'project::task_without_params', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::task_without_params', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::task_without_params', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::task_with_params', args: [string, bigint | number, ], signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::task_with_params', args: [string, bigint | number, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::task_with_params', args: [string, bigint | number, ], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::task_long_running', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::task_long_running', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::task_long_running', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::mainTask', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::mainTask', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::mainTask', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::foo', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::foo', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::foo', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::bar', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::bar', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::bar', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::complex_object', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::complex_object', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::complex_object', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::obj1', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::obj1', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::obj1', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::obj2', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::obj2', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::obj2', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::add', args: [bigint | number, bigint | number, ], signal?: AbortSignal): Promise<bigint | number>;
    spawn(method: 'project::add', args: [bigint | number, bigint | number, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::add', args: [bigint | number, bigint | number, ], pollEvery?: number, signal?: AbortSignal): Promise<bigint | number>;
    call(method: 'project::anything', args: [any | null, ], signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::anything', args: [any | null, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::anything', args: [any | null, ], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::mapTest', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::mapTest', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::mapTest', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $sdk.std.core.DurationUnit, boolean | null, ], signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $sdk.std.core.DurationUnit, boolean | null, ], signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::goodFnForTestingFnCallInput', args: [string, boolean, $sdk.std.core.DurationUnit, boolean | null, ], pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
    call(method: 'project::now', args?: undefined, signal?: AbortSignal): Promise<unknown>;
    spawn(method: 'project::now', args?: undefined, signal?: AbortSignal): Promise<$sdk.std.runtime.Task>;
    spawnAwait(method: 'project::now', args?: undefined, pollEvery?: number, signal?: AbortSignal): Promise<unknown>;
  }
}
