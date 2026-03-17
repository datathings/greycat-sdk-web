import '@greycat/web/sdk';

await gc.sdk.init();

const foo = new gc.Baz(null, 'Hello');
const res = await gc.something(foo);
console.dir(structuredClone(res));
