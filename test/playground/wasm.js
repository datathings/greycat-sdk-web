// @ts-check
import '@greycat/web/sdk';

const m = await gc.sdk.compileWasm();

console.log(m.instance.exports);
