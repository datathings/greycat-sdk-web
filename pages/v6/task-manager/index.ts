import { GreyCat } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });


const task = await greycat.call('project::whatever');


// task[0] === 1 // user id
// task[1] === 0; // task id
// greycat.call('runtime::Task::info', [task.user, task.id])
