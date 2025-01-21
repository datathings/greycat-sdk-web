import '@greycat/web/sdk';

await gc.sdk.init();

const o = await gc.runtime.User.me();

console.log(o.toJSON());
o.$update = () => {
  console.log('Object has been updated', o.toJSON());
};

o.name = 'Paul';
o.role = 'does_not_exits';