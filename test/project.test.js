import assert from 'node:assert';
import { describe, before, it } from 'node:test';
import { readFile } from 'node:fs/promises';

import '@greycat/web/sdk';
const { Abi, AbiReader, AbiWriter, GCEnum } = gc.sdk;

describe('project', () => {
  /** @type {gc.sdk.Abi} */
  let abi;
  /** @type {gc.sdk.AbiReader} */
  let reader;

  const expected_values = [
    // std::core
    true,
    0,
    1,
    -1,
    63,
    -64,
    64,
    -65,
    8191,
    -8192,
    8192,
    -8193,
    1048575,
    -1048576,
    1048576,
    -1048577,
    134217727,
    -134217728,
    134217728,
    -134217729,
    17179869183,
    -17179869184,
    17179869184,
    -17179869185,
    2199023255551,
    -2199023255552,
    2199023255552,
    -2199023255553,
    281474976710655,
    -281474976710656,
    281474976710656,
    -281474976710657,
    36028797018963967n,
    -36028797018963968n,
    36028797018963968n,
    -36028797018963969n,
    9223372036854775807n,
    -9223372036854775808n,
    13.37,
    42,
    'Hello world',
    'Hello world',
    12,
    '1970-01-01T01:00:00.000+0100',
    [],
    [42, true, 'hello', 'month'],
    { lat: 49.596344732033856, lng: 6.128470371477306 },
    {},
    'project::table',
    { _type: 'project::FloatPrecisionTest', normal: 3.14, precision: 3.14 },
    { _type: 'core::Buffer', data: [] },
    {
      42: 42,
      true: true,
      hello: 'hello',
      'core::CalendarUnit::month': 'month',
    },
    {
      _type: 'project::CustomType',
      string: 'hello',
      int: 42,
      float: 3.14,
      bool: true,
      char: 'c',
      enum: 'Europe/Luxembourg',
    },
    {
      _type: 'core::GeoBox',
      ne: {
        lat: 1.500000000617348,
        lng: -0.5000000121071935,
      },
      sw: {
        lat: 0.9999999938107322,
        lng: 2.000000006519258,
      },
    },
    53248,
    'Europe/Luxembourg',
    57344,
    { _type: 'core::Error', message: 'an error', stack: [] },
    'none',
    'adaptative',
    'days',
    'c128',
    [
      [0, 0.5, { _type: 'project::Named', name: 'one' }],
      [1, 1.5, { _type: 'project::Named', name: 'two' }],
      [2, 2.5, { _type: 'project::Named', name: 'three' }],
      [3, 3.5, { _type: 'project::Named', name: 'four' }],
    ],
    {
      _type: 'core::Tensor',
      dim: 0,
      shape: [],
      type: 'i32',
      data: [],
    },
    {
      _type: 'core::Tensor',
      dim: 2,
      shape: [2],
      type: 'f64',
      data: [3.14,0],
    },
    {
      _type: 'core::GeoCircle',
      center: {
        lat: 49.596344732033856,
        lng: 6.128470371477306,
      },
      radius: 13.37,
    },
    {
      _type: 'core::Date',
      year: 2012,
      month: 12,
      day: 12,
      hour: 12,
      minute: 12,
      second: 12,
      microsecond: 120012,
    },
    61440,
    [],
    { _type: 'core::Tuple<core::int,core::String>', x: 42, y: 'hello' },
    65536,
    {
      _type: 'core::GeoPoly',
      points: [
        {
          lat: 0.9999999938107322,
          lng: 2.000000006519258,
        },
        {
          lat: 1.500000000617348,
          lng: 2.010000036098063,
        },
        {
          lat: 0.9999999938107322,
          lng: 2.000000006519258,
        },
      ],
    },
    'day',
    69632,
    [13, 37],
    [13, 37, 42],
    [13, 37, 42, 12],
    'helloworld',
    [13.369999885559082, 12.420000076293945],
    [13.369140625, 12.419921875, -13.369140625],
    [13.3125, 12.375, -13.3125, -12.375],
    // std::core::MathConstants
    2.718281828459045, // MathConstants::e
    1.4426950408889634, // MathConstants::log_2e
    0.4342944819032518, // MathConstants::log_10e
    0.6931471805599453, // MathConstants::ln2
    2.302585092994046, // MathConstants::ln10
    3.141592653589793, // MathConstants::pi
    1.5707963267948966, // MathConstants::pi_2
    0.7853981633974483, // MathConstants::pi_4
    0.3183098861837907, // MathConstants::m1_pi
    0.6366197723675814, // MathConstants::m2_pi
    1.1283791670955126, // MathConstants::m2_sqrt_pi
    1.4142135623730951, // MathConstants::sqrt2
    0.7071067811865476, // MathConstants::sqrt1_2

    // std::io
    {
      _type: 'io::CsvFormat',
      header_lines: 12,
      separator: ',',
      nearest_time: null,
      format: null,
      string_delimiter: '"',
      decimal_separator: '.',
      thousands_separator: '_',
      trim: null,
      tz: null,
      strict: null,
    },

    // std::runtime
    {
      _type: 'runtime::Task',
      user_id: 13,
      task_id: 37,
      mod: '',
      type: '',
      fun: '',
      progress: null,
      start: null,
      duration: null,
      creation: '1970-01-01T01:00:00.000+0100',
      status: 'empty',
    },
    'cancelled',
    { _type: 'runtime::Runtime' },
    {
      _type: 'runtime::RuntimeInfo',
      version: '',
      program_version: '1.2.3',
      arch: '',
      timezone: 'Europe/Luxembourg',
      license: {
        _type: 'runtime::License',
        start: '1970-01-01T01:00:00.000+0100',
        end: '1970-01-01T01:00:00.000+0100',
        max_memory: 12,
        company: null,
        name: null,
        extra_1: null,
        extra_2: null,
        type: null,
      },
      io_threads: 13,
      bg_threads: 37,
      fg_threads: 42,
      mem_total: 12,
      mem_worker: 0,
      disk_data_bytes: 42,
    },
    {
      _type: 'runtime::SecurityFields',
      email: null,
      first_name: null,
      groups: null,
      groups_claim: null,
      last_name: null,
      name: null,
      roles: null,
    },
    { _type: 'runtime::UserGroup', id: 12, name: '', activated: false },
    { _type: 'runtime::OpenIDConnect', url: '', clientId: '' },
    { _type: 'runtime::Role', name: '', permissions: [] },
    // {
    //   _type: 'runtime::PeriodicTask',
    //   function: 'project::float_f',
    //   arguments: [3.14],
    //   user_id: 12,
    //   start: '1970-01-01T01:00:00.000+0100',
    //   every: 37,
    // },
    {
      _type: 'runtime::User',
      id: 12,
      name: '',
      activated: false,
      external: true,
      groups: null,
      full_name: null,
      role: null,
      groups_flags: null,
      email: null,
    },
    {
      _type: 'runtime::UserGroupPolicy',
      group_id: 12,
      type: 'execute',
    },
    'read',
    {
      _type: 'runtime::License',
      start: '1970-01-01T01:00:00.000+0100',
      end: '1970-01-01T01:00:00.000+0100',
      max_memory: 12,
      company: null,
      extra_1: null,
      extra_2: null,
      name: null,
      type: null,
    },
    { _type: 'runtime::System' },
    {
      _type: 'runtime::SecurityPolicy',
      entities: null,
      credentials: null,
      fields: null,
      keys: null,
      keys_last_refresh: null,
    },

    // std::util
    { _type: 'util::Random', seed: 42, v: 13.37 },
    { _type: 'util::Assert' },
    {
      _type: 'util::ProgressTracker',
      start: '1970-01-01T01:00:00.000+0100',
      counter: null,
      duration: null,
      progress: null,
      remaining: null,
      speed: null,
      total: null,
    },
    {
      _type: 'util::Gaussian',
      count: 3,
      max: 5,
      min: 0,
      sum: 7,
      sumsq: 29,
    },
    {
      _type: 'util::TimeWindow',
      field: null,
      sum: 1000101042,
      sumsq: 1000000008001001900,
      values: [
        { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T01:00:00.000+0100', y: 1 },
        { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T01:00:00.000+0100', y: 1000 },
        {
          _type: 'core::Tuple<core::time,core::any?>',
          x: '1970-01-01T01:00:00.000+0100',
          y: 100000,
        },
        {
          _type: 'core::Tuple<core::time,core::any?>',
          x: '1970-01-01T01:00:00.000+0100',
          y: 999999999,
        },
        { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T01:00:00.000+0100', y: 42 },
      ],
      span: 3000000,
    },
    {
      _type: 'util::SlidingWindow',
      span: 10,
      field: null,
      sum: null,
      sumsq: null,
      values: null,
    },
    { _type: 'util::Queue<core::int>', capacity: 3, values: [3, 2, 42] },
    { _type: 'util::Stack<core::String>', values: ['one', 'two'] },
    { _type: 'util::Crypto' },
  ];

  before(async () => {
    const buffer = /** @type {ArrayBuffer} */ ((await readFile('project.test.abi')).buffer);
    abi = new Abi(buffer);
    const wasm = await gc.sdk.compileWasm();
    gc.sdk.initWithAbi({
      abi,
      module: wasm.module,
      exports: wasm.instance.exports,
    });

    const data = /** @type {ArrayBuffer} */ ((await readFile('project.test.gcb')).buffer);
    reader = new AbiReader(abi, data);

    reader.headers(); // read headers
  });

  // test ser/de
  for (let i = 0; i < expected_values.length; i++) {
    const expected = expected_values[i];
    let testName;
    if (typeof expected === 'object') {
      if ('_type' in expected) {
        testName = `#${i} ${expected._type}`;
      } else {
        testName = `#${i} ${typeof expected} (${JSON.stringify(expected)})`;
      }
    } else {
      testName = `#${i} ${typeof expected} (${expected})`;
    }
    it(testName, () => {
      // deserialize value from actual 'out.gcb' bytes
      let actual = reader.deserialize();
      // create a temporary serializer
      const writer = new AbiWriter(abi);
      // serialize the value again
      writer.serialize(actual);
      // create a temporary deserializer
      const reader2 = new AbiReader(abi, writer.buffer.buffer);
      // deserialize the value again from what we serialized
      const roundtrip_value = reader2.deserialize();
      // ensure the actual deserialized value and our roundtrip are equals
      if (Number.isFinite(actual) && !Number.isInteger(actual)) {
        // float type
        assert.ok(almostEqual(actual, roundtrip_value));
        // serialize to JSON
        actual = fromJson(toJson(actual));
        // validate that we were actually expecting this value
        assert.ok(almostEqual(actual, expected));
      } else {
        // other type
        assert.deepStrictEqual(actual, roundtrip_value);
        // serialize to JSON
        actual = fromJson(toJson(actual));
        // validate that we were actually expecting this value
        assert.deepStrictEqual(actual, expected);
      }
    });
  }
});

// check float equality with tolerance
/**
 *
 * @param {any} a
 * @param {any} b
 * @param {number} epsilon
 * @returns
 */
function almostEqual(a, b, epsilon = 1e-12) {
  return Math.abs(a - b) <= epsilon;
}

/**
 * @param {string} value
 * @returns
 */
function fromJson(value) {
  return JSON.parse(value, (_, value) => {
    if (typeof value === 'string' && value.startsWith('$bigint:')) {
      // eslint-disable-next-line no-undef
      return BigInt(value.slice(8));
    }
    return value;
  });
}

/**
 * @param {unknown} value
 * @returns
 */
function toJson(value) {
  return JSON.stringify(value, (_, value) => {
    if (typeof value === 'bigint') {
      if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
        return Number(value);
      }
      return `$bigint:${value}`;
    } else if (value instanceof Map) {
      /** @type {Record<string, unknown>} */
      const json = {};
      value.forEach((value, key) => {
        if (key === null) {
          json['null'] = value;
        } else if (key === undefined) {
          json['undefined'] = value;
        } else if (key instanceof GCEnum) {
          json[`${key.$type.name}::${key.key}`] = value;
        } else {
          json[key.toString()] = value;
        }
      });
      return json;
    }
    return value;
  });
}
