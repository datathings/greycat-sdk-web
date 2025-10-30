import '@greycat/web/sdk';
import { displayValue, writeBytes } from './_utils.js';

const g = await gc.sdk.init();

const arr = ['hello', 'world'];
writeBytes('stringlit_js.bin', g.serializeWithHeaders(arr));

const res = await g.call('project::read_stringlit', [arr]);
displayValue(res);

// try {
//   const array_container = g.findType('project::ArrayContainer');
//   if (!array_container) {
//     throw 'missing type';
//   }
//   const ac = new GCObject(array_container, [42, 1337, -1]);
//   const res = await g.call('project::array_container', [ac]);
//   displayValue(res);
// } catch (err) {
//   console.error(err.stack);
//   process.exit(1);
// }
