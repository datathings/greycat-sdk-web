// @ts-check
import { GreyCat } from '@greycat/web/sdk';
import { displayValue } from './_utils.js';

const greycat = await GreyCat.init();

// spawns a task
const task = await greycat.spawn('project::task_with_params', ['Hello world', 42]);
displayValue(task);

// await for completion
console.log('await completion...');
const result = await task.await();
displayValue(result);

