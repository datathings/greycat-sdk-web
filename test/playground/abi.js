import '@greycat/web/sdk';

const greycat = await gc.sdk.init();

print(greycat);

/**
 * @param {gc.sdk.GreyCat} g 
 */
function print(g) {
  for (const ty of g.abi.types) {
    if (ty.super_type !== 0) {
      console.log(ty.name, 'extends', g.abi.types[ty.super_type]?.name ?? '<UNKNOWN>');
    }
  }
}