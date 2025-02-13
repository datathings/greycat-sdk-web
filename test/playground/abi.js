// @ts-check
import '@greycat/web/sdk';

const greycat = await gc.sdk.init({ tasksPollingDelay: 0 });
_print_types_with_supertype(greycat);

/**
 * @param {gc.sdk.GreyCat} g 
 */
function _print_symbols(g) {
  for (const symbol of g.abi.symbols) {
    console.log(symbol);
  }
}

/**
 * @param {gc.sdk.GreyCat} g 
 */
function _print_types_with_supertype(g) {
  for (const ty of g.abi.types) {
    if (ty.super_type !== 0) {
      console.log(ty.name, 'extends', g.abi.types[ty.super_type].name);
    }
  }
}