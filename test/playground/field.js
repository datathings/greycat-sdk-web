import '@greycat/web/sdk';

await gc.sdk.init();

const x = new gc['Array<core::float>']();
console.log(x);

// const field = greycat.findField('project::FloatPrecisionTest::precision');
// console.log(field);
// const ty = greycat.findType(gc.Person._type);
// console.dir(gc.Person);
