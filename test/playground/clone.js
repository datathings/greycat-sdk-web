import { clone, core, GreyCat, runtime } from '@greycat/web/sdk';
import assert from 'assert';

await GreyCat.init();

const assertEquality = (actual, expected) => {
  // the mutated source should not deep equal the cloned instance
  assert.notDeepStrictEqual(actual, expected);
  // though the cloned instance should be of the same class
  assert.equal(actual.constructor, expected.constructor);
};

const source = { name: 'John' };
const cloned = clone(source);

// mutate source
source.name = 'Bart';

assertEquality(source, cloned);

const source2 = core.time.fromDate(new Date());
const cloned2 = clone(source2);

source2.value = 42n;

assertEquality(source2, cloned2);

const source3 = await runtime.Runtime.info();
const cloned3 = clone(source3);

// mutate source
source3.fg_threads = 42n;
source3.license.extra_1 = 1337;
if (source3.store_stats) {
  source3.store_stats.allocated_bytes = 42n;
}

assertEquality(source3, cloned3);
