// @ts-check
import '@greycat/web/sdk';

await gc.sdk.init();

// spawns a task
const task = await gc.project.sum.spawn(30, 12);
const result = await task.result();
console.log('Result:', result);

