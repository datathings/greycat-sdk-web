import '@greycat/web/sdk';
import { toPlain } from './helpers.js';

await gc.sdk.init({ auth: { username: 'leiko', password: 'leiko' }});

const id = await gc.runtime.Identity.current();
console.log(toPlain(id));
