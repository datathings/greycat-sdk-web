import '@greycat/web/sdk';

await gc.sdk.init();

const arr = await gc.project.whatever();
const points = arr.map((w) => w.node);

await gc.project.arr_of_nodes(points);