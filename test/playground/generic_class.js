import '@greycat/web/sdk';
import assert from 'node:assert';

const greycat = await gc.sdk.init();

const bs = await gc.project.get_box_string();
assert(bs instanceof gc.project.Box);
assert.strictEqual(bs.$type.offset, greycat.findType('project::Box<core::String>').offset);
const bi = await gc.project.get_box_int();
assert(bi instanceof gc.project.Box);
assert.strictEqual(bi.$type.offset, greycat.findType('project::Box<core::int>').offset);