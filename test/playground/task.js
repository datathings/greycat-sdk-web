// @ts-check
import '@greycat/web/sdk';
import { displayValue } from './_utils.js';

const greycat = await gc.sdk.init();

// spawns a task
const task = await greycat.spawn('project::task_with_params', ['Hello world', 42]);
displayValue(task);

// await for completion
console.log('await completion...');
const result = await task.await();
displayValue(result);

const res = await greycat.spawnAwait('project::task_without_result');
console.log(res);