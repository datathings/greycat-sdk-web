import '@greycat/web/sdk';

await gc.sdk.init();

const t = gc.core.Table.fromObjects([
  { name: 'John', age: 42 },
  { name: 'Paul', age: 36 },
  { name: 'Maria', age: 67 },
]);
t.sort(1, gc.sdk.SortOrd.asc);
console.log(t.toJSON());