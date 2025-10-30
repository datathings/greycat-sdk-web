import '@greycat/web/sdk';
import { displayValue } from './_utils.js';

await gc.sdk.init();

const tasks = await gc.runtime.Task.history(0, 10);
displayValue(tasks);