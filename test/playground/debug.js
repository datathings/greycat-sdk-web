import '@greycat/web/sdk';
import assert from 'node:assert';

const greycat = await gc.sdk.init();
const root = await greycat.root();
const debug_node = root['project::debug_node'];
console.log(debug_node);

const task = await gc.project.debug_fn.spawn(); // breakpoint

const debug_ids = await gc.runtime.Debug.all();
assert.equal(debug_ids.length, 1);
const debug_id = debug_ids[0];
console.log('debug id:', debug_id);

const debug = greycat.clone();
debug.setDebugId(debug_id);

const res0 = await gc.core.node.resolve_all([debug_node], debug);
assert.equal(res0[0], null);

await gc.runtime.Debug.resume(debug_id);

const res1 = await gc.core.node.resolve_all([debug_node], debug);
assert.equal(res1[0], 'No longer null');

await gc.runtime.Debug.resume(debug_id);

const res = await task.result();
assert.equal(res, 42);

console.log('All good');
