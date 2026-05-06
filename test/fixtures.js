// One entry per fixtures/<i>.gcb produced by project.gcl::write_fixtures().
// `name` is used in test names (so --test-name-pattern can target one).
// `expected` is the deserialized JSON-shape expected by the SDK's AbiReader.

export const fixtures = [
  { name: 'bool true',          expected: true },
  { name: 'bool false',         expected: false },
  { name: 'int 0',              expected: 0 },
  { name: 'int 42',             expected: 42 },
  { name: 'int -1',             expected: -1 },
  { name: 'int::max',           expected: 9223372036854775807n },
  { name: 'int::min',           expected: -9223372036854775808n },
  { name: 'float 3.14',         expected: 3.14 },
  { name: 'float -2.5',         expected: -2.5 },
  { name: 'String "hello"',     expected: 'hello' },
  { name: 'String empty',       expected: '' },
  { name: "char 'c'",           expected: 'c' },
  { name: 'duration 42_us',     expected: 42 },
  { name: 'duration 3_s',       expected: 3_000_000 },
  { name: 'array empty',        expected: [] },
  { name: 'Array<int>',         expected: [1, 2, 3] },
  { name: 'Array<String>',      expected: ['a', 'b', 'c'] },
  { name: 'mixed array',        expected: [1, 'two', 3, true] },
  { name: 'Map empty',          expected: {} },
  { name: 'Map<String,int>',    expected: { x: 1, y: 2 } },
  {
    name: 'Person Alice',
    expected: { _type: 'project::Person', name: 'Alice', age: 30, nickname: null },
  },
  {
    name: 'Person Bob',
    expected: { _type: 'project::Person', name: 'Bob', age: 7, nickname: 'Bobby' },
  },
  {
    name: 'Box<int>',
    expected: { _type: 'project::Box<core::int>', value: 42 },
  },
  { name: 'Color::red',         expected: 'red' },
  { name: 'Color::blue',        expected: 'blue' },
  { name: 'CalendarUnit::day',  expected: 'day' },
  {
    name: 'geo',
    expected: { lat: 49.6, lng: 6.13 },
    epsilon: 1e-3,
  },
  {
    name: 'Tensor f64 [3]',
    expected: {
      _type: 'core::Tensor',
      shape: [3],
      type: 'f64',
      data: [1, 2, 3],
    },
    // Tensor's `dim` field is implementation-detail; check structurally only.
    partial: ['_type', 'shape', 'type', 'data'],
  },
  {
    name: 'Error oops',
    expected: { _type: 'core::Error', message: 'oops', stack: [] },
  },
  { name: 'null',               expected: null },
];
