import '@greycat/web/sdk';

const greycat = await gc.sdk.init();

const type = greycat.findType('project::Baz');
if (!type) {
  throw 'unable to find RelayApp';
}

const evol = new gc.sdk.AbiTypeEvol(type);
console.log(evol.size, `updates for ${type.name}`);
console.log(
  'backward',
  Array.from(evol.backward()).map((ty) => ty.data.offset),
);
console.log(
  'forward',
  Array.from(evol.forward()).map((ty) => ty.data.offset),
);
