import assert from 'node:assert';
import { describe, before, it } from 'node:test';
import { readFile } from 'node:fs/promises';

import '@greycat/web/sdk';
const { Abi, AbiReader, AbiWriter, GCEnum } = gc.sdk;

describe('project', () => {
  let abi, reader;

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
    { _type: 'core::duration', s: 0, us: 12 },
    '1970-01-01T00:00:00.000Z',
    [],
    [42, true, 'hello', { _type: 'core::CalendarUnit', field: 'month' }],
    { _type: 'core::geo', lat: 49.596344732033856, lng: 6.128470371477306 },
    {},
    { _type: 'core::function', fqn: 'project::table' },
    { _type: 'project::FloatPrecisionTest', normal: 3.14, precision: 3.14 },
    { _type: 'core::Buffer', data: [] },
    {
      42: 42,
      true: true,
      hello: 'hello',
      'core::CalendarUnit::month': { _type: 'core::CalendarUnit', field: 'month' },
    },
    {
      _type: 'project::CustomType',
      string: 'hello',
      int: 42,
      float: 3.14,
      bool: true,
      char: 'c',
      enum: { _type: 'core::TimeZone', field: 'Europe_Luxembourg' },
    },
    {
      _type: 'core::GeoBox',
      ne: {
        _type: 'core::geo',
        lat: 1.500000000617348,
        lng: -0.5000000121071935,
      },
      sw: {
        _type: 'core::geo',
        lat: 0.9999999938107322,
        lng: 2.000000006519258,
      },
    },
    { _type: 'core::nodeList', ref: '1800000' },
    { _type: 'core::TimeZone', field: 'Europe_Luxembourg' },
    { _type: 'core::node', ref: '1c00000' },
    { _type: 'core::Error', message: 'an error', stack: [] },
    { _type: 'core::ErrorCode', field: 'none' },
    { _type: 'core::SamplingMode', field: 'adaptative' },
    { _type: 'core::DurationUnit', field: 'days' },
    { _type: 'core::TensorType', field: 'c128' },
    {
      _type: 'core::Table',
      rows: [
        [0, 0.5, { _type: 'project::Named', name: 'one' }],
        [1, 1.5, { _type: 'project::Named', name: 'two' }],
        [2, 2.5, { _type: 'project::Named', name: 'three' }],
        [3, 3.5, { _type: 'project::Named', name: 'four' }],
      ],
    },
    {
      _type: 'core::Tensor',
      dim: 0,
      shape: [],
      type: { _type: 'core::TensorType', field: 'i32' },
      data: null,
    },
    {
      _type: 'core::Tensor',
      dim: 1,
      shape: [1, 1],
      type: { _type: 'core::TensorType', field: 'f64' },
      data: [[3.14]],
    },
    {
      _type: 'core::GeoCircle',
      center: {
        _type: 'core::geo',
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
    { _type: 'core::nodeTime', ref: '2000000' },
    [],
    // { _type: 'core::Tuple', x: [], y: {} },
    { _type: 'core::Tuple', x: 42, y: 'hello' },
    { _type: 'core::nodeIndex', ref: '2400000' },
    {
      _type: 'core::GeoPoly',
      points: [
        {
          _type: 'core::geo',
          lat: 0.9999999938107322,
          lng: 2.000000006519258,
        },
        {
          _type: 'core::geo',
          lat: 1.500000000617348,
          lng: 2.010000036098063,
        },
        {
          _type: 'core::geo',
          lat: 0.9999999938107322,
          lng: 2.000000006519258,
        },
      ],
    },
    { _type: 'core::CalendarUnit', field: 'day' },
    { _type: 'core::nodeGeo', ref: '2800000' },
    { _type: 'core::t2', x0: 13, x1: 37 },
    { _type: 'core::t3', x0: 13, x1: 37, x2: 42 },
    { _type: 'core::t4', x0: 13, x1: 37, x2: 42, x3: 12 },
    { _type: 'core::str', value: 'helloworld' },
    { _type: 'core::t2f', x0: 13.369999885559082, x1: 12.420000076293945 },
    { _type: 'core::t3f', x0: 13.369140625, x1: 12.419921875, x2: -13.369140625 },
    { _type: 'core::t4f', x0: 13.3125, x1: 12.375, x2: -13.3125, x3: -12.375 },
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
    { _type: 'io::TextEncoder', field: 'plain' },
    {
      _type: 'io::CsvColumnString',
      encoder: null,
      mandatory: null,
      name: null,
      trim: null,
      try_json: null,
      try_number: null,
      values: null,
      offset: null,
    },
    { _type: 'io::CsvColumnInteger', mandatory: null, name: null, offset: null },
    { _type: 'io::CsvColumnFloat', mandatory: null, name: null, offset: null },
    { _type: 'io::CsvColumnBoolean', mandatory: null, name: null, offset: null },
    { _type: 'io::CsvColumnTime', mandatory: null, name: null, unit: null, offset: null },
    {
      _type: 'io::CsvColumnDate',
      mandatory: null,
      name: null,
      as_time: null,
      format: null,
      tz: null,
      offset: null,
    },
    { _type: 'io::CsvColumnIgnored', mandatory: null, name: null, offset: null },
    {
      _type: 'io::CsvFormat',
      header_lines: 12,
      separator: ',',
      string_delimiter: '"',
      decimal_separator: '.',
      thousands_separator: '_',
      columns: [],
      columns_size: null,
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
      creation: '1970-01-01T00:00:00.000Z',
      status: { _type: 'runtime::TaskStatus', field: 'empty' },
    },
    { _type: 'runtime::TaskStatus', field: 'cancelled' },
    { _type: 'runtime::Runtime' },
    {
      _type: 'runtime::RuntimeInfo',
      version: '',
      program_version: null,
      arch: '',
      timezone: { _type: 'core::TimeZone', field: 'Europe_Luxembourg' },
      license: {
        _type: 'runtime::License',
        start: '1970-01-01T00:00:00.000Z',
        end: '1970-01-01T00:00:00.000Z',
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
      nb_ctx: 1,
      store_stats: null,
    },
    {
      _type: 'runtime::SecurityFields',
      email: null,
      first_name: null,
      groups: null,
      last_name: null,
      name: null,
      roles: null,
    },
    { _type: 'runtime::UserGroup', id: 12, name: '', activated: false },
    { _type: 'runtime::OpenIDConnect', url: '', clientId: '' },
    { _type: 'runtime::UserRole', name: '', permissions: [] },
    {
      _type: 'runtime::PeriodicTask',
      function: { _type: 'core::function', fqn: 'project::float_f' },
      arguments: [3.14],
      user_id: 12,
      start: '1970-01-01T00:00:00.000Z',
      every: { _type: 'core::duration', s: 0, us: 37 },
    },
    {
      _type: 'runtime::User',
      id: 12,
      name: '',
      activated: false,
      external: true,
      groups: null,
      full_name: null,
      permissions_flags: null,
      role: null,
      groups_flags: null,
      email: null,
    },
    {
      _type: 'runtime::UserGroupPolicy',
      group_id: 12,
      type: { _type: 'runtime::UserGroupPolicyType', field: 'execute' },
    },
    { _type: 'runtime::UserGroupPolicyType', field: 'read' },
    {
      _type: 'runtime::License',
      start: '1970-01-01T00:00:00.000Z',
      end: '1970-01-01T00:00:00.000Z',
      max_memory: 12,
      company: null,
      extra_1: null,
      extra_2: null,
      name: null,
      type: null,
    },
    {
      _type: 'runtime::StoreStat',
      capacity_bytes: 13,
      allocated_bytes: 37,
      allocated_ratio: 13.37,
      remained_bytes: 12,
      remained_ratio: 4.2,
      used_bytes: 42,
      used_ratio: 0.1,
      available_bytes: 0,
      available_ratio: 0.2,
    },
    { _type: 'runtime::System' },
    {
      _type: 'runtime::SecurityPolicy',
      entities: null,
      credentials: null,
      roles: null,
      fields: null,
      keys: null,
      keys_last_refresh: null,
    },

    // std::util
    { _type: 'util::Random', seed: 42, v: 13.37 },
    { _type: 'util::Assert' },
    {
      _type: 'util::ProgressTracker',
      start: '1970-01-01T00:00:00.000Z',
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
      values: {
        _type: 'core::Table',
        rows: [
          { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T00:00:00.000Z', y: 1 },
          { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T00:00:00.000Z', y: 1000 },
          { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T00:00:00.000Z', y: 100000 },
          {
            _type: 'core::Tuple<core::time,core::any?>',
            x: '1970-01-01T00:00:00.000Z',
            y: 999999999,
          },
          { _type: 'core::Tuple<core::time,core::any?>', x: '1970-01-01T00:00:00.000Z', y: 42 },
        ],
      },
      span: { _type: 'core::duration', s: 3, us: 0 },
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
    const buffer = (await readFile('project.test.abi')).buffer;
    abi = new Abi(buffer);

    const data = (await readFile('project.test.gcb')).buffer;
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
      // deserialize the value again from what we serialize
      const roundtrip_value = reader2.deserialize();
      // ensure the actual deserialized value and our roundtrip are equals
      assert.deepStrictEqual(actual, roundtrip_value);
      // serialize to JSON
      actual = fromJson(toJson(actual));
      // validate that we were actually expecting this value
      assert.deepStrictEqual(actual, expected);
    });
  }
});

describe('std', () => {
  before(async () => {
    const buffer = (await readFile('project.test.abi')).buffer;
    gc.sdk.initWithAbi({
      abi: new Abi(buffer),
    });
  });

  it('time + duration => time', () => {
    assert.deepStrictEqual(
      gc.core.time.create(40).add(gc.core.duration.create(2)),
      gc.core.time.create(42),
    );
  });

  it('time - duration => time', () => {
    assert.deepStrictEqual(
      gc.core.time.create(45).sub(gc.core.duration.create(3)),
      gc.core.time.create(42),
    );
  });

  it('time - time => duration', () => {
    assert.deepStrictEqual(
      gc.core.time.create(42).sub(gc.core.time.create(40)),
      gc.core.duration.create(2),
    );
  });

  describe('duration', () => {
    it('0n => 0us', () => {
      assert.deepStrictEqual(gc.core.duration.create(0n).toString(), '0us');
    });

    it('1_000_000_000n => 16min 40', () => {
      assert.deepStrictEqual(gc.core.duration.create(1_000_000_000n).toString(), '16min 40s');
    });

    it('100_000_000_000_000n => 1157day 9hour 46min 40s', () => {
      assert.deepStrictEqual(
        gc.core.duration.create(100_000_000_000_000n).toString(),
        '1157day 9hour 46min 40s',
      );
    });

    it('1year > 2days', () => {
      assert(gc.core.duration.from_years(1) > gc.core.duration.from_days(2));
    });

    it('42us == 42', () => {
      assert(gc.core.duration.create(42).valueOf() == 42);
    });
  });

  it('42time == 42', () => {
    assert(gc.core.time.create(42).valueOf() == 42);
  });
});

function fromJson(value) {
  return JSON.parse(value, (_, value) => {
    if (typeof value === 'string' && value.startsWith('$bigint:')) {
      // eslint-disable-next-line no-undef
      return BigInt(value.slice(8));
    }
    return value;
  });
}

function toJson(value) {
  return JSON.stringify(value, (_, value) => {
    if (typeof value === 'bigint') {
      if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
        return Number(value);
      }
      return `$bigint:${value}`;
    } else if (value instanceof Map) {
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
