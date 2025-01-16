import '@greycat/web/sdk';

await gc.sdk.init();

const rows = [
  { name: 'John', age: 42 },
  { name: 'Paul', age: 36 },
  { name: 'Maria', age: 67 },
];
const t = gc.core.Table.fromObjects(rows);
t.sort(1, gc.sdk.SortOrd.asc);
console.log(t.toJSON());
console.log(rows);