import '@greycat/web/sdk';

const greycat = await gc.sdk.init();
const root = await greycat.root();
console.dir(root, { getters: true });
