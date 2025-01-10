// @ts-check
import { GreyCat } from '@greycat/web/sdk';

const g = await GreyCat.init();
_print_types_with_supertype(g);

/**
 * @param {GreyCat} g 
 */
function _print_symbols(g) {
  for (const symbol of g.abi.symbols) {
    console.log(symbol);
  }
}

/**
 * @param {GreyCat} g 
 */
function _print_types_with_supertype(g) {
  for (const ty of g.abi.types) {
    if (ty.super_type !== 0) {
      console.log(ty.name, 'extends', g.abi.types[ty.super_type].name);
    }
  }
}