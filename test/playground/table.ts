// run with:
// deno -A playground/table.ts
// or
// esbuild playground/table.ts | node --input-type=module
import '@greycat/sdk';
const { core, GreyCat } = greycat;
import assert from 'node:assert';
// import { displayValue } from './_utils.js';

interface MyRow {
  id: number | bigint;
  temp: number;
  data: Named;
}

interface Named {
  name: string;
}

try {
  const g = await GreyCat.init();
  await table_from_objects_remote(g);
  await table_from_objects(g);
  await table_from_gc_objects(g);
  await table_from_objects_different_shapes(g);
  await table_rows_from_arrays(g);
  await table_from_map(g);
  await table_sort(g);
} catch (err) {
  console.error(err);
  process.exit(1);
}

async function table_from_objects_remote(g: greycat.GreyCat) {
  const table = await greycat.project.some_table();
  // const table = await g.call<greycat.core.Table<MyRow>>('project::some_table');
  assert.deepStrictEqual(table.headers, ['id', 'temp', 'data']);
  assert.deepStrictEqual(table.subheaders, ['core::int', 'core::float', 'project::Named']);

  // when calling `table.get_row(index)` you get a new instance
  const row_0_a = table.getRow(0);
  const row_0_b = table.getRow(0);
  // therefore, the values are deeply equal
  assert.deepStrictEqual(row_0_a, row_0_b);
  // but they are not the same object (eg. you get a new instance each time)
  assert.notStrictEqual(row_0_a, row_0_b);

  const expected = [
    g.create('project::MyRow', [0, 10.5, g.create('project::Named', ['one'])]),
    g.create('project::MyRow', [1, 11.5, g.create('project::Named', ['two'])]),
    g.create('project::MyRow', [2, 20.5, g.create('project::Named', ['three'])]),
    g.create('project::MyRow', [3, 30.5, g.create('project::Named', ['four'])]),
  ];
  for (let i = 0; i < expected.length; i++) {
    assert.deepStrictEqual(table.getRow(i), expected[i]);
  }

  assert.deepStrictEqual(table.getRowArray(2), [2, 20.5, g.create('project::Named', ['three'])]);

  // console.log('table_from_objects_remote');
  // for (const row of table) {
  //   displayValue(row);
  // }
}

async function table_from_objects(_g: GreyCat) {
  const table = core.Table.fromObjects([
    { name: 'John', age: 42 },
    { name: 'Paul', age: 36 },
    { name: 'Maria', age: 27 },
  ]);

  // when calling `table.get_row(index)` you get a new instance
  const row_0_a = table.getRow(0);
  const row_0_b = table.getRow(0);
  // therefore, the values are deeply equal
  assert.deepStrictEqual(row_0_a, row_0_b);
  // but they are not the same object (eg. you get a new instance each time)
  assert.notStrictEqual(row_0_a, row_0_b);

  // console.log('table_from_objects');
  // for (const row of table) {
  //   displayValue(row);
  // }
}

async function table_from_gc_objects(g: GreyCat) {
  const table = core.Table.fromObjects([
    g.create('project::Person', ['John', 42]),
    g.create('project::Person', ['Paul', 36]),
    g.create('project::Person', ['Maria', 27]),
  ]);

  // when calling `table.get_row(index)` you get a new instance
  const row_0_a = table.getRow(0);
  const row_0_b = table.getRow(0);
  // therefore, the values are deeply equal
  assert.deepStrictEqual(row_0_a, row_0_b);
  // but they are not the same object (eg. you get a new instance each time)
  assert.notStrictEqual(row_0_a, row_0_b);

  // console.log('table_from_objects');
  // for (const row of table) {
  //   displayValue(row);
  // }
}

async function table_rows_from_arrays(_g: GreyCat) {
  const table = core.Table.fromRows([
    ['John', 42],
    ['Paul', 36],
    ['Maria', 27],
  ]);

  assert.deepStrictEqual(table.cols[0], ['John', 'Paul', 'Maria']);
  assert.deepStrictEqual(table.cols[1], [42, 36, 27]);

  // console.log('table_rows_from_arrays');
  // for (const row of table) {
  //   displayValue(row);
  // }
}

async function table_from_map(_g: GreyCat) {
  const map = new Map([
    ['John', 42],
    ['Paul', 36],
    ['Maria', 27],
  ]);
  const table = core.Table.fromMap(map);
  assert.deepStrictEqual(table.getRow(0), ['John', 42]);
  assert.deepStrictEqual(table.getRow(1), ['Paul', 36]);
  assert.deepStrictEqual(table.getRow(2), ['Maria', 27]);
}

async function table_sort(_g: GreyCat) {
  const table = core.Table.fromRows([
    ['John', 42, 60000],
    ['Paul', 36, 55000],
    ['Maria', 27, 75000],
    ['Lisa', 45, 50000],
    ['James', 30, 52000],
  ]);

  table.sort(1, SortOrd.asc);

  const agesSortedAscending = [27, 30, 36, 42, 45];
  assert.ok(
    table.cols[1].every((age, index) => age === agesSortedAscending[index]),
    'Ages are not sorted correctly in ascending order.',
  );
}

async function table_from_objects_different_shapes(_g: GreyCat) {
  const table = core.Table.fromObjects([
    { username: 'user-0', password: 'password0', is_active: false },
    { password: 'password1', username: 'user-1', is_active: false },
    { username: 'admin-0', password: 'password2', is_admin: true },
    null,
    { password: 'password3', username: 'admin-1', is_admin: true, groups: ['aaa', 'bbb'] },
  ]);

  assert.deepStrictEqual(table.getRow(0), ['user-0', 'password0', false, undefined, undefined]);
  assert.deepStrictEqual(table.getRow(1), ['user-1', 'password1', false, undefined, undefined]);
  assert.deepStrictEqual(table.getRow(2), ['admin-0', 'password2', undefined, true, undefined]);
  assert.deepStrictEqual(table.getRow(3), [undefined, undefined, undefined, undefined, undefined]);
  assert.deepStrictEqual(table.getRow(4), [
    'admin-1',
    'password3',
    undefined,
    true,
    ['aaa', 'bbb'],
  ]);
}
