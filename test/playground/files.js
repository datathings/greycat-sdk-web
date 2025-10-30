import '@greycat/web/sdk';

const greycat = await gc.sdk.init();

const file = new File([new TextEncoder().encode(JSON.stringify({ hello: 42, foo: false }, null, 2))], 'foo.json');
await greycat.putFile('subdir/foo.json', file);
const value = await greycat.getFile('subdir/foo.json');
await greycat.deleteFile('subdir/');

console.log(value);
