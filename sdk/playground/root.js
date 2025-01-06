// @ts-check
import { GreyCat } from '@greycat/web/sdk';

const greycat = await GreyCat.init();
const root = await greycat.root();
console.dir(root, { getters: true });
