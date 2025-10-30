import assert from 'node:assert';
import '@greycat/web/sdk';

await gc.sdk.init();

/**
 * @param {unknown} actual
 * @param {unknown} expected
 */
function assertClone(actual, expected) {
  // the mutated source should not deep equal the cloned instance
  assert.notDeepStrictEqual(actual, expected);
  // though the cloned instance should be of the same class
  assert.equal(actual.constructor, expected.constructor);
}

const source = { name: 'John' };
const cloned = gc.sdk.clone(source);

// mutate source
source.name = 'Bart';

assertClone(source, cloned);

const source2 = gc.core.time.now();
const cloned2 = gc.sdk.clone(source2);

source2.value = 42n;

assertClone(source2, cloned2);

const source3 = await gc.runtime.Runtime.info();
const cloned3 = gc.sdk.clone(source3);

// mutate source
source3.fg_threads = 42n;
source3.license.extra_1 = 1337;

assertClone(source3, cloned3);
